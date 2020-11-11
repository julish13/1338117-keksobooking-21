'use strict';
(function () {
  const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
  const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const EVENT_KEYS = {
    ESC: `Escape`
  };

  const errorTemplateElement = document.querySelector(`#error`).content;
  const adFormElement = document.querySelector(`.ad-form`);

  let adverts = [];
  let filteredAdverts = [];


  let createErrorBox = (errorMessage) => {
    const errorBox = errorTemplateElement.querySelector(`.error`).cloneNode(true);
    const errorMessageBox = errorBox.querySelector(`.error__message`);
    errorMessageBox.textContent = errorMessage;
    return errorBox;
  };


  let onErrorTemplate = (errorMessage, save) => {
    const fragmentError = document.createDocumentFragment();
    let errorBox = createErrorBox(errorMessage);
    fragmentError.appendChild(errorBox);
    const errorButton = errorBox.querySelector(`.error__button`);

    let onErrorButtonPress = () => {
      errorBox.remove();
      adFormElement.reset();
      errorButton.removeEventListener(`click`, onErrorButtonPress);
      document.removeEventListener(`keydown`, onEscPress);
      if (save) {
        document.removeEventListener(`click`, onErrorButtonPress);
      }
    };

    let onEscPress = (evt) => {
      if (evt.key === EVENT_KEYS.ESC) {
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

  let onLoadError = (errorMessage) => {
    onErrorTemplate(errorMessage);
  };

  let onSubmitError = (errorMessage) => {
    onErrorTemplate(errorMessage, save);
  };


  let setXhrListeners = (xhr, onLoad, onError) => {
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };


  let load = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    setXhrListeners(xhr, onLoad, onError);
    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  let save = (data, onLoad, onError) => {
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
    adverts,
    filteredAdverts
  };
})();
