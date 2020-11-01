'use strict';

(function () {
  const PriceMinToType = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  const pinMain = document.querySelector(`.map__pin--main`);
  const pinMainWidth = pinMain.offsetWidth;
  const pinMainHeight = pinMain.offsetHeight;
  const adForm = document.querySelector(`.ad-form`);
  const addressInput = adForm.querySelector(`input[name=address]`);
  const titleInput = adForm.querySelector(`input[name=title]`);
  const priceInput = adForm.querySelector(`input[name=price]`);
  const typeInput = adForm.querySelector(`select[name=type]`);
  const timeInInput = adForm.querySelector(`select[name=timein]`);
  const timeOutInput = adForm.querySelector(`select[name=timeout]`);
  const roomsInput = adForm.querySelector(`select[name=rooms]`);
  const capacityInput = adForm.querySelector(`select[name=capacity]`);
  const filtersForm = document.querySelector(`.map__filters`);


  let changeFormAbility = function (form, ability) {
    const fieldsets = form.querySelectorAll(`fieldset`);
    const selects = form.querySelectorAll(`select`);

    for (let fieldset of fieldsets) {
      fieldset.disabled = !ability;
    }

    for (let select of selects) {
      select.disabled = !ability;
    }
  };

  changeFormAbility(adForm, false);
  changeFormAbility(filtersForm, false);


  let getAddressFromPinPosition = function (yFromUpLeft, xFromUpLeft = pinMainWidth / 2) {
    return `${parseInt(parseInt(pinMain.style.left, 10) + xFromUpLeft, 10)}, ${parseInt(parseInt(pinMain.style.top, 10) + yFromUpLeft, 10)}`;
  };

  addressInput.value = getAddressFromPinPosition(pinMainHeight / 2);


  let matchPriceToType = function () {
    priceInput.min = priceInput.placeholder = PriceMinToType[typeInput.value];
  };


  let matchTimesOut = function () {
    timeInInput.value = timeOutInput.value;
  };

  let matchTimesIn = function () {
    timeOutInput.value = timeInInput.value;
  };


  let validateTitle = function () {
    if (titleInput.value.length < titleInput.minLength) {
      titleInput.setCustomValidity(`Заголовок должен состоять минимум из ${titleInput.minLength} символов`);
    } else if (titleInput.value.length > titleInput.maxLength) {
      titleInput.setCustomValidity(`Заголовок не должен превышать ${titleInput.maxLength} символов`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  };

  let validatePrice = function () {
    if (+priceInput.value < priceInput.min) {
      priceInput.setCustomValidity(`Цена слишком маленькая`);
    } else if (+priceInput.value > priceInput.max) {
      priceInput.setCustomValidity(`Цена слишком большая`);
    } else {
      priceInput.setCustomValidity(``);
    }

    priceInput.reportValidity();
  };

  let validateRoomCapacity = function () {
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

  window.form = {
    changeFormAbility,
    getAddressFromPinPosition,
    matchPriceToType,
    matchTimesOut,
    matchTimesIn,
    validateTitle,
    validatePrice,
    validateRoomCapacity
  };
})();
