var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 数据处理中心
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var DataCenter = (function () {
        function DataCenter() {
            /*玩家数据*/
            this.master = Master.instance;
            /*等级 （低级场,中级场，高级场）*/
            this.level = 0;
            /*是否已经初始化*/
            this.isInit = false;
            /*房间号*/
            this.roomID = 0;
            GX.PokerEvent.Instance.roomDataUpdateEvent.add(this._updataRoomData, this);
            GX.PokerEvent.Instance.gameStateUpdate.add(this._gameStateUpdate, this);
        }
        Object.defineProperty(DataCenter, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new DataCenter();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 游戏状态更新
         */
        DataCenter.prototype._gameStateUpdate = function (data) {
            if (!this.isInit) {
                return;
            }
            if (!data) {
                return;
            }
            /*上一次游戏状态*/
            this.lastGameStatus = this.gameStatus;
            if (data.status == Cmd.GameStatus.GameStatus_Bet) {
                egret.log("=============下注状态=============");
                var time = Math.floor(data.endTime / 1000 - game.GameTime.serverNow() / 1000);
                this.gameStatus = 2 /* BET */;
            }
            else if (data.status == Cmd.GameStatus.GameStatus_Free) {
                egret.log("=============空闲状态=============");
                this.gameStatus = 1 /* FREE */;
            }
            else if (data.status == Cmd.GameStatus.GameStatus_Lottery) {
                egret.log("=============开奖状态=============");
                this.gameStatus = 3 /* LOTTERY */;
            }
            else if (data.status == Cmd.GameStatus.GameStatus_Settle) {
                egret.log("=============结算状态=============");
                this.gameStatus = 4 /* SETTLE */;
            }
            if (this.lastGameStatus != this.gameStatus) {
            }
        };
        Object.defineProperty(DataCenter.prototype, "isSwitchFish", {
            get: function () {
                return this.m_isSwitchFish;
            },
            set: function (b) {
                this.m_isSwitchFish = b;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataCenter.prototype, "noticeTriggers", {
            /**
             * 跑马灯触发条件
             */
            get: function () {
                var level = game.RoomData.Instance.level;
                var config = table.TableBaseRuleConfigList.instance().first(function (v) { return v.level == level; });
                var noticeTriggers = config ? config.noticeTriggers : null;
                return noticeTriggers && noticeTriggers instanceof Array ? noticeTriggers.first().id : 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取下注索引 通过炮id
         */
        DataCenter.prototype.getBatterIdByIndex = function (index) {
            return this.getBatterIdList()[index];
        };
        /**
         * 获取下注索引 通过炮id
         */
        DataCenter.prototype.getBatterIndex = function (batterId) {
            return this.getBatterIdList().find(function (v) { return v == batterId; });
        };
        /**
         * 获取炮id列表
         */
        DataCenter.prototype.getBatterIdList = function () {
            var level = game.RoomData.Instance.level;
            var config = table.TableBaseRuleConfigList.instance().first(function (v) { return v.level == level; });
            return config.betPointList;
        };
        /**
         * 通过batterId 获取下一个炮batterId
         */
        DataCenter.prototype.nextBatterId = function (batterId) {
            var batterIdList = this.getBatterIdList();
            var index = batterIdList.find(function (v) { return v == batterId; });
            var nextBatterId = batterIdList[index + 1];
            return nextBatterId == null ? batterIdList.last() : nextBatterId;
        };
        /**
         * 通过batterId 获取之前炮batterId
         */
        DataCenter.prototype.beforBatterId = function (batterId) {
            var batterIdList = this.getBatterIdList();
            var index = batterIdList.find(function (v) { return v == batterId; });
            var beforBatterId = batterIdList[index - 1];
            return beforBatterId == null ? batterIdList.first() : beforBatterId;
        };
        /**
         * 最小的炮id
         */
        DataCenter.prototype.minBatterId = function () {
            return this.getBatterIdList().first();
        };
        /**
         * 最大的炮id
         */
        DataCenter.prototype.maxBatterId = function () {
            return this.getBatterIdList().last();
        };
        /**
         * 获取奖章等级
         */
        DataCenter.prototype.getRuleConfigList = function () {
            var _this = this;
            return RES.getRes("TableGameRuleConfigList_json").filter(function (v) { return v.level == _this.level; });
        };
        /**
         * 获取道具信息
         */
        DataCenter.prototype.accessToProps = function (level) {
            return RES.getRes("TablePropConfig_json").filter(function (v) { return v.id == level; });
        };
        /**
         * 初始化房间数据
         */
        DataCenter.prototype._updataRoomData = function (rev) {
            if (!rev) {
                return;
            }
            if (!this.isInit) {
                this.isInit = true;
                this.roomID = rev.roomData.roomId;
                /*房间等级*/
                this.level = rev.roomData.level;
                this.batteryIDAry = this.getRuleConfigList()[0].batteryIds;
                EventManager.fireEvent(0 /* ROOM_LEVEL_UPDATE */, this.level);
                /*下注状态*/
                if (this.gameStatus == 2 /* BET */) {
                }
                else if (this.gameStatus == 3 /* LOTTERY */) {
                }
                else if (this.gameStatus == 4 /* SETTLE */) {
                }
                else if (this.gameStatus == 1 /* FREE */) {
                }
            }
        };
        /**
         * 释放
         */
        DataCenter.prototype.dispose = function () {
            GX.PokerEvent.Instance.gameStateUpdate.remove(this._gameStateUpdate, this);
            GX.PokerEvent.Instance.roomDataUpdateEvent.remove(this._updataRoomData, this);
            this.master.dispose();
            this.master = null;
        };
        /*单例*/
        DataCenter._instance = null;
        return DataCenter;
    }());
    FishingJoy.DataCenter = DataCenter;
    __reflect(DataCenter.prototype, "FishingJoy.DataCenter");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=DataCenter.js.map