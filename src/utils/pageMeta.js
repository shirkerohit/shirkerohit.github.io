import { useEffect } from 'react';

const SITE_ORIGIN = 'https://shirkerohit.github.io';

export function usePageMeta(title, description, path) {
    useEffect(() => {
        document.title = title;

        const updates = [
            ['meta[name="description"]', 'content', description],
            ['meta[property="og:title"]', 'content', title],
            ['meta[property="og:description"]', 'content', description],
            ['meta[name="twitter:title"]', 'content', title],
            ['meta[name="twitter:description"]', 'content', description],
            ['link[rel="canonical"]', 'href', `${SITE_ORIGIN}${path}`],
        ];

        updates.forEach(([selector, attribute, value]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute(attribute, value);
            }
        });
    }, [title, description, path]);
}
