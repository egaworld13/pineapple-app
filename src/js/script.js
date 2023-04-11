'use strict';

// References to the  DOM.
const form = document.querySelector('#subscribe-form');
const emailInput = form.querySelector('#email-textbox');
const checkbox = form.elements.checkbox;
const errorContainer = document.querySelector('#error-msg');
const submitBtn = form.querySelector('button[type="submit"]');

const sectionSubscribe = document.querySelector('.section-subscribe');
const subscribeTitle = document.querySelector('.subscribe-title');
const subText = document.querySelector('.subtext');
const successIcon = document.querySelector('.icon-success');

// Disable content
submitBtn.disabled = true;
successIcon.classList.add('hidden');

//
// Define error messages.
const errorMessages = {
  invalidEmail: 'Please provide a valid email address',
  checkboxText: 'You must accept the terms and conditions',
  noEmail: 'Email address is required',
  colombiaText: 'We are not accepting subscription form Colombia emails',
};

//*** FUNCTIONS ***

// Submit button toggle function.
function toggleSubmitBtn() {
  submitBtn.disabled = !(
    validateCheckbox() && validateEmail({ target: { value: email.value } })
  );
}

// Displays an error message and border function.
function displayError(msg) {
  errorContainer.textContent = msg;
  emailInput.classList.toggle('error-border', msg !== '');
}

// Checkbox validation.
function validateCheckbox() {
  if (!checkbox.checked) {
    displayError(errorMessages.checkboxText);
    return false;
  }
  const isValidEmail = validateEmail({ target: { value: email.value } });
  if (!isValidEmail) {
    displayError(errorMessages.invalidEmail);
    return false;
  }

  displayError('');
  return true;
}

// Email input field validation.
function validateEmail(e) {
  const email = (e.target.value || '').toString().trim();

  if (!email) {
    displayError(errorMessages.noEmail);
    return false;
  } else if (!isValidEmailAddress(email)) {
    displayError(errorMessages.invalidEmail);
    if (email.endsWith('co')) {
      displayError(errorMessages.colombiaText);
    }
    return false;
  } else if (!checkbox.checked) {
    displayError(errorMessages.checkboxText);
    return false;
  }

  displayError('');
  return true;
}

// Regular expression function for email.
function isValidEmailAddress(email) {
  const regexPattern =
    /^[A-Za-z0-9._%+-]+@(?!.*\.co(?!\.[A-Za-z]{2,})$)[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/;

  return regexPattern.test(email);
}

//Success msg and icon display.
function validationSuccess() {
  form.classList.add('hidden');
  subscribeTitle.textContent = `Thanks for subscribing!`;
  subText.textContent = `
  You have successfully subscribed to our email listing.
  Check your email for the discount code.
  `;
  successIcon.classList.remove('hidden');
  sectionSubscribe.classList.add('spaceing-top');
}

//*** EVENT LISTENERS ***

// Event listener to the form's submit event.
form.addEventListener('submit', e => {
  e.preventDefault();
  if (validateCheckbox() && validateEmail({ target: { value: email.value } })) {
    validationSuccess();
  }
});

// Event listener to the email input field.
emailInput.addEventListener('input', () => {
  validateEmail({ target: { value: email.value } });
});

// Event listener to the checkbox input field.
checkbox.addEventListener('change', () => {
  validateCheckbox();
  toggleSubmitBtn();
});
