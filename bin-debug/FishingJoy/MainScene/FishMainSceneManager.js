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
 * 主场景管理器
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishMainSceneManager = (function (_super) {
        __extends(FishMainSceneManager, _super);
        function FishMainSceneManager() {
            var _this = _super.call(this) || this;
            _this.addView(FishingJoy.FishMainSceneView);
            _this.addControl(FishingJoy.FishMainSceneControl);
            _this.addView(FishingJoy.SeatView);
            _this.addView(FishingJoy.FishBtnView);
            _this.addControl(FishingJoy.FishBtnControl);
            return _this;
        }
        return FishMainSceneManager;
    }(BaseUIManager));
    FishingJoy.FishMainSceneManager = FishMainSceneManager;
    __reflect(FishMainSceneManager.prototype, "FishingJoy.FishMainSceneManager");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishMainSceneManager.js.map