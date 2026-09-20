import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';

export default function WritingPage({ articles, loading, error, theme, onToggleTheme }) {
    return (
        <>
            <TopBar variant="inner" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="writing-page">
                <section className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Writing</p>
                        <h3>Field notes on software architecture, AI systems, and practical engineering decisions.</h3>
                    </div>
                    <div className="article-list">
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
