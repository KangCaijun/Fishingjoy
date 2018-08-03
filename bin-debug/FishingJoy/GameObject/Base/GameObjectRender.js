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
 * 游戏物体渲染对象
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var GameObjectRender = (function (_super) {
        __extends(GameObjectRender, _super);
        function GameObjectRender() {
            var _this = _super.call(this) || this;
            /**
             * 渲染对象
             */
            _this._imagePlayer = null;
            /**
             * 渲染对象
             */
            _this._moviePlayer = null;
            /**
             * 是否在视图内
             */
            _this.isInView = false;
            return _this;
        }
        /**
         * 加载资源
         */
        GameObjectRender.prototype.loadAsset = function (assetData) {
            var imageAry = assetData.imageAry;
            if (imageAry) {
                this._imagePlayer = new tool.ImagePlayer();
                for (var i = 0; i < imageAry.length; i++) {
                    this._imagePlayer.push(imageAry[i]);
                }
                this.addChild(this._imagePlayer);
            }
            var movieClipAry = assetData.movieClipAry;
            if (movieClipAry) {
                this._moviePlayer = new tool.MoviePlayer();
                for (var i = 0; i < movieClipAry.length; i++) {
                    this._moviePlayer.push(movieClipAry[i]);
                }
                this.addChild(this._moviePlayer);
            }
        };
        /**
         * 初始化一次
         */
        GameObjectRender.prototype.initOnce = function (initOnce) {
        };
        /**
         * 初始化
         */
        GameObjectRender.prototype.initialize = function () {
            if (this.varsData.bornX) {
                this.x = this.varsData.bornX;
            }
            else {
                this.x = -1000;
            }
            if (this.varsData.bornY) {
                this.y = this.varsData.bornY;
            }
            else {
                this.y = -1000;
            }
            if (this.varsData.rotation) {
                this.rotation = this.varsData.rotation;
            }
            manager.LayerManager.instance.addToLayer(this, this.layerType);
            this.isInView = true;
        };
        /**
         * 反初始化
         */
        GameObjectRender.prototype.uninitialize = function () {
            if (this._moviePlayer) {
                this._moviePlayer.stop();
            }
            manager.LayerManager.instance.removeFromLayer(this);
            this.isInView = false;
        };
        /**
         * 释放
         */
        GameObjectRender.prototype.dispose = function () {
            if (this._moviePlayer) {
                this._moviePlayer.dispose();
                this._moviePlayer = null;
            }
            if (this._imagePlayer) {
                this._imagePlayer.dispose();
                this._imagePlayer = null;
            }
            _super.prototype.dispose.call(this);
        };
        return GameObjectRender;
    }(gameObject.GameObject));
    gameObject.GameObjectRender = GameObjectRender;
    __reflect(GameObjectRender.prototype, "gameObject.GameObjectRender");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectRender.js.map