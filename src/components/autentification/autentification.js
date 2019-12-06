import services from '../../services/services';

const refs = {
  login: document.querySelector('.login-register'),
  registrateForm: document.querySelector('.lightbox'),
  closeBtn: document.querySelector('[data-action = close-lightbox]'),
  form: document.querySelector('.form'),
  registerBtn: document.querySelector('[data-action = register]'),
  loginBtn: document.querySelector('[data-action = login]'),
  nameField: document.querySelector('[name=userName]'),
  actionContainer: document.querySelector('.action_container'),
};

const state = {
  isLogin: false,
  isRegistrateFormOpen: false,
  isRegistrated: true,
};

function openModalWindowWithRegistrationForm() {
  refs.registrateForm.classList.add('is-open');
}
function closeModalWindowWithRegistrationForm() {
  refs.registrateForm.classList.remove('is-open');
}

function getFormData(evt) {
  evt.preventDefault();

  evt.target.querySelectorAll('button').forEach(elem => {
    console.log(elem.textContent);
  });
  const data = {};

  evt.target.querySelectorAll('input').forEach(elem => {
    console.log(elem.value);
    if (elem.value !== '') {
      data[elem.name] = elem.value;
    }
  });

  const keys = Object.keys(data);

  if (keys.length === 3 && !state.isRegistrated) {
    console.log(keys.length);
    services.registrateUser(data);

    state.isRegistrated = 'true';
  } else if (keys.length === 2 && state.isRegistrated) {
    services.loginUser(data);
    refs.registrateForm.classList.remove('is-open');
    refs.login.textContent = 'Вийти';
  } else {
    services.logoutUser(data);
    refs.registrateForm.classList.remove('is-open');
    refs.login.textContent = 'Вийти';
    refs.login.removeEventListener(
      'click',
      openModalWindowWithRegistrationForm,
    );
  }
  console.log(keys.length);
  return data;
}
function exit() {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
}

function openRegistrateForm(evt) {
  if (!state.isRegistrateFormOpen) {
    state.isRegistrateFormOpen = 'true';
    refs.nameField.classList.remove('hidden');
    refs.loginBtn.style.display = 'none';
  } else {
    state.isRegistrateFormOpen = 'false';
    refs.registerBtn.setAttribute('type', 'submit');
  }
}

if (localStorage.getItem('token') === null) {
  console.log(refs.login.textContent);
  state.isLogin = true;
  //   refs.login.removeEventListener('click', exit);
  refs.login.addEventListener('click', openModalWindowWithRegistrationForm);
  refs.closeBtn.addEventListener('click', closeModalWindowWithRegistrationForm);
  refs.form.addEventListener('submit', getFormData);
  refs.registerBtn.addEventListener('click', openRegistrateForm);
  //refs.registerBtn.addEventListener('click', setSubmit);
}
if (localStorage.getItem('token')) {
  refs.registrateForm.classList.remove('is-open');
  refs.login.textContent = 'Вийти';
  //   refs.login.addEventListener('click', exit);
}
