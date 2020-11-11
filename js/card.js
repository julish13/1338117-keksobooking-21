'use strict';

const EVENT_KEYS = {
  ESC: `Escape`,
  ENTER: `Enter`
};

const housingTypesMap = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};


const mapElement = document.querySelector(`.map`);
const cardTemplateElement = document.querySelector(`#card`).content.querySelector(`.map__card`);
const filtersContainerElement = document.querySelector(`.map__filters-container`);
const pinsListElement = document.querySelector(`.map__pins`);

let cardPopup;
let popupCloseButton;

const fillCardBoxFields = (cardBox, advertData, advertDataField, fieldSelector) => {
  switch (advertDataField) {
    case advertData.offer.price:
      cardBox.querySelector(fieldSelector).textContent = `${advertDataField} ₽/ночь`;
      break;
    case advertData.offer.type:
      cardBox.querySelector(fieldSelector).textContent = housingTypesMap[advertDataField];
      break;
    case advertData.author.avatar:
      cardBox.querySelector(fieldSelector).src = advertDataField;
      break;
    default:
      cardBox.querySelector(fieldSelector).textContent = advertDataField;
  }
};

const checkField = (cardBox, advertDataField, fieldSelector, cb) => {
  if (advertDataField || Boolean(advertDataField.length)) {
    cb();
  } else {
    cardBox.querySelector(fieldSelector).remove();
  }
};


const createCardBox = (advertData) => {
  const cardBox = cardTemplateElement.cloneNode(true);
  const advertDataFieldToSelector = {
    advertDataField: [
      advertData.offer.title,
      advertData.offer.address,
      advertData.offer.price,
      advertData.offer.type,
      advertData.offer.description,
      advertData.author.avatar
    ],
    fieldSelector: [
      `.popup__title`,
      `.popup__text--address`,
      `.popup__text--price`,
      `.popup__type`,
      `.popup__description`,
      `.popup__avatar`
    ]
  };

  for (let i = 0; i < advertDataFieldToSelector.advertDataField.length; i++) {
    checkField(cardBox,
        advertDataFieldToSelector.advertDataField[i],
        advertDataFieldToSelector.fieldSelector[i], () => {
          fillCardBoxFields(cardBox,
              advertData,
              advertDataFieldToSelector.advertDataField[i],
              advertDataFieldToSelector.fieldSelector[i]);
        }
    );
  }

  checkField(cardBox, advertData.offer.rooms || advertData.offer.guests, `.popup__text--capacity`, () => {
    if (advertData.offer.rooms && advertData.offer.guests) {
      cardBox.querySelector(`.popup__text--capacity`).textContent =
      `${advertData.offer.rooms} комнаты для ${advertData.offer.guests} гостей`;
    } else if (!advertData.offer.guests) {
      cardBox.querySelector(`.popup__text--capacity`).textContent =
      `${advertData.offer.rooms} комнаты`;
    } else if (!advertData.offer.rooms) {
      cardBox.querySelector(`.popup__text--capacity`).textContent =
      `для ${advertData.offer.guests} гостей`;
    }
  });

  checkField(cardBox, advertData.offer.checkin || advertData.offer.checkout, `.popup__text--time`, () => {
    if (advertData.offer.checkin && advertData.offer.checkout) {
      cardBox.querySelector(`.popup__text--time`).textContent = `Заезд после ${advertData.offer.checkin}, выезд до ${advertData.offer.checkout}`;
    } else if (!advertData.offer.checkout) {
      cardBox.querySelector(`.popup__text--time`).textContent = `Заезд после ${advertData.offer.checkin}`;
    } else if (!advertData.offer.checkin) {
      cardBox.querySelector(`.popup__text--time`).textContent = `Выезд до ${advertData.offer.checkout}`;
    }
  });


  checkField(cardBox, advertData.offer.features, `.popup__features`, () => {
    const cardFeatures = cardBox.querySelector(`.popup__features`).children;
    for (let i = cardFeatures.length - 1; i >= 0; i--) {
      if (!advertData.offer.features.includes(cardFeatures[i].classList.toString().split(`--`)[1])) {
        cardFeatures[i].remove();
      }
    }
  });

  checkField(cardBox, advertData.offer.photos, `.popup__photos`, () => {
    const cardPhotosListElement = cardBox.querySelector(`.popup__photos`);
    const cardPhotoElement = cardPhotosListElement.querySelector(`.popup__photo`);

    advertData.offer.photos.forEach((image) => {
      const photoElement = cardPhotosListElement.appendChild(cardPhotoElement.cloneNode());
      photoElement.src = image;
    });

    cardPhotosListElement.removeChild(cardPhotoElement);
  });

  return cardBox;
};


const renderCard = (advertData) => {
  const fragmentCard = document.createDocumentFragment();
  cardPopup = createCardBox(advertData);
  fragmentCard.appendChild(cardPopup);
  popupCloseButton = cardPopup.querySelector(`.popup__close`);
  mapElement.insertBefore(fragmentCard, filtersContainerElement);
};

const closePopup = () => {
  const activePin = pinsListElement.querySelector(`.map__pin--active`);
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
  cardPopup.remove();
};


const onPopupEscPress = (evt) => {
  if (evt.key === EVENT_KEYS.ESC) {
    evt.preventDefault();
    onClickClosePopup();
  }
};

const onClickOpenPopup = (evt) => {
  const pinsCollection = pinsListElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinsCollection.forEach((pin, i) => {
    const target = evt.target.parentNode === pin || evt.target === pin;
    if (cardPopup && target) {
      closePopup();
    }

    if (target) {
      if (window.backend.filteredAdverts.length !== 0) {
        renderCard(window.backend.filteredAdverts.slice(0, window.filter.PINS_AMOUNT)[i]);
      } else {
        renderCard(window.backend.adverts.slice(0, window.filter.PINS_AMOUNT)[i]);
      }
      document.addEventListener(`keydown`, onPopupEscPress);
      popupCloseButton.addEventListener(`click`, onClickClosePopup);
      pin.classList.add(`map__pin--active`);
    }
    i++;
  });
};

const onClickClosePopup = () => {
  if (cardPopup) {
    closePopup();

    document.removeEventListener(`keydown`, onPopupEscPress);
    if (popupCloseButton) {
      popupCloseButton.removeEventListener(`click`, onClickClosePopup);
    }
  }
};

const onPinEnterPressOpenPopup = (evt) => {
  if (evt.key === EVENT_KEYS.ENTER) {
    onClickOpenPopup(evt);
  }
};


window.card = {
  onClickOpenPopup,
  closePopup: onClickClosePopup,
  onPinEnterPressOpenPopup,
};
