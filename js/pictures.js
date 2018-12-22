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
})();
