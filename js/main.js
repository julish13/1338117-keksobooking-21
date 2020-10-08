'use strict';

const HOUSING_TYPES_DATA = [`palace`, `flat`, `house`, `bungalow`];
const HOUSING_TIMES_DATA = [`12:00`, `13:00`, `14:00`];
const HOUSING_FEATURES_DATA = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const HOUSING_PHOTOS_DATA = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const ANNOUNCEMENTS_AMOUNT = 8;

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const mapWidth = map.offsetWidth;
const pinsList = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// Функция - случайный генератор текста объявления
const createAnnouncementsData = function (types, times, features, photos, elementWidth, anouncementsAmount) {
  const createPhotosArr = function (data) {
    let photosArr = [];
    for (let i = 0; i < Math.ceil(Math.random() * 6); i++) {
      photosArr[i] = data[Math.floor(Math.random() * 3)];
    }

    return Array.from(new Set(photosArr));
  };

  const createFeaturesArr = function (data) {
    let featuresArr = [];
    for (let i = 0; i < Math.ceil(Math.random() * 30); i++) {
      featuresArr[i] = data[Math.floor(Math.random() * data.length)];
    }
    return Array.from(new Set(featuresArr));
  };

  let announcementsData = [];

  for (let i = 0; i < anouncementsAmount; i++) {
    let roomsAmount = Math.floor(Math.random() * 4) + 1;
    let xLocation = Math.floor(Math.random() * elementWidth);
    let yLocation = Math.floor(Math.random() * (630 - 130)) + 130;
    announcementsData[i] = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: `Заголовок предложения`,
        address: `${xLocation}, ${yLocation}`,
        price: Math.floor(Math.random() * (300000 - 5000)) + 5000,
        type: types[Math.floor(Math.random() * types.length)],
        rooms: roomsAmount,
        guests: roomsAmount * 2,
        checkin: times[Math.floor(Math.random() * times.length)],
        checkout: times[Math.floor(Math.random() * times.length)],
        features: createFeaturesArr(features),
        description: `Строка с описанием`,
        photos: createPhotosArr(photos)
      },
      location: {
        x: xLocation,
        y: yLocation
      }
    };
  }

  return announcementsData;
};

//  Создание массива со случайными данными

const announcementsData = createAnnouncementsData(HOUSING_TYPES_DATA, HOUSING_TIMES_DATA, HOUSING_FEATURES_DATA, HOUSING_PHOTOS_DATA, mapWidth, ANNOUNCEMENTS_AMOUNT);

//  Функция создания DOM-элемента на основе JS-объекта

const renderPin = function (data) {
  const pinBox = pinTemplate.cloneNode(true);
  const image = pinBox.querySelector(`img`);
  pinBox.style = `left: ${data.location.x + pinBox.offsetWidth}px; top: ${data.location.y + pinBox.offsetHeight}px`;
  image.src = data.author.avatar;
  image.alt = data.offer.title;
  return pinBox;
};

//  Создание и добавление фрагмента в DOM

const fragment = document.createDocumentFragment();

for (let i = 0; i < announcementsData.length; i++) {
  fragment.appendChild(renderPin(announcementsData[i]));
}

pinsList.appendChild(fragment);
