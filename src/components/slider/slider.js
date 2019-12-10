import axios from 'axios';

const state = {
  currentImage: '',
  currentCategory: null,
  allAds: [],
  prevImage: null,
  nextImage: null,
};

const action = {};

async function getInfo(numberCategories = 1, homePage = 1, limit = 100) {
  arr.allAds = await axios
    .get(`/ads/all?limit=${limit}category=${numberCategories}&page=${homePage}`)
    .then(data => console.log(data.data.ads.docs));
}

getInfo();

function changeImage(action) {}
