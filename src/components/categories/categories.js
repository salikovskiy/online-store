import services from './../../services/services';
import itemCard from '../itemCard/itemCard';
import stylesCategories from './categories.css'

// import listCategories from '../templates/listCategories.hbs'

const refs = {
  contanierCategories: document.querySelector('.categories'),
  ulInner: null,
  btnShowAll: null,
  btnSlider: null,
  createAd: document.querySelector('.create-ad'),
};

const getCategories = () => {
  return services.getAllProduct();
};

function paint({ categories }) {
  console.log('список категорий', categories);
  let string = '';
  categories.forEach(element => {
    string += `<li class="categories-item data-category="${element._id}">
                <div class="categories-item-overlay-title">
                <h2 class="categories-item-title" >${element.category}</h2>
                <button class="categories-item-btn-showall visually-hidden" data-category="${element._id}">Дивiться всi</button>
                </div>
                <div class="categories-item-btn-slider visually-hidden">
                <button class="categories-item-btn-slider-prev data-category="${element._id}""></button>
                <button class="categories-item-btn-slider-next data-category="${element._id}""></button>
                </div>
                <ul class="categories-item-listcards" data-category="${element._id}">
                    </ul>
                </li>`;
  });
  refs.contanierCategories.insertAdjacentHTML('beforeend', string);
  refs.ulInner = document.querySelectorAll('.categories-item-listcards');

  refs.ulInner.forEach((element, index) => {
    let card = '';
    services.getCategoriesWithNumberCategories(index + 1, 1).then(data => {
      // console.log("список карточек по категории", data);
      visibleBtnCategoriesItem(data, index);

      data.forEach((item, index) => {
        if (index < 4) {
          card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
        }
      });
      element.insertAdjacentHTML('beforeend', card);
    });
  });
}

const visibleBtnCategoriesItem = (listItemCard, indexCategory) => {
  refs.btnShowAll = document.querySelectorAll('.categories-item-btn-showall');
  refs.btnSlider = document.querySelectorAll('.categories-item-btn-slider');
  if (listItemCard.length > 4) {
    refs.btnShowAll[indexCategory].classList.remove('visually-hidden');
    refs.btnSlider[indexCategory].classList.remove('visually-hidden');
  }
};

function renderData() {
  getCategories().then(data => paint(data));
}
renderData();

const drawAllItemCardByCategory = e => {
  if (e.target.className === 'categories-item-btn-showall') {

    services.getQuantityAllItemsByCategory(e.target.dataset.category, 1).then(quantity => {
      services
        .getAllItemsWithNumberCategories(e.target.dataset.category, quantity, 1)
        .then(data => {
          let card = '';
          data.forEach(item => {
            card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
          });
          refs.ulInner[e.target.dataset.category - 1].innerHTML = card;
        });

      console.log(quantity);
    });

    // services
    //   .getCategoriesWithNumberCategories(e.target.dataset.category, 1)
    //   .then(data => {
    //     console.log(data);
    //     let card = '';
    //     data.forEach(item => {
    //       card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
    //     });
    //     refs.ulInner[e.target.dataset.category - 1].innerHTML = card;
    //   });
  }
};
window.addEventListener('click', drawAllItemCardByCategory);
