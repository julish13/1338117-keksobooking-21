'use strict';

(function () {
  let announcements = [];


  let createAnnouncementsArray = function (data) {
    for (let i = 0; i < data.length; i++) {
      announcements[i] = data[i];
    }
  };


  window.backend.load(createAnnouncementsArray, window.backend.errorHandler);


  window.main = {
    announcements
  };
})();
