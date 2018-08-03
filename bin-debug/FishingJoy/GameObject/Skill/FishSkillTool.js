var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 鱼的技能工具
 * @author suo
 */
var gameObject;
(function (gameObject) {
    var FishSkillTool = (function () {
        function FishSkillTool() {
        }
        FishSkillTool.addSkillEff = function (host, skill) {
            if (skill == Cmd.FishSkillType.YiWangDaJin) {
                var yiwangdajinMov = Pool.getItemByCreateFun(Pool.yiWangDaJin, Handler.create(this, this.creatYiwangdajinMov));
                yiwangdajinMov.gotoAndPlay(1, -1);
                host.addChildAt(yiwangdajinMov, 0);
                return yiwangdajinMov;
            }
            else if (skill == Cmd.FishSkillType.SameGroup) {
                var _a = Pool.getItemByCreateFun(Pool.boomIMG, Handler.create(this, this.creatBombEff, null)), image1 = _a[0], image2 = _a[1];
                egret.Tween.get(image1, { loop: true }).to({ rotation: 360 }, 2000);
                egret.Tween.get(image2, { loop: true }).to({ rotation: -360 }, 2000);
                host.addChildAt(image2, 0);
                host.addChildAt(image1, 0);
                return [image1, image2];
            }
        };
        /**
         * 创建一网打尽
         */
        FishSkillTool.creatYiwangdajinMov = function () {
            var mov = UIUtil.creatMovieClip("ywangdajin");
            mov.scaleX = mov.scaleY = 0.7;
            return mov;
        };
        /**
         * 创建爆炸鱼
         */
        FishSkillTool.creatBombEff = function () {
            var image1 = new eui.Image();
            var image2 = new eui.Image();
            image1.source = "fishBoom1";
            image2.source = "fishBoom2";
            image1.scaleX = image1.scaleY = 0.7;
            image2.scaleX = image2.scaleY = 0.7;
            image1.anchorOffsetX = 115;
            image1.anchorOffsetY = 115;
            image2.anchorOffsetX = 115;
            image2.anchorOffsetY = 115;
            image1.touchEnabled = false;
            image2.touchEnabled = false;
            return [image1, image2];
        };
        /**
         * 回收
         */
        FishSkillTool.removeSkill = function (host, eff) {
            if (eff instanceof Array) {
                for (var i = 0; i < eff.length; i++) {
                    host.removeChild(eff[i]);
                }
                Pool.recover(Pool.boomIMG, eff);
            }
            else if (egret.is(eff, "egret.MovieClip")) {
                eff.stop();
                host.removeChild(eff);
                Pool.recover(Pool.yiWangDaJin, eff);
            }
            else {
                console.assert(false, "尚不支持该类型！");
            }
        };
        return FishSkillTool;
    }());
    gameObject.FishSkillTool = FishSkillTool;
    __reflect(FishSkillTool.prototype, "gameObject.FishSkillTool");
})(gameObject || (gameObject = {}));
//# sourceMappingURL=FishSkillTool.js.map