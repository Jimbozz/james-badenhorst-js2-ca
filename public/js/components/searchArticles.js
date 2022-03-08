import { createHtml } from "./createHtml.js";

export function searchArticles(articles) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    const searchValue = event.target.value;
    const safeSearchValue = searchValue.trim().toLowerCase();

    const filteredArticles = articles.filter(function (article) {
      const articleTitle = article.title.trim().toLowerCase();

      if (articleTitle == safeSearchValue) {
        return true;
      }
      if (searchValue === "") {
        return true;
      } else {
        return false;
      }
    });
    createHtml(filteredArticles);
  };
}
