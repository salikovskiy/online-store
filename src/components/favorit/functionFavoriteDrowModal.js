import services from '../../services/services.js';

export default function functionFavoriteDrow() {
  const psevdo = document.querySelector('.modal');
  console.log(psevdo);
  console.log(psevdo.dataset.id);
  services.getAllProductFavorite().then(result => {
    result.forEach(event => {
      if (event._id === psevdo.dataset.id) {
        psevdo.querySelector('.favorites').classList.add('addedToFavorite');
      }
    });
  });
}
