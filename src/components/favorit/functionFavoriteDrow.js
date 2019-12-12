import services from '../../services/services.js';

export default function functionFavoriteDrow() {
  const psevdo = document.querySelectorAll('.overlay');
  services.getAllProductFavorite().then(result => {
    psevdo.forEach(e => {
      result.forEach(event => {
        if (event._id === e.dataset.id) {
          e.querySelector('.btn-fav').classList.add('addedToFavorite');
        }
      });
    });
  });
}
