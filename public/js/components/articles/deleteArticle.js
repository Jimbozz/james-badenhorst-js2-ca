import { getToken } from "../../utils/storage.js";
import { baseUrl } from "../../settings/api.js";
import displayMessage from "../displayMessage.js";

export default function deleteArticle(id) {
  const container = document.querySelector(".delete-container");
  container.innerHTML = `<button type="button" class="delete-btn">Delete</button>`;
  const button = document.querySelector(".delete-btn");
  const value = getToken();

  if (!value) {
    displayMessage(
      "warning",
      "You must be logged in to delete/edit an article.",
      ".message-container"
    );
    button.disabled = true;
  }

  button.onclick = async function () {
    const deleteCheck = confirm(
      "Are you sure you want to delete this article?"
    );

    if (deleteCheck) {
      const url = baseUrl + "articles/" + id;
      const token = getToken();
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "/public/index.html";
      } catch (error) {
        console.log(error);
      }
    }
  };
}
