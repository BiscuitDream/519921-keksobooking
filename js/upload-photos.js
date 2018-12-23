'use strict';
// 6.1. В форме подачи объявления показывается аватарка пользователя и фотографии объявления при изменении значений соответствующих полей.
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]'); // элемент выбора аватарки
  var avatarPreview = document.querySelector('.ad-form-header__preview img'); // элемент предпросмотра аватарки

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var Image = {
    WIDTH: '70px',
    HEIGHT: '70px'
  };

  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var renderPhotos = function (photo) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var image = document.createElement('img');
      image.src = reader.result;
      image.style.width = Image.WIDTH;
      image.style.height = Image.HEIGHT;
      photoPreview.appendChild(image);
    });

    reader.readAsDataURL(photo);
  };

  photoChooser.addEventListener('change', function () {
    var photos = photoChooser.files;

    var photosArray = [].slice.call(photos);

    photosArray.forEach(function (photo) {
      var photoName = photo.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return photoName.endsWith(it);
      });

      if (matches) {
        renderPhotos(photo);
      }
    });
  });

  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var removeImages = function () {
    if (avatarPreview.src !== DEFAULT_AVATAR) {
      avatarPreview.src = DEFAULT_AVATAR;
    }
    photoPreview.innerHTML = '';
  };

  window.uploadPhotos = {
    removeImages: removeImages
  };
})();
