import axios from 'axios';

const arr = {
  currentImage: '',
  currentCategory: null,
  allAds: [],
};

async function getInfo(numberCategories = 1, homePage = 1, limit = 25) {
  arr.allAds = await axios
    .get(`/ads/all?limit=${limit}category=${numberCategories}&page=${homePage}`)
    .then(data => console.log(data.data.ads.docs));
}

getInfo();
