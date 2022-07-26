let news = [];
let today = new Date();
let todayFormat = document.getElementById("today-format");

let year = today.getFullYear();
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month = months[today.getMonth()];
let date = ('0' + today.getDate()).slice(-2);
const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let day = week[today.getDay()];

let dateString = day + ', ' + month + ' ' + date  + ', ' + year;

todayFormat.textContent = `${dateString}`;

const getLatestNews = async () => {
    let url= new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=15`);
    let url_sub= new URL(`https://api.newscatcherapi.com/v2/search?q=Apple&from='2022/7/15'&countries=CA&page_size=15`);

    let header = new Headers({"x-api-key":"5aig2uQWkrzp3yUZvMDmeu7jFpEubqONvxofVMKFABs"});
    
    let response = await fetch(url, {headers:header});
    let data = await response.json();

    let response_sub = await fetch(url_sub, {headers:header});
    let data_sub = await response_sub.json();
    
    news = data.articles;
    news_sub = data_sub.articles;

    render();
};

const render = () => {
    let newsHTML = '';
    let newsHTML_sub = '';

    newsHTML = news.map((item) => { 
        return `
        <div class="row left-news">
            <div class="col-4 layout">
                <div>
                    <div class="main-title">${item.title}</div>
                    <div class="sub-title">${
                        item.summary == null || item.summary == ""
                        ? ""
                        : item.summary.length > 200
                        ? item.summary.substring(0, 200) + "..."
                        : item.summary
                    }</div>
                </div>
            </div>
            <div class="col-8">
                <img class="news-img-size" src="${item.media}"/>
                <div class="news-rights">${item.rights}</div>
            </div>
        </div>
    `
    }).join('');

    newsHTML_sub = news_sub.map((item_sub) => { 
        return `
        <div class="row right-news">
            <img class="news-img-size" src="${item_sub.media}"/>
            <div class="news-rights">${item_sub.rights}</div>
            <div class="main-title">${item_sub.title}</div>
            <div class="sub-title">${
                item_sub.summary == null || item_sub.summary == ""
                ? ""
                : item_sub.summary.length > 100
                ? item_sub.summary.substring(0, 100) + "..."
                : item_sub.summary
            }</div>
        </div>
    `
    }).join('');

    document.getElementById("left-news-board").innerHTML = newsHTML;
    document.getElementById("right-news-board").innerHTML = newsHTML_sub;
};

getLatestNews();

