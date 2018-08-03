var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 原作者 momo
 * @author suo
 */
var BaseUICenter = (function () {
    function BaseUICenter() {
        /*管理器集合*/
        this._managers = new Map();
        /*已经打开的UI面板*/
        this._openingUI = new Array();
    }
    BaseUICenter.prototype.addManager = function (id, className) {
        if (className == null) {
            return;
        }
        var manager = new className();
        manager.id = id;
        this._managers.addValue(id, manager);
    };
    BaseUICenter.prototype.getManager = function (id) {
        if (this._managers == null) {
            return null;
        }
        return this._managers.getValueByKey(id);
    };
    BaseUICenter.prototype.isExist = function (id) {
        if (this._managers == null) {
            return false;
        }
        return this._managers.isExist(id);
    };
    BaseUICenter.prototype.getOpenParam = function (id) {
        var manager = this.getManager(id);
        if (manager != null) {
            return manager.getOpenParam();
        }
        return null;
    };
    BaseUICenter.prototype.setOpenParam = function (id, param) {
        var manager = this.getManager(id);
        if (manager != null) {
            return manager.setOpenParam(param);
        }
        return null;
    };
    BaseUICenter.prototype.isOpen = function (id) {
        var manager = this.getManager(id);
        if (manager != null) {
            return manager.isOpened;
        }
        return true;
    };
    BaseUICenter.prototype.openUI = function (id, param) {
        if (param === void 0) { param = null; }
        var manager = this.getManager(id);
        if (manager != null) {
            this._openingUI.push(id);
            manager.open(this.onUIinitCallBack, param);
        }
    };
    BaseUICenter.prototype.closeUI = function (id) {
        var manager = this.getManager(id);
        if (manager != null) {
            manager.close();
            var index = this._openingUI.indexOf(id);
            if (index != -1) {
                this._openingUI.splice(index, 1);
            }
        }
    };
    BaseUICenter.prototype.closeAll = function () {
        var index = -1;
        while (this._openingUI.length != 0) {
            index = this._openingUI.pop();
            var manager = this.getManager(index);
            if (manager != null) {
                manager.close();
            }
        }
    };
    BaseUICenter.prototype.onUIinitCallBack = function (id) {
        if (this._openingUI != null) {
            this._openingUI.push(id);
        }
        else {
            this._openingUI = new Array();
            this._openingUI.push(id);
        }
    };
    BaseUICenter.prototype.dispose = function () {
        if (this._managers != null) {
            for (var i = 0; i < this._managers.length; i++) {
                var manager = this._managers.getValueByIndex(i);
                if (manager != null) {
                    manager.dispose();
                    manager = null;
                }
            }
            this._managers.dispose();
            this._managers = null;
        }
        if (this._openingUI != null) {
            this._openingUI.splice(0, this._openingUI.length);
            this._openingUI = null;
        }
    };
    return BaseUICenter;
}());
__reflect(BaseUICenter.prototype, "BaseUICenter");
//# sourceMappingURL=BaseUICenter.js.map