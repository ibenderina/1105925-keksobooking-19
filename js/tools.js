'use strict';

(function () {
  var Key = {
    ENTER: 'Enter',
    ESC: 'Escape',
    LEFT_MOUSE: 0
  };
  var HIDDEN_CLASS = 'hidden';
  var DEBOUNCE_INTERVAL = 500; // ms

  var closeWindow = function (element) {
    if (element) {
      element.classList.add(HIDDEN_CLASS);
    }
  };

  var getTemplate = function (selector) {
    var template = document.querySelector(selector);

    if (template) {
      return template.content.children[0];
    }
    return null;
  };

  var debounce = function (callback, debounceInterval) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, debounceInterval | DEBOUNCE_INTERVAL);
    };
  };

  window.tools = {
    closeWindow: closeWindow,
    getTemplate: getTemplate,
    Key: Key,
    debounce: debounce
  };
})();
