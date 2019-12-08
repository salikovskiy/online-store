import services from '../../services/services.js';

const ul = document.querySelector('.main');
const arrAut = {
  email: 'Lotslar@gmail.com',
  password: 'qwerty1234',
};

services.getAllProduct().then(data => {
  //   console.log(data);
  const template = data.docs.map(item => {
    const itemsCard = `<div class="card"> <li class="itemCard" data-id="${item._id}" key="${item._id}"><div class="imageContainer">
        <img src='${item.images}'/>
        <div alt=${item.title}
          class='itemImage'>
      </div>
      <div class=" overlay"></div>
      <div class="itemInfo">
                  <h2 class="itemTitle">${item.title}</h2>
                  <p class="itemPrice">${item.price}</p>
                  <button class="button" > put me </button>
              </div>
      </li>
          </div>`;
    return itemsCard;
    //   refs.gallery.innerHTML += itemsCard;
  });
  ul.insertAdjacentHTML('beforeend', template.join(''));

  // -------------favorit-----------------
  //   services.loginUser(arrAut);
  //   const favButton = document.querySelectorAll('.button');
  ul.addEventListener('click', createdFavoritCard);
  function createdFavoritCard(e) {
    const eventId = e.target.closest('li').dataset.id;
    services.getCardById(eventId).then(cardId => {
      if (localStorage.getItem('token')) {
        services.getAllProductFavorite().then(cards => {
          let flag = false;
          cards.map(elem => {
            if (eventId === elem._id) {
              flag = true;
            }
            return flag;
          });
          if (flag) {
            services.deletedFavoritCardById(eventId);
          } else {
            services.adsFavoritCardById(eventId);
          }
          console.log(cards);
        });
      } else {
      }
    });
  }
});

