import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const apiKey = "live_hpDxNWtuIHgI2hQ0umNyMz8MUXCLnpLObNOexE0JM5utYSQTKqi74y84ybiTShfK";

axios.defaults.headers.common["x-api-key"] = apiKey;

fetchBreeds()
  .then((breeds) => {
    for (let i = 0; i < breeds.length; i++) {
      const breed = breeds[i];
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = breed.name;
      document.querySelector(".breed-select").appendChild(option);
    }
    showBreedImage(0, breeds);
  })
  .catch((error) => {
    console.log(error);
  });

function showBreedImage(index, breeds) {
  fetchCatByBreed(breeds[index].id)
    .then((catData) => {
      document.getElementById("breed_image").src = catData?.url;
      document.getElementById("breed_json").textContent = catData?.temperament;
      document.getElementById("wiki_link").href = catData?.wikipedia_url;
      document.getElementById("wiki_link").innerHTML = catData?.wikipedia_url;
    })
    .catch((error) => {
      console.log(error);
    });
}
