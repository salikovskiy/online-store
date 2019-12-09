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
  headerBtn: document.querySelector('.account_btn'),
  wrapperAds: document.querySelector('.ads-wrapper'),
  wrapperFav: document.querySelector('.fav-wrapper'),
  wrapperTitleAds: document.querySelector('.title-wrapper-ads'),
  wrapperTitleFav: document.querySelector('.title-wrapper-fav'),
  lightboxTitleAds: document.querySelector('.lightbox__title-ads'),
  lightboxTitleFav: document.querySelector('.lightbox__title-fav'),
  popup: document.querySelector('.popup'),
  popupEnter: document.querySelector('.popup-enter'),
  popupExit: document.querySelector('.popup-exit'),
  popupEnterText: document.querySelector('.popup-enter-text'),
  popupExitText: document.querySelector('.popup-exit-text'),
  body: document.querySelector('body'),
  userName: document.querySelector('.account_btn-name'),
  accountBtn: document.querySelector('.account_btn'),
};

const token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZWJmNmJiNDA4ZTQwMjZhYTBlNjNmZiIsImlhdCI6MTU3NTc0NTIxMX0.TTIUMe21zVLseN_8Wu0hWTXcTa0nEWLZ5wdeKrBFJbQ';

//const token = localStorage.getItem('token')
//!!!!!!!!добавить local storage вместо токена

///--------------открываем popup
refs.body.addEventListener('click', event => {
  if (!localStorage.getItem('token')) {
    return;
  }

  if (event.target == refs.headerBtn) {
    refs.popup.style.display = 'block';
  }

  //---------------закрываем popup
  if (event.target !== refs.headerBtn) {
    refs.popup.style.display = 'none';
  }
});

if (localStorage.getItem('token')) {
  const userName = JSON.parse(localStorage.getItem('userInfo')).name;
  refs.userName.textContent = userName;
  refs.accountBtn.textContent = userName[0];
}



//---------------открываем модалку
refs.popupEnter.addEventListener('click', event => {
  if (!localStorage.getItem('token')) {
    return;
  }

  if (event.target == refs.popupEnter || event.target == refs.popupEnterText) {
    refs.modal.classList.add('is-open');
    refs.popup.style.display = 'none';
  }

  //---------------закрываем модалку
  refs.modal.addEventListener('click', event => {
    if (
      event.target.nodeName == 'I' ||
      event.target == refs.btn ||
      event.target == refs.overlay
    ) {
      refs.modal.classList.remove('is-open');
    }

    //--------------добавляем объявления юзера
    if (
      event.target == refs.ads ||
      event.target == refs.wrapperAds ||
      event.target == refs.wrapperTitleAds ||
      event.target == refs.lightboxTitleAds
    ) {
      services.getUser(token).then(data => {
        refs.ads.innerHTML = userAds(data.data.ads);
      });
    }

    //----------------добавляем избранное
    if (
      event.target == refs.favorite ||
      event.target == refs.wrapperFav ||
      event.target == refs.wrapperTitleFav ||
      event.target == refs.lightboxTitleFav
    ) {
      services.getUserFavorites(token).then(data => {
        refs.favorites.innerHTML = userAds(data.data.user.favorites);
      });
    }
  });

  //--------------удаляем объявления и снова отрисовываем!
  let deleteButton = document.querySelector('.lightbox__content');
  deleteButton.addEventListener('click', evt => {
    if (evt.target.nodeName !== 'BUTTON') {
      return;
    }
    const id = evt.target.closest('li').dataset.id;
    services.deletedProduct(id);

    services.getUserFavorites(token).then(data => {
      refs.favorites.innerHTML = userAds(data.data.user.favorites);
    });
  });
});

//----------------выходим из аккаунта
// refs.popupExit.addEventListener('click', event =>{
//   console.log(event.target)
//   if (event.target == refs.popupExit ||
//     event.target == refs.popupExitText) {
//     //Аня добавь выход!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   }
// })
