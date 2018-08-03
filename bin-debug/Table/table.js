// 对自动生成的表格代码的扩展
table.TableFishPath.instance = function () {
    if (table.TableFishPath.$instance == null) {
        var fishPath = loadTable("TableFishPath_json");
        var instance = {};
        for (var _i = 0, fishPath_1 = fishPath; _i < fishPath_1.length; _i++) {
            var item = fishPath_1[_i];
            instance[item.id] = item;
        }
        table.TableFishPath.$instance = instance;
    }
    return table.TableFishPath.$instance;
};
table.TableFishPath.getFishPath = function (id) {
    return table.TableFishPath.instance()[id];
};
table.TableBulletConfig.instance = function () {
    if (table.TableBulletConfig.$instance == null) {
        table.TableBulletConfig.$instance = loadTable("TableBulletConfig_json");
    }
    return table.TableBulletConfig.$instance;
};
table.TableFishConfig.instance = function () {
    if (table.TableFishConfig.$instance == null) {
        table.TableFishConfig.$instance = loadTable("TableFishConfig_json");
    }
    return table.TableFishConfig.$instance;
};
table.TableBatteryConfig.instance = function () {
    if (table.TableBatteryConfig.$instance == null) {
        table.TableBatteryConfig.$instance = loadTable("TableBatteryConfig_json");
    }
    return table.TableBatteryConfig.$instance;
};
table.TableBaseRuleConfigList.instance = function () {
    if (table.TableBaseRuleConfigList.$instance == null) {
        table.TableBaseRuleConfigList.$instance = loadTable("TableBaseRuleConfigList_json");
    }
    return table.TableBaseRuleConfigList.$instance;
};
//# sourceMappingURL=table.js.map