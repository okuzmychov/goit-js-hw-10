import Notiflix from 'notiflix';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_hpDxNWtuIHgI2hQ0umNyMz8MUXCLnpLObNOexE0JM5utYSQTKqi74y84ybiTShfK';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
  return axios
    .get(`breeds/`)
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.status);
      }
      return resp.data;
    })
    .catch(() => {
      Notiflix.Report.failure('Щось пішло не так. Маємо помилку в catch!');
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.status);
      }
      return resp.data[0];
    })
    .catch(() => {
      Notiflix.Report.failure('Щось пішло не так. Маємо помилку в catch!');
    });
}

export { fetchBreeds, fetchCatByBreed };