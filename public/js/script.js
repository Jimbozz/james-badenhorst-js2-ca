import { baseUrl } from "./settings/api.js";
import { createHtml } from "./components/createHtml.js";
import displayMessage from "./components/displayMessage.js";
import { searchArticles } from "./components/searchArticles.js";
import createMenu from "./components/createMenu.js";
// import { getToken } from "./utils/storage.js";

// const tokenValue = getToken();
const articleUrl = baseUrl + "articles";

createMenu();

(async function callApi() {
  try {
    const response = await fetch(articleUrl);
    const json = await response.json();
    console.log(json);

    // if (!tokenValue) {
    //   location.href = "/public/login.html";
    // }

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
