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
 * 切换按钮
 * @author suo
 */
var tool;
(function (tool) {
    var ToggleButton = (function (_super) {
        __extends(ToggleButton, _super);
        function ToggleButton(root, soundName, canExpand, isOffset) {
            if (soundName === void 0) { soundName = null; }
            if (canExpand === void 0) { canExpand = false; }
            if (isOffset === void 0) { isOffset = false; }
            var _this = _super.call(this, root, soundName, canExpand, isOffset) || this;
            /*是否被选中*/
            _this._selected = false;
            return _this;
        }
        /**
         * 鼠标点击函数（重写！）
         */
        ToggleButton.prototype.onMouseClick = function (e) {
            if (this._mouseClickHandler != null) {
                this._mouseClickHandler.runWith(this);
            }
        };
        Object.defineProperty(ToggleButton.prototype, "selected", {
            /**
             * 获得是否选中
             */
            get: function () {
                return this._selected;
            },
            /**
             * 设置是否选中
             */
            set: function (value) {
                this._selected = value;
                if (this._selected) {
                    if (this._selectHandler != null) {
                        this._selectHandler.runWith(this);
                    }
                }
                else {
                    if (this._cancelHanlder) {
                        this._cancelHanlder.runWith(this);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ToggleButton.prototype, "cancelHanlder", {
            /**
             * 设置取消函数
             */
            set: function (value) {
                this._cancelHanlder = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ToggleButton.prototype, "selectHandler", {
            /**
             * 设置选中函数函数
             */
            set: function (value) {
                this._selectHandler = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 释放
         */
        ToggleButton.prototype.dispose = function () {
            if (this._cancelHanlder) {
                this._cancelHanlder.recover();
                this._cancelHanlder = null;
            }
            if (this._selectHandler) {
                this._selectHandler.recover();
                this._selectHandler = null;
            }
            _super.prototype.dispose.call(this);
        };
        return ToggleButton;
    }(tool.Button));
    tool.ToggleButton = ToggleButton;
    __reflect(ToggleButton.prototype, "tool.ToggleButton");
})(tool || (tool = {}));
//# sourceMappingURL=ToggleButton.js.map