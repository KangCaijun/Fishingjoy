var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    /**
     * 音效管理类
     */
    var SoundHand = (function () {
        function SoundHand() {
            this.by_musicBg = ["by_BackgroundMusic1_mp3", "by_BackgroundMusic2_mp3", "by_BackgroundMusic3_mp3", "by_BackgroundMusic4_mp3"];
            // /**
            //  * 转场潮水(询问)
            //  */
            // public playTransferFieldChaosui() {
            //     uniLib.SoundMgr.instance.playSound("by_TransferFieldChaosui_mp3");
            // }
            /**
            * 转场效果(询问)
            */
            // public playTransitions() {
            //     uniLib.SoundMgr.instance.playSound("by_Transitions_mp3");
            // }
        }
        Object.defineProperty(SoundHand, "Instance", {
            get: function () {
                if (this.m_Instance == null) {
                    this.m_Instance = new SoundHand();
                }
                return this.m_Instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 播放背景音效
         */
        SoundHand.prototype.playBgMp3 = function () {
        };
        /**
    * 播放背景音乐
        */
        SoundHand.prototype.playBgMusic = function () {
            uniLib.SoundMgr.instance.playBgMusic(this.by_musicBg);
            // if (this.currentYingx) {
            //     this.currentYingx.stop();
            //     this.currentYingx.removeEventListener(egret.Event.SOUND_COMPLETE, this.playBgMusic, this);
            // }
            // this.currentSound = RES.getRes(this.by_musicBg.random());
            // this.currentYingx = this.currentSound.play(0, 1);
            // this.currentYingx.addEventListener(egret.Event.SOUND_COMPLETE, this.playBgMusic, this);
            //uniLib.SoundMgr.instance.playBgMusic(["by_bgmusic5_mp3"]);
        };
        /**
         * 释放
         */
        SoundHand.prototype.dispose = function () {
            if (this.currentYingx) {
                this.currentYingx.stop();
                this.currentYingx.removeEventListener(egret.Event.SOUND_COMPLETE, this.playBgMusic, this);
            }
        };
        /**
        * 按钮点击音效
        */
        SoundHand.prototype.playButtonClick = function () {
            uniLib.SoundMgr.instance.playSound("by_ButtonClick_mp3");
        };
        /**
         * new爆炸鱼爆炸
         */
        SoundHand.prototype.playBlast = function () {
            uniLib.SoundMgr.instance.playSound("by_blast_mp3");
        };
        /**
         * new高速发炮
         */
        SoundHand.prototype.playHighSpeedGun = function () {
            if (!uniLib.SoundMgr.instance.soundOpen)
                return;
            var music = RES.getRes("by_HighSpeedGun_mp3").play(0, 1);
            music.volume = 0.2;
        };
        /**
         *  new低速发炮
         */
        SoundHand.prototype.playLowSpeedGun = function () {
            if (!uniLib.SoundMgr.instance.soundOpen)
                return;
            var music = RES.getRes("by_LowSpeedGun_mp3").play(0, 1);
            music.volume = 0.4;
            //    uniLib.SoundMgr.instance.playSound("by_LowSpeedGun_mp3")
        };
        /**
         *  new奖章出现
         */
        SoundHand.prototype.playMedalAppearance = function () {
            uniLib.SoundMgr.instance.playSound("by_MedalAppearance_mp3");
        };
        /**
         *  new收金币
         */
        SoundHand.prototype.playGoldCoin = function () {
            uniLib.SoundMgr.instance.playSound("by_GoldCoin_mp3");
        };
        /**
         *new金币雨(询问)
         */
        SoundHand.prototype.playGoldCoinRain = function () {
            uniLib.SoundMgr.instance.playSound("by_GoldCoinRain_mp3");
        };
        /**
         * new警报
         */
        SoundHand.prototype.playAlert = function () {
            uniLib.SoundMgr.instance.playSound("by_Alert_mp3");
        };
        /**
         * 金龙捕捉
         */
        SoundHand.prototype.playGoldenDragonCapture = function () {
            uniLib.SoundMgr.instance.playSound("by_GoldenDragonCapture_mp3");
        };
        /**
         * 瞄准启动
         */
        SoundHand.prototype.playAimStart = function () {
            uniLib.SoundMgr.instance.playSound("by_AimStart_mp3");
        };
        /**
         * 捕捉
         */
        SoundHand.prototype.playCatch = function () {
            uniLib.SoundMgr.instance.playSound("by_Catch_mp3");
        };
        /**
         * new美人鱼捕捉
         */
        SoundHand.prototype.playMermaidCapture = function () {
            uniLib.SoundMgr.instance.playSound("by_MermaidCapture_mp3");
        };
        /**
         * 炮台降级
         */
        SoundHand.prototype.playTurretDemotion = function () {
            uniLib.SoundMgr.instance.playSound("by_TurretDemotion_mp3");
        };
        /**
         * 炮台升级
         */
        SoundHand.prototype.playTurretUpgrade = function () {
            uniLib.SoundMgr.instance.playSound("by_TurretUpgrade_mp3");
        };
        /**
         * 普通转场 免费游戏转出
         */
        SoundHand.prototype.playChangeTheSpecialBackground = function () {
            uniLib.SoundMgr.instance.playSound("by_ChangeTheSpecialBackground_mp3");
        };
        /**
         * 金潮进入
         */
        SoundHand.prototype.playGoldTide = function () {
            uniLib.SoundMgr.instance.playSound("by_GoldTide_mp3");
        };
        /**
         * new一网打尽
         */
        SoundHand.prototype.playCatchAllInOneDraft = function () {
            uniLib.SoundMgr.instance.playSound("by_CatchAllInOneDraft_mp3");
        };
        /**
         * new同组炸弹
         */
        SoundHand.prototype.playCatchAllInOneDraft1 = function () {
            uniLib.SoundMgr.instance.playSound("by_CatchAllInOneDraft1_mp3");
        };
        /**
         * 渔网张开
         */
        SoundHand.prototype.playOpenFishingNet = function () {
            uniLib.SoundMgr.instance.playSound("by_OpenFishingNet_mp3");
        };
        return SoundHand;
    }());
    game.SoundHand = SoundHand;
    __reflect(SoundHand.prototype, "game.SoundHand");
})(game || (game = {}));
//# sourceMappingURL=SoundHand.js.map