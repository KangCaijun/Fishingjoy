/**
 * 炮台
 * @author suo 
 */
module gameObject {
	export class Battery extends eui.Component implements IGameObject {

		/**
		 * 炮台缩放X
		 */
		public readonly batteryScaleX: number = 0.85;
		/**
		 * 炮台缩放Y
		 */
		public readonly batteryScaleY: number = 0.85;
		/**
		 * 缓存标识符
		 */
		public sign: GAMEOBJECT_SIGN;
		/**
		 * uid
		 */
		public uID: number = NaN;
		/**
		 * 放置哪个图层
		 */
		public layerType: LAYER;
		/**
		 * 携带参数
		 */
		public varsData: IGameObjectVars = null;
		/**
		 * 是否可以被释放
		 */
		public canDispose: boolean = false;
		/**
		 * 引用计数
		 */
		public refCount: number = NaN;
		/**
		 * 姓名文本
		 */
		private _nameTF: eui.Label;
		/**
		 * 金钱文本
		 */
		public _moneyTF: eui.BitmapLabel;
		/**
		 * 消耗金币文本
		 */
		public _costMoneyTF: eui.BitmapLabel;
		/**
		 * 座位数据
		 */
		public seatdata: game.SeatData;
		/**
		 * 玩家
		 */
		public _user: game.UserInfo;
		/**
		 * 注册操作id
		 */
		private _registerAry: number[] = [];
		/**
		 * 发炮口
		 */
		private _firingImg: CustomImage;
		/**
		 * 开火点
		 */
		public firePoint: egret.Shape = new egret.Shape();
		/**
		 * 中心点
		 */
		public focus: eui.Rect;
		/**
		 * 正在缓动
		 */
		public isTween: boolean = false;
		/**
		 * 炮台显示对象
		 */
		private batteryDisplay: eui.Group;
		/**
		 * 等待加入
		 */
		private waitingToJoin: eui.Image
		/**
		 * 座位状态
		 */
		public seatState: SEAT_STATE;
		/**
		 * 是否顶部两个座位
		 */
		public isTop: boolean = false;
		/**
		 * 炮台开盒子
		 */
		private _batteryFireBox: eui.Group;
		/**
		 * 金币图标
		 */
		private _coinImg: eui.Image;
		/**
		 * 左按钮(-)
		 */
		private _decreaseImg: eui.Image;
		/**
		 * 右按钮(+)
		 */
		private _increaseImg: eui.Image;
		/**
		 * 座位索引
		 */
		public seatIndex: number;
		/**
		 * 服务器座位id
		 */
		public get seatId(): number {
			return this.seatdata.seatId;
		}
		/**
		 * 减少按钮
		 */
		public decBtn: tool.Button;
		/**
		 * 增加按钮
		 */
		public incBtn: tool.Button;
		/**
		 * 炮台索引
		 */
		public _batteryID: number = 1;
		/**
		 * 炮台切换效果
		 */
		private _batteryChangeEff: egret.MovieClip;
		/**
		 * 炮台开火烟雾效果
		 */
		private _batteryFireEff: egret.MovieClip;
		/**
		 * 等待服务器回应
		 */
		private _waitForServe: boolean = false;
		/**
		 * 锁定fishid
		 */
		public targetFishId: number;
		/**
		 * 是否瞄准射击
		 */
		public isAimShoot: boolean = false;
		/**
		 * 渔网的半径
		 */
		public fishNetRadius: number = 50;
		/**
		 * 发射子弹的数量
		 */
		public fireBulletNum: number = 1;
		/**
		 * 炮台资源编号
		 */
		public resNo: number = 1;
		/**
		 * 当前旋转角度
		 */
		public curRotation: number = 0;

		public constructor() {
			super();
			this.skinName = "SeatItemSkin_fish";
			this.touchEnabled = false;
		}

		protected createChildren(): void {
			super.createChildren();
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
		}

