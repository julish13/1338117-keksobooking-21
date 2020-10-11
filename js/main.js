'use strict';

const HOUSING_TYPES_DATA = [`palace`, `flat`, `house`, `bungalow`];
const HOUSING_TIMES_DATA = [`12:00`, `13:00`, `14:00`];
const HOUSING_FEATURES_DATA = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const HOUSING_PHOTOS_DATA = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP_Y = 130;
const MAP_HEIGHT = 630;

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const mapWidth = map.offsetWidth;
const pin = document.querySelector(`.map__pin`);
const pinWidth = pin.offsetWidth;
const pinHeight = pin.offsetHeight;
const pinsList = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);


// Вспомогательные функции

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


// Функция - создание случайного текста объявления
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

// Создание массива с объявлениями

let createAnnouncementsArrow = function () {

  let announcements = [];

  for (let i = 0; i < 8; i++) {
    announcements[i] = createAnnouncement(i);
  }

  return announcements;
};

//  Создание массива со случайными данными

const announcements = createAnnouncementsArrow();

//  Функция создания DOM-элемента на основе JS-объекта create pin

let createPin = function (data) {
  const pinBox = pinTemplate.cloneNode(true);
  const image = pinBox.querySelector(`img`);
  pinBox.style = `left: ${data.location.x - pinWidth / 2}px; top: ${data.location.y - pinHeight}px`;
  image.src = data.author.avatar;
  image.alt = data.offer.title;
  return pinBox;
};

//  Создание и добавление фрагмента в DOM render pin

let renderPins = function (data) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }

  pinsList.appendChild(fragment);
};

renderPins(announcements);

