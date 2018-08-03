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
 * 带碰撞器的物体对象
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var GameObjectCollider = (function (_super) {
        __extends(GameObjectCollider, _super);
        function GameObjectCollider() {
            var _this = _super.call(this) || this;
            /**
             * 在屏幕的哪个格子里
             */
            _this.grid = [];
            /**
             * 碰撞器
             */
            _this.colliderAry = [];
            /**
             * 是否已经发生碰撞
             */
            _this.isCollided = false;
            /**
             * 是否需要精准碰撞检测
             */
            _this.isAccurateCollider = false;
            return _this;
        }
        /**
         * 初始化一次
         */
        GameObjectCollider.prototype.initOnce = function (data) {
            for (var i = 0; i < data.colliderAry.length; i++) {
                var colliderData = data.colliderAry[i];
                var collider = FishingJoy.Collider.creat(colliderData.posX, colliderData.posY, colliderData.radius);
                collider.setParent(this);
                this.colliderAry.push(collider);
            }
            if (data.isAccurateCollider) {
                this.isAccurateCollider = data.isAccurateCollider;
            }
        };
        /**
         * 反初始化
         */
        GameObjectCollider.prototype.uninitialize = function () {
            this.isCollided = false;
            this.clearGridIndex();
            _super.prototype.uninitialize.call(this);
        };
        /**
         * 释放
         */
        GameObjectCollider.prototype.dispose = function () {
            if (this.colliderAry.length != 0) {
                for (var i = 0; i < this.colliderAry.length; i++) {
                    this.colliderAry[i].recover();
                }
                this.colliderAry.length = 0;
            }
            _super.prototype.dispose.call(this);
        };
        /**
         * 添加一个屏幕格子坐标
         */
        GameObjectCollider.prototype.pushGridIndex = function (index) {
            if (this.grid.indexOf(index) == -1) {
                this.grid.push(index);
            }
        };
        /**
         * 清除屏幕坐标
         */
        GameObjectCollider.prototype.clearGridIndex = function () {
            if (this.grid.length != 0) {
                this.grid.length = 0;
            }
        };
        /**
         * 是否在该屏幕坐标内
         */
        GameObjectCollider.prototype.isExistGrid = function (gridIndex) {
            return this.grid.indexOf(gridIndex) != -1;
        };
        /**
         * 是否相交
         */
        GameObjectCollider.isIntersect = function (gameObjA, gameObjB) {
            var gridA = gameObjA.grid;
            var gridB = gameObjB.grid;
            for (var i = 0; i < gridA.length; i++) {
                if (gameObjB.isExistGrid(gridA[i])) {
                    return true;
                }
            }
            return false;
        };
        return GameObjectCollider;
    }(gameObject.GameObjectRender));
    gameObject.GameObjectCollider = GameObjectCollider;
    __reflect(GameObjectCollider.prototype, "gameObject.GameObjectCollider");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectCollider.js.map