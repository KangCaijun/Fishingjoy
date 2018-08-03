var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 操作控制器基类
 * @author suo
 */
var operation;
(function (operation) {
    var BaseOperation = (function () {
        function BaseOperation() {
        }
        BaseOperation.prototype.enterFrame = function () {
        };
        return BaseOperation;
    }());
    operation.BaseOperation = BaseOperation;
    __reflect(BaseOperation.prototype, "operation.BaseOperation");
})(operation || (operation = {}));
//# sourceMappingURL=BaseOperation.js.map