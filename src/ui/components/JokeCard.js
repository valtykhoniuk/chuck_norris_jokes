import { favoritesModel } from "../../app/favorites.js";
import { storage } from "../../utils/storage.js";

export function createJokeCard(joke, isFavourite = false) {
  const card = createCardTemplate(joke, isFavourite);

  const favButton = card.querySelector(".fav-btn");

  favButton.addEventListener("click", () => {
    isFavourite = !isFavourite;
    favButton.textContent = isFavourite ? "♥" : "♡";

    if (isFavourite) {
      favoritesModel.add(joke);
      document.dispatchEvent(new CustomEvent("favoritesUpdated"));
    } else {
      favoritesModel.remove(joke.id);
      document.dispatchEvent(new CustomEvent("favoritesUpdated"));
    }
  });

  return card;
}

function createCardTemplate(joke, isFavourite) {
  const card = document.createElement("div");
  card.className = "joke-card";

  const idParagraph = document.createElement("p");
  idParagraph.id = "joke-id";
  idParagraph.textContent = joke.id;

  const valueParagraph = document.createElement("p");
  valueParagraph.textContent = joke.value;

  const metaDiv = document.createElement("div");
  metaDiv.classList.add("joke-meta");

  const favButton = document.createElement("button");
  favButton.classList.add("fav-btn");
  favButton.textContent = isFavourite ? "♥" : "♡";

  metaDiv.appendChild(favButton);
  card.append(idParagraph, valueParagraph, metaDiv);

  return card;
}
