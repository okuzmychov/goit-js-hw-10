import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

fetchBreeds()
  .then((breeds) => {
    const breedSelect = document.querySelector(".breed-select");

    breeds.forEach((breed) => {
      let option = document.createElement("option");
      option.value = breed.id;
      option.innerHTML = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.addEventListener("change", (event) => {
      const breedId = event.target.value;
      showBreedImage(breedId);
    });

    showBreedImage(breeds[0].id);
  })
  .catch((error) => {
    console.log(error);
  });

function showBreedImage(breedId) {
  fetchCatByBreed(breedId)
    .then((catData) => {
      const breedImage = document.getElementById("breed_image");
      breedImage.src = catData.url;

      const breedJson = document.getElementById("breed_json");
      breedJson.textContent = catData.description;

      const wikiLink = document.getElementById("wiki_link");
      wikiLink.href = catData.wikipedia_url;
      wikiLink.innerHTML = catData.wikipedia_url;
    })
    .catch((error) => {
      console.log(error);
    });
}

