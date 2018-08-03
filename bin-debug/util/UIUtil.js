var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * UI工具
 * @author suo
 */
var UIUtil = (function () {
    function UIUtil() {
    }
    /**
     * @param contentBox 内容盒子
     * @param item 项
     * @param num 总数量
     * @param col 列
     * @param spacing 左右间距
     * @param lending 垂直间距
     * @param offsetX X偏移
     * @param offsetY Y偏移
     * @return itemList 项list
     * 网格布局
     */
    UIUtil.setItemGridLayout = function (contentBox, item, num, col, spacing, lending, offsetX, offsetY) {
        if (spacing === void 0) { spacing = 0; }
        if (lending === void 0) { lending = 0; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        for (var i = 0; i < num; i++) {
            var pos = this.getGridItemPos(i, item, col, spacing, lending, offsetX, offsetY);
            item.x = pos[0];
            item.y = pos[1];
            contentBox.addChild(item);
        }
    };
    /**
     * 传入索引 获得该Index Item坐标
     */
    UIUtil.getGridItemPos = function (index, item, col, spacing, lending, offsetX, offsetY) {
        if (spacing === void 0) { spacing = 0; }
        if (lending === void 0) { lending = 0; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        /**列数量*/
        var x = (index % col) * (item.width + spacing) + offsetX;
        var y = Math.floor(index / col) * (item.height + lending) + offsetY;
        return [x, y];
    };
    /**
     * 置灰
     */
    UIUtil.setGray = function (target) {
        var matrix = [0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0];
        var stateFilter = new egret.ColorMatrixFilter(matrix);
        target.filters = [stateFilter];
    };
    /**
     * 恢复正常
     */
    UIUtil.setNomarl = function (target) {
        if (target) {
            target.filters = [];
        }
    };
    /**
     * 高亮
     */
    UIUtil.setLight = function (target) {
        var matrix = [1, 0, 0, 0, 0xff * 0.2,
            0, 1, 0, 0, 0xe0 * 0.2,
            0, 0, 1, 0, 0x8d * 0.2,
            0, 0, 0, 1, 0]; // alpha
        var stateFilter = new egret.ColorMatrixFilter(matrix);
        target.filters = [stateFilter];
    };
    /**
     * 变红色
     */
    UIUtil.setRed = function (target) {
        var matrix = [1, 0.964, 0.999, 0.96, 0xff * 0.2,
            0, 1, 0, 0, 0,
            0, 1, 1, 0, 0,
            0, 0, 0, 1, 0]; // alpha
        var stateFilter = new egret.ColorMatrixFilter(matrix);
        target.filters = [stateFilter];
    };
    /**
     * 从显示列表内移除自身
     */
    UIUtil.removeSelf = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        var len = rest.length;
        for (var i = 0; i < len; i++) {
            var target = rest[i];
            if (egret.is(target, "egret.DisplayObject")) {
                if (target.parent && target) {
                    target.parent.removeChild(target);
                }
            }
        }
    };
    /**
     * 格式化金币
     */
    UIUtil.formatMoneny = function (value) {
        var str;
        if (value > 1000000000) {
            str = value / 1000000000 + "M";
        }
        else if (value > 10000) {
            str = value / 10000 + "W";
        }
        else if (value > 1000) {
            str = value / 1000 + "K";
        }
        else {
            str = value.toString();
        }
        return str;
    };
    /**
     * 创建影片剪辑
     */
    UIUtil.creatMovieClip = function (groupName, action) {
        if (action === void 0) { action = "action"; }
        var data = RES.getRes(groupName + "_json");
        var txtr = RES.getRes(groupName + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        return new egret.MovieClip(mcFactory.generateMovieClipData(action));
    };
    /**
     * 播放一次自动从舞台移除
     */
    UIUtil.movPlayOnce = function (box, mov, posX, posY, scaleX, scaleY, cb, delay) {
        if (scaleX === void 0) { scaleX = 1; }
        if (scaleY === void 0) { scaleY = 1; }
        if (cb === void 0) { cb = null; }
        box.addChild(mov);
        mov.x = posX;
        mov.y = posY;
        mov.scaleX = scaleX;
        mov.scaleY = scaleY;
        mov.gotoAndPlay(1, 1);
        if (delay) {
            Laya.timer.once(delay, this, function () {
                mov.stop();
                box.removeChild(mov);
                if (cb) {
                    cb.run();
                }
            });
        }
        else {
            mov.once(egret.MovieClipEvent.COMPLETE, function () {
                if (mov) {
                    mov.stop();
                    box.removeChild(mov);
                }
                if (cb) {
                    cb.run();
                }
            }, this);
        }
    };
    /**
     * 循环加法
     */
    UIUtil.circleAdd = function (value, addNum, maxNum) {
        value += addNum;
        if (value > maxNum) {
            value -= maxNum + 1;
        }
        return value;
    };
    /**
     * 创建龙骨
     */
    UIUtil.creatDragonbones = function (groupName, armatureName) {
        if (armatureName === void 0) { armatureName = "armatureName"; }
        var egretFactory = dragonBones.EgretFactory.factory;
        if (egretFactory.getDragonBonesData(groupName) == null) {
            var dragonbonesData = RES.getRes("test_ske_dbbin");
            var textureData = RES.getRes("test_tex_json");
            var texture = RES.getRes("test_tex_png");
            egretFactory.parseDragonBonesData(dragonbonesData, groupName);
            egretFactory.parseTextureAtlasData(textureData, texture, groupName);
        }
        var armatureDisplay = egretFactory.buildArmatureDisplay(armatureName, groupName);
        return armatureDisplay;
    };
    /**
     * 是否在边界内
     */
    UIUtil.inBorder = function (x, y) {
        if (x < -100 || x > uniLib.Global.screenWidth + 100) {
            return false;
        }
        if (y < -100 || y > uniLib.Global.screenHeight + 100) {
            return false;
        }
        return true;
    };
    /**
     * 在视图内
     */
    UIUtil.inView = function (x, y) {
        if (x < 0 || x > uniLib.Global.screenWidth) {
            return false;
        }
        if (y < 0 || y > uniLib.Global.screenHeight) {
            return false;
        }
        return true;
    };
    /**
     * 在瞄准范围内
     */
    UIUtil.inAimView = function (x, y) {
        if (x < 30 || x > uniLib.Global.screenWidth - 30) {
            return false;
        }
        if (y < 30 || y > uniLib.Global.screenHeight - 30) {
            return false;
        }
        return true;
    };
    /**
     * 通过角度获得弧度
     */
    UIUtil.getRadian = function (angle) {
        return angle * Math.PI / 180;
    };
    /**
     * 通过弧度获得角度
     */
    UIUtil.getAngle = function (radian) {
        return radian * 180 / Math.PI;
    };
    /**
     * 设置对象跳跃动画
     */
    UIUtil.setJumpTween = function (target, JumpMaxY, JumpMinY, durationTime, waitTime) {
        var _this = this;
        if (durationTime === void 0) { durationTime = 1000; }
        if (waitTime === void 0) { waitTime = MathUtil.random(0, 3000); }
        egret.Tween.get(target).to({ scaleX: 1, scaleY: 1, y: JumpMinY }, durationTime, egret.Ease.bounceOut).wait(waitTime).call(function () {
            egret.Tween.get(target).to({ scaleX: 0.9, scaleY: 1.1, y: JumpMaxY }, durationTime, egret.Ease.bounceIn).call(_this.setJumpTween, _this, [target, JumpMaxY, JumpMinY, durationTime]);
        }, this);
    };
    /**
     * 设置对象呼吸动画
     */
    UIUtil.setBreatheTween = function (target, durationTime) {
        var _this = this;
        egret.Tween.get(target).to({ alpha: 0 }, durationTime).call(function () {
            egret.Tween.get(target).to({ alpha: 1 }, durationTime).wait(500).call(_this.setBreatheTween, _this, [target, durationTime]);
        }, this);
    };
    /**
     * 设置对象缩放动画
     */
    UIUtil.setScaleTween = function (target, scaleXGene, scaleYGene, durationTime) {
        var _this = this;
        if (durationTime === void 0) { durationTime = 600; }
        egret.Tween.get(target).to({ scaleX: 1.1 * scaleXGene, scaleY: 1.1 * scaleYGene }, durationTime).call(function () {
            egret.Tween.get(target).to({ scaleX: 0.9 * scaleXGene, scaleY: 0.9 * scaleYGene }, durationTime).call(_this.setScaleTween, _this, [target, scaleXGene, scaleYGene, durationTime]);
        }, this);
    };
    /**
     * 设置对象上下移动动画
     */
    UIUtil.setDownUpTween = function (target, MaxY, MinY, durationTime) {
        var _this = this;
        if (durationTime === void 0) { durationTime = 1000; }
        egret.Tween.get(target).to({ y: MaxY }, durationTime).call(function () {
            egret.Tween.get(target).to({ y: MinY }, durationTime).call(_this.setDownUpTween, _this, [target, MaxY, MinY, durationTime]);
        }, this);
    };
    /**
     * 局部坐标转全局
     */
    UIUtil.localToGlobal = function (target, localX, localY) {
        if (localX === void 0) { localX = 0; }
        if (localY === void 0) { localY = 0; }
        var p = Point.create(0, 0);
        p = target.localToGlobal(localX, localY, p);
        var x = p.x;
        var y = p.y;
        Point.release(p);
        return [x, y];
    };
    /**
    * 相对于fish层级 炮台位置和舞台点的角度
    */
    UIUtil.calculateBatteryRotation = function (battery, stageX, stageY) {
        var bulletPoint = Point.create(0, 0);
        battery.focus.localToGlobal(0, 0, bulletPoint);
        var fishLayer = manager.LayerManager.instance.getLayer(2 /* Fish */);
        fishLayer.globalToLocal(bulletPoint.x, bulletPoint.y, bulletPoint);
        var targetPoint = Point.create(0, 0); //Pool.getItemByClass(Pool.SIGN_POINT, egret.Point);
        fishLayer.globalToLocal(stageX, stageY, targetPoint);
        Point.release(targetPoint);
        Point.release(bulletPoint);
        return GX.getRadianByPoint({ x: bulletPoint.x, y: bulletPoint.y }, { x: targetPoint.x, y: targetPoint.y });
    };
    /**
     * 是否能够瞄准
     */
    UIUtil.isCanAim = function (gameObj) {
        var _a = [-1, -1,], x = _a[0], y = _a[1];
        if (gameObj.isAccurateCollider) {
            for (var i = 0; i < gameObj.colliderAry.length; i++) {
                var collider = gameObj.colliderAry[i];
                _b = UIUtil.localToGlobal(collider), x = _b[0], y = _b[1];
                if (UIUtil.inAimView(x, y)) {
                    return true;
                }
            }
        }
        else {
            _c = UIUtil.localToGlobal(gameObj), x = _c[0], y = _c[1];
            if (UIUtil.inAimView(x, y)) {
                return true;
            }
        }
        return false;
        var _b, _c;
    };
    /**
     * 相对于fish层局部坐标转全局
     */
    UIUtil.getGlobePos = function (target) {
        var p = Point.create(0, 0);
        target.localToGlobal(0, 0, p);
        if (Master.instance.isRotation) {
            var layer = manager.LayerManager.instance.getLayer(2 /* Fish */);
            layer.localToGlobal(p.x, p.y, p);
        }
        var x = p.x;
        var y = p.y;
        Point.release(p);
        return [x, y];
    };
    /**
     * 转换金币文本
     */
    UIUtil.traGoldLabel = function (label) {
        if (game.Config.PublicGoldFont) {
            label.font = game.Config.PublicGoldFont;
        }
    };
    return UIUtil;
}());
__reflect(UIUtil.prototype, "UIUtil");
//# sourceMappingURL=UIUtil.js.map