		/**
         * 加载资源
         */
		public loadAsset(assetData: IGameObjectAsset): void {

			// this.firePoint.graphics.beginFill(ColorUtil.COLOR_MAPLE)
			// this.firePoint.graphics.drawCircle(0, 0, 10)
			// this.firePoint.graphics.endFill()
			this.firePoint.x = 0;
			this.firePoint.y = 100;
			this.firePoint.anchorOffsetY = 90;
			this._batteryFireBox.addChild(this.firePoint);
			this.firePoint.visible = true;

			this._batteryChangeEff = UIUtil.creatMovieClip("batteryChangeEff");
			this._batteryChangeEff.x = 0;
			this._batteryChangeEff.y = 80;
			this._batteryChangeEff.visible = false;
			this._batteryFireBox.addChild(this._batteryChangeEff);

			game.SetPublicFont(this._moneyTF);
			game.SetPublicFont(this._costMoneyTF);

			this._creatFireEff(false);
		}

		/**
		 * 获得金币图标
		 */
		public get coinImg(): eui.Image {
			return this._coinImg;
		}

		/**
		 * 交换椅子
		 */
		public changeSeat(battery: gameObject.Battery): void {
			let temp: Object = { x: this.x, y: this.y, id: this.seatId/*, isTop: this.isTop*/ }
			this.x = battery.x;
			this.y = battery.y;
			this.setSeatIndex(battery.seatId);

			battery.x = temp["x"];
			battery.y = temp["y"];
			battery.setSeatIndex(temp["id"])
		}


		/**
		 * 发射子弹效果
		 */
		public sendBulletEffect(): void {
			egret.Tween.get(this._firingImg).to({ scaleY: 0.9 }, 80).to({ scaleY: 1 }, 100);
			this.playOnceAndHide(this._batteryFireEff);
		}

		/**
		 * 设置炮口旋转
		 */
		public setFirePortRotation(angle: number): void {
			let seatId = this.seatId;
			if (seatId == 1) {
				angle = -angle;
			}
			else if (seatId == 4) {
				angle = -angle + 180;
			}
			else if (seatId == 3) {
				angle = angle - 180;
			}
			this._firingImg.rotation = angle;
			this.firePoint.rotation = angle;
			this._batteryFireEff.rotation = angle;
		}

		/**
		 * 缓动旋转
		 */
		public setTweenRotation(angle: number, cb: Handler): void {
			let seatId = this.seatId;
			if (seatId == 1) {
				angle = -angle;
			}
			else if (seatId == 4) {
				angle = -angle + 180;
			}
			else if (seatId == 3) {
				angle = angle - 180;
			}

			if (this._firingImg.rotation - angle > 180) {
				angle += 360
			}
			else if (this._firingImg.rotation - angle < -180) {
				angle -= 360
			}

			egret.Tween.get(this._firingImg).to({ rotation: angle }, 150).call(() => {
				// this._firingImg.rotation = angle;
				this.firePoint.rotation = angle;
				this._batteryFireEff.rotation = angle;
				cb.run();
			}, this)
		}

		/**
         * 初始化一次
         */
		public initOnce(initOnce: IReadOnlyData): void {
		}

		/**
		 * 点击减少按钮
		 */
		private _onClickDec(): void {
			if (this._waitForServe) {
				return;
			}
			let beforBatterId = FishingJoy.DataCenter.instance.beforBatterId(this._batteryID);
			let minBatterId = FishingJoy.DataCenter.instance.minBatterId();
			if (beforBatterId == minBatterId) {
				this.decBtn.enabled = false;
			}
			this.incBtn.enabled = true;
			if (beforBatterId < FishingJoy.DataCenter.instance.accessToProps(1)[0].needBatteryId) {
				Master.instance.isAutoShoot = false;
				EventManager.fireEvent(EVENT_ID.CHANEG_SHOOT_TYPE, [SHOOT_TYPE.AUTO, false])
			}
			if (beforBatterId < FishingJoy.DataCenter.instance.accessToProps(2)[0].needBatteryId) {
				Master.instance.isFastShoot = false;
				EventManager.fireEvent(EVENT_ID.CHANEG_SHOOT_TYPE, [SHOOT_TYPE.FAST, false])
			}
			if (beforBatterId < FishingJoy.DataCenter.instance.accessToProps(3)[0].needBatteryId) {
				Master.instance.isAimShoot = false;
				EventManager.fireEvent(EVENT_ID.CHANEG_SHOOT_TYPE, [SHOOT_TYPE.AIM, false])
			}
			game.SoundHand.Instance.playTurretDemotion();
			this._sendChangeBatteryMsg(beforBatterId);
		}


