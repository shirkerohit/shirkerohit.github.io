import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

export default function NotFoundPage({ theme, onToggleTheme }) {
    useEffect(() => {
        document.title = '404 — Not found | Rohit Shirke';
    }, []);

    return (
        <>
            <TopBar variant="inner" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="not-found-page">
                <section className="not-found-card">
                    <p className="not-found-code">404</p>
                    <h1>Not found</h1>
                    <blockquote className="not-found-quote">
                        “We can only see a short distance ahead, but we can see plenty there that needs to be done.”
                    </blockquote>
                    <p className="not-found-attribution">— Alan Turing</p>
                    <Link to="/" className="primary-link">⟵ Back to home</Link>
                    <p className="not-found-hint">Request path not recognized</p>
                </section>
            </main>
            <Footer />
        </>
    );
}
