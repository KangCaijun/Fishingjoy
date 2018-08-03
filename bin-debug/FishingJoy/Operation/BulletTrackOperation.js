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
 * 追踪弹移动
 * @author suo
 */
var operation;
(function (operation) {
    var BulletTrackOperation = (function (_super) {
        __extends(BulletTrackOperation, _super);
        function BulletTrackOperation() {
            return _super.call(this) || this;
        }
        /**
         * 注册
         */
        BulletTrackOperation.prototype.register = function (gameObj) {
            _super.prototype.register.call(this, gameObj);
            var varsData = gameObj.varsData;
            this.targetFish = varsData.targetFish;
        };
        /**
         * 帧循环
         */
        BulletTrackOperation.prototype.enterFrame = function () {
            var gameObj = this._gameObj;
            var targetFish = this.targetFish;
            if (targetFish && targetFish.isAlive && targetFish.isInView) {
                var fishLayer = manager.LayerManager.instance.getLayer(2 /* Fish */);
                var _a = [-1, -1], x = _a[0], y = _a[1];
                var isInAimView = false;
                if (targetFish.isAccurateCollider) {
                    for (var i = 0; i < targetFish.colliderAry.length; i++) {
                        var collider = targetFish.colliderAry[i];
                        _b = UIUtil.getGlobePos(collider), x = _b[0], y = _b[1];
                        if (UIUtil.inAimView(x, y)) {
                            isInAimView = true;
                            break;
                        }
                    }
                }
                else {
                    _c = UIUtil.getGlobePos(targetFish), x = _c[0], y = _c[1];
                    if (UIUtil.inAimView(x, y)) {
                        isInAimView = true;
                    }
                }
                if (isInAimView) {
                    var angle = GX.getRadianByPoint({ x: this.bornX, y: this.bornY }, { x: x, y: y });
                    var distTarget = GX.getDistanceByPoint({ x: this.bornX, y: this.bornY }, { x: x, y: y });
                    var time = game.GameTime.serverNow();
                    var leftTime = time - this.bornTime;
                    var distTotal = leftTime * (this._speed / 1000);
                    var offsetx = distTotal / distTarget * (x - this.bornX);
                    var offsety = distTotal / distTarget * (y - this.bornY);
                    gameObj.x = this.bornX + offsetx;
                    gameObj.y = this.bornY + offsety;
                    gameObj.rotation = angle;
                }
                else {
                    gameObj.targetFish = null;
                    _super.prototype.enterFrame.call(this);
                }
            }
            else {
                gameObj.targetFish = null;
                _super.prototype.enterFrame.call(this);
            }
            var _b, _c;
        };
        /**
         * 反注册
         */
        BulletTrackOperation.prototype.unregister = function () {
            _super.prototype.unregister.call(this);
            this.targetFish = null;
        };
        return BulletTrackOperation;
    }(operation.BulletOperation));
    operation.BulletTrackOperation = BulletTrackOperation;
    __reflect(BulletTrackOperation.prototype, "operation.BulletTrackOperation");
})(operation || (operation = {}));
//# sourceMappingURL=BulletTrackOperation.js.map