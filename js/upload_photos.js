'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var adFormAvatarImg = document.querySelector('.ad-form-header__preview-img');
  var adFormAvatarInput = document.querySelector('#avatar');
  var adFormHouseImagesInput = document.querySelector('#images');
  var adFormHouseImage = document.querySelector('.ad-form__photo');

  var uploadImage = function (input, img) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  adFormAvatarInput.addEventListener('change', function () {
    uploadImage(adFormAvatarInput, adFormAvatarImg);
  });

  adFormHouseImagesInput.addEventListener('change', function () {
    var newImg = document.createElement('img');
    newImg.classList.add('ad-form__photo-img');
    uploadImage(adFormHouseImagesInput, newImg);
    adFormHouseImage.appendChild(newImg);
  });
})();
