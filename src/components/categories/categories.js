import services from './../../services/services';
import itemCard from '../itemCard/itemCard';
import stylesCategories from './categories.css';
import pagination from '../pagination/pagination';
import functionFavoriteDrow from '../favorit/functionFavoriteDrow.js';

const state = {
  curentIdCategoryForDrawAllItem: 0,
  arrCategoriesByIdName: [],
};

const refs = {
  mainSection: document.querySelector('.main-section'),
  contanierCategories: document.querySelector('.categories'),
  ulInner: null,
  ulInnerCurent: null,
  btnShowAll: null,
  btnSlider: null,
  createAd: document.querySelector('.create-ad'),
  overlayCategoryContainer: null,
};
services.getAllProduct().then(data => {
  paint(data);
});

function visibleBtnCategoriesItem(listItemCard, indexCategory) {
  refs.btnShowAll = document.querySelectorAll('.categories-item-btn-showall');
  refs.btnSlider = document.querySelectorAll('.categories-item-btn-slider');
  if (listItemCard.length > 4) {
    refs.btnShowAll[indexCategory].classList.remove('visually-hidden');
    if (window.innerWidth > 767) {
      refs.btnSlider[indexCategory].classList.remove('visually-hidden');
    }
  }
}

function drawDivPagination(id) {
  let divPagginator = `<div class = "overlayPagination" data-categoryPagination="${id}"></div>`;
  return divPagginator;
}

function paint({ categories }) {
  state.arrCategoriesByIdName = categories;
  let string = '';
  categories.forEach((element, index) => {
    if (index < 3) {
      string += `<li class="categories-item" data-liCategory="${element._id}">
      <div class="categories-item-overlay-title">
      <h2 class="categories-item-title" >${element.category}</h2>
      <button class="categories-item-btn-showall visually-hidden" data-category="${element._id}">Дивитися всi</button>
                </div>
                <div class="categories-item-btn-slider visually-hidden">
                </div>
                <ul class="categories-item-listcards" data-category="${element._id}">
                </ul>
                </li>`;
    }
  });
  refs.contanierCategories.insertAdjacentHTML('beforeend', string);
  refs.ulInner = document.querySelectorAll('.categories-item-listcards');

  if (categories.length > 3) {
    refs.contanierCategories.insertAdjacentHTML(
      'beforeend',
      `<li>${drawDivPagination()}</li>`,
    );
  }

  refs.ulInner.forEach((element, index) => {
    let card = '';
    services
      .getCategoriesWithNumberCategories(index + 1, 1)
      .then(data => {
        visibleBtnCategoriesItem(data, index);

        data.forEach((item, index) => {
          if (index < 4) {
            card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
          }
        });
        element.insertAdjacentHTML('beforeend', card);
      })
      .finally(() => functionFavoriteDrow());
  });
}

// const unvisibleBtnCategoriesItem = (indexCategory) => {
//   refs.btnShowAll[indexCategory].classList.add('visually-hidden');
//   refs.btnSlider[indexCategory].classList.add('visually-hidden');
// }

const drawAllItemCardByCategory = e => {
  if (e.target.className === 'categories-item-btn-showall') {
    services
      .getAllItemsWithNumberCategories(e.target.dataset.category, 12, 1)
      .then(data => {
        let card = '';
        data.forEach(item => {
          card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
        });
        const nameCategory = state.arrCategoriesByIdName.reduce(
          (name, elem) => {
            if (elem._id == e.target.dataset.category) {
              name = elem.category;
            }
            return name;
          },
          '',
        );
        refs.contanierCategories.innerHTML = `<li class="overlayCategoryContainer"
        data-idCategory="${e.target.dataset.category}">
        <h2 class="category-item-title">${nameCategory}</h2>
        <ul class="categoryContainer" data-categorycontainer="${e.target.dataset.category}">${card}</ul></li>`;

        refs.overlayCategoryContainer = document.querySelector(
          '.overlayCategoryContainer',
        );
        refs.overlayCategoryContainer.insertAdjacentHTML(
          'beforeend',
          drawDivPagination(e.target.dataset.category),
        );
      })
      .finally(() => {
        functionFavoriteDrow();
        pagination(Number(e.target.dataset.category));
      });
  }
};

window.addEventListener('click', drawAllItemCardByCategory);
