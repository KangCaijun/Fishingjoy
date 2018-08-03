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
 * 公共加载 延用以前淘金的
 */
var PublicLoadingView = (function (_super) {
    __extends(PublicLoadingView, _super);
    function PublicLoadingView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    PublicLoadingView.prototype.init = function () {
        if (!this.backgroud_bmp) {
            this.backgroud_bmp = MJLobby.LobbyResUtil.createBitmapByName("HZ_login_bg_png");
            this.backgroud_bmp.width = uniLib.Global.screenWidth;
            this.backgroud_bmp.height = uniLib.Global.screenHeight;
            this.addChild(this.backgroud_bmp);
        }
        if (!this.bigLogo) {
            this.bigLogo = MJLobby.LobbyResUtil.createBitmapByName("big_logo_png", 268, 106);
            this.addChild(this.bigLogo);
        }
        if (!this.darkLine_bmp) {
            this.darkLine_bmp = MJLobby.LobbyResUtil.createBitmapByName("lb_loading_darkLine", 432, uniLib.Global.screenHeight - (196 * uniLib.ScreenUtils.scaleFactor));
            this.addChild(this.darkLine_bmp);
        }
        if (!this.lightLine_bmp) {
            this.lightLine_bmp = MJLobby.LobbyResUtil.createBitmapByName("lb_loading_lightLine", this.darkLine_bmp.x + 2, this.darkLine_bmp.y - 10);
            this.lightLine_bmp.scale9Grid = new egret.Rectangle(12, 18, 10, 2);
            this.addChild(this.lightLine_bmp);
        }
        if (!this.explain_txf) {
            this.explain_txf = MJLobby.LobbyResUtil.createTextFeild(0, egret.HorizontalAlign.CENTER, "", 22, 500, uniLib.Global.screenHeight - (171 * uniLib.ScreenUtils.scaleFactor), 276);
            this.addChild(this.explain_txf);
        }
        if (!this._progTxt) {
            this._progTxt = MJLobby.LobbyResUtil.createTextFeild(0, egret.HorizontalAlign.CENTER, "", 22, 520, uniLib.Global.screenHeight - (220 * uniLib.ScreenUtils.scaleFactor), 276);
            this.addChild(this._progTxt);
        }
        if (!this._infoTxt) {
            this._infoTxt = MJLobby.LobbyResUtil.createTextFeild(0x000000, egret.HorizontalAlign.CENTER, "抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益脑 沉迷游戏伤身 合理安排时间 享受健康生活", 20, 0, uniLib.Global.screenHeight - (44 * uniLib.ScreenUtils.scaleFactor), MJLobby.LobbyDataCache.defaultWidth);
            this.addChild(this._infoTxt);
        }
    };
    PublicLoadingView.prototype.setProgress = function (loaded, total, desc, resourceName, force) {
        if (force === void 0) { force = false; }
        if (!this._versionTxt) {
            this._versionTxt = MJLobby.LobbyResUtil.createTextFeild(0x999999, egret.HorizontalAlign.RIGHT, MJLobby.LobbyDataCache.version, 22, 864);
            this._versionTxt.x = uniLib.Global.screenWidth - this._versionTxt.width;
            this._versionTxt.y = uniLib.Global.screenHeight - this._versionTxt.height;
            this.addChild(this._versionTxt);
            this._versionTxt.text = MJLobby.LobbyDataCache.version;
        }
        if (total && total != 0) {
            var num = Math.ceil((loaded / total) * 100);
            if (desc && desc != "") {
                this.explain_txf.text = desc;
            }
            else {
                this.explain_txf.text = PublicLoadingView.explain;
            }
            if (force == false && num > 93) {
                num = 93;
            }
            var widthX = (this.darkLine_bmp.width) * (num / 100) + 27;
            this.lightLine_bmp.width = widthX;
            if (this.lightLine_bmp.width > this.darkLine_bmp.width) {
                this.lightLine_bmp.width = this.darkLine_bmp.width;
            }
            if (this._progTxt) {
                this._progTxt.text = num + "%";
            }
        }
        else {
            this.explain_txf.text = desc;
        }
        this.explain_txf.x = (MJLobby.LobbyDataCache.defaultWidth - this.explain_txf.width) / 2;
    };
    PublicLoadingView.explain = "正在加载游戏资源...";
    return PublicLoadingView;
}(egret.Sprite));
__reflect(PublicLoadingView.prototype, "PublicLoadingView");
//# sourceMappingURL=PublicLoadingView.js.map