(function (angular, $) {
  'use strict';

  var mod = angular.module('angular-img-cropper', []);

  ////////////////////////////////////////////////////////////////////////////////////////////////

  mod.factory('__extends', function () {

    var __extends = __extends || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      function __() {
        this.constructor = d;
      }

      __.prototype = b.prototype;
      d.prototype = new __();
    };

    return __extends;
  });


  ////////////////////////////////////////////////////////////////////////////////////////////////

  // mod.directive("canvasResponsive", function($window) {
  //   return {
  //     restrict: 'A',
  //     link: function($scope, $element, $attrs) {
        
  //       var canvas = $element.find('canvas')[0];
  //       var element = $element[0];
  //       var ratio = canvas.offsetHeight / canvas.offsetWidth;

  //       function scale() {
  //         canvas.width = element.offsetWidth;
  //         canvas.height = canvas.width * ratio;
  //         console.log(canvas.width);
  //         console.log(canvas.height);
  //       } 

  //       scale();

  //       $(window).bind('resize', function() {
        
  //         scale();


  //       });

  //     }
  //   };
  // });

  ////////////////////////////////////////////////////////////////////////////////////////////////

  mod.directive("imgCropper", function ($document, $window, ImageCropper) {
    return {
      scope: {
        imgSrc: "=",
        imgDst: "=",
        cropWidth: "=",
        cropHeight: "=",
        keepAspect: "=",
        keepAspectRatio: "=",
        touchRadius: "=",
        cropAreaBounds: "=",
        minWidth: "=",
        minHeight: "=",
        enforceCropAspect: "=",
        enforceFileType: "@",
        color: "@",
        colorDrag: "@",
        colorBg: '@',
        colorCropBg: '@'
      },
      restrict: "A",
      link: function (scope, element, attrs) {

        var crop, destroyed = false;
        var canvas = element[0];

        scope.color = scope.color || 'rgba(90,90,90,0.75)';
        scope.colorDrag = scope.colorDrag || 'rgba(0, 0, 0, 0.7)';
        scope.colorBg = scope.colorBg || 'rgba(192,192,192,1)';
        scope.colorCropBg = scope.colorCropBg || 'rgba(0, 0, 0, 0.7)';

        scope.$on('$destroy', function () {
          destroyed = true;
        });

        function setup(newValue, oldValue) {
          if (crop && newValue === oldValue) {
            return;
          }


          var width = scope.cropWidth;
          var height = scope.cropHeight;
          var keepAspect = scope.keepAspect;
          var keepAspectRatio = scope.keepAspectRatio;
          var touchRadius = scope.touchRadius;
          var oldImage = crop && crop.srcImage;

          crop = new ImageCropper(canvas, canvas.width / 2 - width / 2, canvas.height / 2 - height / 2, width, height, keepAspect, keepAspectRatio, touchRadius, scope, attrs);

          $(canvas).data('crop.angular-img-cropper', crop);

          if (oldImage) {
            crop.setImage(oldImage, scope.imgSrc.fileType);
          } else {
            load(scope.imgSrc);
          }
        }

        function load(newValue) {
          if (!newValue) {
            return;
          }

          var imageObj = new Image();

          if (attrs.cors !== undefined && attrs.cors !== "no") {
            imageObj.crossOrigin = "Anonymous";
          }

          imageObj.addEventListener("load", function () {
            crop.setImage(imageObj, newValue.fileType);
            scope.$apply();
          }, false);
          imageObj.src = newValue.imageData;
        }

        scope.$watch('cropWidth', setup);
        scope.$watch('cropHeight', setup);
        scope.$watch('keepAspect', setup);
        scope.$watch('touchRadius', setup);


        scope.$watch('imgSrc', load);

      }
    };
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////

})(angular, angular.element);

