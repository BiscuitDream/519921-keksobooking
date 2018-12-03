'use strict';

var OFFERS_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартир',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFERS_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var OFFERS_TYPES_DICT = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var OFFERS_CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFERS_CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFERS_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFERS_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var OFFERS_PRICES = {
  min: 1000,
  max: 1000000
};

var OFFERS_ROOMS = {
  min: 1,
  max: 5
};

var OFFERS_GUESTS = {
  min: 1,
  max: 4
};

var OFFERS_Y = {
  min: 130,
  max: 630
};

var OFFERS_X = {
  min: 0,
  max: document.querySelector('.map').clientWidth
};

var OFFERS_TOTAL = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');

var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomElement = function (array) {
  return array[getRandomIndex(array)];
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffleArray = function (array) {
  var j;
  var temp;
  var clonedArray = array.slice();

  for (var i = 0; i < clonedArray.length; i++) {
    j = Math.floor(Math.random() * (clonedArray.length - i)) + i;
    temp = clonedArray[i];
    clonedArray[i] = clonedArray[j];
    clonedArray[j] = temp;
  }

  return clonedArray;
};

var getRandomAvatar = function () {
  var avatars = [];

  for (var i = 0; i < OFFERS_TOTAL; i++) {
    avatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }

  return shuffleArray(avatars);
};

var generateOffersArray = function () {
  var offersTitles = shuffleArray(OFFERS_TITLES);
  var avatarAddresses = getRandomAvatar();
  var adverts = [];

  for (var i = 0; i < 8; i++) {
    var offersPhotos = shuffleArray(OFFERS_PHOTOS);
    var locationX = getRandomInteger(OFFERS_X.min, OFFERS_X.max);
    var locationY = getRandomInteger(OFFERS_Y.min, OFFERS_Y.max);

    adverts[i] = {
      author: {
        avatar: avatarAddresses[i]
      },
      offer: {
        title: offersTitles[i],
        address: locationX + ', ' + locationY,
        price: getRandomInteger(OFFERS_PRICES.min, OFFERS_PRICES.max),
        type: getRandomElement(OFFERS_TYPES),
        rooms: getRandomInteger(OFFERS_ROOMS.min, OFFERS_ROOMS.max),
        guests: getRandomInteger(OFFERS_GUESTS.min, OFFERS_GUESTS.max),
        checkin: getRandomElement(OFFERS_CHECKIN_TIMES),
        checkout: getRandomElement(OFFERS_CHECKOUT_TIMES),
        // копируем массив удобств, перемешиваем, возвращаем копию массива со случайной длиной
        features: shuffleArray(OFFERS_FEATURES).slice(0, getRandomInteger(1, OFFERS_FEATURES.length)),
        description: '',
        photos: offersPhotos
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  return adverts;
};

var createPin = function (advertItem) {
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var pinItem = mapPinTemplate.cloneNode(true);

  pinItem.style.left = advertItem.location.x - (PIN_WIDTH / 2) + 'px';
  pinItem.style.top = advertItem.location.y - PIN_HEIGHT + 'px';
  pinItem.querySelector('img').src = advertItem.author.avatar;
  pinItem.querySelector('img').alt = advertItem.offer.title;

  return pinItem;
};

var renderPins = function (advertsArray) {
  var mapPins = document.querySelector('.map__pins');
  var pinsFragment = document.createDocumentFragment();

  advertsArray.forEach(function (item) {
    pinsFragment.appendChild(createPin(item));
  });

  mapPins.appendChild(pinsFragment);
};

// var createPhotos = function (photos) {
//   var photosFragment = document.createDocumentFragment();
//   var photosTemplate = document.querySelector('#card')
//     .content
//     .querySelector('.popup__photo');
//
//   for (var i = 0; i < photos.length; i++) {
//     var photosElement = photosTemplate.cloneNode(true);
//     photosElement.src = photos[i];
//     photosFragment.appendChild(photosElement);
//   }
//
//   return photosFragment;
// };

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
  // card.querySelector('.popup__photos').replaceChild(createPhotos(advertItem.offer.photos), card.querySelector('.popup__photos').querySelector('.popup__photo'));
  card.querySelector('.popup__photos').innerHTML = '';
  advertItem.offer.photos.forEach(function (item) {
    card.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img src="' + item + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  });

  return card;
};

// map.classList.remove('map--faded');
// var adverts = generateOffersArray();
// renderPins(adverts);
// var card = renderCard(adverts[0]);
// map.insertBefore(card, map.querySelector('.map__filters-container'));
