'use strict';

const PriceMinToType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const adFormElement = document.querySelector(`.ad-form`);
const titleInputElement = adFormElement.querySelector(`input[name=title]`);
const priceInputElement = adFormElement.querySelector(`input[name=price]`);
const typeSelectElement = adFormElement.querySelector(`select[name=type]`);
const timeInSelectElement = adFormElement.querySelector(`select[name=timein]`);
const timeOutSelectElement = adFormElement.querySelector(`select[name=timeout]`);
const roomsSelectElement = adFormElement.querySelector(`select[name=rooms]`);
const capacitySelectElement = adFormElement.querySelector(`select[name=capacity]`);


const onChangeMatchPriceToType = () => {
  priceInputElement.min = priceInputElement.placeholder = PriceMinToType[typeSelectElement.value];
};


const onChangeMatchTimesOut = () => {
  timeInSelectElement.value = timeOutSelectElement.value;
};

const onChangeMatchTimesIn = () => {
  timeOutSelectElement.value = timeInSelectElement.value;
};


const onInputCheckTitle = () => {
  if (titleInputElement.value.length < titleInputElement.minLength) {
    titleInputElement.setCustomValidity(
        `Заголовок должен состоять минимум из ${titleInputElement.minLength} символов`);
  } else if (titleInputElement.value.length > titleInputElement.maxLength) {
    titleInputElement.setCustomValidity(
        `Заголовок не должен превышать ${titleInputElement.maxLength} символов`);
  } else {
    titleInputElement.setCustomValidity(``);
  }

  titleInputElement.reportValidity();
};


const onInputCheckPrice = () => {
  if (+priceInputElement.value < priceInputElement.min) {
    priceInputElement.setCustomValidity(`Цена слишком маленькая`);
  } else if (+priceInputElement.value > priceInputElement.max) {
    priceInputElement.setCustomValidity(`Цена слишком большая`);
  } else {
    priceInputElement.setCustomValidity(``);
  }

  priceInputElement.reportValidity();
};


const onInputMatchRoomsToCapacity = () => {
  if (+capacitySelectElement.value === 0 && +roomsSelectElement.value !== 100) {
    roomsSelectElement.setCustomValidity(`Нужно 100 комнат`);
    capacitySelectElement.setCustomValidity(``);
  } else if (+capacitySelectElement.value !== 0 && +roomsSelectElement.value === 100) {
    roomsSelectElement.setCustomValidity(``);
    capacitySelectElement.setCustomValidity(`Не для гостей`);
  } else if (+capacitySelectElement.value > roomsSelectElement.value) {
    roomsSelectElement.setCustomValidity(`Нужно больше комнат`);
    capacitySelectElement.setCustomValidity(``);
  } else {
    roomsSelectElement.setCustomValidity(``);
    capacitySelectElement.setCustomValidity(``);
  }

  roomsSelectElement.reportValidity();
  capacitySelectElement.reportValidity();
};

window.validation = {
  onChangeMatchPriceToType,
  onChangeMatchTimesOut,
  onChangeMatchTimesIn,
  onInputCheckTitle,
  onInputCheckPrice,
  onInputMatchRoomsToCapacity
};
