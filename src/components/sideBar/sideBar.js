import '../../styles.css';
import '../sideBar/sideBar.css';
import category from '../templates/menuList.hbs';
import services from '../../services/services';

const refs = {
  btnMenu: document.querySelector('.modal-menu'),
  modalka: document.querySelector('#modalka'),
  close: document.querySelector('.close'),
  ul: document.querySelector('.navigation__menu_list'),
  logIn: document.querySelector('.loginOnMobile'),
  logOut: document.querySelector('.logout'),
};

// слушатели на кнопках

refs.btnMenu.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper');
});

refs.close.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper-none');
});

// выводим категории

const state = {
  categories: [],
};

const getCategorys = async () => {
  await services.getAllProduct().then(data => {
    const string = category(data.categories);
    refs.ul.insertAdjacentHTML('beforeend', string);
  });
};
getCategorys();

// переход на категорию

const onHandleClick = async evt => {
  // console.log('work');
  console.log(evt.target.id);
  const getCategory = await services.getCategoriesWithNumberCategories(
    evt.target.id,
    services.page,
  );
  console.log(getCategory);
};

refs.ul.addEventListener('click', onHandleClick);

// вывод входа в личный кабинет

const userLogin = localStorage.getItem('userName');

// refs.logIn.addEventListener('click', event => {
//   if (!localStorage.getItem('token')) {
//     return;
//   }
//   // if ((event.target = refs.logIn)) {
//   //   refs.modal.classList.add('is-open');
//   // }
// });

// if (localStorage.getItem('token')) {
//   refs.logIn.textContent = userLogin;
//   refs.logOut.setAttribute('style', 'display: block');
// }
