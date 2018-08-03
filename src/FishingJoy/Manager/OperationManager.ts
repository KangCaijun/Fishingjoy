/**
 * 操作管理器 广义操作管理器  不光包括玩家操作 还包括子弹轨迹 存在注册具体操作方式不一样而已
 * @author suo
 */
module manager {
	export class OperationManager {

		/**
		 * 单例
		 */
		private static _instance: OperationManager;
		/**
		 * 已注册的操作行为字典
		 */
		private _resgisterOprDic: Dictionary = new Dictionary();
		/**
		 * 操作类型映射字典
		 */
		private _operationClsDic: Dictionary = new Dictionary();
		/**
		 * 注册ID
		 */
		private _registerID: number = -1;
		constructor() {
			this._operationClsDic.set(OPERATION_TYPE.MASTER, operation.MasterBatteryOperation);
			this._operationClsDic.set(OPERATION_TYPE.BULLET, operation.BulletOperation);
			this._operationClsDic.set(OPERATION_TYPE.BulletTrack, operation.BulletTrackOperation);
			this._operationClsDic.set(OPERATION_TYPE.SIMPLE, operation.SimpleOperation);
			this._operationClsDic.set(OPERATION_TYPE.FISH, operation.FishOperation);
			this._operationClsDic.set(OPERATION_TYPE.BATTERY, operation.BatteryOperation);
			Laya.timer.frameLoop(1, this, this._update)
		}

		/**
		 * 快速离场
		 */
		public leaveQuickly(): void {
			let resgisterOprDic = this._resgisterOprDic
			let values: string[] = resgisterOprDic.keys;
			for (let item of values) {
				let object = resgisterOprDic.get(item);
				if (egret.is(object, "operation.FishOperation")) {
					let data: operation.FishOperation = (object as operation.FishOperation);
					let speed = data.speed;
					let spawnTime = data.spawnTime;
					let leftTime = (game.GameTime.serverNow() - spawnTime);
					let distTotal = speed * leftTime;
					data.speed = 1;
					let needTime = distTotal / data.speed;
					data.spawnTime += (leftTime - needTime);
				}
			}
		}

		/**
		 * 获取单例
		 */
		public static get instance(): OperationManager {
			if (this._instance == void 0) {
				this._instance = new OperationManager();
			}
			return this._instance;
		}

		/**
		 * 更新
		 */
		public _update() {
			let resgisterOprDic = this._resgisterOprDic
			let values: string[] = resgisterOprDic.keys;
			for (let item of values) {
				resgisterOprDic.get(item).enterFrame();
			}
			// console.error("行为对象池:" + values.length)
		}

		/**
		 * 对某个对象 注册操作方式 返回注册id用于反注册
		 */
		public registerOperation(gameObj: gameObject.GameObject, opeartionType: OPERATION_TYPE): number {
			if (gameObj == null) {
				console.assert(false, "注册对象为空！")
			}
			let cls = this._operationClsDic.get(opeartionType);
			if (cls == null) {
				console.assert(false, "operation 未被注册！")
			}
			var registerOperation: operation.BaseOperation = new cls();
			registerOperation.operationType = opeartionType;
			registerOperation.register(gameObj);
			this._registerID++;
			this._resgisterOprDic.set(this._registerID, registerOperation);
			return this._registerID;
		}

		/**
		 * 反注册操作
		 */
		public unregisterOperation(registerID: number): void {
			if (registerID == -1) {
				return;
			}
			var operation: operation.BaseOperation = this._resgisterOprDic.get(registerID);
			if (operation != null) {
				// Pool.recover("operation" + operation.operationType, operation);
				operation.unregister();
				operation = null;
				this._resgisterOprDic.remove(registerID);
			}
			else {
				// console.assert(false, "registerID不存在！")
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			Laya.timer.clear(this, this._update);
			this._resgisterOprDic.clear();
			this._resgisterOprDic = null;
			this._operationClsDic.clear();
			this._operationClsDic = null;
		}
	}
}