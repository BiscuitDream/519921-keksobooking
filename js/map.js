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
  return array;
};

var generateOffersArray = function () {
  var adverts = [];

  for (var i = 0; i < 8; i++) {
    var locationX = getRandomInteger(OFFERS_X.min, OFFERS_X.max);
    var locationY = getRandomInteger(OFFERS_Y.min, OFFERS_Y.max);

    adverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png'
      },
      offer: {
        title: getRandomElement(OFFERS_TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomInteger(OFFERS_PRICES.min, OFFERS_PRICES.max),
        type: getRandomElement(OFFERS_TYPES),
        rooms: getRandomInteger(OFFERS_ROOMS.min, OFFERS_ROOMS.max),
        guests: getRandomInteger(OFFERS_GUESTS.min, OFFERS_GUESTS.max),
        checkin: getRandomElement(OFFERS_CHECKIN_TIMES),
        checkout: getRandomElement(OFFERS_CHECKOUT_TIMES),
        features: getRandomElement(OFFERS_FEATURES),
        description: '',
        photos: OFFERS_PHOTOS
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  return adverts;
};
// Необходимо подкорректировать размеры
var createPin = function (advertItem) {
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var pinItem = mapPinTemplate.cloneNode(true);

  pinItem.style.left = advertItem.location.x + 'px';
  pinItem.style.top = advertItem.location.y + 'px';
  pinItem.querySelector('img').src = advertItem.author.avatar;
  pinItem.querySelector('img').alt = advertItem.offer.title;

  return pinItem;
};

var renderPins = function (advertsArray) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  advertsArray.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });

  mapPins.appendChild(fragment);
};

var adverts = generateOffersArray();

renderPins(adverts);

// createPin(adverts[1]);

// map__pins

document.querySelector('.map').classList.remove('map--faded');
