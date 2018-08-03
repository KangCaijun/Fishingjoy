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
 * 原作者 momo
 * @author suo
 */
var UICenter = (function (_super) {
    __extends(UICenter, _super);
    function UICenter() {
        var _this = _super.call(this) || this;
        _this.addManager(1000 /* FishMainScene */, FishingJoy.FishMainSceneManager);
        _this.addManager(1001 /* FishHelp */, FishingJoy.FishHelpManager);
        return _this;
        // this.addManager(commonUI.PlayerList,FishingJoy.PlayerListManager);
        // this.addManager(commonUI.FAQ,FishingJoy.FAQManager);
        // this.addManager(commonUI.GainResult,FishingJoy.GainResultManager);
        // this.addManager(commonUI.SurePanel,FishingJoy.SurePanelManager);
        // this.addManager(commonUI.Settle,FishingJoy.SettleManager);
        // this.addManager(commonUI.BtnLayer,FishingJoy.BtnLayarManager);
        // this.addManager(commonUI.MasterInfo,FishingJoy.MasterInfoManager);
    }
    Object.defineProperty(UICenter, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new UICenter();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UICenter._instance = null;
    return UICenter;
}(BaseUICenter));
__reflect(UICenter.prototype, "UICenter");
//# sourceMappingURL=UICenter.js.map