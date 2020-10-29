'use strict';

(function () {
  const PIN_TAIL = 26;
  const MAP_BOTTOM_BORDER = 130;
  const MAP_TOP_BORDER = 630;


  const map = document.querySelector(`.map`);
  const mapWidth = map.offsetWidth;
  const pinsList = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const pinMainHeight = pinMain.offsetHeight;
  const pinMainTotalHeight = pinMainHeight + PIN_TAIL;
  const pinMainWidth = pinMain.offsetWidth;
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


  let movePin = function (evt) {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = function (moveEvt) {
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinMain.offsetTop <= MAP_BOTTOM_BORDER - pinMainTotalHeight) {
        pinMain.style.top = `${MAP_BOTTOM_BORDER - pinMainTotalHeight - shift.y}px`;
      } else if (pinMain.offsetTop >= MAP_TOP_BORDER - pinMainTotalHeight) {
        pinMain.style.top = `${MAP_TOP_BORDER - pinMainTotalHeight - shift.y}px`;
      } else {
        pinMain.style.top = `${pinMain.offsetTop - shift.y}px`;
      }

      if (pinMain.offsetLeft <= -pinMainWidth / 2) {
        pinMain.style.left = `${-pinMainWidth / 2 - shift.x}px`;
      } else if (pinMain.offsetLeft >= (mapWidth - pinMainWidth / 2)) {
        pinMain.style.left = `${mapWidth - pinMainWidth / 2 - shift.x}px`;
      } else {
        pinMain.style.left = `${pinMain.offsetLeft - shift.x}px`;
      }
    };


    let onMouseUp = function () {
      addressInput.value = window.form.getAddressFromPinPosition(undefined, pinMainTotalHeight);
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };


  let getActive = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    if (!pinsList.querySelector(`.map__pin:not(.map__pin--main)`)) {
      window.pin.renderPinsArray(window.data.announcements);
    }

    window.form.changeFormAbility(adForm, true);
    window.form.changeFormAbility(filtersForm, true);
    typeInput.addEventListener(`change`, window.form.matchPriceToType);
    timeInInput.addEventListener(`change`, window.form.matchTimesIn);
    timeOutInput.addEventListener(`change`, window.form.matchTimesOut);
    titleInput.addEventListener(`input`, window.form.validateTitle);
    priceInput.addEventListener(`input`, window.form.validatePrice);
    roomsInput.addEventListener(`input`, window.form.validateRoomCapacity);
    capacityInput.addEventListener(`input`, window.form.validateRoomCapacity);
    map.addEventListener(`click`, window.card.openPopup);
    map.addEventListener(`keydown`, window.card.onPinEnterPress);
    pinMain.removeEventListener(`mousedown`, getActive);
  };

  let setListenersToPinMain = function () {
    pinMain.addEventListener(`mousedown`, function (evt) {
      getActive();
      movePin(evt);
    });

    pinMain.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        getActive();
      }
    });
  };

  setListenersToPinMain();
})();
