import { getToken } from "../../utils/storage.js";
import { baseUrl } from "../../settings/api.js";

export default function deleteArticle(id) {
  const container = document.querySelector(".delete-container");

  container.innerHTML = `<button type="button" class="delete-btn">Delete</button>`;

  const button = document.querySelector(".delete-btn");

  button.onclick = async function () {
    const deleteCheck = confirm(
      "Are you sure you want to delete this article?"
    );
    console.log(deleteCheck);

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
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}
