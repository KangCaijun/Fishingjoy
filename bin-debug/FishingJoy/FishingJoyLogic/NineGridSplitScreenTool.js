var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 九格分屏
 * @author suo
 */
var Point = egret.Point;
var FishingJoy;
(function (FishingJoy) {
    var NineGridSplitScreenTool = (function () {
        function NineGridSplitScreenTool() {
            this.pic = new egret.Shape();
        }
        NineGridSplitScreenTool.initValue = function () {
            var width = (uniLib.Global.screenWidth + 200) / 3;
            var height = (uniLib.Global.screenHeight + 200) / 3;
            this.firstLineX = -100 + width;
            this.firstLineY = -100 + height;
            this.secondLineX = -100 + width * 2;
            this.secondLineY = -100 + height * 2;
        };
        // public showNineGrid(isShow: boolean): void {
        // 	let a: egret.Shape = this.pic;
        // 	if (isShow) {
        // 		a.graphics.beginFill(ColorUtil.COLOR_GOLD);
        // 		a.graphics.drawRect(this._lineX, 0, 1, uniLib.Global.screenHeight)
        // 		a.graphics.drawRect(this._lineX2, 0, 1, uniLib.Global.screenHeight);
        // 		a.graphics.drawRect(0, this._lineY, uniLib.Global.screenWidth, 1);
        // 		a.graphics.drawRect(0, this._lineY2, uniLib.Global.screenWidth, 1);
        // 		a.graphics.endFill();
        // 		manager.LayerManager.instance.addToLayer(a, LAYER.EFFECT);
        // 	}
        // 	else {
        // 		a.graphics.clear();
        // 		manager.LayerManager.instance.removeFromLayer(a, LAYER.EFFECT);
        // 		for (let i: number = Grid.Grid_1; i < Grid.Grid_9 + 1; i++) {
        // 			let gameObjAry: gameObject.GameObjectCollider[] = this.NineGridMap.get(i)
        // 			gameObjAry.length = 0;
        // 		}
        // 	}
        // }
        /**
         * 设置在哪一个格子
         */
        NineGridSplitScreenTool.setGridIndex = function (gameObj, simpleMap) {
            gameObj.clearGridIndex();
            /*适用于长鱼 计算每个碰撞器的位置 计算量稍大*/
            if (gameObj.isAccurateCollider) {
                var len = gameObj.colliderAry.length;
                for (var i = 0; i < len; i++) {
                    var collider = gameObj.colliderAry[i];
                    this.analyseGridMap(collider.globePosPoint.x, collider.globePosPoint.y, gameObj, simpleMap);
                }
            }
            else {
                this.analyseGridMap(gameObj.x, gameObj.y, gameObj, simpleMap);
            }
        };
        // /**
        //  * 精准计算碰撞器所在格子 计算量大
        //  */
        // public static Z(gameObj: gameObject.GameObjectCollider): void {
        //     let colliderAry: Collider[] = gameObj.colliderAry;
        //     let colliderAryLen: number = colliderAry.length;
        //     let compare1: Collider = Collider.creat(this.firstLineX, this.firstLineY, 0);
        //     let compare2: Collider = Collider.creat(this.secondLineX, this.firstLineY, 0);
        //     let compare3: Collider = Collider.creat(this.firstLineX, this.secondLineY, 0);
        //     let compare4: Collider = Collider.creat(this.secondLineX, this.secondLineY, 0);
        //     for (let i: number = 0; i < colliderAryLen; i++) {
        //         let collider: Collider = colliderAry[i];
        //         if (Collider.isIntersect(collider, compare1)) {
        //             gameObj.pushGridIndex(Grid.Grid_1);
        //             gameObj.pushGridIndex(Grid.Grid_2);
        //             gameObj.pushGridIndex(Grid.Grid_4);
        //             gameObj.pushGridIndex(Grid.Grid_5);
        //         }
        //         if (Collider.isIntersect(collider, compare2)) {
        //             gameObj.pushGridIndex(Grid.Grid_2);
        //             gameObj.pushGridIndex(Grid.Grid_3);
        //             gameObj.pushGridIndex(Grid.Grid_5);
        //             gameObj.pushGridIndex(Grid.Grid_6);
        //         }
        //         if (Collider.isIntersect(collider, compare3)) {
        //             gameObj.pushGridIndex(Grid.Grid_4);
        //             gameObj.pushGridIndex(Grid.Grid_5);
        //             gameObj.pushGridIndex(Grid.Grid_7);
        //             gameObj.pushGridIndex(Grid.Grid_8);
        //         }
        //         if (Collider.isIntersect(collider, compare4)) {
        //             gameObj.pushGridIndex(Grid.Grid_5);
        //             gameObj.pushGridIndex(Grid.Grid_6);
        //             gameObj.pushGridIndex(Grid.Grid_8);
        //             gameObj.pushGridIndex(Grid.Grid_9);
        //         }
        //     }
        // }
        /**
         * 写入字典
         */
        NineGridSplitScreenTool.writeInMap = function (gridIndex, gameObj, simpleMap) {
            var gameObjAry = simpleMap.get(gridIndex);
            if (gameObjAry == null) {
                gameObjAry = new Array();
                simpleMap.set(gridIndex, gameObjAry);
            }
            if (gameObjAry.indexOf(gameObj) == -1) {
                gameObjAry.push(gameObj);
            }
        };
        /**
         * 分析在哪个格子里
         */
        NineGridSplitScreenTool.analyseGrid = function (gameObj) {
            var firstLineX = this.firstLineX;
            var secondLineX = this.secondLineX;
            var firstLineY = this.firstLineY;
            var secondLineY = this.secondLineY;
            var x = gameObj.x;
            var y = gameObj.y;
            if (UIUtil.inBorder(x, y)) {
                /*第一行*/
                if (y < firstLineY) {
                    if (x < firstLineX) {
                        gameObj.pushGridIndex(1 /* Grid_1 */);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        gameObj.pushGridIndex(2 /* Grid_2 */);
                    }
                    else if (x >= secondLineX) {
                        gameObj.pushGridIndex(3 /* Grid_3 */);
                    }
                }
                else if (y < secondLineY && y >= firstLineY) {
                    if (x < firstLineX) {
                        gameObj.pushGridIndex(4 /* Grid_4 */);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        gameObj.pushGridIndex(5 /* Grid_5 */);
                    }
                    else if (x >= secondLineX) {
                        gameObj.pushGridIndex(6 /* Grid_6 */);
                    }
                }
                else {
                    if (x < firstLineX) {
                        gameObj.pushGridIndex(7 /* Grid_7 */);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        gameObj.pushGridIndex(8 /* Grid_8 */);
                    }
                    else if (x >= secondLineX) {
                        gameObj.pushGridIndex(9 /* Grid_9 */);
                    }
                }
            }
        };
        /**
         * 分析在哪个格子里
         */
        NineGridSplitScreenTool.analyseGridMap = function (x, y, gameObj, simpleMap) {
            var firstLineX = this.firstLineX;
            var secondLineX = this.secondLineX;
            var firstLineY = this.firstLineY;
            var secondLineY = this.secondLineY;
            if (UIUtil.inBorder(x, y)) {
                /*第一行*/
                if (y < firstLineY) {
                    if (x < firstLineX) {
                        this.writeInMap(1 /* Grid_1 */, gameObj, simpleMap);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        this.writeInMap(2 /* Grid_2 */, gameObj, simpleMap);
                    }
                    else if (x >= secondLineX) {
                        this.writeInMap(3 /* Grid_3 */, gameObj, simpleMap);
                    }
                }
                else if (y < secondLineY && y >= firstLineY) {
                    if (x < firstLineX) {
                        this.writeInMap(4 /* Grid_4 */, gameObj, simpleMap);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        this.writeInMap(5 /* Grid_5 */, gameObj, simpleMap);
                    }
                    else if (x >= secondLineX) {
                        this.writeInMap(6 /* Grid_6 */, gameObj, simpleMap);
                    }
                }
                else {
                    if (x < firstLineX) {
                        this.writeInMap(7 /* Grid_7 */, gameObj, simpleMap);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        this.writeInMap(8 /* Grid_8 */, gameObj, simpleMap);
                    }
                    else if (x >= secondLineX) {
                        this.writeInMap(9 /* Grid_9 */, gameObj, simpleMap);
                    }
                }
            }
        };
        NineGridSplitScreenTool.firstLineX = 0;
        NineGridSplitScreenTool.secondLineX = 0;
        NineGridSplitScreenTool.firstLineY = 0;
        NineGridSplitScreenTool.secondLineY = 0;
        return NineGridSplitScreenTool;
    }());
    FishingJoy.NineGridSplitScreenTool = NineGridSplitScreenTool;
    __reflect(NineGridSplitScreenTool.prototype, "FishingJoy.NineGridSplitScreenTool");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=NineGridSplitScreenTool.js.map