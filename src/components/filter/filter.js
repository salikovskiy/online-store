import services from '../../services/services.js';
import templateOption from '../templates/templateOptionFilter.hbs';
import './filter.css';
import itemCard from '../itemCard/itemCard.js';
import functionFavoriteDrow from '../favorit/functionFavoriteDrow.js';

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
      document.querySelector('.categories').innerHTML = card;
    })
    .finally(() => functionFavoriteDrow());
}

function handleSubmitClear() {
  location.reload();
}
