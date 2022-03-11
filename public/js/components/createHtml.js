import { getWishes } from "../utils/wishFunction.js";

export function createHtml(renderArticles) {
  const container = document.querySelector(".article-container");

  container.innerHTML = "";

  if (renderArticles.length === 0) {
    container.innerHTML = `<div class="message error">There are no articles with that name. Please try another name.<div>`;
  }

  renderArticles.forEach(function (article) {
    let cssClass = "far";
    const favourites = getWishes();

    const doesObjectExist = favourites.find(function (fav) {
      return parseInt(fav.id) === article.id;
    });

    if (doesObjectExist) {
      cssClass = "fas";
    }

    container.innerHTML += `<div class="article-item">
      <h3>${article.title}</h3>
      <p>${article.summary}</p>
      <h5>Author: ${article.author}</h5>
      <div class="article-icons">
        <i class="${cssClass} fa-heart fa-lg" data-id="${article.id}" data-title="${article.title}" data-author="${article.author}" data-summary="${article.summary}"></i>
        <a class="edit-btn" href="/public/edit.html?id=${article.id}">Edit</a>
      </div>
      </div>`;

    const favButton = document.querySelectorAll(".article-item i");

    favButton.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    function handleClick() {
      this.classList.toggle("far");
      this.classList.toggle("fas");

      const id = this.dataset.id;
      const title = this.dataset.title;
      const summary = this.dataset.summary;
      const author = this.dataset.author;

      const currentFavs = getWishes();

      const articleExists = currentFavs.find(function (fav) {
        return fav.id === id;
      });
      if (articleExists === undefined) {
        const article = {
          id: id,
          title: title,
          author: author,
          summary: summary,
        };
        currentFavs.push(article);
        saveFavs(currentFavs);
      } else {
        const newFavs = currentFavs.filter((fav) => fav.id !== id);
        saveFavs(newFavs);
      }
    }
    function saveFavs(favs) {
      localStorage.setItem("favourites", JSON.stringify(favs));
    }
  });
}
