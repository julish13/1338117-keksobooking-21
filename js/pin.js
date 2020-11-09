'use strict';

const pinsListElement = document.querySelector(`.map__pins`);
const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinWidth = pinTemplateElement.offsetWidth;
const pinHeight = pinTemplateElement.offsetHeight;

let createPin = function (data) {
  const pinBox = pinTemplateElement.cloneNode(true);
  const image = pinBox.querySelector(`img`);
  pinBox.style = `left: ${data.location.x - pinWidth / 2}px; top: ${data.location.y - pinHeight}px`;
  image.src = data.author.avatar;
  image.alt = data.offer.title;
  return pinBox;
};


window.renderPinsArray = function (data) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }

  pinsListElement.appendChild(fragment);
};
