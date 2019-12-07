import services from '../../services/services.js';
import templateOption from '../templates/templateOptionFilter.hbs';
import './filter.css';

services.getAllProduct().then(data => {
  //   console.log(data);
  const option = templateOption(data.categories);
  services.refs.formSelect.insertAdjacentHTML('beforeend', option);
});

services.refs.formFilter.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const numberCategory = e.target.elements.categories.value;

  if (e.target.elements.inputBefore.value === '') {
    services
      .getCategoriesWithNumberCategories(numberCategory, 1)
      .then(result => {
        // console.log(result);
        render(result);
      });
  } else {
    services.getAllProduct().then(data => {
      services.limitExtradition(data.totalDocs, 1).then(dataAll => {
        let newArr = dataAll.docs.reduce((acc, el) => {
          el.price > Number(e.target.elements.inputFrom.value) &&
            el.price < Number(e.target.elements.inputBefore.value) &&
            acc.push(el);
          return acc;
        }, []);

        newArr = newArr.reduce((acc, el) => {
          el.category === Number(numberCategory) && acc.push(el);
          return acc;
        }, []);
        render(newArr);
      });
    });
  }
}

function render(arr) {
  services.getAllProduct().then(data => {
    const template = arr.map(item => {
      const itemsCard = `<div class="card"> <li class="itemCard" data-id="${item._id}" key="${item._id}"><div class="imageContainer">
                <img src='${item.images}'/>
                <div alt=${item.title}
                  class='itemImage'>
              </div>
              <div class=" overlay"></div>
              <div class="itemInfo">
                          <h2 class="itemTitle">${item.title}</h2>
                          <p class="itemPrice">${item.price}</p>
                          <button class="button" > put me </button>
                      </div>
              </li>
                  </div>`;
      return itemsCard;
      //   refs.gallery.innerHTML += itemsCard;
    });
    document.querySelector('.main').innerHTML = template.join('');
  });
}
