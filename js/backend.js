'use strict';

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

const adverts = [];
const filteredAdverts = [];


const createErrorBox = (errorMessage) => {
  const errorBox = errorTemplateElement.querySelector(`.error`).cloneNode(true);
  const errorMessageBox = errorBox.querySelector(`.error__message`);
  errorMessageBox.textContent = errorMessage;
  return errorBox;
};


const onErrorTemplate = (errorMessage, save) => {
  const fragmentError = document.createDocumentFragment();
  const errorBox = createErrorBox(errorMessage);
  fragmentError.appendChild(errorBox);
  const errorButton = errorBox.querySelector(`.error__button`);

  const onErrorButtonPress = () => {
    window.upload.clearAvatarPreview();
    window.upload.clearHousingPictures();
    errorBox.remove();
    adFormElement.reset();


    errorButton.removeEventListener(`click`, onErrorButtonPress);
    document.removeEventListener(`keydown`, onEscPress);
    if (save) {
      document.removeEventListener(`click`, onErrorButtonPress);
    }
  };

  const onEscPress = (evt) => {
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

const onLoadError = (errorMessage) => {
  onErrorTemplate(errorMessage);
};

const onSubmitError = (errorMessage) => {
  onErrorTemplate(errorMessage, save);
};


const setXhrListeners = (xhr, onLoad, onError) => {
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


const load = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  setXhrListeners(xhr, onLoad, onError);
  xhr.open(`GET`, URL_LOAD);
  xhr.send();
};

const save = (data, onLoad, onError) => {
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
