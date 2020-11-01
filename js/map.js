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



  let submitForm = function () {
    map.classList.add(`map--faded`);
    adForm.reset();
    filtersForm.reset();
    window.form.changeFormAbility(adForm, false);
    window.form.changeFormAbility(filtersForm, false);
    adForm.classList.add(`ad-form--disabled`);
    for (let pin of pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`)) {
      pin.remove();
    }
    adForm.removeEventListener(`submit`, setFormEvtListener);
  };

  let setFormEvtListener = function(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), submitForm, window.backend.errorHandler);
  }

  let getActive = function () {
    debugger
    // if (window.backend.announcements.length === 0) {
      window.backend.load(window.backend.createAnnouncementsArray, window.backend.errorHandler);
    // }

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

    pinMain.removeEventListener(`mousedown`, getActive);
    pinMain.removeEventListener(`keydown`, onMainPinEnterPress);
  };

  let onMainPinEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      getActive();
    }
  };

  let setListenersToPinMain = function () {
    pinMain.addEventListener(`mousedown`, window.move);
    pinMain.addEventListener(`mousedown`, getActive);
    pinMain.addEventListener(`keydown`, onMainPinEnterPress);
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

    adForm.removeEventListener(`submit`, setFormEvtListener);
  }

  setListenersToPinMain();
})();
