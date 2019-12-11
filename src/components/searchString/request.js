import services from '../../services/services.js';
import itemCard from '../itemCard/itemCard';
import styleSearch from './styleSearch.css';

const refs = {
  input: document.querySelector('.search-input'),
  main: document.querySelector('.main-section'),
  form: document.querySelector('form'),
  ulCont: document.querySelector('.categories'),
};

function handleInput(e) {
  e.preventDefault();
  console.log(e);
  let searchItem = refs.input.value.toLowerCase();
  console.log(searchItem);
  services
    .searchAllItems(searchItem)
    .then(data => {
      console.log(data);

      refs.ulCont.innerHTML = `<li><p class="itemSearchCount">Знайдено об'яв ${data.totalDocs} шт</p></li><li><ul class="searchResult"></ul></li>`;
      return data;
    })
    .then(data => {
      const searchRes = document.querySelector('.searchResult');
      const card = data.docs
        .map(item => `<li class="listcards-itemcard">${itemCard(item)}</li>`)
        .join('');
      searchRes.insertAdjacentHTML('beforeend', card);
      if (data.totalPages > 1) {
        const paginationNav = `<div class='overlayPagination'>Place for pagination</div>`;
        searchRes.insertAdjacentHTML('beforeend', paginationNav);
      }
    });
}
refs.form.addEventListener('submit', handleInput);
// refs.form.addEventListener('input', handleInput);
