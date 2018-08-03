var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏对象创建工厂
 * @author suo
 */
var gameObject;
(function (gameObject_1) {
    var GameObjectFactory = (function () {
        function GameObjectFactory() {
            /**
             * 对象字典
             */
            this._objClassDic = new SimpleMap();
            /**
             * gid
             */
            this.gid = 0;
            var i;
            for (i = 10005 /* BULLET_SELF */; i < 10007 /* BULLET_SELF_3 */ + 1; i++) {
                this._objClassDic.set(i, gameObject.Bullet);
            }
            for (i = 10000 /* BULLET_OTHER */; i < 10002 /* BULLET_OTHER_3 */ + 1; i++) {
                this._objClassDic.set(i, gameObject.Bullet);
            }
            for (i = 30000 /* FishingNet_Green */; i < 30003 /* FishingNet_BLUE_3 */ + 1; i++) {
                this._objClassDic.set(i, gameObject.FishingNet);
            }
            for (i = 30005 /* FishingNet_Self */; i < 30007 /* FishingNet_BROWN_3 */ + 1; i++) {
                this._objClassDic.set(i, gameObject.FishingNet);
            }
            this._objClassDic.set(20000 /* BATTERY */, gameObject.Battery);
            this._objClassDic.set(40000 /* BURST */, gameObject.Burst);
            this._objClassDic.set(40001 /* MERMAID_EFF */, gameObject.MermaidEff);
            this._objClassDic.set(40002 /* DRAGON_EFF */, gameObject.DragonEff);
            for (var _i = 0, _a = table.TableFishConfig.instance(); _i < _a.length; _i++) {
                var item = _a[_i];
                this._objClassDic.set(item.sign, gameObject.Fish);
            }
        }
        Object.defineProperty(GameObjectFactory, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameObjectFactory();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 创建一个GameObject
         */
        GameObjectFactory.prototype.creatGameObject = function (sign, varsData, layerType) {
            if (varsData === void 0) { varsData = null; }
            if (layerType === void 0) { layerType = 2 /* Fish */; }
            var gameObj = null;
            gameObj = gameObject.GameObjectPool.instance.tryGetGameObjInPool(sign);
            /*资源池无此资源*/
            if (gameObj == null) {
                var className = this._objClassDic.get(sign);
                gameObj = new className();
                gameObj.setData(sign, this.gid, varsData, layerType);
                this._loadConfig(sign, gameObj);
            }
            else {
                gameObj.setData(sign, this.gid, varsData, layerType);
            }
            gameObj.initialize();
            this._writeInMap(gameObj, varsData);
            this.gid++;
            return gameObj;
        };
        /**
         * 对象回收
         */
        GameObjectFactory.prototype.recoverGameObject = function (gameObj) {
            if (gameObj == null) {
                console.assert(false, "gameObj为空！");
                return;
            }
            if (egret.is(gameObj, "gameObject.Bullet")) {
                EventManager.fireEvent(3 /* REMOVE_BULLET_IN_MAP */, gameObj.servelID);
            }
            else if (egret.is(gameObj, "gameObject.Fish")) {
                EventManager.fireEvent(5 /* REMOVE_FISH_IN_MAP */, gameObj.servelID);
            }
            gameObj.uninitialize();
            gameObject_1.GameObjectPool.instance.recoverGameObject(gameObj);
        };
        /**
         * 加载资源
         */
        GameObjectFactory.prototype._loadConfig = function (sign, gameObj) {
            var configData = gameObject_1.GameObjectConfigParse.configDic.get(sign);
            if (configData) {
                gameObj.loadAsset(configData.asset);
                gameObj.initOnce(configData.initOnceData);
            }
            else {
                console.assert(false, "找不到sign为" + sign + "资源配置！");
            }
        };
        /**
         * 写入字典
         */
        GameObjectFactory.prototype._writeInMap = function (gameObject, varsData) {
            if (egret.is(gameObject, "gameObject.Fish")) {
                var fishVar = varsData;
                EventManager.fireEvent(6 /* ADD_FISH_IN_MAP */, [fishVar.serveID, gameObject]);
            }
            else if (egret.is(gameObject, "gameObject.Bullet")) {
                var BulletVar = varsData;
                EventManager.fireEvent(4 /* ADD_BULLET_IN_MAP */, [BulletVar.servelID, gameObject]);
            }
        };
        /**
         * 释放
         */
        GameObjectFactory.prototype.dispose = function () {
            this._objClassDic.clear();
        };
        /**
         * 单例
         */
        GameObjectFactory._instance = null;
        return GameObjectFactory;
    }());
    gameObject_1.GameObjectFactory = GameObjectFactory;
    __reflect(GameObjectFactory.prototype, "gameObject.GameObjectFactory");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectFactory.js.map