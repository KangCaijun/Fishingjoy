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
 * 炮台
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var Battery = (function (_super) {
        __extends(Battery, _super);
        function Battery() {
            var _this = _super.call(this) || this;
            /**
             * 炮台缩放X
             */
            _this.batteryScaleX = 0.85;
            /**
             * 炮台缩放Y
             */
            _this.batteryScaleY = 0.85;
            /**
             * uid
             */
            _this.uID = NaN;
            /**
             * 携带参数
             */
            _this.varsData = null;
            /**
             * 是否可以被释放
             */
            _this.canDispose = false;
            /**
             * 引用计数
             */
            _this.refCount = NaN;
            /**
             * 注册操作id
             */
            _this._registerAry = [];
            /**
             * 开火点
             */
            _this.firePoint = new egret.Shape();
            /**
             * 正在缓动
             */
            _this.isTween = false;
            /**
             * 是否顶部两个座位
             */
            _this.isTop = false;
            /**
             * 炮台索引
             */
            _this._batteryID = 1;
            /**
             * 等待服务器回应
             */
            _this._waitForServe = false;
            /**
             * 是否瞄准射击
             */
            _this.isAimShoot = false;
            /**
             * 渔网的半径
             */
            _this.fishNetRadius = 50;
            /**
             * 发射子弹的数量
             */
            _this.fireBulletNum = 1;
            /**
             * 炮台资源编号
             */
            _this.resNo = 1;
            /**
             * 当前旋转角度
             */
            _this.curRotation = 0;
            _this.goldCoinInitialization = true;
            _this.skinName = "SeatItemSkin_fish";
            _this.touchEnabled = false;
            return _this;
        }
        Object.defineProperty(Battery.prototype, "seatId", {
            /**
             * 服务器座位id
             */
            get: function () {
                return this.seatdata.seatId;
            },
            enumerable: true,
            configurable: true
        });
        Battery.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        };
        /**
         * 加载资源
         */
        Battery.prototype.loadAsset = function (assetData) {
            // this.firePoint.graphics.beginFill(ColorUtil.COLOR_MAPLE)
            // this.firePoint.graphics.drawCircle(0, 0, 10)
            // this.firePoint.graphics.endFill()
            this.firePoint.x = 0;
            this.firePoint.y = 100;
            this.firePoint.anchorOffsetY = 90;
            this._batteryFireBox.addChild(this.firePoint);
            this.firePoint.visible = true;
            this._batteryChangeEff = UIUtil.creatMovieClip("batteryChangeEff");
            this._batteryChangeEff.x = 0;
            this._batteryChangeEff.y = 80;
            this._batteryChangeEff.visible = false;
            this._batteryFireBox.addChild(this._batteryChangeEff);
            game.SetPublicFont(this._moneyTF);
            game.SetPublicFont(this._costMoneyTF);
            this._creatFireEff(false);
        };
        Object.defineProperty(Battery.prototype, "coinImg", {
            /**
             * 获得金币图标
             */
            get: function () {
                return this._coinImg;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 交换椅子
         */
        Battery.prototype.changeSeat = function (battery) {
            var temp = { x: this.x, y: this.y, id: this.seatId /*, isTop: this.isTop*/ };
            this.x = battery.x;
            this.y = battery.y;
            this.setSeatIndex(battery.seatId);
            battery.x = temp["x"];
            battery.y = temp["y"];
            battery.setSeatIndex(temp["id"]);
        };
        /**
         * 发射子弹效果
         */
        Battery.prototype.sendBulletEffect = function () {
            egret.Tween.get(this._firingImg).to({ scaleY: 0.9 }, 80).to({ scaleY: 1 }, 100);
            this.playOnceAndHide(this._batteryFireEff);
        };
        /**
         * 设置炮口旋转
         */
        Battery.prototype.setFirePortRotation = function (angle) {
            var seatId = this.seatId;
            if (seatId == 1) {
                angle = -angle;
            }
            else if (seatId == 4) {
                angle = -angle + 180;
            }
            else if (seatId == 3) {
                angle = angle - 180;
            }
            this._firingImg.rotation = angle;
            this.firePoint.rotation = angle;
            this._batteryFireEff.rotation = angle;
        };
        /**
         * 缓动旋转
         */
        Battery.prototype.setTweenRotation = function (angle, cb) {
            var _this = this;
            var seatId = this.seatId;
            if (seatId == 1) {
                angle = -angle;
            }
            else if (seatId == 4) {
                angle = -angle + 180;
            }
            else if (seatId == 3) {
                angle = angle - 180;
            }
            if (this._firingImg.rotation - angle > 180) {
                angle += 360;
            }
            else if (this._firingImg.rotation - angle < -180) {
                angle -= 360;
            }
            egret.Tween.get(this._firingImg).to({ rotation: angle }, 150).call(function () {
                // this._firingImg.rotation = angle;
                _this.firePoint.rotation = angle;
                _this._batteryFireEff.rotation = angle;
                cb.run();
            }, this);
        };
        /**
         * 初始化一次
         */
        Battery.prototype.initOnce = function (initOnce) {
        };
        /**
         * 点击减少按钮
         */
        Battery.prototype._onClickDec = function () {
            if (this._waitForServe) {
                return;
            }
            var beforBatterId = FishingJoy.DataCenter.instance.beforBatterId(this._batteryID);
            var minBatterId = FishingJoy.DataCenter.instance.minBatterId();
            if (beforBatterId == minBatterId) {
                this.decBtn.enabled = false;
            }
            this.incBtn.enabled = true;
            if (beforBatterId < FishingJoy.DataCenter.instance.accessToProps(1)[0].needBatteryId) {
                Master.instance.isAutoShoot = false;
                EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.AUTO, false]);
            }
            if (beforBatterId < FishingJoy.DataCenter.instance.accessToProps(2)[0].needBatteryId) {
                Master.instance.isFastShoot = false;
                EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.FAST, false]);
            }
            if (beforBatterId < FishingJoy.DataCenter.instance.accessToProps(3)[0].needBatteryId) {
                Master.instance.isAimShoot = false;
                EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.AIM, false]);
            }
            game.SoundHand.Instance.playTurretDemotion();
            this._sendChangeBatteryMsg(beforBatterId);
        };
        /**
         * 转换炮台协议
         */
        Battery.prototype._sendChangeBatteryMsg = function (batteryID) {
            var cmd = new Cmd.ActionCmd_CS();
            cmd.act = new Cmd.Action();
            cmd.act.uid = Master.instance.uid;
            cmd.act.value = FishingJoy.DataCenter.instance.getBatterIndex(batteryID) + 1;
            cmd.act.op = Cmd.Operation.ChangeBattery;
            game.PokerFunction.tcpSend(cmd);
            this._waitForServe = true;
        };
        /**
         * 播放一次自动隐藏
         */
        Battery.prototype.playOnceAndHide = function (mov) {
            mov.visible = true;
            mov.gotoAndPlay(1, 1);
            mov.once(egret.MovieClipEvent.COMPLETE, function () {
                mov.visible = false;
            }, this);
        };
        /**
         * 点击增加按钮
         */
        Battery.prototype._onClickinc = function () {
            if (this._waitForServe) {
                return;
            }
            var nextBatterId = FishingJoy.DataCenter.instance.nextBatterId(this._batteryID);
            var maxBatterId = FishingJoy.DataCenter.instance.maxBatterId();
            if (nextBatterId == maxBatterId) {
                this.incBtn.enabled = false;
            }
            this.decBtn.enabled = true;
            game.SoundHand.Instance.playTurretUpgrade();
            this._sendChangeBatteryMsg(nextBatterId);
        };
        /**
         * 设置数据
         */
        Battery.prototype.setSeatData = function (seatdata) {
            this.seatdata = seatdata;
            this.seatdata.userChanged.add(this._userChanged, this);
            this.seatdata.batteryIndexChanged.add(this._onbatteryChange, this);
        };
        Object.defineProperty(Battery.prototype, "state", {
            /**
             * 设置状态
             */
            set: function (value) {
                if (this.seatState != value) {
                    this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._sendSitDownCmd, this);
                    if (value == SEAT_STATE.EMPTY) {
                        this.batteryDisplay.visible = false;
                        this.waitingToJoin.visible = true;
                        UIUtil.setBreatheTween(this.waitingToJoin, 1000);
                        // this.once(egret.TouchEvent.TOUCH_TAP, this._sendSitDownCmd, this);
                    }
                    else if (value == SEAT_STATE.SOMEBODY) {
                        this.batteryDisplay.visible = true;
                        this.waitingToJoin.visible = false;
                        egret.Tween.removeTweens(this.waitingToJoin);
                    }
                    this.seatState = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 发送坐下请求
         */
        Battery.prototype._sendSitDownCmd = function () {
            var cmd = new Cmd.SitDownCmd_CS();
            cmd.uid = Master.instance.uid;
            cmd.seatId = this.seatdata.seatId;
            cmd.roomId = FishingJoy.DataCenter.instance.roomID;
            game.PokerFunction.tcpSend(cmd);
            // SoundManager.instance.playSoundByName(SOUND_CONST.CLICK);
        };
        /**
         * 当角色进行变更
         */
        Battery.prototype._userChanged = function (user) {
            if (user) {
                this.state = SEAT_STATE.SOMEBODY;
                this._user = user;
                EventManager.fireEvent(7 /* ADD_BATTERY_IN_MAP */, [this._user.uid, this]);
                this.goldCoinInitialization = true;
                this._user.nameChanged.add(this._nameChanged, this);
                this._user.pointChanged.add(this._onMoneyChanged, this);
                if (this._user.uid == uniLib.NetMgr.UID) {
                    this._nameTF.textColor = ColorUtil.COLOR_ORANGE;
                    this._decreaseImg.source = "batteryBase1";
                    this._increaseImg.source = "batteryBase2";
                    EventManager.registerEvent(0 /* ROOM_LEVEL_UPDATE */, Handler.create(this, this.judgeBtnEnabled, [this._batteryID], true), 1 /* ONCE */);
                    this.registerOperation(0 /* MASTER */);
                    this.registerOperation(5 /* BATTERY */);
                    this.decBtn = new tool.Button(this._decreaseImg);
                    this.decBtn.mouseClickHandler = Handler.create(this, this._onClickDec);
                    this.decBtn.enabled = false;
                    this.incBtn = new tool.Button(this._increaseImg);
                    this.incBtn.mouseClickHandler = Handler.create(this, this._onClickinc);
                    this.incBtn.enabled = true;
                    Master.instance.masterBattery = this;
                    // this.judgeBtnEnabled();
                    this._creatFireEff(true);
                    this._playerEnterEff();
                }
                else {
                    this._decreaseImg.source = "batteryBase10";
                    this._increaseImg.source = "batteryBase9";
                    this._nameTF.textColor = ColorUtil.COLOR_WHITE;
                    this.registerOperation(5 /* BATTERY */);
                    this._creatFireEff(false);
                    Master.instance.masterBattery = null;
                }
            }
            else {
                this.seatdata.setLock(false, null);
                EventManager.fireEvent(8 /* REMOVE_BATTERY_IN_MAP */, this._user.uid);
                this.state = SEAT_STATE.EMPTY;
                egret.Tween.removeTweens(this._firingImg);
                UIUtil.removeSelf(this._batteryFireEff);
                this._batteryFireEff.stop();
                this._batteryFireEff = null;
                this._user.nameChanged.remove(this._nameChanged, this);
                this._user.pointChanged.remove(this._onMoneyChanged, this);
                this._user = null;
                for (var i = 0; i < this._registerAry.length; i++) {
                    manager.OperationManager.instance.unregisterOperation(this._registerAry[i]);
                }
                this._clear();
                FishingJoy.FishingJoyLogic.instance.removeTheGoldCoinHeap(this.seatdata);
            }
        };
        /**
         * 炮台切换
         */
        Battery.prototype._onbatteryChange = function () {
            this._waitForServe = false;
            this.changeBatery(this.seatdata.batteryIndex);
        };
        /**
         * 切换
         */
        Battery.prototype.changeBatery = function (index) {
            var batteryID = FishingJoy.DataCenter.instance.getBatterIdByIndex(index - 1);
            var configList = table.TableBatteryConfig.instance();
            var config = configList.first(function (v) { return v.id == batteryID; });
            if (config == null) {
                this.seatdata.batteryIndex = 1;
                return;
            }
            this._batteryID = batteryID;
            this.fishNetRadius = config.fishNetRadius;
            if (this._user.uid == Master.instance.uid) {
                this.judgeBtnEnabled();
                this._firingImg.source = "batterySelf" + config.resNo;
            }
            else {
                this._firingImg.source = "battery" + config.resNo;
            }
            this._costMoneyTF.text = config.id.toString();
            this.fireBulletNum = config.fireBulletNum;
            this.playOnceAndHide(this._batteryChangeEff);
            this._firingImg.anchorOffsetX = this._firingImg.width / 2;
        };
        /**
         * 判断加减按钮是否可以点击
         */
        Battery.prototype.judgeBtnEnabled = function () {
            var minBatterId = FishingJoy.DataCenter.instance.minBatterId();
            var maxBatterId = FishingJoy.DataCenter.instance.maxBatterId();
            this.incBtn.enabled = true;
            this.decBtn.enabled = true;
            if (this._batteryID <= minBatterId) {
                this.decBtn.enabled = false;
            }
            if (this._batteryID >= maxBatterId) {
                this.incBtn.enabled = false;
            }
        };
        Object.defineProperty(Battery.prototype, "user", {
            /**
             * 获取座位上玩家数据
             */
            get: function () {
                return this._user;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 姓名被更改时
         */
        Battery.prototype._nameChanged = function () {
            this._nameTF.text = this._user.nickName;
        };
        /**
         * 玩家入场特效
         */
        Battery.prototype._playerEnterEff = function () {
            var _this = this;
            var img1 = new CustomImage();
            img1.y = 50;
            img1.source = "batterySelfInfo1";
            var img2 = new CustomImage();
            img2.source = "batterySelfInfo2";
            img2.y = -120;
            img2.x = 2;
            this._batteryFireBox.addChild(img1);
            this._batteryFireBox.addChild(img2);
            if (this.seatId == 1) {
                img1.scaleX = -1;
                img1.scaleY = 1;
                img2.scaleX = -1;
                img2.scaleY = 1;
                UIUtil.setScaleTween(img1, -1, 1);
            }
            else if (this.seatId == 2) {
                img1.scaleX = 1;
                img1.scaleY = 1;
                img2.scaleX = 1;
                img2.scaleY = 1;
                UIUtil.setScaleTween(img1, 1, 1);
            }
            else if (this.seatId == 3) {
                img1.scaleX = 1;
                img1.scaleY = 1;
                img2.scaleX = 1;
                img2.scaleY = 1;
                UIUtil.setScaleTween(img1, 1, 1);
            }
            else if (this.seatId == 4) {
                img1.scaleX = -1;
                img1.scaleY = 1;
                img2.scaleX = -1;
                img2.scaleY = 1;
                UIUtil.setScaleTween(img1, -1, 1);
            }
            // UIUtil.setDownUpTween(img2, -130, -110)
            Laya.timer.once(6000, this, function () {
                egret.Tween.get(img1).to({ alpha: 0 }, 2000);
                egret.Tween.get(img2).to({ alpha: 0 }, 2000).call(function () {
                    egret.Tween.removeTweens(img1);
                    egret.Tween.removeTweens(img2);
                    _this._batteryFireBox.removeChild(img1);
                    _this._batteryFireBox.removeChild(img2);
                });
            });
        };
        /**
         * 创建开火特效
         */
        Battery.prototype._creatFireEff = function (isSelf) {
            if (isSelf) {
                this._batteryFireEff = UIUtil.creatMovieClip("paojizi_1_fish");
            }
            else {
                this._batteryFireEff = UIUtil.creatMovieClip("paojilv_fish");
            }
            this._batteryFireEff.x = 0;
            this._batteryFireEff.y = 100;
            this._batteryFireEff.anchorOffsetY = 90;
            this._batteryFireEff.visible = false;
            this._batteryFireBox.addChild(this._batteryFireEff);
        };
        /**
         * 金币更变
         */
        Battery.prototype._onMoneyChanged = function () {
            if (this._user) {
                if (this.goldCoinInitialization) {
                    var point = this._user.point;
                    this._moneyTF.text = GX.toEnInLocaleString(point + "");
                    point == 0 || point == null ? this.goldCoinInitialization = true : this.goldCoinInitialization = false;
                }
            }
        };
        /**
         * 刷新金币
         */
        Battery.prototype.goldCoinRefresh = function () {
            if (this._user) {
                this._moneyTF.text = GX.toEnInLocaleString(this._user.point + "");
            }
        };
        /**
         * 清除
         */
        Battery.prototype._clear = function () {
            this._moneyTF.text = "";
            this._nameTF.text = "";
        };
        /**
         * 初始化
         */
        Battery.prototype.initialize = function () {
            this.x = this.varsData.bornX;
            this.y = this.varsData.bornY;
            manager.LayerManager.instance.addToLayer(this, this.layerType);
        };
        /**
         * 反初始化
         */
        Battery.prototype.uninitialize = function () {
            manager.LayerManager.instance.removeFromLayer(this);
            for (var i = 0; i < this._registerAry.length; i++) {
                manager.OperationManager.instance.unregisterOperation(this._registerAry[i]);
            }
            this._registerAry.length = 0;
            if (this._user) {
                this._user.nameChanged.remove(this._nameChanged, this);
                this._user.pointChanged.remove(this._onMoneyChanged, this);
            }
            this._clear();
            this.seatdata = null;
            this._user = null;
            this._moneyTF = null;
            this._nameTF = null;
        };
        /**
         * 设置数据
         */
        Battery.prototype.setData = function (sign, uID, varsData, layerType) {
            if (layerType === void 0) { layerType = 5 /* Seat */; }
            this.sign = sign;
            this.uID = uID;
            this.varsData = varsData;
            this.layerType = layerType;
        };
        /**
         * 释放
         */
        Battery.prototype.dispose = function () {
            if (this.decBtn) {
                this.decBtn.dispose();
                this.decBtn = null;
            }
            if (this.incBtn) {
                this.incBtn.dispose();
                this.incBtn = null;
            }
            this._batteryChangeEff.stop();
            this._batteryChangeEff = null;
            this.varsData = null;
            this.uID = NaN;
            this.varsData = null;
        };
        /**
         * 设置底板
         */
        Battery.prototype.setSeatIndex = function (index) {
            if (index == 4) {
                this.scaleX = this.batteryScaleX;
                this.scaleY = -this.batteryScaleY;
                this._moneyTF.scaleX = 0.36;
                this._moneyTF.scaleY = -0.36;
                this._costMoneyTF.scaleX = 0.5;
                this._costMoneyTF.scaleY = -0.5;
                this._nameTF.scaleX = 1;
                this._nameTF.scaleY = -1;
                this._coinImg.scaleX = 1;
                this._coinImg.scaleY = -1;
                this._increaseImg.scaleX = 1;
                this._increaseImg.scaleY = -1;
                this._decreaseImg.scaleX = 1;
                this._decreaseImg.scaleY = -1;
                this.waitingToJoin.scaleY = -1;
                this.waitingToJoin.scaleX = 1;
            }
            else if (index == 3) {
                this.scaleX = -this.batteryScaleX;
                this.scaleY = -this.batteryScaleY;
                this._moneyTF.scaleX = -0.36;
                this._moneyTF.scaleY = -0.36;
                this._costMoneyTF.scaleX = -0.5;
                this._costMoneyTF.scaleY = -0.5;
                this._nameTF.scaleX = -1;
                this._nameTF.scaleY = -1;
                this._coinImg.scaleX = -1;
                this._coinImg.scaleY = -1;
                this._increaseImg.scaleX = -1;
                this._increaseImg.scaleY = -1;
                this._decreaseImg.scaleX = -1;
                this._decreaseImg.scaleY = -1;
                this.waitingToJoin.scaleY = -1;
                this.waitingToJoin.scaleX = -1;
            }
            else if (index == 2) {
                this.scaleX = this.batteryScaleX;
                this.scaleY = this.batteryScaleY;
                this._moneyTF.scaleX = 0.36;
                this._moneyTF.scaleY = 0.36;
                this._costMoneyTF.scaleX = 0.5;
                this._costMoneyTF.scaleY = 0.5;
                this._nameTF.scaleX = 1;
                this._nameTF.scaleY = 1;
                this._coinImg.scaleX = 1;
                this._coinImg.scaleY = 1;
                this._increaseImg.scaleX = 1;
                this._increaseImg.scaleY = 1;
                this._decreaseImg.scaleX = 1;
                this._decreaseImg.scaleY = 1;
                this.waitingToJoin.scaleY = 1;
                this.waitingToJoin.scaleX = 1;
            }
            else if (index == 1) {
                this.scaleX = -this.batteryScaleX;
                this.scaleY = this.batteryScaleY;
                this._moneyTF.scaleX = -0.36;
                this._moneyTF.scaleY = 0.36;
                this._costMoneyTF.scaleX = -0.5;
                this._costMoneyTF.scaleY = 0.5;
                this._nameTF.scaleX = -1;
                this._nameTF.scaleY = 1;
                this._coinImg.scaleX = -1;
                this._coinImg.scaleY = 1;
                this._increaseImg.scaleX = -1;
                this._increaseImg.scaleY = 1;
                this._decreaseImg.scaleX = -1;
                this._decreaseImg.scaleY = 1;
                this.waitingToJoin.scaleY = 1;
                this.waitingToJoin.scaleX = -1;
            }
            this.seatIndex = index;
        };
        /**
         * 翻转
         */
        Battery.prototype.reverse = function () {
        };
        /**
         * 注册一种行为
         */
        Battery.prototype.registerOperation = function (value) {
            this._registerAry.push(manager.OperationManager.instance.registerOperation(this, value));
        };
        return Battery;
    }(eui.Component));
    gameObject.Battery = Battery;
    __reflect(Battery.prototype, "gameObject.Battery", ["gameObject.IGameObject"]);
})(gameObject || (gameObject = {}));
var SEAT_STATE;
(function (SEAT_STATE) {
    /*空的*/
    SEAT_STATE[SEAT_STATE["EMPTY"] = 0] = "EMPTY";
    /*有人*/
    SEAT_STATE[SEAT_STATE["SOMEBODY"] = 1] = "SOMEBODY";
})(SEAT_STATE || (SEAT_STATE = {}));
//# sourceMappingURL=Battery.js.map