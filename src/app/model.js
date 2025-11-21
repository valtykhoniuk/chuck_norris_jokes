import { ChuckAPI } from "../api/chuck.js";
import { createJokeCard } from "../ui/components/JokeCard.js";
import { favoritesModel } from "./favorites.js";

export const searchHandlers = {
  random: async (container) => {
    const data = await ChuckAPI.getRandom();
    if (data) {
      renderJokes(container, [data]);
    } else {
      renderNoData(container);
    }
  },

  category: async (container, selectedCategory) => {
    if (!selectedCategory) return alert("Choose a category first!");
    const data = await ChuckAPI.getByCategory(selectedCategory);
    if (data) {
      renderJokes(container, [data]);
    } else {
      renderNoData(container);
    }
  },

  search: async (container, _, searchInput) => {
    const query = searchInput.value.trim();
    if (!query) return alert("Enter a search term first!");

    const data = await ChuckAPI.getBySearchInput(query);
    if (data.result && data.result.length > 0) {
      renderJokes(container, data.result);
    } else {
      renderNoData(container);
    }
  },
};

export function renderJokes(container, jokes) {
  jokes.forEach((joke) => container.appendChild(createJokeCard(joke, false)));
}

export function renderNoData(container) {
  container.innerHTML = "";
  const msg = document.createElement("p");
  msg.textContent = "No jokes were found";
  msg.classList.add("no-jokes");
  container.appendChild(msg);
}

export function renderFavorites(container) {
  container.innerHTML = "";
  const favorites = favoritesModel.getAll();

  if (favorites.length === 0) {
    container.textContent = "No favorite jokes yet 😅";
    return;
  }
  favorites.forEach((joke) => {
    container.appendChild(createJokeCard(joke, true));
  });
}
