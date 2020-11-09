'use strict';

const pinsListElement = document.querySelector(`.map__pins`);
const filtersFormElement = document.querySelector(`.map__filters`);
const typesSelectElement = filtersFormElement.querySelector(`select[name=housing-type]`);
const priceSelectElement = filtersFormElement.querySelector(`select[name=housing-price]`);
const roomsSelectElement = filtersFormElement.querySelector(`select[name=housing-rooms]`);
const guestsSelectElement = filtersFormElement.querySelector(`select[name=housing-guests]`);
const featuresFieldsetElement = filtersFormElement.querySelector(`.map__features`);

const PINS_AMOUNT = 5;


let convertPricetoString = function (price) {
  if (price < 10000) {
    return `low`;
  } else if (price >= 10000 && price < 50000) {
    return `middle`;
  }
  return `high`;
};


let onChangeFilter = window.debounce(function () {
  window.card.closePopup();

  pinsListElement.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach(function (pin) {
    pin.remove();
  });

  const checkboxesCollection = featuresFieldsetElement.querySelectorAll(`.map__checkbox:checked`);

  let filteredAnnouncements = [];

  let checkFeatures = function (item) {
    for (let i = 0; i < checkboxesCollection.length; i++) {
      if (!item.offer.features.includes(checkboxesCollection[i].value)) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i < window.backend.announcements.length; i++) {
    let item = window.backend.announcements[i];
    if ((item.offer.type === typesSelectElement.value || typesSelectElement.value === `any`) &&
    (priceSelectElement.value === `any` || convertPricetoString(item.offer.price) === priceSelectElement.value) &&
    (roomsSelectElement.value === `any` || item.offer.rooms === +roomsSelectElement.value) &&
    (guestsSelectElement.value === `any` || item.offer.guests === +guestsSelectElement.value)
    && checkFeatures(item)) {
      filteredAnnouncements.push(item);
    }
    if (filteredAnnouncements.length >= PINS_AMOUNT) {
      break;
    }
  }

  window.backend.filteredAnnouncements = filteredAnnouncements;
  window.renderPinsArray(window.backend.filteredAnnouncements);
});

window.filter = {
  onChange: onChangeFilter,
  PINS_AMOUNT
};
