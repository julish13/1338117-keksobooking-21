'use strict';
(function () {

  const PINS_AMOUNT = 5;
  const ANY_CHOICE = `any`;

  const pinsListElement = document.querySelector(`.map__pins`);
  const filtersFormElement = document.querySelector(`.map__filters`);
  const typesSelectElement = filtersFormElement.querySelector(`select[name=housing-type]`);
  const priceSelectElement = filtersFormElement.querySelector(`select[name=housing-price]`);
  const roomsSelectElement = filtersFormElement.querySelector(`select[name=housing-rooms]`);
  const guestsSelectElement = filtersFormElement.querySelector(`select[name=housing-guests]`);
  const featuresFieldsetElement = filtersFormElement.querySelector(`.map__features`);


  let convertPriceToString = (price) => {
    if (price < 10000) {
      return `low`;
    } else if (price >= 10000 && price < 50000) {
      return `middle`;
    }
    return `high`;
  };


  let onChangeFilter = window.debounce(() => {
    window.card.closePopup();

    pinsListElement.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((pin) => {
      pin.remove();
    });

    const checkboxesCollection = featuresFieldsetElement.querySelectorAll(`.map__checkbox:checked`);

    let filteredAdverts = [];

    let checkFeatures = (advertData) => {
      for (let feature of checkboxesCollection) {
        if (!advertData.offer.features.includes(feature.value)) {
          return false;
        }
      }
      return true;
    };

    for (let i = 0; i < window.backend.adverts.length; i++) {
      let advertData = window.backend.adverts[i];
      if ((advertData.offer.type === typesSelectElement.value || typesSelectElement.value === ANY_CHOICE) &&
      (priceSelectElement.value === ANY_CHOICE || convertPriceToString(advertData.offer.price)
      === priceSelectElement.value) &&
      (roomsSelectElement.value === ANY_CHOICE || advertData.offer.rooms === +roomsSelectElement.value) &&
      (guestsSelectElement.value === ANY_CHOICE || advertData.offer.guests === +guestsSelectElement.value) &&
      checkFeatures(advertData)) {
        filteredAdverts.push(advertData);
      }
      if (filteredAdverts.length >= PINS_AMOUNT) {
        break;
      }
    }

    window.backend.filteredAdverts = filteredAdverts;
    window.renderPinsArray(window.backend.filteredAdverts);
  });

  window.filter = {
    onChange: onChangeFilter,
    PINS_AMOUNT
  };
})();
