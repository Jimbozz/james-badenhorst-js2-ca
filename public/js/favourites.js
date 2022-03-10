import { getWishes } from "./utils/wishFunction.js";
import displayMessage from "./components/displayMessage.js";
import { clearStorage } from "./utils/storage.js";
import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";

const favourites = getWishes();

createMenu();

const container = document.querySelector(".article-container");

if (favourites.length === 0) {
  container.innerHTML = `<div class="message error">You have nothing in your favourites right now.<div>`;
}
favourites.forEach(function (favourite) {
  container.innerHTML += `
      <div class="article-item">
        <h3>${favourite.title}</h3>
        <p>${favourite.summary}</p>
        <h5>Author: ${favourite.author}</h5>
        <i class="fas fa-heart fa-lg"></i>
      </div>
    `;
});

const button = document.querySelector(".fav-header button");
button.addEventListener("click", handleClick);

function handleClick() {
  localStorage.removeItem("favourites");
  displayMessage(
    "error",
    "You have nothing in your favourites right now.",
    ".article-container"
  );
}
