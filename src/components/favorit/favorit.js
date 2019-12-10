import services from '../../services/services.js';
import './favorit.css';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

document.body.addEventListener('click', createdFavoritCard);

function createdFavoritCard(e) {
  if (e.target.dataset.fav === 'key') {
    // e.target.classList.toggle('addedToFavorite');
    const eventId = e.target.closest('.overlay').dataset.id;
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
            e.target.classList.remove('addedToFavorite');
            services.deletedFavoritCardById(eventId);
            PNotify.error({
              title: 'О ні !',
              text: 'Як я міг Вам не сподобатися ?',
            });
            console.log(cards);
          } else {
            e.target.classList.add('addedToFavorite');
            services.adsFavoritCardById(eventId);
            PNotify.success({
              title: 'Нарешті воно працює!',
              text: 'Ми зробили вигляд що нам цікавий цей товар.',
            });
            console.log(cards);
          }
        });
      } else {
        PNotify.error({
          title: 'О ні !',
          text:
            'Будь-ласка, для добавлення в обрані, зареєструйтесь або увійдіть в свій аккаунт !',
        });
      }
    });
  }
}





// if(isLoading){
//   const card = document.querySelectorAll('.listcards-itemcard');
//   console.log('card', card);

// }

// const tesLoad = async () => {
//   const res = await services.getIsLoading();
//   console.log('------', res);
// };

// tesLoad();
// // services.getIsLoading().finally(() => console.log('hello'))

// console.log(services.getIsLoading());
