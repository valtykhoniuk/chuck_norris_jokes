export function createJokeCard(joke, isFavourite = false) {
  const card = document.createElement("div");
  card.className = "joke-card";

  card.innerHTML = `
    <p id="joke-id">${joke.id}</p>
    <p>${joke.value}</p>
    <div class="joke-meta">
      <button class="fav-btn" title="Add to favourites">
        ${isFavourite ? "♥" : "♡"}
      </button>
    </div>
  `;

  const favButton = card.querySelector(".fav-btn");

  favButton.addEventListener("click", () => {
    isFavourite = !isFavourite;
    favButton.textContent = isFavourite ? "♥" : "♡";
  });

  return card;
}
