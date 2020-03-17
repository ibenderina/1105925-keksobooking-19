'use strict';

(function () {
  var pinSize = {
    HALF_WIDTH: 65 / 2,
    HEIGHT: 65,
    HALF_HEIGHT: 65 / 2
  };
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelector('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var pinTemplateItem = window.tools.getTemplate('#pin');
  var adsFragment = new DocumentFragment();

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adFormFieldset.disabled = true;
    mapFilters.classList.add('ad-form--disabled');
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormFieldset.disabled = false;
    mapFilters.classList.remove('ad-form--disabled');
  };

  var showCreatedAds = function (data) {
    data.slice(0, 5).forEach(createAds);
    mapPins.appendChild(adsFragment);
  };

  var createAds = function (item, index) {
    var pinEl = pinTemplateItem.cloneNode(true);
    pinEl.dataset.id = index;
    var pinTemplateImg = pinEl.querySelector('.map__pin-img');
    var X = pinSize.HALF_WIDTH;
    var Y = pinSize.HEIGHT;
    pinEl.style.left = (item.location.x - X) + 'px';
    pinEl.style.top = (item.location.y - Y) + 'px';
    pinTemplateImg.src = item.author.avatar;
    pinTemplateImg.alt = item.offer.title;
    adsFragment.appendChild(pinEl);
    pinEl.addEventListener('click', function () {
      window.card.showCreatedCards(pinEl);
    });
  };

  var onSuccessLoad = function (response) {
    window.data = response.map(function (element, id) {
      element.id = id;
      return element;
    });
  };

  var onErrorLoad = function () {
  };

  deactivatePage();

  window.backend.load(onSuccessLoad, onErrorLoad);

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.tools.Key.LEFT_MOUSE) {
      activatePage();
      showCreatedAds(window.data);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.tools.Key.ENTER) {
      activatePage();
      showCreatedAds(window.data);
    }
  });
  window.map = {
    showCreatedAds: showCreatedAds,
    pinSize: pinSize,
    mapPins: mapPins
  };
})();


