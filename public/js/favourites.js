import { getWishes } from "./utils/wishFunction.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
// import { getToken } from "./utils/storage.js";

const favourites = getWishes();

createMenu();

const container = document.querySelector(".article-container");
const favContainer = document.querySelector(".fav-header");
const button = document.querySelector(".fav-header button");

if (favourites.length === 0) {
  container.innerHTML = `<div class="message warning">You have nothing in your favourites right now.<div>`;
}

if (favourites.length > 0) {
  button.style.display = "inline-block";
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

button.addEventListener("click", handleClick);

function handleClick() {
  const deleteFavs = confirm("Are you sure you want to remove these items?");

  if (deleteFavs) {
    button.style.display = "none";
    localStorage.removeItem("favourites");
    displayMessage(
      "warning",
      "You have nothing in your favourites right now.",
      ".article-container"
    );
  }
}
