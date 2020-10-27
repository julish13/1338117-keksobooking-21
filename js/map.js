'use strict';

(function () {
  const PIN_TAIL = 22;


  const map = document.querySelector(`.map`);
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


  window.pin.renderPinsArray(window.data.announcements);


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
    map.addEventListener(`click`, window.card.openPopup);
    map.addEventListener(`keydown`, window.card.onPinEnterPress);
  };

  pinMain.addEventListener(`mousedown`, getActive);

  pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      getActive();
    }
  });
})();
