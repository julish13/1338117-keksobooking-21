'use strict';

(function () {
  const PIN_TAIL = 22;


  const map = document.querySelector(`.map`);
  const pinsList = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);
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


  window.pin.renderPins(window.data.announcements);


  const pinsListChildren = pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`);


  let onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };

  let openPopup = function (evt) {
    for (let i = 0; i < pinsListChildren.length; i++) {
      const target = evt.target.parentNode === pinsListChildren[i] || evt.target === pinsListChildren[i];
      if (window.card.cardPopup) {
        if (target) {
          window.card.cardPopup.remove();
        }
      }

      if (target) {
        window.card.renderCard(window.data.announcements[i]);
        document.addEventListener(`keydown`, onPopupEscPress);
        window.card.popupCloseButton.addEventListener(`click`, closePopup);
      }
    }
  };

  let closePopup = function () {

    window.card.cardPopup.remove();

    document.removeEventListener(`keydown`, onPopupEscPress);
    if (window.card.popupCloseButton) {
      window.card.popupCloseButton.removeEventListener(`click`, closePopup);
    }
  };

  let onPinEnterPress = function (evt) {
    if (evt.key === `Enter`) {
      openPopup(evt);
    }
  };


  let getActive = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    window.form.changeFormAbility(adForm, true);
    window.form.changeFormAbility(filtersForm, true);
    addressInput.value = window.form.getAddressFromPinPosition(undefined, pinMainHeight + PIN_TAIL);
    typeInput.addEventListener(`change`, window.form.matchPriceToType);
    timeInInput.addEventListener(`change`, window.form.matchTimesIn);
    timeOutInput.addEventListener(`change`, window.form.matchTimesOut);
    titleInput.addEventListener(`input`, window.form.validateTitle);
    priceInput.addEventListener(`input`, window.form.validatePrice);
    roomsInput.addEventListener(`input`, window.form.validateRoomCapacity);
    capacityInput.addEventListener(`input`, window.form.validateRoomCapacity);
    map.addEventListener(`click`, openPopup);
    map.addEventListener(`keydown`, onPinEnterPress);
  };

  pinMain.addEventListener(`mousedown`, getActive);

  pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      getActive();
    }
  });
})();
