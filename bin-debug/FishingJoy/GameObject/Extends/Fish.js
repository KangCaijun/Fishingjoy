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
 * 鱼
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var Fish = (function (_super) {
        __extends(Fish, _super);
        function Fish() {
            var _this = _super.call(this) || this;
            /**
             * 注册操作id
             */
            _this._registerAry = [];
            /**
             * 生命值
             */
            _this.life = NaN;
            /**
             * 最大生命值
             */
            _this.maxLife = NaN;
            /**
             * 是否活着
             */
            _this.isAlive = false;
            /**
             * 速度
             */
            _this.speed = 0;
            /**
             * 服务器ID
             */
            _this.servelID = -1;
            /**
             * 赔率
             */
            _this.odds = -1;
            /**
             * 技能ID
             */
            _this.skillID = -1;
            /**
             * 是否镜像
             */
            _this.isMirror = false;
            /**
             * 是否被击中变红
             */
            _this.isRed = false;
            /**
             * 滤镜
             */
            _this.glowFilter = null;
            /**
             * 爆炸碰撞
             */
            _this.isBurstHit = false;
            return _this;
        }
        Object.defineProperty(Fish.prototype, "spawnTime", {
            // public dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(-15, 60, ColorUtil.COLOR_SHADOW);
            /**
             * 出生时间
             */
            get: function () {
                return this.varsData.spawnTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Fish.prototype, "pathID", {
            /**
             * 路径ID
             */
            get: function () {
                return this.varsData.pathId;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化一次
         */
        Fish.prototype.initOnce = function (data) {
            _super.prototype.initOnce.call(this, data);
            this.speed = data.speed;
            this.odds = data.odds;
            this.anchorOffsetX = data.anchorOffsetX;
            this.anchorOffsetY = data.anchorOffsetY;
            this.isMirror = data.isMirror;
            var strength;
            if (this.sign == 30 /* BIG_GOLD_FISH */) {
                strength = 2;
            }
            else if (this.sign == 2001 /* DRAGON */) {
                strength = 2;
            }
            else {
                strength = 6;
            }
            this.glowFilter = new egret.GlowFilter(ColorUtil.COLOR_RED, 1, 1, 1, strength, 1, false);
            // this._moviePlayer.filters = [this.dropShadowFilter]
            if (data.isMirror && Master.instance.isRotation) {
                this.scaleY = -1;
            }
            else {
                this.scaleY = 1;
            }
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectFish, this);
        };
        /**
         * 播放击中特效
         */
        Fish.prototype.playHitEff = function (uid, time, isBurstHit) {
            if (time === void 0) { time = 200; }
            if (isBurstHit === void 0) { isBurstHit = false; }
            if (Master.instance.uid == uid) {
                if (isBurstHit) {
                    Laya.timer.once(time, this, this._setNormal);
                    this.isBurstHit = true;
                }
                else {
                    if (this.isBurstHit) {
                        return;
                    }
                    Laya.timer.once(time, this, this._setNormal);
                    if (this.isRed) {
                        return;
                    }
                    this.isRed = true;
                }
                this._moviePlayer.filters = [this.glowFilter];
            }
        };
        /**
         * 恢复正常
         */
        Fish.prototype._setNormal = function () {
            this._moviePlayer.filters = [];
            this.isRed = false;
            this.isBurstHit = false;
        };
        Object.defineProperty(Fish.prototype, "MoivePlayer", {
            /**
             * 获得影片播放器
             */
            get: function () {
                return this._moviePlayer;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 播放死亡动画并回收到资源池
         */
        Fish.prototype.playDieMov = function (cb) {
            this._moviePlayer.switchAniPlayOnce("die", cb);
        };
        /**
         * 初始化
         */
        Fish.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.skillID = this.varsData.skillID;
            if (this._moviePlayer) {
                this._moviePlayer.switchAniByIndex(0);
            }
            this.life = this.maxLife;
            this.servelID = this.varsData.serveID;
            if (this.servelID == undefined) {
                console.assert(false, "未定义severalID！");
            }
            if (this.varsData.operation) {
                for (var i = 0; i < this.varsData.operation.length; i++) {
                    this._registerAry.push(manager.OperationManager.instance.registerOperation(this, this.varsData.operation[i].type));
                }
            }
            // if (Master.instance.isAimShoot) {
            // 	this._canTouch(SHOOT_TYPE.AIM, true);
            // }
            this.isAlive = true;
            if (this.skillID != 0) {
                this.skillRender = gameObject.FishSkillTool.addSkillEff(this, this.skillID);
            }
        };
        /**
         * 瞄准此鱼
         */
        Fish.prototype.onSelectFish = function () {
            if (Master.instance.aimFishServelID != this.servelID) {
                EventManager.fireEvent(11 /* AIM_FISH */, this);
            }
            else {
                EventManager.fireEvent(19 /* FIRE_BULLET */);
            }
        };
        /**
         * 反初始化
         */
        Fish.prototype.uninitialize = function () {
            this.isCollided = false;
            if (this.skillRender) {
                gameObject.FishSkillTool.removeSkill(this, this.skillRender);
                this.skillRender = null;
                this.skillID = -1;
            }
            this.clearGridIndex();
            this.unregisterOperation();
            _super.prototype.uninitialize.call(this);
        };
        /**
         * 移除行为
         */
        Fish.prototype.unregisterOperation = function () {
            for (var i = 0; i < this._registerAry.length; i++) {
                manager.OperationManager.instance.unregisterOperation(this._registerAry[i]);
            }
            this._registerAry.length = 0;
        };
        /**
         * 释放
         */
        Fish.prototype.dispose = function () {
            this._registerAry.length = 0;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectFish, this);
            this.glowFilter = null;
            _super.prototype.dispose.call(this);
        };
        return Fish;
    }(gameObject.GameObjectCollider));
    gameObject.Fish = Fish;
    __reflect(Fish.prototype, "gameObject.Fish");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Fish.js.map