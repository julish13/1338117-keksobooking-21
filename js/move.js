'use strict';
(() => {

  const PIN_TAIL = 26;
  const MAP_BOTTOM_BORDER = 130;
  const MAP_TOP_BORDER = 630;


  const mapElement = document.querySelector(`.map`);
  const mapWidth = mapElement.offsetWidth;
  const pinMainElement = document.querySelector(`.map__pin--main`);
  const pinMainHeight = pinMainElement.offsetHeight;
  const pinMainTotalHeight = pinMainHeight + PIN_TAIL;
  const pinMainWidth = pinMainElement.offsetWidth;
  const adFormElement = document.querySelector(`.ad-form`);
  const addressInputElement = adFormElement.querySelector(`input[name=address]`);


  let onMovePin = (evt) => {
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = (moveEvt) => {
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinMainElement.offsetTop <= MAP_BOTTOM_BORDER - pinMainTotalHeight) {
        pinMainElement.style.top = `${MAP_BOTTOM_BORDER - pinMainTotalHeight - shift.y}px`;
      } else if (pinMainElement.offsetTop >= MAP_TOP_BORDER - pinMainTotalHeight) {
        pinMainElement.style.top = `${MAP_TOP_BORDER - pinMainTotalHeight - shift.y}px`;
      } else {
        pinMainElement.style.top = `${pinMainElement.offsetTop - shift.y}px`;
      }

      if (pinMainElement.offsetLeft <= -pinMainWidth / 2) {
        pinMainElement.style.left = `${-pinMainWidth / 2 - shift.x}px`;
      } else if (pinMainElement.offsetLeft >= (mapWidth - pinMainWidth / 2)) {
        pinMainElement.style.left = `${mapWidth - pinMainWidth / 2 - shift.x}px`;
      } else {
        pinMainElement.style.left = `${pinMainElement.offsetLeft - shift.x}px`;
      }
      addressInputElement.value = window.form.getAddressFromPinPosition(pinMainTotalHeight);
    };


    let onMouseUp = () => {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  window.onMovePin = onMovePin;
})();
