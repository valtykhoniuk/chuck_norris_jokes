import { getHttp } from "./http.js";

const URL = "https://api.chucknorris.io/jokes";

export const ChuckAPI = {
  getRandom: () => getHttp(`${URL}/random`),
  getByCategory: (category) => getHttp(`${URL}/random?category=${category}`),
  getCategories: () => getHttp(`${URL}/categories`),
  getBySearchInput: (query) => getHttp(`${URL}/search?query=${query}`),
};
