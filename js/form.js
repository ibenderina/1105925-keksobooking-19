'use strict';

(function () {
  var ROOM_MAX = '100';
  var CAPACITY_MIN = '0';
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = document.querySelector('.ad-form__reset');
  var housingFilter = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var optionCapacity = capacity.querySelectorAll('option');
  var housingTypes = {
    'palace': {
      min: 10000,
      placeholder: '10000'
    },
    'flat': {
      min: 1000,
      placeholder: '1000'
    },
    'house': {
      min: 5000,
      placeholder: '5000'
    },
    'bungalo': {
      min: 0,
      placeholder: '0'
    },
  };

  var checkCapacityValidation = function () {
    capacity.value = roomNumber.value;
    optionCapacity.forEach(function (option) {
      option.disabled = false;
    });
    if (roomNumber.value === ROOM_MAX) {
      capacity.value = CAPACITY_MIN;
      optionCapacity.forEach(function (element) {
        if (element.value > 0) {
          element.disabled = true;
        }
      });
    } else {
      optionCapacity.forEach(function (item) {
        if (item.value === CAPACITY_MIN) {
          item.disabled = true;
        } else if (item.value > roomNumber.value) {
          item.disabled = true;
        }
      });
    }
  };

  var checkPriceValidation = function () {
    priceInput.placeholder = housingTypes[housingFilter.value].placeholder;
    priceInput.min = housingTypes[housingFilter.value].min;
  };

  var checkOutTimeValidation = function () {
    timeOut.value = timeIn.value;
  };

  var checkInTimeValidation = function () {
    timeIn.value = timeOut.value;
  };

  var resetForm = function () {
    window.resetPhotos();
    window.removeAllPins();
    window.movingPin.moveOnCenter();
    checkCapacityValidation();
    window.map.deactivatePage();
    adForm.reset();
    window.movingPin.showCurrentAddress();
  };

  var onAfterUploadMessage = function (messageType) {
    var errorTemplate = window.tools.getTemplate('#' + messageType).cloneNode(true);
    var main = document.querySelector('main');

    main.appendChild(errorTemplate);
    window.addEventListener('keydown', function (evt) {
      if (evt.key === window.tools.Key.ESC) {
        errorTemplate.remove();
      }
    });
    errorTemplate.addEventListener('click', function () {
      errorTemplate.remove();
    });
  };

  var onAdLoadError = function () {
    onAfterUploadMessage('error');
  };

  var onAdLoadSuccess = function () {
    resetForm();
    onAfterUploadMessage('success');
  };

  var submitSetup = function (form) {
    var data = new FormData(form);
    window.backend.save(data, function () {
      onAdLoadSuccess();
    }, function () {
      onAdLoadError();
    });
  };

  checkCapacityValidation();
  checkPriceValidation();
  checkOutTimeValidation();

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (adFormSubmit.checkValidity()) {
      submitSetup(adForm);
    }
    adForm.reportValidity();
  });

  titleInput.addEventListener('keydown', function (evt) {
    if (evt.key === window.tools.Key.ESC) {
      evt.stopPropagation();
    }
  });

  housingFilter.addEventListener('change', function () {
    checkPriceValidation();
  });

  timeIn.addEventListener('change', function () {
    checkOutTimeValidation();
  });

  timeOut.addEventListener('change', function () {
    checkInTimeValidation();
  });

  roomNumber.addEventListener('change', function () {
    checkCapacityValidation();
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  adFormReset.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.key === window.tools.Key.ENTER) {
      resetForm();
    }
  });

  window.form = {
    onAdLoadError: onAdLoadError,
    checkCapacityValidation: checkCapacityValidation
  };
})();
