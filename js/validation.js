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
  const typeInput = adForm.querySelector(`select[name=type]`);
  const timeInInput = adForm.querySelector(`select[name=timein]`);
  const timeOutInput = adForm.querySelector(`select[name=timeout]`);
  const roomsInput = adForm.querySelector(`select[name=rooms]`);
  const capacityInput = adForm.querySelector(`select[name=capacity]`);


  let onChangeMatchPriceToType = function () {
    priceInput.min = priceInput.placeholder = PriceMinToType[typeInput.value];
  };


  let onChangematchTimesOut = function () {
    timeInInput.value = timeOutInput.value;
  };

  let onChangematchTimesIn = function () {
    timeOutInput.value = timeInInput.value;
  };


  let onInputValidateTitle = function () {
    if (titleInput.value.length < titleInput.minLength) {
      titleInput.setCustomValidity(`Заголовок должен состоять минимум из ${titleInput.minLength} символов`);
    } else if (titleInput.value.length > titleInput.maxLength) {
      titleInput.setCustomValidity(`Заголовок не должен превышать ${titleInput.maxLength} символов`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  };

  let onInputValidatePrice = function () {
    if (+priceInput.value < priceInput.min) {
      priceInput.setCustomValidity(`Цена слишком маленькая`);
    } else if (+priceInput.value > priceInput.max) {
      priceInput.setCustomValidity(`Цена слишком большая`);
    } else {
      priceInput.setCustomValidity(``);
    }

    priceInput.reportValidity();
  };

  let onInputValidateRoomCapacity = function () {
    if (+capacityInput.value === 0 && +roomsInput.value !== 100) {
      roomsInput.setCustomValidity(`Нужно 100 комнат`);
      capacityInput.setCustomValidity(``);
    } else if (+capacityInput.value !== 0 && +roomsInput.value === 100) {
      roomsInput.setCustomValidity(``);
      capacityInput.setCustomValidity(`Не для гостей`);
    } else if (+capacityInput.value > roomsInput.value) {
      roomsInput.setCustomValidity(`Нужно больше комнат`);
      capacityInput.setCustomValidity(``);
    } else {
      roomsInput.setCustomValidity(``);
      capacityInput.setCustomValidity(``);
    }

    roomsInput.reportValidity();
    capacityInput.reportValidity();
  };

  window.validation = {
    onChangeMatchPriceToType,
    onChangematchTimesOut,
    onChangematchTimesIn,
    onInputValidateTitle,
    onInputValidatePrice,
    onInputValidateRoomCapacity
  };
})();
