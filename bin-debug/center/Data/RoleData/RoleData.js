var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 房间数据
 * @author suo
 */
var RoleData = (function () {
    function RoleData() {
        /*房间内玩家数据list*/
        this.seatListMap = new Dictionary();
        game.RoomData.Instance.addSeatChanged.add(this._addSeat, this);
        game.RoomData.Instance.delectSeatChanged.add(this._roomPlayerListDel, this);
    }
    /**
     * 座位发生改变时
     */
    RoleData.prototype._addSeat = function (seat) {
        if (!seat) {
            return;
        }
        if (this.seatListMap.indexOf(seat.seatId) == -1) {
            var seatData = new SeatData(seat);
            this.seatListMap.set(seat.seatId, seatData);
        }
        else {
            // console.assert(false,"已经存在该座位了!");
        }
    };
    /**
     * 玩家退出消息（删座位一定删玩家）
     */
    RoleData.prototype._roomPlayerListDel = function (seatID) {
        if (this.seatListMap.indexOf(seatID)) {
            var temp = this.seatListMap.get(seatID);
            temp.dispose();
            this.seatListMap.remove(seatID);
        }
        else {
            // console.assert(false,"删除失败 不存在该座位!");
        }
    };
    /**
     * 释放
     */
    RoleData.prototype.dispose = function () {
        this.seatListMap.clear();
        game.RoomData.Instance.addSeatChanged.remove(this._addSeat, this);
        game.RoomData.Instance.delectSeatChanged.remove(this._roomPlayerListDel, this);
    };
    return RoleData;
}());
__reflect(RoleData.prototype, "RoleData");
//# sourceMappingURL=RoleData.js.map