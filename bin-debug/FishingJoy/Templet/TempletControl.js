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
 * 控制器模板
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var TempletControl = (function (_super) {
        __extends(TempletControl, _super);
        function TempletControl() {
            return _super.call(this) || this;
        }
        /**
         * 初始化
         */
        TempletControl.prototype.onInit = function () {
            this._view = this._viewCenter.getView("");
        };
        /**
         * 显示时
         */
        TempletControl.prototype.onShow = function () {
        };
        /**
         * 释放
         */
        TempletControl.prototype.dispose = function () {
            this._view = null;
            _super.prototype.dispose.call(this);
        };
        return TempletControl;
    }(BaseUIControl));
    FishingJoy.TempletControl = TempletControl;
    __reflect(TempletControl.prototype, "FishingJoy.TempletControl");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=TempletControl.js.map