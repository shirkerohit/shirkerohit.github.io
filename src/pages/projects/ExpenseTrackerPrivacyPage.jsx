import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';

export default function ExpenseTrackerPrivacyPage({ theme, onToggleTheme }) {
    useEffect(() => {
        document.title = 'Privacy Policy — Expense Tracker | Rohit Shirke';
    }, []);

    return (
        <>
            <TopBar variant="inner" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="legal-page">
                <nav className="breadcrumb" aria-label="Breadcrumb navigation">
                    <Link to="/projects">Projects</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to="/projects/expense-tracker">Expense Tracker</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Privacy Policy</span>
                </nav>

                <header className="legal-header">
                    <div className="legal-header-meta">
                        <span className="doc-type-tag">Privacy Policy</span>
                        <span className="last-updated">Last Updated: September 23, 2026</span>
                    </div>
                    <h1>Expense Tracker — Privacy Policy</h1>
                    <p className="legal-subtitle">
                        This Privacy Policy explains how Expense Tracker ("App", "we", "us", or "our") handles information when you use the App.
                    </p>
                </header>

                <div className="legal-container">
                    <aside className="legal-toc">
                        <div className="toc-sticky-box">
                            <h4>On this page</h4>
                            <nav>
                                <a href="#sec-1">1. Information We Do Not Collect</a>
                                <a href="#sec-2">2. Local Data Storage</a>
                                <a href="#sec-3">3. Google Sign-In & Drive</a>
                                <a href="#sec-4">4. Expense Data & Google Drive</a>
                                <a href="#sec-5">5. Google Auth Information</a>
                                <a href="#sec-6">6. CSV Import and Export</a>
                                <a href="#sec-7">7. Analytics & Tracking</a>
                                <a href="#sec-8">8. Data Sharing</a>
                                <a href="#sec-9">9. Data Retention</a>
                                <a href="#sec-10">10. Data Security</a>
                                <a href="#sec-11">11. Children's Privacy</a>
                                <a href="#sec-12">12. Your Choices and Rights</a>
                                <a href="#sec-13">13. Third-Party Services</a>
                                <a href="#sec-14">14. Policy Updates</a>
                                <a href="#sec-15">15. Contact Us</a>
                                <a href="#sec-16">16. Jurisdiction</a>
                            </nav>
                            <div className="toc-footer-link">
                                <Link to="/projects/expense-tracker/terms">&rarr; View Terms & Conditions</Link>
                            </div>
                        </div>
                    </aside>

                    <article className="legal-content">
                        <div className="legal-intro-banner">
                            <p>
                                We designed the App as a <strong>local-first, privacy-focused expense tracker</strong>. The core functionality is designed to work without requiring an account, without advertising, and without analytics or tracking services.
                            </p>
                        </div>

                        <section id="sec-1">
                            <h2>1. Information We Do Not Collect</h2>
                            <p>For the normal offline use of the App, we do not operate a server that collects or stores your expense records.</p>
                            <p>We do not intentionally collect:</p>
                            <ul>
                                <li>Your expense history</li>
                                <li>Expense descriptions and amounts</li>
                                <li>Expense categories and budget information</li>
                                <li>Spending insights</li>
                                <li>Imported or exported CSV files</li>
                                <li>Device location, contacts, photos, or media</li>
                                <li>Advertising identifiers</li>
                                <li>Usage analytics or behavioral tracking data</li>
                            </ul>
                            <p>The App does not contain third-party advertising or tracking SDKs as of the date of this Privacy Policy.</p>
                        </section>

                        <section id="sec-2">
                            <h2>2. Local Data Storage</h2>
                            <p>The App stores information locally on your device to provide its functionality.</p>
                            <p>Depending on the features you use, locally stored information may include:</p>
                            <ul>
                                <li>Expense records, descriptions, amounts, and dates</li>
                                <li>Categories, payment methods, and budgets</li>
                                <li>Application and theme preferences</li>
                                <li>Widget information and settings required for App operation</li>
                            </ul>
                            <p>This information remains on your device unless you choose to export, synchronize, back up, or otherwise share it using a feature provided by the App or your device.</p>
                        </section>

                        <section id="sec-3">
                            <h2>3. Google Sign-In and Google Drive</h2>
                            <p>The App provides an <strong>optional</strong> Google Sign-In and Google Drive integration.</p>
                            <p>You do not need to connect a Google account to use the core functionality of the App.</p>
                            <p>If you choose to use Google Drive synchronization or backup, the App may interact with Google services to:</p>
                            <ul>
                                <li>Authenticate your Google account.</li>
                                <li>Obtain authorization to access Google Drive functionality required by the App.</li>
                                <li>Upload application data to your Google Drive.</li>
                                <li>Retrieve application data from your Google Drive when synchronization is requested.</li>
                            </ul>
                            <p>Where technically possible, the App will request only the minimum Google permissions required (such as <code>drive.file</code>, which restricts access solely to files created by the App).</p>
                        </section>

                        <section id="sec-4">
                            <h2>4. Your Expense Data and Google Drive</h2>
                            <p>When you choose to synchronize or back up your expense information to Google Drive, the relevant data is transferred to your personal Google Drive account. The resulting files are stored under your control subject to Google's policies.</p>
                            <p>We do not use your expense information stored in your Google Drive for advertising, selling to third parties, building advertising profiles, or data analytics.</p>
                        </section>

                        <section id="sec-5">
                            <h2>5. Google Authentication Information</h2>
                            <p>When you use Google Sign-In, Google may provide the App with authentication information required to establish your authorized session (e.g., Google account ID, email address, basic profile info, OAuth tokens).</p>
                            <p>We use such information only to provide the Google authentication and Drive functionality requested by you. We do not sell this information or use it for advertising.</p>
                        </section>

                        <section id="sec-6">
                            <h2>6. CSV Import and Export</h2>
                            <p>The App allows you to import and export expense information using CSV files. CSV processing occurs locally on your device.</p>
                            <p>You are responsible for protecting CSV files after they are exported or shared with another application or service.</p>
                        </section>

                        <section id="sec-7">
                            <h2>7. Analytics, Advertising and Tracking</h2>
                            <p>The App currently does not use advertising networks, third-party advertising SDKs, behavioral tracking, or third-party analytics services. We do not sell your personal information.</p>
                        </section>

                        <section id="sec-8">
                            <h2>8. Data Sharing</h2>
                            <p>We do not sell, rent, or share your personal information or expense data with third parties for advertising or marketing purposes. Data only leaves your device when you explicitly choose external integrations like Google Drive sync.</p>
                        </section>

                        <section id="sec-9">
                            <h2>9. Data Retention</h2>
                            <p>Because the App is primarily local-first, we do not maintain a central database containing your expense history. Information stored locally remains on your device until deleted, cleared, or uninstalled.</p>
                        </section>

                        <section id="sec-10">
                            <h2>10. Data Security</h2>
                            <p>We take reasonable measures appropriate to protect information handled by the App. However, you are responsible for maintaining the security of your device, passcode, Google account credentials, and exported CSV files.</p>
                        </section>

                        <section id="sec-11">
                            <h2>11. Children's Privacy</h2>
                            <p>The App is not specifically directed at children, and we do not knowingly collect personal information from children through a centralized service.</p>
                        </section>

                        <section id="sec-12">
                            <h2>12. Your Choices and Rights</h2>
                            <p>Because the App is local-first, you have full control over your data. You may delete locally stored information, export/import data, connect or disconnect Google Drive, delete synchronized files, or uninstall the App at any time.</p>
                        </section>

                        <section id="sec-13">
                            <h2>13. Third-Party Services</h2>
                            <p>Optional functionality relies on third-party services like Google. Third-party services operate independently under their own terms and privacy policies.</p>
                        </section>

                        <section id="sec-14">
                            <h2>14. Changes to This Privacy Policy</h2>
                            <p>We may update this Privacy Policy when App functionality or legal requirements change. Updated versions will display the updated "Last Updated" date at the top of the policy.</p>
                        </section>

                        <section id="sec-15">
                            <h2>15. Contact Us</h2>
                            <p>If you have questions regarding this Privacy Policy, contact us:</p>
                            <ul>
                                <li><strong>Developer / Company:</strong> Rohit Shirke</li>
                                <li><strong>Website:</strong> <a href="https://shirkerohit.github.io" target="_blank" rel="noopener noreferrer">https://shirkerohit.github.io</a></li>
                            </ul>
                        </section>

                        <section id="sec-16">
                            <h2>16. Jurisdiction</h2>
                            <p>This Privacy Policy shall be interpreted in accordance with applicable laws and regulations. For users in India, applicable Indian data-protection and privacy laws may apply.</p>
                        </section>

                        <div className="legal-nav-footer">
                            <div>
                                <span>Related Document:</span>
                                <h4>Terms & Conditions</h4>
                            </div>
                            <Link to="/projects/expense-tracker/terms" className="btn btn-secondary">
                                Read Terms & Conditions &rarr;
                            </Link>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
