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
    /**
     *
     * @author
     *
     */
    var PokerGameScene = (function (_super) {
        __extends(PokerGameScene, _super);
        function PokerGameScene() {
            return _super.call(this) || this;
        }
        PokerGameScene.prototype.start = function () {
            _super.prototype.start.call(this);
            egret.MainContext.instance.stage.setContentSize(1280, 720);
            game.GameInfo.topLayer = this.mainUILayer;
            GX.GameLayerManager.sceneLayer = this.uiLayer;
            GX.GameLayerManager.mainLayer = this.effectLayer;
            GX.GameLayerManager.effectLayer = this.topLayer;
            GX.GameLayerManager.popLayer = this.mainUILayer;
            GX.GameLayerManager.maskLayer = this.maskLayer;
            GX.GameLayerManager.loadLayer = this.tipsLayer;
            game.MahJongFourFacede.getInstance().startUp(this);
            // game.Config.InteractiveSoundName = "zcjb_button_mp3";
        };
        PokerGameScene.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            game.MahJongFourFacede.getInstance().sendNotification(game.MahjongFourFacadeConst.DESTORY);
        };
        /**
         * 初始化位置属性,以做到右对齐
         */
        PokerGameScene.prototype.initPositionData = function () {
            if (game.DataCache.defaultWidth != uniLib.Global.screenWidth) {
                game.DataCache.defaultWidth = uniLib.Global.screenWidth;
                game.DataCache.defaultHeight = uniLib.Global.screenHeight;
            }
        };
        return PokerGameScene;
    }(uniLib.GameScene));
    game.PokerGameScene = PokerGameScene;
    __reflect(PokerGameScene.prototype, "game.PokerGameScene");
})(game || (game = {}));
//# sourceMappingURL=PokerGameScene.js.map