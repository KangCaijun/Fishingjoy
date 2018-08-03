var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 影片剪辑集合
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var MovieClipCenter = (function () {
        function MovieClipCenter() {
        }
        Object.defineProperty(MovieClipCenter, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new MovieClipCenter();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /*单例*/
        MovieClipCenter._instance = null;
        return MovieClipCenter;
    }());
    FishingJoy.MovieClipCenter = MovieClipCenter;
    __reflect(MovieClipCenter.prototype, "FishingJoy.MovieClipCenter");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=MovieClipCenter.js.map