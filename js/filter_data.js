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


  let cutData = function (data) {
    return data.slice(0, PINS_AMOUNT);
  };


  let onFilterChange = window.debounce(function () {
    window.card.onClickClosePopup();
    for (let pin of pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`)) {
      pin.remove();
    }
    window.backend.filteredAnnouncements = window.backend.announcements;

    if (typesSelect.value !== `any`) {
      window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
        return item.offer.type === typesSelect.value;
      });
    }

    if (priceSelect.value !== `any`) {
      if (priceSelect.value === `low`) {
        window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
          return item.offer.price <= 10000;
        });
      } else if (priceSelect.value === `middle`) {
        window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
          return item.offer.price > 10000 && item.offer.price <= 50000;
        });
      } else if (priceSelect.value === `high`) {
        window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
          return item.offer.price > 50000;
        });
      }
    }

    if (roomsSelect.value !== `any`) {
      window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
        return item.offer.rooms === +roomsSelect.value;
      });
    }

    if (guestsSelect.value !== `any`) {
      window.backend.filteredAnnouncements = window.backend.filteredAnnouncements.filter(function (item) {
        return item.offer.guests === +guestsSelect.value;
      });
    }

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
