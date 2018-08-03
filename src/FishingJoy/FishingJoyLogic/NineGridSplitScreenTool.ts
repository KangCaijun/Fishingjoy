/**
 * 九格分屏
 * @author suo
 */
import Point = egret.Point
module FishingJoy {
    export class NineGridSplitScreenTool {

        public static firstLineX: number = 0;
        public static secondLineX: number = 0;
        public static firstLineY: number = 0;
        public static secondLineY: number = 0;

        public pic: egret.Shape = new egret.Shape();


        public constructor() {

        }

        public static initValue(): void {
            let width = (uniLib.Global.screenWidth + 200) / 3;
            let height = (uniLib.Global.screenHeight + 200) / 3
            this.firstLineX = -100 + width;
            this.firstLineY = -100 + height;
            this.secondLineX = -100 + width * 2;
            this.secondLineY = -100 + height * 2;
        }

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
        public static setGridIndex(gameObj: gameObject.GameObjectCollider, simpleMap: Dictionary) {
            gameObj.clearGridIndex();
            /*适用于长鱼 计算每个碰撞器的位置 计算量稍大*/
            if (gameObj.isAccurateCollider) {
                let len: number = gameObj.colliderAry.length;
                for (let i: number = 0; i < len; i++) {
                    let collider: Collider = gameObj.colliderAry[i];
                    this.analyseGridMap(collider.globePosPoint.x, collider.globePosPoint.y, gameObj, simpleMap);
                }
            }
            /*仅关注宿主的位置 计算量小*/
            else {
                this.analyseGridMap(gameObj.x, gameObj.y, gameObj, simpleMap);
            }
        }

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
        public static writeInMap(gridIndex: Grid, gameObj: gameObject.GameObjectCollider, simpleMap: Dictionary): void {
            let gameObjAry: gameObject.GameObjectCollider[] = simpleMap.get(gridIndex);
            if (gameObjAry == null) {
                gameObjAry = new Array<gameObject.GameObjectCollider>()
                simpleMap.set(gridIndex, gameObjAry);
            }
            if (gameObjAry.indexOf(gameObj) == -1) {
                gameObjAry.push(gameObj);
            }
        }

        /**
		 * 分析在哪个格子里
		 */
        public static analyseGrid(gameObj: gameObject.GameObjectCollider): void {
            let firstLineX: number = this.firstLineX;
            let secondLineX: number = this.secondLineX;
            let firstLineY: number = this.firstLineY;
            let secondLineY: number = this.secondLineY;
            let x: number = gameObj.x;
            let y: number = gameObj.y

            if (UIUtil.inBorder(x, y)) {
                /*第一行*/
                if (y < firstLineY) {
                    if (x < firstLineX) {
                        gameObj.pushGridIndex(Grid.Grid_1);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        gameObj.pushGridIndex(Grid.Grid_2);
                    }
                    else if (x >= secondLineX) {
                        gameObj.pushGridIndex(Grid.Grid_3);
                    }
                }
                /*第二行*/
                else if (y < secondLineY && y >= firstLineY) {
                    if (x < firstLineX) {
                        gameObj.pushGridIndex(Grid.Grid_4);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        gameObj.pushGridIndex(Grid.Grid_5);
                    }
                    else if (x >= secondLineX) {
                        gameObj.pushGridIndex(Grid.Grid_6);
                    }
                }
                /*第三行*/
                else {
                    if (x < firstLineX) {
                        gameObj.pushGridIndex(Grid.Grid_7);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        gameObj.pushGridIndex(Grid.Grid_8);
                    }
                    else if (x >= secondLineX) {
                        gameObj.pushGridIndex(Grid.Grid_9);
                    }
                }
            }
        }

		/**
		 * 分析在哪个格子里
		 */
        public static analyseGridMap(x: number, y: number, gameObj: gameObject.GameObjectCollider, simpleMap: Dictionary): void {
            let firstLineX: number = this.firstLineX;
            let secondLineX: number = this.secondLineX;
            let firstLineY: number = this.firstLineY;
            let secondLineY: number = this.secondLineY;

            if (UIUtil.inBorder(x, y)) {
                /*第一行*/
                if (y < firstLineY) {
                    if (x < firstLineX) {
                        this.writeInMap(Grid.Grid_1, gameObj, simpleMap);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        this.writeInMap(Grid.Grid_2, gameObj, simpleMap);
                    }
                    else if (x >= secondLineX) {
                        this.writeInMap(Grid.Grid_3, gameObj, simpleMap);
                    }
                }
                /*第二行*/
                else if (y < secondLineY && y >= firstLineY) {
                    if (x < firstLineX) {
                        this.writeInMap(Grid.Grid_4, gameObj, simpleMap);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        this.writeInMap(Grid.Grid_5, gameObj, simpleMap);
                    }
                    else if (x >= secondLineX) {
                        this.writeInMap(Grid.Grid_6, gameObj, simpleMap);
                    }
                }
                /*第三行*/
                else {
                    if (x < firstLineX) {
                        this.writeInMap(Grid.Grid_7, gameObj, simpleMap);
                    }
                    else if (x >= firstLineX && x < secondLineX) {
                        this.writeInMap(Grid.Grid_8, gameObj, simpleMap);
                    }
                    else if (x >= secondLineX) {
                        this.writeInMap(Grid.Grid_9, gameObj, simpleMap);
                    }
                }
            }
        }
    }
}

/**
 * 格子
 */
const enum Grid {
    Grid_1 = 1,
    Grid_2,
    Grid_3,
    Grid_4,
    Grid_5,
    Grid_6,
    Grid_7,
    Grid_8,
    Grid_9,


}
