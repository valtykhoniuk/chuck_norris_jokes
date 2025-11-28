import { choiceUIHandlers, renderCategories } from "./ui.js";
import { searchHandlers, renderFavorites } from "./model.js";

const form = document.querySelector("form");
const categoryList = form.querySelector(".category-list");
const searchInput = document.querySelector(".search-input");

const container = document.querySelector(".jokes-block");
const favoritesContainer = document.querySelector(".favorite-block__jokes");

const selectedCategoryRef = { value: null };

const burgerBtn = document.querySelector(".burger-btn");
const rightColumn = document.querySelector(".right-column");

burgerBtn.addEventListener("click", () => {
  rightColumn.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  renderFavorites(favoritesContainer);
});

document.addEventListener("favoritesUpdated", () => {
  renderFavorites(favoritesContainer);
});

form.addEventListener("change", async () => {
  const selected = form.querySelector(
    'input[name="search-type"]:checked'
  )?.value;

  if (choiceUIHandlers[selected]) {
    await choiceUIHandlers[selected](
      selectedCategoryRef,
      categoryList,
      searchInput
    );
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const type = form.querySelector("input[name='search-type']:checked")?.value;
  if (!type) return alert("Choose a joke type");

  if (searchHandlers[type]) {
    await searchHandlers[type](
      container,
      selectedCategoryRef.value,
      searchInput
    );
  }
});
