'use strict';

(function () {
  const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const errorTemplate = document.querySelector(`#error`).content;
  const successTemplate = document.querySelector(`#success`).content;
  const adForm = document.querySelector(`.ad-form`);


  let renderSuccessMessage = function () {
    const successBox = successTemplate.querySelector(`.success`).cloneNode(true);
    const fragmentSuccess = document.createDocumentFragment();
    fragmentSuccess.appendChild(successBox);
    return document.querySelector(`main`).insertAdjacentElement(`afterbegin`, successBox);
  }

  let createErrorBox = function (errorMessage) {
    const errorBox = errorTemplate.querySelector(`.error`).cloneNode(true);
    const errorMessageBox = errorBox.querySelector(`.error__message`);
    errorMessageBox.textContent = errorMessage;
    return errorBox;
  }


  let errorHandler = function (errorMessage) {
    const fragmentError = document.createDocumentFragment();
    let errorBox = createErrorBox(errorMessage);
    fragmentError.appendChild(errorBox);
    const errorButton = errorBox.querySelector(`.error__button`);
    let errorBoxHandler = function () {
      errorBox.remove();
      adForm.reset();
      errorButton.removeEventListener(`click`, errorBoxHandler);
    }
    errorButton.addEventListener(`click`, errorBoxHandler);
    document.querySelector(`main`).insertAdjacentElement(`afterbegin`, errorBox);

  };


  let setXhrListeners = function (xhr, onLoad, onError, type) {
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
    setXhrListeners(xhr, onLoad, onError, `load`);
    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  let save = function (data, onLoad, onError) {
    const xhr = new XMLHttpRequest();
    setXhrListeners(xhr, onLoad, onError, `save`);
    xhr.open(`POST`, URL_SAVE);
    xhr.send(data);
  };

  let announcements = [];

  window.backend = {
    load,
    save,
    renderSuccessMessage,
    errorHandler,
    announcements
  };
})();

