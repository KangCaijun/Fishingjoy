/**
 * 注册主角操作
 * @author suo
 */
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
var operation;
(function (operation) {
    var MasterBatteryOperation = (function (_super) {
        __extends(MasterBatteryOperation, _super);
        function MasterBatteryOperation() {
            var _this = _super.call(this) || this;
            /**
             * 是否在冷却
             */
            _this._isCooling = false;
            /**
             * 点击特效冷却
             */
            _this._isClickEffCooling = false;
            /**
             * 退潮
             */
            _this._isEbbTide = false;
            return _this;
        }
        /**
         * 注册
         */
        MasterBatteryOperation.prototype.register = function (gameObj) {
            this._gameObj = gameObj;
            if (uniLib.Global.isH5) {
                PCMouseHelper.changeCursor();
            }
            else {
                this._initCursor();
            }
            EventManager.registerEvent(10 /* CHANEG_SHOOT_TYPE */, Handler.create(this, this._changeShootType));
            EventManager.registerEvent(11 /* AIM_FISH */, Handler.create(this, this._aimFish));
            EventManager.registerEvent(17 /* WAIT_AIM */, Handler.create(this, this._waitAim));
            EventManager.registerEvent(19 /* FIRE_BULLET */, Handler.create(this, this._commonShoot));
            EventManager.registerEvent(20 /* EBB_TIDE */, Handler.create(this, this._onEbbTide));
            gameObj.curRotation = this._gameObj.rotation;
            this._bg = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishMainSceneView).backGround0;
            this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._starDrag, this);
            this._bg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._outsideDrag, this);
            this._bg.addEventListener(egret.TouchEvent.TOUCH_END, this._endDrag, this);
            this._curSign = 10005 /* BULLET_SELF */;
            var curBulletConfig = gameObject.GameObjectConfigParse.getConfigBySign(this._curSign);
            this._curInterval = curBulletConfig.initOnceData.interval;
            EventManager.registerEvent(18 /* AIM_SPECIAL_FISH */, Handler.create(this, this._checkSpecialFish));
        };
        /**
         * 检测特殊鱼
         */
        MasterBatteryOperation.prototype._checkSpecialFish = function (fish, isOpen) {
            if (isOpen) {
                Laya.timer.loop(200, this, this._checkAim, [fish]);
            }
            else {
                Laya.timer.clear(this, this._checkAim);
            }
        };
        /**
         * 退潮
         */
        MasterBatteryOperation.prototype._onEbbTide = function () {
            var _this = this;
            if (Master.instance.isAimShoot && Master.instance.isAutoShoot) {
                Master.instance.prohibitShoot = true;
            }
            else {
                this._isEbbTide = true;
                Laya.timer.once(2000, this, function () { _this._isEbbTide = false; });
            }
            if (Master.instance.isAimShoot) {
                this._waitAim(2000);
            }
        };
        /**
         * 检测能否瞄准
         */
        MasterBatteryOperation.prototype._checkAim = function (fish) {
            if (fish && fish.isAlive && fish.isInView) {
                if (Master.instance.isAimShoot) {
                    if (UIUtil.isCanAim(fish)) {
                        if (Master.instance.aimFishServelID != fish.servelID && !GlobeVars.AimSpcialFish) {
                            this._aimFish(fish);
                            GlobeVars.AimSpcialFish = true;
                        }
                    }
                    else {
                        GlobeVars.AimSpcialFish = false;
                    }
                }
            }
            else {
                Laya.timer.clear(this, this._checkAim);
            }
        };
        /**
         * 等待下次瞄准
         */
        MasterBatteryOperation.prototype._waitAim = function (timer) {
            if (timer === void 0) { timer = 500; }
            this._changeShootType(SHOOT_TYPE.AIM, false);
            Laya.timer.loop(timer, this, this._findTargetFish);
        };
        /**
         * 初始化鼠标指针
         */
        MasterBatteryOperation.prototype._initCursor = function () {
            this._cursorImg = new CustomImage();
            this._cursorImg.source = "cursor1";
            this._cursorImg.x = uniLib.Global.screenWidth / 2;
            this._cursorImg.y = uniLib.Global.screenHeight / 2;
            manager.LayerManager.instance.addToLayer(this._cursorImg, 12 /* CURSOR */);
        };
        /**
         * 瞄准此鱼
         */
        MasterBatteryOperation.prototype._aimFish = function (fish) {
            if (Master.instance.isAimShoot) {
                this._sendAimMsg(true, fish.servelID);
            }
        };
        /**
         * 改变射击模式
         */
        MasterBatteryOperation.prototype._changeShootType = function (value, isOpen) {
            /*快速射击*/
            if (value == SHOOT_TYPE.FAST) {
                var curBulletConfig = gameObject.GameObjectConfigParse.getConfigBySign(this._curSign);
                if (isOpen) {
                    this._curInterval = curBulletConfig.initOnceData.fastInterval;
                }
                else {
                    this._curInterval = curBulletConfig.initOnceData.interval;
                }
                Master.instance.isFastShoot = isOpen;
                EventManager.fireEvent(14 /* PLAY_FIRE_EFF */, [isOpen, value]);
            }
            else if (value == SHOOT_TYPE.AIM) {
                if (isOpen) {
                    var fish = FishingJoy.FishingJoyLogic.instance.findMostValuableFish();
                    if (fish != null) {
                        this._sendAimMsg(true, fish.servelID);
                    }
                    else {
                        Laya.timer.loop(400, this, this._findTargetFish);
                    }
                }
                else {
                    this._sendAimMsg(false, -1);
                }
                Master.instance.isAimShoot = isOpen;
            }
            else if (value == SHOOT_TYPE.AUTO) {
                if (isOpen) {
                    Laya.timer.frameLoop(1, this, this._autoOperation);
                }
                else {
                    Laya.timer.clear(this, this._autoOperation);
                }
                Master.instance.isAutoShoot = isOpen;
                EventManager.fireEvent(14 /* PLAY_FIRE_EFF */, [isOpen, value]);
            }
            /*是否为普通射击*/
            if (!Master.instance.isAutoShoot && !Master.instance.isAutoShoot && !Master.instance.isAimShoot) {
                Master.instance.isNormalShoot = true;
            }
            else {
                Master.instance.isNormalShoot = false;
            }
        };
        /**
         * 每秒检测一次场上最值钱的鱼
         */
        MasterBatteryOperation.prototype._findTargetFish = function () {
            var fish = FishingJoy.FishingJoyLogic.instance.findMostValuableFish();
            if (fish != null) {
                Laya.timer.clear(this, this._findTargetFish);
                this._sendAimMsg(true, fish.servelID);
            }
        };
        /**
         * 发送瞄准协议
         */
        MasterBatteryOperation.prototype._sendAimMsg = function (isLock, fishServelID) {
            var cmd = new Cmd.ActionCmd_CS();
            cmd.act = new Cmd.Action();
            cmd.act.uid = Master.instance.uid;
            if (isLock) {
                cmd.act.op = Cmd.Operation.Lock;
                cmd.act.value = fishServelID;
            }
            else {
                cmd.act.op = Cmd.Operation.Unlock;
            }
            game.PokerFunction.tcpSend(cmd);
        };
        /**
         * 开始拖动
         */
        MasterBatteryOperation.prototype._starDrag = function (e) {
            var gameObj = this._gameObj;
            if (!gameObj || !gameObj.user) {
                return;
            }
            if (gameObj.user.point < this._gameObj._batteryID) {
                GX.Tips.showTips("金币不足!");
                return;
            }
            if (this._cursorImg) {
                this._cursorImg.x = e.stageX;
                this._cursorImg.y = e.stageY;
            }
            this.clickAnimation(e);
            if (Master.instance.isAutoShoot) {
                gameObj.curRotation = UIUtil.calculateBatteryRotation(gameObj, e.stageX, e.stageY);
            }
            else if (Master.instance.isAimShoot || Master.instance.isFastShoot || Master.instance.isNormalShoot) {
                gameObj.curRotation = UIUtil.calculateBatteryRotation(gameObj, e.stageX, e.stageY);
                this._commonShoot();
                Laya.timer.frameLoop(2, this, this._commonShoot);
            }
            if (!Master.instance.isAimShoot) {
                this._bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
            }
        };
        /**
         * 点击动效
         */
        MasterBatteryOperation.prototype.clickAnimation = function (e) {
            var back0 = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishMainSceneView);
            var click = Pool.getItemByCreateFun(Pool.clickingWaterWave, Handler.create(this, this._creatClickingWaterWave, null, true));
            UIUtil.movPlayOnce(back0, click, e.stageX, e.stageY, 2, 2, Handler.create(this, function () { Pool.recover(Pool.clickingWaterWave, click); }, null, true));
        };
        /**
         * 创建水波纹
         */
        MasterBatteryOperation.prototype._creatClickingWaterWave = function () {
            var mov = UIUtil.creatMovieClip("clickingWaterWave");
            mov.blendMode = egret.BlendMode.ADD;
            return mov;
        };
        /**
         * 拖到屏幕外
         */
        MasterBatteryOperation.prototype._outsideDrag = function (e) {
            Laya.timer.clear(this, this._commonShoot);
            this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
        };
        /**
         * 正在拖动
         */
        MasterBatteryOperation.prototype._onDrag = function (e) {
            var _this = this;
            this._gameObj.curRotation = UIUtil.calculateBatteryRotation(this._gameObj, e.stageX, e.stageY);
            if (this._cursorImg) {
                this._cursorImg.x = e.stageX;
                this._cursorImg.y = e.stageY;
            }
            if (this._isClickEffCooling) {
                return;
            }
            this._isClickEffCooling = true;
            Laya.timer.once(100, this, function () { _this._isClickEffCooling = false; });
            this.clickAnimation(e);
        };
        /**
         * 拖动结束
         */
        MasterBatteryOperation.prototype._endDrag = function (e) {
            if (this._cursorImg) {
                this._cursorImg.x = e.stageX;
                this._cursorImg.y = e.stageY;
            }
            Laya.timer.clear(this, this._commonShoot);
            this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
        };
        /**
         * 发送一枚子弹
         */
        MasterBatteryOperation.prototype._fireOneBullet = function (sign) {
            this._sendMsg();
        };
        /**
         * 自动射击
         */
        MasterBatteryOperation.prototype._autoOperation = function () {
            this._commonShoot();
        };
        /**
         * 普通射击
         */
        MasterBatteryOperation.prototype._commonShoot = function () {
            var _this = this;
            /*退潮时不能发子弹*/
            if (this._isEbbTide) {
                return;
            }
            if (Master.instance.prohibitShoot) {
                return;
            }
            if (this._isCooling) {
                return;
            }
            this._isCooling = true;
            Laya.timer.once(this._curInterval, this, function () { _this._isCooling = false; });
            this._fireOneBullet(10005 /* BULLET_SELF */);
        };
        /**
         * 发送协议
         */
        MasterBatteryOperation.prototype._sendMsg = function () {
            if (FishingJoy.DataCenter.instance.isSwitchFish) {
                return;
            }
            if (!this._gameObj || !this._gameObj.user)
                return;
            if (this._gameObj.user.point < this._gameObj._batteryID) {
                Laya.timer.clear(this, this._autoOperation);
                Laya.timer.clear(this, this._commonShoot);
                EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.AUTO, false]);
                EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.AIM, false]);
                EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.FAST, false]);
                this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
            }
            var cmd = new Cmd.BetRoomCmd_CS();
            cmd.bulletinfo = new Cmd.BulletInfo();
            cmd.bet = new Cmd.DoorChips();
            cmd.bulletinfo.angle = this._gameObj.curRotation;
            cmd.bet.chips = FishingJoy.DataCenter.instance.getBatterIndex(this._gameObj._batteryID) + 1;
            ;
            game.PokerFunction.tcpSend(cmd);
        };
        /**
         * 反注册
         */
        MasterBatteryOperation.prototype.unregister = function () {
            this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._starDrag, this);
            this._bg.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._outsideDrag, this);
            this._bg.removeEventListener(egret.TouchEvent.TOUCH_END, this._endDrag, this);
            this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
            if (uniLib.Global.isH5) {
                PCMouseHelper.recover();
            }
            else {
                manager.LayerManager.instance.removeFromLayer(this._cursorImg, 12 /* CURSOR */);
                this._cursorImg = null;
            }
            EventManager.unregisterEvent(19 /* FIRE_BULLET */, this, this._commonShoot);
            EventManager.unregisterEvent(11 /* AIM_FISH */, this, this._aimFish);
            EventManager.unregisterEvent(10 /* CHANEG_SHOOT_TYPE */, this, this._changeShootType);
            EventManager.unregisterEvent(17 /* WAIT_AIM */, this, this._waitAim);
            EventManager.unregisterEvent(18 /* AIM_SPECIAL_FISH */, this, this._checkSpecialFish);
            EventManager.unregisterEvent(20 /* EBB_TIDE */, this, this._onEbbTide);
            this._gameObj = null;
        };
        return MasterBatteryOperation;
    }(operation.BaseOperation));
    operation.MasterBatteryOperation = MasterBatteryOperation;
    __reflect(MasterBatteryOperation.prototype, "operation.MasterBatteryOperation");
})(operation || (operation = {}));
//# sourceMappingURL=MasterBatteryOperation.js.map