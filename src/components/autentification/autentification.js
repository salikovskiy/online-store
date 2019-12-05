import services from '../../services/services';
import test from '../../services/test';
// import refs from '../autentification/registrationServices';
const refs = {
  login: document.querySelector('.login-register'),
  registrateForm: document.querySelector('.lightbox'),
  closeBtn: document.querySelector('[data-action = close-lightbox]'),
  form: document.querySelector('.form'),
  registerBtn: document.querySelector('[data-action = register]'),
  loginBtn: document.querySelector('[data-action = login]'),
};

const state = {
  isLogin: false,
};

function openModalWindowWithRegistrationForm() {
  refs.registrateForm.classList.add('is-open');
}
function closeModalWindowWithRegistrationForm() {
  refs.registrateForm.classList.remove('is-open');
}

function getFormData(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  const data = {};
  //   let getEmail = evt.currentTarget.elements.email.value;
  //   let getPassword = evt.currentTarget.elements.password.value;
  //   let getUserName = evt.currentTarget.elements.userName.value;
  //   formData.append('email', evt.currentTarget.elements.email.value);
  //   formData.append('password', evt.currentTarget.elements.password.value);
  //   formData.append('userName', evt.currentTarget.elements.userName.value);
  console.log(formData);
  formData.forEach((value, name) => {
    data[name] = value;
  });
  //   services.registrateUser(data);
  //   services.loginUser(data);
  //   services.logoutUser(data);

  return data;
}

function openRegistrateForm(evt) {
  evt.currentTarget.elements.userName.classList.remove('hidden');
  refs.loginBtn.style.display = 'none';
}

if (localStorage.getItem('token') === null) {
  refs.login.style.display = 'block';
  state.isLogin = true;
  refs.login.addEventListener('click', openModalWindowWithRegistrationForm);
  refs.closeBtn.addEventListener('click', closeModalWindowWithRegistrationForm);
  refs.form.addEventListener('submit', getFormData);
  refs.form.addEventListener('click', openRegistrateForm);
}
