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
 * 游戏中心
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var GameCenter = (function (_super) {
        __extends(GameCenter, _super);
        function GameCenter() {
            var _this = _super.call(this) || this;
            /*数据中心*/
            _this.dataCenter = FishingJoy.DataCenter.instance;
            /*事件收发中心*/
            _this.eventManager = EventManager.instance;
            _this._init();
            _this.addEventListener(egret.Event.ENTER_FRAME, _this._enterFrame, _this);
            GX.PokerEvent.Instance.leaveRoom.add(_this._leaveRoom, _this);
            return _this;
        }
        GameCenter.prototype._init = function () {
            Laya.init();
            this.gameObjectManager = manager.GameObjectManager.instance;
            this.layerManager = manager.LayerManager.instance;
            this.operationManager = manager.OperationManager.instance;
            this.fishingJoyLogic = FishingJoy.FishingJoyLogic.instance;
        };
        Object.defineProperty(GameCenter, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameCenter();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 退出游戏
         */
        GameCenter.prototype._leaveRoom = function () {
            this.dispose();
        };
        /**
        * 帧事件
        */
        GameCenter.prototype._enterFrame = function (e) {
            Laya.timer.update();
        };
        /**
         * 释放
         */
        GameCenter.prototype.dispose = function () {
            game.GameConstant.updataStageSize();
            UICenter.instance.closeAll();
            this.fishingJoyLogic.dispose();
            this.fishingJoyLogic = null;
            this.eventManager.dispose();
            this.eventManager = null;
            this.dataCenter.dispose();
            this.dataCenter = null;
            this.layerManager.dispose();
            this.layerManager = null;
            this.operationManager.dispose();
            this.operationManager = null;
            this.gameObjectManager.dispose();
            this.gameObjectManager = null;
            game.SoundHand.Instance.dispose();
            Pool.clearAll();
            this.removeEventListener(egret.Event.ENTER_FRAME, this._enterFrame, this);
            GX.PokerEvent.Instance.leaveRoom.remove(this._leaveRoom, this);
            RES.destroyRes(game.GameConstant.ResGroup_BY, false);
            uniLib.ResUtils.clearResConfigByGroupName([game.GameConstant.ResGroup_BY]);
            game.PokerFunction.exitGame();
            uniLib.GameModuleUtils.ExitGame(false);
        };
        /*单例*/
        GameCenter._instance = null;
        return GameCenter;
    }(egret.DisplayObject));
    FishingJoy.GameCenter = GameCenter;
    __reflect(GameCenter.prototype, "FishingJoy.GameCenter");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=GameCenter.js.map