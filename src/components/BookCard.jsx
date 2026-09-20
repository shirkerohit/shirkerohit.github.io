export default function BookCard({ book }) {
    return (
        <div className="book-card">
            <div className="book-card-top">
                {book.amazon ? (
                    <a href={book.amazon} target="_blank" rel="noreferrer" className="book-title-link">
                        <h5>{book.title}</h5>
                        <span className="book-arrow">&rarr;</span>
                    </a>
                ) : (
                    <h5>{book.title}</h5>
                )}
            </div>
            <p className="book-author">
                {book.author}
                {book.category && <span className="book-category">{book.category}</span>}
            </p>
        </div>
    );
}
