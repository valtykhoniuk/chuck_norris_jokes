import { choiceUIHandlers } from "./ui.js";
import { searchHandlers } from "./model.js";

const form = document.querySelector("form");
const container = document.querySelector(".jokes-block");
const categoryList = form.querySelector(".category-list");
const searchInput = document.querySelector(".search-input");

const selectedCategoryRef = { value: null };

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
