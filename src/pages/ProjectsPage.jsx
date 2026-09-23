import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { PROJECTS } from '../data/projects';

export default function ProjectsPage({ theme, onToggleTheme }) {
    useEffect(() => {
        document.title = 'Projects | Rohit Shirke';
    }, []);

    return (
        <>
            <TopBar variant="inner" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="projects-page">
                <section className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Projects</p>
                        <h1>Things I've built, maintained, and contributed to.</h1>
                        <p className="section-sub">
                            A showcase of applications, developer tools, and privacy-focused services I'm actively building.
                        </p>
                    </div>

                    <div className="project-grid">
                        {PROJECTS.map((project) => (
                            <div key={project.id} className="project-card">
                                <div className="project-card-header">
                                    <span className="project-icon">{project.icon}</span>
                                    <span className="project-status-badge">{project.status}</span>
                                </div>
                                <h2>{project.name}</h2>
                                <p className="project-tagline">{project.tagline}</p>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="tag-pill">{tag}</span>
                                    ))}
                                </div>
                                <div className="project-actions">
                                    <Link to={project.path} className="btn btn-primary">
                                        View Project Page &rarr;
                                    </Link>
                                    <div className="project-sub-links">
                                        <Link to={project.privacyPath}>Privacy Policy</Link>
                                        <span className="dot-separator">•</span>
                                        <Link to={project.termsPath}>Terms & Conditions</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
