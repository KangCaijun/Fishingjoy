var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏对象管理器
 * @author suo
 */
var manager;
(function (manager) {
    var GameObjectManager = (function () {
        function GameObjectManager() {
            /**
             * 游戏工厂
             */
            this.gameObjectFactory = gameObject.GameObjectFactory.instance;
            /**
             * 游戏资源池
             */
            this.gameObjectPool = gameObject.GameObjectPool.instance;
            /**
             * 游戏对象配置管理
             */
            this.gameObjectConfig = new gameObject.GameObjectConfigParse();
        }
        Object.defineProperty(GameObjectManager, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new GameObjectManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 释放
         */
        GameObjectManager.prototype.dispose = function () {
            this.gameObjectPool.dispose();
            this.gameObjectPool = null;
            this.gameObjectFactory.dispose();
            this.gameObjectFactory = null;
            this.gameObjectConfig.dispose();
            this.gameObjectConfig = null;
        };
        /**
         * 单例
         */
        GameObjectManager._instance = null;
        return GameObjectManager;
    }());
    manager.GameObjectManager = GameObjectManager;
    __reflect(GameObjectManager.prototype, "manager.GameObjectManager");
})(manager || (manager = {}));
//# sourceMappingURL=GameObjectManager.js.map