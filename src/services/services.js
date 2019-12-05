import axios from 'axios';
axios.defaults.baseURL = 'https://dash-ads.goit.co.ua/api/v1';

export default {
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
