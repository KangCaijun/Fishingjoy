var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 配置文件解析
 * @author suo
 */
var GM = (function () {
    function GM() {
        this.gmList = [];
    }
    Object.defineProperty(GM, "instance", {
        /**
        * 获取单例
        */
        get: function () {
            if (this._instance == null) {
                this._instance = new GM();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GM.prototype.openGM = function (type) {
    };
    /**
     * 关闭指定GM
     */
    GM.prototype.open = function (t) {
        this.gmList[t] = true;
    };
    /**
     * 关闭指定GM
     */
    GM.prototype.close = function (t) {
        this.gmList[t] = false;
    };
    /**
     * 指定GM是否开启
     */
    GM.prototype.isOpen = function (t) {
        return this.gmList[t] ? true : false;
    };
    GM.prototype.typeToString = function (v) {
        if (v == GM.Type.FishPath) {
            return "鱼路径";
        }
        else if (v == GM.Type.BulletPath) {
            return "子弹路径";
        }
    };
    return GM;
}());
__reflect(GM.prototype, "GM");
(function (GM) {
    var Type;
    (function (Type) {
        Type[Type["Min"] = 1] = "Min";
        Type[Type["FishPath"] = 1] = "FishPath";
        Type[Type["BulletPath"] = 2] = "BulletPath";
        Type[Type["Max"] = 2] = "Max";
    })(Type = GM.Type || (GM.Type = {}));
})(GM || (GM = {}));
//# sourceMappingURL=GM.js.map