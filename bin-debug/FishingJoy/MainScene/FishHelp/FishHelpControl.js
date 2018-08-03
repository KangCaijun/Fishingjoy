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
 * 帮助面板控制
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishHelpControl = (function (_super) {
        __extends(FishHelpControl, _super);
        function FishHelpControl() {
            return _super.call(this) || this;
        }
        /**
         * 初始化
         */
        FishHelpControl.prototype.onInit = function () {
            this._view = this._viewCenter.getView(FishingJoy.FishHelpView);
            this._view.blackBgHandler = Handler.create(this, this._onClose, null, true);
        };
        /**
         * 显示时
         */
        FishHelpControl.prototype.onShow = function () {
            this._view.closeBtn.mouseClickHandler = Handler.create(this, this._onClose, null, true);
        };
        /**
         * 关闭
         */
        FishHelpControl.prototype._onClose = function () {
            this._view.showCloseEff(Handler.create(UICenter.instance, UICenter.instance.closeUI, [1001 /* FishHelp */], true));
        };
        /**
         * 释放
         */
        FishHelpControl.prototype.dispose = function () {
            this._view = null;
            _super.prototype.dispose.call(this);
        };
        return FishHelpControl;
    }(BaseUIControl));
    FishingJoy.FishHelpControl = FishHelpControl;
    __reflect(FishHelpControl.prototype, "FishingJoy.FishHelpControl");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishHelpControl.js.map