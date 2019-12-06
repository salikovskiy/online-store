import './styles.css';
import './components/preloader/preloader';
import category from '../src/components/templates/template.hbs';
import services from './services/services';

const refs = {
  btnMenu: document.querySelector('.modal-menu'),
  modalka: document.querySelector('#modalka'),
  close: document.querySelector('.close'),
  ul: document.querySelector('.navigation__menu_list'),
};

refs.btnMenu.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper');
});

refs.close.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper-none');
});

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
