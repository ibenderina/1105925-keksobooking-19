'use strict';

(function () {
  var MAX_SHOWN_PINS = 5;
  var mapFilter = Array.from(document.querySelectorAll('.map__filter, .map__checkbox'));

  var filterHousingPrice = function (offer, element) {
    switch (element.value) {
      case 'middle':
        return offer.price >= 10000 && offer.price < 50000;
      case 'low':
        return offer.price < 10000;
      case 'high':
        return offer.price >= 50000;
      case 'any':
        return true;
    }
    return false;
  };

  var filterHousingRooms = function (offer, element) {
    return element.value === 'any' ? true : offer.rooms === parseInt(element.value, 10);
  };

  var filterHousingGuests = function (offer, element) {
    return element.value === 'any' ? true : offer.guests === parseInt(element.value, 10);
  };

  var filterHousingType = function (offer, element) {
    return element.value === 'any' ? true : element.value === offer.type;
  };

  var filterFeatureFactory = function (feature) {
    return function (offer, element) {
      if (element.checked) {
        return offer.features.includes(feature);
      }
      return true;
    };
  };

  var filterWifi = filterFeatureFactory('wifi');
  var filterDishwasher = filterFeatureFactory('dishwasher');
  var filterWasher = filterFeatureFactory('washer');
  var filterElevator = filterFeatureFactory('elevator');
  var filterConditioner = filterFeatureFactory('conditioner');

  var filters = function (filterId) {
    switch (filterId) {
      case 'housing-price':
        return filterHousingPrice;
      case 'housing-type':
        return filterHousingType;
      case 'housing-rooms':
        return filterHousingRooms;
      case 'housing-guests':
        return filterHousingGuests;
      case 'filter-wifi':
        return filterWifi;
      case 'filter-dishwasher':
        return filterDishwasher;
      case 'filter-washer':
        return filterWasher;
      case 'filter-elevator':
        return filterElevator;
      case 'filter-conditioner':
        return filterConditioner;
    }
    return null;
  };

  var filterHouses = function () {
    var data = window.map.data;
    var filteredData = [];
    var activeFilters = mapFilter.filter(function (el) {
      return el.value !== 'any' || el.checked;
    });
    for (var i = 0; i < data.length && filteredData.length < MAX_SHOWN_PINS; i++) {
      var dataItem = data[i];
      for (var y = 0; y < activeFilters.length; y++) {
        var filterEl = activeFilters[y];
        var filterFunc = filters(filterEl.id);
        if (filterFunc && !filterFunc(dataItem.offer, filterEl)) {
          dataItem = null;
          break;
        }
      }
      if (dataItem) {
        filteredData.push(dataItem);
      }
    }
    var mapCard = document.querySelector('.map__card');
    window.tools.closeWindow(mapCard);
    renderFilteredPins(filteredData);
  };

  var removeAllPins = function () {
    var pin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pin.forEach(function (element) {
      element.remove();
    });
  };

  var renderFilteredPins = function (filteredData) {
    removeAllPins();
    window.map.showCreatedAds(filteredData);
  };

  var debouncedFilterHouses = window.tools.debounce(filterHouses);

  mapFilter.forEach(function (item) {
    item.addEventListener('change', function (evt) {
      debouncedFilterHouses(evt);
    });
  });

  window.filter = {
    removeAllPins: removeAllPins,
    MAX_SHOWN_PINS: MAX_SHOWN_PINS
  };
})();
