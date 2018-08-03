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
 * 爆炸
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var Burst = (function (_super) {
        __extends(Burst, _super);
        function Burst() {
            return _super.call(this) || this;
        }
        /**
         * 初始化一次
         */
        Burst.prototype.initOnce = function (data) {
            _super.prototype.initOnce.call(this, data);
        };
        /**
         * 初始化
         */
        Burst.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._moviePlayer.switchAniPlayOnce("idle", Handler.create(this, this._onComplete));
        };
        /**
         * 播放完毕
         */
        Burst.prototype._onComplete = function () {
            gameObject.GameObjectFactory.instance.recoverGameObject(this);
        };
        /**
         * 反初始化
         */
        Burst.prototype.uninitialize = function () {
            _super.prototype.uninitialize.call(this);
        };
        /**
         * 释放
         */
        Burst.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        /**
         * 获取屏幕坐标
         */
        Burst.prototype.getGrid = function () {
            return this.grid[0];
        };
        return Burst;
    }(gameObject.GameObjectCollider));
    gameObject.Burst = Burst;
    __reflect(Burst.prototype, "gameObject.Burst");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Burst.js.map