'use strict';
(() => {

  const EVENT_KEYS = {
    ESC: `Escape`
  };

  const pinMainElement = document.querySelector(`.map__pin--main`);
  const pinMainWidth = pinMainElement.offsetWidth;
  const pinMainHeight = pinMainElement.offsetHeight;
  const adFormElement = document.querySelector(`.ad-form`);
  const addressInputElement = adFormElement.querySelector(`input[name=address]`);
  const filtersFormElement = document.querySelector(`.map__filters`);
  const successTemplateElement = document.querySelector(`#success`).content;


  let changeAbility = (form, ability) => {
    const fieldsetsCollection = form.querySelectorAll(`fieldset`);
    const selectsCollection = form.querySelectorAll(`select`);

    fieldsetsCollection.forEach((fieldset) => {
      fieldset.disabled = !ability;
    });

    selectsCollection.forEach((select) => {
      select.disabled = !ability;
    });
  };


  let getCoordsFromPinPosition = () => {
    return {
      x: pinMainElement.style.left,
      y: pinMainElement.style.top
    };
  };

  let getAddressFromPinPosition = (yFromUpLeft, xFromUpLeft = pinMainWidth / 2) => {
    const coords = getCoordsFromPinPosition();
    return `${parseInt(parseInt(coords.x, 10) + xFromUpLeft, 10)},
    ${parseInt(parseInt(coords.y, 10) + yFromUpLeft, 10)}`;
  };


  let successMessage;

  let renderSuccessMessage = () => {
    const successBox = successTemplateElement.querySelector(`.success`).cloneNode(true);
    const fragmentSuccess = document.createDocumentFragment();
    fragmentSuccess.appendChild(successBox);
    return document.querySelector(`main`).insertAdjacentElement(`afterbegin`, successBox);
  };

  let onClickRemoveSuccessMessage = () => {
    successMessage.remove();
    document.removeEventListener(`click`, onClickRemoveSuccessMessage);
  };

  let onEscPressRemoveSuccessMessage = (evt) => {
    if (evt.key === EVENT_KEYS.ESC) {
      onClickRemoveSuccessMessage();
    }
    document.removeEventListener(`keydown`, onEscPressRemoveSuccessMessage);
  };

  let submit = (cb) => {
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
