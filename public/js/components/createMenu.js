import { getUserName } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;
  console.log(pathname);

  const container = document.querySelector(".menu-container");
  const username = getUserName();

  console.log(username);

  let authLink = `<a href="login.html" class="${
    pathname === "/public/login.html" ? "active" : ""
  }">Login</a>`;

  if (username) {
    authLink = `<a href="/public/add.html" class="${
      pathname === "/public/add.html" ? "active" : ""
    }">Add product</a>
    <button id="logout">Logout ${username}</button>`;
  }

  container.innerHTML = `<div class="menu">
  <a href="/public/index.html" class="${
    pathname === "/" || pathname === "/public/index.html" ? "active" : ""
  }">Home</a>
  ${authLink}
  </div>`;

  logoutButton();
}
