import { fetchBreeds, fetchCatByBreed } from './cat-api';
import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  const catInfoDiv = document.querySelector('.cat-info.container');
  const errorText = document.querySelector('.error');
  const loaderText = document.querySelector('.loader');
  const select = document.querySelector('.breed-select');
  const delay = 2000;
  errorText.hidden = true;
  select.style.display = 'none';
  // errorText.style.display = 'none';

  axios.defaults.headers.common['x-api-key'] =
    'live_hpDxNWtuIHgI2hQ0umNyMz8MUXCLnpLObNOexE0JM5utYSQTKqi74y84ybiTShfK';
  axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

 Notiflix.Loading.custom('Завантажую...', {
  customSvgUrl:
    'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
});
Notiflix.Loading.remove(delay);
  
  fetchBreeds()
    .then(response => {
      select.hidden = false;
      select.innerHTML = response
        .map(({ id, name }) => {
          return `<option class="option" value="${id}">${name}</option>`;
        })
        .join('');
        select.style.display = 'block';
        slimSelect = new SlimSelect({
        select: '#single',
        settings: {
          showSearch: false,
          searchText: 'Sorry nothing to see here',
          searchPlaceholder: 'Search for the good stuff!',
          searchHighlight: true,
        },
          events: {
          afterChange: newVal => {
            loaderText.hidden = false;
            catInfoDiv.innerHTML = '';
            fetchCatByBreed(newVal[0].value)
              .then(responce => {
                catInfoDiv.innerHTML = responce
                  .map(
                    ({ url, breeds: [{ name, description, temperament }] }) => {
                      return `
                        <div class="cat_photo">
                        <img src="${url}" alt="${name}">
                        </div>
                        <div class="cat_descript">
            <h3>${name}</h3>
            <p>${description}</p>
            <p><b>Temperament:&nbsp</b>${temperament}</p></div>`;
                    }
                  )
                  .join('');
              })
              .catch(() => {
                Notiflix.Notify.failure(errorText.textContent);
              })
              .finally(() => (loaderText.hidden = true));
          },
        },
      });
    })
    .catch(() => {
      Notiflix.Notify.failure(errorText.textContent);
    })
    .finally(() => (loaderText.hidden = true));
});
