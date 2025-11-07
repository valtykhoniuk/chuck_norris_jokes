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

form.addEventListener("change", () => {
  const selected = form.querySelector(
    'input[name="search-type"]:checked'
  )?.value;

  if (selected === "category") {
    showCategories();
  } else {
    hideCategories();
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const type = form.querySelector("input[name='search-type']:checked")?.value;
  if (!type) return alert("Choose a joke type");

  let data;

  if (type === "random") {
    data = await ChuckAPI.getRandom();
  } else if (type === "category") {
    if (!selectedCategory) return alert("Choose a category first!");
    data = await ChuckAPI.getByCategory(selectedCategory);
  }

  container.appendChild(createJokeCard(data, false));
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
