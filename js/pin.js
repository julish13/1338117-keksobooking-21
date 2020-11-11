'use strict';

const pinsListElement = document.querySelector(`.map__pins`);
const pinTemplateElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinWidth = pinTemplateElement.offsetWidth;
const pinHeight = pinTemplateElement.offsetHeight;

const createPin = (advertData) => {
  const pinBox = pinTemplateElement.cloneNode(true);
  const image = pinBox.querySelector(`img`);
  pinBox.style = `left: ${advertData.location.x - pinWidth / 2}px; top: ${advertData.location.y - pinHeight}px`;
  image.src = advertData.author.avatar;
  image.alt = advertData.offer.title;
  return pinBox;
};


const renderPinsArray = (advertsData) => {
  const fragment = document.createDocumentFragment();

  advertsData.forEach((advertData) => {
    fragment.appendChild(createPin(advertData));
  });

  pinsListElement.appendChild(fragment);
};

window.renderPinsArray = renderPinsArray;
