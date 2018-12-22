'use strict';
// модуль, который отвечает за создание пина — метки на карте;

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var map = window.map.field;
  var renderCard = window.card.render;


  var createPin = function (advertItem) {
    var mapPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinItem = mapPinTemplate.cloneNode(true);

    pinItem.style.left = advertItem.location.x - (PIN_WIDTH / 2) + 'px';
    pinItem.style.top = advertItem.location.y - PIN_HEIGHT + 'px';
    pinItem.querySelector('img').src = advertItem.author.avatar;
    pinItem.querySelector('img').alt = advertItem.offer.title;

    pinItem.addEventListener('click', function () {
      if (map.querySelector('.map__card')) {
        map.querySelector('.map__card').remove();
      }
      var card = renderCard(advertItem);
      var cardClose = card.querySelector('.popup__close');

      map.insertBefore(card, map.querySelector('.map__filters-container'));

      cardClose.addEventListener('click', function () {
        card.remove();
      });

      cardClose.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          card.remove();
        }
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          card.remove();
        }
      });
    });

    return pinItem;
  };

  var renderPins = function (advertsArray) {
    var mapPinsContainer = document.querySelector('.map__pins');
    var pinsFragment = document.createDocumentFragment();

    advertsArray.forEach(function (item) {
      pinsFragment.appendChild(createPin(item));
    });

    mapPinsContainer.appendChild(pinsFragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
