import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const errorText = document.querySelector('.error');
const loaderText = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const delay = 2000;

breedSelect.style.display = 'none';

Notiflix.Loading.custom('Завантажую...', {
  customSvgUrl:
    'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
});

Notiflix.Loading.remove(delay);

window.addEventListener('load', () => {
  setTimeout(() => {
    breedSelect.style.display = 'block';
  }, delay);
});
breedSelect.innerHTML = '<option disabled selected>Виберіть породу</option>';
let slimSelect;

fetchBreeds()
  .then(data => {
    console.log('Масив котів: ', data);
    const option = data
      .map(
        ({ id, name }) => `
        <option value="${id}">${name}</option>
    `
      )
      .join('');
    errorText.style.display = 'none';
    loaderText.style.display = 'none';
    breedSelect.insertAdjacentHTML('beforeend', option);

    slimSelect = new SlimSelect({
      select: breedSelect,
        placeholder: 'Виберіть породу',
        showSearch: false
    });
  })
  

  .catch(() => {
    Notiflix.Report.failure('Щось пішло не так! Перезавантажте сторінку!');
  });

breedSelect.addEventListener('change', evt => {
  evt.preventDefault();

  Notiflix.Loading.standard('Завантажую ...');

  const breedSelectId = breedSelect.value;

  fetchCatByBreed(breedSelectId)
    .then(cat => {
      console.log(
        `Інформація про кота з ID=${breedSelectId} та іменем=${cat.breeds[0].name}: `,
        cat
      );
      Notiflix.Loading.remove(delay);
      const markup = `
        <div class="container">

            <div class="thumb-pic">
                <img src="${cat.url}" alt="${cat.id}" width="400" />
            </div>

            <div class="thumb" style="margin-left: 10px; margin-top: -24px; width: 400px;">
                <h2>${cat.breeds[0].name}</h2>
                <p>${cat.breeds[0].description}</p>
                <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
            </div>

        </div>`;
      setTimeout(() => {
        catInfo.innerHTML = markup;
      }, delay);
    })
    .catch(() => {
      Notiflix.Report.failure(
        'Немає інформації про цього кота!',
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Будь ласка оберіть іншу породу!',
        'Okay'
      );
      const markup = ``;
      catInfo.innerHTML = markup;
      Notiflix.Loading.remove();
    });
});