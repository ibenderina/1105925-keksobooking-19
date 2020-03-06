'use strict';

(function () {
  var TIMEOUT = 10000;
  var TIME_LIMIT = 'мс';
  var STATUS_ANSWER = 'Статус ответа: ';
  var SUCCESS_LOAD_STATUS = 200;
  var Error = {
    CONNECT: 'Произошла ошибка соединения',
    TIME_LIMIT: 'Запрос не успел выполниться за '
  };
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SAVE: 'https://js.dump.academy/keksobooking'
  };

  var request = function (URL, method, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_LOAD_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(STATUS_ANSWER + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(Error.CONNECT);
    });
    xhr.addEventListener('timeout', function () {
      onError(Error.TIME_LIMIT + xhr.timeout + TIME_LIMIT);
    });

    xhr.timeout = TIMEOUT; // 10s

    xhr.open(method, URL);
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = request(Url.LOAD, 'GET', onLoad, onError);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = request(Url.SAVE, 'POST', onLoad, onError);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
