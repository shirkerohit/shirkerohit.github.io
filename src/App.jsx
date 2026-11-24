import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import WritingPage from './pages/WritingPage';
import BookshelfPage from './pages/BookshelfPage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage';
import ExpenseTrackerIndexPage from './pages/projects/ExpenseTrackerIndexPage';
import ExpenseTrackerPrivacyPage from './pages/projects/ExpenseTrackerPrivacyPage';
import ExpenseTrackerTermsPage from './pages/projects/ExpenseTrackerTermsPage';
import { loadArticles } from './utils/articleLoader';

function focusMainContent(event) {
    event.preventDefault();
    const main = document.querySelector('main');
    if (!main) {
        return;
    }
    main.setAttribute('tabindex', '-1');
    main.focus();
}

function App() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        const storedTheme = window.localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme;
        }

        if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    });
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);

        const themeColor = document.querySelector('meta[name="theme-color"]');
        if (themeColor) {
            themeColor.setAttribute('content', theme === 'dark' ? '#121518' : '#275044');
        }
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
            <a className="skip-link" href="#main-content" onClick={focusMainContent}>
                Skip to content
            </a>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route
                        path="/"
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
                        element={<NotFoundPage theme={theme} onToggleTheme={toggleTheme} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
