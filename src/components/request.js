import services from '../services/services.js';
import template from './templates/template.hbs';
import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('.search-input'),
  main: document.querySelector('.main'),
  form: document.querySelector('.from'),
};
const state = {
  arrAll: [],
  filteredArr: [],
};

// function getAll() {
//   return services.getAllItems();
// }
services.testIt();

// function handleInput(e) {
//   e.preventDefault();
//   let newArr = [];
//   let searchItem = refs.input.value.toLowerCase();
//   console.log(searchItem);
//   getAll()
//     .then(data => {
//       console.log('возвращает одну цифру, - количество товаров в базе', data);
//       return data;
//     })
//     .then(data => {
//       state.arrAll = services.limitExtradition(data, 1);
//       return state.arrAll;
//     })
//     .then(data => {
//       state.filteredArr = data.filter(item =>
//         item.title.toLowerCase().includes(searchItem),
//       );
//       return state.filteredArr;
//     })
//     .then(data => console.log(data));
//   // .then(data => {
//   //   let string = template(data);
//   //   refs.main.innerHTML = '';
//   //   return string;
//   // })
//   // .then(string => refs.main.insertAdjacentHTML('beforeend', string));

//   console.log(state.arrAll);
//   // .then(data => console.log(data), console.log('последний then', searchItem));
// }
function handleInput(e) {
  e.preventDefault();
  let searchItem = refs.input.value.toLowerCase();
  console.log(searchItem);
  services
    .searchAllItems(searchItem)
    .then(data => {
      let string = template(data);
      refs.main.innerHTML = '';
      return string;
    })
    .then(string => refs.main.insertAdjacentHTML('beforeend', string));
}
refs.form.addEventListener('input', debounce(handleInput, 500));
