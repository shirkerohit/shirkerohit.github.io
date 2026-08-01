import { useEffect, useState } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

const FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40rohit-shirke';
const ARTICLE_CACHE_KEY = 'rohit-medium-articles';
const ARTICLE_CACHE_TIME_KEY = 'rohit-medium-articles-saved-at';
const ARTICLE_FRESHNESS_MS = 1000 * 60 * 60 * 2;
const HERO_COPY_TEXT = 'I build backend systems, AI-native products, and developer tools with a bias for reliability, observability, and practical usefulness.';

const socialLinks = [
    {
        label: 'Medium',
        href: 'https://rohit-shirke.medium.com/',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.54 12a6.8 6.8 0 1 1-13.6 0 6.8 6.8 0 0 1 13.6 0zm7.46 0c0 3.53-1.52 6.39-3.39 6.39S14.22 15.53 14.22 12s1.52-6.39 3.39-6.39S21 8.47 21 12zm3.04 0c0 3.16-.53 5.72-1.18 5.72s-1.18-2.56-1.18-5.72.53-5.72 1.18-5.72 1.18 2.56 1.18 5.72z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/rohit-shirke/',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M0 0v24h24v-24H0zm8 19H5v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764S5.534 3.204 6.5 3.204 8.25 3.994 8.25 4.968 7.466 6.732 6.5 6.732zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: 'https://github.com/shirkerohit',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        label: 'X',
        href: 'https://x.com/rohit_p_shirke',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.9 1.15h3.68l-8.03 9.18L24 22.85h-7.41l-5.8-7.59-6.64 7.59H.47l8.59-9.82L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.23H4.3l13.31 17.42z" />
            </svg>
        ),
    },
];

function stripHtml(value) {
    if (!value) {
        return '';
    }

    const temp = document.createElement('div');
    temp.innerHTML = value;
    return (temp.textContent || temp.innerText || '').trim();
}

function formatDate(value) {
    if (!value) {
        return '';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return parsed.toLocaleDateString('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function getArticlePreview(content) {
    const summary = stripHtml(content || '').replace(/\s+/g, ' ').trim();
    return summary.length > 180 ? `${summary.slice(0, 177)}...` : summary;
}

async function loadArticles() {
    if (typeof window === 'undefined') {
        return [];
    }

    const cachedArticles = window.localStorage.getItem(ARTICLE_CACHE_KEY);
    const savedAt = window.localStorage.getItem(ARTICLE_CACHE_TIME_KEY);

    if (cachedArticles && savedAt && Date.now() - Number(savedAt) < ARTICLE_FRESHNESS_MS) {
        return JSON.parse(cachedArticles);
    }

    const response = await fetch(FEED_URL);
    const payload = await response.json();
    const items = Array.isArray(payload.items) ? payload.items : [];
    const normalized = items
        .filter((item) => item && item.title && item.link)
        .map((item) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            content: item.content || '',
            preview: getArticlePreview(item.content || ''),
        }));

    window.localStorage.setItem(ARTICLE_CACHE_KEY, JSON.stringify(normalized));
    window.localStorage.setItem(ARTICLE_CACHE_TIME_KEY, String(Date.now()));

    return normalized;
}

function TopBar({ variant, theme, onToggleTheme }) {
    return (
        <header className="topbar">
            <Link className="brand" to="/">
                Rohit Shirke
            </Link>
            <nav className="nav-links" aria-label="Primary navigation">
                {variant === 'home' ? (
                    <>
                        <a href="#about">About</a>
                        <a href="#writing">Writing</a>
                        <a href="#contact">Contact</a>
                    </>
                ) : (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/writing">Writing</Link>
                    </>
                )}
                <button
                    type="button"
                    className="theme-toggle"
                    onClick={onToggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? '☀' : '☾'}
                </button>
            </nav>
        </header>
    );
}

function ArticleCard({ article }) {
    return (
        <a className="article-card" href={article.link} target="_blank" rel="noreferrer">
            <p className="article-meta">{formatDate(article.pubDate)}</p>
            <h3>{article.title}</h3>
            <p>{article.preview}</p>
        </a>
    );
}

