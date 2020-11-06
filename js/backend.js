'use strict';

(function () {
  const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;


  const errorTemplate = document.querySelector(`#error`).content;
  const adForm = document.querySelector(`.ad-form`);


  let createErrorBox = function (errorMessage) {
    const errorBox = errorTemplate.querySelector(`.error`).cloneNode(true);
    const errorMessageBox = errorBox.querySelector(`.error__message`);
    errorMessageBox.textContent = errorMessage;
    return errorBox;
  };


  let errorHandler = function (errorMessage) {
    const fragmentError = document.createDocumentFragment();
    let errorBox = createErrorBox(errorMessage);
    fragmentError.appendChild(errorBox);
    const errorButton = errorBox.querySelector(`.error__button`);

    let errorBoxHandler = function () {
      errorBox.remove();
      adForm.reset();
      errorButton.removeEventListener(`click`, errorBoxHandler);
      document.removeEventListener(`click`, errorBoxHandler);
      document.removeEventListener(`keydown`, onEscPress);
    };

    let onEscPress = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        errorBoxHandler();
      }
    };

    errorButton.addEventListener(`click`, errorBoxHandler);
    document.addEventListener(`click`, errorBoxHandler);
    document.addEventListener(`keydown`, onEscPress);
    document.querySelector(`main`).insertAdjacentElement(`afterbegin`, errorBox);

  };


  let setXhrListeners = function (xhr, onLoad, onError) {
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };


  let load = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    setXhrListeners(xhr, onLoad, onError);
    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  let save = function (data, onLoad, onError) {
    const xhr = new XMLHttpRequest();
    setXhrListeners(xhr, onLoad, onError);
    xhr.open(`POST`, URL_SAVE);
    xhr.send(data);
  };


  let announcements = [];
  let filteredAnnouncements = [];
  window.backend = {
    load,
    save,
    errorHandler,
    announcements,
    filteredAnnouncements
  };
})();

