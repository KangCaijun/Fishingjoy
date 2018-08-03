var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 原作者 momo
 * @author suo
 */
var ResData = (function () {
    function ResData(url, resType) {
        this.url = url;
        this.resType = resType;
    }
    return ResData;
}());
__reflect(ResData.prototype, "ResData");
//# sourceMappingURL=ResData.js.map