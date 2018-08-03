/**
 * 游戏对象创建工厂
 * @author suo
 */
module gameObject {
	export class GameObjectFactory {

		/**
		 * 单例
		 */
		private static _instance: GameObjectFactory = null;
		/**
		 * 对象字典
		 */
		private _objClassDic: SimpleMap<any> = new SimpleMap<any>();
		/**
		 * gid
		 */
		public gid: number = 0;

		constructor() {

			let i: number;
			for (i = GAMEOBJECT_SIGN.BULLET_SELF; i < GAMEOBJECT_SIGN.BULLET_SELF_3 + 1; i++) {
				this._objClassDic.set(i, gameObject.Bullet);
			}
			for (i = GAMEOBJECT_SIGN.BULLET_OTHER; i < GAMEOBJECT_SIGN.BULLET_OTHER_3 + 1; i++) {
				this._objClassDic.set(i, gameObject.Bullet);
			}
			for (i = GAMEOBJECT_SIGN.FishingNet_Green; i < GAMEOBJECT_SIGN.FishingNet_BLUE_3 + 1; i++) {
				this._objClassDic.set(i, gameObject.FishingNet);
			}
			for (i = GAMEOBJECT_SIGN.FishingNet_Self; i < GAMEOBJECT_SIGN.FishingNet_BROWN_3 + 1; i++) {
				this._objClassDic.set(i, gameObject.FishingNet);
			}


			this._objClassDic.set(GAMEOBJECT_SIGN.BATTERY, gameObject.Battery);
			this._objClassDic.set(GAMEOBJECT_SIGN.BURST, gameObject.Burst);
			this._objClassDic.set(GAMEOBJECT_SIGN.MERMAID_EFF, gameObject.MermaidEff)
			this._objClassDic.set(GAMEOBJECT_SIGN.DRAGON_EFF, gameObject.DragonEff);
			for (let item of table.TableFishConfig.instance()) {
				this._objClassDic.set(item.sign, gameObject.Fish);
			}
		}

		/**
		 * 获得单例
		 */
		public static get instance(): GameObjectFactory {
			if (this._instance == null) {
				this._instance = new GameObjectFactory();
			}
			return this._instance;
		}

		/**
		 * 创建一个GameObject
		 */
		public creatGameObject(sign: GAMEOBJECT_SIGN, varsData: IGameObjectVars = null, layerType: LAYER = LAYER.Fish): any {
			let gameObj: gameObject.GameObject = null;
			gameObj = gameObject.GameObjectPool.instance.tryGetGameObjInPool(sign);
			/*资源池无此资源*/
			if (gameObj == null) {
				let className: any = this._objClassDic.get(sign);
				gameObj = new className();
				gameObj.setData(sign, this.gid, varsData, layerType);
				this._loadConfig(sign, gameObj);
			}
			else {
				gameObj.setData(sign, this.gid, varsData, layerType);
			}
			gameObj.initialize();
			this._writeInMap(gameObj, varsData);
			this.gid++;
			return gameObj;
		}

		/**
		 * 对象回收
		 */
		public recoverGameObject(gameObj: GameObject): void {
			if (gameObj == null) {
				console.assert(false, "gameObj为空！")
				return;
			}
			if (egret.is(gameObj, "gameObject.Bullet")) {
				EventManager.fireEvent(EVENT_ID.REMOVE_BULLET_IN_MAP, (gameObj as Bullet).servelID);
			}
			else if (egret.is(gameObj, "gameObject.Fish")) {
				EventManager.fireEvent(EVENT_ID.REMOVE_FISH_IN_MAP, (gameObj as Fish).servelID);
			}
			gameObj.uninitialize();
			GameObjectPool.instance.recoverGameObject(gameObj);
		}

		/**
		 * 加载资源
		 */
		private _loadConfig(sign: GAMEOBJECT_SIGN, gameObj: GameObject) {
			let configData: IGameObjectConfig = GameObjectConfigParse.configDic.get(sign);
			if (configData) {
				gameObj.loadAsset(configData.asset);
				gameObj.initOnce(configData.initOnceData);
			}
			else {
				console.assert(false, "找不到sign为" + sign + "资源配置！")
			}
		}

		/**
		 * 写入字典
		 */
		private _writeInMap(gameObject: GameObject, varsData: IGameObjectVars): void {
			if (egret.is(gameObject, "gameObject.Fish")) {
				let fishVar: IFishVars = varsData as IFishVars;
				EventManager.fireEvent(EVENT_ID.ADD_FISH_IN_MAP, [fishVar.serveID, gameObject]);
			}
			else if (egret.is(gameObject, "gameObject.Bullet")) {
				let BulletVar: IBulletVars = varsData as IBulletVars;
				EventManager.fireEvent(EVENT_ID.ADD_BULLET_IN_MAP, [BulletVar.servelID, gameObject]);
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._objClassDic.clear();
		}
	}
}