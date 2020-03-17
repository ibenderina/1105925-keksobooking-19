'use strict';

(function () {
  var Y = {
    MIN: 130,
    MAX: 630
  };
  var movingMapPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  address.value = movingMapPin.offsetLeft + ', ' + movingMapPin.offsetTop;

  movingMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;
    var startCoordsY = evt.clientY;
    var trigger = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      trigger = true;
      var shiftX = startCoordsX - moveEvt.clientX;
      var shiftY = startCoordsY - moveEvt.clientY;
      startCoordsX = moveEvt.clientX;
      startCoordsY = moveEvt.clientY;
      var coordsX = movingMapPin.offsetLeft - shiftX;
      if (coordsX < -window.map.pinSize.HALF_WIDTH) {
        coordsX = -window.map.pinSize.HALF_WIDTH;
      } else if (coordsX > window.map.mapPins.clientWidth - window.map.pinSize.HALF_WIDTH) {
        coordsX = window.map.mapPins.clientWidth - window.map.pinSize.HALF_WIDTH * 2;
      }
      var coordsY = movingMapPin.offsetTop - shiftY;
      if (coordsY < Y.MIN) {
        coordsY = Y.MIN;
      } else if (coordsY > Y.MAX) {
        coordsY = Y.MAX;
      }
      movingMapPin.style.left = coordsX + 'px';
      movingMapPin.style.top = coordsY + 'px';
      address.value = coordsX + ', ' + coordsY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (trigger) {
        var onPreventDefaultClick = function (clickEvt) {
          clickEvt.preventDefault();
          movingMapPin.removeEventListener('click', onPreventDefaultClick);
        };
        movingMapPin.addEventListener('click', onPreventDefaultClick);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
