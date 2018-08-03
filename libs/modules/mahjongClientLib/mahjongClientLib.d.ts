/*!
 * MahjongClientLib - d.ts for Description
 * @licence MahjongClientLib - v0.0.0 (2018-08-01)
 * qq:93749937 | Licence: helojo
 */
declare module table {
    /**
     * FILE: 麻将表.xlsx SHEET: Sheet1 KEY: thisId
     */
    class TableCard {
        cardId: number;
        thisId: number;
        name: string;
        type: number;
        icon: number;
        point: number;
        nocard: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 表情礼物表.xlsx SHEET: 礼物 KEY: giftId
     */
    class TableGift {
        /**
         * id
         */
        giftId: number;
        /**
         * name
         */
        giftName: string;
        /**
         * chips
         */
        giftCost: number;
        /**
         * charm
         */
        giftCharm: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 梅州麻将麻将番数.xlsx SHEET: config KEY: id*0x10000 + gameId
     */
    class TableMahjongMulti {
        id: number;
        gameId: number;
        multi: number;
        baohu: number;
        cartoon: string;
        name: string;
        type: string;
        disable: number[];
        addormulti: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 玩法配置.xlsx SHEET: 玩法配置 KEY: id
     */
    class TablePlayTypeList {
        id: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 分类
         */
        playType: number;
        /**
         * 玩法类型描述
         */
        playTypedesc: string;
        /**
         * 父类
         */
        parent: number;
        /**
         * 按钮样式
         */
        buttonType: number;
        /**
         * 互斥
         */
        exclude: number[];
        /**
         * 同步
         */
        interact: number[];
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 服务器返回状态码.xlsx SHEET: config
     */
    class TableServerReturnCode {
        id: number;
        desc: string;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 语音表.xlsx SHEET: Sheet1 KEY: text
     */
    class TableVoice {
        cardId: number;
        /**
         * 字符串
         */
        text: string;
        GetType(): string;
    }
}

declare class MJLoadingUI extends egret.Sprite {
    constructor();
    private percentTxt;
    init(): void;
    setProgress(txt: string): void;
}

declare module game {
    class TableCardConfig {
        private static instance;
        constructor();
        static getInstance(): TableCardConfig;
        private loadTable();
        selectByThisId(thisid: number): table.TableCard;
        selectByCardId(cardId: number): table.TableCard;
        thisIdToType(thisid: number): Cmd.MahjongCardType;
        thisIdToIcon(thisid: number): number;
        thisIdToCardId(thisid: number): number;
        resSoundGift(giftId: number): string;
        resSound(thisId: number, female: number): string;
        resNormal(cardId: number): string;
        /**
         * 新版补花
         */
        flowerRes(thisid: number): string;
    }
    class TableMultiConfig {
        private static instance;
        constructor();
        static getInstance(): TableMultiConfig;
        private loadTable();
        selectNameById(num: number): string;
        selectCartoonById(num: number): string;
        selectItemById(num: number): table.TableMahjongMulti;
    }
    class TableGiftConfig {
        private static instance;
        constructor();
        static getInstance(): TableGiftConfig;
        loadTable(): table.TableGift[];
    }
    class TablePlayTypeList {
        private static instance;
        constructor();
        static getInstance(): TablePlayTypeList;
        private loadTable();
        getPlayTypeDes(id: number): string;
    }
}

declare module game {
    class BaseVc extends egret.DisplayObjectContainer {
        constructor();
        initUI(): void;
        destory(): void;
    }
}

declare module game {
    class BasePanel extends BaseVc {
        private _closeBtn;
        private _bg;
        private _title;
        private _initY;
        /**
         * 1为设置面板  2为解散房间面板
        */
        constructor(type: number);
        initBg(type: number): void;
        initPanel(): void;
        hideClose(): void;
        title: string;
        setSize(w: number, h: number): void;
        private closeHandle(evt);
        destory(): void;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class GameButton extends egret.Sprite {
        private lable;
        private srcArr;
        private _icon;
        private _labelTxt;
        private _label;
        private _area;
        private _autoDestory;
        constructor(arr: Array<string>, label?: string, autoDestory?: boolean);
        iconTexture(res: string[]): void;
        private onRemove(evt);
        private initUI();
        private onTouchBegin(evt);
        private onTouchEnd(evt);
        iconWdith: number;
        iconHeight: number;
        addClickArea(num: number): void;
        destory(): void;
    }
}

declare module ui {
    /**
     *
     * @author
     *
     */
    class Image extends egret.Bitmap {
        private _source;
        constructor(source?: string | egret.Texture);
        source: string | egret.Texture;
        /**
         * @private
         * 解析source
         */
        private parseSource();
        /**
        * @private
        * 资源发生改变
        */
        private contentChanged(data, source);
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class MildAlertVC extends egret.Sprite {
        private _bg;
        private _text;
        private _timer;
        constructor();
        private initUI();
        /**
         *
         * @param message
         *
         */
        setText(message: string): void;
        private showDelay();
        destory(): void;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class MsgBox extends egret.Sprite {
        private yesBtn;
        private noBtn;
        private title;
        private info;
        private _backFn;
        private _backObj;
        private _needClose;
        constructor(needClose: boolean);
        private initUI();
        private onClose(evt);
        setData(title: string, msg: string, labelarr?: Array<any>, backFn?: Array<Function>, backObject?: any, countdown?: number): void;
        destory(): void;
    }
}

declare module ui {
    /**
     *
     * @author
     *
     */
    class ResUtil {
        constructor();
        /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
        static getAsset(source: string, compFunc: Function, thisObject: any): void;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class ToggleButton extends egret.Sprite {
        private normalImage;
        private downImage;
        private _text;
        private _label;
        private _textSize;
        private _textColor;
        private _strokeColor;
        private _textSelectColor;
        constructor(normalTexture: string | egret.Texture, downTexture?: string | egret.Texture, text?: string, btnname?: string);
        updateSize(w?: number, h?: number): void;
        scale9Grid: egret.Rectangle;
        select: Boolean;
        setTextColor(textColor: number, selectColor: number, strokeColor: number, size: number): void;
        /**
        * 设置文字颜色、状态
        */
        private setTextStatus(txt, textColor, strokeColor, size);
    }
}

declare module game {
    class MahJongFourFacede extends puremvc.Facade {
        constructor();
        static getInstance(): MahJongFourFacede;
        initializeController(): void;
        /**
         * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
         * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
         * MJGameScene
         */
        startUp(rootView: egret.DisplayObjectContainer): void;
    }
}

declare module game {
    class MahjongFourFacadeConst {
        static STARTUP: string;
        static SEND_DATA: string;
        /**销毁 */
        static DESTORY: string;
        /**结束游戏 */
        static EXIT_GAME: string;
        /**删除gm面板 */
        static GM_DELETE: string;
        /**GM请求牌堆 */
        static GM_HEAP_CARD: string;
        /**GM换牌 */
        static GM_CHANGE_CARD: string;
        /**
         * 进入房间
         */
        static USER_ENTER_ROOM: string;
        /**玩家进入 */
        static PLAYER_ENTER_ROOM: string;
        /**玩家离开 */
        static PLAYER_LEFT: string;
        /**玩家离开派发seatId用 */
        static PLAYER_LEFT_SEAT: string;
        /**玩家重连 */
        static PLAYER_CONNECT: string;
        /**玩家离线 */
        static PLAYER_DISCONNECT: string;
        /**用户信息数据 */
        static USERINFO_DATA: string;
        /**返回ip和gps获取经度纬度 */
        static ReturnIpAndGPS: string;
        /**刷新玩家分数 */
        static UPDATA_USER_POINT: string;
        /**送礼 */
        static UPDATA_USER_DATA: string;
        /**接收到表情 */
        static RECEIVE_FACE: string;
        /**送礼通知 */
        static SEND_GIFTS_NOTICE: string;
        /**
         * 聊天记录
         */
        static NOTIFY_CHAT_RECORD: string;
        static VOICE_NOTICE: string;
        /**
         * 通用聊天ID接收
         */
        static NOTIFY_COMMON_CHAT: string;
        /**
         * ***************************************************游戏逻辑**************************************************************
         */
        /**重连 */
        static RELOGIN: string;
        /**游戏开始 */
        static GAME_START: string;
        /**定庄 */
        static GAME_SET_BANKER: string;
        /**梅州麻将定码 */
        static GAME_START_HORSE: string;
        /**开始发牌 */
        static SEND_CARDS: string;
        /**
         * 自己手牌有变化的时候派发
         * 参数带thisId时不刷新手牌
         */
        static SELF_HANDCARD_CHANGE: string;
        /**
         * 刷新玩家outCard
         */
        static SELF_OUTCARD_REFRESH: string;
        /**
         * 刷新指定玩家的牌
         */
        static REFRESH_USER_CARDS: string;
        /**
         * 摸牌，来了一张牌
         */
        static DRAW: string;
        /**
     * 摸牌，换牌后自己接受的模拟摸牌
     */
        static EXDRAW: string;
        /**
         * 碰牌操作
         */
        static PONG: string;
        /**
 * 换牌后模拟摸牌通知
 */
        static EX_DRAW_NOTICE: string;
        /**
         * 摸牌通知
         */
        static DRAW_NOTICE: string;
        /**
         * 碰牌通知
         */
        static PONG_NOTICE: string;
        /**
         * 吃牌通知
         */
        static CHOW_NOTICE: string;
        /**
         * 打牌通知
         */
        static DISCARD_NOTICE: string;
        /**
         * 杠牌通知
         */
        static KONG_NOTICE: string;
        /**剩余牌数量变化了 */
        static LASTCARD_CHANGE: string;
        /**
         * 新---剩余牌数量变化推送 采用服务器数据
         */
        static CHANGE_REMAINDER_COUNT: string;
        /**显示动作 */
        static SHOW_ACTION: string;
        /**删除动作 */
        static REMOVE_ACTION: string;
        /**通知玩家手牌是否可以操作 */
        static NOTICE_CARD_ENABLE: string;
        /**
         * 补花通知
         */
        static SUPPLY_FLOWER_NOTICE: string;
        /**
         * 翻金通知
         */
        static TURNGOLD_NOTICE: string;
        /**
         * 天胡操作
         */
        static START_WIN_NOTICE: string;
        /**
         * 出牌返回 刷新胡牌数据
         */
        static SELF_DISCARD_NOTICE: string;
        /**
         * 定庄
         */
        static NOTIFY_EAST_LOCATION: string;
        /**
         * 对手ip相同广播
         */
        static NOTIFY_SAME_IP: string;
        /**
         * 游金选牌
         */
        static NOTIFY_SELECT_GOLDOUT: string;
        /**取消游金选牌 */
        static NOTIFY_CANCEL_GOLDOUT: string;
        /**
         * 出牌失败 stepcard处理
         * 出牌成功 刷新手牌
         */
        static OUT_CARD_REFRESH: string;
        /**结算通知 */
        static RESULT_NOTICE: string;
        /**多次胡牌 */
        static WIN_MAHJONG_NOTICE: string;
        /**准备通知 */
        static READY_NOTICE: string;
        /**取消准备通知 */
        static CANCEL_READY_NOTICE: string;
        /**准备显示 */
        static READY_SHOW: string;
        /**准备返回，清理桌面 */
        static RESET_TABLE: string;
        /**删除结束面板 */
        static RESET_RESULT_PANEL: string;
        /**结束 */
        static TOTAL_RECORD_DATA: string;
        /**其他玩家请求解散 */
        static DISS_REQUEST_NOTICE: string;
        /**解散成功 */
        static DISS_RESULT_NOTICE: string;
        /**解散通知 */
        static DISS_NOTICE: string;
        /**玩家在线状态更新 */
        static NOTIFY_ONLINE_STATE: string;
        /**玩家积分通知 */
        static NOTIFY_POINT_CHANGE: string;
        /**停服通知 */
        static STOP_SREVICE_NOTICE: string;
        /**托管通知 */
        static NOTIFY_HOST: string;
        /**请求切换房间人数返回 */
        static CHANGE_USERNUM_BACK: string;
        /**其他玩家请求切换房间 */
        static CHANGE_USERNUM_NOTICE: string;
        /**显示提前开局按钮 */
        static SHOW_CHANGE_BTN: string;
        /**显示开局准备按钮 */
        static SHOW_READY_BTN: string;
        static CASH_CHICKEN: string;
        static CHANGE_CARD_BACK: string;
        /**其他玩家开局换牌 */
        static USER_CHANGE_CARD_BACK: string;
        static CHANGE_HAND_CARD: string;
        static CHONGFENG_NOTICE: string;
        static EAST_CHANGE: string;
        static GAME_DINGQEU: string;
        static GAME_DINGQEU_NOTICE: string;
        static GAME_DINGQEU_RECONNET: string;
        static GAME_PIAO: string;
        static GAME_PIAO_BACK: string;
        static GAME_SHOW_CARD_BACK: string;
        static GAME_YUANQEU: string;
        static GAME_YUANQUE_NOTICE: string;
        static GAME_YUANQUE_STAND: string;
        static GM_CONTROL: string;
        static HU_NOTICE: string;
        static LISTEN_NOTICE: string;
        static NOTICE_SHOW_CARD_BRD: string;
        static SEND_CARDS_OK: string;
        static SHOW_HU_NOTICE: string;
        static BIRD_BRD: string;
        static KONG_DICE: string;
        static KONG_OUT_CARD: string;
        static KONG_SEND_CARD: string;
        static NOTIFY_PING_CHANGE: string;
        static OUT_CARD_FAILED: string;
        static PIAO_NOTICE: string;
        static SEA_ROAM_BRD: string;
        static SEA_ROAM_TURN: string;
        static START_NEW_ROUND: string;
        static START_NEW_ROUND_TIME: string;
        static START_NEW_STAND: string;
        static START_ROUND_NOTICE: string;
        static START_lISTEN_NOTICE: string;
        static WIN_CARD_NOTICE: string;
        /**录像 刷新玩家outCard operateCard */
        static VIDEO_REFRESH_HANDCARD: string;
        /**刷新听牌面板 Cmd.ListenObjMahjongCmd_S */
        static REFRESH_LISTEN_SCENE: string;
        /**超时暂停 */
        static TIMEOUT_WAIT: string;
        /**南京麻将刷新玩家筹码 */
        static UPDATA_USER_CHIP: string;
        /**海南麻将吃三道四道动画 */
        static DZHN_ACTION: string;
        /**宁化麻将出牌后游金通知 */
        static SWIM_GOLD: string;
        /**获取到gps */
        static GET_GPS: string;
        /**宽甸playbutton */
        static PLAY_BUTTON: string;
        /**宽甸playbutton Brd */
        static PLAY_BUTTON_BRD: string;
        /**二人麻将加倍 */
        static TWO_MAHJIONG_BACK: string;
        /**二人麻将加倍 */
        static TWO_MAHJIONG_DOUBLE: string;
        /**金币场 超过上限后提示 */
        static CHECK_CONDITION: string;
        /** 血战血流用。游戏内破产充值 */
        static SICHUAN_BANKRUPTCY: string;
        /** 血战血流用。游戏内破产充值返回 */
        static SICHUAN_BANKRUPTCY_BACK: string;
        /**南昌麻将下精算分广播 */
        static NANCHANG_XIAGOLDCARD_BRD: string;
        /**
         * 语音选择操作
         */
        static VOICE_SELECT_OPERATE: string;
        /**
         * 服务器发来通知
         */
        static SERVER_MESSAGE_NOTICE: string;
        /**万州买牌 */
        static SICHUAN_BUYCARD: string;
        /**开始抓花广播 */
        static START_SELECTCARD: string;
        /**抓花广播 */
        static SELECT_CARD: string;
        /**漳浦起台子广播 */
        static ZHANGPU_QITAIZI: string;
        /**视频请求 */
        static VIDEO_REQUEST: string;
        /**视频结果返回 */
        static VIDEO_RESULT: string;
        /**视频关闭 */
        static VIDEO_CLOST: string;
        /**万州换牌数据 */
        static WANZHOU_CHANGECARD: string;
        /**万州麻将买牌广播 */
        static WANZHOU_BUYCARD: string;
        /**万州麻将已胡玩家广播 */
        static WANZHOU_WINDATA: string;
        /**扣牌通知 */
        static KOU_NOTICE: string;
        /**等待扣列表 */
        static KOU_WAITLIST: string;
        /**扣牌更新 */
        static OTHER_KOU_UPDATE: string;
        /**放风消息*/
        static WIND_CARD_NOTICE: string;
        /**加注通知*/
        static ADD_BASEPOINT_NOTICE: string;
        /**风牌叠加消息*/
        static SUPERPOSITION_CARD_NOTICE: string;
        /**古田翻金方式广播 */
        static SHOW_TURNGOLD_BTN: string;
        /**古田翻金方式广播 */
        static CHOISE_TURNGOLD_NOTICE: string;
        /**过蛋通知 */
        static SHOW_PASSEGG_NOTICE: string;
        /**拉庄通知 */
        static SET_LAZHUANG_NOTICE: string;
        static GAME_LAZHUANG_NOTICE: string;
        /**玩家牌型报警事件 */
        static CARD_TYPE_WARN_NOTICE: string;
        constructor();
    }
}

declare module game {
    class NetConsts {
        static SUCCESS: number;
        static CANCLEOPEARET: number;
        static PRIORITY: number;
        constructor();
    }
}

declare module game {
    class PlatConsts {
        static ZU_JIAN: string;
        static AAA: string;
        constructor();
    }
}

declare module game {
    class SoundConsts {
        static ACTION: string;
        static BG_MUSIC: string;
        static BIRD: string;
        static CLICK: string;
        static COMMON: string;
        static COUNT_FAN: string;
        static DEAL: string;
        static DICE: string;
        static DISCARD: string;
        static DRAW: string;
        static DRAW_MY_TURN: string;
        static DRAW_OTHER_TURN: string;
        static HU_MUSIC: string;
        static JIANPAO: string;
        static LIGHT: string;
        static LIUJU: string;
        static LOSE: string;
        static SEND_CARD: string;
        static START: string;
        static TOUCH_SOUND: string;
        static WIN: string;
        static ZIMO: string;
        constructor();
    }
}

declare module game {
    class UIEventConsts {
        /**退出房间 */
        static EXIT_GAME: string;
        /**显示庄家 */
        static SHOW_BANKER: string;
        /**打牌 */
        static ACTION_DISCARD: string;
        /**取消操作 */
        static ACTION_CANCEL: string;
        /**胡牌 */
        static ACTION_WIN: string;
        /**听牌 */
        static ACTION_READYHAND: string;
        /**吃 */
        static ACTION_CHOW: string;
        /**开始吃牌 */
        static ACTION_BEGIN_CHOW: string;
        /**取消吃牌  取消杠牌通用 */
        static ACTION_STOP_CHOW: string;
        /**取消游金 */
        static ACTION_STOP_GOLD: string;
        /**碰 */
        static ACTION_PONG: string;
        /**杠 */
        static ACTION_KONG: string;
        /**开始杠  暗杠多种情况使用 */
        static ACTION_BEGIN_KONG: string;
        /**托管 */
        static ACTION_TRUSTEESHIP: string;
        /**托管 */
        static ACTION_RECORD: string;
        /**开始听牌-选择听的牌 */
        static START_READYHAND: string;
        /**开始听牌-选择听的牌 */
        static ARROW_READYHAND: string;
        /**取消听牌 */
        static STOP_ARROW_READYHAND: string;
        /**取消听牌 */
        static STOP_READYHAND: string;
        /**准备 */
        static READY: string;
        /**获取积分榜数据 */
        static GET_SCORE_DATA: string;
        static SHOW_USER_INFO: string;
        static GIFT_SEND: string;
        static CLOSE: string;
        static DESTORY: string;
        /**解散详情界面 */
        static SHOW_DISMISS: string;
        /**显示设置 */
        static SHOW_SETTING: string;
        /** 显示游戏秘籍 */
        static SHOW_HELP: string;
        /**显示停服公告 */
        static SHOW_STOP_SERVICE: string;
        /**显示GM */
        static SHOW_GM_Tool: string;
        /** 请求切换房间人数*/
        static REQUEST_CHANGE_USERNUM: string;
        /**同意切换房间人数 */
        static AGREE_CHANGE_USERNUM: string;
        /**显示快捷聊天 表情 */
        static SHOW_SHORT_CHAT: string;
        /**游金操作 */
        static ACTION_OPERATE: string;
        static DISMISS_GAME: string;
        static DISMISS_BACK: string;
        static SHARE_GAME: string;
        static CHANGE_TABLECLOTH: string;
        /**录音时间到 */
        static RECORD_TIME_OUT: string;
        /**录音取消 */
        static RECORD_CANCEL: string;
        /**发送录音 */
        static SEND_RECORD: string;
        /**显示GPS */
        static SHOW_GPS: string;
        /**表情，快捷语音 */
        static SEND_COMMON_CHAT: string;
        /**输入聊天 */
        static SEND_COMMON_TALK: string;
        static SEND_CHAT_RECORD: string;
        /**手牌选中 */
        static GM_SELECT_HANDCARD: string;
        /**牌堆选中 */
        static GM_SELECT_HEAPCARD: string;
        /**批量换牌 */
        static GM_SELECT_CARDS: string;
        /**删除听牌 */
        static REMOVE_READYHAND: string;
        /**托管操作 */
        static ACTION_HOST: string;
        /**模拟出牌成功 */
        static USER_DODISCARD: string;
        /** 模拟出牌失败*/
        static USER_DODISCARD_FAIL: string;
        /**录像后退 */
        static VIDEO_BACK: string;
        /**录像暂停 */
        static VIDEO_STOP: string;
        /**录像前进 */
        static VIDEO_ADVANCE: string;
        /**录像退出 */
        static VIDEO_CLOSE: string;
        /**四川请求换牌 */
        static SICHUAN_CHANGECARD: string;
        /**定缺 */
        static DING_QUE: string;
        /**原缺 */
        static YUAN_QUE: string;
        static ACTION_LIANG: string;
        static ACTION_NOAN_LIANG: string;
        static ACTION_SELECT_AN: string;
        static USER_KNOCK_TURN: string;
        static ACTION_BEGIN_PONG: string;
        static ACTION_BU: string;
        static CARD_ADD_MASK: string;
        static SEND_PIAO_REQUEST: string;
        static START_READY: string;
        static EXCHANGE_DESK: string;
        static SHOW_OUTCARD: string;
        static ACTION_LISTEN: string;
        /**宽甸 */
        static ACTION_BAODIAO: string;
        static ACTION_BAOJIA: string;
        static ACTION_ZHANLIBAODIAO: string;
        static ACTION_ZHANLIBAOJIA: string;
        static ACTION_ZHANLIBAOTING: string;
        /**好彩结算 新分享界面 */
        static SHARE_HAOCAI_MJ: string;
        /**
         * 2d5麻将升起结束
         */
        static D25_MAHJONGUP_END: string;
        /**
         * 癞子动画播放完毕
         */
        static GOLD_EFFECT_END: string;
        /**丹东取消报听 */
        static GD_CANCEL_BAO: string;
        /**万州买牌 */
        static SICHUAN_BUYCARD: string;
        /**
         * 按钮确定宝牌
         */
        static ACTION_YAOBAO: string;
        /**
         * 放风确定事件
         */
        static SET_WINDCARD: string;
        /**
         * 加注操作事件
         */
        static ADD_BASE_POINT: string;
        /**
         * 开局effect结束
         */
        static START_EFFECT_OVER: string;
        constructor();
    }
}

declare module game {
    class DataRequestCommand extends puremvc.SimpleCommand {
        static GAME_DATA: string;
        static CONNECT_GAME_SERVER: string;
        static CLOSE: string;
        constructor();
        execute(notification: puremvc.INotification): void;
    }
}

declare module game {
    class RemoveCommand extends puremvc.MacroCommand {
        constructor();
        execute(notification: puremvc.INotification): void;
        private removeController();
        private removeMediator();
        private removeProxy();
    }
}

declare module Cmd {
    function gameDispatch(cmd: string, obj?: any, type?: string): void;
    function OnClientEchoMahjongCmd_SC(rev: Cmd.ClientEchoMahjongCmd_SC): void;
    function OnMessageBoxLobbyCmd_S(rev: Cmd.MessageBoxLobbyCmd_S): void;
    function OnEnterMahjongCmd_S(recv: Cmd.EnterMahjongCmd_S): void;
    function OnListenObjMahjongCmd_S(rev: Cmd.ListenObjMahjongCmd_S): void;
    function OnJsonCompressNullUserPmd_CS(rev: Cmd.JsonCompressNullUserPmd_CS): void;
    function OnEnterMahjongCmd_Brd(rev: Cmd.EnterMahjongCmd_Brd): void;
    function OnLeaveMahjongCmd_Brd(rev: Cmd.LeaveMahjongCmd_Brd): void;
    function OnStartMahjongCmd_Brd(rev: Cmd.StartMahjongCmd_Brd): void;
    /**
     * 漂分开始
     */
    function OnStartPiaoMahjongCmd_Brd(rev: Cmd.StartPiaoMahjongCmd_Brd): void;
    function OnReqPiaoMahjongCmd_S(rev: Cmd.ReqPiaoMahjongCmd_S): void;
    /**
     * 有人漂分广播
     */
    function OnReqPiaoMahjongCmd_Brd(rev: Cmd.ReqPiaoMahjongCmd_Brd): void;
    /**
     * 定庄、打骰子
     */
    function OnSetBankerMahjongCmd_Brd(rev: Cmd.SetBankerMahjongCmd_Brd): void;
    /**
     * 开局发牌
     */
    function OnSelfCardMahjongCmd_S(rev: SelfCardMahjongCmd_S): void;
    /**
     * 开局可操作通知
     */
    function OnStartNewRoundOpCmd_S(rev: Cmd.StartNewRoundOpCmd_S): void;
    /**
     * 开局操作广播《起手小胡》  不操作数据
     */
    function OnStartNewRoundOpCmd_Brd(rev: Cmd.StartNewRoundOpCmd_Brd): void;
    /**开局换牌 */
    function OnexChangeCardMahjongCmd_S(rev: Cmd.exChangeCardMahjongCmd_S): void;
    /**开局换牌 */
    function OnexChangeCardMahjongCmd_Brd(rev: Cmd.exChangeCardMahjongCmd_Brd): void;
    /**原缺-原缺时间通知-原缺成功广播-定缺-定缺成功通知 */
    /**
   * 如果有原缺
   */
    function OnOriginalLackOpCmd_S(rev: Cmd.OriginalLackOpCmd_S): void;
    /**
     * 起手原缺通知,近做通知时间
     */
    function OnOriginalLackOpTimeCmd_Brd(rev: Cmd.OriginalLackOpTimeCmd_Brd): void;
    /**
    * 原缺成功通知
    */
    function OnOriginalLackOpCmd_Brd(rev: Cmd.OriginalLackOpCmd_Brd): void;
    /**
    * 选择定缺
    */
    function OnEnsureLackOpCmd_S(rev: Cmd.EnsureLackOpCmd_S): void;
    /**
      * 定缺成功广播，
      */
    function OnEnsureLackOpCmd_Brd(rev: Cmd.EnsureLackOpCmd_Brd): void;
    /**翻金 */
    function OnTurnGoldMahjongCmd_Brd(rev: Cmd.TurnGoldMahjongCmd_Brd): void;
    /**补花 */
    function OnFlowerMahjongCmd_Brd(rev: Cmd.FlowerMahjongCmd_Brd): void;
    function OnSendCardMahjongCmd_S(rev: Cmd.SendCardMahjongCmd_S): void;
    function OnSendCardMahjongCmd_Brd(rev: Cmd.SendCardMahjongCmd_Brd): void;
    /**
     * 用户出牌返回
     */
    function OnOutCardMahjongCmd_S(rev: Cmd.OutCardMahjongCmd_S): void;
    function OnOutCardMahjongCmd_Brd(rev: Cmd.OutCardMahjongCmd_Brd): void;
    /**
     * 取消操作
     */
    function OnCancelOpMahjongCmd_S(rev: Cmd.CancelOpMahjongCmd_S): void;
    function OnBarCardMahjongCmd_Brd(rev: Cmd.BarCardMahjongCmd_Brd): void;
    function OnBarCardMahjongCmd_S(rev: Cmd.BarCardMahjongCmd_S): void;
    /**
     * 开杠打骰子
     */
    function OnBarDiceMahjongCmd_Brd(rev: Cmd.BarDiceMahjongCmd_Brd): void;
    /**开杠发牌广播 */
    function OnBarDealCardMahjongCmd_Brd(rev: Cmd.BarDealCardMahjongCmd_Brd): void;
    /**开杠发牌 */
    function OnBarDealCardMahjongCmd_S(rev: Cmd.BarDealCardMahjongCmd_S): void;
    /**开杠打牌广播 */
    function OnBarOutCardMahjongCmd_Brd(rev: Cmd.BarOutCardMahjongCmd_Brd): void;
    /**补张回复 */
    function OnSupplyCardMahjongCmd_S(rev: Cmd.SupplyCardMahjongCmd_S): void;
    /**补张广播 */
    function OnSupplyCardMahjongCmd_Brd(rev: Cmd.SupplyCardMahjongCmd_Brd): void;
    function OnTouchCardMahjongCmd_Brd(rev: Cmd.TouchCardMahjongCmd_Brd): void;
    function OnTouchCardMahjongCmd_S(rev: Cmd.TouchCardMahjongCmd_S): void;
    /**
     * 吃牌通知
     */
    function OnEatCardMahjongCmd_Brd(rev: Cmd.EatCardMahjongCmd_Brd): void;
    /**
     * 吃牌返回
     */
    function OnEatCardMahjongCmd_S(rev: Cmd.EatCardMahjongCmd_S): void;
    /**
     * 胡牌回复
     */
    function OnWinMahjongCmd_S(rev: Cmd.WinMahjongCmd_S): void;
    /**
    * 可以天听
    */
    function OnSkyListenCmd_S(rev: Cmd.SkyListenCmd_S): void;
    /**
   * 天听成功
   */
    function OnListenCardMahjongCmd_Brd(rev: Cmd.ListenCardMahjongCmd_Brd): void;
    /**胡牌翻牌 */
    function OnWinCardMahjongCmd_Brd(rev: Cmd.WinCardMahjongCmd_Brd): void;
    /**扎鸟广播 */
    function OnBirdMahjongCmd_Brd(rev: Cmd.BirdMahjongCmd_Brd): void;
    function OnWinMahjongCmd_Brd(rev: Cmd.WinMahjongCmd_Brd): void;
    /**
     * 广播胡牌结果
     */
    function OnWinRetMahjongCmd_Brd(rev: Cmd.WinRetMahjongCmd_Brd): void;
    /**
    * 捉鸡通知
    */
    function OnCashChickenCmd_Brd(rev: Cmd.CashChickenCmd_Brd): void;
    /**
     * 海底漫游 轮转
     */
    function OnSeaRoamTurnMahjongCmd_Brd(rev: Cmd.SeaRoamTurnMahjongCmd_Brd): void;
    /**
     * 海底漫游广播---打一张牌出去
     */
    function OnSeaFloorCardMahjongCmd_Brd(rev: Cmd.SeaFloorCardMahjongCmd_Brd): void;
    /**断线重连 */
    function OnReConnectMahjongCmd_S(rev: Cmd.ReConnectMahjongCmd_S): void;
    /**
     * 每局中间 点击开始
     */
    function OnReadyStartMahjongCmd_S(rev: Cmd.ReadyStartMahjongCmd_S): void;
    function OnReadyStartMahjongCmd_Brd(rev: Cmd.ReadyStartMahjongCmd_Brd): void;
    function OnCancelReadyMahjongCmd_Brd(rev: Cmd.CancelReadyMahjongCmd_Brd): void;
    /**
     * 在线状态
     */
    function OnOnlineStateMahjongCmd_Brd(rev: Cmd.OnlineStateMahjongCmd_Brd): void;
    /**
     * GM 请求牌堆
     */
    function OnHeapCardGmMahjongCmd_S(rev: Cmd.HeapCardGmMahjongCmd_S): void;
    /**
     * GM 请求换牌
     */
    function OnChangeCardGmMahjongCmd_S(rev: Cmd.ChangeCardGmMahjongCmd_S): void;
    function OnSendGiftMahjongCmd_Brd(rev: Cmd.SendGiftMahjongCmd_Brd): void;
    function OnSendGiftMahjongCmd_S(rev: Cmd.SendGiftMahjongCmd_S): void;
    function OnRefreshChipsMahjongCmd_Brd(rev: Cmd.RefreshChipsMahjongCmd_Brd): void;
    function OnRefreshPointsMahjongCmd_Brd(rev: Cmd.RefreshPointsMahjongCmd_Brd): void;
    function OnGetPersonalPanel_S(rev: Cmd.GetPersonalPanel_S): void;
    /**返回ip和gps获取经度纬度 */
    function OnReturnIpAndGPSCmd_S(rev: Cmd.ReturnIpAndGPSCmd_S): void;
    function OnStartNewRoundOpTimeCmd_Brd(rev: Cmd.StartNewRoundOpTimeCmd_Brd): void;
    function OnFinalScoreMahjongCmd_Brd(rev: Cmd.FinalScoreMahjongCmd_Brd): void;
    function OnRequestDissolveRoom_S(rev: Cmd.RequestDissolveRoom_S): void;
    function OnRequestDissolveRoom_Brd(rev: Cmd.RequestDissolveRoom_Brd): void;
    function OnSuccessDissolveRoom_Brd(rev: Cmd.SuccessDissolveRoom_Brd): void;
    function OnReplyDissolveRoom_Brd(rev: Cmd.ReplyDissolveRoom_Brd): void;
    function OnVoiceChat_Brd(rev: Cmd.VoiceChat_Brd): void;
    function OnCommonChat_Brd(rev: Cmd.CommonChat_Brd): void;
    function OnVoiceChatRecord_S(rev: Cmd.VoiceChatRecord_S): void;
    function OnSetSameIpWarn_S(rev: Cmd.SetSameIpWarn_S): void;
    /**
     * 服务器返回的消息提示
     */
    function OnSysMessageMahjongCmd_S(rev: Cmd.SysMessageMahjongCmd_S): void;
    /**积分更新 */
    function OnChangePointMahjongCmd_Brd(rev: Cmd.ChangePointMahjongCmd_Brd): void;
    /**请求亮牌返回 */
    function OnShowCardMahjongCmd_S(rev: Cmd.ShowCardMahjongCmd_S): void;
    /**
     * 玩家亮牌广播
     * 2人麻将：只有听牌的人收到 未听牌的人的uid和对应的手牌
     *  */
    function OnShowCardMahjongCmd_Brd(rev: Cmd.ShowCardMahjongCmd_Brd): void;
    /**托管返回 */
    function OnHostMahjongCmd_S(rev: Cmd.HostMahjongCmd_S): void;
    /**托管广播 */
    function OnHostMahjongCmd_Brd(rev: Cmd.HostMahjongCmd_Brd): void;
    /**  Echo应答,服务器探测玩家是否活着 收到直接返回*/
    function OnServerEchoMahjongCmd_SC(rev: Cmd.ServerEchoMahjongCmd_SC): void;
    /** 请求切换房间人数返回*/
    function OnRequestChangeUserNbrRoom_Brd(rev: Cmd.RequestChangeUserNbrRoom_Brd): void;
    /**通知显示提前开局*/
    function OnShowChangeUserNbrRoom_S(rev: Cmd.ShowChangeUserNbrRoom_S): void;
    function OnShowPrepareBtnRoom_S(rev: Cmd.ShowPrepareBtnRoom_S): void;
    /**回退 */
    function OnRecallOneCardMahjongCmd_S(rev: Cmd.RecallOneCardMahjongCmd_S): void;
    /**
     * 超时暂停
     */
    function OnTimeOutWaitMahjongCmd_Brd(rev: Cmd.TimeOutWaitMahjongCmd_Brd): void;
    /**海南麻将吃三道 */
    function OnDZHNShowMsgCartoon_S(rev: Cmd.DZHNShowMsgCartoon_S): void;
    /**gps */
    function OnGetGPSLocationCmd_Brd(rev: Cmd.GetGPSLocationCmd_Brd): void;
    /**
     * 宽甸
     */
    function OnPlayButtonMahjongCmd_S(rev: Cmd.PlayButtonMahjongCmd_S): void;
    /**宽甸报夹 报吊广布 */
    function OnPlayButtonMahjongCmd_Brd(rev: Cmd.PlayButtonMahjongCmd_Brd): void;
    /**
     * 二人麻将 加倍
     */
    function OnDoubleMahjongCmd_S(rev: Cmd.DoubleMahjongCmd_S): void;
    /**
     * 二人麻将 加倍
     */
    function OnDoubleMahjongCmd_Brd(rev: Cmd.DoubleMahjongCmd_Brd): void;
    /**
     * 金币场 超过上限后提示
     * 1:输赢达到上限 2:金币不足
     */
    function OnCheckMoneyMahjongCmd_S(rev: Cmd.CheckMoneyMahjongCmd_S): void;
    /**血战血流用。游戏内破产充值 */
    function OnChargeGoldCoinMahjongCmd_Brd(rev: Cmd.ChargeGoldCoinMahjongCmd_Brd): void;
    function OnGameLoserUidMahjongCmd_Brd(rev: Cmd.GameLoserUidMahjongCmd_Brd): void;
    /**南昌麻将 下精算分广播 */
    function OnXiaGoldCardPointMahjongCmd_Brd(rev: Cmd.XiaGoldCardPointMahjongCmd_Brd): void;
    /**万州麻将买拍广播 */
    function OnBuyCardMahjongCmd_Brd(rev: Cmd.BuyCardMahjongCmd_Brd): void;
    /**开始抓花广播 */
    function OnStartSelectCardMahjong_Brd(rev: Cmd.StartSelectCardMahjong_Brd): void;
    /**抓花广播 */
    function OnSelectCardMahjong_Brd(rev: Cmd.SelectCardMahjong_Brd): void;
    /**漳浦起台子广播 */
    function OnEndPiaoMahjongCmd_Brd(rev: Cmd.EndPiaoMahjongCmd_Brd): void;
    /**视频请求 */
    function OnVideoChatRequestCmd_CS(rev: Cmd.VideoChatRequestCmd_CS): void;
    /**视频聊天结果 */
    function OnVideoChatReturnCmd_CS(rev: Cmd.VideoChatReturnCmd_CS): void;
    /**
    *  C-&gt;S 视频聊天关闭请求
    *  S-&gt;C 视频聊天关闭通知
    */
    function OnVideoChatShutdownCmd_CS(rev: Cmd.VideoChatShutdownCmd_CS): void;
    /**万州麻将的换牌数据 */
    function OnChangeCardDataMahjong_S(rev: Cmd.ChangeCardDataMahjong_S): void;
    /**万州麻将买牌广播 */
    function OnBuyCardMahjong_Brd(rev: Cmd.BuyCardMahjong_Brd): void;
    /**万州麻将的已胡玩家数据广播 */
    function OnWinSeatCardDataMahjong_Brd(rev: Cmd.WinSeatCardDataMahjong_Brd): void;
    /**
     * 扣牌通知
     */
    function OnKouCardMahjongCmd_CS(rev: Cmd.KouCardMahjongCmd_CS): void;
    /**
     * 扣牌玩家等待列表
     */
    function OnWaitKouSeatMahjongCmd_S(rev: Cmd.WaitKouSeatMahjongCmd_S): void;
    /**
     * 其他玩家扣牌数量更新
     */
    function OnOtherKouCardMahjongCmd_Brd(rev: Cmd.OtherKouCardMahjongCmd_Brd): void;
    /**刷新特殊玩家手牌（慎重） */
    function OnRefreshUserCards_S(rev: Cmd.RefreshUserCards_S): void;
    /**
     * 玩家风牌叠加消息
     */
    function OnSuperPosition_CS(rev: Cmd.SuperPosition_CS): void;
    /**
     * 玩家放风协议
     */
    function OnSendWindMahjongCmd_CS(rev: Cmd.SendWindMahjongCmd_CS): void;
    /**
     *  玩家下注通知
     */
    function OnAddBasePoint_Brd(rev: Cmd.AddBasePoint_Brd): void;
    /**
     * 古田麻将翻金阶段选择按钮(只发给庄家)
     */
    function OnStartChoiseTurnGoldType_Brd(rev: Cmd.StartChoiseTurnGoldType_Brd): void;
    /**
     * 古田麻将翻金方式
     */
    function OnChoiseTurnGoldType_Brd(rev: Cmd.ChoiseTurnGoldType_Brd): void;
    /**
     * 过蛋操作通知
     */
    function OnShowBarCardPassTheEgg_CS(rev: Cmd.ShowBarCardPassTheEgg_CS): void;
    /**
     * 开局拉庄广播
     */
    function OnSetLaZhuangMahjongCmd_Brd(rev: Cmd.SetLaZhuangMahjongCmd_Brd): void;
    function OnLaZhuangMahjongCmd_Brd(rev: Cmd.LaZhuangMahjongCmd_Brd): void;
    /**重连时 战绩数据 */
    function OnShowRoundScore_S(rev: Cmd.ShowRoundScore_S): void;
    /**玩家牌型报警通知 */
    function OnCardTypeWarnMahjong_Brd(rev: Cmd.CardTypeWarnMahjong_Brd): void;
}
declare module Pmd {
    function OnServerShutDownLoginUserPmd_S(rev: Pmd.ServerShutDownLoginUserPmd_S): void;
}

/**
 *
 * @author
 *
 */
declare module game {
    class StartupMJCommand extends puremvc.MacroCommand {
        constructor();
        execute(notification: puremvc.INotification): void;
        private initController();
        private initMediator();
        private initProxy();
    }
}

declare module game {
    /**
     *
     * 房间主要数据
     *
     */
    class CardInfo {
        private static instance;
        /**
         * 所有玩家手牌，按照seatId 0-3排列
         */
        allHandCardSet: number[][];
        /**
         * 所有玩家操作牌
         */
        allOpCardSet: OperatVo[][];
        /**
         * 所有玩家花牌
         */
        allFlowerCardSet: number[][];
        /**
         * 所有玩家打出去的牌
         */
        allOutCardSet: number[][];
        kouCardInfo: Cmd.KouCardInfo[];
        /**丽水特殊需求 所有打出去的牌 */
        allOutCardGroup: number[];
        /**手牌对象池 */
        MySelfCardPool: any[];
        /**牌堆数据 */
        heapCard: number[];
        /**自己摸牌数据 */
        drawData: Cmd.SendCardMahjongCmd_S;
        /**吃牌信息 */
        eatObj: Cmd.EatCardObj;
        /**杠牌ID */
        kongThisId: number;
        /**可以胡牌数据 */
        winCardSet: Cmd.ListenCardObj[];
        /**是否听牌数据被刷新 */
        freshListenData: boolean;
        /**其他玩家默认手牌13张 */
        userHandCount: number[];
        /**当自己为庄家时 第十四张牌的thisId 临时保存点*/
        /**危牌 */
        dangerSet: number[];
        /**庄家第十四张牌,只有庄加有 */
        bankerThisId: number;
        /**暗下的刻字 baseid */
        triCard: number[];
        /**
         * 屏南
         * 玩家亮的牌 数组
         */
        triCardSet: number[][];
        /**杠后打牌数据 */
        barOutCardData: Cmd.BarOutCardMahjongCmd_Brd;
        /**
         * 所有玩家亮牌标志
         * 0为正常 1为已亮牌
         */
        liangSeat: number[];
        /** 四川麻将自己换牌数据 */
        exCardSet: number[];
        /**是否开局发牌 */
        isStartSend: boolean;
        /**
         * 四川麻将 玩家已经胡过的牌 按座位
         */
        userWinSet: number[][];
        /**叠加牌 */
        superPositionCardId: number;
        /**换混牌*/
        needChangeCardId: number;
        /**玩家放风牌id集合 */
        userWindCardBaseIdMap: any;
        /**保存玩家放喜牌结果 */
        userWindCardMap: any;
        /**亮中发白牌堆 */
        showCardId: number;
        /**放喜推荐的牌 */
        recommendWindList: Cmd.WindCardThree[];
        constructor();
        static getInstance(): CardInfo;
        /**重连设置所有玩家手牌数 */
        reloginUserHandCard(): void;
        /**
         * 初始化手牌信息
         * 进入房间、开始游戏时调用
         */
        initHandCard(): void;
        /**
         * 保存我的手牌、操作牌、打出去的牌和花牌
         * 开始游戏、重连时设置
         */
        myCards: Cmd.UserCardObj;
        /**
         * 设置其他玩家手牌
         */
        setOtherCard(cardList: Cmd.UserCardObj[]): void;
        /**
         * 出牌后 删除玩家手牌
         */
        deleteOtherHand(thisId: number, uid: number): void;
        /**
         * 根据thisId 添加普通手牌
         * 过滤已经有的thisId
         */
        addOtherCard(thisId: number, uid: number): boolean;
        /**
         * 获取对应seatId的手牌信息
         */
        getHandCardBySeat(seat: number): number[];
        /**
         * 更新扣牌信息
         */
        updataKouCardInfo(list: Cmd.KouCardInfo[]): void;
        getKouCardNumBySeatId(id: number): number;
        /**
         * 获取对应seatId操作牌信息
         */
        getOpCardBySeat(seat: number): OperatVo[];
        /**
         *设置风牌叠加或替换(用服务器发来的数据完全覆盖)
         * @param  {number} uid uid
         * @param  {number} cardId 需要操作大牌的ID
         * @param  {Cmd.WindCardObj} updateObj 换牌后的风牌堆
         ** @param  {number} inCardId 需要换人的牌
         */
        setWindOpCardsBySeat(uid: number, cardId: number, updateObj?: Cmd.WindCardObj, inCardId?: number): void;
        /**刷新风牌组数量 并返回服务器发来的当前牌堆去重后的内容*/
        private updataWindCardCount(seat, cardList);
        /**
         * 获取对应seatId已出牌信息
         */
        getOutCardBySeat(seat: number): number[];
        /**
         * 获取对应seatId花牌信息
         */
        getFlowerCardBySeat(seat: number): number[];
        /**保存所有玩家补花数据 ,过滤重复添加*/
        addFlowerCardByUid(thisId: number, uid: number): void;
        /**
         * 添加thisId到指定数组
         * 过滤已经添加的牌，并返回是否有该牌
         */
        addCard(thisId: number, arr: number[]): boolean;
        /**
         * 删除
         */
        removeCard(thisId: number, arr: number[]): boolean;
        /**
         * 根据thisId 添加普通手牌
         * 过滤已经有的thisId
         */
        addMyCard(thisId: number, needFresh?: boolean): boolean;
        /**
         * 根据thisId 删除uid手牌
         */
        removeMyCard(thisId: number): boolean;
        /**
         * 如果有碰牌或者吃牌 删除手牌中的2张牌
         */
        pongCard(rev: OperatVo): void;
        /**
         * 杠牌
         */
        kongCard(rev: OperatVo): void;
        /**
         * 放风牌,保存每张风牌的数量
         *
         */
        WindCard(rev: OperatVo, cardSet: number[]): void;
        /**获取列表中是否有相同的牌*/
        private getSameCard(baseId, cardList);
        /**
         * 设置对应seatid出牌数据
         * 如果是自己 增加outcard \ 删除手牌
         * 如果是其他玩家 增加outcard
         */
        discard(uid: number, thisId: number, needAdd?: boolean): void;
        /**
         * 更新牌堆
         * !!!oldCardId:旧手牌 加入牌堆；newCardId:新手牌 从牌堆中删除
         */
        updateHeapCard(oldCardId: number, newCardId: number): void;
        /**
         * GM 更换手牌
         * !!!oldCardId:旧手牌 从手牌中删除；newCardId:新手牌 添加至新手牌
         */
        changeCard(oldCardId: number, newCardId: number): void;
        /**玩家手牌数量
         *
         * type 0:增加牌
         *      1:减牌
         */
        updateUserHandCount(uid: number, num: number, type: number): void;
        /**
         * 删除手中的花
         */
        removeFlowerCard(): boolean;
        /**数据没有则添加、
         * 已有数据则删除
         * 刻字 */
        addTriCard(data: number): void;
        /**
         * 搜索数组中是否包含花
         */
        searchFlower(value: number[]): boolean;
    }
}

declare module game {
    class CardUtils {
        constructor();
        /**
         * 计算手牌
         */
        static getHandleCards(vo: Cmd.UserCardObj): Array<number>;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class DataCache {
        static language: string;
        static langObj: any;
        static stageHight: number;
        static stageWidth: number;
        static defaultWidth: number;
        static defaultHeight: number;
        static path: string;
        static gameInfo: uniLib.IGameConfig;
        static destroyResOnExit: boolean;
        static plat: string;
        static platParam: any;
        constructor();
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class GameInfo {
        static main: egret.DisplayObjectContainer;
        static stage: egret.Stage;
        static mainUILayer: egret.DisplayObjectContainer;
        static uiLayer: egret.DisplayObjectContainer;
        static topLayer: egret.DisplayObjectContainer;
        static manage: PublicManage;
        constructor();
        destory(): void;
        /**是否全面屏适配 也就是scene不进行缩放 放在舞台中央 只是背景图一再gameScene上一级 显示在最下面 并且对背景图进行剪切 */
        static isAllSceneApa(): boolean;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class MyUserInfo {
        private static instance;
        userId: number;
        gender: string;
        remainder: number;
        nickName: string;
        constructor();
        static getInstance(): MyUserInfo;
        /**
         * OnLogin_S 后刷新个人信息
         */
        setData(data: Cmd.UserBaseInfo): void;
    }
}

declare module game {
    class PositionData {
        static seatPosArr: Array<egret.Point>;
        static wallCardPosArr: Array<egret.Point>;
        static listenPosArr: egret.Point[];
        static cardSpaceXArr: Array<number>;
        static cardSpaceYArr: Array<number>;
        static cardsRowNum: number;
        static cardsTotalNum: number;
        constructor();
    }
}

declare module game {
    /**
     *
     * 房间主要数据
     *
     */
    class RoomInfo {
        private static instance;
        /**是否录像 1:录像 */
        video: number;
        /**录像uid */
        videoUid: number;
        /**游戏Id */
        gameId: number;
        /**房主uid */
        houseOwnerUID: number;
        /** 房间类型 0：分数，1：金币，2：钻石*/
        RoomSocreType: number;
        /** 金币场的底分*/
        baseSore: number;
        /**房间ID  */
        roomId: number;
        /**匹配号Id */
        matchId: number;
        /** 当前出牌ID*/
        outerId: number;
        /**操作牌倒计时 */
        opCount: number;
        /**出牌倒计时 */
        outCount: number;
        /**操作牌倒计时 */
        defaultOpCount: number;
        /**出牌倒计时 */
        defaultOutCount: number;
        /**游金倍数 */
        goldMulti: number;
        /**支付模式 0,房主支付  1，均摊支付 */
        payMode: number;
        /**玩法 12 全自摸 11半自摸*/
        playType: number;
        /**当前的局数 */
        curNumber: number;
        /**总共的局数 */
        totalNumber: number;
        /**房间描述 */
        roomDesc: string;
        /**
         * 牌堆剩余牌数
         */
        private heapCardNum;
        /**
         * 新*牌堆剩余牌数
         * 采用服务器直接发送的数据
         */
        private remainderCardCount;
        /**
         * 游戏状态，是否开始游戏
         */
        isStart: boolean;
        /**
         * 是否显示GM
         */
        isShowGMTool: boolean;
        /**GM 模式 */
        GM_Mode: boolean;
        /**托管 */
        host_mode: number;
        /**麻将人数 2或4 */
        playerNumber: number;
        /**音效音乐等设置信息 */
        musicSetInfo: Cmd.SetInfo;
        /**房间属性 */
        props: Cmd.roomPropObj[];
        /** 金牌ID组*/
        goldenCard: number[];
        /**房间内所有玩家基础信息，包括自己 */
        userList: game.UserVo[];
        /**广播出牌内容 */
        OutCard: Cmd.OutCardMahjongCmd_Brd;
        last_SendCardMahjong: any;
        last_OutCardMahjong: any;
        showCardThisIdMap: any;
        showCardBaseIdMap: any;
        /**
         * 语音语言：pu普通话，lo龙岩话
         */
        languageMode: string;
        /**
         * 换桌布
         */
        tableclothMode: string;
        /**
         * 是否开启换桌面模式
         */
        tableMode: number;
        /**
         * 庄家ID
         */
        bankerId: number;
        /**
         * 东对应的玩家uid
         */
        eastUid: number;
        /**
         * 当前此操作剩余时间
         */
        remainderTime: number;
        /**
         * 庄家座位ID
         */
        bankerSeatId: number;
        /**当前已经准备玩家 */
        readyUsers: number[];
        /**停服公告倒计时 */
        leftTime: number;
        /**停服公告描述*/
        notice: string;
        /**玩家筹码 */
        chipsSets: Cmd.RewardObj[];
        /**胡牌ID */
        huID: number;
        /**房间类型RoomType ,因为有冲突,不得不换名,郁闷
         *
         * 好彩真人 二人麻将 借用此字段：1为匹配模式 0为开房模式
        */
        roomIdType: number;
        /**冲锋鸡玩家 */
        chongfengUID: number;
        /**是否支持托管 0为不支持 1为支持*/
        canHostMode: number;
        /**
         * 是否为新手
         */
        isNewIn: boolean;
        /**是否为托管模式 0为正常 1为托管*/
        isHostMode: number;
        /**房间玩法属性ID 具体值读表(TablePlayTypeList) */
        playTypeList: number[];
        /**是否启用新的结算面板 */
        isNewResult: boolean;
        /**是否启用GPS */
        isGPS: boolean;
        /**
         * 为了过滤多种出牌失败返回情况
         * 保存所有自己打出去的牌
         * */
        outCardSuccArr: number[];
        /**门风圈风 */
        circle: number;
        /**门风圈风 */
        gate: number;
        /**游戏名 */
        private _gameName;
        /**胡牌数据 */
        winRes: Cmd.WinRetMahjongCmd_Brd;
        /**玩家分数 */
        pointSet: Cmd.PointsObj[];
        /**连庄 */
        bankerNum: number;
        /**低分 */
        betPoint: number;
        /**翻金 */
        displayCard: number[];
        /**古田 */
        flcard: number[];
        /**敲响 */
        isKnock: boolean;
        /**买马 */
        buyHorse: boolean;
        /** 金华特殊处理房间类型 2为局数模式 1 为打捆积分模式*/
        roomType: number;
        /**房间所有人缺牌信息 */
        lackInfos: Cmd.LackInfo[];
        /**是否有原缺，控制原缺后定缺选择不会与原缺动画重叠*/
        isYuanQue: boolean;
        /**
         * 定缺牌型
         */
        dqCardType: number;
        /**是否有特殊牌型 如冲锋鸡 1:冲锋鸡 2：责任鸡*/
        isSpecialCard: number;
        /**是否有特殊状态，如天听以及四川血流连续胡牌*/
        isListen: boolean;
        /**可以天听时是否点击听按钮*/
        clickListen: boolean;
        /**
         *是否显示遮罩,控制在开局发牌未选择定缺时候不显示遮罩
         */
        isMask: boolean;
        /**是否开局换牌 */
        changeHandCard: boolean;
        /**是否放风放喜阶段 */
        isSettingWindCard: boolean;
        /**南京麻将是否翻倍 */
        isdouble: number;
        /**
         * 控制开局换牌时候哪些牌不能更换
         */
        changeType: number[];
        /**保存系统自动换牌的牌 */
        exCardSuccArr: number[];
        /**
         * 捉鸡鸡牌ID
         */
        zhuojiID: number;
        /**
         * 上鸡牌ID
         */
        upChicnkenID: number;
        /**玩家手牌 */
        userHandCard: Cmd.UserCardObj[];
        /**是否有房主小费 */
        isTip: boolean;
        /**捉鸡相关分数 */
        cashChicken: Cmd.ChickenStruct[];
        /**
         * 上下鸡单个鸡分
         */
        singleChicnken: number;
        /**
         * 捉鸡鸡牌信息
         */
        chicnkenSet: Cmd.ChickenStruct[];
        /**
         * 下鸡牌ID
         */
        downChicnkenID: number;
        /**
         * 色子播放时间
         */
        diceTime: number;
        gameID: number;
        /**四川麻将判断自己已经赢了 */
        selfWin: boolean;
        /**第一次准备 */
        firstReady: boolean;
        /**海南麻将 */
        lastShangGa: number;
        /**惠州麻将花牌做鬼时候 鬼牌数量 */
        private _HuiZhouFlowerNum;
        /**南京麻将 */
        _flbarUser: number[];
        /**是否是暗杠，目前只涉及到听牌的数量，暗杠是否显示牌背是游戏里面单独处理  1非暗杠 2暗杠*/
        idDarkBar: number;
        /**
        * 倍率
        */
        multi: number;
        /**宽甸麻将是否报夹 */
        isBao: boolean;
        /**
         * 好彩2人麻将 听牌后加成倍数
         */
        multiple: number;
        /**
         * 发牌动画是否播完 true 为正在播放；false为已播完
         * 判断是否显示摸的牌
         */
        isTween: boolean;
        /**
         *中心五 当前第几角
         */
        curJiao: number;
        /**
         *中心五 本角第几局
         */
        curRound: number;
        /**是否角分场 */
        isJiaoFen: boolean;
        /** 开始起牌的张数*/
        startLuo: number;
        /**
         * 开始抓拍的风位 1234东南西北
         * */
        getCardDirection: number;
        /**
         *  2.5D 麻将
         *  牌墙
         */
        greatWall: Cmd.GreatWall[];
        /**重连 正向已抓的数据 */
        bGetNum: number;
        /**重连 逆向已抓的数据*/
        eGetNum: number;
        /**
         * 2.5D特殊需求
         * 增加金牌数量(用做牌堆)
         * 红中王不用翻金为0 以此类推
         * */
        goldCardNum: number;
        /**
         * 血战血流 胡牌后标志 用于自己出牌声音处理
         */
        isHu: boolean;
        /**手牌有多少张 现在有13张和16张 */
        handCardNum: number;
        /**
         *  (用来计算牌堆)
         *
         * 摸牌类型(2:庄家起手模拟发牌  10:吃碰后模拟发牌  1:杠后摸牌 0为正常发牌)
         */
        drawType: number;
        /**四川开局换牌使用 买牌表示 0:未买牌 1:买牌 */
        sc_bcs: number;
        /**是否可选不同花色 1：可以 0：不可以 */
        sc_isSame: number;
        /**
         * 古田 ：翻金方式
         */
        lieNum: number;
        dirtection: number;
        turnGoldType: number;
        /**
         * 输入音效随机播放数量的值(目前默认是3)
         */
        soundRandomNum: number;
        /**
         * 补花方式 0：打出去牌的最前面(原)、1：单独放置(新)
         */
        flowerType: number;
        /**
         * 底注
         */
        bottomPoint: number;
        /**
         * 入场
         */
        enteringPoint: number;
        /**
         * 离场
         */
        leavingPoint: number;
        /**
         * 最小匹配分
         */
        minMatchPoint: number;
        /**
         * 原版：0
         * 新增：1，摸牌动画+手牌插入动画+其他玩家的手牌跳动提醒
         */
        drawMode: number;
        /**拉庄 */
        laZhuangMes: Cmd.LaZhuangMes[];
        /**
         * 玩家战绩
         */
        roundScore: Cmd.RoundScore[];
        /**
         * 是否显示对局流水
         */
        showRoundScore: boolean;
        constructor();
        static getInstance(): RoomInfo;
        static destory(): void;
        /**
         *进入房间刷新个人信息
         */
        setData(data: Cmd.RoomState): void;
        /**
         * 获取房间类型
         */
        getRoomType(): number;
        /**
         * 进入房间初始化数据
         */
        private initData();
        /**
         * 设置庄家ID和SeatId
         */
        setBankerInfo(bankerId: number): void;
        addShowCardList(list: number[]): boolean;
        addShowCard(thisId: number, heap?: boolean): boolean;
        getShowCardRemainNum(id: number): number;
        subRemainCardNum(): void;
        /**
         * 设置当前剩余牌数
         */
        setRemainCardNum(num: number): void;
        getRemainCardNum(): number;
        /**
         * 新---设置当前剩余牌数 采用服务器数据
         */
        setRemainderCardCount(num: number): void;
        getRemainderCardCount(): number;
        /**
        * 获取房间属性
        */
        private initRoomProps(list);
        /**
         * 玩家列表初始化
         */
        private initUserList(data);
        /**
         * 有新玩家进入
         * 添加或者刷新
         */
        addUser(vo: game.UserVo): void;
        /**
         *查询玩家
         */
        getUserVoByUid(uid: number): UserVo;
        /**
         * 移除玩家
         */
        removeUser(uid: number): void;
        /**
         *获取转换位置后的座位值0-3
         * @param seatId
         * @return
         *
         */
        getSeatNo(seatId: number): number;
        /**
         *获取转换位置后的座位值0-3
         * @param seatId
         * @return
         *
         */
        getSeatNoByUserId(userId: number): number;
        getUserIdBySid(sid: number): number;
        /**
         * 通过转换后座位ID查找对应USERID
         */
        getUserIdBySeatNo(seatId: number): number;
        /**
         * 方向ID根据东家座位 转换为座位号
         * 东南西北=>1234 逆时针旋转、
         */
        dirTransToSeat(dir: number): number;
        /**转换支付中文 */
        getPayMode(): string;
        /**转换中文玩法 */
        getPlayType(): string;
        /**
         * 设置房间类型
         */
        setPlayType(name: string): void;
        /** 设置鬼牌*/
        private setGoldenMj();
        /**
         * 房间内所有玩家UID，不包括自己
         */
        getOtherUid(): number[];
        getAllNames(): string;
        /**
         * 发礼物 不包括fromid
         */
        getUidNotSendID(formid: number): number[];
        /**所有玩法id 转换desc */
        getPlayTypeByList(): string[];
        /**判断是否支持托管 */
        private getHostMode();
        /**添加亮牌玩家 */
        addLiangUser(uid: number): void;
        /**获取离我的下家信息 可能2人3人*/
        myNextUser: UserVo;
        /**添加花牌数据 */
        addFlowerCard(card: number): void;
        /**
         * 改变玩家gps位置
         */
        changeUserGPS(data: Cmd.GetGPSLocationCmd_Brd): void;
        /**获取版本引擎 2D5需要用到5.0以上引擎龙骨 */
        getEnguneVersion(): number;
        /**设置捉鸡数据 */
        setCashChicken(chicken: any): void;
        liangUser: number[];
        /**房间第一次开局时保存在座玩家数据 */
        initRoundScore(): void;
        /**
         * 检验是否是新版本龙骨系统 true为5.0以上极速模式骨骼
         */
        checkFastDragon(): boolean;
    }
    class PlayStyle {
        /**无鬼 */
        static NoGhost: number;
        /**白板做鬼 */
        static WhiteGhost: number;
        /**翻鬼 */
        static OneGhost: number;
        /**二鬼 */
        static TwoGhost: number;
        /**四鬼 */
        static FourGhosts: number;
        /**2鬼  只有两个鬼牌 不是两种鬼牌*/
        static TwoGhosts: number;
        /**无花 */
        static ZeroFlower: number;
        /**二花 */
        static TwoFlower: number;
        /**四花 */
        static FourFlower: number;
        /**六花 */
        static SixFlower: number;
        /**八花 */
        static EightFlower: number;
    }
}

declare module game {
    class GameData {
        private static instance;
        /**
         * 是否是poker
         */
        static iskPoker: boolean;
        private _isMyTime;
        private _isCanOperate;
        /**游金需要打出的牌*/
        goldOutCardSet: number[];
        _audioPlayMode: boolean;
        /**
         * 待出牌ID 为0时可以出牌 不为零时不可出牌
         */
        waitCard: number;
        lastCard: number;
        /**
         * 四人中间放置坐标
         */
        TempeLocation: number[][];
        ShortTalkArr: string[];
        /**
         * 总牌局记录
         */
        recordInfo: Cmd.UserRecord[];
        /**
         * (旌德)角结算记录
         */
        jiaoRecordInfo: Cmd.UserRecord[];
        /**
         *(阜康)解散原因
         */
        resultReason: string;
        constructor();
        destory(): void;
        static getInstance(): GameData;
        isMyTime: boolean;
        isCanOperate: boolean;
        audioPlayMode: boolean;
        /**
         * 判断是否为金牌
         */
        isGoldenCard(cardId: number): boolean;
        /**
         * 判断是否为危牌
         */
        isDangerCard(cardId: number): boolean;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class ServerMJProxy extends puremvc.Proxy {
        static NAME: string;
        private _location;
        private loopback;
        constructor();
        onRegister(): void;
        private _config;
        initServer(): void;
        private gameId;
        /**
         * http平台登录完成
         */
        private onHttpInitSucc(obj);
        private onHttpInitFail(back?);
        /**
         * socket连接完成
         */
        private onSockInitSucc();
        private onGetLocation(msg);
        private onSockInitFail(back?);
        sendData(obj: any): void;
        /**
         * 私聊
         * @param e
         */
        private onPrivateChat(e);
        /**
         * 公聊
         * @param e
         */
        private onRoomChat(e);
        private onSystemMsg(e);
        onRemove(): void;
        closeSocket(): void;
    }
}

declare module game {
    class CardVo {
        cardId: number;
        isGoldPai: boolean;
        TableInfo: table.TableCard;
        private tableInfo;
        type: Cmd.MahjongCardType;
        constructor(cardId?: number, isGoldPai?: boolean);
    }
}

declare module game {
    class KongVo {
        thisId: number;
        fromId: number;
        uid: number;
        fromSeatId: number;
        seatId: number;
        type: number;
        constructor();
    }
}

declare module game {
    class OperatVo {
        uid: number;
        thisId: number;
        cardSet: number[];
        fromId: number;
        fromSeatId: number;
        seatId: number;
        fake: number;
        type: number;
        index: number;
        constructor();
        /**碰牌数据 */
        setPongData(data: Cmd.TouchCardObj): void;
        /**杠牌数据 */
        setKongData(data: Cmd.BarCardObj): void;
        /**吃牌数据 */
        setEatData(data: Cmd.EatCardObj): void;
        /**风牌数据 */
        setWindData(uid: any, index: number): void;
        setMyOperate(data: Cmd.CardOpObj): void;
    }
}

declare module game {
    class UserVo {
        ip: string;
        vip: number;
        uid: number;
        sid: number;
        seatId: number;
        gender: string;
        points: number;
        diamond: number;
        headUrl: string;
        nickName: string;
        remainder: number;
        /**是否在线 */
        onlineState: number;
        /**金币 */
        chips: number;
        /**是否准备 */
        bReady: number;
        /**当前手牌(便于控制手牌数量) */
        handCardNum: number;
        /**纬度 */
        lat: number;
        /**经度 */
        lng: number;
        /**位置详细 */
        address: string;
        /**南京麻将点数 */
        nju: Cmd.njU;
        /**飘风倍率 */
        multiPiao: number;
        /**(旌德中心五)角分 */
        jiaofen: number;
        /**
         * 正在使用的个人形象 2017.11.15好彩真人需求
         */
        personalImage: Cmd.PersonalImage[];
        constructor(info: Cmd.UserBaseInfo);
        setdata(info: Cmd.UserBaseInfo): void;
        setdiamond(diamond: number): void;
        setchips(chips: number): void;
        getGender(): number;
        setGPS(lnt: number, lat: number, address?: string): void;
    }
}

declare module game {
    class VoiceDataVo {
        url: string;
        nickName: string;
        time: number;
        uid: number;
        status: number;
        text: string;
        constructor();
    }
}

declare module game {
    class GameViewConfig {
        static mainMediatorName: string;
        static mainMediator: any;
        constructor();
    }
}

declare module game {
    class CheckMc extends BaseVc {
        private _check;
        private _checkIcon;
        private bg;
        constructor();
        initUI(): void;
        check: boolean;
        seTTexture(bgSource?: string, iconSource?: string): void;
        destory(): void;
        updateIconPos(x: number, y: number): void;
    }
}

declare module game {
    class DiceMc extends egret.DisplayObjectContainer {
        private _dice;
        private _diceArr;
        private _index;
        private _timerOutId;
        constructor();
        destory(): void;
        showDice(data: Cmd.DiceObj): void;
        private onStartThrow();
        private play();
        private frame_event(evt);
        private animation_event(evt);
    }
}

declare module game {
    class GiftAnItem extends BaseVc {
        private _giftId;
        private _effectMc;
        constructor();
        initUI(): void;
        giftId: number;
        private onAnimationEvent();
        private index;
        play(): void;
        destory(): void;
    }
}

declare module game {
    /**
     * 2.5D麻将使用 因为版本不同 不能支持低版本龙骨
     */
    class GiftAnItem_2d5 extends BaseVc {
        private _giftId;
        private _effectMc;
        constructor();
        initUI(): void;
        giftId: number;
        private onAnimationEvent();
        private index;
        play(): void;
        destory(): void;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class HeadMc extends egret.Sprite {
        private _headUrl;
        private _headMc;
        private _width;
        private _height;
        private _headLoad;
        /**
        * 是否采用圆形遮罩头像 如果采用 设置半径
        */
        constructor(width?: number, height?: number, isCircle?: boolean);
        destory(): void;
        headUrl: string;
        private loaded(data);
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class NumBitmapFormat extends egret.Sprite {
        private _defaultAsstes;
        private _width;
        private _height;
        private _align;
        static LEFT: number;
        static MIDDLE: number;
        static RIGHT: number;
        private _numMc;
        private _value;
        private _hideZero;
        private _spacing;
        constructor(w: number, h: number, align?: number, asstes?: string, hideZero?: boolean);
        private init();
        spacing: number;
        value: number;
        private clear();
        private getNumblerF(char);
        destory(): void;
    }
}

declare module game {
    class StartEffectMc extends BaseVc {
        private _bg;
        private _armature;
        constructor();
        destory(): void;
        initUI(): void;
        play(): void;
        private onEffectOver();
        private hide();
    }
}

declare module game {
    class StopServicePanel extends BasePanel {
        constructor();
        private content;
        private noticeTxt;
        initPanel(): void;
    }
}

declare module game {
    class BlurBackCard extends BaseVc {
        private _card;
        private _color;
        constructor(color?: string);
        setType(type: number): void;
        destory(): void;
    }
}

declare module game {
    class CardStack extends BaseVc {
        private _card;
        private _color;
        constructor(color?: string);
        setType(type: number): void;
        destory(): void;
    }
}

declare module game {
    class RecordItem extends BaseVc {
        private _curIndex;
        private _voiceBtn;
        private _inputBg;
        private _voiceMc;
        private _tempTip;
        private _itemGroup;
        private _scrollView;
        private _curVoice;
        constructor();
        initUI(): void;
        initData(arr: Array<Cmd.VoiceObj>): void;
        showOneVoice(data: Cmd.VoiceObj): void;
        private onPlayEnd(evt);
        private onPlayVoice(evt);
        private onClick(evt);
        private resetBtn();
        destory(): void;
    }
    class RecordVoiceItem extends BaseVc {
        static PLAY_END: string;
        private _nameTxt;
        private _voiceIcon;
        private _timeTxt;
        private _voiceLenTxt;
        private _data;
        private _timer_200;
        private _soundIcon;
        private _second;
        private _totalWidth;
        private _content;
        constructor();
        initUI(): void;
        private stopTimer();
        private onTimer(evt);
        startPlay(): void;
        stopPlay(): void;
        private playEndBack(obj);
        data: Cmd.VoiceObj;
        setData(data: Cmd.VoiceObj): void;
        destory(): void;
    }
}

declare module game {
    class VoiceChatMediator extends puremvc.Mediator {
        static NAME: string;
        private _voiceVc;
        constructor(viewComponent: any);
        private uiEventHandle(evt);
        listNotificationInterests(): Array<any>;
        handleNotification(notification: puremvc.INotification): void;
        onRemove(): void;
    }
}

declare module game {
    class VoiceChat extends BaseVc {
        private _startBtn;
        private _recording;
        private _voiceArr;
        private _curPosY;
        private _soundValue;
        private btnRes;
        private lobbyFrom;
        /**
         * 标记播放语音前的声音设置
         */
        static soundOpen: boolean;
        /**
         记录玩家是否正在播放语音
         */
        static VoicePlaying: {
            [uid: number]: boolean;
        };
        static StartVoicePlaying(uid: number): void;
        static StopVoicePlaying(uid: number): void;
        constructor(lobbyFrom?: string);
        initUI(): void;
        private updateUI();
        voiceButtonX: number;
        voiceButtonY: number;
        voiceButtonWidth: number;
        voiceButtonHeight: number;
        updateBtnRes(btnRes: string[]): void;
        setVoiceVisible(isShow: boolean): void;
        showVoice(vo: Cmd.VoiceChat_Brd): void;
        /**
         * 获取座位对应的语音表现
         */
        getVoiceItem(seatId: number): VoiceMc;
        private recordEvent(evt);
        private startRecord(evt);
        private _isCancel;
        private checkCancel(evt);
        private stopRecord(evt?);
        private onRecordBack(obj);
        destory(): void;
    }
    class VoiceMc extends BaseVc {
        private _soundIcon;
        private _bg;
        private _timer;
        private _soundTime;
        private _startTime;
        private _timeTxt;
        private _ifFlip;
        private uid;
        constructor();
        initUI(): void;
        private onTimer(evt);
        private stopTimer();
        flip(): void;
        setData(vo: VoiceDataVo): void;
        private playEndBack(obj);
        destory(): void;
    }
    class RecordingMc extends BaseVc {
        private _moving;
        private _time;
        private _startTimer;
        private _startTime;
        private _maxTime;
        private _msTime;
        constructor();
        initUI(): void;
        startTimer(): void;
        stopTimer(): number;
        private onTimer(evt);
        dispose(): void;
    }
}

declare module game {
    class HeadLoader {
        private _imageLoader;
        private _headUrl;
        private _completeFun;
        private _errorFun;
        private _callObj;
        constructor();
        load(url: string, completeFun?: Function, ioErrFun?: Function, obj?: any): void;
        private loadCompleteHandler(event);
        private onIOError(event);
        destroy(): void;
        getHeadCache(headUrl: string): any;
        saveHeadCache(url: string, data: any): void;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class SoundLoader extends egret.EventDispatcher {
        private _soundType;
        static LOADED: string;
        constructor(url: string);
        private load();
        private onLoadComplete(event);
    }
}

declare module ui {
    /**
     *
     * @author
     *
     */
    class AlignBitmapText extends egret.Sprite {
        private tf;
        private _hAlign;
        constructor();
        hAlign: string;
        font: egret.BitmapFont;
        letterSpacing: number;
        lineSpacing: number;
        text: string;
        private updatePos();
    }
}

declare class ArrayUtil {
    /**
     *  合并数组 并返回新数组 [ arrA[0], arrB[0] ];
     * @param arrA
     * @param arrB
     * @return
     *
     */
    static mergeArray(arrA: Array<any>, arrB: Array<any>): Array<any>;
    /**
     删除某数据
     arr 指定数组（可以是Array,也可以是Vector）
     value
    */
    static removeByValue(arr: any, value: any): any;
    /**
     * 倒序删除
     */
    static removeValue(arr: any, value: any): any;
    /**
     元素是否在数组中
    */
    static isInArray(element: any, arr: Array<any>): boolean;
    /***
     * 根据数据中的其中一个属性 删除该数据
     */
    static deleteValue(element: number, arr: game.OperatVo[]): game.OperatVo[];
    static numberResolveToArray(value: number, arr: Array<number>): Array<number>;
    /**深度复制数组*/
    static deepcopy(obj: any[]): any[];
    /**翻转一个数组，但不影响原数组*/
    static reverse(source: any[]): any[];
}

declare class AutoPlayMgr {
    private _soundRes;
    private static _instance;
    static START_RECORD: string;
    static STOP_RECORD: string;
    private _soundValue;
    private _musicValue;
    private voiceStrArr;
    private voiceCard;
    constructor();
    init(appId: string): void;
    private onXFinited(obj);
    static instance: AutoPlayMgr;
    /**
     * 自动打牌
     */
    private onGetResult(obj);
    private onGetEnd(obj);
    stopAutoRecord(): void;
    startAutoRecord(): void;
}

/**
 * 计算类
 */
declare class MathUtil {
    static pow(n?: number): number;
    static vectorRotation(p: egret.Point, n: number): egret.Point;
    static disTest(p1: egret.Point, n1: number, p2: egret.Point, n2?: number): boolean;
    /**
     * 两个整数间随机随机数
     * @min: 最小数
     * @max: 最大数
     */
    static random(min: number, max: number): number;
    /**
         * 两个整数间随机随机数,包含min和max
         * @min: 最小数
         * @max: 最大数
         */
    static RandomNumBoth(Min: any, Max: any): any;
    /**
     * 检测一个点是否在圆内
     * centerX centerY radius 圆心以及半径
     * x y需要判断的x y 坐标
     */
    static pointIsInRound(centerX: number, centerY: number, radius: number, x: number, y: number): boolean;
    /**
     * 二分法从数组中找数据 indexOf
     */
    static binary(find: number, arr: Array<number>, low: number, high: number): number;
    /**
         * 获取字符串实际长度
         */
    static getStrRealLength(str: string): number;
}

declare module game {
    class PopupManager {
        private static _popUpMask;
        constructor();
        /**
         * 显示弹出框
         * @param	target:显示对象
         * @param	modal:是否添加遮罩
         * @param	center:是否居中显示
         * @param	useEffect:是否缓动
         * @param	isTop:是否在最上层
         */
        static addPopUp(target: egret.DisplayObjectContainer, modal?: Boolean, center?: Boolean, useEffect?: Boolean, w?: number, h?: number, isTop?: Boolean): void;
        /**
         * 移除弹出框
         * @param	target:显示对象
         * @param	useEffect:是否缓动
         */
        static removePopUp(target: egret.DisplayObjectContainer, useEffect?: Boolean): void;
        private static removeTarget(target);
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class PublicManage {
        private static instance;
        private maskMc;
        private showList;
        constructor();
        static getInstance(): PublicManage;
        /**
         * 轻提示
         */
        showMildWarnShow(msg: string): void;
        private getContainer();
        private removeStage(evt);
        showConfirmPanel(msg: string, btnlables: Array<string>, backFn: Array<Function>, title: string, backObj: any, countdown?: number, needClose?: boolean): void;
        showMask(): void;
        hideMask(): void;
        showMarket(): void;
        backHall(): void;
        /**
        *录像面板专用
         */
        showVideoCommonPanel(msg: string, btnlables: Array<string>, backFn: Array<Function>, title: string, backObj: any, countdown?: number, needClose?: boolean): void;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class ResUtil {
        private static initParams;
        constructor();
        /**
         * 获取url参数
         */
        static getURLData(): any;
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        static createBitmapByName(name: string, x?: number, y?: number, scale?: number): egret.Bitmap;
        static createTexture(name: string): egret.Texture;
        static trace(...str: any[]): void;
        static randRange(min: number, max: number): number;
        /**
         * 格式化货币
         * @param currency 货币
         * @param num
         * @return String
         **/
        static currencyFormat(num: number, len?: number): string;
        static backToNumber(numStr: String): number;
        static getCharLength(txt: string): number;
        /**
          通过json png
          创建MovieClip
        */
        static createMovieClip(name: any, jsons: any, png: any): egret.MovieClip;
        static createTextFeild(color: number, align: string, text: string, size: number, x?: number, y?: number, width?: number, isBold?: boolean, space?: number): egret.TextField;
        static createFontText(text: string, x?: number, y?: number, width?: number, font?: egret.BitmapFont): egret.BitmapText;
        static createScroll(content: egret.DisplayObject, w: number, h: number, x?: number, y?: number): egret.ScrollView;
        /**
    * 从父级中移除显示对象（如显示对象为影片剪辑则停止）
    * @param dis
    *
    */
        static removeFromParent(dis: egret.DisplayObject): void;
        /**
        * 移除显示容器中的所有子集但不包括自己
        * @paramisContainer
        */
        static removeAllChildren(disContainer: egret.DisplayObjectContainer): void;
        static getTimeStr2(): String;
        static numFormat(num: number, decimal?: number): string;
        private static setDot(num, decimal?);
        /**
         * 改变Y轴变换之前是640
         */
        static changeYAxis(num: number): number;
    }
}

declare module game {
    /**
     *
     * @author
     *
     */
    class SoundManager {
        private _soundRes;
        private _curSounds;
        private static _instance;
        constructor();
        static instance: SoundManager;
        playSound(soundType: string): void;
        stopSound(): void;
        private play(sound);
        private startPlay(evt);
        private onSoundComplete(evt);
        private onSoundLoaded(evt);
    }
}

/**
 * 表格加载后立刻从引擎资源缓存中删除，避免占内存
 */
declare function loadTable(key: string): any;
declare module table {
    module TableCard {
        var $instance: table.TableCard[];
        function instance(): table.TableCard[];
        /**
         * 得到cardId符合的第一张牌
         */
        function selectByCardId(cardId: number): table.TableCard;
        /**
         * 得到thisid符合的牌
         */
        function selectByThisId(thisid: number): table.TableCard;
        /**
         * 从thisid得到对应的cardId
         */
        function thisIdToCardId(thisid: number): number;
        /**
         * 从cardId得到type类型
         */
        function cardIdToType(cardId: number): Cmd.MahjongCardType;
        /**
         * 从thisid得到type类型
         */
        function thisIdToType(thisid: number): Cmd.MahjongCardType;
        /**从thisId得到icon */
        function thisIdToIcon(thisid: number): number;
        function resOpen(cardId: number): string;
        function resNormal(cardId: number): string;
        function resPutOut(cardId: number, seatId: number): string;
        function resWin(cardId: number): string;
        function resSound(cardId: number, female: number): string;
        function resSoundAction(type: Cmd.MahjongOpCardType, female: number): string;
        function resSoundGift(giftId: number): string;
        function res2D5CardName(cardId: number): string;
    }
}
declare module table {
    module TableGift {
        var $instance: table.TableGift[];
        function instance(): table.TableGift[];
    }
}
declare module table {
    module TableServerReturnCode {
        var $instance: table.TableServerReturnCode[];
        function instance(): table.TableServerReturnCode[];
    }
}
declare module table {
    module TableVoice {
        var $instance: table.TableVoice[];
        function instance(): table.TableVoice[];
        function select(text: string): number;
    }
}
declare module table {
    module TableMahjongMulti {
        var $instance: table.TableMahjongMulti[];
        function instance(): table.TableMahjongMulti[];
        function selectNameById(num: number): string;
        function selectBaohuById(num: number): number;
        function selectCartoonById(num: number): string;
        function selectTypeById(num: number): string;
        function selectItemById(num: number): table.TableMahjongMulti;
    }
}
declare module table {
    module TablePlayTypeList {
        var $instance: table.TablePlayTypeList[];
        function instance(): table.TablePlayTypeList[];
        function getPlayTypeDes(id: number): string;
        function getConfig(id: number): table.TablePlayTypeList;
    }
}
