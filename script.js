'use strict';

const bill = document.getElementById('bill');
const tips = Array.from(document.querySelectorAll('.tip'));
const tipCustom = document.getElementById('tip-custom');
const person = document.getElementById('person');
const tipAmount = document.querySelector('.tip-amount-right');
const total = document.querySelector('.total-right');
const btnReset = document.querySelector('.reset');

let billValue, tipValue, personValue;

const calculateTipAndRender = function (value) {
  billValue = Number(bill.value);
  if (!value) return;
  tipValue = billValue * Number(value);

  let totalAmount = +billValue + tipValue;

  personValue = Number(person.value);

  if (!personValue || +personValue === 0) return;

  const tipAmountPerson = Number(tipValue / personValue).toFixed(2);
  tipAmount.textContent = `$${tipAmountPerson}`;

  const totalAmountPerson = Number(totalAmount / personValue).toFixed(2);
  total.textContent = `$${totalAmountPerson}`;
};

const getTip = function () {
  tips.forEach((tip) => {
    tip.addEventListener('click', function (e) {
      e.preventDefault();
      tipCustom.value = '';
      calculateTipAndRender(e.target.value);
    });
  });
};

getTip();

const activateResetBtn = function (value) {
  if (+value === 0) {
    btnReset.style.opacity = 0.5;
    btnReset.style.cursor = 'auto';
  } else {
    btnReset.style.opacity = 1;
    btnReset.style.cursor = 'pointer';
  }
};

person.oninput = function () {
  if (Number(tipCustom.value) > 100) return;
  else {
    calculateTipAndRender(tipCustom.value / 100);
  }

  activateResetBtn(person.value);
};

bill.oninput = function () {
  activateResetBtn(bill.value);
};

const reset = function () {
  tipAmount.textContent = `$0.00`;
  total.textContent = `$0.00`;
  bill.value = tipCustom.value = person.value = '';
  btnReset.style.opacity = 0.5;
  btnReset.style.cursor = 'auto';
};

btnReset.onclick = function (e) {
  e.preventDefault();
  reset();
};
