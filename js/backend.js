'use strict';

(function () {
  const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const errorTemplateElement = document.querySelector(`#error`).content;
  const adFormElement = document.querySelector(`.ad-form`);

  let announcements = [];
  let filteredAnnouncements = [];


  let createErrorBox = function (errorMessage) {
    const errorBox = errorTemplateElement.querySelector(`.error`).cloneNode(true);
    const errorMessageBox = errorBox.querySelector(`.error__message`);
    errorMessageBox.textContent = errorMessage;
    return errorBox;
  };


  let onErrorTemplate = function (errorMessage, save) {
    const fragmentError = document.createDocumentFragment();
    let errorBox = createErrorBox(errorMessage);
    fragmentError.appendChild(errorBox);
    const errorButton = errorBox.querySelector(`.error__button`);

    let onErrorButtonPress = function () {
      errorBox.remove();
      adFormElement.reset();
      errorButton.removeEventListener(`click`, onErrorButtonPress);
      document.removeEventListener(`keydown`, onEscPress);
      if (save) {
        document.removeEventListener(`click`, onErrorButtonPress);
      }
    };

    let onEscPress = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        onErrorButtonPress();
      }
    };

    errorButton.addEventListener(`click`, onErrorButtonPress);
    document.addEventListener(`keydown`, onEscPress);
    if (save) {
      document.addEventListener(`click`, onErrorButtonPress);
    }

    document.querySelector(`main`).insertAdjacentElement(`afterbegin`, errorBox);
  };

  let onLoadError = function (errorMessage) {
    onErrorTemplate(errorMessage);
  };

  let onSubmitError = function (errorMessage) {
    onErrorTemplate(errorMessage, save);
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


  window.backend = {
    load,
    save,
    onLoadError,
    onSubmitError,
    announcements,
    filteredAnnouncements
  };
})();

