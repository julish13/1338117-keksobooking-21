'use strict';
(() => {
  const EVENT_KEYS = {
    ENTER: `Enter`
  }

  const PIN_TAIL = 26;

  const mapElement = document.querySelector(`.map`);
  const pinsListElement = document.querySelector(`.map__pins`);
  const pinMainElement = document.querySelector(`.map__pin--main`);
  const pinMainHeight = pinMainElement.offsetHeight;
  const filtersFormElement = document.querySelector(`.map__filters`);
  const adFormElement = document.querySelector(`.ad-form`);
  const adFormResetButton = adFormElement.querySelector(`.ad-form__reset`);
  const addressInputElement = adFormElement.querySelector(`input[name=address]`);
  const titleInputElement = adFormElement.querySelector(`input[name=title]`);
  const priceInputElement = adFormElement.querySelector(`input[name=price]`);
  const typeSelectElement = adFormElement.querySelector(`select[name=type]`);
  const timeInSelectElement = adFormElement.querySelector(`select[name=timein]`);
  const timeOutSelectElement = adFormElement.querySelector(`select[name=timeout]`);
  const roomsSelectElement = adFormElement.querySelector(`select[name=rooms]`);
  const capacitySelectElement = adFormElement.querySelector(`select[name=capacity]`);

  const startCoords = window.form.getCoordsFromPinPosition();


  let onLoad = () => {
    window.backend.load(onActivePage, window.backend.onLoadError);
  };


  let onMainPinEnterPress = (evt) => {
    if (evt.key !== EVENT_KEYS.ENTER) {
      return
    }

    if (window.backend.adverts.length === 0) {
      onLoad();
      return
    }

    onActivePage();
  };

  let onActivePage = (advertsData) => {
    if (window.backend.adverts.length === 0) {
      window.backend.adverts = advertsData.filter((advertData) => {
        return advertData.offer !== undefined;
      });
    }

    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    window.form.changeAbility(adFormElement, true);
    window.form.changeAbility(filtersFormElement, true);

    addressInputElement.value = window.form.getAddressFromPinPosition(pinMainHeight + PIN_TAIL);

    if (!pinsListElement.querySelector(`.map__pin:not(.map__pin--main)`)) {
      window.renderPinsArray(window.backend.adverts.slice(0, window.filter.PINS_AMOUNT));
    }

    typeSelectElement.addEventListener(`change`, window.validation.onChangeMatchPriceToType);
    timeInSelectElement.addEventListener(`change`, window.validation.onChangeMatchTimesIn);
    timeOutSelectElement.addEventListener(`change`, window.validation.onChangeMatchTimesOut);
    titleInputElement.addEventListener(`input`, window.validation.onInputCheckTitle);
    priceInputElement.addEventListener(`input`, window.validation.onInputCheckPrice);
    roomsSelectElement.addEventListener(`input`, window.validation.onInputMatchRoomsToCapacity);
    capacitySelectElement.addEventListener(`input`, window.validation.onInputMatchRoomsToCapacity);

    mapElement.addEventListener(`click`, window.card.onClickOpenPopup);
    mapElement.addEventListener(`keydown`, window.card.onPinEnterPressOpenPopup);

    pinMainElement.removeEventListener(`mousedown`, onLoad);
    pinMainElement.removeEventListener(`mousedown`, onActivePage);
    pinMainElement.removeEventListener(`keydown`, onMainPinEnterPress);

    adFormElement.addEventListener(`submit`, onSubmitEvtListeners);
    adFormResetButton.addEventListener(`click`, getInactive);

    filtersFormElement.addEventListener(`change`, window.filter.onChange);
  };


  let getInactive = () => {
    mapElement.classList.add(`map--faded`);
    adFormElement.reset();
    filtersFormElement.reset();
    window.form.changeAbility(adFormElement, false);
    window.form.changeAbility(filtersFormElement, false);
    adFormElement.classList.add(`ad-form--disabled`);

    pinMainElement.style.left = startCoords.x;
    pinMainElement.style.top = startCoords.y;
    addressInputElement.value = window.form.getAddressFromPinPosition(pinMainHeight / 2);

    pinsListElement.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((pin) => {
      pin.remove();
    });

    typeSelectElement.removeEventListener(`change`, window.validation.onChangeMatchPriceToType);
    timeInSelectElement.removeEventListener(`change`, window.validation.onChangeMatchTimesIn);
    timeOutSelectElement.removeEventListener(`change`, window.validation.onChangeMatchTimesOut);
    titleInputElement.removeEventListener(`input`, window.validation.onInputCheckTitle);
    priceInputElement.removeEventListener(`input`, window.validation.onInputCheckPrice);
    roomsSelectElement.removeEventListener(`input`, window.validation.onInputMatchRoomsToCapacity);
    capacitySelectElement.removeEventListener(`input`, window.validation.onInputMatchRoomsToCapacity);

    mapElement.removeEventListener(`click`, window.card.onClickOpenPopup);
    mapElement.removeEventListener(`keydown`, window.card.onPinEnterPressOpenPopup);

    adFormElement.removeEventListener(`submit`, onSubmitEvtListeners);

    filtersFormElement.removeEventListener(`change`, window.filter.onChange);

    setListenersToPinMain();

    window.card.closePopup();

    window.backend.filteredAdverts = [];
  };


  let onSubmitSuccess = () => {
    window.form.submit(getInactive);
  };

  let onSubmitEvtListeners = (evt) => {
    evt.preventDefault();
    window.backend.save(new FormData(adFormElement), onSubmitSuccess, window.backend.onSubmitError);
  };


  let setListenersToPinMain = () => {
    pinMainElement.addEventListener(`mousedown`, window.onMovePin);

    if (window.backend.adverts.length === 0) {
      pinMainElement.addEventListener(`mousedown`, onLoad);
    } else {
      pinMainElement.addEventListener(`mousedown`, onActivePage);
    }

    pinMainElement.addEventListener(`keydown`, onMainPinEnterPress);
  };


  setListenersToPinMain();
})();
