/**
 * 游戏中心
 * @author suo
 */
module FishingJoy {
	export class GameCenter extends egret.DisplayObject {

		/*单例*/
		private static _instance: GameCenter = null;
		/*数据中心*/
		public dataCenter: DataCenter = DataCenter.instance;
		/*事件收发中心*/
		public eventManager: EventManager = EventManager.instance;
		/*游戏对象管理中心*/
		public gameObjectManager: manager.GameObjectManager;
		/*层级管理器*/
		public layerManager: manager.LayerManager;
		/*操作管理器*/
		public operationManager: manager.OperationManager;
		/*捕鱼*/
		public fishingJoyLogic: FishingJoy.FishingJoyLogic;

		public constructor() {
			super();
			this._init();
			this.addEventListener(egret.Event.ENTER_FRAME, this._enterFrame, this);
			GX.PokerEvent.Instance.leaveRoom.add(this._leaveRoom, this);
		}

		private _init(): void {
			Laya.init();
			this.gameObjectManager = manager.GameObjectManager.instance;
			this.layerManager = manager.LayerManager.instance;
			this.operationManager = manager.OperationManager.instance;
			this.fishingJoyLogic = FishingJoy.FishingJoyLogic.instance;
		}


		/**
		 * 获得单例
		 */
		public static get instance(): GameCenter {
			if (this._instance == null) {
				this._instance = new GameCenter();
			}
			return this._instance;
		}

		/**
		 * 退出游戏
		 */
		public _leaveRoom() {
			this.dispose();
		}

		/**
		* 帧事件
		*/
		private _enterFrame(e: egret.Event): void {
			Laya.timer.update();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			game.GameConstant.updataStageSize();
			UICenter.instance.closeAll();
			this.fishingJoyLogic.dispose();
			this.fishingJoyLogic = null;
			this.eventManager.dispose();
			this.eventManager = null;
			this.dataCenter.dispose();
			this.dataCenter = null;
			this.layerManager.dispose();
			this.layerManager = null;
			this.operationManager.dispose();
			this.operationManager = null;
			this.gameObjectManager.dispose();
			this.gameObjectManager = null
			game.SoundHand.Instance.dispose();
			Pool.clearAll();


			this.removeEventListener(egret.Event.ENTER_FRAME, this._enterFrame, this);
			GX.PokerEvent.Instance.leaveRoom.remove(this._leaveRoom, this);
			RES.destroyRes(game.GameConstant.ResGroup_BY, false);
			uniLib.ResUtils.clearResConfigByGroupName([game.GameConstant.ResGroup_BY]);
			game.PokerFunction.exitGame();
			uniLib.GameModuleUtils.ExitGame(false);
		}
	}
}