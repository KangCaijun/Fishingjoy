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
 * 帮助面板视图
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishHelpView = (function (_super) {
        __extends(FishHelpView, _super);
        function FishHelpView() {
            var _this = _super.call(this, true) || this;
            _this.skinName = "FishHelpSkin";
            return _this;
        }
        /**
         * 初始化
         */
        FishHelpView.prototype.onInit = function () {
            this.closeBtn = new tool.Button(this.skin["closeBtn"]);
            GX.GameLayerManager.addUIToMain(this);
        };
        /**
         * 展示时
         */
        FishHelpView.prototype.onShow = function () {
        };
        /**
         * 清除
         */
        FishHelpView.prototype.clear = function () {
        };
        /**
         * 隐藏时
         */
        FishHelpView.prototype.onHide = function () {
            this.closeBtn.dispose();
            this.closeBtn = null;
        };
        /**
         * 释放时
         */
        FishHelpView.prototype.dispose = function () {
            GX.GameLayerManager.removeUI(this);
            _super.prototype.dispose.call(this);
        };
        return FishHelpView;
    }(FishingJoy.BasePopPanel));
    FishingJoy.FishHelpView = FishHelpView;
    __reflect(FishHelpView.prototype, "FishingJoy.FishHelpView", ["BaseUIView"]);
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishHelpView.js.map