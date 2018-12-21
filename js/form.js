'use strict';
// модуль, который работает с формой объявления.

(function () {
  var adForm = document.querySelector('.ad-form');
  var titleInput = adForm.querySelector('#title');

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;
  var buildingTypeSelect = adForm.querySelector('#type');
  var pricePerNightInput = adForm.querySelector('#price');

  buildingTypeSelect.addEventListener('change', function () {
    if (buildingTypeSelect.value === 'bungalo') {
      pricePerNightInput.setAttribute('min', MIN_BUNGALO_PRICE);
      pricePerNightInput.placeholder = MIN_BUNGALO_PRICE;
    } else if (buildingTypeSelect.value === 'flat') {
      pricePerNightInput.setAttribute('min', MIN_FLAT_PRICE);
      pricePerNightInput.placeholder = MIN_FLAT_PRICE;
    } else if (buildingTypeSelect.value === 'house') {
      pricePerNightInput.setAttribute('min', MIN_HOUSE_PRICE);
      pricePerNightInput.placeholder = MIN_HOUSE_PRICE;
    } else if (buildingTypeSelect.value === 'palace') {
      pricePerNightInput.setAttribute('min', MIN_PALACE_PRICE);
      pricePerNightInput.placeholder = MIN_PALACE_PRICE;
    }
  });

  pricePerNightInput.addEventListener('input', function () {
    if (pricePerNightInput.validity.valueMissing) {
      pricePerNightInput.setCustomValidity('Обязательное поле');
    } else if (buildingTypeSelect.value === 'bungalo' && pricePerNightInput.value < MIN_BUNGALO_PRICE) {
      pricePerNightInput.setCustomValidity('Цена за бунгало должна превышать 0Р.');
    } else if (buildingTypeSelect.value === 'flat' && pricePerNightInput.value < MIN_FLAT_PRICE) {
      pricePerNightInput.setCustomValidity('Цена за квартиру должна превышать 999Р.');
    } else if (buildingTypeSelect.value === 'house' && pricePerNightInput.value < MIN_HOUSE_PRICE) {
      pricePerNightInput.setCustomValidity('Цена за дом должна превышать 4999Р.');
    } else if (buildingTypeSelect.value === 'palace' && pricePerNightInput.value < MIN_PALACE_PRICE) {
      pricePerNightInput.setCustomValidity('Цена за дворец должна превышать 9999Р.');
    } else {
      pricePerNightInput.setCustomValidity('');
    }
  });

  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
  });

  var numberOfRoomsSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');

  var onNumberOfRoomsSelectChange = function () {
    switch (numberOfRoomsSelect.value) {
      case '1':
        capacitySelect.options[0].disabled = true;
        capacitySelect.options[1].disabled = true;
        capacitySelect.options[2].disabled = false;
        capacitySelect.options[3].disabled = true;
        if (capacitySelect.value !== '1') {
          capacitySelect.selectedIndex = 2;
        }
        break;
      case '2':
        capacitySelect.options[0].disabled = true;
        capacitySelect.options[1].disabled = false;
        capacitySelect.options[2].disabled = false;
        capacitySelect.options[3].disabled = true;
        if (capacitySelect.value === '3' || capacitySelect.value === '0') {
          capacitySelect.selectedIndex = 2;
        }
        break;
      case '3':
        capacitySelect.options[0].disabled = false;
        capacitySelect.options[1].disabled = false;
        capacitySelect.options[2].disabled = false;
        capacitySelect.options[3].disabled = true;
        if (capacitySelect.value === '0') {
          capacitySelect.selectedIndex = 2;
        }
        break;
      case '100':
        capacitySelect.options[0].disabled = true;
        capacitySelect.options[1].disabled = true;
        capacitySelect.options[2].disabled = true;
        capacitySelect.options[3].disabled = false;
        if (capacitySelect.value !== '100') {
          capacitySelect.selectedIndex = 3;
        }
        break;
    }
  };

  numberOfRoomsSelect.addEventListener('change', onNumberOfRoomsSelectChange);

  var deactivatePage = function () {
    adForm.reset();
    window.filtration.removeAllPins();
    window.map.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.isActivated = false;
    window.card.removeCard();
  };

  // Отправка данных на сервер
  var onSuccessUpload = function () {
    deactivatePage();

    var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
    var successBlock = successTemplate.cloneNode(true);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        successBlock.remove();
      }
    });
    document.addEventListener('click', function () {
      successBlock.remove();
    });

    document.body.insertAdjacentElement('afterbegin', successBlock);
  };

  var onErrorUpload = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    var message = errorBlock.querySelector('.error__message');

    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);

    setTimeout(function () {
      errorBlock.remove();
    }, 3500);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), onSuccessUpload, onErrorUpload);
    evt.preventDefault();
  });

  window.form = {
    adForm: adForm
  };
})();
