'use strict';

(function () {
  const pinMainElement = document.querySelector(`.map__pin--main`);
  const pinMainWidth = pinMainElement.offsetWidth;
  const pinMainHeight = pinMainElement.offsetHeight;
  const adFormElement = document.querySelector(`.ad-form`);
  const addressInputElement = adFormElement.querySelector(`input[name=address]`);
  const filtersFormElement = document.querySelector(`.map__filters`);
  const successTemplateElement = document.querySelector(`#success`).content;


  let changeAbility = function (form, ability) {
    const fieldsetsCollection = form.querySelectorAll(`fieldset`);
    const selectsCollection = form.querySelectorAll(`select`);

    fieldsetsCollection.forEach(function (fieldset) {
      fieldset.disabled = !ability;
    });

    selectsCollection.forEach(function (select) {
      select.disabled = !ability;
    });
  };


  let getCoordsFromPinPosition = function () {
    let coords = {
      x: pinMainElement.style.left,
      y: pinMainElement.style.top
    };

    return coords;
  };

  let getAddressFromPinPosition = function (yFromUpLeft, xFromUpLeft = pinMainWidth / 2) {
    const coords = getCoordsFromPinPosition();
    return `${parseInt(parseInt(coords.x, 10) + xFromUpLeft, 10)}, ${parseInt(parseInt(coords.y, 10) + yFromUpLeft, 10)}`;
  };


  let successMessage;

  let renderSuccessMessage = function () {
    const successBox = successTemplateElement.querySelector(`.success`).cloneNode(true);
    const fragmentSuccess = document.createDocumentFragment();
    fragmentSuccess.appendChild(successBox);
    return document.querySelector(`main`).insertAdjacentElement(`afterbegin`, successBox);
  };

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


  changeAbility(adFormElement, false);
  changeAbility(filtersFormElement, false);
  addressInputElement.value = getAddressFromPinPosition(pinMainHeight / 2);


  window.form = {
    changeAbility,
    getAddressFromPinPosition,
    getCoordsFromPinPosition,
    submit
  };
})();
