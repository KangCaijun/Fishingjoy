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
 * 视图模板
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishBtnView = (function (_super) {
        __extends(FishBtnView, _super);
        function FishBtnView() {
            var _this = _super.call(this) || this;
            _this.skinName = "FishBtnSkin_fish";
            return _this;
        }
        /**
         * 初始化
         */
        FishBtnView.prototype.onInit = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
            manager.LayerManager.instance.addToLayer(this, 10 /* UI */);
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
            for (var i = GM.Type.Min; i <= GM.Type.Max; i++) {
                var checkBox = new eui.CheckBox();
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
        };
        /**
         * 奖池更新
         */
        FishBtnView.prototype.updataGoldPoolLabel = function (freeGoldPool, normalGoldPool) {
            this.goldPoolLabel.text = "免费奖池：" + freeGoldPool + "   普通奖池：" + normalGoldPool;
            this.goldPoolLabel.visible = true;
        };
        /**
         * 展示时
         */
        FishBtnView.prototype.onShow = function () {
        };
        /**
         * 清除
         */
        FishBtnView.prototype.clear = function () {
        };
        /**
         * 隐藏时
         */
        FishBtnView.prototype.onHide = function () {
        };
        /**
         * 释放时
         */
        FishBtnView.prototype.dispose = function () {
            manager.LayerManager.instance.removeFromLayer(this);
            GX.GameLayerManager.removeUI(this);
            this.exitGameBtn.dispose();
            this.exitGameBtn = null;
            this.fastShoot.dispose();
            this.fastShoot = null;
            this.autoShoot.dispose();
            this.autoShoot = null;
            this.aimShoot.dispose();
            this.aimShoot = null;
        };
        return FishBtnView;
    }(eui.Component));
    FishingJoy.FishBtnView = FishBtnView;
    __reflect(FishBtnView.prototype, "FishingJoy.FishBtnView", ["BaseUIView"]);
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishBtnView.js.map