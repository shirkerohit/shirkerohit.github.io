import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ArticleCard from '../components/ArticleCard';
import Footer from '../components/Footer';

const HERO_COPY_TEXT = 'I build backend systems, AI-native products, and developer tools with a bias for reliability, observability, and practical usefulness...';

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

export default function HomePage({ articles, loading, error, theme, onToggleTheme }) {
    const previewArticles = articles.slice(0, 5);
    const [heroCopy, setHeroCopy] = useState('');

    useEffect(() => {
        const title = 'Rohit Shirke | Software Engineer & AI Enthusiast';
        const description = 'Rohit Shirke is a software engineer and AI enthusiast building reliable web applications, backend systems, and AI-native products.';

        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }

        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute('href', 'https://shirkerohit.github.io/');
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', title);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content', description);
        }
    }, []);

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
                        <h1>
                            <span className="hero-greeting">Hey there, </span>
                            <span className="hero-name">I'm Rohit P. Shirke</span>
                        </h1>
                        <p className="eyebrow">Software engineer • AI systems thinker</p>
                        <p className="hero-copy" aria-label={HERO_COPY_TEXT}>
                            <span className="terminal-prompt">&gt;</span>
                            <span>{heroCopy}</span>
                            <span className="typing-caret" aria-hidden="true" />
                        </p>
                    </div>
                    <aside className="hero-rail" aria-label="Current technical focus">
                        <div className="rail-block">
                            <span className="rail-label">Current Focus</span>
                            <ul>
                                <li>AI-native systems</li>
                                <li>RAG & evaluation</li>
                                <li>Agentic workflows</li>
                                <li>Developer tooling</li>
                            </ul>
                        </div>
                        <div className="rail-block">
                            <span className="rail-label">Based In</span>
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
                            I'm a Software Engineer and Tech Lead with <strong>10+ years of experience</strong> designing, building, and scaling production-grade software across <strong>system architecture</strong>, <strong>backend engineering</strong>, <strong>cloud infrastructure</strong>, <strong>APIs</strong>, and <strong>modern frontend technologies</strong>.
                        </p>
                        <p>
                            Over the years, I've worked across the engineering stack, from architecting <strong>distributed systems</strong>, <strong>microservices</strong>, and <strong>event-driven architectures</strong> to building <strong>cloud-native platforms</strong> and high-performance applications. My experience spans different product domains, including <strong>fintech and financial workflows</strong>, <strong>consumer-facing platforms</strong>, <strong>SaaS products</strong>, and business-driven applications, giving me exposure to solving diverse technical and product challenges. My approach goes beyond making systems work. I focus on designing solutions that scale with business needs, perform reliably under pressure, and remain maintainable as complexity grows. I enjoy breaking down complex problems, making thoughtful architectural decisions, and turning ideas into production-ready products.
                        </p>
                        <p>
                            I currently lead engineering work across product domains, with recent focus on <strong>AI-native software</strong>: <strong>LLM applications</strong>, <strong>RAG systems</strong>, <strong>agentic workflows</strong>, <strong>orchestration</strong>, <strong>evaluation pipelines</strong>, and integrating AI capabilities into existing product ecosystems.
                        </p>
                        <p>
                            Beyond my professional work, I enjoy building and experimenting with side projects - from AI-powered tools and productivity applications to personal finance solutions and developer utilities. I use these projects to explore emerging technologies, validate ideas, and turn practical problems into working products.
                        </p>
                    </div>
                    <div className="technical-interests">
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
                    <div className="impact-list" aria-label="Selected impact">
                        <h4>Key Highlights</h4>
                        <p>Published technical articles with <strong>34K+ views</strong> and <strong>16K+ reads</strong></p>
                        <p>Recognized as a <strong>LinkedIn Top Voice</strong> for consistently sharing valuable insights on web development, software engineering, and emerging technologies.</p>
                        <p>Built and maintained <strong>open-source Laravel packages</strong> that have been adopted by the developer community, collectively surpassing <strong>5,000+ installations</strong>.</p>
                        <p>Designed, developed, and published a <a href="https://microsoftedge.microsoft.com/addons/search?developer=Rohit%20S." target="_blank" rel="noreferrer"><strong>browser productivity extension</strong></a> with <strong>500+ active installations</strong>, delivering practical features that streamline everyday workflows.</p>
                        <p>Published productivity based <a href="https://marketplace.visualstudio.com/items?itemName=RohitShirke.secret-masker" target="_blank" rel="noreferrer"><strong>VS Code extension</strong></a> that lets you mask the secrete across configuration files.</p>
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
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
