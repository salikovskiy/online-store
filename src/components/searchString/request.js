import services from '../../services/services.js';
import itemCard from '../itemCard/itemCard';
import styleSearch from './styleSearch.css';
import pagination from '../pagination/pagination.js';
import functionFavoriteDrow from '../favorit/functionFavoriteDrow.js';

const refs = {
  input: document.querySelector('.search-input'),
  main: document.querySelector('.main-section'),
  form: document.querySelector('form'),
  ulCont: document.querySelector('.categories'),
};

function handleInput(e) {
  e.preventDefault();
  const preload = document.querySelector('.preloaderfade');
  preload.className = 'preloader';
  preload.style.display = 'block';
  let searchItem = refs.input.value.toLowerCase();
  services
    .searchAllItems(searchItem)
    .then(data => {
      refs.ulCont.innerHTML = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
      setTimeout(function() {
        preload.className += 'fade';
        preload.style.display = 'none';
      }, 2600);
      return data;
    })
    .finally(() => {
      pagination(searchItem);
    });
}
refs.form.addEventListener('submit', handleInput);
// refs.form.addEventListener('input', handleInput);
