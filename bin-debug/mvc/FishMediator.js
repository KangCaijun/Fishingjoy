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
var game;
(function (game) {
    var FishMediator = (function (_super) {
        __extends(FishMediator, _super);
        function FishMediator(viewComponent) {
            var _this = _super.call(this, FishMediator.NAME, viewComponent) || this;
            // egret.Logger.logLevel = egret.Logger.OFF
            FishingJoy.GameCenter.instance;
            UICenter.instance.openUI(1000 /* FishMainScene */);
            // GX.GameLayerManager.addUIToScene(GameView.Instance);
            _this.initGame();
            return _this;
        }
        FishMediator.prototype.uiHandle = function (evt) {
        };
        FishMediator.prototype.listNotificationInterests = function () {
            return [
                game.MahjongFourFacadeConst.NOTIFY_COMMON_CHAT,
            ];
        };
        FishMediator.prototype.handleNotification = function (notification) {
        };
        FishMediator.prototype.initGame = function () {
            this.facade.sendNotification(game.MahjongFourFacadeConst.SEND_DATA, null, game.DataRequestCommand.CONNECT_GAME_SERVER);
        };
        FishMediator.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
        };
        FishMediator.NAME = "FishMediator";
        return FishMediator;
    }(puremvc.Mediator));
    game.FishMediator = FishMediator;
    __reflect(FishMediator.prototype, "game.FishMediator");
})(game || (game = {}));
//# sourceMappingURL=FishMediator.js.map