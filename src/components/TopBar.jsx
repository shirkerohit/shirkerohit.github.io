import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function TopBar({ variant, theme, onToggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };
        const closeOnOutsideClick = (event) => {
            if (navRef.current?.contains(event.target)) {
                return;
            }
            if (event.target.closest?.('.hamburger')) {
                return;
            }
            setMenuOpen(false);
        };

        document.addEventListener('keydown', closeOnEscape);
        document.addEventListener('pointerdown', closeOnOutsideClick);
        return () => {
            document.removeEventListener('keydown', closeOnEscape);
            document.removeEventListener('pointerdown', closeOnOutsideClick);
        };
    }, [menuOpen]);

    return (
        <header className="topbar">
            <div className="topbar-inner">
                <div className="brand-group">
                    <Link className="brand" to="/">
                        Rohit Shirke
                    </Link>
                    <p className="brand-subtitle">Architecture / engineering</p>
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
                        aria-controls="primary-navigation"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                <nav
                    ref={navRef}
                    id="primary-navigation"
                    className={`nav-links ${menuOpen ? 'is-open' : ''}`}
                    aria-label="Primary navigation"
                >
                    {variant === 'home' ? (
                        <>
                            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                            <a href="#writing" onClick={() => setMenuOpen(false)}>Writing</a>
                            {/* <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link> */}
                            <Link to="/bookshelf" onClick={() => setMenuOpen(false)}>Bookshelf</Link>
                            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                        </>
                    ) : (
                        <>
                            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                            <Link to="/writing" onClick={() => setMenuOpen(false)}>Writing</Link>
                            {/* <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link> */}
                            <Link to="/bookshelf" onClick={() => setMenuOpen(false)}>Bookshelf</Link>
                            <Link to="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
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
