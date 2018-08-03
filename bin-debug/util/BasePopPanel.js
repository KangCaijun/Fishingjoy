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
 * 弹出面板基类
 * @author suo
 * 2018.4.4
 */
var FishingJoy;
(function (FishingJoy) {
    var Shape = egret.Shape;
    var BasePopPanel = (function (_super) {
        __extends(BasePopPanel, _super);
        function BasePopPanel(blackBg, enterEff, alpha) {
            if (blackBg === void 0) { blackBg = false; }
            if (enterEff === void 0) { enterEff = 1 /* CENTER */; }
            if (alpha === void 0) { alpha = 0.5; }
            var _this = _super.call(this) || this;
            _this._blakBG = new Shape();
            _this._drawBar = new Shape();
            _this._posX = -1;
            _this._posY = -1;
            _this._hasBlackBg = false;
            _this._alpha = 0.5;
            _this._lastPointX = -1;
            _this._lastPointY = -1;
            _this._panelWidth = -1;
            _this._panelHeight = -1;
            _this._panelX = 0;
            _this._panelY = 0;
            _this._alpha = alpha;
            _this._hasBlackBg = blackBg;
            _this._enterEff = enterEff;
            _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this._creationComplete, _this);
            return _this;
        }
        /**
         * 加载完毕并放置到舞台上
         */
        BasePopPanel.prototype._creationComplete = function (e) {
            this._selfAdaption();
            this._showEnterEff();
            this._showBlackBg();
            // this._drawDragRect();
        };
        Object.defineProperty(BasePopPanel.prototype, "blackBgHandler", {
            /**
             * 设置黑色背景点击函数
             */
            set: function (value) {
                this._blackBgHandler = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 自适应
         */
        BasePopPanel.prototype._selfAdaption = function () {
            if (this.skin["bg"] != null) {
                this._panelWidth = this.skin["bg"].width;
                this._panelHeight = this.skin["bg"].height;
                this._panelX = this.skin["bg"].x;
                this._panelY = this.skin["bg"].y;
            }
            else {
                this._panelWidth = this.width;
                this._panelHeight = this.height;
            }
            this._posX = (uniLib.Global.screenWidth - this._panelWidth) / 2 - this._panelX;
            this._posY = (uniLib.Global.screenHeight - this._panelHeight) / 2 - this._panelY;
        };
        /**
         * 绘制拖动栏（不需要就重写此方法）
         */
        BasePopPanel.prototype._drawDragRect = function () {
            this._drawBar.graphics.beginFill(ColorUtil.COLOR_BLACK, 0);
            this._drawBar.graphics.drawRect(0, 0, this._panelWidth, 50);
            this._drawBar.graphics.endFill();
            this._drawBar.x = this._panelX;
            this._drawBar.y = this._panelY;
            this._drawBar.touchEnabled = true;
            this.addChildAt(this._drawBar, 1);
            this._drawBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._starDrag, this);
            this._drawBar.addEventListener(egret.TouchEvent.TOUCH_END, this._endDrag, this);
            this._drawBar.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._outsideDrag, this);
        };
        /**
         * 开始拖动
         */
        BasePopPanel.prototype._starDrag = function (e) {
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
            this._lastPointX = e.stageX;
            this._lastPointY = e.stageY;
        };
        /**
         * 拖到屏幕外
         */
        BasePopPanel.prototype._outsideDrag = function (e) {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
            this._lastPointX = e.stageX;
            this._lastPointY = e.stageY;
        };
        /**
         * 正在拖动
         */
        BasePopPanel.prototype._onDrag = function (e) {
            var stepX = e.stageX - this._lastPointX;
            var stepY = e.stageY - this._lastPointY;
            this.x += stepX;
            this.y += stepY;
            this._lastPointX = e.stageX;
            this._lastPointY = e.stageY;
        };
        /**
         * 拖动结束
         */
        BasePopPanel.prototype._endDrag = function (e) {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
            this._lastPointX = e.stageX;
            this._lastPointY = e.stageY;
        };
        /**
         * 绘制黑色背景
         */
        BasePopPanel.prototype._showBlackBg = function () {
            if (this._hasBlackBg) {
                this._blakBG.graphics.beginFill(0x000000, this._alpha);
                this._blakBG.graphics.drawRect(0, 0, uniLib.Global.screenWidth, uniLib.Global.screenHeight);
                this._blakBG.graphics.endFill();
                this._blakBG.touchEnabled = true;
                this._blakBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickBlackBg, this);
                manager.LayerManager.instance.addToLayer(this._blakBG, 11 /* POP */);
            }
        };
        /**
         * 点击黑色背景
         */
        BasePopPanel.prototype._onClickBlackBg = function () {
            if (this._blackBgHandler) {
                this._blackBgHandler.run();
            }
        };
        /**
         * 释放(父类请super.dipose())
         */
        BasePopPanel.prototype.dispose = function () {
            GX.GameLayerManager.removeUI(this._blakBG);
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this._creationComplete, this);
            // this._drawBar.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._starDrag, this);
            // this._drawBar.removeEventListener(egret.TouchEvent.TOUCH_END, this._endDrag, this);
            // this._drawBar.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this._outsideDrag, this);
            // egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._onDrag, this);
            if (this._enterEff != 0 /* NORMAL */) {
                egret.Tween.removeTweens(this);
            }
            if (this._hasBlackBg) {
                this._blakBG.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onClickBlackBg, this);
                this._blakBG = null;
                if (this._blackBgHandler) {
                    this._blackBgHandler.recover();
                    this._blackBgHandler = null;
                }
            }
        };
        /**
         * 显示关闭面板特效
         */
        BasePopPanel.prototype.showCloseEff = function (cb) {
            var targetX = this._posX + this._panelWidth / 4;
            var targetY = this._posY + this._panelHeight / 4;
            egret.Tween.get(this).to({ alpha: 0, scaleX: 0.5, scaleY: 0.5, x: targetX, y: targetY }, 400, egret.Ease.backOut).call(this._closePanel, this, [cb]);
            GX.GameLayerManager.removeUI(this._blakBG);
        };
        /**
         * 关闭面板
         */
        BasePopPanel.prototype._closePanel = function (cb) {
            cb.run();
        };
        /**
         * 入场动画
         */
        BasePopPanel.prototype._showEnterEff = function () {
            if (this._enterEff != 0 /* NORMAL */) {
                egret.Tween.removeTweens(this);
            }
            switch (this._enterEff) {
                case 0 /* NORMAL */:
                    this.x = this._posX;
                    this.y = this._posY;
                    break;
                case 1 /* CENTER */:
                    this.alpha = 0;
                    this.scaleX = 0.5;
                    this.scaleY = 0.5;
                    this.x = this._posX + this._panelWidth / 4;
                    this.y = this._posY + this._panelHeight / 4;
                    egret.Tween.get(this).to({ alpha: 1, scaleX: 1, scaleY: 1, x: this._posX, y: this._posY }, 300, egret.Ease.backOut);
                    break;
                case 2 /* CENTER_FIERCE */:
                    this.alpha = 0;
                    this.scaleX = 0.5;
                    this.scaleY = 0.5;
                    this.x = this._posX + this._panelWidth / 4;
                    this.y = this._posY + this._panelHeight / 4;
                    egret.Tween.get(this).to({ alpha: 1, scaleX: 1, scaleY: 1, x: this._posX, y: this._posY }, 600, egret.Ease.elasticOut);
                    break;
                case 3 /* LEFT_TO_RIGHT */:
                    this.x = -this._panelWidth;
                    egret.Tween.get(this).to({ x: this._posX }, 300, egret.Ease.cubicOut);
                    break;
                case 4 /* RIGHT_TO_LEFT */:
                    this.x = this._panelWidth;
                    egret.Tween.get(this).to({ x: this._posX }, 300, egret.Ease.cubicOut);
                    break;
                case 5 /* TOP_TO_BOTTOM */:
                    this.y = -this._panelHeight;
                    egret.Tween.get(this).to({ y: this._posY }, 300, egret.Ease.cubicOut);
                    break;
                case 6 /* BOTTOM_TO_TOP */:
                    this.y = this._panelHeight;
                    egret.Tween.get(this).to({ y: this._posY }, 300, egret.Ease.cubicOut);
                    break;
            }
        };
        return BasePopPanel;
    }(eui.Component));
    FishingJoy.BasePopPanel = BasePopPanel;
    __reflect(BasePopPanel.prototype, "FishingJoy.BasePopPanel");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=BasePopPanel.js.map