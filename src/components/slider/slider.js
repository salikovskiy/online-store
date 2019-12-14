import axios from 'axios';
import categoriesFunc from '../categories/categories';
const categories = document.querySelector('.categories');
import itemCard from '../itemCard/itemCard';

async function getInfo() {
  return await axios.get(
    `https://dashads.goit.co.ua/api/v1/ads/all?category=2&page=1`,
  );
}

let card = '';

const state = {
  currentImage: '',
  currentCategory: null,
  allAds: [],
  prevImage: null,
  nextImage: null,
};

let small = 0;
let big = 3;

categories.addEventListener('click', e => {
  if (e.target.classList.contains('categories-item-btn-slider-prev')) {
    const ul = e.target.parentNode.closest('li').lastElementChild;
  }
  if (e.target.classList.contains('categories-item-btn-slider-next')) {
    const ul = e.target.parentNode.closest('li').lastElementChild;
    small++;
    big++;
    console.log(small, big);
    card = '';
    data.forEach((item, index) => {
      if (index >= small && index <= big) {
        card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
      }
      ul.innerHTML = card;
    });
  }
});
