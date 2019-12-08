import services from '../../services/services';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
const refs = {
  login: document.querySelector('.login-register'),
  registrationForm: document.querySelector('.lightbox'),
  closeBtn: document.querySelector('[data-action = close-lightbox]'),
  form: document.querySelector('.form'),
  registerBtn: document.querySelector('[data-action = register]'),
  loginBtn: document.querySelector('[data-action = login]'),
  nameField: document.querySelector('[name=name]'),
  actionContainer: document.querySelector('.action_container'),
};

const state = {
  isLogin: false,
  isRegistrationFormOpen: false,
  isRegistered: false,
};

function openModalWindowWithRegistrationForm() {
  refs.registrationForm.classList.add('is-open');
}
function closeModalWindowWithRegistrationForm() {
  refs.registrationForm.classList.remove('is-open');
}

async function getFormData(evt) {
  evt.preventDefault();
  const data = {};
  evt.target.querySelectorAll('input').forEach(elem => {
    if (elem.value !== '') {
      data[elem.name] = elem.value;
    }
  });

  const keys = Object.keys(data);
  let result;
  if (keys.length === 3) {
    console.log(keys.length);
    // loader-> with await im waiting for result->close loader
    result = await services.registrateUser(data);
    if (result.data.error) {
      const regex = /[a-z0-9\.\-\+]+@[a-z0-9\.\-\+]+/gim;
      const res = result.data.error;
      PNotify.error(`This email: ${res.match(regex)} already exists`);
    } else {
      PNotify.success('You have registrated successfully');
    }
    console.log(result);
  } else if (keys.length === 2) {
    // loader-> with await im waiting for result->close loader
    result = await services.loginUser(data);
  }
  if (result.data.status === 'success') {
    setListeners();
    closeModalWindowWithRegistrationForm();
  }
}

function exit() {
  services.logoutUser().then(function() {
    setListeners();
  });
}

function openRegistrateForm(evt) {
  if (!state.isRegistrationFormOpen) {
    state.isRegistrationFormOpen = true;
    refs.nameField.classList.remove('hidden');
    refs.nameField.setAttribute('required', 'required');
    refs.loginBtn.style.display = 'none';
  } else {
    refs.registerBtn.setAttribute('type', 'submit');
  }
}

function setListeners() {
  if (localStorage.getItem('token') === null) {
    state.isLogin = false;
    refs.login.textContent = 'Реєстрація/Увійти';
    refs.login.removeEventListener('click', exit);
    refs.login.addEventListener('click', openModalWindowWithRegistrationForm);
    refs.closeBtn.addEventListener(
      'click',
      closeModalWindowWithRegistrationForm,
    );
    refs.form.addEventListener('submit', getFormData);
    refs.registerBtn.addEventListener('click', openRegistrateForm);
  } else {
    state.isLogin = true;
    refs.login.textContent = 'Вийти';
    refs.login.removeEventListener(
      'click',
      openModalWindowWithRegistrationForm,
    );
    refs.form.removeEventListener('submit', getFormData);
    refs.closeBtn.removeEventListener(
      'click',
      closeModalWindowWithRegistrationForm,
    );
    refs.registerBtn.removeEventListener('click', openRegistrateForm);
    refs.registrationForm.classList.remove('is-open');
    refs.login.addEventListener('click', exit);
  }
}
setListeners();
