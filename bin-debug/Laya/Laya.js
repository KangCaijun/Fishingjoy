var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * <code>Laya</code> 是全局对象的引用入口集。
 * Laya类引用了一些常用的全局对象，使用时注意大小写。
 * author suo
 */
var Laya = (function () {
    function Laya() {
    }
    /**
     * 初始化
     */
    Laya.init = function () {
        Laya.timer = new Timer();
    };
    /** 逻辑时间管理器的引用，不允许缩放。*/
    Laya.timer = null;
    return Laya;
}());
__reflect(Laya.prototype, "Laya");
//# sourceMappingURL=Laya.js.map