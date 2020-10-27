'use strict';

(function () {
  const HOUSING_TYPES_DATA = [`palace`, `flat`, `house`, `bungalow`];
  const HOUSING_TIMES_DATA = [`12:00`, `13:00`, `14:00`];
  const HOUSING_FEATURES_DATA = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const HOUSING_PHOTOS_DATA = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const MAP_Y = 130;
  const MAP_HEIGHT = 630;

  const map = document.querySelector(`.map`);
  const mapWidth = map.offsetWidth;

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


  let createRandomAnnouncementText = function (index) {
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


  let createRandomAnnouncementsArrow = function () {

    let announcements = [];

    for (let i = 0; i < 8; i++) {
      announcements[i] = createRandomAnnouncementText(i);
    }

    return announcements;
  };


  let announcements = createRandomAnnouncementsArrow();

  window.data = {
    announcements
  };
})();
