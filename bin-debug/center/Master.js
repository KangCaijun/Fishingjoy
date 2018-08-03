var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家数据中心
 * @author suo
 */
var Master = (function () {
    function Master() {
        /*uid*/
        this.uid = -1;
        /*昵称*/
        this.nickName = undefined;
        /*头像路径*/
        this.headURL = undefined;
        /*金钱*/
        this.money = 0;
        /*上一次金钱数量*/
        this.lastMoney = 0;
        /*性别*/
        this.gender = undefined;
        /*基础数据*/
        this.baseInfo = null;
        /*座位数据*/
        this.seatID = -1;
        /*是否瞄准射击*/
        this.isAimShoot = false;
        /*是否快速射击*/
        this.isFastShoot = false;
        /*是否自动射击*/
        this.isAutoShoot = false;
        /*瞄准射击是否冷却*/
        this.isAimShootCooling = false;
        /*快速射击是否冷却*/
        this.isFastShootCooling = false;
        /*自动射击是否冷却*/
        this.isAutoShootCooling = false;
        /*是否普通射击*/
        this.isNormalShoot = true;
        /*瞄准鱼的服务器ID*/
        this.aimFishServelID = NaN;
        /*是否旋转*/
        this.isRotation = false;
        /*玩家炮台*/
        this.masterBattery = null;
        /*禁止射击*/
        this.prohibitShoot = false;
        game.RoomData.Instance.MainSeatChanged.add(this.updatePlayerInfo, this);
        EventManager.registerEvent(12 /* CHANGE_SEAT */, Handler.create(this, this._mainSeatChanged));
    }
    Object.defineProperty(Master, "instance", {
        /**
         * 获得单例
         */
        get: function () {
            if (this._instance == null) {
                this._instance = new Master();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 更新玩家数据
     */
    Master.prototype.updatePlayerInfo = function (value) {
        if (value == game.USerSeatState.SitDown) {
            if (game.PokerFunction.MainUser != null) {
                this.uid = game.PokerFunction.MainUser.uid;
                this.seatID = game.PokerFunction.MainSeatId;
                if (this.baseInfo == null) {
                    this.baseInfo = game.PokerFunction.MainUser;
                    this.baseInfo.nameChanged.add(this._nameChanged, this);
                    this.baseInfo.headUrlChanged.add(this._headChanged, this);
                    this.baseInfo.pointChanged.add(this._onMoneyChanged, this);
                }
            }
            EventManager.fireEvent(9 /* MASTER_SIT_DOWN */, this.seatID);
        }
        else if (value == game.USerSeatState.StandUp) {
            if (this.seatID != -1) {
                this.seatID = -1;
            }
            if (this.baseInfo != null) {
                this.baseInfo.nameChanged.remove(this._nameChanged, this);
                this.baseInfo.headUrlChanged.remove(this._headChanged, this);
                this.baseInfo.pointChanged.remove(this._onMoneyChanged, this);
                this.baseInfo = null;
            }
        }
    };
    /**
      * 主角座位改变
      */
    Master.prototype._mainSeatChanged = function () {
        var mainSeat = game.PokerFunction.MainSeat;
        if (mainSeat == null)
            return;
        var seatId = mainSeat.seatId;
        if (seatId > 2) {
            this.isRotation = true;
            var rotation = 180;
            manager.LayerManager.instance.setLayerRotation(rotation, 2 /* Fish */);
            manager.LayerManager.instance.setLayerRotation(rotation, 3 /* FishingNet */);
            manager.LayerManager.instance.setLayerRotation(rotation, 4 /* Bullet */);
            var backGround0 = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishMainSceneView).backGround0;
            // backGround0.rotation = rotation;
            var batteryGroup = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.SeatView).batteryGroup;
            var mainBattery = batteryGroup.get(seatId);
            if (seatId == 3) {
                var changeBattery2 = batteryGroup.get(2);
                mainBattery.changeSeat(changeBattery2);
                mainBattery.curRotation = 180;
                /*交换14椅子*/
                var changeBattery4 = batteryGroup.get(4);
                var changeBattery1 = batteryGroup.get(1);
                changeBattery4.changeSeat(changeBattery1);
            }
            else if (seatId == 4) {
                var changeBattery = batteryGroup.get(1);
                mainBattery.changeSeat(changeBattery);
                /*交换23椅子*/
                var changeBattery2 = batteryGroup.get(2);
                var changeBattery3 = batteryGroup.get(3);
                mainBattery.curRotation = 180;
                changeBattery2.changeSeat(changeBattery3);
            }
        }
    };
    /**
     * 姓名被更改时
     */
    Master.prototype._nameChanged = function () {
        this.nickName = this.baseInfo.nickName;
    };
    /**
     * 头像变更
     */
    Master.prototype._headChanged = function () {
        this.headURL = this.baseInfo.headUrl;
    };
    /**
     * 金币更变
     */
    Master.prototype._onMoneyChanged = function () {
        this.lastMoney = this.money;
        this.money = this.baseInfo.point;
    };
    /**
     * 释放
     */
    Master.prototype.dispose = function () {
        this.uid = -1;
        this.nickName = undefined;
        this.headURL = undefined;
        this.money = -1;
        this.gender = undefined;
        if (this.baseInfo != null) {
            this.baseInfo.nameChanged.remove(this._nameChanged, this);
            this.baseInfo.headUrlChanged.remove(this._headChanged, this);
            this.baseInfo.pointChanged.remove(this._onMoneyChanged, this);
            this.baseInfo = null;
        }
        game.RoomData.Instance.MainSeatChanged.remove(this.updatePlayerInfo, this);
        EventManager.unregisterEvent(12 /* CHANGE_SEAT */, this, this._mainSeatChanged);
    };
    /*单例*/
    Master._instance = null;
    return Master;
}());
__reflect(Master.prototype, "Master");
var SHOOT_TYPE;
(function (SHOOT_TYPE) {
    /*极速射击*/
    SHOOT_TYPE[SHOOT_TYPE["FAST"] = 0] = "FAST";
    /*瞄准射击*/
    SHOOT_TYPE[SHOOT_TYPE["AIM"] = 1] = "AIM";
    /*自动射击*/
    SHOOT_TYPE[SHOOT_TYPE["AUTO"] = 2] = "AUTO";
    /*普通射击*/
    SHOOT_TYPE[SHOOT_TYPE["NORMAL"] = 3] = "NORMAL";
})(SHOOT_TYPE || (SHOOT_TYPE = {}));
//# sourceMappingURL=Master.js.map