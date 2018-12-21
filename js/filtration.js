'use strict';

(function () {
  var NUMBER_OF_PINS = 5;
  var filterPins = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var featuresSelect = document.querySelector('#housing-features');
  var featuresElemsArray = Array.from(featuresSelect.querySelectorAll('[name="features"]'));
  var mapPins = document.querySelector('.map__pins');

  var removeAllPins = function () {
    var allPinsElems = mapPins.querySelectorAll('.map__pin[type="button"]');
    for (var i = 0; i < allPinsElems.length; i++) {
      allPinsElems[i].remove();
    }
  };

  var updatePins = window.debounce(function () {

    var allPins = window.adverts;
    var housingTypeValue = housingType.value;
    var priceSelectValue = priceSelect.value;
    var roomsSelectValue = roomsSelect.value;
    var guestsSelectValue = guestsSelect.value;


    var filterByParam = function (offerValue, filterValue) {
      return filterValue === 'any' || offerValue.toString() === filterValue.toString();
    };

    var filterByPrice = function (offerValue, filterValue) {
      if (filterValue === 'low') {
        return offerValue < 10000;
      } else if (filterValue === 'middle') {
        return offerValue >= 10000 && offerValue < 50000;
      } else if (filterValue === 'high') {
        return offerValue >= 50000;
      }
      return true;
    };

    var filterByFeatures = function (offerFeatures) {
      var checked = featuresElemsArray.filter(function (elem) {
        return elem.checked === true;
      });

      return checked.every(function (elem) {
        return offerFeatures.indexOf(elem.value) > -1;
      });
    };

    var filteredPins = allPins.filter(function (elem) {
      return filterByParam(elem.offer.type, housingTypeValue)
        && filterByParam(elem.offer.rooms, roomsSelectValue)
        && filterByParam(elem.offer.guests, guestsSelectValue)
        && filterByPrice(elem.offer.price, priceSelectValue)
        && filterByFeatures(elem.offer.features);
    });

    removeAllPins();

    var filteredPinsSliced = filteredPins.slice(0, NUMBER_OF_PINS);
    window.pin.renderPins(filteredPinsSliced);
  });

  filterPins.addEventListener('change', function () {
    window.card.removeCard();
    updatePins();
  });

  window.filtration = {
    NUMBER_OF_PINS: NUMBER_OF_PINS,
    removeAllPins: removeAllPins,
  };
})();
