/*!
 * MahjongLobbyLib - d.ts for Description
 * @licence MahjongLobbyLib - v0.0.0 (2018-07-30)
 * qq:93749937 | Licence: helojo
 */
declare module MJLobby {
    /**
     * 基础显示类
     */
    class LobbyBaseVc extends egret.DisplayObjectContainer {
        private _dataLoading;
        constructor();
        initUI(): void;
        showDataLoading(x?: number, y?: number): void;
        removeLoading(): void;
        destory(): void;
    }
}

declare module MJLobby {
    /**
     * 基础面板
     */
    class BasePanel extends LobbyBaseVc {
        private _closeBtn;
        private _bg;
        private _title;
        private _initY;
        private _titleBg;
        constructor();
        initUI(): void;
        initPanel(): void;
        /**设置标题资源 如果需要改位置 使用get set  Title*/
        title: string;
        setSize(w: number, h: number): void;
        /**获得背景图属性 */
        Bg: egret.Bitmap;
        /**获得标题属性 */
        Title: egret.Bitmap;
        /**获得标题背景属性 */
        TitleBg: egret.Bitmap;
        /**获得关闭按钮属性 */
        closeBtn: LobbyGameButton;
        /**是否显示背景 */
        hideTitle(show: boolean): void;
        closeHandle(evt: egret.TouchEvent): void;
        setCloseBtnPosition(x?: number, y?: number): void;
        setTitlePosition(x?: number, y?: number): void;
        setTitleBgPosition(x?: number, y?: number): void;
        destory(): void;
    }
}

/**eui组件的父类 */
declare module MJLobby {
    class LobbyBaseEuiPanel extends eui.Component {
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        /**调用unilib的removePop会自动调用基类中的destroy方法 */
        protected removePop(): void;
    }
}

declare module MJLobby {
    class MvcSender {
        constructor();
        sendNotification(cmd: string, vo?: any, type?: string): void;
        onRemove(): void;
    }
}

declare module MJLobby {
    class Command extends MvcSender {
        constructor();
        init(): void;
        destory(): void;
    }
}

declare module MJLobby {
    class MJLobbyEventListener extends egret.EventDispatcher {
        private static _instance;
        constructor();
        static getInstance(): MJLobbyEventListener;
    }
}

declare module MJLobby {
    class Mediator extends MvcSender {
        private _name;
        private _viewComponent;
        constructor(name?: string, viewComponent?: any);
        name: string;
        private onHandle(evt);
        listNotificationInterests(): Array<any>;
        handleNotification(evt: MvcData): void;
        onRemove(): void;
        getViewComponent(): any;
        setViewComponent(viewComponent: any): void;
    }
}

declare module MJLobby {
    class MvcData {
        private _evt;
        constructor(evt: egret.Event);
        getName(): string;
        getBody(): any;
    }
}

declare module MJLobby {
    class Proxy extends MvcSender {
        private _name;
        constructor(name?: string);
        name: string;
        onRemove(): void;
    }
}

declare module MJLobby {
    /**
     * 图片字
     */
    class BitmapText extends egret.DisplayObjectContainer {
        private _bitmapTxt;
        private _width;
        private _align;
        private _text;
        constructor();
        initTxt(font: egret.BitmapFont, w: number, align?: string): void;
        text: string;
    }
}

declare module MJLobby {
    /**
     * 数据加载动画
     */
    class DataLoading extends egret.DisplayObjectContainer {
        private _loadingImg;
        private _timer;
        constructor();
        initUI(): void;
        play(): void;
        destory(): void;
        private stopTimer();
        private onTimer(evt);
    }
}

declare module MJLobby {
    /**
     *
     * 基础button类
     *
     */
    class LobbyGameButton extends egret.Sprite {
        private lable;
        private srcArr;
        private _icon;
        private _labelTxt;
        private _label;
        private _area;
        private _autoDestory;
        private _adjective;
        private _redPoint;
        constructor(arr: Array<string>, label?: string, autoDestory?: boolean);
        addAdjective(name: string, x: number, y: number): void;
        private onRemove(evt);
        private initUI();
        /**增加未读小红点,x,y为在目前基础上需要偏移的量
         * @param {string} res,小红点资源
         * @param {number} x,y,需要偏移的量，调整红点位置
         */
        redPoint(res: any, x?: number, y?: number, scaleX?: number, scaleY?: number): void;
        /**移除小红点
        * @param
        */
        removeRedPoint(): void;
        private onTouchBegin(evt);
        private onTouchEnd(evt);
        addClickArea(num: number): void;
        destory(): void;
    }
}

declare module MJLobby {
    /**
     * 头像类，头像加载后缓存到内存
     */
    class LobbyHeadMc extends egret.Sprite {
        private _headUrl;
        private _headMc;
        private _width;
        private _height;
        private _headLoad;
        private _showDefault;
        private _dataLoading;
        private _uid;
        constructor(width: number, height: number, showDefault?: boolean, showLoading?: boolean);
        private removeLoading();
        destory(): void;
        headUrl: string;
        private loaded(data);
        setUId(uid: number): void;
    }
}

/**
 * 添加二级面板缓冲 延用以前淘金的
 */
declare class LoadSecondPanel extends egret.Sprite {
    private _armature;
    constructor();
    private init();
    private onAddToStageHandler(evt);
    private onRemoveFromStageHandler(evt);
    setProgress(): void;
}

declare module MJLobby {
    /**
     *
     * 中度提示面板，飘文字
     *
     */
    class LobbyMildAlertVC extends LobbyBaseVc {
        private _bg;
        private _text;
        constructor();
        initUI(): void;
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

declare module MJLobby {
    /**
     * 确定面板
     */
    class LobbyMsgBox extends egret.Sprite {
        private yesBtn;
        private noBtn;
        private title;
        private info;
        private _backFn;
        private _backObj;
        private _needClose;
        constructor(needClose: boolean);
        initUI(): void;
        private onClose(evt);
        setData(title: string, msg: string, labelarr?: Array<any>, backFn?: Array<Function>, backObject?: any, countdown?: number, size?: number, align?: string): void;
        titleY: number;
        titleColor: number;
        msgColor: number;
        destory(): void;
    }
}

/**
 * 延用以前淘金的
 * 加载动画
 */
declare class TJLoadingUI extends egret.Sprite {
    constructor();
    private back;
    private _loadingBG;
    private _loadingLogo;
    private promptText;
    private loadPanel;
    private text;
    private init();
    private onAddToStage(e);
    setProgress(txt: any, cur: number, gpName: string): void;
    private onRemoveFromStage(e);
}

declare module MJLobby {
    class LobbyEvents extends egret.EventDispatcher {
        private static _self;
        /**
         * 加载完成
         */
        static NOTIFY_CONNECT_TIMEOUT: string;
        /**服务器发来显示是否存在官方充值代理商充值送钻 */
        static NOTIFY_RECHARGE_GIVE: string;
        static Instance: LobbyEvents;
    }
}

declare module MJLobby {
    class MahJongLobbyFacade extends MvcSender {
        private static _instance;
        private static _commandArr;
        private static _mediatorArr;
        private static _proxyArr;
        constructor();
        static getLobbyInstance(): MahJongLobbyFacade;
        initializeController(): void;
        /**
         * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
         * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
         */
        startUp(rootView: egret.DisplayObjectContainer): void;
        registerCommand(cmd: string, command: Command): void;
        removeCommand(cmd: string): void;
        registerMediator(mediator: Mediator): void;
        retrieveMediator(name: string): Mediator;
        removeMediator(name: string): void;
        registerProxy(proxy: Proxy): void;
        removeProxy(name: string): void;
    }
}

declare module MJLobby {
    class MahJongLobbyFacadeConsts {
        static STARTUP: string;
        static SEND_DATA: string;
        static ENTER_LOBBY: string;
        static JOIN_ROOM: string;
        static JOIN_VIDEOROOM: string;
        /**加入百人场 */
        static JOIN_HUNDRE_ROOM: string;
        static CREATE_ROOM_SUCCESS: string;
        static CANCEL_ROOM: string;
        static SHOW_RECORD: string;
        static SHOW_HELP: string;
        static SHOW_SHARE: string;
        static SHOW_SETTING: string;
        static HISTORY_DATA: string;
        static HISTORY_DETAIL_DATA: string;
        static ROOM_DESTORY: string;
        static USER_INFO_DATA: string;
        static DESTORY: string;
        static SHOW_LOBBY: string;
        static LOBBY_RECONNECTION: string;
        static GAME_LIST_DATA: string;
        static GetNormalGameListRoomCmd_S: string;
        static INVITE_DATA: string;
        static CHECKIN_AWARDS_DATA: string;
        static INVITE_AWARDS_DATA: string;
        static CONFIG_LOADED: string;
        static CONTINUE: string;
        /**发红包返回 客家*/
        static SEND_REDPACKET_BACK: string;
        /**领取红包返回 客家*/
        static GET_REDPACKET_BACK: string;
        /**红包记录返回 客家*/
        static GET_REDPACKET_RECORD: string;
        /**加入房间确认 */
        static CONFRIM_JOINROOM: string;
        /**收到服务器发来排行榜数据 */
        static GET_RANK_RECORD: string;
        /**收到服务器发来领取排行榜奖励 */
        static GET_RANK_AWARD: string;
        /**收到服务器返回打开红包界面 */
        static OPEN_REDPACKETPANEL: string;
        /**收到服务器返回提现详情界面 */
        static GET_REDPOSITDETAIL: string;
        /**收到服务器返回 红包提现成功 */
        static GET_REDPACKET_SUCCESS: string;
        /**检测红包提取成功 */
        static CHECKOPENREDPACK_OK: string;
        /**更新匹配组数据 */
        static REFRESH_MATCHGROUP: string;
        /**进入匹配组数据 */
        static ENTER_MATCHGROUP: string;
        /**刷新匹配组数据 */
        static UODATE_MATCHGROUP: string;
        /**离开匹配组数据 */
        static LEAVE_MATCHGROUP: string;
        /**离开匹配组数据-其他人*/
        static LEAVE_MATCHGROUP_OTHER: string;
        /** */
        static ActiveDetailRoom: string;
        /**进入匹配组数据 */
        static CREATE_MATCHGROUP: string;
        /**获取服务器发来的比赛场时间 */
        static GET_MATCHTIME: string;
        /**比赛场报名成功 */
        static MATCH_ENROLL_SUCCESS: string;
        /**比赛场退赛 */
        static MATCH_EXIT: string;
        /**比赛场获得玩家数量 */
        static MATCH_GETUSER_COUNT: string;
        /**比赛场获得玩家数量排行榜 */
        static MATCH_GETCOUNT_LIST: string;
        /**金币场用户签到信息返回 */
        static SIGN_INFO: string;
        /**金币场用户签到返回 */
        static SIGN_TODAY: string;
        /**金币场累积签到奖励 */
        static SIGN_CONTINUE: string;
        /**金币场排行榜信息回复 */
        static GET_RANK_LIST: string;
        /**金币场获取大赢家排行榜奖励回复 */
        static GET_WINCHIPS_RANK: string;
        /**金币场获取免费金币界面数据 */
        static GET_FREEGOLD_INFO: string;
        /**金币场获取vip礼包 */
        static COIN_GETAWARD_VIP: string;
        /**金币场首冲充值成功 */
        static COIN_FIRSTRECHARGE: string;
        /**金币场免费金币 */
        static COIN_FREEGOLD: string;
        /**金币场排行榜的个人信息 */
        static COIN_RANK_INFO: string;
        /**匹配号数据 */
        static ReturnMatchGroup: string;
        /**白名单消息列表 */
        static JoinMemberListMatch: string;
        /**返回黑白名单 */
        static MemberInfoMatchGroup: string;
        /**返回参赛人员战绩列表 */
        static PlayedListMatchGroup: string;
        /**客家棋牌推荐人数 */
        static KEJIA_INVITERANK: string;
        /**福建代理商邀请人 */
        static LYFJ_INVITE: string;
        /**福建代理商邀请返回 */
        static LYFJ_INVITE_RETURN: string;
        /**丹东邀请人 */
        static DANDONG_INVITE: string;
        /**余款数量更新 */
        static BANK_MONEY_UPDATE: string;
        /** 收到服务器发来 好彩真人麻将救济金消息 */
        static HC_ALMS: string;
        /**收到服务器发回首充面板消息 */
        static HC_SHOW_FIRSTRECHARGE: string;
        /**收到服务器发限时面板的返回 */
        static HC_SHOW_LIMIT: string;
        /**收到服务器限时优惠兑换奖励的返回 */
        static HC_SHOW_LIMIT_BACK: string;
        /**打开幸运翻翻翻面板 */
        static HC_SHOW_LUCK: string;
        /**好彩真人金币排行榜 */
        static HC_SHOW_RANK: string;
        /**获取弹窗公告 */
        static HC_SHOW_BROAD: string;
        /**已读弹窗公告 */
        static HC_SHOW_READBROAD: string;
        /**返回幸运翻翻翻面板的数据 */
        static HC_SHOW_LUCK_BACK: string;
        /**快速开始 */
        static HC_QUICK_START: string;
        /**限时优惠 */
        static HC_ExchangeLimitActivity: string;
        /**好彩真人百人场 */
        static HC_JOIN_HUNDRE_ROOM: string;
        /**返回活跃房间列表 */
        static RETURN_ACTIVE_LIST_ROOM: string;
        /**好彩真人登陆成功 */
        static HC_LOGIN_SUCCESS: string;
        /**好彩礼包码兑换 */
        static HC_GIFT_CODE: string;
        /**好彩领取首充礼包 */
        static HC_GET_FIRSTRECHARGE_REWARD: string;
        /**服务器返回是否可以加入游戏信息 */
        static HC_JudgeEnterGameLobby: string;
        /**返回之前的游戏房间 */
        static HC_ReturnHaoCaiGameLobby: string;
        /**魅力值排行榜 */
        static HC_GETUSERCPRANKLIST_LOBBY: string;
        /**添加好友 */
        static HC_ADDFRIEND_LOBBY: string;
        /**服务器发来 获取好友列表数据 */
        static HC_GETFRIENDLIST_LOBBY: string;
        /**服务器发来查找特定的玩家数据 */
        static HC_SEARCHUSER_LOBBY: string;
        /**服务器发来查找好友界面数据 */
        static HC_SEARCHFRIENDSLIST_LOBBY: string;
        /**服务器发来好友聊天 */
        static HC_FRIENDCHAT_LOBBY: string;
        /**获得金币场战绩 */
        static HC_GETCOINGAMERECORD_LOBBY: string;
        /**自己送礼的回调 */
        static HC_SENDGIFT_LOBBY_S: string;
        /**获取礼品券 */
        static HC_GETGIFTCOUPON_LOBBY: string;
        /**兑换礼品券记录个人信息 */
        static HC_EXCHANGEGIFTCOUPONRECORDUSERINFO_LOBBY: string;
        /**删除好友 */
        static HC_REMOVEFRIEND_LOBBY: string;
        /**修改用户信息 */
        static USERINFO_MODIFY_LOBBY: string;
        /**修改用户信息失败 */
        static USERINFO_MODIFY_FAIL: string;
        /**好友申请列表 */
        static HC_GETFRIENDAPPLYLIST_LOBBY: string;
        /**同意，拒绝好友 */
        static HC_DEALFRIENDAPPLYLIST_LOBBY: string;
        /** 获取任务列表*/
        static HC_GET_GAME_TASKLIST_LOBBY: string;
        /** 领取指定游戏任务奖励 */
        static HC_GET_GAME_TASKREWARD_LOBBY: string;
        /**退出房间面板 */
        static HC_QUITGAMESHOW_LOBBY: string;
        /**邮件改变 */
        static Mail_Changed: string;
        /**金币改变 */
        static Chips_Changed: string;
        /**已获取邮件东西通知 */
        static GetItemMail: string;
        /**比赛场获取时间 */
        static GET_BATTLE_TIME: string;
        /**刷新某个赛事人数 */
        static RefreshUesrNbrEvent: string;
        /**刷新某个赛事状态 */
        static RefreshStateEvent: string;
        /**查看当前赛事 */
        static ReturnListEvent: string;
        /**商城购买 */
        static BUYGOODS_LOBBY: string;
        /**绑定手机成功 */
        static BIND_PHONE: string;
        /**获取红包信息 */
        static GET_REDPACKINFO: string;
        /**抢红包 */
        static GRAB_REDPACK: string;
        /**红包累计奖励 */
        static GET_MYREDPACKREWARD: string;
        /**兑换红包奖励 */
        static EX_MYREDPACK: string;
        /**兑换红包奖励 */
        static HC_USERVIP: string;
        /**请求转盘信息 */
        static GET_TURNTABLEINFO: string;
        /**转动转盘信息 */
        static TURN_TURNTABLE: string;
        /**请求领取转盘累计奖励 */
        static GET_TURNTABLEREWARD: string;
        /**请求邮件列表 */
        static GET_MAILLIST: string;
        /**查看指定邮件 */
        static READ_ONEMAIL: string;
        /**删除指定邮件 */
        static DELETE_ONEMAIL: string;
        /**领取指定邮件内的奖励 */
        static GET_MAILREWARD: string;
        /**邮件批量操作 */
        static BULK_MAIL: string;
        /**按钮红点更新 */
        static RED_POINT: string;
        /**顺序弹窗协议 */
        static WINDOW_POP: string;
        /**申请退出一个赛事 */
        static RequestExitEvent: string;
        /**申请退出一个赛事返回 */
        static ReturnExitEvent: string;
        /**返回某个赛事结果 */
        static ReturnEventResult: string;
        /**申请参加加赛事返回 */
        static ReturnJoinEvent: string;
        /**账户字账号更新 */
        static SubAccountUpdateEvent: string;
        /**实名认证 */
        static AuthenticationLobby: string;
        /**提现记录 */
        static WithdrawalRecordEvent: string;
        /**普通玩家，请求进入茶馆返回 */
        static ReturnRoomMatchGroup: string;
        /**返回请求的玩家头像组 */
        static ReturnUserHeadList: string;
        /**返回黄名单列表 */
        static ReturnYellowList: string;
        /**放弃摇一摇 */
        static AbandonShake: string;
        /**进入摇一摇 */
        static ENTERSHAKE_LOBBY: string;
        /**摇一摇结果返回 */
        static SHAKE_DATA_LOBBY: string;
        /**大厅红包雨 */
        static GrabRedPackLobby: string;
        /**改变匹配号属性事件 */
        static ChangeMatchGroupEvent: string;
        /**历史匹配记录 */
        static HistoryMatchIdList: string;
        /**个人信息 */
        static PersonalInfo: string;
        /**官方匹配组列表 */
        static PublicMatchList: string;
        /**冠名赛列表 */
        static OfficialMatchList: string;
        /**等待列表*/
        static ReturnWaitList: string;
        /**弹窗事件 */
        static OpenWindowHandle: string;
        /**弹窗事件 */
        static TotalRedPack: string;
        /**新用户红包界面 */
        static NewUserRedPack: string;
        /**领取新手红包 */
        static ExchangeNewUserRedPack: string;
        /**话费券兑换红包界面 */
        static GetCCRedPack: string;
        /**话费券兑换红包 */
        static ExchangeCCRedPack: string;
        /**返利红包界面 */
        static GetRechargeRedPack: string;
        /**兑换返利红包 */
        static ExchangeRechargeRedPack: string;
        /**玩家获得红包明细 */
        static GetUserGetRedPackInfo: string;
        /**提现记录 */
        static GetDrawCashRecord: string;
        /**红包提现 */
        static RedPackDrawCash: string;
        /**新版幸运翻翻翻主界面 */
        static NewLuckTurnCardShow: string;
        /**新版幸运翻翻翻翻牌 */
        static NewGetLuckTurnCardReward: string;
        /**返回商城列表 */
        static ReturnShopPointList: string;
        /**返回抽奖结果 */
        static ReturnLuckShopPointItem: string;
        /**获取收货地址 */
        static GetShippingAddress: string;
        /**填写或者修改收货地址 */
        static ChangeShippingAddress: string;
        /**获取拥有的所有时效性道具 */
        static GetTimeGoods: string;
        /**获取拥有的所有时效性道具 */
        static RevTimeChips: string;
        /**购买头像框，周卡/月卡等时效性道具 */
        static BuyTimeGoods: string;
        /**个人形象道具的使用 */
        static ChangePersonalImage: string;
        /**玩家发送世界聊天消息 */
        static WorldChatBySuona: string;
        /**推送世界聊天消息 */
        static WorldChatBySuonaBrd: string;
        /**获取世界聊天消息 */
        static GetWorldChatRecord: string;
        /**绑定联系信息*/
        static Bind_WeChatNum: string;
        static HISTORY_LOG: string;
        /**创建德州扑克俱乐部 */
        static ClubInfoUpdateEvent: string;
        /**查询俱乐部信息 */
        static QueryClubInfoEvent: string;
        /**查询俱乐部列表信息 */
        static SerchClubListEvent: string;
        /**消息通知更跟新 */
        static NotifyMsgUpdateEvent: string;
        /**已读弹窗公告 */
        static ReadPopBroad: string;
        /**返回所有俱乐部信息 */
        static HistoryClubList: string;
        /**压注数据（德扑大厅） */
        static StatisticsRoundData: string;
        /**房间牌局记录（德扑大厅） */
        static RoundRecordRoomQuery: string;
        /*** 聊天*/
        static ChatMessageInfo: string;
        /*** 报名更新通知*/
        static SignListUpdate: string;
        /*** 报名更新通知*/
        static MyGamesUpdate: string;
        /*** 座位货币变化*/
        static UserChipChaned: string;
        /**请求玩家信息 */
        static QueryUserInfoEvent: string;
        /**离开匹配组返回  */
        static LEAVE_MATCHGROUP2: string;
        /**删除好友 */
        static RemoveFriend: string;
        /**新年活动领取奖励 */
        static NEWYEAR_GETREWORD: string;
        /**新年活动界面数据 */
        static NEWYEAR_DATAINFO: string;
        /**新年活动记录面板 */
        static NEWYEAR_RECORD: string;
        /**自己收藏牌谱 */
        static SelfRoundRecordQuery: string;
        /**获取百宝箱数据 */
        static GET_TREBOX_INFO: string;
        /**领取百宝箱奖励 */
        static GET_TREBOX_TASKAWARD: string;
        /**百宝箱转动抽奖 */
        static TURN_TREBOX_LOTTERY: string;
        /**红包开启失败 */
        static OPEN_REDPACKET_FAIL: string;
        /**捐献历史 */
        static DONATE_HISTORY: string;
        /**获取标签列表 */
        static Get_TagList: string;
        /**标签列表更新 */
        static TagListChanged: string;
        /**添加标签返回 */
        static AddTagReturn: string;
        /**基金更新 */
        static Club_Fund_Update: string;
        /**消息通知更新 */
        static UpdateNotification: string;
        /**茶馆里的房间状态变化 */
        static UpdataMatchRoomStatus: string;
        /**报名进入通知 */
        static Sign_Enter: string;
        /**俱乐部信息更新【比赛场】 */
        static ReturnClubInfo: string;
        /**加入俱乐部弹窗消息 */
        static NOTIFYIMPORTNOTE: string;
        /**赛事信息 */
        static EVENT_INFO: string;
        /**创建选项更新 */
        static RoomCreateConfigUpdate: string;
        /**赛事报名信息 */
        static EntryInfoEvent: string;
        /**转账数据更新 */
        static TransitMoneyQueryClub: string;
        /**俱乐部牌局更新 */
        static UpdataClubGame: string;
        /**奖池数据查询 */
        static RETURN_JACKPITEMLIST: string;
        /**刷新奖池总金额 */
        static UPDATE_JACKPOTNUM: string;
        /**招商消息成功发送 */
        static AGENT_SUCCESS: string;
        /**其他登录方式 验证老手机返回 */
        static VERIFY_IDENTIFY_CODE: string;
        /**其他登录方式返回 操作类型 1/2/3/4  绑定/换绑/修改密码/解绑 */
        static BIND_ACCOUNT_LOBBY: string;
        /**游客邮箱验证 */
        static GET_EMAIL_CODE: string;
        /**绑定邮箱操作类型 1/2/3/4  绑定/换绑/修改密码/解绑 -- 暂时只处理1、3 */
        static BIND_EMAIL_LOBBY: string;
        /**设置俱乐部税收 */
        static SET_CLUB_TAX: string;
        /**bashi加入俱乐部 */
        static BSClubJoinCmd_CS: string;
        /**bashi退出俱乐部 */
        static BSClubExitCmd_CS: string;
        /**bashi退出俱乐部 */
        static BSClubLoginCmd_CS: string;
        /**bashi俱乐部详细信息 */
        static BSClubInfoCmd_CS: string;
        /**bashi创建俱乐部 */
        static BSClubCreateCmd_CS: string;
        /**bashi创建俱乐部 */
        static BSClubManageCmd_CS: string;
        /**bashi创建俱列表 */
        static BSClubMemberListCmd_CS: string;
        /**bashi创建俱查找 */
        static BSClubMemberFindCmd_CS: string;
        /**bashi赠送金币 */
        static BSClubGiftGoldCmd_CS: string;
        /**bashi使用礼卷 */
        static BSClubUseCouponCmd_CS: string;
        /**解散更新 */
        static DISSOLVE_UPDATA: string;
        /**查询俱乐部房间总战绩 */
        static StatisticsRoomLabelQuery: string;
        /**数据更新通知 */
        static DataUpdateNotify: string;
        /**大厅所有游戏在线人数 */
        static AllGamePlayerOnlineNumberLobby_CS: string;
        /**俱乐部成员更新 */
        static ClubMemberUpdate: string;
        /**俱乐部申请更新 */
        static ClubApplicationUpdate: string;
        /**俱乐部转账更新 */
        static TransitMoneyDealClub: string;
        /**奖池抽奖结果返回 */
        static ReturnJackpotItem: string;
        /**奖池排行榜返回 */
        static ReturnJackpotOrder: string;
        /**移除红点 */
        static RemoveRedPointEvent: string;
        /**俱乐部通知 */
        static CLUB_NOTICE: string;
        /**查找指定玩家 */
        static USERINFO_SEARCH: string;
        /**俱乐部指定玩家 */
        static CLUB_MEMBER: string;
        /**俱乐部创建者 */
        static CLUB_FOUNDER: string;
        /**牌局消息处理结果 */
        static GAME_MSG_DEAL: string;
        /**绑定邮箱 */
        static Bind_MailAddress: string;
        /**新牌局消息通知 */
        static GameMessageNotifyUpdate: string;
        /**牌局消息通知 */
        static GameMessageUpdate: string;
        /**检查能否转账 */
        static BSClubCanTransferCmd_CS: string;
        /**使用点卡 */
        static BSClubUseCardCmd_CS: string;
        /**系统设置 */
        static SystemSettingsLobbyCmd_CS: string;
        /**俱乐部货币兑换 */
        static ExchangeMoneyClub: string;
        /**赠送金币回复 */
        static ExchangeCoinLobby_S: string;
        /**查看牌谱 */
        static RoundRecordCheck: string;
        /**房间结算数据 */
        static StatisticsRoomDataCheck: string;
        /**牌局生成器通知 */
        static RoomGeneratorUpdateClub: string;
        /**查找昵称回复 */
        static GetUserNickNameLobby_S: string;
        /**玩家赠送金币信息 */
        static GetUserGiftCoinInfoLobbyCmd_S: string;
        /**返回购买订单历史 */
        static ReturnOrderList: string;
        /**返回购买订单历史 */
        static HistoryUpdateLobbyCmd_CS: string;
        /**玩家游戏历史数据更新（大厅） */
        static UserGameHistoryUpdateLobbyCmd_CS: string;
        /**俱乐部转账更新 */
        static TransitMoneyClub: string;
        /**设置俱乐部管理员 */
        static PostUpdateClub: string;
        /**上下级代理关系 */
        static AgentRelationLineQueryClub: string;
        /**俱乐部会员 */
        static MemberQueryClub: string;
        static AgentCreditChangeClub: string;
        static AgentAvailableGiveMemberQueryClub: string;
        static UnionCreateClub: string;
        static UnionJoinRequestClub: string;
        static UnionEditClub: string;
        static UnionUpdateClud: string;
        static UnionApplicantUpdateClub: string;
        static UnionMemberUpdateClub: string;
        static UnionFundInfoUpdate: string;
        static UnionFundDistributeQueryClub: string;
        static AgentStatisticsRoomQueryClub: string;
        static UnionStatisticsSumQueryClub: string;
        static UnionStatisticsRoomQueryClub: string;
        static MemberGameDataSumClub: string;
        static AgentCreditChangeQueryClub: string;
        static AgentStatisticsRoomCheckClub: string;
        static AgentAvailableUplineQueryClub: string;
        constructor();
    }
}

declare module MJLobby {
    /**
     * 全局控制
     */
    class GlobalControl {
        private _hasExit;
        private static _instance;
        constructor();
        static getInstance(): GlobalControl;
        private init();
        private onExiteGame(e?);
        private onRestart(evt);
        private closePanel(evt);
        private close(evt);
        private onSureBox();
        private onCancel();
    }
}

declare module MJLobby {
    class CostsTypeConst {
        static CARD: number;
        static DIAMOND: number;
        constructor();
    }
}

declare module MJLobby {
    class LobbyIdConsts {
        static HUNAN_MAHJONG: number;
        static GUANGDONG_LONGYAN: number;
        static HUIBEI_MAHJONG: number;
        static GUIZHOU_MAHJONG: number;
        static FUJIAN_MAHJONG: number;
        static LAOYOU_MAHJONG: number;
        static JIANGXI_KEJIA: number;
        static GUANGDONG_HONGZHONG: number;
        static FUJIAN_LONGYAN: number;
        static JINHUA_MAHJONG: number;
        static NINGBO_KEJIA: number;
        static ZHANGDOU: number;
        constructor();
    }
}

declare module MJLobby {
    class LobbyUIEventConsts {
        static GO_TO_DEMO: string;
        static SHOW_CREATE_PANEL: string;
        static SHOW_JOIN_PANEL: string;
        static SHOW_TGY: string;
        static CLOSE: string;
        static CLOSE_RECORD: string;
        static CREATE_ROOM: string;
        static SettingMatch: string;
        static JOIN_ROOM: string;
        static ACTIVE_LIST_ROOM: string;
        static CLICK: string;
        static BACK_ROOM: string;
        static SET_TGY: string;
        static SHOW_RECORD: string;
        static SHOW_HELP: string;
        static SHOW_SHARE: string;
        static SHOW_SETTING: string;
        static SHOW_NOTICE: string;
        static SHOW_MARKET: string;
        static SHOW_VIP: string;
        static SHOW_REDPACKET: string;
        static SHOW_USERINFO: string;
        static LOGIN_OUT: string;
        static GET_HISTORY_DATA: string;
        static GET_HISTORY_DETAIL_DATA: string;
        static CHANGE: string;
        static SHARE_SUCCESS: string;
        /**砖石转化房卡 */
        static SHOW_DTK: string;
        /**钻石转化为房卡操作 */
        static ACTION_DTK: string;
        static RESET_CHECKBOX: string;
        /**商店按钮点击 */
        static SHOP_BTN_CLICK: string;
        /**首冲 */
        static FIRST_RECHARGE_CLICK: string;
        static GET_CHECKIN_AWARDS: string;
        static GET_INVITE: string;
        static GET_INVITE_AWARDS: string;
        static GET_RANK_DATA: string;
        /**加入练习场 */
        static JOIN_PRACTICEROOM: string;
        static SEND_HORN: string;
        static SHOW_HORN: string;
        /**发红包 */
        static SEND_REDPACKET: string;
        /**拆红包 */
        static CHAI_REDPACKET: string;
        /**请求红包记录 */
        static GET_REDPACKET_RECORD: string;
        /**请求查看录像 */
        static REQ_LOOK_VIDEO: string;
        /**打牌查看录像面板 */
        static OPEN_LOOK_RECORDPANEL: string;
        /**查看录像发送Id */
        static LOOK_RECORD_ID: string;
        /**请求代理 */
        static REQ_DLS: string;
        /**点击排行按钮 */
        static CLICK_RANKBTN: string;
        /**点击排行领取按钮 */
        static GET_RANK_AWARD: string;
        /**今日排行榜点击*/
        static CLICK_TODAY_RANK: string;
        /**昨日排行榜点击 */
        static CLICK_YESTORDAY_RANK: string;
        /**红包开奖按钮点击 */
        static REDPACKET_BTN_CLICK: string;
        /**检测红包开启事件 */
        static CHECKREDPACKET_OPEN: string;
        /**开红包按钮点击事件 */
        static OPEN_REDPACKET: string;
        /**请求提现详情 */
        static REDPACKET_DepositDetailPanel: string;
        /**前往比赛场 */
        static GO_TO_MATCH: string;
        /**比赛场选场点击 */
        static CHOOSE_MATCH_CLICK: string;
        /**比赛场报名 */
        static ENROLL_MATCH: string;
        /**比赛场获取时间 */
        static GET_MATCH_TIME: string;
        /**比赛场获取排行榜 */
        static GET_MATCH_COUNT: string;
        /**金币场选择游戏进入选场界面 */
        static COIN_SELECT_GAMEID: string;
        /**显示活动按钮 */
        static SHOW_ACTION_BTN: string;
        /**金币场获取签到信息 */
        static COIN_GETSIGN_DATA: string;
        /**金币场签到按钮点击 */
        static COIN_SIGN_CLICK: string;
        /**金币场领取签到奖励 */
        static COIN_GETSIGN_AWARD: string;
        /**金币场激活vip */
        static COIN_ACTYVATE_VIP: string;
        /**金币场每日活动点击 */
        static COIN_FREEGOLD_CLICK: string;
        /**金币场请求 */
        static COIN_FREEGOLD_REQ: string;
        /**金币场获取vip奖励 */
        static COIN_GETVIP_AWARD: string;
        /**金币场获取排行榜信息 */
        static COIN_GETRANK_LIST: string;
        /**金币场修改个人签名 */
        static CHANGE_USER_SIGN: string;
        /**丹东大厅邀请码 */
        static DANDONG_INVITE: string;
        /**实名认证 */
        static CERTIFICATION_CLICK: string;
        /**实名认证发给服务器 */
        static SEND_CERTIFICATION: string;
        /**玩法全部互斥事件 用来更新面创建房间面板 */
        static EXCLUDE_ALLPLAYTYPE: string;
        /**打开俱乐部 */
        static SHOW_CLUB_PANEL: string;
        /**商店 */
        static HC_SHOW_SHOP: string;
        /**通知按钮 */
        static HC_SHOW_NOTICE: string;
        /**救济金 */
        static HC_SHOW_ALMS: string;
        /**活动 */
        static HC_SHOW_ACTIVITY: string;
        /**任务 */
        static HC_SHOW_TASK: string;
        /**首充 */
        static HC_SHOW_FIRSTRECHARGE: string;
        /**限时活动 */
        static HC_SHOW_LIMIT: string;
        /**设置 */
        static HC_SHOW_SETTING: string;
        /**快速游戏 */
        static HC_FASETSTART: string;
        /**兑换限时活动 */
        static HC_ExchangeLimitActivity: string;
        /**展示幸运翻翻翻面板 */
        static HC_SHOW_LUCK: string;
        /**翻卡 */
        static HC_TRUN_CARD: string;
        /**快速开始 */
        static HC_QUICK_START: string;
        static HC_openLuckLotteryRolePanel: string;
        /**礼包兑换 */
        static HC_GIFT_EXCHANGE: string;
        /**领取首充礼包 */
        static HC_GET_FIRSTRECHARGE_REWARD: string;
        /**礼包码兑换 */
        static HC_GIFT_CODE: string;
        /**判断是否可以加入游戏 */
        static HC_JudgeEnterGameLobby: string;
        /**返回之前的游戏房间 */
        static HC_ReturnHaoCaiGameLobby: string;
        /**打开wifi加载按钮 */
        static HC_OpenIsWifiLoadingPanel: string;
        /**继续加载游戏 */
        static HC_ContinueGameIsWifiLoadingPanel: string;
        /**红包活动 */
        static HC_SHOW_REDPACKETPANEL: string;
        /**抢红包 */
        static HC_SHOW_GRABREDPACK: string;
        /**红包累计奖励*/
        static HC_SHOW_REDPACKREWARD: string;
        /**红包奖励明细*/
        static HC_SHOW_REDPACKDETAIL: string;
        /**获取验证码*/
        static HC_SHOW_GETCODE: string;
        /**绑定手机*/
        static HC_SHOW_BINDINGPHONE: string;
        /**头像点击事件 回调 */
        static HEAD_CLICK_CALLBACK: string;
        /**进入俱乐部 */
        static SHOW_CLUB: string;
        /**房间管理 */
        static ROOM_MANAGE: string;
        /**邀请人排行榜 */
        static INVITE_RANK_CLICK: string;
        /**福建代理商邀请按钮点击 */
        static LYFJ_INVITE_CLICK: string;
        /**保险箱按钮 */
        static SAFE_BTN_CLICK: string;
        /**保险箱存取 */
        static SAFE_POPPUSH_CLICK: string;
        /**前往赛事场(西安用) */
        static SHOW_TO_BATTLE: string;
        /**赛事场选场点击(西安用) */
        static CHOOSE_BATTLE_CLICK: string;
        /**赛事场报名(西安用) */
        static ENROLL_BATTLE: string;
        /**赛事场数据更新(西安用) */
        static BATTLE_DATA_UPDATA: string;
        /**显示俱乐部桌子 */
        static SHOW_CLUB_DESK: string;
        /**选择俱乐部 */
        static SWITCH_CLUB: string;
        /**显示时时彩 */
        static LOBBY_SHOW_LOTTERY: string;
        /**通用的UI事件 */
        static UIEVENT_COMMON: string;
        /**招商UI时间 */
        static SHOW_AGENT: string;
        /**俱乐部玩家信息 */
        static CLUB_USERINFO: string;
        /**俱乐部信息 */
        static CLUB_NOTICE: string;
        constructor();
    }
}

declare module MJLobby {
    class PlayTypeConsts {
        static MUlT_CHECK: number;
        static RADIO: number;
        static RADIO_NO_DEFAULT: Number;
        constructor();
    }
}

declare class VideoConsts {
    /**麻将 */
    static MAHJONG: string;
    /**十三水 */
    static SSH: string;
    /**老跑得快 */
    static OLD_PDK: string;
    /**斗地主 */
    static DDZ: string;
    /**牛牛 */
    static NIUNIU: string;
    /**新跑得快 */
    static NEW_PDK: string;
}

declare module MJLobby {
    /**
     * 数据请求操作
     */
    class LobbyDataRequestCommand extends Command {
        static GAME_DATA: string;
        static CONNECT_GAME_SERVER: string;
        static LOGIN_OUT: string;
        constructor();
        init(): void;
        private onEventHandle(evt);
        onRemove(): void;
    }
}

declare module MJLobby {
    /**
     * 移除命令
     */
    class LobbyRemoveCommand extends Command {
        constructor();
        init(): void;
        private onEventHandle(evt);
        private removeController();
        private removeMediator();
        private removeProxy();
        onRemove(): void;
    }
}

declare module Cmd {
    function dispatch(cmd: string, obj?: any, type?: string): void;
    function trace(rev: any, str?: string): void;
    function OnUserInfoSynLobbyCmd_S(rev: Cmd.UserInfoSynLobbyCmd_S): void;
    function OnCreateConfigListLobbyCmd_S(rev: Cmd.CreateConfigListLobbyCmd_S): void;
    function OnCanCreateRoomCmd_Brd(rev: Cmd.CanCreateRoomCmd_Brd): void;
    function OnCreateRoomCmd_S(rev: Cmd.CreateRoomCmd_S): void;
    function OnReturnRoomCmd_S(rev: Cmd.ReturnRoomCmd_S): void;
    /**
     * 服务器会同时下发EnterRoomCmd_S、CreateRoomCmd_S 客户端只处理第一个
     */
    function OnEnterRoomCmd_S(rev: Cmd.EnterRoomCmd_S): void;
    /**
     *  请求进入茶馆返回 刷新最后进入的matchId,
     */
    function OnReturnRoomMatchGroupCmd_S(rev: Cmd.ReturnRoomMatchGroupCmd_S): void;
    /**
     *  记录服务器下发消息 匹配号淘汰赛返回大厅匹配
     */
    let RefreshMatchGroup: Cmd.RefreshMatchGroupCmd_Brd;
    function OnRefreshMatchGroupCmd_Brd(rev: Cmd.RefreshMatchGroupCmd_Brd): void;
    /**
     * 记录服务器下发消息 匹配号淘汰赛返回大厅匹配
     */
    let EnterMatchGroup: Cmd.EnterMatchGroupCmd_S;
    let EnterMatchGroupTime: number;
    function OnEnterMatchGroupCmd_S(rev: Cmd.EnterMatchGroupCmd_S): void;
    /**刷新匹配组数据 */
    function OnEnterMatchGroupCmd_Brd(rev: Cmd.EnterMatchGroupCmd_Brd): void;
    function OnLeaveMatchGroupCmd_S(rev: Cmd.LeaveMatchGroupCmd_S): void;
    function OnLeaveMatchGroupCmd_Brd(rev: Cmd.LeaveMatchGroupCmd_Brd): void;
    function OnCreateMatchGroupCmd_S(rev: Cmd.CreateMatchGroupCmd_S): void;
    function OnGetPracticeGameInfoRoomCmd_S(rev: Cmd.GetPracticeGameInfoRoomCmd_S): void;
    function OnActiveDetailRoomCmd_S(rev: Cmd.ActiveDetailRoomCmd_S): void;
    function OnRemoveRoomCmd_Brd(rev: Cmd.RemoveRoomCmd_Brd): void;
    function OnGetGameDataHistoryCmd_S(rev: Cmd.GetGameDataHistoryCmd_S): void;
    function OnGetGameDetailHistoryCmd_S(rev: Cmd.GetGameDetailHistoryCmd_S): void;
    /**房间日志 */
    function OnGetRoomLogHistoryCmd_S(rev: Cmd.GetRoomLogHistoryCmd_S): void;
    function OnUserInfoGetLobbyCmd_S(rev: Cmd.UserInfoGetLobbyCmd_S): void;
    function OnUserInfoModifyReturnLobyCmd_S(rev: Cmd.UserInfoModifyReturnLobyCmd_S): void;
    function OnShareLobbyCmd_S(rev: Cmd.ShareLobbyCmd_S): void;
    function OnChangeParentCmd_S(rev: Cmd.ChangeParentCmd_S): void;
    function OnGetNormalGameListRoomCmd_S(rev: Cmd.GetNormalGameListRoomCmd_S): void;
    function OnSysMessageMahjongLobbyCmd_S(rev: Cmd.SysMessageMahjongLobbyCmd_S): void;
    function OnGetInviteListCmd_CS(rev: Cmd.GetInviteListCmd_CS): void;
    function OnGetInviteRewardCmd_S(rev: Cmd.GetInviteRewardCmd_S): void;
    function OnGetRegisterRewardCmd_S(rev: Cmd.GetRegisterRewardCmd_S): void;
    function OnApplyContinuePlayRoomCmd_Brd(rev: Cmd.ApplyContinuePlayRoomCmd_Brd): void;
    function OnSendSuonaLobbyCmd_S(rev: Cmd.SendSuonaLobbyCmd_S): void;
    /**
    * 封红包
    */
    function OnExchangeKeyGet_CS(rev: Cmd.ExchangeKeyGet_CS): void;
    /**拆红包 */
    function OnExchangeChipsReceive_CS(rev: Cmd.ExchangeChipsReceive_CS): void;
    /**
     * 红包记录
     */
    function OnExchangeRecordGet_CS(rev: Cmd.ExchangeRecordGet_CS): void;
    /**钻石换房卡 */
    function OnExchangeCardByDiamondLobbyCmd_S(rev: Cmd.ExchangeCardByDiamondLobbyCmd_S): void;
    /**录像功能 */
    function OnReturnRecordLobbyCmd_S(rev: Cmd.ReturnRecordLobbyCmd_S): void;
    /**显示进入房间人数 */
    function OnGetRoomUserLobbyCmd_S(rev: Cmd.GetRoomUserLobbyCmd_S): void;
    /**排行榜数据 */
    function OnGetDayRankCmd_S(rev: Cmd.GetDayRankCmd_S): void;
    /**获取奖励 */
    function OnGetDayRankRewardCmd_S(rev: Cmd.GetDayRankRewardCmd_S): void;
    /**处罚提示 */
    function OnPunishUserCmd_S(rev: Cmd.PunishUserCmd_S): void;
    /**查看提现详情 */
    function OnGetOpenRedPackRecordLobbyCmd_S(rev: Cmd.GetOpenRedPackRecordLobbyCmd_S): void;
    /**红包是否可提取 */
    function OnCheckOpenRedPackLobbyCmd_S(rev: Cmd.CheckOpenRedPackLobbyCmd_S): void;
    /**红包提取*/
    function OnOpenRedPackLobbyCmd_S(rev: Cmd.OpenRedPackLobbyCmd_S): void;
    /**查看当前红包奖励 */
    function OnGetRedPackRewardInfoLobbyCmd_S(rev: Cmd.GetRedPackRewardInfoLobbyCmd_S): void;
    /**进入百人场 */
    function OnEnterHundredGameLobbyCmd_S(rev: Cmd.EnterHundredGameLobbyCmd_S): void;
    /**服务器返回比赛场报名 */
    function OnEntryMatchLobbyCmd_S(rev: Cmd.EntryMatchLobbyCmd_S): void;
    /**服务器返回比赛场等待消息 */
    function OnEntryMatchUserCountLobbyCmd_Brd(rev: Cmd.EntryMatchUserCountLobbyCmd_Brd): void;
    /**比赛场退赛 */
    function OnQuitMatchLobbyCmd_S(rev: Cmd.QuitMatchLobbyCmd_S): void;
    /**比赛场获取报名时间 */
    function OnGetEnrollConditionLobbyCmd_S(rev: Cmd.GetEnrollConditionLobbyCmd_S): void;
    /**比赛场获取人数排行 */
    function OnGetJoinMatchRankLobbyCmd_S(rev: Cmd.GetJoinMatchRankLobbyCmd_S): void;
    /**比赛场异常补偿弹窗 */
    function OnSendMatchAbnormalLobbyCmd_Brd(rev: Cmd.SendMatchAbnormalLobbyCmd_Brd): void;
    /**服务器返回比赛场点击获取玩家数量 */
    function OnGetJoinMatchUserCountCmd_S(rev: Cmd.GetJoinMatchUserCountCmd_S): void;
    /**金币场用户签到消息回复 */
    function OnUserSignInfoLobbyCmd_S(rev: Cmd.UserSignInfoLobbyCmd_S): void;
    /**金币场用户今日签到返回 */
    function OnUserSignTodayLobbyCmd_S(rev: Cmd.UserSignTodayLobbyCmd_S): void;
    /**用户累计签到奖励 */
    function OnUserSignContinueLobbyCmd_S(rev: Cmd.UserSignContinueLobbyCmd_S): void;
    /**获取排行榜信息回复 */
    function OnGetListRankCmd_S(rev: Cmd.GetListRankCmd_S): void;
    /**获取大赢家排行榜奖励回复 */
    function OnGetWinChipsRankRewardCmd_S(rev: Cmd.GetWinChipsRankRewardCmd_S): void;
    /**金币场进入免费金币界面 */
    function OnIntoFreeGoldLobbyCmd_S(rev: Cmd.IntoFreeGoldLobbyCmd_S): void;
    /**金币场领取vip礼包 */
    function OnGetVipRewardLobbyCmd_S(rev: Cmd.GetVipRewardLobbyCmd_S): void;
    /**金币场领取指定任务奖励 */
    function OnGetDaysTaskRewardLobbyCmd_S(rev: Cmd.GetDaysTaskRewardLobbyCmd_S): void;
    /**破产补助弹框 */
    function OnSendBankruptcyLobbyCmd_Brd(rev: Cmd.SendBankruptcyLobbyCmd_Brd): void;
    /**返回自己的所有匹配号 */
    function OnReturnMatchGroupCmd_S(rev: Cmd.ReturnMatchGroupCmd_S): void;
    /**申请白名单消息列表,玩家请求后主动推给匹配主 */
    function OnJoinMemberListMatchGroupCmd_S(rev: Cmd.JoinMemberListMatchGroupCmd_S): void;
    /**返回黑白名单 */
    function OnReturnMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnMemberInfoMatchGroupCmd_S): void;
    /**返回参赛人员战绩列表 */
    function OnPlayedListMatchGroupCmd_S(rev: Cmd.PlayedListMatchGroupCmd_S): void;
    function OnGetReliefPayStatusLobbyCmd_S(rev: Cmd.GetReliefPayStatusLobbyCmd_S): void;
    /**幸运翻翻翻 */
    function OnGetLuckTurnCardShowInfoV3LobbyCmd_S(rev: Cmd.GetLuckTurnCardShowInfoV3LobbyCmd_S): void;
    /**幸运翻翻翻结果 */
    function OnGetLuckTurnCardRewardV3LobbyCmd_S(rev: Cmd.GetLuckTurnCardRewardV3LobbyCmd_S): void;
    /**限时优惠面板 */
    function OnLimitOfferChipsLobbyCmd_S(rev: Cmd.LimitOfferChipsLobbyCmd_S): void;
    /**限时优惠面板 */
    function OnGetLimitOfferChipsLobbyCmd_S(rev: Cmd.GetLimitOfferChipsLobbyCmd_S): void;
    /**首冲界面 */
    function OnFirstRechargeInfoLobbyCmd_S(rev: Cmd.FirstRechargeInfoLobbyCmd_S): void;
    /**快速开始 */
    function OnQuickStartGameLobbyCmd_S(rev: Cmd.QuickStartGameLobbyCmd_S): void;
    function OnActiveCreateRoomCmd_S(rev: Cmd.ActiveCreateRoomCmd_S): void;
    /**礼包兑换码 */
    function OnUserGiftCodeLobbyCmd_S(rev: Cmd.UserGiftCodeLobbyCmd_S): void;
    /**领取首充礼包 */
    function OnReceiveFirstRechargeLobbyCmd_S(rev: Cmd.ReceiveFirstRechargeLobbyCmd_S): void;
    /**判断是否可以加入游戏 */
    function OnJudgeEnterGameLobbyCmd_S(rev: Cmd.JudgeEnterGameLobbyCmd_S): void;
    /**
     *  Echo应答,客户端探测服务器
     *  TODO,还未使用,待升级
     */
    function OnClientEchoRoomCmd_SC(rev: Cmd.ClientEchoRoomCmd_SC): void;
    /**好彩返回之前的游戏 */
    function OnReturnHaoCaiGameLobbyCmd_S(rev: Cmd.ReturnHaoCaiGameLobbyCmd_S): void;
    /**好彩获取魅力值排行榜 */
    function OnGetUserCpRankListLobbyCmd_S(rev: Cmd.GetUserCpRankListLobbyCmd_S): void;
    /**好友获取好友列表 */
    function OnGetFriendListLobbyCmd_S(rev: Cmd.GetFriendListLobbyCmd_S): void;
    /**删除好友 */
    function OnRemoveFriendLobbyCmd_S(rev: Cmd.RemoveFriendLobbyCmd_S): void;
    /**查找好友界面 */
    function OnSearchFriendsListLobbyCmd_S(rev: Cmd.SearchFriendsListLobbyCmd_S): void;
    /**好友聊天 */
    function OnFriendChatLobbyCmd_S(rev: Cmd.FriendChatLobbyCmd_S): void;
    /**获得金币场战绩 */
    function OnGetCoinGameRecordLobbyCmd_S(rev: Cmd.GetCoinGameRecordLobbyCmd_S): void;
    /**获取礼品券 */
    function OnGetGiftVoucherLobbyCmd_S(rev: Cmd.GetGiftVoucherLobbyCmd_S): void;
    /**兑换礼品券记录个人信息 */
    function OnExchangeGiftVoucherRecordUserInfoLobby_S(rev: Cmd.ExchangeGiftVoucherRecordUserInfoLobby_S): void;
    /**好友申请列表 */
    function OnGetFriendApplyListLobbyCmd_S(rev: Cmd.GetFriendApplyListLobbyCmd_S): void;
    /**统一，拒绝好友申请 */
    function OnDealFriendApplyListLobbyCmd_S(rev: Cmd.DealFriendApplyListLobbyCmd_S): void;
    /**绑定手机成功 */
    function OnBindingMobilePhoneLobbyCmd_S(rev: Cmd.BindingMobilePhoneLobbyCmd_S): void;
    /**获取红包信息 */
    function OnGetRedPackInfoLobbyCmd_S(rev: Cmd.GetRedPackInfoLobbyCmd_S): void;
    /**抢红包 */
    function OnGrabRedPackLobbyCmd_S(rev: Cmd.GrabRedPackLobbyCmd_S): void;
    /**红包累计奖励 */
    function OnGetMyRedPackRewardLobbyCmd_S(rev: Cmd.GetMyRedPackRewardLobbyCmd_S): void;
    /**兑换红包 */
    function OnExchangeRedPackLobbyCmd_S(rev: Cmd.ExchangeRedPackLobbyCmd_S): void;
    /**兑换红包 */
    function OnGetUserVipInfoLobbyCmd_S(rev: Cmd.GetUserVipInfoLobbyCmd_S): void;
    /**请求转盘信息回复 */
    function OnGetInfoTurnTableCmd_S(rev: Cmd.GetInfoTurnTableCmd_S): void;
    /**请求转盘信息回复 */
    function OnTurnTurnTableCmd_S(rev: Cmd.TurnTurnTableCmd_S): void;
    /**领取转盘累计奖励 */
    function OnGetCumulativeRewordTurnTableCmd_S(rev: Cmd.GetCumulativeRewordTurnTableCmd_S): void;
    /**请求邮件列表 */
    function OnGetListMailCmd_S(rev: Cmd.GetListMailCmd_S): void;
    /**查看指定邮件 */
    function OnReadMailCmd_S(rev: Cmd.ReadMailCmd_S): void;
    /**删除指定邮件 */
    function OnDeleteMailCmd_S(rev: Cmd.DeleteMailCmd_S): void;
    /**领取指定邮件内的奖励 */
    function OnGetMailRewardCmd_S(rev: Cmd.GetMailRewardCmd_S): void;
    /**邮件批量操作 */
    function OnBulkOperationMailCmd_S(rev: Cmd.BulkOperationMailCmd_S): void;
    /**游戏按钮红点 */
    function OnShowRedPointLobbyCmd_S(rev: Cmd.ShowRedPointLobbyCmd_S): void;
    /**当累计金额发生变化时，服务器会主动推送 */
    function OnGetTotalRedPackMoneyLobbyCmd_S(rev: Cmd.GetTotalRedPackMoneyLobbyCmd_S): void;
    /**新用户红包界面 */
    function OnGetNewUserRedPackShowLobbyCmd_S(rev: Cmd.GetNewUserRedPackShowLobbyCmd_S): void;
    /**领取新手红包 */
    function OnExchangeNewUserRedPackLobbyCmd_S(rev: Cmd.ExchangeNewUserRedPackLobbyCmd_S): void;
    /**话费券兑换红包界面 */
    function OnGetCCRedPackShowLobbyCmd_S(rev: Cmd.GetCCRedPackShowLobbyCmd_S): void;
    /**话费券兑换红包 */
    function OnExchangeCCRedPackLobbyCmd_S(rev: Cmd.ExchangeCCRedPackLobbyCmd_S): void;
    /**返利红包界面 */
    function OnGetRechargeRedPackShowLobbyCmd_S(rev: Cmd.GetRechargeRedPackShowLobbyCmd_S): void;
    /**兑换返利红包 */
    function OnExchangeRechargeRedPackLobbyCmd_S(rev: Cmd.ExchangeRechargeRedPackLobbyCmd_S): void;
    /**玩家获得红包明细 */
    function OnGetUserGetRedPackInfoLobbyCmd_S(rev: Cmd.GetUserGetRedPackInfoLobbyCmd_S): void;
    /**提现记录 */
    function OnGetDrawCashRecordLobbyCmd_S(rev: Cmd.GetDrawCashRecordLobbyCmd_S): void;
    /**红包提现 */
    function OnRedPackDrawCashLobbyCmd_S(rev: Cmd.RedPackDrawCashLobbyCmd_S): void;
    /**新版幸运翻翻翻主界面 */
    function OnNewLuckTurnCardShowLobbyCmd_S(rev: Cmd.NewLuckTurnCardShowLobbyCmd_S): void;
    /**新版幸运翻翻翻翻牌 */
    function OnNewGetLuckTurnCardRewardLobbyCmd_S(rev: Cmd.NewGetLuckTurnCardRewardLobbyCmd_S): void;
    /**获取弹窗公告 */
    function OnGetPopupBroadListLobbyCmd_S(rev: Cmd.GetPopupBroadListLobbyCmd_S): void;
    /**获取弹窗公告 */
    function OnReadPopBroadLobbyCmd_S(rev: Cmd.ReadPopBroadLobbyCmd_S): void;
    /**进游戏顺序弹窗 */
    function OnSequentialPopupsLobbyCmd_S(rev: Cmd.SequentialPopupsLobbyCmd_S): void;
    /**获取百宝箱数据 */
    function OnGetTreasureBoxShowInfoLobbyCmd_S(rev: Cmd.GetTreasureBoxShowInfoLobbyCmd_S): void;
    /**领取百宝箱任务奖励 */
    function OnGetTreasureBoxTaskLotteryLobbyCmd_S(rev: Cmd.GetTreasureBoxTaskLotteryLobbyCmd_S): void;
    /**百宝箱转动抽奖 */
    function OnTurnTreasureBoxLotteryLobbyCmd_S(rev: Cmd.TurnTreasureBoxLotteryLobbyCmd_S): void;
    function OnIntoInviteRankLobbyCmd_S(rev: Cmd.IntoInviteRankLobbyCmd_S): void;
    /**福建的代理商界面 */
    function OnIntoHigherAgentLobbyCmd_S(rev: Cmd.IntoHigherAgentLobbyCmd_S): void;
    /**福建代理返回 */
    function OnEnquireBindAgent2LobbyCmd_S(rev: Cmd.EnquireBindAgent2LobbyCmd_S): void;
    /**丹东代理界面 */
    function OnGetParentLobbyCmd_S(rev: Cmd.GetParentLobbyCmd_S): void;
    /**余款数量更新 */
    function OnBankMoneyUpdate_S(rev: Cmd.BankMoneyUpdate_S): void;
    /**保险箱返回 */
    function OnAccessBankChipsLobbyCmd_S(rev: Cmd.AccessBankChipsLobbyCmd_S): void;
    /**实名认证 */
    function OnAuthenticationLobbyCmd_S(rev: Cmd.AuthenticationLobbyCmd_S): void;
    /**
     *  C-&gt;S 获取邮件列表请求
     *  S-&gt;C 邮件列表更新
     */
    function OnGetListMailCmd_CS(rev: Cmd.GetListMailCmd_CS): void;
    /**
     * 新邮件广播
     */
    function OnNewMailCmd_Brd(rev: Cmd.NewMailCmd_Brd): void;
    /**
     *  C-&gt;S 删除指定邮件请求
     *  S-&gt;C 删除指定邮件通知
     */
    function OnDeleteMailCmd_CS(rev: Cmd.DeleteMailCmd_CS): void;
    /**
     *  C-&gt;S 查看指定邮件请求
     *  S-&gt;C 查看完成指定邮件通知
     */
    function OnReadMailCmd_CS(rev: Cmd.ReadMailCmd_CS): void;
    /**
     *  C-&gt;S 获取邮件的东西请求
     *  S-&gt;C 已获取邮件东西通知
     */
    function OnGetItemMailCmd_CS(rev: Cmd.GetItemMailCmd_CS): void;
    /**商城购买相关 */
    function OnBuyGoodsLobbyCmd_S(rev: Cmd.BuyGoodsLobbyCmd_S): void;
    /**退出房间面板 */
    function OnQuitGameShowLobbyCmd_S(rev: Cmd.QuitGameShowLobbyCmd_S): void;
    /**
    * 实名认证
    */
    function OnAuthenticationLobbyCmd_CS(rev: Cmd.AuthenticationLobbyCmd_CS): void;
    /**
     * 提现记录
     */
    function OnCashWithdrawalLobbyCmd_S(rev: Cmd.CashWithdrawalLobbyCmd_S): void;
    /**
     * 提现记录
     */
    function OnGetCashWithdrawalRecordLobbyCmd_S(rev: Cmd.GetCashWithdrawalRecordLobbyCmd_S): void;
    /**
     * 获取服务器发来的玩家头像数据
     */
    function OnGetUserHeadList_S(rev: Cmd.GetUserHeadList_S): void;
    /**
     * 获取黄名单列表
     */
    function OnReturnYellowMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnYellowMemberInfoMatchGroupCmd_S): void;
    /**放弃摇一摇 */
    function OnAbandonShakeLobbyCmd_S(rev: Cmd.AbandonShakeLobbyCmd_S): void;
    /**打开摇一摇界面 */
    function OnGetShakeBaseInfoLobbyCmd_S(rev: Cmd.GetShakeBaseInfoLobbyCmd_S): void;
    /**摇一摇中奖返回数据 */
    function OnGetShakeResultLobbyCmd_S(rev: Cmd.GetShakeResultLobbyCmd_S): void;
    /**获取收货地址 */
    function OnGetShippingAddressLobby_S(rev: Cmd.GetShippingAddressLobby_S): void;
    /**填写或者修改收货地址 */
    function OnChangeShippingAddressLobby_S(rev: Cmd.ChangeShippingAddressLobby_S): void;
    /**领取累计待领取的时效性金币 */
    function OnRevTimeChipsLobbyCmd_S(rev: Cmd.RevTimeChipsLobbyCmd_S): void;
    /**购买头像框，周卡/月卡等时效性道具 */
    function OnBuyTimeGoodsLobbyCmd_S(rev: Cmd.BuyTimeGoodsLobbyCmd_S): void;
    /**
     * 大厅微信红包雨
     */
    function OnGrabRedPackLobbyCmd_Brd(rev: Cmd.GrabRedPackLobbyCmd_Brd): void;
    /**
     * 改变匹配号属性
     */
    function OnChangeMatchGroupCmd_S(rev: Cmd.ChangeMatchGroupCmd_S): void;
    /**
     * 历史匹配组列表
     */
    function OnHistoryMatchIdListMatchGroupCmd_S(rev: Cmd.HistoryMatchIdListMatchGroupCmd_S): void;
    /**
     * 官方匹配组列表
     */
    function OnPublicMatchIdListMatchGroupCmd_S(rev: Cmd.PublicMatchIdListMatchGroupCmd_S): void;
    /**
     * 冠名赛列表
     */
    function OnOfficialMatchIdListMatchGroupCmd_S(rev: Cmd.OfficialMatchIdListMatchGroupCmd_S): void;
    /**
     * 返回等待列表
     */
    function OnWaitUserListMatchGroupCmd_S(rev: Cmd.WaitUserListMatchGroupCmd_S): void;
    function OnRequestJoinMemberMatchGroupCmd_S(rev: Cmd.RequestJoinMemberMatchGroupCmd_S): void;
    /**返回商城列表 */
    function OnShopPointListLobbyCmd_S(rev: Cmd.ShopPointListLobbyCmd_S): void;
    /**返回抽奖结果 */
    function OnLuckShopPointItemLobbyCmd_CS(rev: Cmd.LuckShopPointItemLobbyCmd_CS): void;
    /** 绑定微信联系信息*/
    function OnWechatLobbyCmd_CS(rev: Cmd.WechatLobbyCmd_CS): void;
    /**
     * 俱乐部数据更新（德扑大厅）
     */
    function OnUpdateInfoClubCmd_S(rev: Cmd.UpdateInfoClubCmd_S): void;
    /**
     * 俱乐部查询
     */
    function OnSearchClubCmd_CS(rev: Cmd.SearchClubCmd_CS): void;
    /**通知前端上发获取经度纬度 */
    function OnGetGPSLocationCmd_S(rev: Cmd.GetGPSLocationCmd_S): void;
    /**返回所有俱乐部组信息*/
    function OnHistoryClubListMatchGroupCmd_S(rev: Cmd.HistoryClubListMatchGroupCmd_S): void;
    /**
     * 玩家压注数据统计
     */
    function OnStatisticsRoundQueryCmd_CS(rev: Cmd.StatisticsRoundQueryCmd_CS): void;
    /**
     * 房间牌谱列表
     */
    function OnRoundRecordRoomQueryCmd_CS(rev: Cmd.RoundRecordRoomQueryCmd_CS): void;
    /**
     *请求收藏牌谱
     */
    function OnRoundRecordQueryMyCmd_CS(rev: Cmd.RoundRecordQueryMyCmd_CS): void;
    /**
     * 聊天消息
     */
    function OnChatCmd_CS(rev: Cmd.ChatCmd_CS): void;
    /**
     * 报名更新通知
     */
    function OnSignListUpdateCmd_CS(rev: Cmd.SignListUpdateCmd_CS): void;
    /**
     * 我的牌局
     */
    function OnMyGamesUpdateCmd_CS(rev: Cmd.MyGamesUpdateCmd_CS): void;
    /**
     * 游戏内货币数量改变通知
     */
    function OnUpdatePointSeatRoom_S(rev: Cmd.UpdatePointSeatRoom_S): void;
    /**
     * 请求玩家信息
     */
    /**
     * 请求玩家信息,德州扑克
     */
    function OnGetUserFullInfoCmd_CS(rev: Cmd.GetUserFullInfoCmd_CS): void;
    /**
     * 离开匹配组返回
     */
    function OnLeaveMatchGroup2Cmd_S(rev: Cmd.LeaveMatchGroup2Cmd_S): void;
    /**
     * 新年活动 领取奖励
     */
    function OnGetAuspiciousDogRewardsLobbyCmd_S(rev: Cmd.GetAuspiciousDogRewardsLobbyCmd_S): void;
    /**
     * 瑞狗迎春界面
     */
    function OnGetAuspiciousDogInfoLobbyCmd_S(rev: Cmd.GetAuspiciousDogInfoLobbyCmd_S): void;
    /**
     * 新年活动 记录面板
     */
    function OnGetAuspiciousDogRecordsLobbyCmd_S(rev: Cmd.GetAuspiciousDogRecordsLobbyCmd_S): void;
    /**红包领取失败 */
    function OnOpenRedPackFailLobbyCmd_S(rev: Cmd.OpenRedPackFailLobbyCmd_S): void;
    /**
     * 捐献历史记录返回
     */
    function OnDonateHistoryMatchRoomCmd_S(rev: Cmd.DonateHistoryMatchRoomCmd_S): void;
    /**
     * 获取标签列表
     */
    function OnTagListCmd_CS(rev: Cmd.TagListCmd_CS): void;
    /**
     * 标签列表更新
     */
    function OnTagUpdateCmd_CS(rev: Cmd.TagUpdateCmd_CS): void;
    /**
     * 给玩家添加标签
     */
    function OnTagUserCmd_CS(rev: Cmd.TagUserCmd_CS): void;
    /**
     * 俱乐部基金更新
     */
    function OnFundInfoUpdateCmd_S(rev: Cmd.FundInfoUpdateCmd_S): void;
    /**消息更新 */
    function OnNotificationUpdateLobbyCmd_CS(rev: Cmd.NotificationUpdateLobbyCmd_CS): void;
    /**茶馆里的房间状态变化 */
    function OnRoomStateMatchGroupCmd_S(rev: Cmd.RoomStateMatchGroupCmd_S): void;
    /**进入报名界面通知 */
    function OnSignEnterCmd_S(rev: Cmd.SignEnterCmd_S): void;
    /**俱乐部数据更新 */
    function OnReturnClubInfoClubCmd_S(rev: Cmd.ReturnClubInfoClubCmd_S): void;
    /**进入俱乐部需要弹出申请备注流程 */
    function OnNotifyImportNoteCmd_S(rev: Cmd.NotifyImportNoteCmd_S): void;
    /**赛事信息 */
    function OnEventInfoMatchGroupCmd_S(rev: Cmd.EventInfoMatchGroupCmd_S): void;
    /**创建房间更新请求 */
    function OnRoomCreateConfigUpdateCmd_CS(rev: Cmd.RoomCreateConfigUpdateCmd_CS): void;
    /**请求赛事报名信息 */
    function OnEntryInfoEventMatchGroupCmd_S(rev: Cmd.EntryInfoEventMatchGroupCmd_S): void;
    /**转账数据更新 */
    function OnTransitMoneyQueryClubCmd_CS(rev: Cmd.TransitMoneyQueryClubCmd_CS): void;
    /**俱乐部牌局更新 */
    function OnGameUpdateClubCmd_CS(rev: Cmd.GameUpdateClubCmd_CS): void;
    /**
    * 获取奖池数据
    */
    function OnJackpotItemListLobbyCmd_S(rev: Cmd.JackpotItemListLobbyCmd_S): void;
    /**
    * 刷新奖池总金额
    */
    function OnJackpotNumLobbyCmd_S(rev: Cmd.JackpotNumLobbyCmd_S): void;
    /**向服务器发招商消息 */
    function OnRecruitAgentCmd_CS(rev: Cmd.RecruitAgentCmd_CS): void;
    /** 账号绑定其他登录方式*/
    function OnBindAccountLobbyCmd_S(rev: Cmd.BindAccountLobbyCmd_S): void;
    /** 验证指定验证码*/
    function OnVerifyIdentifyCodeLobbyCmd_S(rev: Cmd.VerifyIdentifyCodeLobbyCmd_S): void;
    /** 账号获取邮箱验证*/
    function OnGetGuestBindEmailIdentifyCodeLobbyCmd_S(rev: Cmd.GetGuestBindEmailIdentifyCodeLobbyCmd_S): void;
    /** 账号绑定邮箱*/
    function OnGuestBindEmailLobbyCmd_S(rev: Cmd.GuestBindEmailLobbyCmd_S): void;
    /** 设置俱乐部税收*/
    function OnSetTaxMatchGroupCmd_S(rev: Cmd.SetTaxMatchGroupCmd_S): void;
    /** bashi加入俱乐部*/
    function OnBSClubJoinCmd_CS(rev: Cmd.BSClubJoinCmd_CS): void;
    /** bashi退出俱乐部*/
    function OnBSClubExitCmd_CS(rev: Cmd.BSClubExitCmd_CS): void;
    /** bashi登录俱乐部*/
    function OnBSClubLoginCmd_CS(rev: Cmd.BSClubLoginCmd_CS): void;
    /** bashi俱乐部详情*/
    function OnBSClubInfoCmd_CS(rev: Cmd.BSClubInfoCmd_CS): void;
    /** bashi创建俱乐部*/
    function OnBSClubCreateCmd_CS(rev: Cmd.BSClubCreateCmd_CS): void;
    /** bashi管理俱乐部*/
    function OnBSClubManageCmd_CS(rev: Cmd.BSClubManageCmd_CS): void;
    /** bashi俱乐部成员*/
    function OnBSClubMemberListCmd_CS(rev: Cmd.BSClubMemberListCmd_CS): void;
    /** bashi俱乐部成员查找*/
    function OnBSClubMemberFindCmd_CS(rev: Cmd.BSClubMemberFindCmd_CS): void;
    /** bashi赠送金币*/
    function OnBSClubGiftGoldCmd_CS(rev: Cmd.BSClubGiftGoldCmd_CS): void;
    /** bashi使用礼卷*/
    function OnBSClubUseCouponCmd_CS(rev: Cmd.BSClubUseCouponCmd_CS): void;
    /**查询俱乐部总战绩 */
    function OnStatisticsRoomLabelQueryCmd_CS(rev: Cmd.StatisticsRoomLabelQueryCmd_CS): void;
    /**数据更新通知 */
    function OnDataUpdateNotifyCmd_S(rev: Cmd.DataUpdateNotifyCmd_S): void;
    /**大厅所有游戏在线人数 */
    function OnAllGamePlayerOnlineNumberLobby_CS(rev: Cmd.AllGamePlayerOnlineNumberLobby_CS): void;
    /**俱乐部成员跟新 */
    function OnMemberUpdateClubCmd_CS(rev: Cmd.MemberUpdateClubCmd_CS): void;
    /**俱乐部申请更新 */
    function OnApplicantUpdateClubCmd_CS(rev: Cmd.ApplicantUpdateClubCmd_CS): void;
    /**转账更新 */
    function OnTransitMoneyDealClubCmd_CS(rev: Cmd.TransitMoneyDealClubCmd_CS): void;
    /**奖池抽奖结果返回*/
    function OnGetJackpotItemLobbyCmd_S(rev: Cmd.GetJackpotItemLobbyCmd_S): void;
    /**奖池排行榜返回*/
    function OnJackpotOrderLobbyCmd_S(rev: Cmd.JackpotOrderLobbyCmd_S): void;
    /**红点移除通知 */
    function OnRemoveRedPointLobbyCmd_CS(rev: Cmd.RemoveRedPointLobbyCmd_CS): void;
    /**俱乐部公告 */
    function OnClubNoticeMatchGroupCmd_CS(rev: Cmd.ClubNoticeMatchGroupCmd_CS): void;
    /**查找指定玩家 */
    function OnUserInfoSearchLobbyCmd_S(rev: Cmd.UserInfoSearchLobbyCmd_S): void;
    /**俱乐部指定玩家 */
    function OnMemberInfoGetClubCmd_CS(rev: Cmd.MemberInfoGetClubCmd_CS): void;
    /**俱乐部创建者 */
    function OnFounderInfoUpdateClubCmd_S(rev: Cmd.FounderInfoUpdateClubCmd_S): void;
    /**牌局消息处理结果 */
    function OnGameMessageDealCmd_CS(rev: Cmd.GameMessageDealCmd_CS): void;
    /**绑定代理提示*/
    function OnRequestBindAgentMatchGroupCmd_S(rev: Cmd.RequestBindAgentMatchGroupCmd_S): void;
    /**新牌局消息通知 */
    function OnGameMessageNotifyUpdateCmd_CS(rev: Cmd.GameMessageNotifyUpdateCmd_CS): void;
    /**新牌局消息 */
    function OnGameMessageUpdateCmd_CS(rev: Cmd.GameMessageUpdateCmd_CS): void;
    /**检查能否转账 */
    function OnBSClubCanTransferCmd_CS(rev: Cmd.BSClubCanTransferCmd_CS): void;
    /**使用点卡 */
    function OnBSClubUseCardCmd_CS(rev: Cmd.BSClubUseCardCmd_CS): void;
    /**系统设置 */
    function OnSystemSettingsLobbyCmd_CS(rev: Cmd.SystemSettingsLobbyCmd_CS): void;
    /**俱乐部货币兑换 */
    function OnExchangeMoneyClubCmd_CS(rev: Cmd.ExchangeMoneyClubCmd_CS): void;
    /**赠送金币回复 */
    function OnExchangeCoinLobby_S(rev: Cmd.ExchangeCoinLobby_S): void;
    /**查看牌谱 */
    function OnRoundRecordCheckCmd_CS(rev: Cmd.RoundRecordCheckCmd_CS): void;
    /**房间结算数据 */
    function OnStatisticsRoomDataCheckCmd_CS(rev: Cmd.StatisticsRoomDataCheckCmd_CS): void;
    /**牌局生成器通知 */
    function OnRoomGeneratorUpdateClubCmd_CS(rev: Cmd.RoomGeneratorUpdateClubCmd_CS): void;
    /**查找昵称回复 */
    function OnGetUserNickNameLobby_S(rev: Cmd.GetUserNickNameLobby_S): void;
    /**玩家赠送金币信息 */
    function OnGetUserGiftCoinInfoLobbyCmd_S(rev: Cmd.GetUserGiftCoinInfoLobbyCmd_S): void;
    /**返回购买历史*/
    function OnReturnOrderListLobbyCmd_S(rev: Cmd.ReturnOrderListLobbyCmd_S): void;
    /**历史数据更新（大厅）*/
    function OnHistoryUpdateLobbyCmd_CS(rev: Cmd.HistoryUpdateLobbyCmd_CS): void;
    /**玩家游戏历史数据更新（大厅）*/
    function OnUserGameHistoryUpdateLobbyCmd_CS(rev: Cmd.UserGameHistoryUpdateLobbyCmd_CS): void;
    /**刷新比赛场游戏内排名数据*/
    function OnMyOrderEventMatchGroupCmd_S(rev: Cmd.MyOrderEventMatchGroupCmd_S): void;
    function OnTransitMoneyClubCmd_CS(rev: Cmd.TransitMoneyClubCmd_CS): void;
    /**设置俱乐部管理员 */
    function OnPostUpdateClubCmd_CS(rev: Cmd.PostUpdateClubCmd_CS): void;
    /**上下级代理关系 */
    function OnAgentRelationLineQueryClubCmd_CS(rev: Cmd.AgentRelationLineQueryClubCmd_CS): void;
    function OnAgentAvailableGiveMemberQueryClubCmd_CS(rev: Cmd.AgentAvailableGiveMemberQueryClubCmd_CS): void;
    function OnAgentCreditChangeClubCmd_CS(rev: Cmd.AgentCreditChangeClubCmd_CS): void;
    function OnUnionCreateClubCmd_CS(rev: Cmd.UnionCreateClubCmd_CS): void;
    function OnUnionJoinRequestClubCmd_CS(rev: Cmd.UnionJoinRequestClubCmd_CS): void;
    function OnUnionEditClubCmd_CS(rev: Cmd.UnionEditClubCmd_CS): void;
    function OnUnionUpdateClubCmd_CS(rev: Cmd.UnionUpdateClubCmd_CS): void;
    function OnUnionApplicantUpdateClubCmd_CS(rev: Cmd.UnionApplicantUpdateClubCmd_CS): void;
    function OnUnionMemberUpdateClubCmd_CS(rev: Cmd.UnionMemberUpdateClubCmd_CS): void;
    function OnUnionFundInfoUpdateCmd_S(rev: Cmd.UnionFundInfoUpdateCmd_S): void;
    function OnUnionFundDistributeQueryClubCmd_CS(rev: Cmd.UnionFundDistributeQueryClubCmd_CS): void;
    function OnUnionStatisticsRoomQueryClubCmd_CS(rev: Cmd.UnionStatisticsRoomQueryClubCmd_CS): void;
    function OnUnionStatisticsSumQueryClubCmd_CS(rev: Cmd.UnionStatisticsSumQueryClubCmd_CS): void;
    function OnAgentStatisticsRoomQueryClubCmd_CS(rev: Cmd.AgentStatisticsRoomQueryClubCmd_CS): void;
    function OnMemberGameDataSumClubCmd_CS(rev: Cmd.MemberGameDataSumClubCmd_CS): void;
    function OnMemberQueryClubCmd_CS(rev: Cmd.MemberQueryClubCmd_CS): void;
    function OnAgentCreditChangeQueryClubCmd_CS(rev: Cmd.AgentCreditChangeQueryClubCmd_CS): void;
    function OnAgentStatisticsRoomCheckClubCmd_CS(rev: Cmd.AgentStatisticsRoomCheckClubCmd_CS): void;
    function OnAgentAvailableUplineQueryClubCmd_CS(rev: Cmd.AgentAvailableUplineQueryClubCmd_CS): void;
}
declare module Pmd {
    function OnCreatePlatOrderReturnSdkPmd_S(rev: Pmd.CreatePlatOrderReturnSdkPmd_S): boolean;
    function OnNotifyRechargeRequestSdkPmd_S(rev: Pmd.NotifyRechargeRequestSdkPmd_S): void;
}

declare module MJLobby {
    /**
     * 启动命令
     */
    class LobbyStartUpCommand extends Command {
        constructor();
        init(): void;
        destory(): void;
        private onEventHandle(evt);
        private gameStart(evt);
        private getLastGameId(evt);
        execute(notification: puremvc.INotification): void;
        private initController();
        private initMediator();
        private initProxy();
    }
}

declare module MJLobby {
    class VideoStartUp {
        constructor();
        private _timer;
        private _startTime;
        /**播过的录像 */
        private _lookedVideo;
        /**json数组 */
        private _videoArr;
        private _stopVideo;
        private _pauseTime;
        private _lastTime;
        private isFirst;
        private isAdvance;
        /**录像类型 0麻将 1十三水 2 跑得快 3斗地主 4 zqb牛牛 */
        private _videoType;
        start(type?: string): void;
        private videoStart(evt);
        private onMoon(evt);
        /**
         * 录像前进
         * num = 1代表手动前进  num = 0代表自动前进
         */
        private advanceVideo(num);
        /**过滤掉非主视角进房间消息 */
        private checkMainUid(uid);
        /**
        * 前进一步对数组数据进行操作
         */
        private advanceFunc();
        private backBtnVideo();
        private stopVideo();
        private resetVideo();
        destory(): void;
    }
}

declare module MJLobby {
    /**
     * 数据缓存
     */
    class LobbyDataCache {
        static langObj: any;
        static stageHight: number;
        static stageWidth: number;
        static defaultWidth: number;
        static defaultHeight: number;
        static costType: number;
        static imei: string;
        static version: string;
        static gameID: number;
        static shareNLast: number;
        static lobbyId: number;
        static bundleInfo: any;
        /**头像缓存组 */
        private static headUrlList;
        constructor();
        /**通过uid获取headURL */
        static getHeadUrlByUid(uid: number): string;
        /**添加headUrl */
        static addHeadUrl(userHead: Cmd.UserHead[]): void;
        /**寻找相同head */
        private static findIndex(uid);
    }
}

declare module MJLobby {
    /**
     * 弹出管理
     */
    class LobbyPopupManager {
        private static showList;
        constructor();
        /**
         * 显示弹出框
         * @param	target:显示对象
         * @param	modal:是否添加遮罩
         * @param	center:是否居中显示
         * @param	useEffect:是否缓动
         * @param	isTop:是否在最上层
         */
        static addPopUp(target: egret.DisplayObjectContainer, modal?: Boolean, center?: Boolean, useEffect?: Boolean, w?: number, h?: number, addClose?: boolean): void;
        /**
         * 移除弹出框
         * @param	target:显示对象
         * @param	useEffect:是否缓动
         * @param	removeMask:是否移除蒙版
         */
        static removePopUp(target: egret.DisplayObjectContainer, useEffect?: Boolean, removeMask?: boolean): void;
        private static removeTarget(target);
        /**
         * 轻提示
         */
        static showMildWarnShow(msg: string): LobbyMildAlertVC;
        private static removeStage(evt);
        private static getContainer();
        static showConfirmPanel(msg: string, btnlables: Array<string>, backFn: Array<Function>, title: string, backObj: any, countdown?: number, needClose?: boolean, size?: number, align?: string): void;
        static addMask(): void;
    }
}

declare module MJLobby {
    /**
     * 大厅显示信息
     */
    class MJLobbyInfo {
        static main: egret.DisplayObjectContainer;
        static stage: egret.Stage;
        static mainUILayer: egret.DisplayObjectContainer;
        static uiLayer: egret.DisplayObjectContainer;
        static topLayer: egret.DisplayObjectContainer;
        static userId: number;
        constructor();
        static destory(): void;
    }
}

declare module MJLobby {
    class ViewConfig {
        static mainMediatorName: string;
        static mainMediator: any;
        static loginPanelName: string;
        constructor();
    }
}

declare module MJLobby {
    class LobbyServerMJProxy extends Proxy {
        private static _instance;
        static NAME: string;
        private updatedConfig;
        private httpInitFailTimes;
        private gameId;
        private zoneId;
        private _timeOutId;
        constructor();
        static getInstance(): LobbyServerMJProxy;
        initServer(): void;
        loginOut(): void;
        /**
         * http平台登录完成
         */
        private onHttpInitSucc(obj);
        private onHttpInitFail(rev);
        private onDown(msg);
        /**
         * socket连接完成
         */
        private onSockInitSucc();
        private onGameGoon(e);
        private reconnct(e);
        sendData(obj: any): void;
        private onSockInitFail();
        private onConnectFail();
        private getRemoteConfig();
        private refresh();
        onRemove(): void;
        private onLoginServer();
        /**
         * 闲聊登陆失败后重新登录一遍微信
         */
        private onLogin(msg?);
    }
}

declare module MJLobby {
    class NetMgr extends uniLib.NetMgr {
        constructor();
    }
}

declare module MJLobby {
    class GameResUpdata {
        constructor();
        /**
         * 是否需要下载游戏资源
         */
        static isDownGame(gameId: number): boolean;
        /**
         * 指定游戏更新的资源文件
         */
        static m_ResChangedList: {
            [gameId: number]: Array<{
                url: string;
                size: number;
            }>;
        };
        /**
         * 指定游戏更新的资源文件
         */
        static GetResChangedList(gameId: number): Array<{
            url: string;
            size: number;
        }>;
        /**
         *native 资源版本文件 all.Manifest
         */
        private static m_allManifest;
        /**
         *native 资源版本文件 all.Manifest
         */
        static AllManifest: {
            [url: string]: {
                v: string;
                s: number;
            };
        };
        /**
         * 初始化 native 资源版本文件 all.Manifest
         */
        static LoadAllManifest(): void;
        /**
         * 获取指定游戏更新的文件
         */
        static GameUpdataResSize(gameId: number): number;
        /**
         * 获取游戏配置数据
         */
        static GetGameConfig(gameId: number): any;
        /**
         * bit转化为string
         */
        static BitToString(bit: number): string;
    }
}

declare module MJLobby {
    /**
     * 大厅数据
     */
    class MJLobbyData {
        private static _instance;
        myBaseInfo: Cmd.UserBaseInfo;
        private static _gameconfig;
        disclaimer: number;
        showFirst: number;
        isCreate: boolean;
        /**1:当前已经收到CreateRoomCmd_S消息了 2:当前已经收到EnterRoomCmd_S消息了  0:未收到这两个消息*/
        recInRoomData: number;
        isDLS: boolean;
        static lastOrder: uniLib.IOrderInfo;
        tgyId: number;
        private _createConfg;
        private _lobbyConfig;
        private _lobbyId;
        private _playTypeConfig;
        private _playTypeLabel;
        private _goodConfig;
        openingGameList: Array<number>;
        checkInVo: CheckInVo;
        showNotice: boolean;
        defaultSysMsg: string;
        private _gameCreateConfig;
        continueObj: Cmd.ApplyContinuePlayRoomCmd_Brd;
        hasShowGame: boolean;
        defaultGameId: number;
        noticeFee: number;
        recharge: number;
        /**第一次进入存取头像避免多次请求造成报错 */
        myDefaultHeadUrl: string;
        /**是否开放排行榜 */
        showRank: number;
        redPassword: string;
        /**每次是否第一次登陆 默认是true*/
        everyFirstLogin: boolean;
        /**江西客家vip */
        private _vipConfig;
        /**比赛场cofig */
        private _matchConfig;
        /**金币场config */
        private _coinConfig;
        /**金币场vip */
        private _coinVipConfig;
        /**全局查看录像房间id */
        globalRoomId: number;
        /**是否录像 */
        video: number;
        /**录像数据 */
        videoData: string;
        /**录像主视角uid */
        videoUID: number;
        /**游戏网关url,nginx代理用,让一个房间的人在一个nginx,防止被攻击 */
        gameGatewayUrl: string;
        /**是否审核模式 */
        isShenHe: boolean;
        /**今日排名 */
        todayRecord: Cmd.GetDayRankCmd_S;
        /**昨日排名 */
        yesterdayRecord: Cmd.GetDayRankCmd_S;
        /**排行榜类型 */
        rankType: number;
        /**免费活动时间 */
        freeTimes: number[];
        /**红包开奖活动 提现详情 */
        redpacket_DepositDetail: Cmd.openRecord[];
        /**红包开奖信息 */
        redpacket_info: Cmd.GetRedPackRewardInfoLobbyCmd_S;
        /**红包剩余金额 */
        redpacket_surplus: number;
        /**是否显示红包 */
        showRedpacket: number;
        /**是否自动弹出红包 */
        autoShowRedpacket: number;
        /**金币场选择游戏ID*/
        coinSelectGameId: number;
        /**大厅界面风格  用于不同大厅风格的二级界面
         * 默认为0  绿谷大厅1  金币场2  比赛场3 好彩真人麻将4
        */
        artStyle: number;
        /**风格不同y轴需要做不同的处理 */
        artStyleInitY: number;
        /**金币场vip可以点击的领取的奖励 */
        vipReward: Array<number>;
        /**金币场是否显示首充礼包 1显示*/
        firstRecharge: number;
        /**麻将进入消息存储 */
        private _userInfoSynLobby;
        /**
         * 显示游戏端特有loading
         */
        static ShowGameLoading: boolean;
        /**当前正在进入的gameId
         * 目前只用于捕鱼 进入捕鱼删除大厅资源
        */
        curGameId: number;
        /**游戏名 */
        curGameName: string;
        /**上次进入的gameId
         *好彩退出房间的时候游戏发给游戏的事件
        */
        lastGameId: number;
        /**上次进入游戏房间时间 */
        lastEnterRoomTime: number;
        /**是否存在官方充值存在 绑定代理商返钻 1表示存在 */
        bindRechargeRet: number;
        /**是否显示实名认证 0:不显示 1:显示*/
        authen: number;
        /**是否在预加载 */
        isLoading: boolean;
        /**好彩游戏存储按钮红点（未读）数据 */
        redPointData: Cmd.ShowRedPointLobbyCmd_S;
        /**最近一次的比配号和茶馆号 */
        lastMatchId: number;
        /**最近一次创建的房间 */
        lastRoomId: number;
        /**
         * 百人长loading
         */
        sceneLoading: any;
        /**游戏积分赛配置 */
        private _gameOfficalEventConfig;
        /**积分赛配置表 */
        private _tableOfficalEventConfig;
        /**积分赛奖励表 */
        private _tableRewardItemConfig;
        /**是否代理 */
        isAgent: boolean;
        /**代理类型 0不是代理*/
        agentType: number;
        /**是否有未处理俱乐部的消息 1表示有 */
        noHandle: number;
        /**麻将loading */
        mahjongLoading: any;
        /**是否开启瑞狗迎春活动 1开启*/
        ausDog: number;
        /**是否显示时时彩界面 1显示*/
        show_SSC: number;
        /**ping值 */
        ping: number;
        /**奖池总金额 */
        allJackPotNum: number;
        /**俱乐部桌面操作 1:管理  2:成员列表 3:申请列表 4:战况查询*/
        clubChoice: number;
        /**是否进入的是比赛场 */
        isInEventGame: boolean;
        /**闲聊的消息存储 */
        weijuMsg: uniLib.ZqEvent;
        private m_emailAddress;
        setEmailAddress(value: string): void;
        /**
         * 绑定邮箱
         */
        emailAddress: string;
        /**
         * 是否进入过任意游戏
         */
        entryGame: boolean;
        constructor();
        static getInstance(): MJLobbyData;
        static getGameConfigs(): uniLib.IGameConfig[];
        getRewardItemConfigById(id: number): any;
        getGameOfficalEventConfig(gameId: number): any;
        getGameOfficalEventConfigByMatchId(matchId: number): any;
        /**通过大厅Id获取赛事列表 */
        getGameOfficeEventConfigByLobbyId(lobbyId: number): any;
        getGameCreateConfig(gameId: number): any;
        getPlayTypeConfig(): any;
        getPlayTypeConfigById(id: number): any;
        lobbyId: number;
        gameCreateConfig: Array<any>;
        lobbyConfig: any;
        getLobbyConfig(): any;
        static getGameConfig(gameId: number): uniLib.IGameConfig;
        private setLobbyConfig();
        /**
         * 大厅发给游戏的赛事信息
         */
        private _eventData;
        eventData: Cmd.EventInfoMatchGroupCmd_S;
        /**
         * 获得游戏列表
         * @param type  0普通模式(不显示某些游戏) 1俱乐部    number类型用于以后扩展
         *  */
        getGameList(type?: number): Array<number>;
        getExerciseList(): Array<any>;
        getgetExerciseLabel(): Array<any>;
        getHundredList(): Array<any>;
        static getMahjongGameId(): number;
        static getConfigByGameId(gameId: number): uniLib.IGameConfig;
        /**江西客家vip */
        getVipConfig(): Array<any>;
        /**匹配场config */
        getMatchConfig(): Array<any>;
        /**金币场config */
        getCoinConfig(): Array<any>;
        /**金币场vipConfig */
        getCoinVipConfig(): any;
        /**获取登录消息 */
        userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;
        /**
         * 根据goodId来获取配表的
         */
        getGooIDName(goodId: number): string;
        /**获取当前选择金币场游戏的配置 */
        getCoinCofigBySeletGameId(): any;
        /**
         * 活动赛事表
         */
        getTableEventConfig(): Array<any>;
        private tableEventConfig;
        checkLoading(): boolean;
        /**预下载判断 */
        hasGameRes(gameId: number): boolean;
        /**获取支付方式 152微信支付 17苹果支付*/
        getPayplatId(): number;
        /**是否移除meditor监听 */
        isHaoCai(): boolean;
        /**公告时间控制
         * @param year 年
         * @param month 月
         * @param day 日
        */
        isShowNotice(year: number, month: number, day: number): boolean;
        /**
         * 定位服务
         */
        private _location;
        getGpsPosition(isJoin?: boolean): void;
        /**
         * 检验是否是新版本龙骨系统 true为5.0以上极速模式骨骼
         */
        checkFastDragon(): boolean;
        /**检查免费游戏和新游戏  返回0：正常什么都不显示 1免费游戏 2新游戏 3老友 4好彩*/
        checkFreeGame(gameId: number): number;
        /**
         * 主动获取IP上报IP
         */
        getIP(): void;
        /**
         * 闲聊信息存储或登陆
         */
        weiJULoginHandle(msg?: uniLib.ZqEvent): void;
        /**
        * 滤镜彩色过滤
        */
        static ColorFilter: egret.ColorMatrixFilter[];
        /**
         * 滤镜颜色还原
         **/
        static RevertColorFilter: egret.ColorMatrixFilter[];
        /**
         * 添加阴影
         **/
        static DropShadowFilter: egret.DropShadowFilter[];
        /**
         * 俱乐部数据【游戏端用】
         */
        private _clubInfo;
        clubInfo: Cmd.MemberInfoGetClubCmd_CS;
        /**
         * 新牌局消息
         */
        private _gameMessage;
        gameMessageNotify: Cmd.GameMessageNotifyUpdateCmd_CS;
        private _playRequestList;
        playRequestList: Cmd.GameMessage[];
        setPlayRequestList(data: Cmd.GameMessageUpdateCmd_CS): void;
        private updateList(list1, list2);
        private removeList(list1, list2);
        /**
         * 牌谱数据【德扑】
         */
        roundRecordCheck: Cmd.RoundRecordCheckCmd_CS;
        /**
         * 好友数据
         */
        friendsList: Cmd.GetFriendListLobbyCmd_S;
        /**闲聊分享链接 */
        getXianLiaoLink(): string;
    }
}

declare module MJLobby {
    /**
     * 比赛场数据
     */
    class MJLobbyMatchData {
        private static _instance;
        static getInstance(): MJLobbyMatchData;
        ticket: Array<Cmd.ticketObj>;
        medal: Array<Cmd.medalObj>;
        /**是否报名 */
        isEnroll: boolean;
        /**报名时间 */
        enrollTime: Array<string>;
        /**报名人数 */
        enrollNum: Array<number>;
    }
}

declare module MJLobby {
    /**
     * 邮件
     */
    class Mail {
        private static m_instance;
        static Instance: Mail;
        private m_mail;
        initMail(mails: Cmd.MailInfo[]): void;
        add(mail: Cmd.MailInfo): void;
        delete(id: number): void;
        changedMailState(id: number, state: Cmd.MailInfo.State): void;
        mailList: Array<Cmd.MailInfo>;
        clear(): void;
    }
}

declare module MJLobby {
    /**
     * 向大厅发送的消息队列 大厅启动后执行所有消息
     */
    class MessageQueue {
        private static m_instance;
        static Instance: MessageQueue;
        private m_message;
        push(message: MessageItem): void;
        message: Array<MessageItem>;
        clear(): void;
        call(): void;
    }
    class MessageItem {
        /**
         * 标题
         */
        title: string;
        /**
         * 文本内容
         */
        text: string;
        /**
         * 确定回调
         */
        confirmCallBack: () => void;
        /**
         * 取消回调
         */
        cancelCallBack: () => void;
    }
}

declare module MJLobby {
    /**
     * 签到数据
     */
    class CheckInVo {
        openSingIn: number;
        days: number;
        canGet: number;
        constructor();
    }
}

declare module MJLobby {
    class JoinRoomVo {
        gameId: number;
        roomId: number;
        globalRoomId: number;
        zoneId: number;
        shareInfo: Cmd.ShareInfo;
        video: number;
        videoUid: number;
        minLeaveRoomDiamond: number;
        fish_type: number;
        subGameId: number;
        roomType: number;
        /**大厅金币麻将资源 */
        mjResName: string;
        /**大厅id */
        lobbyId: number;
        /**匹配场还是开房场  不为空表示匹配场*/
        scene: number;
        /**开房人数 带给游戏 */
        baseUserNbr: number;
        /**匹配号 */
        matchId: number;
        /**网关地址 */
        gameGatewayUrl: string;
        constructor();
    }
}

declare module MJLobby {
    class ListVo {
        label: string;
        value: any;
        constructor();
    }
}

declare module MJLobby {
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

declare module MJLobby {
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

declare module MJLobby {
    /**
     *
     * @author
     *
     */
    class Loader extends egret.DisplayObjectContainer {
        private _url;
        private _width;
        private _height;
        constructor(url: string, w?: number, h?: number);
        private load();
        private onLoadComplete(event);
        private onLoadError();
    }
}

declare module MJLobby {
    class NetConsts {
        static SUCCESS: number;
        static PRIORITY: number;
        static FENGHAO: number;
        static TIXIAXIAN: number;
        constructor();
    }
}

declare module ui {
    /**
     *
     * @author
     *
     */
    class HSlide extends egret.Sprite {
        private track;
        private trackHighlight;
        private thumb;
        private thumbMaxX;
        private _minValue;
        private _maxValue;
        private _value;
        gap: number;
        private lastX;
        private touchX;
        constructor(trackName: string, thumbName: string, width: number, trackHighlightName?: string, scale9Grid1?: egret.Rectangle, scale9Grid2?: egret.Rectangle);
        private onTrackTouch(event);
        private onThumbTouch(event);
        private onStageMove(event);
        private onStageEnd(event);
        value: number;
        maxValue: number;
        minValue: number;
        updateThumbPos(num: number): void;
        private updateValue();
        private updatePos();
        private updateTrackHighlight();
        dispose(): void;
    }
}

declare module MJLobby {
    class LobbyUtils {
        static defaultColor: number;
        constructor();
        static getGoodNameByShopId(shopId: number): any;
        /**
         * 根据物品Id获取物品信息
         */
        static getGoodsConfigByGoodsId(goodId: number): any;
        static changeTimeToStr(num: number): string;
        private static getNumStr(num);
        static getBitmapFontTxt(fontName: string, w: number, align?: string, x?: number, y?: number): BitmapText;
    }
}

declare module MJLobby {
    /**
     *
     * @author
     *
     */
    class LobbyResUtil {
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
        static createBitmapByName(name: string, x?: number, y?: number): egret.Bitmap;
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
        static createTextFeild(color: number, align: string, text: string, size: number, x?: number, y?: number, width?: number, isBold?: boolean): egret.TextField;
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
        /**
         * 格式化数字
         */
        static numFormat2(num: number, decimal?: number): string;
        private static setDot(num, decimal?);
        /**
            超过10万，显示XX万。在大于10万，小于100万的时候，最多显示两位小数
            大于100万，小于1千万的时候，显示一位小数
            大于1千万小于1亿的时候，不显示小数。
            大于1亿小于100亿的时候显示2位小数。
            大于100亿之后不显示小数
         */
        /**麻将大厅货币规格 */
        static numberFormat(num: any): string;
    }
}

declare module MJLobby {
    /*****
     * 游戏内公用的消息跑马灯
     * */
    class CommonSysMsgMc extends LobbyBaseVc {
        private _msgTxt;
        private _noticeArr;
        private _txtMc;
        private _buffer;
        constructor();
        initUI(): void;
        private noticeTest();
        private startScroll();
        private scrollEnd();
        onNoticeCome(e: uniLib.ZqEvent): void;
        destory(): void;
    }
}

declare module Cmd {
    /**
     * 通用结果返回
     */
    class BSClubResult {
        /**
         * 返回码 1成功
         */
        Code: number;
        /**
         * 返回码描述
         */
        Message: string;
        GetType(): string;
    }
    /**
     * 登录俱乐部
     */
    class BSClubLoginCmd_CS {
        /**
         * 游戏账号ID
         */
        OutAccountId: number;
        /**
         * 游戏ID
         */
        GameId: number;
        /**
         * 昵称
         */
        NickName: string;
        /**
         * 头像地址
         */
        HeadUrl: string;
        /**
         * 登录数据
         */
        Data: BSClubLoginCmd_CS.LoginData;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    module BSClubLoginCmd_CS {
        class LoginData {
            /**
             * 俱乐部ID
             */
            ClubId: number;
            /**
             * 俱乐部名称
             */
            ClubName: string;
            /**
             * 俱乐部账号
             */
            AccountId: number;
            /**
             * 创建俱乐部跳转url
             */
            CreateClubUrl: string;
            /**
             * 管理俱乐部跳转url
             */
            ManageClubUrl: string;
            /**
             * 加入俱乐部金币阈值
             */
            ThresholdValueIn: number;
            /**
             * 退出俱乐部金币阈值
             */
            ThresholdValueOut: number;
            GetType(): string;
        }
    }
    /**
     * 加入俱乐部
     */
    class BSClubJoinCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 俱乐部ID
         */
        ClubId: number;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    /**
     * 退出俱乐部
     */
    class BSClubExitCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 俱乐部ID
         */
        ClubId: number;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    /**
     * 俱乐部数据
     */
    class BSClubInfoCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 俱乐部ID
         */
        ClubId: number;
        /**
         * 俱乐部数据
         */
        Data: BSClubInfoCmd_CS.ClubInfo;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    module BSClubInfoCmd_CS {
        class ActivityInfo {
            /**
             * 活动Id
             */
            Id: number;
            /**
             * 活动标题
             */
            Title: string;
            /**
             * 活动内容
             */
            Content: string;
            GetType(): string;
        }
    }
    module BSClubInfoCmd_CS {
        class ClubInfo {
            /**
             * 俱乐部ID
             */
            ClubId: number;
            /**
             * 俱乐部名称
             */
            ClubName: string;
            /**
             * 俱乐部公告
             */
            Notice: string;
            /**
             * 管理员俱乐部账号
             */
            OwnerId: number;
            /**
             * 管理员昵称
             */
            OwnerName: string;
            /**
             * 是否为管理员
             */
            IsOwner: boolean;
            /**
             * 活动列表
             */
            Activities: BSClubInfoCmd_CS.ActivityInfo[];
            /**
             * 俱乐部是否可使用赠送功能，赠送|被赠送
             */
            ClubCanTransfer: number;
            /**
             * 自己是否可使用赠送功能，赠送|被赠送
             */
            CanTransfer: number;
            /**
             * 赠送金币最小值
             */
            TransferAmountMin: number;
            /**
             * 赠送金币最大值
             */
            TransferAmountMax: number;
            GetType(): string;
        }
    }
    /**
     * 俱乐部成员列表
     */
    class BSClubMemberListCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 俱乐部ID
         */
        ClubId: number;
        /**
         * 页索引
         */
        PageIndex: number;
        /**
         * 页容量
         */
        PageSize: number;
        /**
         * 成员列表数据
         */
        Data: BSClubMemberListCmd_CS.MemberListData;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    module BSClubMemberListCmd_CS {
        class MemberInfo {
            /**
             * 俱乐部账号
             */
            AccountId: number;
            /**
             * 是否为管理员
             */
            IsOwner: boolean;
            /**
             * 昵称
             */
            NickName: string;
            /**
             * 游戏账号ID
             */
            OutAccountId: number;
            /**
             * 是否可使用赠送功能，赠送|被赠送
             */
            CanTransfer: number;
            GetType(): string;
        }
    }
    module BSClubMemberListCmd_CS {
        class MemberListData {
            /**
             * 成员数量
             */
            MaxCount: number;
            /**
             * 成员数据列表
             */
            Result: BSClubMemberListCmd_CS.MemberInfo[];
            GetType(): string;
        }
    }
    /**
     * 俱乐部成员查找
     */
    class BSClubMemberFindCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 俱乐部ID
         */
        ClubId: number;
        /**
         * 查询游戏账号ID
         */
        OutAccountId: number;
        /**
         * 成员数据
         */
        Data: BSClubMemberFindCmd_CS.MemberInfo;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    module BSClubMemberFindCmd_CS {
        class MemberInfo {
            /**
             * 俱乐部账号
             */
            AccountId: number;
            /**
             * 是否为管理员
             */
            IsOwner: boolean;
            /**
             * 昵称
             */
            NickName: string;
            /**
             * 游戏账号ID
             */
            OutAccountId: number;
            GetType(): string;
        }
    }
    /**
     * 检查能否转账
     */
    class BSClubCanTransferCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 俱乐部账号
         */
        ToAccountId: number;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    /**
     * 赠送金币
     */
    class BSClubGiftGoldCmd_CS {
        /**
         * 赠送者uid
         */
        uid: number;
        /**
         * 金币数量
         */
        chipsNum: number;
        /**
         * 赠送者昵称
         */
        nickName: string;
        GetType(): string;
    }
    /**
     * 使用礼券
     */
    class BSClubUseCouponCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 俱乐部ID
         */
        ClubId: number;
        /**
         * 礼券码
         */
        CouponCode: string;
        /**
         * 礼券数据
         */
        Data: BSClubUseCouponCmd_CS.CouponData;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    module BSClubUseCouponCmd_CS {
        class CouponData {
            /**
             * 管理员游戏账号，0则为系统生成
             */
            OwnerOutAccountId: number;
            /**
             * 金币数量
             */
            GoldAmount: number;
            GetType(): string;
        }
    }
    /**
     * 使用礼券回调
     */
    class BSClubUseCouponCallBackCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 礼券码
         */
        CouponCode: string;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    /**
     * 创建俱乐部
     */
    class BSClubCreateCmd_CS {
        /**
         * 登录url
         */
        url: string;
        /**
         * 登录token
         */
        token: string;
        GetType(): string;
    }
    /**
     * 管理俱乐部
     */
    class BSClubManageCmd_CS {
        /**
         * 登录url
         */
        url: string;
        /**
         * 登录token
         */
        token: string;
        GetType(): string;
    }
    /**
     * 使用点卡
     */
    class BSClubUseCardCmd_CS {
        /**
         * 俱乐部账号
         */
        AccountId: number;
        /**
         * 点卡号
         */
        CardNum: string;
        /**
         * 点卡密码
         */
        CardKey: string;
        /**
         * 点卡数据
         */
        Data: BSClubUseCardCmd_CS.CardData;
        /**
         * 结果数据
         */
        Result: BSClubResult;
        GetType(): string;
    }
    module BSClubUseCardCmd_CS {
        class CardData {
            /**
             * 金币数量
             */
            GoldAmount: number;
            GetType(): string;
        }
    }
}

declare module Cmd {
    /**
     * 玩家在线状态
     */
    enum OnlineState {
        /**
         * 离线
         */
        OnlineState_Offline = 0,
        /**
         * 在线
         */
        OnlineState_Online = 1,
        /**
         * 网络差
         */
        OnlineState_Slow = 2,
        /**
         * 离开,切后台
         */
        OnlineState_Leave = 3,
        /**
         * 电话中
         */
        OnlineState_Calling = 4,
        /**
         * 托管状态
         */
        OnlineState_Hosting = 5,
        /**
         * 排队中,匹配号用
         */
        OnlineState_Waiting = 6,
        /**
         * 游戏中,匹配号用
         */
        OnlineState_Gameing = 7,
    }
    /**
     * 房间类型
     */
    enum RoomType {
        /**
         * 普通房间
         */
        RoomType_Normal = 0,
        /**
         * 快速匹配房
         */
        RoomType_Quick = 1,
        /**
         * 练习场
         */
        RoomType_Learn = 2,
        /**
         * 匹配号生成房,roomid==globalroomid
         */
        RoomType_Match = 3,
    }
    enum MsgType {
        /**
         * 底部菜单-&gt;商城
         */
        Shop = 1,
        /**
         * 底部菜单-&gt;好友
         */
        Friend = 2,
        /**
         * 底部菜单-&gt;救济金
         */
        Alms = 3,
        /**
         * 底部菜单-&gt;活动
         */
        Activity = 4,
        /**
         * 底部菜单-&gt;任务
         */
        DaysTask = 5,
        /**
         * 底部菜单-&gt;更多
         */
        More = 6,
        /**
         * 底部菜单-&gt;摇钱树
         */
        MoneyTree = 7,
        /**
         * 通知
         */
        Notice = 8,
        /**
         * 俱乐部
         */
        Club = 9,
        /**
         * 战绩
         */
        Statistics = 10,
        /**
         * 底部菜单-&gt;商城-&gt;礼品屋
         */
        GiftHouse = 100,
        /**
         * 底部菜单-&gt;好友-&gt;好友消息
         */
        FriendMsg = 200,
        /**
         * 底部菜单-&gt;好友-&gt;好友请求
         */
        FriendReq = 201,
        /**
         * 底部菜单-&gt;救济金-&gt;领取救济金
         */
        GetAlms = 300,
        /**
         * 俱乐部牌局
         */
        ClubGame = 301,
        /**
         * 俱乐部成员
         */
        ClubMember = 302,
        /**
         * 俱乐部申请
         */
        ClubApply = 303,
        ClubTransit = 304,
        /**
         * 底部菜单-&gt;活动-&gt;每日签到
         */
        Act_DaySign = 400,
        /**
         * 底部菜单-&gt;活动-&gt;幸运翻翻翻
         */
        Act_TurnCard = 401,
        /**
         * 底部菜单-&gt;活动-&gt;幸运大转盘
         */
        Act_TurnTable = 402,
        /**
         * 底部菜单-&gt;任务-&gt;挑战任务
         */
        Task_fight = 500,
        /**
         * 底部菜单-&gt;任务-&gt;充值任务
         */
        Task_TurnTable = 501,
        /**
         * 底部菜单-&gt;任务-&gt;每日任务
         */
        Task_EveryDay = 502,
        /**
         * 底部菜单-&gt;任务-&gt;成就任务
         */
        Task_Once = 503,
        /**
         * 底部菜单-&gt;更多-&gt;公告
         */
        Task_Notice = 600,
        /**
         * 底部菜单-&gt;更多-&gt;魅力值
         */
        Task_Charm = 601,
        /**
         * 底部菜单-&gt;更多-&gt;邮件
         */
        Task_NewMail = 602,
        /**
         * 底部菜单-&gt;更多-&gt;vip
         */
        Task_VIP = 603,
        /**
         * 底部菜单-&gt;摇钱树-&gt;领取金币
         */
        Task_MoneyTree = 701,
    }
    /**
     * 容器更新操作符
     */
    enum UpdateOperator {
        /**
         * 全部覆盖
         */
        Replace = 1,
        /**
         * 追加或更新
         */
        Update = 2,
        /**
         * 删除
         */
        Delete = 3,
        /**
         * 站起
         */
        StandUp = 4,
    }
    /**
     * 房间属性
     */
    class roomPropObj {
        /**
         * 1:房间局数 3:人数模式 4:支付模式 5:游金倍数 101:鬼牌模式(0无鬼 1 2) 102:打捆(金华)
         */
        id: number;
        value: number;
        GetType(): string;
    }
    class RoomState {
        /**
         * 配置出牌倒计时
         */
        outCount: number;
        /**
         * 配置操作牌倒计时
         */
        opCount: number;
        /**
         * 进入房间id
         */
        roomId: number;
        /**
         * 玩家基础信息
         */
        userInfoSet: UserBaseInfo[];
        /**
         * 房间类型RoomType,0表示正常放假,1表示快速匹配场,2表示练习场
         */
        roomType: number;
        /**
         * 所有已准备玩家uid
         */
        prepareSet: number[];
        /**
         * 音效音乐等设置信息
         */
        setInfo: SetInfo;
        /**
         * 房间属性,带kv属性的
         */
        roomProps: roomPropObj[];
        /**
         * 玩法属性,只是开关类型的
         */
        props: number[];
        /**
         * 剩余解散房间的时间秒
         */
        dissoveTime: number;
        /**
         * 对赌类型 1:金币 2:钻石
         */
        gambletype: number;
        /**
         * 金币场底注
         */
        betchips: number;
        /**
         * 是否是暗杠, 1非暗杠 2暗杠
         */
        darkBar: number;
        /**
         * 金币场输赢上限
         */
        winLimit: number;
        /**
         * 进入房间matchId
         */
        matchId: number;
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
        GetType(): string;
    }
    /**
     * 分享信息
     */
    class ShareInfo {
        /**
         * 标题
         */
        title: string;
        /**
         * 内容
         */
        content: string;
        /**
         * 分享地址
         */
        webPageUrl: string;
        /**
         * 二维码
         */
        codeUrl: string;
        GetType(): string;
    }
    /**
     * 邮寄地址
     */
    class DeliverAddr {
        /**
         * 邮政编码,可不要
         */
        code: number;
        /**
         * 收件人姓名
         */
        name: string;
        /**
         * 收件人电话
         */
        phone: string;
        /**
         * 收件详细地址
         */
        addr: string;
        /**
         * 微信
         */
        wechat: string;
        /**
         * qq 2017.11.15好彩真人添加
         */
        qq: string;
        /**
         * 邮箱 2017.11.15好彩真人添加
         */
        mail: string;
        GetType(): string;
    }
    class flowerObj {
        id: number;
        num: number;
        GetType(): string;
    }
    class njU {
        /**
         * 当前分数
         */
        curP: number;
        /**
         * 南京麻将总点数
         */
        tolP: number;
        GetType(): string;
    }
    /**
     * 比赛场入场券相关
     */
    class ticketObj {
        /**
         * 入场券id
         */
        ticketId: number;
        /**
         * 场次id
         */
        playId: number;
        /**
         * 数量
         */
        count: number;
        GetType(): string;
    }
    /**
     * 比赛场勋章相关
     */
    class medalObj {
        /**
         * 勋章id
         */
        medalId: number;
        /**
         * 数量
         */
        count: number;
        GetType(): string;
    }
    /**
     * 魅力值相关
     */
    class usercpObj {
        id: number;
        count: number;
        GetType(): string;
    }
    /**
     * 聊天消息
     */
    class ChatInfo {
        /**
         * 聊天类型
         */
        chatType: number;
        /**
         * 文字/语音对应的文字
         */
        words: string;
        /**
         * 语音时长
         */
        time: string;
        /**
         * 语音对应地址
         */
        url: string;
        /**
         * 表情id
         */
        emojiId: number;
        /**
         * 发送者
         */
        fromUid: number;
        /**
         * 接收者
         */
        toUid: number;
        /**
         * 时间戳
         */
        sendTime: number;
        GetType(): string;
    }
    /**
     * 商品
     */
    class Goods {
        goodsId: number;
        goodsNum: number;
        GetType(): string;
    }
    /**
     * 成长属性,让每个账号变的有成长性,可部分规避无门槛逃单问题
     */
    class GrowthAttr {
        /**
         * 本周上桌次数
         */
        playNumWeek: number;
        /**
         * 本月上桌次数
         */
        playNumMon: number;
        /**
         * 总上桌次数0-100新手,100-1000资深,...
         */
        playNumAll: number;
        /**
         * 本周获胜次数
         */
        winNumWeek: number;
        /**
         * 本月获胜次数
         */
        winNumMon: number;
        /**
         * 总获胜次数0-100新手,100-1000资深,...
         */
        winNumAll: number;
        /**
         * 本周获胜次数
         */
        bigWinNumWeek: number;
        /**
         * 本月获胜次数
         */
        bigWinNumMon: number;
        /**
         * 总获胜次数0-100新手,100-1000资深,...
         */
        bigWinNumAll: number;
        /**
         * 胜率winNumAll/playNumAll
         */
        winRate: number;
        /**
         * 本周上桌次数排名
         */
        playOrderWeek: number;
        /**
         * 本月上桌次数排名
         */
        playOrderMon: number;
        /**
         * 总上桌次数0-100新手,100-1000资深,...
         */
        playOrderAll: number;
        /**
         * 本周获胜次数排名
         */
        winOrderWeek: number;
        /**
         * 本月获胜次数排名
         */
        winOrderMon: number;
        /**
         * 总获胜次数0-100新手,100-1000资深,...
         */
        winOrderAll: number;
        /**
         * 本周获胜次数排名
         */
        bigWinOrderWeek: number;
        /**
         * 本月获胜次数排名
         */
        bigWinOrderMon: number;
        /**
         * 总获胜次数0-100新手,100-1000资深,...
         */
        bigWinOrderAll: number;
        /**
         * 商城积分
         */
        shopPoint: number;
        /**
         * 奖池积分
         */
        jackpot: number;
        GetType(): string;
    }
    /**
     * 玩家充值信息
     */
    class RechargeInfo {
        /**
         * 累计充值
         */
        totalRecharge: number;
        /**
         * 月充值
         */
        monthRecharge: number;
        /**
         * 日充值
         */
        dayRecharge: number;
        GetType(): string;
    }
    /**
     * 拥有的时效性道具
     */
    class TimeGoods {
        /**
         * 对应道具表的id (玩家购买后对应的道具id)
         */
        id: number;
        /**
         * 剩余的有效天数
         */
        timeDay: number;
        /**
         * 过期时间戳(秒级的)
         */
        outTime: number;
        /**
         * 对应商城表的id (2018.03.15) 之后的购买全部使用这个字段
         */
        shopId: number;
        GetType(): string;
    }
    /**
     * 正在使用个人形象
     */
    class PersonalImage {
        /**
         * 1头像框(暂时只有头像框)
         */
        typ: number;
        /**
         * 0不使用 1购买道具 2vip特有
         */
        optyp: number;
        /**
         * 购买道具对应的id
         */
        id: number;
        /**
         * vip特有对应的vip等级
         */
        vip: number;
        GetType(): string;
    }
    /**
     * 玩家所拥有的充值优惠 (2018.03.16好彩金币场系列需求)
     */
    class RechargeDiscounts {
        /**
         * 商品Id
         */
        shopId: number;
        /**
         * 优惠加成 rate=1就相当于在基础上再加送1份
         */
        rate: number;
        GetType(): string;
    }
    /**
     * 基础数据
     */
    class UserBaseInfo {
        uid: number;
        headurl: string;
        nickname: string;
        gender: string;
        /**
         * 房卡模式 zoneType=2
         */
        card: number;
        /**
         * 钻石模式 zoneType=4
         */
        diamond: number;
        platId: number;
        subPlatId: string;
        ip: string;
        /**
         * 上级代理 如果没有返回0
         */
        parent: number;
        vip: number;
        /**
         * 积分
         */
        points: number;
        seatId: number;
        /**
         * 为了方便放这里,在线状态OnlineState
         */
        onlineState: number;
        /**
         * 为了方便放这里,准备状态
         */
        bReady: number;
        /**
         * 为了方便放这里,当前立着的手牌数量
         */
        handCardNum: number;
        flower: flowerObj[];
        nickName: string;
        headUrl: string;
        /**
         * uid的索引
         */
        sid: number;
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        /**
         * 南京麻将使用下注
         */
        nju: njU;
        /**
         * 金币
         */
        chips: number;
        /**
         * 入场券
         */
        ticket: ticketObj[];
        /**
         * 勋章
         */
        medal: medalObj[];
        /**
         * 单局飘分
         */
        multiPiao: number;
        /**
         * 个性签名
         */
        signature: string;
        /**
         * 是否是新玩家 0:不是 1:是
         */
        isNew: number;
        /**
         * 游戏局数
         */
        playNum: number;
        /**
         * 保险箱的钱数 金币
         */
        bankMoney: number;
        /**
         * 是否修改过昵称 1:修改过(好彩真人的需求)
         */
        isChangeName: number;
        /**
         * 魅力值(好彩真人)
         */
        usercp: number;
        /**
         * 魅力值的具体信息(好彩真人)
         */
        usercpObj: usercpObj[];
        /**
         * 是否为好友 1:是好友(请求其他用户信息的标志，好彩真人的需求)
         */
        isFriend: number;
        /**
         * 奖券
         */
        giftCoupon: number;
        /**
         * 最后一条聊天记录(好彩真人好友系统使用)
         */
        lastMsg: ChatInfo;
        /**
         * 礼品券(好彩真人麻将,金币场赢家有几率获得)
         */
        giftVoucher: number;
        /**
         * 手机号(好彩真人麻将,为nil表示未绑定)
         */
        phonenumber: string;
        /**
         * 特殊分
         */
        specialpoints: number;
        /**
         * 赢三张头衔
         */
        title: string;
        /**
         * 赢三张喇叭(好彩金币系列也使用这个字段表示喇叭 2018.03.23)
         */
        horn: number;
        /**
         * 地理位置信息
         */
        loc: string;
        /**
         * 成长属性,西安先用
         */
        growth: GrowthAttr;
        /**
         * 玩家充值
         */
        recharge: RechargeInfo;
        /**
         * 正在使用的个人形象 2017.11.15好彩真人需求
         */
        personalImage: PersonalImage[];
        /**
         * 玩家所拥有的优惠商品 2018.03.16好彩需求
         */
        discounts: RechargeDiscounts[];
        /**
         * 保险箱 钻石
         */
        bankDiamond: number;
        /**
         * 详细地址
         */
        address: string;
        /**
         * 是否显示yy渠道的实名认证按钮
         */
        isAnti: boolean;
        /**
         * 是否好彩代理商
         */
        haocaiAgent: boolean;
        GetType(): string;
    }
    /**
     * 修改玩家信息
     */
    class UserBaseInfoUpdateCmd_C {
        baseInfo: UserBaseInfo;
        GetType(): string;
    }
    /**
     * 请求解散房间
     */
    class RequestDissolveRoom_C {
        GetType(): string;
    }
    class RequestDissolveRoom_S {
        resultCode: number;
        desc: string;
        /**
         * 在线玩家人数
         */
        userNum: number;
        GetType(): string;
    }
    class RequestDissolveRoom_Brd {
        /**
         * 请求解散房间的玩家uid
         */
        uid: number;
        /**
         * 等待倒计时
         */
        waitTime: number;
        GetType(): string;
    }
    /**
     * 回应解散房间
     */
    class ReplyDissolveRoom_C {
        /**
         * 1表示同意
         */
        isAgree: number;
        GetType(): string;
    }
    class ReplyDissolveRoom_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class ReplyDissolveRoom_Brd {
        uid: number;
        /**
         * 1表示同意
         */
        isAgree: number;
        GetType(): string;
    }
    /**
     * 成功解散房间
     */
    class SuccessDissolveRoom_Brd {
        /**
         * 所有同意解散的玩家昵称
         */
        agreeUsers: string[];
        /**
         * 所有不同意解散的玩家称
         */
        disagreeUsers: string[];
        /**
         * 是否解散成功
         */
        bOk: boolean;
        GetType(): string;
    }
    /**
     * 主动上报客户端IP
     */
    class ClientIpCmd_C {
        ip: number;
        port: number;
        /**
         * 127.0.0.1
         */
        ipstr: string;
        /**
         * 127.0.0.1:1000
         */
        ipport: string;
        GetType(): string;
    }
    /**
     * 通知前端上发获取经度纬度
     */
    class GetGPSLocationCmd_S {
        GetType(): string;
    }
    /**
     * gps获取经度纬度
     */
    class GetGPSLocationCmd_C {
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        /**
         * 详细地址
         */
        address: string;
        GetType(): string;
    }
    /**
     * gps获取经度纬度广播
     */
    class GetGPSLocationCmd_Brd {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        /**
         * 详细地址
         */
        address: string;
        GetType(): string;
    }
    class IpGPS {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        ip: number;
        /**
         * 127.0.0.1
         */
        ipstr: string;
        GetType(): string;
    }
    /**
     * 请求ip和gps获取经度纬度
     */
    class RequestIpGPSCmd_C {
        /**
         * 房间id,默认不填就是请求自己的
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 返回ip和gps获取经度纬度
     */
    class ReturnIpAndGPSCmd_S {
        /**
         * 位置信息
         */
        list: IpGPS[];
        GetType(): string;
    }
    class JsonCompressKey {
        key: string;
        /**
         * 嵌套描述
         */
        json: JsonCompressKey[];
        GetType(): string;
    }
    /**
     * json压缩约定消息
     */
    class JsonCompressNullUserPmd_CS {
        key: string;
        json: JsonCompressKey[];
        /**
         * 0表示不省略,1表示省略,默认不省略,default省略,{} ,&quot;&quot;,0
         */
        omit: number;
        /**
         * 0表示重置,1表示添加
         */
        add: number;
        /**
         * 消息列表
         */
        msglist: string[];
        GetType(): string;
    }
    /**
     * 语音聊天
     */
    class VoiceChat_C {
        /**
         * 语音时长
         */
        time: string;
        /**
         * 对应文字
         */
        words: string;
        /**
         * 对应地址
         */
        url: string;
        roomId: number;
        GetType(): string;
    }
    class VoiceChat_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class VoiceChat_Brd {
        /**
         * 语音时长
         */
        time: string;
        /**
         * 对应文字
         */
        words: string;
        /**
         * 对应地址
         */
        url: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 发送语音的玩家id
         */
        uid: number;
        GetType(): string;
    }
    class VoiceObj {
        /**
         * 语音时长
         */
        time: string;
        /**
         * 对应文字
         */
        words: string;
        /**
         * 对应地址
         */
        url: string;
        /**
         * 发送聊天的玩家id
         */
        uid: number;
        /**
         * 发送聊天时的时间
         */
        timestamp: string;
        GetType(): string;
    }
    /**
     * 语音记录
     */
    class VoiceChatRecord_C {
        GetType(): string;
    }
    class VoiceChatRecord_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        /**
         * 语音记录
         */
        records: VoiceObj[];
        GetType(): string;
    }
    class CommonChat_C {
        /**
         * 语音id
         */
        voiceId: number;
        /**
         * 文字聊天内容
         */
        words: string;
        roomId: number;
        GetType(): string;
    }
    class CommonChat_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class CommonChat_Brd {
        /**
         * 语音id
         */
        voiceId: number;
        /**
         * 发送语音的玩家id
         */
        uid: number;
        /**
         * 文字聊天内容
         */
        words: string;
        GetType(): string;
    }
    class SetInfo {
        /**
         * 音效 false:关 true:开
         */
        sound: boolean;
        /**
         * 音乐 false:关 true:开
         */
        music: boolean;
        /**
         * 音控 false:关 true:开
         */
        control: boolean;
        /**
         * 方言 1:普能话 2:龙岩话
         */
        dialect: number;
        GetType(): string;
    }
    /**
     * 音效音乐设置
     */
    class SoundSet_C {
        /**
         * 音效音乐等设置信息
         */
        setInfo: SetInfo;
        GetType(): string;
    }
    /**
     * 获取玩家头像
     */
    class GetUserHeadList_C {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 玩家id
         */
        uidList: number[];
        GetType(): string;
    }
    class UserHead {
        /**
         * 玩家id
         */
        uid: number;
        headUrl: string;
        GetType(): string;
    }
    class GetUserHeadList_S {
        /**
         * 玩家列表
         */
        headList: UserHead[];
        GetType(): string;
    }
    /**
     * 获取玩家列表信息
     */
    class GetUserList_C {
        GetType(): string;
    }
    class GetUserList_S {
        /**
         * 玩家列表
         */
        userSet: UserBaseInfo[];
        GetType(): string;
    }
    /**
     * 请求玩家面板信息
     */
    class GetPersonalPanel_C {
        /**
         * 玩家id
         */
        uid: number;
        GetType(): string;
    }
    class GetPersonalPanel_S {
        /**
         * 玩家基本信息
         */
        userInfo: UserBaseInfo;
        GetType(): string;
    }
    /**
     * 通知客户端可以显示准备按钮
     */
    class ShowPrepareBtnRoom_S {
        GetType(): string;
    }
    /**
     * 通知客户端可以显示提前开始按钮了
     */
    class ShowChangeUserNbrRoom_S {
        GetType(): string;
    }
    /**
     * 请求切换房间人数
     */
    class RequestChangeUserNbrRoom_C {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 请求切换房间人数
     */
    class RequestChangeUserNbrRoom_Brd {
        uid: number;
        /**
         * 目标人数
         */
        userNbr: number;
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class ReturnChangeUserNbrRoom_C {
        /**
         * 1表示同意
         */
        isAgree: number;
        /**
         * 目标人数
         */
        userNbr: number;
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class ReturnChangeUserNbrRoom_Brd {
        uid: number;
        /**
         * 1表示同意 没有及不同意
         */
        isAgree: number;
        GetType(): string;
    }
    /**
     * 请求刷新座位积分
     */
    class UpdatePointSeatRoom_S {
        uid: number;
        /**
         * 可能是积分,金币或者钻石
         */
        point: number;
        GetType(): string;
    }
    /**
     * 请求换坐
     */
    class RequestChangeSeatRoom_C {
        seatid: number;
        GetType(): string;
    }
    /**
     * 请求换坐给对方客户端
     */
    class RequestChangeSeatRoom_S {
        /**
         * 玩家id
         */
        fromuid: number;
        GetType(): string;
    }
    /**
     * 对方回应,成功后直接操作
     */
    class ReturnChangeSeatRoom_C {
        /**
         * 玩家id
         */
        fromuid: number;
        /**
         * 1表示同意
         */
        isAgree: number;
        GetType(): string;
    }
    /**
     * 请求排行榜
     */
    class GetRankingListRoomCmd_C {
        GetType(): string;
    }
    /**
     * +
     */
    class RankInfo {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 玩家昵称
         */
        nickname: string;
        /**
         * 头像地址
         */
        headUrl: string;
        /**
         * 排行值
         */
        point: number;
        /**
         * 玩家上一局输
         */
        profit: number;
        /**
         * 玩家总成绩
         */
        totalProfit: number;
        GetType(): string;
    }
    class GetRankingListRoomCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 排行榜数据
         */
        rankInfo: RankInfo[];
        GetType(): string;
    }
    /**
     * 排行榜广播
     */
    class GetRankingListRoomCmd_Brd {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 排行榜数据
         */
        rankInfo: RankInfo[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 托管请求
     *  S-&gt;C 托管状态更新
     */
    class HostUpdateRoomCmd_CS {
        yesOrNo: boolean;
        uid: number;
        opList: number[];
        /**
         * 0表示取消托管,1表示普通托管,2表示高智商托管
         */
        hostType: number;
        GetType(): string;
    }
    /**
     *  Echo应答,服务器探测玩家是否活着
     *  TODO,还未使用,待升级
     */
    class ServerEchoRoomCmd_SC {
        /**
         * echo标志
         */
        id: number;
        /**
         * echo描述,原封不动返回
         */
        desc: string;
        GetType(): string;
    }
    /**
     *  Echo应答,客户端探测服务器
     *  TODO,还未使用,待升级
     */
    class ClientEchoRoomCmd_SC {
        /**
         * echo标志
         */
        id: number;
        /**
         * echo描述,原封不动返回
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 在线状态更新
     */
    class OnlineStateRoomCmd_S {
        uid: number;
        state: OnlineState;
        GetType(): string;
    }
    /**
     *  C-&gt;S 离开房间请求
     *  S-&gt;C 离开房间通知
     */
    class LeaveRoomCmd_CS {
        uid: number;
        roomId: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 准备/取消准备请求
     *  S-&gt;C 更新准备状态
     */
    class ReadyUpdateRoomCmd_CS {
        yesOrNo: boolean;
        uid: number;
        GetType(): string;
    }
    /**
     * 系统通知
     */
    class SysMessageCmd_S {
        msgType: SysMessageCmd_S.MsgType;
        /**
         * 文本
         */
        msg: string;
        code: number;
        GetType(): string;
    }
    module SysMessageCmd_S {
        enum MsgType {
            /**
             * 文本消息
             */
            Text = 1,
            /**
             * 解散房间
             */
            DissolveRoom = 2,
            /**
             * 返回到大厅
             */
            BackToLobby = 3,
            /**
             * 提前开局
             */
            StartInAdvance = 4,
            /**
             * 弹框
             */
            Bounce = 5,
            /**
             * 余额不足
             */
            NotEnoughMoney = 6,
            /**
             * 创建房间成功
             */
            CreateRoom = 7,
            /**
             * 重新进入大厅
             */
            EnterLobby = 8,
        }
    }
    /**
     *  C-&gt;S 查询服务器当前逻辑时间
     *  S-&gt;C 服务器当前逻辑时间
     */
    class GameTimeSyncCmd_CS {
        /**
         * unix时间戳
         */
        stamp: number;
        GetType(): string;
    }
    /**
     * 请求更换房间消息
     */
    class ChangeRoomCmd_C {
        GetType(): string;
    }
    /**
     * 换座
     */
    class ChangeSeatRoomCmd_C {
        /**
         * 目标座位
         */
        pos: number;
        GetType(): string;
    }
    /**
     * +
     */
    class GiftsInfo {
        /**
         * 发送玩家Id
         */
        fromUid: number;
        /**
         * 接收玩家Id
         */
        toUid: number;
        /**
         * 礼物Id
         */
        giftsId: number;
        /**
         * 礼物数量
         */
        giftsNum: number;
        GetType(): string;
    }
    /**
     * 送礼
     */
    class SendGiftRoomCmd_C {
        /**
         * 礼物内容
         */
        gift: GiftsInfo;
        roomId: number;
        GetType(): string;
    }
    class SendGiftRoomCmd_S {
        resultCode: number;
        gift: GiftsInfo;
        GetType(): string;
    }
    class SendGiftRoomCmd_Brd {
        /**
         * 送礼玩家
         */
        gift: GiftsInfo;
        /**
         * 玩家剩余钻石
         */
        diamond: number[];
        GetType(): string;
    }
    /**
     * 大厅送礼 客户端大厅相同的协议会有问题
     */
    class SendGiftLobbyCmd_C {
        /**
         * 礼物内容
         */
        gift: GiftsInfo;
        GetType(): string;
    }
    class SendGiftLobbyCmd_S {
        resultCode: number;
        gift: GiftsInfo;
        userInfo: UserBaseInfo;
        GetType(): string;
    }
    /**
     * 离开房间
     */
    class LeaveRoomCmd_C {
        /**
         * 离开状态 0 返回大厅 1 暂时离开 2 断线
         */
        state: number;
        GetType(): string;
    }
    class LeaveRoomCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播玩家离开房间
     */
    class LeaveRoomCmd_Brd {
        resultCode: number;
        desc: string;
        uid: number;
        state: number;
        GetType(): string;
    }
    /**
     * 认输
     */
    class GiveupRoomCmd_C {
        /**
         * 认输数量,认输时需要输入认输数量
         */
        num: number;
        GetType(): string;
    }
    /**
     *  发起视频聊天
     *  C-&gt;S 请求视频聊天
     *  S-&gt;C 请求视频聊天通知
     */
    class VideoChatRequestCmd_CS {
        uid: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求视频聊天回复请求
     *  S-&gt;C 请求视频聊天回复通知
     */
    class VideoChatReturnCmd_CS {
        uid: number;
        /**
         * 是否接受
         */
        result: boolean;
        GetType(): string;
    }
    /**
     *  C-&gt;S 视频聊天关闭请求
     *  S-&gt;C 视频聊天关闭通知
     */
    class VideoChatShutdownCmd_CS {
        uid: number;
        GetType(): string;
    }
    /**
     * 聊天消息内容
     */
    class ChatMessageInfo {
        /**
         * 文本/表情/语音url
         */
        msg: string;
        /**
         * 聊天内容类型
         */
        msgType: ChatMessageInfo.MsgType;
        /**
         * 时间
         */
        time: number;
        /**
         * 语音时长
         */
        voiceTime: number;
        /**
         * 发言人ID
         */
        speakerUid: number;
        /**
         * 发言人名字
         */
        speakerName: string;
        /**
         * 发言人头像
         */
        speakerHeadUrl: string;
        /**
         * 频道ID
         */
        channelId: number;
        /**
         * 好友ID
         */
        friendUid: number;
        /**
         * 频道类型
         */
        channelType: ChatMessageInfo.ChannelType;
        GetType(): string;
    }
    module ChatMessageInfo {
        /**
         * 聊天内容类型
         */
        enum MsgType {
            /**
             * 文本
             */
            Text = 1,
            /**
             * 语音
             */
            Voice = 2,
            /**
             * 表情
             */
            Face = 3,
            /**
             * 德州扑克创建房间信息
             */
            TexasConfig = 4,
        }
    }
    module ChatMessageInfo {
        /**
         * 聊天频道
         */
        enum ChannelType {
            /**
             * 房间
             */
            Room = 1,
            /**
             * 俱乐部
             */
            Club = 2,
            /**
             * 两个好友聊天
             */
            Friend = 3,
        }
    }
    /**
     *  C-&gt;S 聊天消息
     *  S-&gt;C 聊天消息
     */
    class ChatCmd_CS {
        chat: ChatMessageInfo;
        chatList: ChatMessageInfo[];
        GetType(): string;
    }
    /**
     * 匹配组成员信息
     */
    class MatchGroupMemberInfo {
        uid: number;
        nickname: string;
        /**
         * 空或0表示游客,1表示白名单,2表示黑名单
         */
        type: number;
        /**
         * 状态,OnlineState
         */
        state: number;
        /**
         * 积分
         */
        score: number;
        /**
         * 申请加入时使用,冗余
         */
        matchId: number;
        /**
         * 头像url,茶馆要用
         */
        headUrl: string;
        /**
         * 输次
         */
        loseNum: number;
        /**
         * 赢次
         */
        winNum: number;
        /**
         * VIP等级
         */
        vip: number;
        /**
         * 当天大赢次
         */
        bigWinNum: number;
        /**
         * 总上桌次数
         */
        playNum: number;
        /**
         * 昨日积分
         */
        lastScore: number;
        /**
         * 上下分
         */
        matchPoint: number;
        /**
         * 成长属性,西安先用
         */
        growth: GrowthAttr;
        /**
         * 本周积分
         */
        scoreWeek: number;
        /**
         * 本月积分
         */
        scoreMon: number;
        /**
         * 总积分
         */
        scoreAll: number;
        /**
         * 备注
         */
        desc: string;
        /**
         * 微信联系方式
         */
        wechat: string;
        /**
         * 金豆场用
         */
        chips: number;
        /**
         * 总投注额
         */
        allBets: number;
        /**
         * 所在房间号,茶馆和比赛用
         */
        roomId: number;
        /**
         * 备注(sz使用)
         */
        note: string;
        /**
         * 税收贡献
         */
        tax: number;
        /**
         * 成员类型(sz使用) 1:群主 2:副群主 3:普通成员
         */
        membertype: number;
        GetType(): string;
    }
    /**
     * 匹配组房间信息
     */
    class MathGroupRoomInfo {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 成员信息
         */
        list: MatchGroupMemberInfo[];
        /**
         * 开启时间unix sec
         */
        beginTime: number;
        /**
         * 结束时间unix sec
         */
        endTime: number;
        /**
         * 当前局数
         */
        curGameNbr: number;
        /**
         * 最大局数
         */
        gameNbr: number;
        /**
         * 游戏id
         */
        gameId: number;
        /**
         * 分享数据,ActiveCreateRoomCmd_C时用,山寨下
         */
        shareInfo: ShareInfo;
        /**
         * 当前房间内人数
         */
        curUserNbr: number;
        /**
         * 最大房间内人数
         */
        userNbr: number;
        /**
         * globalRoomId
         */
        gid: number;
        /**
         * 不填或0表示准备中,1表示已开局,2表示已结束
         */
        state: number;
        /**
         * 玩法描述
         */
        playTypeDesc: string;
        /**
         * 当前所属楼层
         */
        floorId: number;
        GetType(): string;
    }
    /**
     * 地址
     */
    class Address {
        /**
         * 国家
         */
        country: string;
        /**
         * 省
         */
        province: string;
        /**
         * 市
         */
        city: string;
        GetType(): string;
    }
    class DonateData {
        regulationList: StatisticsRoundData[];
        fix: boolean;
        devide: number[];
        GetType(): string;
    }
    class ClubInfo {
        clubId: number;
        /**
         * 地址
         */
        address: Address;
        name: string;
        memberList: ClubInfo.Member[];
        /**
         * 创建者
         */
        founder: number;
        /**
         * 创建时间
         */
        createdAt: number;
        /**
         * 签名
         */
        signature: string;
        /**
         * 成员人数上限
         */
        memberLimit: number;
        /**
         * 人数
         */
        memberNum: number;
        /**
         * 俱乐部头像
         */
        headurl: string;
        /**
         * 创建者信息
         */
        founderInfo: UserBaseInfo;
        /**
         * 公告
         */
        announcement: string;
        /**
         * 职位权限
         */
        postPermission: ClubInfo.PostPermission[];
        /**
         * 基金
         */
        fund: number;
        myMember: ClubInfo.Member;
        /**
         * 私密
         */
        private: boolean;
        donatedata: DonateData;
        unionList: number[];
        level: number;
        /**
         * 房间数
         */
        gameNum: number;
        /**
         * 最大的代理层级
         */
        maxAgentLayer: number;
        GetType(): string;
    }
    module ClubInfo {
        /**
         * 权限
         */
        enum Permission {
            /**
             * 开局
             */
            CreateRoom = 1,
            /**
             * 审核成员申请
             */
            MemeberJoin = 2,
            /**
             * 查看报表
             */
            CheckReport = 3,
        }
    }
    module ClubInfo {
        /**
         * 职位
         */
        enum Post {
            Man = 1000,
            Agent = 1500,
            Admin = 2000,
            Founder = 3000,
        }
    }
    module ClubInfo {
        /**
         * 成员
         */
        class Member {
            user: UserBaseInfo;
            /**
             * 职位
             */
            post: ClubInfo.Post;
            clubId: number;
            /**
             * 消息
             */
            msg: string;
            /**
             * 筹码
             */
            chips: number;
            /**
             * 创建时间
             */
            createdAt: number;
            /**
             * 战绩
             */
            statistics: StatisticsRoundData;
            /**
             * 代理信用值
             */
            credit: number;
            /**
             * 上线
             */
            upline: number;
            /**
             * 下线数量
             */
            downlineNum: number;
            /**
             * 代理层级
             */
            layer: number;
            GetType(): string;
        }
    }
    module ClubInfo {
        /**
         * 职位所拥有的权限
         */
        class PostPermission {
            post: ClubInfo.Post;
            permission: ClubInfo.Permission[];
            GetType(): string;
        }
    }
    module ClubInfo {
        /**
         * 转账
         */
        class Transition {
            id: number;
            /**
             * 申请人
             */
            user: UserBaseInfo;
            /**
             * 数量
             */
            num: number;
            /**
             * true 转进 false 转出
             */
            inOrOut: boolean;
            /**
             * 申请时间
             */
            createdAt: number;
            clubId: number;
            /**
             * 0 未处理 1 同意 2 不同意
             */
            deal: number;
            /**
             * 审核人
             */
            dealer: UserBaseInfo;
            GetType(): string;
        }
    }
    /**
     * 分页
     */
    class Page {
        /**
         * 第几页
         */
        current: number;
        /**
         * 每页的数量
         */
        num: number;
        GetType(): string;
    }
    /**
     * 数据更新通知
     */
    class DataUpdateNotifyCmd_S {
        update: MsgType;
        clubId: number;
        GetType(): string;
    }
    /**
     * 玩家牌局押注数据
     */
    class StatisticsRoundData {
        uid: number;
        /**
         * 多长时间内
         */
        days: number;
        /**
         * 玩法 废弃
         */
        play: number;
        user: UserBaseInfo;
        /**
         * 牌局规则
         */
        regulation: number;
        id: number;
        /**
         *  押注元数据
         *  参与的房间数
         */
        gameNum: number;
        /**
         * 手数
         */
        hand: number;
        /**
         * 翻牌前加注数
         */
        flopRaise: number;
        /**
         * 入池数
         */
        inpot: number;
        /**
         * allin 赢的次数
         */
        allinWin: number;
        /**
         * allin 次数
         */
        allin: number;
        /**
         *  计算后的概率
         *  入池率
         */
        vpip: number;
        /**
         * 翻牌前加注率
         */
        prf: number;
        /**
         * ALL-IN胜率
         */
        allinWinRate: number;
        /**
         *  金钱数据
         *  带入的筹码
         */
        bring: number;
        /**
         * 盈亏
         */
        profit: number;
        /**
         * 保险买入
         */
        insBuy: number;
        /**
         * 保险利润
         */
        insProfit: number;
        /**
         * 奖金
         */
        prize: number;
        /**
         * 带出
         */
        out: number;
        /**
         * 捐献金
         */
        donate: number;
        donateIncome: number;
        /**
         * 保险
         */
        insurance: number;
        /**
         * 赢
         */
        lose: number;
        /**
         * 输
         */
        win: number;
        jackpot: number;
        /**
         * 剩余筹码
         */
        chips: number;
        /**
         *  名次
         *  冠军数
         */
        firstPlace: number;
        /**
         * 亚军数
         */
        secondPlace: number;
        /**
         * 季军数
         */
        thirdPlace: number;
        /**
         * 名次
         */
        place: number;
        /**
         * 报名
         */
        sign: boolean;
        GetType(): string;
    }
    /**
     * 玩法数据
     */
    class Playing {
        id: Playing.PlayId;
        value: number;
        GetType(): string;
    }
    module Playing {
        /**
         * 玩法id
         */
        enum PlayId {
            /**
             * 小盲
             */
            Smallblind = 1,
            /**
             * 牌局规则 1 普通局 2 SNG
             */
            Regulation = 2,
            /**
             * 座位数
             */
            SeatNum = 3,
            /**
             * 前注
             */
            Ante = 4,
            /**
             * 升盲速度
             */
            BlindLength = 5,
            /**
             * 初始盲注
             */
            StartChips = 6,
            /**
             * 速度
             */
            Speed = 7,
            /**
             * 时长
             */
            Duration = 8,
            /**
             * 俱乐部id, 代表从俱乐部创建的牌局
             */
            ClubId = 9,
            /**
             * 报名费
             */
            EntryFee = 10,
            /**
             * 强制盲注
             */
            ForceBlind = 10447,
            /**
             * 控制带入
             */
            ControlEntry = 10448,
            /**
             * 保险
             */
            Insurance = 10449,
            GPS = 96,
            /**
             * 相同ip不可进入
             */
            IPEnter = 100,
            /**
             * 控制玩家报名
             */
            ControlSignUp = 10489,
            /**
             * 文本聊天
             */
            TextChat = 10490,
            /**
             * 语言聊天
             */
            VoiceChat = 10491,
            /**
             * 捐献金比例
             */
            DonateRate = 10561,
            /**
             * 自动开局条件人数
             */
            StartAutoNum = 10582,
            /**
             * 最少买入
             */
            BringMin = 10583,
            /**
             * 最大买入
             */
            BringMax = 10584,
            /**
             * 自动开始
             */
            StartAuto = 10585,
            /**
             * 俱乐部基金买入服务费
             */
            ClubFundPlatFee = 10586,
            /**
             * 两倍前注
             */
            DoubleAnte = 10590,
            /**
             * 三条大于顺子
             */
            ThreeGtStraight = 10591,
            /**
             * 押注时长
             */
            ActionDuration = 10592,
        }
    }
    /**
     * 德扑的配置信息
     */
    class TexasConfig {
        /**
         * 房间名称
         */
        name: string;
        roomId: number;
        /**
         * 房间唯一id
         */
        globalRoomId: number;
        /**
         * 创建时间
         */
        createdAt: number;
        /**
         * 奖金 废弃
         */
        prize: number[];
        /**
         * 报名人
         */
        signList: UserBaseInfo[];
        /**
         * 涨盲
         */
        blindLine: number[];
        /**
         * 人数
         */
        userNum: number;
        owner: UserBaseInfo;
        /**
         * 开始时间
         */
        startAt: number;
        clubName: string;
        /**
         * 玩法列表
         */
        playList: Playing[];
        /**
         * 盲注等级
         */
        blindLevel: number;
        leftSec: number;
        /**
         * 表格id
         */
        tableId: number;
        /**
         * 名义上的奖金
         */
        prizeNameList: number[];
        /**
         * 实际获得的奖金
         */
        prizeGiveList: number[];
        statistics: StatisticsRoundData;
        /**
         * 结束时间
         */
        destroyAt: number;
        GetType(): string;
    }
    /**
     * 彩票信息
     */
    class Lottery {
        /**
         * 期号
         */
        expect: number;
        /**
         * 子期号
         */
        subExpect: number;
        /**
         * 开奖时间
         */
        openstamp: number;
        /**
         * 开奖数据
         */
        opencode: number[];
        /**
         * 开奖数据
         */
        opennum: number;
        GetType(): string;
    }
    /**
     * 牌局历史
     */
    class History {
        /**
         * 房间等级
         */
        level: number;
        data: History.HistoryInfo[];
        GetType(): string;
    }
    module History {
        class HistoryInfo {
            /**
             * 输赢
             */
            roundWinLose: number;
            /**
             * 利润
             */
            profit: number;
            /**
             * 彩票数据
             */
            lottery: Lottery;
            /**
             * 赢家id
             */
            winId: number;
            /**
             * 牌
             */
            cardList: number[];
            /**
             * 我的押注
             */
            statistics: StatisticsRoundData[];
            GetType(): string;
        }
    }
    /**
     * 过滤条件
     */
    class FilterInfo {
        clubId: number;
        page: Page;
        globalRoomId: number;
        /**
         * 查询的开始时间
         */
        beginAt: number;
        /**
         * 查询的结束时间
         */
        endAt: number;
        regulation: number;
        uid: number;
        /**
         * 向上还是向下查询
         */
        upOrDown: boolean;
        /**
         * 查询的数量
         */
        num: number;
        id: number;
        /**
         * 0 未处理 1 同意 2 不同意
         */
        deal: number;
        unionId: number;
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
/// <reference path="lobby_room.d.ts" />
declare module Cmd {
    /**
     * ---------------------------------大厅设置相关----------------------------//
     *  设置类型
     */
    enum SetType {
        /**
         * 音乐
         */
        Music = 1,
        /**
         * 音效
         */
        Sound = 2,
        /**
         * 排行榜(淘金类型的金币排行榜)
         */
        Rank = 3,
    }
    /**
     * ---------------------------------免费金币界面任务系统相关----------------------------//
     */
    enum TaskStatus {
        /**
         * 任务未开始
         */
        Task_Status_Unstart = 0,
        /**
         * 任务进行中
         */
        Task_Status_Progress = 1,
        /**
         * 已完成
         */
        Task_Status_Complete = 2,
        /**
         * 已领取奖励
         */
        Task_Status_Received = 3,
    }
    /**
     * 用户信息获取
     */
    class UserInfoGetLbyCmd_C {
        /**
         * 用户ID,当为空时，说明是自己的信息
         */
        uid: number;
        GetType(): string;
    }
    class UserInfoGetLbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 仅当不存在时，返回错误描述
         */
        desc: string;
        /**
         * 用户基本信息
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 房间数据 用于请求信息同步时 检测玩家是否已经在某个房间中
     */
    class UserRoomInfo {
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 返回当前创建的房间号 所对应的游戏区id
         */
        zoneId: number;
        /**
         * 房间号
         */
        roomId: number;
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * 场景 为匹配场则传
         */
        scene: number;
        /**
         * 该房间创建时为几人房 -- 牛牛人数不同ui不一致
         */
        baseUserNbr: number;
        GetType(): string;
    }
    /**
     * 请求邀请明细列表
     */
    class InviteInfo {
        uid: number;
        parent: number;
        headUrl: string;
        nickName: string;
        playNum: number;
        inviteTime: number;
        GetType(): string;
    }
    class PointRankInfo {
        uid: number;
        nickName: string;
        headUrl: string;
        point: number;
        GetType(): string;
    }
    class DayRankInfo {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 头像
         */
        headUrl: string;
        /**
         * 具体数值
         */
        point: number;
        /**
         * nil为没有奖励 1有奖 2已领
         */
        reward: number;
        GetType(): string;
    }
    /**
     * 开房红包提现数据
     */
    class openRecord {
        /**
         * 时间
         */
        time: number;
        /**
         * 兑换码
         */
        CDKEY: string;
        /**
         * 具体金额
         */
        reward: number;
        /**
         * 状态 1/2 未兑换／已兑换
         */
        status: number;
        GetType(): string;
    }
    /**
     * 获得大厅类型
     */
    class LobbyTypeListLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        /**
         * TableCreateConfigList的md5
         */
        md5Code: string;
        /**
         * 客户端版本信息
         */
        bundle: string;
        /**
         * 客户端代码md5
         */
        md5Game: string;
        GetType(): string;
    }
    class LobbyTypeListLobbyCmd_S {
        /**
         * 大厅支持类型,西安用,为了建容百人厅和房卡厅
         */
        lobbyTypeList: LobbyType[];
        GetType(): string;
    }
    /**
     * 用户登陆
     */
    class UserInfoSynLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        /**
         * TableCreateConfigList的md5
         */
        md5Code: string;
        /**
         * 客户端版本信息
         */
        bundle: string;
        /**
         * 客户端代码md5 -- 这个当初用于大厅版本更新的 服务器暂时没用到？
         */
        md5Game: string;
        /**
         * 大厅类型,没有指定就是0
         */
        lobbyType: number;
        /**
         * 平台子Id，用于Monitor数据分析
         */
        subPlatid: number;
        /**
         * 客户端版本号,用来判断是否需要更新
         */
        version: number;
        /**
         * 客户端上传游戏版本列表的md5 用于子游戏的版本更新
         */
        md5GameList: string;
        GetType(): string;
    }
    /**
     *  创建房间表
     *  如果有区域选择的大厅 两次检验：1 先校验大厅+n个区域
     */
    class CreateConfigListLobbyCmd_S {
        /**
         * old(lobbyGameList、createRoomConfigs) new(lobbyGameList、areaConfigs)
         */
        list: string;
        GetType(): string;
    }
    /**
     * 区域创建房间表 -- 有区域选择的大厅 两次检验：2 再校验区域+n个游戏
     */
    class AreaCreateConfigListLobbyCmd_C {
        /**
         * 区域表格md5
         */
        md5Code: string;
        /**
         * 区域id
         */
        areaId: number;
        GetType(): string;
    }
    /**
     * 区域创建房间表 只针对到指定区域
     */
    class AreaCreateConfigListLobbyCmd_S {
        /**
         * 区域id
         */
        areaId: number;
        /**
         * areaConfig、createRoomConfigs 存在两个字段
         */
        list: string;
        GetType(): string;
    }
    /**
     * 指定游戏创建房间表
     */
    class GameCreateConfigLobbyCmd_C {
        /**
         * 游戏id
         */
        gameId: number;
        /**
         * 大厅id
         */
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 指定游戏创建房间表
     */
    class GameCreateConfigLobbyCmd_S {
        resultCode: number;
        /**
         * 指定游戏的玩法表
         */
        createConfig: string;
        GetType(): string;
    }
    /**
     * 大厅类型配置
     */
    class LobbyType {
        /**
         * 大厅类型
         */
        lobbyType: number;
        /**
         * 房间类型RoomType
         */
        roomType: number;
        /**
         * 是否开启
         */
        isOpen: number;
        GetType(): string;
    }
    /**
     * 公告数据
     */
    class BroadInfo {
        /**
         * 标题
         */
        title: string;
        /**
         * 内容
         */
        content: string;
        GetType(): string;
    }
    class UserInfoSynLobbyCmd_S {
        resultCode: number;
        userInfo: Cmd.UserBaseInfo;
        /**
         * 当前是否已经创建了房间 (已改为 房间所有的玩家都可以返回房间了)
         */
        isCreate: boolean;
        /**
         * 玩家是否有可主动回去的房间
         */
        userRoomInfos: UserRoomInfo;
        /**
         * 是否为代理商
         */
        canMarket: boolean;
        /**
         * 是否显示免责声明 1则需要显示
         */
        disclaimer: number;
        /**
         * 当天还剩多少次获取分享奖励的次数 若为空表示当前活动不开启或当天已达到领取上限
         */
        shareTimes: number;
        /**
         * 1表示开启  活动结束时 该字段为空
         */
        openSignIn: number;
        /**
         * 当前第几天
         */
        days: number;
        /**
         * 是否可领取 1可领取 0不可领取
         */
        canGet: number;
        /**
         * 是否展示第一次进入的18个钻面板（贵州）1显示
         */
        showFirst: number;
        /**
         * 大厅默认公告
         */
        defaultMsg: string;
        /**
         * 是否开放积分排行榜 1开放
         */
        showPointRank: number;
        /**
         * 公告扣钻
         */
        noticeFee: number;
        /**
         * 累计充值钻石数
         */
        recharge: number;
        /**
         * 排行榜类型 不传代表当前不开放 2消耗排行榜 3开房次数排行榜
         */
        rankType: number;
        /**
         * 自动弹出老司机
         */
        showRank: number;
        /**
         * 是否显示开房红包
         */
        openReward: number;
        /**
         * 是否显示实名认证 0:不显示 1:显示
         */
        authen: number;
        /**
         * 自动弹出开房红包界面
         */
        showReward: number;
        /**
         * vip等级已经通过userinfo带回去了 所以打开vip界面不再多余请求了 这里直接带回 可领奖励
         */
        vipReward: number[];
        /**
         * 是否显示首充礼包 1 显示
         */
        firstRecharge: number;
        /**
         * 弹窗公告 如果不存在则表示不存弹窗公告
         */
        popupBroad: BroadInfo;
        /**
         * 是否显示限时优惠 1 显示
         */
        limitOffer: number;
        /**
         * 限时活动倒计时剩余时间 根据limitoOffer确定
         */
        limitActTime: number;
        /**
         * 最后一次进入的房间号,匹配号和茶馆用
         */
        lastRoomId: number;
        /**
         * 是否启用头像压缩
         */
        isCompressHeadUrl: boolean;
        /**
         * 启用头像压缩规则 如“  http:\/\/img.bwgame.com.cn\/img\/  ”
         */
        CompressHeadUrlRule: string;
        /**
         * 不填或者0表示弹默认窗,1表示新手引导,2表示三缺一加客服微信引导,
         */
        firstPage: number;
        /**
         * 1表示为代理
         */
        isAgent: number;
        /**
         * 是否显示vip话费券特权活动 1显示
         */
        vipCoupon: number;
        /**
         * 是否有未处理俱乐部的消息 1表示有
         */
        noHandle: number;
        /**
         * 是否开启瑞狗迎春活动 1表示启动
         */
        ausDog: number;
        /**
         * 奖池剩余总量
         */
        allJackPotNum: number;
        /**
         * bashi俱乐部账号
         */
        BSClubAccountId: number;
        /**
         * bashi俱乐部ID
         */
        BSClubId: number;
        /**
         * 三张游戏玩法隐藏功能
         */
        hiddenGame: Hidden_Game[];
        /**
         * 系统设置
         */
        settings: string;
        /**
         * 芝麻斗牌选场界面 进入大厅
         */
        openGameIdList: number[];
        /**
         * 游戏版本json数据 用于子游戏的版本更新
         */
        gameVersionList: string;
        GetType(): string;
    }
    /**
     * 用户信息获取
     */
    class UserInfoGetLobbyCmd_C {
        /**
         * 指定玩家uid
         */
        uid: number;
        /**
         * 是否需要获取有无房间归属
         */
        getIsCreate: boolean;
        lobbyId: number;
        GetType(): string;
    }
    class UserInfoGetLobbyCmd_S {
        resultCode: number;
        userInfo: Cmd.UserBaseInfo;
        /**
         * 当前是否已经创建了房间 (已改为 房间所有的玩家都可以返回房间了)
         */
        isCreate: boolean;
        /**
         * 累计充值钻石数
         */
        recharge: number;
        /**
         * vip等级已经通过userinfo带回去了 所以打开vip界面不再多余请求了 这里直接带回 可领奖励
         */
        vipReward: number[];
        /**
         * 告知前端是否存在官方充值存在 绑定代理商返钻 1表示存在 -- 定义在这里 而不是在玩家请求信息同步那里的原因是 需要等代理商系统回调才能获取到该数据
         */
        bindRechargeRet: number;
        /**
         * 是否显示首充礼包 1 显示 2018.06.28
         */
        firstRecharge: number;
        GetType(): string;
    }
    /**
     * 查找指定玩家 与UserInfoGetLobbyCmd_C区分一下 只用于查找返回数据给前端 不需要前端更新信息
     */
    class UserInfoSearchLobbyCmd_C {
        /**
         * 玩家ID
         */
        uid: number;
        GetType(): string;
    }
    class UserInfoSearchLobbyCmd_S {
        resultCode: number;
        /**
         * 为空则表示玩家不存在
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    class UserInfoModifyRequestLobyCmd_C {
        headUrl: string;
        nickName: string;
        gender: string;
        /**
         * 修改个性签名
         */
        signature: string;
        GetType(): string;
    }
    class UserInfoModifyReturnLobyCmd_S {
        resultCode: number;
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 分享请求
     */
    class ShareLobbyCmd_C {
        /**
         * 分享请求具体数据需要读表 所以后续需要传lobbyId
         */
        lobbyId: number;
        GetType(): string;
    }
    class ShareLobbyCmd_S {
        resultCode: number;
        /**
         * 活动时间内 每天第一次分享成功后 钻石余额
         */
        remainder: number;
        /**
         * 剩余次数
         */
        shareTimes: number;
        GetType(): string;
    }
    /**
     * 进入修改上级代理界面(丹东需要显示一下）
     */
    class GetParentLobbyCmd_C {
        GetType(): string;
    }
    class GetParentLobbyCmd_S {
        parent: number;
        GetType(): string;
    }
    /**
     * 修改上级代理
     */
    class ChangeParentCmd_C {
        /**
         * 上级代理
         */
        parent: number;
        GetType(): string;
    }
    class ChangeParentCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 已阅免责声明
     */
    class ReadDisclaimerLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 已阅弹窗公告
     */
    class ReadPopubBroadLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 获取自己的推广二维码
     */
    class GetExtendsion2DCodeCmd_C {
        GetType(): string;
    }
    class GetExtendsion2DCodeCmd_S {
        codeUrl: string;
        GetType(): string;
    }
    /**
     * 招募代理
     */
    class RecruitAgentCmd_CS {
        /**
         * 手机号码
         */
        mobilePhone: number;
        /**
         * 微信联系方式
         */
        wechat: string;
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取推广员数据
     */
    class GetInviteListCmd_CS {
        inviteList: InviteInfo[];
        codeUrl: string;
        inviteAllNum: number;
        playAllNum: number;
        myself: InviteInfo;
        /**
         * 是否可以领取砖石
         */
        canGet: number;
        /**
         * 已领
         */
        alreadyRecv: number;
        /**
         * 待领
         */
        notRecv: number;
        GetType(): string;
    }
    /**
     * 领取推广员奖励
     */
    class GetInviteRewardCmd_C {
        GetType(): string;
    }
    class GetInviteRewardCmd_S {
        resultCode: number;
        /**
         * 获取奖励后当前砖石余额
         */
        diamond: number;
        alreadyRecv: number;
        notRecv: number;
        GetType(): string;
    }
    /**
     * 领取签到奖励(麻将钻石场 正常签到领取钻石流程)
     */
    class GetRegisterRewardCmd_C {
        /**
         * 大厅id 暂时只有贵州可领取
         */
        lobbyId: number;
        GetType(): string;
    }
    class GetRegisterRewardCmd_S {
        resultCode: number;
        /**
         * 获取奖励后当前砖石余额
         */
        diamond: number;
        GetType(): string;
    }
    /**
     * 积分排行榜 （贵州）
     */
    class GetDayPointRankCmd_C {
        /**
         * 1今天，2昨天
         */
        day: number;
        GetType(): string;
    }
    /**
     * 积分排行榜 （贵州）
     */
    class GetDayPointRankCmd_S {
        resultCode: number;
        /**
         * 1今天，2昨天
         */
        day: number;
        /**
         * 排行数据
         */
        infos: PointRankInfo[];
        GetType(): string;
    }
    /**
     * 发送喇叭
     */
    class SendSuonaLobbyCmd_C {
        /**
         * 内容
         */
        content: string;
        GetType(): string;
    }
    class SendSuonaLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 系统弹框消息,目前用来控制版本,其他地方也可以用
     */
    class MessageBoxLobbyCmd_S {
        /**
         * 弹窗类型,1表示重启系统框
         */
        type: number;
        /**
         * 弹框内容
         */
        desc: string;
        /**
         * 标题
         */
        title: string;
        /**
         * 按钮,不填默认就是确定
         */
        btn1: string;
        /**
         * 按钮,不填就没有
         */
        btn2: string;
        /**
         * 按钮,不填就没有
         */
        btn3: string;
        GetType(): string;
    }
    /**
     * 钻石换房卡（江西客家）
     */
    class ExchangeCardByDiamondLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 兑换房卡数
         */
        card: number;
        GetType(): string;
    }
    /**
     * 钻石 房卡变动 都有专用的接口发送 但是存在冗余 钻石房卡同时变化时 都会推送个人信息刷新
     */
    class ExchangeCardByDiamondLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 进入房间前请求一下当前房间有谁在 (金华大厅)
     */
    class GetRoomUserLobbyCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        GetType(): string;
    }
    class GetRoomUserLobbyCmd_S {
        /**
         * 如果为空表示 正常返回 客户端读取desc数据进行显示
         */
        resultCode: number;
        desc: string;
        /**
         * 原样返回
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 获取每日排行榜数据
     */
    class GetDayRankCmd_C {
        /**
         * 1今天，2昨天
         */
        day: number;
        /**
         * 不传默认可兼容以前的1积分排行榜  2开房钻石消耗排行榜 3开房次数排行榜（暂未实现）
         */
        type: number;
        /**
         * 大厅id（兼容老的前端 默认不传时 默认奖励数据为{60,30,20,20,20}）
         */
        lobbyId: number;
        GetType(): string;
    }
    class GetDayRankCmd_S {
        resultCode: number;
        /**
         * 1今天，2昨天
         */
        day: number;
        /**
         * 排行数据
         */
        infos: DayRankInfo[];
        /**
         * 玩家自身数据
         */
        userInfo: DayRankInfo;
        GetType(): string;
    }
    /**
     * 领取每日排行榜奖励
     */
    class GetDayRankRewardCmd_C {
        /**
         * 2开房消耗排行榜奖励 3开房次数排行榜奖励（暂未实现）
         */
        type: number;
        /**
         * 大厅id （兼容老的前端 默认不传时 默认奖励数据为{60,30,20,20,20}）
         */
        lobbyId: number;
        GetType(): string;
    }
    class GetDayRankRewardCmd_S {
        resultCode: number;
        /**
         * 第几名
         */
        rank: number;
        /**
         * 获取奖励砖石
         */
        diamond: number;
        GetType(): string;
    }
    /**
     * 处罚提示前端 1警告，2禁言，3自言自语，4关禁闭，5踢下线，6封号 暂时只处理了 5 6
     */
    class PunishUserCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 取款请求
     */
    class BankWithdrawCmd_C {
        /**
         * 取款数量
         */
        num: number;
        /**
         * 密码
         */
        passwd: string;
        GetType(): string;
    }
    /**
     * 存款请求
     */
    class BankDepositCmd_C {
        /**
         * 存款数量
         */
        num: number;
        GetType(): string;
    }
    /**
     * 余款数量更新
     */
    class BankMoneyUpdate_S {
        /**
         * 身上钱数
         */
        bodyHave: number;
        /**
         * 剩款
         */
        bankHave: number;
        GetType(): string;
    }
    /**
     * 修改密码请求
     */
    class ChangePasswordCmd_C {
        /**
         * 旧密码
         */
        passwdOld: string;
        /**
         * 新密码
         */
        passwdNew: string;
        GetType(): string;
    }
    /**
     * -------------------------------------------------------------------------------------//
     * 微信红包开始
     * -------------------------------------------------------------------------------------//
     *  查看当前微信红包奖励
     */
    class GetRedPackRewardInfoLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 返回当前微信红包奖励
     */
    class GetRedPackRewardInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 待提取金额
         */
        num: number;
        /**
         * 距离可提取还有多少
         */
        distance: number;
        /**
         * 剩余时间
         */
        surplusTime: number;
        /**
         * 今日开奖情况
         */
        infos: RedPackInfo[];
        /**
         * 活动开始时间(这两个时间传了 有没有用 前端自己决定)
         */
        startTime: number;
        /**
         * 活动结束时间
         */
        endTime: number;
        GetType(): string;
    }
    /**
     * 检测是否可提取微信红包到公众号
     */
    class CheckOpenRedPackLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 红包提取类型 nil/1 不传默认老的开房红包模式/瑞狗迎春
         */
        typ: number;
        GetType(): string;
    }
    class CheckOpenRedPackLobbyCmd_S {
        /**
         * 检测通过 该字段为nil
         */
        resultCode: number;
        codeUrl: string;
        /**
         * 红包提取类型 nil/1 不传默认老的开房红包模式/瑞狗迎春
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 提取微信红包到公众号
     */
    class OpenRedPackLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 红包提取类型 nil/1 不传默认老的开房红包模式/瑞狗迎春
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 提取微信红包到公众号返回
     */
    class OpenRedPackLobbyCmd_S {
        resultCode: number;
        /**
         * 剩余
         */
        surplus: number;
        /**
         * 当前提取数据
         */
        info: openRecord;
        codeUrl: string;
        distance: number;
        /**
         * 红包提取类型 nil/1 不传默认老的开房红包模式/瑞狗迎春
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 提取微信红包失败给单独回个东西 让弹框
     */
    class OpenRedPackFailLobbyCmd_S {
        /**
         * 兑换码
         */
        CDKEY: number;
        GetType(): string;
    }
    /**
     * 查看提现详情
     */
    class GetOpenRedPackRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetOpenRedPackRecordLobbyCmd_S {
        infos: openRecord[];
        GetType(): string;
    }
    /**
     * 大厅下微信红包雨
     */
    class GrabRedPackLobbyCmd_Brd {
        /**
         * 红包id
         */
        packid: number;
        GetType(): string;
    }
    /**
     * 抢微信红包雨
     */
    class GetGrabRedPackLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 红包id
         */
        packid: number;
        GetType(): string;
    }
    /**
     * 获取微信电话
     */
    class WechatLobbyCmd_CS {
        /**
         * 姓名
         */
        name: string;
        /**
         * 手机号码
         */
        mobile: string;
        /**
         * 微信联系方式
         */
        wechat: string;
        GetType(): string;
    }
    /**
     * 实名认证
     */
    class AuthenticationLobbyCmd_C {
        /**
         * 姓名
         */
        name: string;
        /**
         * 身份证号码
         */
        cardID: string;
        GetType(): string;
    }
    class AuthenticationLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    class AuthenticationLobbyCmd_CS {
        /**
         * 姓名
         */
        name: string;
        /**
         * 身份证号码
         */
        cardID: string;
        /**
         * 手机号
         */
        mobilePhone: string;
        /**
         * 支付宝账号
         */
        alipay: string;
        /**
         * 邀请码
         */
        inviteCode: string;
        /**
         * 添加、编辑， 0 获取
         */
        typ: number;
        resultCode: number;
        GetType(): string;
    }
    /**
     * 比赛场报名
     */
    class EntryMatchLobbyCmd_C {
        lobbyId: number;
        /**
         * 报名场次
         */
        playId: number;
        GetType(): string;
    }
    class EntryMatchLobbyCmd_S {
        resultCode: number;
        lobbyId: number;
        playId: number;
        /**
         * 报名人数
         */
        enrollment: number;
        /**
         * 总需人数
         */
        totalCount: number;
        GetType(): string;
    }
    /**
     * 推送比赛场的报名人数给当前报名等待的人
     */
    class EntryMatchUserCountLobbyCmd_Brd {
        playId: number;
        /**
         * 报名人数
         */
        enrollment: number;
        /**
         * 总需人数
         */
        totalCount: number;
        GetType(): string;
    }
    /**
     * 退赛
     */
    class QuitMatchLobbyCmd_C {
        lobbyId: number;
        playId: number;
        GetType(): string;
    }
    class QuitMatchLobbyCmd_S {
        resultCode: number;
        enrollment: number;
        totalCount: number;
        GetType(): string;
    }
    /**
     * 获取报名条件
     */
    class GetEnrollConditionLobbyCmd_C {
        playId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetEnrollConditionLobbyCmd_S {
        resultCode: number;
        /**
         * 开始时间
         */
        st: string;
        /**
         * 结束时间
         */
        et: string;
        enrollment: number;
        totalCount: number;
        /**
         * 是否已经报名，前端用于判断报名界面的显示 1已报名  2未报名
         */
        isEnroll: number;
        GetType(): string;
    }
    /**
     * 比赛场战绩与奖励
     */
    class MatchLotteryLobbyCmd_Brd {
        /**
         * 战绩类型 1中途淘汰，2等待晋级，3比赛结束最终奖励
         */
        rType: number;
        rank: number;
        round: number;
        point: number;
        GetType(): string;
    }
    /**
     * 等待晋级页面数据刷新
     */
    class WaitMatchPromotionInfoLobbyCmd_Brd {
        playId: number;
        /**
         * 剩余晋级数量
         */
        remainder: number;
        GetType(): string;
    }
    /**
     * 获取符合比赛场符合报名条件的人数
     */
    class JoinMatch {
        playId: number;
        userCount: number;
        /**
         * 是否可点击
         */
        click: boolean;
        GetType(): string;
    }
    class GetJoinMatchUserCountCmd_C {
        playIdSet: number[];
        GetType(): string;
    }
    class GetJoinMatchUserCountCmd_S {
        resultCode: number;
        joinMatch: JoinMatch[];
        GetType(): string;
    }
    /**
     * 比赛场异常补偿弹窗
     */
    class SendMatchAbnormalLobbyCmd_Brd {
        /**
         * 赔偿信息
         */
        compensation: string;
        GetType(): string;
    }
    /**
     * 符合比赛场报名条件人的排行信息
     */
    class JoinMatchRank {
        nickname: string;
        /**
         * 夺冠次数
         */
        crownnum: number;
        GetType(): string;
    }
    class GetJoinMatchRankLobbyCmd_C {
        playId: number;
        GetType(): string;
    }
    class GetJoinMatchRankLobbyCmd_S {
        joinMatchRank: JoinMatchRank[];
        /**
         * 可报名多少人
         */
        enrollment: number;
        /**
         * 总需多少人
         */
        totalCount: number;
        /**
         * 当前时间
         */
        curTime: string;
        GetType(): string;
    }
    /**
     * 百人场 进入某个游戏
     */
    class EnterHundredGameLobbyCmd_C {
        gameId: number;
        /**
         * 是否是体验场 1是
         */
        isLearn: number;
        /**
         * 测试服允许前端指定区服id
         */
        preZoneId: number;
        GetType(): string;
    }
    class EnterHundredGameLobbyCmd_S {
        resultCode: number;
        gameId: number;
        zoneId: number;
        /**
         * 是否是体验场 1是
         */
        isLearn: number;
        GetType(): string;
    }
    /**
     * -------------------------------------------------------------------------------------//
     *  每日签到活动(麻将金币场引入的 二号签到流程 - -#)
     * -------------------------------------------------------------------------------------//
     */
    class ContinueSignInfo {
        id: number;
        /**
         * 连续领取天数
         */
        continueDay: number;
        /**
         * 是否已领取
         */
        bReceived: boolean;
        /**
         * 是否可领取
         */
        bCouldReceive: boolean;
        GetType(): string;
    }
    /**
     * 用户签到信息获取
     */
    class UserSignInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class UserSignInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 本周已签到日期(周一至周日 分别为 1 -- 7)
         */
        signWeek: number[];
        /**
         * 连续签到数据
         */
        continue: ContinueSignInfo[];
        /**
         * 今日是否已领取
         */
        bTodayReceived: boolean;
        continueDay: number;
        /**
         * 未领取的本周签到(周一至周日 分别为 1 -- 7) 空值表示没有未领取
         */
        noSignWeek: number[];
        /**
         * 当天可领取的每周签到(周一至周日 分别为 1 -- 7) 空值表示没有可领取
         */
        signWeekDay: number;
        GetType(): string;
    }
    /**
     * 用户今日签到
     */
    class UserSignTodayLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class UserSignTodayLobbyCmd_S {
        resultCode: number;
        curWeek: number;
        GetType(): string;
    }
    /**
     * 用户领取累计签到奖励
     */
    class UserSignContinueLobbyCmd_C {
        lobbyId: number;
        /**
         * 累计签到id
         */
        continueSignId: number;
        GetType(): string;
    }
    class UserSignContinueLobbyCmd_S {
        resultCode: number;
        /**
         * 累计签到id
         */
        continueSignId: number;
        GetType(): string;
    }
    /**
     * -------------------------------------------------------------------------------------//
     *  金币场排行榜(麻将金币场引入的 二号排行榜 跟麻将排行榜不混在一起 - -#)
     * -------------------------------------------------------------------------------------//
     */
    class UserRankInfo {
        uid: number;
        headUrl: string;
        gender: string;
        nickName: string;
        signature: string;
        /**
         * 玩家 总共筹码
         */
        allChips: number;
        /**
         * 玩家 当天赢取筹码
         */
        winChips: number;
        /**
         * 玩家 总充值
         */
        allRecharge: number;
        /**
         * 玩家 魅力 （暂时先不用就行了 不理它）
         */
        charm: number;
        /**
         * 玩家 自身排名
         */
        rank: number;
        /**
         * 玩家 vip等级
         */
        vip: number;
        /**
         * 玩家 魅力值
         */
        userCp: number;
        /**
         * 玩家 头衔
         */
        title: string;
        /**
         * 正在使用的个人形象 2017.11.15好彩真人需求
         */
        personalImage: Cmd.PersonalImage[];
        /**
         * 玩家游戏盈利金币
         */
        dailyWinChips: number;
        /**
         * 周魅力值
         */
        weekUserCp: number;
        /**
         * 玩家周游戏盈利金币
         */
        weekWinChips: number;
        /**
         * 货币类型 1 钻石 2 金币
         */
        rType: number;
        GetType(): string;
    }
    /**
     * 获取排行榜信息
     */
    class GetListRankCmd_C {
        /**
         * 不填或者1表示钻石,2表示金豆
         */
        rType: number;
        /**
         * 第几次请求 一次请求获取20个数据
         */
        index: number;
        GetType(): string;
    }
    /**
     * 获取排行榜信息回复
     */
    class GetListRankCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 是否首次进入排行榜（如果在设置中设置过是否参加排行榜则 也算）
         */
        isFirst: boolean;
        /**
         * 金币排行榜
         */
        allChipsRank: UserRankInfo[];
        /**
         * 我的金币排行信息
         */
        myAllChipsRank: UserRankInfo;
        /**
         * 大赢家排行榜
         */
        winChipsRank: UserRankInfo[];
        /**
         * 我的大赢家排行信息
         */
        myWinChipsRank: UserRankInfo;
        /**
         * 充值排行榜
         */
        allRechargeRankList: UserRankInfo[];
        /**
         * 我的充值排行榜
         */
        myAllRechargeRank: UserRankInfo;
        index: number;
        /**
         * 昨日充值排行榜
         */
        allYesterdayRechargeList: UserRankInfo[];
        /**
         * 我的昨日充值排行榜
         */
        myYesterdayRechargeRank: UserRankInfo;
        /**
         * 更新时间
         */
        updatetime: number;
        GetType(): string;
    }
    /**
     * 获取大赢家排行榜奖励
     */
    class GetWinChipsRankRewardCmd_C {
        GetType(): string;
    }
    /**
     * 获取大赢家排行榜奖励回复
     */
    class GetWinChipsRankRewardCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 领取多少筹码
         */
        chips: number;
        /**
         * 当前剩余多少筹码
         */
        remainder: number;
        GetType(): string;
    }
    /**
     * 魅力值排行榜
     */
    class GetUserCpRankListLobbyCmd_C {
        GetType(): string;
    }
    class GetUserCpRankListLobbyCmd_S {
        allUserCpRank: UserRankInfo[];
        /**
         * 自己的排名，为空则表示未上榜
         */
        myRank: number;
        GetType(): string;
    }
    /**
     * 好彩真人金币排行榜(无数个排行榜)
     */
    class GetCoinLobbyRankListLobbyCmd_C {
        /**
         * 1财富总榜 2充值总榜 3魅力值周榜 4魅力值总榜 5游戏盈利榜 6银鲨榜 7金鲨榜
         */
        rType: number;
        /**
         * 如果查询的是游戏盈利榜则需要传对应的游戏id过来
         */
        gameId: number;
        GetType(): string;
    }
    class GetCoinLobbyRankListLobbyCmd_S {
        resultCode: number;
        rType: number;
        /**
         * 如果查询的是游戏盈利榜则需要传对应的游戏id过来
         */
        gameId: number;
        rankInfo: UserRankInfo[];
        /**
         * 自己的排名，为空则表示未上榜
         */
        myRank: number;
        /**
         * 差多少上榜
         */
        distance: number;
        /**
         * 更新时间
         */
        updatetime: number;
        GetType(): string;
    }
    /**
     * 芝麻斗牌 排行榜(新加一个 不用兼容以前的)
     */
    class GetRankListLobbyCmd_C {
        /**
         * 1 金币 2 钻石
         */
        rType: number;
        /**
         * 前端是否已有数据 1:有 0:没有
         */
        bData: number;
        GetType(): string;
    }
    class GetRankListLobbyCmd_S {
        resultCode: number;
        rType: number;
        rankInfo: UserRankInfo[];
        myRank: number;
        GetType(): string;
    }
    /**
     * 大厅设置
     */
    class GameSetLobbyCmd_C {
        /**
         * 设置哪一项
         */
        setType: SetType;
        /**
         * 开 或 关
         */
        status: boolean;
        GetType(): string;
    }
    class GameSetLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 获取当前设置
     */
    class GetGameSetLobbyCmd_C {
        GetType(): string;
    }
    class GetGameSetLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 音乐设置
         */
        music: boolean;
        /**
         * 音效设置
         */
        sound: boolean;
        /**
         * 排行榜设置
         */
        rank: boolean;
        GetType(): string;
    }
    /**
     * 领取vip奖励
     */
    class GetVipRewardLobbyCmd_C {
        lobbyId: number;
        /**
         * 领取制定档次
         */
        level: number;
        GetType(): string;
    }
    class GetVipRewardLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 领取制定档次
         */
        level: number;
        GetType(): string;
    }
    /**
     * ---------------------------------商城购买相关----------------------------//
     */
    class BuyGoodsLobbyCmd_C {
        shopId: number;
        shopNbr: number;
        GetType(): string;
    }
    class BuyGoodsLobbyCmd_S {
        resultCode: number;
        shopId: number;
        shopNbr: number;
        GetType(): string;
    }
    class TaskItem {
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 任务状态
         */
        taskStatus: TaskStatus;
        /**
         * 子任务已完成数量
         */
        subTaskCompletedNbr: number;
        /**
         * 子任务总数量
         */
        subTaskAllNbr: number;
        GetType(): string;
    }
    class RewardItem {
        /**
         * 物品ID
         */
        goodId: number;
        /**
         * 物品数量
         */
        goodNbr: number;
        GetType(): string;
    }
    class DaysTaskItem {
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 任务状态
         */
        taskStatus: TaskStatus;
        /**
         * 当前完成进度
         */
        current: number;
        /**
         * 已领取次数
         */
        recv: number;
        /**
         * 剩余领取次数
         */
        remainder: number;
        GetType(): string;
    }
    /**
     * 进入免费金币界面
     */
    class IntoFreeGoldLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class IntoFreeGoldLobbyCmd_S {
        resultCode: number;
        taskInfo: DaysTaskItem[];
        /**
         * 引入金币场系统后 新增的 其他类型任务
         */
        otherTaskInfo: DaysTaskItem[];
        /**
         * 成就任务，属于一次性任务
         */
        onceTaskInfo: DaysTaskItem[];
        GetType(): string;
    }
    /**
     * 领取指定任务奖励
     */
    class GetDaysTaskRewardLobbyCmd_C {
        taskId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetDaysTaskRewardLobbyCmd_S {
        resultCode: number;
        taskId: number;
        GetType(): string;
    }
    /**
     * 向前端发送破产补助弹窗
     */
    class SendBankruptcyLobbyCmd_Brd {
        /**
         * 已经领取过多少次破产补助  总次数、金额等 前端自己读表
         */
        bankruptcy: number;
        GetType(): string;
    }
    /**
     * 游戏任务进度 例如：1/10
     */
    class GetGameTaskScheduleLobbyCmd_C {
        /**
         * 游戏id
         */
        gameId: number;
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 每更新一次服务器会主动推送_S给客户端
     */
    class GetGameTaskScheduleLobbyCmd_S {
        resultCode: number;
        gameId: number;
        /**
         * 前面的值 例如：1/10
         */
        pre: number;
        /**
         * 后面的值 例如：1/10
         */
        back: number;
        /**
         * 1为可领取状态，前端用来展示光圈 2为所有的任务奖励都已经领取
         */
        receive: number;
        taskId: number;
        GetType(): string;
    }
    /**
     * 获取任务列表
     */
    class GetGameTaskListLobbyCmd_C {
        gameId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetGameTaskListLobbyCmd_S {
        resultCode: number;
        gameId: number;
        gameTaskInfo: DaysTaskItem[];
        GetType(): string;
    }
    /**
     * 领取指定游戏任务奖励
     */
    class GetGameTaskRewardLobbyCmd_C {
        taskId: number;
        gameId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetGameTaskRewardLobbyCmd_S {
        resultCode: number;
        taskId: number;
        gameId: number;
        goods: Cmd.Goods[];
        /**
         * 描述，三张大厅使用
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 新金币场首充
     */
    class FirstRechargeInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 新金币场首充弹窗
     */
    class FirstRechargeInfoLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 商城id
         */
        shopId: number;
        /**
         * 是否可以领取 1 可以领取
         */
        receive: number;
        GetType(): string;
    }
    /**
     * 领取首充礼包
     */
    class FirstRecharge {
        /**
         * 1 金币  2钻石  (暂时只有金币)
         */
        awardType: number;
        /**
         * 奖励数量
         */
        awardNum: number;
        GetType(): string;
    }
    class ReceiveFirstRechargeLobbyCmd_C {
        GetType(): string;
    }
    class ReceiveFirstRechargeLobbyCmd_S {
        resultCode: number;
        award: FirstRecharge[];
        GetType(): string;
    }
    /**
     * 限时优惠活动
     */
    class LimitOfferChipsLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 限时优惠活动的弹窗
     */
    class LimitOfferChipsLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 对应的档位id
         */
        limitId: number;
        /**
         * 限时活动倒计时剩余时间
         */
        limitActTime: number;
        GetType(): string;
    }
    /**
     * 兑换限时优惠的金币
     */
    class GetLimitOfferChipsLobbyCmd_C {
        /**
         * 对应的档位id
         */
        limitId: number;
        /**
         * 对应的优惠id
         */
        shopId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetLimitOfferChipsLobbyCmd_S {
        resultCode: number;
        shopId: number;
        GetType(): string;
    }
    /**
     * 幸运翻翻翻资格
     */
    class GetLuckTurnCardInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetLuckTurnCardInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 0拥有免费资格(免费抽奖) 1当前已使用(翻牌需要消耗货币) 2暂未拥有(不允许参与翻牌)
         */
        freeTurn: number;
        /**
         * 当前最大局数
         */
        curRound: number;
        /**
         * 免费条件的局数
         */
        freeRound: number;
        /**
         * 1免费 2钻石
         */
        costType: number;
        /**
         * 消耗钻石数量
         */
        costNum: number;
        GetType(): string;
    }
    /**
     * 幸运翻翻翻的翻牌结果
     */
    class GetLuckTurnCardResultLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetLuckTurnCardResultLobbyCmd_S {
        resultCode: number;
        /**
         * 1金币 2钻石
         */
        awardType: number;
        /**
         * 数量
         */
        awardNum: number;
        /**
         * 0拥有免费资格(免费抽奖) 1当前已使用(翻牌需要消耗货币) 2暂未拥有(不允许参与翻牌)
         */
        freeTurn: number;
        /**
         * 当前最大局数
         */
        curRound: number;
        /**
         * 免费条件的局数
         */
        freeRound: number;
        /**
         * 1免费 2钻石
         */
        costType: number;
        /**
         * 消耗钻石数量
         */
        costNum: number;
        GetType(): string;
    }
    /**
     *  新版幸运翻翻翻
     *  金币奖励集合
     */
    class RewardChips {
        /**
         * chips只有在第一轮或者已领取的时候才会回给客户端
         */
        chips: number;
        /**
         * 是否是最大值 1是
         */
        maxChips: number;
        /**
         * 是否已领取 1是
         */
        recv: number;
        /**
         * 第几张牌
         */
        index: number;
        GetType(): string;
    }
    /**
     * 新版幸运翻翻翻主界面
     */
    class NewLuckTurnCardShowLobbyCmd_C {
        GetType(): string;
    }
    class NewLuckTurnCardShowLobbyCmd_S {
        resultCode: number;
        /**
         * 当前完成局数
         */
        curRound: number;
        /**
         * 总局数
         */
        totalRound: number;
        /**
         * 翻牌类型 1:免费 2:钻石 3:今天已结束,不可领
         */
        costType: number;
        /**
         * 消耗数量 只有用钻石的时候才存在
         */
        costNum: number;
        /**
         * 幸运翻翻翻的轮数
         */
        luckRound: number;
        /**
         * 金币奖励集合
         */
        reward: RewardChips[];
        GetType(): string;
    }
    /**
     * 新版幸运翻翻翻翻牌
     */
    class NewGetLuckTurnCardRewardLobbyCmd_C {
        /**
         * 第几张牌
         */
        index: number;
        GetType(): string;
    }
    class NewGetLuckTurnCardRewardLobbyCmd_S {
        resultCode: number;
        /**
         * 获得的金币数
         */
        rewardChips: number;
        /**
         * 下面的用于刷新界面
         * 当前完成局数
         */
        curRound: number;
        /**
         * 总局数
         */
        totalRound: number;
        /**
         * 翻牌类型 1:免费 2:钻石 3:今天已结束,不可领
         */
        costType: number;
        /**
         * 消耗数量 只有用钻石的时候才存在
         */
        costNum: number;
        /**
         * 幸运翻翻翻的轮数
         */
        luckRound: number;
        /**
         * 金币奖励集合
         */
        reward: RewardChips[];
        GetType(): string;
    }
    /**
     * 第三版幸运翻翻翻
     * 对应的翻牌结果
     */
    class TurnReward {
        /**
         * 第几张牌
         */
        index: number;
        /**
         * 状态 0未翻开 1翻开
         */
        status: number;
        /**
         * 翻开后的话费券数量 status为1的时候存在
         */
        reward: number;
        /**
         * 金币翻牌未翻开时展示话费券的最小值和最大值
         * 最小值
         */
        minReward: number;
        /**
         * 最大值
         */
        maxReward: number;
        /**
         * 金币翻牌需要消耗的金币数量
         */
        costChips: number;
        GetType(): string;
    }
    /**
     * 获取对应的界面数据
     */
    class GetLuckTurnCardShowInfoV3LobbyCmd_C {
        lobbyId: number;
        /**
         * 0主界面 1免费抽奖界面 2金币抽奖界面
         */
        sType: number;
        GetType(): string;
    }
    class GetLuckTurnCardShowInfoV3LobbyCmd_S {
        resultCode: number;
        sType: number;
        /**
         * 主界面的话费券展示集合
         */
        couponList: number[];
        /**
         * 免费抽奖当前完成的对局信息
         * 当前局数
         */
        curRound: number;
        /**
         * 总局数
         */
        totalRound: number;
        /**
         * 免费界面数据
         */
        freeTurn: TurnReward[];
        /**
         * 金币界面数据
         */
        chipsTurn: TurnReward[];
        /**
         * 轮数
         */
        luckRound: number;
        GetType(): string;
    }
    /**
     * 翻牌结果
     */
    class GetLuckTurnCardRewardV3LobbyCmd_C {
        lobbyId: number;
        /**
         * 1免费翻 2金币翻
         */
        opType: number;
        /**
         * 翻第几张牌
         */
        index: number;
        GetType(): string;
    }
    class GetLuckTurnCardRewardV3LobbyCmd_S {
        resultCode: number;
        opType: number;
        reward: TurnReward;
        /**
         * 轮数
         */
        luckRound: number;
        /**
         * 免费翻牌刷新
         * 当前局数
         */
        curRound: number;
        /**
         * 总局数
         */
        totalRound: number;
        GetType(): string;
    }
    /**
     * 好彩金币场的救济金
     */
    class GetReliefPayStatusLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetReliefPayStatusLobbyCmd_S {
        resultCode: number;
        reliefPay: DaysTaskItem;
        GetType(): string;
    }
    /**
     * 礼包码兑换功能
     */
    class UserGiftCodeLobbyCmd_C {
        giftCode: string;
        GetType(): string;
    }
    class UserGiftCodeLobbyCmd_S {
        resultCode: number;
        items: RewardItem[];
        GetType(): string;
    }
    /**
     * 好彩金币场快速开始按钮
     */
    class QuickStartGameLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class QuickStartGameLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 进入绑定代理商界面 -- 福建新增 这个感觉跟存在自身的parent不是同一个
     */
    class IntoHigherAgentLobbyCmd_C {
        /**
         * 绑定类型 默认为nil 兼容老版本短id  1表示当前请求得是上级代理的真实uid
         */
        bindType: number;
        GetType(): string;
    }
    class IntoHigherAgentLobbyCmd_S {
        /**
         * 查询结果 成功不返回 失败返回错误码
         */
        resultCode: number;
        /**
         * 有则传 无则为nil
         */
        higherAgent: number;
        GetType(): string;
    }
    /**
     * 通过大厅向代理商系统 绑定上级代理(福建新增的一个绑定类型)
     */
    class EnquireBindAgent2LobbyCmd_C {
        higherAgent: number;
        /**
         * 绑定类型 默认为nil 兼容老版本短id  1表示当前输入的上级id为上级玩家uid
         */
        bindType: number;
        GetType(): string;
    }
    class EnquireBindAgent2LobbyCmd_S {
        /**
         * 查询结果 成功不返回 失败返回错误码
         */
        resultCode: number;
        /**
         * 绑定成功后 带回来
         */
        higherAgent: number;
        GetType(): string;
    }
    /**
     * zqb银行相关协议 不共用西安的
     */
    class AccessBankChipsLobbyCmd_C {
        lobbyId: number;
        /**
         * 操作类型 1/2  存、取
         */
        typ: number;
        /**
         * 货币类型 1/2/3 金币、钻石、房卡
         */
        chipsType: number;
        /**
         * 数值
         */
        num: number;
        /**
         * 密码 暂时不需要密码 所以暂无密码修改设定等
         */
        passwd: string;
        GetType(): string;
    }
    class AccessBankChipsLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 修改用户信息(好彩真人有些信息需要特殊处理在这里重新定义下)
     */
    class UserInfoModifyLobbyCmd_C {
        /**
         * 暂时只有昵称特殊处理,后续有其他的再添加
         */
        nickName: string;
        GetType(): string;
    }
    class UserInfoModifyLobbyCmd_S {
        resultCode: number;
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 申请添加好友
     */
    class AddFriendLobbyCmd_C {
        uid: number;
        /**
         * 好友验证信息
         */
        msg: string;
        GetType(): string;
    }
    class AddFriendLobbyCmd_S {
        /**
         * optional UserBaseInfo 	userInfo   = 2; //好友信息
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 删除好友
     */
    class RemoveFriendLobbyCmd_C {
        /**
         * 好友ID
         */
        uid: number;
        GetType(): string;
    }
    class RemoveFriendLobbyCmd_S {
        resultCode: number;
        /**
         * 删除好友ID
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 获取好友列表
     */
    class GetFriendListLobbyCmd_C {
        /**
         * 分页
         */
        index: number;
        GetType(): string;
    }
    class GetFriendListLobbyCmd_S {
        resultCode: number;
        /**
         * 为空则表示没有数据
         */
        friendList: Cmd.UserBaseInfo[];
        index: number;
        /**
         * 好友数量
         */
        friendNum: number;
        /**
         * 可加好友总量
         */
        totalNum: number;
        GetType(): string;
    }
    /**
     * 好友申请列表
     */
    class GetFriendApplyListLobbyCmd_C {
        /**
         * 分页
         */
        index: number;
        GetType(): string;
    }
    class GetFriendApplyListLobbyCmd_S {
        resultCode: number;
        /**
         * 为空则表示没有数据
         */
        applyList: Cmd.UserBaseInfo[];
        index: number;
        /**
         * 有验证信息申请
         */
        applyUser: GetFriendApplyListLobbyCmd_S.ApplyUser[];
        GetType(): string;
    }
    module GetFriendApplyListLobbyCmd_S {
        class ApplyUser {
            user: Cmd.UserBaseInfo;
            /**
             * 好友验证信息
             */
            msg: string;
            /**
             * 0: 没有操作过, 1: 同意，2:拒绝
             */
            state: number;
            GetType(): string;
        }
    }
    /**
     * 同意，拒绝好友申请
     */
    class DealFriendApplyListLobbyCmd_C {
        /**
         * 1:同意，2:拒绝，3:全部同意，4:全部拒绝,  5:删除
         */
        type: number;
        uid: number;
        GetType(): string;
    }
    class DealFriendApplyListLobbyCmd_S {
        resultCode: number;
        type: number;
        uid: number;
        GetType(): string;
    }
    /**
     * 查找特定玩家(因为存在机器人的情况所有不能用UserInfoGetLobbyCmd_C UserInfoGetLobbyCmd_S的协议)
     */
    class SearchUserLobbyCmd_C {
        /**
         * 玩家ID
         */
        uid: number;
        /**
         * 1 获取指定好友信息 2 获取好友信息和金币场战绩信息
         */
        type: number;
        GetType(): string;
    }
    class SearchUserLobbyCmd_S {
        resultCode: number;
        /**
         * 为空则表示玩家不存在
         */
        userInfo: Cmd.UserBaseInfo;
        /**
         * 金币场战绩信息  //本来打算让前端自己去将userinfo带到具体的信息面板，前端不好处理，这里将根据type在重新返回下
         */
        gameRecord: CoinGameRecord[];
        type: number;
        GetType(): string;
    }
    /**
     * 查找好友界面
     */
    class SearchFriendsListLobbyCmd_C {
        /**
         * 刷新次数
         */
        refurbish: number;
        GetType(): string;
    }
    class SearchFriendsListLobbyCmd_S {
        /**
         * 刷新次数
         */
        refurbish: number;
        friendList: Cmd.UserBaseInfo[];
        GetType(): string;
    }
    /**
     * 好友聊天
     */
    class FriendChatLobbyCmd_C {
        chatInfo: Cmd.ChatInfo;
        GetType(): string;
    }
    /**
     * 发送和接收者都用这一条消息推送
     */
    class FriendChatLobbyCmd_S {
        resultCode: number;
        chatInfo: Cmd.ChatInfo;
        GetType(): string;
    }
    /**
     * 消息红点功能
     */
    class RedPoint {
        msgType: Cmd.MsgType;
        msgNum: number;
        clubId: number;
        GetType(): string;
    }
    class ShowRedPointLobbyCmd_S {
        redPoint: RedPoint[];
        GetType(): string;
    }
    /**
     * 移除红点请求
     */
    class RemoveRedPointLobbyCmd_CS {
        redPoint: RedPoint[];
        GetType(): string;
    }
    /**
     * 获取验证码当前认证状态
     */
    class GetIdentifyingCodeStateLobbyCmd_CS {
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    /**
     * 获取验证码
     */
    class GetIdentifyingCodeLobbyCmd_C {
        /**
         * 手机号
         */
        phoneNumber: number;
        /**
         * 1:绑定 2:解除绑定
         */
        opType: number;
        GetType(): string;
    }
    class GetIdentifyingCodeLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 绑定手机
     */
    class BindingMobilePhoneLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 手机号
         */
        phoneNumber: number;
        /**
         * 1:绑定 2:解除绑定
         */
        opType: number;
        GetType(): string;
    }
    class BindingMobilePhoneLobbyCmd_S {
        resultCode: number;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    /**
     * 获取红包信息
     */
    class GetRedPackInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetRedPackInfoLobbyCmd_S {
        /**
         * 红包
         */
        redpackSet: RedPack[];
        /**
         * 剩余次数
         */
        surplus: number;
        /**
         * 1:手机号未绑定 2:未到开奖时间 3:活动已结束 4:次数已用完
         */
        resultCode: number;
        /**
         * 距离下一次领取的剩余时间
         */
        surplustime: number;
        /**
         * 活动时间
         */
        activitytime: string;
        GetType(): string;
    }
    /**
     * 抢红包
     */
    class GrabRedPackLobbyCmd_C {
        /**
         * 幸运词
         */
        luckyword: string;
        GetType(): string;
    }
    class GrabRedPackLobbyCmd_S {
        /**
         * 中奖红包
         */
        redpack: RedPack;
        /**
         * 剩余次数
         */
        surplus: number;
        GetType(): string;
    }
    /**
     * 累计奖励
     */
    class GetMyRedPackRewardLobbyCmd_C {
        GetType(): string;
    }
    class GetMyRedPackRewardLobbyCmd_S {
        uid: number;
        /**
         * 累计现金
         */
        totalMoney: number;
        /**
         * 累计金币
         */
        totalChips: number;
        /**
         * 奖励明细
         */
        recordSet: RedPack[];
        /**
         * 是否已兑换 1:已兑 0:未兑
         */
        recv: number;
        GetType(): string;
    }
    /**
     * 兑换
     */
    class ExchangeRedPackLobbyCmd_C {
        /**
         * 微信
         */
        wechat: string;
        GetType(): string;
    }
    class ExchangeRedPackLobbyCmd_S {
        /**
         * 1:活动未结束 2:没有现金红包 3:已兑换
         */
        resultCode: number;
        GetType(): string;
    }
    class RedPack {
        /**
         * 现金
         */
        money: number;
        /**
         * 金币
         */
        chips: number;
        /**
         * 日期
         */
        date: string;
        GetType(): string;
    }
    /**
     * 获取金币场战绩(由于这个数据量的问题,不放在userBaseInfo里面，需要前端根据需求去自行请求)
     */
    class CoinGameRecord {
        gameId: number;
        /**
         * 胜率
         */
        winPercent: number;
        /**
         * 总局数
         */
        totalRound: number;
        /**
         * 连胜局数
         */
        winStreak: number;
        /**
         * 单局最多赢取金币
         */
        winChips: number;
        /**
         * 单局最大输掉金币
         */
        loseChips: number;
        GetType(): string;
    }
    class GetCoinGameRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetCoinGameRecordLobbyCmd_S {
        gameRecord: CoinGameRecord[];
        GetType(): string;
    }
    /**
     * 获取礼品券
     */
    class GetGiftVoucherLobbyCmd_C {
        GetType(): string;
    }
    class GetGiftVoucherLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 礼品券
         */
        giftVoucher: number;
        GetType(): string;
    }
    /**
     * 兑换礼品券记录个人信息
     */
    class ExchangeGiftVoucherRecordUserInfoLobby_C {
        /**
         * 真实姓名
         */
        realName: string;
        /**
         * 手机号码
         */
        phoneNumber: string;
        /**
         * 商品ID //2017.11.15之后的礼品券兑换实物就可以只传商品id
         */
        shopId: number;
        lobbyId: number;
        GetType(): string;
    }
    class ExchangeGiftVoucherRecordUserInfoLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取兑换记录
     */
    class ExchangeRecord {
        /**
         * 商品Id,对应上面协议ExchangeGiftVoucherRecordUserInfoLobby_C的shopId
         */
        shopId: number;
        /**
         * 礼品券数量
         */
        coupon: number;
        /**
         * 兑换时间
         */
        timestamp: number;
        /**
         * 兑换状态 0:未兑换 1:已兑换
         */
        state: number;
        GetType(): string;
    }
    class GetExchangeRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetExchangeRecordLobbyCmd_S {
        /**
         * 为空则表示没有兑换记录
         */
        record: ExchangeRecord[];
        GetType(): string;
    }
    /**
     * 获取收货地址
     */
    class GetShippingAddressLobby_C {
        GetType(): string;
    }
    class GetShippingAddressLobby_S {
        resultCode: number;
        /**
         * 邮寄地址
         */
        addr: Cmd.DeliverAddr;
        GetType(): string;
    }
    /**
     * 填写或修改收货地址
     */
    class ChangeShippingAddressLobby_C {
        /**
         * 邮寄地址
         */
        addr: Cmd.DeliverAddr;
        GetType(): string;
    }
    class ChangeShippingAddressLobby_S {
        resultCode: number;
        /**
         * 邮寄地址
         */
        addr: Cmd.DeliverAddr;
        GetType(): string;
    }
    /**
     * 请求转盘信息
     */
    class GetInfoTurnTableCmd_C {
        GetType(): string;
    }
    /**
     * 转盘信息回复
     */
    class GetInfoTurnTableCmd_S {
        /**
         * 回复
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 累计登录天数
         */
        days: number;
        /**
         * 今天已经转了几次了
         */
        times: number;
        /**
         * 当前身上还有多少礼品券
         */
        giftVoucher: number;
        /**
         * 今天是否已经开过宝箱
         */
        isOpen: boolean;
        GetType(): string;
    }
    /**
     * 转动转盘
     */
    class TurnTurnTableCmd_C {
        GetType(): string;
    }
    /**
     * 转动转盘回复
     */
    class TurnTurnTableCmd_S {
        /**
         * 回复
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 今天已经转了几次了
         */
        times: number;
        /**
         * 转中的哪一个
         */
        turnId: number;
        /**
         * 奖励翻倍
         */
        multiple: number;
        /**
         * 当前身上还有多少礼品券
         */
        giftVoucher: number;
        /**
         * 玩家获得的奖励
         */
        rewardNum: number;
        /**
         * 今天是否打开过宝箱
         */
        isOpen: boolean;
        GetType(): string;
    }
    /**
     * 领取神秘宝箱奖励
     */
    class GetCumulativeRewordTurnTableCmd_C {
        GetType(): string;
    }
    /**
     * 领取神秘宝箱奖励回复
     */
    class GetCumulativeRewordTurnTableCmd_S {
        /**
         * 回复
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 抽中的哪一个
         */
        getId: number;
        /**
         * 获得的奖励
         */
        rewardNum: number;
        GetType(): string;
    }
    /**
     * 好彩大厅VIP系统
     */
    class GetUserVipInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetUserVipInfoLobbyCmd_S {
        resultCode: number;
        /**
         * vip等级
         */
        vipLevel: number;
        /**
         * vip点数
         */
        vipPoint: number;
        /**
         * vip未领取奖励
         */
        vipReward: number[];
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 退出面板
     */
    class QuitGameInfo {
        /**
         * 根据不同的type去取对应的数据
         */
        type: QuitGameInfo.QuitType;
        /**
         * 明日签到获取奖励
         */
        signChips: number;
        /**
         * 幸运翻翻翻剩余局数 和 costDiamond不同时存在
         */
        turnRound: number;
        /**
         * 幸运翻翻翻消耗钻石 和 round不同时存在
         */
        turncostDiamond: number;
        /**
         * 充值6/30 为空的话则表明6&amp;30任务都已经完成
         */
        recharge: number;
        GetType(): string;
    }
    module QuitGameInfo {
        enum QuitType {
            /**
             * 幸运翻翻翻 turnRound/turncostDiamond
             */
            TurnCard = 1,
            /**
             * 每日签到 signChips
             */
            DaySign = 2,
            /**
             * 每日充值 recharge
             */
            Recharge = 3,
        }
    }
    class QuitGameShowLobbyCmd_C {
        GetType(): string;
    }
    class QuitGameShowLobbyCmd_S {
        quitGameInfo: QuitGameInfo[];
        GetType(): string;
    }
    /**
     * 获取累计红包金额
     */
    class GetTotalRedPackMoneyLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 当累计金额发生变化时，服务器会主动推送
     */
    class GetTotalRedPackMoneyLobbyCmd_S {
        totalMoney: number;
        GetType(): string;
    }
    /**
     * 新用户红包界面
     */
    class GetNewUserRedPackShowLobbyCmd_C {
        GetType(): string;
    }
    class GetNewUserRedPackShowLobbyCmd_S {
        resultCode: number;
        /**
         * 待领取红包集合[1,2,3,4,5,6,7]
         */
        waitRecvSet: number[];
        /**
         * 已领取红包集合[1,2,3,4,5,6,7]
         */
        recvSet: number[];
        /**
         * 已过期红包集合[1,2,3,4,5,6,7]
         */
        timeOutSet: number[];
        /**
         * 今天可领取天数
         */
        bToday: number;
        GetType(): string;
    }
    /**
     * 领取新手红包
     */
    class ExchangeNewUserRedPackLobbyCmd_C {
        recvDay: number;
        GetType(): string;
    }
    class ExchangeNewUserRedPackLobbyCmd_S {
        resultCode: number;
        /**
         * 用于去更新界面数据
         */
        recvDay: number;
        /**
         * 现金
         */
        cash: number;
        /**
         * 话费券
         */
        coupon: number;
        /**
         * 对应道具（2018.05.14）
         */
        goods: Cmd.Goods;
        GetType(): string;
    }
    /**
     * 话费券兑换红包界面
     */
    class CCRedPack {
        id: number;
        /**
         * 满足条件
         */
        condition: number;
        /**
         * 状态 0:未完成 1:可兑换 2:已兑换
         */
        status: number;
        /**
         * 现金
         */
        cash: number;
        GetType(): string;
    }
    class GetCCRedPackShowLobbyCmd_C {
        GetType(): string;
    }
    class GetCCRedPackShowLobbyCmd_S {
        resultCode: number;
        redPack: CCRedPack[];
        GetType(): string;
    }
    /**
     * 话费券兑换红包
     */
    class ExchangeCCRedPackLobbyCmd_C {
        /**
         * 兑换的id
         */
        id: number;
        GetType(): string;
    }
    class ExchangeCCRedPackLobbyCmd_S {
        resultCode: number;
        /**
         * 刷新各个红包状态
         */
        redPack: CCRedPack[];
        GetType(): string;
    }
    /**
     * 返利红包(领取话费券)
     */
    class RechargeRedPack {
        id: number;
        /**
         * 状态 0:未完成 1:可领取 2:已领取
         */
        status: number;
        /**
         * 满足条件
         */
        condition: number;
        /**
         * 话费券
         */
        coupon: number;
        /**
         * 对应道具（2018.05.14）
         */
        goods: Cmd.Goods;
        GetType(): string;
    }
    /**
     * 返利红包界面
     */
    class GetRechargeRedPackShowLobbyCmd_C {
        GetType(): string;
    }
    class GetRechargeRedPackShowLobbyCmd_S {
        resultCode: number;
        redPack: RechargeRedPack[];
        GetType(): string;
    }
    /**
     * 兑换返利红包
     */
    class ExchangeRechargeRedPackLobbyCmd_C {
        id: number;
        GetType(): string;
    }
    class ExchangeRechargeRedPackLobbyCmd_S {
        resultCode: number;
        /**
         * 刷新界面
         */
        redPack: RechargeRedPack[];
        GetType(): string;
    }
    /**
     * 暴击红包界面
     */
    class GetCriticalStrikeLobbyCmd_C {
        GetType(): string;
    }
    class CCInfo {
        /**
         * 获取时间
         */
        time: number;
        /**
         * 红包金额
         */
        value: number;
        /**
         * 游戏id 客户端根据id去显示游戏名称(服务器同服所以游戏名称无法确定)
         */
        gameId: number;
        GetType(): string;
    }
    class GetCriticalStrikeLobbyCmd_S {
        /**
         * 客户端要进行判空操作，如果不回复这个值就认为没有数据
         */
        info: CCInfo[];
        GetType(): string;
    }
    /**
     * 红包提现
     */
    class RedPackInfo {
        /**
         * 文字描述
         */
        stringType: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 具体金额
         */
        reward: number;
        money: number;
        /**
         * 好彩红包获取方式  1新手红包 2话费券兑换
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 玩家获得红包明细
     */
    class GetUserGetRedPackInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetUserGetRedPackInfoLobbyCmd_S {
        redPackInfo: RedPackInfo[];
        GetType(): string;
    }
    /**
     * 提现记录
     */
    class DrawCash {
        money: number;
        timestamp: number;
        /**
         * 1:已兑换
         */
        status: number;
        GetType(): string;
    }
    class GetDrawCashRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetDrawCashRecordLobbyCmd_S {
        resultCode: number;
        records: DrawCash[];
        GetType(): string;
    }
    /**
     * 红包提现
     */
    class RedPackDrawCashLobbyCmd_C {
        GetType(): string;
    }
    class RedPackDrawCashLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     *  好彩游戏抢红包活动
     *  发红包广播
     */
    class GameRedPackInfo {
        /**
         * 红包id
         */
        rid: string;
        /**
         * 发包人uid
         */
        uid: number;
        /**
         * 头像
         */
        headUrl: string;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 红包数量
         */
        totalCount: number;
        /**
         * 已领取数量
         */
        recvCount: number;
        /**
         * 发送时间
         */
        sendTime: number;
        GetType(): string;
    }
    class SendHaoCaiGameRedPackLobbyCmd_Brd {
        redPackInfo: GameRedPackInfo;
        GetType(): string;
    }
    /**
     * 领红包
     */
    class RecvGameRedPackLobbyCmd_C {
        rid: string;
        GetType(): string;
    }
    class RecvRedPackInfo {
        /**
         * 红包金额
         */
        value: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 头像
         */
        headUrl: string;
        /**
         * 是否手气最佳 1是
         */
        luck: number;
        /**
         * 领取时间
         */
        recvTime: number;
        GetType(): string;
    }
    class RecvGameRedPackLobbyCmd_S {
        resultCode: number;
        redPackInfo: GameRedPackInfo;
        /**
         * 个人领取
         */
        personal: RecvRedPackInfo;
        /**
         * 领取列表
         */
        recvList: RecvRedPackInfo[];
        GetType(): string;
    }
    /**
     * 获取拥有的所有时效性道具
     */
    class GetTimeGoodsLobbyCmd_C {
        /**
         * 0获取所有 1头像框 2月卡周卡...
         */
        timeType: number;
        /**
         * 获取指定uid拥有的时效性道具,不传默认为自己
         */
        uid: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetTimeGoodsLobbyCmd_S {
        resultCode: number;
        timeType: number;
        /**
         * 玩家拥有的时效性道具
         */
        timeGoods: Cmd.TimeGoods[];
        /**
         * type为0/2存在 玩家累计待领取的时效性金币数量(周卡/月卡...)
         */
        timeChips: number;
        /**
         * 获取指定uid拥有的时效性道具,不传默认为自己
         */
        uid: number;
        headUrl: number;
        vip: number;
        GetType(): string;
    }
    /**
     * 领取累计待领取的时效性金币
     */
    class RevTimeChipsLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class RevTimeChipsLobbyCmd_S {
        resultCode: number;
        /**
         * chips为空则表示没有领取到金币
         */
        chips: number;
        /**
         * 如果道具数量跟有效时间发生变化则推送下面三条数据
         */
        timeType: number;
        /**
         * 玩家拥有的时效性道具
         */
        timeGoods: Cmd.TimeGoods[];
        timeChips: number;
        GetType(): string;
    }
    /**
     * 购买头像框，周卡/月卡等时效性道具(用钻石购买，不支持其他支付方式)
     */
    class BuyTimeGoodsLobbyCmd_C {
        timeType: number;
        /**
         * 2018.03.15 弃用
         */
        goodsId: number;
        goodsNbr: number;
        lobbyId: number;
        /**
         * 2018.03.15 购买全部用shopId,上面的goodsId弃用(字段暂时不删除)
         */
        shopId: number;
        GetType(): string;
    }
    class BuyTimeGoodsLobbyCmd_S {
        resultCode: number;
        timeType: number;
        /**
         * 玩家拥有的时效性道具
         */
        timeGoods: Cmd.TimeGoods[];
        /**
         * 玩家累计待领取的时效性金币数量(周卡/月卡...)
         */
        timeChips: number;
        GetType(): string;
    }
    /**
     * 个人形象道具的使用
     */
    class ChangePersonalImageLobbyCmd_C {
        personalImage: Cmd.PersonalImage;
        GetType(): string;
    }
    class ChangePersonalImageLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取弹窗公告
     */
    class GetPopupBroadListLobbyCmd_C {
        GetType(): string;
    }
    class PopupList {
        id: number;
        /**
         * 标题
         */
        title: string;
        /**
         * 内容
         */
        content: string;
        /**
         * 0未读 1已读
         */
        status: number;
        endTime: number;
        /**
         * 扩展参数
         */
        extparam: string;
        GetType(): string;
    }
    module PopupList {
        class Extparamdesc {
            /**
             * （跑马灯 9，活动公告 11，普通公告 6，维护公告 3）
             */
            btype: number;
            /**
             * （立即发布生效 0，单次立即生效 1，每次登陆生效 2，首次登陆生效 3 ，每次加载生效 4）
             */
            bactime: number;
            /**
             * （所有游戏 0，保单类游戏 1，非保单类游戏 2，大厅 3，指定游戏 gameid）
             */
            blocation: number;
            /**
             * （可以关闭 0，不可关闭 1）
             */
            bcanclose: number;
            /**
             * （gm 0，玩家 1, 机器人 2）
             */
            bpublisher: number;
            GetType(): string;
        }
    }
    class GetPopupBroadListLobbyCmd_S {
        popupList: PopupList[];
        GetType(): string;
    }
    /**
     * 已读弹窗公告(如果公告的状态status为0未读状态才去调用这条消息)
     */
    class ReadPopBroadLobbyCmd_C {
        id: number;
        GetType(): string;
    }
    class ReadPopBroadLobbyCmd_S {
        resultCode: number;
        id: number;
        GetType(): string;
    }
    /**
     *  好彩捕鱼电玩城vip话费券活动
     *  显示界面
     */
    class GetVipCouponShowLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetVipCouponShowLobbyCmd_S {
        resultCode: number;
        /**
         * 剩余领取次数 等于0则表示不能领取
         */
        recvNum: number;
        GetType(): string;
    }
    /**
     * 获取话费券
     */
    class GetVipCouponRewardLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetVipCouponRewardLobbyCmd_S {
        resultCode: number;
        /**
         * 获取到的话费券数量
         */
        coupon: number;
        /**
         * 剩余领取次数 等于0则表示不能领取
         */
        recvNum: number;
        GetType(): string;
    }
    /**
     * 转盘签到
     */
    class ContinueTurnTableInfo {
        continueDay: number;
        /**
         * 是否已领取 1已领取
         */
        isRecv: number;
        /**
         * 当前是否可领取 1可领取
         */
        canRecv: number;
        GetType(): string;
    }
    /**
     * 是否显示转盘签到
     */
    class IsShowTurnTableSignLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class IsShowTurnTableSignLobbyCmd_S {
        /**
         * 0不显示 1显示
         */
        isShow: number;
        GetType(): string;
    }
    /**
     * 获取转盘签到的面板信息
     */
    class GetTurnTableSignLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetTurnTableSignLobbyCmd_S {
        resultCode: number;
        /**
         * 今天是否可领取  1可领取
         */
        todayRecv: number;
        /**
         * 连续签到天数
         */
        continueDay: number;
        /**
         * 连续签到领取情况
         */
        continue: ContinueTurnTableInfo[];
        GetType(): string;
    }
    /**
     * 用户今日转盘签到
     */
    class UserTurnTableSignTodayLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class UserTurnTableSignTodayLobbyCmd_S {
        resultCode: number;
        /**
         * 连续天数
         */
        continueDay: number;
        /**
         * 连续签到领取情况
         */
        continue: ContinueTurnTableInfo[];
        /**
         * 奖品id
         */
        goodsId: number;
        /**
         * 奖品数量
         */
        goodsNum: number;
        GetType(): string;
    }
    /**
     * 领取连续转盘签到奖励
     */
    class UserRecvContinueRewardLobbyCmd_C {
        lobbyId: number;
        /**
         * 要领取对应的累计天数
         */
        continueDay: number;
        GetType(): string;
    }
    class UserRecvContinueRewardLobbyCmd_S {
        resultCode: number;
        /**
         * 连续签到领取情况
         */
        continue: ContinueTurnTableInfo[];
        /**
         * 奖品id
         */
        goodsId: number;
        /**
         * 奖品数量
         */
        goodsNum: number;
        GetType(): string;
    }
    /**
     * 百宝箱奖励
     */
    class TreasureBoxLottery {
        /**
         * 奖励类型 0普通道具(金币、钻石、话费券等) 1红包现金奖励
         */
        lType: number;
        /**
         * 普通道具使用 商品id
         */
        goodsId: number;
        /**
         * 普通道具使用 商品数量
         */
        goodsNum: number;
        /**
         * 红包现金使用 现金金额
         */
        rmb: number;
        GetType(): string;
    }
    /**
     * 百宝箱每日任务
     */
    class TreasureBoxTask {
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 对应的子游戏id
         */
        gameId: number;
        /**
         * 任务描述
         */
        taskDesc: string;
        /**
         * 任务状态 0进行中 1待领取 2已领取
         */
        taskStatus: number;
        /**
         * 当前进度
         */
        current: number;
        /**
         * 总进度
         */
        total: number;
        /**
         * 任务奖励
         */
        lottery: TreasureBoxLottery;
        GetType(): string;
    }
    /**
     * 获取百宝箱界面数据
     */
    class GetTreasureBoxShowInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetTreasureBoxShowInfoLobbyCmd_S {
        resultCode: number;
        task: TreasureBoxTask[];
        /**
         * 完成任务的累计天数
         */
        taskDays: number;
        /**
         * 剩余抽奖次数
         */
        lotteryNum: number;
        /**
         * 滚动跑马灯
         */
        msg: string[];
        GetType(): string;
    }
    /**
     * 领取百宝箱任务奖励
     */
    class GetTreasureBoxTaskLotteryLobbyCmd_C {
        taskId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetTreasureBoxTaskLotteryLobbyCmd_S {
        resultCode: number;
        /**
         * 这里只回复请求领取的对应taskId的任务用于刷新(物品奖励也在这个里面)，其他任务不回复
         */
        task: TreasureBoxTask;
        /**
         * 刷新下完成任务的累计天数
         */
        taskDays: number;
        /**
         * 刷新下剩余抽奖次数
         */
        lotteryNum: number;
        GetType(): string;
    }
    /**
     * 百宝箱转动抽奖
     */
    class TurnTreasureBoxLotteryLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class TurnTreasureBoxLotteryLobbyCmd_S {
        resultCode: number;
        lottery: TreasureBoxLottery;
        /**
         * 刷新下剩余抽奖次数
         */
        lotteryNum: number;
        /**
         * 滚动跑马灯
         */
        msg: string;
        GetType(): string;
    }
    /**
     *  在线奖励
     *  获取在线奖励状态和倒计时时间
     */
    class GetOnlineTimeStatusLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetOnlineTimeStatusLobbyCmd_S {
        resultCode: number;
        /**
         * 0倒计时中 1待领取 2当天奖励已结束
         */
        status: number;
        /**
         * 倒计时剩余时间
         */
        remainderTime: number;
        GetType(): string;
    }
    /**
     * 领取在线奖励
     */
    class GetOnlineTimeRewardLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetOnlineTimeRewardLobbyCmd_S {
        resultCode: number;
        reward: Cmd.Goods[];
        /**
         * 0倒计时中 1待领取 2当天奖励已结束
         */
        status: number;
        /**
         * 倒计时剩余时间
         */
        remainderTime: number;
        GetType(): string;
    }
    /**
     * 获取当前大厅在线总人数（包括机器人）
     */
    class GetOnlineUserNumLobbyCmd_C {
        GetType(): string;
    }
    class GameUsers {
        gameId: number;
        userNum: number;
        GetType(): string;
    }
    class GetOnlineUserNumLobbyCmd_S {
        /**
         * 总人数
         */
        onlineNum: number;
        /**
         * 各个游戏人数(客户端根据界面上的游戏去对应添加，如果没有传对应游戏的人数则客户端默认为0)
         */
        gameUsers: GameUsers[];
        GetType(): string;
    }
    /**
     *  明日礼包
     *  界面显示
     */
    class GetTomorrowGiftBagShowLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetTomorrowGiftBagShowLobbyCmd_S {
        resultCode: number;
        /**
         * 状态 1今天可领取 2明天可领取
         */
        status: number;
        /**
         * 可领取金币的后三位
         */
        tail: string;
        /**
         * 倒计时剩余时间
         */
        remainderTime: number;
        GetType(): string;
    }
    /**
     * 礼包领取
     */
    class GetTomorrowGiftBagRewardLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetTomorrowGiftBagRewardLobbyCmd_S {
        resultCode: number;
        chips: number;
        /**
         * 用于领取成功后刷新页面
         */
        status: number;
        tail: string;
        /**
         * 倒计时剩余时间
         */
        remainderTime: number;
        GetType(): string;
    }
    /**
     * 世界聊天
     */
    class WorldChatBySuonaLobbyCmd_C {
        content: string;
        GetType(): string;
    }
    class WorldChatBySuonaLobbyCmd_S {
        resultCode: number;
        /**
         * 聊天框提示语
         */
        markWords: string;
        GetType(): string;
    }
    class WorldChat {
        /**
         * 0系统公告 1玩家世界聊天 2只在百人场显示 3只在麻将等匹配场 4只在大厅显示(2/3/4表示XX玩家在哪赢了多少金币之类的荣耀信息或者单独的公告信息)
         */
        chatTyp: number;
        /**
         * 内容
         */
        content: string;
        /**
         * 用户基本信息(1的时候会存在里面用到的只有vip和nickname)
         */
        userInfo: Cmd.UserBaseInfo;
        /**
         * 时间戳
         */
        time: number;
        GetType(): string;
    }
    class WorldChatBySuonaLobbyCmd_Brd {
        chat: WorldChat;
        GetType(): string;
    }
    /**
     * 获取世界聊天记录
     */
    class GetWorldChatRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetWorldChatRecordLobbyCmd_S {
        chat: WorldChat[];
        /**
         * 聊天框提示语
         */
        markWords: string;
        GetType(): string;
    }
    /**
     * 代理商发送喇叭
     */
    class AgentSendSuonaLobbyCmd_C {
        /**
         * 喇叭消息
         */
        msg: string;
        GetType(): string;
    }
    class AgentSendSuonaLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 邮件附件
     */
    class Attachment {
        /**
         * 附件商品id
         */
        itemid: number;
        /**
         * 对应的商品数量
         */
        itemnum: number;
        GetType(): string;
    }
    class MailInfo {
        /**
         * 该邮件id 期望是 每一个邮件会有一个唯一id
         */
        id: number;
        /**
         * 标题
         */
        subject: string;
        /**
         * 内容
         */
        content: string;
        /**
         * 钻石数
         */
        diamond: number;
        /**
         * 状态
         */
        state: MailInfo.State;
        /**
         * 时间戳
         */
        stamp: number;
        /**
         * 附件商品
         */
        attachment: Attachment[];
        /**
         * 发送者
         */
        sendName: string;
        /**
         * 兑奖码
         */
        cdkey: string;
        /**
         * 邮寄地址,兑奖码用
         */
        addr: Cmd.DeliverAddr;
        /**
         * 金币数
         */
        chips: number;
        GetType(): string;
    }
    module MailInfo {
        enum State {
            /**
             * 未读
             */
            UnRead = 1,
            /**
             * 已读,但还有未领取的东西
             */
            ReadHasItem = 2,
            /**
             * 已读,且没有需要领取的东西
             */
            ReadOver = 3,
        }
    }
    /**
     * 存在新邮件广播
     */
    class NewMailCmd_Brd {
        mail: MailInfo;
        GetType(): string;
    }
    /**
     *  C-&gt;S 获取邮件列表请求
     *  S-&gt;C 邮件列表更新
     */
    class GetListMailCmd_CS {
        /**
         * 具体邮件
         */
        mailList: MailInfo[];
        /**
         * uid查看某人邮件,飞车用
         */
        uid: number;
        /**
         * matchId,匹配号id,飞车用
         */
        matchId: number;
        /**
         * roomId,查看某人某房间邮件,飞车用
         */
        roomId: number;
        /**
         * 昵称
         */
        nickName: string;
        GetType(): string;
    }
    /**
     *  C-&gt;S 查看指定邮件请求
     *  S-&gt;C 查看完成指定邮件通知
     */
    class ReadMailCmd_CS {
        /**
         * 查看指定邮件
         */
        ids: number[];
        /**
         * uid查看某人邮件,飞车用
         */
        uid: number;
        /**
         * matchId,匹配号id,飞车用
         */
        matchId: number;
        /**
         * roomId,查看某人某房间邮件,飞车用
         */
        roomId: number;
        /**
         * 昵称
         */
        nickName: string;
        GetType(): string;
    }
    /**
     *  C-&gt;S 获取邮件的东西请求
     *  S-&gt;C 已获取邮件东西通知
     */
    class GetItemMailCmd_CS {
        ids: number[];
        /**
         * 获取后得到的钻石数
         */
        diamond: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 删除指定邮件请求
     *  S-&gt;C 删除指定邮件通知
     */
    class DeleteMailCmd_CS {
        /**
         * 删除指定邮件
         */
        ids: number[];
        GetType(): string;
    }
    /**
     * 获取邮件列表
     */
    class GetListMailCmd_C {
        /**
         * 分页
         */
        index: number;
        /**
         * 请求类型，1：初始化请求，2：刷新请求.默认为1
         */
        type: number;
        GetType(): string;
    }
    /**
     * 获取邮件列表
     */
    class GetListMailCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 具体邮件：为空则表示没有邮件了，前端也不需要继续分页滑动
         */
        mailInfo: MailInfo[];
        /**
         * 分页
         */
        index: number;
        /**
         * 原样返回
         */
        type: number;
        GetType(): string;
    }
    /**
     * 查看指定邮件
     */
    class ReadMailCmd_C {
        /**
         * 查看指定邮件
         */
        id: number;
        GetType(): string;
    }
    /**
     * 查看指定邮件
     */
    class ReadMailCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 具体邮件,前端刷新
         */
        mailInfo: MailInfo;
        GetType(): string;
    }
    /**
     * 删除指定邮件
     */
    class DeleteMailCmd_C {
        /**
         * 删除指定邮件
         */
        ids: number[];
        GetType(): string;
    }
    /**
     * 删除指定邮件
     */
    class DeleteMailCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 将删除指定邮件的id返回
         */
        ids: number[];
        GetType(): string;
    }
    /**
     * 领取指定邮件内的奖励
     */
    class GetMailRewardCmd_C {
        /**
         * 邮件id
         */
        id: number;
        GetType(): string;
    }
    class GetMailRewardCmd_S {
        resultCode: number;
        /**
         * 具体邮件,前端刷新
         */
        mailInfo: MailInfo;
        GetType(): string;
    }
    /**
     * 邮件批量操作
     */
    class BulkOperationMailCmd_C {
        /**
         * 1 全部处理  2 全部删除
         */
        opType: number;
        /**
         * 待处理的邮件id列表
         */
        ids: number[];
        GetType(): string;
    }
    class BulkOperationMailCmd_S {
        resultCode: number;
        opType: number;
        /**
         * 附件商品
         */
        attachment: Attachment[];
        GetType(): string;
    }
    /**
     * 用户反馈功能
     */
    class UserFeedBackLobbyCmd_C {
        /**
         * 反馈内容
         */
        feedback: string;
        /**
         * 图片url集合
         */
        feedbackUrl: string[];
        lobbyId: number;
        GetType(): string;
    }
    class UserFeedBackLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 修改鱼币
     */
    class UserFishcoinsChangeLobbyCmd_C {
        uid: number;
        /**
         * 变化量
         */
        change: number;
        GetType(): string;
    }
    /**
     * ClientErrorLogToServer
     */
    class ClientErrorLogToServerLobbyCmd_C {
        /**
         * uid
         */
        gameid: number;
        /**
         * uid
         */
        zoneid: number;
        /**
         * 图片url集合
         */
        log: string;
        GetType(): string;
    }
    /**
     * 申请提现
     */
    class CashWithdrawalLobbyCmd_C {
        /**
         * 取现数额
         */
        num: number;
        GetType(): string;
    }
    /**
     * 提现回复
     */
    class CashWithdrawalLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 查看提现记录
     */
    class GetCashWithdrawalRecordLobbyCmd_C {
        GetType(): string;
    }
    class CashWithdrawalRecord {
        time: number;
        num: number;
        /**
         * 提现结果 0/1/2 处理中、成功、失败
         */
        status: number;
        GetType(): string;
    }
    /**
     * 提现记录回复
     */
    class GetCashWithdrawalRecordLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 记录
         */
        records: CashWithdrawalRecord[];
        GetType(): string;
    }
    /**
     * 顺序弹窗
     */
    class SequentialPopupsLobbyCmd_S {
        /**
         * 1红包乐翻天 2签到面板 3首充 4新手红包 5多弹窗公告
         */
        popId: number[];
        GetType(): string;
    }
    /**
     * 运营活动 摇一摇
     * 摇一摇结果数据
     */
    class ShakeShopInfo {
        /**
         * 摇一摇对应的结果id
         */
        shakeId: number;
        /**
         * 倒计时时间
         */
        remainderTime: number;
        /**
         * 获得的金币总额
         */
        totalChips: number;
        GetType(): string;
    }
    /**
     * 打开摇一摇界面
     */
    class GetShakeBaseInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetShakeBaseInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 1:可以免费摇 2:需要消耗金币摇 3:摇过后选择购买界面 4:不可以摇一摇
         */
        type: number;
        /**
         * 剩余免费次数
         */
        freeCount: number;
        /**
         * 免费次数用完后需要消耗的金币数量
         */
        costChips: number;
        shake: ShakeShopInfo;
        GetType(): string;
    }
    /**
     * 放弃摇一摇机会(再来一次)
     */
    class AbandonShakeLobbyCmd_C {
        GetType(): string;
    }
    class AbandonShakeLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取摇一摇结果
     */
    class GetShakeResultLobbyCmd_C {
        GetType(): string;
    }
    class GetShakeResultLobbyCmd_S {
        resultCode: number;
        shake: ShakeShopInfo;
        GetType(): string;
    }
    /**
     * 运营活动 瑞狗迎春
     * 打开瑞狗迎春界面
     */
    class GetAuspiciousDogInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetAuspiciousDogInfoLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 开始时间
         */
        beginTime: number;
        /**
         * 结束时间
         */
        endTime: number;
        /**
         * 待提现金额
         */
        getNum: number;
        /**
         * 当前游戏局数
         */
        curGameNbr: number;
        /**
         * 已抽奖次数
         */
        lotteryTime: number;
        /**
         * 1表示已经领取过了(前三个任务的状态)
         */
        taskState: number[];
        /**
         * 幸运玩家记录
         */
        luckRecords: AuspiciousDogRecord[];
        /**
         * 当前场景id
         */
        scene: number;
        GetType(): string;
    }
    class AuspiciousDogRecord {
        /**
         * 时间
         */
        time: number;
        /**
         * 昵称
         */
        nickName: number;
        /**
         * 物品ID(如果为0表示为元吧)
         */
        goodId: number;
        /**
         * 物品数量
         */
        goodNbr: number;
        /**
         * 模板id
         */
        template: number;
        GetType(): string;
    }
    /**
     * 获取瑞狗迎春奖励记录(只保留最新20条数据)
     */
    class GetAuspiciousDogRecordsLobbyCmd_C {
        GetType(): string;
    }
    class GetAuspiciousDogRecordsLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 活动获奖记录
         */
        records: AuspiciousDogRecord[];
        /**
         * 提现记录
         */
        withdrawalRecords: openRecord[];
        GetType(): string;
    }
    /**
     * 领取奖励
     */
    class GetAuspiciousDogRewardsLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 任务id
         */
        taskId: number;
        GetType(): string;
    }
    class GetAuspiciousDogRewardsLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 奖励数据
         */
        rewards: AuspiciousDogRecord[];
        GetType(): string;
    }
    /**
     * 三张大厅游客绑定账户, 获取验证码
     */
    class GetGuestBindAccountIdentifyCodeLobbyCmd_C {
        /**
         * 手机号码
         */
        phoneNumber: number;
        /**
         * 修改手机号
         */
        modifyPhone: boolean;
        /**
         * 重置密码
         */
        resetPasswd: boolean;
        GetType(): string;
    }
    class GetGuestBindAccountIdentifyCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 三张大厅游客绑定账户
     */
    class GuestBindAccountLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 密码
         */
        password: string;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    class GuestBindAccountLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 三张大厅校验手机验证码
     */
    class VerifyPhoneCodeLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    class VerifyPhoneCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 三张大厅游客修改账户手机号
     */
    class GuestModifyAccountPhoneLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    class GuestModifyAccountPhoneLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 三张大厅游客重置账户密码
     */
    class GuestResetAccountPasswdLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 密码
         */
        password: string;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    class GuestResetAccountPasswdLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 玩家修改昵称, 成就任务
     */
    class ChangeUserNickName_C {
        /**
         * 玩家昵称
         */
        nickName: string;
        GetType(): string;
    }
    /**
     * 修改昵称返回
     */
    class ChangeUserNickName_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 错误描述
         */
        desc: string;
        /**
         * 用户信息
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 玩家上传图像，成就任务
     */
    class ChangeUserHeadUrl_C {
        /**
         * 玩家图像
         */
        headUrl: string;
        GetType(): string;
    }
    /**
     * 上传图像返回
     */
    class ChangeUserHeadUrl_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 错误描述
         */
        desc: string;
        /**
         * 用户信息
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 修改签名
     */
    class ChangeUserSignature_C {
        /**
         * 签名
         */
        signature: string;
        GetType(): string;
    }
    class ChangeUserSignature_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 用户信息
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 赠送金币时查找玩家昵称
     */
    class GetUserNickNameLobby_C {
        /**
         * 玩家ID
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 查找昵称回复
     */
    class GetUserNickNameLobby_S {
        /**
         * 昵称
         */
        nickName: string;
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 赠送金币
     */
    class ExchangeCoinLobby_C {
        /**
         * 赠送给其他玩家ID
         */
        toUid: number;
        /**
         * 赠送金币数量
         */
        coin: number;
        /**
         * 货币类型 1/2 钻石、金币 如果为nil 默认为2金币 兼容老代码
         */
        coinType: number;
        /**
         * 1:请求检查 2: 请求确认
         */
        type: number;
        id: number;
        GetType(): string;
    }
    /**
     * 赠送金币回复
     */
    class ExchangeCoinLobby_S {
        /**
         * 错误码
         */
        resultCode: number;
        /**
         * 描述 ==
         */
        desc: string;
        /**
         * 检测时 返回玩家信息
         */
        userInfo: Cmd.UserBaseInfo;
        /**
         * 赠送金币数量
         */
        coin: number;
        /**
         * 货币类型
         */
        coinType: number;
        /**
         * 1:请求检查 2: 请求确认
         */
        type: number;
        GetType(): string;
    }
    /**
     * 获取赠送金币记录
     */
    class GetExchangeCoinRecordLobby_C {
        /**
         * 货币类型 1/2 钻石、金币 如果为nil 默认为2金币 兼容老代码
         */
        coinType: number;
        /**
         * 请求页数
         */
        curPage: number;
        GetType(): string;
    }
    /**
     * 赠送记录
     */
    class ExchangeCoinRecord {
        /**
         * ID
         */
        uid: number;
        /**
         * 赠送金币数量
         */
        coin: number;
        /**
         * 赠送时间戳
         */
        timestamp: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 1:给被人赠送 2:别人给自己赠送 ==
         */
        type: number;
        GetType(): string;
    }
    /**
     * 获取赠送金币记录返回
     */
    class GetExchangeCoinRecordLobby_S {
        /**
         * 赠送记录
         */
        record: ExchangeCoinRecord[];
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述 ==
         */
        desc: number;
        /**
         * 请求页数
         */
        curPage: number;
        GetType(): string;
    }
    /**
     * 获取摇钱树
     */
    class GetMoneyTreeDataLobby_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 获取摇钱树返回
     */
    class GetMoneyTreeDataLobby_S {
        resultCode: number;
        /**
         * 摇钱树的等级
         */
        level: number;
        /**
         * 生成金币数量
         */
        produce: number;
        /**
         * 是否可领取
         */
        receive: number;
        GetType(): string;
    }
    /**
     * 领取摇钱树生成的金币
     */
    class GetMoneyTreeGoldLobby_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 领取摇钱树金币返回
     */
    class GetMoneyTreeGoldLobby_S {
        /**
         * 返回
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 获取公告
     */
    class GetBroadcastInfoLobby_C {
        GetType(): string;
    }
    class BroadCastInfo {
        /**
         * 公告ID
         */
        taskId: number;
        /**
         * 公告标题
         */
        title: string;
        /**
         * 公告内容
         */
        content: string;
        /**
         * 公告简介
         */
        desc: string;
        /**
         * 公告状态
         */
        state: BroadCastInfo.State;
        GetType(): string;
    }
    module BroadCastInfo {
        enum State {
            /**
             * 已读
             */
            Read = 1,
            /**
             * 未读
             */
            UnRead = 2,
        }
    }
    /**
     * 获取公告返回
     */
    class GetBroadCastInfoLobby_S {
        /**
         * 公告信息
         */
        broad: BroadCastInfo[];
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 读取公告
     */
    class ReadBroadCastLobby_C {
        /**
         * 公告ID
         */
        taskId: number;
        GetType(): string;
    }
    /**
     * 读取公告返回
     */
    class ReadBroadCastLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 公告内容
         */
        content: string;
        /**
         * 公告标题
         */
        title: string;
        GetType(): string;
    }
    /**
     * 大厅获取时时彩状态
     */
    class GetEveryColorStatusLobby_C {
        GetType(): string;
    }
    /**
     * 大厅获取时时彩状态返回
     */
    class GetEveryColorStatusLobby_S {
        /**
         * 状态 1:下注 2:结算
         */
        status: number;
        /**
         * 剩余时间
         */
        time: number;
        GetType(): string;
    }
    /**
     * 玩家下注
     */
    class UserBetChipsLobby_C {
        /**
         * 下注id(1,2~8，从单到双...到豹子,1为单数，2位双数...)
         */
        betId: number;
        /**
         * 下注量
         */
        chips: number;
        GetType(): string;
    }
    /**
     * 玩家下注返回
     */
    class UserBetChipsLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 所有下注信息
         */
        allBetInfo: number[];
        /**
         * 自己下注信息
         */
        ownBetInfo: number[];
        GetType(): string;
    }
    /**
     * 玩家自动跟注
     */
    class UserAutoFollowLobby_C {
        /**
         * 是否跟注
         */
        follow: boolean;
        /**
         * 跟注次数
         */
        number: number;
        GetType(): string;
    }
    /**
     * 玩家自动跟注返回
     */
    class UserAutoFollowLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 返回跟注次数
         */
        number: number;
        GetType(): string;
    }
    /**
     * 玩家是否可以自动跟注
     */
    class UserCanAutoFollowLobby_S {
        /**
         * 是否跟注
         */
        follow: boolean;
        GetType(): string;
    }
    /**
     * 通知玩家赢金币
     */
    class NoticeUserWinChipsLobby_S {
        /**
         * 玩家赢金币
         */
        winChips: number;
        GetType(): string;
    }
    /**
     * 大厅获取时时彩信息
     */
    class GetEveryColorInfoLobby_C {
        GetType(): string;
    }
    /**
     * 简易玩家信息
     */
    class ShortUserInfo {
        /**
         * 玩家Id
         */
        uid: number;
        /**
         * 玩家昵称
         */
        nickName: string;
        /**
         * 玩家图像
         */
        headUrl: string;
        /**
         * 玩家vip等级
         */
        vip: number;
        /**
         * 玩家赢取金币
         */
        winChips: number;
        GetType(): string;
    }
    /**
     * 大厅获取时时彩信息返回
     */
    class GetEveryColorInfoLobby_S {
        /**
         * 奖池总额
         */
        pond: number;
        /**
         * 剩余时间
         */
        remainderTime: number;
        /**
         * 当前状态
         */
        status: number;
        /**
         * 上轮豹子时间
         */
        leopardTime: number;
        /**
         * 所有人下注信息
         */
        allBetInfo: number[];
        /**
         * 玩家自己下注信息
         */
        ownBetInfo: number[];
        /**
         * 牌型走势图
         */
        cardTypeTrend: number[];
        /**
         * 单双走势图
         */
        singleDoubleTrend: number[];
        /**
         * 结算开牌
         */
        openOutCard: number[];
        /**
         * 牌型
         */
        openCardType: number;
        /**
         * 单双
         */
        singleDoubleType: number;
        /**
         * 自动跟注
         */
        autoFollow: boolean;
        /**
         * 剩余跟注次数
         */
        remainder: number;
        /**
         * 上轮大赢家
         */
        winner: ShortUserInfo;
        GetType(): string;
    }
    /**
     * 大奖记录
     */
    class GetBigRewardRecordLobby_C {
        GetType(): string;
    }
    /**
     * 记录信息
     */
    class RecordInfo {
        /**
         * 记录时间
         */
        timestamp: number;
        /**
         * 玩家信息
         */
        userInfo: ShortUserInfo;
        GetType(): string;
    }
    /**
     * 大奖记录返回
     */
    class GetBigRewardRecordLobby_S {
        /**
         * 大奖记录
         */
        record: RecordInfo[];
        GetType(): string;
    }
    /**
     * 排行榜
     */
    class GetEveryColorRankInfoLobby_C {
        GetType(): string;
    }
    /**
     * 玩家排行信息
     */
    class SscRankInfo {
        /**
         * 排行
         */
        rank: number;
        /**
         * 玩家信息
         */
        userInfo: ShortUserInfo;
        GetType(): string;
    }
    /**
     * 玩家排行信息返回
     */
    class GetEveryColorRankInfoLobby_S {
        /**
         * 所有排行
         */
        allRankInfo: SscRankInfo[];
        /**
         * 我的排行
         */
        myRankInfo: SscRankInfo[];
        /**
         * 昨日所有排行
         */
        yesterdayRankInfo: SscRankInfo[];
        /**
         * 昨日我的排行
         */
        yesterdayMyRankInfo: SscRankInfo[];
        GetType(): string;
    }
    /**
     * 时时彩下注量广播
     */
    class EveryColorBetChipsLobby_Brd {
        /**
         * 所有下注信息
         */
        allBetInfo: number[];
        GetType(): string;
    }
    /**
     * 时时彩下注状态广播
     */
    class EveryColorBetStatusLobby_Brd {
        /**
         * 状态 1 下注 2 结算
         */
        status: number;
        /**
         * 每个状态所需时间
         */
        time: number;
        GetType(): string;
    }
    /**
     * 时时彩结算状态广播
     */
    class EveryColorLotteryStatusLobby_Brd {
        /**
         * 状态 1 下注 2 结算
         */
        status: number;
        /**
         * 每个状态所需时间
         */
        time: number;
        /**
         * 牌型
         */
        openCardType: number;
        /**
         * 单双
         */
        singleDoubleType: number;
        /**
         * 结算时发牌
         */
        openOutCard: number[];
        /**
         * 奖池金额
         */
        pond: number;
        /**
         * 上轮豹子时间
         */
        leopardTime: number;
        /**
         * 上轮大赢家
         */
        winner: ShortUserInfo;
        GetType(): string;
    }
    /**
     * 时时彩玩家打开面板或者关闭面板
     */
    class EveryColorPanelStatusLobby_C {
        /**
         * 状态 1 打开 2 关闭
         */
        status: number;
        GetType(): string;
    }
    class EveryColorPanelStatusLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 登陆天数信息
     */
    class ContinueDay {
        /**
         * 登陆天数
         */
        day: number;
        /**
         * 状态 1 未领取 2 已领取 3 已失效
         */
        status: number;
        /**
         * 奖励金币
         */
        coin: RewardItem[];
        GetType(): string;
    }
    /**
     * 玩家连续登陆信息
     */
    class ContinueLoginDaysInfoLobby_S {
        /**
         * 登陆天数信息
         */
        continue: ContinueDay[];
        GetType(): string;
    }
    /**
     * 领取连续登陆天数奖励
     */
    class GetContinueLoginDaysRewardLobby_C {
        GetType(): string;
    }
    /**
     * 领取连续登陆奖励返回
     */
    class GetContinueLoginDaysRewardLobby_S {
        /**
         * 奖励
         */
        reward: ContinueDay;
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 取消领取登陆奖励
     */
    class CancelGetContinueDayRewardLobby_C {
        GetType(): string;
    }
    /**
     * 取消返回
     */
    class CancelGetContinueDayRewardLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取标准场和百人场人数
     */
    class GetGameCurrentPlayerNumberLobby_C {
        GetType(): string;
    }
    /**
     * 获取人数返回
     */
    class GetGameCurrentPlayerNumberLobby_S {
        /**
         * 标准场
         */
        stand: number;
        /**
         * 百人场
         */
        hundred: number;
        /**
         * 森林舞会
         */
        slwh: number;
        /**
         * 各场次人数
         */
        scene: number[];
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 大厅所有游戏在线人数
     */
    class AllGamePlayerOnlineNumberLobby_CS {
        onlineNumDataList: AllGamePlayerOnlineNumberLobby_CS.OnlineNumData[];
        GetType(): string;
    }
    module AllGamePlayerOnlineNumberLobby_CS {
        class OnlineNumData {
            /**
             * 游戏Id
             */
            gameId: number;
            /**
             * 在线人数
             */
            onlineNum: number;
            GetType(): string;
        }
    }
    /**
     * 三张大厅的非顺序弹窗
     */
    class PushPopUpWindowsLobby_S {
        /**
         * 弹窗类型 1 账户创建 2 未读公告
         */
        type: number;
        /**
         * 账户创建金币数量
         */
        chips: number;
        /**
         * 未读公告则附带上公告Id
         */
        broadId: number;
        GetType(): string;
    }
    /**
     * 获取大厅急速夺宝信息
     */
    class GetSnatchTreasureInfoLobby_C {
        GetType(): string;
    }
    /**
     * 玩家下注信息
     */
    class OwnBetInfo {
        /**
         * 玩家下注量
         */
        betChips: number;
        /**
         * 奖池编号 1,2
         */
        number: number;
        /**
         * 玩家下注概率
         */
        probability: string;
        GetType(): string;
    }
    /**
     * 玩家中奖信息
     */
    class WinnerInfo {
        /**
         * 玩家vip
         */
        vip: number;
        /**
         * 玩家昵称
         */
        nickname: string;
        /**
         * 玩家头像
         */
        headurl: string;
        /**
         * 中奖概率
         */
        probability: string;
        /**
         * 中奖金币
         */
        rewardNum: number;
        GetType(): string;
    }
    /**
     * 获取大厅急速夺宝信息返回
     */
    class GetSnatchTreasureInfoLobby_S {
        /**
         * 1号奖池总额
         */
        pondOne: number;
        /**
         * 2号奖池总额
         */
        pondTwo: number;
        /**
         * 玩家下注信息
         */
        ownBetInfo: OwnBetInfo[];
        /**
         * 1号奖池中奖信息
         */
        winnerOne: WinnerInfo;
        /**
         * 2号奖池中奖信息
         */
        winnerTwo: WinnerInfo;
        /**
         * 夺宝的状态 1下注 2结算
         */
        status: number;
        /**
         * 夺宝剩余的时间
         */
        time: number;
        /**
         * 1号奖池玩家信息
         */
        mulWinnerOne: WinnerInfo[];
        /**
         * 2号奖池玩家信息
         */
        mulWinnerTwo: WinnerInfo[];
        /**
         * 玩家中奖数额
         */
        rewardNum: number[];
        GetType(): string;
    }
    /**
     * 获取急速夺宝排行榜信息
     */
    class GetSnatchTreasureRankInfoLobby_C {
        GetType(): string;
    }
    /**
     * 获取急速夺宝排行榜信息
     */
    class GetSnatchTreasureRankInfoLobby_S {
        /**
         * 所有排行
         */
        allRankInfo: SscRankInfo[];
        /**
         * 我的排行
         */
        myRankInfo: SscRankInfo[];
        /**
         * 昨日所有排行
         */
        yesterdayRankInfo: SscRankInfo[];
        /**
         * 昨日我的排行
         */
        yesterdayMyRankInfo: SscRankInfo[];
        GetType(): string;
    }
    /**
     * 急速夺宝下注量广播
     */
    class SnatchTreasureBetChipsLobby_Brd {
        /**
         * 1号奖池下注量
         */
        oneBetChips: number;
        /**
         * 1号奖池变化量
         */
        oneDiffNum: number;
        /**
         * 2号奖池下注量
         */
        twoBetChips: number;
        /**
         * 2号奖池变化量
         */
        twoDiffNum: number;
        GetType(): string;
    }
    /**
     * 急速夺宝下注状态广播
     */
    class SnatchTreasureBetStatusLobby_Brd {
        /**
         * 状态 1 下注 2 开奖
         */
        status: number;
        /**
         * 状态时间
         */
        time: number;
        GetType(): string;
    }
    /**
     * 急速夺宝开奖状态广播
     */
    class SnatchTreasureLotteryStatusLobby_Brd {
        /**
         * 状态
         */
        status: number;
        /**
         * 时间
         */
        time: number;
        /**
         * 1号奖池中奖信息
         */
        winnerOne: WinnerInfo[];
        /**
         * 2号奖池中奖信息
         */
        winnerTwo: WinnerInfo[];
        GetType(): string;
    }
    /**
     * 急速夺宝玩家下注
     */
    class SnatchTreasureUserBetChipsLobby_C {
        /**
         * 下注奖池编号 1:1号奖池 2:2号奖池
         */
        number: number;
        /**
         * 下注量
         */
        chips: number;
        GetType(): string;
    }
    /**
     * 急速夺宝玩家下注返回
     */
    class SnatchTreasureUserBetChipsLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 奖池编号
         */
        number: number;
        /**
         * 本次下注奖池的总量
         */
        pondBetChips: number;
        /**
         * 玩家下注该奖池总量
         */
        ownBetChips: number;
        /**
         * 玩家本次下注量
         */
        ownDiffNum: number;
        /**
         * 本次下注的中奖概率
         */
        probability: string;
        GetType(): string;
    }
    /**
     * 急速夺宝玩家概率变化
     */
    class SnatchTreasureUserProbabilityLobby_S {
        /**
         * 玩家1号奖池概率
         */
        oneProbability: string;
        /**
         * 玩家2号奖池概率
         */
        twoProbability: string;
        GetType(): string;
    }
    /**
     * 急速夺宝中奖玩家通知
     */
    class SnatchTreasureWinnerNoticeLobby_S {
        /**
         * 两个奖池中奖数量
         */
        rewardNum: number[];
        GetType(): string;
    }
    /**
     * 急速夺宝我的下注记录
     */
    class GetSnatchTreasureOwnBetRecordLobby_C {
        GetType(): string;
    }
    /**
     * 下注记录信息
     */
    class OwnBetRecordInfo {
        /**
         * 本局是否中奖
         */
        isWin: boolean;
        /**
         * 下注时间戳
         */
        timestamp: number;
        /**
         * 该奖池编号
         */
        number: number;
        /**
         * 该奖池玩家下注额
         */
        ownBetChips: number;
        /**
         * 该奖池下注总额
         */
        pondBetChips: number;
        /**
         * 该玩家概率
         */
        probability: string;
        GetType(): string;
    }
    /**
     * 急速夺宝我的下注记录返回
     */
    class GetSnatchTreasureOwnBetRecordLobby_S {
        /**
         * 玩家下注记录
         */
        record: OwnBetRecordInfo[];
        GetType(): string;
    }
    /**
     * 急速夺宝打开面板或关闭面板
     */
    class SnatchTreasurePanelStatusLobby_C {
        /**
         * 状态 1 打开 2 关闭
         */
        status: number;
        GetType(): string;
    }
    class SnatchTreasurePanelStatusLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 三张大厅玩法隐藏功能
     */
    class Hidden_Game {
        /**
         * 是否隐藏
         */
        value: boolean;
        /**
         * 游戏类型
         */
        type: Hidden_Game.Hidden_Game_Type;
        GetType(): string;
    }
    module Hidden_Game {
        enum Hidden_Game_Type {
            /**
             * 标准场
             */
            Game_Stand = 9053000,
            /**
             * 百人场
             */
            Game_Hundred = 9053001,
            /**
             * 森林舞会
             */
            Game_SenLinWuHui = 9053002,
            /**
             * 时时彩
             */
            Game_EveryColor = 9053003,
            /**
             * 急速夺宝
             */
            Game_SnatchTreasure = 9053004,
            /**
             * 赠送金币
             */
            Game_ExchangeCoin = 9053005,
            /**
             * 摇钱树
             */
            Game_MoneyTree = 9053006,
            /**
             * 龙虎斗
             */
            Game_LongHu = 9053007,
            /**
             * 至尊
             */
            Game_ZhiZun = 9053008,
            /**
             * 海王捕鱼
             */
            Game_Fish = 9053009,
            /**
             * 广播按钮
             */
            Game_BroadCast = 9053010,
        }
    }
    /**
     * 简单推送
     */
    class IsSimpleAgentLobby_S {
        /**
         * 0/1 否、是
         */
        state: number;
        GetType(): string;
    }
    /**
     * ---------------------------------奖池回馈活动开始----------------------------//
     *  请求获取奖池奖励内容
     */
    class JackpotItemListLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 奖池物品列表
     */
    class JackpotItem {
        /**
         * 商品ID
         */
        id: number;
        /**
         * 商品名称
         */
        name: string;
        icon: number;
        /**
         * 奖励数量
         */
        rewardNum: number;
        /**
         * 今日总组数
         */
        allNum: number;
        /**
         * 今日剩余组数
         */
        leftNum: number;
        GetType(): string;
    }
    class JackpotItemListLobbyCmd_S {
        /**
         * 商品列表
         */
        list: JackpotItem[];
        /**
         * 当前奖池总奖金
         */
        curNum: number;
        /**
         * 我的奖池贡献度,每10个贡献度可以抽一次奖
         */
        myJackpot: number;
        GetType(): string;
    }
    /**
     * 刷新奖池
     */
    class JackpotNumLobbyCmd_S {
        /**
         * 当前奖池总奖金
         */
        num: number;
        GetType(): string;
    }
    /**
     * 请求获奖排行榜
     */
    class JackpotOrderLobbyCmd_C {
        /**
         * 当前奖池总奖金
         */
        page: number;
        GetType(): string;
    }
    /**
     * 奖池物品列表
     */
    class JackpotRewardUser {
        uid: number;
        /**
         * nickName
         */
        name: string;
        /**
         * 奖励数量
         */
        rewardNum: number;
        GetType(): string;
    }
    /**
     * 请求获奖排行榜返回
     */
    class JackpotOrderLobbyCmd_S {
        /**
         * 当前奖池总奖金
         */
        page: number;
        /**
         * 获奖列表
         */
        list: JackpotRewardUser[];
        GetType(): string;
    }
    /**
     * 请求抽奖
     */
    class GetJackpotItemLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 请求抽奖返回
     */
    class GetJackpotItemLobbyCmd_S {
        /**
         * 奖品id
         */
        id: number;
        /**
         * 剩余奖品数量
         */
        leftNum: number;
        /**
         * 当前奖池总奖金
         */
        curNum: number;
        /**
         * 我的奖池贡献度,每10个贡献度可以抽一次奖
         */
        myJackpot: number;
        GetType(): string;
    }
    /**
     * ---------------------------------积分商城购买----------------------------//
     *  获取积分商城物品列表
     */
    class ShopPointListLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 积分商城物品列表
     */
    class ShopPointItem {
        /**
         * 物品ID
         */
        id: number;
        /**
         * 商品名称
         */
        name: string;
        icon: number;
        /**
         * 1表示钻石,2表示积分
         */
        moneyType: number;
        /**
         * 花费
         */
        cost: number;
        /**
         * 数量
         */
        number: number;
        /**
         * 是否显示,(购买)
         */
        open: number;
        /**
         * 显示栏目
         */
        displayColumn: number[];
        /**
         * 上市日期,仅供客户端展示
         */
        Date: string;
        /**
         * 抽奖类型1表示钻石,2表示积分
         */
        luckyType: number;
        /**
         * 抽奖消耗
         */
        luckyCost: number;
        /**
         * 抽奖获得概率
         */
        luckyProb: number;
        /**
         * 奖品类型 1钻石 2积分 3物品  4金豆
         */
        rewardType: number;
        GetType(): string;
    }
    /**
     * 返回积分商城物品列表
     */
    class ShopPointListLobbyCmd_S {
        /**
         * 商品列表
         */
        list: ShopPointItem[];
        /**
         * 剩余转盘次数
         */
        turntable: number;
        GetType(): string;
    }
    /**
     * 购买一个积分商品
     */
    class BuyShopPointItemLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        /**
         * 物品ID
         */
        goodId: number;
        GetType(): string;
    }
    /**
     * 单笔订单
     */
    class LobbyOrderItem {
        /**
         * 订单号
         */
        orderId: number;
        /**
         * 购买时间
         */
        time: number;
        /**
         * 商品ID
         */
        goodsId: number;
        /**
         * 数量
         */
        num: number;
        /**
         * 订单状态 0：购买成功，1：购买失败 其余的以后再加
         */
        orderState: number;
        GetType(): string;
    }
    /**
     * 请求查看所有购买订单
     */
    class RequestOrderListLobbyCmd_C {
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 请求的页数
         */
        pageNum: number;
        GetType(): string;
    }
    /**
     * 返回订单列表
     */
    class ReturnOrderListLobbyCmd_S {
        /**
         * 订单列表
         */
        orderList: LobbyOrderItem[];
        /**
         * 当前的页数
         */
        curPageNum: number;
        /**
         * 总的页数
         */
        totalPageNum: number;
        GetType(): string;
    }
    /**
     * 抽奖结果
     */
    class LuckShopPointItemLobbyCmd_CS {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        /**
         * 抽奖类型1表示钻石,2表示积分
         */
        luckyType: number;
        /**
         * 物品ID,下行用
         */
        goodId: number;
        GetType(): string;
    }
    /**
     * 获取抽奖结果
     */
    class GetLuckShopPointItemLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        /**
         * 抽奖类型1表示钻石,2表示积分
         */
        luckyType: number;
        GetType(): string;
    }
    /**
     * ---------------------------------商城兑换码----------------------------//
     *  请求兑换一个商品
     */
    class RedeemItemShopPointLobbyCmd_C {
        /**
         * 邮寄地址
         */
        addr: Cmd.DeliverAddr;
        /**
         * 兑换码
         */
        cdkey: string;
        GetType(): string;
    }
    /**
     * 通知消息
     */
    class Notification {
        /**
         * 消息id
         */
        id: number;
        /**
         * 类型
         */
        typ: Notification.Type;
        /**
         * 名称
         */
        name: string;
        /**
         * 留言
         */
        msg: string;
        /**
         * 头像
         */
        headurl: string;
        uid: number;
        GetType(): string;
    }
    module Notification {
        enum Type {
            AddFriend = 1,
        }
    }
    /**
     *  C-&gt;S 消息更新请求
     *  S-&gt;C 消息更新通知
     */
    class NotificationUpdateLobbyCmd_CS {
        op: Cmd.UpdateOperator;
        rows: Notification[];
        GetType(): string;
    }
    /**
     * 增加带入
     */
    class AddBringLobbyCmd_C {
        num: number;
        matchId: number;
        GetType(): string;
    }
    /**
     * 带出金钱
     */
    class TakeoutBringLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 系统设置
     */
    class SystemSettingsLobbyCmd_CS {
        /**
         * 自定义设置内容
         */
        settings: string;
        GetType(): string;
    }
    /**
     * ---------------------------------账号绑定其他登录方式----------------------------//
     *  获取手机验证码
     */
    class GetBindAccountIdentifyCodeLobbyCmd_C {
        /**
         * 手机号码
         */
        phoneNumber: number;
        /**
         * 操作类型 1/2/3  绑定/换绑/修改密码
         */
        opType: number;
        GetType(): string;
    }
    class GetBindAccountIdentifyCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 账号绑定其他登录方式
     */
    class BindAccountLobbyCmd_C {
        /**
         * 操作类型 1/2/3/4  绑定/换绑/修改密码/解绑
         */
        opType: number;
        /**
         * 平台id 129/手机
         */
        platId: number;
        /**
         * 平台账号 如果为绑定手机号 则填手机号
         */
        platAccount: string;
        /**
         * 各种第三方的验证码
         */
        code: string;
        /**
         * 其他登录为账号密码登录的需要同时带上密码
         */
        passwd: string;
        /**
         * 如果为换绑 则这为老手机验证码 -- 暂时不用吧。还是使用二步流程
         */
        oldCode: string;
        GetType(): string;
    }
    class BindAccountLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 验证指定验证码
     */
    class VerifyIdentifyCodeLobbyCmd_C {
        /**
         * 平台id 129/手机
         */
        platId: number;
        /**
         * 平台账号 如果为绑定手机号 则填手机号
         */
        platAccount: string;
        /**
         * 各种第三方的验证码
         */
        code: string;
        GetType(): string;
    }
    class VerifyIdentifyCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * ---------------------------------游客绑定邮箱----------------------------//
     *  获取手机验证码
     */
    class GetGuestBindEmailIdentifyCodeLobbyCmd_C {
        /**
         * 邮箱
         */
        email: string;
        /**
         * 操作类型 1/2/3/4  绑定/换绑/修改密码/解绑 -- 暂时没用到
         */
        opType: number;
        GetType(): string;
    }
    class GetGuestBindEmailIdentifyCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 游客绑定邮件
     */
    class GuestBindEmailLobbyCmd_C {
        /**
         * 操作类型 1/2/3/4  绑定/换绑/修改密码/解绑 -- 暂时只处理1、3
         */
        opType: number;
        /**
         * 平台账号 如果为绑定邮箱 则填邮箱
         */
        platAccount: string;
        /**
         * 邮件验证码
         */
        code: string;
        /**
         * 密码
         */
        passwd: string;
        /**
         * 旧密码
         */
        oldPasswd: string;
        GetType(): string;
    }
    class GuestBindEmailLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 防沉迷提示弹窗(好彩金币场yy渠道需求2018.06.08)
     */
    class AntiAddictionLobbyCmd_S {
        GetType(): string;
    }
    /**
     *  好彩金币系列代理商公告
     *  代理商分享页面信息
     */
    class GetAgentShareInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetAgentShareInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 剩余红包数量
         */
        redpackNum: number;
        /**
         * 红包金额
         */
        redpackChips: number;
        /**
         * 公告内容
         */
        broadInfo: string;
        GetType(): string;
    }
    /**
     * 代理商设置分享数据
     */
    class SetAgentShareInfoLobbyCmd_C {
        /**
         * 红包数量
         */
        redpackNum: number;
        /**
         * 红包金额
         */
        redpackChips: number;
        /**
         * 公告内容
         */
        broadInfo: string;
        GetType(): string;
    }
    class SetAgentShareInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 剩余红包数量
         */
        redpackNum: number;
        /**
         * 红包金额
         */
        redpackChips: number;
        /**
         * 公告内容
         */
        broadInfo: string;
        GetType(): string;
    }
    /**
     * 代理商设置公告通知所有下级播跑马灯
     */
    class NotifyAgentChildsBroadInfoLobby_Brd {
        /**
         * 0只播跑马灯 1需要弹窗和跑马灯
         */
        optype: number;
        /**
         * 公告内容
         */
        broadInfo: string;
        /**
         * 红包金额（如果该值存在则在***弹窗面板***上会有一个红包)
         * 服务器会直接默认到账，但是不会通知前端刷新
         * 前端自己在玩家点击领取或者关闭按钮的时候弹个领取特效然后请求下刷新数据同步金币数量
         * 注意不要弹两次特效（点击了领取按钮弹了特效后再点击关闭按钮就不要弹特效了）
         */
        redpackChips: number;
        GetType(): string;
    }
    /**
     * 大四喜大厅：查询玩家游戏记录
     */
    class GameRecords {
        /**
         * 游戏时间
         */
        timestamp: number;
        /**
         * 牌局Id,如果没传值得话，前端显示个“-”吧
         */
        roundId: number;
        /**
         * 投注金额
         */
        betChips: number;
        /**
         * 中奖金额
         */
        lotteryChips: number;
        /**
         * 输赢
         */
        profitChips: number;
        /**
         * 游戏Id
         */
        gameId: number;
        GetType(): string;
    }
    class FindUserGameRecordsLobbyCmd_C {
        /**
         * 不传或者传0默认为查找全部
         */
        gameId: number;
        /**
         * 开始时间戳
         */
        sttime: number;
        /**
         * 结束时间戳
         */
        endtime: number;
        GetType(): string;
    }
    class FindUserGameRecordsLobbyCmd_S {
        /**
         * 如果没传则表示没有记录
         */
        records: GameRecords[];
        GetType(): string;
    }
    /**
     * 玩家赠送金币信息
     */
    class GetUserGiftCoinInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetUserGiftCoinInfoLobbyCmd_S {
        /**
         * 赠送下限
         */
        minLimit: number;
        /**
         * 赠送上限
         */
        maxLimit: number;
        GetType(): string;
    }
    /**
     * 历史数据更新（大厅）
     */
    class HistoryUpdateLobbyCmd_CS {
        /**
         * 游戏Id
         */
        gameId: number;
        /**
         * 房间等级列表
         */
        levelList: number[];
        /**
         * 历史数据列表
         */
        historyList: Cmd.History[];
        GetType(): string;
    }
    /**
     * 玩家游戏历史数据更新（大厅）
     */
    class UserGameHistoryUpdateLobbyCmd_CS {
        /**
         * 游戏Id
         */
        gameId: number;
        /**
         * 房间等级
         */
        level: number;
        /**
         * 起始下标
         */
        beginIndex: number;
        /**
         * 结束下标
         */
        endIndex: number;
        /**
         * 历史记录最大条目数
         */
        maxLen: number;
        /**
         * 历史数据列表
         */
        history: Cmd.History;
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
/// <reference path="poker_room.d.ts" />
declare module Cmd {
    /**
     * 俱乐部数据更新
     */
    class UpdateInfoClubCmd_S {
        op: Cmd.UpdateOperator;
        /**
         * 加入的俱乐部
         */
        joinList: Cmd.ClubInfo[];
        /**
         * 权限
         */
        permission: Cmd.ClubInfo[];
        GetType(): string;
    }
    /**
     * 获取我的俱乐部消息
     */
    class MyInfoUpdateClubCmd_C {
        clubList: number[];
        GetType(): string;
    }
    /**
     * 创建俱乐部请求
     */
    class CreateClubCmd_C {
        /**
         * 俱乐部地址
         */
        address: Cmd.Address;
        /**
         * 俱乐部信息,有些不能上传的需要服务器验证
         */
        club: Cmd.ClubInfo;
        GetType(): string;
    }
    /**
     * 请求俱乐部信息
     */
    class RequestClubInfoClubCmd_C {
        clubId: number;
        GetType(): string;
    }
    /**
     * 俱乐部数据更新
     */
    class ReturnClubInfoClubCmd_S {
        /**
         * 俱乐部
         */
        club: Cmd.ClubInfo;
        /**
         * 申请列表
         */
        joinList: Cmd.ClubInfo;
        GetType(): string;
    }
    /**
     * 解散俱乐部
     */
    class DissmisClubCmd_C {
        clubId: number;
        GetType(): string;
    }
    /**
     * 解散俱乐部返回
     */
    class DissmisClubCmd_S {
        clubId: number;
        GetType(): string;
    }
    /**
     * 退出俱乐部
     */
    class QuitClubCmd_C {
        clubId: number;
        GetType(): string;
    }
    /**
     * 退出俱乐部返回
     */
    class QuitClubCmd_S {
        clubId: number;
        uid: number;
        GetType(): string;
    }
    /**
     * 加入俱乐部请求
     */
    class JoinRequestClubCmd_C {
        clubId: number;
        msg: string;
        GetType(): string;
    }
    /**
     * 处理加入俱乐部请求
     */
    class JoinReturnClubCmd_C {
        clubId: number;
        /**
         * 请求者uid
         */
        applyUid: number;
        /**
         * 处理结果
         */
        yesOrNo: boolean;
        GetType(): string;
    }
    /**
     * S-&gt;C 通知俱乐部成员信息
     */
    class MemberUpdateClubCmd_CS {
        clubId: number;
        memberList: Cmd.ClubInfo.Member[];
        op: Cmd.UpdateOperator;
        GetType(): string;
    }
    /**
     *  C-&gt;S 查询俱乐部成员信息
     *  S-&gt;C 回复俱乐部成员信息
     */
    class MemberQueryClubCmd_CS {
        filter: Cmd.FilterInfo;
        rows: Cmd.ClubInfo.Member[];
        sum: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求俱乐部某个成员信息
     *  S-&gt;C 通知俱乐部某个成员信息
     */
    class MemberInfoGetClubCmd_CS {
        clubId: number;
        uid: number;
        member: Cmd.ClubInfo.Member;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求俱乐部某个成员牌局总计
     *  S-&gt;C 通知俱乐部某个成员牌局总计
     */
    class MemberGameDataSumClubCmd_CS {
        clubId: number;
        uid: number;
        sum: Cmd.StatisticsRoundData;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求俱乐部申请人信息
     *  S-&gt;C 通知俱乐部申请人信息
     */
    class ApplicantUpdateClubCmd_CS {
        clubId: number;
        /**
         * 申请人
         */
        applicant: Cmd.ClubInfo.Member[];
        op: Cmd.UpdateOperator;
        filter: Cmd.FilterInfo;
        /**
         * 总人数
         */
        sum: number;
        GetType(): string;
    }
    /**
     * 编辑俱乐部信息
     */
    class EditClubCmd_C {
        club: Cmd.ClubInfo;
        GetType(): string;
    }
    /**
     *  C-&gt;S 搜索俱乐部请求
     *  S-&gt;C 搜索俱乐部结果
     */
    class SearchClubCmd_CS {
        nameOrId: string;
        address: Cmd.Address;
        /**
         * 查询数据
         */
        rows: Cmd.ClubInfo[];
        filter: Cmd.FilterInfo;
        GetType(): string;
    }
    /**
     * 设置俱乐部管理员
     */
    class PostUpdateClubCmd_CS {
        clubId: number;
        uid: number;
        post: Cmd.ClubInfo.Post;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求俱乐部牌局
     *  S-&gt;C 返回俱乐部牌局
     */
    class GameUpdateClubCmd_CS {
        clubId: number;
        /**
         * 截止时间点
         */
        startAt: number;
        num: number;
        /**
         * 牌局
         */
        game: Cmd.TexasConfig[];
        op: Cmd.UpdateOperator;
        GetType(): string;
    }
    /**
     * 移除成员
     */
    class MemberRemoveClubCmd_C {
        clubId: number;
        uid: number;
        GetType(): string;
    }
    /**
     * 设置俱乐部权限
     */
    class PermissionUpdateClubCmd_C {
        op: Cmd.UpdateOperator;
        /**
         * 职位权限
         */
        postPermission: Cmd.ClubInfo.PostPermission;
        /**
         * 俱乐部
         */
        clubId: number;
        GetType(): string;
    }
    /**
     * 充值基金
     */
    class FundRechargeClubCmd_C {
        clubId: number;
        /**
         * 兑换的钻石数
         */
        diamond: number;
        GetType(): string;
    }
    /**
     * 基金分发
     */
    class FundDistributeClubCmd_C {
        clubId: number;
        /**
         * 发放数量
         */
        num: number;
        /**
         * 目标玩家id
         */
        toId: number;
        inClub: boolean;
        /**
         * 发放的目标
         */
        uids: number[];
        GetType(): string;
    }
    /**
     * 基金数据更新
     */
    class FundInfoUpdateCmd_S {
        clubId: number;
        /**
         * 剩余数
         */
        left: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 转账请求
     *  S-&gt;C 新的转账请求通知
     */
    class TransitMoneyClubCmd_CS {
        clubId: number;
        num: number;
        /**
         * true 转进俱乐部 false 转出俱乐部
         */
        inOrOut: boolean;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求转账列表
     *  S-&gt;C 返回转账列表
     */
    class TransitMoneyQueryClubCmd_CS {
        clubId: number;
        filter: Cmd.FilterInfo;
        rows: Cmd.ClubInfo.Transition[];
        sum: number;
        GetType(): string;
    }
    /**
     * 转账处理
     */
    class TransitMoneyDealClubCmd_CS {
        id: number;
        /**
         * 0 未处理 1 同意 2 不同意 5 撤销
         */
        deal: number;
        clubId: number;
        GetType(): string;
    }
    /**
     * 创建者信息更新
     */
    class FounderInfoUpdateClubCmd_S {
        clubId: number;
        founderInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 货币兑换
     */
    class ExchangeMoneyClubCmd_CS {
        /**
         * 需要兑换的数量
         */
        num: number;
        /**
         * 兑进或兑出
         */
        inOrOut: boolean;
        GetType(): string;
    }
    /**
     * 升级
     */
    class UpgradeClubCmd_C {
        clubId: number;
        GetType(): string;
    }
    /**
     * 牌局生成器
     */
    class RoomGenerator {
        id: number;
        config: Cmd.TexasConfig;
        enable: boolean;
        num: number;
        createdAt: number;
        name: string;
        GetType(): string;
    }
    /**
     *  C-&gt;S 牌局生成器操作请求
     *  S-&gt;C 牌局生成器操作通知
     */
    class RoomGeneratorUpdateClubCmd_CS {
        clubId: number;
        op: Cmd.UpdateOperator;
        rows: RoomGenerator[];
        GetType(): string;
    }
    /**
     * C-&gt;S 获取自己代理下级代理关系线
     */
    class AgentRelationLineQueryClubCmd_CS {
        clubId: number;
        uid: number;
        line: Cmd.ClubInfo.Member[];
        GetType(): string;
    }
    /**
     * 查询玩家可重设的上级
     */
    class AgentAvailableUplineQueryClubCmd_CS {
        filter: Cmd.FilterInfo;
        rows: Cmd.ClubInfo.Member[];
        GetType(): string;
    }
    /**
     * 设置代理上线
     */
    class AgentUplineUpdateClubCmd_C {
        clubId: number;
        uid: number;
        upline: number;
        GetType(): string;
    }
    /**
     * 查询自己的下线成员列表
     */
    class AgentAvailableGiveMemberQueryClubCmd_CS {
        filter: Cmd.FilterInfo;
        rows: Cmd.ClubInfo.Member[];
        GetType(): string;
    }
    /**
     * 给代理分配成员
     */
    class AgentGiveMemberClubCmd_C {
        clubId: number;
        uid: number;
        /**
         * 新分配的玩家
         */
        giveList: number[];
        /**
         * 拿回的玩家
         */
        fetchlList: number[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求修改代理信誉值
     *  S-&gt;C 修改代理信誉值通知
     */
    class AgentCreditChangeClubCmd_CS {
        clubId: number;
        uid: number;
        value: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 代理信誉值记录查询
     *  S-&gt;C 代理信誉值记录回复
     */
    class AgentCreditChangeQueryClubCmd_CS {
        filter: Cmd.FilterInfo;
        uid: number;
        rows: AgentCreditChangeQueryClubCmd_CS.CreditChangeInfo[];
        GetType(): string;
    }
    module AgentCreditChangeQueryClubCmd_CS {
        class CreditChangeInfo {
            id: number;
            createdAt: number;
            dealer: Cmd.UserBaseInfo;
            value: number;
            GetType(): string;
        }
    }
    /**
     * 代理房间数据查询
     */
    class AgentStatisticsRoomQueryClubCmd_CS {
        filter: Cmd.FilterInfo;
        rows: ClubRoomData[];
        sum: Cmd.StatisticsRoundData;
        isSum: boolean;
        GetType(): string;
    }
    /**
     * 代理单个房间详情查询
     */
    class AgentStatisticsRoomCheckClubCmd_CS {
        filter: Cmd.FilterInfo;
        roomdata: Cmd.TexasConfig;
        rows: Cmd.StatisticsRoundData[];
        sum: Cmd.StatisticsRoundData;
        GetType(): string;
    }
    class UnionData {
        unionId: number;
        name: string;
        headurl: string;
        fund: number;
        createdAt: number;
        memberLimit: number;
        clubId: number;
        founder: number;
        donatedata: Cmd.DonateData;
        memberList: Cmd.ClubInfo[];
        GetType(): string;
    }
    class UnionMemberData {
        unionId: number;
        clubId: number;
        credit: number;
        createdAt: number;
        club: Cmd.ClubInfo;
        id: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 创建联盟请求
     *  S-&gt;S 创建联盟成功
     */
    class UnionCreateClubCmd_CS {
        clubId: number;
        name: string;
        GetType(): string;
    }
    /**
     *  C-&gt;S 加入联盟请求
     *  S-&gt;C 加入联盟结果
     */
    class UnionJoinRequestClubCmd_CS {
        uniondata: UnionData;
        result: number;
        GetType(): string;
    }
    /**
     * 加入联盟请求处理
     */
    class UnionJoinReturnClubCmd_C {
        unionId: number;
        /**
         * 请求者uid
         */
        clubId: number;
        /**
         * 处理结果
         */
        yesOrNo: boolean;
        GetType(): string;
    }
    /**
     * 编辑
     */
    class UnionEditClubCmd_CS {
        uniondata: UnionData;
        GetType(): string;
    }
    /**
     * 解散
     */
    class UnionDismissClubCmd_C {
        unionId: number;
        GetType(): string;
    }
    /**
     * 联盟更新
     */
    class UnionUpdateClubCmd_CS {
        clubId: number;
        op: Cmd.UpdateOperator;
        rows: UnionData[];
        GetType(): string;
    }
    /**
     * 退出
     */
    class UnionQuitClubCmd_C {
        unionId: number;
        clubId: number;
        GetType(): string;
    }
    /**
     * 基金充值
     */
    class UnionFundRechargeClubCmd_C {
        unionId: number;
        num: number;
        GetType(): string;
    }
    /**
     * 基金分发
     */
    class UnionFundDistributeClubCmd_C {
        unionId: number;
        num: number;
        clubList: number[];
        GetType(): string;
    }
    /**
     * 基金记录查询
     */
    class UnionFundDistributeQueryClubCmd_CS {
        unionId: number;
        filter: Cmd.FilterInfo;
        rows: UnionMemberData[];
        GetType(): string;
    }
    /**
     * 基金修改
     */
    class UnionFundInfoUpdateCmd_S {
        unionId: number;
        left: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求俱乐部申请人信息
     *  S-&gt;C 通知俱乐部申请人信息
     */
    class UnionApplicantUpdateClubCmd_CS {
        unionId: number;
        /**
         * 申请人
         */
        applicant: UnionMemberData[];
        op: Cmd.UpdateOperator;
        filter: Cmd.FilterInfo;
        sum: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求俱乐部成员信息
     *  S-&gt;C 通知俱乐部成员信息
     */
    class UnionMemberUpdateClubCmd_CS {
        unionId: number;
        memberList: UnionMemberData[];
        op: Cmd.UpdateOperator;
        GetType(): string;
    }
    /**
     * 移除成员
     */
    class UnionMemberRemoveClubCmd_C {
        unionId: number;
        clubId: number;
        GetType(): string;
    }
    /**
     * 联盟牌局数据总和查询
     */
    class UnionStatisticsSumQueryClubCmd_CS {
        filter: Cmd.FilterInfo;
        statistics: Cmd.StatisticsRoundData;
        GetType(): string;
    }
    class ClubRoomData {
        roomdata: Cmd.TexasConfig;
        result: Cmd.StatisticsRoundData;
        GetType(): string;
    }
    /**
     * 联盟房间数据查询
     */
    class UnionStatisticsRoomQueryClubCmd_CS {
        filter: Cmd.FilterInfo;
        /**
         * 1 买入 2 保险 3 捐献金
         */
        which: number;
        rows: ClubRoomData[];
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
/// <reference path="lobby_room.d.ts" />
/// <reference path="lobby_match.d.ts" />
declare module Cmd {
    /**
     * 赛事状态
     */
    enum EventInfoEventState {
        /**
         * 准备状态
         */
        EventInfoEventState_Ready = 1,
        /**
         * 游戏中
         */
        EventInfoEventState_Playing = 2,
        /**
         * 结算中
         */
        EventInfoEventState_Result = 3,
        /**
         * 匹配中
         */
        EventInfoEventState_Matching = 4,
        /**
         * 淘汰了
         */
        EventInfoEventState_Out = 5,
    }
    /**
     * 请求赛事报名信息
     */
    class EntryInfoEventMatchGroupCmd_C {
        /**
         * 匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求赛事报名信息
     */
    class EntryInfoEventMatchGroupCmd_S {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 当前报名数量
         */
        curNum: number;
        /**
         * 开赛人数 客户端读表就可以,以后用
         */
        maxNum: number;
        /**
         * 当前总共报名人数
         */
        allNum: number;
        /**
         * 我的状态,1表示已报名
         */
        myState: number;
        GetType(): string;
    }
    /**
     * 赛事信息
     */
    class EventInfoMatchGroupCmd_S {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 比赛开始时间,从开局到当前的秒数
         */
        time: number;
        /**
         * 底分
         */
        bottomPoint: number;
        /**
         * 淘汰分
         */
        leavingPoint: number;
        /**
         * 剩余用户数
         */
        userNumber: number;
        /**
         * 当前排行
         */
        myOrder: number;
        /**
         * 当前到第几轮了
         */
        level: number;
        /**
         * 当前游戏在哪个状态EventInfoEventState
         */
        curEventState: number;
        GetType(): string;
    }
    /**
     * 申请报名
     */
    class EntryEventMatchGroupCmd_C {
        /**
         * 匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 退出报名
     */
    class LeaveEventMatchGroupCmd_C {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 为1时不需要服务器返回消息
         */
        noSend: number;
        GetType(): string;
    }
    /**
     * 刷新当前人数和名次
     */
    class MyOrderEventMatchGroupCmd_S {
        /**
         * 剩余用户数
         */
        userNumber: number;
        /**
         * 当前排行
         */
        myOrder: number;
        GetType(): string;
    }
    /**
     * 弃权
     */
    class GiveUpEventMatchGroupCmd_C {
        /**
         * 匹配号id
         */
        matchId: number;
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
declare module Cmd {
    /**
     * 转账
     */
    class ExchangeItem {
        /**
         * id	1代码钻石,2代表房卡, 3金币
         */
        id: number;
        chips: number;
        GetType(): string;
    }
    /**
     * 交易key生成
     */
    class ExchangeKeyGet_CS {
        /**
         * 交易所需信息
         */
        exchangeInfo: ExchangeItem;
        /**
         * 生成的KEY
         */
        exchangeKey: string;
        /**
         * 剩余的筹码
         */
        remainderChips: number;
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 领取交易筹码
     */
    class ExchangeChipsReceive_CS {
        /**
         * 领取key
         */
        exchangeKey: string;
        /**
         * 交易所需信息
         */
        exchangeInfo: ExchangeItem;
        /**
         * 剩余的筹码
         */
        remainderChips: number;
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    class RedPaperInfo {
        /**
         * 交易所需信息
         */
        exchangeInfo: ExchangeItem;
        /**
         * 领取key
         */
        exchangeKey: string;
        /**
         * 领取结果 0/1表示未领，已领
         */
        bOk: number;
        /**
         * 发送红包的名字
         */
        sendUserName: string;
        /**
         * 领取红包的名字
         */
        recvUserName: string;
        /**
         * 领取红包的时间
         */
        recvTime: string;
        GetType(): string;
    }
    /**
     * 收发红包
     */
    class ExchangeRecordGet_CS {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 发出去的红包
         */
        sendRecord: RedPaperInfo[];
        /**
         * 收到的红包
         */
        receiveRecord: RedPaperInfo[];
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
declare module Cmd {
    /**
     * 各个玩家战绩数据
     */
    class UserGameHistory {
        /**
         * 玩家昵称
         */
        nickName: string;
        /**
         * 积分可能为负 所以为int32
         */
        integral: number;
        /**
         * 头像,茶馆用
         */
        headUrl: string;
        /**
         * 手牌,扑克牌用,牛牛等
         */
        cardList: number[];
        /**
         * 飞车把uid也传下去吧
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 比赛场战绩数据
     */
    class MatchGameHistory {
        /**
         * 名次
         */
        rank: number;
        /**
         * 第几轮
         */
        round: number;
        /**
         * 比赛场次id
         */
        playId: number;
        /**
         * 奖励
         */
        award: string;
        GetType(): string;
    }
    /**
     * 战绩数据
     */
    class GameHistory {
        /**
         * 全局唯一的房间id 用于索引战绩数据 （不用于显示）
         */
        globalRoomId: number;
        /**
         * 该战绩的房间号(组建房间时 随机的房间号)
         */
        roomId: number;
        /**
         * 对战时间
         */
        timeStamp: number;
        /**
         * 四个玩家的对战积分详情
         */
        userGameHistorys: UserGameHistory[];
        /**
         * 比赛场的相关数据
         */
        matchGameHistory: MatchGameHistory;
        /**
         * 发送gameId
         */
        gameId: number;
        /**
         * 如果是匹配号,则
         */
        matchId: number;
        /**
         * 对赌场 1:金币 2:钻石
         */
        gambleType: number;
        /**
         * 对赌场 底注
         */
        basePoint: number;
        GetType(): string;
    }
    /**
     * 详细战绩数据
     */
    class GameHistoryDetail {
        /**
         * 具体游戏时间
         */
        timeStamp: number;
        /**
         * 四个玩家的对战积分详情
         */
        userGameHistoryDetails: UserGameHistory[];
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * 本局对局数据的md5码
         */
        md5Code: string;
        GetType(): string;
    }
    /**
     * 战绩统计数据获取
     */
    class GetGameDataHistoryCmd_C {
        /**
         * 分页处理 当前请求第几页 默认一页返回10个数据
         */
        curPage: number;
        /**
         * 某一个匹配号的战绩
         */
        matchId: number;
        /**
         * 某一个房间号的战绩
         */
        roomId: number;
        GetType(): string;
    }
    class GetGameDataHistoryCmd_S {
        /**
         * 返回码 默认0为操作成功
         */
        resultCode: number;
        /**
         * 当前第几页
         */
        curPage: number;
        /**
         * 总共几页
         */
        maxPage: number;
        /**
         * 战绩统计数据
         */
        gameHistroys: GameHistory[];
        /**
         * 某一个匹配号的战绩
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 获取指定 globalRoomId 的 所有具体牌局详细数据
     */
    class GetGameDetailHistoryCmd_C {
        /**
         * 全局唯一的房间id 用于索引战绩数据
         */
        globalRoomId: number;
        GetType(): string;
    }
    class GetGameDetailHistoryCmd_S {
        /**
         * 返回码 默认0为操作成功
         */
        resultCode: number;
        /**
         * 全局唯一的房间内的 所有游戏数据
         */
        gameHistroyDetails: GameHistoryDetail[];
        /**
         * 房主小费数据
         */
        gameHostTip: GameHistoryDetail;
        /**
         * 发送gameId
         */
        gameId: number;
        GetType(): string;
    }
    /**
     * 房间日志
     */
    class RoomLogHistory {
        /**
         * 时间
         */
        sec: number;
        /**
         * 时间
         */
        round: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 请求房间日志信息
     */
    class GetRoomLogHistoryCmd_C {
        /**
         * 房间id,matchId
         */
        roomId: number;
        /**
         * 全局唯一的房间id 用于索引战绩数据
         */
        globalRoomId: number;
        GetType(): string;
    }
    /**
     * 返回请求房间日志信息
     */
    class GetRoomLogHistoryCmd_S {
        /**
         * 房间id,matchId
         */
        roomId: number;
        /**
         * 全局唯一的房间id 用于索引战绩数据
         */
        globalRoomId: number;
        /**
         * 全局唯一的房间id 用于索引战绩数据
         */
        list: RoomLogHistory[];
        GetType(): string;
    }
    /**
     * 获取对赌场战绩
     */
    class GetGambleDataHistoryCmd_C {
        /**
         * 分页处理 当前请求第几页 默认一页返回10个数据
         */
        curPage: number;
        GetType(): string;
    }
    class GetGambleDataHistoryCmd_S {
        /**
         * 返回码 默认0为操作成功
         */
        resultCode: number;
        /**
         * 当前第几页
         */
        curPage: number;
        /**
         * 总共几页
         */
        maxPage: number;
        gambleHistorys: GameHistory[];
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
/// <reference path="lobby_room.d.ts" />
declare module Cmd {
    enum MatchGroupType {
        MatchGroupType_None = 0,
        MatchGroupType_TaoTai = 1,
    }
    /**
     *  匹配号相关协议--------------------------------------------------------------------------------------------
     *  请求创建匹配组
     */
    class CreateMatchGroupCmd_C {
        /**
         * 房间信息
         */
        createRoom: Cmd.CreateRoomCmd_C;
        /**
         * 空或0表示游客,1表示白名单,2表示黑名单
         */
        type: number;
        /**
         * 最小开局人数,到达人数就开始倒计时
         */
        minNum: number;
        /**
         * 最大开局人数,到达人数就直接匹配一桌
         */
        maxNum: number;
        /**
         * 是否需要授权,1表示需要
         */
        needAgree: number;
        /**
         * 匹配号到达基础人数后的倒计时,秒,0表示用不
         */
        countDownSec: number;
        /**
         * 匹配号的生存时间,秒,0表示用不
         */
        lifeTimeSec: number;
        /**
         * 匹配类型,空或0是常规模式,1是淘汰赛模式MatchGroupType
         */
        matchType: number;
        /**
         * 允许客户端选择优质id作为匹配号
         */
        roomId: number;
        /**
         * 需要钻石
         */
        needDiamond: number;
        /**
         * 最多开房数
         */
        maxRoomNum: number;
        /**
         * 空或2表示茶馆模式,0表示不启用,1表示客家俱乐部模式,这里为了兼容,把空当做1用,实在山寨,但没办法了
         */
        clubType: number;
        /**
         * 副管理员ID
         */
        otherManagerId: number;
        /**
         * 匹配号名字
         */
        matchName: string;
        /**
         * 上下分
         */
        minMatchPoint: number;
        /**
         * 结算分钻比例,1分扣几钻
         */
        scoreDiamond: number;
        /**
         * 是否为俱乐部模式1：表示为俱乐部模式
         */
        isClub: number;
        /**
         * 赛事Id,只有自建赛事会发,官方赛事不发
         */
        eventId: number;
        /**
         * 税收起收点
         */
        taxMin: number;
        /**
         * 税收百分百
         */
        tax: number;
        /**
         * 大赢家税收固定数字
         */
        taxNum: number;
        /**
         * 金币转基金,只能创建是设定,中途不能修改
         */
        gold2MatchPoint: number;
        /**
         * 提示绑定代理标志,1表示如果没有绑定就提示
         */
        bindAgent: number;
        GetType(): string;
    }
    /**
     * 请求转换俱乐部基金到金币
     */
    class MatchPoint2GoldMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 给匹配号创建个新房间,茶馆用,等待别人选座加入
     */
    class CreateRoomMatchGroupCmd_C {
        /**
         * 匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 删除匹配号里的房间
     */
    class DeleteRoomMatchGroupCmd_C {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 房间id
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 设置玩家匹配分
     */
    class ChangeMatchPointMatchGroupCmd_CS {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 上下分
         */
        matchPoint: number;
        GetType(): string;
    }
    /**
     * 设置玩家备注
     */
    class ChangeMatchDescMatchGroupCmd_CS {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 备注
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 改变匹配号属性
     */
    class RequestChangeMatchGroupCmd_C {
        /**
         * 匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 改变匹配号属性
     */
    class ChangeMatchGroupCmd_C {
        /**
         * 房间信息
         */
        createRoom: Cmd.CreateRoomCmd_C;
        /**
         * 空或0表示游客,1表示白名单,2表示黑名单
         */
        type: number;
        /**
         * 最小开局人数,到达人数就开始倒计时
         */
        minNum: number;
        /**
         * 最大开局人数,到达人数就直接匹配一桌
         */
        maxNum: number;
        /**
         * 是否需要授权,1表示需要
         */
        needAgree: number;
        /**
         * 匹配号到达基础人数后的倒计时,秒,0表示用不
         */
        countDownSec: number;
        /**
         * 匹配号的生存时间,秒,0表示用不
         */
        lifeTimeSec: number;
        /**
         * 匹配类型,空或0是常规模式,1是淘汰赛模式MatchGroupType
         */
        matchType: number;
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 需要钻石
         */
        needDiamond: number;
        /**
         * 最多开房数
         */
        maxRoomNum: number;
        /**
         * 副管理员ID
         */
        otherManagerId: number;
        /**
         * 匹配号名字
         */
        matchName: string;
        /**
         * 是否公开数据
         */
        public: number;
        /**
         * 上下分
         */
        minMatchPoint: number;
        /**
         * 结算分钻比例,1分扣几钻
         */
        scoreDiamond: number;
        /**
         * 税收起收点
         */
        taxMin: number;
        /**
         * 税收百分百
         */
        tax: number;
        /**
         * 大赢家税收固定数字
         */
        taxNum: number;
        /**
         * 空或2表示茶馆模式,0表示不启用,1表示客家俱乐部模式,这里为了兼容,把空当做1用,实在山寨,但没办法了
         */
        clubType: number;
        /**
         * 提示绑定代理标志,1表示如果没有绑定就提示
         */
        bindAgent: number;
        GetType(): string;
    }
    /**
     * 改变匹配号属性
     */
    class ChangeMatchGroupCmd_S {
        /**
         * 房间信息
         */
        createRoom: Cmd.CreateRoomCmd_C;
        /**
         * 空或0表示游客,1表示白名单,2表示黑名单
         */
        type: number;
        /**
         * 最小开局人数,到达人数就开始倒计时
         */
        minNum: number;
        /**
         * 最大开局人数,到达人数就直接匹配一桌
         */
        maxNum: number;
        /**
         * 是否需要授权,1表示需要
         */
        needAgree: number;
        /**
         * 匹配号到达基础人数后的倒计时,秒,0表示用不
         */
        countDownSec: number;
        /**
         * 匹配号的生存时间,秒,0表示用不
         */
        lifeTimeSec: number;
        /**
         * 匹配类型,空或0是常规模式,1是淘汰赛模式MatchGroupType
         */
        matchType: number;
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 需要钻石
         */
        needDiamond: number;
        /**
         * 最多开房数
         */
        maxRoomNum: number;
        /**
         * 副管理员ID
         */
        otherManagerId: number;
        /**
         * 匹配号名字
         */
        matchName: string;
        /**
         * 是否公开数据
         */
        public: number;
        /**
         * 上下分
         */
        minMatchPoint: number;
        /**
         * 结算分钻比例,1分扣几钻
         */
        scoreDiamond: number;
        /**
         * 税收起收点
         */
        taxMin: number;
        /**
         * 税收百分百
         */
        tax: number;
        /**
         * 大赢家税收固定数字
         */
        taxNum: number;
        /**
         * 金币转基金,只能创建是设定,中途不能修改
         */
        gold2MatchPoint: number;
        /**
         * 空或2表示茶馆模式,0表示不启用,1表示客家俱乐部模式,这里为了兼容,把空当做1用,实在山寨,但没办法了
         */
        clubType: number;
        /**
         * 提示绑定代理标志,1表示如果没有绑定就提示
         */
        bindAgent: number;
        GetType(): string;
    }
    /**
     * 服务器请求绑定代理,弹窗
     */
    class RequestBindAgentMatchGroupCmd_S {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 代理id
         */
        agentId: number;
        GetType(): string;
    }
    /**
     * 请求绑定代理
     */
    class RequestBindAgentMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 代理id
         */
        agentId: number;
        GetType(): string;
    }
    /**
     * 请求参与玩家的列表
     */
    class PlayedListMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 返回参与玩家的列表,里面包括了玩家的输赢清空,搞活动用
     */
    class PlayedListMatchGroupCmd_S {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 成员信息
         */
        list: Cmd.MatchGroupMemberInfo[];
        GetType(): string;
    }
    /**
     * 清空与玩家的列表 返回PlayedListMatchGroupCmd_S
     */
    class ClearPlayedListMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 楼层基本信息
     */
    class FloorInfo {
        /**
         * 当前楼层id
         */
        floorId: number;
        /**
         * 游戏id  -- 兼容俱乐部模式 需要显示游戏名称和具体玩法描述
         */
        gameId: number;
        /**
         * 游戏名称
         */
        gameName: string;
        /**
         * 最大局数
         */
        gameNbr: number;
        /**
         * 最大房间内人数
         */
        userNbr: number;
        /**
         * 玩法描述
         */
        playTypeDesc: string;
        GetType(): string;
    }
    /**
     * 匹配组信息
     */
    class MathGroup {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        /**
         * 匹配组主人ID
         */
        ownerid: number;
        /**
         * 匹配组主人名称
         */
        ownername: string;
        /**
         * 本匹配号所产生的所有房间号
         */
        roomList: Cmd.MathGroupRoomInfo[];
        /**
         * 状态,0表示正常,1表示停止进人(终止)
         */
        state: number;
        /**
         * 接客倒计时
         */
        lifeTimeSec: number;
        /**
         * 销毁倒计时
         */
        delTimeSec: number;
        /**
         * 排队人数
         */
        waitUserNum: number;
        /**
         * 游戏人数
         */
        gameingUserNum: number;
        /**
         * 当前轮数,赛事用
         */
        step: number;
        /**
         * 匹配号名字
         */
        matchName: string;
        /**
         * 副匹配主id
         */
        masterid: string;
        /**
         * 是否公开数据
         */
        public: number;
        /**
         * 排队中的成员信息
         */
        waitUserList: Cmd.MatchGroupMemberInfo[];
        /**
         * 最大局数
         */
        gameNbr: number;
        /**
         * 最大房间内人数
         */
        userNbr: number;
        /**
         * 当前匹配号开了多少个房间了
         */
        curRoomNbr: number;
        /**
         * 游戏id  -- 兼容俱乐部模式 需要显示游戏名称和具体玩法描述
         */
        gameId: number;
        /**
         * 玩法描述 -- 兼容俱乐部模式 需要显示游戏名称和具体玩法描述
         */
        playTypeDesc: string;
        /**
         * 1表示游客模式访问
         */
        guest: number;
        /**
         * 4个元素的数组 分别表示  今天、昨天、7天内、30天内的 开房数
         */
        openNbrs: number[];
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
         * 游戏名称也发下去  -- 兼容俱乐部模式 需要显示游戏名称和具体玩法描述
         */
        gameName: string;
        /**
         * 当前剩余未提取税收
         */
        curTax: number;
        /**
         * 历史总税收
         */
        allTax: number;
        /**
         * 金币转基金,只能创建是设定,中途不能修改
         */
        gold2MatchPoint: number;
        /**
         * 当前楼层id
         */
        floorId: number;
        /**
         * 当前楼层列表数据 只需要回各楼层的基本玩法数据即可
         */
        floorList: FloorInfo[];
        GetType(): string;
    }
    /**
     * 请求提取俱乐部税收,每次都是一次性全部提取
     */
    class GetTaxMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 设置俱乐部税收
     */
    class SetTaxMatchGroupCmd_S {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 当前剩余未提取税收
         */
        curTax: number;
        /**
         * 当前剩余未提取税收
         */
        allTax: number;
        /**
         * 当前剩余未提取税收
         */
        change: number;
        GetType(): string;
    }
    /**
     * 请求等待列表
     */
    class WaitUserListMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求等待列表
     */
    class WaitUserListMatchGroupCmd_S {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 排队中的成员信息
         */
        waitUserList: Cmd.MatchGroupMemberInfo[];
        /**
         * 当前局数
         */
        curGameNbr: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        GetType(): string;
    }
    /**
     * 匹配开启倒计时
     */
    class StartCountDownMatchGroupCmd_Brd {
        /**
         * 倒计时秒数
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 创建匹配组返回
     */
    class CreateMatchGroupCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 自己创建的所有匹配号
         */
        curMath: MathGroup;
        /**
         * 自己创建的所有匹配号
         */
        matchIdList: number[];
        GetType(): string;
    }
    /**
     * 请求自己的所有匹配号,并且选中其中一个
     */
    class RequestMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 是否为俱乐部模式1：表示为俱乐部模式
         */
        isClub: number;
        /**
         * 获取指定楼层 -- sz新版俱乐部添加楼层 如果不传默认回最底层
         */
        floorId: number;
        GetType(): string;
    }
    /**
     * 返回自己的所有匹配号
     */
    class ReturnMatchGroupCmd_S {
        /**
         * 当前匹配号数据
         */
        curMath: MathGroup;
        /**
         * 自己创建的所有匹配号
         */
        matchIdList: number[];
        /**
         * 当前可用钻石
         */
        diamond: number;
        /**
         * 昨日钻石消耗
         */
        diamondY: number;
        /**
         * 今日钻石消耗
         */
        diamondT: number;
        /**
         * 所有其他匹配组详细
         */
        list: MathGroup[];
        /**
         * 是否为俱乐部模式1：表示为俱乐部模式
         */
        isClub: number;
        /**
         * 前端用的
         */
        isEnterRoom: number;
        GetType(): string;
    }
    /**
     * 请求黑白名单
     */
    class RequestMemberInfoMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 返回黑白名单
     */
    class ReturnMemberInfoMatchGroupCmd_S {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 把自己广播给其他成员,包括自己
         */
        whitelist: Cmd.MatchGroupMemberInfo[];
        /**
         * 把自己广播给其他成员,包括自己
         */
        blacklist: Cmd.MatchGroupMemberInfo[];
        GetType(): string;
    }
    /**
     * 请求终止匹配号
     */
    class OperateMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 状态,0表示正常,1表示停止进人(终止)
         */
        state: number;
        GetType(): string;
    }
    /**
     * 请求删除匹配号
     */
    class RequestDeleteMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求删除某匹配号战绩
     */
    class RequestDelHistoryMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 房间号
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 回应删除某匹配号战绩
     */
    class ReturnDelHistoryMatchGroupCmd_S {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 房间号
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 申请游客模式切换
     */
    class ChangeMatchTypeMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 空或0表示游客,1表示白名单,2表示黑名单
         */
        type: number;
        GetType(): string;
    }
    /**
     * 玩家主动申请加入白名单
     */
    class RequestJoinMemberMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 申请白名单消息列表,玩家请求后主动推给匹配主
     */
    class JoinMemberListMatchGroupCmd_S {
        /**
         * 匹配号
         */
        matchId: number;
        list: Cmd.MatchGroupMemberInfo[];
        GetType(): string;
    }
    /**
     * 有玩家申请加入时给匹配主一个弹窗,返回ReplyJoinMemberListMatchGroupCmd_C
     */
    class RequestJoinMemberMatchGroupCmd_S {
        matchId: number;
        uid: number;
        nickname: string;
        /**
         * 服务器间用
         */
        ownerid: number;
        /**
         * 微信联系方式
         */
        wechat: string;
        /**
         * 备注
         */
        note: string;
        GetType(): string;
    }
    /**
     * 匹配主,回应申请白名单消息列表
     */
    class ReplyJoinMemberListMatchGroupCmd_C {
        matchId: number;
        uid: number;
        /**
         * 0表示拒绝,1表示同意,2表示白名单,3表示黑名单
         */
        reply: number;
        /**
         * 服务器间用
         */
        ownerid: number;
        /**
         * 微信联系方式
         */
        wechat: string;
        GetType(): string;
    }
    /**
     * 匹配主,请求黑白名单操作
     */
    class OperateMemberListMatchGroupCmd_C {
        uid: number;
        /**
         * 0表示删除,1表示黑白名单互转,2表示添加白名单,3表示添加黑名单
         */
        reply: number;
        matchId: number;
        GetType(): string;
    }
    /**
     * 匹配主,请求黄名单操作
     */
    class SetVipMemberListMatchGroupCmd_C {
        uid: number;
        /**
         * 0表示取消vip,1表示设置vip
         */
        vip: number;
        matchId: number;
        GetType(): string;
    }
    /**
     * 匹配主,请求黄名单操作
     */
    class OperateYellowMemberListMatchGroupCmd_C {
        uid: number;
        uid2: number;
        /**
         * 0表示删除,1表示添加
         */
        reply: number;
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求黄名单
     */
    class RequestYellowMemberInfoMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        GetType(): string;
    }
    class YellowMemberInfo {
        uid: number;
        nickName: string;
        uid2: number;
        nickName2: string;
        GetType(): string;
    }
    /**
     * 返回黄名单
     */
    class ReturnYellowMemberInfoMatchGroupCmd_S {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 黄名单列表
         */
        list: YellowMemberInfo[];
        GetType(): string;
    }
    /**
     * 请求离开匹配组(深圳这边其实已经屏蔽掉了匹配等待的时间，所以不会出现这个协议)
     */
    class LeaveMatchGroupCmd_C {
        GetType(): string;
    }
    /**
     * 离开匹配组返回
     */
    class LeaveMatchGroupCmd_S {
        GetType(): string;
    }
    /**
     * 离开匹配组返回广播
     */
    class LeaveMatchGroupCmd_Brd {
        uid: number;
        GetType(): string;
    }
    /**
     * 请求离开俱乐部(这个离开 实际上是指 玩家不想存在于该俱乐部的黑白黄名单中 感觉一股深深的不靠谱)
     */
    class LeaveMatchGroup2Cmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 离开匹配组返回
     */
    class LeaveMatchGroup2Cmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 普通玩家请求茶馆里的房间
     */
    class RequestRoomMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 清除当前选中的匹配号,茶馆用,这样可以兼容冗余通知
     */
    class ClearCurMatchGroupCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 茶馆里的房间结束后需要通知当时大厅的所有人
     */
    class RoomDestroyMatchGroupCmd_S {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 房间号
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 茶馆里的房间状态变化
     */
    class RoomStateMatchGroupCmd_S {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 房间号
         */
        roomId: number;
        /**
         * 虚拟房间号id
         */
        deskId: number;
        /**
         * 不填或0表示准备中,1表示已开局,2表示已结束
         */
        state: number;
        GetType(): string;
    }
    /**
     * 普通玩家请求茶馆里的房间返回
     */
    class ReturnRoomMatchGroupCmd_S {
        /**
         * 匹配号
         */
        matchId: number;
        /**
         * 本匹配号所产生的所有房间号
         */
        roomList: Cmd.MathGroupRoomInfo[];
        /**
         * 0：没加入桌子权限 ， 1：正在申请。 2：获得加入权限
         */
        state: number;
        nickName: string;
        ownerid: number;
        /**
         * 分享数据,ActiveCreateRoomCmd_C时用,山寨下
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * 最大房间内人数
         */
        userNbr: number;
        /**
         * 房间最大局数
         */
        gameNbr: number;
        /**
         * 跟进gameId判断茶馆类型
         */
        gameId: number;
        /**
         * 是否自动进入类型1表示自动进入
         */
        autoInto: number;
        GetType(): string;
    }
    /**
     * 请求进入匹配组
     */
    class EnterMatchGroupCmd_C {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 進入房间需要带上lobbyId（指定房間id可能不是該大廳的）
         */
        lobbyId: number;
        /**
         * 房间id,如果不填就排队,填了直接进入,茶馆用,不填表示非茶馆模式,1表示新建房间,其他填房间号
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 请求进入匹配组返回
     */
    class EnterMatchGroupCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        /**
         * 匹配组主人ID
         */
        ownerid: number;
        /**
         * 匹配组主人名称
         */
        ownername: string;
        /**
         * 把自己广播给其他成员,包括自己
         */
        list: Cmd.MatchGroupMemberInfo[];
        /**
         * 离上一桌匹配成功的时间间隔
         */
        lastStartSec: number;
        /**
         * 红包雨倒计时
         */
        leftRedPackSec: number;
        /**
         * 游戏人数
         */
        gameingUserNum: number;
        GetType(): string;
    }
    /**
     * 广播匹配组成员
     */
    class EnterMatchGroupCmd_Brd {
        /**
         * 把自己广播给其他成员,包括自己
         */
        info: Cmd.MatchGroupMemberInfo;
        /**
         * 把自己广播给其他成员,包括自己
         */
        list: Cmd.MatchGroupMemberInfo[];
        /**
         * 分享数据,为了改变人数,这里冗余下
         */
        shareInfo: Cmd.ShareInfo;
        GetType(): string;
    }
    /**
     * 匹配组信息
     */
    class MatchGroupInfo {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 匹配号名字
         */
        matchName: string;
        /**
         * 匹配号主人名字
         */
        ownerName: string;
        /**
         * 描述
         */
        desc: string;
        /**
         * 当前参与活动人数
         */
        curUserNbr: number;
        /**
         * 微信联系方式
         */
        wechat: string;
        /**
         * 上下分
         */
        matchPoint: number;
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
         * 匹配组主人ID
         */
        ownerid: number;
        /**
         * 加个描述
         */
        tips: string;
        /**
         * 主人拥有的金豆数量
         */
        chips: number;
        /**
         * 该匹配号对应的游戏
         */
        gameId: number;
        /**
         * 房间人数
         */
        userNbr: number;
        /**
         * 等待的房间数
         */
        waitRoomNbr: number;
        /**
         * 开始的房间数
         */
        startRoomNbr: number;
        /**
         * 匹配号主人头像
         */
        ownerHeadUrl: string;
        /**
         * 该匹配号对应的游戏局数
         */
        gameNbr: number;
        /**
         * 客户端数组索引排序使用
         */
        index: number;
        /**
         * 是否为最新房间 1表示是
         */
        isNew: number;
        /**
         * 是否有未处理的消息 1表示有
         */
        noHandle: number;
        /**
         * 赛事Id,只有自建赛事会发,官方赛事不发
         */
        eventId: number;
        /**
         * 该匹配号对应的游戏名称
         */
        gameName: string;
        GetType(): string;
    }
    /**
     * 请求所有加入过的俱乐部
     */
    class HistoryClubListMatchGroupCmd_C {
        GetType(): string;
    }
    /**
     * 返回进入过的历史匹配组列表
     */
    class HistoryClubListMatchGroupCmd_S {
        /**
         * 匹配组摘要信息
         */
        infolist: MatchGroupInfo[];
        /**
         * 匹配组详细
         */
        detaillist: MathGroup[];
        GetType(): string;
    }
    /**
     * 请求删除进入过的历史匹配组列表
     */
    class DelHistoryMatchIdMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求进入过的历史匹配组列表
     */
    class HistoryMatchIdListMatchGroupCmd_C {
        /**
         * 是否为俱乐部模式1：表示为俱乐部模式
         */
        isClub: number;
        GetType(): string;
    }
    /**
     * 返回进入过的历史匹配组列表
     */
    class HistoryMatchIdListMatchGroupCmd_S {
        /**
         * 匹配组列表
         */
        list: MatchGroupInfo[];
        /**
         * 是否为俱乐部模式1：表示为俱乐部模式
         */
        isClub: number;
        GetType(): string;
    }
    /**
     * 请求添加匹配组列表
     */
    class RequestAddPublicMatchIdMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 微信号
         */
        wechat: string;
        /**
         * 加个描述
         */
        tips: string;
        /**
         * 不填或者1是传统匹配号,2是金豆匹配号
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 请求删除匹配组列表
     */
    class RequestRemovePublicMatchIdMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 不填或者1是传统匹配号,2是金豆匹配号
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 请求官方匹配组列表
     */
    class PublicMatchIdListMatchGroupCmd_C {
        /**
         * 不填或者1是传统匹配号,2是金豆匹配号
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 官方匹配组列表
     */
    class PublicMatchIdListMatchGroupCmd_S {
        /**
         * 匹配组列表
         */
        list: MatchGroupInfo[];
        /**
         * 不填或者1是传统匹配号,2是金豆匹配号
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 请求添加冠名赛--等待未完成
     */
    class RequestAddOfficialMatchIdMatchGroupCmd_C {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 微信号
         */
        wechat: string;
        GetType(): string;
    }
    /**
     * 请求冠名赛列表
     */
    class OfficialMatchIdListMatchGroupCmd_C {
        GetType(): string;
    }
    /**
     * 冠名赛列表
     */
    class OfficialMatchIdListMatchGroupCmd_S {
        /**
         * 把自己广播给其他成员,包括自己
         */
        list: MatchGroupInfo[];
        GetType(): string;
    }
    /**
     * 刷新匹配组信息
     */
    class RefreshMatchGroupCmd_Brd {
        /**
         * 匹配id
         */
        matchId: number;
        /**
         * 剩余开局秒数,0表示还未开始倒计时
         */
        leftTime: number;
        /**
         * 当前排队人数
         */
        curNum: number;
        /**
         * 最大排队人数
         */
        maxNum: number;
        /**
         * 把自己广播给其他成员,包括自己
         */
        list: Cmd.MatchGroupMemberInfo[];
        GetType(): string;
    }
    /**
     * 请求捐献金币给玩家
     */
    class DonateChipsToUserMatchRoomCmd_C {
        uid: number;
        /**
         * 增量
         */
        add: number;
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求捐献金币给主人
     */
    class DonateChipsToOwnerMatchRoomCmd_C {
        /**
         * 增量
         */
        add: number;
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求捐献历史
     */
    class DonateHistoryMatchRoomCmd_C {
        /**
         * 匹配号
         */
        matchId: number;
        GetType(): string;
    }
    class DonateHistory {
        uid: number;
        nickName: string;
        /**
         * 操作时间
         */
        time: number;
        /**
         * 当前变化量
         */
        change: number;
        /**
         * 总贡献量
         */
        all: number;
        /**
         * 类型,不填或者0表示赠送,1表示捐献
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 返回请求捐献历史
     */
    class DonateHistoryMatchRoomCmd_S {
        /**
         * 匹配号
         */
        matchId: number;
        list: DonateHistory[];
        GetType(): string;
    }
    /**
     * 俱乐部公告
     */
    class ClubNoticeMatchGroupCmd_CS {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 内容
         */
        content: string;
        /**
         * 是否可以修改 1:可以 0:不可以
         */
        bUpdate: number;
        GetType(): string;
    }
    /**
     * 操作楼层
     */
    class OperateFloorMatchGroupCmd_CS {
        /**
         * 匹配号id
         */
        matchId: number;
        /**
         * 楼层id
         */
        floorId: number;
        /**
         * 操作类型 1、2、3、4  新增、请求获取指定楼层当前玩法详情信息、修改、删除
         */
        opType: number;
        /**
         * 创建房间相关数据
         */
        createRoom: Cmd.CreateRoomCmd_C;
        /**
         * 返回码 存在返回码则是有误 操作成功了 该协议不回复 直接回复有用协议
         */
        resultCode: number;
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
declare module Cmd {
    /**
     * 下注类型枚举
     */
    enum LuckTurntableBetType {
        /**
         * 正常下注
         */
        LuckTurntableBetType_Normal = 1,
        /**
         * 复投 重复上次下注
         */
        LuckTurntableBetType_ReBet = 2,
    }
    /**
     * 玩家在线状态
     */
    enum LuckTurntableState {
        /**
         * 准备阶段
         */
        LuckTurntableState_Ready = 1,
        /**
         * 下注阶段
         */
        LuckTurntableState_Bet = 2,
        /**
         * 转盘转动阶段
         */
        LuckTurntableState_Run = 3,
        /**
         * 开奖阶段
         */
        LuckTurntableState_Open = 4,
    }
    /**
     * 下注信息
     */
    class LuckTurntableBetInfo {
        /**
         * 下注id
         */
        id: number;
        /**
         * 下注额度
         */
        num: number;
        /**
         * 赔率
         */
        obbs: number;
        GetType(): string;
    }
    /**
     * 获取当前转盘信息信息
     */
    class RequestLuckTurntbaleInfo_C {
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 是否请求可下注信息 1表示需要请求，其他表示不需要
         */
        requestBetInfo: number;
        GetType(): string;
    }
    /**
     * 幸运转盘刷新
     */
    class UpdateLuckTurntableMiniCmd_S {
        /**
         * LuckTurntableState
         */
        state: number;
        /**
         * 倒计时,秒
         */
        leftSec: number;
        /**
         * 期号
         */
        curRoundId: number;
        /**
         * 总下注情况
         */
        allBet: LuckTurntableBetInfo;
        /**
         * 我的总下注情况
         */
        myBet: LuckTurntableBetItem[];
        /**
         * 开奖情况
         */
        openResult: LuckTurntableHistory;
        /**
         * 可下注信息 id对应赔率
         */
        betInfo: LuckTurntableBetInfo[];
        /**
         * 总时间
         */
        totalSec: number;
        /**
         * 往期开奖情况
         */
        openList: LuckTurntableHistory[];
        GetType(): string;
    }
    /**
     * 幸运转盘下注
     */
    class BetLuckTurntableMiniCmd_CS {
        /**
         * 下注详情
         */
        betData: LuckTurntableBetItem;
        GetType(): string;
    }
    /**
     * 单次下注信息
     */
    class LuckTurntableBetItem {
        /**
         * 下注id
         */
        id: number;
        /**
         * 下注额度
         */
        num: number;
        /**
         * 看情况,如果需要给其他人广播下注消息的话,就用,不填就表示自己下注
         */
        uid: number;
        /**
         * 下注类型
         */
        betType: LuckTurntableBetType;
        /**
         * 订单号
         */
        orderId: number;
        GetType(): string;
    }
    /**
     * 每期的总押注情况
     */
    class LuckTurntableBetHistoryData {
        /**
         * 期号
         */
        roundId: number;
        /**
         * 下注详情
         */
        betData: LuckTurntableBetItem[];
        /**
         * 总投注数
         */
        betNum: number;
        /**
         * 自己在当次的利润
         */
        profits: number;
        /**
         * 中奖id
         */
        id: number;
        GetType(): string;
    }
    /**
     * 下注信息
     */
    class LuckTurntableHistory {
        /**
         * 中奖id
         */
        id: number;
        /**
         * 下注额度
         */
        num: number;
        /**
         * 期号
         */
        roundId: number;
        /**
         * 自己在当次的利润
         */
        profits: number;
        GetType(): string;
    }
    /**
     * 请求幸运转盘路单
     */
    class HistoryLuckTurntableMiniCmd_C {
        GetType(): string;
    }
    /**
     * 幸运转盘路单
     */
    class HistoryLuckTurntableMiniCmd_S {
        /**
         * 路单
         */
        list: LuckTurntableHistory[];
        GetType(): string;
    }
    /**
     * 开奖结果返回
     */
    class OpenLuckTurnTableMiniCmd_S {
        /**
         * 路单
         */
        result: LuckTurntableHistory;
        GetType(): string;
    }
    /**
     * 请求自己所有押注信息
     */
    class RequestBetHistoryCmd_C {
        /**
         * 当前请求第几页
         */
        curPage: number;
        GetType(): string;
    }
    /**
     * 请求自己所有历史押注信息
     */
    class ReturntBetHistoryCmd_S {
        /**
         * 所有历史押注信息
         */
        betData: LuckTurntableBetHistoryData[];
        /**
         * 总页数
         */
        totalPage: number;
        /**
         * 当前是多少页
         */
        curPage: number;
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
declare module Cmd {
    /**
     * 请求当前正常运营的游戏列表
     */
    class GetNormalGameListRoomCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 1/2/3 普通场、练习场、匹配场  默认为1 兼容以前模式
         */
        typ: number;
        /**
         * 是否俱乐部请求 1:是 0:不是
         */
        isClub: number;
        /**
         * 客户端上传游戏版本列表的md5 用于子游戏的版本更新
         */
        md5GameList: string;
        GetType(): string;
    }
    class GetNormalGameListRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 1/2/3 普通场、练习场、匹配场  默认为1 兼容以前模式
         */
        typ: number;
        /**
         * 正常前端可选择的游戏列表id
         */
        gameIdList: number[];
        /**
         * 上次创建数据
         */
        lastCreate: CreateRoomCmd_C;
        /**
         * 免费开始时间 如果该字段不为Nil则代表当前处于免费时间内
         */
        startTime: number;
        /**
         * 免费结束时间
         */
        endTime: number;
        /**
         * 是否俱乐部请求 1:是 0:不是
         */
        isClub: number;
        /**
         * TableLobbyGameList配置数据
         */
        tableLobbyGame: string;
        /**
         * 游戏版本json数据 用于子游戏的版本更新
         */
        gameVersionList: string;
        GetType(): string;
    }
    /**
     * 获取当前练习场
     */
    class GetPracticeGameInfoRoomCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 暂时由服务器默认分配第一个的话 这里不传
         */
        gameId: number;
        /**
         * 初中高 1/2/3
         */
        level: number;
        GetType(): string;
    }
    class GetPracticeGameInfoRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 游戏id
         */
        gameId: number;
        /**
         * 区id
         */
        zoneId: number;
        GetType(): string;
    }
    /**
     * 创建房间
     */
    class CreateRoomCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 当前房间创建局数
         */
        gameNbr: number;
        /**
         * 玩法
         */
        playType: number;
        /**
         * 房间模式  二人、四人
         */
        userNbr: number;
        /**
         * 房间支付类型
         */
        payType: number;
        /**
         * 峰值
         */
        multiplePeak: number;
        /**
         * 出牌时间
         */
        outTime: number;
        /**
         * 房主小费
         */
        hostTip: number;
        /**
         * 大厅不校验的数据,给游戏校验
         */
        props: number[];
        /**
         * 当前正常开始 是否存在对赌
         */
        gamble: number;
        /**
         * 对赌类型 1/2 金币/钻石 默认不传为赌金币
         */
        gambleType: number;
        /**
         * 输赢上限  (好彩真人金币场)
         */
        winLimit: number;
        /**
         * 加倍起番  (好彩真人金币场)
         */
        ratio: number;
        /**
         * 底分
         */
        basePoint: number;
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
         * 返回当前游戏的名称 好牌网俱乐部需要
         */
        gameName: string;
        /**
         * 0:不允许 1:允许 是否允许陌生人加入(芝麻斗牌 好友房)
         */
        bAllowStranger: number;
        GetType(): string;
    }
    class CreateRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 区id
         */
        zoneId: number;
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        /**
         * 如果不为空表示为匹配场
         */
        scene: number;
        /**
         * 不进入游戏
         */
        notIntoGame: number;
        /**
         * 该房间创建时为几人房 -- 牛牛人数不同ui不一致
         */
        baseUserNbr: number;
        /**
         * 游戏版本json数据 用于子游戏的版本更新
         */
        gameVersionList: string;
        GetType(): string;
    }
    /**
     * 请求踢人
     */
    class KickLeaveRoomCmd_C {
        uid: number;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 匹配号的传下匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求解散房间
     */
    class ActiveDissolveRoomCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 匹配号的传下匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 查看正在进行中的房间(多开房间用)
     */
    class ActiveCreateRoomCmd_C {
        GetType(): string;
    }
    class ActiveCreateRoomCmd_S {
        /**
         * 本匹配号所产生的所有房间号
         */
        roomList: Cmd.MathGroupRoomInfo[];
        GetType(): string;
    }
    class ActiveDetailRoomCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * globalRoomId
         */
        gid: number;
        /**
         * 匹配号的传下匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    class ActiveDetailRoomCmd_S {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * globalRoomId
         */
        gid: number;
        /**
         * 不填或0表示准备中,1表示已开局
         */
        state: number;
        /**
         * 成员信息
         */
        list: Cmd.MatchGroupMemberInfo[];
        /**
         * 匹配号的回下匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 返回房间
     */
    class ReturnRoomCmd_C {
        /**
         * 返回房间需要带上lobbyId
         */
        lobbyId: number;
        GetType(): string;
    }
    class ReturnRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 区id
         */
        zoneId: number;
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        /**
         * 房间类型RoomType
         */
        roomType: number;
        /**
         * 如果不为空表示为匹配场
         */
        scene: number;
        /**
         * 该房间创建时为几人房 -- 牛牛人数不同ui不一致
         */
        baseUserNbr: number;
        GetType(): string;
    }
    /**
     * 加入房间
     */
    class EnterRoomCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 進入房间需要带上lobbyId（指定房間id可能不是該大廳的）
         */
        lobbyId: number;
        /**
         * 俱乐部内进入的指定桌子从这里传 nil/0/0以上  不传为以前的默认、主动创建新的、加入指定的
         */
        preBestRoomId: number;
        /**
         * 俱乐部授权房间认证多一个备注流程。正常进入流程不传、申请授权界面传入备注 玩家不填也必须传空字符串 不能不传。
         */
        note: string;
        /**
         * 当前楼层id
         */
        floorId: number;
        GetType(): string;
    }
    class EnterRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 区id
         */
        zoneId: number;
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        /**
         * 如果不为空表示为匹配场
         */
        scene: number;
        roomState: Cmd.RoomState;
        /**
         * 该房间创建时为几人房 -- 牛牛人数不同ui不一致
         */
        baseUserNbr: number;
        /**
         * 游戏版本json数据 用于子游戏的版本更新
         */
        gameVersionList: string;
        GetType(): string;
    }
    /**
     * 进入俱乐部 需要弹出申请备注流程
     */
    class NotifyImportNoteCmd_S {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 進入房间需要带上lobbyId（指定房間id可能不是該大廳的）
         */
        lobbyId: number;
        /**
         * 俱乐部内进入的指定桌子从这里传 nil/0/0以上  不传为以前的默认、主动创建新的、加入指定的
         */
        preBestRoomId: number;
        GetType(): string;
    }
    /**
     * 房间解散时 由大厅统一推条消息通知房间创建者
     */
    class RemoveRoomCmd_Brd {
        /**
         * 房间解散 给房主推送该通知时 带上其当前房卡数量
         */
        card: number;
        GetType(): string;
    }
    /**
     * 创建的房间已被其他四个玩家玩了 则推送一条消息给玩家 通知其 当前可创建房间了
     */
    class CanCreateRoomCmd_Brd {
        /**
         * 房间号
         */
        roomId: number;
        /**
         * 当前钻石
         */
        diamond: number;
        GetType(): string;
    }
    class SysMessageMahjongLobbyCmd_S {
        desc: string;
        /**
         * 消息级别和位置相关  null/1  中度提示条、弹框确定
         */
        pos: number;
        /**
         * 要打开的窗口id
         */
        openWindow: number;
        /**
         * 返回码 客户端根据去选择语言版本（2018.05.08好彩金币系列）
         */
        errorCode: number;
        GetType(): string;
    }
    /**
     * 请求续局
     */
    class ApplyContinuePlayRoomCmd_C {
        GetType(): string;
    }
    class ApplyContinuePlayRoomCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 续局请求广播
     */
    class ApplyContinuePlayRoomCmd_Brd {
        /**
         * 续局的具体数据 可要可不要
         */
        desc: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 续局发起者
         */
        owner: string;
        GetType(): string;
    }
    /**
     * 请求播放录像
     */
    class RequestRecordLobbyCmd_C {
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 如果没有穿globalid,就用roomid反射成globalid,有可能重复,但是先忽略
         */
        roomId: number;
        /**
         * 第几局
         */
        curGameNbr: number;
        /**
         * globalRoomId:curGameNbr,兼容方式跑起来
         */
        recordStr: string;
        GetType(): string;
    }
    /**
     * 返回播放录像
     */
    class ReturnRecordLobbyCmd_S {
        /**
         * 录像数据
         */
        data: string;
        /**
         * 需要返回gameid,客户端要找
         */
        gameId: number;
        /**
         * 主视角uid
         */
        uid: number;
        /**
         * 返回码 成功不返回,错误返回非0
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 请求暂停录像
     */
    class RequestPauseRecordRoomCmd_C {
        /**
         * 1表示暂停,2表示继续
         */
        pause: number;
        GetType(): string;
    }
    /**
     * 请求进退录像
     */
    class RequestStepRecordRoomCmd_C {
        /**
         * 负数表示后退,正数表示钱进
         */
        step: number;
        GetType(): string;
    }
    /**
     * 请求退出录像
     */
    class RequestStopRecordRoomCmd_C {
        GetType(): string;
    }
    /**
     *  匹配场(金币场)--------------------------------------------------------------------------------------------
     *  进入某一匹配场
     */
    class EnterMatchRoomCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 场次id
         */
        scene: number;
        /**
         * 匹配场 对赌类型 1/2 金币／钻石(暂时可不传 预留)
         */
        gambleType: number;
        GetType(): string;
    }
    /**
     * 客家棋牌活动 推荐排行榜--------------------------------------------------------------------------------------------
     */
    class InviteRankInfo {
        uid: number;
        nickName: string;
        num: number;
        /**
         * 头像url
         */
        headUrl: string;
        GetType(): string;
    }
    class IntoInviteRankLobbyCmd_C {
        GetType(): string;
    }
    class IntoInviteRankLobbyCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        infos: InviteRankInfo[];
        myNum: number;
        GetType(): string;
    }
    /**
     * 好彩真人麻将，进入房间之前的判断
     */
    class GamePara {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 场次id
         */
        scene: number;
        /**
         * 匹配场 对赌类型 1/2 金币／钻石(暂时可不传 预留)
         */
        gambleType: number;
        /**
         * 测试服允许前端指定区服id
         */
        preZoneId: number;
        GetType(): string;
    }
    class JudgeEnterGameLobbyCmd_C {
        /**
         * 1匹配场  2百人场 3百人场体验场
         */
        enter: number;
        /**
         * 房间相关参数
         */
        gamePara: GamePara;
        GetType(): string;
    }
    class JudgeEnterGameLobbyCmd_S {
        resultCode: number;
        /**
         * 之前所在房间的游戏类型 1匹配场  2百人场
         */
        enter: number;
        /**
         * 房间相关参数
         */
        gamePara: GamePara;
        GetType(): string;
    }
    /**
     * 好彩真人麻将，返回之前的游戏
     */
    class ReturnHaoCaiGameLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class ReturnHaoCaiGameLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * -----------------------------对赌场相关--------------------
     *  请求对赌房间信息
     */
    class RequestGambleRoomInfoLobbyCmd_C {
        lobbyId: number;
        gameId: number;
        /**
         * 是否刷新 nil:不是 1:是
         */
        bRefresh: number;
        GetType(): string;
    }
    class RequestGambleRoomInfoLobbyCmd_S {
        gambleRoomInfos: GambleRoomInfo[];
        /**
         * 上次进入房间场次  1:匹配房 2:好友房
         */
        roomType: number;
        /**
         * 上次进入游戏ID
         */
        gameId: number;
        GetType(): string;
    }
    class GambleRoomInfo {
        gameId: number;
        /**
         * 1:匹配房 2:好友房
         */
        roomType: number;
        /**
         * 1:金币 2:钻石
         */
        gambleType: number;
        /**
         * 底注
         */
        basePoint: number;
        /**
         * 进场
         */
        enteringPoint: number;
        /**
         * 离场
         */
        leavingPoint: number;
        /**
         * 当前人数
         */
        curUserNbr: number;
        /**
         * 好友房 几人场
         */
        userNbr: number;
        /**
         * 匹配房 场次
         */
        scene: number;
        /**
         * 匹配房 1:繁忙 0:流畅
         */
        isBusy: number;
        /**
         * 好友房 玩法
         */
        props: number[];
        /**
         * 好友房 房间roomid
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 请求最终进入的房间的一些信息
     */
    class GetGambleRoomInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetGambleRoomInfoLobbyCmd_S {
        /**
         * 1:金币 2:钻石
         */
        gambleType: number;
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
declare module uniLib {
    /**
     * ---------------------------------公共模块----------------------------//
     */
    enum CommonModel {
        /**
         * 充值
         */
        RECHARGE = 1,
        /**
         * 在线礼包
         */
        ONLINE_GIFT = 2,
        /**
         * 背包
         */
        BAG = 3,
        /**
         * 活动中心
         */
        ACTIVITY = 4,
        /**
         * 个人信息
         */
        MY = 5,
        /**
         * 大厅底部菜单
         */
        LOBBY_MAIN_MENU = 6,
        /**
         * 游戏头部聊天
         */
        TOP_CHAT = 7,
        /**
         * 查看玩家信息
         */
        USERINFO = 8,
        /**
         * 兑换话费卡
         */
        EXCHANGE_PHONECARD = 9,
        /**
         * 大厅公告
         */
        LOBBY_NOTICE = 10,
        /**
         * 设置
         */
        LOBBY_SETTING = 11,
    }
    /**
     * ---------------------------------公共消息----------------------------//
     * 游戏发送给大厅
     */
    enum CommonEvent_G2L {
        /**
         * 领取在线礼包
         */
        GET_ONLIEN_GIFT = 1,
    }
    /**
     * 大厅发送给游戏
     */
    enum CommonEvent_L2G {
        /**
         * 在线礼包时间更新
         */
        GET_ONLIEN_GIFT_TIME = 1,
        /**
         * 在线礼包时间完成
         */
        ON_ONLIEN_GIFT_TIME_END = 2,
        /**
         * 设置面板
         */
        ON_SETTING = 3,
        /**
         * 设置面板
         */
        ON_HELP = 4,
    }
    /**
     * 任务事件
     */
    enum TaskEventEnum {
        /**
         * 分享
         */
        SHARE = 1,
        /**
         * 上庄
         */
        BANKER = 2,
        /**
         * 玩游戏
         */
        GAME = 3,
        /**
         * 充值
         */
        RECHAR = 4,
        /**
         * 金币数量
         */
        CHIPS = 5,
        /**
         * 登陆
         */
        LOGIN = 6,
    }
    class Any {
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
/// <reference path="lobby.d.ts" />
declare module Cmd {
    /**
     * 麻将类型
     */
    enum MahjongType {
        MahjongType_None = 0,
        /**
         * 双人麻将
         */
        MahjongType_Two = 1,
        /**
         * 四人麻将
         */
        MahjongType_Four = 2,
    }
    enum MahjongCardType {
        MahjongCardType_None = 0,
        /**
         * 万
         */
        MahjongCardType_Million = 1,
        /**
         * 条
         */
        MahjongCardType_strip = 2,
        /**
         * 筒
         */
        MahjongCardType_pie = 3,
        /**
         * 东南西北中发白
         */
        MahjongCardType_Other = 4,
        /**
         * 花
         */
        MahjongCardType_flower = 5,
    }
    enum MahjongCardOtherType {
        MahjongCardOtherType_None = 0,
        /**
         * 东
         */
        MahjongCardOtherType_East = 1,
        /**
         * 南
         */
        MahjongCardOtherType_South = 2,
        /**
         * 西
         */
        MahjongCardOtherType_West = 3,
        /**
         * 北
         */
        MahjongCardOtherType_North = 4,
        /**
         * 中
         */
        MahjongCardOtherType_Mid = 5,
        /**
         * 发
         */
        MahjongCardOtherType_Rich = 6,
        /**
         * 白
         */
        MahjongCardOtherType_White = 7,
    }
    enum MahjongOpCardType {
        MahjongOpCardType_None = 0,
        /**
         * 胡牌
         */
        MahjongOpCardType_Win = 1,
        /**
         * 杠牌
         */
        MahjongOpCardType_Bar = 2,
        /**
         * 补牌 --3,4,5为预留字段
         */
        MahjongOpCardType_Supply = 3,
        /**
         * 碰牌
         */
        MahjongOpCardType_Touch = 6,
        /**
         * 吃顺
         */
        MahjongOpCardType_Eat = 7,
        /**
         * MahjongOpCardType_Send				= 8;	// 摸牌
         *  不操作
         */
        MahjongOpCardType_Undo = 9,
        /**
         * 听牌
         */
        MahjongOpCardType_Listen = 10,
        /**
         * 三金倒
         */
        MahjongOpCardType_ThreeGold = 11,
        /**
         * 天胡
         */
        MahjongOpCardType_SkyWin = 12,
        /**
         * 抢金
         */
        MahjongOpCardType_GrabGold = 13,
        /**
         * 游金
         */
        MahjongOpCardType_GoldSwim = 14,
        /**
         * 双游
         */
        MahjongOpCardType_DoubleSwim = 15,
        /**
         * 三游
         */
        MahjongOpCardType_ThreeSwim = 16,
        /**
         * 八花
         */
        MahjongOpCardType_EightFlower = 17,
        /**
         * 抢杠和
         */
        MahjongOpCardType_BarOtherWin = 18,
        /**
         * 四金倒
         */
        MahjongOpCardType_FourGold = 19,
        /**
         * 五金倒
         */
        MahjongOpCardType_FiveGold = 20,
        /**
         * 六金倒
         */
        MahjongOpCardType_SixGold = 21,
        /**
         * 长沙麻将
         *  起手小胡
         */
        MahjongOpCardType_startSmallWin = 22,
        /**
         *  遵义麻将
         *  原缺
         */
        MahjongOpCardType_OriginalLack = 23,
        /**
         * 定缺
         */
        MahjongOpCardType_EnsureLack = 24,
        /**
         *  金华麻将
         *  敲响
         */
        MahjongOpCardType_Knock = 25,
        /**
         *  二人金币
         *  加倍
         */
        MahjongOpCardType_Double = 26,
        /**
         *  漳州麻将
         *  四游
         */
        MahjongOpCardType_FourSwim = 27,
        /**
         * 五游
         */
        MahjongOpCardType_FiveSwim = 28,
        /**
         * 六游
         */
        MahjongOpCardType_SixSwim = 29,
        /**
         * 抢杠
         */
        MahjongOpCardType_BarOther = 101,
        /**
         * 自杠
         */
        MahjongOpCardType_BarSelf = 102,
        /**
         * 碰杠
         */
        MahjongOpCardType_BarTouch = 103,
        /**
         *  古田麻将
         *  原金杠
         */
        MahjongOpCardType_YuanJinBar = 104,
        /**
         * 杂金杠
         */
        MahjongOpCardType_ZaJinBar = 105,
        /**
         * 长沙麻将
         * 抢补
         */
        MahjongOpCardType_SupplyOther = 202,
        /**
         * 自补
         */
        MahjongOpCardType_SupplySelf = 203,
        /**
         * 碰补
         */
        MahjongOpCardType_SupplyTouch = 204,
        /**
         * 杠胡
         */
        MahjongOpCardType_BarWin = 205,
        /**
         * 宁德麻将
         *  金坎
         */
        MahjongOpCardType_JinKan = 110,
        /**
         * 四川麻将
         *  换牌操作
         */
        MahjongOpCardType_changgeCard = 120,
        /**
         * 海南麻将吃三道吃四道动画
         *  吃三道
         */
        MahjongOpCardType_EatThree = 130,
        /**
         * 吃四道
         */
        MahjongOpCardType_EatFour = 131,
        /**
         * 首张被跟
         */
        MahjongOpCardType_FollowBanker = 132,
        /**
         * 首张被杠
         */
        MahjongOpCardType_BarFirst = 133,
        /**
         * 宽甸麻将
         * 报夹
         */
        MahjongOpCardType_baojia = 33,
        /**
         * 报吊
         */
        MahjongOpCardType_baotdiao = 34,
        /**
         * 站立报听
         */
        MahjongOpCardType_zhanlibaoting = 35,
        /**
         * 站立报夹
         */
        MahjongOpCardType_zhanlibaojia = 36,
        /**
         * 站立报吊
         */
        MahjongOpCardType_zhanlibaodiao = 37,
        /**
         * 凤城麻将
         * 摇宝
         */
        MahjongOpCardType_yaobao = 50,
        /**
         * 跟宝
         */
        MahjongOpCardType_genbao = 51,
        /**
         * 放风
         */
        MahjongOpCardType_windCard = 52,
        /**
         * 沈阳麻将
         * 东南西旋风杠
         */
        MahjongOpCardType_DNXBXuanFengBar = 106,
        /**
         * 中发白旋风杠
         */
        MahjongOpCardType_ZFBXuanFengBar = 107,
        /**
         * 过蛋
         */
        MahjongOpCardType_PassEggs = 108,
        /**
         * 任丘麻将
         * 中发白箭
         */
        MahjongOpCardType_Jian = 55,
        /**
         * 风
         */
        MahjongOpCardType_Feng = 56,
    }
    /**
     * 番型
     */
    enum MahjongMultiType {
        /**
         * 跟牌
         */
        MahjongMultiType_FollowCard = 1,
        /**
         * 花杠
         */
        MahjongMultiType_FlowerBar = 2,
        /**
         * 明杠
         */
        MahjongMultiType_BrightBar = 3,
        /**
         * 暗杠
         */
        MahjongMultiType_DarkBar = 4,
        /**
         * 自摸
         */
        MahjongMultiType_WinSelf = 5,
        /**
         * 抢杠胡
         */
        MahjongMultiType_GrabBarWin = 6,
        /**
         * 抢金
         */
        MahjongMultiType_GrabGold = 7,
        /**
         * 天胡
         */
        MahjongMultiType_SkyWin = 8,
        /**
         * 游金
         */
        MahjongMultiType_GoldSwim = 9,
        /**
         * 双游
         */
        MahjongMultiType_DoubleSwim = 10,
        /**
         * 三游
         */
        MahjongMultiType_ThreeSwim = 11,
        /**
         * 三金倒
         */
        MahjongMultiType_ThreeGold = 12,
        /**
         * 四金倒
         */
        MahjongMultiType_FourGold = 13,
        /**
         * 五金倒
         */
        MahjongMultiType_FiveGold = 14,
        /**
         * 六金倒
         */
        MahjongMultiType_SixGold = 15,
        /**
         * 十三幺
         */
        MahjongMultiType_Thirteen = 16,
        /**
         * 八花
         */
        MahjongMultiType_Flowers = 17,
    }
    /**
     * 宁德麻将番型
     */
    enum NingDeMultiType {
        /**
         * 鸡胡
         */
        NingDeMultiType_ComminWin = 1,
        /**
         * 自摸
         */
        NingDeMultiType_SelfWin = 2,
        /**
         * 抢金
         */
        NingDeMultiType_GrabGold = 3,
        /**
         * 天胡
         */
        NingDeMultiType_SkyWin = 4,
        /**
         * 三金倒
         */
        NingDeMultiType_ThreeGold = 5,
        /**
         * 金雀
         */
        NingDeMultiType_GoldBird = 6,
        /**
         * 金龙
         */
        NingDeMultiType_GoldDragon = 7,
        /**
         * 单调
         */
        NingDeMultiType_SingleWin = 8,
        /**
         * 清一色
         */
        NingDeMultiType_SingleColor = 9,
        /**
         * 补红中
         */
        NingDeMultiType_BuHongZhong = 10,
        /**
         * 基础分
         */
        NingDeMultiType_Base = 11,
        /**
         * 明杠
         */
        NingDeMultiType_MingGang = 12,
        /**
         * 暗杠
         */
        NingDeMultiType_AnGang = 13,
        /**
         * 金牌
         */
        NingDeMultiType_GoldCard = 14,
    }
    /**
     * 捉鸡麻将番型
     */
    enum ZhuoJiMultiType {
        /**
         * 平胡
         */
        ZhuoJiMultiType_CommonWin = 1,
        /**
         * 杠上开花
         */
        ZhuoJiMultiType_BarWin = 2,
        /**
         * 大对子
         */
        ZhuoJiMultiType_BigCoupleWin = 3,
        /**
         * 清一色
         */
        ZhuoJiMultiType_UniformColorWin = 4,
        /**
         * 七对
         */
        ZhuoJiMultiType_SevenCoupleWin = 5,
        /**
         * 龙七对
         */
        ZhuoJiMultiType_DragonSevenCoupleWin = 6,
        /**
         * 清七对
         */
        ZhuoJiMultiType_UniformColorSevenCoupleWin = 7,
        /**
         * 清大对
         */
        ZhuoJiMultiType_UniformColorBigCoupleWin = 8,
        /**
         * 清龙背
         */
        ZhuoJiMultiType_UniformColorDungeonWin = 9,
        /**
         * 单吊
         */
        ZhuoJiMultiType_OneHandCardWin = 10,
        /**
         * 清单吊
         */
        ZhuoJiMultiType_UniformColorOneHandCardWin = 11,
        /**
         * 自摸
         */
        ZhuoJiMultiType_BySelfWin = 12,
        /**
         * 热杠
         */
        ZhuoJiMultiType_HotCannonWin = 13,
        /**
         * 抢杠胡
         */
        ZhuoJiMultiType_GrabBarWin = 14,
        /**
         * 硬报
         */
        ZhuoJiMultiType_HardCallWin = 15,
        /**
         * 软报
         */
        ZhuoJiMultiType_SoftCallWin = 16,
        /**
         * 杀报
         */
        ZhuoJiMultiType_KillCallWin = 17,
        /**
         * 冲锋鸡
         */
        ZhuoJiMultiType_RushChicken = 18,
        /**
         * 责任鸡
         */
        ZhuoJiMultiType_ResponseChicken = 19,
    }
    /**
     * 玩法
     */
    enum MahjongPlayType {
        /**
         * 半自摸
         */
        MahjongPlayType_Half = 11,
        /**
         * 全自摸
         */
        MahjongPlayType_Full = 12,
    }
    enum MahjongWinCardType {
        MahjongWinCardType_None = 0,
        /**
         * 自摸
         */
        MahjongWinCardType_Self = 1,
        /**
         * 胡牌
         */
        MahjongWinCardType_Shoot = 2,
        /**
         * 放炮
         */
        MahjongWinCardType_WinOther = 3,
    }
    enum MultiType {
        /**
         * 明杠
         */
        MahjongMulti_BrightBar = 1,
        /**
         * 暗杠
         */
        MahjongMulti_DarkBar = 2,
        /**
         * 自摸
         */
        MahjongMulti_selfWin = 3,
        /**
         * 抢杠和
         */
        MahjongMulti_grabBarWin = 4,
        /**
         * 杠上开花
         */
        MahjongMulti_flowerBarWin = 5,
        /**
         * 无鬼
         */
        MahjongMulti_NoGoldCard = 6,
        /**
         * 中马
         */
        MahjongMulti_Horse = 7,
        /**
         * 七对
         */
        MahjongMulti_SevenPairs = 8,
    }
    enum RoomPro {
        /**
         * 离线
         */
        RoomPro_0 = 0,
        /**
         * 房间局数
         */
        RoomPro_1 = 1,
        /**
         * 游戏玩法
         */
        RoomPro_2 = 2,
        /**
         * 人数模式
         */
        RoomPro_3 = 3,
        /**
         * 支付模式
         */
        RoomPro_4 = 4,
        /**
         * 游金倍数
         */
        RoomPro_5 = 5,
        /**
         * 支持托管
         */
        RoomPro_6 = 6,
    }
    /**
     * 两个骰子随机数
     */
    class DiceObj {
        /**
         * 第一个随机数
         */
        one: number;
        /**
         * 第二个随机数
         */
        two: number;
        GetType(): string;
    }
    /**
     * 杠碰结构
     */
    class CardOpObj {
        /**
         * MahjongOpCardType
         */
        type: number;
        thisId: number;
        /**
         * 被杠或被碰的玩家
         */
        fromUid: number;
        GetType(): string;
    }
    /**
     * 摸牌结构
     */
    class CardSendObj {
        thisId: number;
        /**
         * MahjongOpCardType
         */
        opType: number[];
        GetType(): string;
    }
    /**
     * 补牌结构
     */
    class FlowerCardObj {
        GetType(): string;
    }
    /**
     * 扎鸟结构
     */
    class BirdObj {
        uid: number;
        thisId: number;
        isHit: number;
        GetType(): string;
    }
    /**
     * 胡牌结构  -- 扎鸟前发
     */
    class WinCardObj {
        uid: number;
        opType: number;
        winType: number;
        GetType(): string;
    }
    /**
     * 房间内玩家信息
     */
    class RoomUserInfo {
        uid: number;
        headUrl: string;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 如果为0就是站着
         */
        seatId: number;
        /**
         * 玩家当前筹码
         */
        remainder: number;
        /**
         * 性别
         */
        gender: string;
        /**
         * 奖券
         */
        giftCoupon: number;
        /**
         * 个性签名
         */
        signature: string;
        /**
         * vip等级
         */
        vipLevel: number;
        /**
         * 当前赢得的金币，刚进去为0
         */
        curWinProfit: number;
        GetType(): string;
    }
    /**
     * 玩家牌结构
     */
    class UserCardObj {
        uid: number;
        /**
         * 手牌
         */
        handCardSet: number[];
        /**
         * 已出牌
         */
        outCardSet: number[];
        /**
         * 花牌
         */
        flowerCardSet: number[];
        /**
         * 吃牌
         */
        eatSet: EatCardObj[];
        /**
         * 杠牌
         */
        barSet: BarCardObj[];
        /**
         * 碰牌
         */
        touchSet: TouchCardObj[];
        /**
         * 听牌对象集合
         */
        listenSet: ListenCardObj[];
        /**
         * 重连时发玩家的分值
         */
        totalPoints: number;
        /**
         * 玩家是否亮牌的标志 0不亮，1亮
         */
        showFlag: number;
        /**
         * 暗下的牌
         */
        triCardSet: number[];
        /**
         * 危牌
         */
        dangerCardSet: number[];
        /**
         * 胡牌列表,胡多次时用
         */
        winSet: WinCardObjNew[];
        /**
         * 血流血战
         *  血流血战下发玩家已经胡过的牌
         */
        winCardSet: number[];
        /**
         * 放风的牌
         */
        windCardSet: WindCardObj[];
        GetType(): string;
    }
    class MultiDetail {
        /**
         * 番数类型
         */
        multiType: MultiType;
        /**
         * 该番型输赢
         */
        reward: number;
        /**
         * 1：自摸，2：点炮，3：接炮，4：其他
         */
        type: number;
        /**
         * 漳浦麻将发送多个胡牌番型
         */
        multiSet: number[];
        GetType(): string;
    }
    class RewardObj {
        uid: number;
        nickname: string;
        /**
         * 每局总输赢
         */
        totalReward: number;
        /**
         * 花牌数量
         */
        flowerCardNum: number;
        /**
         * 番型输赢明细
         */
        multiDetailSet: MultiDetail[];
        /**
         * 玩家手牌
         */
        userCard: UserCardObj;
        /**
         * 赢牌类型 0:没赢,1:自摸 2:捡炮 3:放炮 4:金币场破产,5:扎杠胡,6:
         */
        winType: number;
        /**
         * 每局结算后的分数
         */
        points: number;
        /**
         * 动画效果 0:没有
         */
        animation: number;
        /**
         * 是否包赔	0:不是 1:是
         */
        fullPay: number;
        /**
         * 总番数,鸡平胡
         */
        totalMulti: number;
        /**
         * 番型集合,鸡平胡
         */
        multiSet: number[];
        /**
         * 是否爆胡 0:不是 1:是,鸡平胡
         */
        bomb: number;
        /**
         * 花牌数量,龙岩用
         */
        flowerBarNum: number;
        /**
         * 长沙麻将
         * 胡牌thisId
         */
        cardSet: number[];
        /**
         * 扎鸟thisId
         */
        birdSet: BirdObj[];
        /**
         * 卡五星
         */
        multiPiao: number;
        multiBar: number;
        /**
         * 输赢钻石倍率
         */
        betMulti: number;
        /**
         * 输赢类型,1表示钻石,2表示金币
         */
        betType: number;
        /**
         * 玩家中马的数量
         */
        winHorse: number;
        /**
         * 摸通时所有的胡牌列表
         */
        winCardList: WinCardObjNew[];
        /**
         * 好彩真人
         *  礼品券
         */
        giftVoucher: number;
        /**
         * 中心五
         *  特殊分
         */
        specialpoints: number;
        /**
         * 马牌
         */
        horseSet: HorseObj[];
        /**
         * 结算后的金币数
         */
        diamond: number;
        GetType(): string;
    }
    class ChipsObj {
        uid: number;
        /**
         * 剩余筹码
         */
        remainder: number;
        GetType(): string;
    }
    class PointsObj {
        uid: number;
        points: number;
        GetType(): string;
    }
    class ListenCardObj {
        /**
         * 听哪一张
         */
        thisId: number;
        /**
         * 番数
         */
        multi: number;
        /**
         * 剩余张数
         */
        remainNum: number;
        /**
         * 剩余张数,简写省流量
         */
        num: number;
        GetType(): string;
    }
    class ListenObj {
        listenCardSet: ListenCardObj[];
        /**
         * 简写省流量
         */
        lc: ListenCardObj[];
        GetType(): string;
    }
    class UserListenObj {
        uid: number;
        listenCardSet: ListenCardObj[];
        /**
         * 简写省流量
         */
        lc: ListenCardObj[];
        GetType(): string;
    }
    class UserOpObj {
        /**
         * 操作者玩家id
         */
        opId: number;
        /**
         * MahjongOpCardType
         */
        opType: number[];
        GetType(): string;
    }
    /**
     * +
     */
    class MultiObj {
        /**
         * 番数类型
         */
        multiType: number;
        /**
         * 番数值
         */
        multi: number;
        GetType(): string;
    }
    /**
     * +
     */
    class PropInfo {
        /**
         * 类型 1 购买自用 2 购买送人
         */
        purchaseType: number;
        /**
         * 道具Id
         */
        propId: number;
        /**
         * 购买玩家Id
         */
        sendId: number;
        /**
         * 接收玩家Id 送人时才有值
         */
        revcId: number;
        GetType(): string;
    }
    /**
     * +
     */
    class UserGifts {
        uid: number;
        charm: number;
        nickname: string;
        GetType(): string;
    }
    /**
     * +
     */
    class UserProp {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 玩家积分
         */
        points: number;
        /**
         * vip卡有效期
         */
        vipCardEffect: number;
        /**
         * 双倍卡有效期
         */
        doubleCardEffect: number;
        GetType(): string;
    }
    /**
     * 出牌结构
     */
    class CardOutObj {
        thisId: number;
        /**
         * 是否被其他玩家吃碰杠
         */
        isOp: boolean;
        GetType(): string;
    }
    /**
     * 进入房间
     */
    class EnterMahjongCmd_C {
        roomId: number;
        /**
         * 全局唯一房间id
         */
        globalRoomId: number;
        /**
         * 游戏id
         */
        gameId: number;
        /**
         * 子游戏类型
         */
        subGameType: number;
        /**
         * 初始化手牌id,测试用
         */
        handCardInitId: number;
        /**
         * 播放录像主角id,如果指定则播放录像
         */
        recordUid: number;
        /**
         * 机器人id,可以选择不同的智商
         */
        robotId: number;
        /**
         * 启用机器人数量
         */
        robotNum: number;
        GetType(): string;
    }
    /**
     * 海南麻将动画提示
     */
    class DZHNShowMsgCartoon_S {
        /**
         * 动画id
         */
        cartoonid: number;
        uid: number;
        GetType(): string;
    }
    class EnterMahjongCmd_S {
        resultCode: number;
        desc: string;
        roomState: Cmd.RoomState;
        /**
         * 房主uid
         */
        ownerId: number;
        /**
         *  2.5D
         *  牌墙
         */
        greatWall: GreatWall[];
        GetType(): string;
    }
    class LackInfo {
        uid: number;
        cardType: number;
        GetType(): string;
    }
    class ReConnectMahjongCmd_S {
        /**
         * 自己的手牌
         */
        userCard: UserCardObj;
        /**
         * 其他人手牌,机器人用
         */
        otherCard: UserCardObj[];
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 当前是第几局
         */
        curGameNbr: number;
        /**
         * 进入房间id
         */
        roomId: number;
        /**
         * 庄家id
         */
        bankerId: number;
        /**
         * 东家id
         */
        eastUid: number;
        /**
         * 翻出的金牌
         */
        goldCardSet: number[];
        /**
         * 圈风
         */
        circle: number;
        /**
         * 门风
         */
        gate: number;
        /**
         * 玩家缺牌数据
         */
        lackInfos: LackInfo[];
        /**
         * 听牌玩家uid
         */
        listenUidSet: number[];
        /**
         * 金华  底分
         */
        betPoint: number;
        /**
         * 宁波 翻牌 连庄次数
         */
        displayCardSet: number[];
        bankerNum: number;
        /**
         * 梅州
         */
        horseUid: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 四川 胡牌的玩家
         */
        winUser: number[];
        /**
         * 0 无金牌 1展示的牌是金牌并且有3张  2展示的牌是金牌 不删除 3展示牌的下一张是金牌 并且只有三张
         */
        goldType: number;
        /**
         * 听牌集合
         */
        winCardSet: ListenCardObj[];
        /**
         *  丽水
         *  打出去的所有牌 不区分玩家
         */
        allOutCard: number[];
        /**
         *  古田麻将
         * 古田麻将随机花牌数据
         */
        rfc: number;
        /**
         * 古田麻将裂开翻金数量
         */
        num: number;
        /**
         * 古田麻将翻金类型
         */
        turnType: number;
        /**
         * 古田麻将打牌方向
         */
        direction: number;
        /**
         *  中心五
         *  当前角
         */
        curJiao: number;
        /**
         * 当前角第几局
         */
        curNbr: number;
        /**
         * 2.5D
         *  起始风位
         */
        getCardDirection: number;
        /**
         * 起始摞数
         */
        startLuo: number;
        /**
         * 顺序摸牌张数
         */
        bGetNum: number;
        /**
         * 逆序摸牌张数
         */
        eGetNum: number;
        /**
         *  拉米
         *  出牌区的牌
         */
        allHalfCard: CardLine[];
        /**
         * 废牌区的牌
         */
        allDisCard: number[];
        /**
         * 整牌区的牌
         */
        allCompCard: CardLine[];
        /**
         * 顾乡恩施
         *  痞癞杠信息
         */
        piGoldBarMes: PiGoldBarMes[];
        /**
         * 文安麻将
         * 拉庄
         */
        laZhuangMes: LaZhuangMes[];
        GetType(): string;
    }
    class PiGoldBarMes {
        uid: number;
        /**
         * 杠倍数
         */
        barMul: number;
        /**
         * 痞杠数
         */
        piBarCount: number;
        /**
         * 癞杠数
         */
        goldBarCount: number;
        /**
         * 打痞1，打癞2
         */
        isOutGold: number;
        GetType(): string;
    }
    class LaZhuangMes {
        uid: number;
        /**
         * 拉庄分
         */
        point: number;
        GetType(): string;
    }
    class CardLine {
        /**
         * 牌
         */
        thisId: number[];
        /**
         * 行号
         */
        pos: number;
        GetType(): string;
    }
    /**
     * 广播玩家进入房间
     */
    class EnterMahjongCmd_Brd {
        userInfo: Cmd.UserBaseInfo;
        /**
         * 是否第一次进
         */
        isFirst: boolean;
        /**
         * 谁的牌,放录像用,录像播放时是庄家id
         */
        ownerid: number;
        /**
         * 是否已听牌,1表示已听牌
         */
        listened: number;
        GetType(): string;
    }
    /**
     * Echo应答,服务器探测玩家是否活着
     */
    class ServerEchoMahjongCmd_SC {
        /**
         * echo标志
         */
        id: number;
        /**
         * echo描述,原封不动返回
         */
        desc: string;
        GetType(): string;
    }
    /**
     * Echo应答,客户端探测服务器
     */
    class ClientEchoMahjongCmd_SC {
        /**
         * echo标志
         */
        id: number;
        /**
         * echo描述,原封不动返回
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 在线状态
     */
    class OnlineStateMahjongCmd_Brd {
        uid: number;
        /**
         * 在线状态0断线,1在线,2离开,3,网络差OnlineState
         */
        state: number;
        GetType(): string;
    }
    /**
     * 离开房间
     */
    class LeaveMahjongCmd_C {
        /**
         * 离开状态 0 返回大厅 1 暂时离开 2 断线
         */
        state: number;
        GetType(): string;
    }
    class LeaveMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播玩家离开房间
     */
    class LeaveMahjongCmd_Brd {
        resultCode: number;
        desc: string;
        uid: number;
        state: number;
        GetType(): string;
    }
    /**
     * 加底注
     */
    class AddBasePoint_C {
        /**
         * 加注的分数 0表示不加
         */
        point: number;
        GetType(): string;
    }
    /**
     * 玩家加注广播,有时间发来表示通知开始加注
     */
    class AddBasePoint_Brd {
        /**
         * 已下注玩家列表
         */
        userOpList: MultiPointSet[];
        /**
         * 操作时间（整个加注阶段的时间）
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 加注结构
     */
    class MultiPointSet {
        /**
         * 加注的玩家id
         */
        uid: number;
        /**
         * 加注的分数 0表示不加
         */
        point: number;
        GetType(): string;
    }
    /**
     * 请求准备
     */
    class ReadyStartMahjongCmd_C {
        /**
         * 判断是准备还是取消准备
         */
        type: number;
        /**
         * 单局飘分
         */
        multiPiao: number;
        GetType(): string;
    }
    /**
     * 取消准备
     */
    class CancelReadyMahjongCmd_Brd {
        /**
         * 取消准备玩家ID
         */
        uid: number;
        GetType(): string;
    }
    class ReadyStartMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播准备
     */
    class ReadyStartMahjongCmd_Brd {
        uid: number;
        /**
         * 所有已准备的玩家uid
         */
        readyUserSet: number[];
        /**
         * 单局飘分
         */
        multiPiao: number;
        GetType(): string;
    }
    /**
     * 开局广播
     */
    class StartMahjongCmd_Brd {
        /**
         * 当前是第几局
         */
        curGameNbr: number;
        /**
         * 无大厅状态时用
         */
        roomId: number;
        /**
         * 圈风
         */
        circle: number;
        /**
         * 门风
         */
        gate: number;
        /**
         * 金华
         *  连庄次数
         */
        bankerNum: number;
        /**
         * 本局底分
         */
        betPoint: number;
        /**
         * 南京麻将，这局是不是有比下胡：0，不是；1，是
         */
        is_double: number;
        /**
         * 中心五 当前第几角
         */
        curJiao: number;
        /**
         * 中心五 本角第几局
         */
        curNbr: number;
        /**
         * 中心五 是否重新开始一角 1:是
         */
        restart: number;
        GetType(): string;
    }
    class GreatWall {
        /**
         * 风位
         */
        direction: number;
        /**
         * 牌的总数
         */
        cardNum: number;
        GetType(): string;
    }
    /**
     * 定庄打筛子
     */
    class SetBankerMahjongCmd_Brd {
        dice: DiceObj;
        /**
         * 庄家id
         */
        bankerId: number;
        /**
         * 东家id
         */
        eastUid: number;
        /**
         * 定庄倒计时
         */
        sec: number;
        /**
         * 梅州
         */
        horseUid: number;
        /**
         * 倍率
         */
        multi: number;
        lastdice: DiceObj;
        /**
         *  2.5D 麻将
         *  牌墙
         */
        greatWall: GreatWall[];
        /**
         * 开始抓拍的风位
         */
        getCardDirection: number;
        /**
         * 开始的摞数
         */
        startLuo: number;
        GetType(): string;
    }
    /**
     * 开局拉庄
     */
    class SetLaZhuangMahjongCmd_Brd {
        uids: number[];
        /**
         * 拉庄标记
         */
        laZhuang: boolean;
        /**
         * 拉庄倒计时
         */
        sec: number;
        GetType(): string;
    }
    class LaZhuangMahjongCmd_Brd {
        uid: number;
        /**
         * 拉庄分
         */
        point: number;
        GetType(): string;
    }
    class LaZhuangMahjongCmd_C {
        /**
         * 拉庄分
         */
        point: number;
        GetType(): string;
    }
    /**
     * 开局发牌
     */
    class SelfCardMahjongCmd_S {
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 自己的手牌
         */
        userCard: UserCardObj;
        /**
         * 其他人手牌,机器人用
         */
        otherCard: UserCardObj[];
        /**
         * 庄家第一张牌倒计时
         */
        sec: number;
        /**
         * 庄家第十四张牌,只有庄加有
         */
        bankerThisId: number;
        /**
         * 谁的牌,放录像用
         */
        ownerid: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 南京麻将用开局花杠
         */
        flbarUser: number[];
        GetType(): string;
    }
    /**
     * 原缺通知
     */
    class OriginalLackOpCmd_S {
        GetType(): string;
    }
    /**
     * 原缺等待时间
     */
    class OriginalLackOpTimeCmd_Brd {
        sec: number;
        GetType(): string;
    }
    /**
     * 原缺操作
     */
    class OriginalLackOpCmd_C {
        GetType(): string;
    }
    /**
     * 原缺操作广播
     */
    class OriginalLackOpCmd_Brd {
        uid: number;
        cardSet: number[];
        GetType(): string;
    }
    /**
     * 定缺通知
     */
    class EnsureLackOpCmd_S {
        /**
         * 万条筒
         */
        cardType: number;
        sec: number;
        /**
         * 庄家id
         */
        bankerId: number;
        /**
         * 发给谁的，录像使用
         */
        ownerid: number;
        GetType(): string;
    }
    /**
     * 定缺操作
     */
    class EnsureLackOpCmd_C {
        /**
         * 万条筒
         */
        cardType: number;
        GetType(): string;
    }
    /**
     * 定缺操作广播
     */
    class EnsureLackOpCmd_Brd {
        uid: number;
        cardType: number;
        GetType(): string;
    }
    /**
     * 补花
     */
    class FlowerMahjongCmd_Brd {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 补给玩家手中的花牌,显示给所有玩家
         */
        flowerSet: number[];
        /**
         * 补给自己的牌,只会发给自己
         */
        myCardSet: number[];
        /**
         * 补牌后牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 2.5D是否是开局补花: 是 1  否 0
         */
        startRound: number;
        GetType(): string;
    }
    /**
     * 翻金
     */
    class TurnGoldMahjongCmd_Brd {
        /**
         * 翻出的金牌
         */
        cardSet: number[];
        /**
         * 翻金后牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 宁波 翻牌
         */
        displayCardSet: number[];
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 0 无金牌 1展示的牌是金牌并且有3张  2展示的牌是金牌 不删除 3展示牌的下一张是金牌 并且只有三张
         */
        goldType: number;
        /**
         *  古田麻将 随机花牌
         *  翻出来的随机花牌
         */
        randomFlowerCard: number;
        /**
         * 玩家uid
         */
        uid: number;
        /**
         *  2.5D
         * 翻金的数量
         */
        cardNum: number;
        GetType(): string;
    }
    /**
     * 摸牌
     */
    class SendCardMahjongCmd_S {
        thisId: number;
        /**
         * MahjongOpCardType
         */
        opType: number[];
        /**
         * 是否杠后牌摸
         */
        isBar: number;
        /**
         * 打完之后可以听牌集合
         */
        listenSet: number[];
        /**
         * 听牌数量
         */
        listenObjSet: ListenObj[];
        /**
         * 可杠的牌id
         */
        barSet: number[];
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        goldOutCardSet: number[];
        /**
         * 可补张的牌id
         */
        supplySet: number[];
        triCard: number[];
        /**
         * 谁的牌,放录像用
         */
        ownerid: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 打完之后可以听牌集合,简写省流量
         */
        ls: number[];
        /**
         * 听牌数量,简写省流量
         */
        los: ListenObj[];
        /**
         * 是否重置听牌信息
         */
        resetListen: number;
        /**
         * 厦门麻将有大牌模式下发跟牌数据
         */
        fcs: FollowCardSet;
        /**
         * 云霄麻将 听牌后的暗杠玩家可选择暗杠或明杠的牌id
         */
        darkBarSet: number[];
        /**
         * 摸牌类型(2:庄家起手模拟发牌  10:吃碰后模拟发牌)
         */
        getCardType: number;
        /**
         * 可叠加的风牌
         */
        windSet: number[];
        /**
         * 可换混的牌
         */
        replaceWindSet: number[];
        /**
         * 可亮中发白的牌组
         */
        showCardSet: number[];
        /**
         * 顧鄉恩施麻將第一個杠牌的人標誌
         */
        firstDoBar: number;
        GetType(): string;
    }
    /**
     * 刷新指定玩家手牌
     */
    class RefreshUserCards_S {
        /**
         * 带刷新的玩家的牌
         */
        userCard: UserCardObj;
        GetType(): string;
    }
    /**
     * 叠加（换混）牌协议
     */
    class SuperPosition_CS {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 叠加牌的ID（如果inCardId存在该值表示需要换出的牌）
         */
        cardId: number;
        /**
         * 操作列表 MahjongOpCardType
         */
        opType: number[];
        /**
         * 操作后返回的风牌结构
         */
        windCardSet: WindCardObj;
        /**
         * 需要换入牌的ID
         */
        inCardId: number;
        /**
         * 操作时间
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 放风放喜堆结构
     */
    class WindCardObj {
        /**
         * 当前这堆牌的index（方便换混叠加）
         */
        index: number;
        /**
         * 玩家放风的牌
         */
        cardSet: number[];
        GetType(): string;
    }
    /**
     * 放风推荐牌
     */
    class WindCardThree {
        thisIdList: number[];
        GetType(): string;
    }
    /**
     * 放风
     */
    class SendWindMahjongCmd_CS {
        /**
         * 放风玩家uid
         */
        uid: number;
        /**
         * C:玩家是否放风false表示不放 S：玩家是否能放风true表示能放
         */
        state: boolean;
        /**
         * 玩家放的牌
         */
        cardList: WindCardObj;
        /**
         * 操作时间
         */
        sec: number;
        /**
         * 放风推荐牌
         */
        list: WindCardThree[];
        GetType(): string;
    }
    /**
     * 跟牌集合
     */
    class FollowCardSet {
        cardThisId: number[];
        GetType(): string;
    }
    /**
     * 请求听牌提示,不能每次发,太浪费流量了
     */
    class ListenObjMahjongCmd_C {
        /**
         * listenSet下标,
         */
        index: number;
        /**
         * listenSet的thisId,为了建容
         */
        thisId: number;
        GetType(): string;
    }
    class ListenObjMahjongCmd_S {
        /**
         * listenSet下标
         */
        index: number;
        /**
         * listenSet的thisId,为了建容
         */
        thisId: number;
        /**
         * 听牌数量,简写省流量
         */
        los: ListenObj;
        resultCode: number;
        GetType(): string;
    }
    /**
     * 广播摸牌信息
     */
    class SendCardMahjongCmd_Brd {
        /**
         * 出牌者id
         */
        uid: number;
        /**
         * 出牌倒计时
         */
        sec: number;
        /**
         * 流局
         */
        isWin: number;
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * GM指令调试用,release版本不会发
         */
        thisId: number;
        /**
         * 是否起牌
         */
        stand: number;
        /**
         * 是否是开局四川换牌后的模拟发牌
         */
        isSichuan: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 出牌者座位id,用来换算uid,优化消息流量用
         */
        sid: number;
        /**
         * 摸牌类型(2:庄家起手模拟发牌  10:吃碰后模拟发牌  1:杠后摸牌)
         */
        getCardType: number;
        GetType(): string;
    }
    /**
     * 放弃一个操作
     */
    class CancelOpTypeMahjongCmd_CS {
        /**
         * 需要放弃的关键操作,加个日志,有玩家纠结时查日志用,只用来存录像
         */
        opType: number[];
        GetType(): string;
    }
    /**
     * 请求出牌
     */
    class OutCardMahjongCmd_C {
        thisId: number;
        /**
         * 是否天听
         */
        isSkyListen: boolean;
        /**
         * 1请求听牌,MahjongOpCardType_Listen
         */
        listen: number;
        GetType(): string;
    }
    class OutCardMahjongCmd_S {
        thisId: number;
        winCardSet: ListenCardObj[];
        resultCode: number;
        desc: string;
        ws: ListenCardObj[];
        /**
         * 是否重置听牌信息
         */
        resetListen: number;
        GetType(): string;
    }
    /**
     * 广播出牌内容
     */
    class OutCardMahjongCmd_Brd {
        /**
         * 出牌者id
         */
        uid: number;
        /**
         * 时间倒数
         */
        sec: number;
        thisId: number;
        /**
         * 错做类型集合
         */
        opType: number[];
        /**
         * 错做类型集合
         */
        eatSet: EatCardObj[];
        /**
         * 是否跟牌
         */
        isFollow: number;
        /**
         * 牌的类型,比如捉鸡牌
         */
        cardType: number;
        /**
         * 刷新其他玩家的听牌剩余张数
         */
        winCardSet: ListenCardObj[];
        /**
         * 是否有人可操作 1:有
         */
        isOp: number;
        /**
         * 出牌者座位id,用来换算uid,优化消息流量用
         */
        sid: number;
        /**
         * 游金值
         */
        isSwimGold: number;
        /**
         * 打痞1，打癩2
         */
        isOutGold: number;
        GetType(): string;
    }
    /**
     * GM指令,发所有牌堆给玩家
     */
    class HeapCardGmMahjongCmd_C {
        GetType(): string;
    }
    class KeyValueObj {
        id: number;
        value: string;
        GetType(): string;
    }
    /**
     * GM指令,发所有牌堆给玩家
     */
    class HeapCardGmMahjongCmd_S {
        /**
         * 牌堆剩余牌
         */
        cardSet: number[];
        /**
         * 牌型选择按钮
         */
        cardButton: KeyValueObj[];
        GetType(): string;
    }
    /**
     * GM指令,请求换一张牌
     */
    class ChangeCardGmMahjongCmd_C {
        /**
         * 旧牌
         */
        oldCardId: number;
        /**
         * 新牌,如果自己是操作者时发0,新牌通过摸牌消息发
         */
        newCardId: number;
        /**
         * 牌型ID
         */
        cardButtonId: number;
        GetType(): string;
    }
    /**
     * GM指令,请求换一张牌
     */
    class ChangeCardGmMahjongCmd_S {
        /**
         * 旧牌
         */
        oldCardId: number;
        /**
         * 新牌,如果自己是操作者时发0,新牌通过摸牌消息发
         */
        newCardId: number;
        winCardSet: ListenCardObj[];
        /**
         * 如果自己是操作者,就删除牌,否则就是换牌,
         */
        needDelete: number;
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        GetType(): string;
    }
    /**
     * 撤回一张牌,回放用
     */
    class RecallOneCardMahjongCmd_S {
        uid: number;
        /**
         * 撤回的牌
         */
        thisId: number;
        GetType(): string;
    }
    class RecallEatCardMahjongCmd_Brd {
        msg: EatCardMahjongCmd_Brd;
        GetType(): string;
    }
    class RecallTouchCardMahjongCmd_Brd {
        msg: TouchCardMahjongCmd_Brd;
        GetType(): string;
    }
    class RecallBarCardMahjongCmd_Brd {
        msg: BarCardMahjongCmd_Brd;
        GetType(): string;
    }
    class RecallSupplyCardMahjongCmd_Brd {
        msg: SupplyCardMahjongCmd_Brd;
        GetType(): string;
    }
    class RecallWinCardMahjongCmd_Brd {
        msg: WinCardMahjongCmd_Brd;
        GetType(): string;
    }
    /**
     * 四川开局换牌用
     */
    class exChangeCardMahjongCmd_S {
        /**
         * 开局换牌时候数量少于3个的花色
         */
        disType: number[];
        /**
         * 时间
         */
        opcount: number;
        /**
         * 庄家id 防止此协议重连报错
         */
        bankerId: number;
        /**
         * 买牌标识: 0:未买牌; 1:买牌
         */
        bcs: number;
        /**
         * 是否可选不同花色 1:可以 0:不可以
         */
        isSame: number;
        /**
         * 发给谁的，录像使用
         */
        ownerid: number;
        GetType(): string;
    }
    /**
     * 四川开局换牌用
     */
    class exChangeCardMahjongCmd_C {
        /**
         * 开局换牌需要更换的牌
         */
        cardId: number[];
        GetType(): string;
    }
    /**
     * 四川开局换牌用
     */
    class exChangeCardMahjongCmd_Brd {
        /**
         * 已经换牌的玩家
         */
        userId: number;
        /**
         * 如果没有手动操作，系统自动挑选3张牌
         */
        cardId: number[];
        GetType(): string;
    }
    /**
     * 万州麻将买牌广播
     */
    class BuyCardMahjongCmd_Brd {
        /**
         * 买牌时间
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 玩家请求买牌
     */
    class UserBuyCardMahjongCmd_C {
        /**
         * 是否买牌标示，0:取消; 1:买牌
         */
        state: number;
        GetType(): string;
    }
    /**
     * 取消操作牌
     */
    class CancelOpMahjongCmd_C {
        /**
         * 取消操作台里的第一个操作
         */
        firstType: number;
        GetType(): string;
    }
    class CancelOpMahjongCmd_S {
        /**
         * 兼容金华 用于区分敲响和胡 2:取消敲响
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 请求胡牌
     */
    class WinMahjongCmd_C {
        GetType(): string;
    }
    /**
     * 胡牌广播
     */
    class WinCardMahjongCmd_Brd {
        /**
         * 其他人手牌 目前来说只要手牌handCardSet
         */
        otherCard: UserCardObj[];
        /**
         * 胡牌的玩家
         */
        winTypeSet: WinCardObj[];
        /**
         * 这里加一个放炮玩家id,方便显示放炮动画
         */
        shootId: number;
        GetType(): string;
    }
    /**
     * 扎鸟广播
     */
    class BirdMahjongCmd_Brd {
        birdSet: BirdObj[];
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        GetType(): string;
    }
    class WinMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class WinPointObj {
        uid: number;
        point: number;
        GetType(): string;
    }
    /**
     * 多次胡牌的过程中广播
     */
    class WinMahjongCmd_Brd {
        /**
         * 胡牌人id
         */
        uid: number;
        /**
         * 不填表示自摸
         */
        thisId: number;
        /**
         * 不填表示自摸
         */
        shootId: number;
        /**
         * 胡牌动画,不填就是默认
         */
        animation: number;
        /**
         * 中途结算每个人的分数情况
         */
        pointSet: WinPointObj[];
        GetType(): string;
    }
    class HorseObj {
        thisId: number;
        /**
         * 0:没中 1:中马
         */
        bWin: number;
        GetType(): string;
    }
    class WinCardObjNew {
        /**
         * 不填表示自摸
         */
        shootId: number;
        thisId: number;
        GetType(): string;
    }
    /**
     * 广播胡牌结果
     */
    class WinRetMahjongCmd_Brd {
        rewardSet: RewardObj[];
        /**
         * 胡牌 牌id
         */
        thisId: number;
        /**
         * 马牌 凤城麻将宝牌
         */
        horseSet: HorseObj[];
        /**
         * 中马数
         */
        winHorse: number;
        /**
         * 放炮 uid
         */
        shootId: number;
        /**
         * 中马玩家uid
         */
        winHorseId: number;
        /**
         * 长沙麻将
         */
        isWin: number;
        /**
         * 梅州
         */
        horseUid: number;
        /**
         * 宝牌	  凤城麻将
         */
        baoCardThisId: number;
        /**
         * 扎鸟thisId
         */
        birdSet: BirdObj[];
        GetType(): string;
    }
    class ChickenStruct {
        uid: number;
        /**
         * 我的分（倒赔或赢）
         */
        myself_grade: number;
        /**
         * 别人对我的影响分（赔或赢）
         */
        others_grade: number;
        /**
         * 冲锋鸡
         */
        rush_chicken: number;
        /**
         * 责任鸡
         */
        response_chicken: number;
        /**
         * 上鸡baseid
         */
        up_baseid: number;
        /**
         * 下鸡baseid
         */
        down_baseid: number;
        /**
         * 上鸡
         */
        up_chicken: number;
        /**
         * 下鸡
         */
        down_chicken: number;
        /**
         * 闷豆
         */
        dark: number;
        /**
         * 明豆
         */
        light: number;
        /**
         * 爬坡豆
         */
        climb: number;
        /**
         * 是否听牌
         */
        is_listen: boolean;
        /**
         * 查缺分数
         */
        lack: number;
        /**
         * 原缺
         */
        originalLack: number;
        /**
         * 冲锋乌骨鸡
         */
        rush_black_chicken: number;
        /**
         * 责任乌骨鸡
         */
        response_black_chicken: number;
        /**
         * 普通乌骨鸡
         */
        normal_black_chicken: number;
        /**
         * 上鸡鸡牌数量
         */
        up_chicken_num: number;
        /**
         * 下鸡鸡牌数量
         */
        down_chicken_num: number;
        /**
         * 点明豆数量
         */
        sub_light: number;
        /**
         * 本鸡
         */
        self_chicken: number;
        GetType(): string;
    }
    /**
     * 抓鸡
     */
    class CashChickenCmd_Brd {
        chicken_card_id: number;
        rewardSet: RewardObj[];
        chickenSet: ChickenStruct[];
        /**
         * 兼容
         */
        cid: number;
        /**
         * 兼容
         */
        rs: RewardObj[];
        /**
         * 兼容
         */
        cs: ChickenStruct[];
        GetType(): string;
    }
    /**
     * 天听000000000000000000
     */
    class SkyListenCmd_S {
        sec: number;
        GetType(): string;
    }
    /**
     * 只在开局天听使用
     */
    class SkyListenCmd_C {
        GetType(): string;
    }
    class SkyListenCmd_Brd {
        uid: number;
        GetType(): string;
    }
    /**
     * 请求杠牌
     */
    class BarCardMahjongCmd_C {
        thisId: number;
        /**
         * 1请求听牌,MahjongOpCardType_Listen
         */
        listen: number;
        /**
         * 云霄麻将 暗杠选择暗杠还是明杠 1:明杠 2:暗杠
         */
        typ: number;
        GetType(): string;
    }
    class BarCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 任丘  请求风,箭
     */
    class FengCardMahjongCmd_C {
        thisId: number;
        /**
         * 1请求听牌,MahjongOpCardType_Listen
         */
        listen: number;
        /**
         * 云霄麻将 暗杠选择暗杠还是明杠 1:明杠 2:暗杠
         */
        typ: number;
        /**
         * 1风2箭
         */
        tag: number;
        GetType(): string;
    }
    class FengCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 杠牌堆结构
     */
    class BarCardObj {
        /**
         * 碰牌的玩家
         */
        uid: number;
        /**
         * 碰牌后的三张thisid
         */
        thisId: number;
        /**
         * 碰牌后的三张thisid
         */
        cardSet: number[];
        /**
         * 被碰的玩家
         */
        fromUid: number;
        /**
         * 杠的类型MahjongOpCardType_BarOther
         */
        barType: number;
        /**
         * 虚拟操作,优先级问题
         */
        fake: number;
        GetType(): string;
    }
    /**
     * 长沙麻将杠牌结构
     */
    class BarDealCardObj {
        thisId: number;
        /**
         * 是否胡这张牌
         */
        isHu: number;
        GetType(): string;
    }
    /**
     * 广播杠牌
     */
    class BarCardMahjongCmd_Brd {
        /**
         * 碰牌的玩家
         */
        obj: BarCardObj;
        /**
         * 只在碰杠时 是否可抢杠胡 分别发送 1:可胡 0:不可胡
         */
        canWin: number;
        thisId: number;
        /**
         * 类型
         */
        card_type: number;
        /**
         * 录像使用的ownerid
         */
        ownerid: number;
        /**
         * 在亮中发白时候可以被抢碰 1:可以碰 2:不可碰
         */
        canTouch: number;
        GetType(): string;
    }
    /**
     * 开杠打筛子
     */
    class BarDiceMahjongCmd_Brd {
        dice: DiceObj;
        /**
         * 开杠uid
         */
        barUid: number;
        GetType(): string;
    }
    /**
     * 开杠发牌 --- 其他人看到自己摸了两张牌
     */
    class BarDealCardMahjongCmd_Brd {
        uid: number;
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 杠牌出牌倒计时
         */
        sec: number;
        /**
         * GM指令调试用,release版本不会发
         */
        cardSet: number[];
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        GetType(): string;
    }
    class BarDealCardMahjongCmd_S {
        /**
         * 牌信息
         */
        cardSet: BarDealCardObj[];
        /**
         * 可以进行的操作
         */
        opType: number[];
        GetType(): string;
    }
    /**
     * 开杠玩家操作
     */
    class BarOpMahjongCmd_C {
        opType: number;
        GetType(): string;
    }
    /**
     * 海底漫游 轮转广播
     */
    class SeaRoamTurnMahjongCmd_Brd {
        uid: number;
        sec: number;
        GetType(): string;
    }
    /**
     * 海底漫游操作请求
     */
    class SeaRoamMahjongCmd_C {
        opType: number;
        GetType(): string;
    }
    /**
     * 海底牌广播
     */
    class SeaFloorCardMahjongCmd_Brd {
        uid: number;
        thisId: number;
        /**
         * 多加了一张漫游牌
         */
        thisId2: number;
        GetType(): string;
    }
    /**
     * 开杠打牌广播
     */
    class BarOutCardMahjongCmd_Brd {
        oneThisId: number;
        twoThisId: number;
        /**
         * 可以进行的操作
         */
        opType: number[];
        barSet: number[];
        supplySet: number[];
        touchSet: number[];
        eatSet: EatCardObj[];
        uid: number;
        sec: number;
        threeThisId: number;
        fourThisId: number;
        GetType(): string;
    }
    /**
     * 碰牌堆结构
     */
    class EatCardObj {
        /**
         * 碰牌的玩家
         */
        uid: number;
        /**
         * 碰牌后的三张thisid
         */
        thisId: number;
        one: number;
        two: number;
        /**
         * 被碰的玩家
         */
        fromUid: number;
        /**
         * 虚拟操作,优先级问题
         */
        fake: number;
        GetType(): string;
    }
    /**
     * 请求吃牌
     */
    class EatCardMahjongCmd_C {
        one: number;
        two: number;
        /**
         * 特殊情况使用,不安全,目前长沙麻将杠用
         */
        thisId: number;
        GetType(): string;
    }
    class EatCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class EatCardMahjongCmd_Brd {
        obj: EatCardObj;
        GetType(): string;
    }
    /**
     * 碰牌堆结构
     */
    class TouchCardObj {
        /**
         * 碰牌的玩家
         */
        uid: number;
        /**
         * 碰牌后的三张thisid
         */
        thisId: number;
        /**
         * 碰牌后的三张thisid
         */
        cardSet: number[];
        /**
         * 被碰的玩家
         */
        fromUid: number;
        /**
         * 虚拟操作,优先级问题
         */
        fake: number;
        GetType(): string;
    }
    /**
     * 请求碰牌
     */
    class TouchCardMahjongCmd_C {
        thisId: number;
        GetType(): string;
    }
    class TouchCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播碰牌
     */
    class TouchCardMahjongCmd_Brd {
        /**
         * 碰牌的玩家
         */
        obj: TouchCardObj;
        /**
         * 类型
         */
        card_type: number;
        GetType(): string;
    }
    /**
     * 请求听牌
     */
    class ListenCardMahjongCmd_C {
        thisId: number;
        GetType(): string;
    }
    class ListenCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 玩家听牌对象集合
         */
        listenCard: ListenCardObj[];
        GetType(): string;
    }
    /**
     * 广播听牌
     */
    class ListenCardMahjongCmd_Brd {
        uid: number;
        thisId: number;
        GetType(): string;
    }
    /**
     * 请求亮牌
     */
    class ShowCardMahjongCmd_S {
        listenSet: number[];
        listenObjSet: ListenObj[];
        GetType(): string;
    }
    class ShowCardMahjongCmd_C {
        /**
         * 请求亮牌玩家要胡的牌，危险的牌
         */
        triCard: number[];
        GetType(): string;
    }
    class ShowCardMahjongCmd_Brd {
        uid: number;
        handCardSet: number[];
        listenSet: number[];
        /**
         * 1:扣牌
         */
        fall: number;
        GetType(): string;
    }
    /**
     * 请求漂分
     */
    class ReqPiaoMahjongCmd_C {
        multiPiao: number;
        GetType(): string;
    }
    class ReqPiaoMahjongCmd_S {
        /**
         * 海南麻将返回上局嘎的值
         */
        multiPiao: number;
        GetType(): string;
    }
    class ReqPiaoMahjongCmd_Brd {
        /**
         * 漂0/1/2分  兼容海南麻将0~5
         */
        multiPiao: number;
        uid: number;
        GetType(): string;
    }
    class StartPiaoMahjongCmd_Brd {
        sec: number;
        /**
         * 兼容丹东漂分选项
         */
        multiPiao: number;
        GetType(): string;
    }
    /**
     * 结束漂分广播
     */
    class EndPiaoMahjongCmd_Brd {
        GetType(): string;
    }
    /**
     * 托管
     */
    class HostMahjongCmd_C {
        /**
         * 0,不托管,1,拿啥打啥型,2,能吃吃,能碰碰,检查基础牌型型
         */
        hostType: number;
        GetType(): string;
    }
    class HostMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 托管广播
     */
    class HostMahjongCmd_Brd {
        uid: number;
        /**
         * 0,不托管,1,拿啥打啥型,2,能吃吃,能碰碰,检查基础牌型型
         */
        hostType: number;
        /**
         * 托管时是否需要显示取消托管 1:不需要
         */
        showType: number;
        GetType(): string;
    }
    /**
     * 超时等待广播
     */
    class TimeOutWaitMahjongCmd_Brd {
        /**
         * 超时玩家uid
         */
        uid: number;
        /**
         * 超时玩家昵称
         */
        nickname: string;
        /**
         * 超时解散倒计时
         */
        leftsec: number;
        GetType(): string;
    }
    /**
     * 刷新玩家筹码广播
     */
    class RefreshChipsMahjongCmd_Brd {
        chipsSet: ChipsObj[];
        GetType(): string;
    }
    class RefreshPointsMahjongCmd_Brd {
        pointSet: PointsObj[];
        /**
         * 血流定义刮风或者下雨: 1 刮风, 2 下雨
         */
        wind_or_rain: number;
        /**
         * 所胡的牌
         */
        win_card: number;
        GetType(): string;
    }
    /**
     * 刷新玩家听牌集合
     */
    class RefreshListenCardSetMahjongCmd_S {
        resultCode: number;
        desc: string;
        userListenCardSet: UserListenObj[];
        winCardSet: ListenCardObj[];
        GetType(): string;
    }
    /**
     * 请求踢人
     */
    class KickMahjongCmd_C {
        /**
         * 踢人玩家
         */
        uid: number;
        /**
         * 被踢玩家
         */
        kickUid: number;
        GetType(): string;
    }
    class KickMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 踢人广播
     */
    class KickMahjongCmd_Brd {
        /**
         * 被踢玩家
         */
        uid: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 送礼
     */
    class SendGiftMahjongCmd_C {
        /**
         * 礼物内容
         */
        gift: Cmd.GiftsInfo;
        GetType(): string;
    }
    class SendGiftMahjongCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class SendGiftMahjongCmd_Brd {
        /**
         * 送礼玩家
         */
        gift: Cmd.GiftsInfo;
        /**
         * 玩家剩余钻石
         */
        diamond: number[];
        GetType(): string;
    }
    class UserRecord {
        uid: number;
        headurl: string;
        nickname: string;
        /**
         * 胡牌次数
         */
        win: number;
        /**
         * 中马次数
         */
        horse: number;
        /**
         * 花单吊次数
         */
        singleFlowerHang: number;
        /**
         * 花单花次数
         */
        doubleFlowerHang: number;
        /**
         * 总成绩
         */
        totalScore: number;
        /**
         * 是否房主 1:是 0:不是
         */
        isOwner: boolean;
        /**
         * 是否大赢家 1:是 0:不是
         */
        isWinner: number;
        /**
         * 玩家总缺分
         */
        lack: number;
        /**
         * 房主小费
         */
        tip: number;
        /**
         * 开杠次数,鸡平胡
         */
        bar: number;
        /**
         * 放炮次数,鸡平胡
         */
        fangpao: number;
        /**
         * 最大番数,鸡平胡
         */
        maxMulti: number;
        /**
         * 自摸次数
         */
        selfWin: number;
        /**
         * 长沙麻将
         *  开杠次数
         */
        barNum: number;
        /**
         * 中鸟次数
         */
        birdNum: number;
        /**
         * 放炮次数
         */
        shootNum: number;
        /**
         * 卡五星
         */
        showCardNum: number;
        fangpaoNum: number;
        /**
         * 宁德麻将
         *  平胡次数
         */
        normalWinNum: number;
        /**
         * 自摸次数
         */
        zimoWinNum: number;
        /**
         * 特殊胡牌次数
         */
        SpecialWinNum: number;
        /**
         * 起手小胡次数
         */
        startWinNum: number;
        /**
         * 胡牌次数,WHJ兼容用,估计会干掉
         */
        winNum: number;
        /**
         * 单游次数,WHJ兼容用,估计会干掉
         */
        singleNum: number;
        /**
         * 双游次数,WHJ兼容用,估计会干掉
         */
        doubleNum: number;
        /**
         * 三游次数,WHJ兼容用,估计会干掉
         */
        threeNum: number;
        /**
         * 开杠次数,WHJ兼容用,估计会干掉
         */
        BarNum: number;
        /**
         * 宁德麻将
         * 每个玩家每局输赢分数
         */
        perSorce: number[];
        /**
         * 四川
         *  接炮次数
         */
        jiepao: number;
        /**
         * 点炮次数
         */
        dianpao: number;
        /**
         * 暗杠次数
         */
        bar_self: number;
        /**
         * 明杠次数
         */
        bar_other: number;
        /**
         * 查大叫次数
         */
        chadajiao: number;
        /**
         * 红包
         */
        redpack: number;
        /**
         * 承包分
         */
        chengbaofen: number;
        /**
         * 未听牌
         */
        nolisten: number;
        /**
         * 基本分
         */
        basicpoint: number;
        /**
         * 特殊分
         */
        specialpoint: number;
        /**
         * 每角明细
         */
        jiaoSet: JiaoObj[];
        /**
         * 恩施
         * 痞杠
         */
        pi_bar: number;
        /**
         * 癞杠
         */
        gold_bar: number;
        /**
         * 扎杠胡次数
         */
        zhaWinNum: number;
        /**
         * 抢杠胡次数
         */
        grabBarWinNum: number;
        GetType(): string;
    }
    class JiaoObj {
        basicpoint: number;
        specialpoint: number;
        /**
         * 每角枯桶
         */
        kutong: number;
        GetType(): string;
    }
    /**
     * 总成绩
     */
    class FinalScoreMahjongCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        GetType(): string;
    }
    class FinalScoreMahjongCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class FinalScoreMahjongCmd_Brd {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 总成绩数据
         */
        recordInfo: UserRecord[];
        /**
         * 1:解散房间	2:正常结束  3:本角结算
         */
        state: number;
        /**
         * 解散原因
         */
        reason: string;
        /**
         * 如果是匹配号房间,显示出匹配号
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 开局操作集
     */
    class StartNewRoundOpCmd_S {
        opType: number[];
        /**
         * 庄家开局可杠
         */
        barSet: number[];
        GetType(): string;
    }
    /**
     * 起手小胡等待时间
     */
    class StartNewRoundOpTimeCmd_Brd {
        sec: number;
        GetType(): string;
    }
    /**
     * 开局请求操作
     */
    class StartNewRoundOpCmd_C {
        /**
         * MahjongOpCardType
         */
        opType: number;
        /**
         * 中途四喜需要把id发上来
         */
        thisId: number;
        GetType(): string;
    }
    /**
     * 开局操作广播
     */
    class StartNewRoundOpCmd_Brd {
        uid: number;
        cardSet: number[];
        winType: number[];
        GetType(): string;
    }
    class StartNewRoundOp_Brd {
        GetType(): string;
    }
    /**
     * 请求补张
     */
    class SupplyCardMahjongCmd_C {
        thisId: number;
        GetType(): string;
    }
    class SupplyCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播补张
     */
    class SupplyCardMahjongCmd_Brd {
        /**
         * 碰牌的玩家
         */
        obj: BarCardObj;
        /**
         * 只在碰杠时 是否可抢杠胡 分别发送 1:可胡 0:不可胡
         */
        canWin: number;
        GetType(): string;
    }
    /**
     * 获取牌堆剩余牌数
     */
    class GetHeapCard_C {
        GetType(): string;
    }
    class GetHeapCard_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        /**
         * 万
         */
        wanCardSet: number[];
        /**
         * 条
         */
        tiaoCardSet: number[];
        /**
         * 筒
         */
        tongCardSet: number[];
        /**
         * 字
         */
        ziCardSet: number[];
        /**
         * 花
         */
        flowerCardSet: number[];
        GetType(): string;
    }
    /**
     * ping值广播
     */
    class SetPingTimeNullUserPmd_Brd {
        pingmsec: number;
        accid: number;
        GetType(): string;
    }
    class SetSameIpWarn_S {
        sameSet: string[];
        GetType(): string;
    }
    class SysMessageMahjongCmd_S {
        desc: string;
        /**
         * 消息级别和位置相关
         */
        pos: number;
        GetType(): string;
    }
    class ChangePointMahjongCmd_Brd {
        uid: number;
        /**
         * 剩余量
         */
        points: number;
        remainder: number;
        /**
         * 原因,0表示单局结算,1表示跟牌结算,2表示杠后结算
         */
        reason: number;
        GetType(): string;
    }
    /**
     * 换桌,同一房间换,名字没起好
     */
    class ChangeRoomMahjongCmd_C {
        roomId: number;
        GetType(): string;
    }
    class ChangeRoomMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 宽甸麻将 二人麻将 大邑麻将
     */
    class PlayButtonMahjongCmd_S {
        resultCode: number;
        /**
         * 牌的列表
         */
        CardSet: number[];
        /**
         * 类型 1是报胡 2是请胡
         */
        playButton: number;
        GetType(): string;
    }
    class PlayButtonMahjongCmd_C {
        /**
         * 0表示没点任何按钮 1 报夹 2报吊 3 站立报听 4站立报夹 5站立报吊 6听 888取消
         */
        playButton: number;
        GetType(): string;
    }
    class PlayButtonMahjongCmd_Brd {
        uid: number;
        /**
         * 0表示没点任何按钮 1 报夹 2报吊 3 站立报听 4站立报夹 5站立报吊 6听
         */
        playButton: number;
        /**
         * 是否断线重连后发的广播 1是
         */
        isReconnet: number;
        GetType(): string;
    }
    /**
     * 请求加倍
     */
    class DoubleMahjongCmd_C {
        GetType(): string;
    }
    class DoubleMahjongCmd_S {
        resultCode: number;
        /**
         * 加倍数
         */
        multiple: number;
        GetType(): string;
    }
    class DoubleMahjongCmd_Brd {
        uid: number;
        /**
         * 是否需要蒙牌 0是不需要，1为需要
         */
        isMask: number;
        GetType(): string;
    }
    class CheckMoneyMahjongCmd_S {
        /**
         * 1:输赢达到上限 2:金币不足
         */
        code: number;
        GetType(): string;
    }
    /**
     * 金币场游戏中充值广播
     */
    class ChargeGoldCoinMahjongCmd_Brd {
        /**
         * 所有需要充值的玩家id
         */
        uid: number[];
        /**
         * 充值操作时间
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 取消充值金币操作
     */
    class CancelChargeGoldCoinMahjongCmd_C {
        GetType(): string;
    }
    /**
     * 对局流水信息
     */
    class GameWaterMahjongCmd_S {
        /**
         * 番型输赢明细
         */
        multiDetailSet: MultiDetail[];
        GetType(): string;
    }
    /**
     * 血战血流 认输广播
     */
    class GameLoserUidMahjongCmd_Brd {
        loseruidSet: number[];
        /**
         * 充值成功为0 失败为1
         */
        ChargeState: number;
        GetType(): string;
    }
    class PointDetail {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 牌
         */
        CardThisId: number[];
        /**
         * 对应的分数
         */
        point: number;
        /**
         * 类型 0-无精 1-冲关 2-霸王
         */
        pointType: number[];
        GetType(): string;
    }
    class XiaGoldDetail {
        /**
         * 下精明细
         */
        pointDetail: PointDetail[];
        /**
         * 算分的牌
         */
        ShowCard: number[];
        /**
         * 玩法类型 0-埋雷 1-上下翻精 2-照镜子 3-回头一笑 4-同一首歌
         */
        Type: number;
        GetType(): string;
    }
    /**
     * 南昌麻将 下精算分广播
     */
    class XiaGoldCardPointMahjongCmd_Brd {
        /**
         * 所有玩家下精分明细
         */
        xiaGoldDetail: XiaGoldDetail[];
        /**
         * 玩法类型 0-埋雷 1-上下翻精 2-照镜子 3-回头一笑 4-同一首歌
         */
        Type: number;
        GetType(): string;
    }
    /**
     * 开始抓花广播
     */
    class StartSelectCardMahjong_Brd {
        /**
         * 所有抓花的牌
         */
        afcs: number[];
        /**
         * 抓花的玩家
         */
        uid: number;
        /**
         * 抓花时间
         */
        sec: number;
        /**
         * 可以抓多少张
         */
        limit: number;
        /**
         * 胡牌信息
         */
        rewardSet: RewardObj[];
        GetType(): string;
    }
    /**
     * 请求抓花
     */
    class SelectCardMahjong_C {
        /**
         * 选择的牌的thisid
         */
        thisid: number;
        GetType(): string;
    }
    /**
     * 抓花广播
     */
    class SelectCardMahjong_Brd {
        /**
         * 选择的牌的thisid
         */
        thisid: number;
        /**
         * 抓花输赢: 0,输; 1,赢
         */
        win: number;
        GetType(): string;
    }
    /**
     * 万州麻将的换牌数据
     */
    class ChangeCardDataMahjong_S {
        /**
         * 换给的玩家uid
         */
        giveuid: number;
        /**
         * 牌
         */
        giveCardThisId: number[];
        /**
         * 换到的牌的玩家uid
         */
        getuid: number;
        /**
         * 牌
         */
        getCardThisId: number[];
        /**
         * 谁的牌,放录像用
         */
        ownerid: number;
        GetType(): string;
    }
    /**
     * 万州麻将的买牌广播
     */
    class BuyCardMahjong_Brd {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 0是没点买牌,1是点了买牌
         */
        buy: number;
        GetType(): string;
    }
    /**
     * 万州麻将的已胡玩家数据广播
     */
    class WinSeatCardDataMahjong_Brd {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 赢的牌的id
         */
        wincardId: number;
        GetType(): string;
    }
    /**
     * 扣牌消息
     */
    class KouCardMahjongCmd_CS {
        /**
         * 需要进行扣牌处理的牌列表
         */
        cardList: number[];
        /**
         * 是否需要进行扣牌 true 需要 false 不需要
         */
        needKou: boolean;
        /**
         * 是否要进行扣牌
         */
        yesOrNo: boolean;
        GetType(): string;
    }
    /**
     * 扣牌
     */
    class WaitKouSeatMahjongCmd_S {
        /**
         * 等待扣牌玩家列表
         */
        waitUid: number[];
        GetType(): string;
    }
    class OtherKouCardMahjongCmd_Brd {
        /**
         * 所有人的扣牌信息
         */
        KouCards: KouCardInfo[];
        GetType(): string;
    }
    class KouCardInfo {
        /**
         * 当前玩家的uid
         */
        uid: number;
        /**
         * 信息类型 （0-不扣牌 1-扣牌通知） 2-显示更新
         */
        infoType: number;
        /**
         * 扣牌数量
         */
        kouCount: number;
        GetType(): string;
    }
    /**
     * 通知玩家选择翻金方式
     */
    class StartChoiseTurnGoldType_Brd {
        sec: number;
        /**
         * 断线重连是添加骰子数据
         */
        dice: DiceObj;
        GetType(): string;
    }
    /**
     * 选择翻金方式
     */
    class ChoiseTurnGoldType_C {
        /**
         * 1:向上    2:向下    3:开裂    4:染色
         */
        turnType: number;
        /**
         * 裂开数量
         */
        num: number;
        /**
         * 1:正向   2:反向
         */
        direction: number;
        GetType(): string;
    }
    /**
     * 广播翻金方式
     */
    class ChoiseTurnGoldType_Brd {
        turnType: number;
        /**
         * 裂开数量
         */
        num: number;
        /**
         * 1:正向   2:反向
         */
        direction: number;
        GetType(): string;
    }
    /**
     * 过蛋
     */
    class ShowBarCardPassTheEgg_CS {
        /**
         * 过蛋玩家id
         */
        uid: number;
        /**
         * 过蛋牌thisid
         */
        thisId: number;
        eggScore: number;
        GetType(): string;
    }
    class RoundScore {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 对局中的分数
         */
        score: number[];
        GetType(): string;
    }
    class ShowRoundScore_S {
        /**
         * 对局信息 重连才会推送
         */
        rs: RoundScore[];
        GetType(): string;
    }
    class ServiceChargeMahjongCmd_Brd {
        /**
         * 类型 1 金币 2钻石
         */
        ret: number;
        /**
         * 费用
         */
        score: number[];
        GetType(): string;
    }
    class SelfActiveMahjong_C {
        /**
         * 玩家id 非必要
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 玩家牌型报警
     */
    class CardTypeWarnMahjong_Brd {
        /**
         * 报警玩家的uid
         */
        uid: number;
        GetType(): string;
    }
}

/// <reference path="common.d.ts" />
declare module Cmd {
    enum PokerConst {
        /**
         * 系统用户id
         */
        SysUserId = 10000,
    }
    /**
     * 出牌的类型
     */
    enum CardSetType {
        /**
         * 无牌型
         */
        CardSetType_None = 0,
        /**
         * 单张
         */
        CardSetType_Single = 100,
        /**
         * 对子
         */
        CardSetType_Double = 200,
        /**
         * 顺子
         */
        CardSetType_StraightSingle = 300,
        /**
         * 连对
         */
        CardSetType_StraightDouble = 400,
        /**
         * 含三张的牌，如 三代一
         */
        CardSetType_ThreeWithX = 500,
        /**
         * 三代一
         */
        CardSetType_ThreeWithOne = 501,
        /**
         * 含四张的牌，如 四代二
         */
        CardSetType_FourWithX = 600,
        /**
         * 炸弹
         */
        CardSetType_Bomb = 700,
        /**
         * 没牛
         */
        CardSetType_BeefNone = 1000,
        /**
         * 牛1
         */
        CardSetType_BeefOne = 1001,
        /**
         * 牛2
         */
        CardSetType_BeefTwo = 1002,
        /**
         * 牛3
         */
        CardSetType_BeefThree = 1003,
        /**
         * 牛4
         */
        CardSetType_BeefFour = 1004,
        /**
         * 牛5
         */
        CardSetType_BeefFive = 1005,
        /**
         * 牛6
         */
        CardSetType_BeefSix = 1006,
        /**
         * 牛7
         */
        CardSetType_BeefSeven = 1007,
        /**
         * 牛8
         */
        CardSetType_BeefEight = 1008,
        /**
         * 牛9
         */
        CardSetType_BeefNine = 1009,
        /**
         * 牛牛
         */
        CardSetType_BeefBull = 1010,
        /**
         * 四花牛
         */
        CardSetType_BeefFourFlower = 1011,
        /**
         * 五花牛
         */
        CardSetType_BeefFiveFlower = 1012,
        /**
         * 炸弹
         */
        CardSetType_BeefBomb = 1013,
        /**
         * 五小牛
         */
        CardSetType_BeefSmall = 1014,
        /**
         * 顺子
         */
        CardSetType_BeefStraight = 1015,
        /**
         * 同花
         */
        CardSetType_BeefFlush = 1016,
        /**
         * 葫芦
         */
        CardSetType_BeefFullHouse = 1017,
        /**
         * 炸弹
         */
        CardSetType_BeefBomb1 = 1018,
        /**
         * 同花顺
         */
        CardSetType_BeefStraightFlush = 1019,
        /**
         * 四连通杀
         */
        CardSetType_Quadrakill = 1020,
        /**
         * 龙虎炮
         */
        CardSetType_DragonTiger = 1021,
        /**
         * 单牌(高牌)
         */
        CardSetType_TexasHighCard = 1101,
        /**
         * 一对
         */
        CardSetType_TexasOnePair = 1102,
        /**
         * 两对
         */
        CardSetType_TexasTwoPairs = 1103,
        /**
         * 三条
         */
        CardSetType_TexasThreeOfKind = 1104,
        /**
         * 顺子
         */
        CardSetType_TexasStraight = 1105,
        /**
         * 同花
         */
        CardSetType_TexasFlush = 1106,
        /**
         * 三条加一对(葫芦)
         */
        CardSetType_TexasFullHouse = 1107,
        /**
         * 四条(金刚)
         */
        CardSetType_TexasFourOfKind = 1108,
        /**
         * 同花顺
         */
        CardSetType_TexasStraightFlush = 1109,
        /**
         * 皇家同花顺
         */
        CardSetType_TexasRoyalFlush = 1110,
        /**
         * 至尊
         */
        CardSetType_PaiGowExtreme = 1301,
        /**
         * 双天
         */
        CardSetType_PaiGowTwoDays = 1302,
        /**
         * 双地
         */
        CardSetType_PaiGowTwoGround = 1303,
        /**
         * 双人
         */
        CardSetType_PaiGowTwoPeople = 1304,
        /**
         * 双鹅
         */
        CardSetType_PaiGowTwoE = 1305,
        /**
         * 双梅
         */
        CardSetType_PaiGowTwoPlum = 1306,
        /**
         * 双长
         */
        CardSetType_PaiGowTwoLong = 1307,
        /**
         * 双板凳
         */
        CardSetType_PaiGowTwoBench = 1308,
        /**
         * 双斧头
         */
        CardSetType_PaiGowTwoAxe = 1309,
        /**
         * 双红头
         */
        CardSetType_PaiGowTwoHead = 1310,
        /**
         * 双铜锤
         */
        CardSetType_PaiGowTwoPratia = 1311,
        /**
         * 双零霖
         */
        CardSetType_PaiGowTwoLing = 1312,
        /**
         * 对杂九
         */
        CardSetType_PaiGowTwoMixNine = 1313,
        /**
         * 对杂八
         */
        CardSetType_PaiGowTwoMixEight = 1314,
        /**
         * 对杂七
         */
        CardSetType_PaiGowTwoMixSeven = 1315,
        /**
         * 对杂五
         */
        CardSetType_PaiGowTwoMixFive = 1316,
        /**
         * 天王
         */
        CardSetType_PaiGowDayKing = 1317,
        /**
         * 地王
         */
        CardSetType_PaiGowGroundKing = 1318,
        /**
         * 天杠
         */
        CardSetType_PaiGowDayBar = 1319,
        /**
         * 地杠
         */
        CardSetType_PaiGowGroundBar = 1331,
        /**
         * 天高九
         */
        CardSetType_PaiGowDayHighNine = 1332,
        /**
         * 地高九
         */
        CardSetType_PaiGowGroundHighNine = 1333,
        /**
         * 天九  杂九
         */
        CardSetType_PaiGowGodNine = 1334,
        CardSetType_PaiGowGroundNine = 1335,
        CardSetType_PaiGowPeoPleNine = 1336,
        CardSetType_PaiGowENine = 1337,
        CardSetType_PaiGowLongNine = 1338,
        CardSetType_PaiGowShortNine = 1339,
        /**
         * 天八 杂八
         */
        CardSetType_PaiGowGodEight = 1341,
        CardSetType_PaiGowGroundEight = 1342,
        CardSetType_PaiGowPeoPleEight = 1343,
        CardSetType_PaiGowEEight = 1344,
        CardSetType_PaiGowLongEight = 1345,
        CardSetType_PaiGowShortEight = 1346,
        CardSetType_PaiGowMixEight = 1347,
        /**
         * 天七  杂七
         */
        CardSetType_PaiGowGodSeven = 1348,
        CardSetType_PaiGowGroundSeven = 1349,
        CardSetType_PaiGowPeoPleSeven = 1350,
        CardSetType_PaiGowESeven = 1351,
        CardSetType_PaiGowLongSeven = 1352,
        CardSetType_PaiGowShortSeven = 1353,
        CardSetType_PaiGowMixSeven = 1354,
        /**
         * 天六 杂六
         */
        CardSetType_PaiGowGodSix = 1355,
        CardSetType_PaiGowGroundSix = 1356,
        CardSetType_PaiGowPeoPleSix = 1357,
        CardSetType_PaiGowESix = 1358,
        CardSetType_PaiGowLongSix = 1359,
        CardSetType_PaiGowShortSix = 1360,
        CardSetType_PaiGowMixSix = 1361,
        /**
         * 天五  杂五
         */
        CardSetType_PaiGowGodFive = 1362,
        CardSetType_PaiGowGroundFive = 1363,
        CardSetType_PaiGowPeoPleFive = 1364,
        CardSetType_PaiGowEFive = 1365,
        CardSetType_PaiGowLongFive = 1366,
        CardSetType_PaiGowShortFive = 1367,
        CardSetType_PaiGowMixFive = 1368,
        /**
         * 天四 杂四
         */
        CardSetType_PaiGowGodFour = 1369,
        CardSetType_PaiGowGroundFour = 1370,
        CardSetType_PaiGowPeoPleFour = 1371,
        CardSetType_PaiGowEFour = 1372,
        CardSetType_PaiGowLongFour = 1373,
        CardSetType_PaiGowShortFour = 1374,
        CardSetType_PaiGowMixFour = 1375,
        /**
         * 天三 杂三
         */
        CardSetType_PaiGowGodThree = 1376,
        CardSetType_PaiGowGroundThree = 1377,
        CardSetType_PaiGowPeoPleThree = 1378,
        CardSetType_PaiGowEThree = 1379,
        CardSetType_PaiGowLongThree = 1380,
        CardSetType_PaiGowShortThree = 1381,
        CardSetType_PaiGowMixThree = 1382,
        /**
         * 天二 杂二
         */
        CardSetType_PaiGowGodTwo = 1383,
        CardSetType_PaiGowGroundTwo = 1384,
        CardSetType_PaiGowPeoPleTwo = 1385,
        CardSetType_PaiGowETwo = 1386,
        CardSetType_PaiGowLongTwo = 1387,
        CardSetType_PaiGowShortTwo = 1388,
        CardSetType_PaiGowMixTwo = 1389,
        /**
         * 人一 杂一
         */
        CardSetType_PaiGowPeoPleOne = 1390,
        CardSetType_PaiGowEOne = 1391,
        CardSetType_PaiGowLongOne = 1392,
        CardSetType_PaiGowShortOne = 1393,
        CardSetType_PaiGowMixOne = 1394,
        /**
         * 毕十
         */
        CardSetType_PaiGowBiTen = 1395,
        /**
         * 鬼子
         */
        CardSetType_PaiGowDevil = 1396,
        /**
         * 天一
         */
        CardSetType_PaiGowGodOne = 1397,
        /**
         * 地一
         */
        CardSetType_PaiGowGroundOne = 1398,
    }
    /**
     * 游戏状态
     */
    enum GameState {
        /**
         * 准备
         */
        State_Ready = 1,
        /**
         * 托管
         */
        State_Host = 2,
        /**
         * 在游戏中
         */
        State_InGame = 3,
        /**
         * 坐下
         */
        State_Sit = 4,
        /**
         * 完成
         */
        State_Complete = 5,
        /**
         * 游戏启动
         */
        State_RoundEnable = 6,
        /**
         * 弃牌
         */
        State_Fold = 7,
        /**
         * 看牌
         */
        State_Check = 8,
        /**
         * 比牌赢
         */
        State_CompareWin = 9,
        /**
         * 比牌输
         */
        State_CompareLose = 10,
        /**
         * 可看手牌
         */
        State_SeeCard = 11,
        /**
         * 已亮牌
         */
        State_ShowCard = 12,
        /**
         * 抗贡
         */
        State_AntiTribute = 13,
        /**
         * 接风
         */
        State_Relay = 14,
    }
    /**
     * 游戏目前所处的状态
     */
    enum GameStatus {
        /**
         * 空闲时间
         */
        GameStatus_Free = 1,
        /**
         * 压注时间
         */
        GameStatus_Bet = 2,
        /**
         * 开奖时间
         */
        GameStatus_Lottery = 3,
        /**
         * 结算时间
         */
        GameStatus_Settle = 4,
        /**
         * 抢／叫地主
         */
        GameStatus_LordOption = 5,
        /**
         * 踢
         */
        GameStatus_Kick = 6,
        /**
         * 出牌
         */
        GameStatus_Playing = 7,
        /**
         * 暂停
         */
        GameStatus_Pause = 8,
        /**
         * 倒计时
         */
        GameStatus_CountDown = 9,
        /**
         * 等待下一局
         */
        GameStatus_WaitNextRound = 10,
        /**
         * 进贡阶段
         */
        GameStatus_PayTribute = 11,
        /**
         * 发牌
         */
        GameStatus_Deal = 12,
    }
    /**
     * 操作
     */
    enum Operation {
        /**
         * 叫地主 - 不叫
         */
        LordCall0 = 1,
        /**
         * 叫地主 - 叫1分
         */
        LordCall1 = 2,
        /**
         * 叫地主 - 叫2分
         */
        LordCall2 = 3,
        /**
         * 叫地主 - 叫3分
         */
        LordCall3 = 4,
        /**
         * 抢地主 - 不抢
         */
        LordRobNo = 5,
        /**
         * 抢地主 - 抢
         */
        LordRobYes = 6,
        /**
         * 叫地主 - 不叫
         */
        LordCallNo = 7,
        /**
         * 叫地主 - 叫
         */
        LordCallYes = 8,
        /**
         * 要的起、拿牌
         */
        Play = 9,
        /**
         * 要不去、不拿牌
         */
        PlayNot = 10,
        /**
         * 必须出、发牌
         */
        PlayMust = 11,
        /**
         * 弃牌
         */
        GiveUp = 12,
        /**
         * 下注
         */
        Wagering = 13,
        /**
         * 跟注、重复下注、再下注
         */
        FollowBet = 14,
        /**
         * 起脚
         */
        UpFoot = 15,
        /**
         * 不踢
         */
        NoFoot = 16,
        /**
         * 反踢
         */
        BackFoot = 17,
        /**
         * 弃牌
         */
        Fold = 18,
        /**
         * 跟注
         */
        Call = 19,
        /**
         * 加注、双倍
         */
        Raise = 20,
        Allin = 21,
        /**
         * 看牌
         */
        Check = 22,
        /**
         * 比牌
         */
        Compare = 23,
        /**
         * 小盲注
         */
        SmallBlind = 24,
        /**
         * 大盲注
         */
        BigBlind = 25,
        /**
         * 2倍大盲
         */
        BBlind2 = 26,
        /**
         * 3倍大盲
         */
        BBlind3 = 27,
        /**
         * 4倍大盲
         */
        BBlind4 = 28,
        /**
         * 1/2 底池
         */
        Pot1_2 = 29,
        /**
         * 2/3 底池
         */
        Pot2_3 = 30,
        /**
         * 1倍 底池
         */
        Pot1_1 = 31,
        /**
         * 自动跟注
         */
        AutoCall = 32,
        /**
         * 锅底押注
         */
        Pan = 33,
        /**
         * 自动跟注取消
         */
        AutoCallCancel = 34,
        /**
         * 吃
         */
        Eat = 35,
        /**
         * 拉
         */
        Pull = 36,
        /**
         * 胡
         */
        Hu = 37,
        /**
         * 暗 == 暗杠
         */
        Dark = 38,
        /**
         * 报听
         */
        Listen = 39,
        /**
         * 下庄
         */
        DownBanker = 40,
        /**
         * 自动弃牌
         */
        AutoFold = 41,
        /**
         * 取消压注
         */
        Cancel = 42,
        /**
         * 推注
         */
        PushBet = 43,
        /**
         * 补分
         */
        FillPoint = 44,
        /**
         * 进贡
         */
        PayTribute = 45,
        /**
         * 退贡
         */
        BackTribute = 46,
        /**
         * 选牌
         */
        SelectCard = 47,
        /**
         * 比拼中路
         */
        MiddleCompare = 48,
        /**
         *  人机对战用
         *  拉霸用于免费游戏选择物品
         */
        ExtOperation1 = 50,
        /**
         * 换炮
         */
        ChangeBattery = 51,
        /**
         * 锁定
         */
        Lock = 52,
        /**
         * 取消锁定
         */
        Unlock = 53,
        /**
         * 拆牌
         */
        Split = 54,
        /**
         * 保险
         */
        Insurance = 55,
        /**
         * 双倍下注（黑杰克）
         */
        Double = 56,
    }
    /**
     * 荣誉
     */
    enum GameHonor {
        /**
         * 春天
         */
        GameHonor_Spring = 0,
        /**
         * 反春天
         */
        GameHonor_SpringReverse = 1,
        /**
         * 最大赢家
         */
        GameHonor_WinMost = 2,
        /**
         * 最大牌型
         */
        GameHonor_BestCard = 3,
        /**
         * 第一名
         */
        GameHonor_FirstPlace = 4,
        /**
         * 最后一名
         */
        GameHonor_LastPlace = 5,
        /**
         * 双贡
         */
        GameHonor_DoubleTribute = 6,
    }
    /**
     * 货币类型
     */
    enum MoneyType {
        /**
         * 钻石
         */
        Diamond = 0,
        /**
         * 点数
         */
        Point = 1,
        /**
         * 刀分
         */
        CutScore = 2,
        /**
         * 积分
         */
        CardScore = 3,
    }
    /**
     * 保单操作类型
     */
    enum PolicyOperationType {
        /**
         * 保单文件
         */
        PolicyOperationType_Policy = 1,
        /**
         * 解压密码
         */
        PolicyOperationType_Password = 2,
    }
    enum FishSkillType {
        /**
         * 一网打尽
         */
        YiWangDaJin = 1,
        /**
         * 炸弹
         */
        Bomb = 2,
        /**
         * 同组炸弹
         */
        SameGroup = 3,
    }
    /**
     * 填坑点数（）
     */
    class KengPoint {
        /**
         * 自己手牌总点数（包括暗牌）
         */
        allCardPoint: number;
        /**
         * 自己明牌总点数
         */
        openCardPoint: number;
        /**
         * 自己手牌总分差（包括暗牌）
         */
        allCardPointGap: number;
        /**
         * 自己明牌分差
         */
        openCardPointGap: number;
        GetType(): string;
    }
    /**
     * 座位数据
     */
    class SeatData {
        /**
         * 座位
         */
        seatId: number;
        /**
         * 是否准备
         */
        isReady: boolean;
        /**
         * 人物信息
         */
        role: UserBriefInfo;
        /**
         * 手牌
         */
        handCardList: number[];
        /**
         * 出的牌
         */
        outCardList: number[];
        /**
         * 在线状态
         */
        onlineState: Cmd.OnlineState;
        /**
         * 是否托管
         */
        isHost: boolean;
        /**
         * 倍数
         */
        multiple: number;
        /**
         * 刀分
         */
        cutScore: number;
        /**
         * 积分
         */
        cardScore: number;
        /**
         * 手牌数量,其他人手牌不发时发数量下来
         */
        handCardNum: number;
        /**
         * 手牌中王的数量
         */
        kingNum: number;
        /**
         * 追加手牌
         */
        catchCards: number[];
        /**
         * 填坑点数
         */
        kengPoint: KengPoint;
        /**
         * 是否在游戏中
         */
        isInGame: boolean;
        /**
         * 总投注数
         */
        betCount: number;
        /**
         * 是否坐下
         */
        isSit: boolean;
        /**
         * 状态列表
         */
        stateList: GameState[];
        /**
         * 推荐牌
         */
        recommend: GameObjectData[];
        /**
         * 追加手牌数量
         */
        catchNum: number;
        /**
         * 押注数据统计
         */
        statistics: Cmd.StatisticsRoundData;
        /**
         * 置牌（长牌用）
         */
        placeCardList: number[];
        /**
         * 是否报听（长牌用）1：表示已经报听，0：表示没有报听
         */
        listened: number;
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        /**
         * 炮的等级
         */
        batteryId: number;
        /**
         * 锁定的fishId
         */
        lockFishId: number;
        GetType(): string;
    }
    /**
     * 状态更新通知
     */
    class SeatStateUpdate_S {
        op: Cmd.UpdateOperator;
        /**
         * 状态列表
         */
        stateList: GameState[];
        uid: number;
        GetType(): string;
    }
    /**
     * 座位数据更新
     */
    class SeatDataUpdateCmd_S {
        op: Cmd.UpdateOperator;
        seatData: SeatData[];
        GetType(): string;
    }
    /**
     * 门的筹码
     */
    class DoorChips {
        /**
         * 1天2地3玄4黄 1大2小3单4双
         */
        doorId: number;
        /**
         * 门 总投注数
         */
        chips: number;
        potId: number;
        uid: number;
        /**
         * 名次
         */
        place: number;
        actList: Action[];
        /**
         * 当前期号
         */
        expect: number;
        GetType(): string;
    }
    class GameStatusInfo {
        status: GameStatus;
        endTime: number;
        /**
         * 倒计时秒数
         */
        leftSec: number;
        /**
         * 超时描述
         */
        desc: string;
        /**
         * 结果
         */
        lottery: Cmd.Lottery;
        /**
         * 赛车控制前端显示
         */
        saicheRunData: SaiCheRunData[];
        cardList: CardSetList;
        GetType(): string;
    }
    /**
     * 拉霸游戏状态更新数据结构
     */
    class LabaStatusInfo {
        /**
         * 奖池累计
         */
        awardMultiplePool: number;
        /**
         * 是否免费 1 | 0
         */
        isFree: number;
        /**
         * 返奖数据列表
         */
        dataList: LabaStatusInfo.Data[];
        GetType(): string;
    }
    module LabaStatusInfo {
        class Data {
            /**
             * 随机返奖倍数
             */
            awardMultiple: number;
            /**
             * 真实返奖倍数
             */
            awardMultipleReal: number;
            /**
             * 奖励货币数量
             */
            awardPoint: number;
            /**
             * 是否为假免费 1 | 0
             */
            isFalseFree: number;
            /**
             * 是否为拼盘 1 | 0
             */
            isPinpan: number;
            /**
             * 展示物品编号
             */
            selectItemId: number;
            /**
             * 特殊符号数量
             */
            specialSymbolNum: number;
            /**
             * 特殊符号奖励
             */
            specialSymbolAward: number;
            /**
             * 抽取的特殊符号价植列表
             */
            specialSymbolValues: number[];
            totalValue: number;
            GetType(): string;
        }
    }
    /**
     * 赛车动画控制数据结构
     */
    class SaiCheRunData {
        /**
         * 赛车流程
         */
        gameProcess: SaiCheRunData.GameProcess[];
        /**
         * 事故列表
         */
        accident: SaiCheRunData.Accident[];
        /**
         * 氮气瓶位置
         */
        nosPos: SaiCheRunData.NosPos[];
        GetType(): string;
    }
    module SaiCheRunData {
        class GameProcess {
            gamePs: Cmd.SaiCheRunData.GameProcess.GameP[];
            GetType(): string;
        }
        module GameProcess {
            class GameP {
                /**
                 * 时间
                 */
                time: number;
                /**
                 * 长度
                 */
                length: number;
                /**
                 * 最大速度
                 */
                maxSpeed: number;
                /**
                 * 延时
                 */
                delay: number;
                GetType(): string;
            }
        }
    }
    module SaiCheRunData {
        class Accident {
            accs: Cmd.SaiCheRunData.Accident.Acci[];
            GetType(): string;
        }
        module Accident {
            class Acci {
                /**
                 * 图片
                 */
                pictureType: number;
                /**
                 * 类型&quot;nos&quot; &quot;xdh&quot;
                 */
                type: string;
                /**
                 * 时间
                 */
                time: string;
                /**
                 * 触发长度
                 */
                triggerLen: number;
                /**
                 * 速度变化
                 */
                speed: number;
                /**
                 * 补偿时间
                 */
                redeemtime: number;
                GetType(): string;
            }
        }
    }
    module SaiCheRunData {
        class NosPos {
            nosPs: Cmd.SaiCheRunData.NosPos.NosP[];
            GetType(): string;
        }
        module NosPos {
            class NosP {
                /**
                 * 赛道编号
                 */
                nomber: number;
                /**
                 * 赛道点
                 */
                triggerLen: number;
                GetType(): string;
            }
        }
    }
    /**
     * 游戏状态更新
     */
    class GameStatusUpdateCmd_S {
        statusInfo: GameStatusInfo;
        winDoor: number;
        winId: number;
        /**
         * 拉霸数据更新用
         */
        labaStatusInfo: LabaStatusInfo;
        GetType(): string;
    }
    /**
     * 本轮局牌的数据
     */
    class RoundData {
        /**
         * 操作位
         */
        opSeatId: number;
        /**
         * 操作结束时间
         */
        opEndTime: number;
        /**
         * 最后的底桌底三张牌
         */
        threeCard: number[];
        /**
         * 倍数
         */
        multiple: number;
        /**
         * 地主位
         */
        lordSeatId: number;
        /**
         * 抢地主阶段数据
         */
        robLordData: RoundData.RobLordData;
        callLordData: RoundData.CallLordData;
        kickData: RoundData.YesOrNoData;
        /**
         * 底分
         */
        pointBase: number;
        /**
         * 所有的压注数, 用 betDoor 代替
         */
        doorChipsSum: DoorChips[];
        /**
         * 我的压注数   用 betMe 代替
         */
        doorChipsMe: DoorChips[];
        /**
         * 门的牌
         */
        doorCard: GameObjectData[];
        /**
         * 庄家的牌
         */
        bankerCard: GameObjectData;
        /**
         * 状态
         */
        status: GameStatus;
        /**
         * 最大压注数
         */
        betChipsMax: number;
        /**
         * 所处的阶段
         */
        stage: GameStatus;
        /**
         * 底牌
         */
        bottomCard: number[];
        /**
         * 排名数据
         */
        rankList: number[];
        /**
         * 倒计时秒数opEndTime
         */
        leftSec: number;
        /**
         * 可操作
         */
        opList: Operation[];
        /**
         * 推荐出牌
         */
        recommend: CardSetList[];
        /**
         * 桌内所有筹码分
         */
        tabPoints: number;
        /**
         * 本轮踢过玩家（kickData断线后判断玩家是否踢过）
         */
        kickedList: number[];
        /**
         * 门内的押注
         */
        betDoor: BetData;
        /**
         * 我的押注
         */
        betMe: BetData;
        /**
         * 德扑
         */
        texas: TexasRoundInfo;
        /**
         * 最小加注线
         */
        raiseLine: number;
        /**
         * 牌堆剩余牌数
         */
        lastCardNum: number;
        actList: Action[];
        circle: number;
        /**
         * 强制盲注位
         */
        straddleId: number;
        /**
         * 可操作的座位列表
         */
        opSeatList: GameObjectData[];
        /**
         * 已选的牌
         */
        selectCard: CardSetList;
        /**
         * 未选的牌
         */
        noSelectCard: CardSetList;
        /**
         * 0:延时时长 1:延时次数 2:消耗钻石树
         */
        delay: number[];
        levelList: number[];
        award: DoorChips;
        GetType(): string;
    }
    module RoundData {
        /**
         * TODO: 换成 YesOrNo 类型
         */
        class RobLordData {
            /**
             * 选择“抢地主”的座位
             */
            sayYes: number[];
            /**
             * 选择“不抢地主”的座位
             */
            sayNo: number[];
            GetType(): string;
        }
    }
    module RoundData {
        class CallLordData {
            /**
             * 叫 0分 的座位号
             */
            call0: number[];
            /**
             * 叫 1分 的座位号
             */
            call1: number[];
            /**
             * 叫 2分 的座位号
             */
            call2: number[];
            /**
             * 叫 3分 的座位号
             */
            call3: number[];
            /**
             * 叫 4分 的座位号
             */
            call4: number[];
            /**
             * 叫 5分 的座位号
             */
            call5: number[];
            GetType(): string;
        }
    }
    module RoundData {
        class YesOrNoData {
            sayYes: number[];
            sayNo: number[];
            GetType(): string;
        }
    }
    /**
     * 房间数据
     */
    class RoomData {
        roomId: number;
        /**
         * 玩法属性,只是开关类型的
         */
        props: number[];
        /**
         * 座位信息
         */
        seatList: SeatData[];
        /**
         * 房主的uid
         */
        ownerId: number;
        /**
         * round 数据
         */
        roundData: RoundData;
        /**
         * 底分
         */
        pointBase: number;
        /**
         * 房间类型
         */
        roomType: Cmd.RoomType;
        /**
         * true 叫地主 false 抢地主
         */
        callOrRob: boolean;
        /**
         * 牌局总数
         */
        gameNbr: number;
        /**
         * 已经进行的牌局数
         */
        gameNbrCur: number;
        /**
         * 庄家
         */
        banker: UserBriefInfo;
        /**
         * 等待的上庄列表
         */
        bankerWait: UserBriefInfo[];
        /**
         * 房间状态
         */
        statusInfo: GameStatusInfo;
        level: number;
        history: Cmd.History;
        /**
         * 彩票信息
         */
        lottery: Cmd.Lottery;
        /**
         * 解散房间信息
         */
        dissolve: DissolveRoomUpdateCmd_S;
        roomState: Cmd.RoomState;
        /**
         * 喜分（填坑）
         */
        happyPoint: number;
        /**
         * 谁来控制开始游戏操作
         */
        startGameOpId: number;
        /**
         * 房间最大人数
         */
        maxUserNum: number;
        /**
         * 状态列表
         */
        stateList: GameState[];
        /**
         * 最小值
         */
        pointLimit: number;
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
         * 创建者
         */
        owner: UserBriefInfo;
        /**
         * 俱乐部
         */
        club: Cmd.ClubInfo;
        /**
         * 观众
         */
        audienceList: GameObjectData[];
        /**
         * 房间内所有玩家的金钱统计
         */
        moneyData: GameObjectData[];
        /**
         * 德扑数据
         */
        texas: Cmd.TexasConfig;
        /**
         * 投票数据
         */
        voteData: VoteData;
        /**
         * 可进行的动作
         */
        actList: Action[];
        gameNumList: GameNumber[];
        /**
         * 报名人
         */
        signList: UserBriefInfo[];
        /**
         * 排名
         */
        rankList: GameObjectData[];
        /**
         * 升盲倒计时 废弃
         */
        leftSecBlind: number;
        /**
         * 倒计时
         */
        leftSec: number;
        /**
         * 最小匹配分
         */
        minMatchPoint: number;
        /**
         * 保单数量
         */
        policyNumber: number;
        /**
         * 如果是重连回来,需要清除所有之前的状态,需要加个标志,1表示清除所有桌面状态
         */
        clear: number;
        /**
         * 服务器时间戳
         */
        timestamp: number;
        /**
         * 座位数量
         */
        seatNumber: number;
        /**
         * 倒计时列表
         */
        countdownList: Countdown[];
        /**
         * 十点半房间属性：1:金豆场 2:钻石场
         */
        coinorDiamond: number;
        /**
         * 房间编号
         */
        serialNum: number;
        /**
         * 十点半房费，1 所有玩家都支付 0 仅赢家支付
         */
        tipsType: number;
        /**
         * 十点半 费率
         */
        coinGameCost: number;
        /**
         * 十点半离场
         */
        leaveCarry: number;
        /**
         * 十点半入场
         */
        lowestCarry: number;
        /**
         * 十点半场次 1:普通匹配场 2:中级匹配场 3:高级匹配场 4:顶级匹配场
         */
        sceneType: number;
        /**
         * 鱼列表
         */
        fishlist: FishInfo[];
        /**
         * 子弹信息
         */
        bulletinfo: BulletInfo[];
        /**
         * 场景id
         */
        sceneId: number;
        GetType(): string;
    }
    /**
     * 十点半独立倒计时
     */
    class SendPersonalCountDown_S {
        /**
         * 剩余时间
         */
        leftSec: number;
        GetType(): string;
    }
    /**
     * 倒计时
     */
    class Countdown {
        ctype: Countdown.CountdownType;
        leftSec: number;
        GetType(): string;
    }
    module Countdown {
        enum CountdownType {
            /**
             * 升盲
             */
            RiseBlind = 1,
            /**
             * 买入
             */
            BuyBring = 2,
        }
    }
    /**
     * 倒计时更新
     */
    class CountdownUpdateCmd_S {
        /**
         * 倒计时列表
         */
        countdownList: Countdown[];
        op: Cmd.UpdateOperator;
        GetType(): string;
    }
    /**
     * 房间数据更新
     */
    class RoomDataUpdateCmd_S {
        roomData: RoomData;
        /**
         * 其他人的混合牌,记牌器用
         */
        leftCardList: number[];
        GetType(): string;
    }
    /**
     * 房间玩家更新
     */
    class RoomSeatUpdateCmd_S {
        op: Cmd.UpdateOperator;
        seatData: SeatData[];
        GetType(): string;
    }
    /**
     * 解散房间请求
     */
    class DissolveRoomRequestCmd_C {
        roomId: number;
        GetType(): string;
    }
    /**
     * 回复解散房间请求
     */
    class DissolveRoomReturnCmd_C {
        yesOrNo: boolean;
        roomId: number;
        GetType(): string;
    }
    /**
     * 解散房间数据更新
     */
    class DissolveRoomUpdateCmd_S {
        /**
         * 发起人
         */
        sponsor: string;
        voterList: DissolveRoomUpdateCmd_S.Voter[];
        /**
         * 解散房间结束时间
         */
        endTime: number;
        /**
         * 倒计时秒数
         */
        leftSec: number;
        roomId: number;
        /**
         * 是否结算
         */
        dissolve: boolean;
        GetType(): string;
    }
    module DissolveRoomUpdateCmd_S {
        class Voter {
            uid: number;
            /**
             * 投票人名称
             */
            name: string;
            /**
             * 同意 / 等待
             */
            yesOrWait: boolean;
            GetType(): string;
        }
    }
    /**
     * 投票数据
     */
    class VoteData {
        voterList: VoteData.Voter[];
        /**
         * 什么样的投票
         */
        vote: number;
        /**
         * 倒计时秒数
         */
        leftSec: number;
        /**
         * 发起人
         */
        sponsor: string;
        GetType(): string;
    }
    module VoteData {
        class Voter {
            uid: number;
            /**
             * 投票人名称
             */
            name: string;
            /**
             * 动作
             */
            act: number;
            GetType(): string;
        }
    }
    /**
     * 投票发起
     */
    class VoteLaunchCmd_C {
        vote: number;
        GetType(): string;
    }
    /**
     * 投票选择
     */
    class VoteSelectCmd_C {
        act: number;
        vote: number;
        GetType(): string;
    }
    /**
     * 投票数据更新
     */
    class VoteUpdateCmd_S {
        data: VoteData;
        voter: VoteData.Voter[];
        GetType(): string;
    }
    /**
     * 启动牌局
     */
    class EnableRoundCmd_CS {
        roomId: number;
        startAt: number;
        GetType(): string;
    }
    /**
     * 徳扑游戏数据
     */
    class TexasRoundInfo {
        /**
         * 庄家
         */
        dealer: number;
        /**
         * 小盲位
         */
        sbSeatId: number;
        /**
         * 大盲位
         */
        bbSeatId: number;
        /**
         * 小盲
         */
        smallBlind: number;
        /**
         * 分池
         */
        devidePot: number[];
        /**
         * 总池
         */
        sumPot: number;
        /**
         * 押注圈
         */
        circle: number;
        /**
         * 玩家数据
         */
        playerList: GameObjectData[];
        /**
         * 保险
         */
        insurance: InsuranceData;
        GetType(): string;
    }
    /**
     *  C-&gt;S 开始游戏请求
     *  S-&gt;C 开始游戏通知
     */
    class StartGameCmd_CS {
        /**
         * 现在进行第几局
         */
        gameNbrCur: number;
        /**
         * 最大压注数
         */
        betChipsMax: number;
        GetType(): string;
    }
    /**
     * 游戏开始
     */
    class StartGameCmd_S {
        /**
         * 牌局总数
         */
        gameNbr: number;
        /**
         * 现在进行第几局
         */
        gameNbrCur: number;
        /**
         * 最大压注数
         */
        betChipsMax: number;
        /**
         * 保单数量
         */
        policyNumber: number;
        /**
         * 徳扑开局数据
         */
        texas: TexasRoundInfo;
        GetType(): string;
    }
    /**
     * 展示牌请求
     */
    class DisplayCardCmd_CS {
        each: GameObjectData[];
        result: boolean;
        GetType(): string;
    }
    /**
     * 发牌
     */
    class DealCardCmd_S {
        /**
         * 每个座位的牌
         */
        seatCardList: SeatData[];
        /**
         * 每个门的牌
         */
        door: GameObjectData[];
        /**
         * 庄稼的牌和各回各家&#183;`
         */
        banker: GameObjectData;
        /**
         * 叫分牌,斗地主叫分用
         */
        callCard: number;
        /**
         * 开始叫分的玩家
         */
        callUid: number;
        /**
         * 其他人的混合牌,记牌器用
         */
        leftCardList: number[];
        /**
         * 发牌类型:1 或不发表示覆盖,2表示追加,3表示删除
         */
        dealCardType: Cmd.UpdateOperator;
        /**
         * 当局牌库剩余数量
         */
        lastCardNum: number;
        GetType(): string;
    }
    /**
     * 更新手牌
     */
    class HandCardUpdateCmd_S {
        op: Cmd.UpdateOperator;
        update: GameObjectData[];
        GetType(): string;
    }
    /**
     * 牌集列表
     */
    class CardSetList {
        /**
         * 手牌
         */
        cardSet: number[];
        /**
         * 牌型
         */
        typ: CardSetType;
        /**
         * 关键牌
         */
        key: number[];
        /**
         * 牌数
         */
        num: number;
        GetType(): string;
    }
    /**
     * 操作位轮转
     */
    class NewOperateSeatCmd_S {
        seatId: number;
        /**
         * 推荐出牌
         */
        cardSetList: CardSetList[];
        /**
         * 牌型
         */
        cardListType: CardSetType;
        /**
         * 操作bit位 废弃:使用 opList 代替
         */
        opBit: number;
        /**
         * 倒计时秒数
         */
        leftSec: number;
        /**
         * 可操作列表
         */
        opList: Operation[];
        /**
         * 操作结束时间 废弃: 使用 leftSec 代替
         */
        endTime: number;
        /**
         * 最低加注线
         */
        raiseLine: number;
        /**
         * 是否是第一手牌
         */
        isFirstOp: number;
        /**
         * 继续比牌
         */
        continueCompare: boolean;
        /**
         * 0:延时时长 1:延时次数 2:消耗钻石树
         */
        delay: number[];
        /**
         * 可进行的动作
         */
        actList: Action[];
        GetType(): string;
    }
    /**
     * 排名通知
     */
    class RankUpdateCmd_S {
        seatId: number;
        place: number;
        rankList: GameObjectData[];
        GetType(): string;
    }
    /**
     * 打出去的牌
     */
    class PlayCardInfo {
        uid: number;
        /**
         * 打出的牌
         */
        cardList: number[];
        /**
         * 打出牌的类型
         */
        cardListType: CardSetType;
        replace: number[];
        /**
         * 剩余牌数
         */
        handcardNum: number;
        /**
         * 倍数
         */
        multiple: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 出牌请求
     *  S-&gt;C 出牌通知
     */
    class PlayCardCmd_CS {
        uid: number;
        /**
         * 打出的牌
         */
        cardList: number[];
        /**
         * 打出牌的类型
         */
        cardListType: CardSetType;
        replace: number[];
        /**
         * 剩余牌数
         */
        handcardNum: number;
        /**
         * 倍数
         */
        multiple: number;
        list: PlayCardInfo[];
        GetType(): string;
    }
    /**
     * 获取玩家综合信息
     */
    class GetUserFullInfoCmd_CS {
        need: Cmd.MsgType[];
        /**
         * 玩家基本信息
         */
        role: Cmd.UserBaseInfo;
        /**
         * 战绩数据
         */
        statisticsData: Cmd.StatisticsRoundData[];
        /**
         * 玩家加入俱乐部
         */
        joinList: Cmd.ClubInfo[];
        GetType(): string;
    }
    /**
     * 底牌更新通知
     */
    class BottomCardUpdateCmd_S {
        bottomCard: number[];
        num: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 抢地主请求
     *  S-&gt;C 玩家抢地主通知
     */
    class LandlordRobCmd_CS {
        uid: number;
        /**
         * 抢 还是 不抢
         */
        yesOrNo: boolean;
        GetType(): string;
    }
    /**
     *  C-&gt;S 叫地主请求
     *  S-&gt;C 玩家叫地主通知
     */
    class LandlordCallCmd_CS {
        uid: number;
        point: number;
        /**
         * 补发
         */
        isReplenish: boolean;
        GetType(): string;
    }
    /**
     * 轮到玩家抢/叫地主通知
     */
    class LandlordOptionCmd_S {
        uid: number;
        /**
         * 操作结束时间
         */
        endTime: number;
        /**
         * 倒计时秒数
         */
        leftSec: number;
        /**
         * 可操作列表
         */
        opList: Operation[];
        GetType(): string;
    }
    /**
     * 产生地主通知
     */
    class LandlordUpdateCmd_S {
        /**
         * 地主
         */
        uid: number;
        /**
         * 三张底牌
         */
        threeCard: number[];
        /**
         * 抢注倍数
         */
        point: number;
        GetType(): string;
    }
    /**
     * 底分更新通知
     */
    class PointBaseUpdateCmd_S {
        pointBase: number;
        GetType(): string;
    }
    /**
     * 游戏数字
     */
    class GameNumber {
        typ: GameNumber.Type;
        value: number;
        GetType(): string;
    }
    module GameNumber {
        enum Type {
            /**
             * 底分
             */
            PointBase = 1,
            /**
             * 底注
             */
            PointBottom = 2,
            /**
             * 锅底分
             */
            Pan = 3,
            /**
             * 底池
             */
            Pool = 4,
        }
    }
    /**
     * 数字更新
     */
    class GameNumberUpdateCmd_S {
        number: GameNumber[];
        GetType(): string;
    }
    /**
     *  轮到玩家抢地主通知
     *  废弃，随后删除，请使用 LandlordOptionCmd_S
     */
    class LandlordRobOptionCmd_S {
        uid: number;
        /**
         * 操作结束时间
         */
        endTime: number;
        /**
         * 倒计时秒数
         */
        leftSec: number;
        GetType(): string;
    }
    /**
     * 轮到玩家 踢 操作
     */
    class KickPlayOptionalCmd_S {
        uid: number;
        endTime: number;
        /**
         * 倒计时秒数
         */
        leftSec: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 踢 操作请求
     *  S-&gt;C 踢 操作通知
     */
    class KickPlayCmd_CS {
        uid: number;
        yesOrNo: boolean;
        GetType(): string;
    }
    /**
     * 倍数更新
     */
    class MultipleUpdateCmd_S {
        update: MultipleUpdateCmd_S.Update[];
        /**
         * 废弃
         */
        multiple: number;
        GetType(): string;
    }
    module MultipleUpdateCmd_S {
        class Update {
            seatId: number;
            multiple: number;
            GetType(): string;
        }
    }
    /**
     * 游戏对象
     */
    class GameObjectData {
        /**
         * 门id
         */
        doorId: number;
        user: UserBriefInfo;
        /**
         * 第几局, 排名
         */
        order: number;
        /**
         * 牌
         */
        cardList: number[];
        /**
         * 牌型
         */
        cardType: CardSetType;
        /**
         * 现在的分数
         */
        point: number;
        /**
         * 利润
         */
        profit: number;
        /**
         * 倍数
         */
        multiple: number;
        /**
         * 关键牌
         */
        keyCard: number[];
        honorId: number[];
        /**
         * 手牌点数
         */
        kengPoint: KengPoint;
        betResult: BetResult;
        /**
         * 牌集列表
         */
        cardSetList: CardSetList[];
        /**
         * 创建时间
         */
        createdAt: number;
        /**
         * 消息
         */
        msg: string;
        /**
         * 职位
         */
        post: number;
        clubId: number;
        /**
         * 押注数据统计
         */
        statistics: Cmd.StatisticsRoundData;
        sum: number;
        /**
         * 每个池赢得的筹码
         */
        potWin: DoorChips[];
        /**
         * 牌集
         */
        cardSet: CardSetList;
        seatId: number;
        /**
         * 可操作列表
         */
        opList: Operation[];
        /**
         * 押注
         */
        act: Action;
        /**
         * 是否漂
         */
        piao: boolean;
        /**
         * 是否报胡
         */
        bao: boolean;
        happyPoint: number;
        /**
         * 级别
         */
        level: number;
        itemList: Cmd.History.HistoryInfo[];
        honor: GameHonor;
        middleComparePoint: number;
        GetType(): string;
    }
    class BetResult {
        /**
         * 数位押注数
         */
        digitBetChipsList: number[];
        /**
         * 数位押注利润
         */
        digitProfitList: number[];
        /**
         * 合数押注数
         */
        sumBetChipsTotal: number;
        /**
         * 合数押注利润
         */
        sumProfitTotal: number;
        GetType(): string;
    }
    /**
     * 牌局结束后结算通知
     */
    class RoundResultCmd_S {
        resultList: GameObjectData[];
        /**
         * 地主id
         */
        landlord: number;
        /**
         * 赢家
         */
        winnerList: number[];
        /**
         * 庄家数据
         */
        bankerData: GameObjectData;
        /**
         * 4个门 数据
         */
        doorsData: GameObjectData[];
        /**
         * 自己的数据
         */
        myData: GameObjectData;
        /**
         * 四个门的输赢
         */
        winLose: number;
        /**
         * 荣誉
         */
        honor: GameHonor[];
        /**
         * 本期彩票数据
         */
        lottery: Cmd.Lottery;
        /**
         * 下期彩票
         */
        lotteryNext: Cmd.Lottery;
        /**
         * 是否还有下一局
         */
        haveNextRound: boolean;
        /**
         * 二人斗地主用,未发下去的底牌
         */
        otherCardList: number[];
        /**
         * 喜分（填坑）
         */
        happyPoint: number;
        /**
         * 是否是断线重连后补发的消息
         */
        isReplenish: boolean;
        /**
         * 同比分
         */
        eachCompare: GameObjectData[];
        /**
         * 结算面板显示切锅按钮
         */
        showCutPot: number;
        /**
         * 牌九标记爆锅
         */
        explodePot: number;
        /**
         * 一圈数据
         */
        circleEnd: CircleEndCmd_S;
        GetType(): string;
    }
    /**
     *  C-&gt;S 获取观众信息
     *  S-&gt;C 通知观众信息
     */
    class AudienceUpdateCmd_CS {
        roomId: number;
        audienceList: Cmd.UserBaseInfo[];
        leftSec: number;
        GetType(): string;
    }
    /**
     * 房间最后的结算通知
     */
    class FinalResult_S {
        recordList: FinalResult_S.Record[];
        /**
         * 大赢家
         */
        userWinMost: number;
        /**
         * 游戏总局数
         */
        gameNum: number;
        /**
         * 解散原因
         */
        reason: string;
        /**
         * 总结算新老逻辑标识 有表示新版本 没有表示老版本
         */
        isNew: number;
        /**
         * 如果是匹配号房间,显示出匹配号
         */
        matchId: number;
        /**
         * 喜分（填坑）
         */
        happyPoint: number;
        /**
         * 德扑
         */
        texas: StatisticsRoomData;
        GetType(): string;
    }
    module FinalResult_S {
        class Record {
            user: UserBriefInfo;
            /**
             * 每一局数据
             */
            resultList: GameObjectData[];
            /**
             * 总利润
             */
            profitSum: number;
            /**
             * 最大利润
             */
            profitMax: number;
            /**
             * 赢局数
             */
            winNum: number;
            /**
             * 赢局数
             */
            gameNum: number;
            /**
             * 坐庄数
             */
            bankerNum: number;
            /**
             * 炸弹数量
             */
            bombNum: number;
            /**
             * 最好牌型
             */
            bestCardType: CardSetType;
            /**
             * 红包 没有红包为空
             */
            redpack: number;
            totalInfo: GameObjectData[];
            GetType(): string;
        }
    }
    /**
     *  gm指令
     *  C-&gt;S 获取所有可选牌
     *  S-&gt;C 所有可选牌更新
     */
    class GmAvailableCardUpdateCmd_CS {
        /**
         * 所有可选的牌
         */
        cardList: number[];
        /**
         *  废弃, 建议使用 select 字段代替
         *  每个座位已经选的牌
         */
        seatSelect: GmAvailableCardUpdateCmd_CS.SeatSelectData[];
        roomId: number;
        /**
         * 每个座位已经选的牌
         */
        seatCardList: GameObjectData[];
        /**
         * 底牌
         */
        board: number[];
        GetType(): string;
    }
    module GmAvailableCardUpdateCmd_CS {
        class SeatSelectData {
            seatId: number;
            /**
             * 所选的牌
             */
            selectCard: number[];
            GetType(): string;
        }
    }
    /**
     *  gm指令
     *  选牌请求
     */
    class GmSelectCardCmd_C {
        cardList: number[];
        roomId: number;
        /**
         * 每个座位已经选的牌
         */
        seatCardList: GameObjectData[];
        /**
         * 底牌
         */
        board: number[];
        GetType(): string;
    }
    /**
     *  gm指令
     *  结束牌局请求
     */
    class GmFinishRoundCmd_C {
        GetType(): string;
    }
    /**
     *  gm指令
     *  通用gm指令
     */
    class GmCommandCmd_C {
        /**
         *  字符串的json字段由前后端自由约定
         *  例如: {&quot;do&quot;:&quot;RaiseBring&quot;, &quot;num&quot;:10000, &quot;roomId&quot;:111111, &quot;uid&quot;:123321}
         *  玩家(uid:123321)在房间(roomId:111111)带入(do:RaiseBring)筹码10000
         *  json 字符串
         */
        command: string;
        GetType(): string;
    }
    /**
     * 数位投注
     */
    class DigitChips {
        /**
         * 数位, 个位
         */
        digit: DigitChips.Digit;
        /**
         * 数字
         */
        number: number;
        /**
         * 投注数
         */
        chips: number;
        GetType(): string;
    }
    module DigitChips {
        /**
         * 数位
         */
        enum Digit {
            One = 1,
            Ten = 2,
            Hundred = 3,
            Thousand = 4,
        }
    }
    /**
     *  C-&gt;S 压注请求
     *  S-&gt;C 压注通知
     */
    class BetRoomCmd_CS {
        bet: DoorChips;
        uid: number;
        /**
         * 筹码
         */
        chip: number;
        /**
         * 操作类型
         */
        opType: Operation;
        betDigit: DigitChips;
        betSum: DoorChips;
        betNumber: DoorChips;
        circle: number;
        actList: Action[];
        act: Action;
        roomId: number;
        /**
         * 子弹信息
         */
        bulletinfo: BulletInfo;
        GetType(): string;
    }
    /**
     * /////////////////十点半 服务费刷新协议
     */
    class RefreshMoney_S {
        pointSet: pointSet[];
        GetType(): string;
    }
    /**
     * 每个玩家信息
     */
    class pointSet {
        /**
         * 用户id
         */
        uid: number;
        /**
         * 分数
         */
        point: number;
        /**
         * 位置ID
         */
        seatId: number;
        GetType(): string;
    }
    /**
     * 动作
     */
    class Action {
        uid: number;
        op: Operation;
        /**
         * 增加的筹码
         */
        chipsAdd: number;
        /**
         * 剩余筹码
         */
        chipsLeft: number;
        /**
         * 总押注
         */
        chipsBet: number;
        /**
         * 总底池
         */
        sumPot: number;
        chips: number;
        id: number;
        /**
         * 1天2地3玄4黄 1大2小3单4双
         */
        doorId: number;
        timestamp: number;
        yesOrNo: boolean;
        cardSetList: CardSetList;
        userList: GameObjectData[];
        value: number;
        GetType(): string;
    }
    /**
     * 更新可以进行的动作
     */
    class UpdateActionCmd_S {
        actList: Action[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 玩家进行操作请求
     *  S-&gt;C 玩家进行操作通知
     */
    class UserActionCmd_CS {
        act: Action;
        GetType(): string;
    }
    /**
     *  C-&gt;S 操作延时请求
     *  S-&gt;C 操作延时通知
     */
    class BetDelayCmd_C {
        roomId: number;
        GetType(): string;
    }
    /**
     * 押注数据
     */
    class BetData {
        betNumber: DoorChips[];
        betDigit: DigitData;
        betSum: DoorChips[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 看牌请求
     *  S-&gt;C 看牌通知
     */
    class CheckCardCmd_CS {
        cardList: number[];
        uid: number;
        GetType(): string;
    }
    /**
     * 门筹码更新 废弃 用BetUpdateCmd_S代替
     */
    class DoorUpdataCmd_S {
        DoorChips: DoorChips[];
        GetType(): string;
    }
    /**
     * 数位押注的数据
     */
    class DigitData {
        /**
         * 个位押注数
         */
        one: DigitChips[];
        /**
         * 十位
         */
        ten: DigitChips[];
        /**
         * 百位
         */
        hundred: DigitChips[];
        /**
         * 千位
         */
        thousand: DigitChips[];
        GetType(): string;
    }
    /**
     * 压注数更新
     */
    class BetUpdateCmd_S {
        betData: BetData;
        GetType(): string;
    }
    /**
     * 上庄请求
     */
    class BankerUpCmd_C {
        GetType(): string;
    }
    /**
     * 下庄请求
     */
    class BankerDownCmd_C {
        GetType(): string;
    }
    /**
     * 上庄列表更新
     */
    class BankerWaitListUpdateCmd_S {
        op: Cmd.UpdateOperator;
        waitList: UserBriefInfo[];
        GetType(): string;
    }
    /**
     * 更新庄家信息
     */
    class BankerUpdateCmd_S {
        /**
         * 庄家信息
         */
        banker: UserBriefInfo;
        /**
         * 连庄局数
         */
        continueNum: number;
        /**
         * 庄家更新类型
         */
        continueOrChange: boolean;
        GetType(): string;
    }
    /**
     * 随机显示一组牌
     */
    class ShowRandomCardCmd_S {
        list: CardSetList;
        GetType(): string;
    }
    /**
     * 货币更新通知
     */
    class MoneyUpdateCmd_S {
        /**
         * 玩家身上的钱
         */
        update: MoneyUpdateCmd_S.Update[];
        /**
         * 桌子上的钱
         */
        moneyData: Cmd.StatisticsRoundData[];
        GetType(): string;
    }
    module MoneyUpdateCmd_S {
        class Update {
            money: MoneyType;
            /**
             * 总贡献分
             */
            num: number;
            uid: number;
            /**
             * 每次出炸弹的贡献分
             */
            bombPoint: number;
            GetType(): string;
        }
    }
    /**
     *  C-&gt;S 请求历史数据
     *  S-&gt;C 历史数据更新
     */
    class HistoryUpdateCmd_CS {
        /**
         * 需要数据的开始索引
         */
        index: number;
        /**
         * 需要的数量
         */
        num: number;
        globalRoomId: number;
        history: Cmd.History;
        /**
         * 第几局
         */
        roundNo: number;
        items: GameObjectData[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 坐下请求
     *  S-&gt;C 坐下通知
     */
    class SitDownCmd_CS {
        uid: number;
        seatId: number;
        roomId: number;
        GetType(): string;
    }
    /**
     * 坐起请求
     */
    class SitUpCmd_C {
        roomId: number;
        GetType(): string;
    }
    /**
     * 强制站起
     */
    class SitUpForceCmd_C {
        roomId: number;
        uid: number;
        GetType(): string;
    }
    /**
     * 开始游戏操作位更新
     */
    class StartGameOpIdUpdate_S {
        /**
         * 谁来控制开始游戏操作
         */
        startGameOpId: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求亮牌
     *  S-&gt;C 请求亮牌通知
     */
    class ShowMyCardUpdateCmd_CS {
        roomId: number;
        cardList: number[];
        GetType(): string;
    }
    /**
     * 通知客户端显示具体的牌
     */
    class ShowCards_S {
        cards: ShowCards_S.Cards[];
        GetType(): string;
    }
    module ShowCards_S {
        class Cards {
            uid: number;
            cards: number[];
            GetType(): string;
        }
    }
    class NiuNiuCard {
        /**
         * 牌id
         */
        id: number;
        /**
         * 剩余数量
         */
        num: number;
        GetType(): string;
    }
    /**
     * 牛牛缺牌数量
     */
    class NeedNiuNiuCard_S {
        /**
         * 一共还有几张可组成的牛牛牌
         */
        allnum: number;
        /**
         * 剩余牛牛牌数量
         */
        cards: NiuNiuCard[];
        GetType(): string;
    }
    /**
     * 加牌请求
     */
    class CatchCardCmd_C {
        /**
         * 是否需要
         */
        isNeed: boolean;
        GetType(): string;
    }
    /**
     * 进入桌子
     */
    class EnterDeskCmd_CS {
        GetType(): string;
    }
    /**
     * 获取游戏数据
     */
    class GameDataUpdateCmd_C {
        GetType(): string;
    }
    /**
     *  C-&gt;S 比牌请求
     *  S-&gt;C 比牌通知
     */
    class CompareCardCmd_CS {
        win: PlayCardInfo;
        lose: PlayCardInfo;
        GetType(): string;
    }
    /**
     * 升盲通知
     */
    class RiseBlindCmd_S {
        smallBlind: number;
        leftSec: number;
        GetType(): string;
    }
    /**
     * 押注圈结束
     */
    class CircleEndCmd_S {
        /**
         * 分池
         */
        devidePot: number[];
        /**
         * 底牌
         */
        bottomCard: number[];
        GetType(): string;
    }
    /**
     * 保险阶段开始
     */
    class InsuranceStartCmd_S {
        /**
         * 每个座位的牌
         */
        seatCardList: SeatData[];
        circleEnd: CircleEndCmd_S;
        GetType(): string;
    }
    class InsuranceData {
        leftSec: number;
        /**
         * 操作信息
         */
        buyList: InsuranceData.Record[];
        /**
         * 已经买过的
         */
        buyDone: InsuranceData.Record[];
        GetType(): string;
    }
    module InsuranceData {
        class Record {
            /**
             * 池
             */
            potId: number;
            /**
             * outs 列表
             */
            outs: number[];
            /**
             * 赔率
             */
            odds: number;
            /**
             * 池的筹码
             */
            potChips: number;
            /**
             * 半池
             */
            halfPot: number;
            /**
             * 满池
             */
            fullPot: number;
            /**
             * 保本
             */
            breakEven: number;
            /**
             * 最少买入
             */
            least: number;
            /**
             * 买入数量
             */
            chips: number;
            seatId: number;
            GetType(): string;
        }
    }
    /**
     * 保险可购买通知
     */
    class InsuranceNewOpCmd_S {
        op: InsuranceData;
        GetType(): string;
    }
    /**
     *  C-&gt;S 买入保险请求
     *  S-&gt;C 买入保险通知
     */
    class InsuranceBuyCmd_CS {
        /**
         * 操作信息 客户端接受的时候第一个元素是总买入信息
         */
        buyList: InsuranceData.Record[];
        roomId: number;
        GetType(): string;
    }
    /**
     * 购买保险结束
     */
    class InsuranceBuyEndCmd_S {
        GetType(): string;
    }
    class TagData {
        /**
         * 颜色
         */
        color: number;
        /**
         * 备注
         */
        notes: string;
        /**
         * 玩家信息
         */
        user: Cmd.UserBaseInfo[];
        GetType(): string;
    }
    /**
     * 标签更新
     */
    class TagUpdateCmd_CS {
        /**
         * 操作类型
         */
        op: Cmd.UpdateOperator;
        tag: TagData;
        GetType(): string;
    }
    /**
     * 标签查询
     */
    class TagListCmd_CS {
        /**
         * 标签列表
         */
        tagList: TagData[];
        GetType(): string;
    }
    /**
     * 标记标签
     */
    class TagUserCmd_CS {
        /**
         * 操作类型
         */
        op: Cmd.UpdateOperator;
        tag: TagData;
        /**
         * 替换成为 标签类型
         */
        color: number;
        GetType(): string;
    }
    /**
     * 房间数据
     */
    class StatisticsRoomData {
        /**
         * 房间配置
         */
        config: Cmd.TexasConfig;
        /**
         * 榜单 0 mvp|冠军 1 大鱼|泡沫 2 土豪|酱油
         */
        topList: number[];
        /**
         * 金钱数据
         */
        userList: Cmd.StatisticsRoundData[];
        /**
         * 总数据
         */
        sum: Cmd.StatisticsRoundData;
        /**
         * RoundRecord 的 id, 辅助查询玩家战绩, 用来做查询条件
         */
        id: number;
        honorList: RecordLable[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求玩家牌局押注数据统计
     *  S-&gt;C 通知玩家牌局押注数据统计
     */
    class StatisticsRoundQueryCmd_CS {
        rows: Cmd.StatisticsRoundData[];
        uid: number;
        regulation: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求玩家牌局标签
     *  S-&gt;C 通知玩家牌局标签
     */
    class StatisticsRoomLabelQueryCmd_CS {
        filter: Cmd.FilterInfo;
        rows: Cmd.TexasConfig[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求房间结算数据
     *  S-&gt;C 通知房间结算数据
     */
    class StatisticsRoomDataCheckCmd_CS {
        globalRoomId: number;
        roomdata: StatisticsRoomData;
        GetType(): string;
    }
    /**
     * 牌谱详情
     */
    class RoundRecord {
        /**
         * 每圈的记录
         */
        circleList: RoundRecord.CircleInfo[];
        /**
         * 玩家列表
         */
        userList: GameObjectData[];
        config: TexasRoundInfo;
        /**
         * 第几局
         */
        roundNo: number;
        id: number;
        GetType(): string;
    }
    module RoundRecord {
        class CircleInfo {
            circle: number;
            /**
             * 池中总筹码数
             */
            sumPot: number;
            /**
             * 剩余人数
             */
            num: number;
            /**
             * 底牌
             */
            board: number[];
            /**
             * 押注记录
             */
            actList: Action[];
            GetType(): string;
        }
    }
    /**
     * 牌谱标签
     */
    class RecordLable {
        profitWinner: number;
        profitMe: number;
        /**
         * 第几局
         */
        roundNo: number;
        /**
         * 1、比牌赢，0、其他玩家弃牌赢
         */
        winType: number;
        /**
         * 赢家姓名
         */
        winnerName: string;
        /**
         * 赢的牌型
         */
        cardType: CardSetType;
        /**
         * 赢家数量
         */
        winnerNum: number;
        /**
         * 我的手牌
         */
        handCardList: number[];
        user: Cmd.UserBaseInfo;
        globalRoomId: number;
        smallBlind: number;
        /**
         * 牌谱id
         */
        id: number;
        honor: GameHonor;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求房间牌谱列表
     *  S-&gt;C 请求房间牌谱回复
     */
    class RoundRecordRoomQueryCmd_CS {
        rows: RecordLable[];
        filter: Cmd.FilterInfo;
        GetType(): string;
    }
    /**
     *  C-&gt;S 查看牌谱请求
     *  S-&gt;C 查看牌谱回复
     */
    class RoundRecordCheckCmd_CS {
        globalRoomId: number;
        /**
         * 第几局
         */
        roundNo: number;
        record: RoundRecord;
        num: number;
        GetType(): string;
    }
    /**
     * 牌谱id
     */
    class RoundRecordIdUpdateCmd_CS {
        globalRoomId: number;
        collect: number[];
        op: Cmd.UpdateOperator;
        GetType(): string;
    }
    /**
     * 收藏/取消牌谱
     */
    class RoundRecordCollectCmd_CS {
        id: number;
        yesOrNo: boolean;
        GetType(): string;
    }
    /**
     * 查看我收藏的牌谱
     */
    class RoundRecordQueryMyCmd_CS {
        curPage: number;
        perPage: number;
        rows: RecordLable[];
        filter: Cmd.FilterInfo;
        GetType(): string;
    }
    /**
     * 德扑创建房间
     */
    class RoomCreateCmd_C {
        config: Cmd.TexasConfig;
        GetType(): string;
    }
    /**
     *  C-&gt;S 创建房间选项更新请求
     *  S-&gt;C 创建房间选项更新通知
     */
    class RoomCreateConfigUpdateCmd_CS {
        op: Cmd.UpdateOperator;
        configList: Cmd.TexasConfig[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 购买记分牌请求
     *  S-&gt;C 购买记分牌结果
     */
    class RoomBuyBringCmd_CS {
        chips: number;
        roomId: number;
        seatId: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 购买记分牌信息请求
     *  S-&gt;C 购买记分牌通知
     */
    class RoomBuyBringInfoRequestCmd_CS {
        /**
         * 最少买入
         */
        bringMin: number;
        /**
         * 最大买入
         */
        bringMax: number;
        /**
         * 平台费
         */
        platFeeRate: number;
        roomId: number;
        seatId: number;
        /**
         * 俱乐部基金支付平台费
         */
        clubFundPlatFee: boolean;
        GetType(): string;
    }
    /**
     *  C-&gt;S 房间内所有玩家的金钱统计请求
     *  S-&gt;C 房间内所有玩家的金钱统计更新
     */
    class RoomMoneyDataUpdateCmd_CS {
        roomId: number;
        rows: Cmd.StatisticsRoundData[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求是否有新的牌局消息
     *  S-&gt;C 有新的牌局消息通知
     */
    class GameMessageNotifyUpdateCmd_CS {
        yesOrNo: boolean;
        GetType(): string;
    }
    /**
     * 牌局消息
     */
    class GameMessage {
        type: GameMessage.Type;
        config: Cmd.TexasConfig;
        itemList: GameMessage.Item[];
        GetType(): string;
    }
    module GameMessage {
        enum Type {
            /**
             * 买入
             */
            BuyBring = 1000,
            /**
             * 报名
             */
            SignUp = 1001,
        }
    }
    module GameMessage {
        class Item {
            user: Cmd.UserBaseInfo;
            num: number;
            GetType(): string;
        }
    }
    /**
     *  C-&gt;S 请求牌局消息
     *  S-&gt;C 新的牌局消息通知
     */
    class GameMessageUpdateCmd_CS {
        op: Cmd.UpdateOperator;
        rows: GameMessage[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 牌局消息处理请求
     *  S-&gt;C 牌局消息处理通知
     */
    class GameMessageDealCmd_CS {
        roomId: number;
        uid: number;
        yesOrNo: boolean;
        leftSec: number;
        gameId: number;
        zoneId: number;
        GetType(): string;
    }
    /**
     * 我的牌局
     */
    class MyGamesUpdateCmd_CS {
        op: Cmd.UpdateOperator;
        /**
         * 我加入的
         */
        game: Cmd.TexasConfig[];
        /**
         * 俱乐部的
         */
        clubRoomList: Cmd.TexasConfig[];
        GetType(): string;
    }
    /**
     * 报名请求
     */
    class SignUpdateCmd_C {
        roomId: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求报名列表
     *  S-&gt;C 报名列表更新
     */
    class SignListUpdateCmd_CS {
        roomId: number;
        my: number[];
        op: Cmd.UpdateOperator;
        signList: Cmd.UserBaseInfo[];
        GetType(): string;
    }
    /**
     * 进入报名界面通知
     */
    class SignEnterCmd_S {
        game: Cmd.TexasConfig;
        signList: Cmd.UserBaseInfo[];
        /**
         * 是否等待房主审批
         */
        wait: boolean;
        GetType(): string;
    }
    /**
     *  C-&gt;S 玩法更新请求
     *  S-&gt;C 玩法更新通知
     */
    class PlayingUpdateCmd_CS {
        op: Cmd.UpdateOperator;
        playList: Cmd.Playing[];
        roomId: number;
        GetType(): string;
    }
    /**
     * 强制盲位更新
     */
    class StraddleIdUpdateCmd_S {
        op: Cmd.UpdateOperator;
        seatId: number;
        GetType(): string;
    }
    /**
     * 玩家简单信息
     */
    class UserBriefInfo {
        uid: number;
        name: string;
        headurl: string;
        point: number;
        gender: string;
        diamond: number;
        ip: string;
        nickname: string;
        isRobot: boolean;
        GetType(): string;
    }
    /**
     * 同比
     */
    class EachCompareCmd_S {
        eachCompare: GameObjectData[];
        GetType(): string;
    }
    /**
     * 排行榜
     */
    class RankingListCmd_CS {
        /**
         * 日赢收排行
         */
        dayWinRank: Cmd.RankInfo[];
        /**
         * 上一轮赢收排行
         */
        lastTimeWinRank: Cmd.RankInfo[];
        GetType(): string;
    }
    /**
     * 获取保单到邮箱
     */
    class GetPolicyToMail_C {
        policyOperationType: PolicyOperationType;
        /**
         * 期数
         */
        roundGroupId: number;
        /**
         * 邮件地址
         */
        emailAddress: string;
        GetType(): string;
    }
    /**
     * 结果统计
     */
    class StatisticsResult_CS {
        /**
         * 结果统计
         */
        statistics: StatisticsResult_CS.StatisticsResult;
        GetType(): string;
    }
    module StatisticsResult_CS {
        /**
         * 结果统计结构
         */
        class StatisticsResult {
            /**
             * 门id
             */
            id: number;
            /**
             * 开奖出现次数
             */
            resultSum: number;
            GetType(): string;
        }
    }
    /**
     * 客户端结算完成
     */
    class ClientSettleFinishCmd_C {
        /**
         * 获得奖励货币数量
         */
        awardPoint: number;
        GetType(): string;
    }
    /**
     * /////////////////////////////////////////////////////////////深圳掌娱-百乐坊 Begin/////////////////////////////////////////////
     */
    class ZyBaiLeFangGame_C {
        /**
         * 1需要之前开局结果，0不需要
         */
        needRoundResult: number;
        GetType(): string;
    }
    class ZyBaiLeFangGame_S {
        /**
         * 错误信息
         */
        response: string;
        /**
         * 当前序列ID
         */
        id: number;
        /**
         * 现在是序列里面第几局
         */
        idx: number;
        /**
         * 闲开牌数组(数组长度一般为2,需要博牌则为3) b 庄开牌数组(数组长度一般为2,需要博牌则为3) b 已经开局的结果(每个元素由三位组成.)
         */
        result: string;
        /**
         *  第1位:0闲赢 ，1庄赢 ，2和
         *  第2位:赢的点数(闲赢就是闲的点数，庄赢就是庄的点数，和就是和的点数)
         *  第3位:0无闲对无庄对，1闲对，2庄对，3闲对庄对；
         *  当前游戏状态 0:游戏暂停，1:游戏下注，2:停止下注，3:直接开牌(不需要咪牌的情况)，4:前四张牌咪牌，5:闲博牌咪牌，6:庄博牌咪牌，7:玩家结算状态
         */
        gameStatus: number;
        /**
         * 当前游戏状态剩余运行时间
         */
        statusTime: number;
        /**
         * 闲押注
         */
        wager1: number;
        /**
         * 闲对押注
         */
        wager2: number;
        /**
         * 和押注
         */
        wager3: number;
        /**
         * 庄对押注
         */
        wager4: number;
        /**
         * 庄押注
         */
        wager5: number;
        /**
         * 之前的牌局结果
         */
        roundResult: string;
        /**
         * 玩家人数
         */
        players: number;
        /**
         * 在线人数
         */
        online: number;
        GetType(): string;
    }
    /**
     * ///////////////////////////牌九流水//////////////////////////////////
     */
    class UserPoint {
        id: number;
        point: number;
        GetType(): string;
    }
    class PotPointSet {
        up: UserPoint[];
        GetType(): string;
    }
    class PaiGowGameWater_S {
        pps: PotPointSet[];
        GetType(): string;
    }
    class UpdatePJPointSeatRoom_S {
        uid: number;
        point: number;
        GetType(): string;
    }
    /**
     * 请求提示出牌
     */
    class OperatGameReq_C {
        GetType(): string;
    }
    /**
     * 返回提示出牌列表
     */
    class OperatGameReq_S {
        /**
         * 手牌
         */
        cardSet: number[];
        GetType(): string;
    }
    /**
     * ///////////////////////////捕鱼//////////////////////////////////
     *  子弹信息
     */
    class BulletInfo {
        /**
         * 子弹ID
         */
        id: number;
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 子弹消耗钱数
         */
        cost: number;
        /**
         * 子弹角度
         */
        angle: number;
        /**
         * 发射时间
         */
        fireTime: number;
        /**
         * 鱼的流水id
         */
        fishId: number;
        /**
         * 玩家金币
         */
        point: number;
        GetType(): string;
    }
    class Fish {
        /**
         * 鱼的流水id
         */
        id: number;
        /**
         * 模板id
         */
        templateId: number;
        offsetX: number;
        offsetY: number;
        /**
         * 鱼的技能
         */
        skill: FishSkillType;
        /**
         * 获得奖励
         */
        score: number;
        /**
         * 归属者
         */
        owner: number;
        GetType(): string;
    }
    /**
     * 单条鱼出鱼信息
     */
    class FishInfo {
        /**
         * fish
         */
        fishs: Fish[];
        /**
         * 路径id
         */
        pathId: string;
        /**
         * 出鱼时间
         */
        spawnTime: number;
        GetType(): string;
    }
    /**
     * 出鱼信息
     */
    class SpawnFishCmd_S {
        fishlist: FishInfo[];
        GetType(): string;
    }
    /**
     * 打死鱼信息
     */
    class DeadFishInfo {
        /**
         * 鱼id
         */
        id: number;
        /**
         * 基础倍数
         */
        multiple: number;
        /**
         * 获得奖励
         */
        score: number;
        GetType(): string;
    }
    /**
     * 打中鱼列表
     */
    class HitFish {
        /**
         * 用户ID
         */
        uid: number;
        /**
         * 子弹id
         */
        bid: number;
        /**
         * 打中列表
         */
        list: Fish[];
        /**
         * 1 爆炸
         */
        hitType: number;
        GetType(): string;
    }
    /**
     * 打中鱼列表
     */
    class HitFishCmd_CS {
        /**
         * 打中列表
         */
        list: HitFish[];
        GetType(): string;
    }
    /**
     * 打死列表
     */
    class DeadFish {
        /**
         * 用户ID
         */
        uid: number;
        /**
         * 子弹id
         */
        bid: number;
        /**
         * 打死列表
         */
        list: Fish[];
        GetType(): string;
    }
    /**
     * 打死列表
     */
    class DeadFishCmd_S {
        /**
         * 打死列表
         */
        list: DeadFish[];
        GetType(): string;
    }
    /**
     * 改变场景
     */
    class ChangeSceneCmd_S {
        /**
         * 场景id
         */
        sceneId: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 操作请求
     *  S-&gt;C 操作通知
     */
    class ActionCmd_CS {
        act: Action;
        GetType(): string;
    }
    /**
     * S-&gt;C 操作超时
     */
    class BetTimeoutRoomCmd_S {
        /**
         * 金币不足：1，超时：2
         */
        optype: number;
        GetType(): string;
    }
}
