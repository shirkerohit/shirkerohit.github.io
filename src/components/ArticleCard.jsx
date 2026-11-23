function formatDate(value) {
    if (!value) {
        return '';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
        return value;
    }

    return parsed.toLocaleDateString('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function ArticleCard({ article }) {
    return (
        <a className="article-card" href={article.link} target="_blank" rel="noreferrer">
            <time className="article-meta" dateTime={article.pubDate}>{formatDate(article.pubDate)}</time>
            <h3>{article.title}</h3>
            <p>{article.preview}</p>
            {article.categories && article.categories.length > 0 && (
                <div className="article-tags">
                    {article.categories.slice(0, 3).map((tag) => (
                        <span key={tag} className="article-tag">{tag}</span>
                    ))}
                </div>
            )}
        </a>
    );
}