		/**
		 * 转换炮台协议
		 */
		private _sendChangeBatteryMsg(batteryID): void {
			let cmd: Cmd.ActionCmd_CS = new Cmd.ActionCmd_CS();
			cmd.act = new Cmd.Action()
			cmd.act.uid = Master.instance.uid;
			cmd.act.value = FishingJoy.DataCenter.instance.getBatterIndex(batteryID) + 1;
			cmd.act.op = Cmd.Operation.ChangeBattery;
			game.PokerFunction.tcpSend(cmd);
			this._waitForServe = true;
		}

		/**
		 * 播放一次自动隐藏
		 */
		public playOnceAndHide(mov: egret.MovieClip): void {
			mov.visible = true;
			mov.gotoAndPlay(1, 1)
			mov.once(egret.MovieClipEvent.COMPLETE, () => {
				mov.visible = false;
			}, this)
		}

		/**
		 * 点击增加按钮
		 */
		private _onClickinc(): void {
			if (this._waitForServe) {
				return;
			}
			let nextBatterId = FishingJoy.DataCenter.instance.nextBatterId(this._batteryID);
			let maxBatterId = FishingJoy.DataCenter.instance.maxBatterId();
			if (nextBatterId == maxBatterId) {
				this.incBtn.enabled = false;
			}
			this.decBtn.enabled = true;
			game.SoundHand.Instance.playTurretUpgrade();
			this._sendChangeBatteryMsg(nextBatterId);
		}

		/**
		 * 设置数据
		 */
		public setSeatData(seatdata: game.SeatData): void {
			this.seatdata = seatdata;
			this.seatdata.userChanged.add(this._userChanged, this);
			this.seatdata.batteryIndexChanged.add(this._onbatteryChange, this)
		}

		/**
		 * 设置状态
		 */
		public set state(value: SEAT_STATE) {
			if (this.seatState != value) {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._sendSitDownCmd, this);
				if (value == SEAT_STATE.EMPTY) {
					this.batteryDisplay.visible = false;
					this.waitingToJoin.visible = true;
					UIUtil.setBreatheTween(this.waitingToJoin, 1000)
					// this.once(egret.TouchEvent.TOUCH_TAP, this._sendSitDownCmd, this);

				}
				else if (value == SEAT_STATE.SOMEBODY) {
					this.batteryDisplay.visible = true;
					this.waitingToJoin.visible = false;
					egret.Tween.removeTweens(this.waitingToJoin);
				}
				this.seatState = value;
			}
		}

		/**
		 * 发送坐下请求
		 */
		private _sendSitDownCmd(): void {
			let cmd = new Cmd.SitDownCmd_CS();
			cmd.uid = Master.instance.uid;
			cmd.seatId = this.seatdata.seatId;
			cmd.roomId = FishingJoy.DataCenter.instance.roomID;
			game.PokerFunction.tcpSend(cmd);
			// SoundManager.instance.playSoundByName(SOUND_CONST.CLICK);
		}

