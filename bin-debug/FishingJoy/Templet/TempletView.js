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
 * 视图模板
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var TempletView = (function (_super) {
        __extends(TempletView, _super);
        function TempletView() {
            var _this = _super.call(this) || this;
            _this.skinName = "";
            return _this;
        }
        /**
         * 初始化
         */
        TempletView.prototype.onInit = function () {
            GX.GameLayerManager.addUIToMain(this);
        };
        /**
         * 展示时
         */
        TempletView.prototype.onShow = function () {
        };
        /**
         * 清除
         */
        TempletView.prototype.clear = function () {
        };
        /**
         * 隐藏时
         */
        TempletView.prototype.onHide = function () {
        };
        /**
         * 释放时
         */
        TempletView.prototype.dispose = function () {
            GX.GameLayerManager.removeUI(this);
            _super.prototype.dispose.call(this);
        };
        return TempletView;
    }(FishingJoy.BasePopPanel));
    FishingJoy.TempletView = TempletView;
    __reflect(TempletView.prototype, "FishingJoy.TempletView", ["BaseUIView"]);
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=TempletView.js.map