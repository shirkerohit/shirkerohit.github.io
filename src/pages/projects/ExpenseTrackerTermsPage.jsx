import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import Footer from '../../components/Footer';

export default function ExpenseTrackerTermsPage({ theme, onToggleTheme }) {
    useEffect(() => {
        document.title = 'Terms & Conditions — Expense Tracker | Rohit Shirke';
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
                    <span className="breadcrumb-current">Terms & Conditions</span>
                </nav>

                <header className="legal-header">
                    <div className="legal-header-meta">
                        <span className="doc-type-tag">Terms & Conditions</span>
                        <span className="last-updated">Last Updated: September 23, 2026</span>
                    </div>
                    <h1>Expense Tracker — Terms & Conditions</h1>
                    <p className="legal-subtitle">
                        These Terms & Conditions ("Terms") govern your use of the Expense Tracker application and related services.
                    </p>
                </header>

                <div className="legal-container">
                    <aside className="legal-toc">
                        <div className="toc-sticky-box">
                            <h4>On this page</h4>
                            <nav>
                                <a href="#sec-1">1. About the App</a>
                                <a href="#sec-2">2. No Financial Advice</a>
                                <a href="#sec-3">3. Using the App</a>
                                <a href="#sec-4">4. Expense Data</a>
                                <a href="#sec-5">5. Local Storage and Data</a>
                                <a href="#sec-6">6. Google Drive Integration</a>
                                <a href="#sec-7">7. CSV Import & Export</a>
                                <a href="#sec-8">8. Availability</a>
                                <a href="#sec-9">9. Data Loss</a>
                                <a href="#sec-10">10. Intellectual Property</a>
                                <a href="#sec-11">11. Third-Party Services</a>
                                <a href="#sec-12">12. Future Paid Features</a>
                                <a href="#sec-13">13. Disclaimer of Warranties</a>
                                <a href="#sec-14">14. Limitation of Liability</a>
                                <a href="#sec-15">15. Changes to the App</a>
                                <a href="#sec-16">16. Termination</a>
                                <a href="#sec-17">17. Governing Law</a>
                                <a href="#sec-18">18. Contact</a>
                                <a href="#sec-19">19. Entire Agreement</a>
                            </nav>
                            <div className="toc-footer-link">
                                <Link to="/projects/expense-tracker/privacy">&rarr; View Privacy Policy</Link>
                            </div>
                        </div>
                    </aside>

                    <article className="legal-content">
                        <div className="legal-intro-banner">
                            <p>
                                By downloading, installing, accessing, or using <strong>Expense Tracker</strong>, you agree to these Terms. If you do not agree with these Terms, please do not use the App.
                            </p>
                        </div>

                        <section id="sec-1">
                            <h2>1. About the App</h2>
                            <p>Expense Tracker is a personal expense-tracking application designed to help users record, organize, and understand their personal expenses.</p>
                            <p>Features include daily expense recording, category organization, spending summaries, budgeting, light/dark themes, widgets, CSV import/export, and optional Google Drive backup.</p>
                            <p>The App is intended as a personal financial organization tool. It is <strong>not a financial advisory, accounting, investment, tax, or professional financial service</strong>.</p>
                        </section>

                        <section id="sec-2">
                            <h2>2. No Financial Advice</h2>
                            <p>The information, calculations, summaries, charts, and insights presented by the App are provided for informational and personal organization purposes only.</p>
                            <p>The App does not provide investment, financial, tax, accounting, or legal advice. You are solely responsible for decisions you make based on information displayed by the App.</p>
                        </section>

                        <section id="sec-3">
                            <h2>3. Using the App</h2>
                            <p>You agree to use the App only for lawful purposes. You must not attempt to gain unauthorized access, reverse engineer or modify the App, distribute malware, or circumvent security controls.</p>
                        </section>

                        <section id="sec-4">
                            <h2>4. Expense Data</h2>
                            <p>You are responsible for the accuracy of information you enter, maintaining appropriate backups, reviewing imported CSV files, and ensuring category assignments are correct.</p>
                        </section>

                        <section id="sec-5">
                            <h2>5. Local Storage and Data</h2>
                            <p>The App is designed primarily as a local/offline application. Expense information and settings are stored locally on your device unless you explicitly enable external integrations like Google Drive.</p>
                        </section>

                        <section id="sec-6">
                            <h2>6. Optional Google Drive Integration</h2>
                            <p>Google Drive synchronization is optional. If enabled, application data will be uploaded or retrieved from your personal Google Drive account. Google services operate under Google's independent terms and privacy policies.</p>
                        </section>

                        <section id="sec-7">
                            <h2>7. CSV Import and Export</h2>
                            <p>Exported CSV files are generated for your personal use. You are responsible for protecting exported files because they contain your personal financial records.</p>
                        </section>

                        <section id="sec-8">
                            <h2>8. Availability</h2>
                            <p>While we strive for reliability, we do not guarantee uninterrupted, error-free operation on every device or operating system version. Features may be modified or suspended from time to time.</p>
                        </section>

                        <section id="sec-9">
                            <h2>9. Data Loss</h2>
                            <p>Because the App is local-first, you are responsible for maintaining your own backups. We are not liable for data loss caused by device failure, uninstallation, OS changes, or corrupted local storage.</p>
                        </section>

                        <section id="sec-10">
                            <h2>10. Intellectual Property</h2>
                            <p>The App design, software, interface, graphics, and documentation are owned by Rohit Shirke unless otherwise stated. You may use the App for personal, non-commercial purposes.</p>
                        </section>

                        <section id="sec-11">
                            <h2>11. Third-Party Services</h2>
                            <p>Third-party integrations (such as Google services) are managed by their respective providers. We are not responsible for third-party availability or policy changes.</p>
                        </section>

                        <section id="sec-12">
                            <h2>12. Future Paid Features</h2>
                            <p>The App is currently free. Should paid features or subscriptions be introduced in the future, explicit terms and pricing will be provided prior to any purchase.</p>
                        </section>

                        <section id="sec-13">
                            <h2>13. Disclaimer of Warranties</h2>
                            <p>To the maximum extent permitted by law, the App is provided on an <strong>"as is" and "as available"</strong> basis without warranties of any kind.</p>
                        </section>

                        <section id="sec-14">
                            <h2>14. Limitation of Liability</h2>
                            <p>To the maximum extent permitted by applicable law, Rohit Shirke shall not be liable for indirect, incidental, or consequential losses (including loss of data or financial decisions) arising from your use of the App.</p>
                        </section>

                        <section id="sec-15">
                            <h2>15. Changes to the App & Terms</h2>
                            <p>We may modify the App or update these Terms. Updated Terms become effective upon posting with an updated "Last Updated" date.</p>
                        </section>

                        <section id="sec-16">
                            <h2>16. Termination</h2>
                            <p>You may stop using the App at any time by uninstalling it. We reserve the right to restrict access in cases involving security risks or violation of these Terms.</p>
                        </section>

                        <section id="sec-17">
                            <h2>17. Governing Law</h2>
                            <p>These Terms shall be governed by and interpreted in accordance with applicable laws of India.</p>
                        </section>

                        <section id="sec-18">
                            <h2>18. Contact</h2>
                            <p>If you have questions regarding these Terms & Conditions, please contact us:</p>
                            <ul>
                                <li><strong>Developer / Company:</strong> Rohit Shirke</li>
                                <li><strong>Website:</strong> <a href="https://shirkerohit.github.io" target="_blank" rel="noopener noreferrer">https://shirkerohit.github.io</a></li>
                            </ul>
                        </section>

                        <section id="sec-19">
                            <h2>19. Entire Agreement</h2>
                            <p>These Terms, together with the Privacy Policy, constitute the full agreement regarding your use of Expense Tracker.</p>
                        </section>

                        <div className="legal-nav-footer">
                            <div>
                                <span>Related Document:</span>
                                <h4>Privacy Policy</h4>
                            </div>
                            <Link to="/projects/expense-tracker/privacy" className="btn btn-secondary">
                                Read Privacy Policy &rarr;
                            </Link>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}
