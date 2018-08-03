/**
 * 主场景视图
 * @author suo
 */
module FishingJoy {
	export class FishMainSceneView extends eui.Component implements BaseUIView {
		/**
		 * 背景
		 */
		public backGround0: eui.Image
		/**
		 * 即将切换的背景
		 */
		public backGrounds1: eui.Image
		/**
		 * 浪花特效group
		 */
		public sprayGroups: eui.Group;

		/**
		 * 浪花渐变图
		 */
		public jianbianImages: eui.Image;

		// /**
		//  * 波浪容器
		//  */
		// public langboGroup: eui.Group;

		/**
		 * 水波纹 自定义滤镜
		 */
		private customFilter: egret.CustomFilter;


		public constructor() {
			super();
			this.skinName = "MainSceneSkin_fish";
			this.init();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			GX.GameLayerManager.removeUI(this);
		}
		/**
		 * 初始化
		 */
		public init(): void {
			this.ebbResources();
			game.SoundHand.Instance.playBgMp3();
			game.SoundHand.Instance.playBgMusic();
			this.jianbianImages.width = this.backGrounds1.width = this.backGround0.width = this.width = uniLib.Global.screenWidth;
			this.backGrounds1.height = this.backGround0.height = this.height = uniLib.Global.screenHeight;
			this.sprayGroups.x = this.width + 140;
			this.backGrounds1.x = this.width;
			// this.backGrounds1.rotation = this.backGround0.rotation
			// if (uniLib.Global.isH5)
			// 	this.initCustomFilter();
		}
		/**
		 * 退潮资源
		 */
		public ebbResources(): void {
			this.sprayGroups = new eui.Group();
			this.sprayGroups.height = uniLib.Global.screenHeight;
			this.jianbianImages = new eui.Image();
			this.jianbianImages.source = "jianbian_png";
			// this.sprayGroups.addChild(this.jianbianImages);
			this.backGrounds1 = new eui.Image();
		}

		/**
		 * 清除
		 */
		public clear(): void {
		}

		/**
		 * 初始化自定义滤镜
		 */
		private initCustomFilter() {
			let vertexSrc =
				"attribute vec2 aVertexPosition;\n" +
				"attribute vec2 aTextureCoord;\n" +
				"attribute vec2 aColor;\n" +

				"uniform vec2 projectionVector;\n" +

				"varying vec2 vTextureCoord;\n" +
				"varying vec4 vColor;\n" +

				"const vec2 center = vec2(-1.0, 1.0);\n" +

				"void main(void) {\n" +
				"   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
				"   vTextureCoord = aTextureCoord;\n" +
				"   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
				"}";

			let fragmentSrc3 = [
				"precision lowp float;\n" +
				"varying vec2 vTextureCoord;",
				"varying vec4 vColor;\n",
				"uniform sampler2D uSampler;",

				"uniform vec2 center;",
				"uniform vec3 params;", // 10.0, 0.8, 0.1"
				"uniform float time;",

				"void main()",
				"{",
				"vec2 uv = vTextureCoord.xy;",
				"vec2 texCoord = uv;",

				"float dist = distance(uv, center);",

				"if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )",
				"{",
				"float diff = (dist - time);",
				"float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",

				"float diffTime = diff  * powDiff;",
				"vec2 diffUV = normalize(uv - center);",
				"texCoord = uv + (diffUV * diffTime);",
				"}",

				"gl_FragColor = texture2D(uSampler, texCoord);",
				"}"
			].join("\n");

			let customFilter = new egret.CustomFilter(
				vertexSrc,
				fragmentSrc3,
				{
					center: { x: 0.5, y: 0.5 },
					params: { x: 10, y: 0.8, z: 0.1 },
					time: 0
				}
			);
			let fishLayer = manager.LayerManager.instance.getLayer(LAYER.Fish);
			this.filters = [customFilter];
			// fishLayer.filters = [customFilter];
			this.customFilter = customFilter;
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}
		private onEnterFrame() {
			let customFilter = this.customFilter
			customFilter.uniforms.time += 0.01;
			if (customFilter.uniforms.time > 1) {
				customFilter.uniforms.time = 0.0;
				this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
				game.Timer.setTimeout(() => {
					this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
				}, this, 5000);
			}
		}
		/**
		 * 初始化
		 */
		public onInit(): void {
			GX.GameLayerManager.addUIToScene(this);
			for (let i: number = 0; i < 4; i++) {
				let wave = uniLib.DisplayUtils.createMovieClicp("wave");
				wave.touchEnabled = false;
				let [x, y] = UIUtil.getGridItemPos(i, wave, 2, -20, -20)
				wave.play(-1);
				wave.scaleX = wave.scaleY = 3;
				wave.x = wave.width / 2 * wave.scaleX + x * wave.scaleX;
				wave.y = wave.height / 2 * wave.scaleY + y * wave.scaleY;
				if (uniLib.Global.isH5) {
					wave.alpha = 0.3;
				}
				else {
					wave.alpha = 0.5;
				}
				wave.blendMode = egret.BlendMode.ADD;
				manager.LayerManager.instance.addToLayer(wave, LAYER.Wave);
			}
		}

		/**
		 * 展示时
		 */
		public onShow(): void {
		}

		/**
		 * 隐藏时
		 */
		public onHide(): void {

		}

	}
}