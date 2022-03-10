import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/public/index.html";
}

const articleUrl = baseUrl + "articles/" + id;

console.log(articleUrl);

const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");
const idInput = document.querySelector("#id");

(async function () {
  try {
    const response = await fetch(articleUrl);
    const json = await response.json();

    console.log(json);

    title.value = json.title;
    summary.value = json.summary;
    author.value = json.author;
    idInput.value = json.id;
  } catch (error) {
    console.log(error);
  }
})();

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();
  message.innerHTML = "";

  const titleValue = title.value.trim();
  const summaryValue = summary.value.trim();
  const authorValue = author.value.trim();
  const idValue = idInput.value;

  if (
    titleValue.length === 0 ||
    summaryValue.length === 0 ||
    authorValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "All inputs must have at least one character",
      ".message-container"
    );
  }
  updateArticle(titleValue, summaryValue, authorValue, idValue);
}

async function updateArticle(title, summary, author, id) {
  const url = baseUrl + "articles/" + id;

  const data = JSON.stringify({
    title: title,
    summary: summary,
    author: author,
  });

  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.updated_at) {
      displayMessage(
        "success",
        `You have successfully updated article: ${json.title}`,
        ".message-container"
      );
    }
    if (json.error) {
      displayMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
