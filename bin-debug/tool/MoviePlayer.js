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
 * 多个movieclip的集合体
 * @author suo
 */
var tool;
(function (tool) {
    var MoviePlayer = (function (_super) {
        __extends(MoviePlayer, _super);
        /**
         * @param data键为动画组名字,值为groupName
         */
        function MoviePlayer(data) {
            var _this = _super.call(this) || this;
            /**
             * key：动画组名字 value：egret.movie
             */
            _this._dataDic = new SimpleMap();
            /**
             * 索引
             */
            _this._index = 0;
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var mov = UIUtil.creatMovieClip(data[i].groupName, data[i].actionName);
                    if (data.length != 1) {
                        mov.visible = false;
                    }
                    if (data[i].offsetX) {
                        mov.x = data[i].offsetX;
                    }
                    if (data[i].offsetY) {
                        mov.y = data[i].offsetY;
                    }
                    if (data[i].frameRate) {
                        mov.frameRate = data[i].frameRate;
                    }
                    if (data[i].scaleX) {
                        mov.scaleX = data[i].scaleX;
                    }
                    if (data[i].scaleY) {
                        mov.scaleY = data[i].scaleY;
                    }
                    _this.addChild(mov);
                    _this._dataDic.set(data[i].keyName, mov);
                }
            }
            return _this;
        }
        /**
         * 添加一个影片剪辑
         */
        MoviePlayer.prototype.push = function (data) {
            var mov = UIUtil.creatMovieClip(data.groupName, data.actionName);
            mov.visible = false;
            if (data.offsetX) {
                mov.x = data.offsetX;
            }
            if (data.offsetY) {
                mov.y = data.offsetY;
            }
            if (data.frameRate) {
                mov.frameRate = data.frameRate;
            }
            if (data.scaleX) {
                mov.scaleX = data.scaleX;
            }
            if (data.scaleY) {
                mov.scaleY = data.scaleY;
            }
            this.addChild(mov);
            this._dataDic.set(data.keyName, mov);
        };
        /**
         * 切换动画
         */
        MoviePlayer.prototype.SwitchAni = function (keyName, playTimes) {
            if (playTimes === void 0) { playTimes = -1; }
            if (this._lastMov) {
                this._lastMov.stop();
                this._lastMov.visible = false;
            }
            var mov = this._dataDic.get(keyName);
            if (mov != null) {
                mov.visible = true;
                mov.gotoAndPlay(1, playTimes);
                this._lastMov = mov;
            }
            else {
                console.assert(false, "不存在keyName：" + keyName);
            }
        };
        /**
         * 根据索引播放
         */
        MoviePlayer.prototype.switchAniByIndex = function (index, playTimes) {
            if (playTimes === void 0) { playTimes = -1; }
            if (this._lastMov) {
                this._lastMov.stop();
                this._lastMov.visible = false;
            }
            var mov = this._dataDic.getByKeyIndex(index);
            if (mov != null) {
                mov.visible = true;
                mov.gotoAndPlay(1, playTimes);
                this._lastMov = mov;
            }
            else {
                console.assert(false, "不存在index：" + index);
            }
        };
        /**
         * 播放所有动画一次
         */
        MoviePlayer.prototype.playOnceAll = function (completeCB) {
            var _this = this;
            var completeIndex = 0;
            var _loop_1 = function (i) {
                var mov = this_1._dataDic.getByKeyIndex(i);
                mov.visible = true;
                mov.gotoAndPlay(1, 1);
                mov.once(egret.MovieClipEvent.COMPLETE, function () {
                    mov.visible = false;
                    completeIndex++;
                    if (completeIndex == _this._dataDic.length) {
                        if (completeCB) {
                            completeCB.run();
                        }
                    }
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < this._dataDic.length; i++) {
                _loop_1(i);
            }
        };
        /**
         * 切换一次回调
         */
        MoviePlayer.prototype.switchAniPlayOnce = function (keyName, completeCB) {
            if (this._lastMov) {
                this._lastMov.stop();
                this._lastMov.visible = false;
            }
            var mov = this._dataDic.get(keyName);
            if (mov) {
                mov.visible = true;
                mov.gotoAndPlay(1, 1);
                this._lastMov = mov;
                mov.once(egret.MovieClipEvent.COMPLETE, function () {
                    mov.stop();
                    mov.visible = false;
                    if (completeCB) {
                        completeCB.run();
                    }
                }, this);
            }
            else {
                console.assert(false, "不存在keyName：" + keyName);
            }
        };
        /**
         * 根据键获得影片剪辑
         */
        MoviePlayer.prototype.getMovieClipByKey = function (key) {
            var mov = this._dataDic.get(key);
            if (!mov) {
                console.assert(false, "不存在keyName：" + key);
            }
            return mov;
        };
        /**
         * 暂停当前动画
         */
        MoviePlayer.prototype.stop = function () {
            if (this._lastMov) {
                this._lastMov.stop();
            }
        };
        /**
         * 暂停所有动画
         */
        MoviePlayer.prototype.stopAll = function () {
            var map = this._dataDic;
            for (var i = 0; i < map.length; i++) {
                var mov = map.getByKeyIndex(i);
                mov.stop();
                mov.visible = false;
            }
        };
        /**
         * 播放
         */
        MoviePlayer.prototype.play = function (key, playTimes, delay, completeCB) {
            var _this = this;
            if (delay) {
                Laya.timer.once(delay, this, function () {
                    _this._playMoiveClip(key, playTimes, completeCB);
                });
            }
            else {
                this._playMoiveClip(key, playTimes, completeCB);
            }
        };
        /**
         * 播放影片剪辑
         */
        MoviePlayer.prototype._playMoiveClip = function (key, playTimes, completeCB) {
            var mov = this._dataDic.get(key);
            if (mov) {
                mov.visible = true;
                mov.gotoAndPlay(1, playTimes);
                if (playTimes == 1) {
                    mov.once(egret.MovieClipEvent.COMPLETE, function () {
                        mov.stop();
                        mov.visible = false;
                        if (completeCB) {
                            completeCB.run();
                        }
                    }, this);
                }
            }
        };
        /**
         * 释放
         */
        MoviePlayer.prototype.dispose = function () {
            this._dataDic.clear();
            this._dataDic = null;
            this.stop();
        };
        return MoviePlayer;
    }(egret.DisplayObjectContainer));
    tool.MoviePlayer = MoviePlayer;
    __reflect(MoviePlayer.prototype, "tool.MoviePlayer");
})(tool || (tool = {}));
//# sourceMappingURL=MoviePlayer.js.map