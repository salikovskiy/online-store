import services from '../../services/services';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
const refs = {
  login: document.querySelector('.login-register'),
  registrationForm: document.querySelector('.lightboxRegistration'),
  closeBtn: document.querySelector('[data-action = close-lightboxR]'),
  form: document.querySelector('.form'),
  registerBtn: document.querySelector('[data-action = register]'),
  loginBtn: document.querySelector('[data-action = login]'),
  nameField: document.querySelector('[name=name]'),
  actionContainer: document.querySelector('.action_container'),
  exitBtn: document.querySelector('.popup-exit'),
};

const state = {
  isLogin: false,
  isRegistrationFormOpen: false,
  isRegistered: false,
};

function openModalWindowWithRegistrationForm() {
  refs.registrationForm.classList.add('isOpened');
}
function closeModalWindowWithRegistrationForm() {
  refs.registrationForm.classList.remove('isOpened');
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
      // PNotify.success('You have registrated successfully');
      showStackModalLeft('success');
    }
    console.log(result);
  } else if (keys.length === 2) {
    // loader-> with await im waiting for result->close loader
    try {
      result = await services.loginUser(data);
    } catch (error) {
      PNotify.error('You entered invalid email or password');
    }
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
    // refs.exitBtn.removeEventListener('click', exit);
    refs.login.addEventListener('click', openModalWindowWithRegistrationForm);
    refs.closeBtn.addEventListener(
      'click',
      closeModalWindowWithRegistrationForm,
    );
    refs.form.addEventListener('submit', getFormData);
    refs.registerBtn.addEventListener('click', openRegistrateForm);
  } else {
    state.isLogin = true;
    refs.login.style.display = 'none';
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
    refs.registrationForm.classList.remove('isOpened');
    // refs.exitBtn.addEventListener('click', exit);
  }
}
setListeners();

function showStackModalLeft(type) {
  if (typeof window.stackModalLeft === 'undefined') {
    window.stackModalLeft = {
      dir1: 'down',
      dir2: 'right',
      firstpos1: 25,
      firstpos2: 25,
      push: 'top',
      modal: false,
      overlayClose: true,
    };
  }
  var opts = {
    title: 'Over Here',
    text: "Check me out. I'm in a different stack.",
    stack: window.stackModalLeft,
  };
  switch (type) {
    case 'error':
      opts.title = 'Oh No';
      opts.text = 'Watch out for that water tower!';
      opts.type = 'error';
      break;
    case 'info':
      opts.title = 'Breaking News';
      opts.text = 'Have you met Ted?';
      opts.type = 'info';
      break;
    case 'success':
      opts.title = 'Congratulations!';
      opts.text = 'You have registrated successfully!';
      opts.type = 'success';
      break;
  }
  PNotify.alert(opts);
}
