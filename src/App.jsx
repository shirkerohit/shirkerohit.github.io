import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import WritingPage from './pages/WritingPage';
import BookshelfPage from './pages/BookshelfPage';
import ProjectsPage from './pages/ProjectsPage';
import ExpenseTrackerIndexPage from './pages/projects/ExpenseTrackerIndexPage';
import ExpenseTrackerPrivacyPage from './pages/projects/ExpenseTrackerPrivacyPage';
import ExpenseTrackerTermsPage from './pages/projects/ExpenseTrackerTermsPage';
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

    const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

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
                                onToggleTheme={toggleTheme}
                            />
                        )}
                    />
                    <Route
                        path="/bookshelf"
                        element={(
                            <BookshelfPage
                                theme={theme}
                                onToggleTheme={toggleTheme}
                            />
                        )}
                    />
                    <Route
                        path="/projects"
                        element={(
                            <ProjectsPage
                                theme={theme}
                                onToggleTheme={toggleTheme}
                            />
                        )}
                    />
                    <Route
                        path="/projects/expense-tracker"
                        element={(
                            <ExpenseTrackerIndexPage
                                theme={theme}
                                onToggleTheme={toggleTheme}
                            />
                        )}
                    />
                    <Route
                        path="/projects/expense-tracker/privacy"
                        element={(
                            <ExpenseTrackerPrivacyPage
                                theme={theme}
                                onToggleTheme={toggleTheme}
                            />
                        )}
                    />
                    <Route
                        path="/projects/expense-tracker/terms"
                        element={(
                            <ExpenseTrackerTermsPage
                                theme={theme}
                                onToggleTheme={toggleTheme}
                            />
                        )}
                    />

                    {/* Support singular alias /project */}
                    <Route path="/project" element={<Navigate to="/projects" replace />} />
                    <Route path="/project/expense-tracker" element={<Navigate to="/projects/expense-tracker" replace />} />
                    <Route path="/project/expense-tracker/privacy" element={<Navigate to="/projects/expense-tracker/privacy" replace />} />
                    <Route path="/project/expense-tracker/terms" element={<Navigate to="/projects/expense-tracker/terms" replace />} />

                    <Route
                        path="*"
                        element={(
                            <HomePage
                                articles={articles}
                                loading={loading}
                                error={error}
                                theme={theme}
                                onToggleTheme={toggleTheme}
                            />
                        )}
                    />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
