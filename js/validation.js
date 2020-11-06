'use strict';

(function () {
  const PriceMinToType = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const adForm = document.querySelector(`.ad-form`);
  const titleInput = adForm.querySelector(`input[name=title]`);
  const priceInput = adForm.querySelector(`input[name=price]`);
  const typeSelect = adForm.querySelector(`select[name=type]`);
  const timeInSelect = adForm.querySelector(`select[name=timein]`);
  const timeOutSelect = adForm.querySelector(`select[name=timeout]`);
  const roomsSelect = adForm.querySelector(`select[name=rooms]`);
  const capacitySelect = adForm.querySelector(`select[name=capacity]`);


  let onChangeMatchPriceToType = function () {
    priceInput.min = priceInput.placeholder = PriceMinToType[typeSelect.value];
  };


  let onChangeMatchTimesOut = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  let onChangeMatchTimesIn = function () {
    timeOutSelect.value = timeInSelect.value;
  };


  let onInputCheckTitle = function () {
    if (titleInput.value.length < titleInput.minLength) {
      titleInput.setCustomValidity(`Заголовок должен состоять минимум из ${titleInput.minLength} символов`);
    } else if (titleInput.value.length > titleInput.maxLength) {
      titleInput.setCustomValidity(`Заголовок не должен превышать ${titleInput.maxLength} символов`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  };


  let onInputCheckPrice = function () {
    if (+priceInput.value < priceInput.min) {
      priceInput.setCustomValidity(`Цена слишком маленькая`);
    } else if (+priceInput.value > priceInput.max) {
      priceInput.setCustomValidity(`Цена слишком большая`);
    } else {
      priceInput.setCustomValidity(``);
    }

    priceInput.reportValidity();
  };


  let onInputMatchRoomsToCapacity = function () {
    if (+capacitySelect.value === 0 && +roomsSelect.value !== 100) {
      roomsSelect.setCustomValidity(`Нужно 100 комнат`);
      capacitySelect.setCustomValidity(``);
    } else if (+capacitySelect.value !== 0 && +roomsSelect.value === 100) {
      roomsSelect.setCustomValidity(``);
      capacitySelect.setCustomValidity(`Не для гостей`);
    } else if (+capacitySelect.value > roomsSelect.value) {
      roomsSelect.setCustomValidity(`Нужно больше комнат`);
      capacitySelect.setCustomValidity(``);
    } else {
      roomsSelect.setCustomValidity(``);
      capacitySelect.setCustomValidity(``);
    }

    roomsSelect.reportValidity();
    capacitySelect.reportValidity();
  };

  window.validation = {
    onChangeMatchPriceToType,
    onChangeMatchTimesOut,
    onChangeMatchTimesIn,
    onInputCheckTitle,
    onInputCheckPrice,
    onInputMatchRoomsToCapacity
  };
})();
