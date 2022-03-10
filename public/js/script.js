import { baseUrl } from "./settings/api.js";
import { createHtml } from "./components/createHtml.js";
import displayMessage from "./components/displayMessage.js";
import { searchArticles } from "./components/searchArticles.js";
import createMenu from "./components/createMenu.js";

const articleUrl = baseUrl + "articles";

createMenu();

(async function callApi() {
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
})();
