'use strict';

(function () {
  var mapFilter = document.querySelectorAll('.map__filter, .map__checkbox');

  var filterFeatureFactory = function (feature) {
    return function (offer, element) {
      if (element.checked) {
        return offer.features.includes(feature);
      }
      return true;
    };
  };

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
    }
  };

  var housingRoomsFilter = {
    '1': function (offer) {
      return offer.rooms === 1;
    },
    '2': function (offer) {
      return offer.rooms === 2;
    },
    '3': function (offer) {
      return offer.rooms === 3;
    },
    'any': function () {
      return true;
    }
  };

  var housingGuestsFilter = {
    '2': function (offer) {
      return offer.guests === 2;
    },
    '1': function (offer) {
      return offer.guests === 1;
    },
    '0': function (offer) {
      return offer.guests === 0;
    },
    'any': function () {
      return true;
    }
  };

  var housingTypeFilter = {
    'flat': function (offer) {
      return offer.type === 'flat';
    },
    'house': function (offer) {
      return offer.type === 'house';
    },
    'palace': function (offer) {
      return offer.type === 'palace';
    },
    'bungalo': function (offer) {
      return offer.type === 'bungalo';
    },
    'any': function () {
      return true;
    }
  };

  var filters = {
    'housing-price': housingPriceFilter,
    'housing-type': housingTypeFilter,
    'housing-rooms': housingRoomsFilter,
    'housing-guests': housingGuestsFilter,
    'filter-wifi': {
      'wifi': filterFeatureFactory('wifi')
    },
    'filter-dishwasher': {
      'dishwasher': filterFeatureFactory('dishwasher')
    },
    'filter-washer': {
      'washer': filterFeatureFactory('washer')
    },
    'filter-elevator': {
      'elevator': filterFeatureFactory('elevator')
    },
    'filter-conditioner': {
      'conditioner': filterFeatureFactory('conditioner')
    }
  };

  var filterHouses = function () {
    var data = window.data;
    mapFilter.forEach(function (item) {
      if (filters[item.id]) {
        var filter = filters[item.id][item.value];
        data = filterData(filter, data, item);
      }
    });
    var mapCard = document.querySelector('.map__card');
    window.tools.closeWindow(mapCard);
    renderFilteredPins(data);
  };

  var filterData = function (filter, data, element) {
    return data.map(function (dataEl) {
      if (filter(dataEl.offer, element)) {
        return dataEl;
      }
      return null;
    }).filter(function (item) {
      return item;
    });
  };

  var renderFilteredPins = function (filteredData) {
    var pin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pin.forEach(function (element) {
      element.remove();
    });
    window.map.showCreatedAds(filteredData);
  };

  mapFilter.forEach(function (item) {
    item.addEventListener('change', function (evt) {
      filterHouses(evt);
    });
  });
})();
