import { baseUrl } from "./settings/api.js";
import { createHtml } from "./components/createHtml.js";
import displayMessage from "./components/displayMessage.js";
import { searchArticles } from "./components/searchArticles.js";

const articleUrl = baseUrl + "articles";

// (async function () {
//   const container = document.querySelector(".article-container");

//   try {
//     const response = await fetch(articleUrl);
//     const json = await response.json();

//     container.innerHTML = "";

//     json.forEach(function (article) {
//       container.innerHTML += `<div class="article-item">
//       <h3>${article.title}</h3>
//       <p>${article.summary}</p>
//       <h5>Author: ${article.author}</h5>
//       <i class="far fa-heart"></i>
//       </div>`;
//     });

//     console.log(json);
//   } catch (error) {
//     console.log(error);
//   }
// })();

async function callApi() {
  try {
    const response = await fetch(articleUrl);
    const json = await response.json();
    console.log(json);

    createHtml(json);
    searchArticles(json);
  } catch (error) {
    console.log(error);
    displayMessage(
      "error",
      "There was an error loading, please reload the page.",
      ".article-container"
    );
  }
}

callApi();
