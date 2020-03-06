'use strict';

(function () {
  var chooseRandomInt = function (min, max) {
    var random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };

  window.tools = {
    chooseRandomInt: chooseRandomInt
  };
})();
