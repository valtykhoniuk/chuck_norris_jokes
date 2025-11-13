import { storage } from "../utils/storage.js";

const FAVORITES_KEY = "favoriteJokes";

export const favoritesModel = {
  getAll() {
    return storage.get(FAVORITES_KEY);
  },

  add(joke) {
    const favorites = this.getAll();
    if (!favorites.find((j) => j.id === joke.id)) {
      favorites.push(joke);
      storage.set(FAVORITES_KEY, favorites);
    }
  },

  remove(jokeId) {
    const updated = this.getAll().filter((j) => j.id !== jokeId);
    storage.set(FAVORITES_KEY, updated);
  },

  isFavorite(jokeId) {
    return this.getAll().some((j) => j.id === jokeId);
  },
};
