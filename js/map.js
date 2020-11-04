'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const pinsList = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const titleInput = adForm.querySelector(`input[name=title]`);
  const priceInput = adForm.querySelector(`input[name=price]`);
  const typeInput = adForm.querySelector(`select[name=type]`);
  const timeInInput = adForm.querySelector(`select[name=timein]`);
  const timeOutInput = adForm.querySelector(`select[name=timeout]`);
  const roomsInput = adForm.querySelector(`select[name=rooms]`);
  const capacityInput = adForm.querySelector(`select[name=capacity]`);
  const filtersForm = document.querySelector(`.map__filters`);


  let onActivePage = function () {
    window.backend.load(getActive, window.backend.errorHandler);
  };

  let onMainPinEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      if (window.backend.announcements.length === 0) {
        onActivePage();
      } else {
        getActive();
      }
    }
  };

  let getActive = function (data) {
    if (window.backend.announcements.length === 0) {
      window.backend.announcements = data;
    }

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.form.changeFormAbility(adForm, true);
    window.form.changeFormAbility(filtersForm, true);

    if (!pinsList.querySelector(`.map__pin:not(.map__pin--main)`)) {
      window.pin.renderPinsArray(window.backend.announcements);
    }

    typeInput.addEventListener(`change`, window.validation.matchPriceToType);
    timeInInput.addEventListener(`change`, window.validation.matchTimesIn);
    timeOutInput.addEventListener(`change`, window.validation.matchTimesOut);
    titleInput.addEventListener(`input`, window.validation.validateTitle);
    priceInput.addEventListener(`input`, window.validation.validatePrice);
    roomsInput.addEventListener(`input`, window.validation.validateRoomCapacity);
    capacityInput.addEventListener(`input`, window.validation.validateRoomCapacity);

    map.addEventListener(`click`, window.card.openPopup);
    map.addEventListener(`keydown`, window.card.onPinEnterPress);

    pinMain.removeEventListener(`mousedown`, onActivePage);
    pinMain.removeEventListener(`mousedown`, getActive);
    pinMain.removeEventListener(`keydown`, onMainPinEnterPress);

    adForm.addEventListener(`submit`, setFormEvtListener);
  };


  let getInactive = function () {
    map.classList.add(`map--faded`);
    adForm.reset();
    filtersForm.reset();
    window.form.changeFormAbility(adForm, false);
    window.form.changeFormAbility(filtersForm, false);
    adForm.classList.add(`ad-form--disabled`);

    for (let pin of pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`)) {
      pin.remove();
    }

    typeInput.removeEventListener(`change`, window.validation.matchPriceToType);
    timeInInput.removeEventListener(`change`, window.validation.matchTimesIn);
    timeOutInput.removeEventListener(`change`, window.validation.matchTimesOut);
    titleInput.removeEventListener(`input`, window.validation.validateTitle);
    priceInput.removeEventListener(`input`, window.validation.validatePrice);
    roomsInput.removeEventListener(`input`, window.validation.validateRoomCapacity);
    capacityInput.removeEventListener(`input`, window.validation.validateRoomCapacity);

    map.removeEventListener(`click`, window.card.openPopup);
    map.removeEventListener(`keydown`, window.card.onPinEnterPress);

    adForm.removeEventListener(`submit`, setFormEvtListener);

    setListenersToPinMain();

    window.card.closePopup();
  };

  let successMessage;

  let removeSuccessMessage = function () {
    successMessage.remove();
    document.removeEventListener(`click`, removeSuccessMessage);
  };

  let onEscPressRemoveSuccessMessage = function (evt) {
    if (evt.key === `Escape`) {
      removeSuccessMessage();
    }
    document.removeEventListener(`keydown`, onEscPressRemoveSuccessMessage);
  };


  let successHandler = function () {
    successMessage = window.backend.renderSuccessMessage();
    getInactive();

    document.addEventListener(`click`, removeSuccessMessage);
    document.addEventListener(`keydown`, onEscPressRemoveSuccessMessage);
  };


  let setFormEvtListener = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), successHandler, window.backend.errorHandler);
  };


  let setListenersToPinMain = function () {
    pinMain.addEventListener(`mousedown`, window.move);

    if (window.backend.announcements.length === 0) {
      pinMain.addEventListener(`mousedown`, onActivePage);
    } else {
      pinMain.addEventListener(`mousedown`, getActive);
    }

    pinMain.addEventListener(`keydown`, onMainPinEnterPress);
  };


  setListenersToPinMain();
})();
