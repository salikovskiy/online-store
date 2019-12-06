import axios from 'axios';
import styles from './style.css';
// import addCardForm from '../templates/addCardForm.hbs';
import API from '../../services/services.js';

API.getAllProduct().then(data => console.log(data.categories));

// ------------Отрисовка шаблона------------

const modalForm = document.querySelector('.modalForm');
const openModalForm = document.querySelector('.create-ad');

const formMarkup = `
<div class="modalBox" method="POST">
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
            <span class="plusPhoto">+</span>
            <span class="plusPhoto"></span>
            <span class="plusPhoto"></span>
            <span class="plusPhoto"></span>
            <span class="plusPhoto"></span>
            <span class="plusPhoto"></span>
            <input type="file" name="images" class="fileInput" />
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
        <option id="1">Нерухомість</option>
        <option id="2">Транспорт</option>
        <option id="3">Робота</option>
        <option id="4">Електроніка</option>
        <option id="5">Бізнес та послуги</option>
        <option id="6">Відпочинок і спорт</option>
        <option id="7">Віддам безкоштовно</option>
        <option id="8">Обмін</option>
    </select>
</div>
<div class="fourthInput__Wrapper iw">
    <label class="fourthInput__label" for="fourthInput">Ціна</label>
    <input class="fourthInput" type="number" name="price" />
</div>
<div class="firthInput__Wrapper iw">
    <label for="fifthInput" class="fifthInput__label">Телефон</label>
    <input class="fifthInput" type="tel" name="phone" />
</div>
<button type="submit" class="addButton">Додати
</button>
</form>
</div>
</div>`;

// ------------Рендер формы по клику-------------

openModalForm.addEventListener('click', e => {
  e.preventDefault();
  modalForm.insertAdjacentHTML('beforeend', formMarkup);
  const modalBox = document.querySelector('.modalBox');
  const form = document.querySelector('.form');

  //   ----------Закртытие формы по клику (поставил слушателя внутрь слушателя, потому что второй слушатель не находит форму, так как она динамически отрисовывается)

  modalBox.addEventListener('click', e => {
    if (
      e.target.className === 'closeForm' ||
      e.target.className === 'material-icons' ||
      e.target.className === 'modalBox'
    ) {
      modalBox.classList.add('is-closed');
      form.classList.add('is-closed');
    }
  });

  // -------------Собираю данные из формы-------------

  form.addEventListener('submit', formHandleSubmit);
  function formHandleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {};
    formData.forEach((value, name) => {
      data[name] = value;
    });
    console.log('Объект данных из формы:', data);
  }
});

// ---------------Отправляю данные на сервер-----------
