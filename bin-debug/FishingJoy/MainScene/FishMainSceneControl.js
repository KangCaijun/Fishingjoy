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
 * 主场景控制
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishMainSceneControl = (function (_super) {
        __extends(FishMainSceneControl, _super);
        function FishMainSceneControl() {
            return _super.call(this) || this;
        }
        /**
         * 初始化
         */
        FishMainSceneControl.prototype.onInit = function () {
            this._mainView = this._viewCenter.getView(FishingJoy.FishMainSceneView);
            this._seatView = this._viewCenter.getView(FishingJoy.SeatView);
            this._mainView.addChild(this._seatView);
        };
        /**
         * 显示时
         */
        FishMainSceneControl.prototype.onShow = function () {
            FishingJoy.FishingJoyLogic.instance.initFishingJoyLogic();
        };
        /**
         * 释放
         */
        FishMainSceneControl.prototype.dispose = function () {
            this._seatView = null;
            this._mainView = null;
            _super.prototype.dispose.call(this);
        };
        return FishMainSceneControl;
    }(BaseUIControl));
    FishingJoy.FishMainSceneControl = FishMainSceneControl;
    __reflect(FishMainSceneControl.prototype, "FishingJoy.FishMainSceneControl");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishMainSceneControl.js.map