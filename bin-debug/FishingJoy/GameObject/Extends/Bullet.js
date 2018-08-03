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
 * 子弹
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet() {
            var _this = _super.call(this) || this;
            /**
             * 注册操作id
             */
            _this._registerAry = [];
            /**
             * 伤害
             */
            _this.damage = 1;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            return _this;
        }
        Object.defineProperty(Bullet.prototype, "servelID", {
            /**
             * 服务器id
             */
            get: function () {
                return this.varsData.servelID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bullet.prototype, "playerID", {
            /**
             * 玩家id
             */
            get: function () {
                return this.varsData.playerUID;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化一次
         */
        Bullet.prototype.initOnce = function (data) {
            _super.prototype.initOnce.call(this, data);
            this.damage = data.damage;
            this.level = data.level;
            this.interval = data.interval;
            this.fastInterval = data.fastInterval;
        };
        /**
         * 初始化
         */
        Bullet.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            var bulletVars = this.varsData;
            if (bulletVars.operation == null) {
                console.assert(false, "子弹未注册operationID");
            }
            if (bulletVars.servelID == undefined) {
                console.assert(false, "子弹没有servelID");
            }
            this.targetFish = bulletVars.targetFish;
            this.isCollided = false;
            if (this.varsData.operation) {
                for (var i = 0; i < this.varsData.operation.length; i++) {
                    this._registerAry.push(manager.OperationManager.instance.registerOperation(this, this.varsData.operation[i].type));
                }
            }
        };
        /**
         * 反初始化
         */
        Bullet.prototype.uninitialize = function () {
            for (var i = 0; i < this._registerAry.length; i++) {
                manager.OperationManager.instance.unregisterOperation(this._registerAry[i]);
            }
            this._registerAry.length = 0;
            this.targetFish = null;
            _super.prototype.uninitialize.call(this);
        };
        /**
         * 击中鱼
         */
        Bullet.prototype._hitFish = function (hurtNum, fish, Bullet) {
            if (this.uID == Bullet.uID) {
                gameObject.GameObjectFactory.instance.recoverGameObject(this);
            }
        };
        /**
         * 释放
         */
        Bullet.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._registerAry.length = 0;
        };
        /**
         * 获取屏幕坐标
         */
        Bullet.prototype.getGrid = function () {
            console.info("子弹所在格子：" + this.grid[0]);
            return this.grid[0];
        };
        return Bullet;
    }(gameObject.GameObjectCollider));
    gameObject.Bullet = Bullet;
    __reflect(Bullet.prototype, "gameObject.Bullet");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=Bullet.js.map