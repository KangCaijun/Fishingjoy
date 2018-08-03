/**
 * 美人鱼特效
 * @author suo 
 */
module gameObject {
	export class MermaidEff extends GameObjectRender {
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
		private readonly MAX_NUM: number = 60;
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
			return (<gameObject.IMermaidEffVars>this.varsData).score
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
			this._txt.size = 35;
			this._txt.y = -250;
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
			this._txt.alpha = 0;
			this._moviePlayer.alpha = 1;
			let cloudLeft: egret.MovieClip = this._moviePlayer.getMovieClipByKey("cloud_left");
			cloudLeft.x = -650;
			cloudLeft.alpha = 0
			let cloudRight: egret.MovieClip = this._moviePlayer.getMovieClipByKey("cloud_right");
			cloudRight.x = 650;
			cloudRight.alpha = 0
			let mer: egret.MovieClip = this._moviePlayer.getMovieClipByKey("MR_Xiaoshi");
			mer.alpha = 0;

			egret.Tween.get(cloudLeft).to({ x: -250, alpha: 1 }, 800)
			egret.Tween.get(cloudRight).to({ x: 250, alpha: 1 }, 800)

			this._moviePlayer.play("cloud_left", -1);
			this._moviePlayer.play("cloud_right", -1);
			this._moviePlayer.play("Rainbow_start", 1, 1800);
			this._moviePlayer.play("Rainbow_loop", -1, 2300);
			this._moviePlayer.play("Rainbow_coin", -1, 2300);
			Laya.timer.once(500, this, () => {
				egret.Tween.get(mer).to({ alpha: 1 }, 500);
				this._moviePlayer.play("MR_Xiaoshi", 1)
			});
			Laya.timer.once(3800, this, this._effComplete);
			Laya.timer.once(4600, this, () => { egret.Tween.get(this._moviePlayer).to({ alpha: 0 }, 500); })
			Laya.timer.once(4000, this, this._showCoin);

		}

		/**
		 * 特效播放完毕
		 */
		private _effComplete(): void {
			egret.Tween.get(this._txt).to({ alpha: 1, }, 1000)
			this._txt.text = "恭喜 [" + this.playerNickName + "] 获得美人鱼的祝福!";
			this._txt.x = -this._txt.textWidth / 2;
		}

		/**
		 * 显示飞金币
		 */
		private _showCoin(): void {
			/*消失*/
			let [x, y] = UIUtil.localToGlobal(this.targetBattery.coinImg);
			game.SoundHand.Instance.playGoldCoinRain();
			for (let i: number = 0; i < this.MAX_NUM; i++) {
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
				EventManager.fireEvent(EVENT_ID.MER_EFF_COMPLETE, [coin.x, coin.y, this.score]);
			}
		}

		/**
		 * 创建金币
		 */
		private _creatCoin(i: number, x: number, y: number): void {
			let coin: egret.MovieClip = Pool.getItemByCreateFun(Pool.flyCoin, Handler.create(this, this._creatCoinMov, null, true));
			coin.alpha = 0;
			coin.gotoAndPlay(1, -1);
			let targetX: number, targetY: number;
			if (i <= 4) {
				targetX = MathUtil.random(-250, -200)
				targetY = 50 + MathUtil.random(-10, 10)
			}
			else if (i >= 5 && i <= 12) {
				targetX = MathUtil.random(-250, -150)
				targetY = 0 + MathUtil.random(-10, 10)
			}
			else if (i >= 13 && i <= 18) {
				targetX = MathUtil.random(-210, -110);
				targetY = -50 + MathUtil.random(-10, 10)
			}
			else if (i >= 19 && i <= 40) {
				targetX = MathUtil.random(-160, 140);
				targetY = -100 + MathUtil.random(-10, 10)
			}
			else if (i >= 41 && i <= 48) {
				targetX = MathUtil.random(-80, -80 + 150);
				targetY = -150 + MathUtil.random(-10, 10)
			}
			else if (i >= 49 && i <= 58) {
				targetX = MathUtil.random(160, 210);
				targetY = -50 + MathUtil.random(-10, 10)
			}
			else if (i >= 59) {
				targetX = 220
				targetY = 0 + MathUtil.random(-10, 10)
			}
			coin.x = targetX + this.x;
			coin.y = targetY + this.y;
			manager.LayerManager.instance.addToLayer(coin, LAYER.EFFECT_BIG);
			egret.Tween.get(coin).to({ alpha: 1 }, 1500).wait(500).to({ x: x, y: y }, 500 + i * 10, egret.Ease.quadIn).call(this._tweenComplete, this, [coin]);
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