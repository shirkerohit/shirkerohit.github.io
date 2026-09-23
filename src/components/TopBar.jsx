import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TopBar({ variant, theme, onToggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="topbar">
            <div className="topbar-inner">
                <div className="brand-group">
                    <Link className="brand" to="/">
                        Rohit Shirke
                    </Link>
                </div>

                <div className="topbar-controls">
                    <button
                        type="button"
                        className="theme-toggle mobile-theme-toggle"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? '☾' : '☀'}
                    </button>
                    <button
                        type="button"
                        className={`hamburger ${menuOpen ? 'is-open' : ''}`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
                    {variant === 'home' ? (
                        <>
                            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                            <a href="#writing" onClick={() => setMenuOpen(false)}>Writing</a>
                            <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                            <Link to="/bookshelf" onClick={() => setMenuOpen(false)}>Bookshelf</Link>
                            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                        </>
                    ) : (
                        <>
                            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                            <Link to="/writing" onClick={() => setMenuOpen(false)}>Writing</Link>
                            <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                            <Link to="/bookshelf" onClick={() => setMenuOpen(false)}>Bookshelf</Link>
                            <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                        </>
                    )}
                    <button
                        type="button"
                        className="theme-toggle desktop-theme-toggle"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? '☾' : '☀'}
                    </button>
                </nav>
            </div>
        </header>
    );
}
