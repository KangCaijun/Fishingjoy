var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 主场景视图
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishMainSceneView = (function (_super) {
        __extends(FishMainSceneView, _super);
        function FishMainSceneView() {
            var _this = _super.call(this) || this;
            _this.skinName = "MainSceneSkin_fish";
            _this.init();
            return _this;
        }
        /**
         * 释放
         */
        FishMainSceneView.prototype.dispose = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            GX.GameLayerManager.removeUI(this);
        };
        /**
         * 初始化
         */
        FishMainSceneView.prototype.init = function () {
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
        };
        /**
         * 退潮资源
         */
        FishMainSceneView.prototype.ebbResources = function () {
            this.sprayGroups = new eui.Group();
            this.sprayGroups.height = uniLib.Global.screenHeight;
            this.jianbianImages = new eui.Image();
            this.jianbianImages.source = "jianbian_png";
            // this.sprayGroups.addChild(this.jianbianImages);
            this.backGrounds1 = new eui.Image();
        };
        /**
         * 清除
         */
        FishMainSceneView.prototype.clear = function () {
        };
        /**
         * 初始化自定义滤镜
         */
        FishMainSceneView.prototype.initCustomFilter = function () {
            var vertexSrc = "attribute vec2 aVertexPosition;\n" +
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
            var fragmentSrc3 = [
                "precision lowp float;\n" +
                    "varying vec2 vTextureCoord;",
                "varying vec4 vColor;\n",
                "uniform sampler2D uSampler;",
                "uniform vec2 center;",
                "uniform vec3 params;",
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
            var customFilter = new egret.CustomFilter(vertexSrc, fragmentSrc3, {
                center: { x: 0.5, y: 0.5 },
                params: { x: 10, y: 0.8, z: 0.1 },
                time: 0
            });
            var fishLayer = manager.LayerManager.instance.getLayer(2 /* Fish */);
            this.filters = [customFilter];
            // fishLayer.filters = [customFilter];
            this.customFilter = customFilter;
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        FishMainSceneView.prototype.onEnterFrame = function () {
            var _this = this;
            var customFilter = this.customFilter;
            customFilter.uniforms.time += 0.01;
            if (customFilter.uniforms.time > 1) {
                customFilter.uniforms.time = 0.0;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                game.Timer.setTimeout(function () {
                    _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
                }, this, 5000);
            }
        };
        /**
         * 初始化
         */
        FishMainSceneView.prototype.onInit = function () {
            GX.GameLayerManager.addUIToScene(this);
            for (var i = 0; i < 4; i++) {
                var wave = uniLib.DisplayUtils.createMovieClicp("wave");
                wave.touchEnabled = false;
                var _a = UIUtil.getGridItemPos(i, wave, 2, -20, -20), x = _a[0], y = _a[1];
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
                manager.LayerManager.instance.addToLayer(wave, 6 /* Wave */);
            }
        };
        /**
         * 展示时
         */
        FishMainSceneView.prototype.onShow = function () {
        };
        /**
         * 隐藏时
         */
        FishMainSceneView.prototype.onHide = function () {
        };
        return FishMainSceneView;
    }(eui.Component));
    FishingJoy.FishMainSceneView = FishMainSceneView;
    __reflect(FishMainSceneView.prototype, "FishingJoy.FishMainSceneView", ["BaseUIView"]);
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishMainSceneView.js.map