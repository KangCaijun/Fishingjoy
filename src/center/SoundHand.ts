module game {
    /**
     * 音效管理类
     */
    export class SoundHand {
        private static m_Instance: SoundHand;
        public static get Instance() {
            if (this.m_Instance == null) {
                this.m_Instance = new SoundHand();
            }
            return this.m_Instance;
        }
        public by_musicBg = ["by_BackgroundMusic1_mp3", "by_BackgroundMusic2_mp3", "by_BackgroundMusic3_mp3", "by_BackgroundMusic4_mp3"];
        private currentSound: egret.Sound;

        private currentYingx: egret.SoundChannel;
        /**
         * 播放背景音效
         */
        public playBgMp3() {
        }
        /**
    * 播放背景音乐
        */
        public playBgMusic() {
            uniLib.SoundMgr.instance.playBgMusic(this.by_musicBg);
            // if (this.currentYingx) {
            //     this.currentYingx.stop();
            //     this.currentYingx.removeEventListener(egret.Event.SOUND_COMPLETE, this.playBgMusic, this);
            // }
            // this.currentSound = RES.getRes(this.by_musicBg.random());
            // this.currentYingx = this.currentSound.play(0, 1);
            // this.currentYingx.addEventListener(egret.Event.SOUND_COMPLETE, this.playBgMusic, this);
            //uniLib.SoundMgr.instance.playBgMusic(["by_bgmusic5_mp3"]);
        }

        /**
		 * 释放
		 */
        public dispose(): void {
            if (this.currentYingx) {
                this.currentYingx.stop();
                this.currentYingx.removeEventListener(egret.Event.SOUND_COMPLETE, this.playBgMusic, this);
            }
        }
        /**
        * 按钮点击音效
        */
        public playButtonClick() {
            uniLib.SoundMgr.instance.playSound("by_ButtonClick_mp3");
        }
        /**
         * new爆炸鱼爆炸
         */
        public playBlast() {
            uniLib.SoundMgr.instance.playSound("by_blast_mp3");
        }
        /**
         * new高速发炮
         */
        public playHighSpeedGun() {
            if (!uniLib.SoundMgr.instance.soundOpen)
                return ;
            let music = RES.getRes("by_HighSpeedGun_mp3").play(0, 1);
            music.volume = 0.2;
        }
        /**
         *  new低速发炮
         */
        public playLowSpeedGun() {
            if (!uniLib.SoundMgr.instance.soundOpen)
                return ;
            let music = RES.getRes("by_LowSpeedGun_mp3").play(0, 1);
            music.volume = 0.4;
            //    uniLib.SoundMgr.instance.playSound("by_LowSpeedGun_mp3")
        }
        /**
         *  new奖章出现
         */
        public playMedalAppearance() {
            uniLib.SoundMgr.instance.playSound("by_MedalAppearance_mp3");
        }
        /**
         *  new收金币
         */
        public playGoldCoin() {
            uniLib.SoundMgr.instance.playSound("by_GoldCoin_mp3");
        }
        /**
         *new金币雨(询问)
         */
        public playGoldCoinRain() {
            uniLib.SoundMgr.instance.playSound("by_GoldCoinRain_mp3");
        }
        /**
         * new警报
         */
        public playAlert() {
            uniLib.SoundMgr.instance.playSound("by_Alert_mp3");
        }
        /**
         * 金龙捕捉
         */
        public playGoldenDragonCapture() {
            uniLib.SoundMgr.instance.playSound("by_GoldenDragonCapture_mp3");
        }
        /**
         * 瞄准启动
         */
        public playAimStart() {
            uniLib.SoundMgr.instance.playSound("by_AimStart_mp3");
        }
        /**
         * 捕捉
         */
        public playCatch() {
            uniLib.SoundMgr.instance.playSound("by_Catch_mp3");
        }
        /**
         * new美人鱼捕捉
         */
        public playMermaidCapture() {
            uniLib.SoundMgr.instance.playSound("by_MermaidCapture_mp3");
        }
        /**
         * 炮台降级
         */
        public playTurretDemotion() {
            uniLib.SoundMgr.instance.playSound("by_TurretDemotion_mp3");
        }
        /**
         * 炮台升级
         */
        public playTurretUpgrade() {
            uniLib.SoundMgr.instance.playSound("by_TurretUpgrade_mp3");
        }
        /**
         * 普通转场 免费游戏转出
         */
        public playChangeTheSpecialBackground() {
            uniLib.SoundMgr.instance.playSound("by_ChangeTheSpecialBackground_mp3");
        }
        /**
         * 金潮进入
         */
        public playGoldTide() {
            uniLib.SoundMgr.instance.playSound("by_GoldTide_mp3");
        }
        /**
         * new一网打尽 
         */
        public playCatchAllInOneDraft() {
            uniLib.SoundMgr.instance.playSound("by_CatchAllInOneDraft_mp3");
        }
        /**
         * new同组炸弹 
         */
        public playCatchAllInOneDraft1() {
            uniLib.SoundMgr.instance.playSound("by_CatchAllInOneDraft1_mp3");
        }
        /**
         * 渔网张开
         */
        public playOpenFishingNet() {
            uniLib.SoundMgr.instance.playSound("by_OpenFishingNet_mp3");
        }
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
}