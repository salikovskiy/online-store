import services from '../../services/services.js';
import './favorit.css';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

document.body.addEventListener('click', createdFavoritCard);

function createdFavoritCard(e) {
  // console.log(e.target.dataset.fav);
  if (e.target.dataset.fav === 'key') {
    // e.target.classList.toggle('addedToFavorite');

    const eventId = e.target.closest('.overlay').dataset.id;

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
          e.target.classList.remove('addedToFavorite');
          services.deletedFavoritCardById(eventId);
          PNotify.error({
            title: 'О ні !',
            text: 'Як я міг Вам не сподобатися ?',
          });
          // console.log(cards);
        } else {
          e.target.classList.add('addedToFavorite');
          services.adsFavoritCardById(eventId);
          PNotify.success({
            title: 'Нарешті воно працює!',
            text: 'Ми зробили вигляд що нам цікавий цей товар.',
          });
          // console.log(cards);
        }
      });
    } else {
      PNotify.error({
        title: 'О ні !',
        text:
          'Будь-ласка, для добавлення в обрані, зареєструйтесь або увійдіть в свій аккаунт !',
      });
    }
  } else if (e.target.dataset.fav === 'keyModal') {
    const eventId = e.target.closest('.modal').dataset.id;
    // console.log(eventId);

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
          e.target.classList.remove('addedToFavorite');
          services.deletedFavoritCardById(eventId);
          PNotify.error({
            title: 'О ні !',
            text: 'Як я міг Вам не сподобатися ?',
          });
          // console.log(cards);
        } else {
          // console.log(e.target);
          e.target.classList.add('addedToFavorite');
          services.adsFavoritCardById(eventId);
          PNotify.success({
            title: 'Нарешті воно працює!',
            text: 'Ми зробили вигляд що нам цікавий цей товар.',
          });
          // console.log(cards);
        }
      });
    } else {
      PNotify.error({
        title: 'О ні !',
        text:
          'Будь-ласка, для добавлення в обрані, зареєструйтесь або увійдіть в свій аккаунт !',
      });
    }
  }
}
