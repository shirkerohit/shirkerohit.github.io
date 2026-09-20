import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

export default function ProjectsPage({ theme, onToggleTheme }) {
    return (
        <>
            <TopBar variant="inner" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="writing-page">
                <section className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Projects</p>
                        <h3>Things I've built, maintained, and contributed to.</h3>
                    </div>
                    <div className="project-list">
                        {/* Add projects here */}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
