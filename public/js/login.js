import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import createMenu from "./components/createMenu.js";
// import { displayMessage, createMenu } from "./components";

const message = document.querySelector(".message-container");
const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

createMenu();

form.addEventListener("submit", formSubmit);

function formSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  console.log(usernameValue);
  console.log(passwordValue);

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage(
      "warning",
      "Invalid value. There must be at least one character in each input.",
      ".message-container"
    );
  }

  executeLogin(usernameValue, passwordValue);
}

async function executeLogin(username, password) {
  const url = baseUrl + "auth/local";
  console.log(url);

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/public/index.html";
    }

    if (json.error) {
      displayMessage("warning", "Invalid login details", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
