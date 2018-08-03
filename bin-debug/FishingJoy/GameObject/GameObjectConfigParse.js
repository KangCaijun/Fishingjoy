var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏对象配置解析
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var GameObjectConfigParse = (function () {
        function GameObjectConfigParse() {
            EventManager.registerEvent(0 /* ROOM_LEVEL_UPDATE */, Handler.create(this, this._roomLevelUpdate), 1 /* ONCE */);
            GameObjectConfigParse.configDic.set(20000 /* BATTERY */, { asset: {}, initOnceData: {} });
            /*子弹*/
            for (var _i = 0, _a = table.TableBulletConfig.instance(); _i < _a.length; _i++) {
                var item = _a[_i];
                GameObjectConfigParse.configDic.set(item.sign, {
                    asset: {
                        imageAry: item.imageAry
                    }, initOnceData: {
                        colliderAry: item.colliderAry, speed: item.speed * uniLib.Global.screenWidth / 1280, level: item.level,
                        interval: item.interval, fastInterval: item.fastInterval
                    }
                });
            }
            // /*6种子弹*/
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.BULLET_OTHER, {
            // 	asset: {
            // 		imageAry: [
            // 			{ keyName: "zidanlv", sourceName: "zidanlv", scaleX: 0.85, scaleY: 0.85 }]
            // 	}, initOnceData: { colliderAry: [{ posX: 0, posY: 0, radius: 20 }], damage: 1, interval: 300, fastInterval: 100, level: 1 }
            // });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.BULLET_OTHER_2, {
            // 	asset: {
            // 		imageAry: [
            // 			{ keyName: "zidanlv", sourceName: "zidanlv", offsetX: -15, scaleX: 0.85, scaleY: 0.85 },
            // 			{ keyName: "zidanlv_2", sourceName: "zidanlv", offsetX: 15, scaleX: 0.85, scaleY: 0.85 }]
            // 	}, initOnceData: { colliderAry: [{ posX: 1, posY: 1, radius: 20 }], damage: 1, interval: 300, fastInterval: 100, level: 2 }
            // });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.BULLET_OTHER_3, {
            // 	asset: {
            // 		imageAry: [
            // 			{ keyName: "zidanlv", sourceName: "zidanlv", offsetX: -25, scaleX: 0.85, scaleY: 0.85 },
            // 			{ keyName: "zidanlv_2", sourceName: "zidanlv", offsetX: 25, scaleX: 0.85, scaleY: 0.85 },
            // 			{ keyName: "zidanlv_3", sourceName: "zidanlv", offsetY: -20, scaleX: 0.85, scaleY: 0.85 }
            // 		]
            // 	}, initOnceData: { colliderAry: [{ posX: 1, posY: 1, radius: 20 }], damage: 1, interval: 300, fastInterval: 100, level: 3 }
            // });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.BULLET_SELF, {
            // 	asset: {
            // 		imageAry: [
            // 			{ keyName: "zidanzi", sourceName: "zidanzi", scaleX: 0.85, scaleY: 0.85 }]
            // 	}, initOnceData: { colliderAry: [{ posX: 0, posY: 0, radius: 20, }], damage: 1, interval: 300, fastInterval: 100, level: 1 }
            // });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.BULLET_SELF_2, {
            // 	asset: {
            // 		imageAry: [
            // 			{ keyName: "zidanzi", sourceName: "zidanzi", offsetX: -15, scaleX: 0.85, scaleY: 0.85 },
            // 			{ keyName: "zidanzi_2", sourceName: "zidanzi", offsetX: 15, scaleX: 0.85, scaleY: 0.85 }]
            // 	},
            // 	initOnceData: { colliderAry: [{ posX: 1, posY: 1, radius: 20 }], damage: 1, interval: 300, fastInterval: 100, level: 2 }
            // });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.BULLET_SELF_3, {
            // 	asset: {
            // 		imageAry: [
            // 			{ keyName: "zidanzi", sourceName: "zidanzi", offsetX: -25, scaleX: 0.85, scaleY: 0.85 },
            // 			{ keyName: "zidanzi_2", sourceName: "zidanzi", offsetX: 25, scaleX: 0.85, scaleY: 0.85 },
            // 			{ keyName: "zidanzi_3", sourceName: "zidanzi", offsetY: -20, scaleX: 0.85, scaleY: 0.85 }]
            // 	}, initOnceData: { colliderAry: [{ posX: 1, posY: 1, radius: 20 }], damage: 1, interval: 300, fastInterval: 100, level: 3 }
            // });
            /*6种渔网*/
            GameObjectConfigParse.configDic.set(30000 /* FishingNet_Green */, {
                asset: {
                    movieClipAry: [
                        { keyName: "idle", groupName: "FishingNetGray", actionName: "action" }
                    ]
                }, initOnceData: { netNum: 1, colliderAry: [{ posX: 0, posY: 0 }] }
            });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.FishingNet_BLUE_2, {
            // 	asset: {
            // 		movieClipAry: [
            // 			{ keyName: "idle", groupName: "fishingNetBlue", actionName: "action", offsetX: -60 },
            // 			{ keyName: "idle_2", groupName: "fishingNetBlue", actionName: "action", offsetX: 60 }]
            // 	}, initOnceData: { netNum: 2, colliderData: [{ posX: -60, posY: 0 }, { posX: 60, posY: 0 }] }
            // });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.FishingNet_BLUE_3, {
            // 	asset: {
            // 		movieClipAry: [
            // 			{ keyName: "idle", groupName: "fishingNetBlue", actionName: "action", offsetX: -80 },
            // 			{ keyName: "idle_2", groupName: "fishingNetBlue", actionName: "action", offsetX: 80 },
            // 			{ keyName: "idle_3", groupName: "fishingNetBlue", actionName: "action", offsetY: -80 }]
            // 	}, initOnceData: { netNum: 3, colliderData: [{ posX: -80, posY: 0 }, { posX: 80, posY: 0 }, { posX: 0, posY: -80 }] }
            // });
            GameObjectConfigParse.configDic.set(30005 /* FishingNet_Self */, {
                asset: {
                    movieClipAry: [
                        { keyName: "idle", groupName: "fishingNetPurple", actionName: "action" }
                    ]
                }, initOnceData: { netNum: 1, colliderAry: [{ posX: 0, posY: 0 }] }
            });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.FishingNet_BROWN_2, {
            // 	asset: {
            // 		movieClipAry: [
            // 			{ keyName: "idle", groupName: "fishingNetBrown", actionName: "action", offsetX: -60 },
            // 			{ keyName: "idle_2", groupName: "fishingNetBrown", actionName: "action", offsetX: 60 }]
            // 	}, initOnceData: { netNum: 2, colliderData: [{ posX: -60, posY: 0 }, { posX: 60, posY: 0 }] }
            // });
            // GameObjectConfigParse.configDic.set(GAMEOBJECT_SIGN.FishingNet_BROWN_3, {
            // 	asset: {
            // 		movieClipAry: [
            // 			{ keyName: "idle", groupName: "fishingNetBrown", actionName: "action", offsetX: -80 },
            // 			{ keyName: "idle_2", groupName: "fishingNetBrown", actionName: "action", offsetX: 80 },
            // 			{ keyName: "idle_3", groupName: "fishingNetBrown", actionName: "action", offsetY: -80 }]
            // 	}, initOnceData: { netNum: 3, colliderData: [{ posX: -80, posY: 0 }, { posX: 80, posY: 0 }, { posX: 0, posY: -80 }] }
            // });
            /*美人鱼特效*/
            GameObjectConfigParse.configDic.set(40001 /* MERMAID_EFF */, {
                asset: {
                    movieClipAry: [
                        { keyName: "Rainbow_coin", groupName: "Rainbow_coin", actionName: "action", offsetY: 100, scaleX: 1.5, scaleY: 1.5, frameRate: 20 },
                        { keyName: "MR_Xiaoshi", groupName: "MR_fish", actionName: "action", offsetY: 0 },
                        { keyName: "Rainbow_loop", groupName: "Rainbow_loop", actionName: "action" },
                        { keyName: "Rainbow_start", groupName: "Rainbow_start", actionName: "action" },
                        { keyName: "cloud_left", groupName: "cloud_01", actionName: "action", offsetY: 120 },
                        { keyName: "cloud_right", groupName: "cloud_02", actionName: "action", offsetY: 140 }
                    ]
                }, initOnceData: {}
            });
            GameObjectConfigParse.configDic.set(40002 /* DRAGON_EFF */, {
                asset: {
                    imageAry: [{ keyName: "TreasureBox-end", sourceName: "TreasureBox-end" }],
                    movieClipAry: [
                        { keyName: "TreasureBox_vanish", groupName: "TreasureBox_vanish", actionName: "action", offsetY: 0, scaleX: 1, scaleY: 1 },
                        { keyName: "TreasureBox_box", groupName: "TreasureBox", actionName: "action", scaleX: 1, scaleY: 1 },
                        { keyName: "TreasureBox-coin", groupName: "TreasureBox-coin", actionName: "action", scaleX: 1.5, scaleY: 1.5 }
                    ]
                }, initOnceData: {}
            });
            /*鱼*/
            var fishConfig = table.TableFishConfig.instance();
            for (var _b = 0, fishConfig_1 = fishConfig; _b < fishConfig_1.length; _b++) {
                var item = fishConfig_1[_b];
                GameObjectConfigParse.configDic.set(item.sign, {
                    asset: { movieClipAry: item.movieClipAry }, initOnceData: {
                        colliderAry: item.colliderAry, maxLife: item.maxLife, speed: item.speed / 1000 /***uniLib.Global.screenWidth /1280**/, odds: item.killOdds,
                        anchorOffsetX: item.anchorOffset.x, anchorOffsetY: item.anchorOffset.y, isMirror: item.isMirror, isAccurateCollider: item.isAccurateCollider
                    }, table: item
                });
            }
        }
        /**
         * 房间等级变更
         */
        GameObjectConfigParse.prototype._roomLevelUpdate = function () {
            /*爆炸*/
            GameObjectConfigParse.configDic.set(40000 /* BURST */, {
                asset: {
                    movieClipAry: [{
                            keyName: "idle", groupName: "Bomb",
                            actionName: "action"
                        }]
                }, initOnceData: { colliderAry: [{ posX: 1, posY: 1, radius: FishingJoy.DataCenter.instance.getRuleConfigList()[0].BurstRange }] }
            });
        };
        /**
         * 根据标识获得配置数据
         */
        GameObjectConfigParse.getConfigBySign = function (sign) {
            return GameObjectConfigParse.configDic.get(sign);
        };
        /**
         * 释放
         */
        GameObjectConfigParse.prototype.dispose = function () {
            GameObjectConfigParse.configDic.clear();
        };
        /**
         * 配置字典
         */
        GameObjectConfigParse.configDic = new SimpleMap();
        return GameObjectConfigParse;
    }());
    gameObject.GameObjectConfigParse = GameObjectConfigParse;
    __reflect(GameObjectConfigParse.prototype, "gameObject.GameObjectConfigParse");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=GameObjectConfigParse.js.map