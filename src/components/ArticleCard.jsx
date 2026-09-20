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
            <p className="article-meta">{formatDate(article.pubDate)}</p>
            <h3>{article.title}</h3>
            <p>{article.preview}</p>
        </a>
    );
}
