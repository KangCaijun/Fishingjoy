var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对象池
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var GameObjectPool = (function () {
        function GameObjectPool() {
            /**
             * 最大缓存数量
             */
            this.MAX_CAHCHE_NUM = 300;
            /**
             * 当前缓存池内资源计数
             */
            this._curCacheObjNum = 0;
            /**
             * 一级缓存用于缓存只被用了一次的资源
             */
            this._objectFirstPool = new SimpleMap();
            /**
             * 二级缓存用于缓存经常使用的资源，从资源池拿去先从当前资源池拿取
             */
            this._objectSecondPool = new SimpleMap();
        }
        Object.defineProperty(GameObjectPool, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameObjectPool();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 尝试从对象池获取对象
         */
        GameObjectPool.prototype.tryGetGameObjInPool = function (sign) {
            /*先遍历二级缓存*/
            var gameObj = null;
            var gameObjAry;
            gameObjAry = this._objectSecondPool.get(sign);
            if (gameObjAry != null && gameObjAry.length > 0) {
                gameObj = gameObjAry.shift();
                this._curCacheObjNum--;
            }
            else {
                gameObjAry = this._objectFirstPool.get(sign);
                if (gameObjAry != null && gameObjAry.length > 0) {
                    //一级缓存有,就扔到二级缓存里
                    this._objectSecondPool.set(sign, gameObjAry);
                    this._objectFirstPool.remove(sign);
                    gameObj = gameObjAry.shift();
                    this._curCacheObjNum--;
                }
                else {
                }
            }
            if (gameObj != null) {
                gameObj.refCount++;
            }
            return gameObj;
        };
        /**
         * 对象回收
         */
        GameObjectPool.prototype.recoverGameObject = function (gameObj) {
            var gameObjFirstAry = null;
            var gameObjSecAry = null;
            // egret.log("资源池内缓存对象计数：" + this._curCacheObjNum);
            // this._calCacheNum();
            var sign = gameObj.sign;
            //对象被多次引用
            if (gameObj.refCount >= 1) {
                if (this._objectFirstPool.isExist(sign)) {
                    if (this._objectSecondPool.isExist(sign)) {
                        gameObjFirstAry = this._objectFirstPool.get(sign);
                        gameObjSecAry = this._objectSecondPool.get(sign);
                        for (var i = 0; i < gameObjFirstAry.length; i++) {
                            if (gameObjSecAry != null) {
                                gameObjSecAry.push(gameObjFirstAry[i]);
                            }
                            else {
                                console.assert(false, "逻辑有误！");
                            }
                        }
                        this._objectSecondPool.set(sign, gameObjSecAry);
                        this._objectFirstPool.remove(sign);
                    }
                    else {
                        gameObjFirstAry = this._objectFirstPool.get(sign);
                        this._objectSecondPool.set(sign, gameObjFirstAry);
                        this._objectFirstPool.remove(sign);
                    }
                }
                // else if (!this._objectSecondPool.isExist(sign)) {
                // 	console.assert(false, "逻辑有误！")
                // }
                gameObjFirstAry = this._objectSecondPool.get(sign);
                if (gameObjFirstAry == null) {
                    // console.assert(false, "数组为空！")
                    return;
                }
                if (gameObjFirstAry.indexOf(gameObj) == -1) {
                    gameObjFirstAry.push(gameObj);
                    this._curCacheObjNum++;
                }
            }
            else {
                if (this._objectFirstPool.isExist(gameObj.sign)) {
                    gameObjFirstAry = this._objectFirstPool.get(sign);
                    if (gameObjFirstAry.indexOf(gameObj) == -1) {
                        gameObjFirstAry.push(gameObj);
                        this._curCacheObjNum++;
                    }
                }
                else {
                    gameObjFirstAry = new Array();
                    gameObjFirstAry.push(gameObj);
                    this._curCacheObjNum++;
                }
                /*刚存进 不能马上被释放*/
                this._objectFirstPool.set(sign, gameObjFirstAry);
            }
            if (this._curCacheObjNum > this.MAX_CAHCHE_NUM) {
                this._cleanFirstPool();
            }
        };
        /**
         * 清理资源池 清理所有一级缓存
         */
        GameObjectPool.prototype._cleanFirstPool = function () {
            this._clearPool(this._objectFirstPool);
            if (this._curCacheObjNum >= this.MAX_CAHCHE_NUM) {
                this._deepCleanCachePool();
            }
        };
        /**
         * 清理二级缓存
         */
        GameObjectPool.prototype._deepCleanCachePool = function () {
            this._clearPool(this._objectSecondPool);
        };
        /**
         * 清理缓存
         */
        GameObjectPool.prototype._clearPool = function (cacheMap) {
            var len = cacheMap.length;
            var gameObjAry = null;
            var deleteObjNum = 0;
            for (var i = 0; i < len; i++) {
                gameObjAry = cacheMap.getByKeyIndex(i);
                var tempAry = [];
                for (var j = 0; j < gameObjAry.length; j++) {
                    if (gameObjAry[j].canDispose) {
                        deleteObjNum += 1;
                        gameObjAry[j].dispose();
                        gameObjAry[j] = null;
                    }
                    else {
                        tempAry.push(gameObjAry[j]);
                    }
                }
                gameObjAry = tempAry;
                cacheMap.set(cacheMap.keys[i], gameObjAry);
            }
            this._curCacheObjNum -= deleteObjNum;
        };
        /**
         * 释放
         */
        GameObjectPool.prototype.dispose = function () {
            this._clearPool(this._objectFirstPool);
            this._clearPool(this._objectSecondPool);
            this._objectFirstPool.clear();
            this._objectSecondPool.clear();
        };
        /**
         * 单例
         */
        GameObjectPool._instance = null;
        return GameObjectPool;
    }());
    gameObject.GameObjectPool = GameObjectPool;
    __reflect(GameObjectPool.prototype, "gameObject.GameObjectPool");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectPool.js.map