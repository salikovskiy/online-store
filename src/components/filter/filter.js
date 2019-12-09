import services from '../../services/services.js';
import templateOption from '../templates/templateOptionFilter.hbs';
import './filter.css';

services.getAllProduct().then(data => {
  const option = templateOption(data.categories);
  services.refs.filter.insertAdjacentHTML('beforeend', option);
});

services.refs.filter.addEventListener('click', handleSubmit);
services.refs.clear.addEventListener('click', handleSubmitClear);
function handleSubmit(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  e.target.classList.add('isActiveCategory');
  let active = e.currentTarget.querySelector('.isActiveCategory');
  if (active) {
    active.classList.remove('isActiveCategory');
  }
  services
    .getCategoriesWithNumberCategories(Number(e.target.id), 1)
    .then(result => {
      // render(result);
      //  сюда нужно подставить функцию которая рендерит страницу, прорисовует
    });
}

function handleSubmitClear() {
  // При нажатии на кнопку тут вызываэм функцию , которая рендерит страницу изначально
}

// function render(arr) {
//   services.getAllProduct().then(data => {
//     const template = arr.map(item => {
//       const itemsCard = `<div class="card"> <li class="itemCard" data-id="${item._id}" key="${item._id}"><div class="imageContainer">
//                 <img src='${item.images}'/>
//                 <div alt=${item.title}
//                   class='itemImage'>
//               </div>
//               <div class=" overlay"></div>
//               <div class="itemInfo">
//                           <h2 class="itemTitle">${item.title}</h2>
//                           <p class="itemPrice">${item.price}</p>
//                           <button class="button" > put me </button>
//                       </div>
//               </li>
//                   </div>`;
//       return itemsCard;
//       //   refs.gallery.innerHTML += itemsCard;
//     });
//     document.querySelector('.main').innerHTML = template.join('');
//   });
// }
