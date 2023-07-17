import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breed_select');
  const loader = document.getElementById('loader');

  breedSelect.innerHTML = '<option disabled selected>Виберіть породу</option>';

  let slimSelect;

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        let option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      slimSelect = new SlimSelect({
        select: breedSelect,
        placeholder: 'Виберіть породу',
        showSearch: false
      });

      breedSelect.addEventListener('change', event => {
        const breedId = event.target.value;
        showBreedImage(breedId);
      });

      showBreedImage(breeds[0].id);
    })
    .catch(error => {
      console.log(error);
    });

  function showBreedImage(breedId) {
    if (loader) {
      loader.style.display = 'block';
    }

    breedSelect.disabled = true;

    fetchCatByBreed(breedId)
      .then(catData => {
        const breedImage = document.getElementById('breed_image');
        breedImage.src = catData.url;

        const breedJson = document.getElementById('breed_json');
        breedJson.textContent = catData.breeds[0].description || 'Description not available';

        const wikiLink = document.getElementById('wiki_link');
        wikiLink.href = catData.wikipedia_url;
        wikiLink.innerHTML = catData.wikipedia_url;
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        if (loader) {
          loader.style.display = 'none';
        }

        breedSelect.disabled = false;
      });
  }
});
