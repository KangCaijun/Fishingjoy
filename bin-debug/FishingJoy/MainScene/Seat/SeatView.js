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
 * 视图模板
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var SeatView = (function (_super) {
        __extends(SeatView, _super);
        function SeatView() {
            var _this = _super.call(this) || this;
            /**
             * 炮台组 实际上就是座位
             */
            _this.batteryGroup = new SimpleMap();
            /**
             * 索引
             */
            _this._index = 0;
            _this._isInit = false;
            return _this;
        }
        /**
         * 初始化
         */
        SeatView.prototype.onInit = function () {
            game.RoomData.Instance.addSeatChanged.add(this._addSeatView, this);
        };
        /**
         * 添加座位 目前会固定初始化4个座位
         */
        SeatView.prototype._addSeatView = function (seatData) {
            if (this._isInit) {
                return;
            }
            if (seatData.seatId == 1 || seatData.seatId == 2 || seatData.seatId == 3 || seatData.seatId == 4) {
                var pos = game.GameConstant.GetSeatPositionBySeatId(seatData.seatId);
                var vars = {};
                vars.bornX = pos.x;
                vars.bornY = pos.y;
                var battery = gameObject.GameObjectFactory.instance.creatGameObject(20000 /* BATTERY */, vars, 5 /* Seat */);
                battery.setSeatIndex(seatData.seatId);
                battery.state = SEAT_STATE.EMPTY;
                battery.name = seatData.seatId.toString();
                battery.setSeatData(seatData);
                battery.setFirePortRotation(seatData.seatId > 2 ? 180 : 0);
                this.batteryGroup.set(seatData.seatId, battery);
                if (this.batteryGroup.length == 4) {
                    EventManager.fireEvent(12 /* CHANGE_SEAT */);
                    this._isInit = true;
                }
            }
        };
        /**
         * 展示时
         */
        SeatView.prototype.onShow = function () {
        };
        /**
         * 清除
         */
        SeatView.prototype.clear = function () {
        };
        /**
         * 隐藏时
         */
        SeatView.prototype.onHide = function () {
        };
        /**
         * 释放时
         */
        SeatView.prototype.dispose = function () {
            game.RoomData.Instance.addSeatChanged.remove(this._addSeatView, this);
            this.batteryGroup.clear();
        };
        return SeatView;
    }(egret.DisplayObjectContainer));
    FishingJoy.SeatView = SeatView;
    __reflect(SeatView.prototype, "FishingJoy.SeatView", ["BaseUIView"]);
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=SeatView.js.map