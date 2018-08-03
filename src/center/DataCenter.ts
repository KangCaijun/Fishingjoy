/**
 * 数据处理中心
 * @author suo
 */
module FishingJoy {
	export class DataCenter {

		/*单例*/
		private static _instance: DataCenter = null;
		/**
		 * 获得单例
		 */
		public static get instance(): DataCenter {
			if (this._instance == null) {
				this._instance = new DataCenter();
			}
			return this._instance;
		}
		/*玩家数据*/
		public master: Master = Master.instance;
		/*等级 （低级场,中级场，高级场）*/
		public level: number = 0;
		/*是否已经初始化*/
		public isInit: boolean = false;
		/*房间号*/
		public roomID: number = 0;
		/*上次游戏状态*/
		public lastGameStatus: number;
		/*当前游戏状态*/
		public gameStatus: number;
		/*炮台最大ID*/
		public batteryIDAry: number[];

		public sceneId: SCENEID;
		public constructor() {
			GX.PokerEvent.Instance.roomDataUpdateEvent.add(this._updataRoomData, this);
			GX.PokerEvent.Instance.gameStateUpdate.add(this._gameStateUpdate, this);
		}

		/**
		 * 游戏状态更新
		 */
		private _gameStateUpdate(data: Cmd.GameStatusInfo) {
			if (!this.isInit) {
				return;
			}
			if (!data) {
				return;
			}

			/*上一次游戏状态*/
			this.lastGameStatus = this.gameStatus;
			if (data.status == Cmd.GameStatus.GameStatus_Bet) {
				egret.log("=============下注状态=============");
				let time: number = Math.floor(data.endTime / 1000 - game.GameTime.serverNow() / 1000);
				this.gameStatus = GAME_STATE.BET;
			}
			else if (data.status == Cmd.GameStatus.GameStatus_Free) {
				egret.log("=============空闲状态=============");
				this.gameStatus = GAME_STATE.FREE;
			}
			else if (data.status == Cmd.GameStatus.GameStatus_Lottery) {
				egret.log("=============开奖状态=============");
				this.gameStatus = GAME_STATE.LOTTERY;
			}
			else if (data.status == Cmd.GameStatus.GameStatus_Settle) {
				egret.log("=============结算状态=============");
				this.gameStatus = GAME_STATE.SETTLE;

			}
			if (this.lastGameStatus != this.gameStatus) {
			}
		}
		/**
		 * 是否正在切换鱼潮
		 */
		private m_isSwitchFish:boolean;
		public set isSwitchFish(b: boolean) {
			this.m_isSwitchFish = b;
		}
		public get isSwitchFish(): boolean {
			return this.m_isSwitchFish;
		}
		/**
		 * 跑马灯触发条件
		 */
		public get noticeTriggers() {
			let level = game.RoomData.Instance.level;
			let config = table.TableBaseRuleConfigList.instance().first((v: table.TableBaseRuleConfigList) => v.level == level);
			let noticeTriggers = config ? config.noticeTriggers : null;
			return noticeTriggers && noticeTriggers instanceof Array ? noticeTriggers.first().id : 0;
		}
		/**
		 * 获取下注索引 通过炮id
		 */
		public getBatterIdByIndex(index: number) {
			return this.getBatterIdList()[index];
		}
		/**
		 * 获取下注索引 通过炮id
		 */
		public getBatterIndex(batterId: number) {
			return this.getBatterIdList().find(v => v == batterId);
		}
		/**
		 * 获取炮id列表
		 */
		public getBatterIdList(): number[] {
			let level = game.RoomData.Instance.level;
			let config = table.TableBaseRuleConfigList.instance().first((v: table.TableBaseRuleConfigList) => v.level == level)
			return config.betPointList;
		}
		/**
		 * 通过batterId 获取下一个炮batterId
		 */
		public nextBatterId(batterId: number) {
			let batterIdList = this.getBatterIdList();
			let index = batterIdList.find(v => v == batterId);
			let nextBatterId = batterIdList[index + 1];
			return nextBatterId == null ? batterIdList.last() : nextBatterId;
		}
		/**
		 * 通过batterId 获取之前炮batterId
		 */
		public beforBatterId(batterId: number) {
			let batterIdList = this.getBatterIdList();
			let index = batterIdList.find(v => v == batterId);
			let beforBatterId = batterIdList[index - 1];
			return beforBatterId == null ? batterIdList.first() : beforBatterId;
		}
		/**
		 * 最小的炮id
		 */
		public minBatterId() {
			return this.getBatterIdList().first();
		}
		/**
		 * 最大的炮id
		 */
		public maxBatterId() {
			return this.getBatterIdList().last();
		}
		/** 
		 * 获取奖章等级
		 */
		public getRuleConfigList() {
			return RES.getRes("TableGameRuleConfigList_json").filter((v: table.TableGameRuleConfigList) => v.level == this.level);
		}

		/** 
		 * 获取道具信息
		 */
		public accessToProps(level) {
			return RES.getRes("TablePropConfig_json").filter((v: table.TablePropConfig) => v.id == level);
		}


		/** 
		 * 初始化房间数据
		 */
		private _updataRoomData(rev: Cmd.RoomDataUpdateCmd_S): void {
			if (!rev) {
				return;
			}
			if (!this.isInit) {
				this.isInit = true;

				this.roomID = rev.roomData.roomId;
				/*房间等级*/
				this.level = rev.roomData.level;
				this.batteryIDAry = this.getRuleConfigList()[0].batteryIds;

				EventManager.fireEvent(EVENT_ID.ROOM_LEVEL_UPDATE, this.level);

				/*下注状态*/
				if (this.gameStatus == GAME_STATE.BET) {


				}
				else if (this.gameStatus == GAME_STATE.LOTTERY) {


				}
				else if (this.gameStatus == GAME_STATE.SETTLE) {


				}
				else if (this.gameStatus == GAME_STATE.FREE) {


				}
			}
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			GX.PokerEvent.Instance.gameStateUpdate.remove(this._gameStateUpdate, this);
			GX.PokerEvent.Instance.roomDataUpdateEvent.remove(this._updataRoomData, this);
			this.master.dispose();
			this.master = null;
		}
	}
}


const enum GAME_STATE {
	/*空闲*/
	FREE = 1,
	/*押注*/
	BET = 2,
	/*开奖*/
	LOTTERY = 3,
	/*结算*/
	SETTLE = 4
}