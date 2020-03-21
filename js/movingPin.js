'use strict';

(function () {
  var Y = {
    MIN: 130,
    MAX: 630
  };
  var MapPinStartCoord = {
    LEFT: 570 + 'px',
    TOP: 375 + 'px'
  };
  var pinSize = {
    HALF_WIDTH: 65 / 2,
    HEIGHT: 65,
    HALF_HEIGHT: 65 / 2
  };
  var movingMapPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var moveMainPinOnCenter = function () {
    movingMapPin.style.left = MapPinStartCoord.LEFT;
    movingMapPin.style.top = MapPinStartCoord.TOP;
  };

  var showCurrentAddress = function () {
    address.value = movingMapPin.offsetLeft + ', ' + movingMapPin.offsetTop;
  };

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
      if (coordsX < -pinSize.HALF_WIDTH) {
        coordsX = -pinSize.HALF_WIDTH;
      } else if (coordsX > window.map.pins.clientWidth - pinSize.HALF_WIDTH) {
        coordsX = window.map.pins.clientWidth - pinSize.HALF_WIDTH;
      }
      var coordsY = movingMapPin.offsetTop - shiftY;
      if (coordsY < Y.MIN) {
        coordsY = Y.MIN;
      } else if (coordsY > Y.MAX) {
        coordsY = Y.MAX;
      }
      movingMapPin.style.left = coordsX + 'px';
      movingMapPin.style.top = coordsY + 'px';
      address.value = parseInt(coordsX + pinSize.HALF_WIDTH, 10) + ', ' + parseInt(coordsY + pinSize.HEIGHT, 10);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (trigger) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          movingMapPin.removeEventListener('click', onClickPreventDefault);
        };
        movingMapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.movingPin = {
    showCurrentAddress: showCurrentAddress,
    moveOnCenter: moveMainPinOnCenter,
    size: pinSize
  };
})();
