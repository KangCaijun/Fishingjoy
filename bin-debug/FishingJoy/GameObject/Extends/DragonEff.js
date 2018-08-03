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
 * 美人鱼特效
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var DragonEff = (function (_super) {
        __extends(DragonEff, _super);
        function DragonEff() {
            var _this = _super.call(this) || this;
            /**
             * 文本
             */
            _this._txt = new egret.TextField();
            /**
             * 淡灰色底板
             */
            _this._blackBg = new eui.Rect();
            /**
             * 动画完成计数
             */
            _this.tweenCompleteIndex = 0;
            /**
             * 最大属性
             */
            _this.MAX_NUM = 110;
            return _this;
        }
        Object.defineProperty(DragonEff.prototype, "playerNickName", {
            /**
             * 获得玩家昵称
             */
            get: function () {
                return this.varsData.playerNickName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragonEff.prototype, "targetBattery", {
            /**
             * 获得目标炮台
             */
            get: function () {
                return this.varsData.targetBattery;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DragonEff.prototype, "score", {
            /**
             * 获得目标炮台
             */
            get: function () {
                return this.varsData.score;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化一次
         */
        DragonEff.prototype.initOnce = function (initOnce) {
            this._blackBg.fillColor = ColorUtil.COLOR_BLACK;
            this._blackBg.width = uniLib.Global.screenWidth;
            this._blackBg.height = uniLib.Global.screenHeight;
            this._blackBg.x = -uniLib.Global.screenWidth / 2;
            this._blackBg.y = -uniLib.Global.screenHeight / 2 - 50;
            this._blackBg.alpha = 0.4;
            this.addChildAt(this._blackBg, 0);
            this._txt.bold = true;
            this._txt.fontFamily = "SimHei";
            this._txt.size = 35;
            this._txt.y = -250;
            // let blurFliter = new egret.BlurFilter(1, 1);
            if (uniLib.Global.isH5) {
                var glowFilter = new egret.GlowFilter(0xFF7F50, 0.5, 1, 1, 10, 1, true);
                this._txt.filters = [glowFilter];
            }
            else {
                this._txt.textColor = 0xFF7F50;
            }
            this.addChild(this._txt);
            this.touchEnabled = false;
            this.touchChildren = false;
        };
        /**
         * 初始化
         */
        DragonEff.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this._imagePlayer.alpha = 1;
            this._txt.alpha = 0;
            this._imagePlayer.visible = false;
            this._moviePlayer.play("TreasureBox_vanish", 1);
            this._moviePlayer.play("TreasureBox_box", 1, 1000, Handler.create(this, function () { _this._imagePlayer.visible = true; }));
            this._moviePlayer.play("TreasureBox-coin", 1, 1800);
            Laya.timer.once(2800, this, this._effComplete);
            Laya.timer.once(4000, this, this._showCoin);
        };
        /**
         * 特效播放完毕
         */
        DragonEff.prototype._effComplete = function () {
            egret.Tween.get(this._txt).to({ alpha: 1, }, 1000);
            this._txt.text = "恭喜 [" + this.playerNickName + "] 打开金龙的宝藏!";
            this._txt.x = -this._txt.textWidth / 2;
        };
        /**
         * 显示飞金币
         */
        DragonEff.prototype._showCoin = function () {
            /*消失*/
            egret.Tween.get(this._imagePlayer).to({ alpha: 0 }, 1500);
            var _a = UIUtil.localToGlobal(this.targetBattery.coinImg), x = _a[0], y = _a[1];
            game.SoundHand.Instance.playGoldCoinRain();
            for (var i = 0; i <= this.MAX_NUM; i++) {
                Laya.timer.once(MathUtil.random(0, 500), this, this._creatCoin, [i, x, y], false);
            }
        };
        /**
         * 动画飞到指定位置结束
         */
        DragonEff.prototype._tweenComplete = function (coin) {
            coin.stop();
            manager.LayerManager.instance.removeFromLayer(coin, 9 /* EFFECT_BIG */);
            Pool.recover(Pool.flyCoin, coin);
            this.tweenCompleteIndex++;
            if (this.tweenCompleteIndex >= this.MAX_NUM) {
                this.tweenCompleteIndex = 0;
                gameObject.GameObjectFactory.instance.recoverGameObject(this);
                EventManager.fireEvent(16 /* DRA_EFF_COMPLETE */, [coin.x, coin.y, this.score]);
            }
        };
        /**
         * 创建金币
         */
        DragonEff.prototype._creatCoin = function (i, x, y) {
            var coin = Pool.getItemByCreateFun(Pool.flyCoin, Handler.create(this, this._creatCoinMov, null, true));
            coin.alpha = 1;
            coin.gotoAndPlay(1, -1);
            var targetX, targetY;
            if (i <= 1) {
                targetX = 610 + i * 30;
                targetY = 540;
            }
            else if (i >= 1 && i <= 10) {
                targetX = MathUtil.random(500, 720);
                targetY = 500 + MathUtil.random(-10, 10);
            }
            else if (i >= 10 && i <= 25) {
                targetX = MathUtil.random(460, 750);
                targetY = 460 + MathUtil.random(-10, 10);
            }
            else if (i >= 26 && i <= 46) {
                targetX = MathUtil.random(450, 750);
                targetY = 420 + MathUtil.random(-10, 10);
            }
            else if (i >= 47 && i <= 72) {
                targetX = MathUtil.random(450, 760);
                targetY = 380 + MathUtil.random(-10, 10);
            }
            else if (i >= 73 && i <= 86) {
                targetX = MathUtil.random(480, 750);
                targetY = 340 + MathUtil.random(-10, 10);
            }
            else if (i >= 87 && i <= 95) {
                targetX = MathUtil.random(590, 780);
                targetY = 290 + MathUtil.random(-10, 10);
            }
            else if (i >= 96 && i <= 110) {
                targetX = MathUtil.random(600, 725);
                targetY = 250 + MathUtil.random(-10, 10);
            }
            coin.x = targetX;
            coin.y = targetY;
            manager.LayerManager.instance.addToLayer(coin, 9 /* EFFECT_BIG */);
            egret.Tween.get(coin).to({ alpha: 1 }, 500).wait(1500).to({ x: x, y: y }, 500 + i * 10, egret.Ease.quadIn).call(this._tweenComplete, this, [coin]);
        };
        /**
         * 创建金币影片剪辑
         */
        DragonEff.prototype._creatCoinMov = function () {
            var mov = UIUtil.creatMovieClip("coin_fish");
            mov.scaleX = mov.scaleY = 0.4;
            return mov;
        };
        /**
         * 播放完毕
         */
        DragonEff.prototype._onComplete = function () {
            gameObject.GameObjectFactory.instance.recoverGameObject(this);
        };
        /**
         * 反初始化
         */
        DragonEff.prototype.uninitialize = function () {
            this._txt.text = "";
            this._moviePlayer.stopAll();
            _super.prototype.uninitialize.call(this);
        };
        /**
         * 释放
         */
        DragonEff.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return DragonEff;
    }(gameObject.GameObjectRender));
    gameObject.DragonEff = DragonEff;
    __reflect(DragonEff.prototype, "gameObject.DragonEff");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=DragonEff.js.map