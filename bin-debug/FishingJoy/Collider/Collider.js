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
 * 碰撞器
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var Collider = (function (_super) {
        __extends(Collider, _super);
        function Collider(executant) {
            var _this = _super.call(this) || this;
            if (!executant) {
                console.assert(false, "请使用Collider.creat方法！");
            }
            return _this;
            // this.visible = false;
        }
        /**
         * 建议使用此方法创建一个Collider
         */
        Collider.creat = function (x, y, radius) {
            var collider = Pool.getItemByCreateFun(Pool.collider, Handler.create(this, function () {
                return new Collider(new ColliderExecutant());
            }, null, true));
            collider.setTo(x, y, radius);
            return collider;
        };
        /**
         * 设值
         */
        Collider.prototype.setTo = function (x, y, radius) {
            this.radius = radius;
            this.x = x;
            this.y = y;
            this.posX = x;
            this.posY = y;
            if (uniLib.BrowersUtils.GetRequest("collider")) {
                this.graphics.beginFill(ColorUtil.COLOR_GREEN, 0.3);
                this.graphics.drawCircle(0, 0, radius);
                this.graphics.endFill();
            }
        };
        /**
         * 设值父物体
         */
        Collider.prototype.setParent = function (value) {
            value.addChild(this);
            this.host = value;
        };
        /**
         * 清除
         */
        Collider.prototype.clear = function () {
            this.graphics.clear();
            this.posX = NaN;
            this.posY = NaN;
            this.radius = NaN;
            this.host = null;
        };
        /**
         * 设置全局坐标
         */
        Collider.prototype.setGlobePos = function () {
            var p = this.localToGlobal(0, 0, this.globePosPoint);
            if (Master.instance.isRotation) {
                var layer = manager.LayerManager.instance.getLayer(2 /* Fish */);
                layer.localToGlobal(p.x, p.y, p);
            }
            this.globePosPoint = p;
        };
        /**
         * 是否相交
         */
        Collider.isIntersect = function (c1, c2) {
            var p1 = c1.globePosPoint;
            var p2 = c2.globePosPoint;
            var disx = p1.x - p2.x;
            var disy = p1.y - p2.y;
            var dist = c1.radius + c2.radius;
            if (disx > dist || disx < -dist || disy > dist || disy < -dist) {
                return false;
            }
            var disSquare = disx * disx + disy * disy;
            // let c1hostRotation: number = c1.host.rotation;
            // let c2hostRotation: number = c2.host.rotation;
            // let p1X: number = c1.x * Math.cos(c1hostRotation) - c1.y * Math.sin(c1hostRotation) + c1.host.x;
            // let p1Y: number = c1.y * Math.cos(c1hostRotation) + c1.x * Math.sin(c1hostRotation) + c1.host.y;
            // let p2X: number = c2.x * Math.cos(c2hostRotation) - c2.y * Math.sin(c2hostRotation) + c2.host.x;
            // let p2Y: number = c2.y * Math.cos(c2hostRotation) + c2.x * Math.sin(c2hostRotation) + c2.host.y;
            // let dis = Math.sqrt((p1X - p2X) * (p1X - p2X) + (p1Y - p2Y) * (p1Y - p2Y));
            if (disSquare < (dist * dist)) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 释放
         */
        Collider.prototype.recover = function () {
            this.clear();
            this.globePosPoint = null;
            Pool.recover(Pool.collider, this);
        };
        /**
         * 复用点
         */
        Collider.multiplexPoint = [new egret.Point(), new egret.Point()];
        return Collider;
    }(egret.Shape));
    FishingJoy.Collider = Collider;
    __reflect(Collider.prototype, "FishingJoy.Collider", ["gameObject.ICollider"]);
})(FishingJoy || (FishingJoy = {}));
var ColliderExecutant = (function () {
    function ColliderExecutant() {
    }
    return ColliderExecutant;
}());
__reflect(ColliderExecutant.prototype, "ColliderExecutant");
//# sourceMappingURL=Collider.js.map