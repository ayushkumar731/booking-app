
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { forgotSettings } from './forgotSetting';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signUpForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const forgotForm = document.querySelector('.form--forgot');
const resetpasswordForm = document.querySelector('.form--resetpassword');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--sigin').textContent = 'Processing...';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await login(email, password);
    document.querySelector('.btn--sigin').textContent = 'Login';
  });

if (signUpForm) {
  signUpForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--sign-up').textContent = 'Processing...';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    await signup(name, email, password, passwordConfirm);
    document.querySelector('.btn--sign-up').textContent = 'Sign Up';
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (forgotForm) {
  forgotForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--forgot').textContent = 'Processing...';
    const email = document.getElementById('email').value;
    await forgotSettings({ email }, 'forgot', 'Check Your Email', 'POST');
    document.querySelector('.btn--forgot').textContent = 'Submit';
  });
}

if (resetpasswordForm) {
  resetpasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--reset-password').textContent =
      'Processing...';
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const token = window.location.href;
    await forgotSettings(
      { password, passwordConfirm },
      'reset',
      'Updated Successfully',
      'PATCH',
      token
    );
    document.querySelector('.btn--reset-password').textContent = 'Continue';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
