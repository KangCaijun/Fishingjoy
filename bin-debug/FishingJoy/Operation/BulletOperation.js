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
 * 子弹移动
 * @author suo
 */
var operation;
(function (operation_1) {
    var BulletOperation = (function (_super) {
        __extends(BulletOperation, _super);
        function BulletOperation() {
            var _this = _super.call(this) || this;
            /**
             * 子弹速度
             */
            _this.BULLET_SPEED = 800;
            /**
             * 出生时间
             */
            _this.bornTime = -1;
            /**
             * 旋转度数
             */
            _this.rotation = -1;
            /**
             * 路径配置
             */
            _this.pathConfig = [];
            /**
             * GM
             */
            _this.gmShape = [];
            /**
             * 移动速度
             */
            _this._speed = _this.BULLET_SPEED;
            _this.pathIndex = 0;
            return _this;
        }
        /**
         * 注册
         */
        BulletOperation.prototype.register = function (gameObj) {
            this.pathIndex = 0;
            this._gameObj = gameObj;
            var varsData = gameObj.varsData;
            var operation = gameObj.varsData.operation[0];
            this.rotation = operation.rotation;
            this.bornTime = operation.bornTime;
            this.bornX = gameObj.varsData.bornX;
            this.bornY = gameObj.varsData.bornY;
            if (operation.speed) {
                this._speed = operation.speed;
            }
            var seatData = game.PokerFunction.GetSeatDataByUid(varsData.playerUID);
            if (seatData == null)
                return;
            var seatId = seatData.seatId;
            gameObj.x = this.bornX;
            gameObj.y = this.bornY;
            var bornX = this.bornX;
            var bornY = this.bornY;
            var rotation = this.rotation;
            var distTotal = 0;
            this.pathConfig.push({ x: bornX, y: bornY, angle: rotation, distNext: 0, distTotal: distTotal });
            for (var i = 0; i < 5; i++) {
                this.addBordPoint();
            }
            this.curPath = this.pathConfig.first();
            this.nextPath = this.pathConfig[1];
            if (GM.instance.isOpen(GM.Type.BulletPath)) {
                var bulletLayer = manager.LayerManager.instance.getLayer(4 /* Bullet */);
                var shp = new egret.Shape();
                shp.graphics.lineStyle(2, 0x00ff00);
                for (var _i = 0, _a = this.pathConfig; _i < _a.length; _i++) {
                    var item = _a[_i];
                    shp.graphics.lineTo(item.x, item.y);
                    bulletLayer.addChild(shp);
                    var circle = new egret.Shape();
                    circle.x = item.x;
                    circle.y = item.y;
                    circle.graphics.beginFill(0xff0000, 1);
                    circle.graphics.drawCircle(0, 0, 50);
                    circle.graphics.endFill();
                    bulletLayer.addChild(circle);
                    this.gmShape.push(circle);
                }
                shp.graphics.endFill();
                this.gmShape.push(shp);
            }
        };
        /**
        * 是否在边界内
        */
        BulletOperation.prototype.inBorder = function (x, y) {
            if (x < -100 || x > uniLib.Global.screenWidth + 100) {
                return false;
            }
            if (y < -100 || y > uniLib.Global.screenHeight + 100) {
                return false;
            }
            return true;
        };
        BulletOperation.prototype.addBordPoint = function () {
            var config = this.pathConfig.last();
            var bordPoint = GX.getBorderPoint({ x: config.x, y: config.y }, config.angle);
            var distLast = GX.getDistanceByPoint({ x: bordPoint.x, y: bordPoint.y }, { x: config.x, y: config.y });
            var distTotal = config.distTotal + distLast;
            this.pathConfig.push({ x: bordPoint.x, y: bordPoint.y, angle: bordPoint.angle, distNext: 0, distTotal: distTotal });
            config.distNext = distLast;
            if (distTotal - config.distTotal < 200) {
                this.addBordPoint();
            }
        };
        /**
         * 帧循环
         */
        BulletOperation.prototype.enterFrame = function () {
            var gameObj = this._gameObj;
            var time = game.GameTime.serverNow();
            var leftTime = time - this.bornTime;
            var curMoveDistance = leftTime * (this._speed / 1000);
            // console.log("子弹时间：" + leftTime)
            var config = this.pathConfig;
            var lastConfg = config.last();
            if (curMoveDistance > this.curPath.distTotal) {
                var configLength = config.length;
                for (var i = this.pathIndex; i < configLength; i++) {
                    if (config[i].distTotal > curMoveDistance) {
                        this.pathIndex = i;
                        this.nextPath = config[i];
                        this.curPath = config[i - 1];
                        break;
                    }
                }
            }
            var curPath = this.curPath;
            var nextPath = this.nextPath;
            curPath = curPath == null ? lastConfg : curPath;
            nextPath = nextPath == null ? lastConfg : nextPath;
            gameObj.rotation = curPath.angle;
            var distNext = curPath.distNext;
            var offsetDist = curMoveDistance - curPath.distTotal;
            var offsetx = offsetDist / distNext * (nextPath.x - curPath.x);
            var offsety = offsetDist / distNext * (nextPath.y - curPath.y);
            gameObj.x = curPath.x + offsetx;
            gameObj.y = curPath.y + offsety;
            if (nextPath == lastConfg) {
                this.addBordPoint();
                this.addBordPoint();
            }
            if (!this.inBorder(gameObj.x, gameObj.y)) {
                gameObject.GameObjectFactory.instance.recoverGameObject(gameObj);
            }
        };
        /**
         * 反注册
         */
        BulletOperation.prototype.unregister = function () {
            for (var _i = 0, _a = this.gmShape; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.parent)
                    item.parent.removeChild(item);
            }
            this._gameObj = null;
            this.pathConfig.length = 0;
        };
        return BulletOperation;
    }(operation_1.BaseOperation));
    operation_1.BulletOperation = BulletOperation;
    __reflect(BulletOperation.prototype, "operation.BulletOperation");
})(operation || (operation = {}));
//# sourceMappingURL=BulletOperation.js.map