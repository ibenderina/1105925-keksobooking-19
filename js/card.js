'use strict';

(function () {
  var cardTemplateItem = window.tools.getTemplate('#card');
  var mapFilterContainer = document.querySelector('.map__filters-container');

  // проверяем наличие удобств в информации с сервера, добавляем нужные в карточку товара, остальные скрываем
  var showFeatures = function (offer, popupFeature) {
    if (offer.features) {
      popupFeature.forEach(function (item) {
        item.classList.remove('popup__feature');
        var similarData = offer.features.some(function (element) {
          return item.className.includes(element);
        });
        if (similarData) {
          item.classList.add('popup__feature');
        }
      });
    }
  };
  //  проверяем наличие фотографий в информации с сервера, добавляем их в карточку объявления, лишние теги img скрываем (если нет фото)
  var showPhotos = function (offer, popupPhoto, dataPhotos, popupPhotos) {
    if (offer.photos) {
      offer.photos.forEach(function (item) {
        var popupPhotoClone = popupPhoto.cloneNode();
        popupPhotoClone.src = item;
        dataPhotos.appendChild(popupPhotoClone);
      });
    }
    popupPhoto.classList.add('hidden');
    popupPhotos.appendChild(dataPhotos);
  };
  //  собираем все данные для карточки объявления в информации с сервера
  var createCard = function (indexOfCard) {
    var cardTemplateItemClone = cardTemplateItem.cloneNode(true);
    var popupAvatar = cardTemplateItemClone.querySelector('.popup__avatar');
    var popupPhotos = cardTemplateItemClone.querySelector('.popup__photos');
    var popupPhoto = cardTemplateItemClone.querySelector('.popup__photo');
    var popupFeature = cardTemplateItemClone.querySelectorAll('.popup__feature');
    var data = window.data[indexOfCard];
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

    showPhotos(offer, popupPhoto, dataPhotos, popupPhotos);
    showFeatures(offer, popupFeature);

    popupData.forEach(function (item) {
      if (item[1]) {
        var dataSelector = cardTemplateItemClone.querySelector(item[0]);
        dataSelector.textContent = item[1];
      }
    });
    return cardTemplateItemClone;
  };

  //  отображаем или скрываем данные в карточке объявления
  var showCreatedCards = function (element) {
    var card = createCard(parseInt(element.dataset.id, 10));
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    mapFilterContainer.insertAdjacentElement('beforeBegin', card);
    var popupClose = card.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      window.tools.onButtonCloseClick(card);
    });
  };

  window.card = {
    createCard: createCard,
    showCreatedCards: showCreatedCards
  };
})();

