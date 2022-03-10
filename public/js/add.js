import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

createMenu();

const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const title = document.querySelector("#title");
const summary = document.querySelector("#summary");
const author = document.querySelector("#author");

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const summaryValue = summary.value.trim();
  const authorValue = author.value.trim();

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
  addArticle(titleValue, summaryValue, authorValue);
}

async function addArticle(title, summary, author) {
  const url = baseUrl + "articles";

  const data = JSON.stringify({
    title: title,
    summary: summary,
    author: author,
  });
  const token = getToken();

  const options = {
    method: "POST",
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

    if (json.created_at) {
      displayMessage(
        "success",
        "Successfully created article.",
        ".message-container"
      );
      form.reset();
    }
  } catch (error) {
    console.log(error);
  }
}
