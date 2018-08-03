/**
 * 注册主角操作
 * @author suo
 */

module operation {
	export class MasterBatteryOperation extends BaseOperation {
		/**
		 * 是否在冷却
		 */
		private _isCooling: boolean = false;
		/**
		 * 背景
		 */
		private _bg: eui.Image; logger
		/**
		 * 当前子弹发射间隔 
		 */
		private _curInterval: number;
		/**
		 * 当前发射子弹标志
		 */
		private _curSign: number;
		/**
		 * 对象
		 */
		private _gameObj: gameObject.Battery;
		/**
		 * 鼠标指针
		 */
		private _cursorImg: CustomImage;
		/**
		 * 点击特效冷却
		 */
		private _isClickEffCooling: boolean = false;
		/**
		 * 退潮
		 */
		private _isEbbTide: boolean = false;

		constructor() {
			super();
		}

		/**
		 * 注册
		 */
		public register(gameObj: gameObject.Battery): void {
			this._gameObj = gameObj;
			if (uniLib.Global.isH5) {
				PCMouseHelper.changeCursor();
			}
			else {
				this._initCursor()
			}
			EventManager.registerEvent(EVENT_ID.CHANEG_SHOOT_TYPE, Handler.create(this, this._changeShootType))
			EventManager.registerEvent(EVENT_ID.AIM_FISH, Handler.create(this, this._aimFish));
			EventManager.registerEvent(EVENT_ID.WAIT_AIM, Handler.create(this, this._waitAim));
			EventManager.registerEvent(EVENT_ID.FIRE_BULLET, Handler.create(this, this._commonShoot));
			EventManager.registerEvent(EVENT_ID.EBB_TIDE, Handler.create(this, this._onEbbTide));
			gameObj.curRotation = this._gameObj.rotation;
			this._bg = UICenter.instance.getManager(commonUI.FishMainScene).getView(FishingJoy.FishMainSceneView).backGround0;
			this._bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._starDrag, this)
			this._bg.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._outsideDrag, this);
			this._bg.addEventListener(egret.TouchEvent.TOUCH_END, this._endDrag, this);

			this._curSign = GAMEOBJECT_SIGN.BULLET_SELF
			let curBulletConfig: gameObject.IGameObjectConfig = gameObject.GameObjectConfigParse.getConfigBySign(this._curSign);
			this._curInterval = (curBulletConfig.initOnceData as gameObject.IBulletInitOnce).interval;

