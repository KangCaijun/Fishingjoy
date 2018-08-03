var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 图片集合
 */
var tool;
(function (tool) {
    var ImagePlayer = (function (_super) {
        __extends(ImagePlayer, _super);
        function ImagePlayer(data) {
            var _this = _super.call(this) || this;
            /**
             * key：动画组名字 value：egret.movie
             */
            _this._dataDic = new SimpleMap();
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var img = new CustomImage();
                    img.source = data[i].sourceName;
                    if (data[i].offsetX) {
                        img.x = data[i].offsetX;
                    }
                    if (data[i].offsetY) {
                        img.y = data[i].offsetY;
                    }
                    if (data[i].scaleX) {
                        img.scaleX = data[i].scaleX;
                    }
                    if (data[i].scaleY) {
                        img.scaleY = data[i].scaleY;
                    }
                    _this.addChild(img);
                    _this._dataDic.set(data[i].keyName, img);
                }
            }
            return _this;
        }
        /**
         * 添加图片
         */
        ImagePlayer.prototype.push = function (data) {
            var img = new CustomImage();
            img.source = data.sourceName;
            if (data.offsetX) {
                img.x = data.offsetX;
            }
            if (data.offsetY) {
                img.y = data.offsetY;
            }
            if (data.scaleX) {
                img.scaleX = data.scaleX;
            }
            if (data.scaleY) {
                img.scaleY = data.scaleY;
            }
            this.addChild(img);
            this._dataDic.set(data.keyName, img);
        };
        /**
         * 释放
         */
        ImagePlayer.prototype.dispose = function () {
            this._dataDic.clear();
            this._dataDic = null;
        };
        return ImagePlayer;
    }(egret.DisplayObjectContainer));
    tool.ImagePlayer = ImagePlayer;
    __reflect(ImagePlayer.prototype, "tool.ImagePlayer");
})(tool || (tool = {}));
//# sourceMappingURL=ImagePlayer.js.map