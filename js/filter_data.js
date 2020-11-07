'use strict';

(function () {
  const pinsList = document.querySelector(`.map__pins`);
  const filtersForm = document.querySelector(`.map__filters`);
  const typesSelect = filtersForm.querySelector(`select[name=housing-type]`);
  const priceSelect = filtersForm.querySelector(`select[name=housing-price]`);
  const roomsSelect = filtersForm.querySelector(`select[name=housing-rooms]`);
  const guestsSelect = filtersForm.querySelector(`select[name=housing-guests]`);
  const featuresFieldset = filtersForm.querySelector(`.map__features`);
  const featuresInputs = featuresFieldset.querySelectorAll(`input`);

  const PINS_AMOUNT = 5;
  const priceMap = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  let cutData = function (data) {
    return data.slice(0, PINS_AMOUNT);
  };


  let onFilterChange = window.debounce(function () {
    window.card.onClickClosePopup();
    for (let pin of pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`)) {
      pin.remove();
    }
    window.backend.filteredAnnouncements = window.backend.announcements;

    window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
      return item.offer.type === typesSelect.value || typesSelect.value === `any`;
    });

    window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
      return item.offer.price > priceMap[priceSelect.value].min && item.offer.price > priceMap[priceSelect.value].max || typesSelect.value === `any`;
    });

    window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
      return item.offer.rooms === +roomsSelect.value || roomsSelect.value === `any`;
    });

    window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
      return item.offer.guests === +guestsSelect.value || guestsSelect.value === `any`;
    });

    for (let feature of featuresInputs) {
      if (feature.checked) {
        window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
          return item.offer.features.includes(feature.value);
        });
      }
    }

    window.backend.filteredAnnouncements = cutData(window.backend.filteredAnnouncements);
    window.renderPinsArray(window.backend.filteredAnnouncements);
  });

  window.filterData = {
    cutData,
    onChange: onFilterChange
  };
})();
