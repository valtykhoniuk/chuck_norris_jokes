import { ChuckAPI } from "../api/chuck.js";
import { createJokeCard } from "../ui/components/JokeCard.js";

const form = document.querySelector("form");

const leftColumn = document.querySelector(".left-column");
const container = document.createElement("div");
container.className = "jokes-block";
leftColumn.appendChild(container);

let selectedCategory = null;
const categoryLabel = form.querySelector(".category-label");
const categoryList = document.createElement("div");
categoryList.classList.add("category-list", "hidden");
const categories = await ChuckAPI.getCategories();

const inputSearch = document.createElement("div");
inputSearch.classList.add("search-bar", "hidden");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Enter a keyword...";
searchInput.classList.add("search-input");

inputSearch.appendChild(searchInput);
const searchLabel = form.querySelector(".search-label");
searchLabel.insertAdjacentElement("afterend", inputSearch);

form.addEventListener("change", () => {
  const selected = form.querySelector(
    'input[name="search-type"]:checked'
  )?.value;

  if (selected === "category") {
    showCategories();
  } else {
    hideCategories();
  }

  if (selected === "search") {
    showSearchBar();
  } else {
    hideSearchBar();
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const type = form.querySelector("input[name='search-type']:checked")?.value;
  if (!type) return alert("Choose a joke type");

  let data;

  if (type === "random") {
    data = await ChuckAPI.getRandom();
    container.appendChild(createJokeCard(data, false));
  } else if (type === "category") {
    if (!selectedCategory) return alert("Choose a category first!");
    data = await ChuckAPI.getByCategory(selectedCategory);
    container.appendChild(createJokeCard(data, false));
  } else if (type === "search") {
    let query = searchInput.value.trim();
    if (!query) return alert("Enter a search term first!");
    data = await ChuckAPI.getBySearchInput(query);

    if (data.result && data.result.length > 0) {
      data.result.forEach((joke) => {
        container.appendChild(createJokeCard(joke, false));
      });
    } else {
      alert("No jokes were found");
    }
  }
});

function showCategories() {
  if (!categoryLabel.nextElementSibling?.classList.contains("category-list")) {
    categoryLabel.insertAdjacentElement("afterend", categoryList);
  }

  categoryList.innerHTML = "";

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("category-btn");
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      selectedCategory = cat;

      document
        .querySelectorAll(".category-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });

    categoryList.appendChild(btn);
  });

  categoryList.classList.remove("hidden");
}

function hideCategories() {
  categoryList.classList.add("hidden");
  selectedCategory = null;
}

function showSearchBar() {
  inputSearch.classList.remove("hidden");
}

function hideSearchBar() {
  inputSearch.classList.add("hidden");
}
