var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 音频管理
 * author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var SoundManager = (function () {
        function SoundManager() {
            /*当前正在播放的音源*/
            this.curMusic = -1;
        }
        Object.defineProperty(SoundManager, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new SoundManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取音频方式一
         */
        SoundManager.prototype.getSoundMethodOne = function () {
            var sound = new egret.Sound();
            sound.addEventListener(egret.Event.COMPLETE, function loadOver(event) { sound.play(); }, this);
            sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event) { console.log("loaded error!"); }, this);
            sound.load("resource/sound/sound.mp3");
        };
        /**
         * 获取音频方式二
         */
        SoundManager.prototype.getSoundMethodTwo = function () {
            var loader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, function loadOver(event) { var sound = loader.data; sound.play(); }, this);
            loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
            loader.load(new egret.URLRequest("resource/sound/sound.mp3"));
        };
        /**
         * 获取音频方式三
         */
        SoundManager.prototype.playSoundByName = function (name, playTime) {
            if (playTime === void 0) { playTime = 1; }
            var sound = RES.getRes(name);
            if (sound != null) {
                uniLib.SoundMgr.instance.playSound(name, playTime);
            }
            else {
                console.assert(false, "音源key为" + name + "不存在!");
            }
        };
        /**
         * 停止播放声音
         */
        SoundManager.prototype.stopSound = function (name) {
            if (uniLib.SoundMgr.instance.isSoundPlaying(name)) {
                uniLib.SoundMgr.instance.stopSound(name);
            }
        };
        /**
         * 获得声音
         */
        SoundManager.prototype.getSound = function (name) {
            return RES.getRes(name);
        };
        /**
         * 播放哪种背景音乐
         */
        SoundManager.prototype.playBG = function (value) {
            // switch(value){
            // 	case SOUND_BG.NORMAL:
            // 		if(this.curMusic != SOUND_BG.NORMAL){
            // 			uniLib.SoundMgr.instance.stopSound(SOUND_CONST.RACE_BG);
            // 			uniLib.SoundMgr.instance.playSound(SOUND_CONST.NORMAL_BG,0);	
            // 		}			
            // 		break;
            // 	case SOUND_BG.RACE:
            // 		if(this.curMusic != SOUND_BG.RACE){
            // 			uniLib.SoundMgr.instance.playSound(SOUND_CONST.RACE_BG,0);
            // 			uniLib.SoundMgr.instance.stopSound(SOUND_CONST.NORMAL_BG);
            // 		}
            // 		break;
            // }
            // this.curMusic = value;
        };
        /**
         * 释放
         */
        SoundManager.prototype.dispose = function () {
            uniLib.SoundMgr.instance.stopSounds();
        };
        /*单例*/
        SoundManager._instance = null;
        return SoundManager;
    }());
    FishingJoy.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "FishingJoy.SoundManager");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=SoundManager.js.map