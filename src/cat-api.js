import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hpDxNWtuIHgI2hQ0umNyMz8MUXCLnpLObNOexE0JM5utYSQTKqi74y84ybiTShfK";

const url = "https://api.thecatapi.com/v1/breeds";

function fetchBreeds() {
  return axios.get(url).then((response) => {
    const data = response.data;
    const filteredBreeds = data.filter((breed) => breed.image?.url != null);
    return filteredBreeds;
  });
}

function fetchCatByBreed(breedId) {
  const breedUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(breedUrl).then((response) => {
    const catData = response.data[0];
    return catData;
  });
}

export { fetchBreeds, fetchCatByBreed };