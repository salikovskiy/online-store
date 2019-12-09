import services from '../../services/services.js';
import template from '../templates/template.hbs';
import debounce from 'lodash.debounce';
import itemCard from '../itemCard/itemCard';

const refs = {
  input: document.querySelector('.search-input'),
  main: document.querySelector('.main'),
  form: document.querySelector('.from'),
  ulCont: document.querySelector('.categories'),
};

function handleInput(e) {
  e.preventDefault();
  let string = '';
  let searchItem = refs.input.value.toLowerCase();
  console.log(searchItem);
  services.searchAllItems(searchItem);
  then(data => {
    console.log(data);
    let card = '';
    data.forEach(item => {
      card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
    });
    refs.ulCont.insertAdjacentHTML('beforeend', card);
    // refs.ulInner[e.target.dataset.category - 1].innerHTML = card;
  });
  // .then(data => {
  //   let string = template(data);
  //   refs.ulCont.innerHTML = '';
  //   return string;
  // })
  // .then(string => refs.ulCont.insertAdjacentHTML('beforeend', string));
}
refs.form.addEventListener('input', debounce(handleInput, 500));
