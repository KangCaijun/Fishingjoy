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
 * 鱼操作类型
 * @author suo
 */
var operation;
(function (operation) {
    var FishOperation = (function (_super) {
        __extends(FishOperation, _super);
        function FishOperation() {
            var _this = _super.call(this) || this;
            /**
             * GM
             */
            _this.gmShape = [];
            _this.pathIndex = 0;
            _this.endRotation = null;
            return _this;
        }
        /**
         * 注册
         */
        FishOperation.prototype.register = function (gameObj) {
            this.pathIndex = 0;
            this._gameObj = gameObj;
            var varsData = gameObj.varsData;
            var pathId = varsData.pathId;
            var fishPath = table.TableFishPath.getFishPath(pathId);
            this.pathConfig = fishPath.pathConfig;
            if (!FishOperation.isPathLeavePoint[pathId]) {
                FishOperation.isPathLeavePoint[pathId] = true;
                this.leaveScenePoint();
            }
            this.spawnTime = varsData.spawnTime;
            this.speed = gameObj.speed;
            this.fishSubscript = varsData.serveID;
            this.offsetX = varsData.offsetX == null ? 0 : varsData.offsetX;
            this.offsetY = varsData.offsetY == null ? 0 : varsData.offsetY;
            var curPath = this.pathConfig.first();
            var nextPath = this.pathConfig[1];
            var radian = curPath.angle - 90;
            this.curPath = curPath;
            this.nextPath = nextPath;
            gameObj.rotation = -1;
            var config = gameObject.GameObjectConfigParse.configDic.get(gameObj.sign);
            var tableConfig = config.table;
            if (tableConfig.specialFish) {
                var specialNowTime = game.GameTime.serverNow() + 15000;
                var lastPath = this.pathConfig.last();
                var leaveTime = varsData.spawnTime + lastPath.distTotal / this.speed - 5000;
                var timer = leaveTime - specialNowTime;
                if (timer > 0) {
                    this.specialTimer = game.Timer.setTimeout(function () {
                        if (tableConfig.sign == 2001 /* DRAGON */) {
                            FishingJoy.FishingJoyLogic.instance.onFreeGame(2, true);
                        }
                        else if (tableConfig.sign == 2002 /* MERMAID */) {
                            FishingJoy.FishingJoyLogic.instance.onFreeGame(4, true);
                        }
                    }, this, timer);
                }
            }
            // if (gameObj.sign == GAMEOBJECT_SIGN.MERMAID) {
            // 	gameObj.rotation = 0;
            // }
        };
        /**
         * 增加离开场景的点
         */
        FishOperation.prototype.leaveScenePoint = function () {
            var lastPath = this.pathConfig.last();
            var lastBeforePath = this.pathConfig[this.pathConfig.length - 2];
            var dist = lastBeforePath.distNext;
            var pathConfigItem = new table.TableFishPath.PathConfigItem();
            var moivePlayer = this._gameObj.MoivePlayer;
            var sign = this._gameObj.sign;
            var bodyLength = (sign == 2002 /* MERMAID */ || sign == 2001 /* DRAGON */) ? 700 : 300;
            pathConfigItem.x = lastBeforePath.x + (lastPath.x - lastBeforePath.x) / dist * (dist + bodyLength);
            pathConfigItem.y = lastBeforePath.y + (lastPath.y - lastBeforePath.y) / dist * (dist + bodyLength);
            var distLast = GX.getDistanceByPoint({ x: lastPath.x, y: lastPath.y }, { x: pathConfigItem.x, y: pathConfigItem.y });
            var distTotal = lastPath.distTotal + distLast;
            lastPath.distNext = distLast;
            pathConfigItem.angle = lastPath.angle;
            pathConfigItem.distNext = 0;
            pathConfigItem.distTotal = distTotal;
            this.pathConfig.push(pathConfigItem);
        };
        /**
         * 帧循环
         */
        FishOperation.prototype.enterFrame = function () {
            /*移动时间*/
            var gameObj = this._gameObj;
            var leftTime = game.GameTime.serverNow() - this.spawnTime;
            if (leftTime < 0) {
                gameObj.x = -1000;
                gameObj.y = -1000;
                return;
            }
            /*当前已移动距离*/
            var curMoveDistance = leftTime * this.speed;
            var config = this.pathConfig;
            var lastPath = config.last();
            /*已经走完全程*/
            if (curMoveDistance > lastPath.distTotal) {
                if (gameObj.sign == 2001 /* DRAGON */
                    || gameObj.sign == 2002 /* MERMAID */) {
                    var varsData = gameObj.varsData;
                    FishingJoy.FishingJoyLogic.instance.changeScene(null, null, true, true);
                    FishingJoy.FishingJoyLogic.instance.freePromptCloses();
                    // FishingJoy.FishingJoyLogic.instance.changeScene(null, null, true, !varsData.reconnection)
                }
                gameObject.GameObjectFactory.instance.recoverGameObject(gameObj);
                return;
            }
            if (curMoveDistance > this.nextPath.distTotal) {
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
            curPath = curPath == null ? lastPath : curPath;
            nextPath = nextPath == null ? lastPath : nextPath;
            var distNext = curPath.distNext; // GX.getDistanceByPoint({ x: curPath.x, y: curPath.y }, { x: nextPath.x, y: nextPath.y });
            var offsetDist = curMoveDistance - curPath.distTotal;
            var offsetx = offsetDist / distNext * (nextPath.x - curPath.x);
            var offsety = offsetDist / distNext * (nextPath.y - curPath.y);
            gameObj.x = (curPath.x + offsetx - this.offsetX);
            gameObj.y = (curPath.y + offsety - this.offsetY);
            // if (gameObj.sign != GAMEOBJECT_SIGN.MERMAID) {
            var tableAngle = curPath.angle;
            if (gameObj.sign == 2001 /* DRAGON */) {
                if (tableAngle > 200) {
                    gameObj.scaleY = Master.instance.isRotation ? 1 : -1;
                    tableAngle = 270;
                }
                else {
                    gameObj.scaleY = Master.instance.isRotation ? -1 : 1;
                    tableAngle = 90;
                }
            }
            else if (gameObj.sign == 2002 /* MERMAID */) {
                if (tableAngle > 200) {
                    tableAngle = 360;
                }
                else {
                    tableAngle = 180;
                }
            }
            var angle = tableAngle - 90;
            this.smoothRotation(angle);
            // if (GM.instance.isOpen(GM.Type.FishPath)) {
            // 	var circle: egret.Shape = new egret.Shape();
            // 	circle.x = this._gameObj.x;
            // 	circle.y = this._gameObj.y;
            // 	circle.graphics.beginFill(0xff0000, 1);
            // 	circle.graphics.drawCircle(0, 0, 5);
            // 	circle.graphics.endFill();
            // 	let fishLayer = manager.LayerManager.instance.getLayer(LAYER.Fish);
            // 	fishLayer.addChild(circle);
            // 	this.gmShape.push(circle);
            // }
        };
        /**
         * 路径平滑处理
         */
        FishOperation.prototype.smoothRotation = function (end) {
            var gameObj = this._gameObj;
            if (gameObj.rotation == -1) {
                gameObj.rotation = end;
                return;
            }
            if (this.endRotation == end)
                return;
            var rotation = gameObj.rotation;
            var diff = end - rotation;
            if (diff < -180) {
                end += 360;
            }
            else if (diff > 180) {
                end -= 360;
            }
            egret.Tween.removeTweens(gameObj);
            egret.Tween.get(gameObj).to({ rotation: end }, 500).call(function () { egret.Tween.removeTweens(gameObj); });
            this.endRotation = end;
        };
        /**
         * 反注册
         */
        FishOperation.prototype.unregister = function () {
            egret.Tween.removeTweens(this._gameObj);
            // let fishLayer = manager.LayerManager.instance.getLayer(LAYER.Fish);
            // for (let item of this.gmShape) {
            // 	if (item.parent)
            // 		fishLayer.removeChild(item);
            // }
            // this.gmShape.length = 0;
            game.Timer.clearTimeout(this.specialTimer);
            this.curPath = null;
            this.nextPath = null;
            this._gameObj = null;
        };
        /**
         * 路径是否已经添加离开的点
         */
        FishOperation.isPathLeavePoint = {};
        return FishOperation;
    }(operation.BaseOperation));
    operation.FishOperation = FishOperation;
    __reflect(FishOperation.prototype, "operation.FishOperation");
})(operation || (operation = {}));
//# sourceMappingURL=FishOperation.js.map