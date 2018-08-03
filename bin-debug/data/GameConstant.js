var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 扑克常量
     */
    var GameConstant = (function () {
        function GameConstant() {
        }
        GameConstant.getSameGroupOffset = function () {
            if (this.curSameGroupNo > 2) {
                this.curSameGroupNo = 0;
            }
            return this.sameGroupOffset[this.curSameGroupNo++];
        };
        Object.defineProperty(GameConstant, "SeatPositonList", {
            /**
             * 座位坐标
             */
            get: function () {
                this.m_seatPositonList = [new egret.Point(300, 620), new egret.Point(980, 620),
                    new egret.Point(300, 100), new egret.Point(980, 100)];
                return this.m_seatPositonList;
            },
            enumerable: true,
            configurable: true
        });
        GameConstant.updataStageSize = function () {
            // egret.MainContext.instance.stage.setContentSize(1440, 720);
            if (!uniLib.ZQGameSdk["getNativeWH"])
                return;
            uniLib.ZQGameSdk["getNativeWH"](function (data) {
                if (data == null) {
                    egret.MainContext.instance.stage.setContentSize(1280, 720);
                }
                else {
                    if (data.cmd && data.cmd == uniLib.ZQGameSdk["NATIVE_WIDTH_HEIGHT"] && data.code != null && data.code == 0) {
                        var width = data.data != null && data.data.width != null ? data.data.width : null;
                        var height = data.data != null && data.data.height != null ? data.data.height : null;
                        if (width != null && height != null && (width / height) >= 2) {
                            egret.MainContext.instance.stage.setContentSize(1440, 720);
                        }
                        else {
                            egret.MainContext.instance.stage.setContentSize(1280, 720);
                        }
                    }
                    else {
                        egret.MainContext.instance.stage.setContentSize(1280, 720);
                    }
                }
            });
        };
        /**
         * 获取本地座位Id 通过服务器座位ID 在初始分配座位的使用
         */
        GameConstant.GetClientNoBySeatId = function (id) {
            var mainSeat = game.PokerFunction.MainSeatId;
            if (mainSeat < 3) {
                return id;
            }
            if (id == 4)
                return 1;
            if (id == 3)
                return 2;
            if (id == 2)
                return 3;
            if (id == 1)
                return 4;
            return id;
        };
        /**
         * 获取座位位置通过本地座位id
         */
        GameConstant.GetSeatPositionBySeatId = function (seatId) {
            var seatPoint = GameConstant.SeatPositonList[seatId - 1];
            return seatPoint;
        };
        /**
         * 获取座位位置通过本地座位id
         */
        GameConstant.GetSeatPositionByClientNo = function (clientNo) {
            var seatPoint = GameConstant.SeatPositonList[clientNo - 1];
            return seatPoint;
        };
        GameConstant.ResGroup_BY = "buyu_preload";
        /**
         * 同组鱼偏移
         */
        GameConstant.curSameGroupNo = 0;
        GameConstant.sameGroupOffset = [{ offsetX: 0, offsetY: 0 }, { offsetX: -210, offsetY: -105 }, { offsetX: -210, offsetY: 105 }];
        return GameConstant;
    }());
    game.GameConstant = GameConstant;
    __reflect(GameConstant.prototype, "game.GameConstant");
})(game || (game = {}));
//# sourceMappingURL=GameConstant.js.map