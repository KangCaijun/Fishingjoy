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
 * 炮台控制
 * @author suo
 */
var operation;
(function (operation) {
    var BatteryOperation = (function (_super) {
        __extends(BatteryOperation, _super);
        function BatteryOperation() {
            var _this = _super.call(this) || this;
            /**
             * 两点之间的距离
             */
            _this.POINT_DIS = 20;
            return _this;
        }
        /**
         * 注册
         */
        BatteryOperation.prototype.register = function (gameObj) {
            this._gameObj = gameObj;
            this._gameObj.seatdata.lockChanged.add(this._aimFish, this);
            this._gameObj.seatdata.onlineChanged.add(this._clear, this);
            this._initPoint();
            EventManager.registerEvent(12 /* CHANGE_SEAT */, Handler.create(this, this._rotationSeat), 1 /* ONCE */);
        };
        /**
         * 旋转椅子
         */
        BatteryOperation.prototype._rotationSeat = function () {
            // if (this._gameObj.user.uid == Master.instance.uid) {
            var _a = UIUtil.localToGlobal(this._gameObj.focus), x = _a[0], y = _a[1];
            var fishLayer = manager.LayerManager.instance.getLayer(2 /* Fish */);
            var _b = UIUtil.localToGlobal(fishLayer, x, y), x1 = _b[0], y1 = _b[1];
            this._smallPoint.x = x;
            this._smallPoint.y = y;
            // }
        };
        /**
         * 初始化点
         */
        BatteryOperation.prototype._initPoint = function () {
            this._aimBig = new CustomImage();
            this._aimBig.source = "aimBig";
            this._aimBig.visible = false;
            manager.LayerManager.instance.addToLayer(this._aimBig, 7 /* AIM */);
            var _a = UIUtil.localToGlobal(this._gameObj.focus), x = _a[0], y = _a[1];
            var pointImg = new CustomImage();
            pointImg.source = "aimPoint";
            pointImg.visible = false;
            pointImg.fillMode = egret.BitmapFillMode.REPEAT;
            pointImg.x = x;
            pointImg.y = y;
            manager.LayerManager.instance.addToLayer(pointImg, 7 /* AIM */);
            pointImg.anchorOffsetY = pointImg.height / 2;
            pointImg.anchorOffsetX = -20 * 3;
            this._smallPoint = pointImg;
        };
        /**
         * 清除
         */
        BatteryOperation.prototype._clear = function () {
            var seatdata = this._gameObj.seatdata;
            if (seatdata.onlineState == Cmd.OnlineState.OnlineState_Offline) {
                console.error(" this._gameObj.seatdata" + seatdata.user.uid + "断线了");
                this._gameObj.isAimShoot = false;
                this._clearAimEff();
                Laya.timer.clear(this, this._drawAimEff);
                this._targetFish = null;
                this._gameObj.targetFishId = -1;
            }
        };
        /**
         * 瞄准鱼
         */
        BatteryOperation.prototype._aimFish = function (rev) {
            var uid = rev.user ? rev.user.uid : null;
            // let name = rev.user ? rev.user.nickName : null;
            // console.error("name:" + name + "rev.lock:" + rev.lock)
            if (rev.lock) {
                if (Master.instance.uid == uid) {
                    Laya.timer.clear(this, this._drawAimEff);
                    Master.instance.aimFishServelID = rev.lockFishId;
                    Master.instance.isAimShoot = true;
                    Master.instance.prohibitShoot = false;
                    EventManager.fireEvent(14 /* PLAY_FIRE_EFF */, [true, SHOOT_TYPE.AIM]);
                }
                this._gameObj.isAimShoot = true;
                var fish = FishingJoy.FishingJoyLogic.instance.inViewFishes.get(rev.lockFishId);
                if (fish && fish.isAlive && fish.isInView) {
                    this._targetFish = fish;
                    this._gameObj.targetFishId = rev.lockFishId;
                    Laya.timer.frameLoop(1, this, this._drawAimEff);
                }
                else {
                    this._waitAimFish();
                }
            }
            else {
                if (Master.instance.uid == uid) {
                    Master.instance.aimFishServelID = NaN;
                    Master.instance.isAimShoot = false;
                    EventManager.fireEvent(14 /* PLAY_FIRE_EFF */, [false, SHOOT_TYPE.AIM]);
                }
                this._gameObj.isAimShoot = false;
                this._clearAimEff();
                Laya.timer.clear(this, this._drawAimEff);
                this._targetFish = null;
                this._gameObj.targetFishId = -1;
            }
        };
        /**
         * 是否是此炮台
         */
        BatteryOperation.prototype._isMine = function (playerUid) {
            if (this._gameObj.user && playerUid == this._gameObj.user.uid) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 绘制瞄准效果
         */
        BatteryOperation.prototype._drawAimEff = function () {
            var tragetFish = this._targetFish;
            this._gameObj.isAimShoot = true;
            if (tragetFish && tragetFish.isAlive && tragetFish.isInView) {
                if (this._targetFish.isAccurateCollider) {
                    for (var i = 0; i < tragetFish.colliderAry.length; i++) {
                        var collider = tragetFish.colliderAry[i];
                        var _a = UIUtil.localToGlobal(collider), x = _a[0], y = _a[1];
                        if (UIUtil.inAimView(x, y)) {
                            this._gameObj.curRotation = UIUtil.calculateBatteryRotation(this._gameObj, x, y);
                            this._gameObj.setFirePortRotation(this._gameObj.curRotation);
                            this._draw(x, y);
                            return;
                        }
                    }
                }
                else {
                    var _b = UIUtil.localToGlobal(this._targetFish), x = _b[0], y = _b[1];
                    if (UIUtil.inAimView(x, y)) {
                        this._gameObj.curRotation = UIUtil.calculateBatteryRotation(this._gameObj, x, y);
                        this._gameObj.setFirePortRotation(this._gameObj.curRotation);
                        this._draw(x, y);
                        return;
                    }
                }
            }
            Laya.timer.clear(this, this._drawAimEff);
            this._waitAimFish();
        };
        /**
         * 等待下次瞄准
         */
        BatteryOperation.prototype._waitAimFish = function () {
            this._gameObj.targetFishId = -1;
            this._gameObj.isAimShoot = false;
            if (this._gameObj.user && this._gameObj.user.uid == Master.instance.uid) {
                EventManager.fireEvent(17 /* WAIT_AIM */);
            }
            else {
                this._clearAimEff();
            }
        };
        /**
         * 发送瞄准协议
         */
        BatteryOperation.prototype._sendAimMsg = function (isLock, fishServelID) {
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
         * 清除瞄准效果
         */
        BatteryOperation.prototype._clearAimEff = function () {
            if (this._smallPoint) {
                this._smallPoint.visible = false;
            }
            if (this._aimBig) {
                this._aimBig.visible = false;
            }
        };
        /**
         * 计算角度
         */
        BatteryOperation.prototype._calculateRotation = function (fishX, fishY) {
            var _a = UIUtil.localToGlobal(this._gameObj.focus), x1 = _a[0], y1 = _a[1];
            this._gameObj.curRotation = GX.getRadianByPoint({ x: fishX, y: fishY }, { x: x1, y: y1 });
        };
        /**
         * 绘制瞄准效果
         */
        BatteryOperation.prototype._draw = function (AimX, AimY) {
            var smallPoint = this._smallPoint;
            var aimBig = this._aimBig;
            smallPoint.visible = true;
            aimBig.visible = true;
            aimBig.x = AimX;
            aimBig.y = AimY;
            aimBig.rotation = this._targetFish.rotation;
            var _a = [smallPoint.x, smallPoint.y], x1 = _a[0], y1 = _a[1];
            var dis = Math.sqrt((AimX - x1) * (AimX - x1) + (AimY - y1) * (AimY - y1));
            dis = (Math.ceil(dis / 20) - 5) * 20;
            if (dis < 0) {
                dis = 0;
            }
            var pointRotation;
            if (Master.instance.seatID == 1 || Master.instance.seatID == 2) {
                pointRotation = this._gameObj.curRotation - 90;
            }
            else {
                pointRotation = this._gameObj.curRotation + 90;
            }
            smallPoint.width = dis;
            smallPoint.rotation = pointRotation;
        };
        /**
         * 反注册
         */
        BatteryOperation.prototype.unregister = function () {
            this._gameObj.seatdata.lockChanged.remove(this._aimFish, this);
            this._gameObj.seatdata.onlineChanged.remove(this._clear, this);
            this._gameObj.isAimShoot = false;
            this._clearAimEff();
            manager.LayerManager.instance.removeFromLayer(this._smallPoint, 7 /* AIM */);
            manager.LayerManager.instance.removeFromLayer(this._aimBig, 7 /* AIM */);
            Laya.timer.clear(this, this._drawAimEff);
            this._targetFish = null;
            this._gameObj.targetFishId = -1;
            this._gameObj = null;
        };
        return BatteryOperation;
    }(operation.BaseOperation));
    operation.BatteryOperation = BatteryOperation;
    __reflect(BatteryOperation.prototype, "operation.BatteryOperation");
})(operation || (operation = {}));
//# sourceMappingURL=BatteryOperation.js.map