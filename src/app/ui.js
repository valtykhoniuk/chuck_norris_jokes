import { ChuckAPI } from "../api/chuck.js";

export const choiceUIHandlers = {
  random: (selectedCategoryRef, categoryList, searchInput) => {
    selectedCategoryRef.value = null;
    categoryList.classList.add("hidden");
    searchInput.classList.add("hidden");
  },
  category: async (selectedCategoryRef, categoryList) => {
    await renderCategories(categoryList, (category) => {
      selectedCategoryRef.value = category;
    });
  },
  search: (_, categoryList, searchInput) => {
    searchInput.classList.remove("hidden");
    categoryList.classList.add("hidden");
  },
};

export async function renderCategories(categoryList, onSelectCategory) {
  const categories = await ChuckAPI.getCategories();
  categoryList.innerHTML = "";

  categories.forEach((category) => {
    const categoryBtn = createCategoryElement(
      category,
      categoryList,
      onSelectCategory
    );
    categoryList.append(categoryBtn);
  });

  categoryList.classList.remove("hidden");
}

export function createCategoryElement(
  category,
  categoryList,
  onSelectCategory
) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("category-btn");
  btn.textContent = category;

  btn.addEventListener("click", () => {
    categoryList
      .querySelectorAll(".category-btn")
      .forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");
    if (onSelectCategory) onSelectCategory(category);
  });

  return btn;
}
