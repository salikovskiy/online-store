import './styles.css';
import './components/preloader/preloader';
import './services/services';
import './services/test';

const refs = {
  burgerMenu: document.querySelector('.menu_btn'),
  burgerActive: document.querySelector('.menu_btn-active'),
  closedBtn: document.querySelector('.menu_btn-closed'),
  menu: document.querySelector('.navigation__menu_list'),
  button: document.querySelector('.section'),
};

refs.burgerMenu.addEventListener('click', event => {
  event.preventDefault();
  // refs.button.classList.add(.menu_btn-active);
  refs.burgerMenu.setAttribute('class', 'menu_btn-active');
});

console.log(refs.burgerMenu);
console.log(refs.burgerActive);
