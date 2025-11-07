import { getHttp } from "./http.js";

const URL = "https://api.chucknorris.io/jokes";

export const ChuckAPI = {
  getRandom: () => getHttp(`${URL}/random`),
};
