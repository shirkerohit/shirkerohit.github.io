export default {
    async fetch(request) {
        const allowedOrigin = "https://shirkerohit.github.io";
        const origin = request.headers.get("Origin");

        const headers = {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Content-Type": "application/json; charset=utf-8"
        };

        if (origin && origin !== allowedOrigin) {
            return new Response("Forbidden", { status: 403 });
        }

        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers });
        }

        if (request.method !== "GET") {
            return Response.json(
                { error: "Method not allowed" },
                { status: 405, headers }
            );
        }

        try {
            const response = await fetch(
                "https://medium.com/feed/@rohit-shirke"
            );

            if (!response.ok) {
                return Response.json(
                    { error: "Medium returned HTTP " + response.status },
                    { status: 502, headers }
                );
            }

            const xml = await response.text();

            function clean(value) {
                return value
                    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
                    .replace(/<[^>]*>/g, "")
                    .replace(/&amp;/g, "&")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&quot;/g, '"')
                    .replace(/&apos;/g, "'")
                    .replace(/&#(\d+);/g, (_, code) =>
                        String.fromCharCode(Number(code))
                    )
                    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
                        String.fromCharCode(parseInt(code, 16))
                    )
                    .trim();
            }

            function buildTagRegex(tag, flags) {
                const escaped = tag.replace(":", "\\:");
                return new RegExp(
                    `<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}\\s*>`,
                    flags
                );
            }

            function getTag(source, tag) {
                const match = source.match(buildTagRegex(tag, "i"));
                return match ? clean(match[1]) : "";
            }

            function getRawTag(source, tag) {
                const match = source.match(buildTagRegex(tag, "i"));
                return match ? match[1] : "";
            }

            function getAllTags(source, tag) {
                const values = [...source.matchAll(buildTagRegex(tag, "gi"))]
                    .map((match) => clean(match[1]))
                    .filter(Boolean);
                return [...new Set(values)];
            }

            function getFirstImage(source) {
                const match = source.match(/<img[^>]+src=["']([^"']+)["']/i);
                return match ? match[1] : "";
            }

            const itemBlocks = [
                ...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)
            ];

            const items = itemBlocks.map(match => {
                const item = match[1];
                const rawDescription = getRawTag(item, "description");
                const rawContent = getRawTag(item, "content:encoded");

                return {
                    title: getTag(item, "title"),
                    link: getTag(item, "link"),
                    guid: getTag(item, "guid"),
                    pubDate: getTag(item, "pubDate"),
                    author: getTag(item, "dc:creator"),
                    description: clean(rawDescription),
                    categories: getAllTags(item, "category"),
                    image: getFirstImage(rawDescription || rawContent)
                };
            });

            return Response.json(
                { status: "ok", items },
                {
                    headers: {
                        ...headers,
                        "Cache-Control": "public, max-age=900"
                    }
                }
            );
        } catch (error) {
            return Response.json(
                { error: error.message || "Failed to fetch Medium feed" },
                { status: 500, headers }
            );
        }
    }
};
