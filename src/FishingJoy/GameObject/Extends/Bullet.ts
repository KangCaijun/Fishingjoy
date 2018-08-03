/**
 * 子弹
 * @author suo
 */
module gameObject {
	export class Bullet extends GameObjectCollider {

		/**
		 * 注册操作id
		 */
		private _registerAry: number[] = [];
		/**
		 * 伤害
		 */
		public damage: number = 1;
		/**
		 * 发射间隔
		 */
		public interval: number;
		/**
		 * 极速状态下的发射间隔
		 */
		public fastInterval: number;
		/**
		 * 目标鱼
		 */
		public targetFish: gameObject.Fish
		/**
		 * 子弹等级
		 */
		public level: number;

		/**
		 * 服务器id
		 */
		public get servelID(): number {
			return (<IBulletVars>this.varsData).servelID;
		}

		/**
		 * 玩家id
		 */
		public get playerID(): number {
			return (<IBulletVars>this.varsData).playerUID;
		}

		constructor() {
			super();
			this.touchEnabled = false;
			this.touchChildren = false;
		}

		/**
         * 初始化一次
         */
		public initOnce(data: IBulletInitOnce): void {
			super.initOnce(data);
			this.damage = data.damage;
			this.level = data.level;
			this.interval = data.interval;
			this.fastInterval = data.fastInterval;
		}

		/**
		 * 初始化
		 */
		public initialize(): void {
			super.initialize();
			let bulletVars: IBulletVars = this.varsData as IBulletVars;
			if (bulletVars.operation == null) {
				console.assert(false, "子弹未注册operationID");
			}
			if (bulletVars.servelID == undefined) {
				console.assert(false, "子弹没有servelID")
			}
			this.targetFish = bulletVars.targetFish;
			this.isCollided = false;
			if (this.varsData.operation) {
				for (let i: number = 0; i < this.varsData.operation.length; i++) {
					this._registerAry.push(manager.OperationManager.instance.registerOperation(this, this.varsData.operation[i].type));
				}
			}
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
			for (let i: number = 0; i < this._registerAry.length; i++) {
				manager.OperationManager.instance.unregisterOperation(this._registerAry[i])
			}
			this._registerAry.length = 0;
			this.targetFish = null;
			super.uninitialize();
		}

		/**
		 * 击中鱼
		 */
		private _hitFish(hurtNum: number, fish: gameObject.Fish, Bullet: gameObject.Bullet): void {
			if (this.uID == Bullet.uID) {
				GameObjectFactory.instance.recoverGameObject(this);
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			super.dispose();
			this._registerAry.length = 0
		}

		/**
		 * 获取屏幕坐标
		 */
		public getGrid(): number {
			console.info("子弹所在格子：" + this.grid[0]);
			return this.grid[0];
		}
	}
}