		/**
		 * 当角色进行变更
		 */
		public _userChanged(user: game.UserInfo) {
			if (user) {
				this.state = SEAT_STATE.SOMEBODY;
				this._user = user;
				EventManager.fireEvent(EVENT_ID.ADD_BATTERY_IN_MAP, [this._user.uid, this]);
				this.goldCoinInitialization = true;
				this._user.nameChanged.add(this._nameChanged, this);
				this._user.pointChanged.add(this._onMoneyChanged, this);

				if (this._user.uid == uniLib.NetMgr.UID) {
					this._nameTF.textColor = ColorUtil.COLOR_ORANGE;
					this._decreaseImg.source = "batteryBase1";
					this._increaseImg.source = "batteryBase2";
					EventManager.registerEvent(EVENT_ID.ROOM_LEVEL_UPDATE, Handler.create(this, this.judgeBtnEnabled, [this._batteryID], true), REG_TYPE.ONCE);
					this.registerOperation(OPERATION_TYPE.MASTER);
					this.registerOperation(OPERATION_TYPE.BATTERY);
					this.decBtn = new tool.Button(this._decreaseImg);
					this.decBtn.mouseClickHandler = Handler.create(this, this._onClickDec)
					this.decBtn.enabled = false;
					this.incBtn = new tool.Button(this._increaseImg);
					this.incBtn.mouseClickHandler = Handler.create(this, this._onClickinc)
					this.incBtn.enabled = true;
					Master.instance.masterBattery = this;
					// this.judgeBtnEnabled();
					this._creatFireEff(true);
					this._playerEnterEff();
				}
				else {
					this._decreaseImg.source = "batteryBase10";
					this._increaseImg.source = "batteryBase9";
					this._nameTF.textColor = ColorUtil.COLOR_WHITE;
					this.registerOperation(OPERATION_TYPE.BATTERY);
					this._creatFireEff(false);
					Master.instance.masterBattery = null;
				}
			}
			else {
				this.seatdata.setLock(false, null);
				EventManager.fireEvent(EVENT_ID.REMOVE_BATTERY_IN_MAP, this._user.uid);
				this.state = SEAT_STATE.EMPTY;
				egret.Tween.removeTweens(this._firingImg);
				UIUtil.removeSelf(this._batteryFireEff);
				this._batteryFireEff.stop();
				this._batteryFireEff = null;
				this._user.nameChanged.remove(this._nameChanged, this);
				this._user.pointChanged.remove(this._onMoneyChanged, this);
				this._user = null;
				for (let i: number = 0; i < this._registerAry.length; i++) {
					manager.OperationManager.instance.unregisterOperation(this._registerAry[i])
				}
				this._clear();
				FishingJoy.FishingJoyLogic.instance.removeTheGoldCoinHeap(this.seatdata);
			}
		}

		/**
		 * 炮台切换
		 */
		private _onbatteryChange(): void {
			this._waitForServe = false;
			this.changeBatery(this.seatdata.batteryIndex)
		}

		/**
		 * 切换
		 */
		public changeBatery(index: number): void {
			let batteryID = FishingJoy.DataCenter.instance.getBatterIdByIndex(index - 1);
			let configList: table.TableBatteryConfig[] = table.TableBatteryConfig.instance();
			let config: table.TableBatteryConfig = configList.first((v: table.TableBatteryConfig) => v.id == batteryID);
			if (config == null) {
				this.seatdata.batteryIndex = 1;
				return;
			}
			this._batteryID = batteryID;
			this.fishNetRadius = config.fishNetRadius;
			if (this._user.uid == Master.instance.uid) {
				this.judgeBtnEnabled();
				this._firingImg.source = "batterySelf" + config.resNo;
			}
			else {
				this._firingImg.source = "battery" + config.resNo;
			}
			this._costMoneyTF.text = config.id.toString();
			this.fireBulletNum = config.fireBulletNum;
			this.playOnceAndHide(this._batteryChangeEff);

			this._firingImg.anchorOffsetX = this._firingImg.width / 2;
		}

		/**
		 * 判断加减按钮是否可以点击
		 */
		public judgeBtnEnabled(): void {
			let minBatterId = FishingJoy.DataCenter.instance.minBatterId();
			let maxBatterId = FishingJoy.DataCenter.instance.maxBatterId();
			this.incBtn.enabled = true;
			this.decBtn.enabled = true;
			if (this._batteryID <= minBatterId) {
				this.decBtn.enabled = false;
			}
			if (this._batteryID >= maxBatterId) {
				this.incBtn.enabled = false;
			}
		}

		/**
		 * 获取座位上玩家数据
		 */
		public get user(): game.UserInfo {
			return this._user;
		}

		/**
		 * 姓名被更改时
		 */
		private _nameChanged() {
			this._nameTF.text = this._user.nickName;
		}

