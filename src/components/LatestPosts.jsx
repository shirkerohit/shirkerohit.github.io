import { useEffect, useState } from 'react';
import { isCacheFresh, loadPosts, readCachedPosts } from '../utils/tweetLoader';

const PROFILE_URL = 'https://x.com/rohit_p_shirke';

export default function LatestPosts() {
    const [feed, setFeed] = useState(() => {
        const cached = readCachedPosts();
        return { posts: cached || [], loading: !cached, error: '' };
    });

    useEffect(() => {
        if (isCacheFresh()) {
            return undefined;
        }

        let active = true;

        loadPosts()
            .then((items) => {
                if (active) {
                    setFeed({ posts: items, loading: false, error: '' });
                }
            })
            .catch(() => {
                if (active) {
                    setFeed((current) => ({ ...current, loading: false, error: 'Feed unavailable right now.' }));
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const { posts, loading, error } = feed;

    return (
        <div className="posts-widget">
            <div className="posts-widget-header">
                <span className="feed-status" aria-hidden="true" />
                <span className="feed-title">Live feed</span>
                <span className="feed-handle">@rohit_p_shirke</span>
            </div>
            <div className="rail-post-list">
                {posts.map((post) => (
                    <article className="rail-post" key={post.url}>
                        <time className="rail-post-date" dateTime={post.date}>
                            {post.time || post.date}
                        </time>
                        <p className="rail-post-text">{post.text}</p>
                        {post.quote && (
                            <p className="rail-post-quote">{post.quote.text}</p>
                        )}
                        <a className="rail-post-link" href={post.url} target="_blank" rel="noreferrer">
                            View post ↗
                        </a>
                    </article>
                ))}
                {loading && posts.length === 0 && <p className="feed-message">Loading feed...</p>}
                {!loading && posts.length === 0 && error && <p className="feed-message">{error}</p>}
                {!loading && posts.length === 0 && !error && (
                    <p className="feed-message">No posts available right now.</p>
                )}
            </div>
            <a className="rail-follow" href={PROFILE_URL} target="_blank" rel="noreferrer">
                Follow for updates on X ↗
            </a>
        </div>
    );
}
