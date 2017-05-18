
(function (angular, $, mod) {
  'use strict';

  mod.factory('CornerMarker', function(Handle, __extends) {
     var CornerMarker = (function (_super) {
          __extends(CornerMarker, _super);
          function CornerMarker(x, y, radius, color, colorCropBg) {
            _super.call(this, x, y, radius);
            this.color = color | 'rgba(90,90,90,0.75)';
            this.colorCropBg = colorCropBg | 'rgba(0,0,0,1)';
          }

          CornerMarker.prototype.drawCornerBorder = function (ctx) {
            var sideLength = 10;
            if (this.over || this.drag) {
              sideLength = 12;
            }
            var hDirection = 1;
            var vDirection = 1;
            if (this.horizontalNeighbour.position.x < this.position.x) {
              hDirection = -1;
            }
            if (this.verticalNeighbour.position.y < this.position.y) {
              vDirection = -1;
            }
            ctx.beginPath();
            ctx.lineJoin = "miter";
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y);
            ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y + (sideLength * vDirection));
            ctx.lineTo(this.position.x, this.position.y + (sideLength * vDirection));
            ctx.lineTo(this.position.x, this.position.y);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.color;
            ctx.stroke();
          };
          CornerMarker.prototype.drawCornerFill = function (ctx) {
            var sideLength = 10;
            if (this.over || this.drag) {
              sideLength = 12;
            }
            var hDirection = 1;
            var vDirection = 1;
            if (this.horizontalNeighbour.position.x < this.position.x) {
              hDirection = -1;
            }
            if (this.verticalNeighbour.position.y < this.position.y) {
              vDirection = -1;
            }
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y);
            ctx.lineTo(this.position.x + (sideLength * hDirection), this.position.y + (sideLength * vDirection));
            ctx.lineTo(this.position.x, this.position.y + (sideLength * vDirection));
            ctx.lineTo(this.position.x, this.position.y);
            ctx.closePath();
            ctx.fillStyle = this.colorCropBg;
            ctx.fill();
          };
          CornerMarker.prototype.moveX = function (x) {
            this.setPosition(x, this.position.y);
          };
          CornerMarker.prototype.moveY = function (y) {
            this.setPosition(this.position.x, y);
          };
          CornerMarker.prototype.move = function (x, y) {
            this.setPosition(x, y);
            this.verticalNeighbour.moveX(x);
            this.horizontalNeighbour.moveY(y);
          };
          CornerMarker.prototype.addHorizontalNeighbour = function (neighbour) {
            this.horizontalNeighbour = neighbour;
          };
          CornerMarker.prototype.addVerticalNeighbour = function (neighbour) {
            this.verticalNeighbour = neighbour;
          };
          CornerMarker.prototype.getHorizontalNeighbour = function () {
            return this.horizontalNeighbour;
          };
          CornerMarker.prototype.getVerticalNeighbour = function () {
            return this.verticalNeighbour;
          };
          CornerMarker.prototype.draw = function (ctx) {
            this.drawCornerFill(ctx);
            this.drawCornerBorder(ctx);
          };
          return CornerMarker;
        })(Handle);

        return CornerMarker;
  });

})(angular, angular.element, angular.module('angular-img-cropper'));
