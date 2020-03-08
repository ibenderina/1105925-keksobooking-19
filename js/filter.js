'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var housingPriceFilter = {
    'middle': function (offer) {
      return offer.price >= 10000 && offer.price < 50000;
    },
    'low': function (offer) {
      return offer.price < 10000;
    },
    'high': function (offer) {
      return offer.price >= 50000;
    },
    'any': function () {
      return true;
    },
  };

  var filters = {
    'housing-price': housingPriceFilter,
  };

  // фильтры применяются через И
  var filterHouses = function (evt) {
    var target = evt.target;
    var filter = filters[target.id];
    var filteredData = window.data.map(function (dataEl, pinId) {
      if (filter[target.value](dataEl.offer)) {
        return pinId;
      }
      return -1;
    }).filter(function (item) {
      return item >= 0;
    });
    var pin = document.querySelectorAll('.map__pin');
    pin.forEach(function (element) {
      if (filteredData.includes(parseInt(element.dataset.id, 10))) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  };

  housingType.addEventListener('change', function (evt) {
    filterHouses(evt);
  });

  housingPrice.addEventListener('change', function (evt) {
    filterHouses(evt);
  });

  housingRooms.addEventListener('change', function (evt) {
    filterHouses(evt);
  });

  housingGuests.addEventListener('change', function (evt) {
    filterHouses(evt);
  });

  housingFeatures.addEventListener('change', function (evt) {
    filterHouses(evt);
  });
})();
