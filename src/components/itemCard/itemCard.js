import services from '../../services/services.js';
import './cardstyle.css';

services.getAllProduct().then(data => {
  if (data.docs.length === 10) {
    data.docs.map(item => {
      // console.log(
      //   item.images.length === 0
      //     ? 'http://bldng.info/assets/default_image-a61228fe406c941a065163a232688948cb0e1186d2bc2b2727c073bb20728c67.png'
      //     : item.images,
      // );
      const itemsCard = `<div class="card"> <li class="itemCard" data-id="${
        item._id
      }" key="${item._id}"><div class="imageContainer">
      <img src='${
        item.images.length === 0
          ? 'http://bldng.info/assets/default_image-a61228fe406c941a065163a232688948cb0e1186d2bc2b2727c073bb20728c67.png'
          : item.images
      }'/>
      <div alt=${item.title}
        class='itemImage'>
    </div>
    <div class=" overlay"></div>
    <div class="itemInfo">
                <h2 class="itemTitle">${item.title}</h2>
                <p class="itemPrice">${item.price}</p>
            </div>
    </li>
        </div>`;
      //   refs.gallery.innerHTML += itemsCard;
    });
  }

  //   return refs.gallery.insertAdjacentHTML('beforeend', template(data.docs));
});
