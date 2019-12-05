import axios from 'axios';
import modal from './templates/modal.hbs';
axios.defaults.baseURL = 'https://dash-ads.goit.co.ua/api/v1';
const body = document.querySelector('body');
const btn = document.querySelector('#btn');

btn.addEventListener('click', e => {
  // const id = e.target.dataset.id;
  const id = '5d8cdf235c35f91a27d75b8f';
  axios.get(`/ads/${id}`).then(({ data }) => {
    body.innerHTML = modal(data.goal);
    console.log(data);
  });
});
