import services from '../../services/services.js';
import templateOption from '../templates/templateOptionFilter.hbs';
import './filter.css';
import itemCard from '../itemCard/itemCard.js';
import functionFavoriteDrow from '../favorit/functionFavoriteDrow.js';
import pagination from '../pagination/pagination.js'

const refs = {
  filter: document.querySelector('.filter'),
  clear: document.querySelector('.clear-btn'),
  logo: document.querySelector('.logoReload'),
};

services.getAllProduct().then(data => {
  // console.log(data);
  const option = templateOption(data.categories);
  refs.filter.insertAdjacentHTML('beforeend', option);
});

refs.filter.addEventListener('click', handleSubmit);
refs.clear.addEventListener('click', handleSubmitClear);
refs.logo.addEventListener('click', handleSubmitClear);
const preload = document.createElement('div');

function handleSubmit(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  const preload = document.querySelector('.preloaderfade');
  preload.className = 'preloader';
  preload.style.display = 'block';
  let active = e.currentTarget.querySelector('.isActiveCategory');
  document.querySelector('.categories').classList.add('categoryStyle');
  if (active) {
    active.classList.remove('isActiveCategory');
  } else {
  }
  e.target.classList.add('isActiveCategory');
  services
    .getCategoriesWithNumberCategories(Number(e.target.id), 1)
    .then(result => {
      // console.log(result);
      let card = '';
      result.forEach(item => {
        card += `<li class="listcards-itemcard liforCategories">${itemCard(
          item,
        )}</li>`;
      });
      document.querySelector('.categories').innerHTML = `<li class="overlayCategoryContainer"
      data-idCategory="${e.target.dataset.category}">
      <ul class="categoryContainer" data-categorycontainer="${e.target.dataset.category}">${card}</ul></li>
      ${drawDivPagination(e.target.dataset.category)}`;
      refs.overlayCategoryContainer = document.querySelector(
        '.overlayCategoryContainer',
      );
    })
    .finally(() => {
      pagination(Number(e.target.id))
      functionFavoriteDrow();
      setTimeout(function() {
        preload.className += 'fade';
        preload.style.display = 'none';
      }, 600);
    });
}

function handleSubmitClear() {
  location.reload();
}

function drawDivPagination(id) {
  let divPagginator = `<div class = "overlayPagination" data-categoryPagination="${id}"></div>`;
  return divPagginator;
}