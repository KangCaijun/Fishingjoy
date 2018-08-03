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
 * 特殊鱼
 */
var gameObject;
(function (gameObject) {
    var SpecialFish = (function (_super) {
        __extends(SpecialFish, _super);
        function SpecialFish() {
            return _super.call(this) || this;
        }
        /**
         * 初始化
         */
        SpecialFish.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        /**
         * 反初始化
         */
        SpecialFish.prototype.uninitialize = function () {
            _super.prototype.uninitialize.call(this);
        };
        /**
         * 释放
         */
        SpecialFish.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return SpecialFish;
    }(gameObject.Fish));
    gameObject.SpecialFish = SpecialFish;
    __reflect(SpecialFish.prototype, "gameObject.SpecialFish");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=SpecialFish.js.map