		/**
		 * 玩家入场特效
		 */
		private _playerEnterEff(): void {
			let img1: CustomImage = new CustomImage();
			img1.y = 50;
			img1.source = "batterySelfInfo1";

			let img2: CustomImage = new CustomImage();
			img2.source = "batterySelfInfo2";
			img2.y = - 120;
			img2.x = 2;

			this._batteryFireBox.addChild(img1);
			this._batteryFireBox.addChild(img2);
			if (this.seatId == 1) {
				img1.scaleX = -1;
				img1.scaleY = 1;
				img2.scaleX = -1;
				img2.scaleY = 1;
				UIUtil.setScaleTween(img1, -1, 1);
			}
			else if (this.seatId == 2) {
				img1.scaleX = 1;
				img1.scaleY = 1;
				img2.scaleX = 1;
				img2.scaleY = 1;
				UIUtil.setScaleTween(img1, 1, 1);
			}
			else if (this.seatId == 3) {
				img1.scaleX = 1;
				img1.scaleY = 1;
				img2.scaleX = 1;
				img2.scaleY = 1;
				UIUtil.setScaleTween(img1, 1, 1);
			}
			else if (this.seatId == 4) {
				img1.scaleX = -1;
				img1.scaleY = 1;
				img2.scaleX = -1;
				img2.scaleY = 1;
				UIUtil.setScaleTween(img1, -1, 1);
			}

			// UIUtil.setDownUpTween(img2, -130, -110)
			Laya.timer.once(6000, this, () => {
				egret.Tween.get(img1).to({ alpha: 0 }, 2000);
				egret.Tween.get(img2).to({ alpha: 0 }, 2000).call(() => {
					egret.Tween.removeTweens(img1);
					egret.Tween.removeTweens(img2);
					this._batteryFireBox.removeChild(img1);
					this._batteryFireBox.removeChild(img2);
				})

			})
		}
		/**
		 * 创建开火特效
		 */
		private _creatFireEff(isSelf: boolean) {
			if (isSelf) {
				this._batteryFireEff = UIUtil.creatMovieClip("paojizi_1_fish");
			}
			else {
				this._batteryFireEff = UIUtil.creatMovieClip("paojilv_fish");
			}
			this._batteryFireEff.x = 0;
			this._batteryFireEff.y = 100;
			this._batteryFireEff.anchorOffsetY = 90;
			this._batteryFireEff.visible = false;
			this._batteryFireBox.addChild(this._batteryFireEff);
		}

		private goldCoinInitialization: boolean = true;
		/**
		 * 金币更变
		 */
		private _onMoneyChanged() {
			if (this._user) {
				if (this.goldCoinInitialization) {
					let point = this._user.point;
					this._moneyTF.text = GX.toEnInLocaleString(point + "");
					point == 0 || point == null ? this.goldCoinInitialization = true : this.goldCoinInitialization = false;
				}
			}
		}
		/**
		 * 刷新金币
		 */
		public goldCoinRefresh() {
			if (this._user) {
				this._moneyTF.text = GX.toEnInLocaleString(this._user.point + "");
			}
		}
		/**
		 * 清除
		 */
		private _clear(): void {
			this._moneyTF.text = "";
			this._nameTF.text = "";
		}


        /**
         * 初始化
         */
		public initialize(): void {
			this.x = this.varsData.bornX;
			this.y = this.varsData.bornY;
			manager.LayerManager.instance.addToLayer(this, this.layerType);
		}


        /**
         * 反初始化
         */
		public uninitialize(): void {
			manager.LayerManager.instance.removeFromLayer(this);
			for (let i: number = 0; i < this._registerAry.length; i++) {
				manager.OperationManager.instance.unregisterOperation(this._registerAry[i])
			}
			this._registerAry.length = 0;
			if (this._user) {
				this._user.nameChanged.remove(this._nameChanged, this);
				this._user.pointChanged.remove(this._onMoneyChanged, this);
			}
			this._clear();
			this.seatdata = null;
			this._user = null;
			this._moneyTF = null;
			this._nameTF = null;
		}

		/**
		 * 设置数据
		 */
		public setData(sign: GAMEOBJECT_SIGN, uID: number, varsData: IGameObjectVars, layerType: LAYER = LAYER.Seat): void {
			this.sign = sign;
			this.uID = uID;
			this.varsData = varsData;
			this.layerType = layerType;
		}


