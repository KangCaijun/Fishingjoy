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
    var MermaidEff = (function (_super) {
        __extends(MermaidEff, _super);
        function MermaidEff() {
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
            _this.MAX_NUM = 60;
            return _this;
        }
        Object.defineProperty(MermaidEff.prototype, "playerNickName", {
            /**
             * 获得玩家昵称
             */
            get: function () {
                return this.varsData.playerNickName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MermaidEff.prototype, "targetBattery", {
            /**
             * 获得目标炮台
             */
            get: function () {
                return this.varsData.targetBattery;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MermaidEff.prototype, "score", {
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
        MermaidEff.prototype.initOnce = function (initOnce) {
            this._blackBg.fillColor = ColorUtil.COLOR_BLACK;
            this._blackBg.width = uniLib.Global.screenWidth;
            this._blackBg.height = uniLib.Global.screenHeight;
            this._blackBg.x = -uniLib.Global.screenWidth / 2;
            this._blackBg.y = -uniLib.Global.screenHeight / 2 - 50;
            this._blackBg.alpha = 0.4;
            this.addChildAt(this._blackBg, 0);
            this._txt.bold = true;
            this._txt.size = 35;
            this._txt.y = -250;
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
        MermaidEff.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this._txt.alpha = 0;
            this._moviePlayer.alpha = 1;
            var cloudLeft = this._moviePlayer.getMovieClipByKey("cloud_left");
            cloudLeft.x = -650;
            cloudLeft.alpha = 0;
            var cloudRight = this._moviePlayer.getMovieClipByKey("cloud_right");
            cloudRight.x = 650;
            cloudRight.alpha = 0;
            var mer = this._moviePlayer.getMovieClipByKey("MR_Xiaoshi");
            mer.alpha = 0;
            egret.Tween.get(cloudLeft).to({ x: -250, alpha: 1 }, 800);
            egret.Tween.get(cloudRight).to({ x: 250, alpha: 1 }, 800);
            this._moviePlayer.play("cloud_left", -1);
            this._moviePlayer.play("cloud_right", -1);
            this._moviePlayer.play("Rainbow_start", 1, 1800);
            this._moviePlayer.play("Rainbow_loop", -1, 2300);
            this._moviePlayer.play("Rainbow_coin", -1, 2300);
            Laya.timer.once(500, this, function () {
                egret.Tween.get(mer).to({ alpha: 1 }, 500);
                _this._moviePlayer.play("MR_Xiaoshi", 1);
            });
            Laya.timer.once(3800, this, this._effComplete);
            Laya.timer.once(4600, this, function () { egret.Tween.get(_this._moviePlayer).to({ alpha: 0 }, 500); });
            Laya.timer.once(4000, this, this._showCoin);
        };
        /**
         * 特效播放完毕
         */
        MermaidEff.prototype._effComplete = function () {
            egret.Tween.get(this._txt).to({ alpha: 1, }, 1000);
            this._txt.text = "恭喜 [" + this.playerNickName + "] 获得美人鱼的祝福!";
            this._txt.x = -this._txt.textWidth / 2;
        };
        /**
         * 显示飞金币
         */
        MermaidEff.prototype._showCoin = function () {
            /*消失*/
            var _a = UIUtil.localToGlobal(this.targetBattery.coinImg), x = _a[0], y = _a[1];
            game.SoundHand.Instance.playGoldCoinRain();
            for (var i = 0; i < this.MAX_NUM; i++) {
                Laya.timer.once(MathUtil.random(0, 500), this, this._creatCoin, [i, x, y], false);
            }
        };
        /**
         * 动画飞到指定位置结束
         */
        MermaidEff.prototype._tweenComplete = function (coin) {
            coin.stop();
            manager.LayerManager.instance.removeFromLayer(coin, 9 /* EFFECT_BIG */);
            Pool.recover(Pool.flyCoin, coin);
            this.tweenCompleteIndex++;
            if (this.tweenCompleteIndex >= this.MAX_NUM) {
                this.tweenCompleteIndex = 0;
                gameObject.GameObjectFactory.instance.recoverGameObject(this);
                EventManager.fireEvent(15 /* MER_EFF_COMPLETE */, [coin.x, coin.y, this.score]);
            }
        };
        /**
         * 创建金币
         */
        MermaidEff.prototype._creatCoin = function (i, x, y) {
            var coin = Pool.getItemByCreateFun(Pool.flyCoin, Handler.create(this, this._creatCoinMov, null, true));
            coin.alpha = 0;
            coin.gotoAndPlay(1, -1);
            var targetX, targetY;
            if (i <= 4) {
                targetX = MathUtil.random(-250, -200);
                targetY = 50 + MathUtil.random(-10, 10);
            }
            else if (i >= 5 && i <= 12) {
                targetX = MathUtil.random(-250, -150);
                targetY = 0 + MathUtil.random(-10, 10);
            }
            else if (i >= 13 && i <= 18) {
                targetX = MathUtil.random(-210, -110);
                targetY = -50 + MathUtil.random(-10, 10);
            }
            else if (i >= 19 && i <= 40) {
                targetX = MathUtil.random(-160, 140);
                targetY = -100 + MathUtil.random(-10, 10);
            }
            else if (i >= 41 && i <= 48) {
                targetX = MathUtil.random(-80, -80 + 150);
                targetY = -150 + MathUtil.random(-10, 10);
            }
            else if (i >= 49 && i <= 58) {
                targetX = MathUtil.random(160, 210);
                targetY = -50 + MathUtil.random(-10, 10);
            }
            else if (i >= 59) {
                targetX = 220;
                targetY = 0 + MathUtil.random(-10, 10);
            }
            coin.x = targetX + this.x;
            coin.y = targetY + this.y;
            manager.LayerManager.instance.addToLayer(coin, 9 /* EFFECT_BIG */);
            egret.Tween.get(coin).to({ alpha: 1 }, 1500).wait(500).to({ x: x, y: y }, 500 + i * 10, egret.Ease.quadIn).call(this._tweenComplete, this, [coin]);
        };
        /**
         * 创建金币影片剪辑
         */
        MermaidEff.prototype._creatCoinMov = function () {
            var mov = UIUtil.creatMovieClip("coin_fish");
            mov.scaleX = mov.scaleY = 0.4;
            return mov;
        };
        /**
         * 播放完毕
         */
        MermaidEff.prototype._onComplete = function () {
            gameObject.GameObjectFactory.instance.recoverGameObject(this);
        };
        /**
         * 反初始化
         */
        MermaidEff.prototype.uninitialize = function () {
            this._txt.text = "";
            this._moviePlayer.stopAll();
            _super.prototype.uninitialize.call(this);
        };
        /**
         * 释放
         */
        MermaidEff.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return MermaidEff;
    }(gameObject.GameObjectRender));
    gameObject.MermaidEff = MermaidEff;
    __reflect(MermaidEff.prototype, "gameObject.MermaidEff");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=MermaidEff.js.map