// Free X/Twitter feed puller for https://shirkerohit.github.io/
// Source: FxTwitter RSS (no API key, no paid tier). Account must be public.
// Deploy: cd workers/x-feed && npx wrangler deploy

const HANDLE = 'rohit_p_shirke';
const FEED_URL = `https://fxtwitter.com/${HANDLE}/feed.xml`;
const OWN_POST_PREFIX = `https://x.com/${HANDLE}/status/`;
const MAX_POSTS = 10;
const CACHE_TTL_SECONDS = 900;

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

function decodeEntities(value) {
    return value
        .replace(/<!\[CDATA\[|\]\]>/g, '')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]*>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#0*39;|&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();
}

function tagValue(block, tag) {
    const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'));
    return match ? match[1].trim() : '';
}

function firstParagraph(description) {
    const match = description.match(/<p>([\s\S]*?)<\/p>/i);
    return decodeEntities(match ? match[1] : description);
}

function extractQuote(description) {
    const match = description.match(/<blockquote>([\s\S]*?)<\/blockquote>/i);
    if (!match) {
        return null;
    }

    const text = decodeEntities(match[1]);
    if (!text) {
        return null;
    }

    const link = match[1].match(/href="([^"]+)"/i);
    return { text, url: link ? link[1] : '' };
}

function toIsoDate(pubDate) {
    const parsed = new Date(pubDate);
    return Number.isNaN(parsed.getTime()) ? '' : parsed.toISOString().slice(0, 10);
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function toIstTime(pubDate) {
    const parsed = new Date(pubDate);
    if (Number.isNaN(parsed.getTime())) {
        return '';
    }

    const ist = new Date(parsed.getTime() + 5.5 * 60 * 60 * 1000);
    const day = String(ist.getUTCDate()).padStart(2, '0');
    const month = MONTHS[ist.getUTCMonth()];
    const hours24 = ist.getUTCHours();
    const meridiem = hours24 >= 12 ? 'PM' : 'AM';
    const hours = hours24 % 12 || 12;
    const minutes = String(ist.getUTCMinutes()).padStart(2, '0');

    return `${day} ${month} · ${hours}:${minutes} ${meridiem} IST`;
}

export function parseFeed(xml) {
    const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    const items = [];

    for (const block of blocks) {
        const url = tagValue(block, 'link');
        if (!url.startsWith(OWN_POST_PREFIX)) {
            continue;
        }

        const description = tagValue(block, 'description');
        const text = firstParagraph(description);
        const quote = extractQuote(description);
        if (!text && !quote) {
            continue;
        }

        const pubDate = tagValue(block, 'pubDate');
        const item = { text, date: toIsoDate(pubDate), time: toIstTime(pubDate), url };
        if (quote) {
            item.quote = quote;
        }
        items.push(item);

        if (items.length >= MAX_POSTS) {
            break;
        }
    }

    return items;
}

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            ...CORS_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}`,
        },
    });
}

export default {
    async fetch(request, env, ctx) {
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: CORS_HEADERS });
        }
        if (request.method !== 'GET') {
            return json({ status: 'error', message: 'Method not allowed' }, 405);
        }

        const cache = caches.default;
        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }

        try {
            const upstream = await fetch(FEED_URL, {
                headers: { 'User-Agent': 'Mozilla/5.0 (compatible; personal-site-feed/1.0)' },
            });
            if (!upstream.ok) {
                throw new Error(`Upstream feed returned ${upstream.status}`);
            }

            const items = parseFeed(await upstream.text());
            const result = json({
                status: 'ok',
                handle: HANDLE,
                count: items.length,
                items,
            });
            ctx.waitUntil(cache.put(request, result.clone()));
            return result;
        } catch (error) {
            const message = error && error.message ? error.message : String(error);
            return json({ status: 'error', message }, 502);
        }
    },
};
