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
 * 渔网
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var FishingNet = (function (_super) {
        __extends(FishingNet, _super);
        function FishingNet() {
            return _super.call(this) || this;
        }
        Object.defineProperty(FishingNet.prototype, "radius", {
            /**
             * 渔网半径
             */
            get: function () {
                return this.varsData.radius;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化一次
         */
        FishingNet.prototype.initOnce = function (initOnce) {
            this.netNum = initOnce.netNum;
            this.colliderData = initOnce.colliderAry;
        };
        /**
         * 初始化
         */
        FishingNet.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._moviePlayer.alpha = 0.8;
            /*美术资源的渔网半径大致为115*/
            var scale = this.radius / 115;
            for (var i = 0; i < this.netNum; i++) {
                var collider = FishingJoy.Collider.creat(this.colliderData[i].posX * scale, this.colliderData[i].posY * scale, this.radius);
                collider.setParent(this);
                this.colliderAry.push(collider);
            }
            this._moviePlayer.scaleX = this._moviePlayer.scaleY = scale;
            this.canDispose = false;
            this._moviePlayer.playOnceAll(Handler.create(this, this._onComplete));
            // Laya.timer.once(500, this, this._startAlpha);
        };
        /**
         * 开始淡出
        //  */
        // private _startAlpha(): void {
        // 	egret.Tween.get(this._moviePlayer).to({ alpha: 0 }, 400).call(this._onComplete, this)
        // }
        /**
         * 播放完毕
         */
        FishingNet.prototype._onComplete = function () {
            this.canDispose = true;
            gameObject.GameObjectFactory.instance.recoverGameObject(this);
        };
        /**
         * 反初始化
         */
        FishingNet.prototype.uninitialize = function () {
            for (var i = 0; i < this.colliderAry.length; i++) {
                this.colliderAry[i].recover();
            }
            this.colliderAry.length = 0;
            _super.prototype.uninitialize.call(this);
        };
        /**
         * 释放
         */
        FishingNet.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return FishingNet;
    }(gameObject.GameObjectCollider));
    gameObject.FishingNet = FishingNet;
    __reflect(FishingNet.prototype, "gameObject.FishingNet");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=FishingNet.js.map