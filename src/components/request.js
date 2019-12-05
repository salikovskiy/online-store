import services from '../services/services.js';
import { template } from 'handlebars';

const refs = {
  input: document.querySelector('.search-input'),
  main: document.querySelector('.main'),
  form: document.querySelector('.from'),
};

refs.form.addEventListener('submit', handlesubmit);

function handlesubmit(e) {
  e.preventDefault();
  services
    .getAllProduct()
    .then(data => {
      let string = template(data);
      return string;
    })
    .then(string => refs.main.insertAdjacentHTML('beforeend', string));
}

// console.log(refs.input);
// function handleInput(e) {
//   e.preventDefault();
//   //   console.log(refs.input.value);
//   //   refs.gallery.textContent = refs.input.value;
// }
