var articles = {};
var lastSaved = null;
const REFRESH_INTEVAL = (2 * 60 * 60 * 1000); // 2 hours

window.onload = () => {
    let refresh = true;

    if (checkIfStorageSupported()) {
        articles = localStorage.getItem('articles');
        refresh = refreshFeed();
    }
    articles = null;
    if (articles == null || refresh == true) {
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
                let keys = ['title', 'thumbnail', 'pubDate', 'link', 'content']
                var newList = items.map(element => {
                    if (element.categories.length > 0) {
                        let obj = {};
                        keys.map((i, j) => {
                            if (i == "content") {
                                content = element[i];
                                element[i] = content.slice(0, 300).concat(" ...");
                                // element[i] = element[i].replace(/<figure>/g, "").replace(/<img[^>]*>/g, ""); //wip
                            }
                            obj[i] = element[i];
                        })
                        return obj;
                    }
                });
                items = null;
                newList = newList.filter(element => {
                    return element != null;
                });

                if (typeof Storage != undefined) {
                    localStorage.setItem('lastSaved', new Date())
                    localStorage.setItem('articles', JSON.stringify(newList))
                }
                parseAndShowArticles(JSON.stringify(newList));
            });
        });
    } else {
        parseAndShowArticles(articles);
    }
}

function parseAndShowArticles(obj) {
    obj = JSON.parse(obj);
    let div = document.getElementById('medium-articles');
    div.innerHTML = "";
    obj.map(element => {
        div.innerHTML += `<div class="medium-articles-div"><div class="medium-articles-subdiv"><a href="${element.link}" target="_blank">${element.title}</a></p><p class="medium-pub-date">Published on : ${element.pubDate}</div></div>`;
    });
}

function checkIfStorageSupported() {
    if (typeof Storage != undefined) {
        return true;
    }
    return false;
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
