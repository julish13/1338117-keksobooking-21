'use strict';

(function () {
  const pinsList = document.querySelector(`.map__pins`);
  const filtersForm = document.querySelector(`.map__filters`);
  const typesSelect = filtersForm.querySelector(`select[name=housing-type]`);

  const PINS_AMOUNT = 5;


  let cutData = function (data) {
    return data.slice(0, PINS_AMOUNT);
  };

  let onTypeFilter = function () {
    window.card.onClickClosePopup();
    for (let pin of pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`)) {
      pin.remove();
    }

    window.backend.filteredAnnouncements = cutData(window.backend.announcements.filter(function (item) {
      return item.offer.type === typesSelect.value;
    }));

    window.pin.renderPinsArray(window.backend.filteredAnnouncements);
  };

  window.filterData = {
    cutData,
    onTypeFilter
  };
})();
