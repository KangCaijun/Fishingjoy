/**
 * 爆炸
 * @author suo 
 */
module gameObject {
	export class Burst extends GameObjectCollider {

		public constructor() {
			super();
		}

		/**
         * 初始化一次
         */
		public initOnce(data: IBurstInitOnce): void {
			super.initOnce(data)
		}

		/**
         * 初始化
         */
		public initialize(): void {
			super.initialize();
			this._moviePlayer.switchAniPlayOnce("idle", Handler.create(this, this._onComplete))
		}

		/**
		 * 播放完毕
		 */
		private _onComplete(): void {
			GameObjectFactory.instance.recoverGameObject(this);
		}

		/**
         * 反初始化
         */
		public uninitialize(): void {
			super.uninitialize();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			super.dispose()
		}

		/**
		 * 获取屏幕坐标
		 */
		public getGrid(): number {
			return this.grid[0];
		}
	}
}