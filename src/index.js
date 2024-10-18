import 'babel-polyfill';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import { el, setChildren } from 'redom';
import valid from 'card-validator';
import validator from 'email-validator-rfc-5322';
import IMask from 'imask';

import americanExpressImage from './assets/images/american-express.jpg';
import dinersClubImage from './assets/images/diners-club-international.jpg';
import discoverNetworkImage from './assets/images/discover-network.jpg';
import jcbImage from './assets/images/jcb.jpg';
import maestroImage from './assets/images/maestro.jpg';
import mastercardImage from './assets/images/mastercard.jpg';
import mirImage from './assets/images/mir.jpg';
import unionpayImage from './assets/images/unionpay.jpg';
import visaImage from './assets/images/visa.jpg';

const icons = {
  'american-express.jpg': americanExpressImage,
  'diners-club-international.jpg': dinersClubImage,
  'discover-network.jpg': discoverNetworkImage,
  'jcb.jpg': jcbImage,
  'maestroImage.jpg': maestroImage,
  'mastercard.jpg': mastercardImage,
  'mir.jpg': mirImage,
  'unionpay.jpg': unionpayImage,
  'visa.jpg': visaImage,
};

export function createDOM() {
  const container = el('div', { class: 'container p-5' });
  const card = el(
    'div',
    { class: 'card p-3 mx-auto w-50 text-bg-light' },
    el(
      'form',
      { class: 'form', id: 'form', action: '#', method: 'POST' },
      el(
        'div',
        { class: 'input-content mb-2' },
        el(
          'label',
          { for: 'card-number', class: 'form-label mb-0 small' },
          'Номер карты:'
        ),
        el('input', {
          type: 'text',
          class: 'form-control pl-2 pr-5 py-1',
          id: 'card-number',
          name: 'card-number',
          required: true,
          placeholder: 'Номер карты',
        })
      ),

      el(
        'div',
        { class: 'd-flex justify-content-between input-item mb-2' },
        el(
          'div',
          { class: 'input-content me-4' },
          el(
            'label',
            { for: 'expiry-date', class: 'form-label mb-0 small' },
            'Срок действия:'
          ),
          el('input', {
            type: 'text',
            class: 'form-control px-2 py-1',
            id: 'expiry-date',
            name: 'expiry-date',
            required: true,
            placeholder: 'ММ/ГГ',
          })
        ),
        el(
          'div',
          { class: 'input-content' },
          el(
            'label',
            { for: 'cvc', class: 'form-label mb-0 small' },
            'CVC/CVV:'
          ),
          el('input', {
            type: 'text',
            class: 'form-control px-2 py-1',
            id: 'cvc',
            name: 'cvc',
            required: true,
            placeholder: 'CVV/CVC',
          })
        )
      ),

      el(
        'div',
        { class: 'input-content mb-3' },
        el('label', { for: 'email', class: 'form-label mb-0 small' }, 'Email:'),
        el('input', {
          type: 'email',
          class: 'form-control px-2 py-1',
          id: 'email',
          name: 'email',
          required: true,
          placeholder: 'Email',
        })
      ),

      el(
        'button',
        {
          type: 'submit',
          class: 'btn btn-primary',
          id: 'btn-submit',
          disabled: 'true',
        },
        'Отправить'
      )
    )
  );

  setChildren(window.document.body, container);
  setChildren(container, card);

  return window.document.body;
}

createDOM();

const form = document.getElementById('form');
const cardNumberInput = document.getElementById('card-number');
const expiryDateInput = document.getElementById('expiry-date');
const cvcInput = document.getElementById('cvc');
const emailInput = document.getElementById('email');
const btn = document.getElementById('btn-submit');

IMask(cardNumberInput, {
  mask: '0000 0000 0000 0000',
});

IMask(expiryDateInput, {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: 0,
      to: 99,
      maxLength: 2,
    },
  },
});

IMask(cvcInput, {
  mask: '000',
});

cardNumberInput.addEventListener('input', () => {
  let numberValidation = valid.number(cardNumberInput.value);

  if (numberValidation && numberValidation.card) {
    const cardType = numberValidation.card.type;

    if (cardType) {
      showLogo(cardType);
    } else {
      clearLogo();
    }
  } else {
    clearLogo();
  }
});

function showLogo(payment) {
  const logoSrc = icons[`${payment}.jpg`];

  if (logoSrc) {
    cardNumberInput.style.backgroundImage = `url(${logoSrc})`;
    cardNumberInput.classList.add('show-logo');
  } else {
    clearLogo();
  }
}

function clearLogo() {
  cardNumberInput.style.backgroundImage = 'none';
  cardNumberInput.classList.remove('show-logo');
}

form.addEventListener('input', validateForm);

export function isCardNumberValid(cardNumber) {
  const cleanedNumber = cardNumber.replace(/\s+/g, '');

  return cleanedNumber.length === 16 && /^\d+$/.test(cleanedNumber);
}

function isExpiryDateValid(expiryDate) {
  return validateExpiryDate(expiryDate);
}

export function isCvcValid(cvc) {
  const cleanCvc = cvc.replace(/\s+/g, '');
  return cvc.length === 3 && /^\d+$/.test(cleanCvc);
}

function isEmailValid(email) {
  return validator.validate(email);
}

function validateForm() {
  const isFormValid =
    isCardNumberValid(cardNumberInput.value) &&
    isExpiryDateValid(expiryDateInput.value) &&
    isCvcValid(cvcInput.value) &&
    isEmailValid(emailInput.value);
  btn.disabled = !isFormValid;
}

function validateInput(inputElement, validateFunction) {
  inputElement.addEventListener('blur', () => {
    if (!validateFunction(inputElement.value)) {
      inputElement.classList.add('is-invalid');
    }
  });

  inputElement.addEventListener('input', () => {
    inputElement.classList.remove('is-invalid');
    validateForm();
  });
}

validateInput(cardNumberInput, isCardNumberValid);
validateInput(expiryDateInput, isExpiryDateValid);
validateInput(cvcInput, isCvcValid);
validateInput(emailInput, isEmailValid);

function validateExpiryDate(value) {
  const [month, year] = value.split('/').map((part) => part.trim());

  if (!month || !year || month.length !== 2 || year.length !== 2) {
    return false;
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  if (month < 1 || month > 12) {
    return false;
  }

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
}
