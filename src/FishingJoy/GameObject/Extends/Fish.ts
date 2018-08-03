/**
 * 鱼
 * @author suo
 */
module gameObject {
	export class Fish extends GameObjectCollider {

		/**
		 * 注册操作id
		 */
		private _registerAry: number[] = [];
		/**
		 * 生命值
		 */
		public life: number = NaN;
		/**
		 * 最大生命值
		 */
		public maxLife: number = NaN
		/**
		 * 是否活着
		 */
		public isAlive: boolean = false;
		/**
		 * 速度
		 */
		public speed: number = 0;
		/**
		 * 服务器ID
		 */
		public servelID: number = -1;
		/**
		 * 赔率
		 */
		public odds: number = -1;
		/**
		 * 技能ID
		 */
		public skillID: number = -1;
		/**
		 * 技能渲染
		 */
		public skillRender: eui.Image[] | egret.MovieClip;
		/**
		 * 是否镜像
		 */
		public isMirror: boolean = false;
		/**
		 * 是否被击中变红
		 */
		public isRed: boolean = false;
		/**
		 * 滤镜
		 */
		public glowFilter: egret.GlowFilter = null;
		/**
		 * 爆炸碰撞
		 */
		public isBurstHit: boolean = false;

		// public dropShadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(-15, 60, ColorUtil.COLOR_SHADOW);

		/**
		 * 出生时间
		 */
		public get spawnTime(): number {
			return (<gameObject.IFishVars>this.varsData).spawnTime;
		}

		/**
		 * 路径ID
		 */
		public get pathID(): string {
			return (<gameObject.IFishVars>this.varsData).pathId;
		}

		public constructor() {
			super();
		}

		/**
         * 初始化一次
         */
		public initOnce(data: IFishInitOnce): void {
			super.initOnce(data);
			this.speed = data.speed;
			this.odds = data.odds;
			this.anchorOffsetX = data.anchorOffsetX;
			this.anchorOffsetY = data.anchorOffsetY;
			this.isMirror = data.isMirror;
			let strength: number;
			if (this.sign == GAMEOBJECT_SIGN.BIG_GOLD_FISH) {
				strength = 2;
			}
			else if (this.sign == GAMEOBJECT_SIGN.DRAGON) {
				strength = 2;
			}
			else {
				strength = 6;
			}
			this.glowFilter = new egret.GlowFilter(ColorUtil.COLOR_RED, 1, 1, 1, strength, 1, false);
			// this._moviePlayer.filters = [this.dropShadowFilter]

			if (data.isMirror && Master.instance.isRotation) {
				this.scaleY = -1;
			}
			else {
				this.scaleY = 1;
			}
			this.touchEnabled = true;

			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectFish, this);
		}

		/**
		 * 播放击中特效
		 */
		public playHitEff(uid: number, time: number = 200, isBurstHit: boolean = false): void {
			if (Master.instance.uid == uid) {
				if (isBurstHit) {
					Laya.timer.once(time, this, this._setNormal)
					this.isBurstHit = true;
				}
				else {
					if (this.isBurstHit) {
						return;
					}

					Laya.timer.once(time, this, this._setNormal)
					if (this.isRed) {
						return;
					}
					this.isRed = true;
				}
				this._moviePlayer.filters = [this.glowFilter]
			}
		}

		/**
		 * 恢复正常
		 */
		private _setNormal(): void {
			this._moviePlayer.filters = []
			this.isRed = false;
			this.isBurstHit = false;
		}

		/**
		 * 获得影片播放器
		 */
		public get MoivePlayer(): tool.MoviePlayer {
			return this._moviePlayer
		}

		/**
		 * 播放死亡动画并回收到资源池
		 */
		public playDieMov(cb: Handler): void {
			this._moviePlayer.switchAniPlayOnce("die", cb);
		}

		/**
         * 初始化
         */
		public initialize(): void {
			super.initialize();
			this.skillID = (this.varsData as IFishVars).skillID
			if (this._moviePlayer) {
				this._moviePlayer.switchAniByIndex(0);
			}
			this.life = this.maxLife;
			this.servelID = (this.varsData as IFishVars).serveID;
			if (this.servelID == undefined) {
				console.assert(false, "未定义severalID！")
			}
			if (this.varsData.operation) {
				for (let i: number = 0; i < this.varsData.operation.length; i++) {
					this._registerAry.push(manager.OperationManager.instance.registerOperation(this, this.varsData.operation[i].type));
				}
			}
			// if (Master.instance.isAimShoot) {
			// 	this._canTouch(SHOOT_TYPE.AIM, true);
			// }
			this.isAlive = true;
			if (this.skillID != 0) {
				this.skillRender = FishSkillTool.addSkillEff(this, this.skillID);
			}
		}


		/**
		 * 瞄准此鱼
		 */
		public onSelectFish(): void {
			if (Master.instance.aimFishServelID != this.servelID) {
				EventManager.fireEvent(EVENT_ID.AIM_FISH, this)
			}
			else {
				EventManager.fireEvent(EVENT_ID.FIRE_BULLET)
			}
		}



        /**
         * 反初始化
         */
		public uninitialize(): void {

			this.isCollided = false;
			if (this.skillRender) {
				FishSkillTool.removeSkill(this, this.skillRender)
				this.skillRender = null;
				this.skillID = -1;
			}
			this.clearGridIndex();
			this.unregisterOperation();
			super.uninitialize();
		}

		/**
		 * 移除行为
		 */
		public unregisterOperation(): void {
			for (let i: number = 0; i < this._registerAry.length; i++) {
				manager.OperationManager.instance.unregisterOperation(this._registerAry[i])
			}
			this._registerAry.length = 0;
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this._registerAry.length = 0
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectFish, this);
			this.glowFilter = null;
			super.dispose();
		}
	}
}