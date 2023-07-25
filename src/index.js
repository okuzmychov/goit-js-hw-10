import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breed_select');
  const catImage = document.getElementById('breed_image');
  const catInfo = document.getElementById('breed_json');
  const wikiLink = document.getElementById('wiki_link');
  const loader = document.querySelector('.loader');
  const catError = document.querySelector('.error');

  let slimSelect;

  function showLoader(show) {
    loader.style.display = show ? 'block' : 'none';
  }

  function showError(show) {
    catError.style.display = show ? 'block' : 'none';
  }

  function showBreedImage(breedId) {
    showLoader(true);
    breedSelect.disabled = true;
    catImage.src = '';
    catInfo.textContent = '';
    wikiLink.href = '';

    fetchCatByBreed(breedId)
      .then(catData => {
        if (catData.breeds.length > 0) {
          const breedData = catData.breeds[0];
          catImage.src = catData.url;
          const breedNameElement = document.createElement('h2');
          breedNameElement.textContent = breedData.name;
          catInfo.appendChild(breedNameElement);
          catInfo.innerHTML += `
          <p>${breedData.description || 'Description not available'}</p>
          <h2>Temperament</h2>
          <p>${breedData.temperament || 'Temperament not available'}</p>
        `;
        } else {
          catInfo.textContent = 'No data available for this breed';
        }
      })
      .catch(() => {
        showError(true);
      })
      .finally(() => {
        showLoader(false);
        breedSelect.disabled = false;
      });
  }

  fetchBreeds()
    .then(breeds => {
      breedSelect.innerHTML =
        '<option disabled selected>Виберіть породу</option>';
      breeds.forEach(breed => {
        let option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      slimSelect = new SlimSelect({
        select: breedSelect,
        placeholder: 'Виберіть породу',
        showSearch: false,
      });

      breedSelect.addEventListener('change', event => {
        const breedId = event.target.value;
        showBreedImage(breedId);
      });
    })
    .catch(error => {
      console.log(error);
    });
});
