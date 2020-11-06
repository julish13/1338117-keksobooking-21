'use strict';

(function () {
  const housingTypesMap = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const pinsList = document.querySelector(`.map__pins`);

  let createCard = function (data) {
    const cardBox = cardTemplate.cloneNode(true);

    if (data.offer.title) {
      cardBox.querySelector(`.popup__title`).textContent = data.offer.title;
    } else {
      cardBox.querySelector(`.popup__title`);
    }

    if (data.offer.address) {
      cardBox.querySelector(`.popup__text--address`).textContent = data.offer.address;
    } else {
      cardBox.querySelector(`.popup__text--address`);
    }

    if (data.offer.price) {
      cardBox.querySelector(`.popup__text--price`).textContent = `${data.offer.price} ₽/ночь`;
    } else {
      cardBox.querySelector(`.popup__text--price`);
    }

    if (data.offer.type) {
      cardBox.querySelector(`.popup__type`).textContent = housingTypesMap[data.offer.type];
    } else {
      cardBox.querySelector(`.popup__type`);
    }

    if (data.offer.rooms && data.offer.guests) {
      cardBox.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
    } else if (data.offer.rooms) {
      cardBox.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты`;
    } else if (data.offer.guests) {
      cardBox.querySelector(`.popup__text--capacity`).textContent = `для ${data.offer.guests} гостей`;
    } else {
      cardBox.querySelector(`.popup__text--capacity`).remove();
    }

    if (data.offer.checkin && data.offer.checkout) {
      cardBox.querySelector(`.popup__text--time`).textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
    } else if (data.offer.checkin) {
      cardBox.querySelector(`.popup__text--time`).textContent = `Заезд после ${data.offer.checkin}`;
    } else if (data.offer.checkout) {
      cardBox.querySelector(`.popup__text--time`).textContent = `Выезд до ${data.offer.checkout}`;
    } else {
      cardBox.querySelector(`.popup__text--time`).remove();
    }

    if (data.offer.description) {
      cardBox.querySelector(`.popup__description`).textContent = data.offer.description;
    } else {
      cardBox.querySelector(`.popup__description`).remove();
    }

    if (data.author.avatar) {
      cardBox.querySelector(`.popup__avatar`).src = data.author.avatar;
    } else {
      cardBox.querySelector(`.popup__avatar`).remove();
    }

    if (data.offer.features.length !== 0) {
      let cardFeatures = cardBox.querySelector(`.popup__features`).children;
      for (let i = cardFeatures.length - 1; i >= 0; i--) {
        let check = [];
        for (let j = data.offer.features.length - 1; j >= 0; j--) {
          check[j] = cardFeatures[i].classList.contains(`popup__feature--${data.offer.features[j]}`);
        }
        if (!check.includes(true)) {
          cardFeatures[i].remove();
        }
      }
    } else {
      cardBox.querySelector(`.popup__features`).remove();
    }

    if (data.offer.photos.length !== 0) {
      const cardPhotos = cardBox.querySelector(`.popup__photos`);
      const cardPhotoImage = cardPhotos.querySelector(`.popup__photo`);
      for (let i = 1; i < data.offer.photos.length; i++) {
        cardPhotos.appendChild(cardPhotoImage.cloneNode());
      }

      let cardPhotosChildren = cardPhotos.children;
      for (let i = 0; i < cardPhotosChildren.length; i++) {
        cardPhotosChildren[i].src = data.offer.photos[i];
      }
    } else {
      cardBox.querySelector(`.popup__photos`).remove();
    }

    return cardBox;
  };

  let cardPopup;
  let popupCloseButton;

  let renderCard = function (data) {
    const fragmentCard = document.createDocumentFragment();
    cardPopup = createCard(data);
    fragmentCard.appendChild(cardPopup);
    popupCloseButton = cardPopup.querySelector(`.popup__close`);
    map.insertBefore(fragmentCard, mapFiltersContainer);
  };


  let onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onClickClosePopup();
    }
  };

  let onClickOpenPopup = function (evt) {
    const pinsListChildren = pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let i = 0; i < pinsListChildren.length; i++) {
      const target = evt.target.parentNode === pinsListChildren[i] || evt.target === pinsListChildren[i];
      if (cardPopup) {
        if (target) {
          cardPopup.remove();
          pinsList.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
        }
      }

      if (target) {
        if (window.backend.filteredAnnouncements.length !== 0) {
          renderCard(window.filterData.cutData(window.backend.filteredAnnouncements)[i]);
        } else {
          renderCard(window.filterData.cutData(window.backend.announcements)[i]);
        }
        document.addEventListener(`keydown`, onPopupEscPress);
        popupCloseButton.addEventListener(`click`, onClickClosePopup);
        pinsListChildren[i].classList.add(`map__pin--active`);
      }
    }
  };

  let onClickClosePopup = function () {
    if (cardPopup) {
      cardPopup.remove();
      pinsList.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);

      document.removeEventListener(`keydown`, onPopupEscPress);
      if (popupCloseButton) {
        popupCloseButton.removeEventListener(`click`, onClickClosePopup);
      }
    }
  };

  let onPinEnterPressOpenPopup = function (evt) {
    if (evt.key === `Enter`) {
      onClickOpenPopup(evt);
    }
  };


  window.card = {
    onClickOpenPopup,
    onClickClosePopup,
    onPinEnterPressOpenPopup,
  };
})();
