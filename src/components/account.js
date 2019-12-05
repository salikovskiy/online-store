import '../public/account.css';
import services from '../services/services.js';
import userAds from '../components/templates/userAds.hbs';

const refs = {
  modal: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  content: document.querySelector('.lightbox__content'),
  btn: document.querySelector('button[data-action="close-lightbox"]'),
  ads: document.querySelector('.ads'),
  favorites: document.querySelector('.favorites'),
};


refs.modal.addEventListener('click', event => {
  console.log(event.target)
  if (
    event.target.nodeName == 'I' ||
    event.target == refs.btn ||
    event.target == refs.overlay
  ) {
    refs.modal.classList.remove('is-open');
  }
});


const account = {
  ads: [],
  adsId: [],
  favorites: [],

  deleteAds(id) {
    this.ads = this.ads.filter(item => item._id !== id);
  },

  addUserAds(userId) {
    services.fetchAds().then(docs => {
      docs.map(doc => {
        if ((doc.userId === userId)) {
          account.ads.push(doc);
        }
        refs.ads.insertAdjacentHTML('beforeend', userAds(account.ads));
      });
    });
  }
};


account.addUserAds('5de79e226b308626b9d4e0ab');

console.log(account.ads);

const adsButton = document.querySelector('.ads_item-btn')
console.log(adsButton)

// adsButton.addEventListener('click', event => {

//   if (event.target.nodeName !== "BUTTON") {
//     return;
//   }
//   const li = event.target.closest('.ads_item');
//   const liId = Number(li.dataset.id);
//   account.deleteAds(liId);
//   account.deleteAds(event.target.parentNode.id);
//   li.remove();
//   });



// localStorage.setItem("favorites", "5de7fa12408e4026aa0e5948");

// account.adsId.push(JSON.parse(localStorage.getItem("favorites")))

// services.fetchAds().then(docs => {
//   docs.map(doc => {
//     if(account.adsId.includes(doc._id)) {
//       account.favorites.push(doc)
//     console.log(account);
    
//     }
//     refs.favorites.insertAdjacentHTML('beforeend', userAds(account.favorites));
//   })
// })


