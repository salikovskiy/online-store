import axios from 'axios';

axios.defaults.baseURL = 'https://dash-ads.goit.co.ua/api/v1';

export default {
  page: 1,
  async getAllProduct() {
    try {
      const data = await axios.get(`/ads/all`);
      console.log(data.data.ads);
      return data.data.ads;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getAlerts() {
    try {
      const data = await axios.get('https://sciactive.com/pnotify/');
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getCategoriesById(id) {
    try {
      const data = await axios.get(`/ads/${id}`);
      console.log(data.data.goal);
      return data.data.goal;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async limitExtradition(limit, pageNumber) {
    try {
      const data = await axios.get(
        `/ads/all?limit=${limit}&page=${pageNumber}`,
      );
      console.log(data.data.ads);
      return data.data.ads;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getCategoriesWithNumberCategories(numberCategories, homePage) {
    try {
      const data = await axios.get(
        `/ads/all?category=${numberCategories}&page=${homePage}`,
      );
      // console.log(data.data.ads.docs);
      return data.data.ads.docs;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async adsProduct(object) {
    try {
      const data = await axios.post('/ads', object, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async deletedProduct(adId) {
    try {
      const data = await axios.delete(`/ds/${adId}`, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async registrateUser(userInfo) {
    const data = await axios.post('/auth/register', userInfo);
    console.log(data);
    if (data.data.status === 'success') {
      this.loginUser(userInfo);
    } else {
      const regex = /[a-z0-9\.\-\+]+@[a-z0-9\.\-\+]+/gim;
      const res = data.data.error;
      console.error(`This email: ${res.match(regex)} already exists`);
    }
  },
  async loginUser(userInfo) {
    const data = await axios.post('/auth/login', userInfo);
    console.log(data);
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('userInfo', data.config.data);
  },
  async logoutUser(userInfo) {
    const token = localStorage.getItem('token');
    const data = await axios.post('/auth/logout', userInfo, {
      headers: { Authorization: token },
    });

    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  },
};
