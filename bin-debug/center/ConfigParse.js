var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 配置文件解析
 * @author suo
 */
var ConfigParse = (function () {
    function ConfigParse() {
    }
    ConfigParse.getJosn = function (key) {
        var data = RES.getRes(key);
        var copy = data.slice(0);
        return copy;
    };
    /**
     * 根据属性A获得属性B值
     */
    ConfigParse.getPropertyByProperty = function (conf, paramA, paramAValue, paramB) {
        if (!conf || !(conf instanceof Array) || conf.length == 0) {
            return;
        }
        for (var _i = 0, conf_1 = conf; _i < conf_1.length; _i++) {
            var subConf = conf_1[_i];
            var item = subConf;
            if (item.hasOwnProperty(paramA) && item.hasOwnProperty(paramB)) {
                if (item[paramA] == paramAValue) {
                    return item[paramB];
                }
            }
        }
        return null;
    };
    return ConfigParse;
}());
__reflect(ConfigParse.prototype, "ConfigParse");
//# sourceMappingURL=ConfigParse.js.map