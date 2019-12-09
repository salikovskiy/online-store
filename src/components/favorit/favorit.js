import services from '../../services/services.js';

export default function createdFavoritCard(e) {
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
