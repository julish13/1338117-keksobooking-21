'use strict';

(function () {
  const pinMain = document.querySelector(`.map__pin--main`);
  const pinMainWidth = pinMain.offsetWidth;
  const pinMainHeight = pinMain.offsetHeight;
  const adForm = document.querySelector(`.ad-form`);
  const addressInput = adForm.querySelector(`input[name=address]`);
  const filtersForm = document.querySelector(`.map__filters`);
  const successTemplate = document.querySelector(`#success`).content;


  let changeAbility = function (form, ability) {
    const fieldsets = form.querySelectorAll(`fieldset`);
    const selects = form.querySelectorAll(`select`);

    for (let fieldset of fieldsets) {
      fieldset.disabled = !ability;
    }

    for (let select of selects) {
      select.disabled = !ability;
    }
  };


  let getCoordsFromPinPosition = function () {
    let coords = {
      x: pinMain.style.left,
      y: pinMain.style.top
    };

    return coords;
  };

  let getAddressFromPinPosition = function (yFromUpLeft, xFromUpLeft = pinMainWidth / 2) {
    const coords = getCoordsFromPinPosition();
    return `${parseInt(parseInt(coords.x, 10) + xFromUpLeft, 10)}, ${parseInt(parseInt(coords.y, 10) + yFromUpLeft, 10)}`;
  };


  let renderSuccessMessage = function () {
    const successBox = successTemplate.querySelector(`.success`).cloneNode(true);
    const fragmentSuccess = document.createDocumentFragment();
    fragmentSuccess.appendChild(successBox);
    return document.querySelector(`main`).insertAdjacentElement(`afterbegin`, successBox);
  };

  let successMessage;

  let onClickRemoveSuccessMessage = function () {
    successMessage.remove();
    document.removeEventListener(`click`, onClickRemoveSuccessMessage);
  };

  let onEscPressRemoveSuccessMessage = function (evt) {
    if (evt.key === `Escape`) {
      onClickRemoveSuccessMessage();
    }
    document.removeEventListener(`keydown`, onEscPressRemoveSuccessMessage);
  };

  let submit = function (cb) {
    successMessage = renderSuccessMessage();
    cb();

    document.addEventListener(`click`, onClickRemoveSuccessMessage);
    document.addEventListener(`keydown`, onEscPressRemoveSuccessMessage);
  };


  changeAbility(adForm, false);
  changeAbility(filtersForm, false);
  addressInput.value = getAddressFromPinPosition(pinMainHeight / 2);


  window.adForm = {
    changeAbility,
    getAddressFromPinPosition,
    getCoordsFromPinPosition,
    submit
  };
})();
