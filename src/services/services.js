import axios from 'axios';
axios.defaults.baseURL = 'https://dash-ads.goit.co.ua/api/v1';
export default {
  async getAllCategories() {
    // const data = await axios.get('/ads/all');
    const data = await axios
      .get('/ads/all')
      // .then(({ data }) => console.log(data.ads.docs));
      .then(({ data }) => data.ads.docs);
    console.log(data);
  },
};
