'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formDisabled = document.querySelectorAll('fieldset, select');
  var mapFilters = document.querySelector('.map__filters');
  var pinTemplateItem = window.tools.getTemplate('#pin');
  var adsFragment = new DocumentFragment();

  var makeFormDisabled = function (isDisabled) {
    formDisabled.forEach(function (element) {
      element.disabled = isDisabled;
    });
  };

  var deactivatePage = function () {
    makeFormDisabled(true);
    map.classList.add('map--faded');
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    adForm.classList.add('ad-form--disabled');
    mapFilters.reset();
    mapFilters.classList.add('ad-form--disabled');
    window.movingPin.showCurrentAddress();
  };

  var activatePage = function () {
    if (map.classList.contains('map--faded')) {
      makeFormDisabled(false);
      map.classList.remove('map--faded');
      window.form.checkCapacityValidation();
      adForm.classList.remove('ad-form--disabled');
      mapFilters.classList.remove('ad-form--disabled');
      window.backend.load(onSuccessLoad, window.form.onAdLoadError);
    }
  };

  var removeActivePin = function () {
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove('map__pin--active');
    }
  };

  var createAds = function (item) {
    var pinEl = pinTemplateItem.cloneNode(true);
    pinEl.dataset.id = item.id;
    var pinTemplateImg = pinEl.querySelector('.map__pin-img');
    var X = window.movingPin.size.HALF_WIDTH;
    var Y = window.movingPin.size.HEIGHT;
    pinEl.style.left = (item.location.x - X) + 'px';
    pinEl.style.top = (item.location.y - Y) + 'px';
    pinTemplateImg.src = item.author.avatar;
    pinTemplateImg.alt = item.offer.title;
    adsFragment.appendChild(pinEl);
    pinEl.addEventListener('click', function () {
      window.showCreatedCards(pinEl);
      removeActivePin();
      pinEl.classList.add('map__pin--active');
    });
  };

  var showCreatedAds = function (data) {
    data.slice(0, 5).forEach(createAds);
    mapPins.appendChild(adsFragment);
  };

  var onSuccessLoad = function (response) {
    window.map.data = response.filter(function (item) {
      return item.hasOwnProperty('offer');
    }).map(function (element, id) {
      element.id = id;
      return element;
    });
    showCreatedAds(window.map.data);
  };

  deactivatePage();

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.tools.Key.LEFT_MOUSE) {
      activatePage();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.tools.Key.ENTER) {
      activatePage();
    }
  });
  window.map = {
    showCreatedAds: showCreatedAds,
    deactivatePage: deactivatePage,
    removeActivePin: removeActivePin,
    pins: mapPins,
    data: []
  };
})();