function HomePage({ articles, loading, error, theme, onToggleTheme }) {
    const previewArticles = articles.slice(0, 5);
    const [heroCopy, setHeroCopy] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = window.setInterval(() => {
            index += 1;
            setHeroCopy(HERO_COPY_TEXT.slice(0, index));

            if (index >= HERO_COPY_TEXT.length) {
                window.clearInterval(intervalId);
            }
        }, 24);

        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <>
            <TopBar variant="home" theme={theme} onToggleTheme={onToggleTheme} />
            <main id="top">
                <section className="hero">
                    <div className="hero-main">
                        <p className="eyebrow">Software engineer • AI systems thinker</p>
                        <h1>
                            <span className="hero-greeting">Hey there, </span>
                            <span className="hero-name">I'm Rohit P. Shirke</span>
                        </h1>
                        <p className="hero-copy" aria-label={HERO_COPY_TEXT}>
                            <span>{heroCopy}</span>
                            <span className="typing-caret" aria-hidden="true" />
                        </p>
                        <p className="systems-line">
                            systems / ai / tooling / architecture / evaluation
                        </p>
                    </div>
                    <aside className="hero-rail" aria-label="Current technical focus">
                        <div>
                            <span>Currently</span>
                            <p>AI-native systems</p>
                            <p>RAG evaluation</p>
                            <p>Developer tooling</p>
                        </div>
                        <div>
                            <span>Base</span>
                            <p>Mumbai, Maharashtra, India</p>
                        </div>
                    </aside>
                </section>

                <section id="about" className="section">
                    <div className="section-heading">
                        <p className="eyebrow">About</p>
                    </div>
                    <div className="about">
                        <p>
                            I’m a software engineer with over a decade of experience building systems across software architecture, backend engineering, cloud-native platforms, APIs, and modern frontend development.
                        </p>
                        <p>
                            I’ve architected and delivered production applications using microservices, event-driven systems, containerized deployments, and cloud infrastructure. I enjoy balancing system design, performance, reliability, and developer experience.
                        </p>
                        <p>
                            I currently lead engineering work across product domains, with recent focus on AI-native software: LLM applications, RAG systems, agentic workflows, orchestration, evaluation pipelines, and integrating AI capabilities into existing product ecosystems.
                        </p>
                    </div>
                    <div className="signal-grid" aria-label="Engineering perspective">
                        <div className="signal-block">
                            <h4>How I work</h4>
                            <p>
                                I like systems that are explainable, boring where they should be boring,
                                and intelligent only where intelligence actually helps.
                            </p>
                        </div>
                        <div className="signal-block">
                            <h4>Technical interests</h4>
                            <div className="tag-list">
                                <span>LLMs</span>
                                <span>RAG</span>
                                <span>Agents</span>
                                <span>Distributed systems</span>
                                <span>APIs</span>
                                <span>Cloud platforms</span>
                                <span>Evaluation pipelines</span>
                                <span>Developer experience</span>
                            </div>
                        </div>
                        <div className="signal-block signal-block-wide">
                            <h4>Problems I like</h4>
                            <ul>
                                <li>Turning messy workflows into reliable tools</li>
                                <li>Designing AI features that can be evaluated, observed, and improved</li>
                                <li>Building software that survives production reality</li>
                            </ul>
                        </div>
                    </div>
                    <div className="impact-list" aria-label="Selected impact">
                        <h4>Key Highlights</h4>
                        <p>Published technical articles with 34K+ views and 16k+ reads</p>
                        <p>Recognized as a LinkedIn Top Voice for consistently sharing valuable insights on web development, software engineering, and emerging technologies.</p>
                        <p>Built and maintained open-source Laravel packages that have been adopted by the developer community, collectively surpassing 5,000+ installations.</p>
                        <p>Designed, developed, and published a browser productivity extensions with 500+ active installations, delivering practical features that streamline everyday workflows.</p>
                    </div>
                </section>

                <section id="writing" className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Writing</p>
                        <h4>Field notes on software architecture, AI systems, and practical engineering decisions, read by thousands of people.</h4>
                    </div>
                    <div className="article-list">
                        {loading && <p>Loading recent writing...</p>}
                        {!loading && error && <p>{error}</p>}
                        {!loading && !error && previewArticles.length === 0 && <p>No articles available right now.</p>}
                        {!loading && !error && previewArticles.map((article) => (
                            <ArticleCard key={article.link} article={article} />
                        ))}
                    </div>
                    <div className="section-links">
                        <Link className="primary-link" to="/writing">
                            More writing
                        </Link>
                        <a className="secondary-link" href="https://rohit-shirke.medium.com/" target="_blank" rel="noreferrer">
                            Read on Medium
                        </a>
                    </div>
                </section>

                <section id="contact" className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Contact</p>
                    </div>
                    <div className="contact-card">
                        <p>
                            You can find me on any of the below channels. Let&apos;s say "hello".
                        </p>
                        <div className="social-links">
                            {socialLinks.map((item) => (
                                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <p>Designed and developed by Rohit P. Shirke</p>
                <p>Hosted with ❤️ by GitHub Pages</p>
            </footer>
        </>
    );
}

function WritingPage({ articles, loading, error, theme, onToggleTheme }) {
    const archiveArticles = articles.slice(5, 15);

    return (
        <>
            <TopBar variant="writing" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="writing-page">
                <section className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Writing</p>
                        <h3>Field notes on software architecture, AI systems, and practical engineering decisions.</h3>
                    </div>
                    <div className="article-list">
                        {loading && <p>Loading articles...</p>}
                        {!loading && error && <p>{error}</p>}
                        {!loading && !error && archiveArticles.length === 0 && <p>No articles available right now.</p>}
                        {!loading && !error && archiveArticles.map((article) => (
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
        </>
    );
}

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
