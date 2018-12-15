'use strict';
// модуль, который создаёт данные

(function () {
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
    max: document.querySelector('.map__pins').clientWidth
  };

  var OFFERS_TOTAL = 8;

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

  window.date = {
    generateOffersArray: generateOffersArray,
    OFFERS_Y: OFFERS_Y,
    OFFERS_X: OFFERS_X
  };
})();
