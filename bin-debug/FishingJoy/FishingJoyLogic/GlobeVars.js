var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 全局变量
 * @author suo
 */
var GlobeVars = (function () {
    function GlobeVars() {
    }
    /**瞄准特殊鱼 */
    GlobeVars.AimSpcialFish = false;
    return GlobeVars;
}());
__reflect(GlobeVars.prototype, "GlobeVars");
//# sourceMappingURL=GlobeVars.js.map