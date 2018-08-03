var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 操作管理器 广义操作管理器  不光包括玩家操作 还包括子弹轨迹 存在注册具体操作方式不一样而已
 * @author suo
 */
var manager;
(function (manager) {
    var OperationManager = (function () {
        function OperationManager() {
            /**
             * 已注册的操作行为字典
             */
            this._resgisterOprDic = new Dictionary();
            /**
             * 操作类型映射字典
             */
            this._operationClsDic = new Dictionary();
            /**
             * 注册ID
             */
            this._registerID = -1;
            this._operationClsDic.set(0 /* MASTER */, operation.MasterBatteryOperation);
            this._operationClsDic.set(1 /* BULLET */, operation.BulletOperation);
            this._operationClsDic.set(2 /* BulletTrack */, operation.BulletTrackOperation);
            this._operationClsDic.set(3 /* SIMPLE */, operation.SimpleOperation);
            this._operationClsDic.set(4 /* FISH */, operation.FishOperation);
            this._operationClsDic.set(5 /* BATTERY */, operation.BatteryOperation);
            Laya.timer.frameLoop(1, this, this._update);
        }
        /**
         * 快速离场
         */
        OperationManager.prototype.leaveQuickly = function () {
            var resgisterOprDic = this._resgisterOprDic;
            var values = resgisterOprDic.keys;
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var item = values_1[_i];
                var object = resgisterOprDic.get(item);
                if (egret.is(object, "operation.FishOperation")) {
                    var data = object;
                    var speed = data.speed;
                    var spawnTime = data.spawnTime;
                    var leftTime = (game.GameTime.serverNow() - spawnTime);
                    var distTotal = speed * leftTime;
                    data.speed = 1;
                    var needTime = distTotal / data.speed;
                    data.spawnTime += (leftTime - needTime);
                }
            }
        };
        Object.defineProperty(OperationManager, "instance", {
            /**
             * 获取单例
             */
            get: function () {
                if (this._instance == void 0) {
                    this._instance = new OperationManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新
         */
        OperationManager.prototype._update = function () {
            var resgisterOprDic = this._resgisterOprDic;
            var values = resgisterOprDic.keys;
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var item = values_2[_i];
                resgisterOprDic.get(item).enterFrame();
            }
            // console.error("行为对象池:" + values.length)
        };
        /**
         * 对某个对象 注册操作方式 返回注册id用于反注册
         */
        OperationManager.prototype.registerOperation = function (gameObj, opeartionType) {
            if (gameObj == null) {
                console.assert(false, "注册对象为空！");
            }
            var cls = this._operationClsDic.get(opeartionType);
            if (cls == null) {
                console.assert(false, "operation 未被注册！");
            }
            var registerOperation = new cls();
            registerOperation.operationType = opeartionType;
            registerOperation.register(gameObj);
            this._registerID++;
            this._resgisterOprDic.set(this._registerID, registerOperation);
            return this._registerID;
        };
        /**
         * 反注册操作
         */
        OperationManager.prototype.unregisterOperation = function (registerID) {
            if (registerID == -1) {
                return;
            }
            var operation = this._resgisterOprDic.get(registerID);
            if (operation != null) {
                // Pool.recover("operation" + operation.operationType, operation);
                operation.unregister();
                operation = null;
                this._resgisterOprDic.remove(registerID);
            }
            else {
                // console.assert(false, "registerID不存在！")
            }
        };
        /**
         * 释放
         */
        OperationManager.prototype.dispose = function () {
            Laya.timer.clear(this, this._update);
            this._resgisterOprDic.clear();
            this._resgisterOprDic = null;
            this._operationClsDic.clear();
            this._operationClsDic = null;
        };
        return OperationManager;
    }());
    manager.OperationManager = OperationManager;
    __reflect(OperationManager.prototype, "manager.OperationManager");
})(manager || (manager = {}));
//# sourceMappingURL=OperationManager.js.map