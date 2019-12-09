import services from '../../services/services.js';
import './cardstyle.css';

export default (item) => {
  let itemsCard = `<div class="itemCard" data-id="${
    item._id
  }" key="${item._id}"><div class="imageContainer">
      <img src='${
        item.images.length === 0
          ? 'http://bldng.info/assets/default_image-a61228fe406c941a065163a232688948cb0e1186d2bc2b2727c073bb20728c67.png'
          : item.images
      }'alt=${item.title}      class='itemImage'/>
    <div class="overlay"></div>
    <div class="itemInfo">
                <h3 class="itemTitle">${item.title}</h3>
                <p class="itemPrice">${item.price}</p>
            </div>
    </div>`;
  return itemsCard;
};
// refs.gallery.innerHTML += itemsCard;
