var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 座位项数据
 * @author suo
 */
var SeatData = (function () {
    function SeatData(seatData) {
        this.seatData = seatData;
        this.seatID = seatData.seatId;
        this.seatData.userChanged.add(this._userChange, this);
    }
    /**
     * 座位上玩家改变
     */
    SeatData.prototype._userChange = function (playerInfo) {
        if (!playerInfo) {
            this._clear();
            return;
        }
        this.uid = playerInfo.uid;
        this.playerInfo = playerInfo;
        this.playerInfo.nameChanged.add(this._nameChanged, this);
        this.playerInfo.headUrlChanged.add(this._headChanged, this);
        this.playerInfo.pointChanged.add(this._onMoneyChanged, this);
    };
    /**
     * 姓名被更改时
     */
    SeatData.prototype._nameChanged = function () {
        this.nickName = this.playerInfo.nickName;
    };
    /**
     * 头像变更
     */
    SeatData.prototype._headChanged = function () {
        this.headUrl = this.playerInfo.headUrl;
    };
    /**
     * 金币更变
     */
    SeatData.prototype._onMoneyChanged = function () {
        this.money = this.playerInfo.point;
    };
    /**
     * 清理
     */
    SeatData.prototype._clear = function () {
        this.uid = -1;
    };
    /**
     * 释放
     */
    SeatData.prototype.dispose = function () {
        if (this.playerInfo) {
            this.playerInfo.nameChanged.remove(this._nameChanged, this);
            this.playerInfo.headUrlChanged.remove(this._headChanged, this);
            this.playerInfo.pointChanged.remove(this._onMoneyChanged, this);
        }
        this.seatData.userChanged.remove(this._userChange, this);
        this.seatData = null;
        this.playerInfo = null;
    };
    return SeatData;
}());
__reflect(SeatData.prototype, "SeatData");
//# sourceMappingURL=SeatData.js.map