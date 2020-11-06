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


  let onLoad = function () {
    window.backend.load(onActivePage, window.backend.errorHandler);
  };

  let onMainPinEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      if (window.backend.announcements.length === 0) {
        onLoad();
      } else {
        onActivePage();
      }
    }
  };

  let onActivePage = function (data) {
    if (window.backend.announcements.length === 0) {
      window.backend.announcements = data.filter(function (item) {
        return item.offer !== undefined;
      });
    }

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.adForm.changeFormAbility(adForm, true);
    window.adForm.changeFormAbility(filtersForm, true);

    if (!pinsList.querySelector(`.map__pin:not(.map__pin--main)`)) {
      window.pin.renderPinsArray(window.filterData.cutData(window.backend.announcements));
    }

    typeInput.addEventListener(`change`, window.validation.onChangeMatchPriceToType);
    timeInInput.addEventListener(`change`, window.validation.onChangematchTimesIn);
    timeOutInput.addEventListener(`change`, window.validation.onChangematchTimesOut);
    titleInput.addEventListener(`input`, window.validation.onInputValidateTitle);
    priceInput.addEventListener(`input`, window.validation.onInputValidatePrice);
    roomsInput.addEventListener(`input`, window.validation.onInputValidateRoomCapacity);
    capacityInput.addEventListener(`input`, window.validation.onInputValidateRoomCapacity);

    map.addEventListener(`click`, window.card.onClickOpenPopup);
    map.addEventListener(`keydown`, window.card.onPinEnterPressOpenPopup);

    pinMain.removeEventListener(`mousedown`, onLoad);
    pinMain.removeEventListener(`mousedown`, onActivePage);
    pinMain.removeEventListener(`keydown`, onMainPinEnterPress);

    adForm.addEventListener(`submit`, onSubmitEvtListeners);

    filtersForm.addEventListener(`change`, window.filterData.onChangeFilter);
  };


  let getInactive = function () {
    map.classList.add(`map--faded`);
    adForm.reset();
    filtersForm.reset();
    window.adForm.changeFormAbility(adForm, false);
    window.adForm.changeFormAbility(filtersForm, false);
    adForm.classList.add(`ad-form--disabled`);

    for (let pin of pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`)) {
      pin.remove();
    }

    typeInput.removeEventListener(`change`, window.validation.onChangeMatchPriceToType);
    timeInInput.removeEventListener(`change`, window.validation.onChangematchTimesIn);
    timeOutInput.removeEventListener(`change`, window.validation.onChangematchTimesOut);
    titleInput.removeEventListener(`input`, window.validation.onInputValidateTitle);
    priceInput.removeEventListener(`input`, window.validation.onInputValidatePrice);
    roomsInput.removeEventListener(`input`, window.validation.onInputValidateRoomCapacity);
    capacityInput.removeEventListener(`input`, window.validation.onInputValidateRoomCapacity);

    map.removeEventListener(`click`, window.card.onClickOpenPopup);
    map.removeEventListener(`keydown`, window.card.onPinEnterPressOpenPopup);

    adForm.removeEventListener(`submit`, onSubmitEvtListeners);

    filtersForm.removeEventListener(`change`, window.filterData.onChangeFilter);

    setListenersToPinMain();

    window.card.onClickClosePopup();
  };


  let submitSuccessHandler = function () {
    window.adForm.submitForm(getInactive);
  };

  let onSubmitEvtListeners = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), submitSuccessHandler, window.backend.errorHandler);
  };


  let setListenersToPinMain = function () {
    pinMain.addEventListener(`mousedown`, window.move.onMovePin);

    if (window.backend.announcements.length === 0) {
      pinMain.addEventListener(`mousedown`, onLoad);
    } else {
      pinMain.addEventListener(`mousedown`, onActivePage);
    }

    pinMain.addEventListener(`keydown`, onMainPinEnterPress);
  };


  setListenersToPinMain();
})();
