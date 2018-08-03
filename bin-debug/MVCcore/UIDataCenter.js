var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 原作者 momo
 * @author suo
 */
var UIDataCenter = (function () {
    function UIDataCenter() {
        this._datas = new Map();
        this._isLoading = false;
        this._isLoaded = false;
        this._isOpened = false;
        this._openParam = null;
    }
    Object.defineProperty(UIDataCenter.prototype, "openParam", {
        get: function () {
            return this._openParam;
        },
        set: function (param) {
            this._openParam = param;
        },
        enumerable: true,
        configurable: true
    });
    UIDataCenter.prototype.dispose = function () {
        if (this._datas != null) {
            for (var i = 0; i < this._datas.length; i++) {
                var data = this._datas.getValueByIndex(i);
                if (data != null) {
                    data.dispose();
                    data = null;
                }
            }
            this._datas.dispose();
            this._datas = null;
        }
        this._openParam = null;
    };
    UIDataCenter.prototype.onInit = function () {
        for (var i = 0; i < this._datas.length; i++) {
            var dataClass = this._datas.getKey(i);
            this._datas.addValue(dataClass, new dataClass());
        }
    };
    UIDataCenter.prototype.onShow = function () {
    };
    UIDataCenter.prototype.onHide = function () {
        if (this._datas != null) {
            for (var i = 0; i < this._datas.length; i++) {
                var data = this._datas.getValueByIndex(i);
                if (data != null) {
                    data.dispose();
                    data = null;
                    this._datas.addValue(this._datas.getKey(i), null);
                }
            }
        }
    };
    UIDataCenter.prototype.addData = function (className) {
        if (className == null) {
            return;
        }
        this._datas.addValue(className, null);
    };
    UIDataCenter.prototype.getData = function (className) {
        if (this._datas == null) {
            return null;
        }
        return this._datas.getValueByKey(className);
    };
    UIDataCenter.prototype.isExist = function (className) {
        if (this._datas == null) {
            return false;
        }
        return this._datas.isExist(className);
    };
    Object.defineProperty(UIDataCenter.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            this._isLoading = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataCenter.prototype, "isLoaded", {
        get: function () {
            return this._isLoaded;
        },
        set: function (value) {
            this._isLoaded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataCenter.prototype, "isOpened", {
        get: function () {
            return this._isOpened;
        },
        set: function (value) {
            this._isOpened = value;
        },
        enumerable: true,
        configurable: true
    });
    return UIDataCenter;
}());
__reflect(UIDataCenter.prototype, "UIDataCenter");
//# sourceMappingURL=UIDataCenter.js.map