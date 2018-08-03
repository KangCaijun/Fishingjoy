
// 对自动生成的表格代码的扩展

// TableFishPath
declare module table {
    export module TableFishPath {
        var $instance: { [id: string]: table.TableFishPath };
        function instance(): { [id: string]: table.TableFishPath };
        function getFishPath(id: string): table.TableFishPath;
    }
}

table.TableFishPath.instance = function (): { [id: string]: table.TableFishPath } {
    if (table.TableFishPath.$instance == null) {
        let fishPath: table.TableFishPath[] = loadTable("TableFishPath_json");
        let instance = {};
        for (let item of fishPath) {
            instance[item.id] = item;
        }
        table.TableFishPath.$instance = instance;
    }
    return table.TableFishPath.$instance;
}

table.TableFishPath.getFishPath = function (id: string): table.TableFishPath {
    return table.TableFishPath.instance()[id];
}

declare module table {
    export module TableFishConfig {
        var $instance: table.TableFishConfig[];
        function instance(): table.TableFishConfig[];
    }

    export module TableBatteryConfig {
        var $instance: table.TableBatteryConfig[];
        function instance(): table.TableBatteryConfig[];
    }

    export module TableBaseRuleConfigList {
        var $instance: table.TableBaseRuleConfigList[];
        function instance(): table.TableBaseRuleConfigList[];
    }

    export module TableBulletConfig {
        var $instance: table.TableBulletConfig[];
        function instance(): table.TableBulletConfig[];
    }

}


table.TableBulletConfig.instance = function (): table.TableBulletConfig[] {
    if (table.TableBulletConfig.$instance == null) {
        table.TableBulletConfig.$instance = loadTable("TableBulletConfig_json");
    }
    return table.TableBulletConfig.$instance;
}

table.TableFishConfig.instance = function (): table.TableFishConfig[] {
    if (table.TableFishConfig.$instance == null) {
        table.TableFishConfig.$instance = loadTable("TableFishConfig_json");
    }
    return table.TableFishConfig.$instance;
}

table.TableBatteryConfig.instance = function (): table.TableBatteryConfig[] {
    if (table.TableBatteryConfig.$instance == null) {
        table.TableBatteryConfig.$instance = loadTable("TableBatteryConfig_json");
    }
    return table.TableBatteryConfig.$instance;
}


table.TableBaseRuleConfigList.instance = function (): table.TableBaseRuleConfigList[] {
    if (table.TableBaseRuleConfigList.$instance == null) {
        table.TableBaseRuleConfigList.$instance = loadTable("TableBaseRuleConfigList_json");
    }
    return table.TableBaseRuleConfigList.$instance;
}
