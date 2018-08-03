/**
 * 渔网
 * @author suo 
 */
module gameObject {
	export class FishingNet extends GameObjectCollider {

		/**
		 * 渔网数量
		 */
		public netNum: number;
		/**
		 * 碰撞器数据
		 */
		public colliderData: ICollider[];

		/**
		 * 渔网半径
		 */
		public get radius(): number {
			return (this.varsData as IFishNetVars).radius;
		}

		public constructor() {
			super();
		}

		/**
         * 初始化一次
         */
		public initOnce(initOnce: IFishingNetInitOnce): void {
			this.netNum = initOnce.netNum;
			this.colliderData = initOnce.colliderAry;
		}

		/**
         * 初始化
         */
		public initialize(): void {
			super.initialize();
			this._moviePlayer.alpha = 0.8
			/*美术资源的渔网半径大致为115*/
			let scale: number = this.radius / 115;
			for (let i: number = 0; i < this.netNum; i++) {
				let collider: FishingJoy.Collider = FishingJoy.Collider.creat(this.colliderData[i].posX * scale, this.colliderData[i].posY * scale, this.radius);
				collider.setParent(this);
				this.colliderAry.push(collider);
			}
			this._moviePlayer.scaleX = this._moviePlayer.scaleY = scale;
			this.canDispose=false;
			this._moviePlayer.playOnceAll(Handler.create(this,this._onComplete));
			// Laya.timer.once(500, this, this._startAlpha);
		}

		/**
		 * 开始淡出
		//  */
		// private _startAlpha(): void {
		// 	egret.Tween.get(this._moviePlayer).to({ alpha: 0 }, 400).call(this._onComplete, this)
		// }

		/**
		 * 播放完毕
		 */
		private _onComplete(): void {
			this.canDispose=true;
			GameObjectFactory.instance.recoverGameObject(this);
		}

		/**
         * 反初始化
         */
		public uninitialize(): void {
			for (let i: number = 0; i < this.colliderAry.length; i++) {
				this.colliderAry[i].recover();
			}
			this.colliderAry.length = 0;
			super.uninitialize();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			super.dispose()
		}
	}
}