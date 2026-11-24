import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';
import { useEffect } from 'react';

export default function WritingPage({ articles, loading, error, theme, onToggleTheme }) {
    useEffect(() => {
        document.title = 'Writing | Rohit Shirke | Senior Software Engineer & AI Enthusiast';
    }, []);

    const topicCounts = articles.reduce((counts, article) => {
        (article.categories || []).forEach((tag) => {
            counts[tag] = (counts[tag] || 0) + 1;
        });
        return counts;
    }, {});
    const topics = Object.entries(topicCounts)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 8);

    return (
        <>
            <TopBar variant="inner" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="writing-page">
                <section className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Writing</p>
                        <h3>Field notes on software architecture, AI systems, and practical engineering decisions.</h3>
                    </div>
                    {!loading && !error && topics.length > 0 && (
                        <div className="topic-index" aria-label="Recent writing topics">
                            <span className="topic-label">Recent topics</span>
                            {topics.map(([tag]) => (
                                <span key={tag} className="topic-chip">{tag}</span>
                            ))}
                        </div>
                    )}
                    <div className="article-list bibliography">
                        {loading && <p>Loading articles...</p>}
                        {!loading && error && <p>{error}</p>}
                        {!loading && !error && articles.length === 0 && <p>No articles available right now.</p>}
                        {!loading && !error && articles.map((article) => (
                            <ArticleCard key={article.link} article={article} />
                        ))}
                    </div>
                    <div className="section-links">
                        <Link className="primary-link" to="/">
                            Back to home
                        </Link>
                        <a className="secondary-link" href="https://rohit-shirke.medium.com/" target="_blank" rel="noreferrer">
                            Read more on Medium
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
