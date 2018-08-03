var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 简易消息收发类
 * @author suo
 */
var EventManager = (function () {
    function EventManager() {
        /*事件字典*/
        this._eventDic = new SimpleMap();
        /*缓存发送事件队列 key:事件ID value:data*/
        this._cacheEventDic = new SimpleMap();
    }
    Object.defineProperty(EventManager, "instance", {
        /**
         * 获得单例
         */
        get: function () {
            if (this._instance == null) {
                this._instance = new EventManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param id事件
     * @param func回调函数
     * @param regType注册回调类型
     * @param withClearCacheEvent是否清理缓存事件
     * 注册事件侦听
     */
    EventManager.registerEvent = function (id, func, regType, withClearCacheEvent) {
        if (regType === void 0) { regType = 0 /* COMMON */; }
        if (withClearCacheEvent === void 0) { withClearCacheEvent = false; }
        if (regType == 0 /* COMMON */) {
            /*处理缓存事件*/
            if (EventManager.instance._cacheEventDic.isExist(id)) {
                var data = EventManager.instance._cacheEventDic.get(id);
                func.runWith(data);
                if (withClearCacheEvent) {
                    EventManager.removeCacheEvent(id);
                }
            }
            var funcs = EventManager.instance._eventDic.get(id);
            if (funcs != null) {
            }
            else {
                funcs = new Array();
            }
            funcs.push(func);
            EventManager.instance._eventDic.set(id, funcs);
        }
        else if (regType == 1 /* ONCE */) {
            /*处理缓存事件*/
            if (EventManager.instance._cacheEventDic.isExist(id)) {
                var data = EventManager.instance._cacheEventDic.get(id);
                func.once = true;
                func.runWith(data);
                if (withClearCacheEvent) {
                    EventManager.removeCacheEvent(id);
                }
            }
            else {
                var funcs = EventManager.instance._eventDic.get(id);
                if (funcs != null) {
                }
                else {
                    funcs = new Array();
                }
                func.once = true;
                funcs.push(func);
                EventManager.instance._eventDic.set(id, funcs);
            }
        }
    };
    /**
     * @param id事件
     * @param func回调函数
     * 反注册
     */
    EventManager.unregisterEvent = function (id, caller, func) {
        var funcs = EventManager.instance._eventDic.get(id);
        if (funcs != null && funcs.length != 0) {
            for (var i = 0; i < funcs.length; i++) {
                if (funcs[i].caller == caller && funcs[i].method == func) {
                    funcs[i].recover();
                    funcs.remove(funcs[i]);
                    break;
                }
            }
        }
    };
    /**
     * 移除缓存事件
     */
    EventManager.removeCacheEvent = function (id) {
        EventManager.instance._cacheEventDic.remove(id);
    };
    /**
     * @param id事件
     * 发送事件
     */
    EventManager.fireEvent = function (id, data, fireType) {
        if (data === void 0) { data = null; }
        if (fireType === void 0) { fireType = 0 /* COMMON */; }
        var funcs = EventManager.instance._eventDic.get(id);
        if (funcs != null && funcs.length != 0) {
            /*先拷贝一份 防止在循环过程中改变数组长度引发bug*/
            var temp = funcs.slice();
            var len = temp.length;
            for (var i = 0; i < len; i++) {
                var func = temp[i];
                if (func.once) {
                    EventManager.instance._cacheEventDic.remove(id);
                }
                func.runWith(data);
            }
        }
        else {
            if (fireType == 1 /* FIRE_OR_CACHE */) {
                EventManager.instance._cacheEventDic.set(id, data);
            }
        }
        if (fireType == 2 /* FIRE_AND_CHCHE */) {
            EventManager.instance._cacheEventDic.set(id, data);
        }
    };
    /**
     * 释放
     */
    EventManager.prototype.dispose = function () {
        EventManager.instance._eventDic.clear();
        EventManager.instance._cacheEventDic.clear();
    };
    /*单例*/
    EventManager._instance = null;
    return EventManager;
}());
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map