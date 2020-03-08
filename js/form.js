'use strict';

(function () {
  var ROOM_MAX = '100';
  var CAPACITY_MIN = '0';
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var adForm = document.querySelector('.ad-form');
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

  var onSetupSubmitEnterKeydown = function (evt, form) {
    if (evt.key === window.tools.Key.ENTER) {
      submitSetup(evt, form);
    }
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

  var checkTimeValidation = function () {
    timeOut.value = timeIn.value;
  };

  checkCapacityValidation();
  checkPriceValidation();
  checkTimeValidation();

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (adFormSubmit.checkValidity()) {
      submitSetup(adForm);
    }
    adForm.reportValidity();
  });

  adFormSubmit.addEventListener('keydown', function (evt) {
    if (adFormSubmit.checkValidity()) {
      onSetupSubmitEnterKeydown(evt, adFormSubmit);
    }
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
    checkTimeValidation();
  });

  roomNumber.addEventListener('change', function () {
    checkCapacityValidation();
  });
})();
