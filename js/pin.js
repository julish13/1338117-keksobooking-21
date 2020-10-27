'use strict';

(function () {
  const pinsList = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinWidth = pinTemplate.offsetWidth;
  const pinHeight = pinTemplate.offsetHeight;

  let createPin = function (data) {
    const pinBox = pinTemplate.cloneNode(true);
    const image = pinBox.querySelector(`img`);
    pinBox.style = `left: ${data.location.x - pinWidth / 2}px; top: ${data.location.y - pinHeight}px`;
    image.src = data.author.avatar;
    image.alt = data.offer.title;
    return pinBox;
  };


  let renderPinsArray = function (data) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(createPin(data[i]));
    }

    pinsList.appendChild(fragment);
  };

  window.pin = {
    renderPinsArray
  };
})();
