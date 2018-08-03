/*!
 * MahjongLobbyLib - JS for Debug
 * @licence MahjongLobbyLib - v0.0.0 (2018-07-30)
 * qq:93749937 | Licence: helojo
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 基础显示类
     */
    var LobbyBaseVc = (function (_super) {
        __extends(LobbyBaseVc, _super);
        function LobbyBaseVc() {
            _super.call(this);
            this.initUI();
        }
        LobbyBaseVc.prototype.initUI = function () {
        };
        LobbyBaseVc.prototype.showDataLoading = function (x, y) {
            if (this._dataLoading) {
                return;
            }
            this._dataLoading = new MJLobby.DataLoading();
            if (x) {
                this._dataLoading.x = x;
            }
            else {
                this._dataLoading.x = Math.round(this.width / 2);
            }
            if (y) {
                this._dataLoading.y = y;
            }
            else {
                this._dataLoading.y = Math.round(this.height / 2);
            }
            this.addChild(this._dataLoading);
            this._dataLoading.play();
        };
        LobbyBaseVc.prototype.removeLoading = function () {
            if (this._dataLoading) {
                this._dataLoading.destory();
                this._dataLoading = null;
            }
        };
        LobbyBaseVc.prototype.destory = function () {
            MJLobby.LobbyResUtil.removeFromParent(this);
            MJLobby.LobbyResUtil.removeAllChildren(this);
            this.removeLoading();
        };
        return LobbyBaseVc;
    })(egret.DisplayObjectContainer);
    MJLobby.LobbyBaseVc = LobbyBaseVc;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 基础面板
     */
    var BasePanel = (function (_super) {
        __extends(BasePanel, _super);
        function BasePanel() {
            _super.call(this);
        }
        BasePanel.prototype.initUI = function () {
            this._initY = -13;
            this._bg = MJLobby.LobbyResUtil.createBitmapByName("mjl_msgPanel");
            this._bg.scale9Grid = new egret.Rectangle(450, 110, 60, 80);
            this._bg.width = 577;
            this._bg.height = 482 - this._initY;
            this._bg.touchEnabled = true;
            this._bg.y = this._initY;
            this.addChild(this._bg);
            this._closeBtn = new MJLobby.LobbyGameButton(["mjl_closebtn", "mjl_closebtn2"]);
            this._closeBtn.x = this._bg.width - 61;
            this._closeBtn.y = -10;
            this.addChild(this._closeBtn);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandle, this);
            if (MJLobby.MJLobbyData.getInstance().artStyle == 1) {
                this._bg.scale9Grid = new egret.Rectangle(44, 36, 483, 132);
                this._titleBg = MJLobby.LobbyResUtil.createBitmapByName("mjl_common_titleBg");
                this._titleBg.x = this._bg.width / 2 - this._titleBg.width / 2;
                this.addChild(this._titleBg);
                this._bg.y = this._titleBg.y + this._titleBg.height;
                this._closeBtn.y = this._bg.y - 30;
            }
            else if (MJLobby.MJLobbyData.getInstance().artStyle == 2) {
                this._bg.scale9Grid = new egret.Rectangle(97, 215, 16, 19);
                this._titleBg = MJLobby.LobbyResUtil.createBitmapByName("mjl_common_titleBg");
                this.addChild(this._titleBg);
                this._closeBtn.y = -30;
            }
            else if (MJLobby.MJLobbyData.getInstance().artStyle == 4) {
                this._bg.y = this._initY + 40;
                this._bg.scale9Grid = new egret.Rectangle(0, 0, 803, 542);
                this._closeBtn.y = this._bg.y - 10;
            }
            this.initPanel();
        };
        BasePanel.prototype.initPanel = function () {
        };
        Object.defineProperty(BasePanel.prototype, "title", {
            /**设置标题资源 如果需要改位置 使用get set  Title*/
            set: function (iconUrl) {
                if (!this._title) {
                    this._title = MJLobby.LobbyResUtil.createBitmapByName(iconUrl);
                    this._title.x = Math.round((246 - this._title.width) / 2);
                    this._title.y = 11;
                    this.addChild(this._title);
                    if (MJLobby.MJLobbyData.getInstance().artStyle == 1) {
                        this._title.y = this._titleBg.y + 20;
                        this._title.x = this._titleBg.x + (this._titleBg.width - this._title.width) / 2;
                    }
                    else if (MJLobby.MJLobbyData.getInstance().artStyle == 2) {
                        this._title.y = this._titleBg.y + 10;
                        this._title.x = this._titleBg.x + (this._titleBg.width - this._title.width) / 2;
                    }
                    else if (MJLobby.MJLobbyData.getInstance().artStyle == 4) {
                        this._title.y = this._bg.y - 6;
                        this._title.x = this._bg.width / 2 - this._title.width / 2;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        BasePanel.prototype.setSize = function (w, h) {
            this._bg.width = w;
            this._bg.height = h - this._initY;
            this._closeBtn.x = this._bg.width - 61;
            if (MJLobby.MJLobbyData.getInstance().artStyle == 1) {
                this._titleBg.x = this._bg.width / 2 - this._titleBg.width / 2;
                this._titleBg.y = this._bg.y - this._titleBg.height;
            }
            else if (MJLobby.MJLobbyData.getInstance().artStyle == 2) {
                this._titleBg.x = this._bg.width / 2 - this._titleBg.width / 2;
                this._titleBg.y = this._bg.y - 20;
                this._closeBtn.x = this._bg.width - 50;
            }
            else if (MJLobby.MJLobbyData.getInstance().artStyle == 4) {
                // this._title.x = this._bg.width / 2 - this._title.width / 2;
                this._closeBtn.x = this._bg.width - 50;
                this._closeBtn.y = this._bg.y - 10;
            }
        };
        Object.defineProperty(BasePanel.prototype, "Bg", {
            /**获得背景图属性 */
            get: function () {
                return this._bg;
            },
            set: function (bg) {
                this._bg = bg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasePanel.prototype, "Title", {
            /**获得标题属性 */
            get: function () {
                return this._title;
            },
            set: function (title) {
                this._title = title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasePanel.prototype, "TitleBg", {
            /**获得标题背景属性 */
            get: function () {
                return this._titleBg;
            },
            set: function (titleBg) {
                this._titleBg = titleBg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasePanel.prototype, "closeBtn", {
            /**获得关闭按钮属性 */
            get: function () {
                return this._closeBtn;
            },
            set: function (closeBtn) {
                this._closeBtn = closeBtn;
            },
            enumerable: true,
            configurable: true
        });
        /**是否显示背景 */
        BasePanel.prototype.hideTitle = function (show) {
            if (this._titleBg) {
                this._titleBg.visible = show;
            }
            if (this._title) {
                this._title.visible = show;
            }
        };
        BasePanel.prototype.closeHandle = function (evt) {
            this.dispatchEventWith(MJLobby.LobbyUIEventConsts.CLOSE);
        };
        BasePanel.prototype.setCloseBtnPosition = function (x, y) {
            if (x === void 0) { x = null; }
            if (y === void 0) { y = null; }
            if (x != null)
                this._closeBtn.x = x;
            if (y != null)
                this._closeBtn.y = y;
        };
        BasePanel.prototype.setTitlePosition = function (x, y) {
            if (x === void 0) { x = null; }
            if (y === void 0) { y = null; }
            if (x != null)
                this._title.x = x;
            if (y != null)
                this._title.y = y;
        };
        BasePanel.prototype.setTitleBgPosition = function (x, y) {
            if (x === void 0) { x = null; }
            if (y === void 0) { y = null; }
            if (x != null)
                this._titleBg.x = x;
            if (y != null)
                this._titleBg.y = y;
        };
        BasePanel.prototype.destory = function () {
            _super.prototype.destory.call(this);
            if (this._closeBtn) {
                this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandle, this);
                this._closeBtn = null;
            }
            this._bg = null;
            this._title = null;
            this._titleBg = null;
        };
        return BasePanel;
    })(MJLobby.LobbyBaseVc);
    MJLobby.BasePanel = BasePanel;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**eui组件的父类 */
var MJLobby;
(function (MJLobby) {
    var LobbyBaseEuiPanel = (function (_super) {
        __extends(LobbyBaseEuiPanel, _super);
        function LobbyBaseEuiPanel() {
            _super.call(this);
        }
        LobbyBaseEuiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
            this.addEvent();
        };
        //初始化
        LobbyBaseEuiPanel.prototype.initUI = function () {
        };
        /**事件监听 */
        LobbyBaseEuiPanel.prototype.addEvent = function () {
        };
        LobbyBaseEuiPanel.prototype.removeEvent = function () {
        };
        LobbyBaseEuiPanel.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        /**调用unilib的removePop会自动调用基类中的destroy方法 */
        LobbyBaseEuiPanel.prototype.removePop = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        return LobbyBaseEuiPanel;
    })(eui.Component);
    MJLobby.LobbyBaseEuiPanel = LobbyBaseEuiPanel;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var MvcSender = (function () {
        function MvcSender() {
        }
        MvcSender.prototype.sendNotification = function (cmd, vo, type) {
            if (type) {
                MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(type, false, vo);
            }
            else {
                MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(cmd, false, vo);
            }
        };
        MvcSender.prototype.onRemove = function () {
        };
        return MvcSender;
    })();
    MJLobby.MvcSender = MvcSender;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    var Command = (function (_super) {
        __extends(Command, _super);
        function Command() {
            _super.call(this);
        }
        Command.prototype.init = function () {
        };
        Command.prototype.destory = function () {
        };
        return Command;
    })(MJLobby.MvcSender);
    MJLobby.Command = Command;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    var MJLobbyEventListener = (function (_super) {
        __extends(MJLobbyEventListener, _super);
        function MJLobbyEventListener() {
            _super.call(this);
        }
        MJLobbyEventListener.getInstance = function () {
            if (!this._instance) {
                this._instance = new MJLobbyEventListener;
            }
            return this._instance;
        };
        return MJLobbyEventListener;
    })(egret.EventDispatcher);
    MJLobby.MJLobbyEventListener = MJLobbyEventListener;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    var Mediator = (function (_super) {
        __extends(Mediator, _super);
        function Mediator(name, viewComponent) {
            _super.call(this);
            this._name = name;
            this._viewComponent = viewComponent;
            var arr = this.listNotificationInterests();
            for (var i = 0; i < arr.length; i++) {
                MJLobby.MJLobbyEventListener.getInstance().addEventListener(arr[i], this.onHandle, this);
            }
        }
        Object.defineProperty(Mediator.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Mediator.prototype.onHandle = function (evt) {
            var data = new MJLobby.MvcData(evt);
            this.handleNotification(data);
        };
        Mediator.prototype.listNotificationInterests = function () {
            return [];
        };
        Mediator.prototype.handleNotification = function (evt) {
            return;
        };
        Mediator.prototype.onRemove = function () {
            var arr = this.listNotificationInterests();
            for (var i = 0; i < arr.length; i++) {
                MJLobby.MJLobbyEventListener.getInstance().removeEventListener(arr[i], this.onHandle, this);
            }
        };
        Mediator.prototype.getViewComponent = function () {
            return this._viewComponent;
        };
        Mediator.prototype.setViewComponent = function (viewComponent) {
            this._viewComponent = viewComponent;
        };
        return Mediator;
    })(MJLobby.MvcSender);
    MJLobby.Mediator = Mediator;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var MvcData = (function () {
        function MvcData(evt) {
            this._evt = evt;
        }
        MvcData.prototype.getName = function () {
            return this._evt.type;
        };
        MvcData.prototype.getBody = function () {
            return this._evt.data;
        };
        return MvcData;
    })();
    MJLobby.MvcData = MvcData;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    var Proxy = (function (_super) {
        __extends(Proxy, _super);
        function Proxy(name) {
            _super.call(this);
            this._name = name;
        }
        Object.defineProperty(Proxy.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Proxy.prototype.onRemove = function () {
        };
        return Proxy;
    })(MJLobby.MvcSender);
    MJLobby.Proxy = Proxy;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 图片字
     */
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        function BitmapText() {
            _super.call(this);
        }
        BitmapText.prototype.initTxt = function (font, w, align) {
            if (align === void 0) { align = egret.HorizontalAlign.LEFT; }
            this._width = w;
            if (!this._bitmapTxt) {
                this._bitmapTxt = new egret.BitmapText();
                this._bitmapTxt.font = font;
                this.addChild(this._bitmapTxt);
            }
            this._align = align;
        };
        Object.defineProperty(BitmapText.prototype, "text", {
            set: function (str) {
                this._bitmapTxt.text = str;
                if (this._align == egret.HorizontalAlign.LEFT) {
                    this._bitmapTxt.x = 0;
                }
                else if (this._align == egret.HorizontalAlign.RIGHT) {
                    this._bitmapTxt.x = this._width - this._bitmapTxt.width;
                }
                else {
                    this._bitmapTxt.x = Math.round((this._width - this._bitmapTxt.width) / 2);
                }
            },
            enumerable: true,
            configurable: true
        });
        return BitmapText;
    })(egret.DisplayObjectContainer);
    MJLobby.BitmapText = BitmapText;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 数据加载动画
     */
    var DataLoading = (function (_super) {
        __extends(DataLoading, _super);
        function DataLoading() {
            _super.call(this);
            this.initUI();
        }
        DataLoading.prototype.initUI = function () {
            this._loadingImg = MJLobby.LobbyResUtil.createBitmapByName("mjl_dataLoading");
            this._loadingImg.x = -this._loadingImg.width / 2;
            this._loadingImg.y = -this._loadingImg.height / 2;
            this.addChild(this._loadingImg);
        };
        DataLoading.prototype.play = function () {
            this.stopTimer();
            this._timer = new egret.Timer(50, 0);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();
        };
        DataLoading.prototype.destory = function () {
            MJLobby.LobbyResUtil.removeAllChildren(this);
            MJLobby.LobbyResUtil.removeFromParent(this);
            this.stopTimer();
            this._loadingImg = null;
        };
        DataLoading.prototype.stopTimer = function () {
            if (this._timer) {
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer.stop();
                this._timer = null;
            }
        };
        DataLoading.prototype.onTimer = function (evt) {
            this.rotation = this.rotation - 10;
        };
        return DataLoading;
    })(egret.DisplayObjectContainer);
    MJLobby.DataLoading = DataLoading;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     *
     * 基础button类
     *
     */
    var LobbyGameButton = (function (_super) {
        __extends(LobbyGameButton, _super);
        function LobbyGameButton(arr, label, autoDestory) {
            if (label === void 0) { label = null; }
            if (autoDestory === void 0) { autoDestory = true; }
            _super.call(this);
            this.srcArr = arr;
            this._label = label;
            this._autoDestory = autoDestory;
            this.initUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }
        LobbyGameButton.prototype.addAdjective = function (name, x, y) {
            if (!this._adjective) {
                this._adjective = MJLobby.LobbyResUtil.createBitmapByName(name);
                this.addChild(this._adjective);
                this._adjective.x = x;
                this._adjective.y = y;
            }
        };
        LobbyGameButton.prototype.onRemove = function (evt) {
            if (this._autoDestory) {
                this.destory();
            }
        };
        LobbyGameButton.prototype.initUI = function () {
            var src;
            src = this.srcArr[0];
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            if (!this._icon) {
                this._icon = MJLobby.LobbyResUtil.createBitmapByName(src);
                this._icon.name = "icon";
                this.addChild(this._icon);
            }
            else {
                this._icon.texture = MJLobby.LobbyResUtil.createTexture(src);
            }
            if (this._label) {
                this._labelTxt = MJLobby.LobbyResUtil.createTextFeild(0xFFFFFF, egret.HorizontalAlign.CENTER, this._label, 20, 0, 10, this._icon.width);
                this.addChild(this._labelTxt);
            }
        };
        /**增加未读小红点,x,y为在目前基础上需要偏移的量
         * @param {string} res,小红点资源
         * @param {number} x,y,需要偏移的量，调整红点位置
         */
        LobbyGameButton.prototype.redPoint = function (res, x, y, scaleX, scaleY) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (!RES.hasRes(res))
                return;
            if (!this._redPoint) {
                this._redPoint = MJLobby.LobbyResUtil.createBitmapByName(res);
                this.addChild(this._redPoint);
            }
            this._redPoint.x = this._icon.width - (this._redPoint.width) + x;
            this._redPoint.y = this.height - this._icon.height + y;
            this._redPoint.touchEnabled = false;
        };
        /**移除小红点
        * @param
        */
        LobbyGameButton.prototype.removeRedPoint = function () {
            if (this._redPoint) {
                MJLobby.LobbyResUtil.removeFromParent(this._redPoint);
                this._redPoint = null;
            }
        };
        LobbyGameButton.prototype.onTouchBegin = function (evt) {
            if (RES.hasRes(this.srcArr[1])) {
                this._icon.texture = MJLobby.LobbyResUtil.createTexture(this.srcArr[1]);
            }
            else {
                this._icon.scaleX = 0.99;
                this._icon.scaleY = 0.99;
            }
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        };
        LobbyGameButton.prototype.onTouchEnd = function (evt) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            if (RES.hasRes(this.srcArr[1])) {
                this._icon.texture = MJLobby.LobbyResUtil.createTexture(this.srcArr[0]);
            }
            else {
                this._icon.scaleX = this._icon.scaleY = 1;
            }
        };
        LobbyGameButton.prototype.addClickArea = function (num) {
            if (!this._area) {
                this._area = new egret.Sprite();
                this._area.touchEnabled = true;
                this.addChild(this._area);
            }
            this._area.graphics.clear();
            this._area.graphics.beginFill(0xff0000, 0);
            this._area.graphics.drawRect(-num, -num, this._icon.width + num * 2, this._icon.height + num * 2);
            this._area.graphics.endFill();
        };
        LobbyGameButton.prototype.destory = function () {
            this.touchEnabled = false;
            if (this.stage) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            }
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            MJLobby.LobbyResUtil.removeFromParent(this);
            MJLobby.LobbyResUtil.removeAllChildren(this);
            this._area = null;
            this._icon = null;
            this._label = null;
            this._labelTxt = null;
            this._redPoint = null;
        };
        return LobbyGameButton;
    })(egret.Sprite);
    MJLobby.LobbyGameButton = LobbyGameButton;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 头像类，头像加载后缓存到内存
     */
    var LobbyHeadMc = (function (_super) {
        __extends(LobbyHeadMc, _super);
        function LobbyHeadMc(width, height, showDefault, showLoading) {
            if (showDefault === void 0) { showDefault = true; }
            if (showLoading === void 0) { showLoading = false; }
            _super.call(this);
            this._width = width;
            this._height = height;
            this._showDefault = showDefault;
            if (this._showDefault) {
                this._headMc = MJLobby.LobbyResUtil.createBitmapByName("defaultHead");
                this._headMc.width = this._width;
                this._headMc.height = this._height;
                this.addChild(this._headMc);
            }
            if (showLoading) {
                this._dataLoading = new MJLobby.DataLoading();
                this._dataLoading.x = Math.round(width / 2);
                this._dataLoading.y = Math.round(height / 2);
                this.addChild(this._dataLoading);
                this._dataLoading.play();
            }
        }
        LobbyHeadMc.prototype.removeLoading = function () {
            if (this._dataLoading) {
                this._dataLoading.destory();
                this._dataLoading = null;
            }
        };
        LobbyHeadMc.prototype.destory = function () {
            var _this = this;
            MJLobby.LobbyResUtil.removeAllChildren(this);
            MJLobby.LobbyResUtil.removeFromParent(this);
            if (this._headMc.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                this._headMc.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    _this.dispatchEventWith(MJLobby.LobbyUIEventConsts.HEAD_CLICK_CALLBACK, true, _this._uid);
                }, this);
            }
            this.removeLoading();
            if (this._headLoad) {
                this._headLoad.destroy();
                this._headLoad = null;
            }
            this._headMc = null;
        };
        Object.defineProperty(LobbyHeadMc.prototype, "headUrl", {
            set: function (url) {
                if (url && url.indexOf("http") == -1) {
                    if (this._headUrl) {
                        url = this._headUrl;
                    }
                    else {
                        return;
                    }
                }
                if (this._headUrl && this._headUrl == url) {
                    return;
                }
                this._headUrl = url;
                if (this._showDefault) {
                    this._headMc.texture = MJLobby.LobbyResUtil.createTexture("defaultHead");
                }
                if (!this._headLoad) {
                    this._headLoad = new MJLobby.HeadLoader();
                }
                if (this._headUrl) {
                    this._headLoad.load(this._headUrl, this.loaded, null, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        LobbyHeadMc.prototype.loaded = function (data) {
            this.removeLoading();
            if (!this._headMc) {
                this._headMc = new egret.Bitmap(data);
                this.addChild(this._headMc);
            }
            else {
                this._headMc.bitmapData = data;
            }
            this._headMc.width = this._width;
            this._headMc.height = this._height;
        };
        LobbyHeadMc.prototype.setUId = function (uid) {
            var _this = this;
            this._uid = uid;
            this._headMc.touchEnabled = true;
            this._headMc.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.dispatchEventWith(MJLobby.LobbyUIEventConsts.HEAD_CLICK_CALLBACK, true, _this._uid);
            }, this);
        };
        return LobbyHeadMc;
    })(egret.Sprite);
    MJLobby.LobbyHeadMc = LobbyHeadMc;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 添加二级面板缓冲 延用以前淘金的
 */
var LoadSecondPanel = (function (_super) {
    __extends(LoadSecondPanel, _super);
    function LoadSecondPanel() {
        _super.call(this);
        this.init();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStageHandler, this);
    }
    LoadSecondPanel.prototype.init = function () {
        MJLobby.LobbyResUtil.removeAllChildren(this);
        var bg = new eui.Rect(MJLobby.LobbyDataCache.defaultWidth, MJLobby.LobbyDataCache.defaultHeight, 0x000000);
        bg.alpha = 0.45;
        this.addChildAt(bg, 0);
        if (RES.hasRes("mjl_loading_drag_json")) {
            this._armature = uniLib.DisplayUtils.createDragonBonesDisplay("mjl_loading_drag_json", "mjl_loading_json", "mjl_loading_png", "MovieClip");
            dragonBones.WorldClock["clock"].add(this._armature);
            egret.Ticker.getInstance().register(function (frameTime) { dragonBones.WorldClock["clock"].advanceTime(-1); }, this);
            this._armature.display.x = Math.round((MJLobby.LobbyDataCache.defaultWidth) / 2);
            this._armature.display.y = Math.round((MJLobby.LobbyDataCache.defaultHeight) / 2 - 15);
            this.addChild(this._armature.display);
        }
    };
    LoadSecondPanel.prototype.onAddToStageHandler = function (evt) {
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
        if (this._armature) {
            this._armature.animation.play();
        }
        else {
            this.init();
        }
    };
    LoadSecondPanel.prototype.onRemoveFromStageHandler = function (evt) {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStageHandler, this);
        if (this._armature) {
            this._armature.animation.stop();
            dragonBones.WorldClock["clock"].remove(this._armature);
            this._armature = null;
            egret.Ticker.getInstance().unregister(function (frameTime) { dragonBones.WorldClock["clock"].advanceTime(-1); }, this);
        }
        MJLobby.LobbyResUtil.removeAllChildren(this);
        MJLobby.LobbyResUtil.removeFromParent(this);
    };
    LoadSecondPanel.prototype.setProgress = function () {
    };
    return LoadSecondPanel;
})(egret.Sprite);

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     *
     * 中度提示面板，飘文字
     *
     */
    var LobbyMildAlertVC = (function (_super) {
        __extends(LobbyMildAlertVC, _super);
        function LobbyMildAlertVC() {
            _super.call(this);
        }
        LobbyMildAlertVC.prototype.initUI = function () {
            var str = "tipsBg";
            if (RES.getRes("tipsBg")) {
                str = "tipsBg";
            }
            else {
                str = "mjl_tipsBg";
            }
            this._bg = MJLobby.LobbyResUtil.createBitmapByName(str);
            this.addChild(this._bg);
            this._text = MJLobby.LobbyResUtil.createTextFeild(0xFFFFFF, egret.HorizontalAlign.CENTER, "", 22, 8, 10, 786);
            this._text.multiline = true;
            this.addChild(this._text);
        };
        /**
         *
         * @param message
         *
         */
        LobbyMildAlertVC.prototype.setText = function (message) {
            if (!message) {
                return;
            }
            this._text.text = message;
            this._bg.height = this._text.textHeight * 2;
            this.x = Math.round((MJLobby.LobbyDataCache.defaultWidth - this.width) / 2);
            this.y = MJLobby.LobbyDataCache.defaultHeight;
            egret.Tween.get(this).to({ y: Math.round((MJLobby.LobbyDataCache.defaultHeight - this.height) / 2) - 60 }, 500, egret.Ease.circOut).call(this.showDelay, this);
        };
        LobbyMildAlertVC.prototype.showDelay = function () {
            egret.Tween.get(this).wait(2000).to({ y: -this.height }, 500, egret.Ease.circOut).call(this.destory, this);
        };
        LobbyMildAlertVC.prototype.destory = function () {
            MJLobby.LobbyResUtil.removeAllChildren(this);
            MJLobby.LobbyResUtil.removeFromParent(this);
            this._bg = null;
            this._text = null;
        };
        return LobbyMildAlertVC;
    })(MJLobby.LobbyBaseVc);
    MJLobby.LobbyMildAlertVC = LobbyMildAlertVC;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 确定面板
     */
    var LobbyMsgBox = (function (_super) {
        __extends(LobbyMsgBox, _super);
        function LobbyMsgBox(needClose) {
            _super.call(this);
            this.touchEnabled = true;
            this._needClose = needClose;
            this.initUI();
        }
        LobbyMsgBox.prototype.initUI = function () {
            var bg = MJLobby.LobbyResUtil.createBitmapByName("mjl_msgBoxBg");
            bg.scale9Grid = new egret.Rectangle(180, 60, 90, 60);
            bg.width = 635;
            bg.height = 391;
            this.addChild(bg);
            this.title = MJLobby.LobbyResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.CENTER, "", 32, 140, 18, 191);
            this.info = MJLobby.LobbyResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.CENTER, "", 32, 66, 39, 508);
            this.info.lineSpacing = 2;
            this.addChild(this.info);
            this.addChild(this.title);
            if (MJLobby.MJLobbyData.getInstance().artStyle == 2) {
                bg.texture = RES.getRes("mjl_msgPanel");
                bg.scale9Grid = new egret.Rectangle(97, 215, 16, 19);
            }
            else if (MJLobby.MJLobbyData.getInstance().artStyle == 4) {
                bg.texture = RES.getRes("mjl_msgPanel");
                bg.scale9Grid = new egret.Rectangle(0, 0, 0, 0);
                this.info.textColor = 0xFFFFFF;
            }
            else if (MJLobby.MJLobbyData.getInstance().artStyle == 5) {
                this.info.textColor = 0xFFFFFF;
            }
            if (this._needClose) {
                var closeBtn = new MJLobby.LobbyGameButton(["mjl_closebtn", "mjl_closebtn2"]);
                closeBtn.x = bg.width - 61;
                closeBtn.y = -10;
                closeBtn.addClickArea(20);
                closeBtn.touchEnabled = true;
                closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.addChild(closeBtn);
            }
        };
        LobbyMsgBox.prototype.onClose = function (evt) {
            MJLobby.LobbyPopupManager.removePopUp(this);
            this.dispatchEventWith(MJLobby.LobbyUIEventConsts.CLOSE);
            this.destory();
        };
        LobbyMsgBox.prototype.setData = function (title, msg, labelarr, backFn, backObject, countdown, size, align) {
            if (labelarr === void 0) { labelarr = null; }
            if (backFn === void 0) { backFn = null; }
            if (backObject === void 0) { backObject = null; }
            if (countdown === void 0) { countdown = 0; }
            if (size === void 0) { size = 32; }
            if (align === void 0) { align = egret.HorizontalAlign.CENTER; }
            this._backFn = backFn;
            this._backObj = backObject;
            this.info.size = size;
            this.title.text = title;
            this.info.text = msg;
            this.info.textAlign = align;
            this.info.y = 20 + Math.round((254 - this.info.textHeight) / 2);
            if (labelarr.length == 1) {
                if (!labelarr[0] || labelarr[0] == "") {
                    labelarr[0] = "确定";
                }
                this.yesBtn = new MJLobby.LobbyGameButton(["mjl_common_sure1", "mjl_common_sure2"]);
                this.yesBtn.x = Math.round((this.width - this.yesBtn.width) / 2);
                this.yesBtn.y = this.height - 105;
                if (labelarr[0] == "确定" && MJLobby.MJLobbyData.getInstance().artStyle != 4) {
                    var yesWord = MJLobby.LobbyResUtil.createBitmapByName("mjl_txt_sure", 65, 8);
                    this.yesBtn.addChild(yesWord);
                }
                this.addChild(this.yesBtn);
            }
            else if (labelarr.length == 2) {
                if (!labelarr[0] || labelarr[0] == "") {
                    labelarr[0] = "确定";
                }
                if (!labelarr[1] || labelarr[1] == "") {
                    labelarr[1] = "取消";
                }
                this.yesBtn = new MJLobby.LobbyGameButton(["mjl_common_sure1", "mjl_common_sure2"]);
                this.yesBtn.x = 635 / 2 - this.yesBtn.width - 10;
                this.yesBtn.y = 290;
                if (labelarr[0] == "确定" && MJLobby.MJLobbyData.getInstance().artStyle != 4) {
                    var yesWord = MJLobby.LobbyResUtil.createBitmapByName("mjl_txt_sure", 65, 8);
                    this.yesBtn.addChild(yesWord);
                }
                this.addChild(this.yesBtn);
                this.noBtn = new MJLobby.LobbyGameButton(["mjl_common_cancel1", "mjl_common_cancel2"]);
                this.noBtn.x = 635 / 2 + 10;
                this.noBtn.y = 290;
                if (MJLobby.MJLobbyData.getInstance().artStyle == 4) {
                    this.yesBtn.y = this.noBtn.y = this.height - this.yesBtn.height - 50;
                }
                if (labelarr[1] == "取消" && MJLobby.MJLobbyData.getInstance().artStyle != 4) {
                    var noWord = MJLobby.LobbyResUtil.createBitmapByName("mjl_txt_cancel", 65, 8);
                    this.noBtn.addChild(noWord);
                }
                this.addChild(this.noBtn);
            }
            if (this._backFn && this._backFn[0]) {
                this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[0], this._backObj);
            }
            if (this._backFn && this._backFn[1]) {
                this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], this._backObj);
            }
            if (this.yesBtn) {
                this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            }
            if (this.noBtn) {
                this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            }
            this.title.x = (635 - this.title.width) / 2;
        };
        Object.defineProperty(LobbyMsgBox.prototype, "titleY", {
            set: function (value) {
                this.title.y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LobbyMsgBox.prototype, "titleColor", {
            set: function (value) {
                this.title.textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LobbyMsgBox.prototype, "msgColor", {
            set: function (value) {
                this.info.textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        LobbyMsgBox.prototype.destory = function () {
            if (this.yesBtn) {
                if (this._backFn && this._backFn[0]) {
                    this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[0], this._backObj);
                }
                this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.yesBtn = null;
            }
            if (this.noBtn) {
                this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                if (this._backFn && this._backFn[1]) {
                    this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], this._backObj);
                }
                this.noBtn = null;
            }
            this.title = null;
            this.info = null;
            this._backFn = null;
            this._backObj = null;
            MJLobby.LobbyResUtil.removeFromParent(this);
            MJLobby.LobbyResUtil.removeAllChildren(this);
        };
        return LobbyMsgBox;
    })(egret.Sprite);
    MJLobby.LobbyMsgBox = LobbyMsgBox;
})(MJLobby || (MJLobby = {}));

/**
 * 延用以前淘金的
 * 加载动画
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TJLoadingUI = (function (_super) {
    __extends(TJLoadingUI, _super);
    function TJLoadingUI() {
        _super.call(this);
        this.back = new egret.Sprite;
        this._loadingBG = new egret.Bitmap;
        this._loadingLogo = new egret.Bitmap;
        this.promptText = new egret.TextField;
        this.loadPanel = new egret.Sprite;
        this.text = [
            "",
            "",
            ""
        ];
        this.init();
    }
    TJLoadingUI.prototype.init = function () {
        this.back = uniLib.DisplayUtils.createMask(1, MJLobby.LobbyDataCache.defaultWidth, MJLobby.LobbyDataCache.defaultHeight, 0x000000);
        this.back.touchEnabled = false;
        this.addChild(this.back);
        RES.getResByUrl("resource/assets/preLoad_bg.png", function (texture) {
            this._loadingBG.texture = texture;
            this._loadingBG.anchorOffsetX = this._loadingBG.width * 0.5;
            this._loadingBG.anchorOffsetY = this._loadingBG.height * 0.5;
            this._loadingBG.x = MJLobby.LobbyDataCache.defaultWidth / 2;
            this._loadingBG.y = MJLobby.LobbyDataCache.defaultHeight / 2;
            this.back.addChild(this._loadingBG);
            // this.loadPanel.addChild(this._loadingLogo);
            // this.promptText.text = this.text[Math.floor(Math.random() * 3)];
            // this.promptText.x = (640 - this.promptText.width) / 2;
            // this.promptText.y = (1136 - this.promptText.height) / 2 + 180;
            // this.addChild(this.promptText);
            egret.Tween.get(this._loadingBG, { loop: true }).to({ rotation: 3600 }, 30000);
        }, this, RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl("resource/assets/preLoad_icon.png", function (texture) {
            this._loadingLogo.texture = texture;
            this._loadingLogo.anchorOffsetX = this._loadingLogo.width * 0.5;
            this._loadingLogo.anchorOffsetY = this._loadingLogo.height * 0.5;
            this._loadingLogo.x = MJLobby.LobbyDataCache.defaultWidth / 2;
            this._loadingLogo.y = MJLobby.LobbyDataCache.defaultHeight / 2;
            this.addChild(this._loadingLogo);
            // this.promptText.text = this.text[Math.floor(Math.random() * 3)];
            // this.promptText.x = (640 - this.promptText.width) / 2;
            // this.promptText.y = (1136 - this.promptText.height) / 2 + 180;
            // this.addChild(this.promptText);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    TJLoadingUI.prototype.onAddToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        egret.Tween.get(this._loadingBG, { loop: true }).to({ rotation: 360 }, 600);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    TJLoadingUI.prototype.setProgress = function (txt, cur, gpName) {
    };
    TJLoadingUI.prototype.onRemoveFromStage = function (e) {
        egret.Tween.removeTweens(this._loadingBG);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    return TJLoadingUI;
})(egret.Sprite);

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    var LobbyEvents = (function (_super) {
        __extends(LobbyEvents, _super);
        function LobbyEvents() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(LobbyEvents, "Instance", {
            get: function () {
                if (this._self == null) {
                    this._self = new LobbyEvents();
                }
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        LobbyEvents._self = null;
        /**
         * 加载完成
         */
        LobbyEvents.NOTIFY_CONNECT_TIMEOUT = "NOTIFY_CONNECT_TIMEOUT";
        /**服务器发来显示是否存在官方充值代理商充值送钻 */
        LobbyEvents.NOTIFY_RECHARGE_GIVE = "NOTIFY_RECHARGE_GIVE";
        return LobbyEvents;
    })(egret.EventDispatcher);
    MJLobby.LobbyEvents = LobbyEvents;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    var MahJongLobbyFacade = (function (_super) {
        __extends(MahJongLobbyFacade, _super);
        function MahJongLobbyFacade() {
            _super.call(this);
            // uniLib.ZQGameSdk.getLocation();
            MahJongLobbyFacade._commandArr = {};
            MahJongLobbyFacade._mediatorArr = [];
            MahJongLobbyFacade._proxyArr = [];
            this.initializeController();
        }
        MahJongLobbyFacade.getLobbyInstance = function () {
            if (this._instance == null)
                this._instance = new MahJongLobbyFacade();
            return (this._instance);
        };
        MahJongLobbyFacade.prototype.initializeController = function () {
            // this.registerCommand(MahJongLobbyFacadeConsts.STARTUP,LobbyStartUpCommand);
            this.registerCommand(MJLobby.MahJongLobbyFacadeConsts.STARTUP, new MJLobby.LobbyStartUpCommand());
        };
        /**
         * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
         * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
         */
        MahJongLobbyFacade.prototype.startUp = function (rootView) {
            MahJongLobbyFacade._commandArr = {};
            MahJongLobbyFacade._mediatorArr = [];
            MahJongLobbyFacade._proxyArr = [];
            this.sendNotification(MJLobby.MahJongLobbyFacadeConsts.STARTUP, rootView);
            // this.removeCommand(MahJongLobbyFacadeConsts.STARTUP); //PureMVC初始化完成，注销STARUP命令
        };
        MahJongLobbyFacade.prototype.registerCommand = function (cmd, command) {
            command.init();
            MahJongLobbyFacade._commandArr[cmd] = command;
        };
        MahJongLobbyFacade.prototype.removeCommand = function (cmd) {
            MahJongLobbyFacade._commandArr[cmd].onRemove();
            MahJongLobbyFacade._commandArr[cmd] = null;
        };
        MahJongLobbyFacade.prototype.registerMediator = function (mediator) {
            if (MahJongLobbyFacade._mediatorArr.indexOf(mediator) == -1) {
                MahJongLobbyFacade._mediatorArr.push(mediator);
            }
        };
        MahJongLobbyFacade.prototype.retrieveMediator = function (name) {
            for (var i = 0; i < MahJongLobbyFacade._mediatorArr.length; i++) {
                if (MahJongLobbyFacade._mediatorArr[i].name == name) {
                    return MahJongLobbyFacade._mediatorArr[i];
                }
            }
        };
        MahJongLobbyFacade.prototype.removeMediator = function (name) {
            for (var i = 0; i < MahJongLobbyFacade._mediatorArr.length; i++) {
                if (MahJongLobbyFacade._mediatorArr[i].name == name) {
                    MahJongLobbyFacade._mediatorArr[i].onRemove();
                    MahJongLobbyFacade._mediatorArr.splice(i, 1);
                    break;
                }
            }
        };
        MahJongLobbyFacade.prototype.registerProxy = function (proxy) {
            if (MahJongLobbyFacade._proxyArr.indexOf(proxy) == -1) {
                MahJongLobbyFacade._proxyArr.push(proxy);
            }
        };
        MahJongLobbyFacade.prototype.removeProxy = function (name) {
            for (var i = 0; i < MahJongLobbyFacade._proxyArr.length; i++) {
                if (MahJongLobbyFacade._proxyArr[i].name == name) {
                    MahJongLobbyFacade._proxyArr[i].onRemove();
                    MahJongLobbyFacade._proxyArr.splice(i, 1);
                    break;
                }
            }
        };
        return MahJongLobbyFacade;
    })(MJLobby.MvcSender);
    MJLobby.MahJongLobbyFacade = MahJongLobbyFacade;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var MahJongLobbyFacadeConsts = (function () {
        function MahJongLobbyFacadeConsts() {
        }
        MahJongLobbyFacadeConsts.STARTUP = "STARTUP";
        MahJongLobbyFacadeConsts.SEND_DATA = "sendData";
        MahJongLobbyFacadeConsts.ENTER_LOBBY = "ENTER_LOBBY";
        MahJongLobbyFacadeConsts.JOIN_ROOM = "JOIN_ROOM"; //进入房间
        MahJongLobbyFacadeConsts.JOIN_VIDEOROOM = "join_videoroom"; //进入录像房间
        /**加入百人场 */
        MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM = "JOIN_HUNDRE_ROOM";
        MahJongLobbyFacadeConsts.CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS"; //创建房间成功
        MahJongLobbyFacadeConsts.CANCEL_ROOM = "CANCEL_ROOM"; //取消房间
        MahJongLobbyFacadeConsts.SHOW_RECORD = "SHOW_RECORD"; //显示战绩
        MahJongLobbyFacadeConsts.SHOW_HELP = "SHOW_HELP"; //显示玩法
        MahJongLobbyFacadeConsts.SHOW_SHARE = "SHOW_SHARE"; //显示分享
        MahJongLobbyFacadeConsts.SHOW_SETTING = "SHOW_SETTING"; //显示设置
        MahJongLobbyFacadeConsts.HISTORY_DATA = "HISTORY_DATA"; //战绩数据按页返回
        MahJongLobbyFacadeConsts.HISTORY_DETAIL_DATA = "HISTORY_DETAIL_DATA"; //战绩详细数据
        MahJongLobbyFacadeConsts.ROOM_DESTORY = "ROOM_DESTORY"; //创建房间销毁
        MahJongLobbyFacadeConsts.USER_INFO_DATA = "USER_INFO_DATA"; //玩家数据信息
        MahJongLobbyFacadeConsts.DESTORY = "DESTORY"; //销毁
        MahJongLobbyFacadeConsts.SHOW_LOBBY = "SHOW_LOBBY"; //显示大厅
        MahJongLobbyFacadeConsts.LOBBY_RECONNECTION = "LOBBY_RECONNECTION"; //大厅断线重连
        MahJongLobbyFacadeConsts.GAME_LIST_DATA = "GAME_LIST_DATA"; //大厅列表
        MahJongLobbyFacadeConsts.GetNormalGameListRoomCmd_S = "GetNormalGameListRoomCmd_S"; //大厅列表
        MahJongLobbyFacadeConsts.INVITE_DATA = "INVITE_DATA"; //推荐人数据
        MahJongLobbyFacadeConsts.CHECKIN_AWARDS_DATA = "CHECKIN_AWARDS_DATA"; //获取签到奖励返回
        MahJongLobbyFacadeConsts.INVITE_AWARDS_DATA = "INVITE_AWARDS_DATA"; //获取邀请奖励返回
        MahJongLobbyFacadeConsts.CONFIG_LOADED = "CONFIG_LOADED"; //大厅配置加载成功
        MahJongLobbyFacadeConsts.CONTINUE = "CONTINUE"; //继续牌局
        /**发红包返回 客家*/
        MahJongLobbyFacadeConsts.SEND_REDPACKET_BACK = "send_redpacket_back";
        /**领取红包返回 客家*/
        MahJongLobbyFacadeConsts.GET_REDPACKET_BACK = "get_redpacket_back";
        /**红包记录返回 客家*/
        MahJongLobbyFacadeConsts.GET_REDPACKET_RECORD = "get_redpacket_record";
        /**加入房间确认 */
        MahJongLobbyFacadeConsts.CONFRIM_JOINROOM = "CONFRIM_JOINROOM";
        /**收到服务器发来排行榜数据 */
        MahJongLobbyFacadeConsts.GET_RANK_RECORD = "GET_RANK_RECORD";
        /**收到服务器发来领取排行榜奖励 */
        MahJongLobbyFacadeConsts.GET_RANK_AWARD = "GET_RANK_AWARD";
        /**收到服务器返回打开红包界面 */
        MahJongLobbyFacadeConsts.OPEN_REDPACKETPANEL = "OPEN_REDPACKETPANEL";
        /**收到服务器返回提现详情界面 */
        MahJongLobbyFacadeConsts.GET_REDPOSITDETAIL = "GET_REDPOSITDETAIL";
        /**收到服务器返回 红包提现成功 */
        MahJongLobbyFacadeConsts.GET_REDPACKET_SUCCESS = "GET_REDPACKET_SUCCESS";
        /**检测红包提取成功 */
        MahJongLobbyFacadeConsts.CHECKOPENREDPACK_OK = "CHECKOPENREDPACK_OK";
        /**更新匹配组数据 */
        MahJongLobbyFacadeConsts.REFRESH_MATCHGROUP = "REFRESH_MATCHGROUP";
        /**进入匹配组数据 */
        MahJongLobbyFacadeConsts.ENTER_MATCHGROUP = "ENTER_MATCHGROUP";
        /**刷新匹配组数据 */
        MahJongLobbyFacadeConsts.UODATE_MATCHGROUP = "UODATE_MATCHGROUP";
        /**离开匹配组数据 */
        MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP = "LEAVE_MATCHGROUP";
        /**离开匹配组数据-其他人*/
        MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP_OTHER = "LEAVE_MATCHGROUP_OTHER";
        /** */
        MahJongLobbyFacadeConsts.ActiveDetailRoom = "ActiveDetailRoom";
        /**进入匹配组数据 */
        MahJongLobbyFacadeConsts.CREATE_MATCHGROUP = "CREATE_MATCHGROUP";
        /**获取服务器发来的比赛场时间 */
        MahJongLobbyFacadeConsts.GET_MATCHTIME = "GET_MATCHTIME";
        /**比赛场报名成功 */
        MahJongLobbyFacadeConsts.MATCH_ENROLL_SUCCESS = "MATCH_ENROLL_SUCCESS";
        /**比赛场退赛 */
        MahJongLobbyFacadeConsts.MATCH_EXIT = "MATCH_EXIT";
        /**比赛场获得玩家数量 */
        MahJongLobbyFacadeConsts.MATCH_GETUSER_COUNT = "MATCH_GETUSER_COUNT";
        /**比赛场获得玩家数量排行榜 */
        MahJongLobbyFacadeConsts.MATCH_GETCOUNT_LIST = "MATCH_GETCOUNT_LIST";
        /**金币场用户签到信息返回 */
        MahJongLobbyFacadeConsts.SIGN_INFO = "SIGNINFO_RETURN";
        /**金币场用户签到返回 */
        MahJongLobbyFacadeConsts.SIGN_TODAY = "SIGNTODAY_DATA";
        /**金币场累积签到奖励 */
        MahJongLobbyFacadeConsts.SIGN_CONTINUE = "SIGN_CONTINUE";
        /**金币场排行榜信息回复 */
        MahJongLobbyFacadeConsts.GET_RANK_LIST = "GET_RANK_LIST";
        /**金币场获取大赢家排行榜奖励回复 */
        MahJongLobbyFacadeConsts.GET_WINCHIPS_RANK = "GET_WINCHIPS_RANK";
        /**金币场获取免费金币界面数据 */
        MahJongLobbyFacadeConsts.GET_FREEGOLD_INFO = "GET_FREEGOLD_INFO";
        /**金币场获取vip礼包 */
        MahJongLobbyFacadeConsts.COIN_GETAWARD_VIP = "COIN_GETAWARD_VIP";
        /**金币场首冲充值成功 */
        MahJongLobbyFacadeConsts.COIN_FIRSTRECHARGE = "COIN_FIRSTRECHARGE";
        /**金币场免费金币 */
        MahJongLobbyFacadeConsts.COIN_FREEGOLD = "COIN_FREEGOLD";
        /**金币场排行榜的个人信息 */
        MahJongLobbyFacadeConsts.COIN_RANK_INFO = "COIN_RANK_INFO";
        /**匹配号数据 */
        MahJongLobbyFacadeConsts.ReturnMatchGroup = "ReturnMatchGroup";
        /**白名单消息列表 */
        MahJongLobbyFacadeConsts.JoinMemberListMatch = "JoinMemberListMatch";
        /**返回黑白名单 */
        MahJongLobbyFacadeConsts.MemberInfoMatchGroup = "MemberInfoMatchGroup";
        /**返回参赛人员战绩列表 */
        MahJongLobbyFacadeConsts.PlayedListMatchGroup = "PlayedListMatchGroup";
        /**客家棋牌推荐人数 */
        MahJongLobbyFacadeConsts.KEJIA_INVITERANK = "KEJIA_INVITERANK";
        /**福建代理商邀请人 */
        MahJongLobbyFacadeConsts.LYFJ_INVITE = "LYFJ_INVITE";
        /**福建代理商邀请返回 */
        MahJongLobbyFacadeConsts.LYFJ_INVITE_RETURN = "LYFJ_INVITE_RETURN";
        /**丹东邀请人 */
        MahJongLobbyFacadeConsts.DANDONG_INVITE = "DANDONG_INVITE";
        /**余款数量更新 */
        MahJongLobbyFacadeConsts.BANK_MONEY_UPDATE = "BANK_MONEY_UPDATE";
        ////////////////////////好彩真人麻将/////////////////////////
        /** 收到服务器发来 好彩真人麻将救济金消息 */
        MahJongLobbyFacadeConsts.HC_ALMS = "HC_ALMS";
        /**收到服务器发回首充面板消息 */
        MahJongLobbyFacadeConsts.HC_SHOW_FIRSTRECHARGE = "HC_SHOW_FIRSTRECHARGE";
        /**收到服务器发限时面板的返回 */
        MahJongLobbyFacadeConsts.HC_SHOW_LIMIT = "HC_SHOW_LIMIT";
        /**收到服务器限时优惠兑换奖励的返回 */
        MahJongLobbyFacadeConsts.HC_SHOW_LIMIT_BACK = "HC_SHOW_LIMIT_BACK";
        /**打开幸运翻翻翻面板 */
        MahJongLobbyFacadeConsts.HC_SHOW_LUCK = "HC_SHOW_LUCK";
        /**好彩真人金币排行榜 */
        MahJongLobbyFacadeConsts.HC_SHOW_RANK = "HC_SHOW_RANK";
        /**获取弹窗公告 */
        MahJongLobbyFacadeConsts.HC_SHOW_BROAD = "HC_SHOW_BROAD";
        /**已读弹窗公告 */
        MahJongLobbyFacadeConsts.HC_SHOW_READBROAD = "HC_SHOW_READBROAD";
        /**返回幸运翻翻翻面板的数据 */
        MahJongLobbyFacadeConsts.HC_SHOW_LUCK_BACK = "HC_SHOW_LUCK_BACK";
        /**快速开始 */
        MahJongLobbyFacadeConsts.HC_QUICK_START = "HC_QUICK_START";
        /**限时优惠 */
        MahJongLobbyFacadeConsts.HC_ExchangeLimitActivity = "HC_ExchangeLimitActivity";
        /**好彩真人百人场 */
        MahJongLobbyFacadeConsts.HC_JOIN_HUNDRE_ROOM = "HC_JOIN_HUNDRE_ROOM";
        /**返回活跃房间列表 */
        MahJongLobbyFacadeConsts.RETURN_ACTIVE_LIST_ROOM = "RETURN_ACTIVE_LIST_ROOM";
        /**好彩真人登陆成功 */
        MahJongLobbyFacadeConsts.HC_LOGIN_SUCCESS = "HC_LOGIN_SUCCESS";
        /**好彩礼包码兑换 */
        MahJongLobbyFacadeConsts.HC_GIFT_CODE = "HC_GIFT_CODE";
        /**好彩领取首充礼包 */
        MahJongLobbyFacadeConsts.HC_GET_FIRSTRECHARGE_REWARD = "HC_GET_FIRSTRECHARGE_REWARD";
        /**服务器返回是否可以加入游戏信息 */
        MahJongLobbyFacadeConsts.HC_JudgeEnterGameLobby = "HC_JudgeEnterGameLobby";
        /**返回之前的游戏房间 */
        MahJongLobbyFacadeConsts.HC_ReturnHaoCaiGameLobby = "HC_ReturnHaoCaiGameLobby";
        /**魅力值排行榜 */
        MahJongLobbyFacadeConsts.HC_GETUSERCPRANKLIST_LOBBY = "HC_GETUSERCPRANKLIST_LOBBY";
        /**添加好友 */
        MahJongLobbyFacadeConsts.HC_ADDFRIEND_LOBBY = "HC_ADDFRIEND_LOBBY";
        /**服务器发来 获取好友列表数据 */
        MahJongLobbyFacadeConsts.HC_GETFRIENDLIST_LOBBY = "HC_GETFRIENDLIST_LOBBY";
        /**服务器发来查找特定的玩家数据 */
        MahJongLobbyFacadeConsts.HC_SEARCHUSER_LOBBY = "HC_SEARCHUSER_LOBBY";
        /**服务器发来查找好友界面数据 */
        MahJongLobbyFacadeConsts.HC_SEARCHFRIENDSLIST_LOBBY = "HC_SEARCHFRIENDSLIST_LOBBY";
        /**服务器发来好友聊天 */
        MahJongLobbyFacadeConsts.HC_FRIENDCHAT_LOBBY = "HC_FRIENDCHAT_LOBBY";
        /**获得金币场战绩 */
        MahJongLobbyFacadeConsts.HC_GETCOINGAMERECORD_LOBBY = "HC_GETCOINGAMERECORD_LOBBY";
        /**自己送礼的回调 */
        MahJongLobbyFacadeConsts.HC_SENDGIFT_LOBBY_S = "HC_SENDGIFT_ROOM_S";
        /**获取礼品券 */
        MahJongLobbyFacadeConsts.HC_GETGIFTCOUPON_LOBBY = "HC_GETGIFTCOUPON_LOBBY";
        /**兑换礼品券记录个人信息 */
        MahJongLobbyFacadeConsts.HC_EXCHANGEGIFTCOUPONRECORDUSERINFO_LOBBY = "HC_EXCHANGEGIFTCOUPONRECORDUSERINFO_LOBBY";
        /**删除好友 */
        MahJongLobbyFacadeConsts.HC_REMOVEFRIEND_LOBBY = "HC_REMOVEFRIEND_LOBBY";
        /**修改用户信息 */
        MahJongLobbyFacadeConsts.USERINFO_MODIFY_LOBBY = "USERINFO_MODIFY_LOBBY";
        /**修改用户信息失败 */
        MahJongLobbyFacadeConsts.USERINFO_MODIFY_FAIL = "USERINFO_MODIFY_FAIL";
        /**好友申请列表 */
        MahJongLobbyFacadeConsts.HC_GETFRIENDAPPLYLIST_LOBBY = "HC_GETFRIENDAPPLYLIST_LOBBY";
        /**同意，拒绝好友 */
        MahJongLobbyFacadeConsts.HC_DEALFRIENDAPPLYLIST_LOBBY = "HC_DEALFRIENDAPPLYLIST_LOBBY";
        /** 获取任务列表*/
        MahJongLobbyFacadeConsts.HC_GET_GAME_TASKLIST_LOBBY = "HC_GET_GAME_TASKLIST_LOBBY";
        /** 领取指定游戏任务奖励 */
        MahJongLobbyFacadeConsts.HC_GET_GAME_TASKREWARD_LOBBY = "HC_GET_GAME_TASKREWARD_LOBBY";
        /**退出房间面板 */
        MahJongLobbyFacadeConsts.HC_QUITGAMESHOW_LOBBY = "HC_QUITGAMESHOW_LOBBY";
        /////////////////////////////////////////////////////////////
        /**邮件改变 */
        MahJongLobbyFacadeConsts.Mail_Changed = "Mail_Changed";
        /**金币改变 */
        MahJongLobbyFacadeConsts.Chips_Changed = "Chips_Changed";
        /**已获取邮件东西通知 */
        MahJongLobbyFacadeConsts.GetItemMail = "GetItemMail";
        /**比赛场获取时间 */
        MahJongLobbyFacadeConsts.GET_BATTLE_TIME = "GET_BATTLE_TIME";
        /**刷新某个赛事人数 */
        MahJongLobbyFacadeConsts.RefreshUesrNbrEvent = "RefreshUesrNbrEvent";
        /**刷新某个赛事状态 */
        MahJongLobbyFacadeConsts.RefreshStateEvent = "RefreshStateEvent";
        /**查看当前赛事 */
        MahJongLobbyFacadeConsts.ReturnListEvent = "ReturnListEvent";
        /**商城购买 */
        MahJongLobbyFacadeConsts.BUYGOODS_LOBBY = "BUYGOODS_LOBBY";
        /**绑定手机成功 */
        MahJongLobbyFacadeConsts.BIND_PHONE = "Bind_phone";
        /**获取红包信息 */
        MahJongLobbyFacadeConsts.GET_REDPACKINFO = "Get_RedPACKINFO";
        /**抢红包 */
        MahJongLobbyFacadeConsts.GRAB_REDPACK = "Grab_RedPACK";
        /**红包累计奖励 */
        MahJongLobbyFacadeConsts.GET_MYREDPACKREWARD = "GetMyRedPackReward";
        /**兑换红包奖励 */
        MahJongLobbyFacadeConsts.EX_MYREDPACK = "Ex_MyRedPack";
        /**兑换红包奖励 */
        MahJongLobbyFacadeConsts.HC_USERVIP = "Hc_UserVip";
        /**请求转盘信息 */
        MahJongLobbyFacadeConsts.GET_TURNTABLEINFO = "Get_TurnTableInfo";
        /**转动转盘信息 */
        MahJongLobbyFacadeConsts.TURN_TURNTABLE = "Turn_TurnTable";
        /**请求领取转盘累计奖励 */
        MahJongLobbyFacadeConsts.GET_TURNTABLEREWARD = "Get_TurnTableReward";
        /**请求邮件列表 */
        MahJongLobbyFacadeConsts.GET_MAILLIST = "Get_MailList";
        /**查看指定邮件 */
        MahJongLobbyFacadeConsts.READ_ONEMAIL = "Read_oneMail";
        /**删除指定邮件 */
        MahJongLobbyFacadeConsts.DELETE_ONEMAIL = "Delete_oneMail";
        /**领取指定邮件内的奖励 */
        MahJongLobbyFacadeConsts.GET_MAILREWARD = "Get_MailReward";
        /**邮件批量操作 */
        MahJongLobbyFacadeConsts.BULK_MAIL = "Bulh_Mail";
        /**按钮红点更新 */
        MahJongLobbyFacadeConsts.RED_POINT = "Red_Point";
        /**顺序弹窗协议 */
        MahJongLobbyFacadeConsts.WINDOW_POP = "Window_Pop";
        /**申请退出一个赛事 */
        MahJongLobbyFacadeConsts.RequestExitEvent = "RequestExitEvent";
        /**申请退出一个赛事返回 */
        MahJongLobbyFacadeConsts.ReturnExitEvent = "ReturnExitEvent";
        /**返回某个赛事结果 */
        MahJongLobbyFacadeConsts.ReturnEventResult = "ReturnEventResult";
        /**申请参加加赛事返回 */
        MahJongLobbyFacadeConsts.ReturnJoinEvent = "ReturnJoinEvent";
        /**账户字账号更新 */
        MahJongLobbyFacadeConsts.SubAccountUpdateEvent = "SubAccountUpdateEvent";
        /**实名认证 */
        MahJongLobbyFacadeConsts.AuthenticationLobby = "AuthenticationLobby";
        /**提现记录 */
        MahJongLobbyFacadeConsts.WithdrawalRecordEvent = "WithdrawalRecordEvent";
        /**普通玩家，请求进入茶馆返回 */
        MahJongLobbyFacadeConsts.ReturnRoomMatchGroup = "ReturnRoomMatchGroup";
        /**返回请求的玩家头像组 */
        MahJongLobbyFacadeConsts.ReturnUserHeadList = "ReturnUserHeadList";
        /**返回黄名单列表 */
        MahJongLobbyFacadeConsts.ReturnYellowList = "ReturnYellowList";
        /**放弃摇一摇 */
        MahJongLobbyFacadeConsts.AbandonShake = "AbandonShake";
        /**进入摇一摇 */
        MahJongLobbyFacadeConsts.ENTERSHAKE_LOBBY = "entershake_lobby";
        /**摇一摇结果返回 */
        MahJongLobbyFacadeConsts.SHAKE_DATA_LOBBY = "shake_data_lobby";
        /**大厅红包雨 */
        MahJongLobbyFacadeConsts.GrabRedPackLobby = "GrabRedPackLobby";
        /**改变匹配号属性事件 */
        MahJongLobbyFacadeConsts.ChangeMatchGroupEvent = "ChangeMatchGroupEvent";
        /**历史匹配记录 */
        MahJongLobbyFacadeConsts.HistoryMatchIdList = "HistoryMatchIdList";
        /**个人信息 */
        MahJongLobbyFacadeConsts.PersonalInfo = "PersonalInfo";
        /**官方匹配组列表 */
        MahJongLobbyFacadeConsts.PublicMatchList = "PublicMatchList";
        /**冠名赛列表 */
        MahJongLobbyFacadeConsts.OfficialMatchList = "OfficialMatchList";
        /**等待列表*/
        MahJongLobbyFacadeConsts.ReturnWaitList = "ReturnWaitList";
        /**弹窗事件 */
        MahJongLobbyFacadeConsts.OpenWindowHandle = "OpenWindowHandle";
        /**弹窗事件 */
        MahJongLobbyFacadeConsts.TotalRedPack = "TotalRedPack";
        /**新用户红包界面 */
        MahJongLobbyFacadeConsts.NewUserRedPack = "NewUserRedPack";
        /**领取新手红包 */
        MahJongLobbyFacadeConsts.ExchangeNewUserRedPack = "ExchangeNewUserRedPack";
        /**话费券兑换红包界面 */
        MahJongLobbyFacadeConsts.GetCCRedPack = "GetCCRedPack";
        /**话费券兑换红包 */
        MahJongLobbyFacadeConsts.ExchangeCCRedPack = "ExchangeCCRedPack";
        /**返利红包界面 */
        MahJongLobbyFacadeConsts.GetRechargeRedPack = "GetRechargeRedPack";
        /**兑换返利红包 */
        MahJongLobbyFacadeConsts.ExchangeRechargeRedPack = "ExchangeRechargeRedPack";
        /**玩家获得红包明细 */
        MahJongLobbyFacadeConsts.GetUserGetRedPackInfo = "GetUserGetRedPackInfo";
        /**提现记录 */
        MahJongLobbyFacadeConsts.GetDrawCashRecord = "GetDrawCashRecord";
        /**红包提现 */
        MahJongLobbyFacadeConsts.RedPackDrawCash = "RedPackDrawCash";
        /**新版幸运翻翻翻主界面 */
        MahJongLobbyFacadeConsts.NewLuckTurnCardShow = "NewLuckTurnCardShow";
        /**新版幸运翻翻翻翻牌 */
        MahJongLobbyFacadeConsts.NewGetLuckTurnCardReward = "NewGetLuckTurnCardReward";
        /**返回商城列表 */
        MahJongLobbyFacadeConsts.ReturnShopPointList = "ReturnShopPointList";
        /**返回抽奖结果 */
        MahJongLobbyFacadeConsts.ReturnLuckShopPointItem = "ReturnLuckShopPointItem";
        /**获取收货地址 */
        MahJongLobbyFacadeConsts.GetShippingAddress = "GetShippingAddress";
        /**填写或者修改收货地址 */
        MahJongLobbyFacadeConsts.ChangeShippingAddress = "ChangeShippingAddress";
        /**获取拥有的所有时效性道具 */
        MahJongLobbyFacadeConsts.GetTimeGoods = "GetTimeGoods";
        /**获取拥有的所有时效性道具 */
        MahJongLobbyFacadeConsts.RevTimeChips = "RevTimeChips";
        /**购买头像框，周卡/月卡等时效性道具 */
        MahJongLobbyFacadeConsts.BuyTimeGoods = "BuyTimeGoods";
        /**个人形象道具的使用 */
        MahJongLobbyFacadeConsts.ChangePersonalImage = "ChangePersonalImage";
        /**玩家发送世界聊天消息 */
        MahJongLobbyFacadeConsts.WorldChatBySuona = "WorldChatBySuona";
        /**推送世界聊天消息 */
        MahJongLobbyFacadeConsts.WorldChatBySuonaBrd = "WorldChatBySuonaBrd";
        /**获取世界聊天消息 */
        MahJongLobbyFacadeConsts.GetWorldChatRecord = "GetWorldChatRecord";
        /**绑定联系信息*/
        MahJongLobbyFacadeConsts.Bind_WeChatNum = "bindWeChatNum";
        MahJongLobbyFacadeConsts.HISTORY_LOG = "HISTORY_LOG";
        /**创建德州扑克俱乐部 */
        MahJongLobbyFacadeConsts.ClubInfoUpdateEvent = "ClubInfoUpdateEvent";
        /**查询俱乐部信息 */
        MahJongLobbyFacadeConsts.QueryClubInfoEvent = "QueryClubInfoEvent";
        /**查询俱乐部列表信息 */
        MahJongLobbyFacadeConsts.SerchClubListEvent = "SerchClubListEvent";
        /**消息通知更跟新 */
        MahJongLobbyFacadeConsts.NotifyMsgUpdateEvent = "NotifyMsgUpdateEvent";
        /**已读弹窗公告 */
        MahJongLobbyFacadeConsts.ReadPopBroad = "ReadPopBroad";
        /**返回所有俱乐部信息 */
        MahJongLobbyFacadeConsts.HistoryClubList = "HistoryClubList";
        /**压注数据（德扑大厅） */
        MahJongLobbyFacadeConsts.StatisticsRoundData = "StatisticsRoundData";
        /**房间牌局记录（德扑大厅） */
        MahJongLobbyFacadeConsts.RoundRecordRoomQuery = "RoundRecordRoomQuery";
        /*** 聊天*/
        MahJongLobbyFacadeConsts.ChatMessageInfo = "ChatMessageInfo";
        /*** 报名更新通知*/
        MahJongLobbyFacadeConsts.SignListUpdate = "SignListUpdate";
        /*** 报名更新通知*/
        MahJongLobbyFacadeConsts.MyGamesUpdate = "MyGamesUpdate";
        /*** 座位货币变化*/
        MahJongLobbyFacadeConsts.UserChipChaned = "UserChipChaned";
        /**请求玩家信息 */
        MahJongLobbyFacadeConsts.QueryUserInfoEvent = "QueryUserInfoEvent";
        /**离开匹配组返回  */
        MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP2 = "LEAVEMATCHGROUP2";
        /**删除好友 */
        MahJongLobbyFacadeConsts.RemoveFriend = "RemoveFriend";
        /**新年活动领取奖励 */
        MahJongLobbyFacadeConsts.NEWYEAR_GETREWORD = "NEWYEAR_GETREWORD";
        /**新年活动界面数据 */
        MahJongLobbyFacadeConsts.NEWYEAR_DATAINFO = "NEWYEAR_DATAINFO";
        /**新年活动记录面板 */
        MahJongLobbyFacadeConsts.NEWYEAR_RECORD = "NEWYEAR_RECORD";
        /**自己收藏牌谱 */
        MahJongLobbyFacadeConsts.SelfRoundRecordQuery = "SelfRoundRecordQuery";
        /**获取百宝箱数据 */
        MahJongLobbyFacadeConsts.GET_TREBOX_INFO = "get_trebox_info";
        /**领取百宝箱奖励 */
        MahJongLobbyFacadeConsts.GET_TREBOX_TASKAWARD = "get_trebox_taskaward";
        /**百宝箱转动抽奖 */
        MahJongLobbyFacadeConsts.TURN_TREBOX_LOTTERY = "get_trebox_lottery";
        /**红包开启失败 */
        MahJongLobbyFacadeConsts.OPEN_REDPACKET_FAIL = "OPEN_REDPACKET_FAIL";
        /**捐献历史 */
        MahJongLobbyFacadeConsts.DONATE_HISTORY = "DONATE_HISTORY";
        /**获取标签列表 */
        MahJongLobbyFacadeConsts.Get_TagList = "Get_TagList";
        /**标签列表更新 */
        MahJongLobbyFacadeConsts.TagListChanged = "TagListChanged";
        /**添加标签返回 */
        MahJongLobbyFacadeConsts.AddTagReturn = "AddTagReturn";
        /**基金更新 */
        MahJongLobbyFacadeConsts.Club_Fund_Update = "ClubFundUpdate";
        /**消息通知更新 */
        MahJongLobbyFacadeConsts.UpdateNotification = "UpdateNotification";
        /**茶馆里的房间状态变化 */
        MahJongLobbyFacadeConsts.UpdataMatchRoomStatus = "UpdataMatchRoomStatus";
        /**报名进入通知 */
        MahJongLobbyFacadeConsts.Sign_Enter = "Sign_Enter";
        /**俱乐部信息更新【比赛场】 */
        MahJongLobbyFacadeConsts.ReturnClubInfo = "ReturnClubInfo";
        /**加入俱乐部弹窗消息 */
        MahJongLobbyFacadeConsts.NOTIFYIMPORTNOTE = "NOTIFYIMPORTNOTE";
        /**赛事信息 */
        MahJongLobbyFacadeConsts.EVENT_INFO = "EVENT_INFO";
        /**创建选项更新 */
        MahJongLobbyFacadeConsts.RoomCreateConfigUpdate = "RoomCreateConfigUpdate";
        /**赛事报名信息 */
        MahJongLobbyFacadeConsts.EntryInfoEvent = "EntryInfoEvent";
        /**转账数据更新 */
        MahJongLobbyFacadeConsts.TransitMoneyQueryClub = "TransitMoneyQueryClub";
        /**俱乐部牌局更新 */
        MahJongLobbyFacadeConsts.UpdataClubGame = "UpdataClubGame";
        /**奖池数据查询 */
        MahJongLobbyFacadeConsts.RETURN_JACKPITEMLIST = "RETURN_JACKPITEMLIST";
        /**刷新奖池总金额 */
        MahJongLobbyFacadeConsts.UPDATE_JACKPOTNUM = "UPDATE_JACKPOTNUM";
        /**招商消息成功发送 */
        MahJongLobbyFacadeConsts.AGENT_SUCCESS = "AGENT_SUCCESS";
        /**其他登录方式 验证老手机返回 */
        MahJongLobbyFacadeConsts.VERIFY_IDENTIFY_CODE = "verify_identify_code";
        /**其他登录方式返回 操作类型 1/2/3/4  绑定/换绑/修改密码/解绑 */
        MahJongLobbyFacadeConsts.BIND_ACCOUNT_LOBBY = "bind_account_lobby";
        /**游客邮箱验证 */
        MahJongLobbyFacadeConsts.GET_EMAIL_CODE = "get_email_code";
        /**绑定邮箱操作类型 1/2/3/4  绑定/换绑/修改密码/解绑 -- 暂时只处理1、3 */
        MahJongLobbyFacadeConsts.BIND_EMAIL_LOBBY = "bind_email_lobby";
        /**设置俱乐部税收 */
        MahJongLobbyFacadeConsts.SET_CLUB_TAX = "SET_CLUB_TAX";
        /**bashi加入俱乐部 */
        MahJongLobbyFacadeConsts.BSClubJoinCmd_CS = "BSClubJoinCmd_CS";
        /**bashi退出俱乐部 */
        MahJongLobbyFacadeConsts.BSClubExitCmd_CS = "BSClubExitCmd_CS";
        /**bashi退出俱乐部 */
        MahJongLobbyFacadeConsts.BSClubLoginCmd_CS = "BSClubLoginCmd_CS";
        /**bashi俱乐部详细信息 */
        MahJongLobbyFacadeConsts.BSClubInfoCmd_CS = "BSClubInfoCmd_CS";
        /**bashi创建俱乐部 */
        MahJongLobbyFacadeConsts.BSClubCreateCmd_CS = "BSClubCreateCmd_CS";
        /**bashi创建俱乐部 */
        MahJongLobbyFacadeConsts.BSClubManageCmd_CS = "BSClubManageCmd_CS";
        /**bashi创建俱列表 */
        MahJongLobbyFacadeConsts.BSClubMemberListCmd_CS = "BSClubMemberListCmd_CS";
        /**bashi创建俱查找 */
        MahJongLobbyFacadeConsts.BSClubMemberFindCmd_CS = "BSClubMemberFindCmd_CS";
        /**bashi赠送金币 */
        MahJongLobbyFacadeConsts.BSClubGiftGoldCmd_CS = "BSClubGiftGoldCmd_CS";
        /**bashi使用礼卷 */
        MahJongLobbyFacadeConsts.BSClubUseCouponCmd_CS = "BSClubUseCouponCmd_CS";
        /**解散更新 */
        MahJongLobbyFacadeConsts.DISSOLVE_UPDATA = "DISSOLVE_UPDATA";
        /**查询俱乐部房间总战绩 */
        MahJongLobbyFacadeConsts.StatisticsRoomLabelQuery = "StatisticsRoomLabelQuery";
        /**数据更新通知 */
        MahJongLobbyFacadeConsts.DataUpdateNotify = "DataUpdateNotify";
        /**大厅所有游戏在线人数 */
        MahJongLobbyFacadeConsts.AllGamePlayerOnlineNumberLobby_CS = "AllGamePlayerOnlineNumberLobby_CS";
        /**俱乐部成员更新 */
        MahJongLobbyFacadeConsts.ClubMemberUpdate = "ClubMemberUpdate";
        /**俱乐部申请更新 */
        MahJongLobbyFacadeConsts.ClubApplicationUpdate = "ClubApplicationUpdate";
        /**俱乐部转账更新 */
        MahJongLobbyFacadeConsts.TransitMoneyDealClub = "TransitMoneyDealClub";
        /**奖池抽奖结果返回 */
        MahJongLobbyFacadeConsts.ReturnJackpotItem = "ReturnJackpotItem";
        /**奖池排行榜返回 */
        MahJongLobbyFacadeConsts.ReturnJackpotOrder = "ReturnJackpotOrder";
        /**移除红点 */
        MahJongLobbyFacadeConsts.RemoveRedPointEvent = "RemoveRedPointEvent";
        /**俱乐部通知 */
        MahJongLobbyFacadeConsts.CLUB_NOTICE = "CLUB_NOTICE";
        /**查找指定玩家 */
        MahJongLobbyFacadeConsts.USERINFO_SEARCH = "USERINFO_SEARCH";
        /**俱乐部指定玩家 */
        MahJongLobbyFacadeConsts.CLUB_MEMBER = "CLUB_MEMBER";
        /**俱乐部创建者 */
        MahJongLobbyFacadeConsts.CLUB_FOUNDER = "CLUB_FOUNDER";
        /**牌局消息处理结果 */
        MahJongLobbyFacadeConsts.GAME_MSG_DEAL = "GAME_MSG_DEAL";
        /**绑定邮箱 */
        MahJongLobbyFacadeConsts.Bind_MailAddress = "Bind_MailAddress";
        /**新牌局消息通知 */
        MahJongLobbyFacadeConsts.GameMessageNotifyUpdate = "GameMessageNotifyUpdate";
        /**牌局消息通知 */
        MahJongLobbyFacadeConsts.GameMessageUpdate = "GameMessageUpdate";
        /**检查能否转账 */
        MahJongLobbyFacadeConsts.BSClubCanTransferCmd_CS = "BSClubCanTransferCmd_CS";
        /**使用点卡 */
        MahJongLobbyFacadeConsts.BSClubUseCardCmd_CS = "BSClubUseCardCmd_CS";
        /**系统设置 */
        MahJongLobbyFacadeConsts.SystemSettingsLobbyCmd_CS = "SystemSettingsLobby";
        /**俱乐部货币兑换 */
        MahJongLobbyFacadeConsts.ExchangeMoneyClub = "ExchangeMoneyClub";
        /**赠送金币回复 */
        MahJongLobbyFacadeConsts.ExchangeCoinLobby_S = "ExchangeCoinLobby_S";
        /**查看牌谱 */
        MahJongLobbyFacadeConsts.RoundRecordCheck = "RoundRecordCheck";
        /**房间结算数据 */
        MahJongLobbyFacadeConsts.StatisticsRoomDataCheck = "StatisticsRoomDataCheck";
        /**牌局生成器通知 */
        MahJongLobbyFacadeConsts.RoomGeneratorUpdateClub = "RoomGeneratorUpdateClub";
        /**查找昵称回复 */
        MahJongLobbyFacadeConsts.GetUserNickNameLobby_S = "GetUserNickNameLobby_S";
        /**玩家赠送金币信息 */
        MahJongLobbyFacadeConsts.GetUserGiftCoinInfoLobbyCmd_S = "GetUserGiftCoinInfoLobbyCmd_S";
        /**返回购买订单历史 */
        MahJongLobbyFacadeConsts.ReturnOrderList = "ReturnOrderList";
        /**返回购买订单历史 */
        MahJongLobbyFacadeConsts.HistoryUpdateLobbyCmd_CS = "HistoryUpdateLobbyCmd_CS";
        /**玩家游戏历史数据更新（大厅） */
        MahJongLobbyFacadeConsts.UserGameHistoryUpdateLobbyCmd_CS = "UserGameHistoryUpdateLobbyCmd_CS";
        /**俱乐部转账更新 */
        MahJongLobbyFacadeConsts.TransitMoneyClub = "TransitMoneyClub";
        /**设置俱乐部管理员 */
        MahJongLobbyFacadeConsts.PostUpdateClub = "PostUpdateClub";
        /**上下级代理关系 */
        MahJongLobbyFacadeConsts.AgentRelationLineQueryClub = "AgentRelationLineQueryClub";
        /**俱乐部会员 */
        MahJongLobbyFacadeConsts.MemberQueryClub = "MemberQueryClub";
        /* 修改代理信用值 */
        MahJongLobbyFacadeConsts.AgentCreditChangeClub = "AgentCreditChangeClub";
        /* 查询代理可分配的下级成员 */
        MahJongLobbyFacadeConsts.AgentAvailableGiveMemberQueryClub = "AgentAvailableGiveMemberQueryClub";
        /* 创建联盟 */
        MahJongLobbyFacadeConsts.UnionCreateClub = "UnionCreateClub";
        /* 加入联盟 */
        MahJongLobbyFacadeConsts.UnionJoinRequestClub = "UnionJoinRequestClub";
        /* 编辑联盟 */
        MahJongLobbyFacadeConsts.UnionEditClub = "UnionEditClub";
        /* 更新联盟 */
        MahJongLobbyFacadeConsts.UnionUpdateClud = "UnionUpdateClud";
        /* 更新联盟申请人 */
        MahJongLobbyFacadeConsts.UnionApplicantUpdateClub = "UnionApplicantUpdateClub";
        /* 更新联盟申请人 */
        MahJongLobbyFacadeConsts.UnionMemberUpdateClub = "UnionMemberUpdateClub";
        /* 联盟基金修改 */
        MahJongLobbyFacadeConsts.UnionFundInfoUpdate = "UnionFundInfoUpdate";
        /* 联盟基金修改查询 */
        MahJongLobbyFacadeConsts.UnionFundDistributeQueryClub = "UnionFundDistributeQueryClub";
        /* 代理房间数据查询 */
        MahJongLobbyFacadeConsts.AgentStatisticsRoomQueryClub = "AgentStatisticsRoomQueryClub";
        /* 联盟总数局查询 */
        MahJongLobbyFacadeConsts.UnionStatisticsSumQueryClub = "UnionStatisticsSumQueryClub";
        /* 联盟房间数据查询 */
        MahJongLobbyFacadeConsts.UnionStatisticsRoomQueryClub = "UnionStatisticsRoomQueryClub";
        // 查询俱乐部成员牌局总数据
        MahJongLobbyFacadeConsts.MemberGameDataSumClub = "MemberGameDataSumClub";
        // 查询代理信用记录
        MahJongLobbyFacadeConsts.AgentCreditChangeQueryClub = "AgentCreditChangeQueryClub";
        // 代理的单个房间详情查看
        MahJongLobbyFacadeConsts.AgentStatisticsRoomCheckClub = "AgentStatisticsRoomCheckClub";
        // 查询代理可设置的上级
        MahJongLobbyFacadeConsts.AgentAvailableUplineQueryClub = "AgentAvailableUplineQueryClub";
        return MahJongLobbyFacadeConsts;
    })();
    MJLobby.MahJongLobbyFacadeConsts = MahJongLobbyFacadeConsts;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 全局控制
     */
    var GlobalControl = (function () {
        function GlobalControl() {
            this.init();
        }
        GlobalControl.getInstance = function () {
            if (!GlobalControl._instance) {
                GlobalControl._instance = new GlobalControl();
            }
            return GlobalControl._instance;
        };
        GlobalControl.prototype.init = function () {
            uniLib.Global.addEventListener(uniLib.ZqEvent.NATIVE_TO_EGERET, this.onExiteGame, this); //返回键统一处理
        };
        GlobalControl.prototype.onExiteGame = function (e) {
            var _this = this;
            if (e === void 0) { e = null; }
            var data = e.param;
            if (data.cmd == uniLib.ZQGameSdk.EXITGAME) {
                if (MJLobby.MJLobbyData.getInstance().isHaoCai()) {
                    return;
                }
                if (!this._hasExit) {
                    this._hasExit = true;
                    var msgBox = new MJLobby.LobbyMsgBox(false);
                    msgBox.setData("", "是否退出游戏?", ["确定", "取消"], [this.onSureBox, this.onCancel], this);
                    msgBox.x = Math.round((MJLobby.LobbyDataCache.defaultWidth - msgBox.width) / 2);
                    msgBox.y = Math.round((MJLobby.LobbyDataCache.defaultHeight - msgBox.height) / 2);
                    msgBox.addEventListener(MJLobby.LobbyUIEventConsts.CLOSE, this.close, this);
                    msgBox.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () { _this._hasExit = false; }, this);
                    uniLib.PopUpMgr.addPopUp(msgBox, null, true, true);
                }
            }
            if (data.cmd == uniLib.ZQGameSdk.HOT_UPDATE) {
                uniLib.ZQGameSdk.restart("有新版本需要更新,是否立即更新?", "确定", "取消");
            }
        };
        GlobalControl.prototype.onRestart = function (evt) {
            uniLib.Utils.restart("更新完成,点击确定重启", "确定");
        };
        GlobalControl.prototype.closePanel = function (evt) {
            uniLib.PopUpMgr.removePopUp(evt.currentTarget);
        };
        GlobalControl.prototype.close = function (evt) {
            this._hasExit = false;
            uniLib.PopUpMgr.removePopUp(evt.currentTarget);
        };
        GlobalControl.prototype.onSureBox = function () {
            uniLib.ZQGameSdk.exit();
        };
        GlobalControl.prototype.onCancel = function () {
            this._hasExit = false;
        };
        return GlobalControl;
    })();
    MJLobby.GlobalControl = GlobalControl;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var CostsTypeConst = (function () {
        function CostsTypeConst() {
        }
        CostsTypeConst.CARD = 2;
        CostsTypeConst.DIAMOND = 4;
        return CostsTypeConst;
    })();
    MJLobby.CostsTypeConst = CostsTypeConst;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var LobbyIdConsts = (function () {
        function LobbyIdConsts() {
        }
        LobbyIdConsts.HUNAN_MAHJONG = 1;
        LobbyIdConsts.GUANGDONG_LONGYAN = 2; //老友广东，好彩、开心搓麻将
        LobbyIdConsts.HUIBEI_MAHJONG = 3;
        LobbyIdConsts.GUIZHOU_MAHJONG = 4;
        LobbyIdConsts.FUJIAN_MAHJONG = 5;
        LobbyIdConsts.LAOYOU_MAHJONG = 6;
        LobbyIdConsts.JIANGXI_KEJIA = 7;
        LobbyIdConsts.GUANGDONG_HONGZHONG = 8;
        LobbyIdConsts.FUJIAN_LONGYAN = 9;
        LobbyIdConsts.JINHUA_MAHJONG = 10;
        LobbyIdConsts.NINGBO_KEJIA = 11;
        LobbyIdConsts.ZHANGDOU = 14;
        return LobbyIdConsts;
    })();
    MJLobby.LobbyIdConsts = LobbyIdConsts;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var LobbyUIEventConsts = (function () {
        function LobbyUIEventConsts() {
        }
        LobbyUIEventConsts.GO_TO_DEMO = "GO_TO_DEMO";
        LobbyUIEventConsts.SHOW_CREATE_PANEL = "SHOW_CREATE_PANEL";
        LobbyUIEventConsts.SHOW_JOIN_PANEL = "SHOW_JOIN_PANEL";
        LobbyUIEventConsts.SHOW_TGY = "SHOW_TGY";
        LobbyUIEventConsts.CLOSE = "CLOSE";
        LobbyUIEventConsts.CLOSE_RECORD = "CLOSE_RECORD";
        LobbyUIEventConsts.CREATE_ROOM = "CREATE_ROOM";
        LobbyUIEventConsts.SettingMatch = "SettingMatch";
        LobbyUIEventConsts.JOIN_ROOM = "JOIN_ROOM";
        LobbyUIEventConsts.ACTIVE_LIST_ROOM = "ACTIVE_LIST_ROOM"; //当前活跃房间列表
        LobbyUIEventConsts.CLICK = "CLICK";
        LobbyUIEventConsts.BACK_ROOM = "BACK_ROOM";
        LobbyUIEventConsts.SET_TGY = "SET_TGY";
        LobbyUIEventConsts.SHOW_RECORD = "SHOW_RECORD"; //显示战绩
        LobbyUIEventConsts.SHOW_HELP = "SHOW_HELP"; //显示玩法
        LobbyUIEventConsts.SHOW_SHARE = "SHOW_SHARE"; //显示分享
        LobbyUIEventConsts.SHOW_SETTING = "SHOW_SETTING"; //显示设置
        LobbyUIEventConsts.SHOW_NOTICE = "SHOW_NOTICE"; //显示系统公告
        LobbyUIEventConsts.SHOW_MARKET = "SHOW_MARKET"; //显示商城
        LobbyUIEventConsts.SHOW_VIP = "SHOW_VIP"; //显示VIP
        LobbyUIEventConsts.SHOW_REDPACKET = "SHOW_REDPACKET"; //显示红包
        LobbyUIEventConsts.SHOW_USERINFO = "SHOW_USERINFO"; //显示玩家信息
        LobbyUIEventConsts.LOGIN_OUT = "LOGIN_OUT"; //退出登录
        LobbyUIEventConsts.GET_HISTORY_DATA = "GET_HISTORY_DATA"; //获取战绩数据；
        LobbyUIEventConsts.GET_HISTORY_DETAIL_DATA = "GET_HISTORY_DETAIL_DATA"; //获取战绩详细数据；
        LobbyUIEventConsts.CHANGE = "CHANGE"; //变化；
        LobbyUIEventConsts.SHARE_SUCCESS = "SHARE_SUCCESS"; //分享成功；
        /**砖石转化房卡 */
        LobbyUIEventConsts.SHOW_DTK = "SHOW_DTK";
        /**钻石转化为房卡操作 */
        LobbyUIEventConsts.ACTION_DTK = "ACTION_DTK";
        LobbyUIEventConsts.RESET_CHECKBOX = "RESET_CHECKBOX";
        /**商店按钮点击 */
        LobbyUIEventConsts.SHOP_BTN_CLICK = "SHOP_BTN_CLICK";
        /**首冲 */
        LobbyUIEventConsts.FIRST_RECHARGE_CLICK = "FIRST_RECHARGE_CLICK";
        LobbyUIEventConsts.GET_CHECKIN_AWARDS = "GET_CHECKIN_AWARDS"; //获取签到奖励
        LobbyUIEventConsts.GET_INVITE = "GET_INVITE"; //获取邀请数据
        LobbyUIEventConsts.GET_INVITE_AWARDS = "GET_INVITE_AWARDS"; //获取推荐奖励
        LobbyUIEventConsts.GET_RANK_DATA = "GET_RANK_DATA"; //获取排行榜数据
        /**加入练习场 */
        LobbyUIEventConsts.JOIN_PRACTICEROOM = "join_practiceroom";
        LobbyUIEventConsts.SEND_HORN = "SEND_HORN";
        LobbyUIEventConsts.SHOW_HORN = "SHOW_HORN";
        /**发红包 */
        LobbyUIEventConsts.SEND_REDPACKET = "send_redpacket";
        /**拆红包 */
        LobbyUIEventConsts.CHAI_REDPACKET = "chai_redpacket";
        /**请求红包记录 */
        LobbyUIEventConsts.GET_REDPACKET_RECORD = "get_redpacket_record";
        /**请求查看录像 */
        LobbyUIEventConsts.REQ_LOOK_VIDEO = "req_look_video";
        /**打牌查看录像面板 */
        LobbyUIEventConsts.OPEN_LOOK_RECORDPANEL = "open_look_recordpanel";
        /**查看录像发送Id */
        LobbyUIEventConsts.LOOK_RECORD_ID = "look_record_id";
        /**请求代理 */
        LobbyUIEventConsts.REQ_DLS = "REQ_DLS";
        /**点击排行按钮 */
        LobbyUIEventConsts.CLICK_RANKBTN = "CLICK_RANKBTN";
        /**点击排行领取按钮 */
        LobbyUIEventConsts.GET_RANK_AWARD = "GET_RANK_AWARD";
        /**今日排行榜点击*/
        LobbyUIEventConsts.CLICK_TODAY_RANK = "CLICK_TODAY_RANK";
        /**昨日排行榜点击 */
        LobbyUIEventConsts.CLICK_YESTORDAY_RANK = "CLICK_YESTORDAY_RANK";
        /**红包开奖按钮点击 */
        LobbyUIEventConsts.REDPACKET_BTN_CLICK = "REDPACKET_BTN_CLICK";
        /**检测红包开启事件 */
        LobbyUIEventConsts.CHECKREDPACKET_OPEN = "CHECKREDPACKET_OPEN";
        /**开红包按钮点击事件 */
        LobbyUIEventConsts.OPEN_REDPACKET = "OPEN_REDPACKET";
        /**请求提现详情 */
        LobbyUIEventConsts.REDPACKET_DepositDetailPanel = "REDPACKET_DepositDetailPanel";
        /**前往比赛场 */
        LobbyUIEventConsts.GO_TO_MATCH = "GO_TO_MATCH";
        /**比赛场选场点击 */
        LobbyUIEventConsts.CHOOSE_MATCH_CLICK = "CHOOSE_MATCH_CLICK";
        /**比赛场报名 */
        LobbyUIEventConsts.ENROLL_MATCH = "ENROLL_MATCH";
        /**比赛场获取时间 */
        LobbyUIEventConsts.GET_MATCH_TIME = "GET_MATCH_TIME";
        /**比赛场获取排行榜 */
        LobbyUIEventConsts.GET_MATCH_COUNT = "GET_MATCH_COUNT";
        /**金币场选择游戏进入选场界面 */
        LobbyUIEventConsts.COIN_SELECT_GAMEID = "COIN_SELECT_GAMEID";
        /**显示活动按钮 */
        LobbyUIEventConsts.SHOW_ACTION_BTN = "SHOW_ACTION_BTN";
        /**金币场获取签到信息 */
        LobbyUIEventConsts.COIN_GETSIGN_DATA = "COIN_GETSIGN_DATA";
        /**金币场签到按钮点击 */
        LobbyUIEventConsts.COIN_SIGN_CLICK = "COIN_SIGN_CLICK";
        /**金币场领取签到奖励 */
        LobbyUIEventConsts.COIN_GETSIGN_AWARD = "COIN_GETSIGN_AWARD";
        /**金币场激活vip */
        LobbyUIEventConsts.COIN_ACTYVATE_VIP = "COIN_ACTYVATE_VIP";
        /**金币场每日活动点击 */
        LobbyUIEventConsts.COIN_FREEGOLD_CLICK = "COIN_FREEGOLD_CLICK";
        /**金币场请求 */
        LobbyUIEventConsts.COIN_FREEGOLD_REQ = "COIN_FREEGOLD_REQ";
        /**金币场获取vip奖励 */
        LobbyUIEventConsts.COIN_GETVIP_AWARD = "COIN_GETVIP_AWARD";
        /**金币场获取排行榜信息 */
        LobbyUIEventConsts.COIN_GETRANK_LIST = "COIN_GETRANK_LIST";
        /**金币场修改个人签名 */
        LobbyUIEventConsts.CHANGE_USER_SIGN = "CHANGE_USER_SIGN";
        /**丹东大厅邀请码 */
        LobbyUIEventConsts.DANDONG_INVITE = "DANDONG_INVITE";
        /**实名认证 */
        LobbyUIEventConsts.CERTIFICATION_CLICK = "CERTIFICATION_CLICK";
        /**实名认证发给服务器 */
        LobbyUIEventConsts.SEND_CERTIFICATION = "SEND_CERTIFICATION";
        /**玩法全部互斥事件 用来更新面创建房间面板 */
        LobbyUIEventConsts.EXCLUDE_ALLPLAYTYPE = "EXCLUDE_ALLPLAYTYPE";
        /**打开俱乐部 */
        LobbyUIEventConsts.SHOW_CLUB_PANEL = "SHOW_CLUB_PANEL";
        /////////////////好彩真人//////////////////
        /**商店 */
        LobbyUIEventConsts.HC_SHOW_SHOP = "HC_SHOW_SHOP";
        /**通知按钮 */
        LobbyUIEventConsts.HC_SHOW_NOTICE = "HC_SHOW_NOTICE";
        /**救济金 */
        LobbyUIEventConsts.HC_SHOW_ALMS = "HC_SHOW_ALMS";
        /**活动 */
        LobbyUIEventConsts.HC_SHOW_ACTIVITY = "HC_SHOW_ACTIVITY";
        /**任务 */
        LobbyUIEventConsts.HC_SHOW_TASK = "HC_SHOW_TASK";
        /**首充 */
        LobbyUIEventConsts.HC_SHOW_FIRSTRECHARGE = "HC_SHOW_FIRSTRECHARGE";
        /**限时活动 */
        LobbyUIEventConsts.HC_SHOW_LIMIT = "HC_SHOW_LIMIT";
        /**设置 */
        LobbyUIEventConsts.HC_SHOW_SETTING = "HC_SHOW_SETTING";
        /**快速游戏 */
        LobbyUIEventConsts.HC_FASETSTART = "HC_FASETSTART";
        /**兑换限时活动 */
        LobbyUIEventConsts.HC_ExchangeLimitActivity = "HC_ExchangeLimitActivity";
        /**展示幸运翻翻翻面板 */
        LobbyUIEventConsts.HC_SHOW_LUCK = "HC_SHOW_LUCK";
        /**翻卡 */
        LobbyUIEventConsts.HC_TRUN_CARD = "HC_TRUN_CARD";
        /**快速开始 */
        LobbyUIEventConsts.HC_QUICK_START = "HC_QUICK_START";
        LobbyUIEventConsts.HC_openLuckLotteryRolePanel = "HC_openLuckLotteryRolePanel";
        /**礼包兑换 */
        LobbyUIEventConsts.HC_GIFT_EXCHANGE = "HC_GIFT_EXCHANGE";
        /**领取首充礼包 */
        LobbyUIEventConsts.HC_GET_FIRSTRECHARGE_REWARD = "HC_GET_FIRSTRECHARGE_REWARD";
        /**礼包码兑换 */
        LobbyUIEventConsts.HC_GIFT_CODE = "HC_GIFT_CODE";
        /**判断是否可以加入游戏 */
        LobbyUIEventConsts.HC_JudgeEnterGameLobby = "HC_JudgeEnterGameLobby";
        /**返回之前的游戏房间 */
        LobbyUIEventConsts.HC_ReturnHaoCaiGameLobby = "HC_ReturnHaoCaiGameLobby";
        /**打开wifi加载按钮 */
        LobbyUIEventConsts.HC_OpenIsWifiLoadingPanel = "HC_OpenIsWifiLoadingPanel";
        /**继续加载游戏 */
        LobbyUIEventConsts.HC_ContinueGameIsWifiLoadingPanel = "HC_ContinueGameIsWifiLoadingPanel";
        /**红包活动 */
        LobbyUIEventConsts.HC_SHOW_REDPACKETPANEL = "HC_Show_redPacketPanel";
        /**抢红包 */
        LobbyUIEventConsts.HC_SHOW_GRABREDPACK = "HC_Show_grabReadPack";
        /**红包累计奖励*/
        LobbyUIEventConsts.HC_SHOW_REDPACKREWARD = "HC_Show_redPackReward";
        /**红包奖励明细*/
        LobbyUIEventConsts.HC_SHOW_REDPACKDETAIL = "HC_Show_redPackDetail";
        /**获取验证码*/
        LobbyUIEventConsts.HC_SHOW_GETCODE = "HC_Show_getCode";
        /**绑定手机*/
        LobbyUIEventConsts.HC_SHOW_BINDINGPHONE = "HC_Show_bindingPhone";
        /////////////////////////////////////////
        /**头像点击事件 回调 */
        LobbyUIEventConsts.HEAD_CLICK_CALLBACK = "HEAD_CLICK_CALLBACK";
        /**进入俱乐部 */
        LobbyUIEventConsts.SHOW_CLUB = "SHOW_CLUB";
        /**房间管理 */
        LobbyUIEventConsts.ROOM_MANAGE = "ROOM_MANAGE";
        /**邀请人排行榜 */
        LobbyUIEventConsts.INVITE_RANK_CLICK = "INVITE_RANK_CLICK";
        /**福建代理商邀请按钮点击 */
        LobbyUIEventConsts.LYFJ_INVITE_CLICK = "LYFJ_INVITE_CLICK";
        /**保险箱按钮 */
        LobbyUIEventConsts.SAFE_BTN_CLICK = "SAFE_BTN_CLICK";
        /**保险箱存取 */
        LobbyUIEventConsts.SAFE_POPPUSH_CLICK = "SAFE_POPPUSH_CLICK";
        /**前往赛事场(西安用) */
        LobbyUIEventConsts.SHOW_TO_BATTLE = "SHOW_TO_BATTLE";
        /**赛事场选场点击(西安用) */
        LobbyUIEventConsts.CHOOSE_BATTLE_CLICK = "CHOOSE_BATTLE_CLICK";
        /**赛事场报名(西安用) */
        LobbyUIEventConsts.ENROLL_BATTLE = "ENROLL_BATTLE";
        /**赛事场数据更新(西安用) */
        LobbyUIEventConsts.BATTLE_DATA_UPDATA = "BATTLE_DATA_UPDATA";
        /**显示俱乐部桌子 */
        LobbyUIEventConsts.SHOW_CLUB_DESK = "SHOW_CLUB_DESK";
        /**选择俱乐部 */
        LobbyUIEventConsts.SWITCH_CLUB = "SWITCH_CLUB";
        /**显示时时彩 */
        LobbyUIEventConsts.LOBBY_SHOW_LOTTERY = "LOBBY_SHOW_LOTTERY";
        /**通用的UI事件 */
        LobbyUIEventConsts.UIEVENT_COMMON = "UIEVENT_COMMON";
        /**招商UI时间 */
        LobbyUIEventConsts.SHOW_AGENT = "SHOW_AGENT";
        /**俱乐部玩家信息 */
        LobbyUIEventConsts.CLUB_USERINFO = "CLUB_USERINFO";
        /**俱乐部信息 */
        LobbyUIEventConsts.CLUB_NOTICE = "CLUB_NOTICE";
        return LobbyUIEventConsts;
    })();
    MJLobby.LobbyUIEventConsts = LobbyUIEventConsts;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var PlayTypeConsts = (function () {
        function PlayTypeConsts() {
        }
        PlayTypeConsts.MUlT_CHECK = 1;
        PlayTypeConsts.RADIO = 2;
        PlayTypeConsts.RADIO_NO_DEFAULT = 3;
        return PlayTypeConsts;
    })();
    MJLobby.PlayTypeConsts = PlayTypeConsts;
})(MJLobby || (MJLobby = {}));

var VideoConsts = (function () {
    function VideoConsts() {
    }
    /**麻将 */
    VideoConsts.MAHJONG = "game_load_start";
    /**十三水 */
    VideoConsts.SSH = "ssh_load_start";
    /**老跑得快 */
    VideoConsts.OLD_PDK = "pdk_load_start";
    /**斗地主 */
    VideoConsts.DDZ = "ddz_load_start";
    /**牛牛 */
    VideoConsts.NIUNIU = "niuniu_load_start";
    /**新跑得快 */
    VideoConsts.NEW_PDK = "pdk_new_load_start";
    return VideoConsts;
})();

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 数据请求操作
     */
    var LobbyDataRequestCommand = (function (_super) {
        __extends(LobbyDataRequestCommand, _super);
        function LobbyDataRequestCommand() {
            _super.call(this);
        }
        LobbyDataRequestCommand.prototype.init = function () {
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(LobbyDataRequestCommand.GAME_DATA, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(LobbyDataRequestCommand.CONNECT_GAME_SERVER, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(LobbyDataRequestCommand.LOGIN_OUT, this.onEventHandle, this);
        };
        LobbyDataRequestCommand.prototype.onEventHandle = function (evt) {
            var socketProxy = MJLobby.LobbyServerMJProxy.getInstance();
            switch (evt.type) {
                case LobbyDataRequestCommand.GAME_DATA:
                    socketProxy.sendData(evt.data);
                    break;
                case LobbyDataRequestCommand.CONNECT_GAME_SERVER:
                    socketProxy.initServer();
                    break;
                case LobbyDataRequestCommand.LOGIN_OUT:
                    socketProxy.loginOut();
                    MJLobby.MJLobbyData.getInstance().hasShowGame = false;
                    break;
            }
        };
        LobbyDataRequestCommand.prototype.onRemove = function () {
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(LobbyDataRequestCommand.GAME_DATA, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(LobbyDataRequestCommand.CONNECT_GAME_SERVER, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(LobbyDataRequestCommand.LOGIN_OUT, this.onEventHandle, this);
        };
        LobbyDataRequestCommand.GAME_DATA = "game_data";
        LobbyDataRequestCommand.CONNECT_GAME_SERVER = "connect_game_server"; //连接大厅聊天服务器
        LobbyDataRequestCommand.LOGIN_OUT = "loginOut"; //退出登录
        return LobbyDataRequestCommand;
    })(MJLobby.Command);
    MJLobby.LobbyDataRequestCommand = LobbyDataRequestCommand;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 移除命令
     */
    var LobbyRemoveCommand = (function (_super) {
        __extends(LobbyRemoveCommand, _super);
        function LobbyRemoveCommand() {
            _super.call(this);
        }
        LobbyRemoveCommand.prototype.init = function () {
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(MJLobby.MahJongLobbyFacadeConsts.DESTORY, this.onEventHandle, this);
        };
        LobbyRemoveCommand.prototype.onEventHandle = function (evt) {
            this.removeController();
            this.removeMediator();
            this.removeProxy();
            MJLobby.MJLobbyInfo.destory();
            ;
        };
        LobbyRemoveCommand.prototype.removeController = function () {
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.SEND_DATA,LobbyDataRequestCommand);
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.DESTORY,LobbyRemoveCommand);
            MJLobby.MahJongLobbyFacade.getLobbyInstance().removeCommand(MJLobby.MahJongLobbyFacadeConsts.SEND_DATA);
            MJLobby.MahJongLobbyFacade.getLobbyInstance().removeCommand(MJLobby.MahJongLobbyFacadeConsts.DESTORY);
        };
        LobbyRemoveCommand.prototype.removeMediator = function () {
            if (MJLobby.ViewConfig.mainMediator) {
                var mainMediator = uniLib.getDefinitionByName(MJLobby.ViewConfig.mainMediatorName);
                MJLobby.MahJongLobbyFacade.getLobbyInstance().removeMediator(mainMediator.NAME);
                MJLobby.ViewConfig.mainMediator = null;
            }
        };
        LobbyRemoveCommand.prototype.removeProxy = function () {
            MJLobby.MahJongLobbyFacade.getLobbyInstance().removeProxy(MJLobby.LobbyServerMJProxy.NAME);
        };
        LobbyRemoveCommand.prototype.onRemove = function () {
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(MJLobby.MahJongLobbyFacadeConsts.DESTORY, this.onEventHandle, this);
        };
        return LobbyRemoveCommand;
    })(MJLobby.Command);
    MJLobby.LobbyRemoveCommand = LobbyRemoveCommand;
})(MJLobby || (MJLobby = {}));

var Cmd;
(function (Cmd) {
    function dispatch(cmd, obj, type) {
        var facade = MJLobby.MahJongLobbyFacade.getLobbyInstance();
        facade.sendNotification(cmd, obj, type);
    }
    Cmd.dispatch = dispatch;
    function trace(rev, str) {
        if (str === void 0) { str = ""; }
        uniLib.Console.log(str + " " /*+rev.GetType()*/, JSON.stringify(rev));
    }
    Cmd.trace = trace;
    /*
     * login
     */
    function OnUserInfoSynLobbyCmd_S(rev) {
        trace(rev, "UserInfoSynLobbyCmd_S");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            if (!uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl) {
                uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl = "";
            }
            uniLib.UIMgr.instance.hideLoading();
            uniLib.UserInfo.init(rev.userInfo);
            MJLobby.MJLobbyData.getInstance().recInRoomData = 0;
            MJLobby.MJLobbyData.getInstance().isAgent = rev.isAgent == 1 ? true : false;
            MJLobby.MJLobbyData.getInstance().agentType = rev.isAgent;
            MJLobby.MJLobbyData.getInstance().isCreate = rev.isCreate;
            MJLobby.MJLobbyData.getInstance().myDefaultHeadUrl = rev.userInfo.headUrl;
            MJLobby.MJLobbyData.getInstance().myBaseInfo = rev.userInfo;
            MJLobby.MJLobbyData.getInstance().isDLS = rev.canMarket;
            MJLobby.MJLobbyInfo.userId = rev.userInfo.uid;
            MJLobby.MJLobbyData.getInstance().disclaimer = rev.disclaimer;
            MJLobby.MJLobbyData.getInstance().noticeFee = rev.noticeFee;
            MJLobby.MJLobbyData.getInstance().recharge = rev.recharge;
            MJLobby.MJLobbyData.getInstance().allJackPotNum = rev.allJackPotNum;
            if (rev.showRank) {
                MJLobby.MJLobbyData.getInstance().showRank = rev.showRank;
            }
            if (rev.openReward) {
                MJLobby.MJLobbyData.getInstance().showRedpacket = rev.openReward;
            }
            if (rev.rankType) {
                MJLobby.MJLobbyData.getInstance().rankType = rev.rankType;
            }
            if (rev.defaultMsg && rev.defaultMsg != "") {
                MJLobby.MJLobbyData.getInstance().defaultSysMsg = rev.defaultMsg;
            }
            if (rev.showReward) {
                MJLobby.MJLobbyData.getInstance().autoShowRedpacket = rev.showReward;
            }
            if (rev.vipReward) {
                MJLobby.MJLobbyData.getInstance().vipReward = rev.vipReward;
            }
            if (rev.firstRecharge) {
                MJLobby.MJLobbyData.getInstance().firstRecharge = rev.firstRecharge;
            }
            if (rev.ausDog) {
                MJLobby.MJLobbyData.getInstance().ausDog = rev.ausDog;
            }
            uniLib.UserInfo.chips = rev.userInfo.diamond;
            if (MJLobby.MJLobbyData.getInstance().lobbyId == 7) {
                uniLib.UserInfo.fangka = rev.userInfo.card;
            }
            if (rev.userInfo.chips) {
                uniLib.UserInfo.goldChips = rev.userInfo.chips;
            }
            else {
                uniLib.UserInfo.goldChips = 0;
            }
            if (rev.userInfo.ticket) {
                MJLobby.MJLobbyMatchData.getInstance().ticket = rev.userInfo.ticket;
            }
            if (rev.userInfo.medal) {
                MJLobby.MJLobbyMatchData.getInstance().medal = rev.userInfo.medal;
            }
            MJLobby.MJLobbyData.getInstance().userInfoSynLobby = rev;
            if (rev.authen) {
                MJLobby.MJLobbyData.getInstance().authen = rev.authen;
            }
            else {
                MJLobby.MJLobbyData.getInstance().authen = 0;
            }
            if (rev.lastRoomId) {
                MJLobby.MJLobbyData.getInstance().lastMatchId = rev.lastRoomId;
            }
            if (rev.noHandle) {
                MJLobby.MJLobbyData.getInstance().noHandle = rev.noHandle;
            }
            var checkInVo = new MJLobby.CheckInVo();
            checkInVo.openSingIn = rev.openSignIn;
            checkInVo.days = rev.days;
            checkInVo.canGet = rev.canGet;
            MJLobby.MJLobbyData.getInstance().checkInVo = checkInVo;
            if (rev.shareTimes) {
                MJLobby.LobbyDataCache.shareNLast = rev.shareTimes;
            }
            if (MJLobby.MJLobbyData.getInstance().lobbyId == 24) {
                dispatch(MJLobby.MahJongLobbyFacadeConsts.SHOW_LOBBY);
                if (rev.userRoomInfos) {
                    var joinVo = new MJLobby.JoinRoomVo();
                    joinVo.gameId = rev.userRoomInfos.gameId;
                    joinVo.zoneId = rev.userRoomInfos.zoneId;
                    joinVo.roomId = rev.userRoomInfos.roomId;
                    joinVo.globalRoomId = rev.userRoomInfos.globalRoomId;
                    joinVo.shareInfo = rev.userRoomInfos.shareInfo;
                    if (rev.userRoomInfos.scene != undefined)
                        joinVo.scene = rev.userRoomInfos.scene;
                    if (rev.userRoomInfos.baseUserNbr != undefined)
                        joinVo.baseUserNbr = rev.userRoomInfos.baseUserNbr;
                    dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
                    MJLobby.MJLobbyData.getInstance().showNotice = true;
                }
            }
            else {
                if (rev.userRoomInfos) {
                    var joinVo = new MJLobby.JoinRoomVo();
                    joinVo.gameId = rev.userRoomInfos.gameId;
                    joinVo.zoneId = rev.userRoomInfos.zoneId;
                    joinVo.roomId = rev.userRoomInfos.roomId;
                    joinVo.globalRoomId = rev.userRoomInfos.globalRoomId;
                    joinVo.shareInfo = rev.userRoomInfos.shareInfo;
                    if (rev.userRoomInfos.scene != undefined)
                        joinVo.scene = rev.userRoomInfos.scene;
                    if (rev.userRoomInfos.baseUserNbr != undefined)
                        joinVo.baseUserNbr = rev.userRoomInfos.baseUserNbr;
                    dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
                    MJLobby.MJLobbyData.getInstance().showNotice = true;
                }
                else {
                    dispatch(MJLobby.MahJongLobbyFacadeConsts.SHOW_LOBBY);
                }
            }
            var data = {
                accountId: rev.userInfo.uid,
                accountType: 1,
                accountName: rev.userInfo.nickName
            };
            uniLib.ZQGameSdk.update(data);
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_LOGIN_SUCCESS);
            MJLobby.MJLobbyData.getInstance().getIP();
            MJLobby.MJLobbyData.getInstance().weiJULoginHandle(); //闲聊响应
        }
    }
    Cmd.OnUserInfoSynLobbyCmd_S = OnUserInfoSynLobbyCmd_S;
    function OnCreateConfigListLobbyCmd_S(rev) {
        if (!MJLobby.MJLobbyData.getInstance().isShenHe) {
            var config = JSON.parse(rev.list);
            if (config.lobbyGameList) {
                MJLobby.MJLobbyData.getInstance().lobbyConfig = config.lobbyGameList;
                //重设分享参数
                if (!uniLib.ZQGameSdk.defaultWXShareVo) {
                    uniLib.ZQGameSdk.defaultWXShareVo = new uniLib.WXShareVo();
                }
                var vo = uniLib.ZQGameSdk.defaultWXShareVo;
                vo.title = config.lobbyGameList.shareTitle;
                vo.description = config.lobbyGameList.shareContent;
                uniLib.ZQGameSdk.defaultWXShareVo = vo;
            }
            if (config.createRoomConfigs) {
                MJLobby.MJLobbyData.getInstance().gameCreateConfig = config.createRoomConfigs;
            }
        }
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CONFIG_LOADED);
    }
    Cmd.OnCreateConfigListLobbyCmd_S = OnCreateConfigListLobbyCmd_S;
    function OnCanCreateRoomCmd_Brd(rev) {
        MJLobby.MJLobbyData.getInstance().isCreate = false;
        uniLib.UserInfo.chips = rev.diamond;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ROOM_DESTORY, rev);
    }
    Cmd.OnCanCreateRoomCmd_Brd = OnCanCreateRoomCmd_Brd;
    function OnCreateRoomCmd_S(rev) {
        if (MJLobby.MJLobbyData.getInstance().recInRoomData == 2)
            return;
        if (!rev.resultCode) {
            var joinVo = new MJLobby.JoinRoomVo();
            joinVo.gameId = rev.gameId;
            joinVo.globalRoomId = rev.globalRoomId;
            joinVo.zoneId = rev.zoneId;
            joinVo.roomId = rev.roomId;
            joinVo.shareInfo = rev.shareInfo;
            if (rev.scene != undefined)
                joinVo.scene = rev.scene;
            if (rev.baseUserNbr != undefined)
                joinVo.baseUserNbr = rev.baseUserNbr;
            MJLobby.MJLobbyData.getInstance().isCreate = true;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.CREATE_ROOM_SUCCESS, rev);
            if (!rev.notIntoGame) {
                dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
                MJLobby.MJLobbyData.getInstance().recInRoomData = 1;
            }
            if (rev.url) {
                MJLobby.MJLobbyData.getInstance().gameGatewayUrl = rev.url;
            }
        }
    }
    Cmd.OnCreateRoomCmd_S = OnCreateRoomCmd_S;
    function OnReturnRoomCmd_S(rev) {
        trace(rev, "ReturnRoomCmd_S");
        if (!rev.resultCode) {
            var joinVo = new MJLobby.JoinRoomVo();
            joinVo.gameId = rev.gameId;
            joinVo.globalRoomId = rev.globalRoomId;
            joinVo.zoneId = rev.zoneId;
            joinVo.roomId = rev.roomId;
            joinVo.shareInfo = rev.shareInfo;
            if (rev.scene != undefined)
                joinVo.scene = rev.scene;
            if (rev.baseUserNbr != undefined)
                joinVo.scene = rev.baseUserNbr;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
            if (rev.url) {
                MJLobby.MJLobbyData.getInstance().gameGatewayUrl = rev.url;
            }
        }
        else {
            if (rev.resultCode == 1) {
                MJLobby.MJLobbyData.getInstance().isCreate = true;
            }
            else if (rev.resultCode == 2) {
                MJLobby.MJLobbyData.getInstance().isCreate = false;
            }
        }
        MJLobby.MJLobbyData.getInstance().entryGame = true;
    }
    Cmd.OnReturnRoomCmd_S = OnReturnRoomCmd_S;
    /**
     * 服务器会同时下发EnterRoomCmd_S、CreateRoomCmd_S 客户端只处理第一个
     */
    // export let enterRoomTime: number = 0;
    function OnEnterRoomCmd_S(rev) {
        if (MJLobby.MJLobbyData.getInstance().recInRoomData == 1)
            return;
        if (!rev.resultCode) {
            var nowsec = Math.floor(Date.now() / 1000);
            if (!uniLib.Global.isInGame || nowsec - MJLobby.MJLobbyData.getInstance().lastEnterRoomTime > 3) {
                MJLobby.MJLobbyData.getInstance().lastEnterRoomTime = nowsec;
                var joinVo = new MJLobby.JoinRoomVo();
                joinVo.gameId = rev.gameId;
                joinVo.globalRoomId = rev.globalRoomId;
                joinVo.zoneId = rev.zoneId;
                joinVo.roomId = rev.roomId;
                joinVo.shareInfo = rev.shareInfo;
                if (rev.roomState && rev.roomState.matchId) {
                    joinVo.matchId = rev.roomState.matchId;
                    var config = MJLobby.MJLobbyData.getInstance().getGameOfficalEventConfigByMatchId(rev.roomState.matchId);
                    if (config != null && config.eventId != null)
                        MJLobby.MJLobbyData.getInstance().isInEventGame = true;
                    else
                        MJLobby.MJLobbyData.getInstance().isInEventGame = false;
                }
                else
                    MJLobby.MJLobbyData.getInstance().isInEventGame = false;
                if (rev.scene != undefined)
                    joinVo.scene = rev.scene;
                if (rev.baseUserNbr != undefined)
                    joinVo.baseUserNbr = rev.baseUserNbr;
                dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
                MJLobby.MJLobbyData.getInstance().recInRoomData = 2;
                if (rev.url) {
                    MJLobby.MJLobbyData.getInstance().gameGatewayUrl = rev.url;
                }
            }
        }
    }
    Cmd.OnEnterRoomCmd_S = OnEnterRoomCmd_S;
    /**
     *  请求进入茶馆返回 刷新最后进入的matchId,
     */
    function OnReturnRoomMatchGroupCmd_S(rev) {
        MJLobby.MJLobbyData.getInstance().lastMatchId = rev.matchId ? rev.matchId : null;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnRoomMatchGroup, rev);
    }
    Cmd.OnReturnRoomMatchGroupCmd_S = OnReturnRoomMatchGroupCmd_S;
    function OnRefreshMatchGroupCmd_Brd(rev) {
        Cmd.RefreshMatchGroup = rev;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.REFRESH_MATCHGROUP, rev);
    }
    Cmd.OnRefreshMatchGroupCmd_Brd = OnRefreshMatchGroupCmd_Brd;
    function OnEnterMatchGroupCmd_S(rev) {
        Cmd.EnterMatchGroup = rev;
        Cmd.EnterMatchGroupTime = Date.now();
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ENTER_MATCHGROUP, rev);
    }
    Cmd.OnEnterMatchGroupCmd_S = OnEnterMatchGroupCmd_S;
    /**刷新匹配组数据 */
    function OnEnterMatchGroupCmd_Brd(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UODATE_MATCHGROUP, rev);
    }
    Cmd.OnEnterMatchGroupCmd_Brd = OnEnterMatchGroupCmd_Brd;
    function OnLeaveMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP, rev);
    }
    Cmd.OnLeaveMatchGroupCmd_S = OnLeaveMatchGroupCmd_S;
    function OnLeaveMatchGroupCmd_Brd(rev) {
        if (rev && rev.uid == uniLib.NetMgr.UID) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP, null);
        }
        else {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP_OTHER, rev);
        }
    }
    Cmd.OnLeaveMatchGroupCmd_Brd = OnLeaveMatchGroupCmd_Brd;
    function OnCreateMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CREATE_MATCHGROUP, rev);
    }
    Cmd.OnCreateMatchGroupCmd_S = OnCreateMatchGroupCmd_S;
    function OnGetPracticeGameInfoRoomCmd_S(rev) {
        if (!rev.resultCode) {
            var joinVo = new MJLobby.JoinRoomVo();
            joinVo.gameId = rev.gameId;
            joinVo.globalRoomId = 0;
            joinVo.zoneId = rev.zoneId;
            joinVo.roomId = 0;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, joinVo);
        }
    }
    Cmd.OnGetPracticeGameInfoRoomCmd_S = OnGetPracticeGameInfoRoomCmd_S;
    function OnActiveDetailRoomCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ActiveDetailRoom, rev);
    }
    Cmd.OnActiveDetailRoomCmd_S = OnActiveDetailRoomCmd_S;
    function OnRemoveRoomCmd_Brd(rev) {
        trace(rev, "RemoveRoomCmd_Brd");
        MJLobby.MJLobbyData.getInstance().isCreate = false;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ROOM_DESTORY, rev);
    }
    Cmd.OnRemoveRoomCmd_Brd = OnRemoveRoomCmd_Brd;
    function OnGetGameDataHistoryCmd_S(rev) {
        trace(rev, "GetGameDataHistoryCmd_S");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HISTORY_DATA, rev);
    }
    Cmd.OnGetGameDataHistoryCmd_S = OnGetGameDataHistoryCmd_S;
    function OnGetGameDetailHistoryCmd_S(rev) {
        trace(rev, "GetGameDetailHistoryCmd_S");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HISTORY_DETAIL_DATA, rev);
    }
    Cmd.OnGetGameDetailHistoryCmd_S = OnGetGameDetailHistoryCmd_S;
    /**房间日志 */
    function OnGetRoomLogHistoryCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HISTORY_LOG, rev);
    }
    Cmd.OnGetRoomLogHistoryCmd_S = OnGetRoomLogHistoryCmd_S;
    function OnUserInfoGetLobbyCmd_S(rev) {
        trace(rev, "UserInfoGetLobbyCmd_S");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().recInRoomData = 0;
            if (rev.userInfo.uid == MJLobby.MJLobbyInfo.userId) {
                uniLib.UserInfo.chips = rev.userInfo.diamond;
                if (MJLobby.MJLobbyData.getInstance().lobbyId == 7) {
                    uniLib.UserInfo.fangka = rev.userInfo.card;
                }
                if (rev.userInfo.chips) {
                    uniLib.UserInfo.goldChips = rev.userInfo.chips;
                }
                else {
                    uniLib.UserInfo.goldChips = 0;
                }
                if (rev.userInfo.ticket) {
                    MJLobby.MJLobbyMatchData.getInstance().ticket = rev.userInfo.ticket;
                }
                if (rev.userInfo.medal) {
                    MJLobby.MJLobbyMatchData.getInstance().medal = rev.userInfo.medal;
                }
                if (rev.vipReward && Array.isArray(rev.vipReward)) {
                    MJLobby.MJLobbyData.getInstance().vipReward = rev.vipReward;
                }
                MJLobby.MJLobbyData.getInstance().myBaseInfo = rev.userInfo;
                MJLobby.MJLobbyData.getInstance().recharge = rev.recharge;
                if (rev.isCreate != undefined) {
                    MJLobby.MJLobbyData.getInstance().isCreate = rev.isCreate;
                    dispatch(MJLobby.MahJongLobbyFacadeConsts.ENTER_LOBBY, rev.userInfo);
                }
            }
            if (rev.bindRechargeRet) {
                MJLobby.MJLobbyData.getInstance().bindRechargeRet = rev.bindRechargeRet;
                MJLobby.LobbyEvents.Instance.dispatchEvent(new egret.Event(MJLobby.LobbyEvents.NOTIFY_RECHARGE_GIVE));
            }
            dispatch(MJLobby.MahJongLobbyFacadeConsts.USER_INFO_DATA, rev.userInfo);
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "diamondChange");
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LOBBY_RECONNECTION);
        }
        else {
            var req = new Cmd.UserInfoGetLobbyCmd_C();
            req.uid = MJLobby.MJLobbyInfo.userId;
            req.getIsCreate = true;
            req.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
            this.sendNotification(MJLobby.MahJongLobbyFacadeConsts.SEND_DATA, req, MJLobby.LobbyDataRequestCommand.GAME_DATA);
        }
        MJLobby.MJLobbyData.getInstance().getIP();
    }
    Cmd.OnUserInfoGetLobbyCmd_S = OnUserInfoGetLobbyCmd_S;
    function OnUserInfoModifyReturnLobyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().myBaseInfo = rev.userInfo;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.USER_INFO_DATA, MJLobby.MJLobbyData.getInstance().myBaseInfo);
        }
        MJLobby.LobbyPopupManager.showMildWarnShow("个人信息设置成功");
    }
    Cmd.OnUserInfoModifyReturnLobyCmd_S = OnUserInfoModifyReturnLobyCmd_S;
    function OnShareLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            uniLib.UserInfo.chips = rev.remainder;
            MJLobby.LobbyDataCache.shareNLast = rev.shareTimes ? rev.shareTimes : 0;
            MJLobby.LobbyPopupManager.showMildWarnShow("分享成功，已获得奖励");
        }
    }
    Cmd.OnShareLobbyCmd_S = OnShareLobbyCmd_S;
    function OnChangeParentCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.LobbyPopupManager.showMildWarnShow("填写推广员ID成功");
            MJLobby.MJLobbyData.getInstance().myBaseInfo.parent = MJLobby.MJLobbyData.getInstance().tgyId;
        }
        else {
            MJLobby.MJLobbyData.getInstance().tgyId = 0;
        }
    }
    Cmd.OnChangeParentCmd_S = OnChangeParentCmd_S;
    function OnGetNormalGameListRoomCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.gameIdList && rev.gameIdList[0]) {
            MJLobby.MJLobbyData.getInstance().openingGameList = rev.gameIdList;
        }
        if (rev.startTime) {
            MJLobby.MJLobbyData.getInstance().freeTimes = [];
            MJLobby.MJLobbyData.getInstance().freeTimes.push(rev.startTime);
        }
        if (rev.endTime) {
            MJLobby.MJLobbyData.getInstance().freeTimes.push(rev.endTime);
        }
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GAME_LIST_DATA, rev.lastCreate);
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GetNormalGameListRoomCmd_S, rev);
    }
    Cmd.OnGetNormalGameListRoomCmd_S = OnGetNormalGameListRoomCmd_S;
    function OnSysMessageMahjongLobbyCmd_S(rev) {
        if (MJLobby.MJLobbyData.getInstance().lobbyId == 27) {
            rev.desc = rev.desc.replace(/钻石/g, "元宝");
        }
        if (rev.openWindow == 1) {
            //安卓系统下打开重置窗口
            if (uniLib.Utils.isAndroid()) { }
        }
        var confirm = function () {
            if (rev.openWindow != null) {
                dispatch(MJLobby.MahJongLobbyFacadeConsts.OpenWindowHandle, rev.openWindow);
            }
        };
        if (rev.pos == 1) {
            MJLobby.LobbyPopupManager.showConfirmPanel(rev.desc, ["确定"], [confirm], "", null);
        }
        else {
            MJLobby.LobbyPopupManager.showMildWarnShow(rev.desc);
        }
    }
    Cmd.OnSysMessageMahjongLobbyCmd_S = OnSysMessageMahjongLobbyCmd_S;
    function OnGetInviteListCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.INVITE_DATA, rev);
    }
    Cmd.OnGetInviteListCmd_CS = OnGetInviteListCmd_CS;
    function OnGetInviteRewardCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            uniLib.UserInfo.chips = rev.diamond;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.INVITE_AWARDS_DATA, rev);
            MJLobby.LobbyPopupManager.showMildWarnShow("钻石领取成功！");
        }
    }
    Cmd.OnGetInviteRewardCmd_S = OnGetInviteRewardCmd_S;
    function OnGetRegisterRewardCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            var signArr = MJLobby.MJLobbyData.getInstance().getLobbyConfig().sign;
            if (signArr && signArr.length > 1) {
                MJLobby.LobbyPopupManager.showMildWarnShow("恭喜你签到成功，获得了" + signArr[1] + "钻石！");
            }
            else {
                MJLobby.LobbyPopupManager.showMildWarnShow("恭喜你签到成功");
            }
            if (MJLobby.MJLobbyData.getInstance().checkInVo) {
                MJLobby.MJLobbyData.getInstance().checkInVo.canGet = 0;
            }
            uniLib.UserInfo.chips = rev.diamond;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.CHECKIN_AWARDS_DATA);
        }
    }
    Cmd.OnGetRegisterRewardCmd_S = OnGetRegisterRewardCmd_S;
    function OnApplyContinuePlayRoomCmd_Brd(rev) {
        MJLobby.MJLobbyData.getInstance().continueObj = rev;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CONTINUE);
    }
    Cmd.OnApplyContinuePlayRoomCmd_Brd = OnApplyContinuePlayRoomCmd_Brd;
    function OnSendSuonaLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.LobbyPopupManager.showMildWarnShow("发送成功！");
        }
    }
    Cmd.OnSendSuonaLobbyCmd_S = OnSendSuonaLobbyCmd_S;
    /**
    * 封红包
    */
    function OnExchangeKeyGet_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.SEND_REDPACKET_BACK, rev);
        }
    }
    Cmd.OnExchangeKeyGet_CS = OnExchangeKeyGet_CS;
    /**拆红包 */
    function OnExchangeChipsReceive_CS(rev) {
        var chips = (rev && rev.exchangeInfo) ? rev.exchangeInfo.chips : null;
        if (!chips)
            return;
        if (rev.exchangeInfo.id == 2) {
            MJLobby.LobbyPopupManager.showMildWarnShow("领取成功红包" + chips + "房卡");
        }
        else if (rev.exchangeInfo.id == 1) {
            MJLobby.LobbyPopupManager.showMildWarnShow("领取成功红包" + chips + "钻石");
        }
        else {
            MJLobby.LobbyPopupManager.showMildWarnShow("领取成功红包" + chips + "金币");
        }
    }
    Cmd.OnExchangeChipsReceive_CS = OnExchangeChipsReceive_CS;
    /**
     * 红包记录
     */
    function OnExchangeRecordGet_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_REDPACKET_RECORD, rev);
        }
    }
    Cmd.OnExchangeRecordGet_CS = OnExchangeRecordGet_CS;
    /**钻石换房卡 */
    function OnExchangeCardByDiamondLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.LobbyPopupManager.showMildWarnShow("兑换成功");
        }
    }
    Cmd.OnExchangeCardByDiamondLobbyCmd_S = OnExchangeCardByDiamondLobbyCmd_S;
    /**录像功能 */
    function OnReturnRecordLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().videoData = rev.data;
            var joinVo = new MJLobby.JoinRoomVo();
            joinVo.gameId = rev.gameId;
            joinVo.globalRoomId = 0;
            joinVo.roomId = 0;
            var Json = JSON.parse(MJLobby.MJLobbyData.getInstance().videoData);
            MJLobby.MJLobbyData.getInstance().videoUID = Json.bankerUid;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_VIDEOROOM, joinVo);
        }
        else {
        }
    }
    Cmd.OnReturnRecordLobbyCmd_S = OnReturnRecordLobbyCmd_S;
    /**显示进入房间人数 */
    function OnGetRoomUserLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.CONFRIM_JOINROOM, rev);
        }
    }
    Cmd.OnGetRoomUserLobbyCmd_S = OnGetRoomUserLobbyCmd_S;
    /**排行榜数据 */
    function OnGetDayRankCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "DiamondRank");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            if (rev.day == 1) {
                MJLobby.MJLobbyData.getInstance().todayRecord = rev;
            }
            else {
                MJLobby.MJLobbyData.getInstance().yesterdayRecord = rev;
            }
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_RANK_RECORD);
        }
    }
    Cmd.OnGetDayRankCmd_S = OnGetDayRankCmd_S;
    /**获取奖励 */
    function OnGetDayRankRewardCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_RANK_AWARD, rev);
        }
    }
    Cmd.OnGetDayRankRewardCmd_S = OnGetDayRankRewardCmd_S;
    /**处罚提示 */
    function OnPunishUserCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.FENGHAO) {
            uniLib.ZQGameSdk.restart("号已被封，请联系客服", "确定");
        }
        else if (rev.resultCode == MJLobby.NetConsts.TIXIAXIAN) {
            uniLib.ZQGameSdk.restart("已被管理员踢下线", "确定");
        }
    }
    Cmd.OnPunishUserCmd_S = OnPunishUserCmd_S;
    /**查看提现详情 */
    function OnGetOpenRedPackRecordLobbyCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "RedDepositDetail");
        MJLobby.MJLobbyData.getInstance().redpacket_DepositDetail = rev.infos;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_REDPOSITDETAIL);
    }
    Cmd.OnGetOpenRedPackRecordLobbyCmd_S = OnGetOpenRedPackRecordLobbyCmd_S;
    /**红包是否可提取 */
    function OnCheckOpenRedPackLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "openRed");
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.CHECKOPENREDPACK_OK, rev);
        }
    }
    Cmd.OnCheckOpenRedPackLobbyCmd_S = OnCheckOpenRedPackLobbyCmd_S;
    /**红包提取*/
    function OnOpenRedPackLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            if (!Array.isArray(MJLobby.MJLobbyData.getInstance().redpacket_DepositDetail)) {
                MJLobby.MJLobbyData.getInstance().redpacket_DepositDetail = [];
            }
            MJLobby.MJLobbyData.getInstance().redpacket_DepositDetail.unshift(rev.info);
            MJLobby.MJLobbyData.getInstance().redpacket_surplus = rev.surplus;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_REDPACKET_SUCCESS, rev);
        }
    }
    Cmd.OnOpenRedPackLobbyCmd_S = OnOpenRedPackLobbyCmd_S;
    /**查看当前红包奖励 */
    function OnGetRedPackRewardInfoLobbyCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "redpacket");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().redpacket_info = rev;
            dispatch(MJLobby.MahJongLobbyFacadeConsts.OPEN_REDPACKETPANEL);
        }
    }
    Cmd.OnGetRedPackRewardInfoLobbyCmd_S = OnGetRedPackRewardInfoLobbyCmd_S;
    /**进入百人场 */
    function OnEnterHundredGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM, rev);
        }
    }
    Cmd.OnEnterHundredGameLobbyCmd_S = OnEnterHundredGameLobbyCmd_S;
    /**服务器返回比赛场报名 */
    function OnEntryMatchLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyMatchData.getInstance().isEnroll = true;
        }
    }
    Cmd.OnEntryMatchLobbyCmd_S = OnEntryMatchLobbyCmd_S;
    /**服务器返回比赛场等待消息 */
    function OnEntryMatchUserCountLobbyCmd_Brd(rev) {
        MJLobby.MJLobbyMatchData.getInstance().enrollNum = [];
        MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.enrollment);
        MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.totalCount);
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_ENROLL_SUCCESS);
    }
    Cmd.OnEntryMatchUserCountLobbyCmd_Brd = OnEntryMatchUserCountLobbyCmd_Brd;
    /**比赛场退赛 */
    function OnQuitMatchLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyMatchData.getInstance().isEnroll = false;
            MJLobby.MJLobbyMatchData.getInstance().enrollNum = [];
            MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.enrollment);
            MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.totalCount);
            dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_EXIT);
        }
    }
    Cmd.OnQuitMatchLobbyCmd_S = OnQuitMatchLobbyCmd_S;
    /**比赛场获取报名时间 */
    function OnGetEnrollConditionLobbyCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "matchTime");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyMatchData.getInstance().enrollTime = [];
            MJLobby.MJLobbyMatchData.getInstance().enrollNum = [];
            if (rev.st) {
                MJLobby.MJLobbyMatchData.getInstance().enrollTime.push(rev.st);
            }
            if (rev.et) {
                MJLobby.MJLobbyMatchData.getInstance().enrollTime.push(rev.et);
            }
            if (rev.isEnroll) {
                if (rev.isEnroll == 1) {
                    MJLobby.MJLobbyMatchData.getInstance().isEnroll = true;
                }
                else {
                    MJLobby.MJLobbyMatchData.getInstance().isEnroll = false;
                }
            }
            MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.enrollment);
            MJLobby.MJLobbyMatchData.getInstance().enrollNum.push(rev.totalCount);
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_MATCHTIME);
        }
    }
    Cmd.OnGetEnrollConditionLobbyCmd_S = OnGetEnrollConditionLobbyCmd_S;
    /**比赛场获取人数排行 */
    function OnGetJoinMatchRankLobbyCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "matchCount");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_GETCOUNT_LIST, rev);
    }
    Cmd.OnGetJoinMatchRankLobbyCmd_S = OnGetJoinMatchRankLobbyCmd_S;
    /**比赛场异常补偿弹窗 */
    function OnSendMatchAbnormalLobbyCmd_Brd(rev) {
        MJLobby.LobbyPopupManager.showConfirmPanel(rev.compensation, [""], [], "", this);
    }
    Cmd.OnSendMatchAbnormalLobbyCmd_Brd = OnSendMatchAbnormalLobbyCmd_Brd;
    /**服务器返回比赛场点击获取玩家数量 */
    function OnGetJoinMatchUserCountCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "matchusercount");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.MATCH_GETUSER_COUNT, rev);
        }
    }
    Cmd.OnGetJoinMatchUserCountCmd_S = OnGetJoinMatchUserCountCmd_S;
    /**金币场用户签到消息回复 */
    function OnUserSignInfoLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.SIGN_INFO, rev);
        }
    }
    Cmd.OnUserSignInfoLobbyCmd_S = OnUserSignInfoLobbyCmd_S;
    /**金币场用户今日签到返回 */
    function OnUserSignTodayLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.SIGN_TODAY, rev);
        }
    }
    Cmd.OnUserSignTodayLobbyCmd_S = OnUserSignTodayLobbyCmd_S;
    /**用户累计签到奖励 */
    function OnUserSignContinueLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.SIGN_CONTINUE, rev);
        }
    }
    Cmd.OnUserSignContinueLobbyCmd_S = OnUserSignContinueLobbyCmd_S;
    /**获取排行榜信息回复 */
    function OnGetListRankCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "rank");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_RANK_LIST, rev);
        }
    }
    Cmd.OnGetListRankCmd_S = OnGetListRankCmd_S;
    /**获取大赢家排行榜奖励回复 */
    function OnGetWinChipsRankRewardCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_WINCHIPS_RANK, rev);
        }
    }
    Cmd.OnGetWinChipsRankRewardCmd_S = OnGetWinChipsRankRewardCmd_S;
    /**金币场进入免费金币界面 */
    function OnIntoFreeGoldLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_FREEGOLD_INFO, rev);
        }
    }
    Cmd.OnIntoFreeGoldLobbyCmd_S = OnIntoFreeGoldLobbyCmd_S;
    /**金币场领取vip礼包 */
    function OnGetVipRewardLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().vipReward.splice(MJLobby.MJLobbyData.getInstance().vipReward.indexOf(rev.level), 1);
            dispatch(MJLobby.MahJongLobbyFacadeConsts.COIN_GETAWARD_VIP, rev);
        }
    }
    Cmd.OnGetVipRewardLobbyCmd_S = OnGetVipRewardLobbyCmd_S;
    /**金币场领取指定任务奖励 */
    function OnGetDaysTaskRewardLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.COIN_FREEGOLD, rev);
        }
    }
    Cmd.OnGetDaysTaskRewardLobbyCmd_S = OnGetDaysTaskRewardLobbyCmd_S;
    /**破产补助弹框 */
    function OnSendBankruptcyLobbyCmd_Brd(rev) {
        if (RES.hasRes("LobbyTaskConfig_json") && RES.hasRes("TableGoodsConfig_json")) {
            var task = RES.getRes("LobbyTaskConfig_json");
            var good = RES.getRes("TableGoodsConfig_json");
            var taskConfig;
            var goodConfig;
            for (var _i = 0; _i < task.length; _i++) {
                var item = task[_i];
                if (item["id"] == 4) {
                    taskConfig = item;
                    break;
                }
            }
            for (var _a = 0; _a < good.length; _a++) {
                var item = good[_a];
                if (item["goodId"] == taskConfig["taskReward"][0].goodId) {
                    goodConfig = item;
                    break;
                }
            }
            var msg = "您的金币不足!系统赠送您" + taskConfig["taskReward"][0].goodNbr + goodConfig["goodName"] + "祝您游戏愉快!";
            MJLobby.LobbyPopupManager.showConfirmPanel(msg, [""], [], "", this);
        }
    }
    Cmd.OnSendBankruptcyLobbyCmd_Brd = OnSendBankruptcyLobbyCmd_Brd;
    /**返回自己的所有匹配号 */
    function OnReturnMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnMatchGroup, rev);
    }
    Cmd.OnReturnMatchGroupCmd_S = OnReturnMatchGroupCmd_S;
    /**申请白名单消息列表,玩家请求后主动推给匹配主 */
    function OnJoinMemberListMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.JoinMemberListMatch, rev);
    }
    Cmd.OnJoinMemberListMatchGroupCmd_S = OnJoinMemberListMatchGroupCmd_S;
    /**返回黑白名单 */
    function OnReturnMemberInfoMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MemberInfoMatchGroup, rev);
    }
    Cmd.OnReturnMemberInfoMatchGroupCmd_S = OnReturnMemberInfoMatchGroupCmd_S;
    /**返回参赛人员战绩列表 */
    function OnPlayedListMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.PlayedListMatchGroup, rev);
    }
    Cmd.OnPlayedListMatchGroupCmd_S = OnPlayedListMatchGroupCmd_S;
    ///////////////////好彩真人麻将////////////////////////////////
    function OnGetReliefPayStatusLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_ALMS, rev);
        }
    }
    Cmd.OnGetReliefPayStatusLobbyCmd_S = OnGetReliefPayStatusLobbyCmd_S;
    /**幸运翻翻翻 */
    function OnGetLuckTurnCardShowInfoV3LobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_LUCK, rev);
        }
    }
    Cmd.OnGetLuckTurnCardShowInfoV3LobbyCmd_S = OnGetLuckTurnCardShowInfoV3LobbyCmd_S;
    /**幸运翻翻翻结果 */
    function OnGetLuckTurnCardRewardV3LobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_LUCK_BACK, rev);
        }
    }
    Cmd.OnGetLuckTurnCardRewardV3LobbyCmd_S = OnGetLuckTurnCardRewardV3LobbyCmd_S;
    /**限时优惠面板 */
    function OnLimitOfferChipsLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_LIMIT, rev);
        }
    }
    Cmd.OnLimitOfferChipsLobbyCmd_S = OnLimitOfferChipsLobbyCmd_S;
    /**限时优惠面板 */
    function OnGetLimitOfferChipsLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_ExchangeLimitActivity, rev);
        }
    }
    Cmd.OnGetLimitOfferChipsLobbyCmd_S = OnGetLimitOfferChipsLobbyCmd_S;
    /**首冲界面 */
    function OnFirstRechargeInfoLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_FIRSTRECHARGE, rev);
        }
    }
    Cmd.OnFirstRechargeInfoLobbyCmd_S = OnFirstRechargeInfoLobbyCmd_S;
    /**快速开始 */
    function OnQuickStartGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_QUICK_START, rev);
        }
    }
    Cmd.OnQuickStartGameLobbyCmd_S = OnQuickStartGameLobbyCmd_S;
    // 查看活跃房间列表
    function OnActiveCreateRoomCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RETURN_ACTIVE_LIST_ROOM, rev);
    }
    Cmd.OnActiveCreateRoomCmd_S = OnActiveCreateRoomCmd_S;
    /**礼包兑换码 */
    function OnUserGiftCodeLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GIFT_CODE, rev);
        }
    }
    Cmd.OnUserGiftCodeLobbyCmd_S = OnUserGiftCodeLobbyCmd_S;
    /**领取首充礼包 */
    function OnReceiveFirstRechargeLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GET_FIRSTRECHARGE_REWARD, rev);
        }
    }
    Cmd.OnReceiveFirstRechargeLobbyCmd_S = OnReceiveFirstRechargeLobbyCmd_S;
    /**判断是否可以加入游戏 */
    function OnJudgeEnterGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_JudgeEnterGameLobby, rev);
        }
    }
    Cmd.OnJudgeEnterGameLobbyCmd_S = OnJudgeEnterGameLobbyCmd_S;
    /**
     *  Echo应答,客户端探测服务器
     *  TODO,还未使用,待升级
     */
    function OnClientEchoRoomCmd_SC(rev) {
        if (uniLib.Global.lastPingUpTimestamp != null) {
            uniLib.Global.lastPing = Date.now() - uniLib.Global.lastPingUpTimestamp;
            uniLib.Global.lastPingUpTimestamp = null;
        }
    }
    Cmd.OnClientEchoRoomCmd_SC = OnClientEchoRoomCmd_SC;
    /**好彩返回之前的游戏 */
    function OnReturnHaoCaiGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_ReturnHaoCaiGameLobby, rev);
        }
    }
    Cmd.OnReturnHaoCaiGameLobbyCmd_S = OnReturnHaoCaiGameLobbyCmd_S;
    /**好彩获取魅力值排行榜 */
    function OnGetUserCpRankListLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETUSERCPRANKLIST_LOBBY, rev);
    }
    Cmd.OnGetUserCpRankListLobbyCmd_S = OnGetUserCpRankListLobbyCmd_S;
    /**好友获取好友列表 */
    function OnGetFriendListLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETFRIENDLIST_LOBBY, rev);
            MJLobby.MJLobbyData.getInstance().friendsList = rev;
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "friendList");
        }
    }
    Cmd.OnGetFriendListLobbyCmd_S = OnGetFriendListLobbyCmd_S;
    /**删除好友 */
    function OnRemoveFriendLobbyCmd_S(rev) {
        if (rev.resultCode == 1000) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.RemoveFriend, rev);
        }
    }
    Cmd.OnRemoveFriendLobbyCmd_S = OnRemoveFriendLobbyCmd_S;
    /**查找好友界面 */
    function OnSearchFriendsListLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SEARCHFRIENDSLIST_LOBBY, rev);
    }
    Cmd.OnSearchFriendsListLobbyCmd_S = OnSearchFriendsListLobbyCmd_S;
    /**好友聊天 */
    function OnFriendChatLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_FRIENDCHAT_LOBBY, rev);
        }
    }
    Cmd.OnFriendChatLobbyCmd_S = OnFriendChatLobbyCmd_S;
    /**获得金币场战绩 */
    function OnGetCoinGameRecordLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETCOINGAMERECORD_LOBBY, rev);
    }
    Cmd.OnGetCoinGameRecordLobbyCmd_S = OnGetCoinGameRecordLobbyCmd_S;
    /**获取礼品券 */
    function OnGetGiftVoucherLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETGIFTCOUPON_LOBBY, rev);
        }
    }
    Cmd.OnGetGiftVoucherLobbyCmd_S = OnGetGiftVoucherLobbyCmd_S;
    /**兑换礼品券记录个人信息 */
    function OnExchangeGiftVoucherRecordUserInfoLobby_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_EXCHANGEGIFTCOUPONRECORDUSERINFO_LOBBY, rev);
        }
    }
    Cmd.OnExchangeGiftVoucherRecordUserInfoLobby_S = OnExchangeGiftVoucherRecordUserInfoLobby_S;
    /**好友申请列表 */
    function OnGetFriendApplyListLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_GETFRIENDAPPLYLIST_LOBBY, rev);
        }
    }
    Cmd.OnGetFriendApplyListLobbyCmd_S = OnGetFriendApplyListLobbyCmd_S;
    /**统一，拒绝好友申请 */
    function OnDealFriendApplyListLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_DEALFRIENDAPPLYLIST_LOBBY, rev);
        }
    }
    Cmd.OnDealFriendApplyListLobbyCmd_S = OnDealFriendApplyListLobbyCmd_S;
    /**绑定手机成功 */
    function OnBindingMobilePhoneLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.BIND_PHONE, rev);
        }
    }
    Cmd.OnBindingMobilePhoneLobbyCmd_S = OnBindingMobilePhoneLobbyCmd_S;
    /**获取红包信息 */
    function OnGetRedPackInfoLobbyCmd_S(rev) {
        // if(!rev.resultCode){
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_REDPACKINFO, rev);
        // }
    }
    Cmd.OnGetRedPackInfoLobbyCmd_S = OnGetRedPackInfoLobbyCmd_S;
    /**抢红包 */
    function OnGrabRedPackLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GRAB_REDPACK, rev);
    }
    Cmd.OnGrabRedPackLobbyCmd_S = OnGrabRedPackLobbyCmd_S;
    /**红包累计奖励 */
    function OnGetMyRedPackRewardLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_MYREDPACKREWARD, rev);
    }
    Cmd.OnGetMyRedPackRewardLobbyCmd_S = OnGetMyRedPackRewardLobbyCmd_S;
    /**兑换红包 */
    function OnExchangeRedPackLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.EX_MYREDPACK, rev);
    }
    Cmd.OnExchangeRedPackLobbyCmd_S = OnExchangeRedPackLobbyCmd_S;
    /**兑换红包 */
    function OnGetUserVipInfoLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_USERVIP, rev);
    }
    Cmd.OnGetUserVipInfoLobbyCmd_S = OnGetUserVipInfoLobbyCmd_S;
    /**请求转盘信息回复 */
    function OnGetInfoTurnTableCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_TURNTABLEINFO, rev);
        }
    }
    Cmd.OnGetInfoTurnTableCmd_S = OnGetInfoTurnTableCmd_S;
    /**请求转盘信息回复 */
    function OnTurnTurnTableCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.TURN_TURNTABLE, rev);
        }
    }
    Cmd.OnTurnTurnTableCmd_S = OnTurnTurnTableCmd_S;
    /**领取转盘累计奖励 */
    function OnGetCumulativeRewordTurnTableCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_TURNTABLEREWARD, rev);
        }
    }
    Cmd.OnGetCumulativeRewordTurnTableCmd_S = OnGetCumulativeRewordTurnTableCmd_S;
    /**请求邮件列表 */
    function OnGetListMailCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_MAILLIST, rev);
        }
    }
    Cmd.OnGetListMailCmd_S = OnGetListMailCmd_S;
    /**查看指定邮件 */
    function OnReadMailCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.READ_ONEMAIL, rev);
        }
    }
    Cmd.OnReadMailCmd_S = OnReadMailCmd_S;
    /**删除指定邮件 */
    function OnDeleteMailCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.DELETE_ONEMAIL, rev);
        }
    }
    Cmd.OnDeleteMailCmd_S = OnDeleteMailCmd_S;
    /**领取指定邮件内的奖励 */
    function OnGetMailRewardCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_MAILREWARD, rev);
        }
    }
    Cmd.OnGetMailRewardCmd_S = OnGetMailRewardCmd_S;
    /**邮件批量操作 */
    function OnBulkOperationMailCmd_S(rev) {
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.BULK_MAIL, rev);
        }
    }
    Cmd.OnBulkOperationMailCmd_S = OnBulkOperationMailCmd_S;
    /**游戏按钮红点 */
    function OnShowRedPointLobbyCmd_S(rev) {
        MJLobby.MJLobbyData.getInstance().redPointData = rev;
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RED_POINT, rev);
    }
    Cmd.OnShowRedPointLobbyCmd_S = OnShowRedPointLobbyCmd_S;
    /**当累计金额发生变化时，服务器会主动推送 */
    function OnGetTotalRedPackMoneyLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.TotalRedPack, rev);
    }
    Cmd.OnGetTotalRedPackMoneyLobbyCmd_S = OnGetTotalRedPackMoneyLobbyCmd_S;
    /**新用户红包界面 */
    function OnGetNewUserRedPackShowLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.NewUserRedPack, rev);
    }
    Cmd.OnGetNewUserRedPackShowLobbyCmd_S = OnGetNewUserRedPackShowLobbyCmd_S;
    /**领取新手红包 */
    function OnExchangeNewUserRedPackLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ExchangeNewUserRedPack, rev);
    }
    Cmd.OnExchangeNewUserRedPackLobbyCmd_S = OnExchangeNewUserRedPackLobbyCmd_S;
    /**话费券兑换红包界面 */
    function OnGetCCRedPackShowLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GetCCRedPack, rev);
    }
    Cmd.OnGetCCRedPackShowLobbyCmd_S = OnGetCCRedPackShowLobbyCmd_S;
    /**话费券兑换红包 */
    function OnExchangeCCRedPackLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ExchangeCCRedPack, rev);
    }
    Cmd.OnExchangeCCRedPackLobbyCmd_S = OnExchangeCCRedPackLobbyCmd_S;
    /**返利红包界面 */
    function OnGetRechargeRedPackShowLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GetRechargeRedPack, rev);
    }
    Cmd.OnGetRechargeRedPackShowLobbyCmd_S = OnGetRechargeRedPackShowLobbyCmd_S;
    /**兑换返利红包 */
    function OnExchangeRechargeRedPackLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ExchangeRechargeRedPack, rev);
    }
    Cmd.OnExchangeRechargeRedPackLobbyCmd_S = OnExchangeRechargeRedPackLobbyCmd_S;
    /**玩家获得红包明细 */
    function OnGetUserGetRedPackInfoLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GetUserGetRedPackInfo, rev);
    }
    Cmd.OnGetUserGetRedPackInfoLobbyCmd_S = OnGetUserGetRedPackInfoLobbyCmd_S;
    /**提现记录 */
    function OnGetDrawCashRecordLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GetDrawCashRecord, rev);
    }
    Cmd.OnGetDrawCashRecordLobbyCmd_S = OnGetDrawCashRecordLobbyCmd_S;
    /**红包提现 */
    function OnRedPackDrawCashLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RedPackDrawCash, rev);
    }
    Cmd.OnRedPackDrawCashLobbyCmd_S = OnRedPackDrawCashLobbyCmd_S;
    /**新版幸运翻翻翻主界面 */
    function OnNewLuckTurnCardShowLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.NewLuckTurnCardShow, rev);
    }
    Cmd.OnNewLuckTurnCardShowLobbyCmd_S = OnNewLuckTurnCardShowLobbyCmd_S;
    /**新版幸运翻翻翻翻牌 */
    function OnNewGetLuckTurnCardRewardLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.NewGetLuckTurnCardReward, rev);
    }
    Cmd.OnNewGetLuckTurnCardRewardLobbyCmd_S = OnNewGetLuckTurnCardRewardLobbyCmd_S;
    /**获取弹窗公告 */
    function OnGetPopupBroadListLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_SHOW_BROAD, rev);
    }
    Cmd.OnGetPopupBroadListLobbyCmd_S = OnGetPopupBroadListLobbyCmd_S;
    /**获取弹窗公告 */
    function OnReadPopBroadLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReadPopBroad, rev);
    }
    Cmd.OnReadPopBroadLobbyCmd_S = OnReadPopBroadLobbyCmd_S;
    /**进游戏顺序弹窗 */
    function OnSequentialPopupsLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.WINDOW_POP, rev);
    }
    Cmd.OnSequentialPopupsLobbyCmd_S = OnSequentialPopupsLobbyCmd_S;
    /**获取百宝箱数据 */
    function OnGetTreasureBoxShowInfoLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_TREBOX_INFO, rev);
        }
    }
    Cmd.OnGetTreasureBoxShowInfoLobbyCmd_S = OnGetTreasureBoxShowInfoLobbyCmd_S;
    /**领取百宝箱任务奖励 */
    function OnGetTreasureBoxTaskLotteryLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_TREBOX_TASKAWARD, rev);
        }
    }
    Cmd.OnGetTreasureBoxTaskLotteryLobbyCmd_S = OnGetTreasureBoxTaskLotteryLobbyCmd_S;
    /**百宝箱转动抽奖 */
    function OnTurnTreasureBoxLotteryLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.TURN_TREBOX_LOTTERY, rev);
        }
    }
    Cmd.OnTurnTreasureBoxLotteryLobbyCmd_S = OnTurnTreasureBoxLotteryLobbyCmd_S;
    ////////////////////////////////////////////////////////////////
    function OnIntoInviteRankLobbyCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "inviteRank");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.KEJIA_INVITERANK, rev);
        }
    }
    Cmd.OnIntoInviteRankLobbyCmd_S = OnIntoInviteRankLobbyCmd_S;
    /**福建的代理商界面 */
    function OnIntoHigherAgentLobbyCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "invite");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LYFJ_INVITE, rev);
        }
    }
    Cmd.OnIntoHigherAgentLobbyCmd_S = OnIntoHigherAgentLobbyCmd_S;
    /**福建代理返回 */
    function OnEnquireBindAgent2LobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.LYFJ_INVITE_RETURN, rev);
        }
    }
    Cmd.OnEnquireBindAgent2LobbyCmd_S = OnEnquireBindAgent2LobbyCmd_S;
    /**丹东代理界面 */
    function OnGetParentLobbyCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "invite");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.DANDONG_INVITE, rev);
    }
    Cmd.OnGetParentLobbyCmd_S = OnGetParentLobbyCmd_S;
    /**余款数量更新 */
    function OnBankMoneyUpdate_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BANK_MONEY_UPDATE, rev);
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_G2L, { Cmd_BankMoneyUpdate_S: rev });
    }
    Cmd.OnBankMoneyUpdate_S = OnBankMoneyUpdate_S;
    /**保险箱返回 */
    function OnAccessBankChipsLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.BANK_MONEY_UPDATE);
        }
    }
    Cmd.OnAccessBankChipsLobbyCmd_S = OnAccessBankChipsLobbyCmd_S;
    /**实名认证 */
    function OnAuthenticationLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyData.getInstance().authen = 0;
            MJLobby.LobbyPopupManager.showMildWarnShow("实名认证已成功");
        }
    }
    Cmd.OnAuthenticationLobbyCmd_S = OnAuthenticationLobbyCmd_S;
    /**
     *  C-&gt;S 获取邮件列表请求
     *  S-&gt;C 邮件列表更新
     */
    function OnGetListMailCmd_CS(rev) {
        var mailList = rev.mailList && rev.mailList instanceof Array ? rev.mailList : [];
        MJLobby.Mail.Instance.initMail(mailList);
    }
    Cmd.OnGetListMailCmd_CS = OnGetListMailCmd_CS;
    /**
     * 新邮件广播
     */
    function OnNewMailCmd_Brd(rev) {
        MJLobby.Mail.Instance.add(rev.mail);
    }
    Cmd.OnNewMailCmd_Brd = OnNewMailCmd_Brd;
    /**
     *  C-&gt;S 删除指定邮件请求
     *  S-&gt;C 删除指定邮件通知
     */
    function OnDeleteMailCmd_CS(rev) {
        var ids = rev.ids && rev.ids instanceof Array ? rev.ids : [];
        for (var _i = 0; _i < ids.length; _i++) {
            var item = ids[_i];
            MJLobby.Mail.Instance.delete(item);
        }
    }
    Cmd.OnDeleteMailCmd_CS = OnDeleteMailCmd_CS;
    /**
     *  C-&gt;S 查看指定邮件请求
     *  S-&gt;C 查看完成指定邮件通知
     */
    function OnReadMailCmd_CS(rev) {
        // let ids = rev.ids && rev.ids instanceof Array ? rev.ids : [];
        // let mailList = MJLobby.Mail.Instance.mailList;
        // for (let id of ids) {
        //     let mail = mailList.first((v: MailInfo) => v.id == id);
        //     if (!mail)
        //         continue;
        // }
    }
    Cmd.OnReadMailCmd_CS = OnReadMailCmd_CS;
    /**
     *  C-&gt;S 获取邮件的东西请求
     *  S-&gt;C 已获取邮件东西通知
     */
    function OnGetItemMailCmd_CS(rev) {
        uniLib.UserInfo.chips = rev.diamond;
        var ids = rev.ids && rev.ids instanceof Array ? rev.ids : [];
        for (var _i = 0; _i < ids.length; _i++) {
            var item = ids[_i];
            MJLobby.Mail.Instance.changedMailState(item, Cmd.MailInfo.State.ReadOver);
        }
        dispatch(MJLobby.MahJongLobbyFacadeConsts.Chips_Changed, rev.diamond);
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GetItemMail, rev);
    }
    Cmd.OnGetItemMailCmd_CS = OnGetItemMailCmd_CS;
    // /**
    //  * 刷新某个赛事人数
    //  */
    // export function OnRefreshUesrNbrEventCmd_Brd(rev: Cmd.RefreshUesrNbrEventCmd_Brd) {
    //     dispatch(MJLobby.MahJongLobbyFacadeConsts.RefreshUesrNbrEvent, rev);
    // }
    // /**
    //  * 刷新某个赛事状态
    //  */
    // export function OnRefreshStateEventCmd_Brd(rev: Cmd.RefreshStateEventCmd_Brd) {
    //     dispatch(MJLobby.MahJongLobbyFacadeConsts.RefreshStateEvent, rev);
    // }
    // /**
    //  * 查看当前赛事
    //  */
    // export function OnReturnListEventCmd_S(rev: Cmd.ReturnListEventCmd_S) {
    //     dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnListEvent, rev);
    // }
    // /**
    //  * 申请退出一个赛事
    //  */
    // export function OnRequestExitEventCmd_C(rev: Cmd.RequestExitEventCmd_C) {
    //     dispatch(MJLobby.MahJongLobbyFacadeConsts.RequestExitEvent, rev);
    // }
    // /**
    //  * 申请退出一个赛事返回
    //  */
    // export function OnReturnExitEventCmd_S(rev: Cmd.ReturnExitEventCmd_S) {
    //     dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnExitEvent, rev);
    // }
    // /**
    //  * 返回某个赛事结果
    //  */
    // export function OnReturnEventResultCmd_S(rev: Cmd.ReturnEventResultCmd_S) {
    //     dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnEventResult, rev);
    // }
    // /**
    //  * 申请参加加赛事返回
    //  */
    // export function OnReturnJoinEventCmd_S(rev: Cmd.ReturnJoinEventCmd_S) {
    //     dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnJoinEvent, rev);
    // }
    /**商城购买相关 */
    function OnBuyGoodsLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.BUYGOODS_LOBBY, rev);
        }
    }
    Cmd.OnBuyGoodsLobbyCmd_S = OnBuyGoodsLobbyCmd_S;
    /**退出房间面板 */
    function OnQuitGameShowLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HC_QUITGAMESHOW_LOBBY, rev);
    }
    Cmd.OnQuitGameShowLobbyCmd_S = OnQuitGameShowLobbyCmd_S;
    /**
    * 实名认证
    */
    function OnAuthenticationLobbyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AuthenticationLobby, rev);
    }
    Cmd.OnAuthenticationLobbyCmd_CS = OnAuthenticationLobbyCmd_CS;
    /**
     * 提现记录
     */
    function OnCashWithdrawalLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            MJLobby.LobbyPopupManager.showMildWarnShow("申请提现成功，正在审核中...");
        }
    }
    Cmd.OnCashWithdrawalLobbyCmd_S = OnCashWithdrawalLobbyCmd_S;
    /**
     * 提现记录
     */
    function OnGetCashWithdrawalRecordLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.WithdrawalRecordEvent, rev);
    }
    Cmd.OnGetCashWithdrawalRecordLobbyCmd_S = OnGetCashWithdrawalRecordLobbyCmd_S;
    /**
     * 获取服务器发来的玩家头像数据
     */
    function OnGetUserHeadList_S(rev) {
        if (rev && rev.headList) {
            MJLobby.LobbyDataCache.addHeadUrl(rev.headList);
            dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnUserHeadList, rev);
        }
    }
    Cmd.OnGetUserHeadList_S = OnGetUserHeadList_S;
    /**
     * 获取黄名单列表
     */
    function OnReturnYellowMemberInfoMatchGroupCmd_S(rev) {
        if (rev && rev.list) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnYellowList, rev);
        }
    }
    Cmd.OnReturnYellowMemberInfoMatchGroupCmd_S = OnReturnYellowMemberInfoMatchGroupCmd_S;
    /**放弃摇一摇 */
    function OnAbandonShakeLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.AbandonShake, rev);
        }
    }
    Cmd.OnAbandonShakeLobbyCmd_S = OnAbandonShakeLobbyCmd_S;
    /**打开摇一摇界面 */
    function OnGetShakeBaseInfoLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(MJLobby.MahJongLobbyFacadeConsts.ENTERSHAKE_LOBBY, true, rev);
        }
    }
    Cmd.OnGetShakeBaseInfoLobbyCmd_S = OnGetShakeBaseInfoLobbyCmd_S;
    /**摇一摇中奖返回数据 */
    function OnGetShakeResultLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(MJLobby.MahJongLobbyFacadeConsts.SHAKE_DATA_LOBBY, true, rev);
        }
    }
    Cmd.OnGetShakeResultLobbyCmd_S = OnGetShakeResultLobbyCmd_S;
    /**获取收货地址 */
    function OnGetShippingAddressLobby_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(MJLobby.MahJongLobbyFacadeConsts.GetShippingAddress, true, rev);
        }
    }
    Cmd.OnGetShippingAddressLobby_S = OnGetShippingAddressLobby_S;
    /**填写或者修改收货地址 */
    function OnChangeShippingAddressLobby_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(MJLobby.MahJongLobbyFacadeConsts.ChangeShippingAddress, true, rev);
        }
    }
    Cmd.OnChangeShippingAddressLobby_S = OnChangeShippingAddressLobby_S;
    /**领取累计待领取的时效性金币 */
    function OnRevTimeChipsLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(MJLobby.MahJongLobbyFacadeConsts.RevTimeChips, true, rev);
        }
    }
    Cmd.OnRevTimeChipsLobbyCmd_S = OnRevTimeChipsLobbyCmd_S;
    /**购买头像框，周卡/月卡等时效性道具 */
    function OnBuyTimeGoodsLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            MJLobby.MJLobbyEventListener.getInstance().dispatchEventWith(MJLobby.MahJongLobbyFacadeConsts.BuyTimeGoods, true, rev);
        }
    }
    Cmd.OnBuyTimeGoodsLobbyCmd_S = OnBuyTimeGoodsLobbyCmd_S;
    /**
     * 大厅微信红包雨
     */
    function OnGrabRedPackLobbyCmd_Brd(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GrabRedPackLobby, rev);
    }
    Cmd.OnGrabRedPackLobbyCmd_Brd = OnGrabRedPackLobbyCmd_Brd;
    /**
     * 改变匹配号属性
     */
    function OnChangeMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ChangeMatchGroupEvent, rev);
    }
    Cmd.OnChangeMatchGroupCmd_S = OnChangeMatchGroupCmd_S;
    /**
     * 历史匹配组列表
     */
    function OnHistoryMatchIdListMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HistoryMatchIdList, rev);
    }
    Cmd.OnHistoryMatchIdListMatchGroupCmd_S = OnHistoryMatchIdListMatchGroupCmd_S;
    /**
     * 官方匹配组列表
     */
    function OnPublicMatchIdListMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.PublicMatchList, rev);
    }
    Cmd.OnPublicMatchIdListMatchGroupCmd_S = OnPublicMatchIdListMatchGroupCmd_S;
    /**
     * 冠名赛列表
     */
    function OnOfficialMatchIdListMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.OfficialMatchList, rev);
    }
    Cmd.OnOfficialMatchIdListMatchGroupCmd_S = OnOfficialMatchIdListMatchGroupCmd_S;
    /**
     * 返回等待列表
     */
    function OnWaitUserListMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnWaitList, rev);
    }
    Cmd.OnWaitUserListMatchGroupCmd_S = OnWaitUserListMatchGroupCmd_S;
    function OnRequestJoinMemberMatchGroupCmd_S(rev) {
        var msgBox = new MJLobby.LobbyMsgBox(true);
        var weChatNum = rev.wechat;
        var msg = "玩家" + rev.nickname + (weChatNum ? "微信:" + weChatNum : "") + "申请加入匹配号" + rev.matchId + (rev.note ? ",备注：" + rev.note : "") + "\n是否同意进入？";
        // let msg = "玩家" + rev.nickname + (weChatNum ? "微信:" + weChatNum : "") + "申请加入匹配号" + rev.matchId + ",是否同意进入？"
        function okFunc() {
            var cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
            cmd.matchId = rev.matchId;
            cmd.reply = 1;
            cmd.uid = rev.uid;
            MJLobby.LobbyServerMJProxy.getInstance().sendData(cmd);
        }
        if (MJLobby.MJLobbyData.getInstance().lobbyId < 5000) {
            msgBox.setData("", msg, ["确定", "取消"], [okFunc]);
        }
        else {
            msgBox.setData("温馨提示", msg, ["确定", "取消"], [okFunc]);
        }
        MJLobby.LobbyPopupManager.addPopUp(msgBox, true, true);
    }
    Cmd.OnRequestJoinMemberMatchGroupCmd_S = OnRequestJoinMemberMatchGroupCmd_S;
    /**返回商城列表 */
    function OnShopPointListLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnShopPointList, rev);
    }
    Cmd.OnShopPointListLobbyCmd_S = OnShopPointListLobbyCmd_S;
    /**返回抽奖结果 */
    function OnLuckShopPointItemLobbyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnLuckShopPointItem, rev);
    }
    Cmd.OnLuckShopPointItemLobbyCmd_CS = OnLuckShopPointItemLobbyCmd_CS;
    /** 绑定微信联系信息*/
    function OnWechatLobbyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.Bind_WeChatNum);
    }
    Cmd.OnWechatLobbyCmd_CS = OnWechatLobbyCmd_CS;
    /**
     * 俱乐部数据更新（德扑大厅）
     */
    function OnUpdateInfoClubCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ClubInfoUpdateEvent, rev);
    }
    Cmd.OnUpdateInfoClubCmd_S = OnUpdateInfoClubCmd_S;
    /**
     * 俱乐部查询
     */
    function OnSearchClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.SerchClubListEvent, rev);
    }
    Cmd.OnSearchClubCmd_CS = OnSearchClubCmd_CS;
    /**通知前端上发获取经度纬度 */
    function OnGetGPSLocationCmd_S(rev) {
        MJLobby.MJLobbyData.getInstance().getGpsPosition(true);
    }
    Cmd.OnGetGPSLocationCmd_S = OnGetGPSLocationCmd_S;
    /**返回所有俱乐部组信息*/
    function OnHistoryClubListMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HistoryClubList, rev);
    }
    Cmd.OnHistoryClubListMatchGroupCmd_S = OnHistoryClubListMatchGroupCmd_S;
    /**
     * 玩家压注数据统计
     */
    function OnStatisticsRoundQueryCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.StatisticsRoundData, rev);
    }
    Cmd.OnStatisticsRoundQueryCmd_CS = OnStatisticsRoundQueryCmd_CS;
    /**
     * 房间牌谱列表
     */
    function OnRoundRecordRoomQueryCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RoundRecordRoomQuery, rev);
    }
    Cmd.OnRoundRecordRoomQueryCmd_CS = OnRoundRecordRoomQueryCmd_CS;
    /**
     *请求收藏牌谱
     */
    function OnRoundRecordQueryMyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.SelfRoundRecordQuery, rev);
    }
    Cmd.OnRoundRecordQueryMyCmd_CS = OnRoundRecordQueryMyCmd_CS;
    /**
     * 聊天消息
     */
    function OnChatCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ChatMessageInfo, rev);
    }
    Cmd.OnChatCmd_CS = OnChatCmd_CS;
    /**
     * 报名更新通知
     */
    function OnSignListUpdateCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.SignListUpdate, rev);
    }
    Cmd.OnSignListUpdateCmd_CS = OnSignListUpdateCmd_CS;
    /**
     * 我的牌局
     */
    function OnMyGamesUpdateCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MyGamesUpdate, rev);
    }
    Cmd.OnMyGamesUpdateCmd_CS = OnMyGamesUpdateCmd_CS;
    /**
     * 游戏内货币数量改变通知
     */
    function OnUpdatePointSeatRoom_S(rev) {
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "diamondChange");
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UserChipChaned, rev); //派发给poker库
    }
    Cmd.OnUpdatePointSeatRoom_S = OnUpdatePointSeatRoom_S;
    /**
     * 请求玩家信息
     */
    // export function OnGetUserBaseInfo_CS(rev: Cmd.GetUserBaseInfo_CS) {
    //     dispatch(MJLobby.MahJongLobbyFacadeConsts.QueryUserInfoEvent, rev);
    // }
    /**
     * 请求玩家信息,德州扑克
     */
    function OnGetUserFullInfoCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.QueryUserInfoEvent, rev);
    }
    Cmd.OnGetUserFullInfoCmd_CS = OnGetUserFullInfoCmd_CS;
    /**
     * 离开匹配组返回
     */
    function OnLeaveMatchGroup2Cmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.LEAVE_MATCHGROUP2, rev);
    }
    Cmd.OnLeaveMatchGroup2Cmd_S = OnLeaveMatchGroup2Cmd_S;
    /**
     * 新年活动 领取奖励
     */
    function OnGetAuspiciousDogRewardsLobbyCmd_S(rev) {
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "newYearReward");
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.NEWYEAR_GETREWORD, rev);
        }
    }
    Cmd.OnGetAuspiciousDogRewardsLobbyCmd_S = OnGetAuspiciousDogRewardsLobbyCmd_S;
    /**
     * 瑞狗迎春界面
     */
    function OnGetAuspiciousDogInfoLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.NEWYEAR_DATAINFO, rev);
        }
    }
    Cmd.OnGetAuspiciousDogInfoLobbyCmd_S = OnGetAuspiciousDogInfoLobbyCmd_S;
    /**
     * 新年活动 记录面板
     */
    function OnGetAuspiciousDogRecordsLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.NEWYEAR_RECORD, rev);
        }
    }
    Cmd.OnGetAuspiciousDogRecordsLobbyCmd_S = OnGetAuspiciousDogRecordsLobbyCmd_S;
    /**红包领取失败 */
    function OnOpenRedPackFailLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.OPEN_REDPACKET_FAIL, rev);
    }
    Cmd.OnOpenRedPackFailLobbyCmd_S = OnOpenRedPackFailLobbyCmd_S;
    /**
     * 捐献历史记录返回
     */
    function OnDonateHistoryMatchRoomCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.DONATE_HISTORY, rev);
    }
    Cmd.OnDonateHistoryMatchRoomCmd_S = OnDonateHistoryMatchRoomCmd_S;
    /**
     * 获取标签列表
     */
    function OnTagListCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.Get_TagList, rev);
    }
    Cmd.OnTagListCmd_CS = OnTagListCmd_CS;
    /**
     * 标签列表更新
     */
    function OnTagUpdateCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.TagListChanged, rev);
    }
    Cmd.OnTagUpdateCmd_CS = OnTagUpdateCmd_CS;
    /**
     * 给玩家添加标签
     */
    function OnTagUserCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AddTagReturn, rev);
    }
    Cmd.OnTagUserCmd_CS = OnTagUserCmd_CS;
    /**
     * 俱乐部基金更新
     */
    function OnFundInfoUpdateCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.Club_Fund_Update, rev);
    }
    Cmd.OnFundInfoUpdateCmd_S = OnFundInfoUpdateCmd_S;
    /**消息更新 */
    function OnNotificationUpdateLobbyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UpdateNotification, rev);
    }
    Cmd.OnNotificationUpdateLobbyCmd_CS = OnNotificationUpdateLobbyCmd_CS;
    /**茶馆里的房间状态变化 */
    function OnRoomStateMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UpdataMatchRoomStatus, rev);
    }
    Cmd.OnRoomStateMatchGroupCmd_S = OnRoomStateMatchGroupCmd_S;
    /**进入报名界面通知 */
    function OnSignEnterCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.Sign_Enter, rev);
    }
    Cmd.OnSignEnterCmd_S = OnSignEnterCmd_S;
    /**俱乐部数据更新 */
    function OnReturnClubInfoClubCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnClubInfo, rev);
    }
    Cmd.OnReturnClubInfoClubCmd_S = OnReturnClubInfoClubCmd_S;
    /**进入俱乐部需要弹出申请备注流程 */
    function OnNotifyImportNoteCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.NOTIFYIMPORTNOTE, rev);
    }
    Cmd.OnNotifyImportNoteCmd_S = OnNotifyImportNoteCmd_S;
    /**赛事信息 */
    function OnEventInfoMatchGroupCmd_S(rev) {
        if (rev != null) {
            MJLobby.MJLobbyData.getInstance().eventData = rev;
            uniLib.Global.commEventInfo = rev;
        }
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "EVENT_INFO");
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, { event_pdk: rev });
        dispatch(MJLobby.MahJongLobbyFacadeConsts.EVENT_INFO, rev);
    }
    Cmd.OnEventInfoMatchGroupCmd_S = OnEventInfoMatchGroupCmd_S;
    /**创建房间更新请求 */
    function OnRoomCreateConfigUpdateCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RoomCreateConfigUpdate, rev);
    }
    Cmd.OnRoomCreateConfigUpdateCmd_CS = OnRoomCreateConfigUpdateCmd_CS;
    /**请求赛事报名信息 */
    function OnEntryInfoEventMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.EntryInfoEvent, rev);
    }
    Cmd.OnEntryInfoEventMatchGroupCmd_S = OnEntryInfoEventMatchGroupCmd_S;
    /**转账数据更新 */
    function OnTransitMoneyQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.TransitMoneyQueryClub, rev);
    }
    Cmd.OnTransitMoneyQueryClubCmd_CS = OnTransitMoneyQueryClubCmd_CS;
    /**俱乐部牌局更新 */
    function OnGameUpdateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UpdataClubGame, rev);
    }
    Cmd.OnGameUpdateClubCmd_CS = OnGameUpdateClubCmd_CS;
    /**
    * 获取奖池数据
    */
    function OnJackpotItemListLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RETURN_JACKPITEMLIST, rev);
    }
    Cmd.OnJackpotItemListLobbyCmd_S = OnJackpotItemListLobbyCmd_S;
    /**
    * 刷新奖池总金额
    */
    function OnJackpotNumLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UPDATE_JACKPOTNUM, rev);
    }
    Cmd.OnJackpotNumLobbyCmd_S = OnJackpotNumLobbyCmd_S;
    /**向服务器发招商消息 */
    function OnRecruitAgentCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = MJLobby.NetConsts.SUCCESS;
        }
        if (rev.resultCode == MJLobby.NetConsts.SUCCESS) {
            dispatch(MJLobby.MahJongLobbyFacadeConsts.AGENT_SUCCESS, rev);
        }
    }
    Cmd.OnRecruitAgentCmd_CS = OnRecruitAgentCmd_CS;
    /** 账号绑定其他登录方式*/
    function OnBindAccountLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BIND_ACCOUNT_LOBBY, rev);
    }
    Cmd.OnBindAccountLobbyCmd_S = OnBindAccountLobbyCmd_S;
    /** 验证指定验证码*/
    function OnVerifyIdentifyCodeLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.VERIFY_IDENTIFY_CODE, rev);
    }
    Cmd.OnVerifyIdentifyCodeLobbyCmd_S = OnVerifyIdentifyCodeLobbyCmd_S;
    /** 账号获取邮箱验证*/
    function OnGetGuestBindEmailIdentifyCodeLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GET_EMAIL_CODE, rev);
    }
    Cmd.OnGetGuestBindEmailIdentifyCodeLobbyCmd_S = OnGetGuestBindEmailIdentifyCodeLobbyCmd_S;
    /** 账号绑定邮箱*/
    function OnGuestBindEmailLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BIND_EMAIL_LOBBY, rev);
    }
    Cmd.OnGuestBindEmailLobbyCmd_S = OnGuestBindEmailLobbyCmd_S;
    /** 设置俱乐部税收*/
    function OnSetTaxMatchGroupCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.SET_CLUB_TAX, rev);
    }
    Cmd.OnSetTaxMatchGroupCmd_S = OnSetTaxMatchGroupCmd_S;
    /** bashi加入俱乐部*/
    function OnBSClubJoinCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubJoinCmd_CS, rev);
    }
    Cmd.OnBSClubJoinCmd_CS = OnBSClubJoinCmd_CS;
    /** bashi退出俱乐部*/
    function OnBSClubExitCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubExitCmd_CS, rev);
    }
    Cmd.OnBSClubExitCmd_CS = OnBSClubExitCmd_CS;
    /** bashi登录俱乐部*/
    function OnBSClubLoginCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubLoginCmd_CS, rev);
    }
    Cmd.OnBSClubLoginCmd_CS = OnBSClubLoginCmd_CS;
    /** bashi俱乐部详情*/
    function OnBSClubInfoCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubInfoCmd_CS, rev);
    }
    Cmd.OnBSClubInfoCmd_CS = OnBSClubInfoCmd_CS;
    /** bashi创建俱乐部*/
    function OnBSClubCreateCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubCreateCmd_CS, rev);
    }
    Cmd.OnBSClubCreateCmd_CS = OnBSClubCreateCmd_CS;
    /** bashi管理俱乐部*/
    function OnBSClubManageCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubManageCmd_CS, rev);
    }
    Cmd.OnBSClubManageCmd_CS = OnBSClubManageCmd_CS;
    /** bashi俱乐部成员*/
    function OnBSClubMemberListCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubMemberListCmd_CS, rev);
    }
    Cmd.OnBSClubMemberListCmd_CS = OnBSClubMemberListCmd_CS;
    /** bashi俱乐部成员查找*/
    function OnBSClubMemberFindCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubMemberFindCmd_CS, rev);
    }
    Cmd.OnBSClubMemberFindCmd_CS = OnBSClubMemberFindCmd_CS;
    /** bashi赠送金币*/
    function OnBSClubGiftGoldCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubGiftGoldCmd_CS, rev);
    }
    Cmd.OnBSClubGiftGoldCmd_CS = OnBSClubGiftGoldCmd_CS;
    /** bashi使用礼卷*/
    function OnBSClubUseCouponCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubUseCouponCmd_CS, rev);
    }
    Cmd.OnBSClubUseCouponCmd_CS = OnBSClubUseCouponCmd_CS;
    /**查询俱乐部总战绩 */
    function OnStatisticsRoomLabelQueryCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.StatisticsRoomLabelQuery, rev);
    }
    Cmd.OnStatisticsRoomLabelQueryCmd_CS = OnStatisticsRoomLabelQueryCmd_CS;
    /**数据更新通知 */
    function OnDataUpdateNotifyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.DataUpdateNotify, rev);
    }
    Cmd.OnDataUpdateNotifyCmd_S = OnDataUpdateNotifyCmd_S;
    /**大厅所有游戏在线人数 */
    function OnAllGamePlayerOnlineNumberLobby_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AllGamePlayerOnlineNumberLobby_CS, rev);
    }
    Cmd.OnAllGamePlayerOnlineNumberLobby_CS = OnAllGamePlayerOnlineNumberLobby_CS;
    /**俱乐部成员跟新 */
    function OnMemberUpdateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ClubMemberUpdate, rev);
    }
    Cmd.OnMemberUpdateClubCmd_CS = OnMemberUpdateClubCmd_CS;
    /**俱乐部申请更新 */
    function OnApplicantUpdateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ClubApplicationUpdate, rev);
    }
    Cmd.OnApplicantUpdateClubCmd_CS = OnApplicantUpdateClubCmd_CS;
    /**转账更新 */
    function OnTransitMoneyDealClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.TransitMoneyDealClub, rev);
    }
    Cmd.OnTransitMoneyDealClubCmd_CS = OnTransitMoneyDealClubCmd_CS;
    /**奖池抽奖结果返回*/
    function OnGetJackpotItemLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnJackpotItem, rev);
    }
    Cmd.OnGetJackpotItemLobbyCmd_S = OnGetJackpotItemLobbyCmd_S;
    /**奖池排行榜返回*/
    function OnJackpotOrderLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnJackpotOrder, rev);
    }
    Cmd.OnJackpotOrderLobbyCmd_S = OnJackpotOrderLobbyCmd_S;
    /**红点移除通知 */
    function OnRemoveRedPointLobbyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RemoveRedPointEvent, rev);
    }
    Cmd.OnRemoveRedPointLobbyCmd_CS = OnRemoveRedPointLobbyCmd_CS;
    /**俱乐部公告 */
    function OnClubNoticeMatchGroupCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CLUB_NOTICE, rev);
    }
    Cmd.OnClubNoticeMatchGroupCmd_CS = OnClubNoticeMatchGroupCmd_CS;
    /**查找指定玩家 */
    function OnUserInfoSearchLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.USERINFO_SEARCH, rev);
    }
    Cmd.OnUserInfoSearchLobbyCmd_S = OnUserInfoSearchLobbyCmd_S;
    /**俱乐部指定玩家 */
    function OnMemberInfoGetClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CLUB_MEMBER, rev);
        MJLobby.MJLobbyData.getInstance().clubInfo = rev;
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "clubInfo");
    }
    Cmd.OnMemberInfoGetClubCmd_CS = OnMemberInfoGetClubCmd_CS;
    /**俱乐部创建者 */
    function OnFounderInfoUpdateClubCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.CLUB_FOUNDER, rev);
    }
    Cmd.OnFounderInfoUpdateClubCmd_S = OnFounderInfoUpdateClubCmd_S;
    /**牌局消息处理结果 */
    function OnGameMessageDealCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GAME_MSG_DEAL, rev);
    }
    Cmd.OnGameMessageDealCmd_CS = OnGameMessageDealCmd_CS;
    /**绑定代理提示*/
    function OnRequestBindAgentMatchGroupCmd_S(rev) {
        // let matchId = rev.matchId;
        // let agentId = rev.agentId;
        function sureFun() {
            var req = new Cmd.EnquireBindAgent2LobbyCmd_C();
            req.higherAgent = rev.agentId;
            MJLobby.NetMgr.tcpSend(req);
        }
        MJLobby.LobbyPopupManager.showConfirmPanel("是否与俱乐部主绑定代理关系?领取奖励。", ["确定", "取消"], [sureFun], "", this);
    }
    Cmd.OnRequestBindAgentMatchGroupCmd_S = OnRequestBindAgentMatchGroupCmd_S;
    /**新牌局消息通知 */
    function OnGameMessageNotifyUpdateCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GameMessageNotifyUpdate, rev);
        MJLobby.MJLobbyData.getInstance().gameMessageNotify = rev;
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "GameMessageNotifyUpdate");
    }
    Cmd.OnGameMessageNotifyUpdateCmd_CS = OnGameMessageNotifyUpdateCmd_CS;
    /**新牌局消息 */
    function OnGameMessageUpdateCmd_CS(rev) {
        MJLobby.MJLobbyData.getInstance().setPlayRequestList(rev);
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GameMessageUpdate, rev);
    }
    Cmd.OnGameMessageUpdateCmd_CS = OnGameMessageUpdateCmd_CS;
    /**检查能否转账 */
    function OnBSClubCanTransferCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubCanTransferCmd_CS, rev);
    }
    Cmd.OnBSClubCanTransferCmd_CS = OnBSClubCanTransferCmd_CS;
    /**使用点卡 */
    function OnBSClubUseCardCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.BSClubUseCardCmd_CS, rev);
    }
    Cmd.OnBSClubUseCardCmd_CS = OnBSClubUseCardCmd_CS;
    /**系统设置 */
    function OnSystemSettingsLobbyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.SystemSettingsLobbyCmd_CS, rev);
    }
    Cmd.OnSystemSettingsLobbyCmd_CS = OnSystemSettingsLobbyCmd_CS;
    /**俱乐部货币兑换 */
    function OnExchangeMoneyClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ExchangeMoneyClub, rev);
    }
    Cmd.OnExchangeMoneyClubCmd_CS = OnExchangeMoneyClubCmd_CS;
    /**赠送金币回复 */
    function OnExchangeCoinLobby_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ExchangeCoinLobby_S, rev);
    }
    Cmd.OnExchangeCoinLobby_S = OnExchangeCoinLobby_S;
    /**查看牌谱 */
    function OnRoundRecordCheckCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RoundRecordCheck, rev);
        MJLobby.MJLobbyData.getInstance().roundRecordCheck = rev;
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "RoundRecordCheck");
    }
    Cmd.OnRoundRecordCheckCmd_CS = OnRoundRecordCheckCmd_CS;
    /**房间结算数据 */
    function OnStatisticsRoomDataCheckCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.StatisticsRoomDataCheck, rev);
    }
    Cmd.OnStatisticsRoomDataCheckCmd_CS = OnStatisticsRoomDataCheckCmd_CS;
    /**牌局生成器通知 */
    function OnRoomGeneratorUpdateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.RoomGeneratorUpdateClub, rev);
    }
    Cmd.OnRoomGeneratorUpdateClubCmd_CS = OnRoomGeneratorUpdateClubCmd_CS;
    /**查找昵称回复 */
    function OnGetUserNickNameLobby_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GetUserNickNameLobby_S, rev);
    }
    Cmd.OnGetUserNickNameLobby_S = OnGetUserNickNameLobby_S;
    /**玩家赠送金币信息 */
    function OnGetUserGiftCoinInfoLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.GetUserGiftCoinInfoLobbyCmd_S, rev);
    }
    Cmd.OnGetUserGiftCoinInfoLobbyCmd_S = OnGetUserGiftCoinInfoLobbyCmd_S;
    /**返回购买历史*/
    function OnReturnOrderListLobbyCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.ReturnOrderList, rev);
    }
    Cmd.OnReturnOrderListLobbyCmd_S = OnReturnOrderListLobbyCmd_S;
    /**历史数据更新（大厅）*/
    function OnHistoryUpdateLobbyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.HistoryUpdateLobbyCmd_CS, rev);
    }
    Cmd.OnHistoryUpdateLobbyCmd_CS = OnHistoryUpdateLobbyCmd_CS;
    /**玩家游戏历史数据更新（大厅）*/
    function OnUserGameHistoryUpdateLobbyCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UserGameHistoryUpdateLobbyCmd_CS, rev);
    }
    Cmd.OnUserGameHistoryUpdateLobbyCmd_CS = OnUserGameHistoryUpdateLobbyCmd_CS;
    /**刷新比赛场游戏内排名数据*/
    function OnMyOrderEventMatchGroupCmd_S(rev) {
        uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, { data: rev });
    }
    Cmd.OnMyOrderEventMatchGroupCmd_S = OnMyOrderEventMatchGroupCmd_S;
    function OnTransitMoneyClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.TransitMoneyClub, rev);
    }
    Cmd.OnTransitMoneyClubCmd_CS = OnTransitMoneyClubCmd_CS;
    /**设置俱乐部管理员 */
    function OnPostUpdateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.PostUpdateClub, rev);
    }
    Cmd.OnPostUpdateClubCmd_CS = OnPostUpdateClubCmd_CS;
    /**上下级代理关系 */
    function OnAgentRelationLineQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AgentRelationLineQueryClub, rev);
    }
    Cmd.OnAgentRelationLineQueryClubCmd_CS = OnAgentRelationLineQueryClubCmd_CS;
    /* 查询俱乐部成员 */
    function OnAgentAvailableGiveMemberQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AgentAvailableGiveMemberQueryClub, rev);
    }
    Cmd.OnAgentAvailableGiveMemberQueryClubCmd_CS = OnAgentAvailableGiveMemberQueryClubCmd_CS;
    /* 修改代理信用值 */
    function OnAgentCreditChangeClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AgentCreditChangeClub, rev);
    }
    Cmd.OnAgentCreditChangeClubCmd_CS = OnAgentCreditChangeClubCmd_CS;
    /* 创建联盟 */
    function OnUnionCreateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionCreateClub, rev);
    }
    Cmd.OnUnionCreateClubCmd_CS = OnUnionCreateClubCmd_CS;
    /* 加入联盟 */
    function OnUnionJoinRequestClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionJoinRequestClub, rev);
    }
    Cmd.OnUnionJoinRequestClubCmd_CS = OnUnionJoinRequestClubCmd_CS;
    /* 编辑联盟 */
    function OnUnionEditClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionEditClub, rev);
    }
    Cmd.OnUnionEditClubCmd_CS = OnUnionEditClubCmd_CS;
    /* 更新联盟 */
    function OnUnionUpdateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionUpdateClud, rev);
    }
    Cmd.OnUnionUpdateClubCmd_CS = OnUnionUpdateClubCmd_CS;
    /* 更新联盟申请人 */
    function OnUnionApplicantUpdateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionApplicantUpdateClub, rev);
    }
    Cmd.OnUnionApplicantUpdateClubCmd_CS = OnUnionApplicantUpdateClubCmd_CS;
    /* 更新联盟申请人 */
    function OnUnionMemberUpdateClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionMemberUpdateClub, rev);
    }
    Cmd.OnUnionMemberUpdateClubCmd_CS = OnUnionMemberUpdateClubCmd_CS;
    /* 联盟基金修改 */
    function OnUnionFundInfoUpdateCmd_S(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionFundInfoUpdate, rev);
    }
    Cmd.OnUnionFundInfoUpdateCmd_S = OnUnionFundInfoUpdateCmd_S;
    /* 联盟基金修改 */
    function OnUnionFundDistributeQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionFundDistributeQueryClub, rev);
    }
    Cmd.OnUnionFundDistributeQueryClubCmd_CS = OnUnionFundDistributeQueryClubCmd_CS;
    /* 联盟房间数据查询 */
    function OnUnionStatisticsRoomQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionStatisticsRoomQueryClub, rev);
    }
    Cmd.OnUnionStatisticsRoomQueryClubCmd_CS = OnUnionStatisticsRoomQueryClubCmd_CS;
    /* 联盟总数局查询 */
    function OnUnionStatisticsSumQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.UnionStatisticsSumQueryClub, rev);
    }
    Cmd.OnUnionStatisticsSumQueryClubCmd_CS = OnUnionStatisticsSumQueryClubCmd_CS;
    /* 代理房间数据查询 */
    function OnAgentStatisticsRoomQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AgentStatisticsRoomQueryClub, rev);
    }
    Cmd.OnAgentStatisticsRoomQueryClubCmd_CS = OnAgentStatisticsRoomQueryClubCmd_CS;
    // 查询俱乐部成员牌局总数据
    function OnMemberGameDataSumClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MemberGameDataSumClub, rev);
    }
    Cmd.OnMemberGameDataSumClubCmd_CS = OnMemberGameDataSumClubCmd_CS;
    // 查询俱乐部成员
    function OnMemberQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.MemberQueryClub, rev);
    }
    Cmd.OnMemberQueryClubCmd_CS = OnMemberQueryClubCmd_CS;
    // 查询代理信用记录
    function OnAgentCreditChangeQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AgentCreditChangeQueryClub, rev);
    }
    Cmd.OnAgentCreditChangeQueryClubCmd_CS = OnAgentCreditChangeQueryClubCmd_CS;
    // 查询代理信用记录
    function OnAgentStatisticsRoomCheckClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AgentStatisticsRoomCheckClub, rev);
    }
    Cmd.OnAgentStatisticsRoomCheckClubCmd_CS = OnAgentStatisticsRoomCheckClubCmd_CS;
    function OnAgentAvailableUplineQueryClubCmd_CS(rev) {
        dispatch(MJLobby.MahJongLobbyFacadeConsts.AgentAvailableUplineQueryClub, rev);
    }
    Cmd.OnAgentAvailableUplineQueryClubCmd_CS = OnAgentAvailableUplineQueryClubCmd_CS;
})(Cmd || (Cmd = {}));
var Pmd;
(function (Pmd) {
    function OnCreatePlatOrderReturnSdkPmd_S(rev) {
        Cmd.trace(rev, "返回：订单号，CreatePlatOrderReturnSdkPmd_S");
        MJLobby.LobbyPopupManager.showMildWarnShow("获取订单号成功，等待支付");
        uniLib.UIMgr.instance.hideLoading(LoadSecondPanel, "recharge");
        if (rev.result != 0) {
            if (rev.result == 2)
                MJLobby.LobbyPopupManager.showMildWarnShow("今日已达最大充值限额(3千)");
            else
                MJLobby.LobbyPopupManager.showMildWarnShow("下订单失败!");
            return;
        }
        /**江西客家特殊 */
        // if (uniLib.Global.is_sandbox == 0 && MJLobby.MJLobbyData.getInstance().lobbyId == 7) {
        //     if(uniLib.Utils.isIOS()){
        //         //uniLib.ZQGameSdk.openWeb(rev.redirecturl);
        //     }else{
        //     uniLib.PayMgr.Instance.payByPmd(rev);
        //     }
        //     return true;
        // }
        var lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
        //象山支付
        if (uniLib.Global.is_sandbox == 0 && (lobbyId == 1050 || lobbyId == 1021 || lobbyId == 1019 || lobbyId == 1023 || lobbyId == 1002 || lobbyId == 1033 || lobbyId == 7)) {
            if (uniLib.Global.isH5) {
                window.location.href = rev.redirecturl;
            }
            else if (lobbyId == 1050 || lobbyId == 1033)
                uniLib.ZQGameSdk.openWeb(rev.redirecturl, uniLib.WEBMODEL.EXPLORER);
            else if (uniLib.Utils.isIOS()) {
                uniLib.ZQGameSdk.openWeb(rev.redirecturl);
            }
            else {
                if (lobbyId == 7) {
                    uniLib.PayMgr.Instance.payByPmd(rev);
                    return;
                }
                function requestCallBack(result) {
                    var xmlNode = egret.XML.parse(result);
                    var item1 = xmlNode.children[0];
                    var item2 = item1.children[0];
                    var resultStatue = item2.attributes.value;
                    var msg = "支付失败";
                    if (resultStatue == 1) {
                        msg = "支付成功";
                    }
                    else if (resultStatue == 4) {
                        msg = "交易进行中";
                    }
                    MJLobby.LobbyPopupManager.showMildWarnShow(msg);
                }
                function payBack() {
                    var reqPayStatus = new uniLib.HttpRequest(requestCallBack, null, this);
                    var merchant_id = 1257;
                    var three_trade_no = rev.platorder;
                    var key = "c9b387874eb1c3f811e9e833f968aac9";
                    var signstr = "merchant_id=" + merchant_id + "&three_trade_no=" + three_trade_no + "&key=" + key;
                    var sign = uniLib.StringUtils.MD5(signstr).toUpperCase();
                    var url = "https://api.tongle.net/gateway/Querypay/ThreePayStatus.aspx?merchant_id=" + merchant_id + "&three_trade_no=" + three_trade_no + "&sign=" + sign;
                    console.error(url);
                    reqPayStatus.open(url);
                    reqPayStatus.send("url");
                }
                uniLib.PayMgr.Instance.payByPmd(rev, payBack, this);
                return;
            }
        }
        var payInfo = {};
        payInfo.platOrder = rev.platorder;
        payInfo.gameOrder = rev.gameorder;
        var goodVo = MJLobby.LobbyUtils.getGoodNameByShopId(rev.goodid);
        payInfo.goodName = goodVo.goodName;
        payInfo.currencyName = goodVo.goodDesc;
        payInfo.price = rev.ordermoney;
        // if (MJLobby.MJLobbyData.getInstance().lobbyId == MJLobby.LobbyIdConsts.FUJIAN_MAHJONG) {
        if (MJLobby.LobbyDataCache.bundleInfo && MJLobby.LobbyDataCache.bundleInfo.goods_type) {
            payInfo.goodId = "9020_" + MJLobby.LobbyDataCache.bundleInfo.goods_type + "_" + rev.goodid;
        }
        else {
            payInfo.goodId = rev.appgoodid;
        }
        if (MJLobby.MJLobbyData.getInstance().lobbyId == 24) {
            if (uniLib.Utils.isIOS()) {
                payInfo.goodId = "9020_" + MJLobby.LobbyDataCache.bundleInfo.goods_type + "_" + rev.goodid;
            }
            else {
                payInfo.goodId = rev.appgoodid;
            }
        }
        // } else {
        //     payInfo.goodId = rev.appgoodid;
        // }
        // payInfo.goodId = rev.goodid.toString();
        payInfo.payUrl = rev.redirecturl;
        payInfo.noticeurl = rev.noticeurl;
        payInfo.payplatid = rev.payplatid.toString();
        if (rev.sign) {
            payInfo.sign = rev.sign;
        }
        if (rev.extdata) {
            payInfo.sign = rev.extdata;
        }
        // if (Number(uniLib.Global.platInfo.platid) == 1) {
        //     payInfo.uid = uniLib.Global.platInfo.uid;
        // } else {
        //     payInfo.uid = String(MJLobby.MJLobbyInfo.userId);
        // }
        payInfo.uid = uniLib.NetMgr.getThirdPlatId();
        if (rev.createtime) {
            payInfo.creatTime = Number(rev.createtime);
        }
        else {
            payInfo.creatTime = new Date().getTime();
        }
        if (rev.goodnum) {
            payInfo.count = rev.goodnum;
        }
        MJLobby.MJLobbyData.lastOrder = payInfo;
        uniLib.Console.log("order success,gameOrder:" + JSON.stringify(payInfo));
        uniLib.PayMgr.Instance.pay(payInfo, function (dat) {
            uniLib.Console.log("start serch order:" + dat);
            if (dat.code == 0) {
                var msg = new Pmd.RechargeQueryRequestIOSSdkPmd_C();
                msg.gameorder = MJLobby.MJLobbyData.lastOrder.gameOrder;
                msg.originalmoney = MJLobby.MJLobbyData.lastOrder.price;
                msg.roleid = MJLobby.NetMgr.UID;
                msg.ordermoney = MJLobby.MJLobbyData.lastOrder.price;
                msg.token = MJLobby.MJLobbyData.lastOrder.sign;
                if (dat.data && dat.data.paytoken)
                    msg.token = dat.data.paytoken;
                msg.extdata = rev.data.extdata;
                if (uniLib.Global.payPlatId != 0) {
                    msg.payplatid = Number(MJLobby.MJLobbyData.lastOrder.payplatid);
                }
                else {
                    msg.payplatid = (uniLib.Global.platInfo.platid == Pmd.PlatType.PlatType_Normal ? Pmd.PlatType.PlatType_AiBei : uniLib.Global.platInfo.platid);
                }
                MJLobby.NetMgr.tcpSend(msg);
            }
        });
        return true;
    }
    Pmd.OnCreatePlatOrderReturnSdkPmd_S = OnCreatePlatOrderReturnSdkPmd_S;
    function OnNotifyRechargeRequestSdkPmd_S(rev) {
        Cmd.trace(rev, "支付成功返回，NotifyRechargeRequestSdkPmd_S");
        MJLobby.LobbyPopupManager.showMildWarnShow("充值成功");
        uniLib.UserInfo.chips = Number(rev.extdata);
        Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.COIN_FIRSTRECHARGE, rev.goodid);
    }
    Pmd.OnNotifyRechargeRequestSdkPmd_S = OnNotifyRechargeRequestSdkPmd_S;
})(Pmd || (Pmd = {}));
onerror = function (message, filename, lineno, colno, error) {
    var str = "大厅异常捕获:gameid:" + uniLib.Global.gameId + ":lobbyid:" + uniLib.Global.lobbyGameId +
        "\nerror " + "{message:" + message + "; filename:" + filename + "; lineno:" + lineno + "; colno:" + colno + "}";
    uniLib.Console.error(str);
    if (uniLib["DebugView"]) {
        uniLib["DebugView"].Instance.addLog(str);
    }
    var msg = new Cmd.ClientErrorLogToServerLobbyCmd_C();
    msg.gameid = uniLib.Global.gameId;
    msg.log = str;
    MJLobby.NetMgr.tcpSend(msg);
};

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     * 启动命令
     */
    var LobbyStartUpCommand = (function (_super) {
        __extends(LobbyStartUpCommand, _super);
        function LobbyStartUpCommand() {
            _super.call(this);
        }
        LobbyStartUpCommand.prototype.init = function () {
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(MJLobby.MahJongLobbyFacadeConsts.STARTUP, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(MJLobby.MahJongLobbyFacadeConsts.SHOW_LOBBY, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(MJLobby.MahJongLobbyFacadeConsts.JOIN_VIDEOROOM, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(MJLobby.MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM, this.onEventHandle, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_G2L, this.getLastGameId, this);
        };
        LobbyStartUpCommand.prototype.destory = function () {
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(MJLobby.MahJongLobbyFacadeConsts.STARTUP, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(MJLobby.MahJongLobbyFacadeConsts.SHOW_LOBBY, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(MJLobby.MahJongLobbyFacadeConsts.JOIN_VIDEOROOM, this.onEventHandle, this);
            MJLobby.MJLobbyEventListener.getInstance().removeEventListener(MJLobby.MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM, this.onEventHandle, this);
        };
        LobbyStartUpCommand.prototype.onEventHandle = function (evt) {
            switch (evt.type) {
                case MJLobby.MahJongLobbyFacadeConsts.STARTUP:
                    this.initController();
                    this.initProxy();
                    if (MJLobby.MJLobbyData.getInstance().myBaseInfo) {
                        this.initMediator();
                    }
                    this.sendNotification(MJLobby.MahJongLobbyFacadeConsts.SEND_DATA, null, MJLobby.LobbyDataRequestCommand.CONNECT_GAME_SERVER);
                    MJLobby.MessageQueue.Instance.call();
                    break;
                case MJLobby.MahJongLobbyFacadeConsts.SHOW_LOBBY:
                    this.initMediator();
                    break;
                case MJLobby.MahJongLobbyFacadeConsts.JOIN_ROOM:
                    if (!MJLobby.MJLobbyInfo.userId)
                        return;
                    MJLobby.MJLobbyData.getInstance().hasShowGame = true;
                    MJLobby.MJLobbyData.getInstance().weijuMsg = null;
                    MJLobby.MJLobbyData.getInstance().autoShowRedpacket = 0;
                    MJLobby.MJLobbyData.getInstance().getIP(); //加入房间的时候获取一下ip
                    MJLobby.MJLobbyData.getInstance().continueObj = null;
                    var joinVo = evt.data;
                    if (uniLib.Global.isInGame && (MJLobby.MJLobbyData.getInstance().lobbyId == 24 || joinVo.scene)) {
                        return;
                    }
                    MJLobby.MJLobbyData.getInstance().everyFirstLogin = false;
                    MJLobby.MJLobbyMatchData.getInstance().isEnroll = false;
                    MJLobby.MJLobbyData.getInstance().video = 0;
                    MJLobby.MJLobbyData.getInstance().curGameId = joinVo.gameId;
                    joinVo.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
                    joinVo.gameGatewayUrl = MJLobby.MJLobbyData.getInstance().gameGatewayUrl;
                    var lobbyConfig = MJLobby.MJLobbyData.getInstance().getLobbyConfig();
                    if (lobbyConfig.hasOwnProperty("lobbyMahjongSourceName")) {
                        joinVo.mjResName = lobbyConfig["lobbyMahjongSourceName"];
                    }
                    else {
                        joinVo.mjResName = "";
                    }
                    if (lobbyConfig.hasOwnProperty("lobbyDiamond")) {
                        joinVo.minLeaveRoomDiamond = lobbyConfig["lobbyDiamond"];
                    }
                    else {
                        joinVo.minLeaveRoomDiamond = 100;
                    }
                    var gameData = MJLobby.MJLobbyData.getConfigByGameId(joinVo.gameId);
                    gameData.showBack = true;
                    gameData.extData = joinVo;
                    gameData.destroyResOnExit = true;
                    gameData.defaultOrientation = egret.OrientationMode.LANDSCAPE;
                    var zoneInfo = new Pmd.ZoneInfo();
                    zoneInfo.zoneid = joinVo.zoneId;
                    zoneInfo.gameid = joinVo.gameId;
                    MJLobby.MJLobbyData.getInstance().continueObj = null;
                    if (joinVo.shareInfo) {
                        var webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl;
                        if ((webpageUrl == null || webpageUrl == "") && MJLobby.LobbyDataCache.bundleInfo && MJLobby.LobbyDataCache.bundleInfo.weixin && MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid) {
                            var nick = MJLobby.MJLobbyData.getInstance().myBaseInfo.nickName;
                            if (nick.length > 8) {
                                nick = nick.slice(0, 8);
                            }
                            if (!joinVo.matchId) {
                                if (lobbyConfig.hasOwnProperty("newLink") && lobbyConfig["newLink"] != "") {
                                    joinVo.shareInfo.webPageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://" + lobbyConfig["newLink"] + "/addons/zqgame/gameshare.php?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(MJLobby.MJLobbyData.getInstance().myBaseInfo.uid + "|" + joinVo.roomId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                                }
                                else {
                                    joinVo.shareInfo.webPageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wx.zqgame.com/addons/zqgame/gameshare.php?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(MJLobby.MJLobbyData.getInstance().myBaseInfo.uid + "|" + joinVo.roomId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                                }
                            }
                            else {
                                if (lobbyConfig.hasOwnProperty("newLink") && lobbyConfig["newLink"] != "") {
                                    joinVo.shareInfo.webPageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://" + lobbyConfig["newLink"] + "/addons/zqgame/gameshare.php?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(MJLobby.MJLobbyData.getInstance().myBaseInfo.uid + "|" + joinVo.matchId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                                }
                                else {
                                    joinVo.shareInfo.webPageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wx.zqgame.com/addons/zqgame/gameshare.php?appid=" + MJLobby.LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(MJLobby.MJLobbyData.getInstance().myBaseInfo.uid + "|" + joinVo.matchId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                                }
                            }
                        }
                        else {
                            joinVo.shareInfo.webPageUrl = webpageUrl + "?uid=" + MJLobby.MJLobbyData.getInstance().myBaseInfo.uid + "&nickName=" + MJLobby.MJLobbyData.getInstance().myBaseInfo.nickName;
                        }
                    }
                    gameData.zoneInfo = zoneInfo;
                    // var isIntoGame = joinVo.is
                    if (gameData) {
                        uniLib.GameModuleUtils.ExitGame(false);
                        // if(MJLobbyData.getInstance().lobbyId==LobbyIdConsts.GUIZHOU_MAHJONG){
                        //     uniLib.UIMgr.instance.showProcessBar(null, 97, 100, "加载游戏，请稍后...", "", true);
                        // }else{
                        uniLib.UIMgr.instance.showProcessBar(null, 1, 100, "加载游戏，请稍后...", "", true);
                        // }
                        if (MJLobby.MJLobbyData.getInstance().mahjongLoading) {
                            uniLib.GameModuleUtils.LoadGame(gameData.gameCodeUrl, gameData.gameDoc, gameData, null, MJLobby.MJLobbyData.getInstance().mahjongLoading, function () { });
                        }
                        else {
                            uniLib.GameModuleUtils.LoadGame(gameData.gameCodeUrl, gameData.gameDoc, gameData, null, function () { });
                        }
                    }
                    break;
                case MJLobby.MahJongLobbyFacadeConsts.JOIN_VIDEOROOM:
                    MJLobby.MJLobbyData.getInstance().continueObj = null;
                    var joinVo = evt.data;
                    MJLobby.MJLobbyData.getInstance().curGameId = joinVo.gameId;
                    joinVo.video = 1;
                    joinVo.videoUid = MJLobby.MJLobbyData.getInstance().videoUID;
                    joinVo.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
                    MJLobby.MJLobbyData.getInstance().video = 1;
                    var gameData = MJLobby.MJLobbyData.getConfigByGameId(joinVo.gameId);
                    gameData.showBack = true;
                    gameData.extData = joinVo;
                    gameData.destroyResOnExit = true;
                    gameData.defaultOrientation = egret.OrientationMode.LANDSCAPE;
                    if (gameData) {
                        uniLib.GameModuleUtils.ExitGame(false);
                        // if(MJLobbyData.getInstance().lobbyId==LobbyIdConsts.GUIZHOU_MAHJONG){
                        //     uniLib.UIMgr.instance.showProcessBar(null, 97, 100, "加载游戏，请稍后...", "", true);
                        // }else{
                        uniLib.UIMgr.instance.showProcessBar(null, 1, 100, "加载游戏，请稍后...", "", true);
                        // }
                        uniLib.GameModuleUtils.LoadGame(gameData.gameCodeUrl, gameData.gameDoc, gameData, null, function () { });
                    }
                    uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_G2L, this.gameStart, this);
                    break;
                case MJLobby.MahJongLobbyFacadeConsts.JOIN_HUNDRE_ROOM:
                    MJLobby.MJLobbyData.getInstance().continueObj = null;
                    var data = evt.data;
                    MJLobby.MJLobbyData.getInstance().curGameId = data.gameId;
                    var vo = new MJLobby.JoinRoomVo();
                    vo.gameId = data.gameId;
                    vo.zoneId = data.zoneId;
                    vo.subGameId = 1; //百人牛牛专用
                    vo.roomType = 4; //百人牛牛专用
                    vo.fish_type = 0;
                    vo.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
                    var gameData = MJLobby.MJLobbyData.getConfigByGameId(vo.gameId);
                    gameData.showBack = true;
                    if (uniLib.Global.is_sandbox == 1) {
                        gameData.showBack = false;
                    }
                    gameData.extData = vo;
                    gameData.destroyResOnExit = true;
                    gameData.defaultOrientation = egret.OrientationMode.LANDSCAPE;
                    var zoneInfo = new Pmd.ZoneInfo();
                    zoneInfo.zoneid = vo.zoneId;
                    zoneInfo.gameid = vo.gameId;
                    gameData.zoneInfo = zoneInfo;
                    if (gameData) {
                        if (!MJLobby.MJLobbyData.getInstance().isHaoCai()) {
                            uniLib.GameModuleUtils.ExitGame(false);
                            uniLib.UIMgr.instance.showProcessBar(null, 1, 100, "加载游戏，请稍后...", "", true);
                        }
                        uniLib.GameModuleUtils.LoadGame(gameData.gameCodeUrl, gameData.gameDoc, gameData, MJLobby.MJLobbyData.getInstance().sceneLoading, function () { }, this, false);
                    }
                    break;
            }
        };
        LobbyStartUpCommand.prototype.gameStart = function (evt) {
            var video = new MJLobby.VideoStartUp();
            if (evt.param == VideoConsts.MAHJONG
                || evt.param == VideoConsts.SSH
                || evt.param == VideoConsts.OLD_PDK
                || evt.param == VideoConsts.DDZ
                || evt.param == VideoConsts.NIUNIU
                || evt.param == VideoConsts.NEW_PDK) {
                video.start(evt.param);
            }
        };
        LobbyStartUpCommand.prototype.getLastGameId = function (evt) {
            if (evt.param.hasOwnProperty("gameId")) {
                MJLobby.MJLobbyData.getInstance().lastGameId = evt.param["gameId"];
            }
        };
        LobbyStartUpCommand.prototype.execute = function (notification) {
            var rootView = notification.getBody();
            this.initController();
            this.initProxy();
            this.initMediator();
        };
        LobbyStartUpCommand.prototype.initController = function () {
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.SEND_DATA,LobbyDataRequestCommand);
            // this.facade.registerCommand(MahJongLobbyFacadeConsts.DESTORY,LobbyRemoveCommand);
            MJLobby.MahJongLobbyFacade.getLobbyInstance().registerCommand(MJLobby.MahJongLobbyFacadeConsts.SEND_DATA, new MJLobby.LobbyDataRequestCommand());
            MJLobby.MahJongLobbyFacade.getLobbyInstance().registerCommand(MJLobby.MahJongLobbyFacadeConsts.DESTORY, new MJLobby.LobbyRemoveCommand());
        };
        LobbyStartUpCommand.prototype.initMediator = function () {
            // var main:MJLobbyVc=new MJLobbyVc();
            // MJLobbyInfo.mainUILayer.addChild(main);
            var mainMediator = uniLib.getDefinitionByName(MJLobby.ViewConfig.mainMediatorName);
            MJLobby.ViewConfig.mainMediator = new mainMediator();
            MJLobby.MahJongLobbyFacade.getLobbyInstance().registerMediator(MJLobby.ViewConfig.mainMediator);
        };
        LobbyStartUpCommand.prototype.initProxy = function () {
            MJLobby.MahJongLobbyFacade.getLobbyInstance().registerProxy(new MJLobby.LobbyServerMJProxy());
        };
        return LobbyStartUpCommand;
    })(MJLobby.Command);
    MJLobby.LobbyStartUpCommand = LobbyStartUpCommand;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var VideoStartUp = (function () {
        function VideoStartUp() {
            /**播过的录像 */
            this._lookedVideo = [];
            /**json数组 */
            this._videoArr = [];
            this._stopVideo = false;
            this._lastTime = 0;
            this.isFirst = true;
            this.isAdvance = true;
            /**录像类型 0麻将 1十三水 2 跑得快 3斗地主 4 zqb牛牛 */
            this._videoType = VideoConsts.MAHJONG;
        }
        VideoStartUp.prototype.start = function (type) {
            if (type === void 0) { type = VideoConsts.MAHJONG; }
            if (!MJLobby.MJLobbyData.getInstance().videoData) {
                return;
            }
            this._videoType = type;
            this._lastTime = 0;
            this.isFirst = true;
            this.isAdvance = true;
            uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_G2L, this.onMoon, this);
            this._startTime = new Date().getTime();
            this._stopVideo = false;
            var videoJson = JSON.parse(MJLobby.MJLobbyData.getInstance().videoData);
            MJLobby.MJLobbyData.getInstance().videoUID = videoJson.bankerUid;
            for (var i = 0; i < videoJson.list.length; i++) {
                this._videoArr.push(videoJson.list[i]);
            }
            this._timer = new egret.Timer(100);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.videoStart, this);
            this._timer.start();
        };
        VideoStartUp.prototype.videoStart = function (evt) {
            var offsettime = new Date().getTime() - this._startTime;
            var len = this._videoArr.length;
            if (len == 0) {
                // uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G,"video_play_finish");
                this._timer.stop();
                return;
            }
            if (this.isFirst) {
                this.advanceVideo(0);
                this.isFirst = false;
            }
            if (this.isAdvance) {
                var msg1 = this._videoArr[0].msg;
                if (uniLib.Global.jsonCompress) {
                    if (this._videoArr[0].hasOwnProperty("msg"))
                        msg1 = JSON.stringify(uniLib.Global.DeCompress(JSON.parse(this._videoArr[0].msg)));
                    else
                        return;
                }
                var advanceCmd = ""; //快进的消息
                switch (this._videoType) {
                    case VideoConsts.MAHJONG:
                        advanceCmd = "Cmd.StartMahjongCmd_Brd";
                        break;
                    case VideoConsts.SSH:
                        advanceCmd = "Cmd.CompareCardRoomCmd_Brd";
                        break;
                    case VideoConsts.OLD_PDK:
                        advanceCmd = "Cmd.GameStart_Brd";
                        break;
                    case VideoConsts.DDZ:
                        advanceCmd = "Cmd.StartPokerCmd_Brd";
                        break;
                    case VideoConsts.NIUNIU:
                        advanceCmd = "Cmd.GameRoundStartCmd_Brd";
                        break;
                    case VideoConsts.NEW_PDK:
                        advanceCmd = "Cmd.StartRoundPokerCmd_Brd";
                        break;
                }
                if (msg1.indexOf(advanceCmd) != -1) {
                    this.isAdvance = false;
                }
                //poker类游戏
                if (msg1.indexOf("Cmd.RoomSeatUpdateCmd_S") != -1 ||
                    msg1.indexOf("Cmd.RoomDataUpdateCmd_S") != -1) {
                    if (this._timer.delay != 500)
                        this._timer.delay = 500;
                }
                this.advanceVideo(1);
                return;
            }
            for (var i = 0; i < len; i++) {
                if (Number(this._videoArr[0].time) <= offsettime) {
                    this.advanceVideo(0);
                }
            }
        };
        VideoStartUp.prototype.onMoon = function (evt) {
            switch (evt.param) {
                case "video_back":
                    MJLobby.LobbyPopupManager.showMildWarnShow("暂未开放，还在思考");
                    // this.backBtnVideo();
                    break;
                case "video_advance":
                    this.advanceVideo(1);
                    break;
                case "video_close":
                    this._timer.stop();
                    this.destory();
                    break;
                case "video_stop":
                    this.stopVideo();
                    break;
                case "video_replay":
                    this.resetVideo();
                    break;
            }
        };
        /**
         * 录像前进
         * num = 1代表手动前进  num = 0代表自动前进
         */
        VideoStartUp.prototype.advanceVideo = function (num) {
            if (!this._videoArr[0] || !this._videoArr[0].msg) {
                // uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G,"video_play_finish");
                this._timer.stop();
                return;
            }
            if (num == 1) {
                this._startTime -= this._videoArr[0].time - this._lastTime;
            }
            var msg1 = this._videoArr[0].msg;
            if (uniLib.Global.jsonCompress) {
                if (this._videoArr[0].hasOwnProperty("msg"))
                    msg1 = JSON.stringify(uniLib.Global.DeCompress(JSON.parse(this._videoArr[0].msg)));
                else
                    return;
            }
            var msg = JSON.parse(msg1);
            if (this._videoType == VideoConsts.MAHJONG) {
                if (msg1.indexOf("Cmd.SelfCardMahjongCmd_S") != -1
                    || msg1.indexOf("Cmd.SendCardMahjongCmd_S") != -1
                    || msg1.indexOf("Cmd.EnterMahjongCmd_Brd") != -1
                    || msg1.indexOf("Cmd.BarCardMahjongCmd_Brd") != -1
                    || msg1.indexOf("Cmd.EnsureLackOpCmd_S") != -1 //万开云定缺
                    || msg1.indexOf("Cmd.exChangeCardMahjongCmd_S") != -1 //万开云开局换牌
                    || msg1.indexOf("Cmd.ChangeCardDataMahjong_S") != -1) {
                    if (msg.data) {
                        msg.data.ownerid = this._videoArr[0].uid;
                    }
                    else {
                        this.advanceFunc();
                        return;
                    }
                }
                else if (msg1.indexOf("Cmd.EnterMahjongCmd_S") != -1 && this.checkMainUid(this._videoArr[0].uid)) {
                    return;
                }
                else if (msg1.indexOf("Cmd.FlowerMahjongCmd_Brd") != -1) {
                    if (msg.data && !msg.data.myCardSet && this._videoArr[0].uid != MJLobby.MJLobbyData.getInstance().videoUID) {
                        this.advanceFunc();
                        return;
                    }
                }
            }
            else if (this._videoType == VideoConsts.SSH) {
                if (msg1.indexOf("_Brd") != -1) {
                    if (msg.data) {
                        msg.data.ownerid = this._videoArr[0].uid;
                    }
                    else {
                        this.advanceFunc();
                        return;
                    }
                }
                else if (msg1.indexOf("Cmd.RoomEnterRoomCmd_S") != -1 && this.checkMainUid(this._videoArr[0].uid)) {
                    return;
                }
            }
            else if (this._videoType == VideoConsts.OLD_PDK) {
                if (msg1.indexOf("_Brd") != -1) {
                    if (msg.data) {
                        msg.data.ownerid = this._videoArr[0].uid;
                    }
                    else {
                        this.advanceFunc();
                        return;
                    }
                }
                else if (msg1.indexOf("Cmd.JoinRoomReq_S") != -1 && this.checkMainUid(this._videoArr[0].uid)) {
                    return;
                }
            }
            else if (this._videoType == VideoConsts.DDZ) {
                if (msg1.indexOf("_Brd") != -1
                    || msg1.indexOf("Cmd.SelfCardPokerCmd_S") != -1) {
                    if (msg.data) {
                        msg.data.ownerid = this._videoArr[0].uid;
                    }
                    else {
                        this.advanceFunc();
                        return;
                    }
                }
                else if ((msg1.indexOf("Cmd.EnterPokerCmd_S") != -1 || msg1.indexOf("Cmd.ddz_EnterPokerCmd_S") != -1) && this.checkMainUid(this._videoArr[0].uid)) {
                    return;
                }
            }
            else if (this._videoType == VideoConsts.NIUNIU) {
                if (msg1.indexOf("Cmd.GameDealCardCmd_Brd") != -1
                    || msg1.indexOf("Cmd.SortHandStartCmd_Brd") != -1) {
                    if (msg.data) {
                        msg.data.ownerid = this._videoArr[0].uid;
                    }
                    else {
                        this.advanceFunc();
                        return;
                    }
                }
                else if (msg1.indexOf("Cmd.PokerEnterRoomCmd_S") != -1 && this.checkMainUid(this._videoArr[0].uid)) {
                    return;
                }
            }
            else if (this._videoType == VideoConsts.NEW_PDK) {
                if (msg1.indexOf("_Brd") != -1 ||
                    msg1.indexOf("Cmd.DealSelfCardPokerCmd_S") != -1) {
                    if (msg.data) {
                        msg.data.ownerid = this._videoArr[0].uid;
                    }
                    else {
                        this.advanceFunc();
                        return;
                    }
                }
                else if ((msg1.indexOf("Cmd.EnterRoomPokerCmd_S") != -1) && this.checkMainUid(this._videoArr[0].uid)) {
                    return;
                }
            }
            uniLib.NetMgr.tcpSend(msg);
            this.advanceFunc();
        };
        /**过滤掉非主视角进房间消息 */
        VideoStartUp.prototype.checkMainUid = function (uid) {
            if (uid != MJLobby.MJLobbyData.getInstance().videoUID) {
                this.advanceFunc();
                return true;
            }
        };
        /**
        * 前进一步对数组数据进行操作
         */
        VideoStartUp.prototype.advanceFunc = function () {
            this._lastTime = this._videoArr[0].time;
            var oldData = this._videoArr[0];
            this._lookedVideo.push(oldData);
            this._videoArr.shift();
            this._timer.start();
        };
        VideoStartUp.prototype.backBtnVideo = function () {
            for (var i = this._lookedVideo.length - 1; i >= 0; i--) {
                var msg = this._lookedVideo[i].msg;
                if (uniLib.Global.jsonCompress) {
                    msg = JSON.stringify(uniLib.Global.DeCompress(JSON.parse(this._lookedVideo[i].msg)));
                }
                if (msg.indexOf("Cmd.OutCardMahjongCmd_Brd") != -1
                    || msg.indexOf("Cmd.SendCardMahjongCmd_S") != -1) {
                    var json = JSON.parse(this._lookedVideo[i].msg);
                    var req = new Cmd.RecallOneCardMahjongCmd_S();
                    if (json.data.uid && json.data.uid != 0) {
                        req.uid = json.data.uid;
                    }
                    else {
                        req.uid = this._lookedVideo[i].uid;
                    }
                    req.thisId = json.data.thisId;
                    uniLib.NetMgr.tcpSend(req);
                    // if(msg.indexOf("Cmd.OutCardMahjongCmd_S") != -1){
                    for (var j = this._lookedVideo.length - 1; j >= i; j--) {
                        this._videoArr.unshift(this._lookedVideo[j]);
                    }
                    this._lookedVideo.splice(i, this._lookedVideo.length - i);
                    this._pauseTime = new Date().getTime();
                    this._timer.stop();
                    this._stopVideo = true;
                    break;
                }
            }
        };
        VideoStartUp.prototype.stopVideo = function () {
            if (!this._stopVideo) {
                this._pauseTime = new Date().getTime();
                this._timer.stop();
                this._stopVideo = true;
            }
            else {
                this._startTime += new Date().getTime() - this._pauseTime;
                this._timer.start();
                this._stopVideo = false;
            }
        };
        VideoStartUp.prototype.resetVideo = function () {
            this._videoArr = [];
            this._videoArr.concat(this._lookedVideo);
            this._lookedVideo = [];
            this._startTime = new Date().getTime();
            this._timer.start();
        };
        VideoStartUp.prototype.destory = function () {
            this._videoArr = [];
            this._lookedVideo = [];
            if (this._timer) {
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.videoStart, this);
                this._timer.stop();
                this._timer = null;
            }
            uniLib.Global.removeEventListener(uniLib.ZqEvent.EVENT_G2L, this.onMoon, this);
        };
        return VideoStartUp;
    })();
    MJLobby.VideoStartUp = VideoStartUp;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 数据缓存
     */
    var LobbyDataCache = (function () {
        function LobbyDataCache() {
        }
        /**通过uid获取headURL */
        LobbyDataCache.getHeadUrlByUid = function (uid) {
            if (!this.headUrlList || this.headUrlList.length < 1) {
                this.headUrlList = [];
                return null;
            }
            for (var i = 0; i < this.headUrlList.length; i++) {
                var item = this.headUrlList[i];
                if (item.uid == uid) {
                    return item.headUrl;
                }
            }
            return null;
        };
        /**添加headUrl */
        LobbyDataCache.addHeadUrl = function (userHead) {
            if (!userHead)
                return;
            if (!this.headUrlList) {
                this.headUrlList = [];
            }
            for (var _i = 0; _i < userHead.length; _i++) {
                var item = userHead[_i];
                var index = this.findIndex(item.uid);
                if (index != -1) {
                    this.headUrlList[index] = item;
                }
                else {
                    this.headUrlList.push(item);
                }
            }
        };
        /**寻找相同head */
        LobbyDataCache.findIndex = function (uid) {
            for (var i = 0; i < this.headUrlList.length; i++) {
                if (uid == this.headUrlList[i].uid) {
                    return i;
                }
            }
            return -1;
        };
        LobbyDataCache.defaultWidth = 1280; //默认设计尺寸
        LobbyDataCache.defaultHeight = 720; //默认设计尺寸
        LobbyDataCache.costType = 4; //货币类型
        LobbyDataCache.version = "1.0.0"; //版本号
        LobbyDataCache.shareNLast = 0; //分享次数
        LobbyDataCache.lobbyId = 2; //1-5区分不同大厅
        return LobbyDataCache;
    })();
    MJLobby.LobbyDataCache = LobbyDataCache;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 弹出管理
     */
    var LobbyPopupManager = (function () {
        function LobbyPopupManager() {
        }
        /**
         * 显示弹出框
         * @param	target:显示对象
         * @param	modal:是否添加遮罩
         * @param	center:是否居中显示
         * @param	useEffect:是否缓动
         * @param	isTop:是否在最上层
         */
        LobbyPopupManager.addPopUp = function (target, modal, center, useEffect, w, h, addClose) {
            if (modal === void 0) { modal = false; }
            if (center === void 0) { center = false; }
            if (useEffect === void 0) { useEffect = true; }
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            if (addClose === void 0) { addClose = true; }
            var popUpMask = new egret.Sprite();
            popUpMask.graphics.beginFill(0, 0.6);
            popUpMask.graphics.drawRect(0, 0, MJLobby.LobbyDataCache.defaultWidth, MJLobby.LobbyDataCache.defaultHeight * uniLib.ScreenUtils.scaleFactor);
            popUpMask.graphics.endFill();
            popUpMask.touchEnabled = true;
            popUpMask.name = target.hashCode + "_mask";
            if (modal) {
                popUpMask.visible = true;
            }
            else {
                popUpMask.visible = false;
            }
            this.getContainer().addChild(popUpMask);
            this.getContainer().addChild(target);
            var targetX;
            var targetY;
            if (center) {
                if (w) {
                    targetX = MJLobby.LobbyDataCache.defaultWidth - w >> 1;
                }
                else {
                    targetX = MJLobby.LobbyDataCache.defaultWidth - target.width >> 1;
                }
                if (h) {
                    targetY = (MJLobby.LobbyDataCache.defaultHeight * uniLib.ScreenUtils.scaleFactor - h) / 2;
                }
                else {
                    targetY = (MJLobby.LobbyDataCache.defaultHeight * uniLib.ScreenUtils.scaleFactor - target.height) / 2;
                }
            }
            else {
                targetX = target.x;
                targetY = target.y;
            }
            if (useEffect) {
                target.y = targetY;
                target.x = targetX;
            }
            else {
                target.x = targetX;
                target.y = targetY;
            }
            if (MJLobby.MJLobbyData.getInstance().lobbyId < 1000) {
                target.alpha = 0;
                target.anchorOffsetX = target.width / 2;
                target.anchorOffsetY = target.height / 2;
                target.scaleX = 0.6;
                target.scaleY = 0.6;
                target.x += target.width / 2;
                target.y += target.height / 2;
                egret.Tween.removeTweens(target);
                if (MJLobby.MJLobbyData.getInstance().isHaoCai) {
                    var ratio = uniLib.Global.screenWidth / uniLib.Global.screenHeight;
                    if (ratio >= 1.8 && ratio < 2.8) {
                        if (target.name.slice(0, 3) == "max") {
                            if (ratio <= 2) {
                                egret.Tween.get(target).to({ alpha: 1, scaleX: 1, scaleY: 0.89 }, 380, egret.Ease.backOut);
                            }
                            else {
                                egret.Tween.get(target).to({ alpha: 1, scaleX: 1, scaleY: 0.85 }, 380, egret.Ease.backOut);
                            }
                        }
                        else {
                            egret.Tween.get(target).to({ alpha: 1, scaleX: 1, scaleY: 0.8 }, 380, egret.Ease.backOut);
                        }
                    }
                    else {
                        egret.Tween.get(target).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 380, egret.Ease.backOut);
                    }
                }
                else {
                    egret.Tween.get(target).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 380, egret.Ease.backOut);
                }
                if (addClose) {
                    popUpMask.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        target.dispatchEventWith(MJLobby.LobbyUIEventConsts.CLOSE);
                    }, this);
                }
            }
        };
        /**
         * 移除弹出框
         * @param	target:显示对象
         * @param	useEffect:是否缓动
         * @param	removeMask:是否移除蒙版
         */
        LobbyPopupManager.removePopUp = function (target, useEffect, removeMask) {
            if (useEffect === void 0) { useEffect = false; }
            if (removeMask === void 0) { removeMask = true; }
            var mask;
            if (target.parent) {
                mask = target.parent.getChildByName(target.hashCode + "_mask");
            }
            else {
                mask = this.getContainer().getChildByName(target.hashCode + "_mask");
            }
            if (mask) {
                if (MJLobby.MJLobbyData.getInstance().lobbyId < 1000) {
                    egret.Tween.removeTweens(target);
                    mask.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        target.dispatchEventWith(MJLobby.LobbyUIEventConsts.CLOSE);
                    }, this);
                }
                uniLib.DisplayUtils.removeFromParent(mask);
                mask = null;
            }
            if (!useEffect) {
                if (target.parent)
                    target.parent.removeChild(target);
            }
            else {
                egret.Tween.removeTweens(target);
                egret.Tween.get(target).to({ y: target.y - 200, alpha: 0 }).call(this.removeTarget, this, [target]);
            }
        };
        LobbyPopupManager.removeTarget = function (target) {
            target.alpha = 1.0;
            egret.Tween.removeTweens(target);
            if (target.parent) {
                target.parent.removeChild(target);
            }
        };
        /**
         * 轻提示
         */
        LobbyPopupManager.showMildWarnShow = function (msg) {
            MJLobby.LobbyResUtil.trace("轻度提示：" + msg);
            if (!msg) {
                return;
            }
            var alert = new MJLobby.LobbyMildAlertVC();
            alert.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
            alert.setText(msg);
            this.getContainer().addChild(alert);
            if (this.showList.length > 0) {
                for (var index = 0; index < this.showList.length; index++) {
                    this.showList[index].y -= alert.height;
                }
            }
            this.showList.push(alert);
            return alert;
        };
        LobbyPopupManager.removeStage = function (evt) {
            var alert = evt.currentTarget;
            alert.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
            this.showList.splice(this.showList.indexOf(alert), 1);
        };
        LobbyPopupManager.getContainer = function () {
            if (MJLobby.MJLobbyInfo.topLayer) {
                return MJLobby.MJLobbyInfo.topLayer;
            }
            if (uniLib.SceneMgr.instance.currentScene && uniLib.SceneMgr.instance.currentScene.tipsLayer) {
                return uniLib.SceneMgr.instance.currentScene.tipsLayer;
            }
            return uniLib.SceneMgr.instance.currentScene;
        };
        LobbyPopupManager.showConfirmPanel = function (msg, btnlables, backFn, title, backObj, countdown, needClose, size, align) {
            if (backFn === void 0) { backFn = null; }
            if (title === void 0) { title = null; }
            if (countdown === void 0) { countdown = 0; }
            if (needClose === void 0) { needClose = false; }
            if (align === void 0) { align = egret.HorizontalAlign.CENTER; }
            var _msgTips = new MJLobby.LobbyMsgBox(needClose);
            if (!title) {
                title = "";
            }
            _msgTips.setData(title, msg, btnlables, backFn, backObj, countdown, size, align);
            _msgTips.x = Math.round((MJLobby.LobbyDataCache.defaultWidth - _msgTips.width) / 2);
            _msgTips.y = Math.round((MJLobby.LobbyDataCache.defaultHeight - _msgTips.height) / 2);
            this.addPopUp(_msgTips, true, true, true, 0, 0, false);
        };
        LobbyPopupManager.addMask = function () {
            var mask = new egret.Sprite();
            mask.graphics.beginFill(0, 0.01);
            mask.graphics.drawRect(0, 0, uniLib.Global.screenWidth, uniLib.Global.screenHeight);
            mask.graphics.endFill();
            mask.touchEnabled = true;
            MJLobby.MJLobbyInfo.topLayer.addChild(mask);
            mask.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                var mask = evt.currentTarget;
                uniLib.DisplayUtils.removeFromParent(mask);
                mask = null;
            }, this);
        };
        // private static  _popUpMask:egret.Sprite;
        LobbyPopupManager.showList = [];
        return LobbyPopupManager;
    })();
    MJLobby.LobbyPopupManager = LobbyPopupManager;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 大厅显示信息
     */
    var MJLobbyInfo = (function () {
        function MJLobbyInfo() {
        }
        MJLobbyInfo.destory = function () {
            this.main = null;
            this.stage = null;
            this.mainUILayer = null;
            this.uiLayer = null;
            this.topLayer = null;
        };
        return MJLobbyInfo;
    })();
    MJLobby.MJLobbyInfo = MJLobbyInfo;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var ViewConfig = (function () {
        function ViewConfig() {
        }
        return ViewConfig;
    })();
    MJLobby.ViewConfig = ViewConfig;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    var LobbyServerMJProxy = (function (_super) {
        __extends(LobbyServerMJProxy, _super);
        function LobbyServerMJProxy() {
            _super.call(this, LobbyServerMJProxy.NAME);
            this.updatedConfig = false;
            this.httpInitFailTimes = 0;
            this.gameId = 0;
            this.zoneId = 0;
        }
        LobbyServerMJProxy.getInstance = function () {
            if (!this._instance) {
                this._instance = new LobbyServerMJProxy();
            }
            return this._instance;
        };
        LobbyServerMJProxy.prototype.initServer = function () {
            var zoneid;
            var gameId;
            var loginUrl;
            if (uniLib.Global.gameConfig) {
                zoneid = uniLib.Global.gameConfig.zoneid;
                gameId = uniLib.Global.gameConfig.gameid;
                loginUrl = uniLib.Global.gameConfig.login_url;
                uniLib.Global.defaultConfig = new Object();
                uniLib.Global.defaultConfig.login_url = loginUrl;
                uniLib.Global.defaultConfig.zoneid = zoneid;
                uniLib.Global.defaultConfig.gameid = gameId;
            }
            else {
                var data = RES.getRes("lobbyConfig_json");
                var config = data["default"];
                uniLib.Global.defaultConfig = config;
                zoneid = config.zoneid;
                gameId = config.gameid;
                MJLobby.LobbyDataCache.gameID = gameId;
                loginUrl = config.login_url;
            }
            if (!MJLobby.NetMgr.ws || !MJLobby.NetMgr.ws.isConnected) {
                this._timeOutId = egret.setTimeout(function () {
                    MJLobby.LobbyEvents.Instance.dispatchEvent(new egret.Event(MJLobby.LobbyEvents.NOTIFY_CONNECT_TIMEOUT));
                }, this, 10000);
                uniLib.UIMgr.instance.showProcessBar(null, 94, 100, "正在连接服务器...", "", true);
                MJLobby.NetMgr.init(loginUrl, gameId, zoneid, this.onHttpInitSucc, this.onHttpInitFail, this);
                this.gameId = gameId;
                this.zoneId = zoneid;
            }
            else {
                //捕鱼回来走loading条 重新加载大厅资源
                if (MJLobby.MJLobbyData.getInstance().curGameId == 150) {
                    this.onLoginServer();
                }
            }
        };
        LobbyServerMJProxy.prototype.loginOut = function () {
            MJLobby.NetMgr.logout();
            MJLobby.MJLobbyData.getInstance().myBaseInfo = null;
        };
        /**
         * http平台登录完成
         */
        LobbyServerMJProxy.prototype.onHttpInitSucc = function (obj) {
            egret.clearTimeout(this._timeOutId);
            //下面可以通过uniLib.NetMgr.httpSend发送http消息了
            var uid = MJLobby.NetMgr.UID;
            if (MJLobby.MJLobbyData.getInstance().myBaseInfo) {
                uniLib.UIMgr.instance.hideLoading();
            }
            this._timeOutId = egret.setTimeout(function () {
                MJLobby.LobbyEvents.Instance.dispatchEvent(new egret.Event(MJLobby.LobbyEvents.NOTIFY_CONNECT_TIMEOUT));
            }, this, 10000);
            MJLobby.NetMgr.initSocket(this.onSockInitSucc, this.onSockInitFail, this, null, null, null, true); //初始化平台socket
            uniLib.UIMgr.instance.showProcessBar(null, 95, 100, "正在验证登录信息...", "", true);
        };
        LobbyServerMJProxy.prototype.onHttpInitFail = function (rev) {
            console.error("## login_return ##" + JSON.stringify(rev));
            if (rev && rev.retcode) {
                MJLobby.NetMgr.logout();
                switch (rev.retcode) {
                    case 2:
                        this.onConnectFail();
                        break;
                    case 3:
                        uniLib.ZQGameSdk.Login(this.onLogin, null, this, 152);
                        break;
                    case 26:
                        uniLib.UIMgr.instance.hideLoading();
                        MJLobby.LobbyPopupManager.showConfirmPanel("此闲聊账号不是您的微信账号所绑定的闲聊账号，请登录正确的闲聊账号！", ["确定"], [function () {
                                if (MJLobby.ViewConfig.loginPanelName) {
                                    uniLib.SceneMgr.instance.changeScene(uniLib.getDefinitionByName(MJLobby.ViewConfig.loginPanelName));
                                }
                                else {
                                    MJLobby.LobbyPopupManager.showMildWarnShow("返回登录界面失败");
                                }
                            }], "", this);
                        break;
                }
                return true;
            }
            egret.clearTimeout(this._timeOutId);
            if (this.httpInitFailTimes == 0) {
                this.httpInitFailTimes++;
                MJLobby.NetMgr.init("http://211.159.149.160:7000/httplogin", this.gameId, this.zoneId, this.onHttpInitSucc, this.onHttpInitFail, this);
                uniLib.Console.log("尝试第1次登陆重连IP:118.89.55.208");
                return true;
            }
            else if (this.httpInitFailTimes == 1) {
                this.httpInitFailTimes++;
                MJLobby.NetMgr.init("http://118.89.55.208:7000/httplogin", this.gameId, this.zoneId, this.onHttpInitSucc, this.onHttpInitFail, this);
                uniLib.Console.log("尝试第2次登陆重连IP:118.89.55.208");
                return true;
            }
            MJLobby.NetMgr.logout();
            // if (uniLib.Global.isH5 ==false && this.updatedConfig == false) {
            //     this.updateConfig();
            //     return true;
            // }
            // else {
            return this.onConnectFail();
            // }
        };
        // private updateConfig(): void {
        //     this.updatedConfig = true;
        //     // uniLib.ZQGameSdk.pullCfg(this.onDown, this);
        //     uniLib.ZQGameSdk.getConfig("当前客户端版本过低,点击确定重启更新。","","确定");
        // }
        LobbyServerMJProxy.prototype.onDown = function (msg) {
            if (!MJLobby.NetMgr.ws || !MJLobby.NetMgr.ws.isConnected) {
                uniLib.UIMgr.instance.showProcessBar(null, 94, 100, "正在连接服务器...", "", true);
                MJLobby.NetMgr.init(uniLib.Global.gameConfig.login_url, uniLib.Global.gameConfig.gameid, uniLib.Global.gameConfig.zoneid, this.onHttpInitSucc, this.onHttpInitFail, this);
            }
        };
        /**
         * socket连接完成
         */
        LobbyServerMJProxy.prototype.onSockInitSucc = function () {
            egret.clearTimeout(this._timeOutId);
            if (uniLib.Global.isInGame == false) {
                // uniLib.CommonModelMgr.Instance.registerCommonModel(uniLib.CommonModel.USERINFO, LobbyUserInfoPanel);
                uniLib.CommonModelMgr.Instance.registerCommonModel(uniLib.CommonModel.LOBBY_NOTICE, MJLobby.GlobalControl);
                uniLib.Global.addEventListener(uniLib.ZqEvent.EVENT_G2L, this.onGameGoon, this);
                this.onLoginServer();
            }
        };
        LobbyServerMJProxy.prototype.onGameGoon = function (e) {
            if (e.param == "game_request_continue") {
                var req = new Cmd.ApplyContinuePlayRoomCmd_C();
                this.sendData(req);
            }
        };
        LobbyServerMJProxy.prototype.reconnct = function (e) {
            if (e.param && e.param == MJLobby.LobbyDataCache.gameID) {
                this.onSockInitSucc();
            }
        };
        LobbyServerMJProxy.prototype.sendData = function (obj) {
            if (MJLobby.NetMgr.ws)
                MJLobby.NetMgr.tcpSend(obj);
            //NetMgr.setMsgTimeout(8,"sendData")
        };
        LobbyServerMJProxy.prototype.onSockInitFail = function () {
            egret.clearTimeout(this._timeOutId);
            MJLobby.NetMgr.logout();
            // if (uniLib.Global.isH5 ==false && this.updatedConfig == false) {
            //     this.updateConfig();
            //     return true;
            // }
            // else {
            return this.onConnectFail();
            // }
            // return this.onConnectFail();
        };
        LobbyServerMJProxy.prototype.onConnectFail = function () {
            if (uniLib.Global.isH5) {
                uniLib.UIMgr.instance.hideLoading();
                MJLobby.LobbyPopupManager.showConfirmPanel("请检查网络状况", [""], [this.refresh], "", this);
            }
            else {
                uniLib.ZQGameSdk.getConfig("网络不稳定,需要重新连接", "", "确定");
                //uniLib.UIMgr.instance.hideLoading();
                //var loginPanel:any=uniLib.getDefinitionByName(ViewConfig.loginPanelName);
                //uniLib.SceneMgr.instance.changeScene(loginPanel);
                //LobbyPopupManager.showMildWarnShow("请检查网络状况");
                return true;
            }
            return true;
        };
        LobbyServerMJProxy.prototype.getRemoteConfig = function () {
        };
        LobbyServerMJProxy.prototype.refresh = function () {
            if (uniLib.Global.reLoginUrl != "") {
                uniLib.BrowersUtils.redirect(uniLib.Global.reLoginUrl);
            }
            else {
                uniLib.BrowersUtils.reload();
            }
        };
        LobbyServerMJProxy.prototype.onRemove = function () {
            _super.prototype.onRemove.call(this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSockInitSucc, this);
        };
        LobbyServerMJProxy.prototype.onLoginServer = function () {
            MJLobby.MJLobbyData.getInstance().getGpsPosition();
            var login = new Cmd.UserInfoSynLobbyCmd_C();
            login.lobbyId = MJLobby.MJLobbyData.getInstance().lobbyId;
            //*************把本地的配置md5给后台，用于判断是否需要发配置回 
            var lobbyGameList = [];
            var createRoomConfigs = [];
            var arr = RES.getRes("TableLobbyGameList_json");
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    lobbyGameList.push(arr[i]);
                }
            }
            var createConfig = RES.getRes("TableCreateConfigList_json");
            if (createConfig) {
                for (var i = 0; i < createConfig.length; i++) {
                    createRoomConfigs.push(createConfig[i]);
                }
            }
            var lobbymsg = JSON.stringify(lobbyGameList);
            var roommsg = JSON.stringify(createRoomConfigs);
            if (!uniLib.Global.isH5) {
                login.md5Code = uniLib.StringUtils.MD5(lobbymsg) + uniLib.StringUtils.MD5(roommsg); //*/
                login.version = uniLib.Global.version;
            }
            this.sendData(login);
            uniLib.UIMgr.instance.showProcessBar(null, 96, 100, "正在进入大厅服务器...", "", true);
        };
        /**
         * 闲聊登陆失败后重新登录一遍微信
         */
        LobbyServerMJProxy.prototype.onLogin = function (msg) {
            console.error("login back" + JSON.stringify(msg));
            if (msg.code == 0) {
                var plt = {};
            }
            ;
            if (msg.data.platid)
                plt.platid = msg.data.platid;
            if (msg.data.payplatid) {
                uniLib.Global.payPlatId = msg.data.payplatid;
            }
            if (msg.data.uid)
                plt.uid = msg.data.uid;
            if (msg.data.session)
                plt.sign = msg.data.session;
            if (msg.data.extData)
                plt.extdata = msg.data.extData;
            if (MJLobby.LobbyDataCache.imei) {
                plt.imei = MJLobby.LobbyDataCache.imei;
            }
            if (msg.data.deviceToken) {
                plt.imei = msg.data.deviceToken + ":" + uniLib.Global.bundleId.substring(0, uniLib.Global.bundleId.indexOf("_"));
            }
            plt.osname = egret.Capabilities.os;
            uniLib.Global.initPlatInfo(plt);
            this.initServer();
        };
        LobbyServerMJProxy.NAME = "LobbyServerMJProxy";
        return LobbyServerMJProxy;
    })(MJLobby.Proxy);
    MJLobby.LobbyServerMJProxy = LobbyServerMJProxy;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    var NetMgr = (function (_super) {
        __extends(NetMgr, _super);
        function NetMgr() {
            _super.call(this);
        }
        return NetMgr;
    })(uniLib.NetMgr);
    MJLobby.NetMgr = NetMgr;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var GameResUpdata = (function () {
        function GameResUpdata() {
        }
        /**
         * 是否需要下载游戏资源
         */
        GameResUpdata.isDownGame = function (gameId) {
            if (GameResUpdata.GameUpdataResSize(gameId) > (1024 * 1024 * 4)) {
                return true;
            }
            return false;
        };
        /**
         * 指定游戏更新的资源文件
         */
        GameResUpdata.GetResChangedList = function (gameId) {
            if (this.m_ResChangedList[gameId]) {
                return this.m_ResChangedList[gameId];
            }
            this.m_ResChangedList[gameId] = [];
            var gameConfig = this.GetGameConfig(gameId);
            if (!gameConfig)
                return [];
            var resRoot = RES.getVersionController().getVirtualUrl(gameConfig.gameResRoot);
            var allManifest = GameResUpdata.AllManifest;
            var gameManifest = [];
            for (var i in allManifest) {
                var item = allManifest[i];
                if (i.indexOf(resRoot) != -1) {
                    gameManifest.push(item.v);
                }
            }
            var changedRes = RES.getVersionController().getChangeList();
            var gameResList = this.m_ResChangedList[gameId];
            for (var _i = 0; _i < changedRes.length; _i++) {
                var item = changedRes[_i];
                var url = item.url;
                for (var _a = 0; _a < gameManifest.length; _a++) {
                    var manifest = gameManifest[_a];
                    if (url.indexOf(manifest) != -1) {
                        gameResList.push(item);
                        break;
                    }
                }
            }
            return this.m_ResChangedList[gameId];
        };
        Object.defineProperty(GameResUpdata, "AllManifest", {
            /**
             *native 资源版本文件 all.Manifest
             */
            get: function () {
                return this.m_allManifest;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化 native 资源版本文件 all.Manifest
         */
        GameResUpdata.LoadAllManifest = function () {
            RES.getResByUrl("all.manifest", function (data) {
                GameResUpdata.m_allManifest = data;
            }, this, RES.ResourceItem.TYPE_JSON);
        };
        /**
         * 获取指定游戏更新的文件
         */
        GameResUpdata.GameUpdataResSize = function (gameId) {
            var gameConfig = this.GetGameConfig(gameId);
            if (!gameConfig)
                return 0;
            var resRoot = RES.getVersionController().getVirtualUrl(gameConfig.gameResRoot);
            var gameres = GameResUpdata.GetResChangedList(gameId);
            var changedSize = 0;
            for (var _i = 0; _i < gameres.length; _i++) {
                var item = gameres[_i];
                changedSize += item.size;
            }
            return changedSize;
        };
        /**
         * 获取游戏配置数据
         */
        GameResUpdata.GetGameConfig = function (gameId) {
            var gameList = RES.getRes("gameList_json");
            var gameConfig;
            for (var i = 0; i < gameList.length; i++) {
                if (gameList[i].gameId == gameId) {
                    gameConfig = gameList[i];
                    break;
                }
            }
            return gameConfig;
        };
        /**
         * bit转化为string
         */
        GameResUpdata.BitToString = function (bit) {
            if (bit == null || bit < 1) {
                return;
            }
            var kb = bit / 1024;
            if (kb < 1024) {
                return kb.toFixed(2).toString() + "KB";
            }
            var m = kb / 1024;
            return m.toFixed(2).toString() + "M";
        };
        /**
         * 指定游戏更新的资源文件
         */
        GameResUpdata.m_ResChangedList = {};
        /**
         *native 资源版本文件 all.Manifest
         */
        GameResUpdata.m_allManifest = {};
        return GameResUpdata;
    })();
    MJLobby.GameResUpdata = GameResUpdata;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 大厅数据
     */
    var MJLobbyData = (function () {
        function MJLobbyData() {
            this.disclaimer = 0;
            /**1:当前已经收到CreateRoomCmd_S消息了 2:当前已经收到EnterRoomCmd_S消息了  0:未收到这两个消息*/
            this.recInRoomData = 0;
            this.showNotice = false;
            this.hasShowGame = false; //是否第一次显示lobby，第二次会同步玩家数据
            /**每次是否第一次登陆 默认是true*/
            this.everyFirstLogin = true;
            /**全局查看录像房间id */
            this.globalRoomId = 0;
            /**是否录像 */
            this.video = 0;
            /**录像数据 */
            this.videoData = "";
            /**是否审核模式 */
            this.isShenHe = false;
            /**红包开奖活动 提现详情 */
            this.redpacket_DepositDetail = [];
            /**是否显示红包 */
            this.showRedpacket = 0;
            /**是否自动弹出红包 */
            this.autoShowRedpacket = 0;
            /**金币场选择游戏ID*/
            this.coinSelectGameId = 0;
            /**大厅界面风格  用于不同大厅风格的二级界面
             * 默认为0  绿谷大厅1  金币场2  比赛场3 好彩真人麻将4
            */
            this.artStyle = 0;
            /**金币场是否显示首充礼包 1显示*/
            this.firstRecharge = 0;
            /**当前正在进入的gameId
             * 目前只用于捕鱼 进入捕鱼删除大厅资源
            */
            this.curGameId = 0;
            /**游戏名 */
            this.curGameName = "";
            /**上次进入的gameId
             *好彩退出房间的时候游戏发给游戏的事件
            */
            this.lastGameId = 0;
            /**上次进入游戏房间时间 */
            this.lastEnterRoomTime = 0;
            /**是否存在官方充值存在 绑定代理商返钻 1表示存在 */
            this.bindRechargeRet = 0;
            /**是否显示实名认证 0:不显示 1:显示*/
            this.authen = 1;
            /**是否在预加载 */
            this.isLoading = false;
            /**是否代理 */
            this.isAgent = false;
            /**代理类型 0不是代理*/
            this.agentType = 0;
            /**是否有未处理俱乐部的消息 1表示有 */
            this.noHandle = 0;
            /**是否开启瑞狗迎春活动 1开启*/
            this.ausDog = 0;
            /**是否显示时时彩界面 1显示*/
            this.show_SSC = 0;
            /**是否进入的是比赛场 */
            this.isInEventGame = false;
            /**
             * 是否进入过任意游戏
             */
            this.entryGame = false;
            this._playRequestList = [];
        }
        MJLobbyData.prototype.setEmailAddress = function (value) {
            this.m_emailAddress = value;
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Bind_MailAddress, value);
        };
        Object.defineProperty(MJLobbyData.prototype, "emailAddress", {
            /**
             * 绑定邮箱
             */
            get: function () {
                return this.m_emailAddress;
            },
            enumerable: true,
            configurable: true
        });
        MJLobbyData.getInstance = function () {
            if (!this._instance) {
                this._instance = new MJLobbyData();
            }
            return this._instance;
        };
        MJLobbyData.getGameConfigs = function () {
            if (this._gameconfig == null) {
                this._gameconfig = [];
                var len = uniLib.Global.zoneList.length;
                for (var i = 0; i < len; i++) {
                    var zoneInfo = uniLib.Global.zoneList[i];
                    var gameCfg = this.getConfigByGameId(zoneInfo.gameid);
                    if (gameCfg) {
                        gameCfg.zoneInfo = zoneInfo;
                        gameCfg.destroyResOnExit = true;
                        this._gameconfig.unshift(gameCfg);
                    }
                }
            }
            return this._gameconfig;
        };
        MJLobbyData.prototype.getRewardItemConfigById = function (id) {
            if (!this._tableRewardItemConfig) {
                this._tableRewardItemConfig = RES.getRes("TableRewardItemConfig_json");
            }
            if (this._tableRewardItemConfig && this._tableRewardItemConfig instanceof Array) {
                var len = this._tableRewardItemConfig.length;
                for (var i = 0; i < len; i++) {
                    var item = this._tableRewardItemConfig[i];
                    if (item.id == id)
                        return item;
                }
            }
            return null;
        };
        MJLobbyData.prototype.getGameOfficalEventConfig = function (gameId) {
            this._gameOfficalEventConfig = {};
            if (!this._tableOfficalEventConfig) {
                this._tableOfficalEventConfig = RES.getRes("TableOfficalEventConfig_json");
            }
            for (var i = 0; i < this._tableOfficalEventConfig.length; i++) {
                var gameIds = this._tableOfficalEventConfig[i].gameId;
                if (gameIds instanceof Array) {
                    var isHave = false;
                    for (var _i = 0; _i < gameIds.length; _i++) {
                        var item = gameIds[_i];
                        if (item == gameId) {
                            isHave = true;
                            continue;
                        }
                    }
                    if (isHave)
                        this._gameOfficalEventConfig[this._tableOfficalEventConfig[i].level] = this._tableOfficalEventConfig[i];
                }
                else {
                    if (gameIds == gameId) {
                        this._gameOfficalEventConfig[this._tableOfficalEventConfig[i].level] = this._tableOfficalEventConfig[i];
                    }
                }
            }
            return this._gameOfficalEventConfig;
        };
        MJLobbyData.prototype.getGameOfficalEventConfigByMatchId = function (matchId) {
            if (!this._tableOfficalEventConfig) {
                this._tableOfficalEventConfig = RES.getRes("TableOfficalEventConfig_json");
            }
            if (this._tableOfficalEventConfig && this._tableOfficalEventConfig.length > 0) {
                for (var i = 0; i < this._tableOfficalEventConfig.length; i++) {
                    if (this._tableOfficalEventConfig[i].id == matchId) {
                        return this._tableOfficalEventConfig[i];
                    }
                }
            }
            return null;
        };
        /**通过大厅Id获取赛事列表 */
        MJLobbyData.prototype.getGameOfficeEventConfigByLobbyId = function (lobbyId) {
            this._gameOfficalEventConfig = {};
            if (!this._tableOfficalEventConfig) {
                this._tableOfficalEventConfig = RES.getRes("TableOfficalEventConfig_json");
            }
            var list = [];
            if (this._tableOfficalEventConfig && this._tableOfficalEventConfig instanceof Array)
                list = this._tableOfficalEventConfig.filter(function (v) { return v["lobbyId"] == lobbyId; });
            return list != null && list instanceof Array ? list : [];
        };
        MJLobbyData.prototype.getGameCreateConfig = function (gameId) {
            this._createConfg = {};
            if (!this._gameCreateConfig) {
                this._gameCreateConfig = RES.getRes("TableCreateConfigList_json");
            }
            for (var i = 0; i < this._gameCreateConfig.length; i++) {
                this._createConfg[this._gameCreateConfig[i].gameId] = this._gameCreateConfig[i];
            }
            return this._createConfg[gameId];
        };
        MJLobbyData.prototype.getPlayTypeConfig = function () {
            if (!this._playTypeConfig) {
                var arr = RES.getRes("TablePlayTypeList_json");
                this._playTypeLabel = {};
                this._playTypeConfig = {};
                for (var i = 0; i < arr.length; i++) {
                    this._playTypeConfig[arr[i].id] = arr[i];
                    this._playTypeLabel[arr[i].playType] = arr[i].playTypeDecs;
                }
            }
            return this._playTypeConfig;
        };
        MJLobbyData.prototype.getPlayTypeConfigById = function (id) {
            if (!this._playTypeConfig) {
                this.getPlayTypeConfig();
            }
            return this._playTypeConfig[id];
        };
        Object.defineProperty(MJLobbyData.prototype, "lobbyId", {
            get: function () {
                return this._lobbyId;
            },
            set: function (id) {
                this._lobbyId = id;
                this._lobbyConfig = null;
                this.setLobbyConfig();
                this.defaultGameId = this._lobbyConfig.mahjongList[0];
                //设置分享参数
                if (!uniLib.ZQGameSdk.defaultWXShareVo) {
                    uniLib.ZQGameSdk.defaultWXShareVo = new uniLib.WXShareVo();
                }
                var vo = uniLib.ZQGameSdk.defaultWXShareVo;
                vo.title = this._lobbyConfig.shareTitle;
                vo.description = this._lobbyConfig.shareContent;
                uniLib.ZQGameSdk.defaultWXShareVo = vo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MJLobbyData.prototype, "gameCreateConfig", {
            set: function (arr) {
                this._gameCreateConfig = arr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MJLobbyData.prototype, "lobbyConfig", {
            get: function () {
                return this._lobbyConfig;
            },
            set: function (vo) {
                this._lobbyConfig = vo;
                this.defaultGameId = this._lobbyConfig.mahjongList[0];
            },
            enumerable: true,
            configurable: true
        });
        MJLobbyData.prototype.getLobbyConfig = function () {
            return this._lobbyConfig;
        };
        MJLobbyData.getGameConfig = function (gameId) {
            var gameList = this.getGameConfigs();
            for (var i = 0; i < gameList.length; i++) {
                if (gameList[i].gameId == gameId) {
                    return gameList[i];
                }
            }
        };
        MJLobbyData.prototype.setLobbyConfig = function () {
            if (!this._lobbyConfig) {
                var arr = RES.getRes("TableLobbyGameList_json");
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].id == this._lobbyId) {
                        this._lobbyConfig = arr[i];
                        break;
                    }
                }
                if (!this._lobbyConfig) {
                    this._lobbyConfig = arr[0];
                }
            }
        };
        Object.defineProperty(MJLobbyData.prototype, "eventData", {
            get: function () {
                return this._eventData;
            },
            set: function (data) {
                this._eventData = data;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获得游戏列表
         * @param type  0普通模式(不显示某些游戏) 1俱乐部    number类型用于以后扩展
         *  */
        MJLobbyData.prototype.getGameList = function (type) {
            var _this = this;
            if (type === void 0) { type = 0; }
            this.setLobbyConfig();
            var mahjongList = this._lobbyConfig.mahjongList.concat();
            if (this._lobbyConfig.hasOwnProperty("invisibleList") && Array.isArray(this._lobbyConfig.invisibleList) && type == 0) {
                return mahjongList.filter(function (f) {
                    return _this._lobbyConfig.invisibleList.indexOf(f) == -1;
                });
            }
            else {
                return mahjongList;
            }
        };
        MJLobbyData.prototype.getExerciseList = function () {
            this.setLobbyConfig();
            return this._lobbyConfig.exerciseList;
        };
        MJLobbyData.prototype.getgetExerciseLabel = function () {
            this.setLobbyConfig();
            return this._lobbyConfig.exerciseLabelList;
        };
        MJLobbyData.prototype.getHundredList = function () {
            this.setLobbyConfig();
            if (this._lobbyConfig.hasOwnProperty("hundredList")) {
                return this._lobbyConfig.hundredList;
            }
        };
        MJLobbyData.getMahjongGameId = function () {
            var _gameconfig = RES.getRes("gameList_json");
            return _gameconfig[0].gameId;
        };
        MJLobbyData.getConfigByGameId = function (gameId) {
            var _gameconfig = RES.getRes("gameList_json");
            var len = _gameconfig.length;
            var temp = null;
            for (var i = 0; i < len; i++) {
                if (_gameconfig[i].hasOwnProperty("lobbyId")) {
                    var lobbyIds = _gameconfig[i]["lobbyId"];
                    if (Array.isArray(lobbyIds) && lobbyIds.indexOf(MJLobbyData.getInstance().lobbyId) != -1 && _gameconfig[i].gameId == gameId) {
                        return _gameconfig[i];
                    }
                }
                if (_gameconfig[i].gameId == gameId && !temp)
                    temp = _gameconfig[i];
            }
            if (temp)
                return temp;
            return null;
        };
        /**江西客家vip */
        MJLobbyData.prototype.getVipConfig = function () {
            if (!this._vipConfig) {
                this._vipConfig = RES.getRes("TableMahjongVipConfig_json");
            }
            return this._vipConfig;
        };
        /**匹配场config */
        MJLobbyData.prototype.getMatchConfig = function () {
            if (!RES.hasRes("TableMatchTypeList_json"))
                return;
            if (!this._matchConfig) {
                var config = RES.getRes("TableMatchTypeList_json");
                for (var _i = 0; _i < config.length; _i++) {
                    var parm = config[_i];
                    if (parm.hasOwnProperty("lobbyId") && parm["lobbyId"] == this._lobbyId) {
                        if (!this._matchConfig) {
                            this._matchConfig = [];
                        }
                        this._matchConfig.push(parm);
                    }
                }
            }
            return this._matchConfig;
        };
        /**金币场config */
        MJLobbyData.prototype.getCoinConfig = function () {
            if (!RES.hasRes("TableCoinHundredConfig_json"))
                return null;
            if (!this._coinConfig) {
                var config = RES.getRes("TableCoinHundredConfig_json");
                if (this._lobbyConfig["coinList"] && Array.isArray(this._lobbyConfig["coinList"])) {
                    for (var i = 0; i < this._lobbyConfig["coinList"].length; i++) {
                        for (var _i = 0; _i < config.length; _i++) {
                            var parm = config[_i];
                            if (this._lobbyConfig["coinList"][i].gameId == parm["gameId"]
                                && this._lobbyConfig["coinList"][i].sceneId.indexOf(parm["id"]) != -1) {
                                if (!this._coinConfig) {
                                    this._coinConfig = [];
                                }
                                this._coinConfig.push(parm);
                            }
                        }
                    }
                }
            }
            return this._coinConfig;
        };
        /**金币场vipConfig */
        MJLobbyData.prototype.getCoinVipConfig = function () {
            if (!RES.getRes("TableVIPPoint_json"))
                return null;
            if (!this._coinVipConfig) {
                var config = RES.getRes("TableVIPPoint_json");
                for (var _i = 0; _i < config.length; _i++) {
                    var item = config[_i];
                    if (item["lobbyId"] == this._lobbyId) {
                        this._coinVipConfig = item;
                    }
                }
            }
            return this._coinVipConfig;
        };
        Object.defineProperty(MJLobbyData.prototype, "userInfoSynLobby", {
            /**获取登录消息 */
            get: function () {
                return this._userInfoSynLobby;
            },
            set: function (data) {
                this._userInfoSynLobby = data;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 根据goodId来获取配表的
         */
        MJLobbyData.prototype.getGooIDName = function (goodId) {
            if (!this._goodConfig)
                this._goodConfig = RES.getRes("TableGoodsConfig_json");
            for (var _i = 0, _a = this._goodConfig; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item["goodId"] == goodId) {
                    return item["goodName"];
                }
            }
            return "";
        };
        /**获取当前选择金币场游戏的配置 */
        MJLobbyData.prototype.getCoinCofigBySeletGameId = function () {
            var config = RES.getRes("TableCoinHundredConfig_json");
            var configArr = [];
            for (var _i = 0, _a = MJLobbyData.getInstance().getLobbyConfig()["coinList"]; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item["gameId"] == MJLobby.MJLobbyData.getInstance().coinSelectGameId) {
                    for (var _b = 0; _b < config.length; _b++) {
                        var parm = config[_b];
                        for (var i = 0; i < item["sceneId"].length; i++) {
                            if (parm["id"] == item["sceneId"][i]) {
                                configArr.push(parm);
                            }
                        }
                    }
                    break;
                }
            }
            return configArr;
        };
        /**
         * 活动赛事表
         */
        MJLobbyData.prototype.getTableEventConfig = function () {
            if (this.tableEventConfig)
                return this.tableEventConfig;
            this.tableEventConfig = RES.getRes("TableEventConfig_json");
            return this.tableEventConfig;
        };
        MJLobbyData.prototype.checkLoading = function () {
            if (this.isLoading)
                MJLobby.LobbyPopupManager.showMildWarnShow("当前正在下载游戏，请等待游戏下载完毕");
            return this.isLoading;
        };
        /**预下载判断 */
        MJLobbyData.prototype.hasGameRes = function (gameId) {
            var gameData = MJLobbyData.getConfigByGameId(gameId);
            if (uniLib.GameModuleUtils.gameDownloaded(gameData.gameCodeUrl) == false) {
                return false;
            }
            else {
                return true;
            }
        };
        /**获取支付方式 152微信支付 17苹果支付*/
        MJLobbyData.prototype.getPayplatId = function () {
            if (uniLib.Utils.isIOS()) {
                if (uniLib.Global.is_sandbox != 0) {
                    if (uniLib.Global.payPlatId != NaN || uniLib.Global.payPlatId != undefined || uniLib.Global.payPlatId != 0) {
                        return uniLib.Global.payPlatId;
                    }
                    else {
                        return 17;
                    }
                }
                else {
                    if (MJLobbyData.getInstance().myBaseInfo.playNum >= MJLobbyData.getInstance().lobbyConfig["changeRoundNum"]) {
                        return 152;
                    }
                    else {
                        return 17;
                    }
                }
            }
            else {
                return 152;
            }
        };
        /**是否移除meditor监听 */
        MJLobbyData.prototype.isHaoCai = function () {
            if (this._lobbyConfig && this._lobbyConfig.hasOwnProperty("isHaocai")) {
                if (this._lobbyConfig["isHaocai"] == 1) {
                    return true;
                }
            }
            return false;
        };
        /**公告时间控制
         * @param year 年
         * @param month 月
         * @param day 日
        */
        MJLobbyData.prototype.isShowNotice = function (year, month, day) {
            var date = new Date(year, month - 1, day, 0, 0, 0);
            var stamp = date.getTime();
            var now = new Date().getTime();
            if (stamp >= now) {
                return true;
            }
            return false;
        };
        MJLobbyData.prototype.getGpsPosition = function (isJoin) {
            var _this = this;
            if (isJoin === void 0) { isJoin = false; }
            if (uniLib.Global.is_sandbox != 0)
                return;
            if (this._lobbyConfig && this._lobbyConfig.hasOwnProperty("PositioningOpen") && this._lobbyConfig.PositioningOpen == 1) {
                this._location = uniLib.ZQGameSdk.getLocation(function (msg) {
                    if (msg.code == 0) {
                        _this._location.lng = msg.data.longitude;
                        _this._location.lat = msg.data.latitude;
                        var data = new Cmd.GetGPSLocationCmd_C();
                        data.lat = _this._location.lat;
                        data.lng = _this._location.lng;
                        MJLobby.NetMgr.tcpSend(data);
                    }
                    else {
                        if (isJoin)
                            MJLobby.LobbyPopupManager.showConfirmPanel("该房间为防作弊房间，请您到手机对应位置开启定位后重新登录!", [""], [], "", _this);
                    }
                }, this);
            }
        };
        /**
         * 检验是否是新版本龙骨系统 true为5.0以上极速模式骨骼
         */
        MJLobbyData.prototype.checkFastDragon = function () {
            var version = egret.Capabilities.engineVersion;
            var start = version.substr(0, 1);
            if (start == "5") {
                return true;
            }
            else {
                return false;
            }
        };
        /**检查免费游戏和新游戏  返回0：正常什么都不显示 1免费游戏 2新游戏 3老友 4好彩*/
        MJLobbyData.prototype.checkFreeGame = function (gameId) {
            var freeTimes = MJLobby.MJLobbyData.getInstance().freeTimes;
            var freeList = [];
            if (MJLobby.MJLobbyData.getInstance().getLobbyConfig().hasOwnProperty("freeList")) {
                freeList = MJLobby.MJLobbyData.getInstance().getLobbyConfig()["freeList"];
                if (!Array.isArray(freeList) || !freeList.length || freeList.length == 0) {
                    freeList = MJLobby.MJLobbyData.getInstance().getGameList();
                }
                if (freeList.indexOf(gameId) != -1 && Array.isArray(freeTimes) && freeTimes.length > 0)
                    return 1;
            }
            if (MJLobbyData.getInstance().getLobbyConfig().hasOwnProperty("laoyouIcon")
                && Array.isArray(MJLobbyData.getInstance().getLobbyConfig()["laoyouIcon"])
                && MJLobbyData.getInstance().getLobbyConfig()["laoyouIcon"].indexOf(gameId) != -1) {
                return 3;
            }
            if (MJLobbyData.getInstance().getLobbyConfig().hasOwnProperty("haocaiIcon")
                && Array.isArray(MJLobbyData.getInstance().getLobbyConfig()["haocaiIcon"])
                && MJLobbyData.getInstance().getLobbyConfig()["haocaiIcon"].indexOf(gameId) != -1) {
                return 4;
            }
            if (MJLobbyData.getInstance().getLobbyConfig().hasOwnProperty("newGame")
                && Array.isArray(MJLobbyData.getInstance().getLobbyConfig()["newGame"])
                && MJLobbyData.getInstance().getLobbyConfig()["newGame"].indexOf(gameId) != -1) {
                return 2;
            }
            return 0;
        };
        /**
         * 主动获取IP上报IP
         */
        MJLobbyData.prototype.getIP = function () {
            uniLib.NetMgr.getIp(function (data) {
                if (data) {
                    var ipdata = JSON.parse(data);
                    if (ipdata && ipdata.myip) {
                        if (MJLobby.MJLobbyData.getInstance().myBaseInfo) {
                            MJLobby.MJLobbyData.getInstance().myBaseInfo.ip = uniLib.StringUtils.int2ip(ipdata.myip);
                        }
                        var msg = new Cmd.ClientIpCmd_C();
                        msg.ip = ipdata.myip;
                        MJLobby.NetMgr.tcpSend(msg);
                    }
                }
            }, null);
        };
        /**
         * 闲聊信息存储或登陆
         */
        MJLobbyData.prototype.weiJULoginHandle = function (msg) {
            if (msg) {
                MJLobbyData.getInstance().weijuMsg = msg;
            }
            if (MJLobbyData.getInstance().weijuMsg) {
                var param = MJLobbyData.getInstance().weijuMsg.param;
                if (param.cmd == uniLib.ZQGameSdk.REDIRECT_INFO) {
                    var data = param.data;
                    if (data.roomId) {
                        var obj = JSON.parse(data.roomId);
                        var req = new Cmd.EnterRoomCmd_C();
                        var roomId;
                        if (obj.roomId) {
                            roomId = obj.roomId;
                        }
                        else if (obj.matchId) {
                            roomId = obj.matchId;
                            req.preBestRoomId = -1;
                        }
                        req.roomId = roomId;
                        if (MJLobby.NetMgr.ws) {
                            MJLobby.NetMgr.tcpSend(req);
                            MJLobbyData.getInstance().weijuMsg = null;
                        }
                    }
                }
            }
        };
        Object.defineProperty(MJLobbyData, "ColorFilter", {
            /**
            * 滤镜彩色过滤
            */
            get: function () {
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                return [colorFlilter];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MJLobbyData, "RevertColorFilter", {
            /**
             * 滤镜颜色还原
             **/
            get: function () {
                var colorMatrix = [
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                return [colorFlilter];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MJLobbyData, "DropShadowFilter", {
            /**
             * 添加阴影
             **/
            get: function () {
                var distance = 6; /// 阴影的偏移距离，以像素为单位
                var angle = 45; /// 阴影的角度，0 到 360 度
                var color = 0x000000; /// 阴影的颜色，不包含透明度
                var alpha = 0.7; /// 光晕的颜色透明度，是对 color 参数的透明度设定
                var blurX = 16; /// 水平模糊量。有效值为 0 到 255.0（浮点）
                var blurY = 16; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
                var strength = 0.65; /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
                var quality = 1 /* LOW */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
                var inner = false; /// 指定发光是否为内侧发光，暂未实现
                var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
                var dropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout);
                return [dropShadowFilter];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MJLobbyData.prototype, "clubInfo", {
            get: function () {
                return this._clubInfo;
            },
            set: function (value) {
                this._clubInfo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MJLobbyData.prototype, "gameMessageNotify", {
            get: function () {
                return this._gameMessage;
            },
            set: function (v) {
                this._gameMessage = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MJLobbyData.prototype, "playRequestList", {
            get: function () {
                return this._playRequestList != null && this._playRequestList.length > 0 ? this._playRequestList : [];
            },
            enumerable: true,
            configurable: true
        });
        MJLobbyData.prototype.setPlayRequestList = function (data) {
            if (data == null)
                return;
            if (data.op == null)
                return;
            var messages = data.rows != null && data.rows instanceof Array ? data.rows : [];
            if (data.op == Cmd.UpdateOperator.Replace) {
                this._playRequestList = [];
                this._playRequestList = messages;
            }
            else if (data.op == Cmd.UpdateOperator.Update) {
                for (var i = 0; i < messages.length; i++) {
                    var item = messages[i];
                    for (var j = 0; j < this._playRequestList.length; j++) {
                        var request = this._playRequestList[j];
                        if (request.config != null && request.config.globalRoomId == item.config.globalRoomId) {
                            var itemList = item.itemList != null && item.itemList instanceof Array ? item.itemList : [];
                            this.updateList(request.itemList, item.itemList);
                        }
                        else {
                            this._playRequestList.push(item);
                        }
                    }
                }
            }
            else if (data.op == Cmd.UpdateOperator.Delete) {
                for (var i = 0; i < messages.length; i++) {
                    var item = messages[i];
                    for (var j = 0; j < this._playRequestList.length; j++) {
                        var request = this._playRequestList[j];
                        if (request.config != null && request.config.globalRoomId == item.config.globalRoomId) {
                            var itemList = item.itemList != null && item.itemList instanceof Array ? item.itemList : [];
                            this.removeList(request.itemList, item.itemList);
                        }
                        var list = request.itemList != null && request.itemList instanceof Array ? request.itemList : [];
                        if (list.length <= 0)
                            this._playRequestList.splice(j, 1);
                    }
                }
            }
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.EVENT_L2G, "GameMessageUpdate");
        };
        MJLobbyData.prototype.updateList = function (list1, list2) {
            for (var i = 0; i < list1.length; i++) {
                var item = list1[i];
                for (var j = 0; j < list2.length; j++) {
                    var request = list2[j];
                    if (request.user != null && request.user.uid != null && item.user != null && item.user.uid != null && request.user.uid == item.user.uid) {
                        item = request;
                    }
                    else {
                        list1.push(request);
                    }
                }
            }
        };
        MJLobbyData.prototype.removeList = function (list1, list2) {
            for (var i = 0; i < list1.length; i++) {
                var item = list1[i];
                for (var j = 0; j < list2.length; j++) {
                    var request = list2[j];
                    if (request.user != null && request.user.uid != null && item.user != null && item.user.uid != null && request.user.uid == item.user.uid) {
                        list1.splice(i, 1);
                    }
                }
            }
        };
        /**闲聊分享链接 */
        MJLobbyData.prototype.getXianLiaoLink = function () {
            var nick = MJLobbyData.getInstance().myBaseInfo.nickName;
            if (nick.length > 8) {
                nick = nick.slice(0, 8);
            }
            return "http://open.xianliao.updrips.com/connect/oauth2/authorize?appid=" + MJLobbyData.getInstance().lobbyConfig["xianliaoAppid"] + "&redirect_uri= http://" + MJLobbyData.getInstance().lobbyConfig["xianliaoUrl"] + "/" + uniLib.Global.gameConfig.gameid + "/311/login_request&state=" + uniLib.CompressUtil.base64encode(MJLobbyData.getInstance().myBaseInfo.uid + "|" + 0 + "|" + nick) + "&response_type=code#xianliao_redirect";
        };
        /**
         * 显示游戏端特有loading
         */
        MJLobbyData.ShowGameLoading = false;
        return MJLobbyData;
    })();
    MJLobby.MJLobbyData = MJLobbyData;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 比赛场数据
     */
    var MJLobbyMatchData = (function () {
        function MJLobbyMatchData() {
            /**是否报名 */
            this.isEnroll = false;
            /**报名时间 */
            this.enrollTime = [];
            /**报名人数 */
            this.enrollNum = [];
        }
        MJLobbyMatchData.getInstance = function () {
            if (!this._instance) {
                this._instance = new MJLobbyMatchData();
            }
            return this._instance;
        };
        return MJLobbyMatchData;
    })();
    MJLobby.MJLobbyMatchData = MJLobbyMatchData;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 邮件
     */
    var Mail = (function () {
        function Mail() {
            this.m_mail = [];
        }
        Object.defineProperty(Mail, "Instance", {
            get: function () {
                if (!this.m_instance)
                    this.m_instance = new Mail();
                return this.m_instance;
            },
            enumerable: true,
            configurable: true
        });
        Mail.prototype.initMail = function (mails) {
            mails = mails && mails instanceof Array ? mails : [];
            this.m_mail = mails;
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Mail_Changed, this.m_mail);
        };
        Mail.prototype.add = function (mail) {
            if (mail == null)
                return;
            this.m_mail.push(mail);
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Mail_Changed, this.m_mail);
        };
        Mail.prototype.delete = function (id) {
            for (var i = 0; i < this.m_mail.length; i++) {
                if (this.m_mail[i].id == id) {
                    this.m_mail.splice(i, 1);
                    break;
                }
            }
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Mail_Changed, this.m_mail);
        };
        Mail.prototype.changedMailState = function (id, state) {
            var mail = null;
            for (var i = 0; i < this.m_mail.length; i++) {
                if (this.m_mail[i].id == id) {
                    mail = this.m_mail[i];
                    break;
                }
            }
            if (mail == null)
                return;
            mail.state = state;
            Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.Mail_Changed, this.m_mail);
        };
        Object.defineProperty(Mail.prototype, "mailList", {
            get: function () {
                return this.m_mail;
            },
            enumerable: true,
            configurable: true
        });
        Mail.prototype.clear = function () {
            this.m_mail.splice(0, this.m_mail.length);
        };
        return Mail;
    })();
    MJLobby.Mail = Mail;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 向大厅发送的消息队列 大厅启动后执行所有消息
     */
    var MessageQueue = (function () {
        function MessageQueue() {
            this.m_message = [];
        }
        Object.defineProperty(MessageQueue, "Instance", {
            get: function () {
                if (!this.m_instance)
                    this.m_instance = new MessageQueue();
                return this.m_instance;
            },
            enumerable: true,
            configurable: true
        });
        MessageQueue.prototype.push = function (message) {
            this.m_message.push(message);
        };
        Object.defineProperty(MessageQueue.prototype, "message", {
            get: function () {
                return this.m_message;
            },
            enumerable: true,
            configurable: true
        });
        MessageQueue.prototype.clear = function () {
            this.m_message.splice(0, this.m_message.length);
        };
        MessageQueue.prototype.call = function () {
            for (var _i = 0, _a = this.m_message; _i < _a.length; _i++) {
                var item = _a[_i];
                var msgBox = new MJLobby.LobbyMsgBox(false);
                var labelArr = item.cancelCallBack == null ? ["确定"] : ["确定", "取消"];
                msgBox.setData(item.title, item.text, labelArr, [item.confirmCallBack, item.cancelCallBack], this);
                msgBox.x = Math.round((MJLobby.LobbyDataCache.defaultWidth - msgBox.width) / 2);
                msgBox.y = Math.round((MJLobby.LobbyDataCache.defaultHeight - msgBox.height) / 2);
                uniLib.PopUpMgr.addPopUp(msgBox, MJLobby.MJLobbyInfo.topLayer, true, false);
            }
            this.clear();
        };
        return MessageQueue;
    })();
    MJLobby.MessageQueue = MessageQueue;
    var MessageItem = (function () {
        function MessageItem() {
        }
        return MessageItem;
    })();
    MJLobby.MessageItem = MessageItem;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     * 签到数据
     */
    var CheckInVo = (function () {
        function CheckInVo() {
        }
        return CheckInVo;
    })();
    MJLobby.CheckInVo = CheckInVo;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /*
    *传递给游戏的数据
    */
    var JoinRoomVo = (function () {
        function JoinRoomVo() {
        }
        return JoinRoomVo;
    })();
    MJLobby.JoinRoomVo = JoinRoomVo;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var ListVo = (function () {
        function ListVo() {
        }
        return ListVo;
    })();
    MJLobby.ListVo = ListVo;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var VoiceDataVo = (function () {
        function VoiceDataVo() {
        }
        return VoiceDataVo;
    })();
    MJLobby.VoiceDataVo = VoiceDataVo;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var HeadLoader = (function () {
        function HeadLoader() {
        }
        HeadLoader.prototype.load = function (url, completeFun, ioErrFun, obj) {
            this.destroy();
            this._completeFun = completeFun;
            this._errorFun = ioErrFun;
            this._callObj = obj;
            this._headUrl = url;
            var data = this.getHeadCache(url);
            if (data) {
                if (this._completeFun) {
                    this._completeFun.call(this._callObj, data);
                }
            }
            else {
                this._imageLoader = new egret.ImageLoader();
                this._imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
                this._imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
                // this._imageLoader.crossOrigin = "anonymous";
                this._imageLoader.load(this._headUrl);
            }
        };
        HeadLoader.prototype.loadCompleteHandler = function (event) {
            this._imageLoader.removeEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
            this._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.saveHeadCache(this._headUrl, this._imageLoader.data);
            if (this._completeFun) {
                this._completeFun.call(this._callObj, this._imageLoader.data);
            }
        };
        HeadLoader.prototype.onIOError = function (event) {
            this._imageLoader.removeEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
            this._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            if (this._errorFun) {
                this._errorFun.call(this._callObj);
            }
        };
        HeadLoader.prototype.destroy = function () {
            if (this._imageLoader) {
                this._imageLoader.removeEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
                this._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
                this._imageLoader = null;
            }
            this._completeFun = null;
            this._errorFun = null;
            this._callObj = null;
            this._headUrl = null;
        };
        HeadLoader.prototype.getHeadCache = function (headUrl) {
            if (!uniLib.Global.localCache) {
                uniLib.Global.localCache = {};
            }
            else {
                if (uniLib.Global.localCache[headUrl]) {
                    return uniLib.Global.localCache[headUrl];
                }
            }
            return null;
        };
        HeadLoader.prototype.saveHeadCache = function (url, data) {
            if (!uniLib.Global.localCache) {
                uniLib.Global.localCache = {};
            }
            uniLib.Global.localCache[url] = data;
        };
        return HeadLoader;
    })();
    MJLobby.HeadLoader = HeadLoader;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /**
     *
     * @author
     *
     */
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader(url, w, h) {
            _super.call(this);
            this._url = url;
            this._height = h;
            this._width = w;
            this.load();
        }
        Loader.prototype.load = function () {
            var loader = new egret.URLLoader();
            //设置加载方式为纹理
            loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            //添加加载完成侦听
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            //添加加载失败侦听
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            var url = this._url;
            var request = new egret.URLRequest(url);
            //开始加载
            loader.load(request);
        };
        Loader.prototype.onLoadComplete = function (event) {
            uniLib.Console.log("onLoadComplete");
            var loader = event.target;
            //获取加载到的纹理对象
            var texture = loader.data;
            var bitMap = new egret.Bitmap(texture);
            bitMap.width = this._width;
            bitMap.height = this._height;
            this.addChild(bitMap);
        };
        Loader.prototype.onLoadError = function () {
            uniLib.Console.log("onLoadError");
        };
        return Loader;
    })(egret.DisplayObjectContainer);
    MJLobby.Loader = Loader;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    var NetConsts = (function () {
        function NetConsts() {
        }
        NetConsts.SUCCESS = 0;
        NetConsts.PRIORITY = 32; //优先级等待
        NetConsts.FENGHAO = 6; //封号
        NetConsts.TIXIAXIAN = 5; //踢下线
        return NetConsts;
    })();
    MJLobby.NetConsts = NetConsts;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    /**
     *
     * @author
     *
     */
    var HSlide = (function (_super) {
        __extends(HSlide, _super);
        function HSlide(trackName, thumbName, width, trackHighlightName, scale9Grid1, scale9Grid2) {
            _super.call(this);
            this._minValue = 1;
            this._maxValue = 10;
            this._value = 1;
            this.gap = 1;
            this.lastX = 0;
            this.touchX = 0;
            this.width = width;
            this.track = new egret.Bitmap(RES.getRes(trackName));
            this.track.scale9Grid = scale9Grid1;
            this.thumb = new egret.Bitmap(RES.getRes(thumbName));
            ;
            this.trackHighlight = new egret.Bitmap(RES.getRes(trackHighlightName));
            this.trackHighlight.scale9Grid = scale9Grid2;
            this.addChild(this.track);
            if (this.trackHighlight) {
                this.addChild(this.trackHighlight);
            }
            this.addChild(this.thumb);
            this.track.width = this.width;
            this.track.y = (this.height - this.track.height) / 2;
            if (this.trackHighlight) {
                this.trackHighlight.touchEnabled = false;
                this.trackHighlight.y = (this.height - this.trackHighlight.height) / 2;
            }
            this.thumb.y = (this.height - this.thumb.height) / 2;
            this.thumbMaxX = this.width - this.thumb.width;
            this.thumb.touchEnabled = true;
            this.track.touchEnabled = true;
            this.thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbTouch, this);
            this.track.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTrackTouch, this);
        }
        HSlide.prototype.onTrackTouch = function (event) {
            this.updateThumbPos(event.localX - this.thumb.width / 2);
        };
        HSlide.prototype.onThumbTouch = function (event) {
            this.lastX = event.stageX;
            this.touchX = this.thumb.x;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
        };
        HSlide.prototype.onStageMove = function (event) {
            var gap = event.stageX - this.lastX;
            this.updateThumbPos(this.touchX + gap);
        };
        HSlide.prototype.onStageEnd = function (event) {
            if (this.stage) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
            }
        };
        Object.defineProperty(HSlide.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (num) {
                if (this.gap >= 1)
                    num = Math.floor(num);
                if (num > this._maxValue) {
                    num = this._maxValue;
                }
                else if (num < this._minValue) {
                    num = this._minValue;
                }
                if (this._value != num) {
                    this._value = num;
                    this.updatePos();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HSlide.prototype, "maxValue", {
            get: function () {
                return this._maxValue;
            },
            set: function (num) {
                if (this._maxValue != num) {
                    this._maxValue = num;
                    this.value = this._value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HSlide.prototype, "minValue", {
            get: function () {
                return this._minValue;
            },
            set: function (num) {
                if (!num) {
                    num = 0;
                }
                if (this._minValue != num) {
                    this._minValue = num;
                    this.value = this._value;
                }
            },
            enumerable: true,
            configurable: true
        });
        HSlide.prototype.updateThumbPos = function (num) {
            this.thumb.x = num;
            if (this.thumb.x < 0) {
                this.thumb.x = -5;
            }
            else if (this.thumb.x > this.thumbMaxX) {
                this.thumb.x = this.thumbMaxX;
            }
            this.updateValue();
        };
        HSlide.prototype.updateValue = function () {
            var perent = this.thumb.x / this.thumbMaxX;
            var value = this._minValue + perent * (this._maxValue - this._minValue);
            value = Math.floor(value / this.gap) * this.gap;
            if (this._value != value) {
                this._value = value;
                this.dispatchEventWith(egret.Event.CHANGE, false, this._value);
            }
            this.updateTrackHighlight();
        };
        HSlide.prototype.updatePos = function () {
            var perent = (this._value - this._minValue) / (this._maxValue - this._minValue);
            this.thumb.x = this.thumbMaxX * perent;
            this.updateTrackHighlight();
        };
        HSlide.prototype.updateTrackHighlight = function () {
            if (this.trackHighlight) {
                this.trackHighlight.width = this.thumb.x + this.thumb.width / 2;
            }
        };
        HSlide.prototype.dispose = function () {
            if (this.stage) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMove, this);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageEnd, this);
            }
            if (this.track) {
                uniLib.DisplayUtils.removeFromParent(this.track);
            }
            this.track = null;
            if (this.thumb) {
                uniLib.DisplayUtils.removeFromParent(this.thumb);
            }
            this.thumb = null;
            if (this.trackHighlight) {
                uniLib.DisplayUtils.removeFromParent(this.trackHighlight);
            }
            this.trackHighlight = null;
            uniLib.DisplayUtils.removeAllChildren(this);
        };
        return HSlide;
    })(egret.Sprite);
    ui.HSlide = HSlide;
})(ui || (ui = {}));

var MJLobby;
(function (MJLobby) {
    var LobbyUtils = (function () {
        function LobbyUtils() {
        }
        LobbyUtils.getGoodNameByShopId = function (shopId) {
            var daoju = RES.getRes("TableGoodsConfig_json");
            var shop = RES.getRes("TableShopConfig_json");
            var good;
            var daojuVo;
            var goodVo;
            var index = 0;
            var data = {};
            for (var i = 0; i < shop.length; i++) {
                good = shop[i];
                if (good.shopId == shopId) {
                    good = shop[i];
                    //let goodItem = LobbyUtils.getGoodsConfigByGoodsId(good.goodId);
                    daojuVo = daoju[good.shopGoods.goodId - 1]; //!= null ? daoju[good.shopGoods.goodId - 1] : goodItem;
                    data.goodName = daojuVo.goodName;
                    data.goodNbr = daojuVo.giftGoods[0].goodNbr;
                    data.goodDesc = daojuVo.goodDesc;
                    data.price = good.price;
                    return data;
                }
            }
            return null;
        };
        /**
         * 根据物品Id获取物品信息
         */
        LobbyUtils.getGoodsConfigByGoodsId = function (goodId) {
            var daoju = RES.getRes("TableGoodsConfig_json");
            for (var i = 0; i < daoju.length; i++) {
                var item = daoju[i];
                if (item.goodId == goodId)
                    return item;
            }
            return null;
        };
        LobbyUtils.changeTimeToStr = function (num) {
            if (num == null)
                return "";
            num = num.toString().length == 10 ? num * 1000 : num;
            var date = new Date();
            date.setTime(num);
            var str = date.getFullYear() + "-" + this.getNumStr(date.getMonth() + 1) + "-" + this.getNumStr(date.getDate()) + "  " + this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
            return str;
        };
        LobbyUtils.getNumStr = function (num) {
            if (num < 10) {
                return "0" + num;
            }
            return num.toString();
        };
        LobbyUtils.getBitmapFontTxt = function (fontName, w, align, x, y) {
            if (align === void 0) { align = egret.HorizontalAlign.LEFT; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var bitmapText = new MJLobby.BitmapText();
            bitmapText.initTxt(RES.getRes(fontName), w, align);
            bitmapText.x = x;
            bitmapText.y = y;
            return bitmapText;
        };
        LobbyUtils.defaultColor = 0x4E4943;
        return LobbyUtils;
    })();
    MJLobby.LobbyUtils = LobbyUtils;
})(MJLobby || (MJLobby = {}));

var MJLobby;
(function (MJLobby) {
    /**
     *
     * @author
     *
     */
    var LobbyResUtil = (function () {
        function LobbyResUtil() {
        }
        /**
         * 获取url参数
         */
        LobbyResUtil.getURLData = function () {
            if (!this.initParams) {
                this.initParams = {};
                var str = window.location.search;
                if (str == "") {
                    return;
                }
                if (str.charAt(0) == "?") {
                    str = str.slice(1);
                    var arr = str.split(/&/);
                    var paramArr;
                    for (var i = 0; i < arr.length; i++) {
                        paramArr = arr[i].split(/=/);
                        if (paramArr.length == 2) {
                            this.initParams[paramArr[0]] = paramArr[1];
                        }
                    }
                }
            }
            return this.initParams;
        };
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        LobbyResUtil.createBitmapByName = function (name, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            result.smoothing = true;
            result.x = x;
            result.y = y;
            return result;
        };
        LobbyResUtil.createTexture = function (name) {
            var texture = RES.getRes(name);
            return texture;
        };
        LobbyResUtil.trace = function () {
            var str = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                str[_i - 0] = arguments[_i];
            }
            uniLib.Console.log(str.join(","));
        };
        LobbyResUtil.randRange = function (min, max) {
            var num = max - min;
            var randomNum = Math.floor(Math.random() * num);
            return min + randomNum;
        };
        /**
         * 格式化货币
         * @param currency 货币
         * @param num
         * @return String
         **/
        LobbyResUtil.currencyFormat = function (num, len) {
            if (len === void 0) { len = -1; }
            var str = Math.abs(num).toString();
            var sign = "";
            if (num < 0) {
                sign = "-";
            }
            var small = "";
            if (str.indexOf(".") > -1) {
                small = str.substring(str.indexOf("."), str.length);
                str = str.substring(0, str.indexOf("."));
            }
            if (len != -1) {
                while (str.length < len) {
                    str = "0" + str;
                }
            }
            var ary = str.split("");
            var leng = ary.length;
            var index = 1;
            for (var i = leng - 1; i > 0; i--, index++) {
                if ((index / 3) == 1) {
                    index = 0;
                    ary[i] = "," + ary[i];
                }
            }
            return sign + ary.join("") + small;
        };
        LobbyResUtil.backToNumber = function (numStr) {
            var num;
            //            numStr=numStr.replace(SystemConsts.CURRENCY,"");
            var pattern = /,/g;
            numStr = numStr.replace(pattern, "");
            return Math.round(Number(numStr));
        };
        //字符串长度
        LobbyResUtil.getCharLength = function (txt) {
            var byte = new egret.ByteArray();
            byte.writeUTF(txt);
            byte.position = 0;
            return byte.bytesAvailable;
        };
        /**
          通过json png
          创建MovieClip
        */
        LobbyResUtil.createMovieClip = function (name, jsons, png) {
            var mc;
            var data = RES.getRes(jsons);
            var txtr = RES.getRes(png);
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            mc = new egret.MovieClip(mcFactory.generateMovieClipData(name));
            mc.gotoAndStop(1);
            mc.name = name;
            return mc;
        };
        LobbyResUtil.createTextFeild = function (color, align, text, size, x, y, width, isBold) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = -1; }
            if (isBold === void 0) { isBold = false; }
            var tf = new egret.TextField();
            if (width != -1) {
                tf.width = width;
            }
            tf.fontFamily = "微软雅黑";
            tf.bold = isBold;
            tf.textColor = color;
            tf.textAlign = align;
            tf.text = text;
            tf.size = size;
            tf.x = x;
            tf.y = y;
            tf.multiline = false;
            return tf;
        };
        LobbyResUtil.createFontText = function (text, x, y, width, font) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = -1; }
            if (!font) {
                font = RES.getRes("betTipText_fnt");
            }
            var tf = new egret.BitmapText();
            if (width != -1) {
                tf.width = width;
            }
            tf.font = font;
            tf.text = text;
            tf.x = x;
            tf.y = y;
            return tf;
        };
        LobbyResUtil.createScroll = function (content, w, h, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var scrollView = new egret.ScrollView();
            scrollView.width = w;
            scrollView.height = h;
            scrollView.x = x;
            scrollView.y = y;
            scrollView.setContent(content);
            return scrollView;
        };
        /**
    * 从父级中移除显示对象（如显示对象为影片剪辑则停止）
    * @param dis
    *
    */
        LobbyResUtil.removeFromParent = function (dis) {
            if (dis && dis.parent) {
                dis.parent.removeChild(dis);
            }
        };
        /**
        * 移除显示容器中的所有子集但不包括自己
        * @paramisContainer
        */
        LobbyResUtil.removeAllChildren = function (disContainer) {
            while (disContainer.numChildren > 0) {
                this.removeFromParent(disContainer.getChildAt(0));
            }
        };
        LobbyResUtil.getTimeStr2 = function () {
            var date = new Date();
            var str = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " >>> ";
            return str;
        };
        LobbyResUtil.numFormat = function (num, decimal) {
            if (decimal === void 0) { decimal = 0; }
            var str;
            var tempStr = "";
            var sign = "";
            if (num < 0) {
                num = -num;
                sign = "-";
            }
            var numArr;
            var uArr;
            numArr = [1000000000, 1000000, 1000];
            uArr = ["B", "M", "K"];
            str = String(num);
            for (var j = 0; j < numArr.length; j++) {
                if (num >= numArr[j]) {
                    tempStr = uArr[j];
                    if (decimal == -1) {
                        str = String(num / numArr[j]);
                    }
                    else {
                        str = String(this.setDot(num / numArr[j], decimal));
                    }
                    break;
                }
            }
            if (str.indexOf(".") != -1) {
                //如果小数点为0直接去掉
                for (var i = 0; i < decimal; i++) {
                    if (Number(str.charAt(str.length - 1)) == 0) {
                        if (i + 1 == decimal)
                            str = str.slice(0, str.length - 2);
                        else
                            str = str.slice(0, str.length - 1);
                    }
                }
                if (str.charAt(str.length - 1) == ".")
                    str = str.slice(0, str.length - 1);
            }
            return sign + str.concat(tempStr);
        };
        /**
         * 格式化数字
         */
        LobbyResUtil.numFormat2 = function (num, decimal) {
            if (decimal === void 0) { decimal = 0; }
            var str;
            var tempStr = "";
            var sign = "";
            if (num < 0) {
                num = -num;
                sign = "-";
            }
            var numArr;
            var uArr;
            numArr = [100000000, 10000, 1000];
            uArr = ["亿", "万", "千"];
            str = String(num);
            for (var j = 0; j < numArr.length; j++) {
                if (num >= numArr[j]) {
                    tempStr = uArr[j];
                    if (decimal == -1) {
                        str = String(num / numArr[j]);
                    }
                    else {
                        str = String(this.setDot(num / numArr[j], decimal));
                    }
                    break;
                }
            }
            if (str.indexOf(".") != -1) {
                //如果小数点为0直接去掉
                for (var i = 0; i < decimal; i++) {
                    if (Number(str.charAt(str.length - 1)) == 0) {
                        if (i + 1 == decimal)
                            str = str.slice(0, str.length - 2);
                        else
                            str = str.slice(0, str.length - 1);
                    }
                }
                if (str.charAt(str.length - 1) == ".")
                    str = str.slice(0, str.length - 1);
            }
            return sign + str.concat(tempStr);
        };
        LobbyResUtil.setDot = function (num, decimal) {
            if (decimal === void 0) { decimal = -1; }
            if (decimal > 0) {
                return Math.floor(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
            }
            else if (decimal == 0) {
                return Math.floor(num);
            }
            return num;
        };
        /**
            超过10万，显示XX万。在大于10万，小于100万的时候，最多显示两位小数
            大于100万，小于1千万的时候，显示一位小数
            大于1千万小于1亿的时候，不显示小数。
            大于1亿小于100亿的时候显示2位小数。
            大于100亿之后不显示小数
         */
        /**麻将大厅货币规格 */
        LobbyResUtil.numberFormat = function (num) {
            var str;
            if (num < 1e5) {
                str = "" + num;
            }
            else if (num >= 1e5 && num < 1e6) {
                str = (num / 1e4).toFixed(2) + "万";
            }
            else if (num >= 1e6 && num < 1e7) {
                str = (num / 1e4).toFixed(1) + "万";
            }
            else if (num >= 1e7 && num < 1e8) {
                str = (num / 1e4).toFixed(0) + "万";
            }
            else if (num >= 1e8 && num < 1e10) {
                str = (num / 1e8).toFixed(2) + "亿";
            }
            else {
                str = (num / 1e8).toFixed(0) + "亿";
            }
            return str;
        };
        return LobbyResUtil;
    })();
    MJLobby.LobbyResUtil = LobbyResUtil;
})(MJLobby || (MJLobby = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MJLobby;
(function (MJLobby) {
    /*****
     * 游戏内公用的消息跑马灯
     * */
    var CommonSysMsgMc = (function (_super) {
        __extends(CommonSysMsgMc, _super);
        function CommonSysMsgMc() {
            _super.call(this);
            this._noticeArr = [];
        }
        CommonSysMsgMc.prototype.initUI = function () {
            this._buffer = 30;
            var bg = MJLobby.LobbyResUtil.createBitmapByName("mjl_lobby_systembg");
            bg.scale9Grid = new egret.Rectangle(100, 41, 14, 23);
            bg.width = 700;
            this.addChild(bg);
            this._msgTxt = MJLobby.LobbyResUtil.createTextFeild(0x1a2725, egret.HorizontalAlign.LEFT, " ", 32, 50, 18);
            this._msgTxt.multiline = false;
            this._msgTxt.height += 10;
            this._txtMc = new egret.DisplayObjectContainer();
            this._txtMc.addChild(this._msgTxt);
            this._txtMc.x = 80;
            this.addChild(this._txtMc);
            this._txtMc.scrollRect = new egret.Rectangle(0, 0, 610, bg.height);
            this.visible = false;
            /********返回大厅的时候tween被游戏都移除了，延迟一会显示 */
            // var self = this;
            // setTimeout(function () {
            // 	self.noticeTest();
            // }, 200);
        };
        CommonSysMsgMc.prototype.noticeTest = function () {
            if (!this._msgTxt) {
                return;
            }
            if (!this._noticeArr || this._noticeArr.length == 0) {
                this.scrollEnd();
                return;
            }
            this.scrollEnd();
            this._msgTxt.textFlow = (new egret.HtmlTextParser).parser(this._noticeArr.shift());
            this.startScroll();
        };
        CommonSysMsgMc.prototype.startScroll = function () {
            if (!this._noticeArr || this._noticeArr.length == 0) {
                return;
            }
            this.visible = true;
            egret.Tween.removeTweens(this._msgTxt);
            this._msgTxt.text = this._noticeArr.shift();
            this._msgTxt.x = 618 + this._buffer;
            var w = this._msgTxt.textWidth < 618 ? 618 : this._msgTxt.textWidth;
            egret.Tween.get(this._msgTxt).to({ x: -(this._msgTxt.textWidth + this._buffer) }, 10 * (w + this._buffer)).call(this.noticeTest, this);
        };
        CommonSysMsgMc.prototype.scrollEnd = function () {
            egret.Tween.removeTweens(this._msgTxt);
            this.visible = false;
            this._msgTxt.text = "";
        };
        CommonSysMsgMc.prototype.onNoticeCome = function (e) {
            var notice = e.param;
            if (this._noticeArr == null) {
                this._noticeArr = [];
            }
            this._noticeArr.push(notice.info);
            this.startScroll();
            // 	this._msgTxt.text = this._noticeArr.shift();
            // 	this.startScroll();
        };
        CommonSysMsgMc.prototype.destory = function () {
            _super.prototype.destory.call(this);
            this.scrollEnd();
            this._msgTxt = null;
            this._noticeArr = null;
            this._txtMc = null;
        };
        return CommonSysMsgMc;
    })(MJLobby.LobbyBaseVc);
    MJLobby.CommonSysMsgMc = CommonSysMsgMc;
})(MJLobby || (MJLobby = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: bashi_club.proto
var Cmd;
(function (Cmd) {
    /**
     * 通用结果返回
     */
    var BSClubResult = (function () {
        function BSClubResult() {
        }
        BSClubResult.prototype.GetType = function () { return 'Cmd.BSClubResult'; };
        return BSClubResult;
    })();
    Cmd.BSClubResult = BSClubResult;
    /**
     * 登录俱乐部
     */
    var BSClubLoginCmd_CS = (function () {
        function BSClubLoginCmd_CS() {
        }
        BSClubLoginCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubLoginCmd_CS'; };
        return BSClubLoginCmd_CS;
    })();
    Cmd.BSClubLoginCmd_CS = BSClubLoginCmd_CS;
    var BSClubLoginCmd_CS;
    (function (BSClubLoginCmd_CS) {
        var LoginData = (function () {
            function LoginData() {
            }
            LoginData.prototype.GetType = function () { return 'Cmd.BSClubLoginCmd_CS.LoginData'; };
            return LoginData;
        })();
        BSClubLoginCmd_CS.LoginData = LoginData;
    })(BSClubLoginCmd_CS = Cmd.BSClubLoginCmd_CS || (Cmd.BSClubLoginCmd_CS = {}));
    /**
     * 加入俱乐部
     */
    var BSClubJoinCmd_CS = (function () {
        function BSClubJoinCmd_CS() {
        }
        BSClubJoinCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubJoinCmd_CS'; };
        return BSClubJoinCmd_CS;
    })();
    Cmd.BSClubJoinCmd_CS = BSClubJoinCmd_CS;
    /**
     * 退出俱乐部
     */
    var BSClubExitCmd_CS = (function () {
        function BSClubExitCmd_CS() {
        }
        BSClubExitCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubExitCmd_CS'; };
        return BSClubExitCmd_CS;
    })();
    Cmd.BSClubExitCmd_CS = BSClubExitCmd_CS;
    /**
     * 俱乐部数据
     */
    var BSClubInfoCmd_CS = (function () {
        function BSClubInfoCmd_CS() {
        }
        BSClubInfoCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubInfoCmd_CS'; };
        return BSClubInfoCmd_CS;
    })();
    Cmd.BSClubInfoCmd_CS = BSClubInfoCmd_CS;
    var BSClubInfoCmd_CS;
    (function (BSClubInfoCmd_CS) {
        var ActivityInfo = (function () {
            function ActivityInfo() {
            }
            ActivityInfo.prototype.GetType = function () { return 'Cmd.BSClubInfoCmd_CS.ActivityInfo'; };
            return ActivityInfo;
        })();
        BSClubInfoCmd_CS.ActivityInfo = ActivityInfo;
    })(BSClubInfoCmd_CS = Cmd.BSClubInfoCmd_CS || (Cmd.BSClubInfoCmd_CS = {}));
    var BSClubInfoCmd_CS;
    (function (BSClubInfoCmd_CS) {
        var ClubInfo = (function () {
            function ClubInfo() {
            }
            ClubInfo.prototype.GetType = function () { return 'Cmd.BSClubInfoCmd_CS.ClubInfo'; };
            return ClubInfo;
        })();
        BSClubInfoCmd_CS.ClubInfo = ClubInfo;
    })(BSClubInfoCmd_CS = Cmd.BSClubInfoCmd_CS || (Cmd.BSClubInfoCmd_CS = {}));
    /**
     * 俱乐部成员列表
     */
    var BSClubMemberListCmd_CS = (function () {
        function BSClubMemberListCmd_CS() {
        }
        BSClubMemberListCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubMemberListCmd_CS'; };
        return BSClubMemberListCmd_CS;
    })();
    Cmd.BSClubMemberListCmd_CS = BSClubMemberListCmd_CS;
    var BSClubMemberListCmd_CS;
    (function (BSClubMemberListCmd_CS) {
        var MemberInfo = (function () {
            function MemberInfo() {
            }
            MemberInfo.prototype.GetType = function () { return 'Cmd.BSClubMemberListCmd_CS.MemberInfo'; };
            return MemberInfo;
        })();
        BSClubMemberListCmd_CS.MemberInfo = MemberInfo;
    })(BSClubMemberListCmd_CS = Cmd.BSClubMemberListCmd_CS || (Cmd.BSClubMemberListCmd_CS = {}));
    var BSClubMemberListCmd_CS;
    (function (BSClubMemberListCmd_CS) {
        var MemberListData = (function () {
            function MemberListData() {
            }
            MemberListData.prototype.GetType = function () { return 'Cmd.BSClubMemberListCmd_CS.MemberListData'; };
            return MemberListData;
        })();
        BSClubMemberListCmd_CS.MemberListData = MemberListData;
    })(BSClubMemberListCmd_CS = Cmd.BSClubMemberListCmd_CS || (Cmd.BSClubMemberListCmd_CS = {}));
    /**
     * 俱乐部成员查找
     */
    var BSClubMemberFindCmd_CS = (function () {
        function BSClubMemberFindCmd_CS() {
        }
        BSClubMemberFindCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubMemberFindCmd_CS'; };
        return BSClubMemberFindCmd_CS;
    })();
    Cmd.BSClubMemberFindCmd_CS = BSClubMemberFindCmd_CS;
    var BSClubMemberFindCmd_CS;
    (function (BSClubMemberFindCmd_CS) {
        var MemberInfo = (function () {
            function MemberInfo() {
            }
            MemberInfo.prototype.GetType = function () { return 'Cmd.BSClubMemberFindCmd_CS.MemberInfo'; };
            return MemberInfo;
        })();
        BSClubMemberFindCmd_CS.MemberInfo = MemberInfo;
    })(BSClubMemberFindCmd_CS = Cmd.BSClubMemberFindCmd_CS || (Cmd.BSClubMemberFindCmd_CS = {}));
    /**
     * 检查能否转账
     */
    var BSClubCanTransferCmd_CS = (function () {
        function BSClubCanTransferCmd_CS() {
        }
        BSClubCanTransferCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubCanTransferCmd_CS'; };
        return BSClubCanTransferCmd_CS;
    })();
    Cmd.BSClubCanTransferCmd_CS = BSClubCanTransferCmd_CS;
    /**
     * 赠送金币
     */
    var BSClubGiftGoldCmd_CS = (function () {
        function BSClubGiftGoldCmd_CS() {
        }
        BSClubGiftGoldCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubGiftGoldCmd_CS'; };
        return BSClubGiftGoldCmd_CS;
    })();
    Cmd.BSClubGiftGoldCmd_CS = BSClubGiftGoldCmd_CS;
    /**
     * 使用礼券
     */
    var BSClubUseCouponCmd_CS = (function () {
        function BSClubUseCouponCmd_CS() {
        }
        BSClubUseCouponCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubUseCouponCmd_CS'; };
        return BSClubUseCouponCmd_CS;
    })();
    Cmd.BSClubUseCouponCmd_CS = BSClubUseCouponCmd_CS;
    var BSClubUseCouponCmd_CS;
    (function (BSClubUseCouponCmd_CS) {
        var CouponData = (function () {
            function CouponData() {
            }
            CouponData.prototype.GetType = function () { return 'Cmd.BSClubUseCouponCmd_CS.CouponData'; };
            return CouponData;
        })();
        BSClubUseCouponCmd_CS.CouponData = CouponData;
    })(BSClubUseCouponCmd_CS = Cmd.BSClubUseCouponCmd_CS || (Cmd.BSClubUseCouponCmd_CS = {}));
    /**
     * 使用礼券回调
     */
    var BSClubUseCouponCallBackCmd_CS = (function () {
        function BSClubUseCouponCallBackCmd_CS() {
        }
        BSClubUseCouponCallBackCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubUseCouponCallBackCmd_CS'; };
        return BSClubUseCouponCallBackCmd_CS;
    })();
    Cmd.BSClubUseCouponCallBackCmd_CS = BSClubUseCouponCallBackCmd_CS;
    /**
     * 创建俱乐部
     */
    var BSClubCreateCmd_CS = (function () {
        function BSClubCreateCmd_CS() {
        }
        BSClubCreateCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubCreateCmd_CS'; };
        return BSClubCreateCmd_CS;
    })();
    Cmd.BSClubCreateCmd_CS = BSClubCreateCmd_CS;
    /**
     * 管理俱乐部
     */
    var BSClubManageCmd_CS = (function () {
        function BSClubManageCmd_CS() {
        }
        BSClubManageCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubManageCmd_CS'; };
        return BSClubManageCmd_CS;
    })();
    Cmd.BSClubManageCmd_CS = BSClubManageCmd_CS;
    /**
     * 使用点卡
     */
    var BSClubUseCardCmd_CS = (function () {
        function BSClubUseCardCmd_CS() {
        }
        BSClubUseCardCmd_CS.prototype.GetType = function () { return 'Cmd.BSClubUseCardCmd_CS'; };
        return BSClubUseCardCmd_CS;
    })();
    Cmd.BSClubUseCardCmd_CS = BSClubUseCardCmd_CS;
    var BSClubUseCardCmd_CS;
    (function (BSClubUseCardCmd_CS) {
        var CardData = (function () {
            function CardData() {
            }
            CardData.prototype.GetType = function () { return 'Cmd.BSClubUseCardCmd_CS.CardData'; };
            return CardData;
        })();
        BSClubUseCardCmd_CS.CardData = CardData;
    })(BSClubUseCardCmd_CS = Cmd.BSClubUseCardCmd_CS || (Cmd.BSClubUseCardCmd_CS = {}));
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: common.proto
var Cmd;
(function (Cmd) {
    /**
     * 玩家在线状态
     */
    (function (OnlineState) {
        /**
         * 离线
         */
        OnlineState[OnlineState["OnlineState_Offline"] = 0] = "OnlineState_Offline";
        /**
         * 在线
         */
        OnlineState[OnlineState["OnlineState_Online"] = 1] = "OnlineState_Online";
        /**
         * 网络差
         */
        OnlineState[OnlineState["OnlineState_Slow"] = 2] = "OnlineState_Slow";
        /**
         * 离开,切后台
         */
        OnlineState[OnlineState["OnlineState_Leave"] = 3] = "OnlineState_Leave";
        /**
         * 电话中
         */
        OnlineState[OnlineState["OnlineState_Calling"] = 4] = "OnlineState_Calling";
        /**
         * 托管状态
         */
        OnlineState[OnlineState["OnlineState_Hosting"] = 5] = "OnlineState_Hosting";
        /**
         * 排队中,匹配号用
         */
        OnlineState[OnlineState["OnlineState_Waiting"] = 6] = "OnlineState_Waiting";
        /**
         * 游戏中,匹配号用
         */
        OnlineState[OnlineState["OnlineState_Gameing"] = 7] = "OnlineState_Gameing";
    })(Cmd.OnlineState || (Cmd.OnlineState = {}));
    var OnlineState = Cmd.OnlineState;
    /**
     * 房间类型
     */
    (function (RoomType) {
        /**
         * 普通房间
         */
        RoomType[RoomType["RoomType_Normal"] = 0] = "RoomType_Normal";
        /**
         * 快速匹配房
         */
        RoomType[RoomType["RoomType_Quick"] = 1] = "RoomType_Quick";
        /**
         * 练习场
         */
        RoomType[RoomType["RoomType_Learn"] = 2] = "RoomType_Learn";
        /**
         * 匹配号生成房,roomid==globalroomid
         */
        RoomType[RoomType["RoomType_Match"] = 3] = "RoomType_Match";
    })(Cmd.RoomType || (Cmd.RoomType = {}));
    var RoomType = Cmd.RoomType;
    (function (MsgType) {
        /**
         * 底部菜单-&gt;商城
         */
        MsgType[MsgType["Shop"] = 1] = "Shop";
        /**
         * 底部菜单-&gt;好友
         */
        MsgType[MsgType["Friend"] = 2] = "Friend";
        /**
         * 底部菜单-&gt;救济金
         */
        MsgType[MsgType["Alms"] = 3] = "Alms";
        /**
         * 底部菜单-&gt;活动
         */
        MsgType[MsgType["Activity"] = 4] = "Activity";
        /**
         * 底部菜单-&gt;任务
         */
        MsgType[MsgType["DaysTask"] = 5] = "DaysTask";
        /**
         * 底部菜单-&gt;更多
         */
        MsgType[MsgType["More"] = 6] = "More";
        /**
         * 底部菜单-&gt;摇钱树
         */
        MsgType[MsgType["MoneyTree"] = 7] = "MoneyTree";
        /**
         * 通知
         */
        MsgType[MsgType["Notice"] = 8] = "Notice";
        /**
         * 俱乐部
         */
        MsgType[MsgType["Club"] = 9] = "Club";
        /**
         * 战绩
         */
        MsgType[MsgType["Statistics"] = 10] = "Statistics";
        /**
         * 底部菜单-&gt;商城-&gt;礼品屋
         */
        MsgType[MsgType["GiftHouse"] = 100] = "GiftHouse";
        /**
         * 底部菜单-&gt;好友-&gt;好友消息
         */
        MsgType[MsgType["FriendMsg"] = 200] = "FriendMsg";
        /**
         * 底部菜单-&gt;好友-&gt;好友请求
         */
        MsgType[MsgType["FriendReq"] = 201] = "FriendReq";
        /**
         * 底部菜单-&gt;救济金-&gt;领取救济金
         */
        MsgType[MsgType["GetAlms"] = 300] = "GetAlms";
        /**
         * 俱乐部牌局
         */
        MsgType[MsgType["ClubGame"] = 301] = "ClubGame";
        /**
         * 俱乐部成员
         */
        MsgType[MsgType["ClubMember"] = 302] = "ClubMember";
        /**
         * 俱乐部申请
         */
        MsgType[MsgType["ClubApply"] = 303] = "ClubApply";
        MsgType[MsgType["ClubTransit"] = 304] = "ClubTransit";
        /**
         * 底部菜单-&gt;活动-&gt;每日签到
         */
        MsgType[MsgType["Act_DaySign"] = 400] = "Act_DaySign";
        /**
         * 底部菜单-&gt;活动-&gt;幸运翻翻翻
         */
        MsgType[MsgType["Act_TurnCard"] = 401] = "Act_TurnCard";
        /**
         * 底部菜单-&gt;活动-&gt;幸运大转盘
         */
        MsgType[MsgType["Act_TurnTable"] = 402] = "Act_TurnTable";
        /**
         * 底部菜单-&gt;任务-&gt;挑战任务
         */
        MsgType[MsgType["Task_fight"] = 500] = "Task_fight";
        /**
         * 底部菜单-&gt;任务-&gt;充值任务
         */
        MsgType[MsgType["Task_TurnTable"] = 501] = "Task_TurnTable";
        /**
         * 底部菜单-&gt;任务-&gt;每日任务
         */
        MsgType[MsgType["Task_EveryDay"] = 502] = "Task_EveryDay";
        /**
         * 底部菜单-&gt;任务-&gt;成就任务
         */
        MsgType[MsgType["Task_Once"] = 503] = "Task_Once";
        /**
         * 底部菜单-&gt;更多-&gt;公告
         */
        MsgType[MsgType["Task_Notice"] = 600] = "Task_Notice";
        /**
         * 底部菜单-&gt;更多-&gt;魅力值
         */
        MsgType[MsgType["Task_Charm"] = 601] = "Task_Charm";
        /**
         * 底部菜单-&gt;更多-&gt;邮件
         */
        MsgType[MsgType["Task_NewMail"] = 602] = "Task_NewMail";
        /**
         * 底部菜单-&gt;更多-&gt;vip
         */
        MsgType[MsgType["Task_VIP"] = 603] = "Task_VIP";
        /**
         * 底部菜单-&gt;摇钱树-&gt;领取金币
         */
        MsgType[MsgType["Task_MoneyTree"] = 701] = "Task_MoneyTree";
    })(Cmd.MsgType || (Cmd.MsgType = {}));
    var MsgType = Cmd.MsgType;
    /**
     * 容器更新操作符
     */
    (function (UpdateOperator) {
        /**
         * 全部覆盖
         */
        UpdateOperator[UpdateOperator["Replace"] = 1] = "Replace";
        /**
         * 追加或更新
         */
        UpdateOperator[UpdateOperator["Update"] = 2] = "Update";
        /**
         * 删除
         */
        UpdateOperator[UpdateOperator["Delete"] = 3] = "Delete";
        /**
         * 站起
         */
        UpdateOperator[UpdateOperator["StandUp"] = 4] = "StandUp";
    })(Cmd.UpdateOperator || (Cmd.UpdateOperator = {}));
    var UpdateOperator = Cmd.UpdateOperator;
    /**
     * 房间属性
     */
    var roomPropObj = (function () {
        function roomPropObj() {
        }
        roomPropObj.prototype.GetType = function () { return 'Cmd.roomPropObj'; };
        return roomPropObj;
    })();
    Cmd.roomPropObj = roomPropObj;
    var RoomState = (function () {
        function RoomState() {
        }
        RoomState.prototype.GetType = function () { return 'Cmd.RoomState'; };
        return RoomState;
    })();
    Cmd.RoomState = RoomState;
    /**
     * 分享信息
     */
    var ShareInfo = (function () {
        function ShareInfo() {
        }
        ShareInfo.prototype.GetType = function () { return 'Cmd.ShareInfo'; };
        return ShareInfo;
    })();
    Cmd.ShareInfo = ShareInfo;
    /**
     * 邮寄地址
     */
    var DeliverAddr = (function () {
        function DeliverAddr() {
        }
        DeliverAddr.prototype.GetType = function () { return 'Cmd.DeliverAddr'; };
        return DeliverAddr;
    })();
    Cmd.DeliverAddr = DeliverAddr;
    var flowerObj = (function () {
        function flowerObj() {
        }
        flowerObj.prototype.GetType = function () { return 'Cmd.flowerObj'; };
        return flowerObj;
    })();
    Cmd.flowerObj = flowerObj;
    var njU = (function () {
        function njU() {
        }
        njU.prototype.GetType = function () { return 'Cmd.njU'; };
        return njU;
    })();
    Cmd.njU = njU;
    /**
     * 比赛场入场券相关
     */
    var ticketObj = (function () {
        function ticketObj() {
        }
        ticketObj.prototype.GetType = function () { return 'Cmd.ticketObj'; };
        return ticketObj;
    })();
    Cmd.ticketObj = ticketObj;
    /**
     * 比赛场勋章相关
     */
    var medalObj = (function () {
        function medalObj() {
        }
        medalObj.prototype.GetType = function () { return 'Cmd.medalObj'; };
        return medalObj;
    })();
    Cmd.medalObj = medalObj;
    /**
     * 魅力值相关
     */
    var usercpObj = (function () {
        function usercpObj() {
        }
        usercpObj.prototype.GetType = function () { return 'Cmd.usercpObj'; };
        return usercpObj;
    })();
    Cmd.usercpObj = usercpObj;
    /**
     * 聊天消息
     */
    var ChatInfo = (function () {
        function ChatInfo() {
        }
        ChatInfo.prototype.GetType = function () { return 'Cmd.ChatInfo'; };
        return ChatInfo;
    })();
    Cmd.ChatInfo = ChatInfo;
    /**
     * 商品
     */
    var Goods = (function () {
        function Goods() {
        }
        Goods.prototype.GetType = function () { return 'Cmd.Goods'; };
        return Goods;
    })();
    Cmd.Goods = Goods;
    /**
     * 成长属性,让每个账号变的有成长性,可部分规避无门槛逃单问题
     */
    var GrowthAttr = (function () {
        function GrowthAttr() {
        }
        GrowthAttr.prototype.GetType = function () { return 'Cmd.GrowthAttr'; };
        return GrowthAttr;
    })();
    Cmd.GrowthAttr = GrowthAttr;
    /**
     * 玩家充值信息
     */
    var RechargeInfo = (function () {
        function RechargeInfo() {
        }
        RechargeInfo.prototype.GetType = function () { return 'Cmd.RechargeInfo'; };
        return RechargeInfo;
    })();
    Cmd.RechargeInfo = RechargeInfo;
    /**
     * 拥有的时效性道具
     */
    var TimeGoods = (function () {
        function TimeGoods() {
        }
        TimeGoods.prototype.GetType = function () { return 'Cmd.TimeGoods'; };
        return TimeGoods;
    })();
    Cmd.TimeGoods = TimeGoods;
    /**
     * 正在使用个人形象
     */
    var PersonalImage = (function () {
        function PersonalImage() {
        }
        PersonalImage.prototype.GetType = function () { return 'Cmd.PersonalImage'; };
        return PersonalImage;
    })();
    Cmd.PersonalImage = PersonalImage;
    /**
     * 玩家所拥有的充值优惠 (2018.03.16好彩金币场系列需求)
     */
    var RechargeDiscounts = (function () {
        function RechargeDiscounts() {
        }
        RechargeDiscounts.prototype.GetType = function () { return 'Cmd.RechargeDiscounts'; };
        return RechargeDiscounts;
    })();
    Cmd.RechargeDiscounts = RechargeDiscounts;
    /**
     * 基础数据
     */
    var UserBaseInfo = (function () {
        function UserBaseInfo() {
        }
        UserBaseInfo.prototype.GetType = function () { return 'Cmd.UserBaseInfo'; };
        return UserBaseInfo;
    })();
    Cmd.UserBaseInfo = UserBaseInfo;
    /**
     * 修改玩家信息
     */
    var UserBaseInfoUpdateCmd_C = (function () {
        function UserBaseInfoUpdateCmd_C() {
        }
        UserBaseInfoUpdateCmd_C.prototype.GetType = function () { return 'Cmd.UserBaseInfoUpdateCmd_C'; };
        return UserBaseInfoUpdateCmd_C;
    })();
    Cmd.UserBaseInfoUpdateCmd_C = UserBaseInfoUpdateCmd_C;
    /**
     * 请求解散房间
     */
    var RequestDissolveRoom_C = (function () {
        function RequestDissolveRoom_C() {
        }
        RequestDissolveRoom_C.prototype.GetType = function () { return 'Cmd.RequestDissolveRoom_C'; };
        return RequestDissolveRoom_C;
    })();
    Cmd.RequestDissolveRoom_C = RequestDissolveRoom_C;
    var RequestDissolveRoom_S = (function () {
        function RequestDissolveRoom_S() {
        }
        RequestDissolveRoom_S.prototype.GetType = function () { return 'Cmd.RequestDissolveRoom_S'; };
        return RequestDissolveRoom_S;
    })();
    Cmd.RequestDissolveRoom_S = RequestDissolveRoom_S;
    var RequestDissolveRoom_Brd = (function () {
        function RequestDissolveRoom_Brd() {
        }
        RequestDissolveRoom_Brd.prototype.GetType = function () { return 'Cmd.RequestDissolveRoom_Brd'; };
        return RequestDissolveRoom_Brd;
    })();
    Cmd.RequestDissolveRoom_Brd = RequestDissolveRoom_Brd;
    /**
     * 回应解散房间
     */
    var ReplyDissolveRoom_C = (function () {
        function ReplyDissolveRoom_C() {
        }
        ReplyDissolveRoom_C.prototype.GetType = function () { return 'Cmd.ReplyDissolveRoom_C'; };
        return ReplyDissolveRoom_C;
    })();
    Cmd.ReplyDissolveRoom_C = ReplyDissolveRoom_C;
    var ReplyDissolveRoom_S = (function () {
        function ReplyDissolveRoom_S() {
        }
        ReplyDissolveRoom_S.prototype.GetType = function () { return 'Cmd.ReplyDissolveRoom_S'; };
        return ReplyDissolveRoom_S;
    })();
    Cmd.ReplyDissolveRoom_S = ReplyDissolveRoom_S;
    var ReplyDissolveRoom_Brd = (function () {
        function ReplyDissolveRoom_Brd() {
        }
        ReplyDissolveRoom_Brd.prototype.GetType = function () { return 'Cmd.ReplyDissolveRoom_Brd'; };
        return ReplyDissolveRoom_Brd;
    })();
    Cmd.ReplyDissolveRoom_Brd = ReplyDissolveRoom_Brd;
    /**
     * 成功解散房间
     */
    var SuccessDissolveRoom_Brd = (function () {
        function SuccessDissolveRoom_Brd() {
        }
        SuccessDissolveRoom_Brd.prototype.GetType = function () { return 'Cmd.SuccessDissolveRoom_Brd'; };
        return SuccessDissolveRoom_Brd;
    })();
    Cmd.SuccessDissolveRoom_Brd = SuccessDissolveRoom_Brd;
    /**
     * 主动上报客户端IP
     */
    var ClientIpCmd_C = (function () {
        function ClientIpCmd_C() {
        }
        ClientIpCmd_C.prototype.GetType = function () { return 'Cmd.ClientIpCmd_C'; };
        return ClientIpCmd_C;
    })();
    Cmd.ClientIpCmd_C = ClientIpCmd_C;
    /**
     * 通知前端上发获取经度纬度
     */
    var GetGPSLocationCmd_S = (function () {
        function GetGPSLocationCmd_S() {
        }
        GetGPSLocationCmd_S.prototype.GetType = function () { return 'Cmd.GetGPSLocationCmd_S'; };
        return GetGPSLocationCmd_S;
    })();
    Cmd.GetGPSLocationCmd_S = GetGPSLocationCmd_S;
    /**
     * gps获取经度纬度
     */
    var GetGPSLocationCmd_C = (function () {
        function GetGPSLocationCmd_C() {
        }
        GetGPSLocationCmd_C.prototype.GetType = function () { return 'Cmd.GetGPSLocationCmd_C'; };
        return GetGPSLocationCmd_C;
    })();
    Cmd.GetGPSLocationCmd_C = GetGPSLocationCmd_C;
    /**
     * gps获取经度纬度广播
     */
    var GetGPSLocationCmd_Brd = (function () {
        function GetGPSLocationCmd_Brd() {
        }
        GetGPSLocationCmd_Brd.prototype.GetType = function () { return 'Cmd.GetGPSLocationCmd_Brd'; };
        return GetGPSLocationCmd_Brd;
    })();
    Cmd.GetGPSLocationCmd_Brd = GetGPSLocationCmd_Brd;
    var IpGPS = (function () {
        function IpGPS() {
        }
        IpGPS.prototype.GetType = function () { return 'Cmd.IpGPS'; };
        return IpGPS;
    })();
    Cmd.IpGPS = IpGPS;
    /**
     * 请求ip和gps获取经度纬度
     */
    var RequestIpGPSCmd_C = (function () {
        function RequestIpGPSCmd_C() {
        }
        RequestIpGPSCmd_C.prototype.GetType = function () { return 'Cmd.RequestIpGPSCmd_C'; };
        return RequestIpGPSCmd_C;
    })();
    Cmd.RequestIpGPSCmd_C = RequestIpGPSCmd_C;
    /**
     * 返回ip和gps获取经度纬度
     */
    var ReturnIpAndGPSCmd_S = (function () {
        function ReturnIpAndGPSCmd_S() {
        }
        ReturnIpAndGPSCmd_S.prototype.GetType = function () { return 'Cmd.ReturnIpAndGPSCmd_S'; };
        return ReturnIpAndGPSCmd_S;
    })();
    Cmd.ReturnIpAndGPSCmd_S = ReturnIpAndGPSCmd_S;
    var JsonCompressKey = (function () {
        function JsonCompressKey() {
        }
        JsonCompressKey.prototype.GetType = function () { return 'Cmd.JsonCompressKey'; };
        return JsonCompressKey;
    })();
    Cmd.JsonCompressKey = JsonCompressKey;
    /**
     * json压缩约定消息
     */
    var JsonCompressNullUserPmd_CS = (function () {
        function JsonCompressNullUserPmd_CS() {
        }
        JsonCompressNullUserPmd_CS.prototype.GetType = function () { return 'Cmd.JsonCompressNullUserPmd_CS'; };
        return JsonCompressNullUserPmd_CS;
    })();
    Cmd.JsonCompressNullUserPmd_CS = JsonCompressNullUserPmd_CS;
    /**
     * 语音聊天
     */
    var VoiceChat_C = (function () {
        function VoiceChat_C() {
        }
        VoiceChat_C.prototype.GetType = function () { return 'Cmd.VoiceChat_C'; };
        return VoiceChat_C;
    })();
    Cmd.VoiceChat_C = VoiceChat_C;
    var VoiceChat_S = (function () {
        function VoiceChat_S() {
        }
        VoiceChat_S.prototype.GetType = function () { return 'Cmd.VoiceChat_S'; };
        return VoiceChat_S;
    })();
    Cmd.VoiceChat_S = VoiceChat_S;
    var VoiceChat_Brd = (function () {
        function VoiceChat_Brd() {
        }
        VoiceChat_Brd.prototype.GetType = function () { return 'Cmd.VoiceChat_Brd'; };
        return VoiceChat_Brd;
    })();
    Cmd.VoiceChat_Brd = VoiceChat_Brd;
    var VoiceObj = (function () {
        function VoiceObj() {
        }
        VoiceObj.prototype.GetType = function () { return 'Cmd.VoiceObj'; };
        return VoiceObj;
    })();
    Cmd.VoiceObj = VoiceObj;
    /**
     * 语音记录
     */
    var VoiceChatRecord_C = (function () {
        function VoiceChatRecord_C() {
        }
        VoiceChatRecord_C.prototype.GetType = function () { return 'Cmd.VoiceChatRecord_C'; };
        return VoiceChatRecord_C;
    })();
    Cmd.VoiceChatRecord_C = VoiceChatRecord_C;
    var VoiceChatRecord_S = (function () {
        function VoiceChatRecord_S() {
        }
        VoiceChatRecord_S.prototype.GetType = function () { return 'Cmd.VoiceChatRecord_S'; };
        return VoiceChatRecord_S;
    })();
    Cmd.VoiceChatRecord_S = VoiceChatRecord_S;
    var CommonChat_C = (function () {
        function CommonChat_C() {
        }
        CommonChat_C.prototype.GetType = function () { return 'Cmd.CommonChat_C'; };
        return CommonChat_C;
    })();
    Cmd.CommonChat_C = CommonChat_C;
    var CommonChat_S = (function () {
        function CommonChat_S() {
        }
        CommonChat_S.prototype.GetType = function () { return 'Cmd.CommonChat_S'; };
        return CommonChat_S;
    })();
    Cmd.CommonChat_S = CommonChat_S;
    var CommonChat_Brd = (function () {
        function CommonChat_Brd() {
        }
        CommonChat_Brd.prototype.GetType = function () { return 'Cmd.CommonChat_Brd'; };
        return CommonChat_Brd;
    })();
    Cmd.CommonChat_Brd = CommonChat_Brd;
    var SetInfo = (function () {
        function SetInfo() {
        }
        SetInfo.prototype.GetType = function () { return 'Cmd.SetInfo'; };
        return SetInfo;
    })();
    Cmd.SetInfo = SetInfo;
    /**
     * 音效音乐设置
     */
    var SoundSet_C = (function () {
        function SoundSet_C() {
        }
        SoundSet_C.prototype.GetType = function () { return 'Cmd.SoundSet_C'; };
        return SoundSet_C;
    })();
    Cmd.SoundSet_C = SoundSet_C;
    /**
     * 获取玩家头像
     */
    var GetUserHeadList_C = (function () {
        function GetUserHeadList_C() {
        }
        GetUserHeadList_C.prototype.GetType = function () { return 'Cmd.GetUserHeadList_C'; };
        return GetUserHeadList_C;
    })();
    Cmd.GetUserHeadList_C = GetUserHeadList_C;
    var UserHead = (function () {
        function UserHead() {
        }
        UserHead.prototype.GetType = function () { return 'Cmd.UserHead'; };
        return UserHead;
    })();
    Cmd.UserHead = UserHead;
    var GetUserHeadList_S = (function () {
        function GetUserHeadList_S() {
        }
        GetUserHeadList_S.prototype.GetType = function () { return 'Cmd.GetUserHeadList_S'; };
        return GetUserHeadList_S;
    })();
    Cmd.GetUserHeadList_S = GetUserHeadList_S;
    /**
     * 获取玩家列表信息
     */
    var GetUserList_C = (function () {
        function GetUserList_C() {
        }
        GetUserList_C.prototype.GetType = function () { return 'Cmd.GetUserList_C'; };
        return GetUserList_C;
    })();
    Cmd.GetUserList_C = GetUserList_C;
    var GetUserList_S = (function () {
        function GetUserList_S() {
        }
        GetUserList_S.prototype.GetType = function () { return 'Cmd.GetUserList_S'; };
        return GetUserList_S;
    })();
    Cmd.GetUserList_S = GetUserList_S;
    /**
     * 请求玩家面板信息
     */
    var GetPersonalPanel_C = (function () {
        function GetPersonalPanel_C() {
        }
        GetPersonalPanel_C.prototype.GetType = function () { return 'Cmd.GetPersonalPanel_C'; };
        return GetPersonalPanel_C;
    })();
    Cmd.GetPersonalPanel_C = GetPersonalPanel_C;
    var GetPersonalPanel_S = (function () {
        function GetPersonalPanel_S() {
        }
        GetPersonalPanel_S.prototype.GetType = function () { return 'Cmd.GetPersonalPanel_S'; };
        return GetPersonalPanel_S;
    })();
    Cmd.GetPersonalPanel_S = GetPersonalPanel_S;
    /**
     * 通知客户端可以显示准备按钮
     */
    var ShowPrepareBtnRoom_S = (function () {
        function ShowPrepareBtnRoom_S() {
        }
        ShowPrepareBtnRoom_S.prototype.GetType = function () { return 'Cmd.ShowPrepareBtnRoom_S'; };
        return ShowPrepareBtnRoom_S;
    })();
    Cmd.ShowPrepareBtnRoom_S = ShowPrepareBtnRoom_S;
    /**
     * 通知客户端可以显示提前开始按钮了
     */
    var ShowChangeUserNbrRoom_S = (function () {
        function ShowChangeUserNbrRoom_S() {
        }
        ShowChangeUserNbrRoom_S.prototype.GetType = function () { return 'Cmd.ShowChangeUserNbrRoom_S'; };
        return ShowChangeUserNbrRoom_S;
    })();
    Cmd.ShowChangeUserNbrRoom_S = ShowChangeUserNbrRoom_S;
    /**
     * 请求切换房间人数
     */
    var RequestChangeUserNbrRoom_C = (function () {
        function RequestChangeUserNbrRoom_C() {
        }
        RequestChangeUserNbrRoom_C.prototype.GetType = function () { return 'Cmd.RequestChangeUserNbrRoom_C'; };
        return RequestChangeUserNbrRoom_C;
    })();
    Cmd.RequestChangeUserNbrRoom_C = RequestChangeUserNbrRoom_C;
    /**
     * 请求切换房间人数
     */
    var RequestChangeUserNbrRoom_Brd = (function () {
        function RequestChangeUserNbrRoom_Brd() {
        }
        RequestChangeUserNbrRoom_Brd.prototype.GetType = function () { return 'Cmd.RequestChangeUserNbrRoom_Brd'; };
        return RequestChangeUserNbrRoom_Brd;
    })();
    Cmd.RequestChangeUserNbrRoom_Brd = RequestChangeUserNbrRoom_Brd;
    var ReturnChangeUserNbrRoom_C = (function () {
        function ReturnChangeUserNbrRoom_C() {
        }
        ReturnChangeUserNbrRoom_C.prototype.GetType = function () { return 'Cmd.ReturnChangeUserNbrRoom_C'; };
        return ReturnChangeUserNbrRoom_C;
    })();
    Cmd.ReturnChangeUserNbrRoom_C = ReturnChangeUserNbrRoom_C;
    var ReturnChangeUserNbrRoom_Brd = (function () {
        function ReturnChangeUserNbrRoom_Brd() {
        }
        ReturnChangeUserNbrRoom_Brd.prototype.GetType = function () { return 'Cmd.ReturnChangeUserNbrRoom_Brd'; };
        return ReturnChangeUserNbrRoom_Brd;
    })();
    Cmd.ReturnChangeUserNbrRoom_Brd = ReturnChangeUserNbrRoom_Brd;
    /**
     * 请求刷新座位积分
     */
    var UpdatePointSeatRoom_S = (function () {
        function UpdatePointSeatRoom_S() {
        }
        UpdatePointSeatRoom_S.prototype.GetType = function () { return 'Cmd.UpdatePointSeatRoom_S'; };
        return UpdatePointSeatRoom_S;
    })();
    Cmd.UpdatePointSeatRoom_S = UpdatePointSeatRoom_S;
    /**
     * 请求换坐
     */
    var RequestChangeSeatRoom_C = (function () {
        function RequestChangeSeatRoom_C() {
        }
        RequestChangeSeatRoom_C.prototype.GetType = function () { return 'Cmd.RequestChangeSeatRoom_C'; };
        return RequestChangeSeatRoom_C;
    })();
    Cmd.RequestChangeSeatRoom_C = RequestChangeSeatRoom_C;
    /**
     * 请求换坐给对方客户端
     */
    var RequestChangeSeatRoom_S = (function () {
        function RequestChangeSeatRoom_S() {
        }
        RequestChangeSeatRoom_S.prototype.GetType = function () { return 'Cmd.RequestChangeSeatRoom_S'; };
        return RequestChangeSeatRoom_S;
    })();
    Cmd.RequestChangeSeatRoom_S = RequestChangeSeatRoom_S;
    /**
     * 对方回应,成功后直接操作
     */
    var ReturnChangeSeatRoom_C = (function () {
        function ReturnChangeSeatRoom_C() {
        }
        ReturnChangeSeatRoom_C.prototype.GetType = function () { return 'Cmd.ReturnChangeSeatRoom_C'; };
        return ReturnChangeSeatRoom_C;
    })();
    Cmd.ReturnChangeSeatRoom_C = ReturnChangeSeatRoom_C;
    /**
     * 请求排行榜
     */
    var GetRankingListRoomCmd_C = (function () {
        function GetRankingListRoomCmd_C() {
        }
        GetRankingListRoomCmd_C.prototype.GetType = function () { return 'Cmd.GetRankingListRoomCmd_C'; };
        return GetRankingListRoomCmd_C;
    })();
    Cmd.GetRankingListRoomCmd_C = GetRankingListRoomCmd_C;
    /**
     * +
     */
    var RankInfo = (function () {
        function RankInfo() {
        }
        RankInfo.prototype.GetType = function () { return 'Cmd.RankInfo'; };
        return RankInfo;
    })();
    Cmd.RankInfo = RankInfo;
    var GetRankingListRoomCmd_S = (function () {
        function GetRankingListRoomCmd_S() {
        }
        GetRankingListRoomCmd_S.prototype.GetType = function () { return 'Cmd.GetRankingListRoomCmd_S'; };
        return GetRankingListRoomCmd_S;
    })();
    Cmd.GetRankingListRoomCmd_S = GetRankingListRoomCmd_S;
    /**
     * 排行榜广播
     */
    var GetRankingListRoomCmd_Brd = (function () {
        function GetRankingListRoomCmd_Brd() {
        }
        GetRankingListRoomCmd_Brd.prototype.GetType = function () { return 'Cmd.GetRankingListRoomCmd_Brd'; };
        return GetRankingListRoomCmd_Brd;
    })();
    Cmd.GetRankingListRoomCmd_Brd = GetRankingListRoomCmd_Brd;
    /**
     *  C-&gt;S 托管请求
     *  S-&gt;C 托管状态更新
     */
    var HostUpdateRoomCmd_CS = (function () {
        function HostUpdateRoomCmd_CS() {
        }
        HostUpdateRoomCmd_CS.prototype.GetType = function () { return 'Cmd.HostUpdateRoomCmd_CS'; };
        return HostUpdateRoomCmd_CS;
    })();
    Cmd.HostUpdateRoomCmd_CS = HostUpdateRoomCmd_CS;
    /**
     *  Echo应答,服务器探测玩家是否活着
     *  TODO,还未使用,待升级
     */
    var ServerEchoRoomCmd_SC = (function () {
        function ServerEchoRoomCmd_SC() {
        }
        ServerEchoRoomCmd_SC.prototype.GetType = function () { return 'Cmd.ServerEchoRoomCmd_SC'; };
        return ServerEchoRoomCmd_SC;
    })();
    Cmd.ServerEchoRoomCmd_SC = ServerEchoRoomCmd_SC;
    /**
     *  Echo应答,客户端探测服务器
     *  TODO,还未使用,待升级
     */
    var ClientEchoRoomCmd_SC = (function () {
        function ClientEchoRoomCmd_SC() {
        }
        ClientEchoRoomCmd_SC.prototype.GetType = function () { return 'Cmd.ClientEchoRoomCmd_SC'; };
        return ClientEchoRoomCmd_SC;
    })();
    Cmd.ClientEchoRoomCmd_SC = ClientEchoRoomCmd_SC;
    /**
     * 在线状态更新
     */
    var OnlineStateRoomCmd_S = (function () {
        function OnlineStateRoomCmd_S() {
        }
        OnlineStateRoomCmd_S.prototype.GetType = function () { return 'Cmd.OnlineStateRoomCmd_S'; };
        return OnlineStateRoomCmd_S;
    })();
    Cmd.OnlineStateRoomCmd_S = OnlineStateRoomCmd_S;
    /**
     *  C-&gt;S 离开房间请求
     *  S-&gt;C 离开房间通知
     */
    var LeaveRoomCmd_CS = (function () {
        function LeaveRoomCmd_CS() {
        }
        LeaveRoomCmd_CS.prototype.GetType = function () { return 'Cmd.LeaveRoomCmd_CS'; };
        return LeaveRoomCmd_CS;
    })();
    Cmd.LeaveRoomCmd_CS = LeaveRoomCmd_CS;
    /**
     *  C-&gt;S 准备/取消准备请求
     *  S-&gt;C 更新准备状态
     */
    var ReadyUpdateRoomCmd_CS = (function () {
        function ReadyUpdateRoomCmd_CS() {
        }
        ReadyUpdateRoomCmd_CS.prototype.GetType = function () { return 'Cmd.ReadyUpdateRoomCmd_CS'; };
        return ReadyUpdateRoomCmd_CS;
    })();
    Cmd.ReadyUpdateRoomCmd_CS = ReadyUpdateRoomCmd_CS;
    /**
     * 系统通知
     */
    var SysMessageCmd_S = (function () {
        function SysMessageCmd_S() {
        }
        SysMessageCmd_S.prototype.GetType = function () { return 'Cmd.SysMessageCmd_S'; };
        return SysMessageCmd_S;
    })();
    Cmd.SysMessageCmd_S = SysMessageCmd_S;
    var SysMessageCmd_S;
    (function (SysMessageCmd_S) {
        (function (MsgType) {
            /**
             * 文本消息
             */
            MsgType[MsgType["Text"] = 1] = "Text";
            /**
             * 解散房间
             */
            MsgType[MsgType["DissolveRoom"] = 2] = "DissolveRoom";
            /**
             * 返回到大厅
             */
            MsgType[MsgType["BackToLobby"] = 3] = "BackToLobby";
            /**
             * 提前开局
             */
            MsgType[MsgType["StartInAdvance"] = 4] = "StartInAdvance";
            /**
             * 弹框
             */
            MsgType[MsgType["Bounce"] = 5] = "Bounce";
            /**
             * 余额不足
             */
            MsgType[MsgType["NotEnoughMoney"] = 6] = "NotEnoughMoney";
            /**
             * 创建房间成功
             */
            MsgType[MsgType["CreateRoom"] = 7] = "CreateRoom";
            /**
             * 重新进入大厅
             */
            MsgType[MsgType["EnterLobby"] = 8] = "EnterLobby";
        })(SysMessageCmd_S.MsgType || (SysMessageCmd_S.MsgType = {}));
        var MsgType = SysMessageCmd_S.MsgType;
    })(SysMessageCmd_S = Cmd.SysMessageCmd_S || (Cmd.SysMessageCmd_S = {}));
    /**
     *  C-&gt;S 查询服务器当前逻辑时间
     *  S-&gt;C 服务器当前逻辑时间
     */
    var GameTimeSyncCmd_CS = (function () {
        function GameTimeSyncCmd_CS() {
        }
        GameTimeSyncCmd_CS.prototype.GetType = function () { return 'Cmd.GameTimeSyncCmd_CS'; };
        return GameTimeSyncCmd_CS;
    })();
    Cmd.GameTimeSyncCmd_CS = GameTimeSyncCmd_CS;
    /**
     * 请求更换房间消息
     */
    var ChangeRoomCmd_C = (function () {
        function ChangeRoomCmd_C() {
        }
        ChangeRoomCmd_C.prototype.GetType = function () { return 'Cmd.ChangeRoomCmd_C'; };
        return ChangeRoomCmd_C;
    })();
    Cmd.ChangeRoomCmd_C = ChangeRoomCmd_C;
    /**
     * 换座
     */
    var ChangeSeatRoomCmd_C = (function () {
        function ChangeSeatRoomCmd_C() {
        }
        ChangeSeatRoomCmd_C.prototype.GetType = function () { return 'Cmd.ChangeSeatRoomCmd_C'; };
        return ChangeSeatRoomCmd_C;
    })();
    Cmd.ChangeSeatRoomCmd_C = ChangeSeatRoomCmd_C;
    /**
     * +
     */
    var GiftsInfo = (function () {
        function GiftsInfo() {
        }
        GiftsInfo.prototype.GetType = function () { return 'Cmd.GiftsInfo'; };
        return GiftsInfo;
    })();
    Cmd.GiftsInfo = GiftsInfo;
    /**
     * 送礼
     */
    var SendGiftRoomCmd_C = (function () {
        function SendGiftRoomCmd_C() {
        }
        SendGiftRoomCmd_C.prototype.GetType = function () { return 'Cmd.SendGiftRoomCmd_C'; };
        return SendGiftRoomCmd_C;
    })();
    Cmd.SendGiftRoomCmd_C = SendGiftRoomCmd_C;
    var SendGiftRoomCmd_S = (function () {
        function SendGiftRoomCmd_S() {
        }
        SendGiftRoomCmd_S.prototype.GetType = function () { return 'Cmd.SendGiftRoomCmd_S'; };
        return SendGiftRoomCmd_S;
    })();
    Cmd.SendGiftRoomCmd_S = SendGiftRoomCmd_S;
    var SendGiftRoomCmd_Brd = (function () {
        function SendGiftRoomCmd_Brd() {
        }
        SendGiftRoomCmd_Brd.prototype.GetType = function () { return 'Cmd.SendGiftRoomCmd_Brd'; };
        return SendGiftRoomCmd_Brd;
    })();
    Cmd.SendGiftRoomCmd_Brd = SendGiftRoomCmd_Brd;
    /**
     * 大厅送礼 客户端大厅相同的协议会有问题
     */
    var SendGiftLobbyCmd_C = (function () {
        function SendGiftLobbyCmd_C() {
        }
        SendGiftLobbyCmd_C.prototype.GetType = function () { return 'Cmd.SendGiftLobbyCmd_C'; };
        return SendGiftLobbyCmd_C;
    })();
    Cmd.SendGiftLobbyCmd_C = SendGiftLobbyCmd_C;
    var SendGiftLobbyCmd_S = (function () {
        function SendGiftLobbyCmd_S() {
        }
        SendGiftLobbyCmd_S.prototype.GetType = function () { return 'Cmd.SendGiftLobbyCmd_S'; };
        return SendGiftLobbyCmd_S;
    })();
    Cmd.SendGiftLobbyCmd_S = SendGiftLobbyCmd_S;
    /**
     * 离开房间
     */
    var LeaveRoomCmd_C = (function () {
        function LeaveRoomCmd_C() {
        }
        LeaveRoomCmd_C.prototype.GetType = function () { return 'Cmd.LeaveRoomCmd_C'; };
        return LeaveRoomCmd_C;
    })();
    Cmd.LeaveRoomCmd_C = LeaveRoomCmd_C;
    var LeaveRoomCmd_S = (function () {
        function LeaveRoomCmd_S() {
        }
        LeaveRoomCmd_S.prototype.GetType = function () { return 'Cmd.LeaveRoomCmd_S'; };
        return LeaveRoomCmd_S;
    })();
    Cmd.LeaveRoomCmd_S = LeaveRoomCmd_S;
    /**
     * 广播玩家离开房间
     */
    var LeaveRoomCmd_Brd = (function () {
        function LeaveRoomCmd_Brd() {
        }
        LeaveRoomCmd_Brd.prototype.GetType = function () { return 'Cmd.LeaveRoomCmd_Brd'; };
        return LeaveRoomCmd_Brd;
    })();
    Cmd.LeaveRoomCmd_Brd = LeaveRoomCmd_Brd;
    /**
     * 认输
     */
    var GiveupRoomCmd_C = (function () {
        function GiveupRoomCmd_C() {
        }
        GiveupRoomCmd_C.prototype.GetType = function () { return 'Cmd.GiveupRoomCmd_C'; };
        return GiveupRoomCmd_C;
    })();
    Cmd.GiveupRoomCmd_C = GiveupRoomCmd_C;
    /**
     *  发起视频聊天
     *  C-&gt;S 请求视频聊天
     *  S-&gt;C 请求视频聊天通知
     */
    var VideoChatRequestCmd_CS = (function () {
        function VideoChatRequestCmd_CS() {
        }
        VideoChatRequestCmd_CS.prototype.GetType = function () { return 'Cmd.VideoChatRequestCmd_CS'; };
        return VideoChatRequestCmd_CS;
    })();
    Cmd.VideoChatRequestCmd_CS = VideoChatRequestCmd_CS;
    /**
     *  C-&gt;S 请求视频聊天回复请求
     *  S-&gt;C 请求视频聊天回复通知
     */
    var VideoChatReturnCmd_CS = (function () {
        function VideoChatReturnCmd_CS() {
        }
        VideoChatReturnCmd_CS.prototype.GetType = function () { return 'Cmd.VideoChatReturnCmd_CS'; };
        return VideoChatReturnCmd_CS;
    })();
    Cmd.VideoChatReturnCmd_CS = VideoChatReturnCmd_CS;
    /**
     *  C-&gt;S 视频聊天关闭请求
     *  S-&gt;C 视频聊天关闭通知
     */
    var VideoChatShutdownCmd_CS = (function () {
        function VideoChatShutdownCmd_CS() {
        }
        VideoChatShutdownCmd_CS.prototype.GetType = function () { return 'Cmd.VideoChatShutdownCmd_CS'; };
        return VideoChatShutdownCmd_CS;
    })();
    Cmd.VideoChatShutdownCmd_CS = VideoChatShutdownCmd_CS;
    /**
     * 聊天消息内容
     */
    var ChatMessageInfo = (function () {
        function ChatMessageInfo() {
        }
        ChatMessageInfo.prototype.GetType = function () { return 'Cmd.ChatMessageInfo'; };
        return ChatMessageInfo;
    })();
    Cmd.ChatMessageInfo = ChatMessageInfo;
    var ChatMessageInfo;
    (function (ChatMessageInfo) {
        /**
         * 聊天内容类型
         */
        (function (MsgType) {
            /**
             * 文本
             */
            MsgType[MsgType["Text"] = 1] = "Text";
            /**
             * 语音
             */
            MsgType[MsgType["Voice"] = 2] = "Voice";
            /**
             * 表情
             */
            MsgType[MsgType["Face"] = 3] = "Face";
            /**
             * 德州扑克创建房间信息
             */
            MsgType[MsgType["TexasConfig"] = 4] = "TexasConfig";
        })(ChatMessageInfo.MsgType || (ChatMessageInfo.MsgType = {}));
        var MsgType = ChatMessageInfo.MsgType;
    })(ChatMessageInfo = Cmd.ChatMessageInfo || (Cmd.ChatMessageInfo = {}));
    var ChatMessageInfo;
    (function (ChatMessageInfo) {
        /**
         * 聊天频道
         */
        (function (ChannelType) {
            /**
             * 房间
             */
            ChannelType[ChannelType["Room"] = 1] = "Room";
            /**
             * 俱乐部
             */
            ChannelType[ChannelType["Club"] = 2] = "Club";
            /**
             * 两个好友聊天
             */
            ChannelType[ChannelType["Friend"] = 3] = "Friend";
        })(ChatMessageInfo.ChannelType || (ChatMessageInfo.ChannelType = {}));
        var ChannelType = ChatMessageInfo.ChannelType;
    })(ChatMessageInfo = Cmd.ChatMessageInfo || (Cmd.ChatMessageInfo = {}));
    /**
     *  C-&gt;S 聊天消息
     *  S-&gt;C 聊天消息
     */
    var ChatCmd_CS = (function () {
        function ChatCmd_CS() {
        }
        ChatCmd_CS.prototype.GetType = function () { return 'Cmd.ChatCmd_CS'; };
        return ChatCmd_CS;
    })();
    Cmd.ChatCmd_CS = ChatCmd_CS;
    /**
     * 匹配组成员信息
     */
    var MatchGroupMemberInfo = (function () {
        function MatchGroupMemberInfo() {
        }
        MatchGroupMemberInfo.prototype.GetType = function () { return 'Cmd.MatchGroupMemberInfo'; };
        return MatchGroupMemberInfo;
    })();
    Cmd.MatchGroupMemberInfo = MatchGroupMemberInfo;
    /**
     * 匹配组房间信息
     */
    var MathGroupRoomInfo = (function () {
        function MathGroupRoomInfo() {
        }
        MathGroupRoomInfo.prototype.GetType = function () { return 'Cmd.MathGroupRoomInfo'; };
        return MathGroupRoomInfo;
    })();
    Cmd.MathGroupRoomInfo = MathGroupRoomInfo;
    /**
     * 地址
     */
    var Address = (function () {
        function Address() {
        }
        Address.prototype.GetType = function () { return 'Cmd.Address'; };
        return Address;
    })();
    Cmd.Address = Address;
    var DonateData = (function () {
        function DonateData() {
        }
        DonateData.prototype.GetType = function () { return 'Cmd.DonateData'; };
        return DonateData;
    })();
    Cmd.DonateData = DonateData;
    var ClubInfo = (function () {
        function ClubInfo() {
        }
        ClubInfo.prototype.GetType = function () { return 'Cmd.ClubInfo'; };
        return ClubInfo;
    })();
    Cmd.ClubInfo = ClubInfo;
    var ClubInfo;
    (function (ClubInfo) {
        /**
         * 权限
         */
        (function (Permission) {
            /**
             * 开局
             */
            Permission[Permission["CreateRoom"] = 1] = "CreateRoom";
            /**
             * 审核成员申请
             */
            Permission[Permission["MemeberJoin"] = 2] = "MemeberJoin";
            /**
             * 查看报表
             */
            Permission[Permission["CheckReport"] = 3] = "CheckReport";
        })(ClubInfo.Permission || (ClubInfo.Permission = {}));
        var Permission = ClubInfo.Permission;
    })(ClubInfo = Cmd.ClubInfo || (Cmd.ClubInfo = {}));
    var ClubInfo;
    (function (ClubInfo) {
        /**
         * 职位
         */
        (function (Post) {
            Post[Post["Man"] = 1000] = "Man";
            Post[Post["Agent"] = 1500] = "Agent";
            Post[Post["Admin"] = 2000] = "Admin";
            Post[Post["Founder"] = 3000] = "Founder";
        })(ClubInfo.Post || (ClubInfo.Post = {}));
        var Post = ClubInfo.Post;
    })(ClubInfo = Cmd.ClubInfo || (Cmd.ClubInfo = {}));
    var ClubInfo;
    (function (ClubInfo) {
        /**
         * 成员
         */
        var Member = (function () {
            function Member() {
            }
            Member.prototype.GetType = function () { return 'Cmd.ClubInfo.Member'; };
            return Member;
        })();
        ClubInfo.Member = Member;
    })(ClubInfo = Cmd.ClubInfo || (Cmd.ClubInfo = {}));
    var ClubInfo;
    (function (ClubInfo) {
        /**
         * 职位所拥有的权限
         */
        var PostPermission = (function () {
            function PostPermission() {
            }
            PostPermission.prototype.GetType = function () { return 'Cmd.ClubInfo.PostPermission'; };
            return PostPermission;
        })();
        ClubInfo.PostPermission = PostPermission;
    })(ClubInfo = Cmd.ClubInfo || (Cmd.ClubInfo = {}));
    var ClubInfo;
    (function (ClubInfo) {
        /**
         * 转账
         */
        var Transition = (function () {
            function Transition() {
            }
            Transition.prototype.GetType = function () { return 'Cmd.ClubInfo.Transition'; };
            return Transition;
        })();
        ClubInfo.Transition = Transition;
    })(ClubInfo = Cmd.ClubInfo || (Cmd.ClubInfo = {}));
    /**
     * 分页
     */
    var Page = (function () {
        function Page() {
        }
        Page.prototype.GetType = function () { return 'Cmd.Page'; };
        return Page;
    })();
    Cmd.Page = Page;
    /**
     * 数据更新通知
     */
    var DataUpdateNotifyCmd_S = (function () {
        function DataUpdateNotifyCmd_S() {
        }
        DataUpdateNotifyCmd_S.prototype.GetType = function () { return 'Cmd.DataUpdateNotifyCmd_S'; };
        return DataUpdateNotifyCmd_S;
    })();
    Cmd.DataUpdateNotifyCmd_S = DataUpdateNotifyCmd_S;
    /**
     * 玩家牌局押注数据
     */
    var StatisticsRoundData = (function () {
        function StatisticsRoundData() {
        }
        StatisticsRoundData.prototype.GetType = function () { return 'Cmd.StatisticsRoundData'; };
        return StatisticsRoundData;
    })();
    Cmd.StatisticsRoundData = StatisticsRoundData;
    /**
     * 玩法数据
     */
    var Playing = (function () {
        function Playing() {
        }
        Playing.prototype.GetType = function () { return 'Cmd.Playing'; };
        return Playing;
    })();
    Cmd.Playing = Playing;
    var Playing;
    (function (Playing) {
        /**
         * 玩法id
         */
        (function (PlayId) {
            /**
             * 小盲
             */
            PlayId[PlayId["Smallblind"] = 1] = "Smallblind";
            /**
             * 牌局规则 1 普通局 2 SNG
             */
            PlayId[PlayId["Regulation"] = 2] = "Regulation";
            /**
             * 座位数
             */
            PlayId[PlayId["SeatNum"] = 3] = "SeatNum";
            /**
             * 前注
             */
            PlayId[PlayId["Ante"] = 4] = "Ante";
            /**
             * 升盲速度
             */
            PlayId[PlayId["BlindLength"] = 5] = "BlindLength";
            /**
             * 初始盲注
             */
            PlayId[PlayId["StartChips"] = 6] = "StartChips";
            /**
             * 速度
             */
            PlayId[PlayId["Speed"] = 7] = "Speed";
            /**
             * 时长
             */
            PlayId[PlayId["Duration"] = 8] = "Duration";
            /**
             * 俱乐部id, 代表从俱乐部创建的牌局
             */
            PlayId[PlayId["ClubId"] = 9] = "ClubId";
            /**
             * 报名费
             */
            PlayId[PlayId["EntryFee"] = 10] = "EntryFee";
            /**
             * 强制盲注
             */
            PlayId[PlayId["ForceBlind"] = 10447] = "ForceBlind";
            /**
             * 控制带入
             */
            PlayId[PlayId["ControlEntry"] = 10448] = "ControlEntry";
            /**
             * 保险
             */
            PlayId[PlayId["Insurance"] = 10449] = "Insurance";
            PlayId[PlayId["GPS"] = 96] = "GPS";
            /**
             * 相同ip不可进入
             */
            PlayId[PlayId["IPEnter"] = 100] = "IPEnter";
            /**
             * 控制玩家报名
             */
            PlayId[PlayId["ControlSignUp"] = 10489] = "ControlSignUp";
            /**
             * 文本聊天
             */
            PlayId[PlayId["TextChat"] = 10490] = "TextChat";
            /**
             * 语言聊天
             */
            PlayId[PlayId["VoiceChat"] = 10491] = "VoiceChat";
            /**
             * 捐献金比例
             */
            PlayId[PlayId["DonateRate"] = 10561] = "DonateRate";
            /**
             * 自动开局条件人数
             */
            PlayId[PlayId["StartAutoNum"] = 10582] = "StartAutoNum";
            /**
             * 最少买入
             */
            PlayId[PlayId["BringMin"] = 10583] = "BringMin";
            /**
             * 最大买入
             */
            PlayId[PlayId["BringMax"] = 10584] = "BringMax";
            /**
             * 自动开始
             */
            PlayId[PlayId["StartAuto"] = 10585] = "StartAuto";
            /**
             * 俱乐部基金买入服务费
             */
            PlayId[PlayId["ClubFundPlatFee"] = 10586] = "ClubFundPlatFee";
            /**
             * 两倍前注
             */
            PlayId[PlayId["DoubleAnte"] = 10590] = "DoubleAnte";
            /**
             * 三条大于顺子
             */
            PlayId[PlayId["ThreeGtStraight"] = 10591] = "ThreeGtStraight";
            /**
             * 押注时长
             */
            PlayId[PlayId["ActionDuration"] = 10592] = "ActionDuration";
        })(Playing.PlayId || (Playing.PlayId = {}));
        var PlayId = Playing.PlayId;
    })(Playing = Cmd.Playing || (Cmd.Playing = {}));
    /**
     * 德扑的配置信息
     */
    var TexasConfig = (function () {
        function TexasConfig() {
        }
        TexasConfig.prototype.GetType = function () { return 'Cmd.TexasConfig'; };
        return TexasConfig;
    })();
    Cmd.TexasConfig = TexasConfig;
    /**
     * 彩票信息
     */
    var Lottery = (function () {
        function Lottery() {
        }
        Lottery.prototype.GetType = function () { return 'Cmd.Lottery'; };
        return Lottery;
    })();
    Cmd.Lottery = Lottery;
    /**
     * 牌局历史
     */
    var History = (function () {
        function History() {
        }
        History.prototype.GetType = function () { return 'Cmd.History'; };
        return History;
    })();
    Cmd.History = History;
    var History;
    (function (History) {
        var HistoryInfo = (function () {
            function HistoryInfo() {
            }
            HistoryInfo.prototype.GetType = function () { return 'Cmd.History.HistoryInfo'; };
            return HistoryInfo;
        })();
        History.HistoryInfo = HistoryInfo;
    })(History = Cmd.History || (Cmd.History = {}));
    /**
     * 过滤条件
     */
    var FilterInfo = (function () {
        function FilterInfo() {
        }
        FilterInfo.prototype.GetType = function () { return 'Cmd.FilterInfo'; };
        return FilterInfo;
    })();
    Cmd.FilterInfo = FilterInfo;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby.proto
/// <reference path="common.ts" />
/// <reference path="lobby_room.ts" />
var Cmd;
(function (Cmd) {
    /**
     * ---------------------------------大厅设置相关----------------------------//
     *  设置类型
     */
    (function (SetType) {
        /**
         * 音乐
         */
        SetType[SetType["Music"] = 1] = "Music";
        /**
         * 音效
         */
        SetType[SetType["Sound"] = 2] = "Sound";
        /**
         * 排行榜(淘金类型的金币排行榜)
         */
        SetType[SetType["Rank"] = 3] = "Rank";
    })(Cmd.SetType || (Cmd.SetType = {}));
    var SetType = Cmd.SetType;
    /**
     * ---------------------------------免费金币界面任务系统相关----------------------------//
     */
    (function (TaskStatus) {
        /**
         * 任务未开始
         */
        TaskStatus[TaskStatus["Task_Status_Unstart"] = 0] = "Task_Status_Unstart";
        /**
         * 任务进行中
         */
        TaskStatus[TaskStatus["Task_Status_Progress"] = 1] = "Task_Status_Progress";
        /**
         * 已完成
         */
        TaskStatus[TaskStatus["Task_Status_Complete"] = 2] = "Task_Status_Complete";
        /**
         * 已领取奖励
         */
        TaskStatus[TaskStatus["Task_Status_Received"] = 3] = "Task_Status_Received";
    })(Cmd.TaskStatus || (Cmd.TaskStatus = {}));
    var TaskStatus = Cmd.TaskStatus;
    /**
     * 用户信息获取
     */
    var UserInfoGetLbyCmd_C = (function () {
        function UserInfoGetLbyCmd_C() {
        }
        UserInfoGetLbyCmd_C.prototype.GetType = function () { return 'Cmd.UserInfoGetLbyCmd_C'; };
        return UserInfoGetLbyCmd_C;
    })();
    Cmd.UserInfoGetLbyCmd_C = UserInfoGetLbyCmd_C;
    var UserInfoGetLbyCmd_S = (function () {
        function UserInfoGetLbyCmd_S() {
        }
        UserInfoGetLbyCmd_S.prototype.GetType = function () { return 'Cmd.UserInfoGetLbyCmd_S'; };
        return UserInfoGetLbyCmd_S;
    })();
    Cmd.UserInfoGetLbyCmd_S = UserInfoGetLbyCmd_S;
    /**
     * 房间数据 用于请求信息同步时 检测玩家是否已经在某个房间中
     */
    var UserRoomInfo = (function () {
        function UserRoomInfo() {
        }
        UserRoomInfo.prototype.GetType = function () { return 'Cmd.UserRoomInfo'; };
        return UserRoomInfo;
    })();
    Cmd.UserRoomInfo = UserRoomInfo;
    /**
     * 请求邀请明细列表
     */
    var InviteInfo = (function () {
        function InviteInfo() {
        }
        InviteInfo.prototype.GetType = function () { return 'Cmd.InviteInfo'; };
        return InviteInfo;
    })();
    Cmd.InviteInfo = InviteInfo;
    var PointRankInfo = (function () {
        function PointRankInfo() {
        }
        PointRankInfo.prototype.GetType = function () { return 'Cmd.PointRankInfo'; };
        return PointRankInfo;
    })();
    Cmd.PointRankInfo = PointRankInfo;
    var DayRankInfo = (function () {
        function DayRankInfo() {
        }
        DayRankInfo.prototype.GetType = function () { return 'Cmd.DayRankInfo'; };
        return DayRankInfo;
    })();
    Cmd.DayRankInfo = DayRankInfo;
    /**
     * 开房红包提现数据
     */
    var openRecord = (function () {
        function openRecord() {
        }
        openRecord.prototype.GetType = function () { return 'Cmd.openRecord'; };
        return openRecord;
    })();
    Cmd.openRecord = openRecord;
    /**
     * 获得大厅类型
     */
    var LobbyTypeListLobbyCmd_C = (function () {
        function LobbyTypeListLobbyCmd_C() {
        }
        LobbyTypeListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.LobbyTypeListLobbyCmd_C'; };
        return LobbyTypeListLobbyCmd_C;
    })();
    Cmd.LobbyTypeListLobbyCmd_C = LobbyTypeListLobbyCmd_C;
    var LobbyTypeListLobbyCmd_S = (function () {
        function LobbyTypeListLobbyCmd_S() {
        }
        LobbyTypeListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.LobbyTypeListLobbyCmd_S'; };
        return LobbyTypeListLobbyCmd_S;
    })();
    Cmd.LobbyTypeListLobbyCmd_S = LobbyTypeListLobbyCmd_S;
    /**
     * 用户登陆
     */
    var UserInfoSynLobbyCmd_C = (function () {
        function UserInfoSynLobbyCmd_C() {
        }
        UserInfoSynLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserInfoSynLobbyCmd_C'; };
        return UserInfoSynLobbyCmd_C;
    })();
    Cmd.UserInfoSynLobbyCmd_C = UserInfoSynLobbyCmd_C;
    /**
     *  创建房间表
     *  如果有区域选择的大厅 两次检验：1 先校验大厅+n个区域
     */
    var CreateConfigListLobbyCmd_S = (function () {
        function CreateConfigListLobbyCmd_S() {
        }
        CreateConfigListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.CreateConfigListLobbyCmd_S'; };
        return CreateConfigListLobbyCmd_S;
    })();
    Cmd.CreateConfigListLobbyCmd_S = CreateConfigListLobbyCmd_S;
    /**
     * 区域创建房间表 -- 有区域选择的大厅 两次检验：2 再校验区域+n个游戏
     */
    var AreaCreateConfigListLobbyCmd_C = (function () {
        function AreaCreateConfigListLobbyCmd_C() {
        }
        AreaCreateConfigListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.AreaCreateConfigListLobbyCmd_C'; };
        return AreaCreateConfigListLobbyCmd_C;
    })();
    Cmd.AreaCreateConfigListLobbyCmd_C = AreaCreateConfigListLobbyCmd_C;
    /**
     * 区域创建房间表 只针对到指定区域
     */
    var AreaCreateConfigListLobbyCmd_S = (function () {
        function AreaCreateConfigListLobbyCmd_S() {
        }
        AreaCreateConfigListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.AreaCreateConfigListLobbyCmd_S'; };
        return AreaCreateConfigListLobbyCmd_S;
    })();
    Cmd.AreaCreateConfigListLobbyCmd_S = AreaCreateConfigListLobbyCmd_S;
    /**
     * 指定游戏创建房间表
     */
    var GameCreateConfigLobbyCmd_C = (function () {
        function GameCreateConfigLobbyCmd_C() {
        }
        GameCreateConfigLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GameCreateConfigLobbyCmd_C'; };
        return GameCreateConfigLobbyCmd_C;
    })();
    Cmd.GameCreateConfigLobbyCmd_C = GameCreateConfigLobbyCmd_C;
    /**
     * 指定游戏创建房间表
     */
    var GameCreateConfigLobbyCmd_S = (function () {
        function GameCreateConfigLobbyCmd_S() {
        }
        GameCreateConfigLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GameCreateConfigLobbyCmd_S'; };
        return GameCreateConfigLobbyCmd_S;
    })();
    Cmd.GameCreateConfigLobbyCmd_S = GameCreateConfigLobbyCmd_S;
    /**
     * 大厅类型配置
     */
    var LobbyType = (function () {
        function LobbyType() {
        }
        LobbyType.prototype.GetType = function () { return 'Cmd.LobbyType'; };
        return LobbyType;
    })();
    Cmd.LobbyType = LobbyType;
    /**
     * 公告数据
     */
    var BroadInfo = (function () {
        function BroadInfo() {
        }
        BroadInfo.prototype.GetType = function () { return 'Cmd.BroadInfo'; };
        return BroadInfo;
    })();
    Cmd.BroadInfo = BroadInfo;
    var UserInfoSynLobbyCmd_S = (function () {
        function UserInfoSynLobbyCmd_S() {
        }
        UserInfoSynLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserInfoSynLobbyCmd_S'; };
        return UserInfoSynLobbyCmd_S;
    })();
    Cmd.UserInfoSynLobbyCmd_S = UserInfoSynLobbyCmd_S;
    /**
     * 用户信息获取
     */
    var UserInfoGetLobbyCmd_C = (function () {
        function UserInfoGetLobbyCmd_C() {
        }
        UserInfoGetLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserInfoGetLobbyCmd_C'; };
        return UserInfoGetLobbyCmd_C;
    })();
    Cmd.UserInfoGetLobbyCmd_C = UserInfoGetLobbyCmd_C;
    var UserInfoGetLobbyCmd_S = (function () {
        function UserInfoGetLobbyCmd_S() {
        }
        UserInfoGetLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserInfoGetLobbyCmd_S'; };
        return UserInfoGetLobbyCmd_S;
    })();
    Cmd.UserInfoGetLobbyCmd_S = UserInfoGetLobbyCmd_S;
    /**
     * 查找指定玩家 与UserInfoGetLobbyCmd_C区分一下 只用于查找返回数据给前端 不需要前端更新信息
     */
    var UserInfoSearchLobbyCmd_C = (function () {
        function UserInfoSearchLobbyCmd_C() {
        }
        UserInfoSearchLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserInfoSearchLobbyCmd_C'; };
        return UserInfoSearchLobbyCmd_C;
    })();
    Cmd.UserInfoSearchLobbyCmd_C = UserInfoSearchLobbyCmd_C;
    var UserInfoSearchLobbyCmd_S = (function () {
        function UserInfoSearchLobbyCmd_S() {
        }
        UserInfoSearchLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserInfoSearchLobbyCmd_S'; };
        return UserInfoSearchLobbyCmd_S;
    })();
    Cmd.UserInfoSearchLobbyCmd_S = UserInfoSearchLobbyCmd_S;
    var UserInfoModifyRequestLobyCmd_C = (function () {
        function UserInfoModifyRequestLobyCmd_C() {
        }
        UserInfoModifyRequestLobyCmd_C.prototype.GetType = function () { return 'Cmd.UserInfoModifyRequestLobyCmd_C'; };
        return UserInfoModifyRequestLobyCmd_C;
    })();
    Cmd.UserInfoModifyRequestLobyCmd_C = UserInfoModifyRequestLobyCmd_C;
    var UserInfoModifyReturnLobyCmd_S = (function () {
        function UserInfoModifyReturnLobyCmd_S() {
        }
        UserInfoModifyReturnLobyCmd_S.prototype.GetType = function () { return 'Cmd.UserInfoModifyReturnLobyCmd_S'; };
        return UserInfoModifyReturnLobyCmd_S;
    })();
    Cmd.UserInfoModifyReturnLobyCmd_S = UserInfoModifyReturnLobyCmd_S;
    /**
     * 分享请求
     */
    var ShareLobbyCmd_C = (function () {
        function ShareLobbyCmd_C() {
        }
        ShareLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ShareLobbyCmd_C'; };
        return ShareLobbyCmd_C;
    })();
    Cmd.ShareLobbyCmd_C = ShareLobbyCmd_C;
    var ShareLobbyCmd_S = (function () {
        function ShareLobbyCmd_S() {
        }
        ShareLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ShareLobbyCmd_S'; };
        return ShareLobbyCmd_S;
    })();
    Cmd.ShareLobbyCmd_S = ShareLobbyCmd_S;
    /**
     * 进入修改上级代理界面(丹东需要显示一下）
     */
    var GetParentLobbyCmd_C = (function () {
        function GetParentLobbyCmd_C() {
        }
        GetParentLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetParentLobbyCmd_C'; };
        return GetParentLobbyCmd_C;
    })();
    Cmd.GetParentLobbyCmd_C = GetParentLobbyCmd_C;
    var GetParentLobbyCmd_S = (function () {
        function GetParentLobbyCmd_S() {
        }
        GetParentLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetParentLobbyCmd_S'; };
        return GetParentLobbyCmd_S;
    })();
    Cmd.GetParentLobbyCmd_S = GetParentLobbyCmd_S;
    /**
     * 修改上级代理
     */
    var ChangeParentCmd_C = (function () {
        function ChangeParentCmd_C() {
        }
        ChangeParentCmd_C.prototype.GetType = function () { return 'Cmd.ChangeParentCmd_C'; };
        return ChangeParentCmd_C;
    })();
    Cmd.ChangeParentCmd_C = ChangeParentCmd_C;
    var ChangeParentCmd_S = (function () {
        function ChangeParentCmd_S() {
        }
        ChangeParentCmd_S.prototype.GetType = function () { return 'Cmd.ChangeParentCmd_S'; };
        return ChangeParentCmd_S;
    })();
    Cmd.ChangeParentCmd_S = ChangeParentCmd_S;
    /**
     * 已阅免责声明
     */
    var ReadDisclaimerLobbyCmd_C = (function () {
        function ReadDisclaimerLobbyCmd_C() {
        }
        ReadDisclaimerLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ReadDisclaimerLobbyCmd_C'; };
        return ReadDisclaimerLobbyCmd_C;
    })();
    Cmd.ReadDisclaimerLobbyCmd_C = ReadDisclaimerLobbyCmd_C;
    /**
     * 已阅弹窗公告
     */
    var ReadPopubBroadLobbyCmd_C = (function () {
        function ReadPopubBroadLobbyCmd_C() {
        }
        ReadPopubBroadLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ReadPopubBroadLobbyCmd_C'; };
        return ReadPopubBroadLobbyCmd_C;
    })();
    Cmd.ReadPopubBroadLobbyCmd_C = ReadPopubBroadLobbyCmd_C;
    /**
     * 获取自己的推广二维码
     */
    var GetExtendsion2DCodeCmd_C = (function () {
        function GetExtendsion2DCodeCmd_C() {
        }
        GetExtendsion2DCodeCmd_C.prototype.GetType = function () { return 'Cmd.GetExtendsion2DCodeCmd_C'; };
        return GetExtendsion2DCodeCmd_C;
    })();
    Cmd.GetExtendsion2DCodeCmd_C = GetExtendsion2DCodeCmd_C;
    var GetExtendsion2DCodeCmd_S = (function () {
        function GetExtendsion2DCodeCmd_S() {
        }
        GetExtendsion2DCodeCmd_S.prototype.GetType = function () { return 'Cmd.GetExtendsion2DCodeCmd_S'; };
        return GetExtendsion2DCodeCmd_S;
    })();
    Cmd.GetExtendsion2DCodeCmd_S = GetExtendsion2DCodeCmd_S;
    /**
     * 招募代理
     */
    var RecruitAgentCmd_CS = (function () {
        function RecruitAgentCmd_CS() {
        }
        RecruitAgentCmd_CS.prototype.GetType = function () { return 'Cmd.RecruitAgentCmd_CS'; };
        return RecruitAgentCmd_CS;
    })();
    Cmd.RecruitAgentCmd_CS = RecruitAgentCmd_CS;
    /**
     * 获取推广员数据
     */
    var GetInviteListCmd_CS = (function () {
        function GetInviteListCmd_CS() {
        }
        GetInviteListCmd_CS.prototype.GetType = function () { return 'Cmd.GetInviteListCmd_CS'; };
        return GetInviteListCmd_CS;
    })();
    Cmd.GetInviteListCmd_CS = GetInviteListCmd_CS;
    /**
     * 领取推广员奖励
     */
    var GetInviteRewardCmd_C = (function () {
        function GetInviteRewardCmd_C() {
        }
        GetInviteRewardCmd_C.prototype.GetType = function () { return 'Cmd.GetInviteRewardCmd_C'; };
        return GetInviteRewardCmd_C;
    })();
    Cmd.GetInviteRewardCmd_C = GetInviteRewardCmd_C;
    var GetInviteRewardCmd_S = (function () {
        function GetInviteRewardCmd_S() {
        }
        GetInviteRewardCmd_S.prototype.GetType = function () { return 'Cmd.GetInviteRewardCmd_S'; };
        return GetInviteRewardCmd_S;
    })();
    Cmd.GetInviteRewardCmd_S = GetInviteRewardCmd_S;
    /**
     * 领取签到奖励(麻将钻石场 正常签到领取钻石流程)
     */
    var GetRegisterRewardCmd_C = (function () {
        function GetRegisterRewardCmd_C() {
        }
        GetRegisterRewardCmd_C.prototype.GetType = function () { return 'Cmd.GetRegisterRewardCmd_C'; };
        return GetRegisterRewardCmd_C;
    })();
    Cmd.GetRegisterRewardCmd_C = GetRegisterRewardCmd_C;
    var GetRegisterRewardCmd_S = (function () {
        function GetRegisterRewardCmd_S() {
        }
        GetRegisterRewardCmd_S.prototype.GetType = function () { return 'Cmd.GetRegisterRewardCmd_S'; };
        return GetRegisterRewardCmd_S;
    })();
    Cmd.GetRegisterRewardCmd_S = GetRegisterRewardCmd_S;
    /**
     * 积分排行榜 （贵州）
     */
    var GetDayPointRankCmd_C = (function () {
        function GetDayPointRankCmd_C() {
        }
        GetDayPointRankCmd_C.prototype.GetType = function () { return 'Cmd.GetDayPointRankCmd_C'; };
        return GetDayPointRankCmd_C;
    })();
    Cmd.GetDayPointRankCmd_C = GetDayPointRankCmd_C;
    /**
     * 积分排行榜 （贵州）
     */
    var GetDayPointRankCmd_S = (function () {
        function GetDayPointRankCmd_S() {
        }
        GetDayPointRankCmd_S.prototype.GetType = function () { return 'Cmd.GetDayPointRankCmd_S'; };
        return GetDayPointRankCmd_S;
    })();
    Cmd.GetDayPointRankCmd_S = GetDayPointRankCmd_S;
    /**
     * 发送喇叭
     */
    var SendSuonaLobbyCmd_C = (function () {
        function SendSuonaLobbyCmd_C() {
        }
        SendSuonaLobbyCmd_C.prototype.GetType = function () { return 'Cmd.SendSuonaLobbyCmd_C'; };
        return SendSuonaLobbyCmd_C;
    })();
    Cmd.SendSuonaLobbyCmd_C = SendSuonaLobbyCmd_C;
    var SendSuonaLobbyCmd_S = (function () {
        function SendSuonaLobbyCmd_S() {
        }
        SendSuonaLobbyCmd_S.prototype.GetType = function () { return 'Cmd.SendSuonaLobbyCmd_S'; };
        return SendSuonaLobbyCmd_S;
    })();
    Cmd.SendSuonaLobbyCmd_S = SendSuonaLobbyCmd_S;
    /**
     * 系统弹框消息,目前用来控制版本,其他地方也可以用
     */
    var MessageBoxLobbyCmd_S = (function () {
        function MessageBoxLobbyCmd_S() {
        }
        MessageBoxLobbyCmd_S.prototype.GetType = function () { return 'Cmd.MessageBoxLobbyCmd_S'; };
        return MessageBoxLobbyCmd_S;
    })();
    Cmd.MessageBoxLobbyCmd_S = MessageBoxLobbyCmd_S;
    /**
     * 钻石换房卡（江西客家）
     */
    var ExchangeCardByDiamondLobbyCmd_C = (function () {
        function ExchangeCardByDiamondLobbyCmd_C() {
        }
        ExchangeCardByDiamondLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ExchangeCardByDiamondLobbyCmd_C'; };
        return ExchangeCardByDiamondLobbyCmd_C;
    })();
    Cmd.ExchangeCardByDiamondLobbyCmd_C = ExchangeCardByDiamondLobbyCmd_C;
    /**
     * 钻石 房卡变动 都有专用的接口发送 但是存在冗余 钻石房卡同时变化时 都会推送个人信息刷新
     */
    var ExchangeCardByDiamondLobbyCmd_S = (function () {
        function ExchangeCardByDiamondLobbyCmd_S() {
        }
        ExchangeCardByDiamondLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ExchangeCardByDiamondLobbyCmd_S'; };
        return ExchangeCardByDiamondLobbyCmd_S;
    })();
    Cmd.ExchangeCardByDiamondLobbyCmd_S = ExchangeCardByDiamondLobbyCmd_S;
    /**
     * 进入房间前请求一下当前房间有谁在 (金华大厅)
     */
    var GetRoomUserLobbyCmd_C = (function () {
        function GetRoomUserLobbyCmd_C() {
        }
        GetRoomUserLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetRoomUserLobbyCmd_C'; };
        return GetRoomUserLobbyCmd_C;
    })();
    Cmd.GetRoomUserLobbyCmd_C = GetRoomUserLobbyCmd_C;
    var GetRoomUserLobbyCmd_S = (function () {
        function GetRoomUserLobbyCmd_S() {
        }
        GetRoomUserLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetRoomUserLobbyCmd_S'; };
        return GetRoomUserLobbyCmd_S;
    })();
    Cmd.GetRoomUserLobbyCmd_S = GetRoomUserLobbyCmd_S;
    /**
     * 获取每日排行榜数据
     */
    var GetDayRankCmd_C = (function () {
        function GetDayRankCmd_C() {
        }
        GetDayRankCmd_C.prototype.GetType = function () { return 'Cmd.GetDayRankCmd_C'; };
        return GetDayRankCmd_C;
    })();
    Cmd.GetDayRankCmd_C = GetDayRankCmd_C;
    var GetDayRankCmd_S = (function () {
        function GetDayRankCmd_S() {
        }
        GetDayRankCmd_S.prototype.GetType = function () { return 'Cmd.GetDayRankCmd_S'; };
        return GetDayRankCmd_S;
    })();
    Cmd.GetDayRankCmd_S = GetDayRankCmd_S;
    /**
     * 领取每日排行榜奖励
     */
    var GetDayRankRewardCmd_C = (function () {
        function GetDayRankRewardCmd_C() {
        }
        GetDayRankRewardCmd_C.prototype.GetType = function () { return 'Cmd.GetDayRankRewardCmd_C'; };
        return GetDayRankRewardCmd_C;
    })();
    Cmd.GetDayRankRewardCmd_C = GetDayRankRewardCmd_C;
    var GetDayRankRewardCmd_S = (function () {
        function GetDayRankRewardCmd_S() {
        }
        GetDayRankRewardCmd_S.prototype.GetType = function () { return 'Cmd.GetDayRankRewardCmd_S'; };
        return GetDayRankRewardCmd_S;
    })();
    Cmd.GetDayRankRewardCmd_S = GetDayRankRewardCmd_S;
    /**
     * 处罚提示前端 1警告，2禁言，3自言自语，4关禁闭，5踢下线，6封号 暂时只处理了 5 6
     */
    var PunishUserCmd_S = (function () {
        function PunishUserCmd_S() {
        }
        PunishUserCmd_S.prototype.GetType = function () { return 'Cmd.PunishUserCmd_S'; };
        return PunishUserCmd_S;
    })();
    Cmd.PunishUserCmd_S = PunishUserCmd_S;
    /**
     * 取款请求
     */
    var BankWithdrawCmd_C = (function () {
        function BankWithdrawCmd_C() {
        }
        BankWithdrawCmd_C.prototype.GetType = function () { return 'Cmd.BankWithdrawCmd_C'; };
        return BankWithdrawCmd_C;
    })();
    Cmd.BankWithdrawCmd_C = BankWithdrawCmd_C;
    /**
     * 存款请求
     */
    var BankDepositCmd_C = (function () {
        function BankDepositCmd_C() {
        }
        BankDepositCmd_C.prototype.GetType = function () { return 'Cmd.BankDepositCmd_C'; };
        return BankDepositCmd_C;
    })();
    Cmd.BankDepositCmd_C = BankDepositCmd_C;
    /**
     * 余款数量更新
     */
    var BankMoneyUpdate_S = (function () {
        function BankMoneyUpdate_S() {
        }
        BankMoneyUpdate_S.prototype.GetType = function () { return 'Cmd.BankMoneyUpdate_S'; };
        return BankMoneyUpdate_S;
    })();
    Cmd.BankMoneyUpdate_S = BankMoneyUpdate_S;
    /**
     * 修改密码请求
     */
    var ChangePasswordCmd_C = (function () {
        function ChangePasswordCmd_C() {
        }
        ChangePasswordCmd_C.prototype.GetType = function () { return 'Cmd.ChangePasswordCmd_C'; };
        return ChangePasswordCmd_C;
    })();
    Cmd.ChangePasswordCmd_C = ChangePasswordCmd_C;
    /**
     * -------------------------------------------------------------------------------------//
     * 微信红包开始
     * -------------------------------------------------------------------------------------//
     *  查看当前微信红包奖励
     */
    var GetRedPackRewardInfoLobbyCmd_C = (function () {
        function GetRedPackRewardInfoLobbyCmd_C() {
        }
        GetRedPackRewardInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetRedPackRewardInfoLobbyCmd_C'; };
        return GetRedPackRewardInfoLobbyCmd_C;
    })();
    Cmd.GetRedPackRewardInfoLobbyCmd_C = GetRedPackRewardInfoLobbyCmd_C;
    /**
     * 返回当前微信红包奖励
     */
    var GetRedPackRewardInfoLobbyCmd_S = (function () {
        function GetRedPackRewardInfoLobbyCmd_S() {
        }
        GetRedPackRewardInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetRedPackRewardInfoLobbyCmd_S'; };
        return GetRedPackRewardInfoLobbyCmd_S;
    })();
    Cmd.GetRedPackRewardInfoLobbyCmd_S = GetRedPackRewardInfoLobbyCmd_S;
    /**
     * 检测是否可提取微信红包到公众号
     */
    var CheckOpenRedPackLobbyCmd_C = (function () {
        function CheckOpenRedPackLobbyCmd_C() {
        }
        CheckOpenRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.CheckOpenRedPackLobbyCmd_C'; };
        return CheckOpenRedPackLobbyCmd_C;
    })();
    Cmd.CheckOpenRedPackLobbyCmd_C = CheckOpenRedPackLobbyCmd_C;
    var CheckOpenRedPackLobbyCmd_S = (function () {
        function CheckOpenRedPackLobbyCmd_S() {
        }
        CheckOpenRedPackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.CheckOpenRedPackLobbyCmd_S'; };
        return CheckOpenRedPackLobbyCmd_S;
    })();
    Cmd.CheckOpenRedPackLobbyCmd_S = CheckOpenRedPackLobbyCmd_S;
    /**
     * 提取微信红包到公众号
     */
    var OpenRedPackLobbyCmd_C = (function () {
        function OpenRedPackLobbyCmd_C() {
        }
        OpenRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.OpenRedPackLobbyCmd_C'; };
        return OpenRedPackLobbyCmd_C;
    })();
    Cmd.OpenRedPackLobbyCmd_C = OpenRedPackLobbyCmd_C;
    /**
     * 提取微信红包到公众号返回
     */
    var OpenRedPackLobbyCmd_S = (function () {
        function OpenRedPackLobbyCmd_S() {
        }
        OpenRedPackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.OpenRedPackLobbyCmd_S'; };
        return OpenRedPackLobbyCmd_S;
    })();
    Cmd.OpenRedPackLobbyCmd_S = OpenRedPackLobbyCmd_S;
    /**
     * 提取微信红包失败给单独回个东西 让弹框
     */
    var OpenRedPackFailLobbyCmd_S = (function () {
        function OpenRedPackFailLobbyCmd_S() {
        }
        OpenRedPackFailLobbyCmd_S.prototype.GetType = function () { return 'Cmd.OpenRedPackFailLobbyCmd_S'; };
        return OpenRedPackFailLobbyCmd_S;
    })();
    Cmd.OpenRedPackFailLobbyCmd_S = OpenRedPackFailLobbyCmd_S;
    /**
     * 查看提现详情
     */
    var GetOpenRedPackRecordLobbyCmd_C = (function () {
        function GetOpenRedPackRecordLobbyCmd_C() {
        }
        GetOpenRedPackRecordLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetOpenRedPackRecordLobbyCmd_C'; };
        return GetOpenRedPackRecordLobbyCmd_C;
    })();
    Cmd.GetOpenRedPackRecordLobbyCmd_C = GetOpenRedPackRecordLobbyCmd_C;
    var GetOpenRedPackRecordLobbyCmd_S = (function () {
        function GetOpenRedPackRecordLobbyCmd_S() {
        }
        GetOpenRedPackRecordLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetOpenRedPackRecordLobbyCmd_S'; };
        return GetOpenRedPackRecordLobbyCmd_S;
    })();
    Cmd.GetOpenRedPackRecordLobbyCmd_S = GetOpenRedPackRecordLobbyCmd_S;
    /**
     * 大厅下微信红包雨
     */
    var GrabRedPackLobbyCmd_Brd = (function () {
        function GrabRedPackLobbyCmd_Brd() {
        }
        GrabRedPackLobbyCmd_Brd.prototype.GetType = function () { return 'Cmd.GrabRedPackLobbyCmd_Brd'; };
        return GrabRedPackLobbyCmd_Brd;
    })();
    Cmd.GrabRedPackLobbyCmd_Brd = GrabRedPackLobbyCmd_Brd;
    /**
     * 抢微信红包雨
     */
    var GetGrabRedPackLobbyCmd_C = (function () {
        function GetGrabRedPackLobbyCmd_C() {
        }
        GetGrabRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGrabRedPackLobbyCmd_C'; };
        return GetGrabRedPackLobbyCmd_C;
    })();
    Cmd.GetGrabRedPackLobbyCmd_C = GetGrabRedPackLobbyCmd_C;
    /**
     * 获取微信电话
     */
    var WechatLobbyCmd_CS = (function () {
        function WechatLobbyCmd_CS() {
        }
        WechatLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.WechatLobbyCmd_CS'; };
        return WechatLobbyCmd_CS;
    })();
    Cmd.WechatLobbyCmd_CS = WechatLobbyCmd_CS;
    /**
     * 实名认证
     */
    var AuthenticationLobbyCmd_C = (function () {
        function AuthenticationLobbyCmd_C() {
        }
        AuthenticationLobbyCmd_C.prototype.GetType = function () { return 'Cmd.AuthenticationLobbyCmd_C'; };
        return AuthenticationLobbyCmd_C;
    })();
    Cmd.AuthenticationLobbyCmd_C = AuthenticationLobbyCmd_C;
    var AuthenticationLobbyCmd_S = (function () {
        function AuthenticationLobbyCmd_S() {
        }
        AuthenticationLobbyCmd_S.prototype.GetType = function () { return 'Cmd.AuthenticationLobbyCmd_S'; };
        return AuthenticationLobbyCmd_S;
    })();
    Cmd.AuthenticationLobbyCmd_S = AuthenticationLobbyCmd_S;
    var AuthenticationLobbyCmd_CS = (function () {
        function AuthenticationLobbyCmd_CS() {
        }
        AuthenticationLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.AuthenticationLobbyCmd_CS'; };
        return AuthenticationLobbyCmd_CS;
    })();
    Cmd.AuthenticationLobbyCmd_CS = AuthenticationLobbyCmd_CS;
    /**
     * 比赛场报名
     */
    var EntryMatchLobbyCmd_C = (function () {
        function EntryMatchLobbyCmd_C() {
        }
        EntryMatchLobbyCmd_C.prototype.GetType = function () { return 'Cmd.EntryMatchLobbyCmd_C'; };
        return EntryMatchLobbyCmd_C;
    })();
    Cmd.EntryMatchLobbyCmd_C = EntryMatchLobbyCmd_C;
    var EntryMatchLobbyCmd_S = (function () {
        function EntryMatchLobbyCmd_S() {
        }
        EntryMatchLobbyCmd_S.prototype.GetType = function () { return 'Cmd.EntryMatchLobbyCmd_S'; };
        return EntryMatchLobbyCmd_S;
    })();
    Cmd.EntryMatchLobbyCmd_S = EntryMatchLobbyCmd_S;
    /**
     * 推送比赛场的报名人数给当前报名等待的人
     */
    var EntryMatchUserCountLobbyCmd_Brd = (function () {
        function EntryMatchUserCountLobbyCmd_Brd() {
        }
        EntryMatchUserCountLobbyCmd_Brd.prototype.GetType = function () { return 'Cmd.EntryMatchUserCountLobbyCmd_Brd'; };
        return EntryMatchUserCountLobbyCmd_Brd;
    })();
    Cmd.EntryMatchUserCountLobbyCmd_Brd = EntryMatchUserCountLobbyCmd_Brd;
    /**
     * 退赛
     */
    var QuitMatchLobbyCmd_C = (function () {
        function QuitMatchLobbyCmd_C() {
        }
        QuitMatchLobbyCmd_C.prototype.GetType = function () { return 'Cmd.QuitMatchLobbyCmd_C'; };
        return QuitMatchLobbyCmd_C;
    })();
    Cmd.QuitMatchLobbyCmd_C = QuitMatchLobbyCmd_C;
    var QuitMatchLobbyCmd_S = (function () {
        function QuitMatchLobbyCmd_S() {
        }
        QuitMatchLobbyCmd_S.prototype.GetType = function () { return 'Cmd.QuitMatchLobbyCmd_S'; };
        return QuitMatchLobbyCmd_S;
    })();
    Cmd.QuitMatchLobbyCmd_S = QuitMatchLobbyCmd_S;
    /**
     * 获取报名条件
     */
    var GetEnrollConditionLobbyCmd_C = (function () {
        function GetEnrollConditionLobbyCmd_C() {
        }
        GetEnrollConditionLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetEnrollConditionLobbyCmd_C'; };
        return GetEnrollConditionLobbyCmd_C;
    })();
    Cmd.GetEnrollConditionLobbyCmd_C = GetEnrollConditionLobbyCmd_C;
    var GetEnrollConditionLobbyCmd_S = (function () {
        function GetEnrollConditionLobbyCmd_S() {
        }
        GetEnrollConditionLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetEnrollConditionLobbyCmd_S'; };
        return GetEnrollConditionLobbyCmd_S;
    })();
    Cmd.GetEnrollConditionLobbyCmd_S = GetEnrollConditionLobbyCmd_S;
    /**
     * 比赛场战绩与奖励
     */
    var MatchLotteryLobbyCmd_Brd = (function () {
        function MatchLotteryLobbyCmd_Brd() {
        }
        MatchLotteryLobbyCmd_Brd.prototype.GetType = function () { return 'Cmd.MatchLotteryLobbyCmd_Brd'; };
        return MatchLotteryLobbyCmd_Brd;
    })();
    Cmd.MatchLotteryLobbyCmd_Brd = MatchLotteryLobbyCmd_Brd;
    /**
     * 等待晋级页面数据刷新
     */
    var WaitMatchPromotionInfoLobbyCmd_Brd = (function () {
        function WaitMatchPromotionInfoLobbyCmd_Brd() {
        }
        WaitMatchPromotionInfoLobbyCmd_Brd.prototype.GetType = function () { return 'Cmd.WaitMatchPromotionInfoLobbyCmd_Brd'; };
        return WaitMatchPromotionInfoLobbyCmd_Brd;
    })();
    Cmd.WaitMatchPromotionInfoLobbyCmd_Brd = WaitMatchPromotionInfoLobbyCmd_Brd;
    /**
     * 获取符合比赛场符合报名条件的人数
     */
    var JoinMatch = (function () {
        function JoinMatch() {
        }
        JoinMatch.prototype.GetType = function () { return 'Cmd.JoinMatch'; };
        return JoinMatch;
    })();
    Cmd.JoinMatch = JoinMatch;
    var GetJoinMatchUserCountCmd_C = (function () {
        function GetJoinMatchUserCountCmd_C() {
        }
        GetJoinMatchUserCountCmd_C.prototype.GetType = function () { return 'Cmd.GetJoinMatchUserCountCmd_C'; };
        return GetJoinMatchUserCountCmd_C;
    })();
    Cmd.GetJoinMatchUserCountCmd_C = GetJoinMatchUserCountCmd_C;
    var GetJoinMatchUserCountCmd_S = (function () {
        function GetJoinMatchUserCountCmd_S() {
        }
        GetJoinMatchUserCountCmd_S.prototype.GetType = function () { return 'Cmd.GetJoinMatchUserCountCmd_S'; };
        return GetJoinMatchUserCountCmd_S;
    })();
    Cmd.GetJoinMatchUserCountCmd_S = GetJoinMatchUserCountCmd_S;
    /**
     * 比赛场异常补偿弹窗
     */
    var SendMatchAbnormalLobbyCmd_Brd = (function () {
        function SendMatchAbnormalLobbyCmd_Brd() {
        }
        SendMatchAbnormalLobbyCmd_Brd.prototype.GetType = function () { return 'Cmd.SendMatchAbnormalLobbyCmd_Brd'; };
        return SendMatchAbnormalLobbyCmd_Brd;
    })();
    Cmd.SendMatchAbnormalLobbyCmd_Brd = SendMatchAbnormalLobbyCmd_Brd;
    /**
     * 符合比赛场报名条件人的排行信息
     */
    var JoinMatchRank = (function () {
        function JoinMatchRank() {
        }
        JoinMatchRank.prototype.GetType = function () { return 'Cmd.JoinMatchRank'; };
        return JoinMatchRank;
    })();
    Cmd.JoinMatchRank = JoinMatchRank;
    var GetJoinMatchRankLobbyCmd_C = (function () {
        function GetJoinMatchRankLobbyCmd_C() {
        }
        GetJoinMatchRankLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetJoinMatchRankLobbyCmd_C'; };
        return GetJoinMatchRankLobbyCmd_C;
    })();
    Cmd.GetJoinMatchRankLobbyCmd_C = GetJoinMatchRankLobbyCmd_C;
    var GetJoinMatchRankLobbyCmd_S = (function () {
        function GetJoinMatchRankLobbyCmd_S() {
        }
        GetJoinMatchRankLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetJoinMatchRankLobbyCmd_S'; };
        return GetJoinMatchRankLobbyCmd_S;
    })();
    Cmd.GetJoinMatchRankLobbyCmd_S = GetJoinMatchRankLobbyCmd_S;
    /**
     * 百人场 进入某个游戏
     */
    var EnterHundredGameLobbyCmd_C = (function () {
        function EnterHundredGameLobbyCmd_C() {
        }
        EnterHundredGameLobbyCmd_C.prototype.GetType = function () { return 'Cmd.EnterHundredGameLobbyCmd_C'; };
        return EnterHundredGameLobbyCmd_C;
    })();
    Cmd.EnterHundredGameLobbyCmd_C = EnterHundredGameLobbyCmd_C;
    var EnterHundredGameLobbyCmd_S = (function () {
        function EnterHundredGameLobbyCmd_S() {
        }
        EnterHundredGameLobbyCmd_S.prototype.GetType = function () { return 'Cmd.EnterHundredGameLobbyCmd_S'; };
        return EnterHundredGameLobbyCmd_S;
    })();
    Cmd.EnterHundredGameLobbyCmd_S = EnterHundredGameLobbyCmd_S;
    /**
     * -------------------------------------------------------------------------------------//
     *  每日签到活动(麻将金币场引入的 二号签到流程 - -#)
     * -------------------------------------------------------------------------------------//
     */
    var ContinueSignInfo = (function () {
        function ContinueSignInfo() {
        }
        ContinueSignInfo.prototype.GetType = function () { return 'Cmd.ContinueSignInfo'; };
        return ContinueSignInfo;
    })();
    Cmd.ContinueSignInfo = ContinueSignInfo;
    /**
     * 用户签到信息获取
     */
    var UserSignInfoLobbyCmd_C = (function () {
        function UserSignInfoLobbyCmd_C() {
        }
        UserSignInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserSignInfoLobbyCmd_C'; };
        return UserSignInfoLobbyCmd_C;
    })();
    Cmd.UserSignInfoLobbyCmd_C = UserSignInfoLobbyCmd_C;
    var UserSignInfoLobbyCmd_S = (function () {
        function UserSignInfoLobbyCmd_S() {
        }
        UserSignInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserSignInfoLobbyCmd_S'; };
        return UserSignInfoLobbyCmd_S;
    })();
    Cmd.UserSignInfoLobbyCmd_S = UserSignInfoLobbyCmd_S;
    /**
     * 用户今日签到
     */
    var UserSignTodayLobbyCmd_C = (function () {
        function UserSignTodayLobbyCmd_C() {
        }
        UserSignTodayLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserSignTodayLobbyCmd_C'; };
        return UserSignTodayLobbyCmd_C;
    })();
    Cmd.UserSignTodayLobbyCmd_C = UserSignTodayLobbyCmd_C;
    var UserSignTodayLobbyCmd_S = (function () {
        function UserSignTodayLobbyCmd_S() {
        }
        UserSignTodayLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserSignTodayLobbyCmd_S'; };
        return UserSignTodayLobbyCmd_S;
    })();
    Cmd.UserSignTodayLobbyCmd_S = UserSignTodayLobbyCmd_S;
    /**
     * 用户领取累计签到奖励
     */
    var UserSignContinueLobbyCmd_C = (function () {
        function UserSignContinueLobbyCmd_C() {
        }
        UserSignContinueLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserSignContinueLobbyCmd_C'; };
        return UserSignContinueLobbyCmd_C;
    })();
    Cmd.UserSignContinueLobbyCmd_C = UserSignContinueLobbyCmd_C;
    var UserSignContinueLobbyCmd_S = (function () {
        function UserSignContinueLobbyCmd_S() {
        }
        UserSignContinueLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserSignContinueLobbyCmd_S'; };
        return UserSignContinueLobbyCmd_S;
    })();
    Cmd.UserSignContinueLobbyCmd_S = UserSignContinueLobbyCmd_S;
    /**
     * -------------------------------------------------------------------------------------//
     *  金币场排行榜(麻将金币场引入的 二号排行榜 跟麻将排行榜不混在一起 - -#)
     * -------------------------------------------------------------------------------------//
     */
    var UserRankInfo = (function () {
        function UserRankInfo() {
        }
        UserRankInfo.prototype.GetType = function () { return 'Cmd.UserRankInfo'; };
        return UserRankInfo;
    })();
    Cmd.UserRankInfo = UserRankInfo;
    /**
     * 获取排行榜信息
     */
    var GetListRankCmd_C = (function () {
        function GetListRankCmd_C() {
        }
        GetListRankCmd_C.prototype.GetType = function () { return 'Cmd.GetListRankCmd_C'; };
        return GetListRankCmd_C;
    })();
    Cmd.GetListRankCmd_C = GetListRankCmd_C;
    /**
     * 获取排行榜信息回复
     */
    var GetListRankCmd_S = (function () {
        function GetListRankCmd_S() {
        }
        GetListRankCmd_S.prototype.GetType = function () { return 'Cmd.GetListRankCmd_S'; };
        return GetListRankCmd_S;
    })();
    Cmd.GetListRankCmd_S = GetListRankCmd_S;
    /**
     * 获取大赢家排行榜奖励
     */
    var GetWinChipsRankRewardCmd_C = (function () {
        function GetWinChipsRankRewardCmd_C() {
        }
        GetWinChipsRankRewardCmd_C.prototype.GetType = function () { return 'Cmd.GetWinChipsRankRewardCmd_C'; };
        return GetWinChipsRankRewardCmd_C;
    })();
    Cmd.GetWinChipsRankRewardCmd_C = GetWinChipsRankRewardCmd_C;
    /**
     * 获取大赢家排行榜奖励回复
     */
    var GetWinChipsRankRewardCmd_S = (function () {
        function GetWinChipsRankRewardCmd_S() {
        }
        GetWinChipsRankRewardCmd_S.prototype.GetType = function () { return 'Cmd.GetWinChipsRankRewardCmd_S'; };
        return GetWinChipsRankRewardCmd_S;
    })();
    Cmd.GetWinChipsRankRewardCmd_S = GetWinChipsRankRewardCmd_S;
    /**
     * 魅力值排行榜
     */
    var GetUserCpRankListLobbyCmd_C = (function () {
        function GetUserCpRankListLobbyCmd_C() {
        }
        GetUserCpRankListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetUserCpRankListLobbyCmd_C'; };
        return GetUserCpRankListLobbyCmd_C;
    })();
    Cmd.GetUserCpRankListLobbyCmd_C = GetUserCpRankListLobbyCmd_C;
    var GetUserCpRankListLobbyCmd_S = (function () {
        function GetUserCpRankListLobbyCmd_S() {
        }
        GetUserCpRankListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetUserCpRankListLobbyCmd_S'; };
        return GetUserCpRankListLobbyCmd_S;
    })();
    Cmd.GetUserCpRankListLobbyCmd_S = GetUserCpRankListLobbyCmd_S;
    /**
     * 好彩真人金币排行榜(无数个排行榜)
     */
    var GetCoinLobbyRankListLobbyCmd_C = (function () {
        function GetCoinLobbyRankListLobbyCmd_C() {
        }
        GetCoinLobbyRankListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetCoinLobbyRankListLobbyCmd_C'; };
        return GetCoinLobbyRankListLobbyCmd_C;
    })();
    Cmd.GetCoinLobbyRankListLobbyCmd_C = GetCoinLobbyRankListLobbyCmd_C;
    var GetCoinLobbyRankListLobbyCmd_S = (function () {
        function GetCoinLobbyRankListLobbyCmd_S() {
        }
        GetCoinLobbyRankListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetCoinLobbyRankListLobbyCmd_S'; };
        return GetCoinLobbyRankListLobbyCmd_S;
    })();
    Cmd.GetCoinLobbyRankListLobbyCmd_S = GetCoinLobbyRankListLobbyCmd_S;
    /**
     * 芝麻斗牌 排行榜(新加一个 不用兼容以前的)
     */
    var GetRankListLobbyCmd_C = (function () {
        function GetRankListLobbyCmd_C() {
        }
        GetRankListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetRankListLobbyCmd_C'; };
        return GetRankListLobbyCmd_C;
    })();
    Cmd.GetRankListLobbyCmd_C = GetRankListLobbyCmd_C;
    var GetRankListLobbyCmd_S = (function () {
        function GetRankListLobbyCmd_S() {
        }
        GetRankListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetRankListLobbyCmd_S'; };
        return GetRankListLobbyCmd_S;
    })();
    Cmd.GetRankListLobbyCmd_S = GetRankListLobbyCmd_S;
    /**
     * 大厅设置
     */
    var GameSetLobbyCmd_C = (function () {
        function GameSetLobbyCmd_C() {
        }
        GameSetLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GameSetLobbyCmd_C'; };
        return GameSetLobbyCmd_C;
    })();
    Cmd.GameSetLobbyCmd_C = GameSetLobbyCmd_C;
    var GameSetLobbyCmd_S = (function () {
        function GameSetLobbyCmd_S() {
        }
        GameSetLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GameSetLobbyCmd_S'; };
        return GameSetLobbyCmd_S;
    })();
    Cmd.GameSetLobbyCmd_S = GameSetLobbyCmd_S;
    /**
     * 获取当前设置
     */
    var GetGameSetLobbyCmd_C = (function () {
        function GetGameSetLobbyCmd_C() {
        }
        GetGameSetLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGameSetLobbyCmd_C'; };
        return GetGameSetLobbyCmd_C;
    })();
    Cmd.GetGameSetLobbyCmd_C = GetGameSetLobbyCmd_C;
    var GetGameSetLobbyCmd_S = (function () {
        function GetGameSetLobbyCmd_S() {
        }
        GetGameSetLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetGameSetLobbyCmd_S'; };
        return GetGameSetLobbyCmd_S;
    })();
    Cmd.GetGameSetLobbyCmd_S = GetGameSetLobbyCmd_S;
    /**
     * 领取vip奖励
     */
    var GetVipRewardLobbyCmd_C = (function () {
        function GetVipRewardLobbyCmd_C() {
        }
        GetVipRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetVipRewardLobbyCmd_C'; };
        return GetVipRewardLobbyCmd_C;
    })();
    Cmd.GetVipRewardLobbyCmd_C = GetVipRewardLobbyCmd_C;
    var GetVipRewardLobbyCmd_S = (function () {
        function GetVipRewardLobbyCmd_S() {
        }
        GetVipRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetVipRewardLobbyCmd_S'; };
        return GetVipRewardLobbyCmd_S;
    })();
    Cmd.GetVipRewardLobbyCmd_S = GetVipRewardLobbyCmd_S;
    /**
     * ---------------------------------商城购买相关----------------------------//
     */
    var BuyGoodsLobbyCmd_C = (function () {
        function BuyGoodsLobbyCmd_C() {
        }
        BuyGoodsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.BuyGoodsLobbyCmd_C'; };
        return BuyGoodsLobbyCmd_C;
    })();
    Cmd.BuyGoodsLobbyCmd_C = BuyGoodsLobbyCmd_C;
    var BuyGoodsLobbyCmd_S = (function () {
        function BuyGoodsLobbyCmd_S() {
        }
        BuyGoodsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.BuyGoodsLobbyCmd_S'; };
        return BuyGoodsLobbyCmd_S;
    })();
    Cmd.BuyGoodsLobbyCmd_S = BuyGoodsLobbyCmd_S;
    var TaskItem = (function () {
        function TaskItem() {
        }
        TaskItem.prototype.GetType = function () { return 'Cmd.TaskItem'; };
        return TaskItem;
    })();
    Cmd.TaskItem = TaskItem;
    var RewardItem = (function () {
        function RewardItem() {
        }
        RewardItem.prototype.GetType = function () { return 'Cmd.RewardItem'; };
        return RewardItem;
    })();
    Cmd.RewardItem = RewardItem;
    var DaysTaskItem = (function () {
        function DaysTaskItem() {
        }
        DaysTaskItem.prototype.GetType = function () { return 'Cmd.DaysTaskItem'; };
        return DaysTaskItem;
    })();
    Cmd.DaysTaskItem = DaysTaskItem;
    /**
     * 进入免费金币界面
     */
    var IntoFreeGoldLobbyCmd_C = (function () {
        function IntoFreeGoldLobbyCmd_C() {
        }
        IntoFreeGoldLobbyCmd_C.prototype.GetType = function () { return 'Cmd.IntoFreeGoldLobbyCmd_C'; };
        return IntoFreeGoldLobbyCmd_C;
    })();
    Cmd.IntoFreeGoldLobbyCmd_C = IntoFreeGoldLobbyCmd_C;
    var IntoFreeGoldLobbyCmd_S = (function () {
        function IntoFreeGoldLobbyCmd_S() {
        }
        IntoFreeGoldLobbyCmd_S.prototype.GetType = function () { return 'Cmd.IntoFreeGoldLobbyCmd_S'; };
        return IntoFreeGoldLobbyCmd_S;
    })();
    Cmd.IntoFreeGoldLobbyCmd_S = IntoFreeGoldLobbyCmd_S;
    /**
     * 领取指定任务奖励
     */
    var GetDaysTaskRewardLobbyCmd_C = (function () {
        function GetDaysTaskRewardLobbyCmd_C() {
        }
        GetDaysTaskRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetDaysTaskRewardLobbyCmd_C'; };
        return GetDaysTaskRewardLobbyCmd_C;
    })();
    Cmd.GetDaysTaskRewardLobbyCmd_C = GetDaysTaskRewardLobbyCmd_C;
    var GetDaysTaskRewardLobbyCmd_S = (function () {
        function GetDaysTaskRewardLobbyCmd_S() {
        }
        GetDaysTaskRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetDaysTaskRewardLobbyCmd_S'; };
        return GetDaysTaskRewardLobbyCmd_S;
    })();
    Cmd.GetDaysTaskRewardLobbyCmd_S = GetDaysTaskRewardLobbyCmd_S;
    /**
     * 向前端发送破产补助弹窗
     */
    var SendBankruptcyLobbyCmd_Brd = (function () {
        function SendBankruptcyLobbyCmd_Brd() {
        }
        SendBankruptcyLobbyCmd_Brd.prototype.GetType = function () { return 'Cmd.SendBankruptcyLobbyCmd_Brd'; };
        return SendBankruptcyLobbyCmd_Brd;
    })();
    Cmd.SendBankruptcyLobbyCmd_Brd = SendBankruptcyLobbyCmd_Brd;
    /**
     * 游戏任务进度 例如：1/10
     */
    var GetGameTaskScheduleLobbyCmd_C = (function () {
        function GetGameTaskScheduleLobbyCmd_C() {
        }
        GetGameTaskScheduleLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGameTaskScheduleLobbyCmd_C'; };
        return GetGameTaskScheduleLobbyCmd_C;
    })();
    Cmd.GetGameTaskScheduleLobbyCmd_C = GetGameTaskScheduleLobbyCmd_C;
    /**
     * 每更新一次服务器会主动推送_S给客户端
     */
    var GetGameTaskScheduleLobbyCmd_S = (function () {
        function GetGameTaskScheduleLobbyCmd_S() {
        }
        GetGameTaskScheduleLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetGameTaskScheduleLobbyCmd_S'; };
        return GetGameTaskScheduleLobbyCmd_S;
    })();
    Cmd.GetGameTaskScheduleLobbyCmd_S = GetGameTaskScheduleLobbyCmd_S;
    /**
     * 获取任务列表
     */
    var GetGameTaskListLobbyCmd_C = (function () {
        function GetGameTaskListLobbyCmd_C() {
        }
        GetGameTaskListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGameTaskListLobbyCmd_C'; };
        return GetGameTaskListLobbyCmd_C;
    })();
    Cmd.GetGameTaskListLobbyCmd_C = GetGameTaskListLobbyCmd_C;
    var GetGameTaskListLobbyCmd_S = (function () {
        function GetGameTaskListLobbyCmd_S() {
        }
        GetGameTaskListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetGameTaskListLobbyCmd_S'; };
        return GetGameTaskListLobbyCmd_S;
    })();
    Cmd.GetGameTaskListLobbyCmd_S = GetGameTaskListLobbyCmd_S;
    /**
     * 领取指定游戏任务奖励
     */
    var GetGameTaskRewardLobbyCmd_C = (function () {
        function GetGameTaskRewardLobbyCmd_C() {
        }
        GetGameTaskRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGameTaskRewardLobbyCmd_C'; };
        return GetGameTaskRewardLobbyCmd_C;
    })();
    Cmd.GetGameTaskRewardLobbyCmd_C = GetGameTaskRewardLobbyCmd_C;
    var GetGameTaskRewardLobbyCmd_S = (function () {
        function GetGameTaskRewardLobbyCmd_S() {
        }
        GetGameTaskRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetGameTaskRewardLobbyCmd_S'; };
        return GetGameTaskRewardLobbyCmd_S;
    })();
    Cmd.GetGameTaskRewardLobbyCmd_S = GetGameTaskRewardLobbyCmd_S;
    /**
     * 新金币场首充
     */
    var FirstRechargeInfoLobbyCmd_C = (function () {
        function FirstRechargeInfoLobbyCmd_C() {
        }
        FirstRechargeInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.FirstRechargeInfoLobbyCmd_C'; };
        return FirstRechargeInfoLobbyCmd_C;
    })();
    Cmd.FirstRechargeInfoLobbyCmd_C = FirstRechargeInfoLobbyCmd_C;
    /**
     * 新金币场首充弹窗
     */
    var FirstRechargeInfoLobbyCmd_S = (function () {
        function FirstRechargeInfoLobbyCmd_S() {
        }
        FirstRechargeInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.FirstRechargeInfoLobbyCmd_S'; };
        return FirstRechargeInfoLobbyCmd_S;
    })();
    Cmd.FirstRechargeInfoLobbyCmd_S = FirstRechargeInfoLobbyCmd_S;
    /**
     * 领取首充礼包
     */
    var FirstRecharge = (function () {
        function FirstRecharge() {
        }
        FirstRecharge.prototype.GetType = function () { return 'Cmd.FirstRecharge'; };
        return FirstRecharge;
    })();
    Cmd.FirstRecharge = FirstRecharge;
    var ReceiveFirstRechargeLobbyCmd_C = (function () {
        function ReceiveFirstRechargeLobbyCmd_C() {
        }
        ReceiveFirstRechargeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ReceiveFirstRechargeLobbyCmd_C'; };
        return ReceiveFirstRechargeLobbyCmd_C;
    })();
    Cmd.ReceiveFirstRechargeLobbyCmd_C = ReceiveFirstRechargeLobbyCmd_C;
    var ReceiveFirstRechargeLobbyCmd_S = (function () {
        function ReceiveFirstRechargeLobbyCmd_S() {
        }
        ReceiveFirstRechargeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ReceiveFirstRechargeLobbyCmd_S'; };
        return ReceiveFirstRechargeLobbyCmd_S;
    })();
    Cmd.ReceiveFirstRechargeLobbyCmd_S = ReceiveFirstRechargeLobbyCmd_S;
    /**
     * 限时优惠活动
     */
    var LimitOfferChipsLobbyCmd_C = (function () {
        function LimitOfferChipsLobbyCmd_C() {
        }
        LimitOfferChipsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.LimitOfferChipsLobbyCmd_C'; };
        return LimitOfferChipsLobbyCmd_C;
    })();
    Cmd.LimitOfferChipsLobbyCmd_C = LimitOfferChipsLobbyCmd_C;
    /**
     * 限时优惠活动的弹窗
     */
    var LimitOfferChipsLobbyCmd_S = (function () {
        function LimitOfferChipsLobbyCmd_S() {
        }
        LimitOfferChipsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.LimitOfferChipsLobbyCmd_S'; };
        return LimitOfferChipsLobbyCmd_S;
    })();
    Cmd.LimitOfferChipsLobbyCmd_S = LimitOfferChipsLobbyCmd_S;
    /**
     * 兑换限时优惠的金币
     */
    var GetLimitOfferChipsLobbyCmd_C = (function () {
        function GetLimitOfferChipsLobbyCmd_C() {
        }
        GetLimitOfferChipsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetLimitOfferChipsLobbyCmd_C'; };
        return GetLimitOfferChipsLobbyCmd_C;
    })();
    Cmd.GetLimitOfferChipsLobbyCmd_C = GetLimitOfferChipsLobbyCmd_C;
    var GetLimitOfferChipsLobbyCmd_S = (function () {
        function GetLimitOfferChipsLobbyCmd_S() {
        }
        GetLimitOfferChipsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetLimitOfferChipsLobbyCmd_S'; };
        return GetLimitOfferChipsLobbyCmd_S;
    })();
    Cmd.GetLimitOfferChipsLobbyCmd_S = GetLimitOfferChipsLobbyCmd_S;
    /**
     * 幸运翻翻翻资格
     */
    var GetLuckTurnCardInfoLobbyCmd_C = (function () {
        function GetLuckTurnCardInfoLobbyCmd_C() {
        }
        GetLuckTurnCardInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetLuckTurnCardInfoLobbyCmd_C'; };
        return GetLuckTurnCardInfoLobbyCmd_C;
    })();
    Cmd.GetLuckTurnCardInfoLobbyCmd_C = GetLuckTurnCardInfoLobbyCmd_C;
    var GetLuckTurnCardInfoLobbyCmd_S = (function () {
        function GetLuckTurnCardInfoLobbyCmd_S() {
        }
        GetLuckTurnCardInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetLuckTurnCardInfoLobbyCmd_S'; };
        return GetLuckTurnCardInfoLobbyCmd_S;
    })();
    Cmd.GetLuckTurnCardInfoLobbyCmd_S = GetLuckTurnCardInfoLobbyCmd_S;
    /**
     * 幸运翻翻翻的翻牌结果
     */
    var GetLuckTurnCardResultLobbyCmd_C = (function () {
        function GetLuckTurnCardResultLobbyCmd_C() {
        }
        GetLuckTurnCardResultLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetLuckTurnCardResultLobbyCmd_C'; };
        return GetLuckTurnCardResultLobbyCmd_C;
    })();
    Cmd.GetLuckTurnCardResultLobbyCmd_C = GetLuckTurnCardResultLobbyCmd_C;
    var GetLuckTurnCardResultLobbyCmd_S = (function () {
        function GetLuckTurnCardResultLobbyCmd_S() {
        }
        GetLuckTurnCardResultLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetLuckTurnCardResultLobbyCmd_S'; };
        return GetLuckTurnCardResultLobbyCmd_S;
    })();
    Cmd.GetLuckTurnCardResultLobbyCmd_S = GetLuckTurnCardResultLobbyCmd_S;
    /**
     *  新版幸运翻翻翻
     *  金币奖励集合
     */
    var RewardChips = (function () {
        function RewardChips() {
        }
        RewardChips.prototype.GetType = function () { return 'Cmd.RewardChips'; };
        return RewardChips;
    })();
    Cmd.RewardChips = RewardChips;
    /**
     * 新版幸运翻翻翻主界面
     */
    var NewLuckTurnCardShowLobbyCmd_C = (function () {
        function NewLuckTurnCardShowLobbyCmd_C() {
        }
        NewLuckTurnCardShowLobbyCmd_C.prototype.GetType = function () { return 'Cmd.NewLuckTurnCardShowLobbyCmd_C'; };
        return NewLuckTurnCardShowLobbyCmd_C;
    })();
    Cmd.NewLuckTurnCardShowLobbyCmd_C = NewLuckTurnCardShowLobbyCmd_C;
    var NewLuckTurnCardShowLobbyCmd_S = (function () {
        function NewLuckTurnCardShowLobbyCmd_S() {
        }
        NewLuckTurnCardShowLobbyCmd_S.prototype.GetType = function () { return 'Cmd.NewLuckTurnCardShowLobbyCmd_S'; };
        return NewLuckTurnCardShowLobbyCmd_S;
    })();
    Cmd.NewLuckTurnCardShowLobbyCmd_S = NewLuckTurnCardShowLobbyCmd_S;
    /**
     * 新版幸运翻翻翻翻牌
     */
    var NewGetLuckTurnCardRewardLobbyCmd_C = (function () {
        function NewGetLuckTurnCardRewardLobbyCmd_C() {
        }
        NewGetLuckTurnCardRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.NewGetLuckTurnCardRewardLobbyCmd_C'; };
        return NewGetLuckTurnCardRewardLobbyCmd_C;
    })();
    Cmd.NewGetLuckTurnCardRewardLobbyCmd_C = NewGetLuckTurnCardRewardLobbyCmd_C;
    var NewGetLuckTurnCardRewardLobbyCmd_S = (function () {
        function NewGetLuckTurnCardRewardLobbyCmd_S() {
        }
        NewGetLuckTurnCardRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.NewGetLuckTurnCardRewardLobbyCmd_S'; };
        return NewGetLuckTurnCardRewardLobbyCmd_S;
    })();
    Cmd.NewGetLuckTurnCardRewardLobbyCmd_S = NewGetLuckTurnCardRewardLobbyCmd_S;
    /**
     * 第三版幸运翻翻翻
     * 对应的翻牌结果
     */
    var TurnReward = (function () {
        function TurnReward() {
        }
        TurnReward.prototype.GetType = function () { return 'Cmd.TurnReward'; };
        return TurnReward;
    })();
    Cmd.TurnReward = TurnReward;
    /**
     * 获取对应的界面数据
     */
    var GetLuckTurnCardShowInfoV3LobbyCmd_C = (function () {
        function GetLuckTurnCardShowInfoV3LobbyCmd_C() {
        }
        GetLuckTurnCardShowInfoV3LobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetLuckTurnCardShowInfoV3LobbyCmd_C'; };
        return GetLuckTurnCardShowInfoV3LobbyCmd_C;
    })();
    Cmd.GetLuckTurnCardShowInfoV3LobbyCmd_C = GetLuckTurnCardShowInfoV3LobbyCmd_C;
    var GetLuckTurnCardShowInfoV3LobbyCmd_S = (function () {
        function GetLuckTurnCardShowInfoV3LobbyCmd_S() {
        }
        GetLuckTurnCardShowInfoV3LobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetLuckTurnCardShowInfoV3LobbyCmd_S'; };
        return GetLuckTurnCardShowInfoV3LobbyCmd_S;
    })();
    Cmd.GetLuckTurnCardShowInfoV3LobbyCmd_S = GetLuckTurnCardShowInfoV3LobbyCmd_S;
    /**
     * 翻牌结果
     */
    var GetLuckTurnCardRewardV3LobbyCmd_C = (function () {
        function GetLuckTurnCardRewardV3LobbyCmd_C() {
        }
        GetLuckTurnCardRewardV3LobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetLuckTurnCardRewardV3LobbyCmd_C'; };
        return GetLuckTurnCardRewardV3LobbyCmd_C;
    })();
    Cmd.GetLuckTurnCardRewardV3LobbyCmd_C = GetLuckTurnCardRewardV3LobbyCmd_C;
    var GetLuckTurnCardRewardV3LobbyCmd_S = (function () {
        function GetLuckTurnCardRewardV3LobbyCmd_S() {
        }
        GetLuckTurnCardRewardV3LobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetLuckTurnCardRewardV3LobbyCmd_S'; };
        return GetLuckTurnCardRewardV3LobbyCmd_S;
    })();
    Cmd.GetLuckTurnCardRewardV3LobbyCmd_S = GetLuckTurnCardRewardV3LobbyCmd_S;
    /**
     * 好彩金币场的救济金
     */
    var GetReliefPayStatusLobbyCmd_C = (function () {
        function GetReliefPayStatusLobbyCmd_C() {
        }
        GetReliefPayStatusLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetReliefPayStatusLobbyCmd_C'; };
        return GetReliefPayStatusLobbyCmd_C;
    })();
    Cmd.GetReliefPayStatusLobbyCmd_C = GetReliefPayStatusLobbyCmd_C;
    var GetReliefPayStatusLobbyCmd_S = (function () {
        function GetReliefPayStatusLobbyCmd_S() {
        }
        GetReliefPayStatusLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetReliefPayStatusLobbyCmd_S'; };
        return GetReliefPayStatusLobbyCmd_S;
    })();
    Cmd.GetReliefPayStatusLobbyCmd_S = GetReliefPayStatusLobbyCmd_S;
    /**
     * 礼包码兑换功能
     */
    var UserGiftCodeLobbyCmd_C = (function () {
        function UserGiftCodeLobbyCmd_C() {
        }
        UserGiftCodeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserGiftCodeLobbyCmd_C'; };
        return UserGiftCodeLobbyCmd_C;
    })();
    Cmd.UserGiftCodeLobbyCmd_C = UserGiftCodeLobbyCmd_C;
    var UserGiftCodeLobbyCmd_S = (function () {
        function UserGiftCodeLobbyCmd_S() {
        }
        UserGiftCodeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserGiftCodeLobbyCmd_S'; };
        return UserGiftCodeLobbyCmd_S;
    })();
    Cmd.UserGiftCodeLobbyCmd_S = UserGiftCodeLobbyCmd_S;
    /**
     * 好彩金币场快速开始按钮
     */
    var QuickStartGameLobbyCmd_C = (function () {
        function QuickStartGameLobbyCmd_C() {
        }
        QuickStartGameLobbyCmd_C.prototype.GetType = function () { return 'Cmd.QuickStartGameLobbyCmd_C'; };
        return QuickStartGameLobbyCmd_C;
    })();
    Cmd.QuickStartGameLobbyCmd_C = QuickStartGameLobbyCmd_C;
    var QuickStartGameLobbyCmd_S = (function () {
        function QuickStartGameLobbyCmd_S() {
        }
        QuickStartGameLobbyCmd_S.prototype.GetType = function () { return 'Cmd.QuickStartGameLobbyCmd_S'; };
        return QuickStartGameLobbyCmd_S;
    })();
    Cmd.QuickStartGameLobbyCmd_S = QuickStartGameLobbyCmd_S;
    /**
     * 进入绑定代理商界面 -- 福建新增 这个感觉跟存在自身的parent不是同一个
     */
    var IntoHigherAgentLobbyCmd_C = (function () {
        function IntoHigherAgentLobbyCmd_C() {
        }
        IntoHigherAgentLobbyCmd_C.prototype.GetType = function () { return 'Cmd.IntoHigherAgentLobbyCmd_C'; };
        return IntoHigherAgentLobbyCmd_C;
    })();
    Cmd.IntoHigherAgentLobbyCmd_C = IntoHigherAgentLobbyCmd_C;
    var IntoHigherAgentLobbyCmd_S = (function () {
        function IntoHigherAgentLobbyCmd_S() {
        }
        IntoHigherAgentLobbyCmd_S.prototype.GetType = function () { return 'Cmd.IntoHigherAgentLobbyCmd_S'; };
        return IntoHigherAgentLobbyCmd_S;
    })();
    Cmd.IntoHigherAgentLobbyCmd_S = IntoHigherAgentLobbyCmd_S;
    /**
     * 通过大厅向代理商系统 绑定上级代理(福建新增的一个绑定类型)
     */
    var EnquireBindAgent2LobbyCmd_C = (function () {
        function EnquireBindAgent2LobbyCmd_C() {
        }
        EnquireBindAgent2LobbyCmd_C.prototype.GetType = function () { return 'Cmd.EnquireBindAgent2LobbyCmd_C'; };
        return EnquireBindAgent2LobbyCmd_C;
    })();
    Cmd.EnquireBindAgent2LobbyCmd_C = EnquireBindAgent2LobbyCmd_C;
    var EnquireBindAgent2LobbyCmd_S = (function () {
        function EnquireBindAgent2LobbyCmd_S() {
        }
        EnquireBindAgent2LobbyCmd_S.prototype.GetType = function () { return 'Cmd.EnquireBindAgent2LobbyCmd_S'; };
        return EnquireBindAgent2LobbyCmd_S;
    })();
    Cmd.EnquireBindAgent2LobbyCmd_S = EnquireBindAgent2LobbyCmd_S;
    /**
     * zqb银行相关协议 不共用西安的
     */
    var AccessBankChipsLobbyCmd_C = (function () {
        function AccessBankChipsLobbyCmd_C() {
        }
        AccessBankChipsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.AccessBankChipsLobbyCmd_C'; };
        return AccessBankChipsLobbyCmd_C;
    })();
    Cmd.AccessBankChipsLobbyCmd_C = AccessBankChipsLobbyCmd_C;
    var AccessBankChipsLobbyCmd_S = (function () {
        function AccessBankChipsLobbyCmd_S() {
        }
        AccessBankChipsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.AccessBankChipsLobbyCmd_S'; };
        return AccessBankChipsLobbyCmd_S;
    })();
    Cmd.AccessBankChipsLobbyCmd_S = AccessBankChipsLobbyCmd_S;
    /**
     * 修改用户信息(好彩真人有些信息需要特殊处理在这里重新定义下)
     */
    var UserInfoModifyLobbyCmd_C = (function () {
        function UserInfoModifyLobbyCmd_C() {
        }
        UserInfoModifyLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserInfoModifyLobbyCmd_C'; };
        return UserInfoModifyLobbyCmd_C;
    })();
    Cmd.UserInfoModifyLobbyCmd_C = UserInfoModifyLobbyCmd_C;
    var UserInfoModifyLobbyCmd_S = (function () {
        function UserInfoModifyLobbyCmd_S() {
        }
        UserInfoModifyLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserInfoModifyLobbyCmd_S'; };
        return UserInfoModifyLobbyCmd_S;
    })();
    Cmd.UserInfoModifyLobbyCmd_S = UserInfoModifyLobbyCmd_S;
    /**
     * 申请添加好友
     */
    var AddFriendLobbyCmd_C = (function () {
        function AddFriendLobbyCmd_C() {
        }
        AddFriendLobbyCmd_C.prototype.GetType = function () { return 'Cmd.AddFriendLobbyCmd_C'; };
        return AddFriendLobbyCmd_C;
    })();
    Cmd.AddFriendLobbyCmd_C = AddFriendLobbyCmd_C;
    var AddFriendLobbyCmd_S = (function () {
        function AddFriendLobbyCmd_S() {
        }
        AddFriendLobbyCmd_S.prototype.GetType = function () { return 'Cmd.AddFriendLobbyCmd_S'; };
        return AddFriendLobbyCmd_S;
    })();
    Cmd.AddFriendLobbyCmd_S = AddFriendLobbyCmd_S;
    /**
     * 删除好友
     */
    var RemoveFriendLobbyCmd_C = (function () {
        function RemoveFriendLobbyCmd_C() {
        }
        RemoveFriendLobbyCmd_C.prototype.GetType = function () { return 'Cmd.RemoveFriendLobbyCmd_C'; };
        return RemoveFriendLobbyCmd_C;
    })();
    Cmd.RemoveFriendLobbyCmd_C = RemoveFriendLobbyCmd_C;
    var RemoveFriendLobbyCmd_S = (function () {
        function RemoveFriendLobbyCmd_S() {
        }
        RemoveFriendLobbyCmd_S.prototype.GetType = function () { return 'Cmd.RemoveFriendLobbyCmd_S'; };
        return RemoveFriendLobbyCmd_S;
    })();
    Cmd.RemoveFriendLobbyCmd_S = RemoveFriendLobbyCmd_S;
    /**
     * 获取好友列表
     */
    var GetFriendListLobbyCmd_C = (function () {
        function GetFriendListLobbyCmd_C() {
        }
        GetFriendListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetFriendListLobbyCmd_C'; };
        return GetFriendListLobbyCmd_C;
    })();
    Cmd.GetFriendListLobbyCmd_C = GetFriendListLobbyCmd_C;
    var GetFriendListLobbyCmd_S = (function () {
        function GetFriendListLobbyCmd_S() {
        }
        GetFriendListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetFriendListLobbyCmd_S'; };
        return GetFriendListLobbyCmd_S;
    })();
    Cmd.GetFriendListLobbyCmd_S = GetFriendListLobbyCmd_S;
    /**
     * 好友申请列表
     */
    var GetFriendApplyListLobbyCmd_C = (function () {
        function GetFriendApplyListLobbyCmd_C() {
        }
        GetFriendApplyListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetFriendApplyListLobbyCmd_C'; };
        return GetFriendApplyListLobbyCmd_C;
    })();
    Cmd.GetFriendApplyListLobbyCmd_C = GetFriendApplyListLobbyCmd_C;
    var GetFriendApplyListLobbyCmd_S = (function () {
        function GetFriendApplyListLobbyCmd_S() {
        }
        GetFriendApplyListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetFriendApplyListLobbyCmd_S'; };
        return GetFriendApplyListLobbyCmd_S;
    })();
    Cmd.GetFriendApplyListLobbyCmd_S = GetFriendApplyListLobbyCmd_S;
    var GetFriendApplyListLobbyCmd_S;
    (function (GetFriendApplyListLobbyCmd_S) {
        var ApplyUser = (function () {
            function ApplyUser() {
            }
            ApplyUser.prototype.GetType = function () { return 'Cmd.GetFriendApplyListLobbyCmd_S.ApplyUser'; };
            return ApplyUser;
        })();
        GetFriendApplyListLobbyCmd_S.ApplyUser = ApplyUser;
    })(GetFriendApplyListLobbyCmd_S = Cmd.GetFriendApplyListLobbyCmd_S || (Cmd.GetFriendApplyListLobbyCmd_S = {}));
    /**
     * 同意，拒绝好友申请
     */
    var DealFriendApplyListLobbyCmd_C = (function () {
        function DealFriendApplyListLobbyCmd_C() {
        }
        DealFriendApplyListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.DealFriendApplyListLobbyCmd_C'; };
        return DealFriendApplyListLobbyCmd_C;
    })();
    Cmd.DealFriendApplyListLobbyCmd_C = DealFriendApplyListLobbyCmd_C;
    var DealFriendApplyListLobbyCmd_S = (function () {
        function DealFriendApplyListLobbyCmd_S() {
        }
        DealFriendApplyListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.DealFriendApplyListLobbyCmd_S'; };
        return DealFriendApplyListLobbyCmd_S;
    })();
    Cmd.DealFriendApplyListLobbyCmd_S = DealFriendApplyListLobbyCmd_S;
    /**
     * 查找特定玩家(因为存在机器人的情况所有不能用UserInfoGetLobbyCmd_C UserInfoGetLobbyCmd_S的协议)
     */
    var SearchUserLobbyCmd_C = (function () {
        function SearchUserLobbyCmd_C() {
        }
        SearchUserLobbyCmd_C.prototype.GetType = function () { return 'Cmd.SearchUserLobbyCmd_C'; };
        return SearchUserLobbyCmd_C;
    })();
    Cmd.SearchUserLobbyCmd_C = SearchUserLobbyCmd_C;
    var SearchUserLobbyCmd_S = (function () {
        function SearchUserLobbyCmd_S() {
        }
        SearchUserLobbyCmd_S.prototype.GetType = function () { return 'Cmd.SearchUserLobbyCmd_S'; };
        return SearchUserLobbyCmd_S;
    })();
    Cmd.SearchUserLobbyCmd_S = SearchUserLobbyCmd_S;
    /**
     * 查找好友界面
     */
    var SearchFriendsListLobbyCmd_C = (function () {
        function SearchFriendsListLobbyCmd_C() {
        }
        SearchFriendsListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.SearchFriendsListLobbyCmd_C'; };
        return SearchFriendsListLobbyCmd_C;
    })();
    Cmd.SearchFriendsListLobbyCmd_C = SearchFriendsListLobbyCmd_C;
    var SearchFriendsListLobbyCmd_S = (function () {
        function SearchFriendsListLobbyCmd_S() {
        }
        SearchFriendsListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.SearchFriendsListLobbyCmd_S'; };
        return SearchFriendsListLobbyCmd_S;
    })();
    Cmd.SearchFriendsListLobbyCmd_S = SearchFriendsListLobbyCmd_S;
    /**
     * 好友聊天
     */
    var FriendChatLobbyCmd_C = (function () {
        function FriendChatLobbyCmd_C() {
        }
        FriendChatLobbyCmd_C.prototype.GetType = function () { return 'Cmd.FriendChatLobbyCmd_C'; };
        return FriendChatLobbyCmd_C;
    })();
    Cmd.FriendChatLobbyCmd_C = FriendChatLobbyCmd_C;
    /**
     * 发送和接收者都用这一条消息推送
     */
    var FriendChatLobbyCmd_S = (function () {
        function FriendChatLobbyCmd_S() {
        }
        FriendChatLobbyCmd_S.prototype.GetType = function () { return 'Cmd.FriendChatLobbyCmd_S'; };
        return FriendChatLobbyCmd_S;
    })();
    Cmd.FriendChatLobbyCmd_S = FriendChatLobbyCmd_S;
    /**
     * 消息红点功能
     */
    var RedPoint = (function () {
        function RedPoint() {
        }
        RedPoint.prototype.GetType = function () { return 'Cmd.RedPoint'; };
        return RedPoint;
    })();
    Cmd.RedPoint = RedPoint;
    var ShowRedPointLobbyCmd_S = (function () {
        function ShowRedPointLobbyCmd_S() {
        }
        ShowRedPointLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ShowRedPointLobbyCmd_S'; };
        return ShowRedPointLobbyCmd_S;
    })();
    Cmd.ShowRedPointLobbyCmd_S = ShowRedPointLobbyCmd_S;
    /**
     * 移除红点请求
     */
    var RemoveRedPointLobbyCmd_CS = (function () {
        function RemoveRedPointLobbyCmd_CS() {
        }
        RemoveRedPointLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.RemoveRedPointLobbyCmd_CS'; };
        return RemoveRedPointLobbyCmd_CS;
    })();
    Cmd.RemoveRedPointLobbyCmd_CS = RemoveRedPointLobbyCmd_CS;
    /**
     * 获取验证码当前认证状态
     */
    var GetIdentifyingCodeStateLobbyCmd_CS = (function () {
        function GetIdentifyingCodeStateLobbyCmd_CS() {
        }
        GetIdentifyingCodeStateLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.GetIdentifyingCodeStateLobbyCmd_CS'; };
        return GetIdentifyingCodeStateLobbyCmd_CS;
    })();
    Cmd.GetIdentifyingCodeStateLobbyCmd_CS = GetIdentifyingCodeStateLobbyCmd_CS;
    /**
     * 获取验证码
     */
    var GetIdentifyingCodeLobbyCmd_C = (function () {
        function GetIdentifyingCodeLobbyCmd_C() {
        }
        GetIdentifyingCodeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetIdentifyingCodeLobbyCmd_C'; };
        return GetIdentifyingCodeLobbyCmd_C;
    })();
    Cmd.GetIdentifyingCodeLobbyCmd_C = GetIdentifyingCodeLobbyCmd_C;
    var GetIdentifyingCodeLobbyCmd_S = (function () {
        function GetIdentifyingCodeLobbyCmd_S() {
        }
        GetIdentifyingCodeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetIdentifyingCodeLobbyCmd_S'; };
        return GetIdentifyingCodeLobbyCmd_S;
    })();
    Cmd.GetIdentifyingCodeLobbyCmd_S = GetIdentifyingCodeLobbyCmd_S;
    /**
     * 绑定手机
     */
    var BindingMobilePhoneLobbyCmd_C = (function () {
        function BindingMobilePhoneLobbyCmd_C() {
        }
        BindingMobilePhoneLobbyCmd_C.prototype.GetType = function () { return 'Cmd.BindingMobilePhoneLobbyCmd_C'; };
        return BindingMobilePhoneLobbyCmd_C;
    })();
    Cmd.BindingMobilePhoneLobbyCmd_C = BindingMobilePhoneLobbyCmd_C;
    var BindingMobilePhoneLobbyCmd_S = (function () {
        function BindingMobilePhoneLobbyCmd_S() {
        }
        BindingMobilePhoneLobbyCmd_S.prototype.GetType = function () { return 'Cmd.BindingMobilePhoneLobbyCmd_S'; };
        return BindingMobilePhoneLobbyCmd_S;
    })();
    Cmd.BindingMobilePhoneLobbyCmd_S = BindingMobilePhoneLobbyCmd_S;
    /**
     * 获取红包信息
     */
    var GetRedPackInfoLobbyCmd_C = (function () {
        function GetRedPackInfoLobbyCmd_C() {
        }
        GetRedPackInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetRedPackInfoLobbyCmd_C'; };
        return GetRedPackInfoLobbyCmd_C;
    })();
    Cmd.GetRedPackInfoLobbyCmd_C = GetRedPackInfoLobbyCmd_C;
    var GetRedPackInfoLobbyCmd_S = (function () {
        function GetRedPackInfoLobbyCmd_S() {
        }
        GetRedPackInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetRedPackInfoLobbyCmd_S'; };
        return GetRedPackInfoLobbyCmd_S;
    })();
    Cmd.GetRedPackInfoLobbyCmd_S = GetRedPackInfoLobbyCmd_S;
    /**
     * 抢红包
     */
    var GrabRedPackLobbyCmd_C = (function () {
        function GrabRedPackLobbyCmd_C() {
        }
        GrabRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GrabRedPackLobbyCmd_C'; };
        return GrabRedPackLobbyCmd_C;
    })();
    Cmd.GrabRedPackLobbyCmd_C = GrabRedPackLobbyCmd_C;
    var GrabRedPackLobbyCmd_S = (function () {
        function GrabRedPackLobbyCmd_S() {
        }
        GrabRedPackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GrabRedPackLobbyCmd_S'; };
        return GrabRedPackLobbyCmd_S;
    })();
    Cmd.GrabRedPackLobbyCmd_S = GrabRedPackLobbyCmd_S;
    /**
     * 累计奖励
     */
    var GetMyRedPackRewardLobbyCmd_C = (function () {
        function GetMyRedPackRewardLobbyCmd_C() {
        }
        GetMyRedPackRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetMyRedPackRewardLobbyCmd_C'; };
        return GetMyRedPackRewardLobbyCmd_C;
    })();
    Cmd.GetMyRedPackRewardLobbyCmd_C = GetMyRedPackRewardLobbyCmd_C;
    var GetMyRedPackRewardLobbyCmd_S = (function () {
        function GetMyRedPackRewardLobbyCmd_S() {
        }
        GetMyRedPackRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetMyRedPackRewardLobbyCmd_S'; };
        return GetMyRedPackRewardLobbyCmd_S;
    })();
    Cmd.GetMyRedPackRewardLobbyCmd_S = GetMyRedPackRewardLobbyCmd_S;
    /**
     * 兑换
     */
    var ExchangeRedPackLobbyCmd_C = (function () {
        function ExchangeRedPackLobbyCmd_C() {
        }
        ExchangeRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ExchangeRedPackLobbyCmd_C'; };
        return ExchangeRedPackLobbyCmd_C;
    })();
    Cmd.ExchangeRedPackLobbyCmd_C = ExchangeRedPackLobbyCmd_C;
    var ExchangeRedPackLobbyCmd_S = (function () {
        function ExchangeRedPackLobbyCmd_S() {
        }
        ExchangeRedPackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ExchangeRedPackLobbyCmd_S'; };
        return ExchangeRedPackLobbyCmd_S;
    })();
    Cmd.ExchangeRedPackLobbyCmd_S = ExchangeRedPackLobbyCmd_S;
    var RedPack = (function () {
        function RedPack() {
        }
        RedPack.prototype.GetType = function () { return 'Cmd.RedPack'; };
        return RedPack;
    })();
    Cmd.RedPack = RedPack;
    /**
     * 获取金币场战绩(由于这个数据量的问题,不放在userBaseInfo里面，需要前端根据需求去自行请求)
     */
    var CoinGameRecord = (function () {
        function CoinGameRecord() {
        }
        CoinGameRecord.prototype.GetType = function () { return 'Cmd.CoinGameRecord'; };
        return CoinGameRecord;
    })();
    Cmd.CoinGameRecord = CoinGameRecord;
    var GetCoinGameRecordLobbyCmd_C = (function () {
        function GetCoinGameRecordLobbyCmd_C() {
        }
        GetCoinGameRecordLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetCoinGameRecordLobbyCmd_C'; };
        return GetCoinGameRecordLobbyCmd_C;
    })();
    Cmd.GetCoinGameRecordLobbyCmd_C = GetCoinGameRecordLobbyCmd_C;
    var GetCoinGameRecordLobbyCmd_S = (function () {
        function GetCoinGameRecordLobbyCmd_S() {
        }
        GetCoinGameRecordLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetCoinGameRecordLobbyCmd_S'; };
        return GetCoinGameRecordLobbyCmd_S;
    })();
    Cmd.GetCoinGameRecordLobbyCmd_S = GetCoinGameRecordLobbyCmd_S;
    /**
     * 获取礼品券
     */
    var GetGiftVoucherLobbyCmd_C = (function () {
        function GetGiftVoucherLobbyCmd_C() {
        }
        GetGiftVoucherLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGiftVoucherLobbyCmd_C'; };
        return GetGiftVoucherLobbyCmd_C;
    })();
    Cmd.GetGiftVoucherLobbyCmd_C = GetGiftVoucherLobbyCmd_C;
    var GetGiftVoucherLobbyCmd_S = (function () {
        function GetGiftVoucherLobbyCmd_S() {
        }
        GetGiftVoucherLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetGiftVoucherLobbyCmd_S'; };
        return GetGiftVoucherLobbyCmd_S;
    })();
    Cmd.GetGiftVoucherLobbyCmd_S = GetGiftVoucherLobbyCmd_S;
    /**
     * 兑换礼品券记录个人信息
     */
    var ExchangeGiftVoucherRecordUserInfoLobby_C = (function () {
        function ExchangeGiftVoucherRecordUserInfoLobby_C() {
        }
        ExchangeGiftVoucherRecordUserInfoLobby_C.prototype.GetType = function () { return 'Cmd.ExchangeGiftVoucherRecordUserInfoLobby_C'; };
        return ExchangeGiftVoucherRecordUserInfoLobby_C;
    })();
    Cmd.ExchangeGiftVoucherRecordUserInfoLobby_C = ExchangeGiftVoucherRecordUserInfoLobby_C;
    var ExchangeGiftVoucherRecordUserInfoLobby_S = (function () {
        function ExchangeGiftVoucherRecordUserInfoLobby_S() {
        }
        ExchangeGiftVoucherRecordUserInfoLobby_S.prototype.GetType = function () { return 'Cmd.ExchangeGiftVoucherRecordUserInfoLobby_S'; };
        return ExchangeGiftVoucherRecordUserInfoLobby_S;
    })();
    Cmd.ExchangeGiftVoucherRecordUserInfoLobby_S = ExchangeGiftVoucherRecordUserInfoLobby_S;
    /**
     * 获取兑换记录
     */
    var ExchangeRecord = (function () {
        function ExchangeRecord() {
        }
        ExchangeRecord.prototype.GetType = function () { return 'Cmd.ExchangeRecord'; };
        return ExchangeRecord;
    })();
    Cmd.ExchangeRecord = ExchangeRecord;
    var GetExchangeRecordLobbyCmd_C = (function () {
        function GetExchangeRecordLobbyCmd_C() {
        }
        GetExchangeRecordLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetExchangeRecordLobbyCmd_C'; };
        return GetExchangeRecordLobbyCmd_C;
    })();
    Cmd.GetExchangeRecordLobbyCmd_C = GetExchangeRecordLobbyCmd_C;
    var GetExchangeRecordLobbyCmd_S = (function () {
        function GetExchangeRecordLobbyCmd_S() {
        }
        GetExchangeRecordLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetExchangeRecordLobbyCmd_S'; };
        return GetExchangeRecordLobbyCmd_S;
    })();
    Cmd.GetExchangeRecordLobbyCmd_S = GetExchangeRecordLobbyCmd_S;
    /**
     * 获取收货地址
     */
    var GetShippingAddressLobby_C = (function () {
        function GetShippingAddressLobby_C() {
        }
        GetShippingAddressLobby_C.prototype.GetType = function () { return 'Cmd.GetShippingAddressLobby_C'; };
        return GetShippingAddressLobby_C;
    })();
    Cmd.GetShippingAddressLobby_C = GetShippingAddressLobby_C;
    var GetShippingAddressLobby_S = (function () {
        function GetShippingAddressLobby_S() {
        }
        GetShippingAddressLobby_S.prototype.GetType = function () { return 'Cmd.GetShippingAddressLobby_S'; };
        return GetShippingAddressLobby_S;
    })();
    Cmd.GetShippingAddressLobby_S = GetShippingAddressLobby_S;
    /**
     * 填写或修改收货地址
     */
    var ChangeShippingAddressLobby_C = (function () {
        function ChangeShippingAddressLobby_C() {
        }
        ChangeShippingAddressLobby_C.prototype.GetType = function () { return 'Cmd.ChangeShippingAddressLobby_C'; };
        return ChangeShippingAddressLobby_C;
    })();
    Cmd.ChangeShippingAddressLobby_C = ChangeShippingAddressLobby_C;
    var ChangeShippingAddressLobby_S = (function () {
        function ChangeShippingAddressLobby_S() {
        }
        ChangeShippingAddressLobby_S.prototype.GetType = function () { return 'Cmd.ChangeShippingAddressLobby_S'; };
        return ChangeShippingAddressLobby_S;
    })();
    Cmd.ChangeShippingAddressLobby_S = ChangeShippingAddressLobby_S;
    /**
     * 请求转盘信息
     */
    var GetInfoTurnTableCmd_C = (function () {
        function GetInfoTurnTableCmd_C() {
        }
        GetInfoTurnTableCmd_C.prototype.GetType = function () { return 'Cmd.GetInfoTurnTableCmd_C'; };
        return GetInfoTurnTableCmd_C;
    })();
    Cmd.GetInfoTurnTableCmd_C = GetInfoTurnTableCmd_C;
    /**
     * 转盘信息回复
     */
    var GetInfoTurnTableCmd_S = (function () {
        function GetInfoTurnTableCmd_S() {
        }
        GetInfoTurnTableCmd_S.prototype.GetType = function () { return 'Cmd.GetInfoTurnTableCmd_S'; };
        return GetInfoTurnTableCmd_S;
    })();
    Cmd.GetInfoTurnTableCmd_S = GetInfoTurnTableCmd_S;
    /**
     * 转动转盘
     */
    var TurnTurnTableCmd_C = (function () {
        function TurnTurnTableCmd_C() {
        }
        TurnTurnTableCmd_C.prototype.GetType = function () { return 'Cmd.TurnTurnTableCmd_C'; };
        return TurnTurnTableCmd_C;
    })();
    Cmd.TurnTurnTableCmd_C = TurnTurnTableCmd_C;
    /**
     * 转动转盘回复
     */
    var TurnTurnTableCmd_S = (function () {
        function TurnTurnTableCmd_S() {
        }
        TurnTurnTableCmd_S.prototype.GetType = function () { return 'Cmd.TurnTurnTableCmd_S'; };
        return TurnTurnTableCmd_S;
    })();
    Cmd.TurnTurnTableCmd_S = TurnTurnTableCmd_S;
    /**
     * 领取神秘宝箱奖励
     */
    var GetCumulativeRewordTurnTableCmd_C = (function () {
        function GetCumulativeRewordTurnTableCmd_C() {
        }
        GetCumulativeRewordTurnTableCmd_C.prototype.GetType = function () { return 'Cmd.GetCumulativeRewordTurnTableCmd_C'; };
        return GetCumulativeRewordTurnTableCmd_C;
    })();
    Cmd.GetCumulativeRewordTurnTableCmd_C = GetCumulativeRewordTurnTableCmd_C;
    /**
     * 领取神秘宝箱奖励回复
     */
    var GetCumulativeRewordTurnTableCmd_S = (function () {
        function GetCumulativeRewordTurnTableCmd_S() {
        }
        GetCumulativeRewordTurnTableCmd_S.prototype.GetType = function () { return 'Cmd.GetCumulativeRewordTurnTableCmd_S'; };
        return GetCumulativeRewordTurnTableCmd_S;
    })();
    Cmd.GetCumulativeRewordTurnTableCmd_S = GetCumulativeRewordTurnTableCmd_S;
    /**
     * 好彩大厅VIP系统
     */
    var GetUserVipInfoLobbyCmd_C = (function () {
        function GetUserVipInfoLobbyCmd_C() {
        }
        GetUserVipInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetUserVipInfoLobbyCmd_C'; };
        return GetUserVipInfoLobbyCmd_C;
    })();
    Cmd.GetUserVipInfoLobbyCmd_C = GetUserVipInfoLobbyCmd_C;
    var GetUserVipInfoLobbyCmd_S = (function () {
        function GetUserVipInfoLobbyCmd_S() {
        }
        GetUserVipInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetUserVipInfoLobbyCmd_S'; };
        return GetUserVipInfoLobbyCmd_S;
    })();
    Cmd.GetUserVipInfoLobbyCmd_S = GetUserVipInfoLobbyCmd_S;
    /**
     * 退出面板
     */
    var QuitGameInfo = (function () {
        function QuitGameInfo() {
        }
        QuitGameInfo.prototype.GetType = function () { return 'Cmd.QuitGameInfo'; };
        return QuitGameInfo;
    })();
    Cmd.QuitGameInfo = QuitGameInfo;
    var QuitGameInfo;
    (function (QuitGameInfo) {
        (function (QuitType) {
            /**
             * 幸运翻翻翻 turnRound/turncostDiamond
             */
            QuitType[QuitType["TurnCard"] = 1] = "TurnCard";
            /**
             * 每日签到 signChips
             */
            QuitType[QuitType["DaySign"] = 2] = "DaySign";
            /**
             * 每日充值 recharge
             */
            QuitType[QuitType["Recharge"] = 3] = "Recharge";
        })(QuitGameInfo.QuitType || (QuitGameInfo.QuitType = {}));
        var QuitType = QuitGameInfo.QuitType;
    })(QuitGameInfo = Cmd.QuitGameInfo || (Cmd.QuitGameInfo = {}));
    var QuitGameShowLobbyCmd_C = (function () {
        function QuitGameShowLobbyCmd_C() {
        }
        QuitGameShowLobbyCmd_C.prototype.GetType = function () { return 'Cmd.QuitGameShowLobbyCmd_C'; };
        return QuitGameShowLobbyCmd_C;
    })();
    Cmd.QuitGameShowLobbyCmd_C = QuitGameShowLobbyCmd_C;
    var QuitGameShowLobbyCmd_S = (function () {
        function QuitGameShowLobbyCmd_S() {
        }
        QuitGameShowLobbyCmd_S.prototype.GetType = function () { return 'Cmd.QuitGameShowLobbyCmd_S'; };
        return QuitGameShowLobbyCmd_S;
    })();
    Cmd.QuitGameShowLobbyCmd_S = QuitGameShowLobbyCmd_S;
    /**
     * 获取累计红包金额
     */
    var GetTotalRedPackMoneyLobbyCmd_C = (function () {
        function GetTotalRedPackMoneyLobbyCmd_C() {
        }
        GetTotalRedPackMoneyLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetTotalRedPackMoneyLobbyCmd_C'; };
        return GetTotalRedPackMoneyLobbyCmd_C;
    })();
    Cmd.GetTotalRedPackMoneyLobbyCmd_C = GetTotalRedPackMoneyLobbyCmd_C;
    /**
     * 当累计金额发生变化时，服务器会主动推送
     */
    var GetTotalRedPackMoneyLobbyCmd_S = (function () {
        function GetTotalRedPackMoneyLobbyCmd_S() {
        }
        GetTotalRedPackMoneyLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetTotalRedPackMoneyLobbyCmd_S'; };
        return GetTotalRedPackMoneyLobbyCmd_S;
    })();
    Cmd.GetTotalRedPackMoneyLobbyCmd_S = GetTotalRedPackMoneyLobbyCmd_S;
    /**
     * 新用户红包界面
     */
    var GetNewUserRedPackShowLobbyCmd_C = (function () {
        function GetNewUserRedPackShowLobbyCmd_C() {
        }
        GetNewUserRedPackShowLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetNewUserRedPackShowLobbyCmd_C'; };
        return GetNewUserRedPackShowLobbyCmd_C;
    })();
    Cmd.GetNewUserRedPackShowLobbyCmd_C = GetNewUserRedPackShowLobbyCmd_C;
    var GetNewUserRedPackShowLobbyCmd_S = (function () {
        function GetNewUserRedPackShowLobbyCmd_S() {
        }
        GetNewUserRedPackShowLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetNewUserRedPackShowLobbyCmd_S'; };
        return GetNewUserRedPackShowLobbyCmd_S;
    })();
    Cmd.GetNewUserRedPackShowLobbyCmd_S = GetNewUserRedPackShowLobbyCmd_S;
    /**
     * 领取新手红包
     */
    var ExchangeNewUserRedPackLobbyCmd_C = (function () {
        function ExchangeNewUserRedPackLobbyCmd_C() {
        }
        ExchangeNewUserRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ExchangeNewUserRedPackLobbyCmd_C'; };
        return ExchangeNewUserRedPackLobbyCmd_C;
    })();
    Cmd.ExchangeNewUserRedPackLobbyCmd_C = ExchangeNewUserRedPackLobbyCmd_C;
    var ExchangeNewUserRedPackLobbyCmd_S = (function () {
        function ExchangeNewUserRedPackLobbyCmd_S() {
        }
        ExchangeNewUserRedPackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ExchangeNewUserRedPackLobbyCmd_S'; };
        return ExchangeNewUserRedPackLobbyCmd_S;
    })();
    Cmd.ExchangeNewUserRedPackLobbyCmd_S = ExchangeNewUserRedPackLobbyCmd_S;
    /**
     * 话费券兑换红包界面
     */
    var CCRedPack = (function () {
        function CCRedPack() {
        }
        CCRedPack.prototype.GetType = function () { return 'Cmd.CCRedPack'; };
        return CCRedPack;
    })();
    Cmd.CCRedPack = CCRedPack;
    var GetCCRedPackShowLobbyCmd_C = (function () {
        function GetCCRedPackShowLobbyCmd_C() {
        }
        GetCCRedPackShowLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetCCRedPackShowLobbyCmd_C'; };
        return GetCCRedPackShowLobbyCmd_C;
    })();
    Cmd.GetCCRedPackShowLobbyCmd_C = GetCCRedPackShowLobbyCmd_C;
    var GetCCRedPackShowLobbyCmd_S = (function () {
        function GetCCRedPackShowLobbyCmd_S() {
        }
        GetCCRedPackShowLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetCCRedPackShowLobbyCmd_S'; };
        return GetCCRedPackShowLobbyCmd_S;
    })();
    Cmd.GetCCRedPackShowLobbyCmd_S = GetCCRedPackShowLobbyCmd_S;
    /**
     * 话费券兑换红包
     */
    var ExchangeCCRedPackLobbyCmd_C = (function () {
        function ExchangeCCRedPackLobbyCmd_C() {
        }
        ExchangeCCRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ExchangeCCRedPackLobbyCmd_C'; };
        return ExchangeCCRedPackLobbyCmd_C;
    })();
    Cmd.ExchangeCCRedPackLobbyCmd_C = ExchangeCCRedPackLobbyCmd_C;
    var ExchangeCCRedPackLobbyCmd_S = (function () {
        function ExchangeCCRedPackLobbyCmd_S() {
        }
        ExchangeCCRedPackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ExchangeCCRedPackLobbyCmd_S'; };
        return ExchangeCCRedPackLobbyCmd_S;
    })();
    Cmd.ExchangeCCRedPackLobbyCmd_S = ExchangeCCRedPackLobbyCmd_S;
    /**
     * 返利红包(领取话费券)
     */
    var RechargeRedPack = (function () {
        function RechargeRedPack() {
        }
        RechargeRedPack.prototype.GetType = function () { return 'Cmd.RechargeRedPack'; };
        return RechargeRedPack;
    })();
    Cmd.RechargeRedPack = RechargeRedPack;
    /**
     * 返利红包界面
     */
    var GetRechargeRedPackShowLobbyCmd_C = (function () {
        function GetRechargeRedPackShowLobbyCmd_C() {
        }
        GetRechargeRedPackShowLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetRechargeRedPackShowLobbyCmd_C'; };
        return GetRechargeRedPackShowLobbyCmd_C;
    })();
    Cmd.GetRechargeRedPackShowLobbyCmd_C = GetRechargeRedPackShowLobbyCmd_C;
    var GetRechargeRedPackShowLobbyCmd_S = (function () {
        function GetRechargeRedPackShowLobbyCmd_S() {
        }
        GetRechargeRedPackShowLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetRechargeRedPackShowLobbyCmd_S'; };
        return GetRechargeRedPackShowLobbyCmd_S;
    })();
    Cmd.GetRechargeRedPackShowLobbyCmd_S = GetRechargeRedPackShowLobbyCmd_S;
    /**
     * 兑换返利红包
     */
    var ExchangeRechargeRedPackLobbyCmd_C = (function () {
        function ExchangeRechargeRedPackLobbyCmd_C() {
        }
        ExchangeRechargeRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ExchangeRechargeRedPackLobbyCmd_C'; };
        return ExchangeRechargeRedPackLobbyCmd_C;
    })();
    Cmd.ExchangeRechargeRedPackLobbyCmd_C = ExchangeRechargeRedPackLobbyCmd_C;
    var ExchangeRechargeRedPackLobbyCmd_S = (function () {
        function ExchangeRechargeRedPackLobbyCmd_S() {
        }
        ExchangeRechargeRedPackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ExchangeRechargeRedPackLobbyCmd_S'; };
        return ExchangeRechargeRedPackLobbyCmd_S;
    })();
    Cmd.ExchangeRechargeRedPackLobbyCmd_S = ExchangeRechargeRedPackLobbyCmd_S;
    /**
     * 暴击红包界面
     */
    var GetCriticalStrikeLobbyCmd_C = (function () {
        function GetCriticalStrikeLobbyCmd_C() {
        }
        GetCriticalStrikeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetCriticalStrikeLobbyCmd_C'; };
        return GetCriticalStrikeLobbyCmd_C;
    })();
    Cmd.GetCriticalStrikeLobbyCmd_C = GetCriticalStrikeLobbyCmd_C;
    var CCInfo = (function () {
        function CCInfo() {
        }
        CCInfo.prototype.GetType = function () { return 'Cmd.CCInfo'; };
        return CCInfo;
    })();
    Cmd.CCInfo = CCInfo;
    var GetCriticalStrikeLobbyCmd_S = (function () {
        function GetCriticalStrikeLobbyCmd_S() {
        }
        GetCriticalStrikeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetCriticalStrikeLobbyCmd_S'; };
        return GetCriticalStrikeLobbyCmd_S;
    })();
    Cmd.GetCriticalStrikeLobbyCmd_S = GetCriticalStrikeLobbyCmd_S;
    /**
     * 红包提现
     */
    var RedPackInfo = (function () {
        function RedPackInfo() {
        }
        RedPackInfo.prototype.GetType = function () { return 'Cmd.RedPackInfo'; };
        return RedPackInfo;
    })();
    Cmd.RedPackInfo = RedPackInfo;
    /**
     * 玩家获得红包明细
     */
    var GetUserGetRedPackInfoLobbyCmd_C = (function () {
        function GetUserGetRedPackInfoLobbyCmd_C() {
        }
        GetUserGetRedPackInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetUserGetRedPackInfoLobbyCmd_C'; };
        return GetUserGetRedPackInfoLobbyCmd_C;
    })();
    Cmd.GetUserGetRedPackInfoLobbyCmd_C = GetUserGetRedPackInfoLobbyCmd_C;
    var GetUserGetRedPackInfoLobbyCmd_S = (function () {
        function GetUserGetRedPackInfoLobbyCmd_S() {
        }
        GetUserGetRedPackInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetUserGetRedPackInfoLobbyCmd_S'; };
        return GetUserGetRedPackInfoLobbyCmd_S;
    })();
    Cmd.GetUserGetRedPackInfoLobbyCmd_S = GetUserGetRedPackInfoLobbyCmd_S;
    /**
     * 提现记录
     */
    var DrawCash = (function () {
        function DrawCash() {
        }
        DrawCash.prototype.GetType = function () { return 'Cmd.DrawCash'; };
        return DrawCash;
    })();
    Cmd.DrawCash = DrawCash;
    var GetDrawCashRecordLobbyCmd_C = (function () {
        function GetDrawCashRecordLobbyCmd_C() {
        }
        GetDrawCashRecordLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetDrawCashRecordLobbyCmd_C'; };
        return GetDrawCashRecordLobbyCmd_C;
    })();
    Cmd.GetDrawCashRecordLobbyCmd_C = GetDrawCashRecordLobbyCmd_C;
    var GetDrawCashRecordLobbyCmd_S = (function () {
        function GetDrawCashRecordLobbyCmd_S() {
        }
        GetDrawCashRecordLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetDrawCashRecordLobbyCmd_S'; };
        return GetDrawCashRecordLobbyCmd_S;
    })();
    Cmd.GetDrawCashRecordLobbyCmd_S = GetDrawCashRecordLobbyCmd_S;
    /**
     * 红包提现
     */
    var RedPackDrawCashLobbyCmd_C = (function () {
        function RedPackDrawCashLobbyCmd_C() {
        }
        RedPackDrawCashLobbyCmd_C.prototype.GetType = function () { return 'Cmd.RedPackDrawCashLobbyCmd_C'; };
        return RedPackDrawCashLobbyCmd_C;
    })();
    Cmd.RedPackDrawCashLobbyCmd_C = RedPackDrawCashLobbyCmd_C;
    var RedPackDrawCashLobbyCmd_S = (function () {
        function RedPackDrawCashLobbyCmd_S() {
        }
        RedPackDrawCashLobbyCmd_S.prototype.GetType = function () { return 'Cmd.RedPackDrawCashLobbyCmd_S'; };
        return RedPackDrawCashLobbyCmd_S;
    })();
    Cmd.RedPackDrawCashLobbyCmd_S = RedPackDrawCashLobbyCmd_S;
    /**
     *  好彩游戏抢红包活动
     *  发红包广播
     */
    var GameRedPackInfo = (function () {
        function GameRedPackInfo() {
        }
        GameRedPackInfo.prototype.GetType = function () { return 'Cmd.GameRedPackInfo'; };
        return GameRedPackInfo;
    })();
    Cmd.GameRedPackInfo = GameRedPackInfo;
    var SendHaoCaiGameRedPackLobbyCmd_Brd = (function () {
        function SendHaoCaiGameRedPackLobbyCmd_Brd() {
        }
        SendHaoCaiGameRedPackLobbyCmd_Brd.prototype.GetType = function () { return 'Cmd.SendHaoCaiGameRedPackLobbyCmd_Brd'; };
        return SendHaoCaiGameRedPackLobbyCmd_Brd;
    })();
    Cmd.SendHaoCaiGameRedPackLobbyCmd_Brd = SendHaoCaiGameRedPackLobbyCmd_Brd;
    /**
     * 领红包
     */
    var RecvGameRedPackLobbyCmd_C = (function () {
        function RecvGameRedPackLobbyCmd_C() {
        }
        RecvGameRedPackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.RecvGameRedPackLobbyCmd_C'; };
        return RecvGameRedPackLobbyCmd_C;
    })();
    Cmd.RecvGameRedPackLobbyCmd_C = RecvGameRedPackLobbyCmd_C;
    var RecvRedPackInfo = (function () {
        function RecvRedPackInfo() {
        }
        RecvRedPackInfo.prototype.GetType = function () { return 'Cmd.RecvRedPackInfo'; };
        return RecvRedPackInfo;
    })();
    Cmd.RecvRedPackInfo = RecvRedPackInfo;
    var RecvGameRedPackLobbyCmd_S = (function () {
        function RecvGameRedPackLobbyCmd_S() {
        }
        RecvGameRedPackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.RecvGameRedPackLobbyCmd_S'; };
        return RecvGameRedPackLobbyCmd_S;
    })();
    Cmd.RecvGameRedPackLobbyCmd_S = RecvGameRedPackLobbyCmd_S;
    /**
     * 获取拥有的所有时效性道具
     */
    var GetTimeGoodsLobbyCmd_C = (function () {
        function GetTimeGoodsLobbyCmd_C() {
        }
        GetTimeGoodsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetTimeGoodsLobbyCmd_C'; };
        return GetTimeGoodsLobbyCmd_C;
    })();
    Cmd.GetTimeGoodsLobbyCmd_C = GetTimeGoodsLobbyCmd_C;
    var GetTimeGoodsLobbyCmd_S = (function () {
        function GetTimeGoodsLobbyCmd_S() {
        }
        GetTimeGoodsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetTimeGoodsLobbyCmd_S'; };
        return GetTimeGoodsLobbyCmd_S;
    })();
    Cmd.GetTimeGoodsLobbyCmd_S = GetTimeGoodsLobbyCmd_S;
    /**
     * 领取累计待领取的时效性金币
     */
    var RevTimeChipsLobbyCmd_C = (function () {
        function RevTimeChipsLobbyCmd_C() {
        }
        RevTimeChipsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.RevTimeChipsLobbyCmd_C'; };
        return RevTimeChipsLobbyCmd_C;
    })();
    Cmd.RevTimeChipsLobbyCmd_C = RevTimeChipsLobbyCmd_C;
    var RevTimeChipsLobbyCmd_S = (function () {
        function RevTimeChipsLobbyCmd_S() {
        }
        RevTimeChipsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.RevTimeChipsLobbyCmd_S'; };
        return RevTimeChipsLobbyCmd_S;
    })();
    Cmd.RevTimeChipsLobbyCmd_S = RevTimeChipsLobbyCmd_S;
    /**
     * 购买头像框，周卡/月卡等时效性道具(用钻石购买，不支持其他支付方式)
     */
    var BuyTimeGoodsLobbyCmd_C = (function () {
        function BuyTimeGoodsLobbyCmd_C() {
        }
        BuyTimeGoodsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.BuyTimeGoodsLobbyCmd_C'; };
        return BuyTimeGoodsLobbyCmd_C;
    })();
    Cmd.BuyTimeGoodsLobbyCmd_C = BuyTimeGoodsLobbyCmd_C;
    var BuyTimeGoodsLobbyCmd_S = (function () {
        function BuyTimeGoodsLobbyCmd_S() {
        }
        BuyTimeGoodsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.BuyTimeGoodsLobbyCmd_S'; };
        return BuyTimeGoodsLobbyCmd_S;
    })();
    Cmd.BuyTimeGoodsLobbyCmd_S = BuyTimeGoodsLobbyCmd_S;
    /**
     * 个人形象道具的使用
     */
    var ChangePersonalImageLobbyCmd_C = (function () {
        function ChangePersonalImageLobbyCmd_C() {
        }
        ChangePersonalImageLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ChangePersonalImageLobbyCmd_C'; };
        return ChangePersonalImageLobbyCmd_C;
    })();
    Cmd.ChangePersonalImageLobbyCmd_C = ChangePersonalImageLobbyCmd_C;
    var ChangePersonalImageLobbyCmd_S = (function () {
        function ChangePersonalImageLobbyCmd_S() {
        }
        ChangePersonalImageLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ChangePersonalImageLobbyCmd_S'; };
        return ChangePersonalImageLobbyCmd_S;
    })();
    Cmd.ChangePersonalImageLobbyCmd_S = ChangePersonalImageLobbyCmd_S;
    /**
     * 获取弹窗公告
     */
    var GetPopupBroadListLobbyCmd_C = (function () {
        function GetPopupBroadListLobbyCmd_C() {
        }
        GetPopupBroadListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetPopupBroadListLobbyCmd_C'; };
        return GetPopupBroadListLobbyCmd_C;
    })();
    Cmd.GetPopupBroadListLobbyCmd_C = GetPopupBroadListLobbyCmd_C;
    var PopupList = (function () {
        function PopupList() {
        }
        PopupList.prototype.GetType = function () { return 'Cmd.PopupList'; };
        return PopupList;
    })();
    Cmd.PopupList = PopupList;
    var PopupList;
    (function (PopupList) {
        var Extparamdesc = (function () {
            function Extparamdesc() {
            }
            Extparamdesc.prototype.GetType = function () { return 'Cmd.PopupList.Extparamdesc'; };
            return Extparamdesc;
        })();
        PopupList.Extparamdesc = Extparamdesc;
    })(PopupList = Cmd.PopupList || (Cmd.PopupList = {}));
    var GetPopupBroadListLobbyCmd_S = (function () {
        function GetPopupBroadListLobbyCmd_S() {
        }
        GetPopupBroadListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetPopupBroadListLobbyCmd_S'; };
        return GetPopupBroadListLobbyCmd_S;
    })();
    Cmd.GetPopupBroadListLobbyCmd_S = GetPopupBroadListLobbyCmd_S;
    /**
     * 已读弹窗公告(如果公告的状态status为0未读状态才去调用这条消息)
     */
    var ReadPopBroadLobbyCmd_C = (function () {
        function ReadPopBroadLobbyCmd_C() {
        }
        ReadPopBroadLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ReadPopBroadLobbyCmd_C'; };
        return ReadPopBroadLobbyCmd_C;
    })();
    Cmd.ReadPopBroadLobbyCmd_C = ReadPopBroadLobbyCmd_C;
    var ReadPopBroadLobbyCmd_S = (function () {
        function ReadPopBroadLobbyCmd_S() {
        }
        ReadPopBroadLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ReadPopBroadLobbyCmd_S'; };
        return ReadPopBroadLobbyCmd_S;
    })();
    Cmd.ReadPopBroadLobbyCmd_S = ReadPopBroadLobbyCmd_S;
    /**
     *  好彩捕鱼电玩城vip话费券活动
     *  显示界面
     */
    var GetVipCouponShowLobbyCmd_C = (function () {
        function GetVipCouponShowLobbyCmd_C() {
        }
        GetVipCouponShowLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetVipCouponShowLobbyCmd_C'; };
        return GetVipCouponShowLobbyCmd_C;
    })();
    Cmd.GetVipCouponShowLobbyCmd_C = GetVipCouponShowLobbyCmd_C;
    var GetVipCouponShowLobbyCmd_S = (function () {
        function GetVipCouponShowLobbyCmd_S() {
        }
        GetVipCouponShowLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetVipCouponShowLobbyCmd_S'; };
        return GetVipCouponShowLobbyCmd_S;
    })();
    Cmd.GetVipCouponShowLobbyCmd_S = GetVipCouponShowLobbyCmd_S;
    /**
     * 获取话费券
     */
    var GetVipCouponRewardLobbyCmd_C = (function () {
        function GetVipCouponRewardLobbyCmd_C() {
        }
        GetVipCouponRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetVipCouponRewardLobbyCmd_C'; };
        return GetVipCouponRewardLobbyCmd_C;
    })();
    Cmd.GetVipCouponRewardLobbyCmd_C = GetVipCouponRewardLobbyCmd_C;
    var GetVipCouponRewardLobbyCmd_S = (function () {
        function GetVipCouponRewardLobbyCmd_S() {
        }
        GetVipCouponRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetVipCouponRewardLobbyCmd_S'; };
        return GetVipCouponRewardLobbyCmd_S;
    })();
    Cmd.GetVipCouponRewardLobbyCmd_S = GetVipCouponRewardLobbyCmd_S;
    /**
     * 转盘签到
     */
    var ContinueTurnTableInfo = (function () {
        function ContinueTurnTableInfo() {
        }
        ContinueTurnTableInfo.prototype.GetType = function () { return 'Cmd.ContinueTurnTableInfo'; };
        return ContinueTurnTableInfo;
    })();
    Cmd.ContinueTurnTableInfo = ContinueTurnTableInfo;
    /**
     * 是否显示转盘签到
     */
    var IsShowTurnTableSignLobbyCmd_C = (function () {
        function IsShowTurnTableSignLobbyCmd_C() {
        }
        IsShowTurnTableSignLobbyCmd_C.prototype.GetType = function () { return 'Cmd.IsShowTurnTableSignLobbyCmd_C'; };
        return IsShowTurnTableSignLobbyCmd_C;
    })();
    Cmd.IsShowTurnTableSignLobbyCmd_C = IsShowTurnTableSignLobbyCmd_C;
    var IsShowTurnTableSignLobbyCmd_S = (function () {
        function IsShowTurnTableSignLobbyCmd_S() {
        }
        IsShowTurnTableSignLobbyCmd_S.prototype.GetType = function () { return 'Cmd.IsShowTurnTableSignLobbyCmd_S'; };
        return IsShowTurnTableSignLobbyCmd_S;
    })();
    Cmd.IsShowTurnTableSignLobbyCmd_S = IsShowTurnTableSignLobbyCmd_S;
    /**
     * 获取转盘签到的面板信息
     */
    var GetTurnTableSignLobbyCmd_C = (function () {
        function GetTurnTableSignLobbyCmd_C() {
        }
        GetTurnTableSignLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetTurnTableSignLobbyCmd_C'; };
        return GetTurnTableSignLobbyCmd_C;
    })();
    Cmd.GetTurnTableSignLobbyCmd_C = GetTurnTableSignLobbyCmd_C;
    var GetTurnTableSignLobbyCmd_S = (function () {
        function GetTurnTableSignLobbyCmd_S() {
        }
        GetTurnTableSignLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetTurnTableSignLobbyCmd_S'; };
        return GetTurnTableSignLobbyCmd_S;
    })();
    Cmd.GetTurnTableSignLobbyCmd_S = GetTurnTableSignLobbyCmd_S;
    /**
     * 用户今日转盘签到
     */
    var UserTurnTableSignTodayLobbyCmd_C = (function () {
        function UserTurnTableSignTodayLobbyCmd_C() {
        }
        UserTurnTableSignTodayLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserTurnTableSignTodayLobbyCmd_C'; };
        return UserTurnTableSignTodayLobbyCmd_C;
    })();
    Cmd.UserTurnTableSignTodayLobbyCmd_C = UserTurnTableSignTodayLobbyCmd_C;
    var UserTurnTableSignTodayLobbyCmd_S = (function () {
        function UserTurnTableSignTodayLobbyCmd_S() {
        }
        UserTurnTableSignTodayLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserTurnTableSignTodayLobbyCmd_S'; };
        return UserTurnTableSignTodayLobbyCmd_S;
    })();
    Cmd.UserTurnTableSignTodayLobbyCmd_S = UserTurnTableSignTodayLobbyCmd_S;
    /**
     * 领取连续转盘签到奖励
     */
    var UserRecvContinueRewardLobbyCmd_C = (function () {
        function UserRecvContinueRewardLobbyCmd_C() {
        }
        UserRecvContinueRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserRecvContinueRewardLobbyCmd_C'; };
        return UserRecvContinueRewardLobbyCmd_C;
    })();
    Cmd.UserRecvContinueRewardLobbyCmd_C = UserRecvContinueRewardLobbyCmd_C;
    var UserRecvContinueRewardLobbyCmd_S = (function () {
        function UserRecvContinueRewardLobbyCmd_S() {
        }
        UserRecvContinueRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserRecvContinueRewardLobbyCmd_S'; };
        return UserRecvContinueRewardLobbyCmd_S;
    })();
    Cmd.UserRecvContinueRewardLobbyCmd_S = UserRecvContinueRewardLobbyCmd_S;
    /**
     * 百宝箱奖励
     */
    var TreasureBoxLottery = (function () {
        function TreasureBoxLottery() {
        }
        TreasureBoxLottery.prototype.GetType = function () { return 'Cmd.TreasureBoxLottery'; };
        return TreasureBoxLottery;
    })();
    Cmd.TreasureBoxLottery = TreasureBoxLottery;
    /**
     * 百宝箱每日任务
     */
    var TreasureBoxTask = (function () {
        function TreasureBoxTask() {
        }
        TreasureBoxTask.prototype.GetType = function () { return 'Cmd.TreasureBoxTask'; };
        return TreasureBoxTask;
    })();
    Cmd.TreasureBoxTask = TreasureBoxTask;
    /**
     * 获取百宝箱界面数据
     */
    var GetTreasureBoxShowInfoLobbyCmd_C = (function () {
        function GetTreasureBoxShowInfoLobbyCmd_C() {
        }
        GetTreasureBoxShowInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetTreasureBoxShowInfoLobbyCmd_C'; };
        return GetTreasureBoxShowInfoLobbyCmd_C;
    })();
    Cmd.GetTreasureBoxShowInfoLobbyCmd_C = GetTreasureBoxShowInfoLobbyCmd_C;
    var GetTreasureBoxShowInfoLobbyCmd_S = (function () {
        function GetTreasureBoxShowInfoLobbyCmd_S() {
        }
        GetTreasureBoxShowInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetTreasureBoxShowInfoLobbyCmd_S'; };
        return GetTreasureBoxShowInfoLobbyCmd_S;
    })();
    Cmd.GetTreasureBoxShowInfoLobbyCmd_S = GetTreasureBoxShowInfoLobbyCmd_S;
    /**
     * 领取百宝箱任务奖励
     */
    var GetTreasureBoxTaskLotteryLobbyCmd_C = (function () {
        function GetTreasureBoxTaskLotteryLobbyCmd_C() {
        }
        GetTreasureBoxTaskLotteryLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetTreasureBoxTaskLotteryLobbyCmd_C'; };
        return GetTreasureBoxTaskLotteryLobbyCmd_C;
    })();
    Cmd.GetTreasureBoxTaskLotteryLobbyCmd_C = GetTreasureBoxTaskLotteryLobbyCmd_C;
    var GetTreasureBoxTaskLotteryLobbyCmd_S = (function () {
        function GetTreasureBoxTaskLotteryLobbyCmd_S() {
        }
        GetTreasureBoxTaskLotteryLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetTreasureBoxTaskLotteryLobbyCmd_S'; };
        return GetTreasureBoxTaskLotteryLobbyCmd_S;
    })();
    Cmd.GetTreasureBoxTaskLotteryLobbyCmd_S = GetTreasureBoxTaskLotteryLobbyCmd_S;
    /**
     * 百宝箱转动抽奖
     */
    var TurnTreasureBoxLotteryLobbyCmd_C = (function () {
        function TurnTreasureBoxLotteryLobbyCmd_C() {
        }
        TurnTreasureBoxLotteryLobbyCmd_C.prototype.GetType = function () { return 'Cmd.TurnTreasureBoxLotteryLobbyCmd_C'; };
        return TurnTreasureBoxLotteryLobbyCmd_C;
    })();
    Cmd.TurnTreasureBoxLotteryLobbyCmd_C = TurnTreasureBoxLotteryLobbyCmd_C;
    var TurnTreasureBoxLotteryLobbyCmd_S = (function () {
        function TurnTreasureBoxLotteryLobbyCmd_S() {
        }
        TurnTreasureBoxLotteryLobbyCmd_S.prototype.GetType = function () { return 'Cmd.TurnTreasureBoxLotteryLobbyCmd_S'; };
        return TurnTreasureBoxLotteryLobbyCmd_S;
    })();
    Cmd.TurnTreasureBoxLotteryLobbyCmd_S = TurnTreasureBoxLotteryLobbyCmd_S;
    /**
     *  在线奖励
     *  获取在线奖励状态和倒计时时间
     */
    var GetOnlineTimeStatusLobbyCmd_C = (function () {
        function GetOnlineTimeStatusLobbyCmd_C() {
        }
        GetOnlineTimeStatusLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetOnlineTimeStatusLobbyCmd_C'; };
        return GetOnlineTimeStatusLobbyCmd_C;
    })();
    Cmd.GetOnlineTimeStatusLobbyCmd_C = GetOnlineTimeStatusLobbyCmd_C;
    var GetOnlineTimeStatusLobbyCmd_S = (function () {
        function GetOnlineTimeStatusLobbyCmd_S() {
        }
        GetOnlineTimeStatusLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetOnlineTimeStatusLobbyCmd_S'; };
        return GetOnlineTimeStatusLobbyCmd_S;
    })();
    Cmd.GetOnlineTimeStatusLobbyCmd_S = GetOnlineTimeStatusLobbyCmd_S;
    /**
     * 领取在线奖励
     */
    var GetOnlineTimeRewardLobbyCmd_C = (function () {
        function GetOnlineTimeRewardLobbyCmd_C() {
        }
        GetOnlineTimeRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetOnlineTimeRewardLobbyCmd_C'; };
        return GetOnlineTimeRewardLobbyCmd_C;
    })();
    Cmd.GetOnlineTimeRewardLobbyCmd_C = GetOnlineTimeRewardLobbyCmd_C;
    var GetOnlineTimeRewardLobbyCmd_S = (function () {
        function GetOnlineTimeRewardLobbyCmd_S() {
        }
        GetOnlineTimeRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetOnlineTimeRewardLobbyCmd_S'; };
        return GetOnlineTimeRewardLobbyCmd_S;
    })();
    Cmd.GetOnlineTimeRewardLobbyCmd_S = GetOnlineTimeRewardLobbyCmd_S;
    /**
     * 获取当前大厅在线总人数（包括机器人）
     */
    var GetOnlineUserNumLobbyCmd_C = (function () {
        function GetOnlineUserNumLobbyCmd_C() {
        }
        GetOnlineUserNumLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetOnlineUserNumLobbyCmd_C'; };
        return GetOnlineUserNumLobbyCmd_C;
    })();
    Cmd.GetOnlineUserNumLobbyCmd_C = GetOnlineUserNumLobbyCmd_C;
    var GameUsers = (function () {
        function GameUsers() {
        }
        GameUsers.prototype.GetType = function () { return 'Cmd.GameUsers'; };
        return GameUsers;
    })();
    Cmd.GameUsers = GameUsers;
    var GetOnlineUserNumLobbyCmd_S = (function () {
        function GetOnlineUserNumLobbyCmd_S() {
        }
        GetOnlineUserNumLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetOnlineUserNumLobbyCmd_S'; };
        return GetOnlineUserNumLobbyCmd_S;
    })();
    Cmd.GetOnlineUserNumLobbyCmd_S = GetOnlineUserNumLobbyCmd_S;
    /**
     *  明日礼包
     *  界面显示
     */
    var GetTomorrowGiftBagShowLobbyCmd_C = (function () {
        function GetTomorrowGiftBagShowLobbyCmd_C() {
        }
        GetTomorrowGiftBagShowLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetTomorrowGiftBagShowLobbyCmd_C'; };
        return GetTomorrowGiftBagShowLobbyCmd_C;
    })();
    Cmd.GetTomorrowGiftBagShowLobbyCmd_C = GetTomorrowGiftBagShowLobbyCmd_C;
    var GetTomorrowGiftBagShowLobbyCmd_S = (function () {
        function GetTomorrowGiftBagShowLobbyCmd_S() {
        }
        GetTomorrowGiftBagShowLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetTomorrowGiftBagShowLobbyCmd_S'; };
        return GetTomorrowGiftBagShowLobbyCmd_S;
    })();
    Cmd.GetTomorrowGiftBagShowLobbyCmd_S = GetTomorrowGiftBagShowLobbyCmd_S;
    /**
     * 礼包领取
     */
    var GetTomorrowGiftBagRewardLobbyCmd_C = (function () {
        function GetTomorrowGiftBagRewardLobbyCmd_C() {
        }
        GetTomorrowGiftBagRewardLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetTomorrowGiftBagRewardLobbyCmd_C'; };
        return GetTomorrowGiftBagRewardLobbyCmd_C;
    })();
    Cmd.GetTomorrowGiftBagRewardLobbyCmd_C = GetTomorrowGiftBagRewardLobbyCmd_C;
    var GetTomorrowGiftBagRewardLobbyCmd_S = (function () {
        function GetTomorrowGiftBagRewardLobbyCmd_S() {
        }
        GetTomorrowGiftBagRewardLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetTomorrowGiftBagRewardLobbyCmd_S'; };
        return GetTomorrowGiftBagRewardLobbyCmd_S;
    })();
    Cmd.GetTomorrowGiftBagRewardLobbyCmd_S = GetTomorrowGiftBagRewardLobbyCmd_S;
    /**
     * 世界聊天
     */
    var WorldChatBySuonaLobbyCmd_C = (function () {
        function WorldChatBySuonaLobbyCmd_C() {
        }
        WorldChatBySuonaLobbyCmd_C.prototype.GetType = function () { return 'Cmd.WorldChatBySuonaLobbyCmd_C'; };
        return WorldChatBySuonaLobbyCmd_C;
    })();
    Cmd.WorldChatBySuonaLobbyCmd_C = WorldChatBySuonaLobbyCmd_C;
    var WorldChatBySuonaLobbyCmd_S = (function () {
        function WorldChatBySuonaLobbyCmd_S() {
        }
        WorldChatBySuonaLobbyCmd_S.prototype.GetType = function () { return 'Cmd.WorldChatBySuonaLobbyCmd_S'; };
        return WorldChatBySuonaLobbyCmd_S;
    })();
    Cmd.WorldChatBySuonaLobbyCmd_S = WorldChatBySuonaLobbyCmd_S;
    var WorldChat = (function () {
        function WorldChat() {
        }
        WorldChat.prototype.GetType = function () { return 'Cmd.WorldChat'; };
        return WorldChat;
    })();
    Cmd.WorldChat = WorldChat;
    var WorldChatBySuonaLobbyCmd_Brd = (function () {
        function WorldChatBySuonaLobbyCmd_Brd() {
        }
        WorldChatBySuonaLobbyCmd_Brd.prototype.GetType = function () { return 'Cmd.WorldChatBySuonaLobbyCmd_Brd'; };
        return WorldChatBySuonaLobbyCmd_Brd;
    })();
    Cmd.WorldChatBySuonaLobbyCmd_Brd = WorldChatBySuonaLobbyCmd_Brd;
    /**
     * 获取世界聊天记录
     */
    var GetWorldChatRecordLobbyCmd_C = (function () {
        function GetWorldChatRecordLobbyCmd_C() {
        }
        GetWorldChatRecordLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetWorldChatRecordLobbyCmd_C'; };
        return GetWorldChatRecordLobbyCmd_C;
    })();
    Cmd.GetWorldChatRecordLobbyCmd_C = GetWorldChatRecordLobbyCmd_C;
    var GetWorldChatRecordLobbyCmd_S = (function () {
        function GetWorldChatRecordLobbyCmd_S() {
        }
        GetWorldChatRecordLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetWorldChatRecordLobbyCmd_S'; };
        return GetWorldChatRecordLobbyCmd_S;
    })();
    Cmd.GetWorldChatRecordLobbyCmd_S = GetWorldChatRecordLobbyCmd_S;
    /**
     * 代理商发送喇叭
     */
    var AgentSendSuonaLobbyCmd_C = (function () {
        function AgentSendSuonaLobbyCmd_C() {
        }
        AgentSendSuonaLobbyCmd_C.prototype.GetType = function () { return 'Cmd.AgentSendSuonaLobbyCmd_C'; };
        return AgentSendSuonaLobbyCmd_C;
    })();
    Cmd.AgentSendSuonaLobbyCmd_C = AgentSendSuonaLobbyCmd_C;
    var AgentSendSuonaLobbyCmd_S = (function () {
        function AgentSendSuonaLobbyCmd_S() {
        }
        AgentSendSuonaLobbyCmd_S.prototype.GetType = function () { return 'Cmd.AgentSendSuonaLobbyCmd_S'; };
        return AgentSendSuonaLobbyCmd_S;
    })();
    Cmd.AgentSendSuonaLobbyCmd_S = AgentSendSuonaLobbyCmd_S;
    /**
     * 邮件附件
     */
    var Attachment = (function () {
        function Attachment() {
        }
        Attachment.prototype.GetType = function () { return 'Cmd.Attachment'; };
        return Attachment;
    })();
    Cmd.Attachment = Attachment;
    var MailInfo = (function () {
        function MailInfo() {
        }
        MailInfo.prototype.GetType = function () { return 'Cmd.MailInfo'; };
        return MailInfo;
    })();
    Cmd.MailInfo = MailInfo;
    var MailInfo;
    (function (MailInfo) {
        (function (State) {
            /**
             * 未读
             */
            State[State["UnRead"] = 1] = "UnRead";
            /**
             * 已读,但还有未领取的东西
             */
            State[State["ReadHasItem"] = 2] = "ReadHasItem";
            /**
             * 已读,且没有需要领取的东西
             */
            State[State["ReadOver"] = 3] = "ReadOver";
        })(MailInfo.State || (MailInfo.State = {}));
        var State = MailInfo.State;
    })(MailInfo = Cmd.MailInfo || (Cmd.MailInfo = {}));
    /**
     * 存在新邮件广播
     */
    var NewMailCmd_Brd = (function () {
        function NewMailCmd_Brd() {
        }
        NewMailCmd_Brd.prototype.GetType = function () { return 'Cmd.NewMailCmd_Brd'; };
        return NewMailCmd_Brd;
    })();
    Cmd.NewMailCmd_Brd = NewMailCmd_Brd;
    /**
     *  C-&gt;S 获取邮件列表请求
     *  S-&gt;C 邮件列表更新
     */
    var GetListMailCmd_CS = (function () {
        function GetListMailCmd_CS() {
        }
        GetListMailCmd_CS.prototype.GetType = function () { return 'Cmd.GetListMailCmd_CS'; };
        return GetListMailCmd_CS;
    })();
    Cmd.GetListMailCmd_CS = GetListMailCmd_CS;
    /**
     *  C-&gt;S 查看指定邮件请求
     *  S-&gt;C 查看完成指定邮件通知
     */
    var ReadMailCmd_CS = (function () {
        function ReadMailCmd_CS() {
        }
        ReadMailCmd_CS.prototype.GetType = function () { return 'Cmd.ReadMailCmd_CS'; };
        return ReadMailCmd_CS;
    })();
    Cmd.ReadMailCmd_CS = ReadMailCmd_CS;
    /**
     *  C-&gt;S 获取邮件的东西请求
     *  S-&gt;C 已获取邮件东西通知
     */
    var GetItemMailCmd_CS = (function () {
        function GetItemMailCmd_CS() {
        }
        GetItemMailCmd_CS.prototype.GetType = function () { return 'Cmd.GetItemMailCmd_CS'; };
        return GetItemMailCmd_CS;
    })();
    Cmd.GetItemMailCmd_CS = GetItemMailCmd_CS;
    /**
     *  C-&gt;S 删除指定邮件请求
     *  S-&gt;C 删除指定邮件通知
     */
    var DeleteMailCmd_CS = (function () {
        function DeleteMailCmd_CS() {
        }
        DeleteMailCmd_CS.prototype.GetType = function () { return 'Cmd.DeleteMailCmd_CS'; };
        return DeleteMailCmd_CS;
    })();
    Cmd.DeleteMailCmd_CS = DeleteMailCmd_CS;
    /**
     * 获取邮件列表
     */
    var GetListMailCmd_C = (function () {
        function GetListMailCmd_C() {
        }
        GetListMailCmd_C.prototype.GetType = function () { return 'Cmd.GetListMailCmd_C'; };
        return GetListMailCmd_C;
    })();
    Cmd.GetListMailCmd_C = GetListMailCmd_C;
    /**
     * 获取邮件列表
     */
    var GetListMailCmd_S = (function () {
        function GetListMailCmd_S() {
        }
        GetListMailCmd_S.prototype.GetType = function () { return 'Cmd.GetListMailCmd_S'; };
        return GetListMailCmd_S;
    })();
    Cmd.GetListMailCmd_S = GetListMailCmd_S;
    /**
     * 查看指定邮件
     */
    var ReadMailCmd_C = (function () {
        function ReadMailCmd_C() {
        }
        ReadMailCmd_C.prototype.GetType = function () { return 'Cmd.ReadMailCmd_C'; };
        return ReadMailCmd_C;
    })();
    Cmd.ReadMailCmd_C = ReadMailCmd_C;
    /**
     * 查看指定邮件
     */
    var ReadMailCmd_S = (function () {
        function ReadMailCmd_S() {
        }
        ReadMailCmd_S.prototype.GetType = function () { return 'Cmd.ReadMailCmd_S'; };
        return ReadMailCmd_S;
    })();
    Cmd.ReadMailCmd_S = ReadMailCmd_S;
    /**
     * 删除指定邮件
     */
    var DeleteMailCmd_C = (function () {
        function DeleteMailCmd_C() {
        }
        DeleteMailCmd_C.prototype.GetType = function () { return 'Cmd.DeleteMailCmd_C'; };
        return DeleteMailCmd_C;
    })();
    Cmd.DeleteMailCmd_C = DeleteMailCmd_C;
    /**
     * 删除指定邮件
     */
    var DeleteMailCmd_S = (function () {
        function DeleteMailCmd_S() {
        }
        DeleteMailCmd_S.prototype.GetType = function () { return 'Cmd.DeleteMailCmd_S'; };
        return DeleteMailCmd_S;
    })();
    Cmd.DeleteMailCmd_S = DeleteMailCmd_S;
    /**
     * 领取指定邮件内的奖励
     */
    var GetMailRewardCmd_C = (function () {
        function GetMailRewardCmd_C() {
        }
        GetMailRewardCmd_C.prototype.GetType = function () { return 'Cmd.GetMailRewardCmd_C'; };
        return GetMailRewardCmd_C;
    })();
    Cmd.GetMailRewardCmd_C = GetMailRewardCmd_C;
    var GetMailRewardCmd_S = (function () {
        function GetMailRewardCmd_S() {
        }
        GetMailRewardCmd_S.prototype.GetType = function () { return 'Cmd.GetMailRewardCmd_S'; };
        return GetMailRewardCmd_S;
    })();
    Cmd.GetMailRewardCmd_S = GetMailRewardCmd_S;
    /**
     * 邮件批量操作
     */
    var BulkOperationMailCmd_C = (function () {
        function BulkOperationMailCmd_C() {
        }
        BulkOperationMailCmd_C.prototype.GetType = function () { return 'Cmd.BulkOperationMailCmd_C'; };
        return BulkOperationMailCmd_C;
    })();
    Cmd.BulkOperationMailCmd_C = BulkOperationMailCmd_C;
    var BulkOperationMailCmd_S = (function () {
        function BulkOperationMailCmd_S() {
        }
        BulkOperationMailCmd_S.prototype.GetType = function () { return 'Cmd.BulkOperationMailCmd_S'; };
        return BulkOperationMailCmd_S;
    })();
    Cmd.BulkOperationMailCmd_S = BulkOperationMailCmd_S;
    /**
     * 用户反馈功能
     */
    var UserFeedBackLobbyCmd_C = (function () {
        function UserFeedBackLobbyCmd_C() {
        }
        UserFeedBackLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserFeedBackLobbyCmd_C'; };
        return UserFeedBackLobbyCmd_C;
    })();
    Cmd.UserFeedBackLobbyCmd_C = UserFeedBackLobbyCmd_C;
    var UserFeedBackLobbyCmd_S = (function () {
        function UserFeedBackLobbyCmd_S() {
        }
        UserFeedBackLobbyCmd_S.prototype.GetType = function () { return 'Cmd.UserFeedBackLobbyCmd_S'; };
        return UserFeedBackLobbyCmd_S;
    })();
    Cmd.UserFeedBackLobbyCmd_S = UserFeedBackLobbyCmd_S;
    /**
     * 修改鱼币
     */
    var UserFishcoinsChangeLobbyCmd_C = (function () {
        function UserFishcoinsChangeLobbyCmd_C() {
        }
        UserFishcoinsChangeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.UserFishcoinsChangeLobbyCmd_C'; };
        return UserFishcoinsChangeLobbyCmd_C;
    })();
    Cmd.UserFishcoinsChangeLobbyCmd_C = UserFishcoinsChangeLobbyCmd_C;
    /**
     * ClientErrorLogToServer
     */
    var ClientErrorLogToServerLobbyCmd_C = (function () {
        function ClientErrorLogToServerLobbyCmd_C() {
        }
        ClientErrorLogToServerLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ClientErrorLogToServerLobbyCmd_C'; };
        return ClientErrorLogToServerLobbyCmd_C;
    })();
    Cmd.ClientErrorLogToServerLobbyCmd_C = ClientErrorLogToServerLobbyCmd_C;
    /**
     * 申请提现
     */
    var CashWithdrawalLobbyCmd_C = (function () {
        function CashWithdrawalLobbyCmd_C() {
        }
        CashWithdrawalLobbyCmd_C.prototype.GetType = function () { return 'Cmd.CashWithdrawalLobbyCmd_C'; };
        return CashWithdrawalLobbyCmd_C;
    })();
    Cmd.CashWithdrawalLobbyCmd_C = CashWithdrawalLobbyCmd_C;
    /**
     * 提现回复
     */
    var CashWithdrawalLobbyCmd_S = (function () {
        function CashWithdrawalLobbyCmd_S() {
        }
        CashWithdrawalLobbyCmd_S.prototype.GetType = function () { return 'Cmd.CashWithdrawalLobbyCmd_S'; };
        return CashWithdrawalLobbyCmd_S;
    })();
    Cmd.CashWithdrawalLobbyCmd_S = CashWithdrawalLobbyCmd_S;
    /**
     * 查看提现记录
     */
    var GetCashWithdrawalRecordLobbyCmd_C = (function () {
        function GetCashWithdrawalRecordLobbyCmd_C() {
        }
        GetCashWithdrawalRecordLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetCashWithdrawalRecordLobbyCmd_C'; };
        return GetCashWithdrawalRecordLobbyCmd_C;
    })();
    Cmd.GetCashWithdrawalRecordLobbyCmd_C = GetCashWithdrawalRecordLobbyCmd_C;
    var CashWithdrawalRecord = (function () {
        function CashWithdrawalRecord() {
        }
        CashWithdrawalRecord.prototype.GetType = function () { return 'Cmd.CashWithdrawalRecord'; };
        return CashWithdrawalRecord;
    })();
    Cmd.CashWithdrawalRecord = CashWithdrawalRecord;
    /**
     * 提现记录回复
     */
    var GetCashWithdrawalRecordLobbyCmd_S = (function () {
        function GetCashWithdrawalRecordLobbyCmd_S() {
        }
        GetCashWithdrawalRecordLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetCashWithdrawalRecordLobbyCmd_S'; };
        return GetCashWithdrawalRecordLobbyCmd_S;
    })();
    Cmd.GetCashWithdrawalRecordLobbyCmd_S = GetCashWithdrawalRecordLobbyCmd_S;
    /**
     * 顺序弹窗
     */
    var SequentialPopupsLobbyCmd_S = (function () {
        function SequentialPopupsLobbyCmd_S() {
        }
        SequentialPopupsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.SequentialPopupsLobbyCmd_S'; };
        return SequentialPopupsLobbyCmd_S;
    })();
    Cmd.SequentialPopupsLobbyCmd_S = SequentialPopupsLobbyCmd_S;
    /**
     * 运营活动 摇一摇
     * 摇一摇结果数据
     */
    var ShakeShopInfo = (function () {
        function ShakeShopInfo() {
        }
        ShakeShopInfo.prototype.GetType = function () { return 'Cmd.ShakeShopInfo'; };
        return ShakeShopInfo;
    })();
    Cmd.ShakeShopInfo = ShakeShopInfo;
    /**
     * 打开摇一摇界面
     */
    var GetShakeBaseInfoLobbyCmd_C = (function () {
        function GetShakeBaseInfoLobbyCmd_C() {
        }
        GetShakeBaseInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetShakeBaseInfoLobbyCmd_C'; };
        return GetShakeBaseInfoLobbyCmd_C;
    })();
    Cmd.GetShakeBaseInfoLobbyCmd_C = GetShakeBaseInfoLobbyCmd_C;
    var GetShakeBaseInfoLobbyCmd_S = (function () {
        function GetShakeBaseInfoLobbyCmd_S() {
        }
        GetShakeBaseInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetShakeBaseInfoLobbyCmd_S'; };
        return GetShakeBaseInfoLobbyCmd_S;
    })();
    Cmd.GetShakeBaseInfoLobbyCmd_S = GetShakeBaseInfoLobbyCmd_S;
    /**
     * 放弃摇一摇机会(再来一次)
     */
    var AbandonShakeLobbyCmd_C = (function () {
        function AbandonShakeLobbyCmd_C() {
        }
        AbandonShakeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.AbandonShakeLobbyCmd_C'; };
        return AbandonShakeLobbyCmd_C;
    })();
    Cmd.AbandonShakeLobbyCmd_C = AbandonShakeLobbyCmd_C;
    var AbandonShakeLobbyCmd_S = (function () {
        function AbandonShakeLobbyCmd_S() {
        }
        AbandonShakeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.AbandonShakeLobbyCmd_S'; };
        return AbandonShakeLobbyCmd_S;
    })();
    Cmd.AbandonShakeLobbyCmd_S = AbandonShakeLobbyCmd_S;
    /**
     * 获取摇一摇结果
     */
    var GetShakeResultLobbyCmd_C = (function () {
        function GetShakeResultLobbyCmd_C() {
        }
        GetShakeResultLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetShakeResultLobbyCmd_C'; };
        return GetShakeResultLobbyCmd_C;
    })();
    Cmd.GetShakeResultLobbyCmd_C = GetShakeResultLobbyCmd_C;
    var GetShakeResultLobbyCmd_S = (function () {
        function GetShakeResultLobbyCmd_S() {
        }
        GetShakeResultLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetShakeResultLobbyCmd_S'; };
        return GetShakeResultLobbyCmd_S;
    })();
    Cmd.GetShakeResultLobbyCmd_S = GetShakeResultLobbyCmd_S;
    /**
     * 运营活动 瑞狗迎春
     * 打开瑞狗迎春界面
     */
    var GetAuspiciousDogInfoLobbyCmd_C = (function () {
        function GetAuspiciousDogInfoLobbyCmd_C() {
        }
        GetAuspiciousDogInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetAuspiciousDogInfoLobbyCmd_C'; };
        return GetAuspiciousDogInfoLobbyCmd_C;
    })();
    Cmd.GetAuspiciousDogInfoLobbyCmd_C = GetAuspiciousDogInfoLobbyCmd_C;
    var GetAuspiciousDogInfoLobbyCmd_S = (function () {
        function GetAuspiciousDogInfoLobbyCmd_S() {
        }
        GetAuspiciousDogInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetAuspiciousDogInfoLobbyCmd_S'; };
        return GetAuspiciousDogInfoLobbyCmd_S;
    })();
    Cmd.GetAuspiciousDogInfoLobbyCmd_S = GetAuspiciousDogInfoLobbyCmd_S;
    var AuspiciousDogRecord = (function () {
        function AuspiciousDogRecord() {
        }
        AuspiciousDogRecord.prototype.GetType = function () { return 'Cmd.AuspiciousDogRecord'; };
        return AuspiciousDogRecord;
    })();
    Cmd.AuspiciousDogRecord = AuspiciousDogRecord;
    /**
     * 获取瑞狗迎春奖励记录(只保留最新20条数据)
     */
    var GetAuspiciousDogRecordsLobbyCmd_C = (function () {
        function GetAuspiciousDogRecordsLobbyCmd_C() {
        }
        GetAuspiciousDogRecordsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetAuspiciousDogRecordsLobbyCmd_C'; };
        return GetAuspiciousDogRecordsLobbyCmd_C;
    })();
    Cmd.GetAuspiciousDogRecordsLobbyCmd_C = GetAuspiciousDogRecordsLobbyCmd_C;
    var GetAuspiciousDogRecordsLobbyCmd_S = (function () {
        function GetAuspiciousDogRecordsLobbyCmd_S() {
        }
        GetAuspiciousDogRecordsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetAuspiciousDogRecordsLobbyCmd_S'; };
        return GetAuspiciousDogRecordsLobbyCmd_S;
    })();
    Cmd.GetAuspiciousDogRecordsLobbyCmd_S = GetAuspiciousDogRecordsLobbyCmd_S;
    /**
     * 领取奖励
     */
    var GetAuspiciousDogRewardsLobbyCmd_C = (function () {
        function GetAuspiciousDogRewardsLobbyCmd_C() {
        }
        GetAuspiciousDogRewardsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetAuspiciousDogRewardsLobbyCmd_C'; };
        return GetAuspiciousDogRewardsLobbyCmd_C;
    })();
    Cmd.GetAuspiciousDogRewardsLobbyCmd_C = GetAuspiciousDogRewardsLobbyCmd_C;
    var GetAuspiciousDogRewardsLobbyCmd_S = (function () {
        function GetAuspiciousDogRewardsLobbyCmd_S() {
        }
        GetAuspiciousDogRewardsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetAuspiciousDogRewardsLobbyCmd_S'; };
        return GetAuspiciousDogRewardsLobbyCmd_S;
    })();
    Cmd.GetAuspiciousDogRewardsLobbyCmd_S = GetAuspiciousDogRewardsLobbyCmd_S;
    /**
     * 三张大厅游客绑定账户, 获取验证码
     */
    var GetGuestBindAccountIdentifyCodeLobbyCmd_C = (function () {
        function GetGuestBindAccountIdentifyCodeLobbyCmd_C() {
        }
        GetGuestBindAccountIdentifyCodeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGuestBindAccountIdentifyCodeLobbyCmd_C'; };
        return GetGuestBindAccountIdentifyCodeLobbyCmd_C;
    })();
    Cmd.GetGuestBindAccountIdentifyCodeLobbyCmd_C = GetGuestBindAccountIdentifyCodeLobbyCmd_C;
    var GetGuestBindAccountIdentifyCodeLobbyCmd_S = (function () {
        function GetGuestBindAccountIdentifyCodeLobbyCmd_S() {
        }
        GetGuestBindAccountIdentifyCodeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetGuestBindAccountIdentifyCodeLobbyCmd_S'; };
        return GetGuestBindAccountIdentifyCodeLobbyCmd_S;
    })();
    Cmd.GetGuestBindAccountIdentifyCodeLobbyCmd_S = GetGuestBindAccountIdentifyCodeLobbyCmd_S;
    /**
     * 三张大厅游客绑定账户
     */
    var GuestBindAccountLobbyCmd_C = (function () {
        function GuestBindAccountLobbyCmd_C() {
        }
        GuestBindAccountLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GuestBindAccountLobbyCmd_C'; };
        return GuestBindAccountLobbyCmd_C;
    })();
    Cmd.GuestBindAccountLobbyCmd_C = GuestBindAccountLobbyCmd_C;
    var GuestBindAccountLobbyCmd_S = (function () {
        function GuestBindAccountLobbyCmd_S() {
        }
        GuestBindAccountLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GuestBindAccountLobbyCmd_S'; };
        return GuestBindAccountLobbyCmd_S;
    })();
    Cmd.GuestBindAccountLobbyCmd_S = GuestBindAccountLobbyCmd_S;
    /**
     * 三张大厅校验手机验证码
     */
    var VerifyPhoneCodeLobbyCmd_C = (function () {
        function VerifyPhoneCodeLobbyCmd_C() {
        }
        VerifyPhoneCodeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.VerifyPhoneCodeLobbyCmd_C'; };
        return VerifyPhoneCodeLobbyCmd_C;
    })();
    Cmd.VerifyPhoneCodeLobbyCmd_C = VerifyPhoneCodeLobbyCmd_C;
    var VerifyPhoneCodeLobbyCmd_S = (function () {
        function VerifyPhoneCodeLobbyCmd_S() {
        }
        VerifyPhoneCodeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.VerifyPhoneCodeLobbyCmd_S'; };
        return VerifyPhoneCodeLobbyCmd_S;
    })();
    Cmd.VerifyPhoneCodeLobbyCmd_S = VerifyPhoneCodeLobbyCmd_S;
    /**
     * 三张大厅游客修改账户手机号
     */
    var GuestModifyAccountPhoneLobbyCmd_C = (function () {
        function GuestModifyAccountPhoneLobbyCmd_C() {
        }
        GuestModifyAccountPhoneLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GuestModifyAccountPhoneLobbyCmd_C'; };
        return GuestModifyAccountPhoneLobbyCmd_C;
    })();
    Cmd.GuestModifyAccountPhoneLobbyCmd_C = GuestModifyAccountPhoneLobbyCmd_C;
    var GuestModifyAccountPhoneLobbyCmd_S = (function () {
        function GuestModifyAccountPhoneLobbyCmd_S() {
        }
        GuestModifyAccountPhoneLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GuestModifyAccountPhoneLobbyCmd_S'; };
        return GuestModifyAccountPhoneLobbyCmd_S;
    })();
    Cmd.GuestModifyAccountPhoneLobbyCmd_S = GuestModifyAccountPhoneLobbyCmd_S;
    /**
     * 三张大厅游客重置账户密码
     */
    var GuestResetAccountPasswdLobbyCmd_C = (function () {
        function GuestResetAccountPasswdLobbyCmd_C() {
        }
        GuestResetAccountPasswdLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GuestResetAccountPasswdLobbyCmd_C'; };
        return GuestResetAccountPasswdLobbyCmd_C;
    })();
    Cmd.GuestResetAccountPasswdLobbyCmd_C = GuestResetAccountPasswdLobbyCmd_C;
    var GuestResetAccountPasswdLobbyCmd_S = (function () {
        function GuestResetAccountPasswdLobbyCmd_S() {
        }
        GuestResetAccountPasswdLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GuestResetAccountPasswdLobbyCmd_S'; };
        return GuestResetAccountPasswdLobbyCmd_S;
    })();
    Cmd.GuestResetAccountPasswdLobbyCmd_S = GuestResetAccountPasswdLobbyCmd_S;
    /**
     * 玩家修改昵称, 成就任务
     */
    var ChangeUserNickName_C = (function () {
        function ChangeUserNickName_C() {
        }
        ChangeUserNickName_C.prototype.GetType = function () { return 'Cmd.ChangeUserNickName_C'; };
        return ChangeUserNickName_C;
    })();
    Cmd.ChangeUserNickName_C = ChangeUserNickName_C;
    /**
     * 修改昵称返回
     */
    var ChangeUserNickName_S = (function () {
        function ChangeUserNickName_S() {
        }
        ChangeUserNickName_S.prototype.GetType = function () { return 'Cmd.ChangeUserNickName_S'; };
        return ChangeUserNickName_S;
    })();
    Cmd.ChangeUserNickName_S = ChangeUserNickName_S;
    /**
     * 玩家上传图像，成就任务
     */
    var ChangeUserHeadUrl_C = (function () {
        function ChangeUserHeadUrl_C() {
        }
        ChangeUserHeadUrl_C.prototype.GetType = function () { return 'Cmd.ChangeUserHeadUrl_C'; };
        return ChangeUserHeadUrl_C;
    })();
    Cmd.ChangeUserHeadUrl_C = ChangeUserHeadUrl_C;
    /**
     * 上传图像返回
     */
    var ChangeUserHeadUrl_S = (function () {
        function ChangeUserHeadUrl_S() {
        }
        ChangeUserHeadUrl_S.prototype.GetType = function () { return 'Cmd.ChangeUserHeadUrl_S'; };
        return ChangeUserHeadUrl_S;
    })();
    Cmd.ChangeUserHeadUrl_S = ChangeUserHeadUrl_S;
    /**
     * 修改签名
     */
    var ChangeUserSignature_C = (function () {
        function ChangeUserSignature_C() {
        }
        ChangeUserSignature_C.prototype.GetType = function () { return 'Cmd.ChangeUserSignature_C'; };
        return ChangeUserSignature_C;
    })();
    Cmd.ChangeUserSignature_C = ChangeUserSignature_C;
    var ChangeUserSignature_S = (function () {
        function ChangeUserSignature_S() {
        }
        ChangeUserSignature_S.prototype.GetType = function () { return 'Cmd.ChangeUserSignature_S'; };
        return ChangeUserSignature_S;
    })();
    Cmd.ChangeUserSignature_S = ChangeUserSignature_S;
    /**
     * 赠送金币时查找玩家昵称
     */
    var GetUserNickNameLobby_C = (function () {
        function GetUserNickNameLobby_C() {
        }
        GetUserNickNameLobby_C.prototype.GetType = function () { return 'Cmd.GetUserNickNameLobby_C'; };
        return GetUserNickNameLobby_C;
    })();
    Cmd.GetUserNickNameLobby_C = GetUserNickNameLobby_C;
    /**
     * 查找昵称回复
     */
    var GetUserNickNameLobby_S = (function () {
        function GetUserNickNameLobby_S() {
        }
        GetUserNickNameLobby_S.prototype.GetType = function () { return 'Cmd.GetUserNickNameLobby_S'; };
        return GetUserNickNameLobby_S;
    })();
    Cmd.GetUserNickNameLobby_S = GetUserNickNameLobby_S;
    /**
     * 赠送金币
     */
    var ExchangeCoinLobby_C = (function () {
        function ExchangeCoinLobby_C() {
        }
        ExchangeCoinLobby_C.prototype.GetType = function () { return 'Cmd.ExchangeCoinLobby_C'; };
        return ExchangeCoinLobby_C;
    })();
    Cmd.ExchangeCoinLobby_C = ExchangeCoinLobby_C;
    /**
     * 赠送金币回复
     */
    var ExchangeCoinLobby_S = (function () {
        function ExchangeCoinLobby_S() {
        }
        ExchangeCoinLobby_S.prototype.GetType = function () { return 'Cmd.ExchangeCoinLobby_S'; };
        return ExchangeCoinLobby_S;
    })();
    Cmd.ExchangeCoinLobby_S = ExchangeCoinLobby_S;
    /**
     * 获取赠送金币记录
     */
    var GetExchangeCoinRecordLobby_C = (function () {
        function GetExchangeCoinRecordLobby_C() {
        }
        GetExchangeCoinRecordLobby_C.prototype.GetType = function () { return 'Cmd.GetExchangeCoinRecordLobby_C'; };
        return GetExchangeCoinRecordLobby_C;
    })();
    Cmd.GetExchangeCoinRecordLobby_C = GetExchangeCoinRecordLobby_C;
    /**
     * 赠送记录
     */
    var ExchangeCoinRecord = (function () {
        function ExchangeCoinRecord() {
        }
        ExchangeCoinRecord.prototype.GetType = function () { return 'Cmd.ExchangeCoinRecord'; };
        return ExchangeCoinRecord;
    })();
    Cmd.ExchangeCoinRecord = ExchangeCoinRecord;
    /**
     * 获取赠送金币记录返回
     */
    var GetExchangeCoinRecordLobby_S = (function () {
        function GetExchangeCoinRecordLobby_S() {
        }
        GetExchangeCoinRecordLobby_S.prototype.GetType = function () { return 'Cmd.GetExchangeCoinRecordLobby_S'; };
        return GetExchangeCoinRecordLobby_S;
    })();
    Cmd.GetExchangeCoinRecordLobby_S = GetExchangeCoinRecordLobby_S;
    /**
     * 获取摇钱树
     */
    var GetMoneyTreeDataLobby_C = (function () {
        function GetMoneyTreeDataLobby_C() {
        }
        GetMoneyTreeDataLobby_C.prototype.GetType = function () { return 'Cmd.GetMoneyTreeDataLobby_C'; };
        return GetMoneyTreeDataLobby_C;
    })();
    Cmd.GetMoneyTreeDataLobby_C = GetMoneyTreeDataLobby_C;
    /**
     * 获取摇钱树返回
     */
    var GetMoneyTreeDataLobby_S = (function () {
        function GetMoneyTreeDataLobby_S() {
        }
        GetMoneyTreeDataLobby_S.prototype.GetType = function () { return 'Cmd.GetMoneyTreeDataLobby_S'; };
        return GetMoneyTreeDataLobby_S;
    })();
    Cmd.GetMoneyTreeDataLobby_S = GetMoneyTreeDataLobby_S;
    /**
     * 领取摇钱树生成的金币
     */
    var GetMoneyTreeGoldLobby_C = (function () {
        function GetMoneyTreeGoldLobby_C() {
        }
        GetMoneyTreeGoldLobby_C.prototype.GetType = function () { return 'Cmd.GetMoneyTreeGoldLobby_C'; };
        return GetMoneyTreeGoldLobby_C;
    })();
    Cmd.GetMoneyTreeGoldLobby_C = GetMoneyTreeGoldLobby_C;
    /**
     * 领取摇钱树金币返回
     */
    var GetMoneyTreeGoldLobby_S = (function () {
        function GetMoneyTreeGoldLobby_S() {
        }
        GetMoneyTreeGoldLobby_S.prototype.GetType = function () { return 'Cmd.GetMoneyTreeGoldLobby_S'; };
        return GetMoneyTreeGoldLobby_S;
    })();
    Cmd.GetMoneyTreeGoldLobby_S = GetMoneyTreeGoldLobby_S;
    /**
     * 获取公告
     */
    var GetBroadcastInfoLobby_C = (function () {
        function GetBroadcastInfoLobby_C() {
        }
        GetBroadcastInfoLobby_C.prototype.GetType = function () { return 'Cmd.GetBroadcastInfoLobby_C'; };
        return GetBroadcastInfoLobby_C;
    })();
    Cmd.GetBroadcastInfoLobby_C = GetBroadcastInfoLobby_C;
    var BroadCastInfo = (function () {
        function BroadCastInfo() {
        }
        BroadCastInfo.prototype.GetType = function () { return 'Cmd.BroadCastInfo'; };
        return BroadCastInfo;
    })();
    Cmd.BroadCastInfo = BroadCastInfo;
    var BroadCastInfo;
    (function (BroadCastInfo) {
        (function (State) {
            /**
             * 已读
             */
            State[State["Read"] = 1] = "Read";
            /**
             * 未读
             */
            State[State["UnRead"] = 2] = "UnRead";
        })(BroadCastInfo.State || (BroadCastInfo.State = {}));
        var State = BroadCastInfo.State;
    })(BroadCastInfo = Cmd.BroadCastInfo || (Cmd.BroadCastInfo = {}));
    /**
     * 获取公告返回
     */
    var GetBroadCastInfoLobby_S = (function () {
        function GetBroadCastInfoLobby_S() {
        }
        GetBroadCastInfoLobby_S.prototype.GetType = function () { return 'Cmd.GetBroadCastInfoLobby_S'; };
        return GetBroadCastInfoLobby_S;
    })();
    Cmd.GetBroadCastInfoLobby_S = GetBroadCastInfoLobby_S;
    /**
     * 读取公告
     */
    var ReadBroadCastLobby_C = (function () {
        function ReadBroadCastLobby_C() {
        }
        ReadBroadCastLobby_C.prototype.GetType = function () { return 'Cmd.ReadBroadCastLobby_C'; };
        return ReadBroadCastLobby_C;
    })();
    Cmd.ReadBroadCastLobby_C = ReadBroadCastLobby_C;
    /**
     * 读取公告返回
     */
    var ReadBroadCastLobby_S = (function () {
        function ReadBroadCastLobby_S() {
        }
        ReadBroadCastLobby_S.prototype.GetType = function () { return 'Cmd.ReadBroadCastLobby_S'; };
        return ReadBroadCastLobby_S;
    })();
    Cmd.ReadBroadCastLobby_S = ReadBroadCastLobby_S;
    /**
     * 大厅获取时时彩状态
     */
    var GetEveryColorStatusLobby_C = (function () {
        function GetEveryColorStatusLobby_C() {
        }
        GetEveryColorStatusLobby_C.prototype.GetType = function () { return 'Cmd.GetEveryColorStatusLobby_C'; };
        return GetEveryColorStatusLobby_C;
    })();
    Cmd.GetEveryColorStatusLobby_C = GetEveryColorStatusLobby_C;
    /**
     * 大厅获取时时彩状态返回
     */
    var GetEveryColorStatusLobby_S = (function () {
        function GetEveryColorStatusLobby_S() {
        }
        GetEveryColorStatusLobby_S.prototype.GetType = function () { return 'Cmd.GetEveryColorStatusLobby_S'; };
        return GetEveryColorStatusLobby_S;
    })();
    Cmd.GetEveryColorStatusLobby_S = GetEveryColorStatusLobby_S;
    /**
     * 玩家下注
     */
    var UserBetChipsLobby_C = (function () {
        function UserBetChipsLobby_C() {
        }
        UserBetChipsLobby_C.prototype.GetType = function () { return 'Cmd.UserBetChipsLobby_C'; };
        return UserBetChipsLobby_C;
    })();
    Cmd.UserBetChipsLobby_C = UserBetChipsLobby_C;
    /**
     * 玩家下注返回
     */
    var UserBetChipsLobby_S = (function () {
        function UserBetChipsLobby_S() {
        }
        UserBetChipsLobby_S.prototype.GetType = function () { return 'Cmd.UserBetChipsLobby_S'; };
        return UserBetChipsLobby_S;
    })();
    Cmd.UserBetChipsLobby_S = UserBetChipsLobby_S;
    /**
     * 玩家自动跟注
     */
    var UserAutoFollowLobby_C = (function () {
        function UserAutoFollowLobby_C() {
        }
        UserAutoFollowLobby_C.prototype.GetType = function () { return 'Cmd.UserAutoFollowLobby_C'; };
        return UserAutoFollowLobby_C;
    })();
    Cmd.UserAutoFollowLobby_C = UserAutoFollowLobby_C;
    /**
     * 玩家自动跟注返回
     */
    var UserAutoFollowLobby_S = (function () {
        function UserAutoFollowLobby_S() {
        }
        UserAutoFollowLobby_S.prototype.GetType = function () { return 'Cmd.UserAutoFollowLobby_S'; };
        return UserAutoFollowLobby_S;
    })();
    Cmd.UserAutoFollowLobby_S = UserAutoFollowLobby_S;
    /**
     * 玩家是否可以自动跟注
     */
    var UserCanAutoFollowLobby_S = (function () {
        function UserCanAutoFollowLobby_S() {
        }
        UserCanAutoFollowLobby_S.prototype.GetType = function () { return 'Cmd.UserCanAutoFollowLobby_S'; };
        return UserCanAutoFollowLobby_S;
    })();
    Cmd.UserCanAutoFollowLobby_S = UserCanAutoFollowLobby_S;
    /**
     * 通知玩家赢金币
     */
    var NoticeUserWinChipsLobby_S = (function () {
        function NoticeUserWinChipsLobby_S() {
        }
        NoticeUserWinChipsLobby_S.prototype.GetType = function () { return 'Cmd.NoticeUserWinChipsLobby_S'; };
        return NoticeUserWinChipsLobby_S;
    })();
    Cmd.NoticeUserWinChipsLobby_S = NoticeUserWinChipsLobby_S;
    /**
     * 大厅获取时时彩信息
     */
    var GetEveryColorInfoLobby_C = (function () {
        function GetEveryColorInfoLobby_C() {
        }
        GetEveryColorInfoLobby_C.prototype.GetType = function () { return 'Cmd.GetEveryColorInfoLobby_C'; };
        return GetEveryColorInfoLobby_C;
    })();
    Cmd.GetEveryColorInfoLobby_C = GetEveryColorInfoLobby_C;
    /**
     * 简易玩家信息
     */
    var ShortUserInfo = (function () {
        function ShortUserInfo() {
        }
        ShortUserInfo.prototype.GetType = function () { return 'Cmd.ShortUserInfo'; };
        return ShortUserInfo;
    })();
    Cmd.ShortUserInfo = ShortUserInfo;
    /**
     * 大厅获取时时彩信息返回
     */
    var GetEveryColorInfoLobby_S = (function () {
        function GetEveryColorInfoLobby_S() {
        }
        GetEveryColorInfoLobby_S.prototype.GetType = function () { return 'Cmd.GetEveryColorInfoLobby_S'; };
        return GetEveryColorInfoLobby_S;
    })();
    Cmd.GetEveryColorInfoLobby_S = GetEveryColorInfoLobby_S;
    /**
     * 大奖记录
     */
    var GetBigRewardRecordLobby_C = (function () {
        function GetBigRewardRecordLobby_C() {
        }
        GetBigRewardRecordLobby_C.prototype.GetType = function () { return 'Cmd.GetBigRewardRecordLobby_C'; };
        return GetBigRewardRecordLobby_C;
    })();
    Cmd.GetBigRewardRecordLobby_C = GetBigRewardRecordLobby_C;
    /**
     * 记录信息
     */
    var RecordInfo = (function () {
        function RecordInfo() {
        }
        RecordInfo.prototype.GetType = function () { return 'Cmd.RecordInfo'; };
        return RecordInfo;
    })();
    Cmd.RecordInfo = RecordInfo;
    /**
     * 大奖记录返回
     */
    var GetBigRewardRecordLobby_S = (function () {
        function GetBigRewardRecordLobby_S() {
        }
        GetBigRewardRecordLobby_S.prototype.GetType = function () { return 'Cmd.GetBigRewardRecordLobby_S'; };
        return GetBigRewardRecordLobby_S;
    })();
    Cmd.GetBigRewardRecordLobby_S = GetBigRewardRecordLobby_S;
    /**
     * 排行榜
     */
    var GetEveryColorRankInfoLobby_C = (function () {
        function GetEveryColorRankInfoLobby_C() {
        }
        GetEveryColorRankInfoLobby_C.prototype.GetType = function () { return 'Cmd.GetEveryColorRankInfoLobby_C'; };
        return GetEveryColorRankInfoLobby_C;
    })();
    Cmd.GetEveryColorRankInfoLobby_C = GetEveryColorRankInfoLobby_C;
    /**
     * 玩家排行信息
     */
    var SscRankInfo = (function () {
        function SscRankInfo() {
        }
        SscRankInfo.prototype.GetType = function () { return 'Cmd.SscRankInfo'; };
        return SscRankInfo;
    })();
    Cmd.SscRankInfo = SscRankInfo;
    /**
     * 玩家排行信息返回
     */
    var GetEveryColorRankInfoLobby_S = (function () {
        function GetEveryColorRankInfoLobby_S() {
        }
        GetEveryColorRankInfoLobby_S.prototype.GetType = function () { return 'Cmd.GetEveryColorRankInfoLobby_S'; };
        return GetEveryColorRankInfoLobby_S;
    })();
    Cmd.GetEveryColorRankInfoLobby_S = GetEveryColorRankInfoLobby_S;
    /**
     * 时时彩下注量广播
     */
    var EveryColorBetChipsLobby_Brd = (function () {
        function EveryColorBetChipsLobby_Brd() {
        }
        EveryColorBetChipsLobby_Brd.prototype.GetType = function () { return 'Cmd.EveryColorBetChipsLobby_Brd'; };
        return EveryColorBetChipsLobby_Brd;
    })();
    Cmd.EveryColorBetChipsLobby_Brd = EveryColorBetChipsLobby_Brd;
    /**
     * 时时彩下注状态广播
     */
    var EveryColorBetStatusLobby_Brd = (function () {
        function EveryColorBetStatusLobby_Brd() {
        }
        EveryColorBetStatusLobby_Brd.prototype.GetType = function () { return 'Cmd.EveryColorBetStatusLobby_Brd'; };
        return EveryColorBetStatusLobby_Brd;
    })();
    Cmd.EveryColorBetStatusLobby_Brd = EveryColorBetStatusLobby_Brd;
    /**
     * 时时彩结算状态广播
     */
    var EveryColorLotteryStatusLobby_Brd = (function () {
        function EveryColorLotteryStatusLobby_Brd() {
        }
        EveryColorLotteryStatusLobby_Brd.prototype.GetType = function () { return 'Cmd.EveryColorLotteryStatusLobby_Brd'; };
        return EveryColorLotteryStatusLobby_Brd;
    })();
    Cmd.EveryColorLotteryStatusLobby_Brd = EveryColorLotteryStatusLobby_Brd;
    /**
     * 时时彩玩家打开面板或者关闭面板
     */
    var EveryColorPanelStatusLobby_C = (function () {
        function EveryColorPanelStatusLobby_C() {
        }
        EveryColorPanelStatusLobby_C.prototype.GetType = function () { return 'Cmd.EveryColorPanelStatusLobby_C'; };
        return EveryColorPanelStatusLobby_C;
    })();
    Cmd.EveryColorPanelStatusLobby_C = EveryColorPanelStatusLobby_C;
    var EveryColorPanelStatusLobby_S = (function () {
        function EveryColorPanelStatusLobby_S() {
        }
        EveryColorPanelStatusLobby_S.prototype.GetType = function () { return 'Cmd.EveryColorPanelStatusLobby_S'; };
        return EveryColorPanelStatusLobby_S;
    })();
    Cmd.EveryColorPanelStatusLobby_S = EveryColorPanelStatusLobby_S;
    /**
     * 登陆天数信息
     */
    var ContinueDay = (function () {
        function ContinueDay() {
        }
        ContinueDay.prototype.GetType = function () { return 'Cmd.ContinueDay'; };
        return ContinueDay;
    })();
    Cmd.ContinueDay = ContinueDay;
    /**
     * 玩家连续登陆信息
     */
    var ContinueLoginDaysInfoLobby_S = (function () {
        function ContinueLoginDaysInfoLobby_S() {
        }
        ContinueLoginDaysInfoLobby_S.prototype.GetType = function () { return 'Cmd.ContinueLoginDaysInfoLobby_S'; };
        return ContinueLoginDaysInfoLobby_S;
    })();
    Cmd.ContinueLoginDaysInfoLobby_S = ContinueLoginDaysInfoLobby_S;
    /**
     * 领取连续登陆天数奖励
     */
    var GetContinueLoginDaysRewardLobby_C = (function () {
        function GetContinueLoginDaysRewardLobby_C() {
        }
        GetContinueLoginDaysRewardLobby_C.prototype.GetType = function () { return 'Cmd.GetContinueLoginDaysRewardLobby_C'; };
        return GetContinueLoginDaysRewardLobby_C;
    })();
    Cmd.GetContinueLoginDaysRewardLobby_C = GetContinueLoginDaysRewardLobby_C;
    /**
     * 领取连续登陆奖励返回
     */
    var GetContinueLoginDaysRewardLobby_S = (function () {
        function GetContinueLoginDaysRewardLobby_S() {
        }
        GetContinueLoginDaysRewardLobby_S.prototype.GetType = function () { return 'Cmd.GetContinueLoginDaysRewardLobby_S'; };
        return GetContinueLoginDaysRewardLobby_S;
    })();
    Cmd.GetContinueLoginDaysRewardLobby_S = GetContinueLoginDaysRewardLobby_S;
    /**
     * 取消领取登陆奖励
     */
    var CancelGetContinueDayRewardLobby_C = (function () {
        function CancelGetContinueDayRewardLobby_C() {
        }
        CancelGetContinueDayRewardLobby_C.prototype.GetType = function () { return 'Cmd.CancelGetContinueDayRewardLobby_C'; };
        return CancelGetContinueDayRewardLobby_C;
    })();
    Cmd.CancelGetContinueDayRewardLobby_C = CancelGetContinueDayRewardLobby_C;
    /**
     * 取消返回
     */
    var CancelGetContinueDayRewardLobby_S = (function () {
        function CancelGetContinueDayRewardLobby_S() {
        }
        CancelGetContinueDayRewardLobby_S.prototype.GetType = function () { return 'Cmd.CancelGetContinueDayRewardLobby_S'; };
        return CancelGetContinueDayRewardLobby_S;
    })();
    Cmd.CancelGetContinueDayRewardLobby_S = CancelGetContinueDayRewardLobby_S;
    /**
     * 获取标准场和百人场人数
     */
    var GetGameCurrentPlayerNumberLobby_C = (function () {
        function GetGameCurrentPlayerNumberLobby_C() {
        }
        GetGameCurrentPlayerNumberLobby_C.prototype.GetType = function () { return 'Cmd.GetGameCurrentPlayerNumberLobby_C'; };
        return GetGameCurrentPlayerNumberLobby_C;
    })();
    Cmd.GetGameCurrentPlayerNumberLobby_C = GetGameCurrentPlayerNumberLobby_C;
    /**
     * 获取人数返回
     */
    var GetGameCurrentPlayerNumberLobby_S = (function () {
        function GetGameCurrentPlayerNumberLobby_S() {
        }
        GetGameCurrentPlayerNumberLobby_S.prototype.GetType = function () { return 'Cmd.GetGameCurrentPlayerNumberLobby_S'; };
        return GetGameCurrentPlayerNumberLobby_S;
    })();
    Cmd.GetGameCurrentPlayerNumberLobby_S = GetGameCurrentPlayerNumberLobby_S;
    /**
     * 大厅所有游戏在线人数
     */
    var AllGamePlayerOnlineNumberLobby_CS = (function () {
        function AllGamePlayerOnlineNumberLobby_CS() {
        }
        AllGamePlayerOnlineNumberLobby_CS.prototype.GetType = function () { return 'Cmd.AllGamePlayerOnlineNumberLobby_CS'; };
        return AllGamePlayerOnlineNumberLobby_CS;
    })();
    Cmd.AllGamePlayerOnlineNumberLobby_CS = AllGamePlayerOnlineNumberLobby_CS;
    var AllGamePlayerOnlineNumberLobby_CS;
    (function (AllGamePlayerOnlineNumberLobby_CS) {
        var OnlineNumData = (function () {
            function OnlineNumData() {
            }
            OnlineNumData.prototype.GetType = function () { return 'Cmd.AllGamePlayerOnlineNumberLobby_CS.OnlineNumData'; };
            return OnlineNumData;
        })();
        AllGamePlayerOnlineNumberLobby_CS.OnlineNumData = OnlineNumData;
    })(AllGamePlayerOnlineNumberLobby_CS = Cmd.AllGamePlayerOnlineNumberLobby_CS || (Cmd.AllGamePlayerOnlineNumberLobby_CS = {}));
    /**
     * 三张大厅的非顺序弹窗
     */
    var PushPopUpWindowsLobby_S = (function () {
        function PushPopUpWindowsLobby_S() {
        }
        PushPopUpWindowsLobby_S.prototype.GetType = function () { return 'Cmd.PushPopUpWindowsLobby_S'; };
        return PushPopUpWindowsLobby_S;
    })();
    Cmd.PushPopUpWindowsLobby_S = PushPopUpWindowsLobby_S;
    /**
     * 获取大厅急速夺宝信息
     */
    var GetSnatchTreasureInfoLobby_C = (function () {
        function GetSnatchTreasureInfoLobby_C() {
        }
        GetSnatchTreasureInfoLobby_C.prototype.GetType = function () { return 'Cmd.GetSnatchTreasureInfoLobby_C'; };
        return GetSnatchTreasureInfoLobby_C;
    })();
    Cmd.GetSnatchTreasureInfoLobby_C = GetSnatchTreasureInfoLobby_C;
    /**
     * 玩家下注信息
     */
    var OwnBetInfo = (function () {
        function OwnBetInfo() {
        }
        OwnBetInfo.prototype.GetType = function () { return 'Cmd.OwnBetInfo'; };
        return OwnBetInfo;
    })();
    Cmd.OwnBetInfo = OwnBetInfo;
    /**
     * 玩家中奖信息
     */
    var WinnerInfo = (function () {
        function WinnerInfo() {
        }
        WinnerInfo.prototype.GetType = function () { return 'Cmd.WinnerInfo'; };
        return WinnerInfo;
    })();
    Cmd.WinnerInfo = WinnerInfo;
    /**
     * 获取大厅急速夺宝信息返回
     */
    var GetSnatchTreasureInfoLobby_S = (function () {
        function GetSnatchTreasureInfoLobby_S() {
        }
        GetSnatchTreasureInfoLobby_S.prototype.GetType = function () { return 'Cmd.GetSnatchTreasureInfoLobby_S'; };
        return GetSnatchTreasureInfoLobby_S;
    })();
    Cmd.GetSnatchTreasureInfoLobby_S = GetSnatchTreasureInfoLobby_S;
    /**
     * 获取急速夺宝排行榜信息
     */
    var GetSnatchTreasureRankInfoLobby_C = (function () {
        function GetSnatchTreasureRankInfoLobby_C() {
        }
        GetSnatchTreasureRankInfoLobby_C.prototype.GetType = function () { return 'Cmd.GetSnatchTreasureRankInfoLobby_C'; };
        return GetSnatchTreasureRankInfoLobby_C;
    })();
    Cmd.GetSnatchTreasureRankInfoLobby_C = GetSnatchTreasureRankInfoLobby_C;
    /**
     * 获取急速夺宝排行榜信息
     */
    var GetSnatchTreasureRankInfoLobby_S = (function () {
        function GetSnatchTreasureRankInfoLobby_S() {
        }
        GetSnatchTreasureRankInfoLobby_S.prototype.GetType = function () { return 'Cmd.GetSnatchTreasureRankInfoLobby_S'; };
        return GetSnatchTreasureRankInfoLobby_S;
    })();
    Cmd.GetSnatchTreasureRankInfoLobby_S = GetSnatchTreasureRankInfoLobby_S;
    /**
     * 急速夺宝下注量广播
     */
    var SnatchTreasureBetChipsLobby_Brd = (function () {
        function SnatchTreasureBetChipsLobby_Brd() {
        }
        SnatchTreasureBetChipsLobby_Brd.prototype.GetType = function () { return 'Cmd.SnatchTreasureBetChipsLobby_Brd'; };
        return SnatchTreasureBetChipsLobby_Brd;
    })();
    Cmd.SnatchTreasureBetChipsLobby_Brd = SnatchTreasureBetChipsLobby_Brd;
    /**
     * 急速夺宝下注状态广播
     */
    var SnatchTreasureBetStatusLobby_Brd = (function () {
        function SnatchTreasureBetStatusLobby_Brd() {
        }
        SnatchTreasureBetStatusLobby_Brd.prototype.GetType = function () { return 'Cmd.SnatchTreasureBetStatusLobby_Brd'; };
        return SnatchTreasureBetStatusLobby_Brd;
    })();
    Cmd.SnatchTreasureBetStatusLobby_Brd = SnatchTreasureBetStatusLobby_Brd;
    /**
     * 急速夺宝开奖状态广播
     */
    var SnatchTreasureLotteryStatusLobby_Brd = (function () {
        function SnatchTreasureLotteryStatusLobby_Brd() {
        }
        SnatchTreasureLotteryStatusLobby_Brd.prototype.GetType = function () { return 'Cmd.SnatchTreasureLotteryStatusLobby_Brd'; };
        return SnatchTreasureLotteryStatusLobby_Brd;
    })();
    Cmd.SnatchTreasureLotteryStatusLobby_Brd = SnatchTreasureLotteryStatusLobby_Brd;
    /**
     * 急速夺宝玩家下注
     */
    var SnatchTreasureUserBetChipsLobby_C = (function () {
        function SnatchTreasureUserBetChipsLobby_C() {
        }
        SnatchTreasureUserBetChipsLobby_C.prototype.GetType = function () { return 'Cmd.SnatchTreasureUserBetChipsLobby_C'; };
        return SnatchTreasureUserBetChipsLobby_C;
    })();
    Cmd.SnatchTreasureUserBetChipsLobby_C = SnatchTreasureUserBetChipsLobby_C;
    /**
     * 急速夺宝玩家下注返回
     */
    var SnatchTreasureUserBetChipsLobby_S = (function () {
        function SnatchTreasureUserBetChipsLobby_S() {
        }
        SnatchTreasureUserBetChipsLobby_S.prototype.GetType = function () { return 'Cmd.SnatchTreasureUserBetChipsLobby_S'; };
        return SnatchTreasureUserBetChipsLobby_S;
    })();
    Cmd.SnatchTreasureUserBetChipsLobby_S = SnatchTreasureUserBetChipsLobby_S;
    /**
     * 急速夺宝玩家概率变化
     */
    var SnatchTreasureUserProbabilityLobby_S = (function () {
        function SnatchTreasureUserProbabilityLobby_S() {
        }
        SnatchTreasureUserProbabilityLobby_S.prototype.GetType = function () { return 'Cmd.SnatchTreasureUserProbabilityLobby_S'; };
        return SnatchTreasureUserProbabilityLobby_S;
    })();
    Cmd.SnatchTreasureUserProbabilityLobby_S = SnatchTreasureUserProbabilityLobby_S;
    /**
     * 急速夺宝中奖玩家通知
     */
    var SnatchTreasureWinnerNoticeLobby_S = (function () {
        function SnatchTreasureWinnerNoticeLobby_S() {
        }
        SnatchTreasureWinnerNoticeLobby_S.prototype.GetType = function () { return 'Cmd.SnatchTreasureWinnerNoticeLobby_S'; };
        return SnatchTreasureWinnerNoticeLobby_S;
    })();
    Cmd.SnatchTreasureWinnerNoticeLobby_S = SnatchTreasureWinnerNoticeLobby_S;
    /**
     * 急速夺宝我的下注记录
     */
    var GetSnatchTreasureOwnBetRecordLobby_C = (function () {
        function GetSnatchTreasureOwnBetRecordLobby_C() {
        }
        GetSnatchTreasureOwnBetRecordLobby_C.prototype.GetType = function () { return 'Cmd.GetSnatchTreasureOwnBetRecordLobby_C'; };
        return GetSnatchTreasureOwnBetRecordLobby_C;
    })();
    Cmd.GetSnatchTreasureOwnBetRecordLobby_C = GetSnatchTreasureOwnBetRecordLobby_C;
    /**
     * 下注记录信息
     */
    var OwnBetRecordInfo = (function () {
        function OwnBetRecordInfo() {
        }
        OwnBetRecordInfo.prototype.GetType = function () { return 'Cmd.OwnBetRecordInfo'; };
        return OwnBetRecordInfo;
    })();
    Cmd.OwnBetRecordInfo = OwnBetRecordInfo;
    /**
     * 急速夺宝我的下注记录返回
     */
    var GetSnatchTreasureOwnBetRecordLobby_S = (function () {
        function GetSnatchTreasureOwnBetRecordLobby_S() {
        }
        GetSnatchTreasureOwnBetRecordLobby_S.prototype.GetType = function () { return 'Cmd.GetSnatchTreasureOwnBetRecordLobby_S'; };
        return GetSnatchTreasureOwnBetRecordLobby_S;
    })();
    Cmd.GetSnatchTreasureOwnBetRecordLobby_S = GetSnatchTreasureOwnBetRecordLobby_S;
    /**
     * 急速夺宝打开面板或关闭面板
     */
    var SnatchTreasurePanelStatusLobby_C = (function () {
        function SnatchTreasurePanelStatusLobby_C() {
        }
        SnatchTreasurePanelStatusLobby_C.prototype.GetType = function () { return 'Cmd.SnatchTreasurePanelStatusLobby_C'; };
        return SnatchTreasurePanelStatusLobby_C;
    })();
    Cmd.SnatchTreasurePanelStatusLobby_C = SnatchTreasurePanelStatusLobby_C;
    var SnatchTreasurePanelStatusLobby_S = (function () {
        function SnatchTreasurePanelStatusLobby_S() {
        }
        SnatchTreasurePanelStatusLobby_S.prototype.GetType = function () { return 'Cmd.SnatchTreasurePanelStatusLobby_S'; };
        return SnatchTreasurePanelStatusLobby_S;
    })();
    Cmd.SnatchTreasurePanelStatusLobby_S = SnatchTreasurePanelStatusLobby_S;
    /**
     * 三张大厅玩法隐藏功能
     */
    var Hidden_Game = (function () {
        function Hidden_Game() {
        }
        Hidden_Game.prototype.GetType = function () { return 'Cmd.Hidden_Game'; };
        return Hidden_Game;
    })();
    Cmd.Hidden_Game = Hidden_Game;
    var Hidden_Game;
    (function (Hidden_Game) {
        (function (Hidden_Game_Type) {
            /**
             * 标准场
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_Stand"] = 9053000] = "Game_Stand";
            /**
             * 百人场
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_Hundred"] = 9053001] = "Game_Hundred";
            /**
             * 森林舞会
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_SenLinWuHui"] = 9053002] = "Game_SenLinWuHui";
            /**
             * 时时彩
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_EveryColor"] = 9053003] = "Game_EveryColor";
            /**
             * 急速夺宝
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_SnatchTreasure"] = 9053004] = "Game_SnatchTreasure";
            /**
             * 赠送金币
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_ExchangeCoin"] = 9053005] = "Game_ExchangeCoin";
            /**
             * 摇钱树
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_MoneyTree"] = 9053006] = "Game_MoneyTree";
            /**
             * 龙虎斗
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_LongHu"] = 9053007] = "Game_LongHu";
            /**
             * 至尊
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_ZhiZun"] = 9053008] = "Game_ZhiZun";
            /**
             * 海王捕鱼
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_Fish"] = 9053009] = "Game_Fish";
            /**
             * 广播按钮
             */
            Hidden_Game_Type[Hidden_Game_Type["Game_BroadCast"] = 9053010] = "Game_BroadCast";
        })(Hidden_Game.Hidden_Game_Type || (Hidden_Game.Hidden_Game_Type = {}));
        var Hidden_Game_Type = Hidden_Game.Hidden_Game_Type;
    })(Hidden_Game = Cmd.Hidden_Game || (Cmd.Hidden_Game = {}));
    /**
     * 简单推送
     */
    var IsSimpleAgentLobby_S = (function () {
        function IsSimpleAgentLobby_S() {
        }
        IsSimpleAgentLobby_S.prototype.GetType = function () { return 'Cmd.IsSimpleAgentLobby_S'; };
        return IsSimpleAgentLobby_S;
    })();
    Cmd.IsSimpleAgentLobby_S = IsSimpleAgentLobby_S;
    /**
     * ---------------------------------奖池回馈活动开始----------------------------//
     *  请求获取奖池奖励内容
     */
    var JackpotItemListLobbyCmd_C = (function () {
        function JackpotItemListLobbyCmd_C() {
        }
        JackpotItemListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.JackpotItemListLobbyCmd_C'; };
        return JackpotItemListLobbyCmd_C;
    })();
    Cmd.JackpotItemListLobbyCmd_C = JackpotItemListLobbyCmd_C;
    /**
     * 奖池物品列表
     */
    var JackpotItem = (function () {
        function JackpotItem() {
        }
        JackpotItem.prototype.GetType = function () { return 'Cmd.JackpotItem'; };
        return JackpotItem;
    })();
    Cmd.JackpotItem = JackpotItem;
    var JackpotItemListLobbyCmd_S = (function () {
        function JackpotItemListLobbyCmd_S() {
        }
        JackpotItemListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.JackpotItemListLobbyCmd_S'; };
        return JackpotItemListLobbyCmd_S;
    })();
    Cmd.JackpotItemListLobbyCmd_S = JackpotItemListLobbyCmd_S;
    /**
     * 刷新奖池
     */
    var JackpotNumLobbyCmd_S = (function () {
        function JackpotNumLobbyCmd_S() {
        }
        JackpotNumLobbyCmd_S.prototype.GetType = function () { return 'Cmd.JackpotNumLobbyCmd_S'; };
        return JackpotNumLobbyCmd_S;
    })();
    Cmd.JackpotNumLobbyCmd_S = JackpotNumLobbyCmd_S;
    /**
     * 请求获奖排行榜
     */
    var JackpotOrderLobbyCmd_C = (function () {
        function JackpotOrderLobbyCmd_C() {
        }
        JackpotOrderLobbyCmd_C.prototype.GetType = function () { return 'Cmd.JackpotOrderLobbyCmd_C'; };
        return JackpotOrderLobbyCmd_C;
    })();
    Cmd.JackpotOrderLobbyCmd_C = JackpotOrderLobbyCmd_C;
    /**
     * 奖池物品列表
     */
    var JackpotRewardUser = (function () {
        function JackpotRewardUser() {
        }
        JackpotRewardUser.prototype.GetType = function () { return 'Cmd.JackpotRewardUser'; };
        return JackpotRewardUser;
    })();
    Cmd.JackpotRewardUser = JackpotRewardUser;
    /**
     * 请求获奖排行榜返回
     */
    var JackpotOrderLobbyCmd_S = (function () {
        function JackpotOrderLobbyCmd_S() {
        }
        JackpotOrderLobbyCmd_S.prototype.GetType = function () { return 'Cmd.JackpotOrderLobbyCmd_S'; };
        return JackpotOrderLobbyCmd_S;
    })();
    Cmd.JackpotOrderLobbyCmd_S = JackpotOrderLobbyCmd_S;
    /**
     * 请求抽奖
     */
    var GetJackpotItemLobbyCmd_C = (function () {
        function GetJackpotItemLobbyCmd_C() {
        }
        GetJackpotItemLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetJackpotItemLobbyCmd_C'; };
        return GetJackpotItemLobbyCmd_C;
    })();
    Cmd.GetJackpotItemLobbyCmd_C = GetJackpotItemLobbyCmd_C;
    /**
     * 请求抽奖返回
     */
    var GetJackpotItemLobbyCmd_S = (function () {
        function GetJackpotItemLobbyCmd_S() {
        }
        GetJackpotItemLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetJackpotItemLobbyCmd_S'; };
        return GetJackpotItemLobbyCmd_S;
    })();
    Cmd.GetJackpotItemLobbyCmd_S = GetJackpotItemLobbyCmd_S;
    /**
     * ---------------------------------积分商城购买----------------------------//
     *  获取积分商城物品列表
     */
    var ShopPointListLobbyCmd_C = (function () {
        function ShopPointListLobbyCmd_C() {
        }
        ShopPointListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ShopPointListLobbyCmd_C'; };
        return ShopPointListLobbyCmd_C;
    })();
    Cmd.ShopPointListLobbyCmd_C = ShopPointListLobbyCmd_C;
    /**
     * 积分商城物品列表
     */
    var ShopPointItem = (function () {
        function ShopPointItem() {
        }
        ShopPointItem.prototype.GetType = function () { return 'Cmd.ShopPointItem'; };
        return ShopPointItem;
    })();
    Cmd.ShopPointItem = ShopPointItem;
    /**
     * 返回积分商城物品列表
     */
    var ShopPointListLobbyCmd_S = (function () {
        function ShopPointListLobbyCmd_S() {
        }
        ShopPointListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ShopPointListLobbyCmd_S'; };
        return ShopPointListLobbyCmd_S;
    })();
    Cmd.ShopPointListLobbyCmd_S = ShopPointListLobbyCmd_S;
    /**
     * 购买一个积分商品
     */
    var BuyShopPointItemLobbyCmd_C = (function () {
        function BuyShopPointItemLobbyCmd_C() {
        }
        BuyShopPointItemLobbyCmd_C.prototype.GetType = function () { return 'Cmd.BuyShopPointItemLobbyCmd_C'; };
        return BuyShopPointItemLobbyCmd_C;
    })();
    Cmd.BuyShopPointItemLobbyCmd_C = BuyShopPointItemLobbyCmd_C;
    /**
     * 单笔订单
     */
    var LobbyOrderItem = (function () {
        function LobbyOrderItem() {
        }
        LobbyOrderItem.prototype.GetType = function () { return 'Cmd.LobbyOrderItem'; };
        return LobbyOrderItem;
    })();
    Cmd.LobbyOrderItem = LobbyOrderItem;
    /**
     * 请求查看所有购买订单
     */
    var RequestOrderListLobbyCmd_C = (function () {
        function RequestOrderListLobbyCmd_C() {
        }
        RequestOrderListLobbyCmd_C.prototype.GetType = function () { return 'Cmd.RequestOrderListLobbyCmd_C'; };
        return RequestOrderListLobbyCmd_C;
    })();
    Cmd.RequestOrderListLobbyCmd_C = RequestOrderListLobbyCmd_C;
    /**
     * 返回订单列表
     */
    var ReturnOrderListLobbyCmd_S = (function () {
        function ReturnOrderListLobbyCmd_S() {
        }
        ReturnOrderListLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ReturnOrderListLobbyCmd_S'; };
        return ReturnOrderListLobbyCmd_S;
    })();
    Cmd.ReturnOrderListLobbyCmd_S = ReturnOrderListLobbyCmd_S;
    /**
     * 抽奖结果
     */
    var LuckShopPointItemLobbyCmd_CS = (function () {
        function LuckShopPointItemLobbyCmd_CS() {
        }
        LuckShopPointItemLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.LuckShopPointItemLobbyCmd_CS'; };
        return LuckShopPointItemLobbyCmd_CS;
    })();
    Cmd.LuckShopPointItemLobbyCmd_CS = LuckShopPointItemLobbyCmd_CS;
    /**
     * 获取抽奖结果
     */
    var GetLuckShopPointItemLobbyCmd_C = (function () {
        function GetLuckShopPointItemLobbyCmd_C() {
        }
        GetLuckShopPointItemLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetLuckShopPointItemLobbyCmd_C'; };
        return GetLuckShopPointItemLobbyCmd_C;
    })();
    Cmd.GetLuckShopPointItemLobbyCmd_C = GetLuckShopPointItemLobbyCmd_C;
    /**
     * ---------------------------------商城兑换码----------------------------//
     *  请求兑换一个商品
     */
    var RedeemItemShopPointLobbyCmd_C = (function () {
        function RedeemItemShopPointLobbyCmd_C() {
        }
        RedeemItemShopPointLobbyCmd_C.prototype.GetType = function () { return 'Cmd.RedeemItemShopPointLobbyCmd_C'; };
        return RedeemItemShopPointLobbyCmd_C;
    })();
    Cmd.RedeemItemShopPointLobbyCmd_C = RedeemItemShopPointLobbyCmd_C;
    /**
     * 通知消息
     */
    var Notification = (function () {
        function Notification() {
        }
        Notification.prototype.GetType = function () { return 'Cmd.Notification'; };
        return Notification;
    })();
    Cmd.Notification = Notification;
    var Notification;
    (function (Notification) {
        (function (Type) {
            Type[Type["AddFriend"] = 1] = "AddFriend";
        })(Notification.Type || (Notification.Type = {}));
        var Type = Notification.Type;
    })(Notification = Cmd.Notification || (Cmd.Notification = {}));
    /**
     *  C-&gt;S 消息更新请求
     *  S-&gt;C 消息更新通知
     */
    var NotificationUpdateLobbyCmd_CS = (function () {
        function NotificationUpdateLobbyCmd_CS() {
        }
        NotificationUpdateLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.NotificationUpdateLobbyCmd_CS'; };
        return NotificationUpdateLobbyCmd_CS;
    })();
    Cmd.NotificationUpdateLobbyCmd_CS = NotificationUpdateLobbyCmd_CS;
    /**
     * 增加带入
     */
    var AddBringLobbyCmd_C = (function () {
        function AddBringLobbyCmd_C() {
        }
        AddBringLobbyCmd_C.prototype.GetType = function () { return 'Cmd.AddBringLobbyCmd_C'; };
        return AddBringLobbyCmd_C;
    })();
    Cmd.AddBringLobbyCmd_C = AddBringLobbyCmd_C;
    /**
     * 带出金钱
     */
    var TakeoutBringLobbyCmd_C = (function () {
        function TakeoutBringLobbyCmd_C() {
        }
        TakeoutBringLobbyCmd_C.prototype.GetType = function () { return 'Cmd.TakeoutBringLobbyCmd_C'; };
        return TakeoutBringLobbyCmd_C;
    })();
    Cmd.TakeoutBringLobbyCmd_C = TakeoutBringLobbyCmd_C;
    /**
     * 系统设置
     */
    var SystemSettingsLobbyCmd_CS = (function () {
        function SystemSettingsLobbyCmd_CS() {
        }
        SystemSettingsLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.SystemSettingsLobbyCmd_CS'; };
        return SystemSettingsLobbyCmd_CS;
    })();
    Cmd.SystemSettingsLobbyCmd_CS = SystemSettingsLobbyCmd_CS;
    /**
     * ---------------------------------账号绑定其他登录方式----------------------------//
     *  获取手机验证码
     */
    var GetBindAccountIdentifyCodeLobbyCmd_C = (function () {
        function GetBindAccountIdentifyCodeLobbyCmd_C() {
        }
        GetBindAccountIdentifyCodeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetBindAccountIdentifyCodeLobbyCmd_C'; };
        return GetBindAccountIdentifyCodeLobbyCmd_C;
    })();
    Cmd.GetBindAccountIdentifyCodeLobbyCmd_C = GetBindAccountIdentifyCodeLobbyCmd_C;
    var GetBindAccountIdentifyCodeLobbyCmd_S = (function () {
        function GetBindAccountIdentifyCodeLobbyCmd_S() {
        }
        GetBindAccountIdentifyCodeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetBindAccountIdentifyCodeLobbyCmd_S'; };
        return GetBindAccountIdentifyCodeLobbyCmd_S;
    })();
    Cmd.GetBindAccountIdentifyCodeLobbyCmd_S = GetBindAccountIdentifyCodeLobbyCmd_S;
    /**
     * 账号绑定其他登录方式
     */
    var BindAccountLobbyCmd_C = (function () {
        function BindAccountLobbyCmd_C() {
        }
        BindAccountLobbyCmd_C.prototype.GetType = function () { return 'Cmd.BindAccountLobbyCmd_C'; };
        return BindAccountLobbyCmd_C;
    })();
    Cmd.BindAccountLobbyCmd_C = BindAccountLobbyCmd_C;
    var BindAccountLobbyCmd_S = (function () {
        function BindAccountLobbyCmd_S() {
        }
        BindAccountLobbyCmd_S.prototype.GetType = function () { return 'Cmd.BindAccountLobbyCmd_S'; };
        return BindAccountLobbyCmd_S;
    })();
    Cmd.BindAccountLobbyCmd_S = BindAccountLobbyCmd_S;
    /**
     * 验证指定验证码
     */
    var VerifyIdentifyCodeLobbyCmd_C = (function () {
        function VerifyIdentifyCodeLobbyCmd_C() {
        }
        VerifyIdentifyCodeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.VerifyIdentifyCodeLobbyCmd_C'; };
        return VerifyIdentifyCodeLobbyCmd_C;
    })();
    Cmd.VerifyIdentifyCodeLobbyCmd_C = VerifyIdentifyCodeLobbyCmd_C;
    var VerifyIdentifyCodeLobbyCmd_S = (function () {
        function VerifyIdentifyCodeLobbyCmd_S() {
        }
        VerifyIdentifyCodeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.VerifyIdentifyCodeLobbyCmd_S'; };
        return VerifyIdentifyCodeLobbyCmd_S;
    })();
    Cmd.VerifyIdentifyCodeLobbyCmd_S = VerifyIdentifyCodeLobbyCmd_S;
    /**
     * ---------------------------------游客绑定邮箱----------------------------//
     *  获取手机验证码
     */
    var GetGuestBindEmailIdentifyCodeLobbyCmd_C = (function () {
        function GetGuestBindEmailIdentifyCodeLobbyCmd_C() {
        }
        GetGuestBindEmailIdentifyCodeLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGuestBindEmailIdentifyCodeLobbyCmd_C'; };
        return GetGuestBindEmailIdentifyCodeLobbyCmd_C;
    })();
    Cmd.GetGuestBindEmailIdentifyCodeLobbyCmd_C = GetGuestBindEmailIdentifyCodeLobbyCmd_C;
    var GetGuestBindEmailIdentifyCodeLobbyCmd_S = (function () {
        function GetGuestBindEmailIdentifyCodeLobbyCmd_S() {
        }
        GetGuestBindEmailIdentifyCodeLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetGuestBindEmailIdentifyCodeLobbyCmd_S'; };
        return GetGuestBindEmailIdentifyCodeLobbyCmd_S;
    })();
    Cmd.GetGuestBindEmailIdentifyCodeLobbyCmd_S = GetGuestBindEmailIdentifyCodeLobbyCmd_S;
    /**
     * 游客绑定邮件
     */
    var GuestBindEmailLobbyCmd_C = (function () {
        function GuestBindEmailLobbyCmd_C() {
        }
        GuestBindEmailLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GuestBindEmailLobbyCmd_C'; };
        return GuestBindEmailLobbyCmd_C;
    })();
    Cmd.GuestBindEmailLobbyCmd_C = GuestBindEmailLobbyCmd_C;
    var GuestBindEmailLobbyCmd_S = (function () {
        function GuestBindEmailLobbyCmd_S() {
        }
        GuestBindEmailLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GuestBindEmailLobbyCmd_S'; };
        return GuestBindEmailLobbyCmd_S;
    })();
    Cmd.GuestBindEmailLobbyCmd_S = GuestBindEmailLobbyCmd_S;
    /**
     * 防沉迷提示弹窗(好彩金币场yy渠道需求2018.06.08)
     */
    var AntiAddictionLobbyCmd_S = (function () {
        function AntiAddictionLobbyCmd_S() {
        }
        AntiAddictionLobbyCmd_S.prototype.GetType = function () { return 'Cmd.AntiAddictionLobbyCmd_S'; };
        return AntiAddictionLobbyCmd_S;
    })();
    Cmd.AntiAddictionLobbyCmd_S = AntiAddictionLobbyCmd_S;
    /**
     *  好彩金币系列代理商公告
     *  代理商分享页面信息
     */
    var GetAgentShareInfoLobbyCmd_C = (function () {
        function GetAgentShareInfoLobbyCmd_C() {
        }
        GetAgentShareInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetAgentShareInfoLobbyCmd_C'; };
        return GetAgentShareInfoLobbyCmd_C;
    })();
    Cmd.GetAgentShareInfoLobbyCmd_C = GetAgentShareInfoLobbyCmd_C;
    var GetAgentShareInfoLobbyCmd_S = (function () {
        function GetAgentShareInfoLobbyCmd_S() {
        }
        GetAgentShareInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetAgentShareInfoLobbyCmd_S'; };
        return GetAgentShareInfoLobbyCmd_S;
    })();
    Cmd.GetAgentShareInfoLobbyCmd_S = GetAgentShareInfoLobbyCmd_S;
    /**
     * 代理商设置分享数据
     */
    var SetAgentShareInfoLobbyCmd_C = (function () {
        function SetAgentShareInfoLobbyCmd_C() {
        }
        SetAgentShareInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.SetAgentShareInfoLobbyCmd_C'; };
        return SetAgentShareInfoLobbyCmd_C;
    })();
    Cmd.SetAgentShareInfoLobbyCmd_C = SetAgentShareInfoLobbyCmd_C;
    var SetAgentShareInfoLobbyCmd_S = (function () {
        function SetAgentShareInfoLobbyCmd_S() {
        }
        SetAgentShareInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.SetAgentShareInfoLobbyCmd_S'; };
        return SetAgentShareInfoLobbyCmd_S;
    })();
    Cmd.SetAgentShareInfoLobbyCmd_S = SetAgentShareInfoLobbyCmd_S;
    /**
     * 代理商设置公告通知所有下级播跑马灯
     */
    var NotifyAgentChildsBroadInfoLobby_Brd = (function () {
        function NotifyAgentChildsBroadInfoLobby_Brd() {
        }
        NotifyAgentChildsBroadInfoLobby_Brd.prototype.GetType = function () { return 'Cmd.NotifyAgentChildsBroadInfoLobby_Brd'; };
        return NotifyAgentChildsBroadInfoLobby_Brd;
    })();
    Cmd.NotifyAgentChildsBroadInfoLobby_Brd = NotifyAgentChildsBroadInfoLobby_Brd;
    /**
     * 大四喜大厅：查询玩家游戏记录
     */
    var GameRecords = (function () {
        function GameRecords() {
        }
        GameRecords.prototype.GetType = function () { return 'Cmd.GameRecords'; };
        return GameRecords;
    })();
    Cmd.GameRecords = GameRecords;
    var FindUserGameRecordsLobbyCmd_C = (function () {
        function FindUserGameRecordsLobbyCmd_C() {
        }
        FindUserGameRecordsLobbyCmd_C.prototype.GetType = function () { return 'Cmd.FindUserGameRecordsLobbyCmd_C'; };
        return FindUserGameRecordsLobbyCmd_C;
    })();
    Cmd.FindUserGameRecordsLobbyCmd_C = FindUserGameRecordsLobbyCmd_C;
    var FindUserGameRecordsLobbyCmd_S = (function () {
        function FindUserGameRecordsLobbyCmd_S() {
        }
        FindUserGameRecordsLobbyCmd_S.prototype.GetType = function () { return 'Cmd.FindUserGameRecordsLobbyCmd_S'; };
        return FindUserGameRecordsLobbyCmd_S;
    })();
    Cmd.FindUserGameRecordsLobbyCmd_S = FindUserGameRecordsLobbyCmd_S;
    /**
     * 玩家赠送金币信息
     */
    var GetUserGiftCoinInfoLobbyCmd_C = (function () {
        function GetUserGiftCoinInfoLobbyCmd_C() {
        }
        GetUserGiftCoinInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetUserGiftCoinInfoLobbyCmd_C'; };
        return GetUserGiftCoinInfoLobbyCmd_C;
    })();
    Cmd.GetUserGiftCoinInfoLobbyCmd_C = GetUserGiftCoinInfoLobbyCmd_C;
    var GetUserGiftCoinInfoLobbyCmd_S = (function () {
        function GetUserGiftCoinInfoLobbyCmd_S() {
        }
        GetUserGiftCoinInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetUserGiftCoinInfoLobbyCmd_S'; };
        return GetUserGiftCoinInfoLobbyCmd_S;
    })();
    Cmd.GetUserGiftCoinInfoLobbyCmd_S = GetUserGiftCoinInfoLobbyCmd_S;
    /**
     * 历史数据更新（大厅）
     */
    var HistoryUpdateLobbyCmd_CS = (function () {
        function HistoryUpdateLobbyCmd_CS() {
        }
        HistoryUpdateLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.HistoryUpdateLobbyCmd_CS'; };
        return HistoryUpdateLobbyCmd_CS;
    })();
    Cmd.HistoryUpdateLobbyCmd_CS = HistoryUpdateLobbyCmd_CS;
    /**
     * 玩家游戏历史数据更新（大厅）
     */
    var UserGameHistoryUpdateLobbyCmd_CS = (function () {
        function UserGameHistoryUpdateLobbyCmd_CS() {
        }
        UserGameHistoryUpdateLobbyCmd_CS.prototype.GetType = function () { return 'Cmd.UserGameHistoryUpdateLobbyCmd_CS'; };
        return UserGameHistoryUpdateLobbyCmd_CS;
    })();
    Cmd.UserGameHistoryUpdateLobbyCmd_CS = UserGameHistoryUpdateLobbyCmd_CS;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_club.proto
/// <reference path="common.ts" />
/// <reference path="poker_room.ts" />
var Cmd;
(function (Cmd) {
    /**
     * 俱乐部数据更新
     */
    var UpdateInfoClubCmd_S = (function () {
        function UpdateInfoClubCmd_S() {
        }
        UpdateInfoClubCmd_S.prototype.GetType = function () { return 'Cmd.UpdateInfoClubCmd_S'; };
        return UpdateInfoClubCmd_S;
    })();
    Cmd.UpdateInfoClubCmd_S = UpdateInfoClubCmd_S;
    /**
     * 获取我的俱乐部消息
     */
    var MyInfoUpdateClubCmd_C = (function () {
        function MyInfoUpdateClubCmd_C() {
        }
        MyInfoUpdateClubCmd_C.prototype.GetType = function () { return 'Cmd.MyInfoUpdateClubCmd_C'; };
        return MyInfoUpdateClubCmd_C;
    })();
    Cmd.MyInfoUpdateClubCmd_C = MyInfoUpdateClubCmd_C;
    /**
     * 创建俱乐部请求
     */
    var CreateClubCmd_C = (function () {
        function CreateClubCmd_C() {
        }
        CreateClubCmd_C.prototype.GetType = function () { return 'Cmd.CreateClubCmd_C'; };
        return CreateClubCmd_C;
    })();
    Cmd.CreateClubCmd_C = CreateClubCmd_C;
    /**
     * 请求俱乐部信息
     */
    var RequestClubInfoClubCmd_C = (function () {
        function RequestClubInfoClubCmd_C() {
        }
        RequestClubInfoClubCmd_C.prototype.GetType = function () { return 'Cmd.RequestClubInfoClubCmd_C'; };
        return RequestClubInfoClubCmd_C;
    })();
    Cmd.RequestClubInfoClubCmd_C = RequestClubInfoClubCmd_C;
    /**
     * 俱乐部数据更新
     */
    var ReturnClubInfoClubCmd_S = (function () {
        function ReturnClubInfoClubCmd_S() {
        }
        ReturnClubInfoClubCmd_S.prototype.GetType = function () { return 'Cmd.ReturnClubInfoClubCmd_S'; };
        return ReturnClubInfoClubCmd_S;
    })();
    Cmd.ReturnClubInfoClubCmd_S = ReturnClubInfoClubCmd_S;
    /**
     * 解散俱乐部
     */
    var DissmisClubCmd_C = (function () {
        function DissmisClubCmd_C() {
        }
        DissmisClubCmd_C.prototype.GetType = function () { return 'Cmd.DissmisClubCmd_C'; };
        return DissmisClubCmd_C;
    })();
    Cmd.DissmisClubCmd_C = DissmisClubCmd_C;
    /**
     * 解散俱乐部返回
     */
    var DissmisClubCmd_S = (function () {
        function DissmisClubCmd_S() {
        }
        DissmisClubCmd_S.prototype.GetType = function () { return 'Cmd.DissmisClubCmd_S'; };
        return DissmisClubCmd_S;
    })();
    Cmd.DissmisClubCmd_S = DissmisClubCmd_S;
    /**
     * 退出俱乐部
     */
    var QuitClubCmd_C = (function () {
        function QuitClubCmd_C() {
        }
        QuitClubCmd_C.prototype.GetType = function () { return 'Cmd.QuitClubCmd_C'; };
        return QuitClubCmd_C;
    })();
    Cmd.QuitClubCmd_C = QuitClubCmd_C;
    /**
     * 退出俱乐部返回
     */
    var QuitClubCmd_S = (function () {
        function QuitClubCmd_S() {
        }
        QuitClubCmd_S.prototype.GetType = function () { return 'Cmd.QuitClubCmd_S'; };
        return QuitClubCmd_S;
    })();
    Cmd.QuitClubCmd_S = QuitClubCmd_S;
    /**
     * 加入俱乐部请求
     */
    var JoinRequestClubCmd_C = (function () {
        function JoinRequestClubCmd_C() {
        }
        JoinRequestClubCmd_C.prototype.GetType = function () { return 'Cmd.JoinRequestClubCmd_C'; };
        return JoinRequestClubCmd_C;
    })();
    Cmd.JoinRequestClubCmd_C = JoinRequestClubCmd_C;
    /**
     * 处理加入俱乐部请求
     */
    var JoinReturnClubCmd_C = (function () {
        function JoinReturnClubCmd_C() {
        }
        JoinReturnClubCmd_C.prototype.GetType = function () { return 'Cmd.JoinReturnClubCmd_C'; };
        return JoinReturnClubCmd_C;
    })();
    Cmd.JoinReturnClubCmd_C = JoinReturnClubCmd_C;
    /**
     * S-&gt;C 通知俱乐部成员信息
     */
    var MemberUpdateClubCmd_CS = (function () {
        function MemberUpdateClubCmd_CS() {
        }
        MemberUpdateClubCmd_CS.prototype.GetType = function () { return 'Cmd.MemberUpdateClubCmd_CS'; };
        return MemberUpdateClubCmd_CS;
    })();
    Cmd.MemberUpdateClubCmd_CS = MemberUpdateClubCmd_CS;
    /**
     *  C-&gt;S 查询俱乐部成员信息
     *  S-&gt;C 回复俱乐部成员信息
     */
    var MemberQueryClubCmd_CS = (function () {
        function MemberQueryClubCmd_CS() {
        }
        MemberQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.MemberQueryClubCmd_CS'; };
        return MemberQueryClubCmd_CS;
    })();
    Cmd.MemberQueryClubCmd_CS = MemberQueryClubCmd_CS;
    /**
     *  C-&gt;S 请求俱乐部某个成员信息
     *  S-&gt;C 通知俱乐部某个成员信息
     */
    var MemberInfoGetClubCmd_CS = (function () {
        function MemberInfoGetClubCmd_CS() {
        }
        MemberInfoGetClubCmd_CS.prototype.GetType = function () { return 'Cmd.MemberInfoGetClubCmd_CS'; };
        return MemberInfoGetClubCmd_CS;
    })();
    Cmd.MemberInfoGetClubCmd_CS = MemberInfoGetClubCmd_CS;
    /**
     *  C-&gt;S 请求俱乐部某个成员牌局总计
     *  S-&gt;C 通知俱乐部某个成员牌局总计
     */
    var MemberGameDataSumClubCmd_CS = (function () {
        function MemberGameDataSumClubCmd_CS() {
        }
        MemberGameDataSumClubCmd_CS.prototype.GetType = function () { return 'Cmd.MemberGameDataSumClubCmd_CS'; };
        return MemberGameDataSumClubCmd_CS;
    })();
    Cmd.MemberGameDataSumClubCmd_CS = MemberGameDataSumClubCmd_CS;
    /**
     *  C-&gt;S 请求俱乐部申请人信息
     *  S-&gt;C 通知俱乐部申请人信息
     */
    var ApplicantUpdateClubCmd_CS = (function () {
        function ApplicantUpdateClubCmd_CS() {
        }
        ApplicantUpdateClubCmd_CS.prototype.GetType = function () { return 'Cmd.ApplicantUpdateClubCmd_CS'; };
        return ApplicantUpdateClubCmd_CS;
    })();
    Cmd.ApplicantUpdateClubCmd_CS = ApplicantUpdateClubCmd_CS;
    /**
     * 编辑俱乐部信息
     */
    var EditClubCmd_C = (function () {
        function EditClubCmd_C() {
        }
        EditClubCmd_C.prototype.GetType = function () { return 'Cmd.EditClubCmd_C'; };
        return EditClubCmd_C;
    })();
    Cmd.EditClubCmd_C = EditClubCmd_C;
    /**
     *  C-&gt;S 搜索俱乐部请求
     *  S-&gt;C 搜索俱乐部结果
     */
    var SearchClubCmd_CS = (function () {
        function SearchClubCmd_CS() {
        }
        SearchClubCmd_CS.prototype.GetType = function () { return 'Cmd.SearchClubCmd_CS'; };
        return SearchClubCmd_CS;
    })();
    Cmd.SearchClubCmd_CS = SearchClubCmd_CS;
    /**
     * 设置俱乐部管理员
     */
    var PostUpdateClubCmd_CS = (function () {
        function PostUpdateClubCmd_CS() {
        }
        PostUpdateClubCmd_CS.prototype.GetType = function () { return 'Cmd.PostUpdateClubCmd_CS'; };
        return PostUpdateClubCmd_CS;
    })();
    Cmd.PostUpdateClubCmd_CS = PostUpdateClubCmd_CS;
    /**
     *  C-&gt;S 请求俱乐部牌局
     *  S-&gt;C 返回俱乐部牌局
     */
    var GameUpdateClubCmd_CS = (function () {
        function GameUpdateClubCmd_CS() {
        }
        GameUpdateClubCmd_CS.prototype.GetType = function () { return 'Cmd.GameUpdateClubCmd_CS'; };
        return GameUpdateClubCmd_CS;
    })();
    Cmd.GameUpdateClubCmd_CS = GameUpdateClubCmd_CS;
    /**
     * 移除成员
     */
    var MemberRemoveClubCmd_C = (function () {
        function MemberRemoveClubCmd_C() {
        }
        MemberRemoveClubCmd_C.prototype.GetType = function () { return 'Cmd.MemberRemoveClubCmd_C'; };
        return MemberRemoveClubCmd_C;
    })();
    Cmd.MemberRemoveClubCmd_C = MemberRemoveClubCmd_C;
    /**
     * 设置俱乐部权限
     */
    var PermissionUpdateClubCmd_C = (function () {
        function PermissionUpdateClubCmd_C() {
        }
        PermissionUpdateClubCmd_C.prototype.GetType = function () { return 'Cmd.PermissionUpdateClubCmd_C'; };
        return PermissionUpdateClubCmd_C;
    })();
    Cmd.PermissionUpdateClubCmd_C = PermissionUpdateClubCmd_C;
    /**
     * 充值基金
     */
    var FundRechargeClubCmd_C = (function () {
        function FundRechargeClubCmd_C() {
        }
        FundRechargeClubCmd_C.prototype.GetType = function () { return 'Cmd.FundRechargeClubCmd_C'; };
        return FundRechargeClubCmd_C;
    })();
    Cmd.FundRechargeClubCmd_C = FundRechargeClubCmd_C;
    /**
     * 基金分发
     */
    var FundDistributeClubCmd_C = (function () {
        function FundDistributeClubCmd_C() {
        }
        FundDistributeClubCmd_C.prototype.GetType = function () { return 'Cmd.FundDistributeClubCmd_C'; };
        return FundDistributeClubCmd_C;
    })();
    Cmd.FundDistributeClubCmd_C = FundDistributeClubCmd_C;
    /**
     * 基金数据更新
     */
    var FundInfoUpdateCmd_S = (function () {
        function FundInfoUpdateCmd_S() {
        }
        FundInfoUpdateCmd_S.prototype.GetType = function () { return 'Cmd.FundInfoUpdateCmd_S'; };
        return FundInfoUpdateCmd_S;
    })();
    Cmd.FundInfoUpdateCmd_S = FundInfoUpdateCmd_S;
    /**
     *  C-&gt;S 转账请求
     *  S-&gt;C 新的转账请求通知
     */
    var TransitMoneyClubCmd_CS = (function () {
        function TransitMoneyClubCmd_CS() {
        }
        TransitMoneyClubCmd_CS.prototype.GetType = function () { return 'Cmd.TransitMoneyClubCmd_CS'; };
        return TransitMoneyClubCmd_CS;
    })();
    Cmd.TransitMoneyClubCmd_CS = TransitMoneyClubCmd_CS;
    /**
     *  C-&gt;S 请求转账列表
     *  S-&gt;C 返回转账列表
     */
    var TransitMoneyQueryClubCmd_CS = (function () {
        function TransitMoneyQueryClubCmd_CS() {
        }
        TransitMoneyQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.TransitMoneyQueryClubCmd_CS'; };
        return TransitMoneyQueryClubCmd_CS;
    })();
    Cmd.TransitMoneyQueryClubCmd_CS = TransitMoneyQueryClubCmd_CS;
    /**
     * 转账处理
     */
    var TransitMoneyDealClubCmd_CS = (function () {
        function TransitMoneyDealClubCmd_CS() {
        }
        TransitMoneyDealClubCmd_CS.prototype.GetType = function () { return 'Cmd.TransitMoneyDealClubCmd_CS'; };
        return TransitMoneyDealClubCmd_CS;
    })();
    Cmd.TransitMoneyDealClubCmd_CS = TransitMoneyDealClubCmd_CS;
    /**
     * 创建者信息更新
     */
    var FounderInfoUpdateClubCmd_S = (function () {
        function FounderInfoUpdateClubCmd_S() {
        }
        FounderInfoUpdateClubCmd_S.prototype.GetType = function () { return 'Cmd.FounderInfoUpdateClubCmd_S'; };
        return FounderInfoUpdateClubCmd_S;
    })();
    Cmd.FounderInfoUpdateClubCmd_S = FounderInfoUpdateClubCmd_S;
    /**
     * 货币兑换
     */
    var ExchangeMoneyClubCmd_CS = (function () {
        function ExchangeMoneyClubCmd_CS() {
        }
        ExchangeMoneyClubCmd_CS.prototype.GetType = function () { return 'Cmd.ExchangeMoneyClubCmd_CS'; };
        return ExchangeMoneyClubCmd_CS;
    })();
    Cmd.ExchangeMoneyClubCmd_CS = ExchangeMoneyClubCmd_CS;
    /**
     * 升级
     */
    var UpgradeClubCmd_C = (function () {
        function UpgradeClubCmd_C() {
        }
        UpgradeClubCmd_C.prototype.GetType = function () { return 'Cmd.UpgradeClubCmd_C'; };
        return UpgradeClubCmd_C;
    })();
    Cmd.UpgradeClubCmd_C = UpgradeClubCmd_C;
    /**
     * 牌局生成器
     */
    var RoomGenerator = (function () {
        function RoomGenerator() {
        }
        RoomGenerator.prototype.GetType = function () { return 'Cmd.RoomGenerator'; };
        return RoomGenerator;
    })();
    Cmd.RoomGenerator = RoomGenerator;
    /**
     *  C-&gt;S 牌局生成器操作请求
     *  S-&gt;C 牌局生成器操作通知
     */
    var RoomGeneratorUpdateClubCmd_CS = (function () {
        function RoomGeneratorUpdateClubCmd_CS() {
        }
        RoomGeneratorUpdateClubCmd_CS.prototype.GetType = function () { return 'Cmd.RoomGeneratorUpdateClubCmd_CS'; };
        return RoomGeneratorUpdateClubCmd_CS;
    })();
    Cmd.RoomGeneratorUpdateClubCmd_CS = RoomGeneratorUpdateClubCmd_CS;
    /**
     * C-&gt;S 获取自己代理下级代理关系线
     */
    var AgentRelationLineQueryClubCmd_CS = (function () {
        function AgentRelationLineQueryClubCmd_CS() {
        }
        AgentRelationLineQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.AgentRelationLineQueryClubCmd_CS'; };
        return AgentRelationLineQueryClubCmd_CS;
    })();
    Cmd.AgentRelationLineQueryClubCmd_CS = AgentRelationLineQueryClubCmd_CS;
    /**
     * 查询玩家可重设的上级
     */
    var AgentAvailableUplineQueryClubCmd_CS = (function () {
        function AgentAvailableUplineQueryClubCmd_CS() {
        }
        AgentAvailableUplineQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.AgentAvailableUplineQueryClubCmd_CS'; };
        return AgentAvailableUplineQueryClubCmd_CS;
    })();
    Cmd.AgentAvailableUplineQueryClubCmd_CS = AgentAvailableUplineQueryClubCmd_CS;
    /**
     * 设置代理上线
     */
    var AgentUplineUpdateClubCmd_C = (function () {
        function AgentUplineUpdateClubCmd_C() {
        }
        AgentUplineUpdateClubCmd_C.prototype.GetType = function () { return 'Cmd.AgentUplineUpdateClubCmd_C'; };
        return AgentUplineUpdateClubCmd_C;
    })();
    Cmd.AgentUplineUpdateClubCmd_C = AgentUplineUpdateClubCmd_C;
    /**
     * 查询自己的下线成员列表
     */
    var AgentAvailableGiveMemberQueryClubCmd_CS = (function () {
        function AgentAvailableGiveMemberQueryClubCmd_CS() {
        }
        AgentAvailableGiveMemberQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.AgentAvailableGiveMemberQueryClubCmd_CS'; };
        return AgentAvailableGiveMemberQueryClubCmd_CS;
    })();
    Cmd.AgentAvailableGiveMemberQueryClubCmd_CS = AgentAvailableGiveMemberQueryClubCmd_CS;
    /**
     * 给代理分配成员
     */
    var AgentGiveMemberClubCmd_C = (function () {
        function AgentGiveMemberClubCmd_C() {
        }
        AgentGiveMemberClubCmd_C.prototype.GetType = function () { return 'Cmd.AgentGiveMemberClubCmd_C'; };
        return AgentGiveMemberClubCmd_C;
    })();
    Cmd.AgentGiveMemberClubCmd_C = AgentGiveMemberClubCmd_C;
    /**
     *  C-&gt;S 请求修改代理信誉值
     *  S-&gt;C 修改代理信誉值通知
     */
    var AgentCreditChangeClubCmd_CS = (function () {
        function AgentCreditChangeClubCmd_CS() {
        }
        AgentCreditChangeClubCmd_CS.prototype.GetType = function () { return 'Cmd.AgentCreditChangeClubCmd_CS'; };
        return AgentCreditChangeClubCmd_CS;
    })();
    Cmd.AgentCreditChangeClubCmd_CS = AgentCreditChangeClubCmd_CS;
    /**
     *  C-&gt;S 代理信誉值记录查询
     *  S-&gt;C 代理信誉值记录回复
     */
    var AgentCreditChangeQueryClubCmd_CS = (function () {
        function AgentCreditChangeQueryClubCmd_CS() {
        }
        AgentCreditChangeQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.AgentCreditChangeQueryClubCmd_CS'; };
        return AgentCreditChangeQueryClubCmd_CS;
    })();
    Cmd.AgentCreditChangeQueryClubCmd_CS = AgentCreditChangeQueryClubCmd_CS;
    var AgentCreditChangeQueryClubCmd_CS;
    (function (AgentCreditChangeQueryClubCmd_CS) {
        var CreditChangeInfo = (function () {
            function CreditChangeInfo() {
            }
            CreditChangeInfo.prototype.GetType = function () { return 'Cmd.AgentCreditChangeQueryClubCmd_CS.CreditChangeInfo'; };
            return CreditChangeInfo;
        })();
        AgentCreditChangeQueryClubCmd_CS.CreditChangeInfo = CreditChangeInfo;
    })(AgentCreditChangeQueryClubCmd_CS = Cmd.AgentCreditChangeQueryClubCmd_CS || (Cmd.AgentCreditChangeQueryClubCmd_CS = {}));
    /**
     * 代理房间数据查询
     */
    var AgentStatisticsRoomQueryClubCmd_CS = (function () {
        function AgentStatisticsRoomQueryClubCmd_CS() {
        }
        AgentStatisticsRoomQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.AgentStatisticsRoomQueryClubCmd_CS'; };
        return AgentStatisticsRoomQueryClubCmd_CS;
    })();
    Cmd.AgentStatisticsRoomQueryClubCmd_CS = AgentStatisticsRoomQueryClubCmd_CS;
    /**
     * 代理单个房间详情查询
     */
    var AgentStatisticsRoomCheckClubCmd_CS = (function () {
        function AgentStatisticsRoomCheckClubCmd_CS() {
        }
        AgentStatisticsRoomCheckClubCmd_CS.prototype.GetType = function () { return 'Cmd.AgentStatisticsRoomCheckClubCmd_CS'; };
        return AgentStatisticsRoomCheckClubCmd_CS;
    })();
    Cmd.AgentStatisticsRoomCheckClubCmd_CS = AgentStatisticsRoomCheckClubCmd_CS;
    var UnionData = (function () {
        function UnionData() {
        }
        UnionData.prototype.GetType = function () { return 'Cmd.UnionData'; };
        return UnionData;
    })();
    Cmd.UnionData = UnionData;
    var UnionMemberData = (function () {
        function UnionMemberData() {
        }
        UnionMemberData.prototype.GetType = function () { return 'Cmd.UnionMemberData'; };
        return UnionMemberData;
    })();
    Cmd.UnionMemberData = UnionMemberData;
    /**
     *  C-&gt;S 创建联盟请求
     *  S-&gt;S 创建联盟成功
     */
    var UnionCreateClubCmd_CS = (function () {
        function UnionCreateClubCmd_CS() {
        }
        UnionCreateClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionCreateClubCmd_CS'; };
        return UnionCreateClubCmd_CS;
    })();
    Cmd.UnionCreateClubCmd_CS = UnionCreateClubCmd_CS;
    /**
     *  C-&gt;S 加入联盟请求
     *  S-&gt;C 加入联盟结果
     */
    var UnionJoinRequestClubCmd_CS = (function () {
        function UnionJoinRequestClubCmd_CS() {
        }
        UnionJoinRequestClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionJoinRequestClubCmd_CS'; };
        return UnionJoinRequestClubCmd_CS;
    })();
    Cmd.UnionJoinRequestClubCmd_CS = UnionJoinRequestClubCmd_CS;
    /**
     * 加入联盟请求处理
     */
    var UnionJoinReturnClubCmd_C = (function () {
        function UnionJoinReturnClubCmd_C() {
        }
        UnionJoinReturnClubCmd_C.prototype.GetType = function () { return 'Cmd.UnionJoinReturnClubCmd_C'; };
        return UnionJoinReturnClubCmd_C;
    })();
    Cmd.UnionJoinReturnClubCmd_C = UnionJoinReturnClubCmd_C;
    /**
     * 编辑
     */
    var UnionEditClubCmd_CS = (function () {
        function UnionEditClubCmd_CS() {
        }
        UnionEditClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionEditClubCmd_CS'; };
        return UnionEditClubCmd_CS;
    })();
    Cmd.UnionEditClubCmd_CS = UnionEditClubCmd_CS;
    /**
     * 解散
     */
    var UnionDismissClubCmd_C = (function () {
        function UnionDismissClubCmd_C() {
        }
        UnionDismissClubCmd_C.prototype.GetType = function () { return 'Cmd.UnionDismissClubCmd_C'; };
        return UnionDismissClubCmd_C;
    })();
    Cmd.UnionDismissClubCmd_C = UnionDismissClubCmd_C;
    /**
     * 联盟更新
     */
    var UnionUpdateClubCmd_CS = (function () {
        function UnionUpdateClubCmd_CS() {
        }
        UnionUpdateClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionUpdateClubCmd_CS'; };
        return UnionUpdateClubCmd_CS;
    })();
    Cmd.UnionUpdateClubCmd_CS = UnionUpdateClubCmd_CS;
    /**
     * 退出
     */
    var UnionQuitClubCmd_C = (function () {
        function UnionQuitClubCmd_C() {
        }
        UnionQuitClubCmd_C.prototype.GetType = function () { return 'Cmd.UnionQuitClubCmd_C'; };
        return UnionQuitClubCmd_C;
    })();
    Cmd.UnionQuitClubCmd_C = UnionQuitClubCmd_C;
    /**
     * 基金充值
     */
    var UnionFundRechargeClubCmd_C = (function () {
        function UnionFundRechargeClubCmd_C() {
        }
        UnionFundRechargeClubCmd_C.prototype.GetType = function () { return 'Cmd.UnionFundRechargeClubCmd_C'; };
        return UnionFundRechargeClubCmd_C;
    })();
    Cmd.UnionFundRechargeClubCmd_C = UnionFundRechargeClubCmd_C;
    /**
     * 基金分发
     */
    var UnionFundDistributeClubCmd_C = (function () {
        function UnionFundDistributeClubCmd_C() {
        }
        UnionFundDistributeClubCmd_C.prototype.GetType = function () { return 'Cmd.UnionFundDistributeClubCmd_C'; };
        return UnionFundDistributeClubCmd_C;
    })();
    Cmd.UnionFundDistributeClubCmd_C = UnionFundDistributeClubCmd_C;
    /**
     * 基金记录查询
     */
    var UnionFundDistributeQueryClubCmd_CS = (function () {
        function UnionFundDistributeQueryClubCmd_CS() {
        }
        UnionFundDistributeQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionFundDistributeQueryClubCmd_CS'; };
        return UnionFundDistributeQueryClubCmd_CS;
    })();
    Cmd.UnionFundDistributeQueryClubCmd_CS = UnionFundDistributeQueryClubCmd_CS;
    /**
     * 基金修改
     */
    var UnionFundInfoUpdateCmd_S = (function () {
        function UnionFundInfoUpdateCmd_S() {
        }
        UnionFundInfoUpdateCmd_S.prototype.GetType = function () { return 'Cmd.UnionFundInfoUpdateCmd_S'; };
        return UnionFundInfoUpdateCmd_S;
    })();
    Cmd.UnionFundInfoUpdateCmd_S = UnionFundInfoUpdateCmd_S;
    /**
     *  C-&gt;S 请求俱乐部申请人信息
     *  S-&gt;C 通知俱乐部申请人信息
     */
    var UnionApplicantUpdateClubCmd_CS = (function () {
        function UnionApplicantUpdateClubCmd_CS() {
        }
        UnionApplicantUpdateClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionApplicantUpdateClubCmd_CS'; };
        return UnionApplicantUpdateClubCmd_CS;
    })();
    Cmd.UnionApplicantUpdateClubCmd_CS = UnionApplicantUpdateClubCmd_CS;
    /**
     *  C-&gt;S 请求俱乐部成员信息
     *  S-&gt;C 通知俱乐部成员信息
     */
    var UnionMemberUpdateClubCmd_CS = (function () {
        function UnionMemberUpdateClubCmd_CS() {
        }
        UnionMemberUpdateClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionMemberUpdateClubCmd_CS'; };
        return UnionMemberUpdateClubCmd_CS;
    })();
    Cmd.UnionMemberUpdateClubCmd_CS = UnionMemberUpdateClubCmd_CS;
    /**
     * 移除成员
     */
    var UnionMemberRemoveClubCmd_C = (function () {
        function UnionMemberRemoveClubCmd_C() {
        }
        UnionMemberRemoveClubCmd_C.prototype.GetType = function () { return 'Cmd.UnionMemberRemoveClubCmd_C'; };
        return UnionMemberRemoveClubCmd_C;
    })();
    Cmd.UnionMemberRemoveClubCmd_C = UnionMemberRemoveClubCmd_C;
    /**
     * 联盟牌局数据总和查询
     */
    var UnionStatisticsSumQueryClubCmd_CS = (function () {
        function UnionStatisticsSumQueryClubCmd_CS() {
        }
        UnionStatisticsSumQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionStatisticsSumQueryClubCmd_CS'; };
        return UnionStatisticsSumQueryClubCmd_CS;
    })();
    Cmd.UnionStatisticsSumQueryClubCmd_CS = UnionStatisticsSumQueryClubCmd_CS;
    var ClubRoomData = (function () {
        function ClubRoomData() {
        }
        ClubRoomData.prototype.GetType = function () { return 'Cmd.ClubRoomData'; };
        return ClubRoomData;
    })();
    Cmd.ClubRoomData = ClubRoomData;
    /**
     * 联盟房间数据查询
     */
    var UnionStatisticsRoomQueryClubCmd_CS = (function () {
        function UnionStatisticsRoomQueryClubCmd_CS() {
        }
        UnionStatisticsRoomQueryClubCmd_CS.prototype.GetType = function () { return 'Cmd.UnionStatisticsRoomQueryClubCmd_CS'; };
        return UnionStatisticsRoomQueryClubCmd_CS;
    })();
    Cmd.UnionStatisticsRoomQueryClubCmd_CS = UnionStatisticsRoomQueryClubCmd_CS;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_event.proto
/// <reference path="common.ts" />
/// <reference path="lobby_room.ts" />
/// <reference path="lobby_match.ts" />
var Cmd;
(function (Cmd) {
    /**
     * 赛事状态
     */
    (function (EventInfoEventState) {
        /**
         * 准备状态
         */
        EventInfoEventState[EventInfoEventState["EventInfoEventState_Ready"] = 1] = "EventInfoEventState_Ready";
        /**
         * 游戏中
         */
        EventInfoEventState[EventInfoEventState["EventInfoEventState_Playing"] = 2] = "EventInfoEventState_Playing";
        /**
         * 结算中
         */
        EventInfoEventState[EventInfoEventState["EventInfoEventState_Result"] = 3] = "EventInfoEventState_Result";
        /**
         * 匹配中
         */
        EventInfoEventState[EventInfoEventState["EventInfoEventState_Matching"] = 4] = "EventInfoEventState_Matching";
        /**
         * 淘汰了
         */
        EventInfoEventState[EventInfoEventState["EventInfoEventState_Out"] = 5] = "EventInfoEventState_Out";
    })(Cmd.EventInfoEventState || (Cmd.EventInfoEventState = {}));
    var EventInfoEventState = Cmd.EventInfoEventState;
    /**
     * 请求赛事报名信息
     */
    var EntryInfoEventMatchGroupCmd_C = (function () {
        function EntryInfoEventMatchGroupCmd_C() {
        }
        EntryInfoEventMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.EntryInfoEventMatchGroupCmd_C'; };
        return EntryInfoEventMatchGroupCmd_C;
    })();
    Cmd.EntryInfoEventMatchGroupCmd_C = EntryInfoEventMatchGroupCmd_C;
    /**
     * 请求赛事报名信息
     */
    var EntryInfoEventMatchGroupCmd_S = (function () {
        function EntryInfoEventMatchGroupCmd_S() {
        }
        EntryInfoEventMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.EntryInfoEventMatchGroupCmd_S'; };
        return EntryInfoEventMatchGroupCmd_S;
    })();
    Cmd.EntryInfoEventMatchGroupCmd_S = EntryInfoEventMatchGroupCmd_S;
    /**
     * 赛事信息
     */
    var EventInfoMatchGroupCmd_S = (function () {
        function EventInfoMatchGroupCmd_S() {
        }
        EventInfoMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.EventInfoMatchGroupCmd_S'; };
        return EventInfoMatchGroupCmd_S;
    })();
    Cmd.EventInfoMatchGroupCmd_S = EventInfoMatchGroupCmd_S;
    /**
     * 申请报名
     */
    var EntryEventMatchGroupCmd_C = (function () {
        function EntryEventMatchGroupCmd_C() {
        }
        EntryEventMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.EntryEventMatchGroupCmd_C'; };
        return EntryEventMatchGroupCmd_C;
    })();
    Cmd.EntryEventMatchGroupCmd_C = EntryEventMatchGroupCmd_C;
    /**
     * 退出报名
     */
    var LeaveEventMatchGroupCmd_C = (function () {
        function LeaveEventMatchGroupCmd_C() {
        }
        LeaveEventMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.LeaveEventMatchGroupCmd_C'; };
        return LeaveEventMatchGroupCmd_C;
    })();
    Cmd.LeaveEventMatchGroupCmd_C = LeaveEventMatchGroupCmd_C;
    /**
     * 刷新当前人数和名次
     */
    var MyOrderEventMatchGroupCmd_S = (function () {
        function MyOrderEventMatchGroupCmd_S() {
        }
        MyOrderEventMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.MyOrderEventMatchGroupCmd_S'; };
        return MyOrderEventMatchGroupCmd_S;
    })();
    Cmd.MyOrderEventMatchGroupCmd_S = MyOrderEventMatchGroupCmd_S;
    /**
     * 弃权
     */
    var GiveUpEventMatchGroupCmd_C = (function () {
        function GiveUpEventMatchGroupCmd_C() {
        }
        GiveUpEventMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.GiveUpEventMatchGroupCmd_C'; };
        return GiveUpEventMatchGroupCmd_C;
    })();
    Cmd.GiveUpEventMatchGroupCmd_C = GiveUpEventMatchGroupCmd_C;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_exchange.proto
/// <reference path="common.ts" />
var Cmd;
(function (Cmd) {
    /**
     * 转账
     */
    var ExchangeItem = (function () {
        function ExchangeItem() {
        }
        ExchangeItem.prototype.GetType = function () { return 'Cmd.ExchangeItem'; };
        return ExchangeItem;
    })();
    Cmd.ExchangeItem = ExchangeItem;
    /**
     * 交易key生成
     */
    var ExchangeKeyGet_CS = (function () {
        function ExchangeKeyGet_CS() {
        }
        ExchangeKeyGet_CS.prototype.GetType = function () { return 'Cmd.ExchangeKeyGet_CS'; };
        return ExchangeKeyGet_CS;
    })();
    Cmd.ExchangeKeyGet_CS = ExchangeKeyGet_CS;
    /**
     * 领取交易筹码
     */
    var ExchangeChipsReceive_CS = (function () {
        function ExchangeChipsReceive_CS() {
        }
        ExchangeChipsReceive_CS.prototype.GetType = function () { return 'Cmd.ExchangeChipsReceive_CS'; };
        return ExchangeChipsReceive_CS;
    })();
    Cmd.ExchangeChipsReceive_CS = ExchangeChipsReceive_CS;
    var RedPaperInfo = (function () {
        function RedPaperInfo() {
        }
        RedPaperInfo.prototype.GetType = function () { return 'Cmd.RedPaperInfo'; };
        return RedPaperInfo;
    })();
    Cmd.RedPaperInfo = RedPaperInfo;
    /**
     * 收发红包
     */
    var ExchangeRecordGet_CS = (function () {
        function ExchangeRecordGet_CS() {
        }
        ExchangeRecordGet_CS.prototype.GetType = function () { return 'Cmd.ExchangeRecordGet_CS'; };
        return ExchangeRecordGet_CS;
    })();
    Cmd.ExchangeRecordGet_CS = ExchangeRecordGet_CS;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_history.proto
/// <reference path="common.ts" />
var Cmd;
(function (Cmd) {
    /**
     * 各个玩家战绩数据
     */
    var UserGameHistory = (function () {
        function UserGameHistory() {
        }
        UserGameHistory.prototype.GetType = function () { return 'Cmd.UserGameHistory'; };
        return UserGameHistory;
    })();
    Cmd.UserGameHistory = UserGameHistory;
    /**
     * 比赛场战绩数据
     */
    var MatchGameHistory = (function () {
        function MatchGameHistory() {
        }
        MatchGameHistory.prototype.GetType = function () { return 'Cmd.MatchGameHistory'; };
        return MatchGameHistory;
    })();
    Cmd.MatchGameHistory = MatchGameHistory;
    /**
     * 战绩数据
     */
    var GameHistory = (function () {
        function GameHistory() {
        }
        GameHistory.prototype.GetType = function () { return 'Cmd.GameHistory'; };
        return GameHistory;
    })();
    Cmd.GameHistory = GameHistory;
    /**
     * 详细战绩数据
     */
    var GameHistoryDetail = (function () {
        function GameHistoryDetail() {
        }
        GameHistoryDetail.prototype.GetType = function () { return 'Cmd.GameHistoryDetail'; };
        return GameHistoryDetail;
    })();
    Cmd.GameHistoryDetail = GameHistoryDetail;
    /**
     * 战绩统计数据获取
     */
    var GetGameDataHistoryCmd_C = (function () {
        function GetGameDataHistoryCmd_C() {
        }
        GetGameDataHistoryCmd_C.prototype.GetType = function () { return 'Cmd.GetGameDataHistoryCmd_C'; };
        return GetGameDataHistoryCmd_C;
    })();
    Cmd.GetGameDataHistoryCmd_C = GetGameDataHistoryCmd_C;
    var GetGameDataHistoryCmd_S = (function () {
        function GetGameDataHistoryCmd_S() {
        }
        GetGameDataHistoryCmd_S.prototype.GetType = function () { return 'Cmd.GetGameDataHistoryCmd_S'; };
        return GetGameDataHistoryCmd_S;
    })();
    Cmd.GetGameDataHistoryCmd_S = GetGameDataHistoryCmd_S;
    /**
     * 获取指定 globalRoomId 的 所有具体牌局详细数据
     */
    var GetGameDetailHistoryCmd_C = (function () {
        function GetGameDetailHistoryCmd_C() {
        }
        GetGameDetailHistoryCmd_C.prototype.GetType = function () { return 'Cmd.GetGameDetailHistoryCmd_C'; };
        return GetGameDetailHistoryCmd_C;
    })();
    Cmd.GetGameDetailHistoryCmd_C = GetGameDetailHistoryCmd_C;
    var GetGameDetailHistoryCmd_S = (function () {
        function GetGameDetailHistoryCmd_S() {
        }
        GetGameDetailHistoryCmd_S.prototype.GetType = function () { return 'Cmd.GetGameDetailHistoryCmd_S'; };
        return GetGameDetailHistoryCmd_S;
    })();
    Cmd.GetGameDetailHistoryCmd_S = GetGameDetailHistoryCmd_S;
    /**
     * 房间日志
     */
    var RoomLogHistory = (function () {
        function RoomLogHistory() {
        }
        RoomLogHistory.prototype.GetType = function () { return 'Cmd.RoomLogHistory'; };
        return RoomLogHistory;
    })();
    Cmd.RoomLogHistory = RoomLogHistory;
    /**
     * 请求房间日志信息
     */
    var GetRoomLogHistoryCmd_C = (function () {
        function GetRoomLogHistoryCmd_C() {
        }
        GetRoomLogHistoryCmd_C.prototype.GetType = function () { return 'Cmd.GetRoomLogHistoryCmd_C'; };
        return GetRoomLogHistoryCmd_C;
    })();
    Cmd.GetRoomLogHistoryCmd_C = GetRoomLogHistoryCmd_C;
    /**
     * 返回请求房间日志信息
     */
    var GetRoomLogHistoryCmd_S = (function () {
        function GetRoomLogHistoryCmd_S() {
        }
        GetRoomLogHistoryCmd_S.prototype.GetType = function () { return 'Cmd.GetRoomLogHistoryCmd_S'; };
        return GetRoomLogHistoryCmd_S;
    })();
    Cmd.GetRoomLogHistoryCmd_S = GetRoomLogHistoryCmd_S;
    /**
     * 获取对赌场战绩
     */
    var GetGambleDataHistoryCmd_C = (function () {
        function GetGambleDataHistoryCmd_C() {
        }
        GetGambleDataHistoryCmd_C.prototype.GetType = function () { return 'Cmd.GetGambleDataHistoryCmd_C'; };
        return GetGambleDataHistoryCmd_C;
    })();
    Cmd.GetGambleDataHistoryCmd_C = GetGambleDataHistoryCmd_C;
    var GetGambleDataHistoryCmd_S = (function () {
        function GetGambleDataHistoryCmd_S() {
        }
        GetGambleDataHistoryCmd_S.prototype.GetType = function () { return 'Cmd.GetGambleDataHistoryCmd_S'; };
        return GetGambleDataHistoryCmd_S;
    })();
    Cmd.GetGambleDataHistoryCmd_S = GetGambleDataHistoryCmd_S;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_match.proto
/// <reference path="common.ts" />
/// <reference path="lobby_room.ts" />
var Cmd;
(function (Cmd) {
    (function (MatchGroupType) {
        MatchGroupType[MatchGroupType["MatchGroupType_None"] = 0] = "MatchGroupType_None";
        MatchGroupType[MatchGroupType["MatchGroupType_TaoTai"] = 1] = "MatchGroupType_TaoTai";
    })(Cmd.MatchGroupType || (Cmd.MatchGroupType = {}));
    var MatchGroupType = Cmd.MatchGroupType;
    /**
     *  匹配号相关协议--------------------------------------------------------------------------------------------
     *  请求创建匹配组
     */
    var CreateMatchGroupCmd_C = (function () {
        function CreateMatchGroupCmd_C() {
        }
        CreateMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.CreateMatchGroupCmd_C'; };
        return CreateMatchGroupCmd_C;
    })();
    Cmd.CreateMatchGroupCmd_C = CreateMatchGroupCmd_C;
    /**
     * 请求转换俱乐部基金到金币
     */
    var MatchPoint2GoldMatchGroupCmd_C = (function () {
        function MatchPoint2GoldMatchGroupCmd_C() {
        }
        MatchPoint2GoldMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.MatchPoint2GoldMatchGroupCmd_C'; };
        return MatchPoint2GoldMatchGroupCmd_C;
    })();
    Cmd.MatchPoint2GoldMatchGroupCmd_C = MatchPoint2GoldMatchGroupCmd_C;
    /**
     * 给匹配号创建个新房间,茶馆用,等待别人选座加入
     */
    var CreateRoomMatchGroupCmd_C = (function () {
        function CreateRoomMatchGroupCmd_C() {
        }
        CreateRoomMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.CreateRoomMatchGroupCmd_C'; };
        return CreateRoomMatchGroupCmd_C;
    })();
    Cmd.CreateRoomMatchGroupCmd_C = CreateRoomMatchGroupCmd_C;
    /**
     * 删除匹配号里的房间
     */
    var DeleteRoomMatchGroupCmd_C = (function () {
        function DeleteRoomMatchGroupCmd_C() {
        }
        DeleteRoomMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.DeleteRoomMatchGroupCmd_C'; };
        return DeleteRoomMatchGroupCmd_C;
    })();
    Cmd.DeleteRoomMatchGroupCmd_C = DeleteRoomMatchGroupCmd_C;
    /**
     * 设置玩家匹配分
     */
    var ChangeMatchPointMatchGroupCmd_CS = (function () {
        function ChangeMatchPointMatchGroupCmd_CS() {
        }
        ChangeMatchPointMatchGroupCmd_CS.prototype.GetType = function () { return 'Cmd.ChangeMatchPointMatchGroupCmd_CS'; };
        return ChangeMatchPointMatchGroupCmd_CS;
    })();
    Cmd.ChangeMatchPointMatchGroupCmd_CS = ChangeMatchPointMatchGroupCmd_CS;
    /**
     * 设置玩家备注
     */
    var ChangeMatchDescMatchGroupCmd_CS = (function () {
        function ChangeMatchDescMatchGroupCmd_CS() {
        }
        ChangeMatchDescMatchGroupCmd_CS.prototype.GetType = function () { return 'Cmd.ChangeMatchDescMatchGroupCmd_CS'; };
        return ChangeMatchDescMatchGroupCmd_CS;
    })();
    Cmd.ChangeMatchDescMatchGroupCmd_CS = ChangeMatchDescMatchGroupCmd_CS;
    /**
     * 改变匹配号属性
     */
    var RequestChangeMatchGroupCmd_C = (function () {
        function RequestChangeMatchGroupCmd_C() {
        }
        RequestChangeMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestChangeMatchGroupCmd_C'; };
        return RequestChangeMatchGroupCmd_C;
    })();
    Cmd.RequestChangeMatchGroupCmd_C = RequestChangeMatchGroupCmd_C;
    /**
     * 改变匹配号属性
     */
    var ChangeMatchGroupCmd_C = (function () {
        function ChangeMatchGroupCmd_C() {
        }
        ChangeMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.ChangeMatchGroupCmd_C'; };
        return ChangeMatchGroupCmd_C;
    })();
    Cmd.ChangeMatchGroupCmd_C = ChangeMatchGroupCmd_C;
    /**
     * 改变匹配号属性
     */
    var ChangeMatchGroupCmd_S = (function () {
        function ChangeMatchGroupCmd_S() {
        }
        ChangeMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.ChangeMatchGroupCmd_S'; };
        return ChangeMatchGroupCmd_S;
    })();
    Cmd.ChangeMatchGroupCmd_S = ChangeMatchGroupCmd_S;
    /**
     * 服务器请求绑定代理,弹窗
     */
    var RequestBindAgentMatchGroupCmd_S = (function () {
        function RequestBindAgentMatchGroupCmd_S() {
        }
        RequestBindAgentMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.RequestBindAgentMatchGroupCmd_S'; };
        return RequestBindAgentMatchGroupCmd_S;
    })();
    Cmd.RequestBindAgentMatchGroupCmd_S = RequestBindAgentMatchGroupCmd_S;
    /**
     * 请求绑定代理
     */
    var RequestBindAgentMatchGroupCmd_C = (function () {
        function RequestBindAgentMatchGroupCmd_C() {
        }
        RequestBindAgentMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestBindAgentMatchGroupCmd_C'; };
        return RequestBindAgentMatchGroupCmd_C;
    })();
    Cmd.RequestBindAgentMatchGroupCmd_C = RequestBindAgentMatchGroupCmd_C;
    /**
     * 请求参与玩家的列表
     */
    var PlayedListMatchGroupCmd_C = (function () {
        function PlayedListMatchGroupCmd_C() {
        }
        PlayedListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.PlayedListMatchGroupCmd_C'; };
        return PlayedListMatchGroupCmd_C;
    })();
    Cmd.PlayedListMatchGroupCmd_C = PlayedListMatchGroupCmd_C;
    /**
     * 返回参与玩家的列表,里面包括了玩家的输赢清空,搞活动用
     */
    var PlayedListMatchGroupCmd_S = (function () {
        function PlayedListMatchGroupCmd_S() {
        }
        PlayedListMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.PlayedListMatchGroupCmd_S'; };
        return PlayedListMatchGroupCmd_S;
    })();
    Cmd.PlayedListMatchGroupCmd_S = PlayedListMatchGroupCmd_S;
    /**
     * 清空与玩家的列表 返回PlayedListMatchGroupCmd_S
     */
    var ClearPlayedListMatchGroupCmd_C = (function () {
        function ClearPlayedListMatchGroupCmd_C() {
        }
        ClearPlayedListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.ClearPlayedListMatchGroupCmd_C'; };
        return ClearPlayedListMatchGroupCmd_C;
    })();
    Cmd.ClearPlayedListMatchGroupCmd_C = ClearPlayedListMatchGroupCmd_C;
    /**
     * 楼层基本信息
     */
    var FloorInfo = (function () {
        function FloorInfo() {
        }
        FloorInfo.prototype.GetType = function () { return 'Cmd.FloorInfo'; };
        return FloorInfo;
    })();
    Cmd.FloorInfo = FloorInfo;
    /**
     * 匹配组信息
     */
    var MathGroup = (function () {
        function MathGroup() {
        }
        MathGroup.prototype.GetType = function () { return 'Cmd.MathGroup'; };
        return MathGroup;
    })();
    Cmd.MathGroup = MathGroup;
    /**
     * 请求提取俱乐部税收,每次都是一次性全部提取
     */
    var GetTaxMatchGroupCmd_C = (function () {
        function GetTaxMatchGroupCmd_C() {
        }
        GetTaxMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.GetTaxMatchGroupCmd_C'; };
        return GetTaxMatchGroupCmd_C;
    })();
    Cmd.GetTaxMatchGroupCmd_C = GetTaxMatchGroupCmd_C;
    /**
     * 设置俱乐部税收
     */
    var SetTaxMatchGroupCmd_S = (function () {
        function SetTaxMatchGroupCmd_S() {
        }
        SetTaxMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.SetTaxMatchGroupCmd_S'; };
        return SetTaxMatchGroupCmd_S;
    })();
    Cmd.SetTaxMatchGroupCmd_S = SetTaxMatchGroupCmd_S;
    /**
     * 请求等待列表
     */
    var WaitUserListMatchGroupCmd_C = (function () {
        function WaitUserListMatchGroupCmd_C() {
        }
        WaitUserListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.WaitUserListMatchGroupCmd_C'; };
        return WaitUserListMatchGroupCmd_C;
    })();
    Cmd.WaitUserListMatchGroupCmd_C = WaitUserListMatchGroupCmd_C;
    /**
     * 请求等待列表
     */
    var WaitUserListMatchGroupCmd_S = (function () {
        function WaitUserListMatchGroupCmd_S() {
        }
        WaitUserListMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.WaitUserListMatchGroupCmd_S'; };
        return WaitUserListMatchGroupCmd_S;
    })();
    Cmd.WaitUserListMatchGroupCmd_S = WaitUserListMatchGroupCmd_S;
    /**
     * 匹配开启倒计时
     */
    var StartCountDownMatchGroupCmd_Brd = (function () {
        function StartCountDownMatchGroupCmd_Brd() {
        }
        StartCountDownMatchGroupCmd_Brd.prototype.GetType = function () { return 'Cmd.StartCountDownMatchGroupCmd_Brd'; };
        return StartCountDownMatchGroupCmd_Brd;
    })();
    Cmd.StartCountDownMatchGroupCmd_Brd = StartCountDownMatchGroupCmd_Brd;
    /**
     * 创建匹配组返回
     */
    var CreateMatchGroupCmd_S = (function () {
        function CreateMatchGroupCmd_S() {
        }
        CreateMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.CreateMatchGroupCmd_S'; };
        return CreateMatchGroupCmd_S;
    })();
    Cmd.CreateMatchGroupCmd_S = CreateMatchGroupCmd_S;
    /**
     * 请求自己的所有匹配号,并且选中其中一个
     */
    var RequestMatchGroupCmd_C = (function () {
        function RequestMatchGroupCmd_C() {
        }
        RequestMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestMatchGroupCmd_C'; };
        return RequestMatchGroupCmd_C;
    })();
    Cmd.RequestMatchGroupCmd_C = RequestMatchGroupCmd_C;
    /**
     * 返回自己的所有匹配号
     */
    var ReturnMatchGroupCmd_S = (function () {
        function ReturnMatchGroupCmd_S() {
        }
        ReturnMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.ReturnMatchGroupCmd_S'; };
        return ReturnMatchGroupCmd_S;
    })();
    Cmd.ReturnMatchGroupCmd_S = ReturnMatchGroupCmd_S;
    /**
     * 请求黑白名单
     */
    var RequestMemberInfoMatchGroupCmd_C = (function () {
        function RequestMemberInfoMatchGroupCmd_C() {
        }
        RequestMemberInfoMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestMemberInfoMatchGroupCmd_C'; };
        return RequestMemberInfoMatchGroupCmd_C;
    })();
    Cmd.RequestMemberInfoMatchGroupCmd_C = RequestMemberInfoMatchGroupCmd_C;
    /**
     * 返回黑白名单
     */
    var ReturnMemberInfoMatchGroupCmd_S = (function () {
        function ReturnMemberInfoMatchGroupCmd_S() {
        }
        ReturnMemberInfoMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.ReturnMemberInfoMatchGroupCmd_S'; };
        return ReturnMemberInfoMatchGroupCmd_S;
    })();
    Cmd.ReturnMemberInfoMatchGroupCmd_S = ReturnMemberInfoMatchGroupCmd_S;
    /**
     * 请求终止匹配号
     */
    var OperateMatchGroupCmd_C = (function () {
        function OperateMatchGroupCmd_C() {
        }
        OperateMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.OperateMatchGroupCmd_C'; };
        return OperateMatchGroupCmd_C;
    })();
    Cmd.OperateMatchGroupCmd_C = OperateMatchGroupCmd_C;
    /**
     * 请求删除匹配号
     */
    var RequestDeleteMatchGroupCmd_C = (function () {
        function RequestDeleteMatchGroupCmd_C() {
        }
        RequestDeleteMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestDeleteMatchGroupCmd_C'; };
        return RequestDeleteMatchGroupCmd_C;
    })();
    Cmd.RequestDeleteMatchGroupCmd_C = RequestDeleteMatchGroupCmd_C;
    /**
     * 请求删除某匹配号战绩
     */
    var RequestDelHistoryMatchGroupCmd_C = (function () {
        function RequestDelHistoryMatchGroupCmd_C() {
        }
        RequestDelHistoryMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestDelHistoryMatchGroupCmd_C'; };
        return RequestDelHistoryMatchGroupCmd_C;
    })();
    Cmd.RequestDelHistoryMatchGroupCmd_C = RequestDelHistoryMatchGroupCmd_C;
    /**
     * 回应删除某匹配号战绩
     */
    var ReturnDelHistoryMatchGroupCmd_S = (function () {
        function ReturnDelHistoryMatchGroupCmd_S() {
        }
        ReturnDelHistoryMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.ReturnDelHistoryMatchGroupCmd_S'; };
        return ReturnDelHistoryMatchGroupCmd_S;
    })();
    Cmd.ReturnDelHistoryMatchGroupCmd_S = ReturnDelHistoryMatchGroupCmd_S;
    /**
     * 申请游客模式切换
     */
    var ChangeMatchTypeMatchGroupCmd_C = (function () {
        function ChangeMatchTypeMatchGroupCmd_C() {
        }
        ChangeMatchTypeMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.ChangeMatchTypeMatchGroupCmd_C'; };
        return ChangeMatchTypeMatchGroupCmd_C;
    })();
    Cmd.ChangeMatchTypeMatchGroupCmd_C = ChangeMatchTypeMatchGroupCmd_C;
    /**
     * 玩家主动申请加入白名单
     */
    var RequestJoinMemberMatchGroupCmd_C = (function () {
        function RequestJoinMemberMatchGroupCmd_C() {
        }
        RequestJoinMemberMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestJoinMemberMatchGroupCmd_C'; };
        return RequestJoinMemberMatchGroupCmd_C;
    })();
    Cmd.RequestJoinMemberMatchGroupCmd_C = RequestJoinMemberMatchGroupCmd_C;
    /**
     * 申请白名单消息列表,玩家请求后主动推给匹配主
     */
    var JoinMemberListMatchGroupCmd_S = (function () {
        function JoinMemberListMatchGroupCmd_S() {
        }
        JoinMemberListMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.JoinMemberListMatchGroupCmd_S'; };
        return JoinMemberListMatchGroupCmd_S;
    })();
    Cmd.JoinMemberListMatchGroupCmd_S = JoinMemberListMatchGroupCmd_S;
    /**
     * 有玩家申请加入时给匹配主一个弹窗,返回ReplyJoinMemberListMatchGroupCmd_C
     */
    var RequestJoinMemberMatchGroupCmd_S = (function () {
        function RequestJoinMemberMatchGroupCmd_S() {
        }
        RequestJoinMemberMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.RequestJoinMemberMatchGroupCmd_S'; };
        return RequestJoinMemberMatchGroupCmd_S;
    })();
    Cmd.RequestJoinMemberMatchGroupCmd_S = RequestJoinMemberMatchGroupCmd_S;
    /**
     * 匹配主,回应申请白名单消息列表
     */
    var ReplyJoinMemberListMatchGroupCmd_C = (function () {
        function ReplyJoinMemberListMatchGroupCmd_C() {
        }
        ReplyJoinMemberListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.ReplyJoinMemberListMatchGroupCmd_C'; };
        return ReplyJoinMemberListMatchGroupCmd_C;
    })();
    Cmd.ReplyJoinMemberListMatchGroupCmd_C = ReplyJoinMemberListMatchGroupCmd_C;
    /**
     * 匹配主,请求黑白名单操作
     */
    var OperateMemberListMatchGroupCmd_C = (function () {
        function OperateMemberListMatchGroupCmd_C() {
        }
        OperateMemberListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.OperateMemberListMatchGroupCmd_C'; };
        return OperateMemberListMatchGroupCmd_C;
    })();
    Cmd.OperateMemberListMatchGroupCmd_C = OperateMemberListMatchGroupCmd_C;
    /**
     * 匹配主,请求黄名单操作
     */
    var SetVipMemberListMatchGroupCmd_C = (function () {
        function SetVipMemberListMatchGroupCmd_C() {
        }
        SetVipMemberListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.SetVipMemberListMatchGroupCmd_C'; };
        return SetVipMemberListMatchGroupCmd_C;
    })();
    Cmd.SetVipMemberListMatchGroupCmd_C = SetVipMemberListMatchGroupCmd_C;
    /**
     * 匹配主,请求黄名单操作
     */
    var OperateYellowMemberListMatchGroupCmd_C = (function () {
        function OperateYellowMemberListMatchGroupCmd_C() {
        }
        OperateYellowMemberListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.OperateYellowMemberListMatchGroupCmd_C'; };
        return OperateYellowMemberListMatchGroupCmd_C;
    })();
    Cmd.OperateYellowMemberListMatchGroupCmd_C = OperateYellowMemberListMatchGroupCmd_C;
    /**
     * 请求黄名单
     */
    var RequestYellowMemberInfoMatchGroupCmd_C = (function () {
        function RequestYellowMemberInfoMatchGroupCmd_C() {
        }
        RequestYellowMemberInfoMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestYellowMemberInfoMatchGroupCmd_C'; };
        return RequestYellowMemberInfoMatchGroupCmd_C;
    })();
    Cmd.RequestYellowMemberInfoMatchGroupCmd_C = RequestYellowMemberInfoMatchGroupCmd_C;
    var YellowMemberInfo = (function () {
        function YellowMemberInfo() {
        }
        YellowMemberInfo.prototype.GetType = function () { return 'Cmd.YellowMemberInfo'; };
        return YellowMemberInfo;
    })();
    Cmd.YellowMemberInfo = YellowMemberInfo;
    /**
     * 返回黄名单
     */
    var ReturnYellowMemberInfoMatchGroupCmd_S = (function () {
        function ReturnYellowMemberInfoMatchGroupCmd_S() {
        }
        ReturnYellowMemberInfoMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.ReturnYellowMemberInfoMatchGroupCmd_S'; };
        return ReturnYellowMemberInfoMatchGroupCmd_S;
    })();
    Cmd.ReturnYellowMemberInfoMatchGroupCmd_S = ReturnYellowMemberInfoMatchGroupCmd_S;
    /**
     * 请求离开匹配组(深圳这边其实已经屏蔽掉了匹配等待的时间，所以不会出现这个协议)
     */
    var LeaveMatchGroupCmd_C = (function () {
        function LeaveMatchGroupCmd_C() {
        }
        LeaveMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.LeaveMatchGroupCmd_C'; };
        return LeaveMatchGroupCmd_C;
    })();
    Cmd.LeaveMatchGroupCmd_C = LeaveMatchGroupCmd_C;
    /**
     * 离开匹配组返回
     */
    var LeaveMatchGroupCmd_S = (function () {
        function LeaveMatchGroupCmd_S() {
        }
        LeaveMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.LeaveMatchGroupCmd_S'; };
        return LeaveMatchGroupCmd_S;
    })();
    Cmd.LeaveMatchGroupCmd_S = LeaveMatchGroupCmd_S;
    /**
     * 离开匹配组返回广播
     */
    var LeaveMatchGroupCmd_Brd = (function () {
        function LeaveMatchGroupCmd_Brd() {
        }
        LeaveMatchGroupCmd_Brd.prototype.GetType = function () { return 'Cmd.LeaveMatchGroupCmd_Brd'; };
        return LeaveMatchGroupCmd_Brd;
    })();
    Cmd.LeaveMatchGroupCmd_Brd = LeaveMatchGroupCmd_Brd;
    /**
     * 请求离开俱乐部(这个离开 实际上是指 玩家不想存在于该俱乐部的黑白黄名单中 感觉一股深深的不靠谱)
     */
    var LeaveMatchGroup2Cmd_C = (function () {
        function LeaveMatchGroup2Cmd_C() {
        }
        LeaveMatchGroup2Cmd_C.prototype.GetType = function () { return 'Cmd.LeaveMatchGroup2Cmd_C'; };
        return LeaveMatchGroup2Cmd_C;
    })();
    Cmd.LeaveMatchGroup2Cmd_C = LeaveMatchGroup2Cmd_C;
    /**
     * 离开匹配组返回
     */
    var LeaveMatchGroup2Cmd_S = (function () {
        function LeaveMatchGroup2Cmd_S() {
        }
        LeaveMatchGroup2Cmd_S.prototype.GetType = function () { return 'Cmd.LeaveMatchGroup2Cmd_S'; };
        return LeaveMatchGroup2Cmd_S;
    })();
    Cmd.LeaveMatchGroup2Cmd_S = LeaveMatchGroup2Cmd_S;
    /**
     * 普通玩家请求茶馆里的房间
     */
    var RequestRoomMatchGroupCmd_C = (function () {
        function RequestRoomMatchGroupCmd_C() {
        }
        RequestRoomMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestRoomMatchGroupCmd_C'; };
        return RequestRoomMatchGroupCmd_C;
    })();
    Cmd.RequestRoomMatchGroupCmd_C = RequestRoomMatchGroupCmd_C;
    /**
     * 清除当前选中的匹配号,茶馆用,这样可以兼容冗余通知
     */
    var ClearCurMatchGroupCmd_C = (function () {
        function ClearCurMatchGroupCmd_C() {
        }
        ClearCurMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.ClearCurMatchGroupCmd_C'; };
        return ClearCurMatchGroupCmd_C;
    })();
    Cmd.ClearCurMatchGroupCmd_C = ClearCurMatchGroupCmd_C;
    /**
     * 茶馆里的房间结束后需要通知当时大厅的所有人
     */
    var RoomDestroyMatchGroupCmd_S = (function () {
        function RoomDestroyMatchGroupCmd_S() {
        }
        RoomDestroyMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.RoomDestroyMatchGroupCmd_S'; };
        return RoomDestroyMatchGroupCmd_S;
    })();
    Cmd.RoomDestroyMatchGroupCmd_S = RoomDestroyMatchGroupCmd_S;
    /**
     * 茶馆里的房间状态变化
     */
    var RoomStateMatchGroupCmd_S = (function () {
        function RoomStateMatchGroupCmd_S() {
        }
        RoomStateMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.RoomStateMatchGroupCmd_S'; };
        return RoomStateMatchGroupCmd_S;
    })();
    Cmd.RoomStateMatchGroupCmd_S = RoomStateMatchGroupCmd_S;
    /**
     * 普通玩家请求茶馆里的房间返回
     */
    var ReturnRoomMatchGroupCmd_S = (function () {
        function ReturnRoomMatchGroupCmd_S() {
        }
        ReturnRoomMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.ReturnRoomMatchGroupCmd_S'; };
        return ReturnRoomMatchGroupCmd_S;
    })();
    Cmd.ReturnRoomMatchGroupCmd_S = ReturnRoomMatchGroupCmd_S;
    /**
     * 请求进入匹配组
     */
    var EnterMatchGroupCmd_C = (function () {
        function EnterMatchGroupCmd_C() {
        }
        EnterMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.EnterMatchGroupCmd_C'; };
        return EnterMatchGroupCmd_C;
    })();
    Cmd.EnterMatchGroupCmd_C = EnterMatchGroupCmd_C;
    /**
     * 请求进入匹配组返回
     */
    var EnterMatchGroupCmd_S = (function () {
        function EnterMatchGroupCmd_S() {
        }
        EnterMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.EnterMatchGroupCmd_S'; };
        return EnterMatchGroupCmd_S;
    })();
    Cmd.EnterMatchGroupCmd_S = EnterMatchGroupCmd_S;
    /**
     * 广播匹配组成员
     */
    var EnterMatchGroupCmd_Brd = (function () {
        function EnterMatchGroupCmd_Brd() {
        }
        EnterMatchGroupCmd_Brd.prototype.GetType = function () { return 'Cmd.EnterMatchGroupCmd_Brd'; };
        return EnterMatchGroupCmd_Brd;
    })();
    Cmd.EnterMatchGroupCmd_Brd = EnterMatchGroupCmd_Brd;
    /**
     * 匹配组信息
     */
    var MatchGroupInfo = (function () {
        function MatchGroupInfo() {
        }
        MatchGroupInfo.prototype.GetType = function () { return 'Cmd.MatchGroupInfo'; };
        return MatchGroupInfo;
    })();
    Cmd.MatchGroupInfo = MatchGroupInfo;
    /**
     * 请求所有加入过的俱乐部
     */
    var HistoryClubListMatchGroupCmd_C = (function () {
        function HistoryClubListMatchGroupCmd_C() {
        }
        HistoryClubListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.HistoryClubListMatchGroupCmd_C'; };
        return HistoryClubListMatchGroupCmd_C;
    })();
    Cmd.HistoryClubListMatchGroupCmd_C = HistoryClubListMatchGroupCmd_C;
    /**
     * 返回进入过的历史匹配组列表
     */
    var HistoryClubListMatchGroupCmd_S = (function () {
        function HistoryClubListMatchGroupCmd_S() {
        }
        HistoryClubListMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.HistoryClubListMatchGroupCmd_S'; };
        return HistoryClubListMatchGroupCmd_S;
    })();
    Cmd.HistoryClubListMatchGroupCmd_S = HistoryClubListMatchGroupCmd_S;
    /**
     * 请求删除进入过的历史匹配组列表
     */
    var DelHistoryMatchIdMatchGroupCmd_C = (function () {
        function DelHistoryMatchIdMatchGroupCmd_C() {
        }
        DelHistoryMatchIdMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.DelHistoryMatchIdMatchGroupCmd_C'; };
        return DelHistoryMatchIdMatchGroupCmd_C;
    })();
    Cmd.DelHistoryMatchIdMatchGroupCmd_C = DelHistoryMatchIdMatchGroupCmd_C;
    /**
     * 请求进入过的历史匹配组列表
     */
    var HistoryMatchIdListMatchGroupCmd_C = (function () {
        function HistoryMatchIdListMatchGroupCmd_C() {
        }
        HistoryMatchIdListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.HistoryMatchIdListMatchGroupCmd_C'; };
        return HistoryMatchIdListMatchGroupCmd_C;
    })();
    Cmd.HistoryMatchIdListMatchGroupCmd_C = HistoryMatchIdListMatchGroupCmd_C;
    /**
     * 返回进入过的历史匹配组列表
     */
    var HistoryMatchIdListMatchGroupCmd_S = (function () {
        function HistoryMatchIdListMatchGroupCmd_S() {
        }
        HistoryMatchIdListMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.HistoryMatchIdListMatchGroupCmd_S'; };
        return HistoryMatchIdListMatchGroupCmd_S;
    })();
    Cmd.HistoryMatchIdListMatchGroupCmd_S = HistoryMatchIdListMatchGroupCmd_S;
    /**
     * 请求添加匹配组列表
     */
    var RequestAddPublicMatchIdMatchGroupCmd_C = (function () {
        function RequestAddPublicMatchIdMatchGroupCmd_C() {
        }
        RequestAddPublicMatchIdMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestAddPublicMatchIdMatchGroupCmd_C'; };
        return RequestAddPublicMatchIdMatchGroupCmd_C;
    })();
    Cmd.RequestAddPublicMatchIdMatchGroupCmd_C = RequestAddPublicMatchIdMatchGroupCmd_C;
    /**
     * 请求删除匹配组列表
     */
    var RequestRemovePublicMatchIdMatchGroupCmd_C = (function () {
        function RequestRemovePublicMatchIdMatchGroupCmd_C() {
        }
        RequestRemovePublicMatchIdMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestRemovePublicMatchIdMatchGroupCmd_C'; };
        return RequestRemovePublicMatchIdMatchGroupCmd_C;
    })();
    Cmd.RequestRemovePublicMatchIdMatchGroupCmd_C = RequestRemovePublicMatchIdMatchGroupCmd_C;
    /**
     * 请求官方匹配组列表
     */
    var PublicMatchIdListMatchGroupCmd_C = (function () {
        function PublicMatchIdListMatchGroupCmd_C() {
        }
        PublicMatchIdListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.PublicMatchIdListMatchGroupCmd_C'; };
        return PublicMatchIdListMatchGroupCmd_C;
    })();
    Cmd.PublicMatchIdListMatchGroupCmd_C = PublicMatchIdListMatchGroupCmd_C;
    /**
     * 官方匹配组列表
     */
    var PublicMatchIdListMatchGroupCmd_S = (function () {
        function PublicMatchIdListMatchGroupCmd_S() {
        }
        PublicMatchIdListMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.PublicMatchIdListMatchGroupCmd_S'; };
        return PublicMatchIdListMatchGroupCmd_S;
    })();
    Cmd.PublicMatchIdListMatchGroupCmd_S = PublicMatchIdListMatchGroupCmd_S;
    /**
     * 请求添加冠名赛--等待未完成
     */
    var RequestAddOfficialMatchIdMatchGroupCmd_C = (function () {
        function RequestAddOfficialMatchIdMatchGroupCmd_C() {
        }
        RequestAddOfficialMatchIdMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.RequestAddOfficialMatchIdMatchGroupCmd_C'; };
        return RequestAddOfficialMatchIdMatchGroupCmd_C;
    })();
    Cmd.RequestAddOfficialMatchIdMatchGroupCmd_C = RequestAddOfficialMatchIdMatchGroupCmd_C;
    /**
     * 请求冠名赛列表
     */
    var OfficialMatchIdListMatchGroupCmd_C = (function () {
        function OfficialMatchIdListMatchGroupCmd_C() {
        }
        OfficialMatchIdListMatchGroupCmd_C.prototype.GetType = function () { return 'Cmd.OfficialMatchIdListMatchGroupCmd_C'; };
        return OfficialMatchIdListMatchGroupCmd_C;
    })();
    Cmd.OfficialMatchIdListMatchGroupCmd_C = OfficialMatchIdListMatchGroupCmd_C;
    /**
     * 冠名赛列表
     */
    var OfficialMatchIdListMatchGroupCmd_S = (function () {
        function OfficialMatchIdListMatchGroupCmd_S() {
        }
        OfficialMatchIdListMatchGroupCmd_S.prototype.GetType = function () { return 'Cmd.OfficialMatchIdListMatchGroupCmd_S'; };
        return OfficialMatchIdListMatchGroupCmd_S;
    })();
    Cmd.OfficialMatchIdListMatchGroupCmd_S = OfficialMatchIdListMatchGroupCmd_S;
    /**
     * 刷新匹配组信息
     */
    var RefreshMatchGroupCmd_Brd = (function () {
        function RefreshMatchGroupCmd_Brd() {
        }
        RefreshMatchGroupCmd_Brd.prototype.GetType = function () { return 'Cmd.RefreshMatchGroupCmd_Brd'; };
        return RefreshMatchGroupCmd_Brd;
    })();
    Cmd.RefreshMatchGroupCmd_Brd = RefreshMatchGroupCmd_Brd;
    /**
     * 请求捐献金币给玩家
     */
    var DonateChipsToUserMatchRoomCmd_C = (function () {
        function DonateChipsToUserMatchRoomCmd_C() {
        }
        DonateChipsToUserMatchRoomCmd_C.prototype.GetType = function () { return 'Cmd.DonateChipsToUserMatchRoomCmd_C'; };
        return DonateChipsToUserMatchRoomCmd_C;
    })();
    Cmd.DonateChipsToUserMatchRoomCmd_C = DonateChipsToUserMatchRoomCmd_C;
    /**
     * 请求捐献金币给主人
     */
    var DonateChipsToOwnerMatchRoomCmd_C = (function () {
        function DonateChipsToOwnerMatchRoomCmd_C() {
        }
        DonateChipsToOwnerMatchRoomCmd_C.prototype.GetType = function () { return 'Cmd.DonateChipsToOwnerMatchRoomCmd_C'; };
        return DonateChipsToOwnerMatchRoomCmd_C;
    })();
    Cmd.DonateChipsToOwnerMatchRoomCmd_C = DonateChipsToOwnerMatchRoomCmd_C;
    /**
     * 请求捐献历史
     */
    var DonateHistoryMatchRoomCmd_C = (function () {
        function DonateHistoryMatchRoomCmd_C() {
        }
        DonateHistoryMatchRoomCmd_C.prototype.GetType = function () { return 'Cmd.DonateHistoryMatchRoomCmd_C'; };
        return DonateHistoryMatchRoomCmd_C;
    })();
    Cmd.DonateHistoryMatchRoomCmd_C = DonateHistoryMatchRoomCmd_C;
    var DonateHistory = (function () {
        function DonateHistory() {
        }
        DonateHistory.prototype.GetType = function () { return 'Cmd.DonateHistory'; };
        return DonateHistory;
    })();
    Cmd.DonateHistory = DonateHistory;
    /**
     * 返回请求捐献历史
     */
    var DonateHistoryMatchRoomCmd_S = (function () {
        function DonateHistoryMatchRoomCmd_S() {
        }
        DonateHistoryMatchRoomCmd_S.prototype.GetType = function () { return 'Cmd.DonateHistoryMatchRoomCmd_S'; };
        return DonateHistoryMatchRoomCmd_S;
    })();
    Cmd.DonateHistoryMatchRoomCmd_S = DonateHistoryMatchRoomCmd_S;
    /**
     * 俱乐部公告
     */
    var ClubNoticeMatchGroupCmd_CS = (function () {
        function ClubNoticeMatchGroupCmd_CS() {
        }
        ClubNoticeMatchGroupCmd_CS.prototype.GetType = function () { return 'Cmd.ClubNoticeMatchGroupCmd_CS'; };
        return ClubNoticeMatchGroupCmd_CS;
    })();
    Cmd.ClubNoticeMatchGroupCmd_CS = ClubNoticeMatchGroupCmd_CS;
    /**
     * 操作楼层
     */
    var OperateFloorMatchGroupCmd_CS = (function () {
        function OperateFloorMatchGroupCmd_CS() {
        }
        OperateFloorMatchGroupCmd_CS.prototype.GetType = function () { return 'Cmd.OperateFloorMatchGroupCmd_CS'; };
        return OperateFloorMatchGroupCmd_CS;
    })();
    Cmd.OperateFloorMatchGroupCmd_CS = OperateFloorMatchGroupCmd_CS;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_mini.proto
/// <reference path="common.ts" />
var Cmd;
(function (Cmd) {
    /**
     * 下注类型枚举
     */
    (function (LuckTurntableBetType) {
        /**
         * 正常下注
         */
        LuckTurntableBetType[LuckTurntableBetType["LuckTurntableBetType_Normal"] = 1] = "LuckTurntableBetType_Normal";
        /**
         * 复投 重复上次下注
         */
        LuckTurntableBetType[LuckTurntableBetType["LuckTurntableBetType_ReBet"] = 2] = "LuckTurntableBetType_ReBet";
    })(Cmd.LuckTurntableBetType || (Cmd.LuckTurntableBetType = {}));
    var LuckTurntableBetType = Cmd.LuckTurntableBetType;
    /**
     * 玩家在线状态
     */
    (function (LuckTurntableState) {
        /**
         * 准备阶段
         */
        LuckTurntableState[LuckTurntableState["LuckTurntableState_Ready"] = 1] = "LuckTurntableState_Ready";
        /**
         * 下注阶段
         */
        LuckTurntableState[LuckTurntableState["LuckTurntableState_Bet"] = 2] = "LuckTurntableState_Bet";
        /**
         * 转盘转动阶段
         */
        LuckTurntableState[LuckTurntableState["LuckTurntableState_Run"] = 3] = "LuckTurntableState_Run";
        /**
         * 开奖阶段
         */
        LuckTurntableState[LuckTurntableState["LuckTurntableState_Open"] = 4] = "LuckTurntableState_Open";
    })(Cmd.LuckTurntableState || (Cmd.LuckTurntableState = {}));
    var LuckTurntableState = Cmd.LuckTurntableState;
    /**
     * 下注信息
     */
    var LuckTurntableBetInfo = (function () {
        function LuckTurntableBetInfo() {
        }
        LuckTurntableBetInfo.prototype.GetType = function () { return 'Cmd.LuckTurntableBetInfo'; };
        return LuckTurntableBetInfo;
    })();
    Cmd.LuckTurntableBetInfo = LuckTurntableBetInfo;
    /**
     * 获取当前转盘信息信息
     */
    var RequestLuckTurntbaleInfo_C = (function () {
        function RequestLuckTurntbaleInfo_C() {
        }
        RequestLuckTurntbaleInfo_C.prototype.GetType = function () { return 'Cmd.RequestLuckTurntbaleInfo_C'; };
        return RequestLuckTurntbaleInfo_C;
    })();
    Cmd.RequestLuckTurntbaleInfo_C = RequestLuckTurntbaleInfo_C;
    /**
     * 幸运转盘刷新
     */
    var UpdateLuckTurntableMiniCmd_S = (function () {
        function UpdateLuckTurntableMiniCmd_S() {
        }
        UpdateLuckTurntableMiniCmd_S.prototype.GetType = function () { return 'Cmd.UpdateLuckTurntableMiniCmd_S'; };
        return UpdateLuckTurntableMiniCmd_S;
    })();
    Cmd.UpdateLuckTurntableMiniCmd_S = UpdateLuckTurntableMiniCmd_S;
    /**
     * 幸运转盘下注
     */
    var BetLuckTurntableMiniCmd_CS = (function () {
        function BetLuckTurntableMiniCmd_CS() {
        }
        BetLuckTurntableMiniCmd_CS.prototype.GetType = function () { return 'Cmd.BetLuckTurntableMiniCmd_CS'; };
        return BetLuckTurntableMiniCmd_CS;
    })();
    Cmd.BetLuckTurntableMiniCmd_CS = BetLuckTurntableMiniCmd_CS;
    /**
     * 单次下注信息
     */
    var LuckTurntableBetItem = (function () {
        function LuckTurntableBetItem() {
        }
        LuckTurntableBetItem.prototype.GetType = function () { return 'Cmd.LuckTurntableBetItem'; };
        return LuckTurntableBetItem;
    })();
    Cmd.LuckTurntableBetItem = LuckTurntableBetItem;
    /**
     * 每期的总押注情况
     */
    var LuckTurntableBetHistoryData = (function () {
        function LuckTurntableBetHistoryData() {
        }
        LuckTurntableBetHistoryData.prototype.GetType = function () { return 'Cmd.LuckTurntableBetHistoryData'; };
        return LuckTurntableBetHistoryData;
    })();
    Cmd.LuckTurntableBetHistoryData = LuckTurntableBetHistoryData;
    /**
     * 下注信息
     */
    var LuckTurntableHistory = (function () {
        function LuckTurntableHistory() {
        }
        LuckTurntableHistory.prototype.GetType = function () { return 'Cmd.LuckTurntableHistory'; };
        return LuckTurntableHistory;
    })();
    Cmd.LuckTurntableHistory = LuckTurntableHistory;
    /**
     * 请求幸运转盘路单
     */
    var HistoryLuckTurntableMiniCmd_C = (function () {
        function HistoryLuckTurntableMiniCmd_C() {
        }
        HistoryLuckTurntableMiniCmd_C.prototype.GetType = function () { return 'Cmd.HistoryLuckTurntableMiniCmd_C'; };
        return HistoryLuckTurntableMiniCmd_C;
    })();
    Cmd.HistoryLuckTurntableMiniCmd_C = HistoryLuckTurntableMiniCmd_C;
    /**
     * 幸运转盘路单
     */
    var HistoryLuckTurntableMiniCmd_S = (function () {
        function HistoryLuckTurntableMiniCmd_S() {
        }
        HistoryLuckTurntableMiniCmd_S.prototype.GetType = function () { return 'Cmd.HistoryLuckTurntableMiniCmd_S'; };
        return HistoryLuckTurntableMiniCmd_S;
    })();
    Cmd.HistoryLuckTurntableMiniCmd_S = HistoryLuckTurntableMiniCmd_S;
    /**
     * 开奖结果返回
     */
    var OpenLuckTurnTableMiniCmd_S = (function () {
        function OpenLuckTurnTableMiniCmd_S() {
        }
        OpenLuckTurnTableMiniCmd_S.prototype.GetType = function () { return 'Cmd.OpenLuckTurnTableMiniCmd_S'; };
        return OpenLuckTurnTableMiniCmd_S;
    })();
    Cmd.OpenLuckTurnTableMiniCmd_S = OpenLuckTurnTableMiniCmd_S;
    /**
     * 请求自己所有押注信息
     */
    var RequestBetHistoryCmd_C = (function () {
        function RequestBetHistoryCmd_C() {
        }
        RequestBetHistoryCmd_C.prototype.GetType = function () { return 'Cmd.RequestBetHistoryCmd_C'; };
        return RequestBetHistoryCmd_C;
    })();
    Cmd.RequestBetHistoryCmd_C = RequestBetHistoryCmd_C;
    /**
     * 请求自己所有历史押注信息
     */
    var ReturntBetHistoryCmd_S = (function () {
        function ReturntBetHistoryCmd_S() {
        }
        ReturntBetHistoryCmd_S.prototype.GetType = function () { return 'Cmd.ReturntBetHistoryCmd_S'; };
        return ReturntBetHistoryCmd_S;
    })();
    Cmd.ReturntBetHistoryCmd_S = ReturntBetHistoryCmd_S;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_room.proto
/// <reference path="common.ts" />
var Cmd;
(function (Cmd) {
    /**
     * 请求当前正常运营的游戏列表
     */
    var GetNormalGameListRoomCmd_C = (function () {
        function GetNormalGameListRoomCmd_C() {
        }
        GetNormalGameListRoomCmd_C.prototype.GetType = function () { return 'Cmd.GetNormalGameListRoomCmd_C'; };
        return GetNormalGameListRoomCmd_C;
    })();
    Cmd.GetNormalGameListRoomCmd_C = GetNormalGameListRoomCmd_C;
    var GetNormalGameListRoomCmd_S = (function () {
        function GetNormalGameListRoomCmd_S() {
        }
        GetNormalGameListRoomCmd_S.prototype.GetType = function () { return 'Cmd.GetNormalGameListRoomCmd_S'; };
        return GetNormalGameListRoomCmd_S;
    })();
    Cmd.GetNormalGameListRoomCmd_S = GetNormalGameListRoomCmd_S;
    /**
     * 获取当前练习场
     */
    var GetPracticeGameInfoRoomCmd_C = (function () {
        function GetPracticeGameInfoRoomCmd_C() {
        }
        GetPracticeGameInfoRoomCmd_C.prototype.GetType = function () { return 'Cmd.GetPracticeGameInfoRoomCmd_C'; };
        return GetPracticeGameInfoRoomCmd_C;
    })();
    Cmd.GetPracticeGameInfoRoomCmd_C = GetPracticeGameInfoRoomCmd_C;
    var GetPracticeGameInfoRoomCmd_S = (function () {
        function GetPracticeGameInfoRoomCmd_S() {
        }
        GetPracticeGameInfoRoomCmd_S.prototype.GetType = function () { return 'Cmd.GetPracticeGameInfoRoomCmd_S'; };
        return GetPracticeGameInfoRoomCmd_S;
    })();
    Cmd.GetPracticeGameInfoRoomCmd_S = GetPracticeGameInfoRoomCmd_S;
    /**
     * 创建房间
     */
    var CreateRoomCmd_C = (function () {
        function CreateRoomCmd_C() {
        }
        CreateRoomCmd_C.prototype.GetType = function () { return 'Cmd.CreateRoomCmd_C'; };
        return CreateRoomCmd_C;
    })();
    Cmd.CreateRoomCmd_C = CreateRoomCmd_C;
    var CreateRoomCmd_S = (function () {
        function CreateRoomCmd_S() {
        }
        CreateRoomCmd_S.prototype.GetType = function () { return 'Cmd.CreateRoomCmd_S'; };
        return CreateRoomCmd_S;
    })();
    Cmd.CreateRoomCmd_S = CreateRoomCmd_S;
    /**
     * 请求踢人
     */
    var KickLeaveRoomCmd_C = (function () {
        function KickLeaveRoomCmd_C() {
        }
        KickLeaveRoomCmd_C.prototype.GetType = function () { return 'Cmd.KickLeaveRoomCmd_C'; };
        return KickLeaveRoomCmd_C;
    })();
    Cmd.KickLeaveRoomCmd_C = KickLeaveRoomCmd_C;
    /**
     * 请求解散房间
     */
    var ActiveDissolveRoomCmd_C = (function () {
        function ActiveDissolveRoomCmd_C() {
        }
        ActiveDissolveRoomCmd_C.prototype.GetType = function () { return 'Cmd.ActiveDissolveRoomCmd_C'; };
        return ActiveDissolveRoomCmd_C;
    })();
    Cmd.ActiveDissolveRoomCmd_C = ActiveDissolveRoomCmd_C;
    /**
     * 查看正在进行中的房间(多开房间用)
     */
    var ActiveCreateRoomCmd_C = (function () {
        function ActiveCreateRoomCmd_C() {
        }
        ActiveCreateRoomCmd_C.prototype.GetType = function () { return 'Cmd.ActiveCreateRoomCmd_C'; };
        return ActiveCreateRoomCmd_C;
    })();
    Cmd.ActiveCreateRoomCmd_C = ActiveCreateRoomCmd_C;
    var ActiveCreateRoomCmd_S = (function () {
        function ActiveCreateRoomCmd_S() {
        }
        ActiveCreateRoomCmd_S.prototype.GetType = function () { return 'Cmd.ActiveCreateRoomCmd_S'; };
        return ActiveCreateRoomCmd_S;
    })();
    Cmd.ActiveCreateRoomCmd_S = ActiveCreateRoomCmd_S;
    var ActiveDetailRoomCmd_C = (function () {
        function ActiveDetailRoomCmd_C() {
        }
        ActiveDetailRoomCmd_C.prototype.GetType = function () { return 'Cmd.ActiveDetailRoomCmd_C'; };
        return ActiveDetailRoomCmd_C;
    })();
    Cmd.ActiveDetailRoomCmd_C = ActiveDetailRoomCmd_C;
    var ActiveDetailRoomCmd_S = (function () {
        function ActiveDetailRoomCmd_S() {
        }
        ActiveDetailRoomCmd_S.prototype.GetType = function () { return 'Cmd.ActiveDetailRoomCmd_S'; };
        return ActiveDetailRoomCmd_S;
    })();
    Cmd.ActiveDetailRoomCmd_S = ActiveDetailRoomCmd_S;
    /**
     * 返回房间
     */
    var ReturnRoomCmd_C = (function () {
        function ReturnRoomCmd_C() {
        }
        ReturnRoomCmd_C.prototype.GetType = function () { return 'Cmd.ReturnRoomCmd_C'; };
        return ReturnRoomCmd_C;
    })();
    Cmd.ReturnRoomCmd_C = ReturnRoomCmd_C;
    var ReturnRoomCmd_S = (function () {
        function ReturnRoomCmd_S() {
        }
        ReturnRoomCmd_S.prototype.GetType = function () { return 'Cmd.ReturnRoomCmd_S'; };
        return ReturnRoomCmd_S;
    })();
    Cmd.ReturnRoomCmd_S = ReturnRoomCmd_S;
    /**
     * 加入房间
     */
    var EnterRoomCmd_C = (function () {
        function EnterRoomCmd_C() {
        }
        EnterRoomCmd_C.prototype.GetType = function () { return 'Cmd.EnterRoomCmd_C'; };
        return EnterRoomCmd_C;
    })();
    Cmd.EnterRoomCmd_C = EnterRoomCmd_C;
    var EnterRoomCmd_S = (function () {
        function EnterRoomCmd_S() {
        }
        EnterRoomCmd_S.prototype.GetType = function () { return 'Cmd.EnterRoomCmd_S'; };
        return EnterRoomCmd_S;
    })();
    Cmd.EnterRoomCmd_S = EnterRoomCmd_S;
    /**
     * 进入俱乐部 需要弹出申请备注流程
     */
    var NotifyImportNoteCmd_S = (function () {
        function NotifyImportNoteCmd_S() {
        }
        NotifyImportNoteCmd_S.prototype.GetType = function () { return 'Cmd.NotifyImportNoteCmd_S'; };
        return NotifyImportNoteCmd_S;
    })();
    Cmd.NotifyImportNoteCmd_S = NotifyImportNoteCmd_S;
    /**
     * 房间解散时 由大厅统一推条消息通知房间创建者
     */
    var RemoveRoomCmd_Brd = (function () {
        function RemoveRoomCmd_Brd() {
        }
        RemoveRoomCmd_Brd.prototype.GetType = function () { return 'Cmd.RemoveRoomCmd_Brd'; };
        return RemoveRoomCmd_Brd;
    })();
    Cmd.RemoveRoomCmd_Brd = RemoveRoomCmd_Brd;
    /**
     * 创建的房间已被其他四个玩家玩了 则推送一条消息给玩家 通知其 当前可创建房间了
     */
    var CanCreateRoomCmd_Brd = (function () {
        function CanCreateRoomCmd_Brd() {
        }
        CanCreateRoomCmd_Brd.prototype.GetType = function () { return 'Cmd.CanCreateRoomCmd_Brd'; };
        return CanCreateRoomCmd_Brd;
    })();
    Cmd.CanCreateRoomCmd_Brd = CanCreateRoomCmd_Brd;
    var SysMessageMahjongLobbyCmd_S = (function () {
        function SysMessageMahjongLobbyCmd_S() {
        }
        SysMessageMahjongLobbyCmd_S.prototype.GetType = function () { return 'Cmd.SysMessageMahjongLobbyCmd_S'; };
        return SysMessageMahjongLobbyCmd_S;
    })();
    Cmd.SysMessageMahjongLobbyCmd_S = SysMessageMahjongLobbyCmd_S;
    /**
     * 请求续局
     */
    var ApplyContinuePlayRoomCmd_C = (function () {
        function ApplyContinuePlayRoomCmd_C() {
        }
        ApplyContinuePlayRoomCmd_C.prototype.GetType = function () { return 'Cmd.ApplyContinuePlayRoomCmd_C'; };
        return ApplyContinuePlayRoomCmd_C;
    })();
    Cmd.ApplyContinuePlayRoomCmd_C = ApplyContinuePlayRoomCmd_C;
    var ApplyContinuePlayRoomCmd_S = (function () {
        function ApplyContinuePlayRoomCmd_S() {
        }
        ApplyContinuePlayRoomCmd_S.prototype.GetType = function () { return 'Cmd.ApplyContinuePlayRoomCmd_S'; };
        return ApplyContinuePlayRoomCmd_S;
    })();
    Cmd.ApplyContinuePlayRoomCmd_S = ApplyContinuePlayRoomCmd_S;
    /**
     * 续局请求广播
     */
    var ApplyContinuePlayRoomCmd_Brd = (function () {
        function ApplyContinuePlayRoomCmd_Brd() {
        }
        ApplyContinuePlayRoomCmd_Brd.prototype.GetType = function () { return 'Cmd.ApplyContinuePlayRoomCmd_Brd'; };
        return ApplyContinuePlayRoomCmd_Brd;
    })();
    Cmd.ApplyContinuePlayRoomCmd_Brd = ApplyContinuePlayRoomCmd_Brd;
    /**
     * 请求播放录像
     */
    var RequestRecordLobbyCmd_C = (function () {
        function RequestRecordLobbyCmd_C() {
        }
        RequestRecordLobbyCmd_C.prototype.GetType = function () { return 'Cmd.RequestRecordLobbyCmd_C'; };
        return RequestRecordLobbyCmd_C;
    })();
    Cmd.RequestRecordLobbyCmd_C = RequestRecordLobbyCmd_C;
    /**
     * 返回播放录像
     */
    var ReturnRecordLobbyCmd_S = (function () {
        function ReturnRecordLobbyCmd_S() {
        }
        ReturnRecordLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ReturnRecordLobbyCmd_S'; };
        return ReturnRecordLobbyCmd_S;
    })();
    Cmd.ReturnRecordLobbyCmd_S = ReturnRecordLobbyCmd_S;
    /**
     * 请求暂停录像
     */
    var RequestPauseRecordRoomCmd_C = (function () {
        function RequestPauseRecordRoomCmd_C() {
        }
        RequestPauseRecordRoomCmd_C.prototype.GetType = function () { return 'Cmd.RequestPauseRecordRoomCmd_C'; };
        return RequestPauseRecordRoomCmd_C;
    })();
    Cmd.RequestPauseRecordRoomCmd_C = RequestPauseRecordRoomCmd_C;
    /**
     * 请求进退录像
     */
    var RequestStepRecordRoomCmd_C = (function () {
        function RequestStepRecordRoomCmd_C() {
        }
        RequestStepRecordRoomCmd_C.prototype.GetType = function () { return 'Cmd.RequestStepRecordRoomCmd_C'; };
        return RequestStepRecordRoomCmd_C;
    })();
    Cmd.RequestStepRecordRoomCmd_C = RequestStepRecordRoomCmd_C;
    /**
     * 请求退出录像
     */
    var RequestStopRecordRoomCmd_C = (function () {
        function RequestStopRecordRoomCmd_C() {
        }
        RequestStopRecordRoomCmd_C.prototype.GetType = function () { return 'Cmd.RequestStopRecordRoomCmd_C'; };
        return RequestStopRecordRoomCmd_C;
    })();
    Cmd.RequestStopRecordRoomCmd_C = RequestStopRecordRoomCmd_C;
    /**
     *  匹配场(金币场)--------------------------------------------------------------------------------------------
     *  进入某一匹配场
     */
    var EnterMatchRoomCmd_C = (function () {
        function EnterMatchRoomCmd_C() {
        }
        EnterMatchRoomCmd_C.prototype.GetType = function () { return 'Cmd.EnterMatchRoomCmd_C'; };
        return EnterMatchRoomCmd_C;
    })();
    Cmd.EnterMatchRoomCmd_C = EnterMatchRoomCmd_C;
    /**
     * 客家棋牌活动 推荐排行榜--------------------------------------------------------------------------------------------
     */
    var InviteRankInfo = (function () {
        function InviteRankInfo() {
        }
        InviteRankInfo.prototype.GetType = function () { return 'Cmd.InviteRankInfo'; };
        return InviteRankInfo;
    })();
    Cmd.InviteRankInfo = InviteRankInfo;
    var IntoInviteRankLobbyCmd_C = (function () {
        function IntoInviteRankLobbyCmd_C() {
        }
        IntoInviteRankLobbyCmd_C.prototype.GetType = function () { return 'Cmd.IntoInviteRankLobbyCmd_C'; };
        return IntoInviteRankLobbyCmd_C;
    })();
    Cmd.IntoInviteRankLobbyCmd_C = IntoInviteRankLobbyCmd_C;
    var IntoInviteRankLobbyCmd_S = (function () {
        function IntoInviteRankLobbyCmd_S() {
        }
        IntoInviteRankLobbyCmd_S.prototype.GetType = function () { return 'Cmd.IntoInviteRankLobbyCmd_S'; };
        return IntoInviteRankLobbyCmd_S;
    })();
    Cmd.IntoInviteRankLobbyCmd_S = IntoInviteRankLobbyCmd_S;
    /**
     * 好彩真人麻将，进入房间之前的判断
     */
    var GamePara = (function () {
        function GamePara() {
        }
        GamePara.prototype.GetType = function () { return 'Cmd.GamePara'; };
        return GamePara;
    })();
    Cmd.GamePara = GamePara;
    var JudgeEnterGameLobbyCmd_C = (function () {
        function JudgeEnterGameLobbyCmd_C() {
        }
        JudgeEnterGameLobbyCmd_C.prototype.GetType = function () { return 'Cmd.JudgeEnterGameLobbyCmd_C'; };
        return JudgeEnterGameLobbyCmd_C;
    })();
    Cmd.JudgeEnterGameLobbyCmd_C = JudgeEnterGameLobbyCmd_C;
    var JudgeEnterGameLobbyCmd_S = (function () {
        function JudgeEnterGameLobbyCmd_S() {
        }
        JudgeEnterGameLobbyCmd_S.prototype.GetType = function () { return 'Cmd.JudgeEnterGameLobbyCmd_S'; };
        return JudgeEnterGameLobbyCmd_S;
    })();
    Cmd.JudgeEnterGameLobbyCmd_S = JudgeEnterGameLobbyCmd_S;
    /**
     * 好彩真人麻将，返回之前的游戏
     */
    var ReturnHaoCaiGameLobbyCmd_C = (function () {
        function ReturnHaoCaiGameLobbyCmd_C() {
        }
        ReturnHaoCaiGameLobbyCmd_C.prototype.GetType = function () { return 'Cmd.ReturnHaoCaiGameLobbyCmd_C'; };
        return ReturnHaoCaiGameLobbyCmd_C;
    })();
    Cmd.ReturnHaoCaiGameLobbyCmd_C = ReturnHaoCaiGameLobbyCmd_C;
    var ReturnHaoCaiGameLobbyCmd_S = (function () {
        function ReturnHaoCaiGameLobbyCmd_S() {
        }
        ReturnHaoCaiGameLobbyCmd_S.prototype.GetType = function () { return 'Cmd.ReturnHaoCaiGameLobbyCmd_S'; };
        return ReturnHaoCaiGameLobbyCmd_S;
    })();
    Cmd.ReturnHaoCaiGameLobbyCmd_S = ReturnHaoCaiGameLobbyCmd_S;
    /**
     * -----------------------------对赌场相关--------------------
     *  请求对赌房间信息
     */
    var RequestGambleRoomInfoLobbyCmd_C = (function () {
        function RequestGambleRoomInfoLobbyCmd_C() {
        }
        RequestGambleRoomInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.RequestGambleRoomInfoLobbyCmd_C'; };
        return RequestGambleRoomInfoLobbyCmd_C;
    })();
    Cmd.RequestGambleRoomInfoLobbyCmd_C = RequestGambleRoomInfoLobbyCmd_C;
    var RequestGambleRoomInfoLobbyCmd_S = (function () {
        function RequestGambleRoomInfoLobbyCmd_S() {
        }
        RequestGambleRoomInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.RequestGambleRoomInfoLobbyCmd_S'; };
        return RequestGambleRoomInfoLobbyCmd_S;
    })();
    Cmd.RequestGambleRoomInfoLobbyCmd_S = RequestGambleRoomInfoLobbyCmd_S;
    var GambleRoomInfo = (function () {
        function GambleRoomInfo() {
        }
        GambleRoomInfo.prototype.GetType = function () { return 'Cmd.GambleRoomInfo'; };
        return GambleRoomInfo;
    })();
    Cmd.GambleRoomInfo = GambleRoomInfo;
    /**
     * 请求最终进入的房间的一些信息
     */
    var GetGambleRoomInfoLobbyCmd_C = (function () {
        function GetGambleRoomInfoLobbyCmd_C() {
        }
        GetGambleRoomInfoLobbyCmd_C.prototype.GetType = function () { return 'Cmd.GetGambleRoomInfoLobbyCmd_C'; };
        return GetGambleRoomInfoLobbyCmd_C;
    })();
    Cmd.GetGambleRoomInfoLobbyCmd_C = GetGambleRoomInfoLobbyCmd_C;
    var GetGambleRoomInfoLobbyCmd_S = (function () {
        function GetGambleRoomInfoLobbyCmd_S() {
        }
        GetGambleRoomInfoLobbyCmd_S.prototype.GetType = function () { return 'Cmd.GetGambleRoomInfoLobbyCmd_S'; };
        return GetGambleRoomInfoLobbyCmd_S;
    })();
    Cmd.GetGambleRoomInfoLobbyCmd_S = GetGambleRoomInfoLobbyCmd_S;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: mahjong_common.proto
/// <reference path="common.ts" />
var uniLib;
(function (uniLib) {
    /**
     * ---------------------------------公共模块----------------------------//
     */
    (function (CommonModel) {
        /**
         * 充值
         */
        CommonModel[CommonModel["RECHARGE"] = 1] = "RECHARGE";
        /**
         * 在线礼包
         */
        CommonModel[CommonModel["ONLINE_GIFT"] = 2] = "ONLINE_GIFT";
        /**
         * 背包
         */
        CommonModel[CommonModel["BAG"] = 3] = "BAG";
        /**
         * 活动中心
         */
        CommonModel[CommonModel["ACTIVITY"] = 4] = "ACTIVITY";
        /**
         * 个人信息
         */
        CommonModel[CommonModel["MY"] = 5] = "MY";
        /**
         * 大厅底部菜单
         */
        CommonModel[CommonModel["LOBBY_MAIN_MENU"] = 6] = "LOBBY_MAIN_MENU";
        /**
         * 游戏头部聊天
         */
        CommonModel[CommonModel["TOP_CHAT"] = 7] = "TOP_CHAT";
        /**
         * 查看玩家信息
         */
        CommonModel[CommonModel["USERINFO"] = 8] = "USERINFO";
        /**
         * 兑换话费卡
         */
        CommonModel[CommonModel["EXCHANGE_PHONECARD"] = 9] = "EXCHANGE_PHONECARD";
        /**
         * 大厅公告
         */
        CommonModel[CommonModel["LOBBY_NOTICE"] = 10] = "LOBBY_NOTICE";
        /**
         * 设置
         */
        CommonModel[CommonModel["LOBBY_SETTING"] = 11] = "LOBBY_SETTING";
    })(uniLib.CommonModel || (uniLib.CommonModel = {}));
    var CommonModel = uniLib.CommonModel;
    /**
     * ---------------------------------公共消息----------------------------//
     * 游戏发送给大厅
     */
    (function (CommonEvent_G2L) {
        /**
         * 领取在线礼包
         */
        CommonEvent_G2L[CommonEvent_G2L["GET_ONLIEN_GIFT"] = 1] = "GET_ONLIEN_GIFT";
    })(uniLib.CommonEvent_G2L || (uniLib.CommonEvent_G2L = {}));
    var CommonEvent_G2L = uniLib.CommonEvent_G2L;
    /**
     * 大厅发送给游戏
     */
    (function (CommonEvent_L2G) {
        /**
         * 在线礼包时间更新
         */
        CommonEvent_L2G[CommonEvent_L2G["GET_ONLIEN_GIFT_TIME"] = 1] = "GET_ONLIEN_GIFT_TIME";
        /**
         * 在线礼包时间完成
         */
        CommonEvent_L2G[CommonEvent_L2G["ON_ONLIEN_GIFT_TIME_END"] = 2] = "ON_ONLIEN_GIFT_TIME_END";
        /**
         * 设置面板
         */
        CommonEvent_L2G[CommonEvent_L2G["ON_SETTING"] = 3] = "ON_SETTING";
        /**
         * 设置面板
         */
        CommonEvent_L2G[CommonEvent_L2G["ON_HELP"] = 4] = "ON_HELP";
    })(uniLib.CommonEvent_L2G || (uniLib.CommonEvent_L2G = {}));
    var CommonEvent_L2G = uniLib.CommonEvent_L2G;
    /**
     * 任务事件
     */
    (function (TaskEventEnum) {
        /**
         * 分享
         */
        TaskEventEnum[TaskEventEnum["SHARE"] = 1] = "SHARE";
        /**
         * 上庄
         */
        TaskEventEnum[TaskEventEnum["BANKER"] = 2] = "BANKER";
        /**
         * 玩游戏
         */
        TaskEventEnum[TaskEventEnum["GAME"] = 3] = "GAME";
        /**
         * 充值
         */
        TaskEventEnum[TaskEventEnum["RECHAR"] = 4] = "RECHAR";
        /**
         * 金币数量
         */
        TaskEventEnum[TaskEventEnum["CHIPS"] = 5] = "CHIPS";
        /**
         * 登陆
         */
        TaskEventEnum[TaskEventEnum["LOGIN"] = 6] = "LOGIN";
    })(uniLib.TaskEventEnum || (uniLib.TaskEventEnum = {}));
    var TaskEventEnum = uniLib.TaskEventEnum;
    var Any = (function () {
        function Any() {
        }
        Any.prototype.GetType = function () { return 'uniLib.Any'; };
        return Any;
    })();
    uniLib.Any = Any;
})(uniLib || (uniLib = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: mahjong_room.proto
/// <reference path="common.ts" />
/// <reference path="lobby.ts" />
var Cmd;
(function (Cmd) {
    /**
     * 麻将类型
     */
    (function (MahjongType) {
        MahjongType[MahjongType["MahjongType_None"] = 0] = "MahjongType_None";
        /**
         * 双人麻将
         */
        MahjongType[MahjongType["MahjongType_Two"] = 1] = "MahjongType_Two";
        /**
         * 四人麻将
         */
        MahjongType[MahjongType["MahjongType_Four"] = 2] = "MahjongType_Four";
    })(Cmd.MahjongType || (Cmd.MahjongType = {}));
    var MahjongType = Cmd.MahjongType;
    (function (MahjongCardType) {
        MahjongCardType[MahjongCardType["MahjongCardType_None"] = 0] = "MahjongCardType_None";
        /**
         * 万
         */
        MahjongCardType[MahjongCardType["MahjongCardType_Million"] = 1] = "MahjongCardType_Million";
        /**
         * 条
         */
        MahjongCardType[MahjongCardType["MahjongCardType_strip"] = 2] = "MahjongCardType_strip";
        /**
         * 筒
         */
        MahjongCardType[MahjongCardType["MahjongCardType_pie"] = 3] = "MahjongCardType_pie";
        /**
         * 东南西北中发白
         */
        MahjongCardType[MahjongCardType["MahjongCardType_Other"] = 4] = "MahjongCardType_Other";
        /**
         * 花
         */
        MahjongCardType[MahjongCardType["MahjongCardType_flower"] = 5] = "MahjongCardType_flower";
    })(Cmd.MahjongCardType || (Cmd.MahjongCardType = {}));
    var MahjongCardType = Cmd.MahjongCardType;
    (function (MahjongCardOtherType) {
        MahjongCardOtherType[MahjongCardOtherType["MahjongCardOtherType_None"] = 0] = "MahjongCardOtherType_None";
        /**
         * 东
         */
        MahjongCardOtherType[MahjongCardOtherType["MahjongCardOtherType_East"] = 1] = "MahjongCardOtherType_East";
        /**
         * 南
         */
        MahjongCardOtherType[MahjongCardOtherType["MahjongCardOtherType_South"] = 2] = "MahjongCardOtherType_South";
        /**
         * 西
         */
        MahjongCardOtherType[MahjongCardOtherType["MahjongCardOtherType_West"] = 3] = "MahjongCardOtherType_West";
        /**
         * 北
         */
        MahjongCardOtherType[MahjongCardOtherType["MahjongCardOtherType_North"] = 4] = "MahjongCardOtherType_North";
        /**
         * 中
         */
        MahjongCardOtherType[MahjongCardOtherType["MahjongCardOtherType_Mid"] = 5] = "MahjongCardOtherType_Mid";
        /**
         * 发
         */
        MahjongCardOtherType[MahjongCardOtherType["MahjongCardOtherType_Rich"] = 6] = "MahjongCardOtherType_Rich";
        /**
         * 白
         */
        MahjongCardOtherType[MahjongCardOtherType["MahjongCardOtherType_White"] = 7] = "MahjongCardOtherType_White";
    })(Cmd.MahjongCardOtherType || (Cmd.MahjongCardOtherType = {}));
    var MahjongCardOtherType = Cmd.MahjongCardOtherType;
    (function (MahjongOpCardType) {
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_None"] = 0] = "MahjongOpCardType_None";
        /**
         * 胡牌
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Win"] = 1] = "MahjongOpCardType_Win";
        /**
         * 杠牌
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Bar"] = 2] = "MahjongOpCardType_Bar";
        /**
         * 补牌 --3,4,5为预留字段
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Supply"] = 3] = "MahjongOpCardType_Supply";
        /**
         * 碰牌
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Touch"] = 6] = "MahjongOpCardType_Touch";
        /**
         * 吃顺
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Eat"] = 7] = "MahjongOpCardType_Eat";
        /**
         * MahjongOpCardType_Send				= 8;	// 摸牌
         *  不操作
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Undo"] = 9] = "MahjongOpCardType_Undo";
        /**
         * 听牌
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Listen"] = 10] = "MahjongOpCardType_Listen";
        /**
         * 三金倒
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_ThreeGold"] = 11] = "MahjongOpCardType_ThreeGold";
        /**
         * 天胡
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_SkyWin"] = 12] = "MahjongOpCardType_SkyWin";
        /**
         * 抢金
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_GrabGold"] = 13] = "MahjongOpCardType_GrabGold";
        /**
         * 游金
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_GoldSwim"] = 14] = "MahjongOpCardType_GoldSwim";
        /**
         * 双游
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_DoubleSwim"] = 15] = "MahjongOpCardType_DoubleSwim";
        /**
         * 三游
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_ThreeSwim"] = 16] = "MahjongOpCardType_ThreeSwim";
        /**
         * 八花
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_EightFlower"] = 17] = "MahjongOpCardType_EightFlower";
        /**
         * 抢杠和
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_BarOtherWin"] = 18] = "MahjongOpCardType_BarOtherWin";
        /**
         * 四金倒
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_FourGold"] = 19] = "MahjongOpCardType_FourGold";
        /**
         * 五金倒
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_FiveGold"] = 20] = "MahjongOpCardType_FiveGold";
        /**
         * 六金倒
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_SixGold"] = 21] = "MahjongOpCardType_SixGold";
        /**
         * 长沙麻将
         *  起手小胡
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_startSmallWin"] = 22] = "MahjongOpCardType_startSmallWin";
        /**
         *  遵义麻将
         *  原缺
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_OriginalLack"] = 23] = "MahjongOpCardType_OriginalLack";
        /**
         * 定缺
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_EnsureLack"] = 24] = "MahjongOpCardType_EnsureLack";
        /**
         *  金华麻将
         *  敲响
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Knock"] = 25] = "MahjongOpCardType_Knock";
        /**
         *  二人金币
         *  加倍
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Double"] = 26] = "MahjongOpCardType_Double";
        /**
         *  漳州麻将
         *  四游
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_FourSwim"] = 27] = "MahjongOpCardType_FourSwim";
        /**
         * 五游
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_FiveSwim"] = 28] = "MahjongOpCardType_FiveSwim";
        /**
         * 六游
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_SixSwim"] = 29] = "MahjongOpCardType_SixSwim";
        /**
         * 抢杠
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_BarOther"] = 101] = "MahjongOpCardType_BarOther";
        /**
         * 自杠
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_BarSelf"] = 102] = "MahjongOpCardType_BarSelf";
        /**
         * 碰杠
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_BarTouch"] = 103] = "MahjongOpCardType_BarTouch";
        /**
         *  古田麻将
         *  原金杠
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_YuanJinBar"] = 104] = "MahjongOpCardType_YuanJinBar";
        /**
         * 杂金杠
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_ZaJinBar"] = 105] = "MahjongOpCardType_ZaJinBar";
        /**
         * 长沙麻将
         * 抢补
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_SupplyOther"] = 202] = "MahjongOpCardType_SupplyOther";
        /**
         * 自补
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_SupplySelf"] = 203] = "MahjongOpCardType_SupplySelf";
        /**
         * 碰补
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_SupplyTouch"] = 204] = "MahjongOpCardType_SupplyTouch";
        /**
         * 杠胡
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_BarWin"] = 205] = "MahjongOpCardType_BarWin";
        /**
         * 宁德麻将
         *  金坎
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_JinKan"] = 110] = "MahjongOpCardType_JinKan";
        /**
         * 四川麻将
         *  换牌操作
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_changgeCard"] = 120] = "MahjongOpCardType_changgeCard";
        /**
         * 海南麻将吃三道吃四道动画
         *  吃三道
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_EatThree"] = 130] = "MahjongOpCardType_EatThree";
        /**
         * 吃四道
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_EatFour"] = 131] = "MahjongOpCardType_EatFour";
        /**
         * 首张被跟
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_FollowBanker"] = 132] = "MahjongOpCardType_FollowBanker";
        /**
         * 首张被杠
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_BarFirst"] = 133] = "MahjongOpCardType_BarFirst";
        /**
         * 宽甸麻将
         * 报夹
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_baojia"] = 33] = "MahjongOpCardType_baojia";
        /**
         * 报吊
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_baotdiao"] = 34] = "MahjongOpCardType_baotdiao";
        /**
         * 站立报听
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_zhanlibaoting"] = 35] = "MahjongOpCardType_zhanlibaoting";
        /**
         * 站立报夹
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_zhanlibaojia"] = 36] = "MahjongOpCardType_zhanlibaojia";
        /**
         * 站立报吊
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_zhanlibaodiao"] = 37] = "MahjongOpCardType_zhanlibaodiao";
        /**
         * 凤城麻将
         * 摇宝
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_yaobao"] = 50] = "MahjongOpCardType_yaobao";
        /**
         * 跟宝
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_genbao"] = 51] = "MahjongOpCardType_genbao";
        /**
         * 放风
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_windCard"] = 52] = "MahjongOpCardType_windCard";
        /**
         * 沈阳麻将
         * 东南西旋风杠
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_DNXBXuanFengBar"] = 106] = "MahjongOpCardType_DNXBXuanFengBar";
        /**
         * 中发白旋风杠
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_ZFBXuanFengBar"] = 107] = "MahjongOpCardType_ZFBXuanFengBar";
        /**
         * 过蛋
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_PassEggs"] = 108] = "MahjongOpCardType_PassEggs";
        /**
         * 任丘麻将
         * 中发白箭
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Jian"] = 55] = "MahjongOpCardType_Jian";
        /**
         * 风
         */
        MahjongOpCardType[MahjongOpCardType["MahjongOpCardType_Feng"] = 56] = "MahjongOpCardType_Feng";
    })(Cmd.MahjongOpCardType || (Cmd.MahjongOpCardType = {}));
    var MahjongOpCardType = Cmd.MahjongOpCardType;
    /**
     * 番型
     */
    (function (MahjongMultiType) {
        /**
         * 跟牌
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_FollowCard"] = 1] = "MahjongMultiType_FollowCard";
        /**
         * 花杠
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_FlowerBar"] = 2] = "MahjongMultiType_FlowerBar";
        /**
         * 明杠
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_BrightBar"] = 3] = "MahjongMultiType_BrightBar";
        /**
         * 暗杠
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_DarkBar"] = 4] = "MahjongMultiType_DarkBar";
        /**
         * 自摸
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_WinSelf"] = 5] = "MahjongMultiType_WinSelf";
        /**
         * 抢杠胡
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_GrabBarWin"] = 6] = "MahjongMultiType_GrabBarWin";
        /**
         * 抢金
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_GrabGold"] = 7] = "MahjongMultiType_GrabGold";
        /**
         * 天胡
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_SkyWin"] = 8] = "MahjongMultiType_SkyWin";
        /**
         * 游金
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_GoldSwim"] = 9] = "MahjongMultiType_GoldSwim";
        /**
         * 双游
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_DoubleSwim"] = 10] = "MahjongMultiType_DoubleSwim";
        /**
         * 三游
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_ThreeSwim"] = 11] = "MahjongMultiType_ThreeSwim";
        /**
         * 三金倒
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_ThreeGold"] = 12] = "MahjongMultiType_ThreeGold";
        /**
         * 四金倒
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_FourGold"] = 13] = "MahjongMultiType_FourGold";
        /**
         * 五金倒
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_FiveGold"] = 14] = "MahjongMultiType_FiveGold";
        /**
         * 六金倒
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_SixGold"] = 15] = "MahjongMultiType_SixGold";
        /**
         * 十三幺
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_Thirteen"] = 16] = "MahjongMultiType_Thirteen";
        /**
         * 八花
         */
        MahjongMultiType[MahjongMultiType["MahjongMultiType_Flowers"] = 17] = "MahjongMultiType_Flowers";
    })(Cmd.MahjongMultiType || (Cmd.MahjongMultiType = {}));
    var MahjongMultiType = Cmd.MahjongMultiType;
    /**
     * 宁德麻将番型
     */
    (function (NingDeMultiType) {
        /**
         * 鸡胡
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_ComminWin"] = 1] = "NingDeMultiType_ComminWin";
        /**
         * 自摸
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_SelfWin"] = 2] = "NingDeMultiType_SelfWin";
        /**
         * 抢金
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_GrabGold"] = 3] = "NingDeMultiType_GrabGold";
        /**
         * 天胡
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_SkyWin"] = 4] = "NingDeMultiType_SkyWin";
        /**
         * 三金倒
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_ThreeGold"] = 5] = "NingDeMultiType_ThreeGold";
        /**
         * 金雀
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_GoldBird"] = 6] = "NingDeMultiType_GoldBird";
        /**
         * 金龙
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_GoldDragon"] = 7] = "NingDeMultiType_GoldDragon";
        /**
         * 单调
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_SingleWin"] = 8] = "NingDeMultiType_SingleWin";
        /**
         * 清一色
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_SingleColor"] = 9] = "NingDeMultiType_SingleColor";
        /**
         * 补红中
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_BuHongZhong"] = 10] = "NingDeMultiType_BuHongZhong";
        /**
         * 基础分
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_Base"] = 11] = "NingDeMultiType_Base";
        /**
         * 明杠
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_MingGang"] = 12] = "NingDeMultiType_MingGang";
        /**
         * 暗杠
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_AnGang"] = 13] = "NingDeMultiType_AnGang";
        /**
         * 金牌
         */
        NingDeMultiType[NingDeMultiType["NingDeMultiType_GoldCard"] = 14] = "NingDeMultiType_GoldCard";
    })(Cmd.NingDeMultiType || (Cmd.NingDeMultiType = {}));
    var NingDeMultiType = Cmd.NingDeMultiType;
    /**
     * 捉鸡麻将番型
     */
    (function (ZhuoJiMultiType) {
        /**
         * 平胡
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_CommonWin"] = 1] = "ZhuoJiMultiType_CommonWin";
        /**
         * 杠上开花
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_BarWin"] = 2] = "ZhuoJiMultiType_BarWin";
        /**
         * 大对子
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_BigCoupleWin"] = 3] = "ZhuoJiMultiType_BigCoupleWin";
        /**
         * 清一色
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_UniformColorWin"] = 4] = "ZhuoJiMultiType_UniformColorWin";
        /**
         * 七对
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_SevenCoupleWin"] = 5] = "ZhuoJiMultiType_SevenCoupleWin";
        /**
         * 龙七对
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_DragonSevenCoupleWin"] = 6] = "ZhuoJiMultiType_DragonSevenCoupleWin";
        /**
         * 清七对
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_UniformColorSevenCoupleWin"] = 7] = "ZhuoJiMultiType_UniformColorSevenCoupleWin";
        /**
         * 清大对
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_UniformColorBigCoupleWin"] = 8] = "ZhuoJiMultiType_UniformColorBigCoupleWin";
        /**
         * 清龙背
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_UniformColorDungeonWin"] = 9] = "ZhuoJiMultiType_UniformColorDungeonWin";
        /**
         * 单吊
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_OneHandCardWin"] = 10] = "ZhuoJiMultiType_OneHandCardWin";
        /**
         * 清单吊
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_UniformColorOneHandCardWin"] = 11] = "ZhuoJiMultiType_UniformColorOneHandCardWin";
        /**
         * 自摸
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_BySelfWin"] = 12] = "ZhuoJiMultiType_BySelfWin";
        /**
         * 热杠
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_HotCannonWin"] = 13] = "ZhuoJiMultiType_HotCannonWin";
        /**
         * 抢杠胡
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_GrabBarWin"] = 14] = "ZhuoJiMultiType_GrabBarWin";
        /**
         * 硬报
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_HardCallWin"] = 15] = "ZhuoJiMultiType_HardCallWin";
        /**
         * 软报
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_SoftCallWin"] = 16] = "ZhuoJiMultiType_SoftCallWin";
        /**
         * 杀报
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_KillCallWin"] = 17] = "ZhuoJiMultiType_KillCallWin";
        /**
         * 冲锋鸡
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_RushChicken"] = 18] = "ZhuoJiMultiType_RushChicken";
        /**
         * 责任鸡
         */
        ZhuoJiMultiType[ZhuoJiMultiType["ZhuoJiMultiType_ResponseChicken"] = 19] = "ZhuoJiMultiType_ResponseChicken";
    })(Cmd.ZhuoJiMultiType || (Cmd.ZhuoJiMultiType = {}));
    var ZhuoJiMultiType = Cmd.ZhuoJiMultiType;
    /**
     * 玩法
     */
    (function (MahjongPlayType) {
        /**
         * 半自摸
         */
        MahjongPlayType[MahjongPlayType["MahjongPlayType_Half"] = 11] = "MahjongPlayType_Half";
        /**
         * 全自摸
         */
        MahjongPlayType[MahjongPlayType["MahjongPlayType_Full"] = 12] = "MahjongPlayType_Full";
    })(Cmd.MahjongPlayType || (Cmd.MahjongPlayType = {}));
    var MahjongPlayType = Cmd.MahjongPlayType;
    (function (MahjongWinCardType) {
        MahjongWinCardType[MahjongWinCardType["MahjongWinCardType_None"] = 0] = "MahjongWinCardType_None";
        /**
         * 自摸
         */
        MahjongWinCardType[MahjongWinCardType["MahjongWinCardType_Self"] = 1] = "MahjongWinCardType_Self";
        /**
         * 胡牌
         */
        MahjongWinCardType[MahjongWinCardType["MahjongWinCardType_Shoot"] = 2] = "MahjongWinCardType_Shoot";
        /**
         * 放炮
         */
        MahjongWinCardType[MahjongWinCardType["MahjongWinCardType_WinOther"] = 3] = "MahjongWinCardType_WinOther";
    })(Cmd.MahjongWinCardType || (Cmd.MahjongWinCardType = {}));
    var MahjongWinCardType = Cmd.MahjongWinCardType;
    (function (MultiType) {
        /**
         * 明杠
         */
        MultiType[MultiType["MahjongMulti_BrightBar"] = 1] = "MahjongMulti_BrightBar";
        /**
         * 暗杠
         */
        MultiType[MultiType["MahjongMulti_DarkBar"] = 2] = "MahjongMulti_DarkBar";
        /**
         * 自摸
         */
        MultiType[MultiType["MahjongMulti_selfWin"] = 3] = "MahjongMulti_selfWin";
        /**
         * 抢杠和
         */
        MultiType[MultiType["MahjongMulti_grabBarWin"] = 4] = "MahjongMulti_grabBarWin";
        /**
         * 杠上开花
         */
        MultiType[MultiType["MahjongMulti_flowerBarWin"] = 5] = "MahjongMulti_flowerBarWin";
        /**
         * 无鬼
         */
        MultiType[MultiType["MahjongMulti_NoGoldCard"] = 6] = "MahjongMulti_NoGoldCard";
        /**
         * 中马
         */
        MultiType[MultiType["MahjongMulti_Horse"] = 7] = "MahjongMulti_Horse";
        /**
         * 七对
         */
        MultiType[MultiType["MahjongMulti_SevenPairs"] = 8] = "MahjongMulti_SevenPairs";
    })(Cmd.MultiType || (Cmd.MultiType = {}));
    var MultiType = Cmd.MultiType;
    (function (RoomPro) {
        /**
         * 离线
         */
        RoomPro[RoomPro["RoomPro_0"] = 0] = "RoomPro_0";
        /**
         * 房间局数
         */
        RoomPro[RoomPro["RoomPro_1"] = 1] = "RoomPro_1";
        /**
         * 游戏玩法
         */
        RoomPro[RoomPro["RoomPro_2"] = 2] = "RoomPro_2";
        /**
         * 人数模式
         */
        RoomPro[RoomPro["RoomPro_3"] = 3] = "RoomPro_3";
        /**
         * 支付模式
         */
        RoomPro[RoomPro["RoomPro_4"] = 4] = "RoomPro_4";
        /**
         * 游金倍数
         */
        RoomPro[RoomPro["RoomPro_5"] = 5] = "RoomPro_5";
        /**
         * 支持托管
         */
        RoomPro[RoomPro["RoomPro_6"] = 6] = "RoomPro_6";
    })(Cmd.RoomPro || (Cmd.RoomPro = {}));
    var RoomPro = Cmd.RoomPro;
    /**
     * 两个骰子随机数
     */
    var DiceObj = (function () {
        function DiceObj() {
        }
        DiceObj.prototype.GetType = function () { return 'Cmd.DiceObj'; };
        return DiceObj;
    })();
    Cmd.DiceObj = DiceObj;
    /**
     * 杠碰结构
     */
    var CardOpObj = (function () {
        function CardOpObj() {
        }
        CardOpObj.prototype.GetType = function () { return 'Cmd.CardOpObj'; };
        return CardOpObj;
    })();
    Cmd.CardOpObj = CardOpObj;
    /**
     * 摸牌结构
     */
    var CardSendObj = (function () {
        function CardSendObj() {
        }
        CardSendObj.prototype.GetType = function () { return 'Cmd.CardSendObj'; };
        return CardSendObj;
    })();
    Cmd.CardSendObj = CardSendObj;
    /**
     * 补牌结构
     */
    var FlowerCardObj = (function () {
        function FlowerCardObj() {
        }
        FlowerCardObj.prototype.GetType = function () { return 'Cmd.FlowerCardObj'; };
        return FlowerCardObj;
    })();
    Cmd.FlowerCardObj = FlowerCardObj;
    /**
     * 扎鸟结构
     */
    var BirdObj = (function () {
        function BirdObj() {
        }
        BirdObj.prototype.GetType = function () { return 'Cmd.BirdObj'; };
        return BirdObj;
    })();
    Cmd.BirdObj = BirdObj;
    /**
     * 胡牌结构  -- 扎鸟前发
     */
    var WinCardObj = (function () {
        function WinCardObj() {
        }
        WinCardObj.prototype.GetType = function () { return 'Cmd.WinCardObj'; };
        return WinCardObj;
    })();
    Cmd.WinCardObj = WinCardObj;
    /**
     * 房间内玩家信息
     */
    var RoomUserInfo = (function () {
        function RoomUserInfo() {
        }
        RoomUserInfo.prototype.GetType = function () { return 'Cmd.RoomUserInfo'; };
        return RoomUserInfo;
    })();
    Cmd.RoomUserInfo = RoomUserInfo;
    /**
     * 玩家牌结构
     */
    var UserCardObj = (function () {
        function UserCardObj() {
        }
        UserCardObj.prototype.GetType = function () { return 'Cmd.UserCardObj'; };
        return UserCardObj;
    })();
    Cmd.UserCardObj = UserCardObj;
    var MultiDetail = (function () {
        function MultiDetail() {
        }
        MultiDetail.prototype.GetType = function () { return 'Cmd.MultiDetail'; };
        return MultiDetail;
    })();
    Cmd.MultiDetail = MultiDetail;
    var RewardObj = (function () {
        function RewardObj() {
        }
        RewardObj.prototype.GetType = function () { return 'Cmd.RewardObj'; };
        return RewardObj;
    })();
    Cmd.RewardObj = RewardObj;
    var ChipsObj = (function () {
        function ChipsObj() {
        }
        ChipsObj.prototype.GetType = function () { return 'Cmd.ChipsObj'; };
        return ChipsObj;
    })();
    Cmd.ChipsObj = ChipsObj;
    var PointsObj = (function () {
        function PointsObj() {
        }
        PointsObj.prototype.GetType = function () { return 'Cmd.PointsObj'; };
        return PointsObj;
    })();
    Cmd.PointsObj = PointsObj;
    var ListenCardObj = (function () {
        function ListenCardObj() {
        }
        ListenCardObj.prototype.GetType = function () { return 'Cmd.ListenCardObj'; };
        return ListenCardObj;
    })();
    Cmd.ListenCardObj = ListenCardObj;
    var ListenObj = (function () {
        function ListenObj() {
        }
        ListenObj.prototype.GetType = function () { return 'Cmd.ListenObj'; };
        return ListenObj;
    })();
    Cmd.ListenObj = ListenObj;
    var UserListenObj = (function () {
        function UserListenObj() {
        }
        UserListenObj.prototype.GetType = function () { return 'Cmd.UserListenObj'; };
        return UserListenObj;
    })();
    Cmd.UserListenObj = UserListenObj;
    var UserOpObj = (function () {
        function UserOpObj() {
        }
        UserOpObj.prototype.GetType = function () { return 'Cmd.UserOpObj'; };
        return UserOpObj;
    })();
    Cmd.UserOpObj = UserOpObj;
    /**
     * +
     */
    var MultiObj = (function () {
        function MultiObj() {
        }
        MultiObj.prototype.GetType = function () { return 'Cmd.MultiObj'; };
        return MultiObj;
    })();
    Cmd.MultiObj = MultiObj;
    /**
     * +
     */
    var PropInfo = (function () {
        function PropInfo() {
        }
        PropInfo.prototype.GetType = function () { return 'Cmd.PropInfo'; };
        return PropInfo;
    })();
    Cmd.PropInfo = PropInfo;
    /**
     * +
     */
    var UserGifts = (function () {
        function UserGifts() {
        }
        UserGifts.prototype.GetType = function () { return 'Cmd.UserGifts'; };
        return UserGifts;
    })();
    Cmd.UserGifts = UserGifts;
    /**
     * +
     */
    var UserProp = (function () {
        function UserProp() {
        }
        UserProp.prototype.GetType = function () { return 'Cmd.UserProp'; };
        return UserProp;
    })();
    Cmd.UserProp = UserProp;
    /**
     * 出牌结构
     */
    var CardOutObj = (function () {
        function CardOutObj() {
        }
        CardOutObj.prototype.GetType = function () { return 'Cmd.CardOutObj'; };
        return CardOutObj;
    })();
    Cmd.CardOutObj = CardOutObj;
    /**
     * 进入房间
     */
    var EnterMahjongCmd_C = (function () {
        function EnterMahjongCmd_C() {
        }
        EnterMahjongCmd_C.prototype.GetType = function () { return 'Cmd.EnterMahjongCmd_C'; };
        return EnterMahjongCmd_C;
    })();
    Cmd.EnterMahjongCmd_C = EnterMahjongCmd_C;
    /**
     * 海南麻将动画提示
     */
    var DZHNShowMsgCartoon_S = (function () {
        function DZHNShowMsgCartoon_S() {
        }
        DZHNShowMsgCartoon_S.prototype.GetType = function () { return 'Cmd.DZHNShowMsgCartoon_S'; };
        return DZHNShowMsgCartoon_S;
    })();
    Cmd.DZHNShowMsgCartoon_S = DZHNShowMsgCartoon_S;
    var EnterMahjongCmd_S = (function () {
        function EnterMahjongCmd_S() {
        }
        EnterMahjongCmd_S.prototype.GetType = function () { return 'Cmd.EnterMahjongCmd_S'; };
        return EnterMahjongCmd_S;
    })();
    Cmd.EnterMahjongCmd_S = EnterMahjongCmd_S;
    var LackInfo = (function () {
        function LackInfo() {
        }
        LackInfo.prototype.GetType = function () { return 'Cmd.LackInfo'; };
        return LackInfo;
    })();
    Cmd.LackInfo = LackInfo;
    var ReConnectMahjongCmd_S = (function () {
        function ReConnectMahjongCmd_S() {
        }
        ReConnectMahjongCmd_S.prototype.GetType = function () { return 'Cmd.ReConnectMahjongCmd_S'; };
        return ReConnectMahjongCmd_S;
    })();
    Cmd.ReConnectMahjongCmd_S = ReConnectMahjongCmd_S;
    var PiGoldBarMes = (function () {
        function PiGoldBarMes() {
        }
        PiGoldBarMes.prototype.GetType = function () { return 'Cmd.PiGoldBarMes'; };
        return PiGoldBarMes;
    })();
    Cmd.PiGoldBarMes = PiGoldBarMes;
    var LaZhuangMes = (function () {
        function LaZhuangMes() {
        }
        LaZhuangMes.prototype.GetType = function () { return 'Cmd.LaZhuangMes'; };
        return LaZhuangMes;
    })();
    Cmd.LaZhuangMes = LaZhuangMes;
    var CardLine = (function () {
        function CardLine() {
        }
        CardLine.prototype.GetType = function () { return 'Cmd.CardLine'; };
        return CardLine;
    })();
    Cmd.CardLine = CardLine;
    /**
     * 广播玩家进入房间
     */
    var EnterMahjongCmd_Brd = (function () {
        function EnterMahjongCmd_Brd() {
        }
        EnterMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.EnterMahjongCmd_Brd'; };
        return EnterMahjongCmd_Brd;
    })();
    Cmd.EnterMahjongCmd_Brd = EnterMahjongCmd_Brd;
    /**
     * Echo应答,服务器探测玩家是否活着
     */
    var ServerEchoMahjongCmd_SC = (function () {
        function ServerEchoMahjongCmd_SC() {
        }
        ServerEchoMahjongCmd_SC.prototype.GetType = function () { return 'Cmd.ServerEchoMahjongCmd_SC'; };
        return ServerEchoMahjongCmd_SC;
    })();
    Cmd.ServerEchoMahjongCmd_SC = ServerEchoMahjongCmd_SC;
    /**
     * Echo应答,客户端探测服务器
     */
    var ClientEchoMahjongCmd_SC = (function () {
        function ClientEchoMahjongCmd_SC() {
        }
        ClientEchoMahjongCmd_SC.prototype.GetType = function () { return 'Cmd.ClientEchoMahjongCmd_SC'; };
        return ClientEchoMahjongCmd_SC;
    })();
    Cmd.ClientEchoMahjongCmd_SC = ClientEchoMahjongCmd_SC;
    /**
     * 在线状态
     */
    var OnlineStateMahjongCmd_Brd = (function () {
        function OnlineStateMahjongCmd_Brd() {
        }
        OnlineStateMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.OnlineStateMahjongCmd_Brd'; };
        return OnlineStateMahjongCmd_Brd;
    })();
    Cmd.OnlineStateMahjongCmd_Brd = OnlineStateMahjongCmd_Brd;
    /**
     * 离开房间
     */
    var LeaveMahjongCmd_C = (function () {
        function LeaveMahjongCmd_C() {
        }
        LeaveMahjongCmd_C.prototype.GetType = function () { return 'Cmd.LeaveMahjongCmd_C'; };
        return LeaveMahjongCmd_C;
    })();
    Cmd.LeaveMahjongCmd_C = LeaveMahjongCmd_C;
    var LeaveMahjongCmd_S = (function () {
        function LeaveMahjongCmd_S() {
        }
        LeaveMahjongCmd_S.prototype.GetType = function () { return 'Cmd.LeaveMahjongCmd_S'; };
        return LeaveMahjongCmd_S;
    })();
    Cmd.LeaveMahjongCmd_S = LeaveMahjongCmd_S;
    /**
     * 广播玩家离开房间
     */
    var LeaveMahjongCmd_Brd = (function () {
        function LeaveMahjongCmd_Brd() {
        }
        LeaveMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.LeaveMahjongCmd_Brd'; };
        return LeaveMahjongCmd_Brd;
    })();
    Cmd.LeaveMahjongCmd_Brd = LeaveMahjongCmd_Brd;
    /**
     * 加底注
     */
    var AddBasePoint_C = (function () {
        function AddBasePoint_C() {
        }
        AddBasePoint_C.prototype.GetType = function () { return 'Cmd.AddBasePoint_C'; };
        return AddBasePoint_C;
    })();
    Cmd.AddBasePoint_C = AddBasePoint_C;
    /**
     * 玩家加注广播,有时间发来表示通知开始加注
     */
    var AddBasePoint_Brd = (function () {
        function AddBasePoint_Brd() {
        }
        AddBasePoint_Brd.prototype.GetType = function () { return 'Cmd.AddBasePoint_Brd'; };
        return AddBasePoint_Brd;
    })();
    Cmd.AddBasePoint_Brd = AddBasePoint_Brd;
    /**
     * 加注结构
     */
    var MultiPointSet = (function () {
        function MultiPointSet() {
        }
        MultiPointSet.prototype.GetType = function () { return 'Cmd.MultiPointSet'; };
        return MultiPointSet;
    })();
    Cmd.MultiPointSet = MultiPointSet;
    /**
     * 请求准备
     */
    var ReadyStartMahjongCmd_C = (function () {
        function ReadyStartMahjongCmd_C() {
        }
        ReadyStartMahjongCmd_C.prototype.GetType = function () { return 'Cmd.ReadyStartMahjongCmd_C'; };
        return ReadyStartMahjongCmd_C;
    })();
    Cmd.ReadyStartMahjongCmd_C = ReadyStartMahjongCmd_C;
    /**
     * 取消准备
     */
    var CancelReadyMahjongCmd_Brd = (function () {
        function CancelReadyMahjongCmd_Brd() {
        }
        CancelReadyMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.CancelReadyMahjongCmd_Brd'; };
        return CancelReadyMahjongCmd_Brd;
    })();
    Cmd.CancelReadyMahjongCmd_Brd = CancelReadyMahjongCmd_Brd;
    var ReadyStartMahjongCmd_S = (function () {
        function ReadyStartMahjongCmd_S() {
        }
        ReadyStartMahjongCmd_S.prototype.GetType = function () { return 'Cmd.ReadyStartMahjongCmd_S'; };
        return ReadyStartMahjongCmd_S;
    })();
    Cmd.ReadyStartMahjongCmd_S = ReadyStartMahjongCmd_S;
    /**
     * 广播准备
     */
    var ReadyStartMahjongCmd_Brd = (function () {
        function ReadyStartMahjongCmd_Brd() {
        }
        ReadyStartMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.ReadyStartMahjongCmd_Brd'; };
        return ReadyStartMahjongCmd_Brd;
    })();
    Cmd.ReadyStartMahjongCmd_Brd = ReadyStartMahjongCmd_Brd;
    /**
     * 开局广播
     */
    var StartMahjongCmd_Brd = (function () {
        function StartMahjongCmd_Brd() {
        }
        StartMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.StartMahjongCmd_Brd'; };
        return StartMahjongCmd_Brd;
    })();
    Cmd.StartMahjongCmd_Brd = StartMahjongCmd_Brd;
    var GreatWall = (function () {
        function GreatWall() {
        }
        GreatWall.prototype.GetType = function () { return 'Cmd.GreatWall'; };
        return GreatWall;
    })();
    Cmd.GreatWall = GreatWall;
    /**
     * 定庄打筛子
     */
    var SetBankerMahjongCmd_Brd = (function () {
        function SetBankerMahjongCmd_Brd() {
        }
        SetBankerMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.SetBankerMahjongCmd_Brd'; };
        return SetBankerMahjongCmd_Brd;
    })();
    Cmd.SetBankerMahjongCmd_Brd = SetBankerMahjongCmd_Brd;
    /**
     * 开局拉庄
     */
    var SetLaZhuangMahjongCmd_Brd = (function () {
        function SetLaZhuangMahjongCmd_Brd() {
        }
        SetLaZhuangMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.SetLaZhuangMahjongCmd_Brd'; };
        return SetLaZhuangMahjongCmd_Brd;
    })();
    Cmd.SetLaZhuangMahjongCmd_Brd = SetLaZhuangMahjongCmd_Brd;
    var LaZhuangMahjongCmd_Brd = (function () {
        function LaZhuangMahjongCmd_Brd() {
        }
        LaZhuangMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.LaZhuangMahjongCmd_Brd'; };
        return LaZhuangMahjongCmd_Brd;
    })();
    Cmd.LaZhuangMahjongCmd_Brd = LaZhuangMahjongCmd_Brd;
    var LaZhuangMahjongCmd_C = (function () {
        function LaZhuangMahjongCmd_C() {
        }
        LaZhuangMahjongCmd_C.prototype.GetType = function () { return 'Cmd.LaZhuangMahjongCmd_C'; };
        return LaZhuangMahjongCmd_C;
    })();
    Cmd.LaZhuangMahjongCmd_C = LaZhuangMahjongCmd_C;
    /**
     * 开局发牌
     */
    var SelfCardMahjongCmd_S = (function () {
        function SelfCardMahjongCmd_S() {
        }
        SelfCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.SelfCardMahjongCmd_S'; };
        return SelfCardMahjongCmd_S;
    })();
    Cmd.SelfCardMahjongCmd_S = SelfCardMahjongCmd_S;
    /**
     * 原缺通知
     */
    var OriginalLackOpCmd_S = (function () {
        function OriginalLackOpCmd_S() {
        }
        OriginalLackOpCmd_S.prototype.GetType = function () { return 'Cmd.OriginalLackOpCmd_S'; };
        return OriginalLackOpCmd_S;
    })();
    Cmd.OriginalLackOpCmd_S = OriginalLackOpCmd_S;
    /**
     * 原缺等待时间
     */
    var OriginalLackOpTimeCmd_Brd = (function () {
        function OriginalLackOpTimeCmd_Brd() {
        }
        OriginalLackOpTimeCmd_Brd.prototype.GetType = function () { return 'Cmd.OriginalLackOpTimeCmd_Brd'; };
        return OriginalLackOpTimeCmd_Brd;
    })();
    Cmd.OriginalLackOpTimeCmd_Brd = OriginalLackOpTimeCmd_Brd;
    /**
     * 原缺操作
     */
    var OriginalLackOpCmd_C = (function () {
        function OriginalLackOpCmd_C() {
        }
        OriginalLackOpCmd_C.prototype.GetType = function () { return 'Cmd.OriginalLackOpCmd_C'; };
        return OriginalLackOpCmd_C;
    })();
    Cmd.OriginalLackOpCmd_C = OriginalLackOpCmd_C;
    /**
     * 原缺操作广播
     */
    var OriginalLackOpCmd_Brd = (function () {
        function OriginalLackOpCmd_Brd() {
        }
        OriginalLackOpCmd_Brd.prototype.GetType = function () { return 'Cmd.OriginalLackOpCmd_Brd'; };
        return OriginalLackOpCmd_Brd;
    })();
    Cmd.OriginalLackOpCmd_Brd = OriginalLackOpCmd_Brd;
    /**
     * 定缺通知
     */
    var EnsureLackOpCmd_S = (function () {
        function EnsureLackOpCmd_S() {
        }
        EnsureLackOpCmd_S.prototype.GetType = function () { return 'Cmd.EnsureLackOpCmd_S'; };
        return EnsureLackOpCmd_S;
    })();
    Cmd.EnsureLackOpCmd_S = EnsureLackOpCmd_S;
    /**
     * 定缺操作
     */
    var EnsureLackOpCmd_C = (function () {
        function EnsureLackOpCmd_C() {
        }
        EnsureLackOpCmd_C.prototype.GetType = function () { return 'Cmd.EnsureLackOpCmd_C'; };
        return EnsureLackOpCmd_C;
    })();
    Cmd.EnsureLackOpCmd_C = EnsureLackOpCmd_C;
    /**
     * 定缺操作广播
     */
    var EnsureLackOpCmd_Brd = (function () {
        function EnsureLackOpCmd_Brd() {
        }
        EnsureLackOpCmd_Brd.prototype.GetType = function () { return 'Cmd.EnsureLackOpCmd_Brd'; };
        return EnsureLackOpCmd_Brd;
    })();
    Cmd.EnsureLackOpCmd_Brd = EnsureLackOpCmd_Brd;
    /**
     * 补花
     */
    var FlowerMahjongCmd_Brd = (function () {
        function FlowerMahjongCmd_Brd() {
        }
        FlowerMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.FlowerMahjongCmd_Brd'; };
        return FlowerMahjongCmd_Brd;
    })();
    Cmd.FlowerMahjongCmd_Brd = FlowerMahjongCmd_Brd;
    /**
     * 翻金
     */
    var TurnGoldMahjongCmd_Brd = (function () {
        function TurnGoldMahjongCmd_Brd() {
        }
        TurnGoldMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.TurnGoldMahjongCmd_Brd'; };
        return TurnGoldMahjongCmd_Brd;
    })();
    Cmd.TurnGoldMahjongCmd_Brd = TurnGoldMahjongCmd_Brd;
    /**
     * 摸牌
     */
    var SendCardMahjongCmd_S = (function () {
        function SendCardMahjongCmd_S() {
        }
        SendCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.SendCardMahjongCmd_S'; };
        return SendCardMahjongCmd_S;
    })();
    Cmd.SendCardMahjongCmd_S = SendCardMahjongCmd_S;
    /**
     * 刷新指定玩家手牌
     */
    var RefreshUserCards_S = (function () {
        function RefreshUserCards_S() {
        }
        RefreshUserCards_S.prototype.GetType = function () { return 'Cmd.RefreshUserCards_S'; };
        return RefreshUserCards_S;
    })();
    Cmd.RefreshUserCards_S = RefreshUserCards_S;
    /**
     * 叠加（换混）牌协议
     */
    var SuperPosition_CS = (function () {
        function SuperPosition_CS() {
        }
        SuperPosition_CS.prototype.GetType = function () { return 'Cmd.SuperPosition_CS'; };
        return SuperPosition_CS;
    })();
    Cmd.SuperPosition_CS = SuperPosition_CS;
    /**
     * 放风放喜堆结构
     */
    var WindCardObj = (function () {
        function WindCardObj() {
        }
        WindCardObj.prototype.GetType = function () { return 'Cmd.WindCardObj'; };
        return WindCardObj;
    })();
    Cmd.WindCardObj = WindCardObj;
    /**
     * 放风推荐牌
     */
    var WindCardThree = (function () {
        function WindCardThree() {
        }
        WindCardThree.prototype.GetType = function () { return 'Cmd.WindCardThree'; };
        return WindCardThree;
    })();
    Cmd.WindCardThree = WindCardThree;
    /**
     * 放风
     */
    var SendWindMahjongCmd_CS = (function () {
        function SendWindMahjongCmd_CS() {
        }
        SendWindMahjongCmd_CS.prototype.GetType = function () { return 'Cmd.SendWindMahjongCmd_CS'; };
        return SendWindMahjongCmd_CS;
    })();
    Cmd.SendWindMahjongCmd_CS = SendWindMahjongCmd_CS;
    /**
     * 跟牌集合
     */
    var FollowCardSet = (function () {
        function FollowCardSet() {
        }
        FollowCardSet.prototype.GetType = function () { return 'Cmd.FollowCardSet'; };
        return FollowCardSet;
    })();
    Cmd.FollowCardSet = FollowCardSet;
    /**
     * 请求听牌提示,不能每次发,太浪费流量了
     */
    var ListenObjMahjongCmd_C = (function () {
        function ListenObjMahjongCmd_C() {
        }
        ListenObjMahjongCmd_C.prototype.GetType = function () { return 'Cmd.ListenObjMahjongCmd_C'; };
        return ListenObjMahjongCmd_C;
    })();
    Cmd.ListenObjMahjongCmd_C = ListenObjMahjongCmd_C;
    var ListenObjMahjongCmd_S = (function () {
        function ListenObjMahjongCmd_S() {
        }
        ListenObjMahjongCmd_S.prototype.GetType = function () { return 'Cmd.ListenObjMahjongCmd_S'; };
        return ListenObjMahjongCmd_S;
    })();
    Cmd.ListenObjMahjongCmd_S = ListenObjMahjongCmd_S;
    /**
     * 广播摸牌信息
     */
    var SendCardMahjongCmd_Brd = (function () {
        function SendCardMahjongCmd_Brd() {
        }
        SendCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.SendCardMahjongCmd_Brd'; };
        return SendCardMahjongCmd_Brd;
    })();
    Cmd.SendCardMahjongCmd_Brd = SendCardMahjongCmd_Brd;
    /**
     * 放弃一个操作
     */
    var CancelOpTypeMahjongCmd_CS = (function () {
        function CancelOpTypeMahjongCmd_CS() {
        }
        CancelOpTypeMahjongCmd_CS.prototype.GetType = function () { return 'Cmd.CancelOpTypeMahjongCmd_CS'; };
        return CancelOpTypeMahjongCmd_CS;
    })();
    Cmd.CancelOpTypeMahjongCmd_CS = CancelOpTypeMahjongCmd_CS;
    /**
     * 请求出牌
     */
    var OutCardMahjongCmd_C = (function () {
        function OutCardMahjongCmd_C() {
        }
        OutCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.OutCardMahjongCmd_C'; };
        return OutCardMahjongCmd_C;
    })();
    Cmd.OutCardMahjongCmd_C = OutCardMahjongCmd_C;
    var OutCardMahjongCmd_S = (function () {
        function OutCardMahjongCmd_S() {
        }
        OutCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.OutCardMahjongCmd_S'; };
        return OutCardMahjongCmd_S;
    })();
    Cmd.OutCardMahjongCmd_S = OutCardMahjongCmd_S;
    /**
     * 广播出牌内容
     */
    var OutCardMahjongCmd_Brd = (function () {
        function OutCardMahjongCmd_Brd() {
        }
        OutCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.OutCardMahjongCmd_Brd'; };
        return OutCardMahjongCmd_Brd;
    })();
    Cmd.OutCardMahjongCmd_Brd = OutCardMahjongCmd_Brd;
    /**
     * GM指令,发所有牌堆给玩家
     */
    var HeapCardGmMahjongCmd_C = (function () {
        function HeapCardGmMahjongCmd_C() {
        }
        HeapCardGmMahjongCmd_C.prototype.GetType = function () { return 'Cmd.HeapCardGmMahjongCmd_C'; };
        return HeapCardGmMahjongCmd_C;
    })();
    Cmd.HeapCardGmMahjongCmd_C = HeapCardGmMahjongCmd_C;
    var KeyValueObj = (function () {
        function KeyValueObj() {
        }
        KeyValueObj.prototype.GetType = function () { return 'Cmd.KeyValueObj'; };
        return KeyValueObj;
    })();
    Cmd.KeyValueObj = KeyValueObj;
    /**
     * GM指令,发所有牌堆给玩家
     */
    var HeapCardGmMahjongCmd_S = (function () {
        function HeapCardGmMahjongCmd_S() {
        }
        HeapCardGmMahjongCmd_S.prototype.GetType = function () { return 'Cmd.HeapCardGmMahjongCmd_S'; };
        return HeapCardGmMahjongCmd_S;
    })();
    Cmd.HeapCardGmMahjongCmd_S = HeapCardGmMahjongCmd_S;
    /**
     * GM指令,请求换一张牌
     */
    var ChangeCardGmMahjongCmd_C = (function () {
        function ChangeCardGmMahjongCmd_C() {
        }
        ChangeCardGmMahjongCmd_C.prototype.GetType = function () { return 'Cmd.ChangeCardGmMahjongCmd_C'; };
        return ChangeCardGmMahjongCmd_C;
    })();
    Cmd.ChangeCardGmMahjongCmd_C = ChangeCardGmMahjongCmd_C;
    /**
     * GM指令,请求换一张牌
     */
    var ChangeCardGmMahjongCmd_S = (function () {
        function ChangeCardGmMahjongCmd_S() {
        }
        ChangeCardGmMahjongCmd_S.prototype.GetType = function () { return 'Cmd.ChangeCardGmMahjongCmd_S'; };
        return ChangeCardGmMahjongCmd_S;
    })();
    Cmd.ChangeCardGmMahjongCmd_S = ChangeCardGmMahjongCmd_S;
    /**
     * 撤回一张牌,回放用
     */
    var RecallOneCardMahjongCmd_S = (function () {
        function RecallOneCardMahjongCmd_S() {
        }
        RecallOneCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.RecallOneCardMahjongCmd_S'; };
        return RecallOneCardMahjongCmd_S;
    })();
    Cmd.RecallOneCardMahjongCmd_S = RecallOneCardMahjongCmd_S;
    var RecallEatCardMahjongCmd_Brd = (function () {
        function RecallEatCardMahjongCmd_Brd() {
        }
        RecallEatCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.RecallEatCardMahjongCmd_Brd'; };
        return RecallEatCardMahjongCmd_Brd;
    })();
    Cmd.RecallEatCardMahjongCmd_Brd = RecallEatCardMahjongCmd_Brd;
    var RecallTouchCardMahjongCmd_Brd = (function () {
        function RecallTouchCardMahjongCmd_Brd() {
        }
        RecallTouchCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.RecallTouchCardMahjongCmd_Brd'; };
        return RecallTouchCardMahjongCmd_Brd;
    })();
    Cmd.RecallTouchCardMahjongCmd_Brd = RecallTouchCardMahjongCmd_Brd;
    var RecallBarCardMahjongCmd_Brd = (function () {
        function RecallBarCardMahjongCmd_Brd() {
        }
        RecallBarCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.RecallBarCardMahjongCmd_Brd'; };
        return RecallBarCardMahjongCmd_Brd;
    })();
    Cmd.RecallBarCardMahjongCmd_Brd = RecallBarCardMahjongCmd_Brd;
    var RecallSupplyCardMahjongCmd_Brd = (function () {
        function RecallSupplyCardMahjongCmd_Brd() {
        }
        RecallSupplyCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.RecallSupplyCardMahjongCmd_Brd'; };
        return RecallSupplyCardMahjongCmd_Brd;
    })();
    Cmd.RecallSupplyCardMahjongCmd_Brd = RecallSupplyCardMahjongCmd_Brd;
    var RecallWinCardMahjongCmd_Brd = (function () {
        function RecallWinCardMahjongCmd_Brd() {
        }
        RecallWinCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.RecallWinCardMahjongCmd_Brd'; };
        return RecallWinCardMahjongCmd_Brd;
    })();
    Cmd.RecallWinCardMahjongCmd_Brd = RecallWinCardMahjongCmd_Brd;
    /**
     * 四川开局换牌用
     */
    var exChangeCardMahjongCmd_S = (function () {
        function exChangeCardMahjongCmd_S() {
        }
        exChangeCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.exChangeCardMahjongCmd_S'; };
        return exChangeCardMahjongCmd_S;
    })();
    Cmd.exChangeCardMahjongCmd_S = exChangeCardMahjongCmd_S;
    /**
     * 四川开局换牌用
     */
    var exChangeCardMahjongCmd_C = (function () {
        function exChangeCardMahjongCmd_C() {
        }
        exChangeCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.exChangeCardMahjongCmd_C'; };
        return exChangeCardMahjongCmd_C;
    })();
    Cmd.exChangeCardMahjongCmd_C = exChangeCardMahjongCmd_C;
    /**
     * 四川开局换牌用
     */
    var exChangeCardMahjongCmd_Brd = (function () {
        function exChangeCardMahjongCmd_Brd() {
        }
        exChangeCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.exChangeCardMahjongCmd_Brd'; };
        return exChangeCardMahjongCmd_Brd;
    })();
    Cmd.exChangeCardMahjongCmd_Brd = exChangeCardMahjongCmd_Brd;
    /**
     * 万州麻将买牌广播
     */
    var BuyCardMahjongCmd_Brd = (function () {
        function BuyCardMahjongCmd_Brd() {
        }
        BuyCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.BuyCardMahjongCmd_Brd'; };
        return BuyCardMahjongCmd_Brd;
    })();
    Cmd.BuyCardMahjongCmd_Brd = BuyCardMahjongCmd_Brd;
    /**
     * 玩家请求买牌
     */
    var UserBuyCardMahjongCmd_C = (function () {
        function UserBuyCardMahjongCmd_C() {
        }
        UserBuyCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.UserBuyCardMahjongCmd_C'; };
        return UserBuyCardMahjongCmd_C;
    })();
    Cmd.UserBuyCardMahjongCmd_C = UserBuyCardMahjongCmd_C;
    /**
     * 取消操作牌
     */
    var CancelOpMahjongCmd_C = (function () {
        function CancelOpMahjongCmd_C() {
        }
        CancelOpMahjongCmd_C.prototype.GetType = function () { return 'Cmd.CancelOpMahjongCmd_C'; };
        return CancelOpMahjongCmd_C;
    })();
    Cmd.CancelOpMahjongCmd_C = CancelOpMahjongCmd_C;
    var CancelOpMahjongCmd_S = (function () {
        function CancelOpMahjongCmd_S() {
        }
        CancelOpMahjongCmd_S.prototype.GetType = function () { return 'Cmd.CancelOpMahjongCmd_S'; };
        return CancelOpMahjongCmd_S;
    })();
    Cmd.CancelOpMahjongCmd_S = CancelOpMahjongCmd_S;
    /**
     * 请求胡牌
     */
    var WinMahjongCmd_C = (function () {
        function WinMahjongCmd_C() {
        }
        WinMahjongCmd_C.prototype.GetType = function () { return 'Cmd.WinMahjongCmd_C'; };
        return WinMahjongCmd_C;
    })();
    Cmd.WinMahjongCmd_C = WinMahjongCmd_C;
    /**
     * 胡牌广播
     */
    var WinCardMahjongCmd_Brd = (function () {
        function WinCardMahjongCmd_Brd() {
        }
        WinCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.WinCardMahjongCmd_Brd'; };
        return WinCardMahjongCmd_Brd;
    })();
    Cmd.WinCardMahjongCmd_Brd = WinCardMahjongCmd_Brd;
    /**
     * 扎鸟广播
     */
    var BirdMahjongCmd_Brd = (function () {
        function BirdMahjongCmd_Brd() {
        }
        BirdMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.BirdMahjongCmd_Brd'; };
        return BirdMahjongCmd_Brd;
    })();
    Cmd.BirdMahjongCmd_Brd = BirdMahjongCmd_Brd;
    var WinMahjongCmd_S = (function () {
        function WinMahjongCmd_S() {
        }
        WinMahjongCmd_S.prototype.GetType = function () { return 'Cmd.WinMahjongCmd_S'; };
        return WinMahjongCmd_S;
    })();
    Cmd.WinMahjongCmd_S = WinMahjongCmd_S;
    var WinPointObj = (function () {
        function WinPointObj() {
        }
        WinPointObj.prototype.GetType = function () { return 'Cmd.WinPointObj'; };
        return WinPointObj;
    })();
    Cmd.WinPointObj = WinPointObj;
    /**
     * 多次胡牌的过程中广播
     */
    var WinMahjongCmd_Brd = (function () {
        function WinMahjongCmd_Brd() {
        }
        WinMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.WinMahjongCmd_Brd'; };
        return WinMahjongCmd_Brd;
    })();
    Cmd.WinMahjongCmd_Brd = WinMahjongCmd_Brd;
    var HorseObj = (function () {
        function HorseObj() {
        }
        HorseObj.prototype.GetType = function () { return 'Cmd.HorseObj'; };
        return HorseObj;
    })();
    Cmd.HorseObj = HorseObj;
    var WinCardObjNew = (function () {
        function WinCardObjNew() {
        }
        WinCardObjNew.prototype.GetType = function () { return 'Cmd.WinCardObjNew'; };
        return WinCardObjNew;
    })();
    Cmd.WinCardObjNew = WinCardObjNew;
    /**
     * 广播胡牌结果
     */
    var WinRetMahjongCmd_Brd = (function () {
        function WinRetMahjongCmd_Brd() {
        }
        WinRetMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.WinRetMahjongCmd_Brd'; };
        return WinRetMahjongCmd_Brd;
    })();
    Cmd.WinRetMahjongCmd_Brd = WinRetMahjongCmd_Brd;
    var ChickenStruct = (function () {
        function ChickenStruct() {
        }
        ChickenStruct.prototype.GetType = function () { return 'Cmd.ChickenStruct'; };
        return ChickenStruct;
    })();
    Cmd.ChickenStruct = ChickenStruct;
    /**
     * 抓鸡
     */
    var CashChickenCmd_Brd = (function () {
        function CashChickenCmd_Brd() {
        }
        CashChickenCmd_Brd.prototype.GetType = function () { return 'Cmd.CashChickenCmd_Brd'; };
        return CashChickenCmd_Brd;
    })();
    Cmd.CashChickenCmd_Brd = CashChickenCmd_Brd;
    /**
     * 天听000000000000000000
     */
    var SkyListenCmd_S = (function () {
        function SkyListenCmd_S() {
        }
        SkyListenCmd_S.prototype.GetType = function () { return 'Cmd.SkyListenCmd_S'; };
        return SkyListenCmd_S;
    })();
    Cmd.SkyListenCmd_S = SkyListenCmd_S;
    /**
     * 只在开局天听使用
     */
    var SkyListenCmd_C = (function () {
        function SkyListenCmd_C() {
        }
        SkyListenCmd_C.prototype.GetType = function () { return 'Cmd.SkyListenCmd_C'; };
        return SkyListenCmd_C;
    })();
    Cmd.SkyListenCmd_C = SkyListenCmd_C;
    var SkyListenCmd_Brd = (function () {
        function SkyListenCmd_Brd() {
        }
        SkyListenCmd_Brd.prototype.GetType = function () { return 'Cmd.SkyListenCmd_Brd'; };
        return SkyListenCmd_Brd;
    })();
    Cmd.SkyListenCmd_Brd = SkyListenCmd_Brd;
    /**
     * 请求杠牌
     */
    var BarCardMahjongCmd_C = (function () {
        function BarCardMahjongCmd_C() {
        }
        BarCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.BarCardMahjongCmd_C'; };
        return BarCardMahjongCmd_C;
    })();
    Cmd.BarCardMahjongCmd_C = BarCardMahjongCmd_C;
    var BarCardMahjongCmd_S = (function () {
        function BarCardMahjongCmd_S() {
        }
        BarCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.BarCardMahjongCmd_S'; };
        return BarCardMahjongCmd_S;
    })();
    Cmd.BarCardMahjongCmd_S = BarCardMahjongCmd_S;
    /**
     * 任丘  请求风,箭
     */
    var FengCardMahjongCmd_C = (function () {
        function FengCardMahjongCmd_C() {
        }
        FengCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.FengCardMahjongCmd_C'; };
        return FengCardMahjongCmd_C;
    })();
    Cmd.FengCardMahjongCmd_C = FengCardMahjongCmd_C;
    var FengCardMahjongCmd_S = (function () {
        function FengCardMahjongCmd_S() {
        }
        FengCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.FengCardMahjongCmd_S'; };
        return FengCardMahjongCmd_S;
    })();
    Cmd.FengCardMahjongCmd_S = FengCardMahjongCmd_S;
    /**
     * 杠牌堆结构
     */
    var BarCardObj = (function () {
        function BarCardObj() {
        }
        BarCardObj.prototype.GetType = function () { return 'Cmd.BarCardObj'; };
        return BarCardObj;
    })();
    Cmd.BarCardObj = BarCardObj;
    /**
     * 长沙麻将杠牌结构
     */
    var BarDealCardObj = (function () {
        function BarDealCardObj() {
        }
        BarDealCardObj.prototype.GetType = function () { return 'Cmd.BarDealCardObj'; };
        return BarDealCardObj;
    })();
    Cmd.BarDealCardObj = BarDealCardObj;
    /**
     * 广播杠牌
     */
    var BarCardMahjongCmd_Brd = (function () {
        function BarCardMahjongCmd_Brd() {
        }
        BarCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.BarCardMahjongCmd_Brd'; };
        return BarCardMahjongCmd_Brd;
    })();
    Cmd.BarCardMahjongCmd_Brd = BarCardMahjongCmd_Brd;
    /**
     * 开杠打筛子
     */
    var BarDiceMahjongCmd_Brd = (function () {
        function BarDiceMahjongCmd_Brd() {
        }
        BarDiceMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.BarDiceMahjongCmd_Brd'; };
        return BarDiceMahjongCmd_Brd;
    })();
    Cmd.BarDiceMahjongCmd_Brd = BarDiceMahjongCmd_Brd;
    /**
     * 开杠发牌 --- 其他人看到自己摸了两张牌
     */
    var BarDealCardMahjongCmd_Brd = (function () {
        function BarDealCardMahjongCmd_Brd() {
        }
        BarDealCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.BarDealCardMahjongCmd_Brd'; };
        return BarDealCardMahjongCmd_Brd;
    })();
    Cmd.BarDealCardMahjongCmd_Brd = BarDealCardMahjongCmd_Brd;
    var BarDealCardMahjongCmd_S = (function () {
        function BarDealCardMahjongCmd_S() {
        }
        BarDealCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.BarDealCardMahjongCmd_S'; };
        return BarDealCardMahjongCmd_S;
    })();
    Cmd.BarDealCardMahjongCmd_S = BarDealCardMahjongCmd_S;
    /**
     * 开杠玩家操作
     */
    var BarOpMahjongCmd_C = (function () {
        function BarOpMahjongCmd_C() {
        }
        BarOpMahjongCmd_C.prototype.GetType = function () { return 'Cmd.BarOpMahjongCmd_C'; };
        return BarOpMahjongCmd_C;
    })();
    Cmd.BarOpMahjongCmd_C = BarOpMahjongCmd_C;
    /**
     * 海底漫游 轮转广播
     */
    var SeaRoamTurnMahjongCmd_Brd = (function () {
        function SeaRoamTurnMahjongCmd_Brd() {
        }
        SeaRoamTurnMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.SeaRoamTurnMahjongCmd_Brd'; };
        return SeaRoamTurnMahjongCmd_Brd;
    })();
    Cmd.SeaRoamTurnMahjongCmd_Brd = SeaRoamTurnMahjongCmd_Brd;
    /**
     * 海底漫游操作请求
     */
    var SeaRoamMahjongCmd_C = (function () {
        function SeaRoamMahjongCmd_C() {
        }
        SeaRoamMahjongCmd_C.prototype.GetType = function () { return 'Cmd.SeaRoamMahjongCmd_C'; };
        return SeaRoamMahjongCmd_C;
    })();
    Cmd.SeaRoamMahjongCmd_C = SeaRoamMahjongCmd_C;
    /**
     * 海底牌广播
     */
    var SeaFloorCardMahjongCmd_Brd = (function () {
        function SeaFloorCardMahjongCmd_Brd() {
        }
        SeaFloorCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.SeaFloorCardMahjongCmd_Brd'; };
        return SeaFloorCardMahjongCmd_Brd;
    })();
    Cmd.SeaFloorCardMahjongCmd_Brd = SeaFloorCardMahjongCmd_Brd;
    /**
     * 开杠打牌广播
     */
    var BarOutCardMahjongCmd_Brd = (function () {
        function BarOutCardMahjongCmd_Brd() {
        }
        BarOutCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.BarOutCardMahjongCmd_Brd'; };
        return BarOutCardMahjongCmd_Brd;
    })();
    Cmd.BarOutCardMahjongCmd_Brd = BarOutCardMahjongCmd_Brd;
    /**
     * 碰牌堆结构
     */
    var EatCardObj = (function () {
        function EatCardObj() {
        }
        EatCardObj.prototype.GetType = function () { return 'Cmd.EatCardObj'; };
        return EatCardObj;
    })();
    Cmd.EatCardObj = EatCardObj;
    /**
     * 请求吃牌
     */
    var EatCardMahjongCmd_C = (function () {
        function EatCardMahjongCmd_C() {
        }
        EatCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.EatCardMahjongCmd_C'; };
        return EatCardMahjongCmd_C;
    })();
    Cmd.EatCardMahjongCmd_C = EatCardMahjongCmd_C;
    var EatCardMahjongCmd_S = (function () {
        function EatCardMahjongCmd_S() {
        }
        EatCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.EatCardMahjongCmd_S'; };
        return EatCardMahjongCmd_S;
    })();
    Cmd.EatCardMahjongCmd_S = EatCardMahjongCmd_S;
    var EatCardMahjongCmd_Brd = (function () {
        function EatCardMahjongCmd_Brd() {
        }
        EatCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.EatCardMahjongCmd_Brd'; };
        return EatCardMahjongCmd_Brd;
    })();
    Cmd.EatCardMahjongCmd_Brd = EatCardMahjongCmd_Brd;
    /**
     * 碰牌堆结构
     */
    var TouchCardObj = (function () {
        function TouchCardObj() {
        }
        TouchCardObj.prototype.GetType = function () { return 'Cmd.TouchCardObj'; };
        return TouchCardObj;
    })();
    Cmd.TouchCardObj = TouchCardObj;
    /**
     * 请求碰牌
     */
    var TouchCardMahjongCmd_C = (function () {
        function TouchCardMahjongCmd_C() {
        }
        TouchCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.TouchCardMahjongCmd_C'; };
        return TouchCardMahjongCmd_C;
    })();
    Cmd.TouchCardMahjongCmd_C = TouchCardMahjongCmd_C;
    var TouchCardMahjongCmd_S = (function () {
        function TouchCardMahjongCmd_S() {
        }
        TouchCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.TouchCardMahjongCmd_S'; };
        return TouchCardMahjongCmd_S;
    })();
    Cmd.TouchCardMahjongCmd_S = TouchCardMahjongCmd_S;
    /**
     * 广播碰牌
     */
    var TouchCardMahjongCmd_Brd = (function () {
        function TouchCardMahjongCmd_Brd() {
        }
        TouchCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.TouchCardMahjongCmd_Brd'; };
        return TouchCardMahjongCmd_Brd;
    })();
    Cmd.TouchCardMahjongCmd_Brd = TouchCardMahjongCmd_Brd;
    /**
     * 请求听牌
     */
    var ListenCardMahjongCmd_C = (function () {
        function ListenCardMahjongCmd_C() {
        }
        ListenCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.ListenCardMahjongCmd_C'; };
        return ListenCardMahjongCmd_C;
    })();
    Cmd.ListenCardMahjongCmd_C = ListenCardMahjongCmd_C;
    var ListenCardMahjongCmd_S = (function () {
        function ListenCardMahjongCmd_S() {
        }
        ListenCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.ListenCardMahjongCmd_S'; };
        return ListenCardMahjongCmd_S;
    })();
    Cmd.ListenCardMahjongCmd_S = ListenCardMahjongCmd_S;
    /**
     * 广播听牌
     */
    var ListenCardMahjongCmd_Brd = (function () {
        function ListenCardMahjongCmd_Brd() {
        }
        ListenCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.ListenCardMahjongCmd_Brd'; };
        return ListenCardMahjongCmd_Brd;
    })();
    Cmd.ListenCardMahjongCmd_Brd = ListenCardMahjongCmd_Brd;
    /**
     * 请求亮牌
     */
    var ShowCardMahjongCmd_S = (function () {
        function ShowCardMahjongCmd_S() {
        }
        ShowCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.ShowCardMahjongCmd_S'; };
        return ShowCardMahjongCmd_S;
    })();
    Cmd.ShowCardMahjongCmd_S = ShowCardMahjongCmd_S;
    var ShowCardMahjongCmd_C = (function () {
        function ShowCardMahjongCmd_C() {
        }
        ShowCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.ShowCardMahjongCmd_C'; };
        return ShowCardMahjongCmd_C;
    })();
    Cmd.ShowCardMahjongCmd_C = ShowCardMahjongCmd_C;
    var ShowCardMahjongCmd_Brd = (function () {
        function ShowCardMahjongCmd_Brd() {
        }
        ShowCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.ShowCardMahjongCmd_Brd'; };
        return ShowCardMahjongCmd_Brd;
    })();
    Cmd.ShowCardMahjongCmd_Brd = ShowCardMahjongCmd_Brd;
    /**
     * 请求漂分
     */
    var ReqPiaoMahjongCmd_C = (function () {
        function ReqPiaoMahjongCmd_C() {
        }
        ReqPiaoMahjongCmd_C.prototype.GetType = function () { return 'Cmd.ReqPiaoMahjongCmd_C'; };
        return ReqPiaoMahjongCmd_C;
    })();
    Cmd.ReqPiaoMahjongCmd_C = ReqPiaoMahjongCmd_C;
    var ReqPiaoMahjongCmd_S = (function () {
        function ReqPiaoMahjongCmd_S() {
        }
        ReqPiaoMahjongCmd_S.prototype.GetType = function () { return 'Cmd.ReqPiaoMahjongCmd_S'; };
        return ReqPiaoMahjongCmd_S;
    })();
    Cmd.ReqPiaoMahjongCmd_S = ReqPiaoMahjongCmd_S;
    var ReqPiaoMahjongCmd_Brd = (function () {
        function ReqPiaoMahjongCmd_Brd() {
        }
        ReqPiaoMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.ReqPiaoMahjongCmd_Brd'; };
        return ReqPiaoMahjongCmd_Brd;
    })();
    Cmd.ReqPiaoMahjongCmd_Brd = ReqPiaoMahjongCmd_Brd;
    var StartPiaoMahjongCmd_Brd = (function () {
        function StartPiaoMahjongCmd_Brd() {
        }
        StartPiaoMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.StartPiaoMahjongCmd_Brd'; };
        return StartPiaoMahjongCmd_Brd;
    })();
    Cmd.StartPiaoMahjongCmd_Brd = StartPiaoMahjongCmd_Brd;
    /**
     * 结束漂分广播
     */
    var EndPiaoMahjongCmd_Brd = (function () {
        function EndPiaoMahjongCmd_Brd() {
        }
        EndPiaoMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.EndPiaoMahjongCmd_Brd'; };
        return EndPiaoMahjongCmd_Brd;
    })();
    Cmd.EndPiaoMahjongCmd_Brd = EndPiaoMahjongCmd_Brd;
    /**
     * 托管
     */
    var HostMahjongCmd_C = (function () {
        function HostMahjongCmd_C() {
        }
        HostMahjongCmd_C.prototype.GetType = function () { return 'Cmd.HostMahjongCmd_C'; };
        return HostMahjongCmd_C;
    })();
    Cmd.HostMahjongCmd_C = HostMahjongCmd_C;
    var HostMahjongCmd_S = (function () {
        function HostMahjongCmd_S() {
        }
        HostMahjongCmd_S.prototype.GetType = function () { return 'Cmd.HostMahjongCmd_S'; };
        return HostMahjongCmd_S;
    })();
    Cmd.HostMahjongCmd_S = HostMahjongCmd_S;
    /**
     * 托管广播
     */
    var HostMahjongCmd_Brd = (function () {
        function HostMahjongCmd_Brd() {
        }
        HostMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.HostMahjongCmd_Brd'; };
        return HostMahjongCmd_Brd;
    })();
    Cmd.HostMahjongCmd_Brd = HostMahjongCmd_Brd;
    /**
     * 超时等待广播
     */
    var TimeOutWaitMahjongCmd_Brd = (function () {
        function TimeOutWaitMahjongCmd_Brd() {
        }
        TimeOutWaitMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.TimeOutWaitMahjongCmd_Brd'; };
        return TimeOutWaitMahjongCmd_Brd;
    })();
    Cmd.TimeOutWaitMahjongCmd_Brd = TimeOutWaitMahjongCmd_Brd;
    /**
     * 刷新玩家筹码广播
     */
    var RefreshChipsMahjongCmd_Brd = (function () {
        function RefreshChipsMahjongCmd_Brd() {
        }
        RefreshChipsMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.RefreshChipsMahjongCmd_Brd'; };
        return RefreshChipsMahjongCmd_Brd;
    })();
    Cmd.RefreshChipsMahjongCmd_Brd = RefreshChipsMahjongCmd_Brd;
    var RefreshPointsMahjongCmd_Brd = (function () {
        function RefreshPointsMahjongCmd_Brd() {
        }
        RefreshPointsMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.RefreshPointsMahjongCmd_Brd'; };
        return RefreshPointsMahjongCmd_Brd;
    })();
    Cmd.RefreshPointsMahjongCmd_Brd = RefreshPointsMahjongCmd_Brd;
    /**
     * 刷新玩家听牌集合
     */
    var RefreshListenCardSetMahjongCmd_S = (function () {
        function RefreshListenCardSetMahjongCmd_S() {
        }
        RefreshListenCardSetMahjongCmd_S.prototype.GetType = function () { return 'Cmd.RefreshListenCardSetMahjongCmd_S'; };
        return RefreshListenCardSetMahjongCmd_S;
    })();
    Cmd.RefreshListenCardSetMahjongCmd_S = RefreshListenCardSetMahjongCmd_S;
    /**
     * 请求踢人
     */
    var KickMahjongCmd_C = (function () {
        function KickMahjongCmd_C() {
        }
        KickMahjongCmd_C.prototype.GetType = function () { return 'Cmd.KickMahjongCmd_C'; };
        return KickMahjongCmd_C;
    })();
    Cmd.KickMahjongCmd_C = KickMahjongCmd_C;
    var KickMahjongCmd_S = (function () {
        function KickMahjongCmd_S() {
        }
        KickMahjongCmd_S.prototype.GetType = function () { return 'Cmd.KickMahjongCmd_S'; };
        return KickMahjongCmd_S;
    })();
    Cmd.KickMahjongCmd_S = KickMahjongCmd_S;
    /**
     * 踢人广播
     */
    var KickMahjongCmd_Brd = (function () {
        function KickMahjongCmd_Brd() {
        }
        KickMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.KickMahjongCmd_Brd'; };
        return KickMahjongCmd_Brd;
    })();
    Cmd.KickMahjongCmd_Brd = KickMahjongCmd_Brd;
    /**
     * 送礼
     */
    var SendGiftMahjongCmd_C = (function () {
        function SendGiftMahjongCmd_C() {
        }
        SendGiftMahjongCmd_C.prototype.GetType = function () { return 'Cmd.SendGiftMahjongCmd_C'; };
        return SendGiftMahjongCmd_C;
    })();
    Cmd.SendGiftMahjongCmd_C = SendGiftMahjongCmd_C;
    var SendGiftMahjongCmd_S = (function () {
        function SendGiftMahjongCmd_S() {
        }
        SendGiftMahjongCmd_S.prototype.GetType = function () { return 'Cmd.SendGiftMahjongCmd_S'; };
        return SendGiftMahjongCmd_S;
    })();
    Cmd.SendGiftMahjongCmd_S = SendGiftMahjongCmd_S;
    var SendGiftMahjongCmd_Brd = (function () {
        function SendGiftMahjongCmd_Brd() {
        }
        SendGiftMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.SendGiftMahjongCmd_Brd'; };
        return SendGiftMahjongCmd_Brd;
    })();
    Cmd.SendGiftMahjongCmd_Brd = SendGiftMahjongCmd_Brd;
    var UserRecord = (function () {
        function UserRecord() {
        }
        UserRecord.prototype.GetType = function () { return 'Cmd.UserRecord'; };
        return UserRecord;
    })();
    Cmd.UserRecord = UserRecord;
    var JiaoObj = (function () {
        function JiaoObj() {
        }
        JiaoObj.prototype.GetType = function () { return 'Cmd.JiaoObj'; };
        return JiaoObj;
    })();
    Cmd.JiaoObj = JiaoObj;
    /**
     * 总成绩
     */
    var FinalScoreMahjongCmd_C = (function () {
        function FinalScoreMahjongCmd_C() {
        }
        FinalScoreMahjongCmd_C.prototype.GetType = function () { return 'Cmd.FinalScoreMahjongCmd_C'; };
        return FinalScoreMahjongCmd_C;
    })();
    Cmd.FinalScoreMahjongCmd_C = FinalScoreMahjongCmd_C;
    var FinalScoreMahjongCmd_S = (function () {
        function FinalScoreMahjongCmd_S() {
        }
        FinalScoreMahjongCmd_S.prototype.GetType = function () { return 'Cmd.FinalScoreMahjongCmd_S'; };
        return FinalScoreMahjongCmd_S;
    })();
    Cmd.FinalScoreMahjongCmd_S = FinalScoreMahjongCmd_S;
    var FinalScoreMahjongCmd_Brd = (function () {
        function FinalScoreMahjongCmd_Brd() {
        }
        FinalScoreMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.FinalScoreMahjongCmd_Brd'; };
        return FinalScoreMahjongCmd_Brd;
    })();
    Cmd.FinalScoreMahjongCmd_Brd = FinalScoreMahjongCmd_Brd;
    /**
     * 开局操作集
     */
    var StartNewRoundOpCmd_S = (function () {
        function StartNewRoundOpCmd_S() {
        }
        StartNewRoundOpCmd_S.prototype.GetType = function () { return 'Cmd.StartNewRoundOpCmd_S'; };
        return StartNewRoundOpCmd_S;
    })();
    Cmd.StartNewRoundOpCmd_S = StartNewRoundOpCmd_S;
    /**
     * 起手小胡等待时间
     */
    var StartNewRoundOpTimeCmd_Brd = (function () {
        function StartNewRoundOpTimeCmd_Brd() {
        }
        StartNewRoundOpTimeCmd_Brd.prototype.GetType = function () { return 'Cmd.StartNewRoundOpTimeCmd_Brd'; };
        return StartNewRoundOpTimeCmd_Brd;
    })();
    Cmd.StartNewRoundOpTimeCmd_Brd = StartNewRoundOpTimeCmd_Brd;
    /**
     * 开局请求操作
     */
    var StartNewRoundOpCmd_C = (function () {
        function StartNewRoundOpCmd_C() {
        }
        StartNewRoundOpCmd_C.prototype.GetType = function () { return 'Cmd.StartNewRoundOpCmd_C'; };
        return StartNewRoundOpCmd_C;
    })();
    Cmd.StartNewRoundOpCmd_C = StartNewRoundOpCmd_C;
    /**
     * 开局操作广播
     */
    var StartNewRoundOpCmd_Brd = (function () {
        function StartNewRoundOpCmd_Brd() {
        }
        StartNewRoundOpCmd_Brd.prototype.GetType = function () { return 'Cmd.StartNewRoundOpCmd_Brd'; };
        return StartNewRoundOpCmd_Brd;
    })();
    Cmd.StartNewRoundOpCmd_Brd = StartNewRoundOpCmd_Brd;
    var StartNewRoundOp_Brd = (function () {
        function StartNewRoundOp_Brd() {
        }
        StartNewRoundOp_Brd.prototype.GetType = function () { return 'Cmd.StartNewRoundOp_Brd'; };
        return StartNewRoundOp_Brd;
    })();
    Cmd.StartNewRoundOp_Brd = StartNewRoundOp_Brd;
    /**
     * 请求补张
     */
    var SupplyCardMahjongCmd_C = (function () {
        function SupplyCardMahjongCmd_C() {
        }
        SupplyCardMahjongCmd_C.prototype.GetType = function () { return 'Cmd.SupplyCardMahjongCmd_C'; };
        return SupplyCardMahjongCmd_C;
    })();
    Cmd.SupplyCardMahjongCmd_C = SupplyCardMahjongCmd_C;
    var SupplyCardMahjongCmd_S = (function () {
        function SupplyCardMahjongCmd_S() {
        }
        SupplyCardMahjongCmd_S.prototype.GetType = function () { return 'Cmd.SupplyCardMahjongCmd_S'; };
        return SupplyCardMahjongCmd_S;
    })();
    Cmd.SupplyCardMahjongCmd_S = SupplyCardMahjongCmd_S;
    /**
     * 广播补张
     */
    var SupplyCardMahjongCmd_Brd = (function () {
        function SupplyCardMahjongCmd_Brd() {
        }
        SupplyCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.SupplyCardMahjongCmd_Brd'; };
        return SupplyCardMahjongCmd_Brd;
    })();
    Cmd.SupplyCardMahjongCmd_Brd = SupplyCardMahjongCmd_Brd;
    /**
     * 获取牌堆剩余牌数
     */
    var GetHeapCard_C = (function () {
        function GetHeapCard_C() {
        }
        GetHeapCard_C.prototype.GetType = function () { return 'Cmd.GetHeapCard_C'; };
        return GetHeapCard_C;
    })();
    Cmd.GetHeapCard_C = GetHeapCard_C;
    var GetHeapCard_S = (function () {
        function GetHeapCard_S() {
        }
        GetHeapCard_S.prototype.GetType = function () { return 'Cmd.GetHeapCard_S'; };
        return GetHeapCard_S;
    })();
    Cmd.GetHeapCard_S = GetHeapCard_S;
    /**
     * ping值广播
     */
    var SetPingTimeNullUserPmd_Brd = (function () {
        function SetPingTimeNullUserPmd_Brd() {
        }
        SetPingTimeNullUserPmd_Brd.prototype.GetType = function () { return 'Cmd.SetPingTimeNullUserPmd_Brd'; };
        return SetPingTimeNullUserPmd_Brd;
    })();
    Cmd.SetPingTimeNullUserPmd_Brd = SetPingTimeNullUserPmd_Brd;
    var SetSameIpWarn_S = (function () {
        function SetSameIpWarn_S() {
        }
        SetSameIpWarn_S.prototype.GetType = function () { return 'Cmd.SetSameIpWarn_S'; };
        return SetSameIpWarn_S;
    })();
    Cmd.SetSameIpWarn_S = SetSameIpWarn_S;
    var SysMessageMahjongCmd_S = (function () {
        function SysMessageMahjongCmd_S() {
        }
        SysMessageMahjongCmd_S.prototype.GetType = function () { return 'Cmd.SysMessageMahjongCmd_S'; };
        return SysMessageMahjongCmd_S;
    })();
    Cmd.SysMessageMahjongCmd_S = SysMessageMahjongCmd_S;
    var ChangePointMahjongCmd_Brd = (function () {
        function ChangePointMahjongCmd_Brd() {
        }
        ChangePointMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.ChangePointMahjongCmd_Brd'; };
        return ChangePointMahjongCmd_Brd;
    })();
    Cmd.ChangePointMahjongCmd_Brd = ChangePointMahjongCmd_Brd;
    /**
     * 换桌,同一房间换,名字没起好
     */
    var ChangeRoomMahjongCmd_C = (function () {
        function ChangeRoomMahjongCmd_C() {
        }
        ChangeRoomMahjongCmd_C.prototype.GetType = function () { return 'Cmd.ChangeRoomMahjongCmd_C'; };
        return ChangeRoomMahjongCmd_C;
    })();
    Cmd.ChangeRoomMahjongCmd_C = ChangeRoomMahjongCmd_C;
    var ChangeRoomMahjongCmd_S = (function () {
        function ChangeRoomMahjongCmd_S() {
        }
        ChangeRoomMahjongCmd_S.prototype.GetType = function () { return 'Cmd.ChangeRoomMahjongCmd_S'; };
        return ChangeRoomMahjongCmd_S;
    })();
    Cmd.ChangeRoomMahjongCmd_S = ChangeRoomMahjongCmd_S;
    /**
     * 宽甸麻将 二人麻将 大邑麻将
     */
    var PlayButtonMahjongCmd_S = (function () {
        function PlayButtonMahjongCmd_S() {
        }
        PlayButtonMahjongCmd_S.prototype.GetType = function () { return 'Cmd.PlayButtonMahjongCmd_S'; };
        return PlayButtonMahjongCmd_S;
    })();
    Cmd.PlayButtonMahjongCmd_S = PlayButtonMahjongCmd_S;
    var PlayButtonMahjongCmd_C = (function () {
        function PlayButtonMahjongCmd_C() {
        }
        PlayButtonMahjongCmd_C.prototype.GetType = function () { return 'Cmd.PlayButtonMahjongCmd_C'; };
        return PlayButtonMahjongCmd_C;
    })();
    Cmd.PlayButtonMahjongCmd_C = PlayButtonMahjongCmd_C;
    var PlayButtonMahjongCmd_Brd = (function () {
        function PlayButtonMahjongCmd_Brd() {
        }
        PlayButtonMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.PlayButtonMahjongCmd_Brd'; };
        return PlayButtonMahjongCmd_Brd;
    })();
    Cmd.PlayButtonMahjongCmd_Brd = PlayButtonMahjongCmd_Brd;
    /**
     * 请求加倍
     */
    var DoubleMahjongCmd_C = (function () {
        function DoubleMahjongCmd_C() {
        }
        DoubleMahjongCmd_C.prototype.GetType = function () { return 'Cmd.DoubleMahjongCmd_C'; };
        return DoubleMahjongCmd_C;
    })();
    Cmd.DoubleMahjongCmd_C = DoubleMahjongCmd_C;
    var DoubleMahjongCmd_S = (function () {
        function DoubleMahjongCmd_S() {
        }
        DoubleMahjongCmd_S.prototype.GetType = function () { return 'Cmd.DoubleMahjongCmd_S'; };
        return DoubleMahjongCmd_S;
    })();
    Cmd.DoubleMahjongCmd_S = DoubleMahjongCmd_S;
    var DoubleMahjongCmd_Brd = (function () {
        function DoubleMahjongCmd_Brd() {
        }
        DoubleMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.DoubleMahjongCmd_Brd'; };
        return DoubleMahjongCmd_Brd;
    })();
    Cmd.DoubleMahjongCmd_Brd = DoubleMahjongCmd_Brd;
    var CheckMoneyMahjongCmd_S = (function () {
        function CheckMoneyMahjongCmd_S() {
        }
        CheckMoneyMahjongCmd_S.prototype.GetType = function () { return 'Cmd.CheckMoneyMahjongCmd_S'; };
        return CheckMoneyMahjongCmd_S;
    })();
    Cmd.CheckMoneyMahjongCmd_S = CheckMoneyMahjongCmd_S;
    /**
     * 金币场游戏中充值广播
     */
    var ChargeGoldCoinMahjongCmd_Brd = (function () {
        function ChargeGoldCoinMahjongCmd_Brd() {
        }
        ChargeGoldCoinMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.ChargeGoldCoinMahjongCmd_Brd'; };
        return ChargeGoldCoinMahjongCmd_Brd;
    })();
    Cmd.ChargeGoldCoinMahjongCmd_Brd = ChargeGoldCoinMahjongCmd_Brd;
    /**
     * 取消充值金币操作
     */
    var CancelChargeGoldCoinMahjongCmd_C = (function () {
        function CancelChargeGoldCoinMahjongCmd_C() {
        }
        CancelChargeGoldCoinMahjongCmd_C.prototype.GetType = function () { return 'Cmd.CancelChargeGoldCoinMahjongCmd_C'; };
        return CancelChargeGoldCoinMahjongCmd_C;
    })();
    Cmd.CancelChargeGoldCoinMahjongCmd_C = CancelChargeGoldCoinMahjongCmd_C;
    /**
     * 对局流水信息
     */
    var GameWaterMahjongCmd_S = (function () {
        function GameWaterMahjongCmd_S() {
        }
        GameWaterMahjongCmd_S.prototype.GetType = function () { return 'Cmd.GameWaterMahjongCmd_S'; };
        return GameWaterMahjongCmd_S;
    })();
    Cmd.GameWaterMahjongCmd_S = GameWaterMahjongCmd_S;
    /**
     * 血战血流 认输广播
     */
    var GameLoserUidMahjongCmd_Brd = (function () {
        function GameLoserUidMahjongCmd_Brd() {
        }
        GameLoserUidMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.GameLoserUidMahjongCmd_Brd'; };
        return GameLoserUidMahjongCmd_Brd;
    })();
    Cmd.GameLoserUidMahjongCmd_Brd = GameLoserUidMahjongCmd_Brd;
    var PointDetail = (function () {
        function PointDetail() {
        }
        PointDetail.prototype.GetType = function () { return 'Cmd.PointDetail'; };
        return PointDetail;
    })();
    Cmd.PointDetail = PointDetail;
    var XiaGoldDetail = (function () {
        function XiaGoldDetail() {
        }
        XiaGoldDetail.prototype.GetType = function () { return 'Cmd.XiaGoldDetail'; };
        return XiaGoldDetail;
    })();
    Cmd.XiaGoldDetail = XiaGoldDetail;
    /**
     * 南昌麻将 下精算分广播
     */
    var XiaGoldCardPointMahjongCmd_Brd = (function () {
        function XiaGoldCardPointMahjongCmd_Brd() {
        }
        XiaGoldCardPointMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.XiaGoldCardPointMahjongCmd_Brd'; };
        return XiaGoldCardPointMahjongCmd_Brd;
    })();
    Cmd.XiaGoldCardPointMahjongCmd_Brd = XiaGoldCardPointMahjongCmd_Brd;
    /**
     * 开始抓花广播
     */
    var StartSelectCardMahjong_Brd = (function () {
        function StartSelectCardMahjong_Brd() {
        }
        StartSelectCardMahjong_Brd.prototype.GetType = function () { return 'Cmd.StartSelectCardMahjong_Brd'; };
        return StartSelectCardMahjong_Brd;
    })();
    Cmd.StartSelectCardMahjong_Brd = StartSelectCardMahjong_Brd;
    /**
     * 请求抓花
     */
    var SelectCardMahjong_C = (function () {
        function SelectCardMahjong_C() {
        }
        SelectCardMahjong_C.prototype.GetType = function () { return 'Cmd.SelectCardMahjong_C'; };
        return SelectCardMahjong_C;
    })();
    Cmd.SelectCardMahjong_C = SelectCardMahjong_C;
    /**
     * 抓花广播
     */
    var SelectCardMahjong_Brd = (function () {
        function SelectCardMahjong_Brd() {
        }
        SelectCardMahjong_Brd.prototype.GetType = function () { return 'Cmd.SelectCardMahjong_Brd'; };
        return SelectCardMahjong_Brd;
    })();
    Cmd.SelectCardMahjong_Brd = SelectCardMahjong_Brd;
    /**
     * 万州麻将的换牌数据
     */
    var ChangeCardDataMahjong_S = (function () {
        function ChangeCardDataMahjong_S() {
        }
        ChangeCardDataMahjong_S.prototype.GetType = function () { return 'Cmd.ChangeCardDataMahjong_S'; };
        return ChangeCardDataMahjong_S;
    })();
    Cmd.ChangeCardDataMahjong_S = ChangeCardDataMahjong_S;
    /**
     * 万州麻将的买牌广播
     */
    var BuyCardMahjong_Brd = (function () {
        function BuyCardMahjong_Brd() {
        }
        BuyCardMahjong_Brd.prototype.GetType = function () { return 'Cmd.BuyCardMahjong_Brd'; };
        return BuyCardMahjong_Brd;
    })();
    Cmd.BuyCardMahjong_Brd = BuyCardMahjong_Brd;
    /**
     * 万州麻将的已胡玩家数据广播
     */
    var WinSeatCardDataMahjong_Brd = (function () {
        function WinSeatCardDataMahjong_Brd() {
        }
        WinSeatCardDataMahjong_Brd.prototype.GetType = function () { return 'Cmd.WinSeatCardDataMahjong_Brd'; };
        return WinSeatCardDataMahjong_Brd;
    })();
    Cmd.WinSeatCardDataMahjong_Brd = WinSeatCardDataMahjong_Brd;
    /**
     * 扣牌消息
     */
    var KouCardMahjongCmd_CS = (function () {
        function KouCardMahjongCmd_CS() {
        }
        KouCardMahjongCmd_CS.prototype.GetType = function () { return 'Cmd.KouCardMahjongCmd_CS'; };
        return KouCardMahjongCmd_CS;
    })();
    Cmd.KouCardMahjongCmd_CS = KouCardMahjongCmd_CS;
    /**
     * 扣牌
     */
    var WaitKouSeatMahjongCmd_S = (function () {
        function WaitKouSeatMahjongCmd_S() {
        }
        WaitKouSeatMahjongCmd_S.prototype.GetType = function () { return 'Cmd.WaitKouSeatMahjongCmd_S'; };
        return WaitKouSeatMahjongCmd_S;
    })();
    Cmd.WaitKouSeatMahjongCmd_S = WaitKouSeatMahjongCmd_S;
    var OtherKouCardMahjongCmd_Brd = (function () {
        function OtherKouCardMahjongCmd_Brd() {
        }
        OtherKouCardMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.OtherKouCardMahjongCmd_Brd'; };
        return OtherKouCardMahjongCmd_Brd;
    })();
    Cmd.OtherKouCardMahjongCmd_Brd = OtherKouCardMahjongCmd_Brd;
    var KouCardInfo = (function () {
        function KouCardInfo() {
        }
        KouCardInfo.prototype.GetType = function () { return 'Cmd.KouCardInfo'; };
        return KouCardInfo;
    })();
    Cmd.KouCardInfo = KouCardInfo;
    /**
     * 通知玩家选择翻金方式
     */
    var StartChoiseTurnGoldType_Brd = (function () {
        function StartChoiseTurnGoldType_Brd() {
        }
        StartChoiseTurnGoldType_Brd.prototype.GetType = function () { return 'Cmd.StartChoiseTurnGoldType_Brd'; };
        return StartChoiseTurnGoldType_Brd;
    })();
    Cmd.StartChoiseTurnGoldType_Brd = StartChoiseTurnGoldType_Brd;
    /**
     * 选择翻金方式
     */
    var ChoiseTurnGoldType_C = (function () {
        function ChoiseTurnGoldType_C() {
        }
        ChoiseTurnGoldType_C.prototype.GetType = function () { return 'Cmd.ChoiseTurnGoldType_C'; };
        return ChoiseTurnGoldType_C;
    })();
    Cmd.ChoiseTurnGoldType_C = ChoiseTurnGoldType_C;
    /**
     * 广播翻金方式
     */
    var ChoiseTurnGoldType_Brd = (function () {
        function ChoiseTurnGoldType_Brd() {
        }
        ChoiseTurnGoldType_Brd.prototype.GetType = function () { return 'Cmd.ChoiseTurnGoldType_Brd'; };
        return ChoiseTurnGoldType_Brd;
    })();
    Cmd.ChoiseTurnGoldType_Brd = ChoiseTurnGoldType_Brd;
    /**
     * 过蛋
     */
    var ShowBarCardPassTheEgg_CS = (function () {
        function ShowBarCardPassTheEgg_CS() {
        }
        ShowBarCardPassTheEgg_CS.prototype.GetType = function () { return 'Cmd.ShowBarCardPassTheEgg_CS'; };
        return ShowBarCardPassTheEgg_CS;
    })();
    Cmd.ShowBarCardPassTheEgg_CS = ShowBarCardPassTheEgg_CS;
    var RoundScore = (function () {
        function RoundScore() {
        }
        RoundScore.prototype.GetType = function () { return 'Cmd.RoundScore'; };
        return RoundScore;
    })();
    Cmd.RoundScore = RoundScore;
    var ShowRoundScore_S = (function () {
        function ShowRoundScore_S() {
        }
        ShowRoundScore_S.prototype.GetType = function () { return 'Cmd.ShowRoundScore_S'; };
        return ShowRoundScore_S;
    })();
    Cmd.ShowRoundScore_S = ShowRoundScore_S;
    var ServiceChargeMahjongCmd_Brd = (function () {
        function ServiceChargeMahjongCmd_Brd() {
        }
        ServiceChargeMahjongCmd_Brd.prototype.GetType = function () { return 'Cmd.ServiceChargeMahjongCmd_Brd'; };
        return ServiceChargeMahjongCmd_Brd;
    })();
    Cmd.ServiceChargeMahjongCmd_Brd = ServiceChargeMahjongCmd_Brd;
    var SelfActiveMahjong_C = (function () {
        function SelfActiveMahjong_C() {
        }
        SelfActiveMahjong_C.prototype.GetType = function () { return 'Cmd.SelfActiveMahjong_C'; };
        return SelfActiveMahjong_C;
    })();
    Cmd.SelfActiveMahjong_C = SelfActiveMahjong_C;
    /**
     * 玩家牌型报警
     */
    var CardTypeWarnMahjong_Brd = (function () {
        function CardTypeWarnMahjong_Brd() {
        }
        CardTypeWarnMahjong_Brd.prototype.GetType = function () { return 'Cmd.CardTypeWarnMahjong_Brd'; };
        return CardTypeWarnMahjong_Brd;
    })();
    Cmd.CardTypeWarnMahjong_Brd = CardTypeWarnMahjong_Brd;
})(Cmd || (Cmd = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: poker_room.proto
/// <reference path="common.ts" />
var Cmd;
(function (Cmd) {
    (function (PokerConst) {
        /**
         * 系统用户id
         */
        PokerConst[PokerConst["SysUserId"] = 10000] = "SysUserId";
    })(Cmd.PokerConst || (Cmd.PokerConst = {}));
    var PokerConst = Cmd.PokerConst;
    /**
     * 出牌的类型
     */
    (function (CardSetType) {
        /**
         * 无牌型
         */
        CardSetType[CardSetType["CardSetType_None"] = 0] = "CardSetType_None";
        /**
         * 单张
         */
        CardSetType[CardSetType["CardSetType_Single"] = 100] = "CardSetType_Single";
        /**
         * 对子
         */
        CardSetType[CardSetType["CardSetType_Double"] = 200] = "CardSetType_Double";
        /**
         * 顺子
         */
        CardSetType[CardSetType["CardSetType_StraightSingle"] = 300] = "CardSetType_StraightSingle";
        /**
         * 连对
         */
        CardSetType[CardSetType["CardSetType_StraightDouble"] = 400] = "CardSetType_StraightDouble";
        /**
         * 含三张的牌，如 三代一
         */
        CardSetType[CardSetType["CardSetType_ThreeWithX"] = 500] = "CardSetType_ThreeWithX";
        /**
         * 三代一
         */
        CardSetType[CardSetType["CardSetType_ThreeWithOne"] = 501] = "CardSetType_ThreeWithOne";
        /**
         * 含四张的牌，如 四代二
         */
        CardSetType[CardSetType["CardSetType_FourWithX"] = 600] = "CardSetType_FourWithX";
        /**
         * 炸弹
         */
        CardSetType[CardSetType["CardSetType_Bomb"] = 700] = "CardSetType_Bomb";
        /**
         * 没牛
         */
        CardSetType[CardSetType["CardSetType_BeefNone"] = 1000] = "CardSetType_BeefNone";
        /**
         * 牛1
         */
        CardSetType[CardSetType["CardSetType_BeefOne"] = 1001] = "CardSetType_BeefOne";
        /**
         * 牛2
         */
        CardSetType[CardSetType["CardSetType_BeefTwo"] = 1002] = "CardSetType_BeefTwo";
        /**
         * 牛3
         */
        CardSetType[CardSetType["CardSetType_BeefThree"] = 1003] = "CardSetType_BeefThree";
        /**
         * 牛4
         */
        CardSetType[CardSetType["CardSetType_BeefFour"] = 1004] = "CardSetType_BeefFour";
        /**
         * 牛5
         */
        CardSetType[CardSetType["CardSetType_BeefFive"] = 1005] = "CardSetType_BeefFive";
        /**
         * 牛6
         */
        CardSetType[CardSetType["CardSetType_BeefSix"] = 1006] = "CardSetType_BeefSix";
        /**
         * 牛7
         */
        CardSetType[CardSetType["CardSetType_BeefSeven"] = 1007] = "CardSetType_BeefSeven";
        /**
         * 牛8
         */
        CardSetType[CardSetType["CardSetType_BeefEight"] = 1008] = "CardSetType_BeefEight";
        /**
         * 牛9
         */
        CardSetType[CardSetType["CardSetType_BeefNine"] = 1009] = "CardSetType_BeefNine";
        /**
         * 牛牛
         */
        CardSetType[CardSetType["CardSetType_BeefBull"] = 1010] = "CardSetType_BeefBull";
        /**
         * 四花牛
         */
        CardSetType[CardSetType["CardSetType_BeefFourFlower"] = 1011] = "CardSetType_BeefFourFlower";
        /**
         * 五花牛
         */
        CardSetType[CardSetType["CardSetType_BeefFiveFlower"] = 1012] = "CardSetType_BeefFiveFlower";
        /**
         * 炸弹
         */
        CardSetType[CardSetType["CardSetType_BeefBomb"] = 1013] = "CardSetType_BeefBomb";
        /**
         * 五小牛
         */
        CardSetType[CardSetType["CardSetType_BeefSmall"] = 1014] = "CardSetType_BeefSmall";
        /**
         * 顺子
         */
        CardSetType[CardSetType["CardSetType_BeefStraight"] = 1015] = "CardSetType_BeefStraight";
        /**
         * 同花
         */
        CardSetType[CardSetType["CardSetType_BeefFlush"] = 1016] = "CardSetType_BeefFlush";
        /**
         * 葫芦
         */
        CardSetType[CardSetType["CardSetType_BeefFullHouse"] = 1017] = "CardSetType_BeefFullHouse";
        /**
         * 炸弹
         */
        CardSetType[CardSetType["CardSetType_BeefBomb1"] = 1018] = "CardSetType_BeefBomb1";
        /**
         * 同花顺
         */
        CardSetType[CardSetType["CardSetType_BeefStraightFlush"] = 1019] = "CardSetType_BeefStraightFlush";
        /**
         * 四连通杀
         */
        CardSetType[CardSetType["CardSetType_Quadrakill"] = 1020] = "CardSetType_Quadrakill";
        /**
         * 龙虎炮
         */
        CardSetType[CardSetType["CardSetType_DragonTiger"] = 1021] = "CardSetType_DragonTiger";
        /**
         * 单牌(高牌)
         */
        CardSetType[CardSetType["CardSetType_TexasHighCard"] = 1101] = "CardSetType_TexasHighCard";
        /**
         * 一对
         */
        CardSetType[CardSetType["CardSetType_TexasOnePair"] = 1102] = "CardSetType_TexasOnePair";
        /**
         * 两对
         */
        CardSetType[CardSetType["CardSetType_TexasTwoPairs"] = 1103] = "CardSetType_TexasTwoPairs";
        /**
         * 三条
         */
        CardSetType[CardSetType["CardSetType_TexasThreeOfKind"] = 1104] = "CardSetType_TexasThreeOfKind";
        /**
         * 顺子
         */
        CardSetType[CardSetType["CardSetType_TexasStraight"] = 1105] = "CardSetType_TexasStraight";
        /**
         * 同花
         */
        CardSetType[CardSetType["CardSetType_TexasFlush"] = 1106] = "CardSetType_TexasFlush";
        /**
         * 三条加一对(葫芦)
         */
        CardSetType[CardSetType["CardSetType_TexasFullHouse"] = 1107] = "CardSetType_TexasFullHouse";
        /**
         * 四条(金刚)
         */
        CardSetType[CardSetType["CardSetType_TexasFourOfKind"] = 1108] = "CardSetType_TexasFourOfKind";
        /**
         * 同花顺
         */
        CardSetType[CardSetType["CardSetType_TexasStraightFlush"] = 1109] = "CardSetType_TexasStraightFlush";
        /**
         * 皇家同花顺
         */
        CardSetType[CardSetType["CardSetType_TexasRoyalFlush"] = 1110] = "CardSetType_TexasRoyalFlush";
        /**
         * 至尊
         */
        CardSetType[CardSetType["CardSetType_PaiGowExtreme"] = 1301] = "CardSetType_PaiGowExtreme";
        /**
         * 双天
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoDays"] = 1302] = "CardSetType_PaiGowTwoDays";
        /**
         * 双地
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoGround"] = 1303] = "CardSetType_PaiGowTwoGround";
        /**
         * 双人
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoPeople"] = 1304] = "CardSetType_PaiGowTwoPeople";
        /**
         * 双鹅
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoE"] = 1305] = "CardSetType_PaiGowTwoE";
        /**
         * 双梅
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoPlum"] = 1306] = "CardSetType_PaiGowTwoPlum";
        /**
         * 双长
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoLong"] = 1307] = "CardSetType_PaiGowTwoLong";
        /**
         * 双板凳
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoBench"] = 1308] = "CardSetType_PaiGowTwoBench";
        /**
         * 双斧头
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoAxe"] = 1309] = "CardSetType_PaiGowTwoAxe";
        /**
         * 双红头
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoHead"] = 1310] = "CardSetType_PaiGowTwoHead";
        /**
         * 双铜锤
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoPratia"] = 1311] = "CardSetType_PaiGowTwoPratia";
        /**
         * 双零霖
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoLing"] = 1312] = "CardSetType_PaiGowTwoLing";
        /**
         * 对杂九
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoMixNine"] = 1313] = "CardSetType_PaiGowTwoMixNine";
        /**
         * 对杂八
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoMixEight"] = 1314] = "CardSetType_PaiGowTwoMixEight";
        /**
         * 对杂七
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoMixSeven"] = 1315] = "CardSetType_PaiGowTwoMixSeven";
        /**
         * 对杂五
         */
        CardSetType[CardSetType["CardSetType_PaiGowTwoMixFive"] = 1316] = "CardSetType_PaiGowTwoMixFive";
        /**
         * 天王
         */
        CardSetType[CardSetType["CardSetType_PaiGowDayKing"] = 1317] = "CardSetType_PaiGowDayKing";
        /**
         * 地王
         */
        CardSetType[CardSetType["CardSetType_PaiGowGroundKing"] = 1318] = "CardSetType_PaiGowGroundKing";
        /**
         * 天杠
         */
        CardSetType[CardSetType["CardSetType_PaiGowDayBar"] = 1319] = "CardSetType_PaiGowDayBar";
        /**
         * 地杠
         */
        CardSetType[CardSetType["CardSetType_PaiGowGroundBar"] = 1331] = "CardSetType_PaiGowGroundBar";
        /**
         * 天高九
         */
        CardSetType[CardSetType["CardSetType_PaiGowDayHighNine"] = 1332] = "CardSetType_PaiGowDayHighNine";
        /**
         * 地高九
         */
        CardSetType[CardSetType["CardSetType_PaiGowGroundHighNine"] = 1333] = "CardSetType_PaiGowGroundHighNine";
        /**
         * 天九  杂九
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodNine"] = 1334] = "CardSetType_PaiGowGodNine";
        CardSetType[CardSetType["CardSetType_PaiGowGroundNine"] = 1335] = "CardSetType_PaiGowGroundNine";
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleNine"] = 1336] = "CardSetType_PaiGowPeoPleNine";
        CardSetType[CardSetType["CardSetType_PaiGowENine"] = 1337] = "CardSetType_PaiGowENine";
        CardSetType[CardSetType["CardSetType_PaiGowLongNine"] = 1338] = "CardSetType_PaiGowLongNine";
        CardSetType[CardSetType["CardSetType_PaiGowShortNine"] = 1339] = "CardSetType_PaiGowShortNine";
        /**
         * 天八 杂八
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodEight"] = 1341] = "CardSetType_PaiGowGodEight";
        CardSetType[CardSetType["CardSetType_PaiGowGroundEight"] = 1342] = "CardSetType_PaiGowGroundEight";
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleEight"] = 1343] = "CardSetType_PaiGowPeoPleEight";
        CardSetType[CardSetType["CardSetType_PaiGowEEight"] = 1344] = "CardSetType_PaiGowEEight";
        CardSetType[CardSetType["CardSetType_PaiGowLongEight"] = 1345] = "CardSetType_PaiGowLongEight";
        CardSetType[CardSetType["CardSetType_PaiGowShortEight"] = 1346] = "CardSetType_PaiGowShortEight";
        CardSetType[CardSetType["CardSetType_PaiGowMixEight"] = 1347] = "CardSetType_PaiGowMixEight";
        /**
         * 天七  杂七
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodSeven"] = 1348] = "CardSetType_PaiGowGodSeven";
        CardSetType[CardSetType["CardSetType_PaiGowGroundSeven"] = 1349] = "CardSetType_PaiGowGroundSeven";
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleSeven"] = 1350] = "CardSetType_PaiGowPeoPleSeven";
        CardSetType[CardSetType["CardSetType_PaiGowESeven"] = 1351] = "CardSetType_PaiGowESeven";
        CardSetType[CardSetType["CardSetType_PaiGowLongSeven"] = 1352] = "CardSetType_PaiGowLongSeven";
        CardSetType[CardSetType["CardSetType_PaiGowShortSeven"] = 1353] = "CardSetType_PaiGowShortSeven";
        CardSetType[CardSetType["CardSetType_PaiGowMixSeven"] = 1354] = "CardSetType_PaiGowMixSeven";
        /**
         * 天六 杂六
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodSix"] = 1355] = "CardSetType_PaiGowGodSix";
        CardSetType[CardSetType["CardSetType_PaiGowGroundSix"] = 1356] = "CardSetType_PaiGowGroundSix";
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleSix"] = 1357] = "CardSetType_PaiGowPeoPleSix";
        CardSetType[CardSetType["CardSetType_PaiGowESix"] = 1358] = "CardSetType_PaiGowESix";
        CardSetType[CardSetType["CardSetType_PaiGowLongSix"] = 1359] = "CardSetType_PaiGowLongSix";
        CardSetType[CardSetType["CardSetType_PaiGowShortSix"] = 1360] = "CardSetType_PaiGowShortSix";
        CardSetType[CardSetType["CardSetType_PaiGowMixSix"] = 1361] = "CardSetType_PaiGowMixSix";
        /**
         * 天五  杂五
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodFive"] = 1362] = "CardSetType_PaiGowGodFive";
        CardSetType[CardSetType["CardSetType_PaiGowGroundFive"] = 1363] = "CardSetType_PaiGowGroundFive";
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleFive"] = 1364] = "CardSetType_PaiGowPeoPleFive";
        CardSetType[CardSetType["CardSetType_PaiGowEFive"] = 1365] = "CardSetType_PaiGowEFive";
        CardSetType[CardSetType["CardSetType_PaiGowLongFive"] = 1366] = "CardSetType_PaiGowLongFive";
        CardSetType[CardSetType["CardSetType_PaiGowShortFive"] = 1367] = "CardSetType_PaiGowShortFive";
        CardSetType[CardSetType["CardSetType_PaiGowMixFive"] = 1368] = "CardSetType_PaiGowMixFive";
        /**
         * 天四 杂四
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodFour"] = 1369] = "CardSetType_PaiGowGodFour";
        CardSetType[CardSetType["CardSetType_PaiGowGroundFour"] = 1370] = "CardSetType_PaiGowGroundFour";
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleFour"] = 1371] = "CardSetType_PaiGowPeoPleFour";
        CardSetType[CardSetType["CardSetType_PaiGowEFour"] = 1372] = "CardSetType_PaiGowEFour";
        CardSetType[CardSetType["CardSetType_PaiGowLongFour"] = 1373] = "CardSetType_PaiGowLongFour";
        CardSetType[CardSetType["CardSetType_PaiGowShortFour"] = 1374] = "CardSetType_PaiGowShortFour";
        CardSetType[CardSetType["CardSetType_PaiGowMixFour"] = 1375] = "CardSetType_PaiGowMixFour";
        /**
         * 天三 杂三
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodThree"] = 1376] = "CardSetType_PaiGowGodThree";
        CardSetType[CardSetType["CardSetType_PaiGowGroundThree"] = 1377] = "CardSetType_PaiGowGroundThree";
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleThree"] = 1378] = "CardSetType_PaiGowPeoPleThree";
        CardSetType[CardSetType["CardSetType_PaiGowEThree"] = 1379] = "CardSetType_PaiGowEThree";
        CardSetType[CardSetType["CardSetType_PaiGowLongThree"] = 1380] = "CardSetType_PaiGowLongThree";
        CardSetType[CardSetType["CardSetType_PaiGowShortThree"] = 1381] = "CardSetType_PaiGowShortThree";
        CardSetType[CardSetType["CardSetType_PaiGowMixThree"] = 1382] = "CardSetType_PaiGowMixThree";
        /**
         * 天二 杂二
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodTwo"] = 1383] = "CardSetType_PaiGowGodTwo";
        CardSetType[CardSetType["CardSetType_PaiGowGroundTwo"] = 1384] = "CardSetType_PaiGowGroundTwo";
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleTwo"] = 1385] = "CardSetType_PaiGowPeoPleTwo";
        CardSetType[CardSetType["CardSetType_PaiGowETwo"] = 1386] = "CardSetType_PaiGowETwo";
        CardSetType[CardSetType["CardSetType_PaiGowLongTwo"] = 1387] = "CardSetType_PaiGowLongTwo";
        CardSetType[CardSetType["CardSetType_PaiGowShortTwo"] = 1388] = "CardSetType_PaiGowShortTwo";
        CardSetType[CardSetType["CardSetType_PaiGowMixTwo"] = 1389] = "CardSetType_PaiGowMixTwo";
        /**
         * 人一 杂一
         */
        CardSetType[CardSetType["CardSetType_PaiGowPeoPleOne"] = 1390] = "CardSetType_PaiGowPeoPleOne";
        CardSetType[CardSetType["CardSetType_PaiGowEOne"] = 1391] = "CardSetType_PaiGowEOne";
        CardSetType[CardSetType["CardSetType_PaiGowLongOne"] = 1392] = "CardSetType_PaiGowLongOne";
        CardSetType[CardSetType["CardSetType_PaiGowShortOne"] = 1393] = "CardSetType_PaiGowShortOne";
        CardSetType[CardSetType["CardSetType_PaiGowMixOne"] = 1394] = "CardSetType_PaiGowMixOne";
        /**
         * 毕十
         */
        CardSetType[CardSetType["CardSetType_PaiGowBiTen"] = 1395] = "CardSetType_PaiGowBiTen";
        /**
         * 鬼子
         */
        CardSetType[CardSetType["CardSetType_PaiGowDevil"] = 1396] = "CardSetType_PaiGowDevil";
        /**
         * 天一
         */
        CardSetType[CardSetType["CardSetType_PaiGowGodOne"] = 1397] = "CardSetType_PaiGowGodOne";
        /**
         * 地一
         */
        CardSetType[CardSetType["CardSetType_PaiGowGroundOne"] = 1398] = "CardSetType_PaiGowGroundOne";
    })(Cmd.CardSetType || (Cmd.CardSetType = {}));
    var CardSetType = Cmd.CardSetType;
    /**
     * 游戏状态
     */
    (function (GameState) {
        /**
         * 准备
         */
        GameState[GameState["State_Ready"] = 1] = "State_Ready";
        /**
         * 托管
         */
        GameState[GameState["State_Host"] = 2] = "State_Host";
        /**
         * 在游戏中
         */
        GameState[GameState["State_InGame"] = 3] = "State_InGame";
        /**
         * 坐下
         */
        GameState[GameState["State_Sit"] = 4] = "State_Sit";
        /**
         * 完成
         */
        GameState[GameState["State_Complete"] = 5] = "State_Complete";
        /**
         * 游戏启动
         */
        GameState[GameState["State_RoundEnable"] = 6] = "State_RoundEnable";
        /**
         * 弃牌
         */
        GameState[GameState["State_Fold"] = 7] = "State_Fold";
        /**
         * 看牌
         */
        GameState[GameState["State_Check"] = 8] = "State_Check";
        /**
         * 比牌赢
         */
        GameState[GameState["State_CompareWin"] = 9] = "State_CompareWin";
        /**
         * 比牌输
         */
        GameState[GameState["State_CompareLose"] = 10] = "State_CompareLose";
        /**
         * 可看手牌
         */
        GameState[GameState["State_SeeCard"] = 11] = "State_SeeCard";
        /**
         * 已亮牌
         */
        GameState[GameState["State_ShowCard"] = 12] = "State_ShowCard";
        /**
         * 抗贡
         */
        GameState[GameState["State_AntiTribute"] = 13] = "State_AntiTribute";
        /**
         * 接风
         */
        GameState[GameState["State_Relay"] = 14] = "State_Relay";
    })(Cmd.GameState || (Cmd.GameState = {}));
    var GameState = Cmd.GameState;
    /**
     * 游戏目前所处的状态
     */
    (function (GameStatus) {
        /**
         * 空闲时间
         */
        GameStatus[GameStatus["GameStatus_Free"] = 1] = "GameStatus_Free";
        /**
         * 压注时间
         */
        GameStatus[GameStatus["GameStatus_Bet"] = 2] = "GameStatus_Bet";
        /**
         * 开奖时间
         */
        GameStatus[GameStatus["GameStatus_Lottery"] = 3] = "GameStatus_Lottery";
        /**
         * 结算时间
         */
        GameStatus[GameStatus["GameStatus_Settle"] = 4] = "GameStatus_Settle";
        /**
         * 抢／叫地主
         */
        GameStatus[GameStatus["GameStatus_LordOption"] = 5] = "GameStatus_LordOption";
        /**
         * 踢
         */
        GameStatus[GameStatus["GameStatus_Kick"] = 6] = "GameStatus_Kick";
        /**
         * 出牌
         */
        GameStatus[GameStatus["GameStatus_Playing"] = 7] = "GameStatus_Playing";
        /**
         * 暂停
         */
        GameStatus[GameStatus["GameStatus_Pause"] = 8] = "GameStatus_Pause";
        /**
         * 倒计时
         */
        GameStatus[GameStatus["GameStatus_CountDown"] = 9] = "GameStatus_CountDown";
        /**
         * 等待下一局
         */
        GameStatus[GameStatus["GameStatus_WaitNextRound"] = 10] = "GameStatus_WaitNextRound";
        /**
         * 进贡阶段
         */
        GameStatus[GameStatus["GameStatus_PayTribute"] = 11] = "GameStatus_PayTribute";
        /**
         * 发牌
         */
        GameStatus[GameStatus["GameStatus_Deal"] = 12] = "GameStatus_Deal";
    })(Cmd.GameStatus || (Cmd.GameStatus = {}));
    var GameStatus = Cmd.GameStatus;
    /**
     * 操作
     */
    (function (Operation) {
        /**
         * 叫地主 - 不叫
         */
        Operation[Operation["LordCall0"] = 1] = "LordCall0";
        /**
         * 叫地主 - 叫1分
         */
        Operation[Operation["LordCall1"] = 2] = "LordCall1";
        /**
         * 叫地主 - 叫2分
         */
        Operation[Operation["LordCall2"] = 3] = "LordCall2";
        /**
         * 叫地主 - 叫3分
         */
        Operation[Operation["LordCall3"] = 4] = "LordCall3";
        /**
         * 抢地主 - 不抢
         */
        Operation[Operation["LordRobNo"] = 5] = "LordRobNo";
        /**
         * 抢地主 - 抢
         */
        Operation[Operation["LordRobYes"] = 6] = "LordRobYes";
        /**
         * 叫地主 - 不叫
         */
        Operation[Operation["LordCallNo"] = 7] = "LordCallNo";
        /**
         * 叫地主 - 叫
         */
        Operation[Operation["LordCallYes"] = 8] = "LordCallYes";
        /**
         * 要的起、拿牌
         */
        Operation[Operation["Play"] = 9] = "Play";
        /**
         * 要不去、不拿牌
         */
        Operation[Operation["PlayNot"] = 10] = "PlayNot";
        /**
         * 必须出、发牌
         */
        Operation[Operation["PlayMust"] = 11] = "PlayMust";
        /**
         * 弃牌
         */
        Operation[Operation["GiveUp"] = 12] = "GiveUp";
        /**
         * 下注
         */
        Operation[Operation["Wagering"] = 13] = "Wagering";
        /**
         * 跟注、重复下注、再下注
         */
        Operation[Operation["FollowBet"] = 14] = "FollowBet";
        /**
         * 起脚
         */
        Operation[Operation["UpFoot"] = 15] = "UpFoot";
        /**
         * 不踢
         */
        Operation[Operation["NoFoot"] = 16] = "NoFoot";
        /**
         * 反踢
         */
        Operation[Operation["BackFoot"] = 17] = "BackFoot";
        /**
         * 弃牌
         */
        Operation[Operation["Fold"] = 18] = "Fold";
        /**
         * 跟注
         */
        Operation[Operation["Call"] = 19] = "Call";
        /**
         * 加注、双倍
         */
        Operation[Operation["Raise"] = 20] = "Raise";
        Operation[Operation["Allin"] = 21] = "Allin";
        /**
         * 看牌
         */
        Operation[Operation["Check"] = 22] = "Check";
        /**
         * 比牌
         */
        Operation[Operation["Compare"] = 23] = "Compare";
        /**
         * 小盲注
         */
        Operation[Operation["SmallBlind"] = 24] = "SmallBlind";
        /**
         * 大盲注
         */
        Operation[Operation["BigBlind"] = 25] = "BigBlind";
        /**
         * 2倍大盲
         */
        Operation[Operation["BBlind2"] = 26] = "BBlind2";
        /**
         * 3倍大盲
         */
        Operation[Operation["BBlind3"] = 27] = "BBlind3";
        /**
         * 4倍大盲
         */
        Operation[Operation["BBlind4"] = 28] = "BBlind4";
        /**
         * 1/2 底池
         */
        Operation[Operation["Pot1_2"] = 29] = "Pot1_2";
        /**
         * 2/3 底池
         */
        Operation[Operation["Pot2_3"] = 30] = "Pot2_3";
        /**
         * 1倍 底池
         */
        Operation[Operation["Pot1_1"] = 31] = "Pot1_1";
        /**
         * 自动跟注
         */
        Operation[Operation["AutoCall"] = 32] = "AutoCall";
        /**
         * 锅底押注
         */
        Operation[Operation["Pan"] = 33] = "Pan";
        /**
         * 自动跟注取消
         */
        Operation[Operation["AutoCallCancel"] = 34] = "AutoCallCancel";
        /**
         * 吃
         */
        Operation[Operation["Eat"] = 35] = "Eat";
        /**
         * 拉
         */
        Operation[Operation["Pull"] = 36] = "Pull";
        /**
         * 胡
         */
        Operation[Operation["Hu"] = 37] = "Hu";
        /**
         * 暗 == 暗杠
         */
        Operation[Operation["Dark"] = 38] = "Dark";
        /**
         * 报听
         */
        Operation[Operation["Listen"] = 39] = "Listen";
        /**
         * 下庄
         */
        Operation[Operation["DownBanker"] = 40] = "DownBanker";
        /**
         * 自动弃牌
         */
        Operation[Operation["AutoFold"] = 41] = "AutoFold";
        /**
         * 取消压注
         */
        Operation[Operation["Cancel"] = 42] = "Cancel";
        /**
         * 推注
         */
        Operation[Operation["PushBet"] = 43] = "PushBet";
        /**
         * 补分
         */
        Operation[Operation["FillPoint"] = 44] = "FillPoint";
        /**
         * 进贡
         */
        Operation[Operation["PayTribute"] = 45] = "PayTribute";
        /**
         * 退贡
         */
        Operation[Operation["BackTribute"] = 46] = "BackTribute";
        /**
         * 选牌
         */
        Operation[Operation["SelectCard"] = 47] = "SelectCard";
        /**
         * 比拼中路
         */
        Operation[Operation["MiddleCompare"] = 48] = "MiddleCompare";
        /**
         *  人机对战用
         *  拉霸用于免费游戏选择物品
         */
        Operation[Operation["ExtOperation1"] = 50] = "ExtOperation1";
        /**
         * 换炮
         */
        Operation[Operation["ChangeBattery"] = 51] = "ChangeBattery";
        /**
         * 锁定
         */
        Operation[Operation["Lock"] = 52] = "Lock";
        /**
         * 取消锁定
         */
        Operation[Operation["Unlock"] = 53] = "Unlock";
        /**
         * 拆牌
         */
        Operation[Operation["Split"] = 54] = "Split";
        /**
         * 保险
         */
        Operation[Operation["Insurance"] = 55] = "Insurance";
        /**
         * 双倍下注（黑杰克）
         */
        Operation[Operation["Double"] = 56] = "Double";
    })(Cmd.Operation || (Cmd.Operation = {}));
    var Operation = Cmd.Operation;
    /**
     * 荣誉
     */
    (function (GameHonor) {
        /**
         * 春天
         */
        GameHonor[GameHonor["GameHonor_Spring"] = 0] = "GameHonor_Spring";
        /**
         * 反春天
         */
        GameHonor[GameHonor["GameHonor_SpringReverse"] = 1] = "GameHonor_SpringReverse";
        /**
         * 最大赢家
         */
        GameHonor[GameHonor["GameHonor_WinMost"] = 2] = "GameHonor_WinMost";
        /**
         * 最大牌型
         */
        GameHonor[GameHonor["GameHonor_BestCard"] = 3] = "GameHonor_BestCard";
        /**
         * 第一名
         */
        GameHonor[GameHonor["GameHonor_FirstPlace"] = 4] = "GameHonor_FirstPlace";
        /**
         * 最后一名
         */
        GameHonor[GameHonor["GameHonor_LastPlace"] = 5] = "GameHonor_LastPlace";
        /**
         * 双贡
         */
        GameHonor[GameHonor["GameHonor_DoubleTribute"] = 6] = "GameHonor_DoubleTribute";
    })(Cmd.GameHonor || (Cmd.GameHonor = {}));
    var GameHonor = Cmd.GameHonor;
    /**
     * 货币类型
     */
    (function (MoneyType) {
        /**
         * 钻石
         */
        MoneyType[MoneyType["Diamond"] = 0] = "Diamond";
        /**
         * 点数
         */
        MoneyType[MoneyType["Point"] = 1] = "Point";
        /**
         * 刀分
         */
        MoneyType[MoneyType["CutScore"] = 2] = "CutScore";
        /**
         * 积分
         */
        MoneyType[MoneyType["CardScore"] = 3] = "CardScore";
    })(Cmd.MoneyType || (Cmd.MoneyType = {}));
    var MoneyType = Cmd.MoneyType;
    /**
     * 保单操作类型
     */
    (function (PolicyOperationType) {
        /**
         * 保单文件
         */
        PolicyOperationType[PolicyOperationType["PolicyOperationType_Policy"] = 1] = "PolicyOperationType_Policy";
        /**
         * 解压密码
         */
        PolicyOperationType[PolicyOperationType["PolicyOperationType_Password"] = 2] = "PolicyOperationType_Password";
    })(Cmd.PolicyOperationType || (Cmd.PolicyOperationType = {}));
    var PolicyOperationType = Cmd.PolicyOperationType;
    (function (FishSkillType) {
        /**
         * 一网打尽
         */
        FishSkillType[FishSkillType["YiWangDaJin"] = 1] = "YiWangDaJin";
        /**
         * 炸弹
         */
        FishSkillType[FishSkillType["Bomb"] = 2] = "Bomb";
        /**
         * 同组炸弹
         */
        FishSkillType[FishSkillType["SameGroup"] = 3] = "SameGroup";
    })(Cmd.FishSkillType || (Cmd.FishSkillType = {}));
    var FishSkillType = Cmd.FishSkillType;
    /**
     * 填坑点数（）
     */
    var KengPoint = (function () {
        function KengPoint() {
        }
        KengPoint.prototype.GetType = function () { return 'Cmd.KengPoint'; };
        return KengPoint;
    })();
    Cmd.KengPoint = KengPoint;
    /**
     * 座位数据
     */
    var SeatData = (function () {
        function SeatData() {
        }
        SeatData.prototype.GetType = function () { return 'Cmd.SeatData'; };
        return SeatData;
    })();
    Cmd.SeatData = SeatData;
    /**
     * 状态更新通知
     */
    var SeatStateUpdate_S = (function () {
        function SeatStateUpdate_S() {
        }
        SeatStateUpdate_S.prototype.GetType = function () { return 'Cmd.SeatStateUpdate_S'; };
        return SeatStateUpdate_S;
    })();
    Cmd.SeatStateUpdate_S = SeatStateUpdate_S;
    /**
     * 座位数据更新
     */
    var SeatDataUpdateCmd_S = (function () {
        function SeatDataUpdateCmd_S() {
        }
        SeatDataUpdateCmd_S.prototype.GetType = function () { return 'Cmd.SeatDataUpdateCmd_S'; };
        return SeatDataUpdateCmd_S;
    })();
    Cmd.SeatDataUpdateCmd_S = SeatDataUpdateCmd_S;
    /**
     * 门的筹码
     */
    var DoorChips = (function () {
        function DoorChips() {
        }
        DoorChips.prototype.GetType = function () { return 'Cmd.DoorChips'; };
        return DoorChips;
    })();
    Cmd.DoorChips = DoorChips;
    var GameStatusInfo = (function () {
        function GameStatusInfo() {
        }
        GameStatusInfo.prototype.GetType = function () { return 'Cmd.GameStatusInfo'; };
        return GameStatusInfo;
    })();
    Cmd.GameStatusInfo = GameStatusInfo;
    /**
     * 拉霸游戏状态更新数据结构
     */
    var LabaStatusInfo = (function () {
        function LabaStatusInfo() {
        }
        LabaStatusInfo.prototype.GetType = function () { return 'Cmd.LabaStatusInfo'; };
        return LabaStatusInfo;
    })();
    Cmd.LabaStatusInfo = LabaStatusInfo;
    var LabaStatusInfo;
    (function (LabaStatusInfo) {
        var Data = (function () {
            function Data() {
            }
            Data.prototype.GetType = function () { return 'Cmd.LabaStatusInfo.Data'; };
            return Data;
        })();
        LabaStatusInfo.Data = Data;
    })(LabaStatusInfo = Cmd.LabaStatusInfo || (Cmd.LabaStatusInfo = {}));
    /**
     * 赛车动画控制数据结构
     */
    var SaiCheRunData = (function () {
        function SaiCheRunData() {
        }
        SaiCheRunData.prototype.GetType = function () { return 'Cmd.SaiCheRunData'; };
        return SaiCheRunData;
    })();
    Cmd.SaiCheRunData = SaiCheRunData;
    var SaiCheRunData;
    (function (SaiCheRunData) {
        var GameProcess = (function () {
            function GameProcess() {
            }
            GameProcess.prototype.GetType = function () { return 'Cmd.SaiCheRunData.GameProcess'; };
            return GameProcess;
        })();
        SaiCheRunData.GameProcess = GameProcess;
        var GameProcess;
        (function (GameProcess) {
            var GameP = (function () {
                function GameP() {
                }
                GameP.prototype.GetType = function () { return 'Cmd.SaiCheRunData.GameProcess.GameP'; };
                return GameP;
            })();
            GameProcess.GameP = GameP;
        })(GameProcess = SaiCheRunData.GameProcess || (SaiCheRunData.GameProcess = {}));
    })(SaiCheRunData = Cmd.SaiCheRunData || (Cmd.SaiCheRunData = {}));
    var SaiCheRunData;
    (function (SaiCheRunData) {
        var Accident = (function () {
            function Accident() {
            }
            Accident.prototype.GetType = function () { return 'Cmd.SaiCheRunData.Accident'; };
            return Accident;
        })();
        SaiCheRunData.Accident = Accident;
        var Accident;
        (function (Accident) {
            var Acci = (function () {
                function Acci() {
                }
                Acci.prototype.GetType = function () { return 'Cmd.SaiCheRunData.Accident.Acci'; };
                return Acci;
            })();
            Accident.Acci = Acci;
        })(Accident = SaiCheRunData.Accident || (SaiCheRunData.Accident = {}));
    })(SaiCheRunData = Cmd.SaiCheRunData || (Cmd.SaiCheRunData = {}));
    var SaiCheRunData;
    (function (SaiCheRunData) {
        var NosPos = (function () {
            function NosPos() {
            }
            NosPos.prototype.GetType = function () { return 'Cmd.SaiCheRunData.NosPos'; };
            return NosPos;
        })();
        SaiCheRunData.NosPos = NosPos;
        var NosPos;
        (function (NosPos) {
            var NosP = (function () {
                function NosP() {
                }
                NosP.prototype.GetType = function () { return 'Cmd.SaiCheRunData.NosPos.NosP'; };
                return NosP;
            })();
            NosPos.NosP = NosP;
        })(NosPos = SaiCheRunData.NosPos || (SaiCheRunData.NosPos = {}));
    })(SaiCheRunData = Cmd.SaiCheRunData || (Cmd.SaiCheRunData = {}));
    /**
     * 游戏状态更新
     */
    var GameStatusUpdateCmd_S = (function () {
        function GameStatusUpdateCmd_S() {
        }
        GameStatusUpdateCmd_S.prototype.GetType = function () { return 'Cmd.GameStatusUpdateCmd_S'; };
        return GameStatusUpdateCmd_S;
    })();
    Cmd.GameStatusUpdateCmd_S = GameStatusUpdateCmd_S;
    /**
     * 本轮局牌的数据
     */
    var RoundData = (function () {
        function RoundData() {
        }
        RoundData.prototype.GetType = function () { return 'Cmd.RoundData'; };
        return RoundData;
    })();
    Cmd.RoundData = RoundData;
    var RoundData;
    (function (RoundData) {
        /**
         * TODO: 换成 YesOrNo 类型
         */
        var RobLordData = (function () {
            function RobLordData() {
            }
            RobLordData.prototype.GetType = function () { return 'Cmd.RoundData.RobLordData'; };
            return RobLordData;
        })();
        RoundData.RobLordData = RobLordData;
    })(RoundData = Cmd.RoundData || (Cmd.RoundData = {}));
    var RoundData;
    (function (RoundData) {
        var CallLordData = (function () {
            function CallLordData() {
            }
            CallLordData.prototype.GetType = function () { return 'Cmd.RoundData.CallLordData'; };
            return CallLordData;
        })();
        RoundData.CallLordData = CallLordData;
    })(RoundData = Cmd.RoundData || (Cmd.RoundData = {}));
    var RoundData;
    (function (RoundData) {
        var YesOrNoData = (function () {
            function YesOrNoData() {
            }
            YesOrNoData.prototype.GetType = function () { return 'Cmd.RoundData.YesOrNoData'; };
            return YesOrNoData;
        })();
        RoundData.YesOrNoData = YesOrNoData;
    })(RoundData = Cmd.RoundData || (Cmd.RoundData = {}));
    /**
     * 房间数据
     */
    var RoomData = (function () {
        function RoomData() {
        }
        RoomData.prototype.GetType = function () { return 'Cmd.RoomData'; };
        return RoomData;
    })();
    Cmd.RoomData = RoomData;
    /**
     * 十点半独立倒计时
     */
    var SendPersonalCountDown_S = (function () {
        function SendPersonalCountDown_S() {
        }
        SendPersonalCountDown_S.prototype.GetType = function () { return 'Cmd.SendPersonalCountDown_S'; };
        return SendPersonalCountDown_S;
    })();
    Cmd.SendPersonalCountDown_S = SendPersonalCountDown_S;
    /**
     * 倒计时
     */
    var Countdown = (function () {
        function Countdown() {
        }
        Countdown.prototype.GetType = function () { return 'Cmd.Countdown'; };
        return Countdown;
    })();
    Cmd.Countdown = Countdown;
    var Countdown;
    (function (Countdown) {
        (function (CountdownType) {
            /**
             * 升盲
             */
            CountdownType[CountdownType["RiseBlind"] = 1] = "RiseBlind";
            /**
             * 买入
             */
            CountdownType[CountdownType["BuyBring"] = 2] = "BuyBring";
        })(Countdown.CountdownType || (Countdown.CountdownType = {}));
        var CountdownType = Countdown.CountdownType;
    })(Countdown = Cmd.Countdown || (Cmd.Countdown = {}));
    /**
     * 倒计时更新
     */
    var CountdownUpdateCmd_S = (function () {
        function CountdownUpdateCmd_S() {
        }
        CountdownUpdateCmd_S.prototype.GetType = function () { return 'Cmd.CountdownUpdateCmd_S'; };
        return CountdownUpdateCmd_S;
    })();
    Cmd.CountdownUpdateCmd_S = CountdownUpdateCmd_S;
    /**
     * 房间数据更新
     */
    var RoomDataUpdateCmd_S = (function () {
        function RoomDataUpdateCmd_S() {
        }
        RoomDataUpdateCmd_S.prototype.GetType = function () { return 'Cmd.RoomDataUpdateCmd_S'; };
        return RoomDataUpdateCmd_S;
    })();
    Cmd.RoomDataUpdateCmd_S = RoomDataUpdateCmd_S;
    /**
     * 房间玩家更新
     */
    var RoomSeatUpdateCmd_S = (function () {
        function RoomSeatUpdateCmd_S() {
        }
        RoomSeatUpdateCmd_S.prototype.GetType = function () { return 'Cmd.RoomSeatUpdateCmd_S'; };
        return RoomSeatUpdateCmd_S;
    })();
    Cmd.RoomSeatUpdateCmd_S = RoomSeatUpdateCmd_S;
    /**
     * 解散房间请求
     */
    var DissolveRoomRequestCmd_C = (function () {
        function DissolveRoomRequestCmd_C() {
        }
        DissolveRoomRequestCmd_C.prototype.GetType = function () { return 'Cmd.DissolveRoomRequestCmd_C'; };
        return DissolveRoomRequestCmd_C;
    })();
    Cmd.DissolveRoomRequestCmd_C = DissolveRoomRequestCmd_C;
    /**
     * 回复解散房间请求
     */
    var DissolveRoomReturnCmd_C = (function () {
        function DissolveRoomReturnCmd_C() {
        }
        DissolveRoomReturnCmd_C.prototype.GetType = function () { return 'Cmd.DissolveRoomReturnCmd_C'; };
        return DissolveRoomReturnCmd_C;
    })();
    Cmd.DissolveRoomReturnCmd_C = DissolveRoomReturnCmd_C;
    /**
     * 解散房间数据更新
     */
    var DissolveRoomUpdateCmd_S = (function () {
        function DissolveRoomUpdateCmd_S() {
        }
        DissolveRoomUpdateCmd_S.prototype.GetType = function () { return 'Cmd.DissolveRoomUpdateCmd_S'; };
        return DissolveRoomUpdateCmd_S;
    })();
    Cmd.DissolveRoomUpdateCmd_S = DissolveRoomUpdateCmd_S;
    var DissolveRoomUpdateCmd_S;
    (function (DissolveRoomUpdateCmd_S) {
        var Voter = (function () {
            function Voter() {
            }
            Voter.prototype.GetType = function () { return 'Cmd.DissolveRoomUpdateCmd_S.Voter'; };
            return Voter;
        })();
        DissolveRoomUpdateCmd_S.Voter = Voter;
    })(DissolveRoomUpdateCmd_S = Cmd.DissolveRoomUpdateCmd_S || (Cmd.DissolveRoomUpdateCmd_S = {}));
    /**
     * 投票数据
     */
    var VoteData = (function () {
        function VoteData() {
        }
        VoteData.prototype.GetType = function () { return 'Cmd.VoteData'; };
        return VoteData;
    })();
    Cmd.VoteData = VoteData;
    var VoteData;
    (function (VoteData) {
        var Voter = (function () {
            function Voter() {
            }
            Voter.prototype.GetType = function () { return 'Cmd.VoteData.Voter'; };
            return Voter;
        })();
        VoteData.Voter = Voter;
    })(VoteData = Cmd.VoteData || (Cmd.VoteData = {}));
    /**
     * 投票发起
     */
    var VoteLaunchCmd_C = (function () {
        function VoteLaunchCmd_C() {
        }
        VoteLaunchCmd_C.prototype.GetType = function () { return 'Cmd.VoteLaunchCmd_C'; };
        return VoteLaunchCmd_C;
    })();
    Cmd.VoteLaunchCmd_C = VoteLaunchCmd_C;
    /**
     * 投票选择
     */
    var VoteSelectCmd_C = (function () {
        function VoteSelectCmd_C() {
        }
        VoteSelectCmd_C.prototype.GetType = function () { return 'Cmd.VoteSelectCmd_C'; };
        return VoteSelectCmd_C;
    })();
    Cmd.VoteSelectCmd_C = VoteSelectCmd_C;
    /**
     * 投票数据更新
     */
    var VoteUpdateCmd_S = (function () {
        function VoteUpdateCmd_S() {
        }
        VoteUpdateCmd_S.prototype.GetType = function () { return 'Cmd.VoteUpdateCmd_S'; };
        return VoteUpdateCmd_S;
    })();
    Cmd.VoteUpdateCmd_S = VoteUpdateCmd_S;
    /**
     * 启动牌局
     */
    var EnableRoundCmd_CS = (function () {
        function EnableRoundCmd_CS() {
        }
        EnableRoundCmd_CS.prototype.GetType = function () { return 'Cmd.EnableRoundCmd_CS'; };
        return EnableRoundCmd_CS;
    })();
    Cmd.EnableRoundCmd_CS = EnableRoundCmd_CS;
    /**
     * 徳扑游戏数据
     */
    var TexasRoundInfo = (function () {
        function TexasRoundInfo() {
        }
        TexasRoundInfo.prototype.GetType = function () { return 'Cmd.TexasRoundInfo'; };
        return TexasRoundInfo;
    })();
    Cmd.TexasRoundInfo = TexasRoundInfo;
    /**
     *  C-&gt;S 开始游戏请求
     *  S-&gt;C 开始游戏通知
     */
    var StartGameCmd_CS = (function () {
        function StartGameCmd_CS() {
        }
        StartGameCmd_CS.prototype.GetType = function () { return 'Cmd.StartGameCmd_CS'; };
        return StartGameCmd_CS;
    })();
    Cmd.StartGameCmd_CS = StartGameCmd_CS;
    /**
     * 游戏开始
     */
    var StartGameCmd_S = (function () {
        function StartGameCmd_S() {
        }
        StartGameCmd_S.prototype.GetType = function () { return 'Cmd.StartGameCmd_S'; };
        return StartGameCmd_S;
    })();
    Cmd.StartGameCmd_S = StartGameCmd_S;
    /**
     * 展示牌请求
     */
    var DisplayCardCmd_CS = (function () {
        function DisplayCardCmd_CS() {
        }
        DisplayCardCmd_CS.prototype.GetType = function () { return 'Cmd.DisplayCardCmd_CS'; };
        return DisplayCardCmd_CS;
    })();
    Cmd.DisplayCardCmd_CS = DisplayCardCmd_CS;
    /**
     * 发牌
     */
    var DealCardCmd_S = (function () {
        function DealCardCmd_S() {
        }
        DealCardCmd_S.prototype.GetType = function () { return 'Cmd.DealCardCmd_S'; };
        return DealCardCmd_S;
    })();
    Cmd.DealCardCmd_S = DealCardCmd_S;
    /**
     * 更新手牌
     */
    var HandCardUpdateCmd_S = (function () {
        function HandCardUpdateCmd_S() {
        }
        HandCardUpdateCmd_S.prototype.GetType = function () { return 'Cmd.HandCardUpdateCmd_S'; };
        return HandCardUpdateCmd_S;
    })();
    Cmd.HandCardUpdateCmd_S = HandCardUpdateCmd_S;
    /**
     * 牌集列表
     */
    var CardSetList = (function () {
        function CardSetList() {
        }
        CardSetList.prototype.GetType = function () { return 'Cmd.CardSetList'; };
        return CardSetList;
    })();
    Cmd.CardSetList = CardSetList;
    /**
     * 操作位轮转
     */
    var NewOperateSeatCmd_S = (function () {
        function NewOperateSeatCmd_S() {
        }
        NewOperateSeatCmd_S.prototype.GetType = function () { return 'Cmd.NewOperateSeatCmd_S'; };
        return NewOperateSeatCmd_S;
    })();
    Cmd.NewOperateSeatCmd_S = NewOperateSeatCmd_S;
    /**
     * 排名通知
     */
    var RankUpdateCmd_S = (function () {
        function RankUpdateCmd_S() {
        }
        RankUpdateCmd_S.prototype.GetType = function () { return 'Cmd.RankUpdateCmd_S'; };
        return RankUpdateCmd_S;
    })();
    Cmd.RankUpdateCmd_S = RankUpdateCmd_S;
    /**
     * 打出去的牌
     */
    var PlayCardInfo = (function () {
        function PlayCardInfo() {
        }
        PlayCardInfo.prototype.GetType = function () { return 'Cmd.PlayCardInfo'; };
        return PlayCardInfo;
    })();
    Cmd.PlayCardInfo = PlayCardInfo;
    /**
     *  C-&gt;S 出牌请求
     *  S-&gt;C 出牌通知
     */
    var PlayCardCmd_CS = (function () {
        function PlayCardCmd_CS() {
        }
        PlayCardCmd_CS.prototype.GetType = function () { return 'Cmd.PlayCardCmd_CS'; };
        return PlayCardCmd_CS;
    })();
    Cmd.PlayCardCmd_CS = PlayCardCmd_CS;
    /**
     * 获取玩家综合信息
     */
    var GetUserFullInfoCmd_CS = (function () {
        function GetUserFullInfoCmd_CS() {
        }
        GetUserFullInfoCmd_CS.prototype.GetType = function () { return 'Cmd.GetUserFullInfoCmd_CS'; };
        return GetUserFullInfoCmd_CS;
    })();
    Cmd.GetUserFullInfoCmd_CS = GetUserFullInfoCmd_CS;
    /**
     * 底牌更新通知
     */
    var BottomCardUpdateCmd_S = (function () {
        function BottomCardUpdateCmd_S() {
        }
        BottomCardUpdateCmd_S.prototype.GetType = function () { return 'Cmd.BottomCardUpdateCmd_S'; };
        return BottomCardUpdateCmd_S;
    })();
    Cmd.BottomCardUpdateCmd_S = BottomCardUpdateCmd_S;
    /**
     *  C-&gt;S 抢地主请求
     *  S-&gt;C 玩家抢地主通知
     */
    var LandlordRobCmd_CS = (function () {
        function LandlordRobCmd_CS() {
        }
        LandlordRobCmd_CS.prototype.GetType = function () { return 'Cmd.LandlordRobCmd_CS'; };
        return LandlordRobCmd_CS;
    })();
    Cmd.LandlordRobCmd_CS = LandlordRobCmd_CS;
    /**
     *  C-&gt;S 叫地主请求
     *  S-&gt;C 玩家叫地主通知
     */
    var LandlordCallCmd_CS = (function () {
        function LandlordCallCmd_CS() {
        }
        LandlordCallCmd_CS.prototype.GetType = function () { return 'Cmd.LandlordCallCmd_CS'; };
        return LandlordCallCmd_CS;
    })();
    Cmd.LandlordCallCmd_CS = LandlordCallCmd_CS;
    /**
     * 轮到玩家抢/叫地主通知
     */
    var LandlordOptionCmd_S = (function () {
        function LandlordOptionCmd_S() {
        }
        LandlordOptionCmd_S.prototype.GetType = function () { return 'Cmd.LandlordOptionCmd_S'; };
        return LandlordOptionCmd_S;
    })();
    Cmd.LandlordOptionCmd_S = LandlordOptionCmd_S;
    /**
     * 产生地主通知
     */
    var LandlordUpdateCmd_S = (function () {
        function LandlordUpdateCmd_S() {
        }
        LandlordUpdateCmd_S.prototype.GetType = function () { return 'Cmd.LandlordUpdateCmd_S'; };
        return LandlordUpdateCmd_S;
    })();
    Cmd.LandlordUpdateCmd_S = LandlordUpdateCmd_S;
    /**
     * 底分更新通知
     */
    var PointBaseUpdateCmd_S = (function () {
        function PointBaseUpdateCmd_S() {
        }
        PointBaseUpdateCmd_S.prototype.GetType = function () { return 'Cmd.PointBaseUpdateCmd_S'; };
        return PointBaseUpdateCmd_S;
    })();
    Cmd.PointBaseUpdateCmd_S = PointBaseUpdateCmd_S;
    /**
     * 游戏数字
     */
    var GameNumber = (function () {
        function GameNumber() {
        }
        GameNumber.prototype.GetType = function () { return 'Cmd.GameNumber'; };
        return GameNumber;
    })();
    Cmd.GameNumber = GameNumber;
    var GameNumber;
    (function (GameNumber) {
        (function (Type) {
            /**
             * 底分
             */
            Type[Type["PointBase"] = 1] = "PointBase";
            /**
             * 底注
             */
            Type[Type["PointBottom"] = 2] = "PointBottom";
            /**
             * 锅底分
             */
            Type[Type["Pan"] = 3] = "Pan";
            /**
             * 底池
             */
            Type[Type["Pool"] = 4] = "Pool";
        })(GameNumber.Type || (GameNumber.Type = {}));
        var Type = GameNumber.Type;
    })(GameNumber = Cmd.GameNumber || (Cmd.GameNumber = {}));
    /**
     * 数字更新
     */
    var GameNumberUpdateCmd_S = (function () {
        function GameNumberUpdateCmd_S() {
        }
        GameNumberUpdateCmd_S.prototype.GetType = function () { return 'Cmd.GameNumberUpdateCmd_S'; };
        return GameNumberUpdateCmd_S;
    })();
    Cmd.GameNumberUpdateCmd_S = GameNumberUpdateCmd_S;
    /**
     *  轮到玩家抢地主通知
     *  废弃，随后删除，请使用 LandlordOptionCmd_S
     */
    var LandlordRobOptionCmd_S = (function () {
        function LandlordRobOptionCmd_S() {
        }
        LandlordRobOptionCmd_S.prototype.GetType = function () { return 'Cmd.LandlordRobOptionCmd_S'; };
        return LandlordRobOptionCmd_S;
    })();
    Cmd.LandlordRobOptionCmd_S = LandlordRobOptionCmd_S;
    /**
     * 轮到玩家 踢 操作
     */
    var KickPlayOptionalCmd_S = (function () {
        function KickPlayOptionalCmd_S() {
        }
        KickPlayOptionalCmd_S.prototype.GetType = function () { return 'Cmd.KickPlayOptionalCmd_S'; };
        return KickPlayOptionalCmd_S;
    })();
    Cmd.KickPlayOptionalCmd_S = KickPlayOptionalCmd_S;
    /**
     *  C-&gt;S 踢 操作请求
     *  S-&gt;C 踢 操作通知
     */
    var KickPlayCmd_CS = (function () {
        function KickPlayCmd_CS() {
        }
        KickPlayCmd_CS.prototype.GetType = function () { return 'Cmd.KickPlayCmd_CS'; };
        return KickPlayCmd_CS;
    })();
    Cmd.KickPlayCmd_CS = KickPlayCmd_CS;
    /**
     * 倍数更新
     */
    var MultipleUpdateCmd_S = (function () {
        function MultipleUpdateCmd_S() {
        }
        MultipleUpdateCmd_S.prototype.GetType = function () { return 'Cmd.MultipleUpdateCmd_S'; };
        return MultipleUpdateCmd_S;
    })();
    Cmd.MultipleUpdateCmd_S = MultipleUpdateCmd_S;
    var MultipleUpdateCmd_S;
    (function (MultipleUpdateCmd_S) {
        var Update = (function () {
            function Update() {
            }
            Update.prototype.GetType = function () { return 'Cmd.MultipleUpdateCmd_S.Update'; };
            return Update;
        })();
        MultipleUpdateCmd_S.Update = Update;
    })(MultipleUpdateCmd_S = Cmd.MultipleUpdateCmd_S || (Cmd.MultipleUpdateCmd_S = {}));
    /**
     * 游戏对象
     */
    var GameObjectData = (function () {
        function GameObjectData() {
        }
        GameObjectData.prototype.GetType = function () { return 'Cmd.GameObjectData'; };
        return GameObjectData;
    })();
    Cmd.GameObjectData = GameObjectData;
    var BetResult = (function () {
        function BetResult() {
        }
        BetResult.prototype.GetType = function () { return 'Cmd.BetResult'; };
        return BetResult;
    })();
    Cmd.BetResult = BetResult;
    /**
     * 牌局结束后结算通知
     */
    var RoundResultCmd_S = (function () {
        function RoundResultCmd_S() {
        }
        RoundResultCmd_S.prototype.GetType = function () { return 'Cmd.RoundResultCmd_S'; };
        return RoundResultCmd_S;
    })();
    Cmd.RoundResultCmd_S = RoundResultCmd_S;
    /**
     *  C-&gt;S 获取观众信息
     *  S-&gt;C 通知观众信息
     */
    var AudienceUpdateCmd_CS = (function () {
        function AudienceUpdateCmd_CS() {
        }
        AudienceUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.AudienceUpdateCmd_CS'; };
        return AudienceUpdateCmd_CS;
    })();
    Cmd.AudienceUpdateCmd_CS = AudienceUpdateCmd_CS;
    /**
     * 房间最后的结算通知
     */
    var FinalResult_S = (function () {
        function FinalResult_S() {
        }
        FinalResult_S.prototype.GetType = function () { return 'Cmd.FinalResult_S'; };
        return FinalResult_S;
    })();
    Cmd.FinalResult_S = FinalResult_S;
    var FinalResult_S;
    (function (FinalResult_S) {
        var Record = (function () {
            function Record() {
            }
            Record.prototype.GetType = function () { return 'Cmd.FinalResult_S.Record'; };
            return Record;
        })();
        FinalResult_S.Record = Record;
    })(FinalResult_S = Cmd.FinalResult_S || (Cmd.FinalResult_S = {}));
    /**
     *  gm指令
     *  C-&gt;S 获取所有可选牌
     *  S-&gt;C 所有可选牌更新
     */
    var GmAvailableCardUpdateCmd_CS = (function () {
        function GmAvailableCardUpdateCmd_CS() {
        }
        GmAvailableCardUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.GmAvailableCardUpdateCmd_CS'; };
        return GmAvailableCardUpdateCmd_CS;
    })();
    Cmd.GmAvailableCardUpdateCmd_CS = GmAvailableCardUpdateCmd_CS;
    var GmAvailableCardUpdateCmd_CS;
    (function (GmAvailableCardUpdateCmd_CS) {
        var SeatSelectData = (function () {
            function SeatSelectData() {
            }
            SeatSelectData.prototype.GetType = function () { return 'Cmd.GmAvailableCardUpdateCmd_CS.SeatSelectData'; };
            return SeatSelectData;
        })();
        GmAvailableCardUpdateCmd_CS.SeatSelectData = SeatSelectData;
    })(GmAvailableCardUpdateCmd_CS = Cmd.GmAvailableCardUpdateCmd_CS || (Cmd.GmAvailableCardUpdateCmd_CS = {}));
    /**
     *  gm指令
     *  选牌请求
     */
    var GmSelectCardCmd_C = (function () {
        function GmSelectCardCmd_C() {
        }
        GmSelectCardCmd_C.prototype.GetType = function () { return 'Cmd.GmSelectCardCmd_C'; };
        return GmSelectCardCmd_C;
    })();
    Cmd.GmSelectCardCmd_C = GmSelectCardCmd_C;
    /**
     *  gm指令
     *  结束牌局请求
     */
    var GmFinishRoundCmd_C = (function () {
        function GmFinishRoundCmd_C() {
        }
        GmFinishRoundCmd_C.prototype.GetType = function () { return 'Cmd.GmFinishRoundCmd_C'; };
        return GmFinishRoundCmd_C;
    })();
    Cmd.GmFinishRoundCmd_C = GmFinishRoundCmd_C;
    /**
     *  gm指令
     *  通用gm指令
     */
    var GmCommandCmd_C = (function () {
        function GmCommandCmd_C() {
        }
        GmCommandCmd_C.prototype.GetType = function () { return 'Cmd.GmCommandCmd_C'; };
        return GmCommandCmd_C;
    })();
    Cmd.GmCommandCmd_C = GmCommandCmd_C;
    /**
     * 数位投注
     */
    var DigitChips = (function () {
        function DigitChips() {
        }
        DigitChips.prototype.GetType = function () { return 'Cmd.DigitChips'; };
        return DigitChips;
    })();
    Cmd.DigitChips = DigitChips;
    var DigitChips;
    (function (DigitChips) {
        /**
         * 数位
         */
        (function (Digit) {
            Digit[Digit["One"] = 1] = "One";
            Digit[Digit["Ten"] = 2] = "Ten";
            Digit[Digit["Hundred"] = 3] = "Hundred";
            Digit[Digit["Thousand"] = 4] = "Thousand";
        })(DigitChips.Digit || (DigitChips.Digit = {}));
        var Digit = DigitChips.Digit;
    })(DigitChips = Cmd.DigitChips || (Cmd.DigitChips = {}));
    /**
     *  C-&gt;S 压注请求
     *  S-&gt;C 压注通知
     */
    var BetRoomCmd_CS = (function () {
        function BetRoomCmd_CS() {
        }
        BetRoomCmd_CS.prototype.GetType = function () { return 'Cmd.BetRoomCmd_CS'; };
        return BetRoomCmd_CS;
    })();
    Cmd.BetRoomCmd_CS = BetRoomCmd_CS;
    /**
     * /////////////////十点半 服务费刷新协议
     */
    var RefreshMoney_S = (function () {
        function RefreshMoney_S() {
        }
        RefreshMoney_S.prototype.GetType = function () { return 'Cmd.RefreshMoney_S'; };
        return RefreshMoney_S;
    })();
    Cmd.RefreshMoney_S = RefreshMoney_S;
    /**
     * 每个玩家信息
     */
    var pointSet = (function () {
        function pointSet() {
        }
        pointSet.prototype.GetType = function () { return 'Cmd.pointSet'; };
        return pointSet;
    })();
    Cmd.pointSet = pointSet;
    /**
     * 动作
     */
    var Action = (function () {
        function Action() {
        }
        Action.prototype.GetType = function () { return 'Cmd.Action'; };
        return Action;
    })();
    Cmd.Action = Action;
    /**
     * 更新可以进行的动作
     */
    var UpdateActionCmd_S = (function () {
        function UpdateActionCmd_S() {
        }
        UpdateActionCmd_S.prototype.GetType = function () { return 'Cmd.UpdateActionCmd_S'; };
        return UpdateActionCmd_S;
    })();
    Cmd.UpdateActionCmd_S = UpdateActionCmd_S;
    /**
     *  C-&gt;S 玩家进行操作请求
     *  S-&gt;C 玩家进行操作通知
     */
    var UserActionCmd_CS = (function () {
        function UserActionCmd_CS() {
        }
        UserActionCmd_CS.prototype.GetType = function () { return 'Cmd.UserActionCmd_CS'; };
        return UserActionCmd_CS;
    })();
    Cmd.UserActionCmd_CS = UserActionCmd_CS;
    /**
     *  C-&gt;S 操作延时请求
     *  S-&gt;C 操作延时通知
     */
    var BetDelayCmd_C = (function () {
        function BetDelayCmd_C() {
        }
        BetDelayCmd_C.prototype.GetType = function () { return 'Cmd.BetDelayCmd_C'; };
        return BetDelayCmd_C;
    })();
    Cmd.BetDelayCmd_C = BetDelayCmd_C;
    /**
     * 押注数据
     */
    var BetData = (function () {
        function BetData() {
        }
        BetData.prototype.GetType = function () { return 'Cmd.BetData'; };
        return BetData;
    })();
    Cmd.BetData = BetData;
    /**
     *  C-&gt;S 看牌请求
     *  S-&gt;C 看牌通知
     */
    var CheckCardCmd_CS = (function () {
        function CheckCardCmd_CS() {
        }
        CheckCardCmd_CS.prototype.GetType = function () { return 'Cmd.CheckCardCmd_CS'; };
        return CheckCardCmd_CS;
    })();
    Cmd.CheckCardCmd_CS = CheckCardCmd_CS;
    /**
     * 门筹码更新 废弃 用BetUpdateCmd_S代替
     */
    var DoorUpdataCmd_S = (function () {
        function DoorUpdataCmd_S() {
        }
        DoorUpdataCmd_S.prototype.GetType = function () { return 'Cmd.DoorUpdataCmd_S'; };
        return DoorUpdataCmd_S;
    })();
    Cmd.DoorUpdataCmd_S = DoorUpdataCmd_S;
    /**
     * 数位押注的数据
     */
    var DigitData = (function () {
        function DigitData() {
        }
        DigitData.prototype.GetType = function () { return 'Cmd.DigitData'; };
        return DigitData;
    })();
    Cmd.DigitData = DigitData;
    /**
     * 压注数更新
     */
    var BetUpdateCmd_S = (function () {
        function BetUpdateCmd_S() {
        }
        BetUpdateCmd_S.prototype.GetType = function () { return 'Cmd.BetUpdateCmd_S'; };
        return BetUpdateCmd_S;
    })();
    Cmd.BetUpdateCmd_S = BetUpdateCmd_S;
    /**
     * 上庄请求
     */
    var BankerUpCmd_C = (function () {
        function BankerUpCmd_C() {
        }
        BankerUpCmd_C.prototype.GetType = function () { return 'Cmd.BankerUpCmd_C'; };
        return BankerUpCmd_C;
    })();
    Cmd.BankerUpCmd_C = BankerUpCmd_C;
    /**
     * 下庄请求
     */
    var BankerDownCmd_C = (function () {
        function BankerDownCmd_C() {
        }
        BankerDownCmd_C.prototype.GetType = function () { return 'Cmd.BankerDownCmd_C'; };
        return BankerDownCmd_C;
    })();
    Cmd.BankerDownCmd_C = BankerDownCmd_C;
    /**
     * 上庄列表更新
     */
    var BankerWaitListUpdateCmd_S = (function () {
        function BankerWaitListUpdateCmd_S() {
        }
        BankerWaitListUpdateCmd_S.prototype.GetType = function () { return 'Cmd.BankerWaitListUpdateCmd_S'; };
        return BankerWaitListUpdateCmd_S;
    })();
    Cmd.BankerWaitListUpdateCmd_S = BankerWaitListUpdateCmd_S;
    /**
     * 更新庄家信息
     */
    var BankerUpdateCmd_S = (function () {
        function BankerUpdateCmd_S() {
        }
        BankerUpdateCmd_S.prototype.GetType = function () { return 'Cmd.BankerUpdateCmd_S'; };
        return BankerUpdateCmd_S;
    })();
    Cmd.BankerUpdateCmd_S = BankerUpdateCmd_S;
    /**
     * 随机显示一组牌
     */
    var ShowRandomCardCmd_S = (function () {
        function ShowRandomCardCmd_S() {
        }
        ShowRandomCardCmd_S.prototype.GetType = function () { return 'Cmd.ShowRandomCardCmd_S'; };
        return ShowRandomCardCmd_S;
    })();
    Cmd.ShowRandomCardCmd_S = ShowRandomCardCmd_S;
    /**
     * 货币更新通知
     */
    var MoneyUpdateCmd_S = (function () {
        function MoneyUpdateCmd_S() {
        }
        MoneyUpdateCmd_S.prototype.GetType = function () { return 'Cmd.MoneyUpdateCmd_S'; };
        return MoneyUpdateCmd_S;
    })();
    Cmd.MoneyUpdateCmd_S = MoneyUpdateCmd_S;
    var MoneyUpdateCmd_S;
    (function (MoneyUpdateCmd_S) {
        var Update = (function () {
            function Update() {
            }
            Update.prototype.GetType = function () { return 'Cmd.MoneyUpdateCmd_S.Update'; };
            return Update;
        })();
        MoneyUpdateCmd_S.Update = Update;
    })(MoneyUpdateCmd_S = Cmd.MoneyUpdateCmd_S || (Cmd.MoneyUpdateCmd_S = {}));
    /**
     *  C-&gt;S 请求历史数据
     *  S-&gt;C 历史数据更新
     */
    var HistoryUpdateCmd_CS = (function () {
        function HistoryUpdateCmd_CS() {
        }
        HistoryUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.HistoryUpdateCmd_CS'; };
        return HistoryUpdateCmd_CS;
    })();
    Cmd.HistoryUpdateCmd_CS = HistoryUpdateCmd_CS;
    /**
     *  C-&gt;S 坐下请求
     *  S-&gt;C 坐下通知
     */
    var SitDownCmd_CS = (function () {
        function SitDownCmd_CS() {
        }
        SitDownCmd_CS.prototype.GetType = function () { return 'Cmd.SitDownCmd_CS'; };
        return SitDownCmd_CS;
    })();
    Cmd.SitDownCmd_CS = SitDownCmd_CS;
    /**
     * 坐起请求
     */
    var SitUpCmd_C = (function () {
        function SitUpCmd_C() {
        }
        SitUpCmd_C.prototype.GetType = function () { return 'Cmd.SitUpCmd_C'; };
        return SitUpCmd_C;
    })();
    Cmd.SitUpCmd_C = SitUpCmd_C;
    /**
     * 强制站起
     */
    var SitUpForceCmd_C = (function () {
        function SitUpForceCmd_C() {
        }
        SitUpForceCmd_C.prototype.GetType = function () { return 'Cmd.SitUpForceCmd_C'; };
        return SitUpForceCmd_C;
    })();
    Cmd.SitUpForceCmd_C = SitUpForceCmd_C;
    /**
     * 开始游戏操作位更新
     */
    var StartGameOpIdUpdate_S = (function () {
        function StartGameOpIdUpdate_S() {
        }
        StartGameOpIdUpdate_S.prototype.GetType = function () { return 'Cmd.StartGameOpIdUpdate_S'; };
        return StartGameOpIdUpdate_S;
    })();
    Cmd.StartGameOpIdUpdate_S = StartGameOpIdUpdate_S;
    /**
     *  C-&gt;S 请求亮牌
     *  S-&gt;C 请求亮牌通知
     */
    var ShowMyCardUpdateCmd_CS = (function () {
        function ShowMyCardUpdateCmd_CS() {
        }
        ShowMyCardUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.ShowMyCardUpdateCmd_CS'; };
        return ShowMyCardUpdateCmd_CS;
    })();
    Cmd.ShowMyCardUpdateCmd_CS = ShowMyCardUpdateCmd_CS;
    /**
     * 通知客户端显示具体的牌
     */
    var ShowCards_S = (function () {
        function ShowCards_S() {
        }
        ShowCards_S.prototype.GetType = function () { return 'Cmd.ShowCards_S'; };
        return ShowCards_S;
    })();
    Cmd.ShowCards_S = ShowCards_S;
    var ShowCards_S;
    (function (ShowCards_S) {
        var Cards = (function () {
            function Cards() {
            }
            Cards.prototype.GetType = function () { return 'Cmd.ShowCards_S.Cards'; };
            return Cards;
        })();
        ShowCards_S.Cards = Cards;
    })(ShowCards_S = Cmd.ShowCards_S || (Cmd.ShowCards_S = {}));
    var NiuNiuCard = (function () {
        function NiuNiuCard() {
        }
        NiuNiuCard.prototype.GetType = function () { return 'Cmd.NiuNiuCard'; };
        return NiuNiuCard;
    })();
    Cmd.NiuNiuCard = NiuNiuCard;
    /**
     * 牛牛缺牌数量
     */
    var NeedNiuNiuCard_S = (function () {
        function NeedNiuNiuCard_S() {
        }
        NeedNiuNiuCard_S.prototype.GetType = function () { return 'Cmd.NeedNiuNiuCard_S'; };
        return NeedNiuNiuCard_S;
    })();
    Cmd.NeedNiuNiuCard_S = NeedNiuNiuCard_S;
    /**
     * 加牌请求
     */
    var CatchCardCmd_C = (function () {
        function CatchCardCmd_C() {
        }
        CatchCardCmd_C.prototype.GetType = function () { return 'Cmd.CatchCardCmd_C'; };
        return CatchCardCmd_C;
    })();
    Cmd.CatchCardCmd_C = CatchCardCmd_C;
    /**
     * 进入桌子
     */
    var EnterDeskCmd_CS = (function () {
        function EnterDeskCmd_CS() {
        }
        EnterDeskCmd_CS.prototype.GetType = function () { return 'Cmd.EnterDeskCmd_CS'; };
        return EnterDeskCmd_CS;
    })();
    Cmd.EnterDeskCmd_CS = EnterDeskCmd_CS;
    /**
     * 获取游戏数据
     */
    var GameDataUpdateCmd_C = (function () {
        function GameDataUpdateCmd_C() {
        }
        GameDataUpdateCmd_C.prototype.GetType = function () { return 'Cmd.GameDataUpdateCmd_C'; };
        return GameDataUpdateCmd_C;
    })();
    Cmd.GameDataUpdateCmd_C = GameDataUpdateCmd_C;
    /**
     *  C-&gt;S 比牌请求
     *  S-&gt;C 比牌通知
     */
    var CompareCardCmd_CS = (function () {
        function CompareCardCmd_CS() {
        }
        CompareCardCmd_CS.prototype.GetType = function () { return 'Cmd.CompareCardCmd_CS'; };
        return CompareCardCmd_CS;
    })();
    Cmd.CompareCardCmd_CS = CompareCardCmd_CS;
    /**
     * 升盲通知
     */
    var RiseBlindCmd_S = (function () {
        function RiseBlindCmd_S() {
        }
        RiseBlindCmd_S.prototype.GetType = function () { return 'Cmd.RiseBlindCmd_S'; };
        return RiseBlindCmd_S;
    })();
    Cmd.RiseBlindCmd_S = RiseBlindCmd_S;
    /**
     * 押注圈结束
     */
    var CircleEndCmd_S = (function () {
        function CircleEndCmd_S() {
        }
        CircleEndCmd_S.prototype.GetType = function () { return 'Cmd.CircleEndCmd_S'; };
        return CircleEndCmd_S;
    })();
    Cmd.CircleEndCmd_S = CircleEndCmd_S;
    /**
     * 保险阶段开始
     */
    var InsuranceStartCmd_S = (function () {
        function InsuranceStartCmd_S() {
        }
        InsuranceStartCmd_S.prototype.GetType = function () { return 'Cmd.InsuranceStartCmd_S'; };
        return InsuranceStartCmd_S;
    })();
    Cmd.InsuranceStartCmd_S = InsuranceStartCmd_S;
    var InsuranceData = (function () {
        function InsuranceData() {
        }
        InsuranceData.prototype.GetType = function () { return 'Cmd.InsuranceData'; };
        return InsuranceData;
    })();
    Cmd.InsuranceData = InsuranceData;
    var InsuranceData;
    (function (InsuranceData) {
        var Record = (function () {
            function Record() {
            }
            Record.prototype.GetType = function () { return 'Cmd.InsuranceData.Record'; };
            return Record;
        })();
        InsuranceData.Record = Record;
    })(InsuranceData = Cmd.InsuranceData || (Cmd.InsuranceData = {}));
    /**
     * 保险可购买通知
     */
    var InsuranceNewOpCmd_S = (function () {
        function InsuranceNewOpCmd_S() {
        }
        InsuranceNewOpCmd_S.prototype.GetType = function () { return 'Cmd.InsuranceNewOpCmd_S'; };
        return InsuranceNewOpCmd_S;
    })();
    Cmd.InsuranceNewOpCmd_S = InsuranceNewOpCmd_S;
    /**
     *  C-&gt;S 买入保险请求
     *  S-&gt;C 买入保险通知
     */
    var InsuranceBuyCmd_CS = (function () {
        function InsuranceBuyCmd_CS() {
        }
        InsuranceBuyCmd_CS.prototype.GetType = function () { return 'Cmd.InsuranceBuyCmd_CS'; };
        return InsuranceBuyCmd_CS;
    })();
    Cmd.InsuranceBuyCmd_CS = InsuranceBuyCmd_CS;
    /**
     * 购买保险结束
     */
    var InsuranceBuyEndCmd_S = (function () {
        function InsuranceBuyEndCmd_S() {
        }
        InsuranceBuyEndCmd_S.prototype.GetType = function () { return 'Cmd.InsuranceBuyEndCmd_S'; };
        return InsuranceBuyEndCmd_S;
    })();
    Cmd.InsuranceBuyEndCmd_S = InsuranceBuyEndCmd_S;
    var TagData = (function () {
        function TagData() {
        }
        TagData.prototype.GetType = function () { return 'Cmd.TagData'; };
        return TagData;
    })();
    Cmd.TagData = TagData;
    /**
     * 标签更新
     */
    var TagUpdateCmd_CS = (function () {
        function TagUpdateCmd_CS() {
        }
        TagUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.TagUpdateCmd_CS'; };
        return TagUpdateCmd_CS;
    })();
    Cmd.TagUpdateCmd_CS = TagUpdateCmd_CS;
    /**
     * 标签查询
     */
    var TagListCmd_CS = (function () {
        function TagListCmd_CS() {
        }
        TagListCmd_CS.prototype.GetType = function () { return 'Cmd.TagListCmd_CS'; };
        return TagListCmd_CS;
    })();
    Cmd.TagListCmd_CS = TagListCmd_CS;
    /**
     * 标记标签
     */
    var TagUserCmd_CS = (function () {
        function TagUserCmd_CS() {
        }
        TagUserCmd_CS.prototype.GetType = function () { return 'Cmd.TagUserCmd_CS'; };
        return TagUserCmd_CS;
    })();
    Cmd.TagUserCmd_CS = TagUserCmd_CS;
    /**
     * 房间数据
     */
    var StatisticsRoomData = (function () {
        function StatisticsRoomData() {
        }
        StatisticsRoomData.prototype.GetType = function () { return 'Cmd.StatisticsRoomData'; };
        return StatisticsRoomData;
    })();
    Cmd.StatisticsRoomData = StatisticsRoomData;
    /**
     *  C-&gt;S 请求玩家牌局押注数据统计
     *  S-&gt;C 通知玩家牌局押注数据统计
     */
    var StatisticsRoundQueryCmd_CS = (function () {
        function StatisticsRoundQueryCmd_CS() {
        }
        StatisticsRoundQueryCmd_CS.prototype.GetType = function () { return 'Cmd.StatisticsRoundQueryCmd_CS'; };
        return StatisticsRoundQueryCmd_CS;
    })();
    Cmd.StatisticsRoundQueryCmd_CS = StatisticsRoundQueryCmd_CS;
    /**
     *  C-&gt;S 请求玩家牌局标签
     *  S-&gt;C 通知玩家牌局标签
     */
    var StatisticsRoomLabelQueryCmd_CS = (function () {
        function StatisticsRoomLabelQueryCmd_CS() {
        }
        StatisticsRoomLabelQueryCmd_CS.prototype.GetType = function () { return 'Cmd.StatisticsRoomLabelQueryCmd_CS'; };
        return StatisticsRoomLabelQueryCmd_CS;
    })();
    Cmd.StatisticsRoomLabelQueryCmd_CS = StatisticsRoomLabelQueryCmd_CS;
    /**
     *  C-&gt;S 请求房间结算数据
     *  S-&gt;C 通知房间结算数据
     */
    var StatisticsRoomDataCheckCmd_CS = (function () {
        function StatisticsRoomDataCheckCmd_CS() {
        }
        StatisticsRoomDataCheckCmd_CS.prototype.GetType = function () { return 'Cmd.StatisticsRoomDataCheckCmd_CS'; };
        return StatisticsRoomDataCheckCmd_CS;
    })();
    Cmd.StatisticsRoomDataCheckCmd_CS = StatisticsRoomDataCheckCmd_CS;
    /**
     * 牌谱详情
     */
    var RoundRecord = (function () {
        function RoundRecord() {
        }
        RoundRecord.prototype.GetType = function () { return 'Cmd.RoundRecord'; };
        return RoundRecord;
    })();
    Cmd.RoundRecord = RoundRecord;
    var RoundRecord;
    (function (RoundRecord) {
        var CircleInfo = (function () {
            function CircleInfo() {
            }
            CircleInfo.prototype.GetType = function () { return 'Cmd.RoundRecord.CircleInfo'; };
            return CircleInfo;
        })();
        RoundRecord.CircleInfo = CircleInfo;
    })(RoundRecord = Cmd.RoundRecord || (Cmd.RoundRecord = {}));
    /**
     * 牌谱标签
     */
    var RecordLable = (function () {
        function RecordLable() {
        }
        RecordLable.prototype.GetType = function () { return 'Cmd.RecordLable'; };
        return RecordLable;
    })();
    Cmd.RecordLable = RecordLable;
    /**
     *  C-&gt;S 请求房间牌谱列表
     *  S-&gt;C 请求房间牌谱回复
     */
    var RoundRecordRoomQueryCmd_CS = (function () {
        function RoundRecordRoomQueryCmd_CS() {
        }
        RoundRecordRoomQueryCmd_CS.prototype.GetType = function () { return 'Cmd.RoundRecordRoomQueryCmd_CS'; };
        return RoundRecordRoomQueryCmd_CS;
    })();
    Cmd.RoundRecordRoomQueryCmd_CS = RoundRecordRoomQueryCmd_CS;
    /**
     *  C-&gt;S 查看牌谱请求
     *  S-&gt;C 查看牌谱回复
     */
    var RoundRecordCheckCmd_CS = (function () {
        function RoundRecordCheckCmd_CS() {
        }
        RoundRecordCheckCmd_CS.prototype.GetType = function () { return 'Cmd.RoundRecordCheckCmd_CS'; };
        return RoundRecordCheckCmd_CS;
    })();
    Cmd.RoundRecordCheckCmd_CS = RoundRecordCheckCmd_CS;
    /**
     * 牌谱id
     */
    var RoundRecordIdUpdateCmd_CS = (function () {
        function RoundRecordIdUpdateCmd_CS() {
        }
        RoundRecordIdUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.RoundRecordIdUpdateCmd_CS'; };
        return RoundRecordIdUpdateCmd_CS;
    })();
    Cmd.RoundRecordIdUpdateCmd_CS = RoundRecordIdUpdateCmd_CS;
    /**
     * 收藏/取消牌谱
     */
    var RoundRecordCollectCmd_CS = (function () {
        function RoundRecordCollectCmd_CS() {
        }
        RoundRecordCollectCmd_CS.prototype.GetType = function () { return 'Cmd.RoundRecordCollectCmd_CS'; };
        return RoundRecordCollectCmd_CS;
    })();
    Cmd.RoundRecordCollectCmd_CS = RoundRecordCollectCmd_CS;
    /**
     * 查看我收藏的牌谱
     */
    var RoundRecordQueryMyCmd_CS = (function () {
        function RoundRecordQueryMyCmd_CS() {
        }
        RoundRecordQueryMyCmd_CS.prototype.GetType = function () { return 'Cmd.RoundRecordQueryMyCmd_CS'; };
        return RoundRecordQueryMyCmd_CS;
    })();
    Cmd.RoundRecordQueryMyCmd_CS = RoundRecordQueryMyCmd_CS;
    /**
     * 德扑创建房间
     */
    var RoomCreateCmd_C = (function () {
        function RoomCreateCmd_C() {
        }
        RoomCreateCmd_C.prototype.GetType = function () { return 'Cmd.RoomCreateCmd_C'; };
        return RoomCreateCmd_C;
    })();
    Cmd.RoomCreateCmd_C = RoomCreateCmd_C;
    /**
     *  C-&gt;S 创建房间选项更新请求
     *  S-&gt;C 创建房间选项更新通知
     */
    var RoomCreateConfigUpdateCmd_CS = (function () {
        function RoomCreateConfigUpdateCmd_CS() {
        }
        RoomCreateConfigUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.RoomCreateConfigUpdateCmd_CS'; };
        return RoomCreateConfigUpdateCmd_CS;
    })();
    Cmd.RoomCreateConfigUpdateCmd_CS = RoomCreateConfigUpdateCmd_CS;
    /**
     *  C-&gt;S 购买记分牌请求
     *  S-&gt;C 购买记分牌结果
     */
    var RoomBuyBringCmd_CS = (function () {
        function RoomBuyBringCmd_CS() {
        }
        RoomBuyBringCmd_CS.prototype.GetType = function () { return 'Cmd.RoomBuyBringCmd_CS'; };
        return RoomBuyBringCmd_CS;
    })();
    Cmd.RoomBuyBringCmd_CS = RoomBuyBringCmd_CS;
    /**
     *  C-&gt;S 购买记分牌信息请求
     *  S-&gt;C 购买记分牌通知
     */
    var RoomBuyBringInfoRequestCmd_CS = (function () {
        function RoomBuyBringInfoRequestCmd_CS() {
        }
        RoomBuyBringInfoRequestCmd_CS.prototype.GetType = function () { return 'Cmd.RoomBuyBringInfoRequestCmd_CS'; };
        return RoomBuyBringInfoRequestCmd_CS;
    })();
    Cmd.RoomBuyBringInfoRequestCmd_CS = RoomBuyBringInfoRequestCmd_CS;
    /**
     *  C-&gt;S 房间内所有玩家的金钱统计请求
     *  S-&gt;C 房间内所有玩家的金钱统计更新
     */
    var RoomMoneyDataUpdateCmd_CS = (function () {
        function RoomMoneyDataUpdateCmd_CS() {
        }
        RoomMoneyDataUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.RoomMoneyDataUpdateCmd_CS'; };
        return RoomMoneyDataUpdateCmd_CS;
    })();
    Cmd.RoomMoneyDataUpdateCmd_CS = RoomMoneyDataUpdateCmd_CS;
    /**
     *  C-&gt;S 请求是否有新的牌局消息
     *  S-&gt;C 有新的牌局消息通知
     */
    var GameMessageNotifyUpdateCmd_CS = (function () {
        function GameMessageNotifyUpdateCmd_CS() {
        }
        GameMessageNotifyUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.GameMessageNotifyUpdateCmd_CS'; };
        return GameMessageNotifyUpdateCmd_CS;
    })();
    Cmd.GameMessageNotifyUpdateCmd_CS = GameMessageNotifyUpdateCmd_CS;
    /**
     * 牌局消息
     */
    var GameMessage = (function () {
        function GameMessage() {
        }
        GameMessage.prototype.GetType = function () { return 'Cmd.GameMessage'; };
        return GameMessage;
    })();
    Cmd.GameMessage = GameMessage;
    var GameMessage;
    (function (GameMessage) {
        (function (Type) {
            /**
             * 买入
             */
            Type[Type["BuyBring"] = 1000] = "BuyBring";
            /**
             * 报名
             */
            Type[Type["SignUp"] = 1001] = "SignUp";
        })(GameMessage.Type || (GameMessage.Type = {}));
        var Type = GameMessage.Type;
    })(GameMessage = Cmd.GameMessage || (Cmd.GameMessage = {}));
    var GameMessage;
    (function (GameMessage) {
        var Item = (function () {
            function Item() {
            }
            Item.prototype.GetType = function () { return 'Cmd.GameMessage.Item'; };
            return Item;
        })();
        GameMessage.Item = Item;
    })(GameMessage = Cmd.GameMessage || (Cmd.GameMessage = {}));
    /**
     *  C-&gt;S 请求牌局消息
     *  S-&gt;C 新的牌局消息通知
     */
    var GameMessageUpdateCmd_CS = (function () {
        function GameMessageUpdateCmd_CS() {
        }
        GameMessageUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.GameMessageUpdateCmd_CS'; };
        return GameMessageUpdateCmd_CS;
    })();
    Cmd.GameMessageUpdateCmd_CS = GameMessageUpdateCmd_CS;
    /**
     *  C-&gt;S 牌局消息处理请求
     *  S-&gt;C 牌局消息处理通知
     */
    var GameMessageDealCmd_CS = (function () {
        function GameMessageDealCmd_CS() {
        }
        GameMessageDealCmd_CS.prototype.GetType = function () { return 'Cmd.GameMessageDealCmd_CS'; };
        return GameMessageDealCmd_CS;
    })();
    Cmd.GameMessageDealCmd_CS = GameMessageDealCmd_CS;
    /**
     * 我的牌局
     */
    var MyGamesUpdateCmd_CS = (function () {
        function MyGamesUpdateCmd_CS() {
        }
        MyGamesUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.MyGamesUpdateCmd_CS'; };
        return MyGamesUpdateCmd_CS;
    })();
    Cmd.MyGamesUpdateCmd_CS = MyGamesUpdateCmd_CS;
    /**
     * 报名请求
     */
    var SignUpdateCmd_C = (function () {
        function SignUpdateCmd_C() {
        }
        SignUpdateCmd_C.prototype.GetType = function () { return 'Cmd.SignUpdateCmd_C'; };
        return SignUpdateCmd_C;
    })();
    Cmd.SignUpdateCmd_C = SignUpdateCmd_C;
    /**
     *  C-&gt;S 请求报名列表
     *  S-&gt;C 报名列表更新
     */
    var SignListUpdateCmd_CS = (function () {
        function SignListUpdateCmd_CS() {
        }
        SignListUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.SignListUpdateCmd_CS'; };
        return SignListUpdateCmd_CS;
    })();
    Cmd.SignListUpdateCmd_CS = SignListUpdateCmd_CS;
    /**
     * 进入报名界面通知
     */
    var SignEnterCmd_S = (function () {
        function SignEnterCmd_S() {
        }
        SignEnterCmd_S.prototype.GetType = function () { return 'Cmd.SignEnterCmd_S'; };
        return SignEnterCmd_S;
    })();
    Cmd.SignEnterCmd_S = SignEnterCmd_S;
    /**
     *  C-&gt;S 玩法更新请求
     *  S-&gt;C 玩法更新通知
     */
    var PlayingUpdateCmd_CS = (function () {
        function PlayingUpdateCmd_CS() {
        }
        PlayingUpdateCmd_CS.prototype.GetType = function () { return 'Cmd.PlayingUpdateCmd_CS'; };
        return PlayingUpdateCmd_CS;
    })();
    Cmd.PlayingUpdateCmd_CS = PlayingUpdateCmd_CS;
    /**
     * 强制盲位更新
     */
    var StraddleIdUpdateCmd_S = (function () {
        function StraddleIdUpdateCmd_S() {
        }
        StraddleIdUpdateCmd_S.prototype.GetType = function () { return 'Cmd.StraddleIdUpdateCmd_S'; };
        return StraddleIdUpdateCmd_S;
    })();
    Cmd.StraddleIdUpdateCmd_S = StraddleIdUpdateCmd_S;
    /**
     * 玩家简单信息
     */
    var UserBriefInfo = (function () {
        function UserBriefInfo() {
        }
        UserBriefInfo.prototype.GetType = function () { return 'Cmd.UserBriefInfo'; };
        return UserBriefInfo;
    })();
    Cmd.UserBriefInfo = UserBriefInfo;
    /**
     * 同比
     */
    var EachCompareCmd_S = (function () {
        function EachCompareCmd_S() {
        }
        EachCompareCmd_S.prototype.GetType = function () { return 'Cmd.EachCompareCmd_S'; };
        return EachCompareCmd_S;
    })();
    Cmd.EachCompareCmd_S = EachCompareCmd_S;
    /**
     * 排行榜
     */
    var RankingListCmd_CS = (function () {
        function RankingListCmd_CS() {
        }
        RankingListCmd_CS.prototype.GetType = function () { return 'Cmd.RankingListCmd_CS'; };
        return RankingListCmd_CS;
    })();
    Cmd.RankingListCmd_CS = RankingListCmd_CS;
    /**
     * 获取保单到邮箱
     */
    var GetPolicyToMail_C = (function () {
        function GetPolicyToMail_C() {
        }
        GetPolicyToMail_C.prototype.GetType = function () { return 'Cmd.GetPolicyToMail_C'; };
        return GetPolicyToMail_C;
    })();
    Cmd.GetPolicyToMail_C = GetPolicyToMail_C;
    /**
     * 结果统计
     */
    var StatisticsResult_CS = (function () {
        function StatisticsResult_CS() {
        }
        StatisticsResult_CS.prototype.GetType = function () { return 'Cmd.StatisticsResult_CS'; };
        return StatisticsResult_CS;
    })();
    Cmd.StatisticsResult_CS = StatisticsResult_CS;
    var StatisticsResult_CS;
    (function (StatisticsResult_CS) {
        /**
         * 结果统计结构
         */
        var StatisticsResult = (function () {
            function StatisticsResult() {
            }
            StatisticsResult.prototype.GetType = function () { return 'Cmd.StatisticsResult_CS.StatisticsResult'; };
            return StatisticsResult;
        })();
        StatisticsResult_CS.StatisticsResult = StatisticsResult;
    })(StatisticsResult_CS = Cmd.StatisticsResult_CS || (Cmd.StatisticsResult_CS = {}));
    /**
     * 客户端结算完成
     */
    var ClientSettleFinishCmd_C = (function () {
        function ClientSettleFinishCmd_C() {
        }
        ClientSettleFinishCmd_C.prototype.GetType = function () { return 'Cmd.ClientSettleFinishCmd_C'; };
        return ClientSettleFinishCmd_C;
    })();
    Cmd.ClientSettleFinishCmd_C = ClientSettleFinishCmd_C;
    /**
     * /////////////////////////////////////////////////////////////深圳掌娱-百乐坊 Begin/////////////////////////////////////////////
     */
    var ZyBaiLeFangGame_C = (function () {
        function ZyBaiLeFangGame_C() {
        }
        ZyBaiLeFangGame_C.prototype.GetType = function () { return 'Cmd.ZyBaiLeFangGame_C'; };
        return ZyBaiLeFangGame_C;
    })();
    Cmd.ZyBaiLeFangGame_C = ZyBaiLeFangGame_C;
    var ZyBaiLeFangGame_S = (function () {
        function ZyBaiLeFangGame_S() {
        }
        ZyBaiLeFangGame_S.prototype.GetType = function () { return 'Cmd.ZyBaiLeFangGame_S'; };
        return ZyBaiLeFangGame_S;
    })();
    Cmd.ZyBaiLeFangGame_S = ZyBaiLeFangGame_S;
    /**
     * ///////////////////////////牌九流水//////////////////////////////////
     */
    var UserPoint = (function () {
        function UserPoint() {
        }
        UserPoint.prototype.GetType = function () { return 'Cmd.UserPoint'; };
        return UserPoint;
    })();
    Cmd.UserPoint = UserPoint;
    var PotPointSet = (function () {
        function PotPointSet() {
        }
        PotPointSet.prototype.GetType = function () { return 'Cmd.PotPointSet'; };
        return PotPointSet;
    })();
    Cmd.PotPointSet = PotPointSet;
    var PaiGowGameWater_S = (function () {
        function PaiGowGameWater_S() {
        }
        PaiGowGameWater_S.prototype.GetType = function () { return 'Cmd.PaiGowGameWater_S'; };
        return PaiGowGameWater_S;
    })();
    Cmd.PaiGowGameWater_S = PaiGowGameWater_S;
    var UpdatePJPointSeatRoom_S = (function () {
        function UpdatePJPointSeatRoom_S() {
        }
        UpdatePJPointSeatRoom_S.prototype.GetType = function () { return 'Cmd.UpdatePJPointSeatRoom_S'; };
        return UpdatePJPointSeatRoom_S;
    })();
    Cmd.UpdatePJPointSeatRoom_S = UpdatePJPointSeatRoom_S;
    /**
     * 请求提示出牌
     */
    var OperatGameReq_C = (function () {
        function OperatGameReq_C() {
        }
        OperatGameReq_C.prototype.GetType = function () { return 'Cmd.OperatGameReq_C'; };
        return OperatGameReq_C;
    })();
    Cmd.OperatGameReq_C = OperatGameReq_C;
    /**
     * 返回提示出牌列表
     */
    var OperatGameReq_S = (function () {
        function OperatGameReq_S() {
        }
        OperatGameReq_S.prototype.GetType = function () { return 'Cmd.OperatGameReq_S'; };
        return OperatGameReq_S;
    })();
    Cmd.OperatGameReq_S = OperatGameReq_S;
    /**
     * ///////////////////////////捕鱼//////////////////////////////////
     *  子弹信息
     */
    var BulletInfo = (function () {
        function BulletInfo() {
        }
        BulletInfo.prototype.GetType = function () { return 'Cmd.BulletInfo'; };
        return BulletInfo;
    })();
    Cmd.BulletInfo = BulletInfo;
    var Fish = (function () {
        function Fish() {
        }
        Fish.prototype.GetType = function () { return 'Cmd.Fish'; };
        return Fish;
    })();
    Cmd.Fish = Fish;
    /**
     * 单条鱼出鱼信息
     */
    var FishInfo = (function () {
        function FishInfo() {
        }
        FishInfo.prototype.GetType = function () { return 'Cmd.FishInfo'; };
        return FishInfo;
    })();
    Cmd.FishInfo = FishInfo;
    /**
     * 出鱼信息
     */
    var SpawnFishCmd_S = (function () {
        function SpawnFishCmd_S() {
        }
        SpawnFishCmd_S.prototype.GetType = function () { return 'Cmd.SpawnFishCmd_S'; };
        return SpawnFishCmd_S;
    })();
    Cmd.SpawnFishCmd_S = SpawnFishCmd_S;
    /**
     * 打死鱼信息
     */
    var DeadFishInfo = (function () {
        function DeadFishInfo() {
        }
        DeadFishInfo.prototype.GetType = function () { return 'Cmd.DeadFishInfo'; };
        return DeadFishInfo;
    })();
    Cmd.DeadFishInfo = DeadFishInfo;
    /**
     * 打中鱼列表
     */
    var HitFish = (function () {
        function HitFish() {
        }
        HitFish.prototype.GetType = function () { return 'Cmd.HitFish'; };
        return HitFish;
    })();
    Cmd.HitFish = HitFish;
    /**
     * 打中鱼列表
     */
    var HitFishCmd_CS = (function () {
        function HitFishCmd_CS() {
        }
        HitFishCmd_CS.prototype.GetType = function () { return 'Cmd.HitFishCmd_CS'; };
        return HitFishCmd_CS;
    })();
    Cmd.HitFishCmd_CS = HitFishCmd_CS;
    /**
     * 打死列表
     */
    var DeadFish = (function () {
        function DeadFish() {
        }
        DeadFish.prototype.GetType = function () { return 'Cmd.DeadFish'; };
        return DeadFish;
    })();
    Cmd.DeadFish = DeadFish;
    /**
     * 打死列表
     */
    var DeadFishCmd_S = (function () {
        function DeadFishCmd_S() {
        }
        DeadFishCmd_S.prototype.GetType = function () { return 'Cmd.DeadFishCmd_S'; };
        return DeadFishCmd_S;
    })();
    Cmd.DeadFishCmd_S = DeadFishCmd_S;
    /**
     * 改变场景
     */
    var ChangeSceneCmd_S = (function () {
        function ChangeSceneCmd_S() {
        }
        ChangeSceneCmd_S.prototype.GetType = function () { return 'Cmd.ChangeSceneCmd_S'; };
        return ChangeSceneCmd_S;
    })();
    Cmd.ChangeSceneCmd_S = ChangeSceneCmd_S;
    /**
     *  C-&gt;S 操作请求
     *  S-&gt;C 操作通知
     */
    var ActionCmd_CS = (function () {
        function ActionCmd_CS() {
        }
        ActionCmd_CS.prototype.GetType = function () { return 'Cmd.ActionCmd_CS'; };
        return ActionCmd_CS;
    })();
    Cmd.ActionCmd_CS = ActionCmd_CS;
    /**
     * S-&gt;C 操作超时
     */
    var BetTimeoutRoomCmd_S = (function () {
        function BetTimeoutRoomCmd_S() {
        }
        BetTimeoutRoomCmd_S.prototype.GetType = function () { return 'Cmd.BetTimeoutRoomCmd_S'; };
        return BetTimeoutRoomCmd_S;
    })();
    Cmd.BetTimeoutRoomCmd_S = BetTimeoutRoomCmd_S;
})(Cmd || (Cmd = {}));
