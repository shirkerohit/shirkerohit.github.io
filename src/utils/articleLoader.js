const WORKER_URL = "https://medium-api-worker.rohitsh.workers.dev/";
const FEED_URL = import.meta.env.DEV ? "/medium-feed" : WORKER_URL;
const ARTICLE_CACHE_KEY = "rohit-medium-articles-v3";
const ARTICLE_CACHE_TIME_KEY = "rohit-medium-articles-saved-at";
const ARTICLE_FRESHNESS_MS = 1000 * 60 * 60 * 2;

function stripHtml(value) {
    if (!value) {
        return "";
    }

    const temp = document.createElement("div");
    temp.innerHTML = value;
    return (temp.textContent || temp.innerText || "").trim();
}

function toPlainText(value) {
    return stripHtml(value || "")
        .replace(/\s+/g, " ")
        .replace(/\s*Continue reading on Medium\s*»?\s*$/i, "")
        .trim();
}

function getDescription(item) {
    return (
        toPlainText(item.description || item.content || "") ||
        "Read the full article on Medium."
    );
}

function truncate(text, limit) {
    if (text.length <= limit) {
        return text;
    }
    return `${text.slice(0, limit - 3)}...`;
}

export async function loadArticles() {
    if (typeof window === "undefined") {
        return [];
    }

    const cachedArticles = window.localStorage.getItem(ARTICLE_CACHE_KEY);
    const savedAt = window.localStorage.getItem(ARTICLE_CACHE_TIME_KEY);

    if (
        cachedArticles &&
        savedAt &&
        Date.now() - Number(savedAt) < ARTICLE_FRESHNESS_MS
    ) {
        return JSON.parse(cachedArticles);
    }

    const response = await fetch(FEED_URL);
    if (!response.ok) {
        throw new Error(`Feed request failed with status ${response.status}`);
    }
    const payload = await response.json();
    const items = Array.isArray(payload.items) ? payload.items : [];
    const normalized = items
        .filter((item) => item && item.title && item.link)
        .map((item) => {
            const description = getDescription(item);

            return {
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                author: item.author || "",
                description,
                preview: truncate(description, 180),
            };
        });

    window.localStorage.setItem(ARTICLE_CACHE_KEY, JSON.stringify(normalized));
    window.localStorage.setItem(ARTICLE_CACHE_TIME_KEY, String(Date.now()));

    return normalized;
}
