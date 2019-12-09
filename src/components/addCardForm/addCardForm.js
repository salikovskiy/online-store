import axios from 'axios';
import styles from './addCardstyle.css';
import API from '../../services/services.js';

// ------------Отрисовка шаблона------------

const modalForm = document.querySelector('.modalForm');
const openModalForm = document.querySelector('.create-ad');

const category = {
  name: [],
  currentCategory: null,
};

async function getData() {
  category.allCategories = await API.getAllProduct().then(
    data => data.categories,
  );
  return API.getAllProduct().then(data => {
    data.categories.forEach(item => {
      category.name = [...category.name, item];
    });
    return category.name;
  });
}

const formMarkup = `
<div class="modalBox">
<div class="formWrapper">
<button type="button" class="closeForm" data-action="closeForm">
<i class="material-icons">close</i>
</button>
<form class="form">
<p class="formTitle">Додати оголошення</p>
<div class="firstInput__Wrapper iw">
<label for="firstInput" class="firstInput__label">Назва товару</label>
<input class="firstInput" type="text" name="title" />
</div>
<div class="secondInput__Wrapper iw">
<p class="secondInput--title">Фото</p>
<div class="formGroup">
<label class="secondLabel">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<image class="cardImg" src="" alt="" width="75" height="60">
<input type="file" name="images" class="fileInput" multiple />
</label>
</div>
</div>
<div class="thirdInput__Wrapper iw">
<label for="thirdInput" class="thirdInput__label">Опис товару</label>
<input class="thirdInput" type="text" name="description" />
</div>
<div class="selectWrapper iw">
<label for="select">Категорія товару</label>
<select class="categorySelect" name="category">
<option></option>
</select>
</div>
<div class="fourthInput__Wrapper iw">
<label class="fourthInput__label" for="fourthInput">Ціна</label>
<input class="fourthInput" type="number" name="price" />
</div>
<div class="firthInput__Wrapper iw">
<label for="fifthInput" class="fifthInput__label">Телефон</label>
<input class="fifthInput" type="text" name="phone" />
</div>
<button type="submit" class="addButton" data-action="submitForm">Додати
</button>
</form>
</div>
</div>`;

//--------------Рендер формы по клику---------------

openModalForm.addEventListener('click', e => {
  e.preventDefault();
  modalForm.insertAdjacentHTML('beforeend', formMarkup);
  const select = document.querySelector('.categorySelect');
  getData().then(data => {
    let string = '';
    data.forEach(
      item =>
        (string += `<option data-category="${item._id}">${item.category}</option>`),
    );
    select.insertAdjacentHTML('beforeend', string);
  });

  const newCardImg = document.querySelector('.cardImg');
  const addProductImg = document.querySelector('.fileInput');

  // function saveImg(url) {
  //   newCardImg.src = url;
  //   newCardImg.onload = function() {
  //     const key = encodeURIComponent(url);
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');
  //     ctx.drawImage(newCardImg, 0, 0);
  //   };
  // }

  // addProductImg.addEventListener('input', saveImg());

  // addProductImg.addEventListener('input', e => {
  //   const reader = new FileReader();
  //   reader.onload = e => {
  //     newCardImg.src = e.target.result;
  //   };
  //   addProductImg.addEventListener('change', e => {
  //     const file = e.target.files[0];
  //     reader.readAsDataURL(file);
  //     if (!file.type.match('image.*')) {
  //       alert('Невідомий формат, оберіть фото будь-ласка');
  //     }
  //   });
  // });

  //-------------Закртытие формы по клику и отправке-----------

  const modalBox = document.querySelector('.modalBox');
  const form = document.querySelector('.form');
  console.log(form);

  modalBox.addEventListener('click', e => {
    if (
      e.target.dataset.action === 'closeForm' ||
      e.target.className === 'material-icons' ||
      e.target.className === 'modalBox'
    ) {
      modalForm.innerHTML = '<div class="modalSpace"';
    }
  });

  //-------------Собираю данные из формы-------------

  form.addEventListener('submit', e => {
    category.currentCategory = document.querySelector('select').value;
    category.allCategories.forEach((item, index) => {
      if (item.category === category.currentCategory) {
        category.currentCategory = index + 1;
      }
    });
    e.preventDefault();
    const newCard = formParser();
    // API.adsProduct(newCard);
    modalForm.innerHTML = '<div class="modalSpace"';
    console.log('Объект данных из формы:', newCard);
  });
});

function formParser() {
  return {
    images: [document.querySelector('.fileInput').value],
    title: document.querySelector('.firstInput').value,
    category: category.currentCategory,
    price: Number(document.querySelector('.fourthInput').value),
    phone: document.querySelector('.fifthInput').value,
    description: document.querySelector('.thirdInput').value,
  };
}
