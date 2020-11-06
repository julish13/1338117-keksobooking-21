'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const pinsList = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const pinMainHeight = pinMain.offsetHeight;
  const filtersForm = document.querySelector(`.map__filters`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormReset = adForm.querySelector(`.ad-form__reset`);
  const addressInput = adForm.querySelector(`input[name=address]`);
  const titleInput = adForm.querySelector(`input[name=title]`);
  const priceInput = adForm.querySelector(`input[name=price]`);
  const typeSelect = adForm.querySelector(`select[name=type]`);
  const timeInSelect = adForm.querySelector(`select[name=timein]`);
  const timeOutSelect = adForm.querySelector(`select[name=timeout]`);
  const roomsSelect = adForm.querySelector(`select[name=rooms]`);
  const capacitySelect = adForm.querySelector(`select[name=capacity]`);

  const PIN_TAIL = 26;

  const startCoords = window.adForm.getCoordsFromPinPosition();


  let onLoad = function () {
    window.backend.load(onActivePage, window.backend.onLoadError);
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
    window.adForm.changeAbility(adForm, true);
    window.adForm.changeAbility(filtersForm, true);

    addressInput.value = window.adForm.getAddressFromPinPosition(pinMainHeight + PIN_TAIL);

    if (!pinsList.querySelector(`.map__pin:not(.map__pin--main)`)) {
      window.renderPinsArray(window.filterData.cutData(window.backend.announcements));
    }

    typeSelect.addEventListener(`change`, window.validation.onChangeMatchPriceToType);
    timeInSelect.addEventListener(`change`, window.validation.onChangeMatchTimesIn);
    timeOutSelect.addEventListener(`change`, window.validation.onChangeMatchTimesOut);
    titleInput.addEventListener(`input`, window.validation.onInputCheckTitle);
    priceInput.addEventListener(`input`, window.validation.onInputCheckPrice);
    roomsSelect.addEventListener(`input`, window.validation.onInputMatchRoomsToCapacity);
    capacitySelect.addEventListener(`input`, window.validation.onInputMatchRoomsToCapacity);

    map.addEventListener(`click`, window.card.onClickOpenPopup);
    map.addEventListener(`keydown`, window.card.onPinEnterPressOpenPopup);

    pinMain.removeEventListener(`mousedown`, onLoad);
    pinMain.removeEventListener(`mousedown`, onActivePage);
    pinMain.removeEventListener(`keydown`, onMainPinEnterPress);

    adForm.addEventListener(`submit`, onSubmitEvtListeners);
    adFormReset.addEventListener(`click`, getInactive);

    filtersForm.addEventListener(`change`, window.filterData.onChange);
  };


  let getInactive = function () {
    map.classList.add(`map--faded`);
    adForm.reset();
    filtersForm.reset();
    window.adForm.changeAbility(adForm, false);
    window.adForm.changeAbility(filtersForm, false);
    adForm.classList.add(`ad-form--disabled`);

    pinMain.style.left = startCoords.x;
    pinMain.style.top = startCoords.y;
    addressInput.value = window.adForm.getAddressFromPinPosition(pinMainHeight / 2);

    for (let pin of pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`)) {
      pin.remove();
    }

    typeSelect.removeEventListener(`change`, window.validation.onChangeMatchPriceToType);
    timeInSelect.removeEventListener(`change`, window.validation.onChangeMatchTimesIn);
    timeOutSelect.removeEventListener(`change`, window.validation.onChangeMatchTimesOut);
    titleInput.removeEventListener(`input`, window.validation.onInputCheckTitle);
    priceInput.removeEventListener(`input`, window.validation.onInputCheckPrice);
    roomsSelect.removeEventListener(`input`, window.validation.onInputMatchRoomsToCapacity);
    capacitySelect.removeEventListener(`input`, window.validation.onInputMatchRoomsToCapacity);

    map.removeEventListener(`click`, window.card.onClickOpenPopup);
    map.removeEventListener(`keydown`, window.card.onPinEnterPressOpenPopup);

    adForm.removeEventListener(`submit`, onSubmitEvtListeners);

    filtersForm.removeEventListener(`change`, window.filterData.onChange);

    setListenersToPinMain();

    window.card.onClickClosePopup();
  };


  let onSubmitSuccess = function () {
    window.adForm.submit(getInactive);
  };

  let onSubmitEvtListeners = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSubmitSuccess, window.backend.onSubmitError);
  };


  let setListenersToPinMain = function () {
    pinMain.addEventListener(`mousedown`, window.renderPinsArray);

    if (window.backend.announcements.length === 0) {
      pinMain.addEventListener(`mousedown`, onLoad);
    } else {
      pinMain.addEventListener(`mousedown`, onActivePage);
    }

    pinMain.addEventListener(`keydown`, onMainPinEnterPress);
  };


  setListenersToPinMain();
})();
