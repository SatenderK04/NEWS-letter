const apiKey = "cacd59c545b74e12951d654d98e7697c";
let query = "health";
// let country = "in";
let data;
//
const date = new Date();

let day = date.getDate() - 20;
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${year}-${month}-${day}`;

//
let language = "en";
async function fetchNews() {
  let url = `https://newsapi.org/v2/everything?q=${query}&language=${language}&from=${currentDate}&apiKey=${apiKey}`;
  let response = await fetch(url);
  if (response.ok) {
    data = await response.json();
    console.log(data);
    displayNews(data);
  } else {
    console.log("Error !! Data not fetched properly");
  }
}
fetchNews();
function displayNews(data) {
  let news = "";
  data.articles.forEach((articles) => {
    if (articles.title != "[Removed]" && articles.urlToImage != null) {
      news += `<div class="newscard ">
            <a href="${articles.url}" target="_blank"><img src="${
        articles.urlToImage
      }" alt="image related to article"></a>
            <a href="${articles.url}" target="_blank"><h2 >${
        articles.title
      }</h2></a>
            <p>${articles.publishedAt.slice(0, 10)}</p>
            <p "><a  href="https://www.bbc.com/" target="_blank" class="source">${
              articles.source.name
            }</a></p>
        </div>`;
    }
  });
  document.querySelector(".container").innerHTML = news;
}
let search = document.querySelector(".search");
function searchNews() {
  query = search.value;
  fetchNews();
}
let btn = document.querySelector(".search-icon");
btn.addEventListener("click", () => {
  searchNews();
  search.value = "";
  search.blur();
});

document.querySelector(".search").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    searchNews();
    search.value = "";
    search.blur();
  }
  console.log(e);
});

// filter through given options
let f1 = document.querySelectorAll(".f1");
f1.forEach((i) => {
  i.addEventListener("click", (e) => {
    query = i.innerText;
    fetchNews();
  });
});

let more = document.querySelector(".more");
let morebtn = document.querySelector(".morebtn");
morebtn.addEventListener("click", (e) => {
  more.classList.add("show");
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (!morebtn.contains(e.target)) {
    more.classList.remove("show");
  }
  e.stopPropagation();
});
more.addEventListener("click", (e) => {
  e.stopPropagation();
});
