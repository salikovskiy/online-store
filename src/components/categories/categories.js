import services from './../../services/services';
// import listCategories from '../templates/listCategories.hbs'

const refs = {
  contanierCategories: document.querySelector('.categories'),
  ulInner: null,
};


const getCategories = () => {
  return services.getAllProduct();
};

function paint({ categories }) {
  console.log('info', categories);
  let string = '';
  categories.forEach(element => {
    string += `<li class="categories-item">
                <h2 class = "categories-item-title" >${element.category}</h2>
                <button class = "categories-item-btn">Дивiться всi</button>
                <ul class = "categories-item-listcards">
                    </ul>
                </li>`;
  });
  refs.contanierCategories.insertAdjacentHTML('beforeend', string);
  refs.ulInner = document.querySelectorAll('.categories-item-listcards');

  refs.ulInner.forEach((element, index) => {
    let card = '';
    services.getCategoriesWithNumberCategories(index + 1, 1).then(data => {
      data.forEach(item => {
        card += `<li>${item.title}</li>`;
      });
      console.log(element);
      console.log(card);
      element.insertAdjacentHTML('beforeend', card);
    });
  });
}

function renderData() {
  getCategories().then(data => paint(data));
}
renderData();
