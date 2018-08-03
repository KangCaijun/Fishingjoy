var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 原作者 momo
 * @author suo
 */
var BaseUIControl = (function () {
    function BaseUIControl() {
        this._dataCenter = null;
        this._viewCenter = null;
    }
    BaseUIControl.prototype.init = function (dataCenter, viewCenter) {
        this._dataCenter = dataCenter;
        this._viewCenter = viewCenter;
    };
    BaseUIControl.prototype.onInit = function () {
    };
    BaseUIControl.prototype.onShow = function () {
    };
    BaseUIControl.prototype.onOpenAgain = function () {
    };
    BaseUIControl.prototype.onHide = function () {
    };
    BaseUIControl.prototype.dispose = function () {
        this._viewCenter = null;
        this._dataCenter = null;
    };
    return BaseUIControl;
}());
__reflect(BaseUIControl.prototype, "BaseUIControl");
//# sourceMappingURL=BaseUIControl.js.map