			EventManager.registerEvent(EVENT_ID.AIM_SPECIAL_FISH, Handler.create(this, this._checkSpecialFish))
		}

		/**
		 * 检测特殊鱼
		 */
		public _checkSpecialFish(fish: gameObject.GameObjectCollider, isOpen: boolean): void {
			if (isOpen) {
				Laya.timer.loop(200, this, this._checkAim, [fish]);
			}
			else {
				Laya.timer.clear(this, this._checkAim);
			}
		}

		/**
		 * 退潮
		 */
		private _onEbbTide(): void {
			if (Master.instance.isAimShoot && Master.instance.isAutoShoot) {
				Master.instance.prohibitShoot = true;
			}
			else {
				this._isEbbTide = true;
				Laya.timer.once(2000, this, () => { this._isEbbTide = false; })
			}
			if (Master.instance.isAimShoot) {
				this._waitAim(2000);
			}
		}

		/**
		 * 检测能否瞄准
		 */
		public _checkAim(fish: gameObject.Fish): void {
			if (fish && fish.isAlive && fish.isInView) {
				if (Master.instance.isAimShoot) {
					if (UIUtil.isCanAim(fish)) {
						if (Master.instance.aimFishServelID != fish.servelID && !GlobeVars.AimSpcialFish) {
							this._aimFish(fish);
							GlobeVars.AimSpcialFish = true;
						}
					}
					else {
						GlobeVars.AimSpcialFish = false;
					}
				}
			}
			else {
				Laya.timer.clear(this, this._checkAim);
			}
		}

		/**
		 * 等待下次瞄准
		 */
		private _waitAim(timer: number = 500): void {
			this._changeShootType(SHOOT_TYPE.AIM, false);
			Laya.timer.loop(timer, this, this._findTargetFish);
		}

		/**
		 * 初始化鼠标指针
		 */
		private _initCursor(): void {
			this._cursorImg = new CustomImage();
			this._cursorImg.source = "cursor1";
			this._cursorImg.x = uniLib.Global.screenWidth / 2;
			this._cursorImg.y = uniLib.Global.screenHeight / 2;
			manager.LayerManager.instance.addToLayer(this._cursorImg, LAYER.CURSOR);
		}

		/**
		 * 瞄准此鱼
		 */
		private _aimFish(fish: gameObject.Fish): void {
			if (Master.instance.isAimShoot) {
				this._sendAimMsg(true, fish.servelID);
			}
		}

		/**
		 * 改变射击模式
		 */
		private _changeShootType(value: number, isOpen: boolean): void {
			/*快速射击*/
			if (value == SHOOT_TYPE.FAST) {
				let curBulletConfig: gameObject.IGameObjectConfig = gameObject.GameObjectConfigParse.getConfigBySign(this._curSign);
				if (isOpen) {
					this._curInterval = (curBulletConfig.initOnceData as gameObject.IBulletInitOnce).fastInterval;
				}
				else {
					this._curInterval = (curBulletConfig.initOnceData as gameObject.IBulletInitOnce).interval;
				}
				Master.instance.isFastShoot = isOpen;
				EventManager.fireEvent(EVENT_ID.PLAY_FIRE_EFF, [isOpen, value])
			}
			/*瞄准射击*/
			else if (value == SHOOT_TYPE.AIM) {
				if (isOpen) {
					let fish: gameObject.Fish = FishingJoy.FishingJoyLogic.instance.findMostValuableFish();
					if (fish != null) {
						this._sendAimMsg(true, fish.servelID);
					}
					else {
						Laya.timer.loop(400, this, this._findTargetFish);
					}

				}
				else {
					this._sendAimMsg(false, -1);
				}
				Master.instance.isAimShoot = isOpen;
			}
			/*自动射击*/
			else if (value == SHOOT_TYPE.AUTO) {
				if (isOpen) {
					Laya.timer.frameLoop(1, this, this._autoOperation)
				}
				else {
					Laya.timer.clear(this, this._autoOperation)
				}
				Master.instance.isAutoShoot = isOpen;
				EventManager.fireEvent(EVENT_ID.PLAY_FIRE_EFF, [isOpen, value])
			}
			/*是否为普通射击*/
			if (!Master.instance.isAutoShoot && !Master.instance.isAutoShoot && !Master.instance.isAimShoot) {
				Master.instance.isNormalShoot = true;
			}
			else {
				Master.instance.isNormalShoot = false;
			}
		}

		/**
		 * 每秒检测一次场上最值钱的鱼
		 */
		private _findTargetFish(): void {
			let fish: gameObject.Fish = FishingJoy.FishingJoyLogic.instance.findMostValuableFish();
			if (fish != null) {
				Laya.timer.clear(this, this._findTargetFish)
				this._sendAimMsg(true, fish.servelID);
			}
		}

		/**
		 * 发送瞄准协议
		 */
		private _sendAimMsg(isLock: boolean, fishServelID: number): void {
			let cmd: Cmd.ActionCmd_CS = new Cmd.ActionCmd_CS();

			cmd.act = new Cmd.Action()
			cmd.act.uid = Master.instance.uid;
			if (isLock) {
				cmd.act.op = Cmd.Operation.Lock;
				cmd.act.value = fishServelID;
			}
			else {
				cmd.act.op = Cmd.Operation.Unlock;
			}
			game.PokerFunction.tcpSend(cmd);
		}

		/**
		 * 开始拖动
		 */
		private _starDrag(e: egret.TouchEvent): void {
			let gameObj = this._gameObj;
			if (!gameObj || !gameObj.user) {
				return;
			}
			if (gameObj.user.point < this._gameObj._batteryID) {
				GX.Tips.showTips("金币不足!");
				return;
			}
			if (this._cursorImg) {
				this._cursorImg.x = e.stageX;
				this._cursorImg.y = e.stageY;
			}
			this.clickAnimation(e)
			if (Master.instance.isAutoShoot) {
				gameObj.curRotation = UIUtil.calculateBatteryRotation(gameObj, e.stageX, e.stageY)
			}
			else if (Master.instance.isAimShoot || Master.instance.isFastShoot || Master.instance.isNormalShoot) {
				gameObj.curRotation = UIUtil.calculateBatteryRotation(gameObj, e.stageX, e.stageY)
				this._commonShoot();
				Laya.timer.frameLoop(2, this, this._commonShoot);
			}

			if (!Master.instance.isAimShoot) {
				this._bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
			}
		}


		/**
		 * 点击动效
		 */
		public clickAnimation(e: egret.TouchEvent) {
			let back0 = UICenter.instance.getManager(commonUI.FishMainScene).getView(FishingJoy.FishMainSceneView);
			let click = Pool.getItemByCreateFun(Pool.clickingWaterWave, Handler.create(this, this._creatClickingWaterWave, null, true))
			UIUtil.movPlayOnce(back0, click, e.stageX, e.stageY, 2, 2, Handler.create(this, () => { Pool.recover(Pool.clickingWaterWave, click) }, null, true));
		}

		/**
		 * 创建水波纹
		 */
		private _creatClickingWaterWave(): egret.MovieClip {
			let mov: egret.MovieClip = UIUtil.creatMovieClip("clickingWaterWave");
			mov.blendMode = egret.BlendMode.ADD;
			return mov;
		}



		/**
		 * 拖到屏幕外
		 */
		private _outsideDrag(e: egret.TouchEvent): void {
			Laya.timer.clear(this, this._commonShoot);
			this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
		}

		/**
		 * 正在拖动
		 */
		private _onDrag(e: egret.TouchEvent): void {
			this._gameObj.curRotation = UIUtil.calculateBatteryRotation(this._gameObj, e.stageX, e.stageY);
			if (this._cursorImg) {
				this._cursorImg.x = e.stageX;
				this._cursorImg.y = e.stageY;
			}

			if (this._isClickEffCooling) {
				return;
			}
			this._isClickEffCooling = true;
			Laya.timer.once(100, this, () => { this._isClickEffCooling = false })
			this.clickAnimation(e);
		}

		/**
		 * 拖动结束
		 */
		private _endDrag(e: egret.TouchEvent): void {
			if (this._cursorImg) {
				this._cursorImg.x = e.stageX;
				this._cursorImg.y = e.stageY;
			}
			Laya.timer.clear(this, this._commonShoot);
			this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
		}

		/**
		 * 发送一枚子弹
		 */
		private _fireOneBullet(sign: GAMEOBJECT_SIGN): void {
			this._sendMsg();
		}

		/**
		 * 自动射击
		 */
		private _autoOperation(): void {
			this._commonShoot();
		}


		/**
		 * 普通射击
		 */
		private _commonShoot(): void {
			/*退潮时不能发子弹*/
			if (this._isEbbTide) {
				return;
			}
			if (Master.instance.prohibitShoot) {
				return;
			}
			if (this._isCooling) {
				return;
			}
			this._isCooling = true;
			Laya.timer.once(this._curInterval, this, () => { this._isCooling = false; });
			this._fireOneBullet(GAMEOBJECT_SIGN.BULLET_SELF);
		}

		/**
		 * 发送协议
		 */
		private _sendMsg(): void {
			if (FishingJoy.DataCenter.instance.isSwitchFish) {
				return;
			}
			if (!this._gameObj || !this._gameObj.user)
				return;
			if (this._gameObj.user.point < this._gameObj._batteryID) {
				Laya.timer.clear(this, this._autoOperation);
				Laya.timer.clear(this, this._commonShoot);
				EventManager.fireEvent(EVENT_ID.CHANEG_SHOOT_TYPE, [SHOOT_TYPE.AUTO, false]);
				EventManager.fireEvent(EVENT_ID.CHANEG_SHOOT_TYPE, [SHOOT_TYPE.AIM, false]);
				EventManager.fireEvent(EVENT_ID.CHANEG_SHOOT_TYPE, [SHOOT_TYPE.FAST, false]);
				this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
			}
			let cmd = new Cmd.BetRoomCmd_CS();
			cmd.bulletinfo = new Cmd.BulletInfo();
			cmd.bet = new Cmd.DoorChips();
			cmd.bulletinfo.angle = this._gameObj.curRotation;
			cmd.bet.chips = FishingJoy.DataCenter.instance.getBatterIndex(this._gameObj._batteryID) + 1;;
			game.PokerFunction.tcpSend(cmd);
		}

		/**
		 * 反注册
		 */
		public unregister(): void {
			this._bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._starDrag, this)
			this._bg.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._outsideDrag, this);
			this._bg.removeEventListener(egret.TouchEvent.TOUCH_END, this._endDrag, this);
			this._bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);

			if (uniLib.Global.isH5) {
				PCMouseHelper.recover();
			}
			else {
				manager.LayerManager.instance.removeFromLayer(this._cursorImg, LAYER.CURSOR);
				this._cursorImg = null;
			}
			EventManager.unregisterEvent(EVENT_ID.FIRE_BULLET, this, this._commonShoot);
			EventManager.unregisterEvent(EVENT_ID.AIM_FISH, this, this._aimFish);
			EventManager.unregisterEvent(EVENT_ID.CHANEG_SHOOT_TYPE, this, this._changeShootType);
			EventManager.unregisterEvent(EVENT_ID.WAIT_AIM, this, this._waitAim)
			EventManager.unregisterEvent(EVENT_ID.AIM_SPECIAL_FISH, this, this._checkSpecialFish);
			EventManager.unregisterEvent(EVENT_ID.EBB_TIDE, this, this._onEbbTide);
			this._gameObj = null;
		}
	}
}