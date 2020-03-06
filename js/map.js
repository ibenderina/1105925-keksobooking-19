'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content;
  var pinTemplateItem = pinTemplate.children[0];
  var mapPins = document.querySelector('.map__pins');
  var adsFragment = new DocumentFragment();

  var createSimilarAd = function () {
    return window.data;
  };

  map.classList.remove('map--faded');

  createSimilarAd().forEach(function (item) {
    var pinEl = pinTemplateItem.cloneNode(true);
    var pinTemplateImg = pinEl.querySelector('.map__pin-img');
    var x = 0;
    var y = 0;
    pinEl.style.left = (item.location.x + x) + 'px';
    pinEl.style.top = (item.location.y + y) + 'px';
    pinTemplateImg.src = item.author.avatar;
    pinTemplateImg.alt = item.offer.title;
    adsFragment.appendChild(pinEl);
  });

  mapPins.appendChild(adsFragment);
  mapFilterContainer.insertAdjacentElement('beforeBegin', window.createCard());
})();


