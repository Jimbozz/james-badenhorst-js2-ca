import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";

const articleUrl = baseUrl + "articles";
console.log(articleUrl);

(async function () {
  const container = document.querySelector(".article-container");

  try {
    const response = await fetch(articleUrl);
    const json = await response.json();

    container.innerHTML = "";

    json.forEach(function (article) {
      container.innerHTML += `<div>
      <h4>${article.title}</h4>
      <p>${article.summary}</p>
      </div>`;
    });

    console.log(json);
  } catch (error) {
    console.log(error);
  }
})();
