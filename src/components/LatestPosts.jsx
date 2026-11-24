import { useEffect, useState } from 'react';
import { loadPosts } from '../utils/tweetLoader';

const PROFILE_URL = 'https://x.com/rohit_p_shirke';

export default function LatestPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        loadPosts()
            .then((items) => {
                if (active) {
                    setPosts(items);
                }
            })
            .catch(() => {
                if (active) {
                    setError('Feed unavailable right now.');
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="posts-widget">
            <div className="posts-widget-header">
                <span className="feed-status" aria-hidden="true" />
                <span className="feed-title">Live feed</span>
                <span className="feed-handle">@rohit_p_shirke</span>
            </div>
            <div className="rail-post-list">
                {loading && <p className="feed-message">Loading feed...</p>}
                {!loading && error && <p className="feed-message">{error}</p>}
                {!loading && !error && posts.length === 0 && (
                    <p className="feed-message">No posts available right now.</p>
                )}
                {!loading && !error && posts.map((post) => (
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
            </div>
            <a className="rail-follow" href={PROFILE_URL} target="_blank" rel="noreferrer">
                Follow for updates on X ↗
            </a>
        </div>
    );
}
