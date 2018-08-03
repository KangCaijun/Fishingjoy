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
 * 游戏对象基类
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject() {
            var _this = _super.call(this) || this;
            /**
             * uid
             */
            _this.uID = NaN;
            /**
             * 携带参数
             */
            _this.varsData = null;
            /**
             * 是否可以被释放
             */
            _this.canDispose = false;
            /**
             * 引用计数
             */
            _this.refCount = 0;
            return _this;
        }
        /**
         * 设置数据
         */
        GameObject.prototype.setData = function (sign, uID, varsData, layerType) {
            if (layerType === void 0) { layerType = 2 /* Fish */; }
            this.sign = sign;
            this.uID = uID;
            this.varsData = varsData;
            this.layerType = layerType;
        };
        /**
         * 释放
         */
        GameObject.prototype.dispose = function () {
            this.uID = NaN;
            this.varsData = null;
            this.refCount = 0;
        };
        return GameObject;
    }(egret.DisplayObjectContainer));
    gameObject.GameObject = GameObject;
    __reflect(GameObject.prototype, "gameObject.GameObject");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObject.js.map