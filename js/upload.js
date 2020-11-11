'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const avatarInitialPreviewSrc = avatarPreview.src;
const housingPicturesChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const housingPicturesPreview = document.querySelector(`.ad-form__photo`);

const onLoadAvatarReader = (reader) => {
  avatarPreview.src = reader.result;
};

const onLoadHousingPictures = (reader) => {
  const imgElement = document.createElement(`img`);
  imgElement.src = reader.result;
  imgElement.style.width = `100%`;
  imgElement.style.height = `100%`;
  housingPicturesPreview.append(imgElement);
};


const onChangeFileChooser = (fileChooser, cb) => {
  const file = fileChooser.files[0];
  const fileType = file.type;

  const matches = FILE_TYPES.some(function (type) {
    return fileType.endsWith(type);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      cb(reader);
    });

    reader.readAsDataURL(file);
  }
};

const onAvatarChange = () => {
  onChangeFileChooser(avatarChooser, onLoadAvatarReader);
};

const onHousingPicturesChange = () => {
  onChangeFileChooser(housingPicturesChooser, onLoadHousingPictures);
};

const clearAvatarPreview = () => {
  avatarPreview.src = avatarInitialPreviewSrc;
};

const clearHousingPictures = () => {
  while (housingPicturesPreview.firstChild) {
    housingPicturesPreview.removeChild(housingPicturesPreview.firstChild);
  }
};

window.upload = {
  onAvatarChange,
  onHousingPicturesChange,
  clearAvatarPreview,
  clearHousingPictures
};
