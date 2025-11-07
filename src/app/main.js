import { ChuckAPI } from "../api/chuck.js";
import { createJokeCard } from "../ui/components/JokeCard.js";

const form = document.querySelector("form");

const leftColumn = document.querySelector(".left-column");
const container = document.createElement("div");
container.className = "jokes-block";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const type = form.querySelector("input[name='search-type']:checked")?.value;
  if (!type) return alert("Choose a joke type");

  let data;
  if (type === "random") data = await ChuckAPI.getRandom();

  container.appendChild(createJokeCard(data, false));
});

leftColumn.appendChild(container);
