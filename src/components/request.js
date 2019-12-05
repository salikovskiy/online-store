import services from '../services/services.js';
import { template } from 'handlebars';

const refs = {
  input: document.querySelector('.searchInput'),
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
};

function handlesubmit(e) {
  getAllCategories()
    .then(data => {
      let string = template(data);
      return string;
    })
    .then(string => refs.gallery.insertAdjacentHTML('beforeend', string));
}

refs.form.addEventListener('submit', handlesubmit);

// console.log(refs.input);
// function handleInput(e) {
//   e.preventDefault();
//   //   console.log(refs.input.value);
//   //   refs.gallery.textContent = refs.input.value;
// }
