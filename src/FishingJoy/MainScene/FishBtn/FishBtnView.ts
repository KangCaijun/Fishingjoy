/**
 * 视图模板
 * @author suo
 */
module FishingJoy {
	export class FishBtnView extends eui.Component implements BaseUIView {

		/**
		 * GM
		 */
		public gmGroup: eui.Group;
		/**
		 * GM
		 */
		public gmCheckBox: eui.CheckBox;
		/**
		 * 退出游戏按钮
		 */
		public exitGameBtn: tool.Button;
		/**
		 * 切换场景按钮
		 */
		public sceneSwitching: tool.Button;
		/**
		 * 急速射击按钮
		 */
		public fastShoot: tool.Button;
		/**
		 * 瞄准射击按钮
		 */
		public aimShoot: tool.Button;
		/**
		 * 自动射击按钮
		 */
		public autoShoot: tool.Button;
		/**
		 * 按钮容器
		 */
		public BtnGroup: eui.Group;
		/**
		 * 帮助按钮
		 */
		public helpBtn: tool.Button
		/**
		 * 快速选中效果
		 */
		public fastShootEff: egret.MovieClip;
		/**
		 * 瞄准选中效果
		 */
		public aimShootEff: egret.MovieClip;
		/**
		 * 自动射击效果
		 */
		public autoShootEff: egret.MovieClip;

		/**
		 * 测试用 奖池显示
		 */
		public goldPoolLabel: eui.Label;
		public constructor() {
			super();
			this.skinName = "FishBtnSkin_fish";
		}

		/**
		 * 初始化
		 */
		public onInit(): void {
			this.width = uniLib.Global.screenWidth;
			this.height = uniLib.Global.screenHeight;
			manager.LayerManager.instance.addToLayer(this, LAYER.UI);
			this.exitGameBtn = new tool.Button(this.skin["exitGameBtn"]);
			this.sceneSwitching = new tool.Button(this.skin["sceneSwitching"]);
			this.fastShoot = new tool.Button(this.skin["fastShoot"]);
			this.autoShoot = new tool.Button(this.skin["autoShoot"]);
			this.aimShoot = new tool.Button(this.skin["aimShoot"]);
			this.fastShootEff = UIUtil.creatMovieClip("fastShootEff");
			this.fastShootEff.x = this.fastShoot.x + 88;
			this.fastShootEff.y = this.fastShoot.y + 233;
			this.fastShootEff.visible = false;
			this.fastShootEff.blendMode = egret.BlendMode.ADD;
			this.addChild(this.fastShootEff);
			if (uniLib.Global.lobbyMode) {
				this.sceneSwitching.visible = false;
			}
			this.aimShootEff = UIUtil.creatMovieClip("aimShootEff");
			this.aimShootEff.x = this.aimShoot.x + 88;
			this.aimShootEff.y = this.aimShoot.y + 233;
			this.aimShootEff.visible = false;
			this.aimShootEff.blendMode = egret.BlendMode.ADD;
			this.addChild(this.aimShootEff);

			this.autoShootEff = UIUtil.creatMovieClip("autoShootEff");
			this.autoShootEff.x = this.autoShoot.x + 88;
			this.autoShootEff.y = this.autoShoot.y + 233;
			this.autoShootEff.visible = false;
			this.autoShootEff.blendMode = egret.BlendMode.ADD;
			this.addChild(this.autoShootEff);


			for (let i: number = GM.Type.Min; i <= GM.Type.Max; i++) {
				let checkBox = new eui.CheckBox();
				checkBox.skinName = GMButtonSkin_fish;
				checkBox.name = i + "";
				checkBox.label = GM.instance.typeToString(i);
				checkBox.width = 120;
				checkBox.height = 50;
				this.gmGroup.addChild(checkBox);
			}
			this.gmCheckBox.visible = false;
			this.gmGroup.visible = false;
			if (uniLib.BrowersUtils.GetRequest("debug")) {
				this.gmCheckBox.visible = true;
			}

			this.helpBtn = new tool.Button(this.skin["helpBtn"]);

		}

		/**
		 * 奖池更新
		 */
		public updataGoldPoolLabel(freeGoldPool: number, normalGoldPool: number) {
			this.goldPoolLabel.text = "免费奖池：" + freeGoldPool + "   普通奖池：" + normalGoldPool;
			this.goldPoolLabel.visible = true;
		}
		/**
		 * 展示时
		 */
		public onShow(): void {

		}

		/**
		 * 清除
		 */
		public clear(): void {

		}

		/**
		 * 隐藏时
		 */
		public onHide(): void {

		}

		/**
		 * 释放时
		 */
		public dispose(): void {
			manager.LayerManager.instance.removeFromLayer(this);
			GX.GameLayerManager.removeUI(this);
			this.exitGameBtn.dispose()
			this.exitGameBtn = null;
			this.fastShoot.dispose();
			this.fastShoot = null;
			this.autoShoot.dispose();
			this.autoShoot = null;
			this.aimShoot.dispose();
			this.aimShoot = null;
		}
	}
}