var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 层级管理
 * @author suo
 */
var manager;
(function (manager) {
    var LayerManager = (function () {
        function LayerManager() {
            /**
             * 层级字典
             */
            this._layerMap = new SimpleMap();
            for (var i = 1 /* MIN */; i < 12 /* MAX */ + 1; i++) {
                var layer = new egret.DisplayObjectContainer();
                layer.touchChildren = false;
                if (i == 2 /* Fish */) {
                    layer.name = "fish";
                }
                else if (i == 10 /* UI */) {
                    layer.name = "UI";
                    layer.touchChildren = true;
                }
                else if (i == 4 /* Bullet */) {
                    layer.name = "Bullet";
                }
                else if (i == 5 /* Seat */) {
                    layer.name = "battery";
                    layer.touchChildren = true;
                }
                else if (i == 8 /* EFFECT */) {
                    layer.name = "effect";
                }
                else if (i == 11 /* POP */) {
                    layer.name = "pop";
                    layer.touchChildren = true;
                }
                GX.GameLayerManager.addUIToMain(layer);
                this._layerMap.set(i, layer);
            }
            EventManager.registerEvent(14 /* PLAY_FIRE_EFF */, Handler.create(this, this._canTouch));
        }
        Object.defineProperty(LayerManager, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new LayerManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 添加到对应层级
         */
        LayerManager.prototype.addToLayer = function (source, layerType) {
            var layer = this._layerMap.get(layerType);
            if (layer != null) {
                layer.addChild(source);
            }
            else {
                console.assert(false, "不存在该layerType！");
            }
        };
        /**
         * 能被选中
         */
        LayerManager.prototype._canTouch = function (isOpen, value) {
            var fishLayer = this.getLayer(2 /* Fish */);
            if (value == SHOOT_TYPE.AIM) {
                fishLayer.touchChildren = isOpen;
                fishLayer.touchEnabled = isOpen;
            }
        };
        /**
         * 移除
         */
        LayerManager.prototype.removeFromLayer = function (source, layerType) {
            if (source) {
                if (layerType) {
                    var layer = this._layerMap.get(layerType);
                    if (layer != null) {
                        layer.removeChild(source);
                    }
                }
                else {
                    UIUtil.removeSelf(source);
                }
            }
            else {
                console.assert(false, "source为空！");
            }
        };
        /**
         * 设置指定层级旋转角度
         */
        LayerManager.prototype.setLayerRotation = function (rotation, layerType) {
            var layer = this._layerMap.get(layerType);
            var screenWidth = uniLib.Global.screenWidth;
            var screenHeight = uniLib.Global.screenHeight;
            layer.anchorOffsetX = screenWidth / 2;
            layer.anchorOffsetY = screenHeight / 2;
            layer.x = screenWidth / 2;
            layer.y = screenHeight / 2;
            layer.rotation = rotation;
        };
        /**
         * 获得层级
         */
        LayerManager.prototype.getLayer = function (layerType) {
            return this._layerMap.get(layerType);
        };
        /**
         * 释放
         */
        LayerManager.prototype.dispose = function () {
            EventManager.unregisterEvent(14 /* PLAY_FIRE_EFF */, this, this._canTouch);
            this._layerMap.clear();
        };
        return LayerManager;
    }());
    manager.LayerManager = LayerManager;
    __reflect(LayerManager.prototype, "manager.LayerManager");
})(manager || (manager = {}));
//# sourceMappingURL=LayerManager.js.map