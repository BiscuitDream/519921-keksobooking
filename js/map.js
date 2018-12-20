'use strict';
// модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var adFormFieldsets = window.form.adForm.querySelectorAll('fieldset');
  var addressInput = document.querySelector('#address');
  var isActivated = false;

  var onSuccessLoad = function (array) {
    var adverts = array.slice();
    window.pin.renderPins(adverts);
  };

  var onErrorLoad = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    var message = errorBlock.querySelector('.error__message');

    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].removeAttribute('disabled');
    }

    for (var j = 0; j < mapFilters.children.length; j++) {
      mapFilters.children[j].removeAttribute('disabled');
    }

    // var adverts = window.data.generateOffersArray();
    // window.pin.renderPins(adverts);
    isActivated = true;
    window.backend.load(onSuccessLoad, onErrorLoad);
  };

  var fillAddress = function () {
    addressInput.value = (mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2)) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight);
  };

  addressInput.value = (mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2)) + ', ' + (mapPinMain.offsetTop + mapPinMain.offsetHeight);

  // drag-n-drop
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // console.log(evt);

    var pinWidth = mapPinMain.offsetWidth;
    var pinHeight = mapPinMain.offsetHeight;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainCoords = {
        left: (mapPinMain.offsetLeft - shift.x),
        top: (mapPinMain.offsetTop - shift.y)
      };

      if (mapPinMainCoords.left + pinWidth / 2 < window.data.OFFERS_X.min) {
        mapPinMainCoords.left = window.data.OFFERS_X.min - (pinWidth / 2);
      }
      if (mapPinMainCoords.left + pinWidth / 2 > window.data.OFFERS_X.max) {
        mapPinMainCoords.left = window.data.OFFERS_X.max - (pinWidth / 2);
      }
      if (mapPinMainCoords.top + pinHeight < window.data.OFFERS_Y.min) {
        mapPinMainCoords.top = window.data.OFFERS_Y.min - pinHeight;
      }
      if (mapPinMainCoords.top + pinHeight > window.data.OFFERS_Y.max) {
        mapPinMainCoords.top = window.data.OFFERS_Y.max - pinHeight;
      }

      mapPinMain.style.left = mapPinMainCoords.left + 'px';
      mapPinMain.style.top = mapPinMainCoords.top + 'px';
      fillAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!isActivated) {
        activatePage();
      }
      fillAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    map: map
  };
})();
