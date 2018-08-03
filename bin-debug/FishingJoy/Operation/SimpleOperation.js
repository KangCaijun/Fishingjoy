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
 * 简易操作类型
 * @author suo
 */
var operation;
(function (operation) {
    var SimpleOperation = (function (_super) {
        __extends(SimpleOperation, _super);
        function SimpleOperation() {
            return _super.call(this) || this;
        }
        /**
         * 注册
         */
        SimpleOperation.prototype.register = function (gameObj) {
            this._gameObj = gameObj;
            var time = MathUtil.random(5000, 15000);
            // if (gameObj.varsData.operation.direction) {
            // 	let tween: egret.Tween = egret.Tween.get(gameObj)
            // 	if (gameObj.varsData.operation.direction == OPERATION_DIRECTION.DOWN) {
            // 		gameObj.rotation = 90;
            // 		tween.to({ y: 720 }, time).call(this._onTweenComplete, this)
            // 	}
            // 	else if (gameObj.varsData.operation.direction == OPERATION_DIRECTION.LEFT) {
            // 		gameObj.rotation = 180;
            // 		tween.to({ x: 0 }, time).call(this._onTweenComplete, this)
            // 	}
            // 	else if (gameObj.varsData.operation.direction == OPERATION_DIRECTION.RIGHT) {
            // 		gameObj.rotation = 0;
            // 		tween.to({ x: 1280 }, time).call(this._onTweenComplete, this)
            // 	}
            // 	else if (gameObj.varsData.operation.direction == OPERATION_DIRECTION.UP) {
            // 		gameObj.rotation = 270;
            // 		tween.to({ y: 0 }, time).call(this._onTweenComplete, this)
            // 	}
            // }
        };
        /**
         * 缓动完毕
         */
        SimpleOperation.prototype._onTweenComplete = function () {
            if (this._gameObj) {
                if (this._gameObj instanceof gameObject.Fish) {
                    if (this._gameObj.isAlive) {
                        gameObject.GameObjectFactory.instance.recoverGameObject(this._gameObj);
                    }
                }
            }
        };
        /**
         * 反注册
         */
        SimpleOperation.prototype.unregister = function () {
            egret.Tween.removeTweens(this._gameObj);
            this._gameObj = null;
        };
        return SimpleOperation;
    }(operation.BaseOperation));
    operation.SimpleOperation = SimpleOperation;
    __reflect(SimpleOperation.prototype, "operation.SimpleOperation");
})(operation || (operation = {}));
//# sourceMappingURL=SimpleOperation.js.map