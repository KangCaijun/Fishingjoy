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
 * 控制器
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishBtnControl = (function (_super) {
        __extends(FishBtnControl, _super);
        function FishBtnControl() {
            var _this = _super.call(this) || this;
            _this.b = true;
            //暂时务删
            console.error("FishBtnControl constructor");
            return _this;
        }
        /**
         * 初始化
         */
        FishBtnControl.prototype.onInit = function () {
            this._fishBtnView = this._viewCenter.getView(FishingJoy.FishBtnView);
            this._fishBtnView.autoShoot.mouseClickHandler = Handler.create(this, this._clickAutoShoot);
            this._fishBtnView.aimShoot.mouseClickHandler = Handler.create(this, this._clickAimShoot);
            this._fishBtnView.fastShoot.mouseClickHandler = Handler.create(this, this._clickFastShoot);
            this._fishBtnView.gmCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickGmCheckBox, this);
            this._fishBtnView.gmGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickGmGroup, this);
            this._fishBtnView.exitGameBtn.mouseClickHandler = Handler.create(this, this._onExitBtnClick);
            this._fishBtnView.sceneSwitching.mouseClickHandler = Handler.create(this, this._changeScene);
            this._fishBtnView.helpBtn.mouseClickHandler = Handler.create(this, this._clickHelp);
            EventManager.registerEvent(14 /* PLAY_FIRE_EFF */, Handler.create(this, this.setShootEff));
        };
        /**
         * 点击帮助
         */
        FishBtnControl.prototype._clickHelp = function () {
            UICenter.instance.openUI(1001 /* FishHelp */);
        };
        FishBtnControl.prototype._changeScene = function () {
            // let data: gameObject.IMermaidEffVars = <gameObject.IMermaidEffVars>{};
            // data.bornX = uniLib.Global.screenWidth / 2;
            // data.bornY = uniLib.Global.screenHeight / 2 + 50;
            // data.targetBattery = FishingJoyLogic.instance.allBattery.get(Master.instance.uid);
            // data.playerNickName = data.targetBattery.user.nickName;
            // data.score = 1000;
            // gameObject.GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.MERMAID_EFF, data, LAYER.EFFECT_BIG)
            // let a = new Cmd.ChangeSceneCmd_S()
            // a.sceneId = 3;
            // FishingJoy.FishingJoyLogic.instance.changeScene(a);
            // game.SoundHand.Instance.playBgMusic();
            // console.error(battery._costMoneyTF.text)
            if (GX.GameLayerManager.sceneLayer.parent.x != 0 || GX.GameLayerManager.sceneLayer.parent.y != 0) {
                GX.GameLayerManager.sceneLayer.parent.x = 0;
                GX.GameLayerManager.sceneLayer.parent.y = 0;
            }
            //ShakeTool.Instance.shakeObj(GX.GameLayerManager.sceneLayer.parent, 1, 10, 10);
            // let data: gameObject.IDragonEffVars = <gameObject.IDragonEffVars>{}
            // data.bornX = uniLib.Global.screenWidth / 2;
            // data.bornY = uniLib.Global.screenHeight / 2 + 50;
            // let battery: gameObject.Battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(Master.instance.uid);
            // data.targetBattery = battery
            // data.playerNickName = data.targetBattery.user.nickName;
            // data.score = 1000;
            // gameObject.GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.DRAGON_EFF, data, LAYER.EFFECT);
            // manager.OperationManager.instance.leaveQuickly();
            // FishBtnControl.b = !FishBtnControl.b;
            // GameCenter.instance.dispose();
        };
        /**
         * 点击退出按钮
         */
        FishBtnControl.prototype._onExitBtnClick = function () {
            game.SoundHand.Instance.playButtonClick();
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.MenuRecovery, this);
            this._fishBtnView.exitGameBtn.visible = false;
            uniLib.Global.dispatchEvent(uniLib.CustomEvent.Show_MenuPanel);
        };
        /**
         * 点击自动射击
         */
        FishBtnControl.prototype._clickAutoShoot = function () {
            game.SoundHand.Instance.playButtonClick();
            var battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(Master.instance.uid);
            if (battery == null) {
                return;
            }
            var config = FishingJoy.DataCenter.instance.accessToProps(1)[0];
            var duration = config.useTime * 1000;
            var coolingTime = config.coolTime * 1000;
            if (battery._batteryID < config.needBatteryId) {
                GX.Tips.showTips("炮台升至" + config.needBatteryId + "才能使用!");
                return;
            }
            if (Master.instance.isAutoShootCooling) {
                GX.Tips.showTips("道具正在冷却,无法开启!");
                return;
            }
            if (duration != 0 && coolingTime != 0) {
                if (Master.instance.isAutoShoot) {
                    GX.Tips.showTips("道具已使用,无法重复开启!");
                    return;
                }
            }
            else {
                Master.instance.isAutoShoot = !Master.instance.isAutoShoot;
            }
            if (!Master.instance.isAutoShoot) {
                if (duration != 0 && coolingTime != 0) {
                    var back1 = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishBtnView).BtnGroup;
                    var a = new SkillCDEffect(back1, 39.5, 36 + 168.68, 60, 60, duration, coolingTime, SHOOT_TYPE.AUTO);
                    Master.instance.isAutoShoot = true;
                }
            }
            EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.AUTO, Master.instance.isAutoShoot]);
        };
        /**
         * 关闭
         */
        FishBtnControl.prototype.MenuRecovery = function (e) {
            if (e.stageY > 105) {
                uniLib.Global.dispatchEvent(uniLib.CustomEvent.Remove_MenuPanel);
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.MenuRecovery, this);
                this._fishBtnView.exitGameBtn.visible = true;
            }
        };
        /**
         * 点击瞄准射击
         */
        FishBtnControl.prototype._clickAimShoot = function () {
            game.SoundHand.Instance.playButtonClick();
            var battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(Master.instance.uid);
            if (!battery) {
                return;
            }
            var config = FishingJoy.DataCenter.instance.accessToProps(3)[0];
            var duration = config.useTime * 1000;
            var coolingTime = config.coolTime * 1000;
            if (battery._batteryID < config.needBatteryId) {
                GX.Tips.showTips("炮台升至" + config.needBatteryId + "才能使用!");
                return;
            }
            if (Master.instance.isAimShootCooling) {
                GX.Tips.showTips("道具正在冷却,无法开启!");
                return;
            }
            if (duration != 0 && coolingTime != 0) {
                if (Master.instance.isAimShoot) {
                    GX.Tips.showTips("道具已使用,无法重复开启!");
                    return;
                }
            }
            else {
                Master.instance.isAimShoot = !Master.instance.isAimShoot;
            }
            if (!Master.instance.isAimShoot) {
                if (duration != 0 && coolingTime != 0) {
                    var back1 = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishBtnView).BtnGroup;
                    var a = new SkillCDEffect(back1, 39.5, 37.75 + 83, 60, 60, duration, coolingTime, SHOOT_TYPE.AIM);
                    Master.instance.isAimShoot = true;
                }
            }
            if (Master.instance.isAimShoot == true) {
                game.SoundHand.Instance.playAimStart();
            }
            EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.AIM, Master.instance.isAimShoot]);
        };
        /**
         * 设置瞄准效果
         */
        FishBtnControl.prototype.setShootEff = function (isShow, shootType) {
            var mov = null;
            if (shootType == SHOOT_TYPE.AIM) {
                mov = this._fishBtnView.aimShootEff;
            }
            else if (shootType == SHOOT_TYPE.FAST) {
                mov = this._fishBtnView.fastShootEff;
            }
            else if (shootType == SHOOT_TYPE.AUTO) {
                mov = this._fishBtnView.autoShootEff;
            }
            if (isShow) {
                if (!mov.isPlaying) {
                    mov.gotoAndPlay(1, -1);
                }
            }
            else {
                mov.stop();
            }
            mov.visible = isShow;
        };
        /**
         * 点击急速射击
         */
        FishBtnControl.prototype._clickFastShoot = function () {
            game.SoundHand.Instance.playButtonClick();
            var battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(Master.instance.uid);
            var config = FishingJoy.DataCenter.instance.accessToProps(2)[0];
            var duration = config.useTime * 1000;
            var coolingTime = config.coolTime * 1000;
            if (battery._batteryID < config.needBatteryId) {
                GX.Tips.showTips("炮台升至" + config.needBatteryId + "才能使用!");
                return;
            }
            if (Master.instance.isFastShootCooling) {
                GX.Tips.showTips("道具正在冷却,无法开启!");
                return;
            }
            if (duration != 0 && coolingTime != 0) {
                if (Master.instance.isFastShoot) {
                    GX.Tips.showTips("道具已使用,无法重复开启!");
                    return;
                }
            }
            else {
                Master.instance.isFastShoot = !Master.instance.isFastShoot;
            }
            if (!Master.instance.isFastShoot) {
                if (duration != 0 && coolingTime != 0) {
                    var back1 = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishBtnView).BtnGroup;
                    var a = new SkillCDEffect(back1, 39.5, 38.75, 60, 60, duration, coolingTime, SHOOT_TYPE.FAST);
                    Master.instance.isFastShoot = true;
                }
            }
            EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [SHOOT_TYPE.FAST, Master.instance.isFastShoot]);
        };
        /**
         * GM点击
         */
        FishBtnControl.prototype._clickGmCheckBox = function () {
            this._fishBtnView.gmGroup.visible = this._fishBtnView.gmCheckBox.selected;
        };
        /**
         * GM点击
         */
        FishBtnControl.prototype._clickGmGroup = function (e) {
            var target = e.target;
            if (target.selected)
                GM.instance.open(Number(target.name));
            else
                GM.instance.close(Number(target.name));
        };
        /**
         * 显示时
         */
        FishBtnControl.prototype.onShow = function () {
        };
        /**
         * 释放
         */
        FishBtnControl.prototype.dispose = function () {
            EventManager.unregisterEvent(14 /* PLAY_FIRE_EFF */, this, this.setShootEff);
            this._fishBtnView.gmCheckBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickGmCheckBox, this);
            this._fishBtnView = null;
            _super.prototype.dispose.call(this);
        };
        return FishBtnControl;
    }(BaseUIControl));
    FishingJoy.FishBtnControl = FishBtnControl;
    __reflect(FishBtnControl.prototype, "FishingJoy.FishBtnControl");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishBtnControl.js.map