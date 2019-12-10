import services from '../../services/services.js';
import './cardstyle.css';

export default item => {
  let itemsCard = `<div class="itemCard"><div class="imageContainer">
      <img src='${
        item.images.length === 0
          ? 'http://bldng.info/assets/default_image-a61228fe406c941a065163a232688948cb0e1186d2bc2b2727c073bb20728c67.png'
          : item.images
      }'alt=${item.title} class='itemImage'/>
    <div class="overlay" data-id="${item._id}" key="${item._id}">
      <div class="favorite"></div>
      <div class="open"></div>
    </div>
    <div class="itemInfo" data-id="${item._id}" key="${item._id}">
                <h3 class="itemTitle">${item.title}</h3>
                <p class="itemPrice">${item.price} грн</p>
            </div>
    </div>`;
  return itemsCard;
};
// const favoriteAdd = document.querySelector('.favorite');
// favoriteAdd.addEventListener('click', e => {
//   e.target.classList.toggle('addedToFavorite');
// });