		/**
		 * 释放
		 */
		public dispose(): void {
			if (this.decBtn) {
				this.decBtn.dispose();
				this.decBtn = null;
			}
			if (this.incBtn) {
				this.incBtn.dispose();
				this.incBtn = null;
			}
			this._batteryChangeEff.stop();
			this._batteryChangeEff = null;

			this.varsData = null;
			this.uID = NaN;
			this.varsData = null;
		}

		/**
		 * 设置底板
		 */
		public setSeatIndex(index: number): void {
			if (index == 4) {
				this.scaleX = this.batteryScaleX;
				this.scaleY = -this.batteryScaleY;
				this._moneyTF.scaleX = 0.36;
				this._moneyTF.scaleY = -0.36;
				this._costMoneyTF.scaleX = 0.5;
				this._costMoneyTF.scaleY = -0.5;
				this._nameTF.scaleX = 1;
				this._nameTF.scaleY = -1;
				this._coinImg.scaleX = 1;
				this._coinImg.scaleY = -1;
				this._increaseImg.scaleX = 1;
				this._increaseImg.scaleY = -1
				this._decreaseImg.scaleX = 1;
				this._decreaseImg.scaleY = -1
				this.waitingToJoin.scaleY = -1
				this.waitingToJoin.scaleX = 1;
			}
			else if (index == 3) {
				this.scaleX = -this.batteryScaleX;
				this.scaleY = -this.batteryScaleY;
				this._moneyTF.scaleX = -0.36;
				this._moneyTF.scaleY = -0.36;
				this._costMoneyTF.scaleX = -0.5;
				this._costMoneyTF.scaleY = -0.5;
				this._nameTF.scaleX = -1;
				this._nameTF.scaleY = -1;
				this._coinImg.scaleX = -1;
				this._coinImg.scaleY = -1;
				this._increaseImg.scaleX = -1;
				this._increaseImg.scaleY = -1
				this._decreaseImg.scaleX = -1;
				this._decreaseImg.scaleY = -1
				this.waitingToJoin.scaleY = -1
				this.waitingToJoin.scaleX = -1;
			}
			else if (index == 2) {
				this.scaleX = this.batteryScaleX;
				this.scaleY = this.batteryScaleY;
				this._moneyTF.scaleX = 0.36;
				this._moneyTF.scaleY = 0.36;
				this._costMoneyTF.scaleX = 0.5;
				this._costMoneyTF.scaleY = 0.5;
				this._nameTF.scaleX = 1;
				this._nameTF.scaleY = 1;
				this._coinImg.scaleX = 1;
				this._coinImg.scaleY = 1;
				this._increaseImg.scaleX = 1;
				this._increaseImg.scaleY = 1
				this._decreaseImg.scaleX = 1;
				this._decreaseImg.scaleY = 1
				this.waitingToJoin.scaleY = 1
				this.waitingToJoin.scaleX = 1;

			}
			else if (index == 1) {
				this.scaleX = -this.batteryScaleX;
				this.scaleY = this.batteryScaleY;
				this._moneyTF.scaleX = -0.36;
				this._moneyTF.scaleY = 0.36;
				this._costMoneyTF.scaleX = -0.5;
				this._costMoneyTF.scaleY = 0.5;
				this._nameTF.scaleX = -1;
				this._nameTF.scaleY = 1;
				this._coinImg.scaleX = -1;
				this._coinImg.scaleY = 1;
				this._increaseImg.scaleX = -1;
				this._increaseImg.scaleY = 1
				this._decreaseImg.scaleX = -1;
				this._decreaseImg.scaleY = 1
				this.waitingToJoin.scaleY = 1
				this.waitingToJoin.scaleX = -1;
			}
			this.seatIndex = index;
		}

		/**
		 * 翻转
		 */
		public reverse(): void {

		}

		/**
		 * 注册一种行为
		 */
		public registerOperation(value: OPERATION_TYPE): void {
			this._registerAry.push(manager.OperationManager.instance.registerOperation(this, value));
		}
	}
}

enum SEAT_STATE {
	/*空的*/
	EMPTY,
	/*有人*/
	SOMEBODY
}