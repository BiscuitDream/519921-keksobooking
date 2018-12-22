'use strict';
// модуль, который отвечает за создание карточки объявлений;

(function () {
  var OFFERS_TYPES_DICT = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var renderCard = function (advertItem) {
    var cardTemplate = document.querySelector('#card')
        .content
        .querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = advertItem.author.avatar;
    card.querySelector('.popup__title').textContent = advertItem.offer.title;
    card.querySelector('.popup__text--address').textContent = advertItem.offer.address;
    card.querySelector('.popup__text--price').textContent = advertItem.offer.price + '\u20BD';
    card.querySelector('.popup__text--price').insertAdjacentHTML('beforeend', '<span>/ночь</span>');
    card.querySelector('.popup__type').textContent = OFFERS_TYPES_DICT[advertItem.offer.type];
    card.querySelector('.popup__text--capacity').textContent = advertItem.offer.rooms + ' комнаты для ' + advertItem.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertItem.offer.checkin + ' выезд до ' + advertItem.offer.checkout;
    card.querySelector('.popup__features').innerHTML = '';
    advertItem.offer.features.forEach(function (item) {
      card.querySelector('.popup__features').insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + item + '"></li>');
    });
    card.querySelector('.popup__description').textContent = advertItem.offer.description;
    card.querySelector('.popup__photos').innerHTML = '';
    advertItem.offer.photos.forEach(function (item) {
      card.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img src="' + item + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    });

    return card;
  };
  var removeCard = function () {
    var card = document.querySelector('.map').querySelector('.map__card.popup');
    if (card) {
      card.remove();
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
