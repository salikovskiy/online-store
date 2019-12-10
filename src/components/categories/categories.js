import services from './../../services/services';
import itemCard from '../itemCard/itemCard';
import stylesCategories from './categories.css';


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
services.getAllProduct().then(data =>{
  paint(data)
});

function visibleBtnCategoriesItem (listItemCard, indexCategory) {
  refs.btnShowAll = document.querySelectorAll('.categories-item-btn-showall');
  refs.btnSlider = document.querySelectorAll('.categories-item-btn-slider');
  if (listItemCard.length > 4) {
    refs.btnShowAll[indexCategory].classList.remove('visually-hidden');
    if(window.innerWidth >767){
    refs.btnSlider[indexCategory].classList.remove('visually-hidden');
    }
  }
};

function drawDivPagination(){
  let divPagginator = `<div class = "overlayPagination">Здесь будет код влада</div>`
  return divPagginator;

}

function paint({ categories }) {
  state.arrCategoriesByIdName = categories;
  let string = '';
  categories.forEach((element, index) => {
    if (index < 3) {
      string += `<li class="categories-item data-category="${element._id}">
      <div class="categories-item-overlay-title">
      <h2 class="categories-item-title" >${element.category}</h2>
      <button class="categories-item-btn-showall visually-hidden" data-category="${element._id}">Дивитися всi</button>
                </div>
                <div class="categories-item-btn-slider visually-hidden">
                <button class="categories-item-btn-slider-prev data-category="${element._id}""></button>
                <button class="categories-item-btn-slider-next data-category="${element._id}""></button>
                </div>
                <ul class="categories-item-listcards" data-category="${element._id}">
                </ul>
                </li>`;
              }
  });
  if(categories.length > 3){
    refs.mainSection.insertAdjacentHTML('beforeend', drawDivPagination())
    console.log("запускаю функцию отрисовки дива пагинатора");
  }
  
  refs.contanierCategories.insertAdjacentHTML('beforeend', string);
  refs.ulInner = document.querySelectorAll('.categories-item-listcards');
  

  refs.ulInner.forEach((element, index) => {
    let card = '';
    services.getCategoriesWithNumberCategories(index + 1, 1).then(data => {
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


// const unvisibleBtnCategoriesItem = (indexCategory) => {
//   refs.btnShowAll[indexCategory].classList.add('visually-hidden');
//   refs.btnSlider[indexCategory].classList.add('visually-hidden');
// }


const drawAllItemCardByCategory = e => {
  if (e.target.className === 'categories-item-btn-showall') {
    services
    .getAllItemsWithNumberCategories(e.target.dataset.category, 12, 1)
    .then(data => {
      console.log("data.length",data.length);
      let card = '';
      data.forEach(item => {
        card += `<li class="listcards-itemcard">${itemCard(item)}</li>`;
      });
      const nameCategory = state.arrCategoriesByIdName.reduce((name, elem) => {
        if (elem._id == e.target.dataset.category) {
          name = elem.category;
        }
        return name;
      }, '');
      refs.contanierCategories.innerHTML = `<li class="overlayCategoryContainer"><h2 class="category-item-title">${nameCategory}</h2><ul class="categoryContainer">${card}</ul></li>`;
      if(data.length > 10){
        refs.overlayCategoryContainer = document.querySelector(".overlayCategoryContainer")
        console.log("запускаю функцию отрисовки дива пагинатора");
        refs.overlayCategoryContainer.insertAdjacentHTML('beforeend', drawDivPagination())
    
      }
    });
  }
};

window.addEventListener('click', drawAllItemCardByCategory);
