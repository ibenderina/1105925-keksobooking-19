'use strict';

(function () {
  var titleInput = document.querySelector('#title');
  var priceInput = document.querySelector('#price');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var adForm = document.querySelector('.ad-form');
  var housingFilter = document.querySelector('#type');

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
    priceInput.placeholder = housingTypes[housingFilter.value].placeholder;
    priceInput.min = housingTypes[housingFilter.value].min;
  });
})();
