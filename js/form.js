'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const pinsList = document.querySelector(`.map__pins`);
  const pinMain = document.querySelector(`.map__pin--main`);
  const pinMainWidth = pinMain.offsetWidth;
  const pinMainHeight = pinMain.offsetHeight;
  const adForm = document.querySelector(`.ad-form`);
  const addressInput = adForm.querySelector(`input[name=address]`);
  const filtersForm = document.querySelector(`.map__filters`);


  let changeFormAbility = function (form, ability) {
    const fieldsets = form.querySelectorAll(`fieldset`);
    const selects = form.querySelectorAll(`select`);

    for (let fieldset of fieldsets) {
      fieldset.disabled = !ability;
    }

    for (let select of selects) {
      select.disabled = !ability;
    }
  };


  let getAddressFromPinPosition = function (yFromUpLeft, xFromUpLeft = pinMainWidth / 2) {
    return `${parseInt(parseInt(pinMain.style.left, 10) + xFromUpLeft, 10)}, ${parseInt(parseInt(pinMain.style.top, 10) + yFromUpLeft, 10)}`;
  };

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

  let setFormEvtListener = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), submitForm, window.backend.errorHandler);
  };


  changeFormAbility(adForm, false);
  changeFormAbility(filtersForm, false);
  addressInput.value = getAddressFromPinPosition(pinMainHeight / 2);

  window.form = {
    changeFormAbility,
    getAddressFromPinPosition,
  };
})();
