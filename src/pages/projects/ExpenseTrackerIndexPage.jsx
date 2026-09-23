import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';

export default function ExpenseTrackerIndexPage({ theme, onToggleTheme }) {
    useEffect(() => {
        document.title = 'Expense Tracker — Local-First Personal Expense Management | Rohit Shirke';
    }, []);

    return (
        <>
            <TopBar variant="inner" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="project-detail-page">
                <nav className="breadcrumb" aria-label="Breadcrumb navigation">
                    <Link to="/projects">Projects</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Expense Tracker</span>
                </nav>

                <section className="project-hero">
                    <div className="project-hero-badge">
                        <span className="badge-icon">💰</span>
                        <span className="badge-text">Local-First Mobile & Web App</span>
                    </div>
                    <h1>Expense Tracker</h1>
                    <p className="project-hero-lead">
                        A local-first, privacy-centric personal expense tracker built to help you understand your spending habits without sacrificing control over your financial data.
                    </p>
                </section>

                <div className="project-content-grid">
                    <div className="project-main-content">
                        <section className="info-card">
                            <h2>Key Features</h2>
                            <ul className="feature-list">
                                <li>
                                    <strong>Local-First Storage:</strong> Your expense history stays strictly on your device by default. No external servers or mandatory sign-ups required.
                                </li>
                                <li>
                                    <strong>Zero Tracking & Ads:</strong> Built completely free from third-party ad networks, telemetry trackers, and behavioral analytics.
                                </li>
                                <li>
                                    <strong>Optional Google Drive Sync:</strong> Connect your own Google account to securely sync and backup data directly to your personal Google Drive account.
                                </li>
                                <li>
                                    <strong>CSV Import & Export:</strong> Seamlessly import past transactions or export full expense logs to standard CSV files anytime.
                                </li>
                                <li>
                                    <strong>Smart Insights & Budgeting:</strong> Set monthly budgets, visualize category breakdowns, and receive spending trends.
                                </li>
                            </ul>
                        </section>

                        <section className="info-card legal-nav-card">
                            <h2>Legal & Compliance Documentation</h2>
                            <p>
                                Transparency and user trust are core principles of Expense Tracker. Review our complete legal policies below:
                            </p>
                            <div className="legal-links-grid">
                                <Link to="/projects/expense-tracker/privacy" className="legal-card-link">
                                    <div className="legal-card-icon">🔒</div>
                                    <div className="legal-card-info">
                                        <h3>Privacy Policy</h3>
                                        <p>Learn how Expense Tracker handles your data, local storage, and optional Google Drive synchronization.</p>
                                    </div>
                                    <span className="card-arrow">&rarr;</span>
                                </Link>

                                <Link to="/projects/expense-tracker/terms" className="legal-card-link">
                                    <div className="legal-card-icon">📜</div>
                                    <div className="legal-card-info">
                                        <h3>Terms & Conditions</h3>
                                        <p>Understand the rules, user responsibilities, disclaimer of financial advice, and service terms.</p>
                                    </div>
                                    <span className="card-arrow">&rarr;</span>
                                </Link>
                            </div>
                        </section>
                    </div>

                    <aside className="project-sidebar">
                        <div className="sidebar-card">
                            <h3>Project Specs</h3>
                            <dl className="spec-list">
                                <dt>Category</dt>
                                <dd>Personal Finance Tool</dd>
                                <dt>Architecture</dt>
                                <dd>Local-First / Offline First</dd>
                                <dt>Cloud Options</dt>
                                <dd>Optional Google Drive API</dd>
                                <dt>Monetization</dt>
                                <dd>Free / Ad-free</dd>
                                <dt>Developer</dt>
                                <dd>Rohit Shirke</dd>
                            </dl>
                        </div>
                        <div className="sidebar-card">
                            <h3>Quick Links</h3>
                            <ul className="quick-links">
                                <li><Link to="/projects/expense-tracker/privacy">Privacy Policy</Link></li>
                                <li><Link to="/projects/expense-tracker/terms">Terms & Conditions</Link></li>
                                <li><Link to="/projects">&larr; Back to All Projects</Link></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}
