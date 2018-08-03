//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var FishMain = (function (_super) {
    __extends(FishMain, _super);
    /**
     * 加载进度界面
     * loading process interface
     */
    function FishMain(param) {
        var _this = _super.call(this, param) || this;
        _this.isThemeLoadEnd = false;
        egret.ImageLoader.crossOrigin = "anonymous";
        game.GameViewConfig.mainMediatorName = uniLib.getQualifiedClassName(game.FishMediator);
        if (_this._gameInfo) {
            game.DataCache.gameInfo = _this._gameInfo;
        }
        if (param && param.destroyResOnExit) {
            game.DataCache.destroyResOnExit = param.destroyResOnExit;
        }
        if (_this._gameInfo && _this._gameInfo.extData) {
            game.DataCache.platParam = _this._gameInfo.extData;
        }
        game.GameData.iskPoker = true;
        game.Config.SeatGame = false;
        game.Config.GameSeatNumber = 4;
        game.Config.IsFormatName = false;
        game.Config.BetTimeout = 30;
        return _this;
    }
    FishMain.prototype.start = function (e) {
        if (e === void 0) { e = null; }
        var initData = {};
        initData.designWidth = 1280;
        initData.designHeight = 720;
        initData.scaleMode = egret.StageScaleMode.SHOW_ALL;
        initData.debug = true;
        uniLib.init(initData);
        RES.setMaxLoadingThread(6);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    FishMain.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    FishMain.prototype.onThemeLoadComplete = function () {
        this.preLoadEnd();
    };
    FishMain.prototype.preLoadEnd = function () {
        uniLib.UIMgr.instance.showProcessBar(null, 2, 100, "正在加载游戏资源...");
        if (uniLib.Global.lobbyMode) {
            uniLib.ResLoadMgr.instance.load(game.GameConstant.ResGroup_BY, this.startCreateScene, this.onItemLoadError, this, null);
        }
        else {
            uniLib.ResLoadMgr.instance.load(game.GameConstant.ResGroup_BY, this.startCreateScene, this.onItemLoadError, this, PublicLoadingView);
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    FishMain.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.groupName + "..." + event.itemsLoaded + "..." + event.itemsTotal + " has failed to load");
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    FishMain.prototype.startCreateScene = function () {
        // egret.MainContext.instance.stage.setContentSize(1920, 1080);
        // game.GameInfo.manage=game.PublicManage.getInstance();
        game.DataCache.stageWidth = uniLib.Global.screenWidth;
        game.DataCache.stageHight = uniLib.Global.screenHeight;
        uniLib.UIMgr.instance.hideLoading();
        uniLib.SceneMgr.instance.changeScene(game.PokerGameScene);
        uniLib.Console.addLogforbid(new Cmd.HitFishCmd_CS().GetType());
        uniLib.Console.addLogforbid(new Cmd.BetRoomCmd_CS().GetType());
        uniLib.Console.addLogforbid(new Cmd.MoneyUpdateCmd_S().GetType());
        uniLib.Console.addLogforbid(new Cmd.SpawnFishCmd_S().GetType());
        uniLib.Console.addLogforbid(new Cmd.GameTimeSyncCmd_CS().GetType());
        if (!uniLib.Global.lobbyMode) {
            uniLib.Console.log = function (message) {
                for (var _a = 0, _b = uniLib.Console.logforbid; _a < _b.length; _a++) {
                    var item = _b[_a];
                    if (message.indexOf(item) != -1) {
                        return;
                    }
                }
                var optionalParams = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    optionalParams[_i - 1] = arguments[_i];
                }
                var level = this.getLocalLevel(this.LogLevel);
                if (level <= uniLib.LOGLEVEL.DEBUG) {
                    if (message == null || message == undefined || (typeof (message) == "string" && message == "")) {
                        this.error("日志不能为空,请加标识头,不能再坑队友了!");
                    }
                    if (uniLib.Global.isH5) {
                        console.log(new Date().toTimeString().split(" ")[0], "LOG", message, optionalParams);
                    }
                    else {
                        console.log(message, optionalParams);
                    }
                    if (level != this.LogLevel) {
                        this.logToServer(level, message, optionalParams);
                    }
                }
            };
        }
    };
    FishMain.prototype.resize = function () {
        this.scaleY = uniLib.Global.screenHeight / game.DataCache.defaultHeight;
        this.y = (uniLib.Global.screenHeight - game.DataCache.defaultHeight) / 2;
    };
    return FishMain;
}(uniLib.GameDoc));
__reflect(FishMain.prototype, "FishMain");
var uniLib;
(function (uniLib) {
    var Console;
    (function (Console) {
        function addLogforbid(name) {
            uniLib.Console.logforbid.push(name);
        }
        Console.addLogforbid = addLogforbid;
        Console.logforbid = [];
    })(Console = uniLib.Console || (uniLib.Console = {}));
})(uniLib || (uniLib = {}));
//# sourceMappingURL=FishMain.js.map