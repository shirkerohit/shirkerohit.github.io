var articles = {};
var lastSaved = null;
const REFRESH_INTEVAL = (2 * 60 * 60 * 1000); // 2 hours

window.onload = () => {
    let refresh = true;
    let savedArticles = null;

    if (checkIfStorageSupported()) {
        savedArticles = localStorage.getItem('articles');
        refresh = refreshFeed();
    }

    if (savedArticles == null || refresh == true) {
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40rohit-shirke', {
            method: 'get',
            accepts: {
                json: "application/json"
            },
            headers: {
                "Content-type": "application/json",
            }
        }).then((response) => {
            response.text().then((res) => {
                let json = JSON.parse(res);
                let items = json.items;
                let keys = ['title', 'thumbnail', 'pubDate', 'link', 'content'];
                let newList = items.map(element => {
                    if (element.categories && element.categories.length > 0) {
                        let obj = {};
                        keys.forEach((i) => {
                            if (i === 'content') {
                                const content = element[i] || '';
                                obj[i] = content;
                            } else {
                                obj[i] = element[i];
                            }
                        });
                        return obj;
                    }
                    return null;
                }).filter(Boolean);

                if (checkIfStorageSupported()) {
                    localStorage.setItem('lastSaved', new Date().toString());
                    localStorage.setItem('articles', JSON.stringify(newList));
                }
                parseAndShowArticles(JSON.stringify(newList));
            });
        });
    } else {
        parseAndShowArticles(savedArticles);
    }

    loadPageTheme();
}

function loadPageTheme() {
    let theme = localStorage.getItem('theme');
    if (theme == "dark") {
        setDarkMode();
    } else {
        setLightMode();
    }
}

function setLightMode() {
    document.body.classList.remove('dark-mode');
    document.querySelector('nav').classList.remove('dark-mode');
    const icon = document.getElementById('dark-mode-icon');
    if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', 'light');
}

function setDarkMode() {
    document.body.classList.add('dark-mode');
    document.querySelector('nav').classList.add('dark-mode');
    const icon = document.getElementById('dark-mode-icon');
    if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    localStorage.setItem('theme', 'dark');
}

function toggleDarkMode() {
    let theme = localStorage.getItem('theme');
    if (theme == "light" || theme == undefined) {
        setDarkMode();
    } else {
        setLightMode();
    }
}

function parseAndShowArticles(obj) {
    const parsedArticles = typeof obj === 'string' ? JSON.parse(obj) : obj;
    const containers = document.querySelectorAll('#medium-articles, #articles-list');

    containers.forEach((container) => {
        container.innerHTML = '';

        if (!parsedArticles || parsedArticles.length === 0) {
            container.innerHTML = '<p class="medium-article-summary">Articles will appear here soon.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        parsedArticles.forEach((element) => {
            const card = document.createElement('article');
            card.className = 'medium-articles-div';
            const summary = stripHtml(element.content || '').replace(/\s+/g, ' ').trim();
            const preview = summary.length > 140 ? `${summary.slice(0, 137)}...` : summary;
            card.innerHTML = `
                <a href="${element.link}" target="_blank" rel="noopener noreferrer">${element.title}</a>
                <p class="medium-article-summary">${preview}</p>
                <p class="medium-pub-date">${formatDate(element.pubDate)}</p>
            `;
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    });
}

function stripHtml(value) {
    if (!value) {
        return '';
    }

    const element = document.createElement('div');
    element.innerHTML = value;
    return (element.textContent || element.innerText || '').trim();
}

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
        year: 'numeric'
    });
}

function checkIfStorageSupported() {
    return typeof Storage !== 'undefined';
}

function refreshFeed() {
    let lastSaved = localStorage.getItem('lastSaved');
    if (lastSaved) {
        let today = Date.parse(new Date());
        let saved = Date.parse(lastSaved);
        let timeDiff = (today - saved) / REFRESH_INTEVAL;
        if ((timeDiff != null || timeDiff != undefined) && timeDiff > 1) {
            return true;
        }
        return false;
    }
    return true;
}

// Adjust the width of the typewriter element on mobile
window.addEventListener('load', () => {
    const typewriter = document.querySelector('.typewriter h4');
    if (window.innerWidth <= 768 && typewriter) {
        typewriter.style.width = `${typewriter.scrollWidth}px`;
    }
});
