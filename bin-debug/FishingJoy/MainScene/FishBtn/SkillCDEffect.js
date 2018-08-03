var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* 技能cd特效
* r:圆的半径
* skillTimer:技能时间
* color:圆环的填充颜色
**/
var SkillCDEffect = (function (_super) {
    __extends(SkillCDEffect, _super);
    function SkillCDEffect(layer, x, y, width, heith, Continued, cooling, type) {
        var _this = _super.call(this) || this;
        _this.layeMy = layer;
        _this.clickAnimation(layer, x, y, width, heith, Continued, cooling, type);
        return _this;
    }
    /**
     * 点击动效
     */
    SkillCDEffect.prototype.clickAnimation = function (layer, x, y, width, heith, Continued, cooling, type) {
        this.initGraphics(layer, x, y);
        this.changeGraphics(Continued, cooling, type, x);
        this.RectMy = new eui.Rect();
        var RectMy = this.RectMy;
        layer.addChild(RectMy);
        RectMy.width = width;
        RectMy.touchEnabled = false;
        RectMy.height = heith;
        RectMy.anchorOffsetX = RectMy.width / 2;
        RectMy.anchorOffsetY = RectMy.height / 2;
        RectMy.fillAlpha = 0.7;
        RectMy.x = x;
        RectMy.y = y;
        RectMy.ellipseWidth = 7;
        RectMy.ellipseHeight = 7;
        RectMy.mask = this.shape;
        this.labelMy = new eui.Label();
        var labelMy = this.labelMy;
        layer.addChild(labelMy);
        labelMy.visible = false;
        labelMy.touchEnabled = false;
        labelMy.text = Math.ceil(Continued / 1000).toString();
        labelMy.anchorOffsetX = labelMy.width / 2;
        labelMy.anchorOffsetY = labelMy.height / 2;
        labelMy.x = x;
        labelMy.y = y;
    };
    SkillCDEffect.prototype.initGraphics = function (layer, x, y) {
        this.shape = new egret.Shape();
        layer.addChild(this.shape);
        this.shape.anchorOffsetX = this.shape.width / 2;
        this.shape.anchorOffsetY = this.shape.height / 2;
        this.shape.rotation = -90;
        this.shape.touchEnabled = false;
        this.shape.x = x;
        this.shape.y = y;
    };
    SkillCDEffect.prototype.destroy = function () {
        if (this.shape)
            this.layeMy.removeChild(this.shape);
        if (this.RectMy)
            this.layeMy.removeChild(this.RectMy);
        if (this.labelMy)
            this.layeMy.removeChild(this.labelMy);
        this.removeChildren();
    };
    SkillCDEffect.prototype.coolingTime = function (type, boolMy) {
        if (type == 0) {
            Master.instance.isFastShootCooling = boolMy;
        }
        else if (type == 1) {
            Master.instance.isAimShootCooling = boolMy;
        }
        else if (type == 2) {
            Master.instance.isAutoShootCooling = boolMy;
        }
    };
    SkillCDEffect.prototype.changeGraphics = function (Continued, cooling, type, x) {
        var shape = this.shape;
        var angle = 0;
        var i = 1;
        var Timer;
        var countDown;
        var battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(Master.instance.uid);
        if (battery == null)
            return;
        countDown = Continued;
        battery.decBtn.enabled = false;
        var moveStar = function (timeStamp) {
            changeGraphics(angle);
            angle += 1;
            if (angle >= 360) {
                i *= -1;
                angle = 0;
                game.Timer.clearInterval(Timer);
                countDown = cooling;
                EventManager.fireEvent(10 /* CHANEG_SHOOT_TYPE */, [type, false]);
                this.coolingTime(type, true);
                Timer = game.Timer.setInterval(moveStars, this, cooling / 360);
            }
            return false;
        };
        var moveStars = function (timeStamp) {
            changeGraphics(angle);
            angle += 1;
            countDown -= cooling / 360;
            this.labelMy.visible = true;
            this.labelMy.text = Math.ceil(countDown / 1000).toString();
            this.labelMy.anchorOffsetX = this.labelMy.width / 2;
            this.labelMy.anchorOffsetY = this.labelMy.height / 2;
            this.labelMy.x = x;
            if (angle >= 360) {
                i = 1;
                angle = 0;
                this.destroy();
                game.Timer.clearInterval(Timer);
                battery.decBtn.enabled = true;
                this.coolingTime(type, false);
            }
            return false;
        };
        Timer = game.Timer.setInterval(moveStar, this, Continued / 360);
        function changeGraphics(angle) {
            shape.graphics.clear();
            shape.graphics.beginFill(0xB0E2FF, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(60, 0);
            shape.graphics.drawArc(0, 0, 60, 0, angle * Math.PI / 180, i == -1);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
    };
    return SkillCDEffect;
}(egret.Sprite));
__reflect(SkillCDEffect.prototype, "SkillCDEffect");
//# sourceMappingURL=SkillCDEffect.js.map