'use strict';

(function () {
  // const filtersForm = document.querySelector(`.map__filters`);
  // const typesSelect = filtersForm.querySelector(`select[name=housing-type]`);
  // const typesSelected = typesSelect.querySelector('option:checked');

  const PINS_AMOUNT = 5;


  let updateData = function (data) {
    return data.slice(0, PINS_AMOUNT);
  };

  window.filter = {
    updateData
  };
})();
