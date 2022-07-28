let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByTopic(event)));

let searchButton = document.getElementById("search-button");

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openInputBox = () => {
    let inputArea = document.getElementById("input-area");

    if(inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

const getLatestNews = async () => {
    let url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=10`
    );
    let header = new Headers({
        "x-api-key": "5aig2uQWkrzp3yUZvMDmeu7jFpEubqONvxofVMKFABs"
    });

    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log(news);

    render();
};

const getNewsByTopic = async () => {
    let topic = event.target.textContent.toLowerCase();
    let url = new URL(
        `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&&page_size=10&topic=${topic}`
    );
    let header = new Headers({
        "x-api-key": "5aig2uQWkrzp3yUZvMDmeu7jFpEubqONvxofVMKFABs"
    });

    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log(news);

    render();
};

const getNewsBySearch = async () => {
    let searchInput = document.getElementById("search-input").value;
    console.log("key", searchInput);
    let url = new URL(
        `https://api.newscatcherapi.com/v2/search?q=${searchInput}&countries=US&page_size=10`
    );
    console.log("check", searchInput.textContent);
    let header = new Headers({
        "x-api-key": "5aig2uQWkrzp3yUZvMDmeu7jFpEubqONvxofVMKFABs"
    });

    let response = await fetch(url, { headers: header });
    let data = await response.json();
    news = data.articles;
    console.log(news);

    render();
};

const render = () => {
    let newsHTML = '';

    newsHTML = news.map((items) => {
        return `
        <div class="row news">
        <div class="col-lg-4">
                        <img class="news-img-size" src="${
                            items.media ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }"/>
                    </div>
                    <div class="col-lg-8">
                        <h2 class="news-title">${items.title}</h2>
                        <p class="news-summary">${
                            items.summary == null || items.summary == ""
                            ? ""
                            : items.summary.length > 200
                            ? items.summary.substring(0, 200) + "..."
                            : items.summary
                        }</p>
                        <div class="rights">${
                            items.rights == null || items.rights == ""
                            ? "no source"
                            : items.right
                        }
                             * ${items.published_date}</div>
                    </div>
                    </div>
        `;
    }).join("");

    document.getElementById("news-board").innerHTML = newsHTML;
};


searchButton.addEventListener("click", getNewsBySearch);
getLatestNews();
