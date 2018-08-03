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
 * 帮助面板管理器
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishHelpManager = (function (_super) {
        __extends(FishHelpManager, _super);
        function FishHelpManager() {
            var _this = _super.call(this) || this;
            _this.addControl(FishingJoy.FishHelpControl);
            _this.addView(FishingJoy.FishHelpView);
            return _this;
        }
        return FishHelpManager;
    }(BaseUIManager));
    FishingJoy.FishHelpManager = FishHelpManager;
    __reflect(FishHelpManager.prototype, "FishingJoy.FishHelpManager");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishHelpManager.js.map