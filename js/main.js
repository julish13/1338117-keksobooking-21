'use strict';

const HOUSING_TYPES_DATA = [`palace`, `flat`, `house`, `bungalow`];
const HOUSING_TYPES_VOCABULARY = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};
const HOUSING_TIMES_DATA = [`12:00`, `13:00`, `14:00`];
const HOUSING_FEATURES_DATA = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const HOUSING_PHOTOS_DATA = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP_Y = 130;
const MAP_HEIGHT = 630;
const PIN_TAIL = 22;


const map = document.querySelector(`.map`);
const mapWidth = map.offsetWidth;
const pin = document.querySelector(`.map__pin`);
const pinWidth = pin.offsetWidth;
const pinHeight = pin.offsetHeight;
const pinsList = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const pinMain = document.querySelector(`.map__pin--main`);
const pinMainWidth = pinMain.offsetWidth;
const pinMainHeight = pinMain.offsetHeight;
const adForm = document.querySelector(`.ad-form`);
const addressInput = adForm.querySelector(`input[name=address]`);
const titleInput = adForm.querySelector(`input[name=title]`);
const priceInput = adForm.querySelector(`input[name=price]`);
const typeInput = adForm.querySelector(`select[name=type]`);
const timeInInput = adForm.querySelector(`select[name=timein]`);
const timeOutInput = adForm.querySelector(`select[name=timeout]`);
const roomsInput = adForm.querySelector(`select[name=rooms]`);
const capacityInput = adForm.querySelector(`select[name=capacity]`);
const filtersForm = document.querySelector(`.map__filters`);


//  Вспомогательные функции

let getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

let createRandomArr = function (data) {
  let arr = [];
  let i = 0;

  while (i < data.length) {
    arr[i] = data[getRandomInt(0, data.length)];
    i++;
  }

  return Array.from(new Set(arr));
};


//  Функция - создание случайного текста объявления

let createAnnouncement = function (index) {
  let roomsAmount = getRandomInt(1, 5);
  let xLocation = getRandomInt(0, mapWidth);
  let yLocation = getRandomInt(MAP_Y, MAP_HEIGHT);
  let announcement = {
    author: {
      avatar: `img/avatars/user0${index + 1}.png`
    },
    offer: {
      title: `Заголовок предложения`,
      address: `${xLocation}, ${yLocation}`,
      price: getRandomInt(5000, 30000),
      type: HOUSING_TYPES_DATA[getRandomInt(0, HOUSING_TYPES_DATA.length)],
      rooms: roomsAmount,
      guests: roomsAmount * 2,
      checkin: HOUSING_TIMES_DATA[getRandomInt(0, HOUSING_TIMES_DATA.length)],
      checkout: HOUSING_TIMES_DATA[getRandomInt(0, HOUSING_TIMES_DATA.length)],
      features: createRandomArr(HOUSING_FEATURES_DATA),
      description: `Строка с описанием`,
      photos: createRandomArr(HOUSING_PHOTOS_DATA)
    },
    location: {
      x: xLocation,
      y: yLocation
    }
  };

  return announcement;
};


//  Создание массива с объявлениями

let createAnnouncementsArrow = function () {

  let announcements = [];

  for (let i = 0; i < 8; i++) {
    announcements[i] = createAnnouncement(i);
  }

  return announcements;
};


//  Создание массива со случайными данными

const announcements = createAnnouncementsArrow();


//  Функция создания DOM-элемента Pin на основе JS-объекта

let createPin = function (data) {
  const pinBox = pinTemplate.cloneNode(true);
  const image = pinBox.querySelector(`img`);
  pinBox.style = `left: ${data.location.x - pinWidth / 2}px; top: ${data.location.y - pinHeight}px`;
  image.src = data.author.avatar;
  image.alt = data.offer.title;
  return pinBox;
};


//  Создание и добавление фрагмента Pin в DOM

let renderPins = function (data) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }

  pinsList.appendChild(fragment);
};

renderPins(announcements);


//  Функция создания DOM-элемента Card на основе JS-объекта

let createCard = function (data) {
  const cardBox = cardTemplate.cloneNode(true);

  cardBox.querySelector(`.popup__title`).textContent = data.offer.title;
  cardBox.querySelector(`.popup__text--address`).textContent = data.offer.address;
  cardBox.querySelector(`.popup__text--price`).textContent = `${data.offer.price} ₽/ночь`;
  cardBox.querySelector(`.popup__type`).textContent = HOUSING_TYPES_VOCABULARY[data.offer.type];
  cardBox.querySelector(`.popup__text--capacity`).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  cardBox.querySelector(`.popup__text--time`).textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  cardBox.querySelector(`.popup__description`).textContent = data.offer.description;
  cardBox.querySelector(`.popup__avatar`).src = data.author.avatar;


  //  Приведение шаблона features в соответствии с массивом случайных данных

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


  //  Приведение шаблона photos в соответствии с массивом случайных данных

  const cardPhotos = cardBox.querySelector(`.popup__photos`);
  const cardPhotoImage = cardPhotos.querySelector(`.popup__photo`);
  for (let i = 1; i < data.offer.photos.length; i++) {
    cardPhotos.appendChild(cardPhotoImage.cloneNode());
  }

  let cardPhotosChildren = cardPhotos.children;
  for (let i = 0; i < cardPhotosChildren.length; i++) {
    cardPhotosChildren[i].src = data.offer.photos[i];
  }

  return cardBox;
};


