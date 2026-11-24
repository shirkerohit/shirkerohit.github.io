const FEED_URL = 'https://x-feed-worker.rohitsh.workers.dev/';
const CACHE_KEY = 'rohit-x-posts-v1';
const CACHE_TIME_KEY = 'rohit-x-posts-saved-at';
const CACHE_MAX_AGE = 1000 * 60 * 15;

function readCache() {
    try {
        const raw = window.localStorage.getItem(CACHE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function readCacheTime() {
    try {
        return Number(window.localStorage.getItem(CACHE_TIME_KEY)) || 0;
    } catch {
        return 0;
    }
}

function writeCache(posts) {
    try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(posts));
        window.localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    } catch {
        // Storage may be unavailable or full. The feed still works without a cache.
    }
}

export async function loadPosts() {
    if (typeof window === 'undefined') {
        return [];
    }

    const cached = readCache();
    const savedAt = readCacheTime();
    if (cached && savedAt && Date.now() - savedAt < CACHE_MAX_AGE) {
        return cached;
    }

    const response = await fetch(FEED_URL);
    if (!response.ok) {
        throw new Error(`Feed request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const posts = Array.isArray(payload.items) ? payload.items : [];
    writeCache(posts);

    return posts;
}
