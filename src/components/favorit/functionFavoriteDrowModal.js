import services from '../../services/services.js';

export default function functionFavoriteDrowModal() {
  const psevdo = document.querySelector('.modal');
  services.getAllProductFavorite().then(result => {
    result.forEach(event => {
      if (event._id === psevdo.dataset.id) {
        psevdo.querySelector('.favorites').classList.add('addedToFavorite');
      }
    });
  });
}
