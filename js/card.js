'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content;
  var cardTemplateItem = cardTemplate.children[0];

  var createCard = function () {
    var cardTemplateItemClone = cardTemplateItem.cloneNode(true);
    var popupAvatar = cardTemplateItemClone.querySelector('.popup__avatar');
    var popupPhotos = cardTemplateItemClone.querySelector('.popup__photos');
    var popupPhoto = cardTemplateItemClone.querySelector('.popup__photo');
    var popupFeatures = cardTemplateItemClone.querySelector('.popup__features');
    var popupFeature = cardTemplateItemClone.querySelectorAll('.popup__feature');
    var data = window.data[0];
    var offer = data.offer;
    var dataPhotos = new DocumentFragment();
    var popupData = [
      ['.popup__title', offer.title],
      ['.popup__text--address', offer.address],
      ['.popup__text--price', offer.price ? offer.price + '₽/ночь.' : null],
      ['.popup__type', offer.type],
      ['.popup__text--capacity', offer.rooms && offer.guests ? offer.rooms + ' комнаты для ' + offer.guests + ' гостей.' : null],
      ['.popup__text--time', offer.checkin && offer.checkout ? 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout + '.' : null],
      ['.popup__description', offer.description]
    ];
    popupAvatar.src = data.author.avatar;
    if (offer.photos) {
      offer.photos.forEach(function (item) {
        var popupPhotoClone = popupPhoto.cloneNode();
        popupPhotoClone.src = item;
        dataPhotos.appendChild(popupPhotoClone);
      });
    }
    popupPhoto.classList.add('hidden');
    popupPhotos.appendChild(dataPhotos);
    if (offer.features) {
      popupFeature.forEach(function (item) {
        // var popupFeatureClass = item.className;
        // if () {
        //   offer.features.indexOf(popupFeatureClass);
        // }
      });
    }

    popupData.forEach(function (item) {
      if (item[1]) {
        var dataSelector = cardTemplateItemClone.querySelector(item[0]);
        dataSelector.textContent = item[1];
      }
    });
    return cardTemplateItemClone;
  };

  window.createCard = createCard;
})();