//  Создание и добавление фрагмента Card в DOM

let renderCard = function (data) {
  const fragmentCard = document.createDocumentFragment();

  fragmentCard.appendChild(createCard(data));

  map.insertBefore(fragmentCard, mapFiltersContainer);
};

// Показывать карточку

const pinsListChildren = pinsList.querySelectorAll(`.map__pin:not(.map__pin--main)`);

let onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    closePopup();
  }
};

let openPopup = function (evt) {
  for (let i = 0; i < pinsListChildren.length; i++) {
    if (evt.target.parentNode === pinsListChildren[i]) {
      renderCard(announcements[i - 1]);
    }
  }

  document.addEventListener(`keydown`, onPopupEscPress);
  const popupCloseButton = document.querySelector(`.popup__close`);
  popupCloseButton.addEventListener(`click`, closePopup);
};

let closePopup = function () {
  const cardPopup = map.querySelector(`.map__card`);
  cardPopup.remove();

  document.removeEventListener(`keydown`, onPopupEscPress);
  document.querySelector(`.popup__close`).removeEventListener(`click`, closePopup);
};

let onPinEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
};

//  Блокировка интерактивных элементов форм в неактивном состоянии

let changeAbility = function (form, ability) {
  const fieldsets = form.querySelectorAll(`fieldset`);
  const selects = form.querySelectorAll(`select`);

  for (let fieldset of fieldsets) {
    fieldset.disabled = !ability;
  }

  for (let select of selects) {
    select.disabled = !ability;
  }
};

changeAbility(adForm, false);
changeAbility(filtersForm, false);

//  Функция для поля адреса
let getAddressFromPinPosition = function (xFromUpLeft = pinMainWidth / 2, yFromUpLeft) {
  return `${parseInt(parseInt(pinMain.style.left, 10) + xFromUpLeft, 10)}, ${parseInt(parseInt(pinMain.style.top, 10) + yFromUpLeft, 10)}`;
};


//  Поле адреса в неактивном состоянии

addressInput.value = getAddressFromPinPosition(undefined, pinMainHeight / 2);


//  Смена режима страницы

let getActive = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  changeAbility(adForm, true);
  changeAbility(filtersForm, true);
  addressInput.value = getAddressFromPinPosition(undefined, pinMainHeight + PIN_TAIL);
  typeInput.addEventListener(`change`, matchPriceMinToType);
  timeInInput.addEventListener(`change`, matchTimesIn);
  timeOutInput.addEventListener(`change`, matchTimesOut);
  titleInput.addEventListener(`input`, validateTitle);
  priceInput.addEventListener(`input`, validatePrice);
  roomsInput.addEventListener(`input`, validateRoomCapacity);
  capacityInput.addEventListener(`input`, validateRoomCapacity);
  map.addEventListener(`click`, openPopup);
  map.addEventListener(`keydown`, onPinEnterPress);
};

pinMain.addEventListener(`mousedown`, getActive);

pinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    getActive();
  }
});

//  Валидация формы

const PriceMinToType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

let matchPriceMinToType = function () {
  priceInput.min = priceInput.placeholder = PriceMinToType[typeInput.value];
};


let matchTimesOut = function () {
  timeInInput.value = timeOutInput.value;
};

let matchTimesIn = function () {
  timeOutInput.value = timeInInput.value;
};


let validateTitle = function () {
  if (titleInput.value.length < titleInput.minLength) {
    titleInput.setCustomValidity(`Заголовок должен состоять минимум из ${titleInput.minLength} символов`);
  } else if (titleInput.value.length > titleInput.maxLength) {
    titleInput.setCustomValidity(`Заголовок не должен превышать ${titleInput.maxLength} символов`);
  } else {
    titleInput.setCustomValidity(``);
  }

  titleInput.reportValidity();
};


let validatePrice = function () {
  if (+priceInput.value < priceInput.min) {
    priceInput.setCustomValidity(`Цена слишком маленькая`);
  } else if (+priceInput.value > priceInput.max) {
    priceInput.setCustomValidity(`Цена слишком большая`);
  } else {
    priceInput.setCustomValidity(``);
  }

  priceInput.reportValidity();
};


let validateRoomCapacity = function () {
  if (+capacityInput.value === 0 && +roomsInput.value !== 100) {
    roomsInput.setCustomValidity(`Нужно 100 комнат`);
    capacityInput.setCustomValidity(``);
  } else if (+capacityInput.value !== 0 && +roomsInput.value === 100) {
    roomsInput.setCustomValidity(``);
    capacityInput.setCustomValidity(`Не для гостей`);
  } else if (+capacityInput.value > roomsInput.value) {
    roomsInput.setCustomValidity(`Нужно больше комнат`);
    capacityInput.setCustomValidity(``);
  } else {
    roomsInput.setCustomValidity(``);
    capacityInput.setCustomValidity(``);
  }

  roomsInput.reportValidity();
  capacityInput.reportValidity();
};
