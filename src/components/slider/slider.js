import axios from 'axios';
import categoriesFunc from '../categories/categories';
const categories = document.querySelector('.categories');

const state = {
  currentImage: '',
  currentCategory: null,
  allAds: [],
  prevImage: null,
  nextImage: null,
};

const action = {};

async function getInfo(numberCategories = 1, homePage = 1, limit = 100) {
  await axios
    .get(`/ads/all?limit=${limit}category=${numberCategories}&page=${homePage}`)
    .then(data => console.log('data', data.data.ads.docs));
}

function changeImage(action) {}

categories.addEventListener('click', e => {
  if (e.target.classList.contains('categories-item-btn-slider-prev')) {
    const ul = e.target.parentNode.closest('li').lastElementChild;
    getInfo().then(data => {});
  }
});
