'use strict';

(function () {

  const PIN_TAIL = 26;
  const MAP_BOTTOM_BORDER = 130;
  const MAP_TOP_BORDER = 630;


  const map = document.querySelector(`.map`);
  const mapWidth = map.offsetWidth;
  const pinMain = document.querySelector(`.map__pin--main`);
  const pinMainHeight = pinMain.offsetHeight;
  const pinMainTotalHeight = pinMainHeight + PIN_TAIL;
  const pinMainWidth = pinMain.offsetWidth;
  const adForm = document.querySelector(`.ad-form`);
  const addressInput = adForm.querySelector(`input[name=address]`);


  let onMovePin = function (evt) {
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
      addressInput.value = window.adForm.getAddressFromPinPosition(pinMainTotalHeight);
    };


    let onMouseUp = function () {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.move = {
    onMovePin
  };
})();
