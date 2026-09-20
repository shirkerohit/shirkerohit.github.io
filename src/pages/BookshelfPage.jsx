import TopBar from '../components/TopBar';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import books from '../data/books.json';

export default function BookshelfPage({ theme, onToggleTheme }) {
    return (
        <>
            <TopBar variant="inner" theme={theme} onToggleTheme={onToggleTheme} />
            <main className="writing-page">
                <section className="section">
                    <div className="section-heading">
                        <p className="eyebrow">Bookshelf</p>
                        <h3>Books that shaped how I think about systems, leadership, and life.</h3>
                    </div>
                    <div className="bookshelf-grid">
                        <div className="bookshelf-category">
                            <h4>Technical</h4>
                            <div className="book-list">
                                {books.technical.map((book) => (
                                    <BookCard key={book.title} book={book} />
                                ))}
                            </div>
                        </div>
                        <div className="bookshelf-category">
                            <h4>Non-Technical</h4>
                            <div className="book-list">
                                {books.nonTechnical.map((book) => (
                                    <BookCard key={book.title} book={book} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
