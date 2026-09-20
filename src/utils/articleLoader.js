const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40rohit-shirke';
const ARTICLE_CACHE_KEY = 'rohit-medium-articles';
const ARTICLE_CACHE_TIME_KEY = 'rohit-medium-articles-saved-at';
const ARTICLE_FRESHNESS_MS = 1000 * 60 * 60 * 2;

function stripHtml(value) {
    if (!value) {
        return '';
    }

    const temp = document.createElement('div');
    temp.innerHTML = value;
    return (temp.textContent || temp.innerText || '').trim();
}

function getArticlePreview(content) {
    const summary = stripHtml(content || '').replace(/\s+/g, ' ').trim();
    return summary.length > 180 ? `${summary.slice(0, 177)}...` : summary;
}

export async function loadArticles() {
    if (typeof window === 'undefined') {
        return [];
    }

    const cachedArticles = window.localStorage.getItem(ARTICLE_CACHE_KEY);
    const savedAt = window.localStorage.getItem(ARTICLE_CACHE_TIME_KEY);

    if (cachedArticles && savedAt && Date.now() - Number(savedAt) < ARTICLE_FRESHNESS_MS) {
        return JSON.parse(cachedArticles);
    }

    const response = await fetch(FEED_URL);
    const payload = await response.json();
    const items = Array.isArray(payload.items) ? payload.items : [];
    const normalized = items
        .filter((item) => item && item.title && item.link)
        .map((item) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            content: item.content || '',
            preview: getArticlePreview(item.content || ''),
        }));

    window.localStorage.setItem(ARTICLE_CACHE_KEY, JSON.stringify(normalized));
    window.localStorage.setItem(ARTICLE_CACHE_TIME_KEY, String(Date.now()));

    return normalized;
}
