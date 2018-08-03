/**
 * 美人鱼特效
 * @author suo 
 */
module gameObject {
	export class DragonEff extends GameObjectRender {
		/**
		 * 文本
		 */
		private _txt: egret.TextField = new egret.TextField();
		/**
		 * 淡灰色底板
		 */
		private _blackBg: eui.Rect = new eui.Rect();
		/**
		 * 动画完成计数
		 */
		private tweenCompleteIndex: number = 0;
		/**
		 * 最大属性
		 */
		private readonly MAX_NUM: number = 110;
		/**
		 * 获得玩家昵称
		 */
		public get playerNickName(): string {
			return (<gameObject.IMermaidEffVars>this.varsData).playerNickName
		}
		/**
		 * 获得目标炮台
		 */
		public get targetBattery(): gameObject.Battery {
			return (<gameObject.IMermaidEffVars>this.varsData).targetBattery
		}

		/**
		 * 获得目标炮台
		 */
		public get score(): number {
			return (<gameObject.IDragonEffVars>this.varsData).score
		}

		public constructor() {
			super();
		}

		/**
         * 初始化一次
         */
		public initOnce(initOnce: IReadOnlyData): void {
			this._blackBg.fillColor = ColorUtil.COLOR_BLACK;
			this._blackBg.width = uniLib.Global.screenWidth;
			this._blackBg.height = uniLib.Global.screenHeight;
			this._blackBg.x = -uniLib.Global.screenWidth / 2;
			this._blackBg.y = -uniLib.Global.screenHeight / 2 - 50;
			this._blackBg.alpha = 0.4;
			this.addChildAt(this._blackBg, 0);

			this._txt.bold = true;
			this._txt.fontFamily = "SimHei";
			this._txt.size = 35;
			this._txt.y = -250;
			// let blurFliter = new egret.BlurFilter(1, 1);
			if (uniLib.Global.isH5) {
				let glowFilter = new egret.GlowFilter(0xFF7F50, 0.5, 1, 1, 10, 1, true)
				this._txt.filters = [glowFilter];
			}
			else {
				this._txt.textColor = 0xFF7F50;
			}
			this.addChild(this._txt);

			this.touchEnabled = false;
			this.touchChildren = false;
		}

		/**
         * 初始化
         */
		public initialize(): void {
			super.initialize();
			this._imagePlayer.alpha = 1;
			this._txt.alpha = 0;
			this._imagePlayer.visible = false;


			this._moviePlayer.play("TreasureBox_vanish", 1);
			this._moviePlayer.play("TreasureBox_box", 1, 1000, Handler.create(this, () => { this._imagePlayer.visible = true }));
			this._moviePlayer.play("TreasureBox-coin", 1, 1800);
			Laya.timer.once(2800, this, this._effComplete);
			Laya.timer.once(4000, this, this._showCoin);
		}

		/**
		 * 特效播放完毕
		 */
		private _effComplete(): void {
			egret.Tween.get(this._txt).to({ alpha: 1, }, 1000)
			this._txt.text = "恭喜 [" + this.playerNickName + "] 打开金龙的宝藏!";
			this._txt.x = -this._txt.textWidth / 2;

		}

		/**
		 * 显示飞金币
		 */
		private _showCoin(): void {
			/*消失*/
			egret.Tween.get(this._imagePlayer).to({ alpha: 0 }, 1500);
			let [x, y] = UIUtil.localToGlobal(this.targetBattery.coinImg);
			game.SoundHand.Instance.playGoldCoinRain();
			for (let i: number = 0; i <= this.MAX_NUM; i++) {
				Laya.timer.once(MathUtil.random(0, 500), this, this._creatCoin, [i, x, y], false);
			}
		}

		/**
		 * 动画飞到指定位置结束
		 */
		private _tweenComplete(coin: egret.MovieClip): void {
			coin.stop();
			manager.LayerManager.instance.removeFromLayer(coin, LAYER.EFFECT_BIG);
			Pool.recover(Pool.flyCoin, coin);
			this.tweenCompleteIndex++
			if (this.tweenCompleteIndex >= this.MAX_NUM) {
				this.tweenCompleteIndex = 0;
				GameObjectFactory.instance.recoverGameObject(this);
				EventManager.fireEvent(EVENT_ID.DRA_EFF_COMPLETE, [coin.x, coin.y, this.score]);
			}
		}

		/**
		 * 创建金币
		 */
		private _creatCoin(i: number, x: number, y: number): void {
			let coin: egret.MovieClip = Pool.getItemByCreateFun(Pool.flyCoin, Handler.create(this, this._creatCoinMov, null, true));
			coin.alpha = 1;
			coin.gotoAndPlay(1, -1);
			let targetX: number, targetY: number;
			if (i <= 1) {
				targetX = 610 + i * 30
				targetY = 540;
			}
			else if (i >= 1 && i <= 10) {
				targetX = MathUtil.random(500, 720)
				targetY = 500 + MathUtil.random(-10, 10)
			}
			else if (i >= 10 && i <= 25) {
				targetX = MathUtil.random(460, 750);
				targetY = 460 + MathUtil.random(-10, 10)
			}
			else if (i >= 26 && i <= 46) {
				targetX = MathUtil.random(450, 750);
				targetY = 420 + MathUtil.random(-10, 10)
			}
			else if (i >= 47 && i <= 72) {
				targetX = MathUtil.random(450, 760);
				targetY = 380 + MathUtil.random(-10, 10)
			}
			else if (i >= 73 && i <= 86) {
				targetX = MathUtil.random(480, 750);
				targetY = 340 + MathUtil.random(-10, 10)
			}
			else if (i >= 87 && i <= 95) {
				targetX = MathUtil.random(590, 780);
				targetY = 290 + MathUtil.random(-10, 10)
			}
			else if (i >= 96 && i <= 110) {
				targetX = MathUtil.random(600, 725);
				targetY = 250 + MathUtil.random(-10, 10)
			}
			coin.x = targetX
			coin.y = targetY
			manager.LayerManager.instance.addToLayer(coin, LAYER.EFFECT_BIG);
			egret.Tween.get(coin).to({ alpha: 1 }, 500).wait(1500).to({ x: x, y: y }, 500 + i * 10, egret.Ease.quadIn).call(this._tweenComplete, this, [coin]);
		}


		/**
		 * 创建金币影片剪辑
		 */
		private _creatCoinMov(): egret.MovieClip {
			let mov: egret.MovieClip = UIUtil.creatMovieClip("coin_fish");
			mov.scaleX = mov.scaleY = 0.4
			return mov;
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
			this._txt.text = "";
			this._moviePlayer.stopAll();
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