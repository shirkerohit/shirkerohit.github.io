import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import WritingPage from './pages/WritingPage';
import BookshelfPage from './pages/BookshelfPage';
// import ProjectsPage from './pages/ProjectsPage';
import { loadArticles } from './utils/articleLoader';

function App() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        return window.localStorage.getItem('theme') || 'light';
    });
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await loadArticles();
                setArticles(data);
            } catch (err) {
                setError('Could not load articles right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="app-shell">
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route
                        path="/writing"
                        element={(
                            <WritingPage
                                articles={articles}
                                loading={loading}
                                error={error}
                                theme={theme}
                                onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                            />
                        )}
                    />
                    <Route
                        path="/bookshelf"
                        element={(
                            <BookshelfPage
                                theme={theme}
                                onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                            />
                        )}
                    />
                    {/* <Route
                        path="/projects"
                        element={(
                            <ProjectsPage
                                theme={theme}
                                onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                            />
                        )}
                    /> */}
                    <Route
                        path="*"
                        element={(
                            <HomePage
                                articles={articles}
                                loading={loading}
                                error={error}
                                theme={theme}
                                onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                            />
                        )}
                    />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
