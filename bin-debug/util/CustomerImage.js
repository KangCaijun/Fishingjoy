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
 * 中心点在中间的Image
 * @author suo
 */
var CustomImage = (function (_super) {
    __extends(CustomImage, _super);
    function CustomImage() {
        return _super.call(this) || this;
    }
    CustomImage.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.touchEnabled = false;
    };
    return CustomImage;
}(eui.Image));
__reflect(CustomImage.prototype, "CustomImage");
//# sourceMappingURL=CustomerImage.js.map