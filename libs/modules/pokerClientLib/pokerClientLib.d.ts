/*!
 * PokerClientLib - d.ts for Description
 * @licence PokerClientLib - v0.0.0 (2018-08-01)
 * qq:1042933914 | Licence: gepan
 */
declare module table {
    /**
     * FILE: 红包.xlsx SHEET: 红包
     */
    class RedEnvelopeConfig {
        id: number;
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 玩家ID
         */
        uerId: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 红包局数控制表.xlsx SHEET: Sheet1 KEY: gameId
     */
    class RedEnvelopeControlconfig {
        /**
         * 序号
         */
        id: number;
        /**
         * 游戏
         */
        gameId: number;
        /**
         * 大厅
         */
        lobbyId: number;
        /**
         * 是否开启
         */
        isOpen: number;
        /**
         * 局数
         */
        times: number;
        /**
         * 提款金额
         */
        openLimit: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 红包开奖份额表.xlsx SHEET: 红包
     */
    class RedEnvelopeNumberConfig {
        id: number;
        /**
         * 金额
         */
        cost: number;
        /**
         * 数量
         */
        number: number;
        /**
         * 合计
         */
        total: number;
        /**
         * 大厅ID
         */
        lobbyId: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 关键资源表.xlsx SHEET: 关键资源表
     */
    class TableCoreResources {
        /**
         * 资源名
         */
        resName: string;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 创建房间选项.xlsx SHEET: 单个麻将设置 KEY: gameId
     */
    class TableCreateConfigList {
        /**
         * 序列
         */
        id: number;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 类型
         */
        typeList: number[];
        /**
         * 游戏名称
         */
        gameName: string;
        /**
         * 人数
         */
        baseUserNbr: number[];
        /**
         * 人数选择
         */
        userNbr: TableCreateConfigList.UserNbrItem[];
        /**
         * 进入门槛
         */
        enterLimit: TableCreateConfigList.EnterLimitItem[];
        /**
         * 建房门槛
         */
        createLimit: TableCreateConfigList.CreateLimitItem[];
        /**
         * 玩法选择
         */
        playType: TableCreateConfigList.PlayTypeItem[];
        /**
         * 默认玩法选择
         */
        defaltPlayType: number[];
        /**
         * 局数选择
         */
        gameNbr: TableCreateConfigList.GameNbrItem[];
        /**
         * 收费模式
         */
        payType: TableCreateConfigList.PayTypeItem[];
        /**
         * 房主小费
         */
        hostTip: TableCreateConfigList.HostTipItem[];
        /**
         * 时间选择
         */
        outTime: TableCreateConfigList.OutTimeItem[];
        /**
         * 是否开启
         */
        open: number;
        /**
         * 游戏分享标题
         */
        gameshareTitle: string;
        /**
         * 游戏分享内容
         */
        gameshareContent: string;
        /**
         * 输赢倍率
         */
        winBet: number;
        /**
         * 退出是否提示
         */
        hasExitTip: number;
        /**
         * 洗牌需要的轮数
         */
        resetCardsRoundGroupId: number;
        GetType(): string;
    }
    module TableCreateConfigList {
        class UserNbrItem {
            value: number;
            label: string;
        }
    }
    module TableCreateConfigList {
        class EnterLimitItem {
            moneyType: number;
            num: number;
            playTypeId: number;
        }
    }
    module TableCreateConfigList {
        class CreateLimitItem {
            moneyType: number;
            num: number;
        }
    }
    module TableCreateConfigList {
        class PlayTypeItem {
            label: string;
            idArr: number[];
        }
    }
    module TableCreateConfigList {
        class GameNbrItem {
            value: number;
            label: string;
        }
    }
    module TableCreateConfigList {
        class PayTypeItem {
            value: number;
            label: string;
        }
    }
    module TableCreateConfigList {
        class HostTipItem {
            value: number;
            label: string;
            tipValue: number;
        }
    }
    module TableCreateConfigList {
        class OutTimeItem {
            value: number;
            label: string;
        }
    }
}

declare module table {
    /**
     * FILE: 比赛场配置表.xlsx SHEET: Sheet1 KEY: id
     */
    class TableEventConfig {
        /**
         * 匹配号ID
         */
        id: number;
        /**
         * 比赛名称
         */
        name: string;
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 默认玩法选择
         */
        defaltPlayType: number[];
        /**
         * 是否开启
         */
        isOpen: number;
        /**
         * 比赛模式
         */
        mode: number;
        /**
         * 报名类型
         */
        joinType: number;
        /**
         * 报名费用
         */
        joinNum: number;
        /**
         * 局数选择
         */
        gameNbr: number;
        /**
         * 添加机器人
         */
        needRobot: number;
        /**
         * 超时时间
         */
        outTime: number;
        /**
         * 使用图标
         */
        icon: string;
        /**
         * 开启月
         */
        month: number[];
        /**
         * 开启周
         */
        week: number[];
        /**
         * 开启时间
         */
        sec: number;
        /**
         * 参赛人数
         */
        userNbr: number;
        /**
         * 开启描述
         */
        startDesc: string;
        /**
         * 第一名奖励
         */
        award: string;
        /**
         * 胜出比例
         */
        winRate: number;
        /**
         * Lua函数
         */
        func: string;
        /**
         * 分享标题
         */
        shareTitle: string;
        /**
         * 分享内容
         */
        shareContent: string;
        /**
         * 实发奖励
         */
        reward: TableEventConfig.RewardItem[];
        /**
         * 晋级匹配号ID
         */
        roundsID: number;
        GetType(): string;
    }
    module TableEventConfig {
        class RewardItem {
            order: number;
            rewardid: number;
            num: number;
        }
    }
}

declare module table {
    /**
     * FILE: 道具.xlsx SHEET: 兑换
     */
    class TableExchangeConfig {
        id: number;
        /**
         * 消耗物名称
         */
        priceName: string;
        /**
         * 消耗物描述
         */
        priceDescribe: string;
        /**
         * 消耗数量
         */
        price: number;
        /**
         * 兑换物名称
         */
        goodsName: string;
        /**
         * 兑换物描述
         */
        goodsDescribe: string;
        /**
         * 兑换数量
         */
        goods: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 游戏控制表.xlsx SHEET: Sheet1 KEY: gameId
     */
    class TableGameControl {
        /**
         * 序列
         */
        id: number;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 游戏名称
         */
        gameName: string;
        /**
         * 货币类型
         */
        moneyType: number;
        /**
         * 货币显示名称
         */
        moneyName: string;
        /**
         * 初始库存
         */
        stock: number;
        /**
         * 库存阈值
         */
        stockThreshold: number;
        /**
         * BOSS初始库存
         */
        stockBoss: number;
        /**
         * 纯利
         */
        profitPercent: number;
        /**
         * 彩金
         */
        bonusPercent: number;
        /**
         * 抽水
         */
        pumpPercent: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 道具与商城.xlsx SHEET: 道具
     */
    class TableGoodsConfig {
        /**
         * 序号
         */
        id: number;
        /**
         * ID
         */
        goodId: number;
        /**
         * 物品名称
         */
        goodName: string;
        /**
         * 物品类型
         */
        goodType: number;
        /**
         * 物品介绍
         */
        goodDesc: string;
        /**
         * 物品icon
         */
        goodIcon: string;
        /**
         * 显示
         */
        isShow: number;
        /**
         * 使用方式
         */
        useType: string;
        /**
         * 礼包配置
         */
        giftGoods: TableGoodsConfig.GiftGoodsItem[];
        /**
         * 出售价格
         */
        price: number;
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 审核
         */
        isSandbox: boolean;
        GetType(): string;
    }
    module TableGoodsConfig {
        class GiftGoodsItem {
            goodId: number;
            goodNbr: number;
        }
    }
}

declare module table {
    /**
     * FILE: 语言.xlsx SHEET: Sheet1
     */
    class TableLanguage {
        /**
         * 编号
         */
        code: number;
        /**
         * 中文
         */
        chinese: string;
        /**
         * 英文
         */
        english: string;
        /**
         * 中文繁体
         */
        chineseTraditional: string;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 创建房间选项.xlsx SHEET: 麻将大厅设置 KEY: id
     */
    class TableLobbyGameList {
        /**
         * 大厅ID
         */
        id: number;
        /**
         * 大厅类型
         */
        type: number;
        /**
         * 房间类型
         */
        roomType: number;
        /**
         * 是否开启
         */
        isOpen: number;
        /**
         * 俱乐部类型
         */
        clubType: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 首页
         */
        firstLoginPage: number;
        /**
         * 邀请码送金币
         */
        inviteChips: number;
        /**
         * 邀请码送钻
         */
        inviteDiamond: number;
        /**
         * 初始钻石
         */
        iniDiamond: number;
        /**
         * 红包金额
         */
        openLimit: number;
        /**
         * 初始房卡
         */
        iniRoomCard: number;
        /**
         * 初始金币
         */
        initChips: number;
        /**
         * 推荐返钻
         */
        returnDiamond: number;
        /**
         * 分享局数
         */
        minround: number;
        /**
         * 时时彩
         */
        EveryColorSanZhang: number;
        /**
         * 游戏选择
         */
        mahjongList: number[];
        /**
         * 练习场场次数据
         */
        exerciseList: TableLobbyGameList.ExerciseListItem[];
        /**
         * 商品
         */
        shopList: number[];
        /**
         * 练习场场次展示
         */
        exerciseLabelList: TableLobbyGameList.ExerciseLabelListItem[];
        /**
         * 大厅签到
         */
        sign: number[];
        /**
         * 免费游戏
         */
        freeList: number[];
        /**
         * 分享送钻
         */
        share: number[];
        /**
         * 分享标题
         */
        shareTitle: string;
        /**
         * 分享链接
         */
        newLink: string;
        /**
         * 分享icon
         */
        shareIcon: string;
        /**
         * 不要练习场
         */
        noPractice: number;
        /**
         * 练习场扣钻
         */
        pracFee: number;
        /**
         * 托管模式
         */
        autoMode: number;
        /**
         * 礼物付费
         */
        giftCost: number;
        /**
         * 分享头
         */
        shareFirst: string;
        /**
         * 分享内容
         */
        shareContent: string;
        /**
         * 邮件保存天数
         */
        mailSaveDays: number;
        GetType(): string;
    }
    module TableLobbyGameList {
        class ExerciseListItem {
            id: number;
            bet: number;
            type: number;
            cost: number;
            minLimit: number;
            maxLimit: number;
            gameList: TableLobbyGameList.ExerciseListItem.GameListItem[];
        }
    }
    module TableLobbyGameList {
        module ExerciseListItem {
            class GameListItem {
                gameid: number;
                id: number;
                cost: number;
                bet: number;
                type: number;
                maxLimit: number;
                minLimit: number;
            }
        }
    }
    module TableLobbyGameList {
        class ExerciseLabelListItem {
            id: number;
            name: string;
            bet: string;
            limit: string;
            gameList: TableLobbyGameList.ExerciseLabelListItem.GameListItem[];
        }
    }
    module TableLobbyGameList {
        module ExerciseLabelListItem {
            class GameListItem {
                gameid: number;
                id: number;
                name: string;
                bet: string;
                limit: string;
            }
        }
    }
}

declare module table {
    /**
     * FILE: 会员.xlsx SHEET: 会员 KEY: vipLevel
     */
    class TableMahjongVipConfig {
        /**
         * VIP等级
         */
        vipLevel: number;
        /**
         * 所需累冲钻石
         */
        diamond: number;
        /**
         * 免费场次
         */
        freeType: number[];
        /**
         * 充值优惠
         */
        discount: number;
        /**
         * 功能描述
         */
        desc: string[];
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 积分赛配置表.xlsx SHEET: Sheet1 KEY: id
     */
    class TableOfficalEventConfig {
        /**
         * 序号ID
         */
        id: number;
        /**
         * 名称
         */
        name: string;
        /**
         * 大厅
         */
        lobbyId: number;
        /**
         * 游戏
         */
        gameId: number[];
        /**
         * 扣钻
         */
        needDiamond: number;
        /**
         * 比赛标题
         */
        mailTitle: string;
        /**
         * 活动描述
         */
        desc: string;
        /**
         * 奖励物品
         */
        reward: TableOfficalEventConfig.RewardItem[];
        /**
         * 周奖
         */
        weekReward: TableOfficalEventConfig.WeekRewardItem[];
        /**
         * 月奖
         */
        monthReward: TableOfficalEventConfig.MonthRewardItem[];
        /**
         * 比赛级别
         */
        level: number;
        /**
         * 机器人数量
         */
        robotNum: number;
        /**
         * 机器人等级
         */
        robotLevel: number;
        /**
         * 积分奖励
         */
        integralReward: number;
        /**
         * 是否启用
         */
        isOpen: number;
        /**
         * 上桌积分
         */
        playedPoint: number;
        /**
         * 大赢家积分
         */
        bigWinPoint: number;
        GetType(): string;
    }
    module TableOfficalEventConfig {
        class RewardItem {
            order: number;
            rewardid: number;
            num: number;
        }
    }
    module TableOfficalEventConfig {
        class WeekRewardItem {
            order: number;
            rewardid: number;
            num: number;
        }
    }
    module TableOfficalEventConfig {
        class MonthRewardItem {
            order: number;
            rewardid: number;
            num: number;
        }
    }
}

declare module table {
    /**
     * FILE: 比赛奖励表.xlsx SHEET: Sheet1 KEY: id
     */
    class TableRewardItemConfig {
        /**
         * 序号
         */
        id: number;
        /**
         * 类型
         */
        type: number;
        /**
         * 名称
         */
        name: string;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 房费.xlsx SHEET: 房费
     */
    class TableRoomCostConfig {
        /**
         * 序号
         */
        id: number;
        /**
         * 人数
         */
        usernbr: number;
        /**
         * 局数
         */
        gamenbr: number;
        /**
         * 开房费用
         */
        diamondcost: number;
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 均摊费用
         */
        averdiamondcost: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 道具.xlsx SHEET: 商城
     */
    class TableShopConfig {
        /**
         * 序号
         */
        shopId: number;
        /**
         * 商城类型
         */
        shopType: number;
        /**
         * 物品
         */
        shopGoods: TableShopConfig.ShopGoodsItem;
        /**
         * 售价类别
         */
        priceType: number;
        /**
         * 售价
         */
        price: number;
        /**
         * 首充奖励
         */
        firstShopGoods: TableShopConfig.FirstShopGoodsItem;
        /**
         * 是否上架
         */
        onShelve: number;
        iconId: number;
        /**
         * 是否在商城显示
         */
        isShow: number;
        /**
         * 购买次数
         */
        buyNbr: number;
        iapppayId: number;
        /**
         * 商品ID
         */
        goodId: number;
        GetType(): string;
    }
    module TableShopConfig {
        /**
         * 物品
         */
        class ShopGoodsItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableShopConfig {
        /**
         * 首充奖励
         */
        class FirstShopGoodsItem {
            goodId: number;
            goodNbr: number;
        }
    }
}

declare module table {
    /**
     * FILE: 商城配置表.xlsx SHEET: Sheet1 KEY: id
     */
    class TableShopSetConfig {
        /**
         * 序号ID
         */
        id: number;
        /**
         * 名称
         */
        name: string;
        /**
         * 图标
         */
        icon: number;
        /**
         * 大厅
         */
        lobbyId: number;
        /**
         * 货币
         */
        moneyType: number;
        /**
         * 价格
         */
        cost: number;
        /**
         * 数量
         */
        number: number;
        /**
         * 启用
         */
        open: number;
        /**
         * 显示栏
         */
        displayColumn: number[];
        /**
         * 上市日期
         */
        Date: string;
        /**
         * 抽奖方式
         */
        luckyType: number;
        /**
         * 中奖概率
         */
        luckyProb: number;
        /**
         * 抽奖消耗
         */
        luckyCost: number;
        /**
         * 详情描述
         */
        desc: string;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 比赛场配置表.xlsx SHEET: 德扑SNG KEY: id*0xFF + userNum
     */
    class TableTexasSNG {
        id: number;
        /**
         * 人数
         */
        userNum: number;
        /**
         * 报名费
         */
        entryFee: number;
        /**
         * 初始记分牌
         */
        initChips: number;
        /**
         * 涨盲时间
         */
        blindInterval: number;
        /**
         * 奖金
         */
        reward: number[];
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: gameList.xlsx SHEET: gameList
     */
    class gameList {
        id: number;
        gameId: number;
        gameDoc: string;
        gameName: string;
        gameDes: string;
        gameTag: string;
        gameTheme: string;
        gameResConfigUrl: string;
        gameResRoot: string;
        preLoad: string;
        gameCodeUrl: string;
        gameIconUrl: string;
        gameIconUrl_gxpj: string;
        gameShareUrl: string;
        markIconUrl: string;
        selectScene: number;
        /**
         * 包大小
         */
        gameSize: string;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 扑克表.xlsx SHEET: Sheet1 KEY: thisId
     */
    class TablePokerCard {
        baseId: number;
        thisId: number;
        name: string;
        suit: number;
        icon: number;
        point: number;
        pairId: number;
        noCard: boolean;
        GetType(): string;
    }
}

declare module GX {
    /**
     * 头像管理
     */
    class AvatarManager {
        /**
         * 缓存模式
         */
        static cache: boolean;
        /**
         * 缓存头像列表
         */
        private static avatarList;
        /**
         * 正在加载的资源 防止同一资源多次下载
         */
        private static loading;
        /**
         * 加载头像资源
         */
        static read(url: string, loadComplete: (data: any, url: string) => void, thisObject: any, style?: RESStyle): void;
    }
}

declare module GX {
    /**
     * 可记录调用"this"的函数代理
     */
    class SinglecastEvent {
        action: Function;
        self: any;
        constructor(action?: Function, self?: any);
        call(...argArray: any[]): any;
        apply(argArray?: any): any;
    }
    /**
     * 记录所有的挂载事件
     */
    class Event {
        private eventList;
        add(multicase: MulticastEvent): void;
        clear(): void;
        /**
         * 兼容老游戏  游戏端不需要调用此方发
         */
        removeAll(): void;
        removeAllEvent(): void;
    }
    /**
     * 多播事件
     */
    class MulticastEvent {
        static EventList: Event;
        private list;
        constructor();
        call(...argArray: any[]): any;
        apply(argArray?: any): void;
        /**
         * 挂载事件回调
         * @param action
         * @return 返回挂载的事件回调函数本身，方便lambda挂载结果记录以供移除
         */
        add(action: Function, thisArg?: any): Function;
        /**
         * 卸载事件回调
         * @param action
         * @param thisArg
         * @return 卸载成功，false表示该事件中并不包含给定的回调
         */
        remove(action: Function, thisArg?: any): boolean;
        /**
         * 卸载所有以指定对象作为调用this的回调函数
         */
        removeOn(thisArg: any): number;
        /**
         * 卸载所有挂载的事件
         */
        removeAll(): void;
        /**
         * 得到事件中包含的回调数目
         */
        length: number;
    }
}

interface Array<T> {
    /**
     * 得到数组中符合谓词要求的第一个值，谓词无效时返回数组第一个元素
     */
    first(callbackfn?: (value: T, index: number, array: T[]) => boolean): T;
    /**
     * 得到数组中符合谓词要求的最后一个值，谓词无效时返回数组最后一个元素
     */
    last(callbackfn?: (value: T, index: number, array: T[]) => boolean): T;
    /**
     * 从数组中随机返回一个元素
     */
    random(): T;
    /**
     * 从数组中删除指定的元素
     */
    remove(value: T, fromIndex?: number): boolean;
    /**
     * 从数组中删除指定下标的元素
     */
    removeAt(index: number): boolean;
    /**
     * 从数组中删除符合条件的第一个元素
     */
    removeFirst(predicate: (value: T, index: number) => boolean, fromIndex?: number): boolean;
    /**
     * 从数组中删除符合条件的所有元素
     */
    removeAll(predicate: (value: T, index: number) => boolean, fromIndex?: number): number;
    /**
    * 返回去掉重复的数组
    */
    distinct(): any;
    /**
     * 清空数组
     */
    clear(): void;
    /**
     *深拷贝数组
     */
    clone(): T[];
    /**
     *返回从数组中符合条件的第一个元素的索引 若未找到返回-1
     */
    find(func?: Function): number;
    /**
     * 数组中是否存在符合条件的元素
     */
    seek(func?: Function): boolean;
    /**
     *返回从数组中最后一个元素
     */
    last(func?: Function): T;
    /**
     * 从数组中最后一个元素返回一个随机元素
     */
    random(): T;
    /**
     * 从数组中最后一个元素随机返回selectnum数量元素
     */
    randomItems(selectnum: any): Array<T>;
    /**
     * 翻转数组，但不影响原数组
    */
    reverse(): Array<T>;
}
interface ArrayConstructor {
    /**
     * 创建一个N维数组，按顺序指定其第1,2,3...维的长度
     */
    create(...dimensionLength: number[]): any;
}
interface Array<T> {
    seek(func?: Function): boolean;
}
interface Array<T> {
    first(func?: Function): T;
}
interface Array<T> {
    find(func?: Function): number;
}
interface Array<T> {
    deletefirst(func?: Function): number;
}
interface Array<T> {
    last(func?: Function): T;
}
interface Array<T> {
    random(): T;
}
interface Array<T> {
    randomItems(selectnum: any): Array<T>;
}
interface Array<T> {
    distinct(): any;
}
interface Array<T> {
    deepcopy(): any;
}

declare module GX {
    /**
     * 时间戳格式
     */
    enum TimeFormat {
        /**
         * Y-M-D H:M:S
         */
        ALL = 1,
        /**
         * H:M
         */
        HM = 2,
        /**
         * H:M:S
         */
        HMS = 3,
        /**
         * M:S
         */
        MS = 4,
    }
    /**
     * 资源风格
     */
    enum RESStyle {
        /**
         * 矩形
         */
        Rect = 1,
        /**
         * 圆形
         */
        Circular = 2,
        /**
         * 圆角矩形
         */
        RoundRect = 3,
    }
    /**
     * 字符串不是`undefined`、`null`或`""`
     */
    function stringIsNullOrEmpty(value: string): boolean;
    /**
     * @ref http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
     */
    function generateUUID(): string;
    function MD5(message: string): string;
    /**
     * @ref http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
     */
    function unixTimestamp(): number;
    /**
     * 得到扩展名，带“.”
     * @param path
     */
    function getExtension(path: string): string;
    /**
     * 得到路径，不带末尾“/”
     * @param path
     */
    function getDirectoryName(path: string): string;
    /**
     * 得到文件名，带扩展名
     * @param path
     */
    function getFileName(path: string): string;
    /**
     * 得到不带扩展名的文件名
     * @param path
     */
    function getFileNameWithoutExtension(path: string): string;
    /**
     * 是否是全路径
     * @param path
     */
    function isPathRooted(path: string): boolean;
    /**
     * 时间戳转换为字符串
     * format 参数可设置为
     */
    function timestampToString(time: number, format?: TimeFormat): string;
    /**
     * 【金额表示方法】：
     *1 - 10万（不含10万），不用单位
     *10万 - 1000万（不含1000万），用K
     *1000万及以上，用M
     *数字加千分号，保留2位小数
     */
    function GoldFormat(value: number): string;
    /**
     * 千位/拉克（十万）/克若尔（千万）分隔
     */
    function toEnInLocaleString(n: string): string;
    /**
     * value转化为num位小数的字符串
     */
    function numToFixed(value: number, num?: number): string;
    /**
     * 获取俩点的弧度
     */
    function getRadianByPoint(p1: {
        x: number;
        y: number;
    }, p2: {
        x: number;
        y: number;
    }): number;
    /**
     *获取俩点的距离
     */
    function getDistanceByPoint(p1: {
        x: number;
        y: number;
    }, p2: {
        x: number;
        y: number;
    }): number;
    /**
     * 通过角度获得弧度
     */
    function getRadian(angle: number): number;
    /**
     * 通过弧度获得角度
     */
    function getAngle(radian: number): number;
    /**
    *获取弧度所在的象限
     */
    function getQuadrantByRadian(radian: number): number;
    /**
     * 返回点和弧度生成的直线指向舞台边界反射后的点和弧度
     */
    function getBorderPoint(point: {
        x: number;
        y: number;
    }, angle: number): {
        x: number;
        y: number;
        angle: number;
    };
    /**
    *是否为json字符串
     */
    function isJsonString(str: any): boolean;
}

interface Math {
    /**
     * 得到[min, max)之间的浮点随机数
     */
    randomFloat(min: number, max: number): number;
    /**
     * 得到[min, max]之间的整数随机数，注意max值可以取到
     */
    randomInteger(min: number, max: number): number;
    /**
     * 限制value的值在[min,max]之间
     */
    clamp(value: number, min: number, max: number): number;
}
interface Math {
    randomInteger(min: any, max: any): number;
}
interface Math {
    randomIntegers(min: any, max: any, selectnum: any): Array<number>;
}
interface Math {
    boolFromPercentage(num: number): boolean;
}

interface Number {
    percentage(): number;
}

declare module GX {
    /**
     * 线性同余随机数生成器，因为js提供的api不支持种子，所以为了匹配Unity，另写一套
     */
    class Random {
        /**
         * 创建一个随机数生成器
         */
        constructor(seed: number);
        /**
         * 设置用于随机数生成器的种子，如果不设置则实际是取当前时间毫秒数
         */
        seed: number;
        /**
         * 返回一个随机数，在0.0～1.0之间
         */
        value: number;
        /**
         * 返回半径为1的圆内的一个随机点
         */
        insideUnitCircle: egret.Point;
        /**
         * 返回半径为1的圆边的一个随机点
         */
        onUnitCircle: egret.Point;
        /**
         * 返回一个在min和max之间的随机浮点数
         */
        range(min: number, max: number): number;
        /**
         * 设置用于随机数生成器的种子，如果不设置则实际是取当前时间毫秒数
         */
        static seed: number;
        /**
         * 返回一个随机数，在0.0～1.0之间
         */
        static value: number;
        /**
         * 返回半径为1的圆内的一个随机点
         */
        static insideUnitCircle: egret.Point;
        /**
         * 返回半径为1的圆边的一个随机点
         */
        static onUnitCircle: egret.Point;
        /**
         * 返回一个在min和max之间的随机浮点数
         */
        static range(min: number, max: number): number;
    }
}

interface String {
    /**
     * String.format(...replacements: string[]): string
     * @example "This is an {0} for {0} purposes: {1}".format("example", "end");
     * @ref http://stackoverflow.com/questions/20070158/string-format-not-work-in-typescrypt
     */
    format(...replacements: string[]): string;
    /**
     * 左填充，默认为空格填充
     */
    padLeft(totalWidth: number, paddingChar?: string): string;
    /**
     * 右填充，默认为空格填充
     */
    padRight(totalWidth: number, paddingChar?: string): string;
    /**
     * 确定此字符串实例的开头是否与指定的字符串匹配
     */
    startsWith(str: string): boolean;
    /**
     * 确定此字符串实例的结尾是否与指定的字符串匹配
     */
    endsWith(str: string): boolean;
    /**
     * 移除末尾空白
     */
    trimEnd(): string;
    /**
     * 移除起始空白
     */
    trimStart(): string;
}
interface String {
    padLeft(totalWidth: any, paddingChar: any): string;
}
interface String {
    PadHelper(totalWidth: any, paddingChar: any, isRightPadded: any): string;
}

declare module uniLib {
    module DragonUtils {
        /**
         * 创建龙骨对象 v>=5.0
         * 播放方式  dragonBones.EgretArmatureDisplay => animation.play
         * @param resName 资源简写名  如：(XXXX_ske_json,XXXX_tex_json,XXXX__tex_png)  resName值为XXXX
         * @param  armatureName 骨架名称  默认为"armatureName"
         */
        function createDragonBoneAnimation(resName: any, armatureName?: any): dragonBones.EgretArmatureDisplay;
    }
}
declare module GX {
    /**
     * 创建龙骨对象 v>=5.0
     * 播放方式  dragonBones.EgretArmatureDisplay => animation.play
     * @param resName 资源简写名  如：(XXXX_ske_json,XXXX_tex_json,XXXX__tex_png)  resName值为XXXX
     * @param  armatureName 骨架名称  默认为"armatureName"
     * @param  stageObj 绑定舞台对象
     * @param animationName - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
     * @param playTimes - 循环播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
     * @param first 创建后开始播放龙骨
     * @param interval 刷新龙骨频率  默认3帧刷新一次
     */
    function createUniDragon(resName: string, armatureName?: string, stageObj?: egret.DisplayObjectContainer, animationName?: string, playTimes?: number, first?: boolean, interval?: number): uniLib.UniDragon;
}

declare module GX {
    class ResManager {
        static urlRoot: string;
        /**
         * 读取公共资源
         */
        static readCommon(url: string, compFunc: (data: any, url: string) => void, thisObject: any, resourceType?: string): void;
        private static loadByUrl(url, compFunc, thisObject, resourceType);
        /**
         * 读取扑克牌公共资源
         * @param  {string} resourceRoot  资源文件跟目录 TablePokerCard.json
         * @param  {string} config 配置文件名
         * @param  {number} cardId 牌id
         * @param  {string} resourceType? 配置文件类型
         */
        static readCommonPokerCard(resourceRoot: string, config: string, cardId: number, compFunc: (data: any, url: string) => void, thisObject: any, resourceType?: string): void;
        /**
         * 通过url获取文件类型
         * @from egret-core-3.2.0\src\extension\resource\Resource.ts
         */
        static getTypeByUrl(url: string): string;
    }
}

declare module GX {
    module Effect {
        /**
         * 押注飞行到目标的缓动动画,
         * @param chip:飞行的底注
         * @param toPos:飞行的目的位置
         * @param duration:飞行的时间，默认为0.3秒
         * @param fromPos:飞行的起始位置,如果不填写，则是用对象本身的坐标;
         * @param ease:{egret.Ease} 缓动算法
         * @return 返回当前的egret.Tween对象，如果需要再缓动动画播放完后回调，则在调用后再.call
        */
        function ChipflyTo(chip: egret.DisplayObject, toPos: {
            x: number;
            y: number;
        }, duration?: number, waitTime?: number, fromPos?: any, ease?: Function): egret.Tween;
        /**
         * 押注由桌面飞回去的缓动动画,
         * @param chip:飞行的底注
         * @param toPos:飞行的目的位置
         * @param duration:飞行的时间，默认为0.3秒
         * @param fromPos:飞行的起始位置,如果不填写，则是用对象本身的坐标;
         *  @param ease:{egret.Ease} 缓动算法
         * @return 返回当前的egret.Tween对象，如果需要再缓动动画播放完后回调，则在调用后再.call
        */
        function ChipflyBack(chip: egret.DisplayObject, toPos: {
            x: number;
            y: number;
        }, duration?: number, waitTime?: number, fromPos?: any, ease?: Function): egret.Tween;
    }
}

declare module GX {
    /**
     * 游戏容器类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved.
    * EgerPro显示对象层级
    * Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
    *
    */
    class GameLayerManager {
        static removeUI(ui: any): void;
        /**
         *  场景层 如 战场、主城、副本战场之类的
         */
        private static m_sceneLayer;
        static sceneLayer: egret.DisplayObjectContainer;
        static addUIToScene(ui: any): void;
        /**
         * 主UI层 如 底部功能栏
         */
        private static m_mainLayer;
        static mainLayer: egret.DisplayObjectContainer;
        static addUIToMain(ui: any): void;
        /**
         * 特效层 如 闪烁、飘字之类的
         */
        private static m_effectLayer;
        static effectLayer: egret.DisplayObjectContainer;
        static addUIToEffect(ui: any): void;
        /**
         * 弹窗层 如 设置、背包、装备之类的
         */
        private static m_popLayer;
        static popLayer: egret.DisplayObjectContainer;
        static addUIToPop(ui: any): void;
        /**
         * 通讯遮罩层 和服务器通讯UI
         */
        private static m_maskLayer;
        static maskLayer: egret.DisplayObjectContainer;
        static addUIToMask(ui: any): void;
        /**
         * 加载遮罩层 场景切换的时候加载资源UI
         */
        static m_loadLayer: egret.DisplayObjectContainer;
        static loadLayer: egret.DisplayObjectContainer;
        static addUIToLoad(ui: any): void;
    }
}
/**
 * 废弃 移动至GX.GameLayerManager
  */
declare class GameLayerManager {
    private static _instance;
    static Instance: GameLayerManager;
    removeUI(ui: egret.DisplayObjectContainer): void;
    /**
     *  场景层 如 战场、主城、副本战场之类的
     */
    private m_sceneLayer;
    sceneLayer: egret.DisplayObjectContainer;
    addUIToSceneLayer(ui: egret.DisplayObjectContainer): void;
    /**
     * 主UI层 如 底部功能栏
     */
    private m_mainLayer;
    mainLayer: egret.DisplayObjectContainer;
    addUIToMainLayer(ui: egret.DisplayObjectContainer): void;
    /**
     * 弹窗层 如 设置、背包、装备之类的
     */
    private m_popLayer;
    popLayer: egret.DisplayObjectContainer;
    addUIToPopLayer(ui: egret.DisplayObjectContainer): void;
    /**
     * 特效层 如 闪烁、飘字之类的
     */
    private m_effectLayer;
    effectLayer: egret.DisplayObjectContainer;
    addUIToEffectLayer(ui: egret.DisplayObjectContainer): void;
    /**
     * 通讯遮罩层 和服务器通讯UI
     */
    private m_maskLayer;
    maskLayer: egret.DisplayObjectContainer;
    addUIToMaskLayer(ui: egret.DisplayObjectContainer): void;
    /**
     * 加载遮罩层 场景切换的时候加载资源UI
     */
    m_loadLayer: egret.DisplayObjectContainer;
    loadLayer: egret.DisplayObjectContainer;
    addUIToLoadLayer(ui: egret.DisplayObjectContainer): void;
}

declare module GX {
    /**
    * 面板弹出管理类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved.
    * 面板弹出的管理类
    */
    module PopUpManager {
        /**
         * 背景对象
         */
        class DarkPop {
            darkSprite: egret.Sprite;
            relyPanel: egret.DisplayObjectContainer;
        }
        let DarkPops: DarkPop[];
        /**
        * 添加面板方法
        * @param panel       		面板
        * @param dark        		背景是否变黑
        * @param effectType			0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
        * @param backFun			回调函数 用于动画的完成的后续操作
        * @param darkAlpha			背景变黑的透明的
        */
        function addPopUp(panel: egret.DisplayObjectContainer, dark?: boolean, effectType?: PopUpEffect, backFun?: Function, darkAlpha?: number): void;
        /**
        * 移除面板方法
        * @param panel       		面板
        * @param effectType			0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
        * @param backFun			回调函数 用于动画的完成的后续操作
        */
        function removePopUp(panel: egret.DisplayObjectContainer, effectType?: PopUpEffect, backFun?: Function): void;
    }
    /**
    * 弹出效果
    */
    enum PopUpEffect {
        /**
        * 没有动画
        */
        NOMAL = 0,
        /**
        * 从中间轻微弹出
        */
        CENTER = 1,
        /**
        * 从中间猛烈弹出
        */
        CENTER_S = 2,
        /**
        * 从左向右
        */
        LEFT = 3,
        /**
        * 从右向左
        */
        RIGHT = 4,
        /**
        * 从上到下
        */
        TOP = 5,
        /**
        * 从下到上
        */
        BOTTOM = 6,
    }
}
/**
* 废弃 移动至GX.removePopUp
*/
declare module PopUpManager {
    /**
     * 背景对象
     */
    class DarkPop {
        darkSprite: egret.Sprite;
        relyPanel: egret.DisplayObjectContainer;
    }
    let DarkPops: DarkPop[];
    /**
    * 废弃 移动至GX.removePopUp
    */
    function addPopUp(panel: egret.DisplayObjectContainer, dark?: boolean, effectType?: PopUpEffect): void;
    /**
    * 废弃 移动至GX.removePopUp
    */
    function removePopUp(panel: egret.DisplayObjectContainer, effectType?: PopUpEffect): void;
    /**
    * 废弃 移动至GX.removePopUp
    */
    enum PopUpEffect {
        /**
        * 没有动画
        */
        NOMAL = 0,
        /**
        * 从中间轻微弹出
        */
        CENTER = 1,
        /**
        * 从中间猛烈弹出
        */
        CENTER_S = 2,
        /**
        * 从左向右
        */
        LEFT = 3,
        /**
        * 从右向左
        */
        RIGHT = 4,
        /**
        * 从上到下
        */
        TOP = 5,
        /**
        * 从下到上
        */
        BOTTOM = 6,
    }
}

declare module GX {
    /**
     * 提示
     */
    module Tips {
        /**
         * 自定义弹出界面
         */
        let PopupClass: any;
        /**
         * 自定义提示界面
         */
        let TipsClass: any;
        /**
         * 弹窗形式的提示
         * 自定义弹出界面PopupClass   构造方法参数许一致
         * return 返回弹窗对象
         */
        function showPopup(msg: string, confirmFunc?: Function, cancelFunc?: Function, thisObject?: any, cancelVisible?: boolean, title?: string, confirmLabel?: string, cancelLabel?: string, popUpEffect?: GX.PopUpEffect, dark?: boolean): any;
        /**
         * 消息提示 显示在屏幕中央，没有操作，显示3秒后移除
         */
        function showTips(msg: string): any;
        class BasePopup extends eui.Component {
            constructor(msg?: string, confirmFunc?: Function, cancelFunc?: Function, thisObject?: any, cancelVisible?: boolean, title?: string, confirmLabel?: string, cancelLabel?: string);
        }
        class Popup extends BasePopup {
            private static exml;
            private bgImage;
            private titleLabel;
            private msgLabel;
            private confirmButton;
            private cancelButton;
            private confirmFunc;
            private cancelFunc;
            private thisObject;
            constructor(msg: string, confirmFunc?: Function, cancelFunc?: Function, thisObject?: any, cancelVisible?: boolean, title?: string, confirmLabel?: string, cancelLabel?: string);
            setMsgLabel(txt: string): void;
            private destroy();
            addUIListener(): void;
            removeUIListener(): void;
            private onClickTap(e);
        }
        class Tips extends egret.Sprite {
            static MinWidth: number;
            static MinHeight: number;
            private bgImage;
            private label;
            constructor(msg: string);
        }
    }
}

declare module GX {
    /**
     * 工具类
     */
    class Utils {
        /**
         * 返回val在规定字节长度max内的值 超出带...
         * @param  {String} string
         * @param  {number} max
         */
        static GetByteString(val: string, max: number): string;
        static FormatTime(time: number, format?: TimeFormat): string;
        /**
         * 十进制转换为二进制字符串
         */
        static DecimalToBinaryString(value: number, length: number): string;
        /**
         * 十进制转换为二进制bool型数组
         */
        static DecimalToBinaryBool(value: number, length: number): Array<boolean>;
        /**
         * 秒数转换为字符串
         */
        static SecondsToString(seconds: number, format?: TimeFormat): string;
        /**
         * BitmapData转换为具有RESStyle风格的Texture
         */
        static getStyleTextureBuyBitmapData(bitmap: egret.BitmapData, style?: RESStyle): any;
        /**
         * 本地配置资源转换为具有RESStyle风格的Texture
         */
        static getStyleTexture(key: string, style?: RESStyle): egret.RenderTexture;
        /**
         * 异步加载本地配置资源转换为具有RESStyle风格的Texture
         */
        static getStyleTextureAsync(key: string, loadComplete: (data: any, url: string) => void, thisObject: any, style?: RESStyle): void;
    }
}

declare module game {
    class BankerData {
        private static m_Instance;
        static Instance: BankerData;
        static clearInstance(): void;
        constructor();
        /**
         * 牌
         */
        private m_cardList;
        cardList: number[];
        cardChanged: GX.MulticastEvent;
        /**
         * 牌型
         */
        private m_cardType;
        cardType: Cmd.CardSetType;
        private m_cardKey;
        cardKey: number[];
        cardKeyChange: GX.MulticastEvent;
        /**
         * 庄家信息
         */
        private _banker;
        banker: UserInfo;
        bankerChanged: GX.MulticastEvent;
        /**
         * 倍数
         */
        private m_multiple;
        multiple: Cmd.CardSetType;
        multipleChanged: GX.MulticastEvent;
    }
}

declare module game {
    /**
     * gameLib配置
     */
    class Config {
        /**
         * 交互音效
         */
        static InteractiveSoundName: string;
        /**
         * 是否开格式话名字
         */
        static IsFormatName: boolean;
        /**
         * 游戏座位数量
         */
        static GameSeatNumber: number;
        /**
         * 是否是有座位概念的游戏
         */
        static SeatGame: boolean;
        /**
         * 超时退出房间倒计时时间
         */
        static BetTimeout: number;
        /**
         * 公共金币字体
         */
        static PublicGoldFont: string;
    }
}

declare module game {
    /**
     * 自定义数据 全局存储
     */
    class CustomData {
        private static customData;
        static setData(key: string, data: any): any;
        static getData(key: string): any;
        static clearData(key: string): void;
        static clearAll(key: string): void;
        /**收藏牌谱id */
        static collectionList: number[];
        /**
         * 标签列表
         */
        private static _tagList;
        static tagList: Cmd.TagData[];
    }
    module CustomData {
        /**
         * 总结算
         */
        let FinalResult: string;
        /**
         * 商店
         */
        let ShopPanel: string;
        /**
         * 牌局回放
         */
        let PlaybackPanel: string;
    }
}

declare module game {
    /**
     * 扑克公共数据
     */
    class PokerFunction {
        /**
         * 手牌排序方法
         */
        static handCardSort: (cardList: Array<number>) => Array<number>;
        /**
         * 获取主角服座位数据
         */
        static MainSeat: SeatData;
        /**
         * 获取主角服务器座位ID
         */
        static MainSeatId: number;
        /**
         * 获取座位数据
         */
        static GetSeatDataByUid(uid: number): SeatData;
        /**
        * 通过座位号获取座位数据
        */
        static GetSeatDataBySeatId(seatId: number): SeatData;
        /**
        * 获取座位中角色数据数据通过座位号
        */
        static GetUserInfoBySeatId(seatId: number): UserInfo;
        /**
         * 获取座位中角色数据通过uid  不区分是否在座位
         */
        static GetUserInfoByUid(uid: number): UserInfo;
        /**
          *废弃
          * GetUserInfoByUid
          */
        static GetAudienceByUid(uid: number): UserInfo;
        /**
        * 废弃
        * GetUserInfoByUid
        */
        static GetUserByUid(uid: number): UserInfo;
        /**
        * 获取主角信息 不区分是否在座位
        */
        static MainUser: UserInfo;
        /**
         * 指定玩家是否坐下
         */
        static IsSitDown(uid: number): boolean;
        /**
         * 主角是否坐下
         */
        static IsSitDownMain: boolean;
        /**
         * 获取庄家uid
         */
        static BankerUid: number;
        /**
         * 发送协议
         */
        static tcpSend(data: any): void;
        /**
         * 退出游戏
         * 废弃移动至game.GameFunction
         */
        static exitGame(): void;
        static FormatTime(time: number): string;
        /**
         * 废弃移动至GX.Utils
         */
        static BitToString(value: number, length: number): string;
        /**
         *废弃移动至GX.Utils
         */
        static BitToArray(value: number, length: number): Array<boolean>;
    }
}

declare module game {
    /**
     * 天、低、玄、黄
     */
    class DoorData {
        /**
         * 天地玄黄 id
         */
        private m_doorId;
        doorId: number;
        constructor(id: number);
        /**
         * 门 总投注数
         */
        private m_chipSum;
        chipSum: number;
        chipsSumChanged: GX.MulticastEvent;
        /**
        * 门 主角投注数
        */
        private m_chipMain;
        chipMain: number;
        chipsMainChanged: GX.MulticastEvent;
        playMainAnimation: GX.MulticastEvent;
        playAllAnimation: GX.MulticastEvent;
        /**
         * 牌
         */
        private m_cardList;
        cardList: number[];
        cardChanged: GX.MulticastEvent;
        /**凑成牛的牌组合*/
        private m_cardKey;
        cardKey: number[];
        cardKeyChange: GX.MulticastEvent;
        /**
         * 牌型
         */
        private m_cardType;
        cardType: Cmd.CardSetType;
        /**
         * 倍数
         */
        private m_multiple;
        multiple: Cmd.CardSetType;
        multipleChanged: GX.MulticastEvent;
    }
}

declare module game {
    /**
     * 牌型转换为字符串
     */
    function cardTypeToString(value: Cmd.CardSetType): string;
    /**
    * 操作类型对应的资源名
    */
    function opetrateToString(opType: Cmd.Operation): string;
    /**
    * 游戏id
    */
    function GameId(): number;
    /**
     * 设置eui.BitmapLabel字体为公共字体，如找不到公共字体则设置为font字体
     */
    function SetPublicFont(label: eui.BitmapLabel, font?: Object): void;
}

declare module game {
    /**
     * 玩法列表
     */
    class PlayList {
        private static m_Instance;
        static Instance: PlayList;
        static clearInstance(): void;
        private m_playList;
        playList: Cmd.Playing[];
        smallblind: number;
        seatNum: number;
        ante: number;
        blindLength: number;
        startChips: number;
        speed: number;
        duration: number;
        clubId: number;
        entryFee: number;
        regulation: number;
        insurance: number;
        controlEntry: number;
        forceBlind: number;
        GPS: number;
        iPEnter: number;
        controlSignUp: number;
        static getSmallblind(play: Cmd.Playing[]): number;
        static getSeatNum(play: Cmd.Playing[]): number;
        static getAnte(play: Cmd.Playing[]): number;
        static getBlindLength(play: Cmd.Playing[]): number;
        static getStartChips(play: Cmd.Playing[]): number;
        static getSpeed(play: Cmd.Playing[]): number;
        static getDuration(play: Cmd.Playing[]): number;
        static getClubId(play: Cmd.Playing[]): number;
        static getEntryFee(play: Cmd.Playing[]): number;
        static getRegulation(play: Cmd.Playing[]): number;
        static getInsurance(play: Cmd.Playing[]): number;
        static getControlEntry(play: Cmd.Playing[]): number;
        static getForceBlind(play: Cmd.Playing[]): number;
        static getGPS(play: Cmd.Playing[]): number;
        static getIPEnter(play: Cmd.Playing[]): number;
        static getControlSignUp(play: Cmd.Playing[]): number;
    }
}

declare module game {
    /**
     * 房间主要数据
     */
    class RoomData {
        private static m_Instance;
        static Instance: RoomData;
        static clearInstance(): void;
        constructor();
        /**
         * true 叫地主 false 抢地主
         */
        private m_callOrRob;
        callOrRob: boolean;
        /**总结算数据 */
        fianlData: Cmd.FinalResult_S;
        private m_seatList;
        seatList: SeatData[];
        clearSeatList(): void;
        addSeat(seat: SeatData): void;
        addSeatChanged: GX.MulticastEvent;
        delectSeat(seatId: number): void;
        delectSeatChanged: GX.MulticastEvent;
        /**
         * 删除的座位数据
         */
        delectedSeatData: Cmd.SeatData[];
        private m_roomId;
        roomId: number;
        roomIdChanged: GX.MulticastEvent;
        private m_roomType;
        roomType: Cmd.RoomType;
        roomTypeChange: GX.MulticastEvent;
        private m_startGame;
        /**
         * 用于开始游戏标志，没有关闭状态
         */
        startGame: boolean;
        startGameChanged: GX.MulticastEvent;
        private m_isEnableRound;
        /**
         * 牌局是否启动  房主是否点击开始游戏
         */
        isEnableRound: boolean;
        isEnableRoundChanged: GX.MulticastEvent;
        /**
         * 房主的uid
         */
        private m_ownerId;
        ownerId: number;
        ownerIdChanged: GX.MulticastEvent;
        /**
         * 当前操作位 数据
         */
        private m_operate;
        operate: OperateData;
        operateChanged: GX.MulticastEvent;
        /**
         * 当前操作 座位号
         */
        operateSeatId: number;
        /**
         * 当前操作 uid
         */
        operateUid: number;
        /**
        * 底牌
        */
        private m_bottomCard;
        setbottomCard(v: number[], updataType?: UpdataType, num?: number): void;
        bottomCard: number[];
        /**
         * 抢地主 操作位 数据
         */
        private m_robLordOperate;
        robLordOperate: RobLordOperateData;
        robLordOperateChanged: GX.MulticastEvent;
        /**
         * 抢地主当前操作 uid
         */
        robLordOperateUid: number;
        /**
         * 抢地主当前操作 座位号
         */
        robLordOperateSeatId: number;
        /**
         * 轮到玩家 踢 操作
         */
        private m_kickOperate;
        kickOperate: KickOperateData;
        kickOperateChanged: GX.MulticastEvent;
        /**
         * 地主uid
         */
        private m_landlordUid;
        landlordUid: number;
        landlordChanged: GX.MulticastEvent;
        /**
         * 三张底牌
         */
        private m_threeCard;
        threeCard: number[];
        threeCardChanged: GX.MulticastEvent;
        /**
         * 倍数
         */
        private m_multiple;
        multiple: number;
        multipleChanged: GX.MulticastEvent;
        /**
         * 每个座位上的倍数
         */
        private m_seatMultiple;
        seatMultiple: Cmd.MultipleUpdateCmd_S.Update[];
        seatMultipleUpdate: GX.MulticastEvent;
        /**
         * 底分
         */
        private m_pointBase;
        pointBase: number;
        pointBaseChanged: GX.MulticastEvent;
        /**
         * 当前游戏总局数
         */
        private _roomTotalInnings;
        roomTotalInnings: number;
        /**
         * 当前游戏总局数
         */
        private _roomCurrentInnings;
        roomCurrentInnings: number;
        inningsChanged: GX.MulticastEvent;
        /**
         * 没有的座位的角色
         */
        private m_audienceList;
        addAudience(user: UserInfo): void;
        addAudienceEvent: GX.MulticastEvent;
        removeAudience(uid: number): void;
        removeAudienceEvent: GX.MulticastEvent;
        audienceList: Array<UserInfo>;
        clearAudienceList(): void;
        /**
         * 主角座位数据改变
         * 第一个参数  game.USerSeatState
         */
        MainSeatChanged: GX.MulticastEvent;
        /**
        * 所有的门
        */
        private m_doorDatas;
        initDoorDatas(door: DoorData[]): void;
        doorDatas: DoorData[];
        /**
         * 等待的上庄列表
         */
        private m_bankerWait;
        bankerWait: Cmd.UserBriefInfo[];
        bankerWaitChanged: GX.MulticastEvent;
        /**
         * 每局输赢 bit位表示
         */
        private m_roundWinLose;
        addRoundWinLose(v: Cmd.History.HistoryInfo): void;
        roundWinLose: Cmd.History.HistoryInfo[];
        roundWinLoseChanged: GX.MulticastEvent;
        private m_betMax;
        betMax: number;
        betMaxChanged: GX.MulticastEvent;
        /**房间等级 */
        private m_level;
        level: number;
        roomLevelChanged: GX.MulticastEvent;
        /**房间人数 */
        playerNumber: number;
        setRoomProp(list: Cmd.roomPropObj[]): void;
        matchidChanged: GX.MulticastEvent;
        /**房间匹配号(可为空) */
        private m_matchid;
        matchid: number;
        /**
         * 房间最大人数
         */
        private m_maxuserNbr;
        maxuserNbr: number;
        maxuserNbrChanged: GX.MulticastEvent;
        /**
         * 不可三带对（斗地主玩法）
         */
        noThreeAttachDouble: boolean;
        cardNoteVisible: boolean;
        propsEvent: GX.MulticastEvent;
        setRoomPlayProps(list: number[]): void;
        /**所有玩法id 转换desc */
        getPlayTypeByList(): string[];
        /**
         * 最低限时【百人牛牛上庄限制】
         */
        private _pointLimit;
        pointLimit: number;
        pointLimitChangeHandle: GX.MulticastEvent;
        /**
         * 房间玩法属性
         */
        roomPlayProps: number[];
        /**记牌器 */
        private _leftCardList;
        leftCardList: number[];
        removeLeftCard(list: number[]): void;
        leftCardChangeHandel: GX.MulticastEvent;
        /**喜分改变事件 */
        happyPointChange: GX.MulticastEvent;
        /**锅底分改变事件 */
        tabPointChange: GX.MulticastEvent;
        /**断线重连锅底分 */
        relogTabPointsEvent: GX.MulticastEvent;
        /**房间喜分（房主抽底很红用） */
        private _happyPoint;
        /**
         *获取房间喜分
         */
        /**设置喜分 */
        happyPoint: number;
        /**卓内所有筹码分总和 */
        private _tabPoints;
        /** 获取卓内锅底分*/
        tabPoints: number;
        /**
         * 控制游戏开始的uid
         */
        private _startGameOpId;
        startGameOpId: number;
        startGameOpIdChange: GX.MulticastEvent;
        /**
         * 押注数据
         */
        private _betData;
        betData: Cmd.BetData;
        betDataChange: GX.MulticastEvent;
        /**
         * 自己压注数据
         */
        private _betMeData;
        betMeData: Cmd.BetData;
        betMeDataChange: GX.MulticastEvent;
        /**
         *  状态列表
         */
        private _stateList;
        stateList: Cmd.GameState[];
        /**
         * 底注
         */
        private _bottomPoint;
        bottomPoint: number;
        bottomPointChange: GX.MulticastEvent;
        /**
         * 小盲
         */
        private m_smallBlind;
        smallBlind: number;
        smallBlindChange: GX.MulticastEvent;
        /**
         * 升盲倒计时
         */
        private m_blindLeftSec;
        blindLeftSec: number;
        blindLeftSecChange: GX.MulticastEvent;
        /**牌堆剩余数量 */
        private _lastCardNum;
        /**获取当前牌堆剩余数量 */
        lastCardNum: number;
        /**牌堆数量变化 */
        lastCardNumChanged: GX.MulticastEvent;
        /**池底分改变事件*/
        chipPoolNumChanged: GX.MulticastEvent;
        /**池底总分 */
        private _chipPoolNum;
        /**获取池底总分 */
        /**设置池底分 */
        chipPoolNum: number;
        /**
         * 强制盲注座位Id
         */
        private m_straddleId;
        straddleId: number;
        straddleIdChange: GX.MulticastEvent;
    }
    /**
     * 抢地主操作位数据
     */
    class RobLordOperateData {
        uid: number;
        /**
        * 操作结束时间 leftSec代替 废弃 不要再使用
        */
        endTime: number;
        /**
         * 操作剩余结束时间 s
         */
        leftSec: number;
        /**
         * 操作列表
         */
        operateList: Cmd.Operation[];
    }
    /**
     * 出牌操作位数据
     */
    class OperateData {
        uid: number;
        /**
         * 推荐出牌
         */
        cardSetList: Array<Array<number>>;
        /**
         * 操作结束时间 leftSec代替 废弃 不要再使用
         */
        endTime: number;
        /**
         * 操作bit位
         */
        opBit: number;
        /**
         * 操作剩余结束时间 s
         */
        leftSec: number;
        /**
         * 操作列表
         */
        operateList: Cmd.Operation[];
        /**
        * 推荐出牌的类型
        */
        cardListType: Cmd.CardSetType;
        /**
         * 最低加注线
         */
        raiseLine: number;
        /**
         * 是否是第一手牌
         */
        isFirstOp: boolean;
        /**
         * 牌集列表
         */
        cardList: Cmd.CardSetList[];
        /**
         * 可继续比牌
         */
        continueCompare: boolean;
        /**
         * 延时加时操作
         * 0:延时时长 1:延时次数
         */
        delay: number[];
        /**
         * 可进行的动作
         */
        actList: Action[];
    }
    /**
     * 踢操作数据
     */
    class KickOperateData {
        uid: number;
        /**
         * 操作结束时间 leftSec代替 废弃 不要再使用
         */
        endTime: number;
        /**
         * 操作剩余结束时间 s
         */
        leftSec: number;
    }
}

declare module game {
    /**
     * 座位数据
     */
    class SeatData {
        constructor(seatId: number);
        private m_seatId;
        seatId: number;
        private m_isReady;
        isReady: boolean;
        readyChanged: GX.MulticastEvent;
        /**
         * 玩家数据 为null 代表此作为没人
         */
        private m_user;
        user: UserInfo;
        userChanged: GX.MulticastEvent;
        /**玩家置牌列表 */
        private userPlaceCardList;
        /**玩家置牌列表变化回调 */
        placeCardsChanged: GX.MulticastEvent;
        /**获取玩家置牌列表 */
        /**设置玩家置牌列表 */
        placeCards: number[];
        /**
         *手牌
         */
        private handCardList;
        clearHandCard(): void;
        /**
         * 添加手牌
         */
        addHandCard(cardId: number, type?: game.CardActionType, dealCardType?: Cmd.UpdateOperator): void;
        addHandCardEvent: GX.MulticastEvent;
        removedHandCard(cardId: number): void;
        delectHandCardEvent: GX.MulticastEvent;
        handCards: number[];
        /**
         * 替换手牌事件
        */
        replaceHandCardEvent: GX.MulticastEvent;
        /**
         * 替换手牌
        */
        replaceHandCard(index: number, cardId: number): void;
        /**
        * 展开手牌事件
       */
        showHandCardEvent: GX.MulticastEvent;
        /**
         * 牌型
         */
        private m_cardtype;
        getCardtype(): Cmd.CardSetType;
        setCardtype(v: Cmd.CardSetType): void;
        cardtypeChanged: GX.MulticastEvent;
        /**
         * 关键牌
         */
        private m_cardKey;
        getCardKey(): number[];
        setCardKey(v: number[]): void;
        cardKeyChanged: GX.MulticastEvent;
        /**
         * 手牌数量
         */
        private m_handCardCount;
        handCardSum: number;
        handCardCountChanged: GX.MulticastEvent;
        /**
         * 追加牌数量
         */
        private m_catchCardNum;
        catchCardNum: number;
        catchCardNumChanged: GX.MulticastEvent;
        /**
        * 王牌的数量
        */
        private m_kingNum;
        kingNum: number;
        kingNumChanged: GX.MulticastEvent;
        /**
         * 上次出的牌
         */
        private m_outCardList;
        outCardList: number[];
        outCardChanged: GX.MulticastEvent;
        /**
         * 在线状态
         */
        private m_onlineState;
        onlineState: Cmd.OnlineState;
        onlineChanged: GX.MulticastEvent;
        private m_multiple;
        seatMultiple: number;
        seatMultipleChanged: GX.MulticastEvent;
        /**
         * 是否在游戏中
         */
        private _isInGame;
        isInGame: boolean;
        isInGameChanged: GX.MulticastEvent;
        /**
         * 是否坐下
         */
        private _isSit;
        isSit: boolean;
        isSitChanged: GX.MulticastEvent;
        /**点数变化事件 */
        seatKengPoinChanged: GX.MulticastEvent;
        /**手牌点数（填坑） */
        private _kengPoints;
        /**
         *获取当前点数（填坑）
         */
        /**
         * 设置点数（填坑）
        */
        KengPoint: Cmd.KengPoint;
        /**
         * 牌局总投注数
        */
        private m_betCount;
        betCount: number;
        betCountChanged: GX.MulticastEvent;
        /**
         * 本轮投注数
        */
        private m_curBetCount;
        curBetCount: number;
        curBetCountChanged: GX.MulticastEvent;
        /**
         * 当前座位上的操作
         */
        private _operate;
        Operate: Cmd.Operation;
        seatOperationChanged: GX.MulticastEvent;
        /**
         * 座位状态
         */
        private _seatStateList;
        seatStateList: Cmd.GameState[];
        /**座位状态更新*/
        seatStateListChanged: GX.MulticastEvent;
        /**
         * 追加座位状态
         */
        private _addSeatState;
        addSeatState: Cmd.GameState;
        /**座位状态更新*/
        seatStateAdd: GX.MulticastEvent;
        /**
         * 推荐出牌
         */
        private _recommendList;
        recommendList: Cmd.GameObjectData[];
        /**推荐出牌更新 */
        recommendListChanged: GX.MulticastEvent;
        /**报听状态更新*/
        listenStatusChanged: GX.MulticastEvent;
        /**已经报听 */
        private _listened;
        /**获取报听状态 */
        listened: boolean;
        /**
         * 玩家弃牌
         */
        private _hasFord;
        hasFord: boolean;
        /**
         * 炮台id
         */
        private m_batteryIndex;
        batteryIndex: number;
        batteryIndexChanged: GX.MulticastEvent;
        /**
         * 锁定的fishId
         */
        private m_lockFishId;
        lockFishId: number;
        /**
         * 是否锁定
         */
        private m_lock;
        setLock(isloCk: boolean, lockFishId: number): void;
        lock: boolean;
        lockChanged: GX.MulticastEvent;
    }
}

declare module game {
    /**
     * 基础数据
     */
    class UserInfo {
        constructor(uid: number);
        private m_headurl;
        headUrl: string;
        headUrlChanged: GX.MulticastEvent;
        private m_uid;
        uid: number;
        private m_nickName;
        nickName: string;
        nameChanged: GX.MulticastEvent;
        private m_gender;
        gender: string;
        genderChanged: GX.MulticastEvent;
        /**
        * 点数
        */
        private m_point;
        point: number;
        pointChanged: GX.MulticastEvent;
        /**
        * 刷新点数
        */
        repoint: number;
        repointChanged: GX.MulticastEvent;
        /**
         * 钻石
         */
        private m_diamond;
        diamond: number;
        diamondChanged: GX.MulticastEvent;
        /**
         * 刀分
         */
        private m_cutScore;
        cutScore: number;
        cutScoreChanged: GX.MulticastEvent;
        /**
         * 积分
         */
        private m_cardScore;
        cardScore: number;
        cardScoreChanged: GX.MulticastEvent;
        /**
         * 托管
         */
        private _isTrust;
        isTrust: boolean;
        trustStateChanged: GX.MulticastEvent;
        /**
         *玩家是否在牌局中
         */
        private m_isInGame;
        isInGame: boolean;
        /**
         * 押注数据统计
         */
        private m_statistics;
        statistics: Cmd.StatisticsRoundData;
        statisticsChanged: GX.MulticastEvent;
        /**
         *是否为机器人
         */
        private m_isRobot;
        isRobot: boolean;
        updataInfo(info: Cmd.UserBriefInfo): void;
    }
}

declare module game {
    class Action {
        /**
         * 个人信息更新
         */
        static personalUpdate: GX.MulticastEvent;
        /**
         * 排行榜
         */
        static rankingListEvent: GX.MulticastEvent;
        /**
         * 开始游戏派发事件
         */
        static startGameCmdEvent: GX.MulticastEvent;
        /**
         * 出鱼信息
         */
        static spawnFishEvent: GX.MulticastEvent;
        /**
         * 发射子弹
         */
        static sendBulletEvent: GX.MulticastEvent;
        /**
         * 打死鱼
         */
        static deadFishEvent: GX.MulticastEvent;
        /**
         * 打中鱼
         */
        static hitFishEvent: GX.MulticastEvent;
        /**
         * 改变场景
         */
        static changeSceneEvent: GX.MulticastEvent;
        /**
         * 操作通知
         */
        static actionEvent: GX.MulticastEvent;
    }
}
declare module GX {
    /**
     * 扑克不需要存储数据事件派发  替换为game.Action
     */
    class PokerEvent {
        private static m_Instance;
        static Instance: PokerEvent;
        /**
         * 主角发送协议事件
         */
        tcpSendEvent: GX.MulticastEvent;
        /**
         * 玩家抢地主结果通知
         */
        landlordRobResult: MulticastEvent;
        /**
        * 玩家叫地主结果 叫分
        */
        calllordRobResult: MulticastEvent;
        /**
         * 出牌通知
         */
        playCard: MulticastEvent;
        /**
         * 踢操作
         */
        kickPlay: MulticastEvent;
        /**
         * 解散房间数据更新
         */
        dissolveRoomUpdate: GX.MulticastEvent;
        /**
         * 系统消息通知
         */
        systemMessage: GX.MulticastEvent;
        /**
         * 离开房间
         */
        leaveRoom: GX.MulticastEvent;
        /**
         * 离开房间
         */
        leaveRoom_Brd: GX.MulticastEvent;
        /**
         * 单局结算
         */
        roundResult: GX.MulticastEvent;
        /**
         * 发牌结束 牌初始化完成 赋值操作完成
         */
        dealCardEnd: GX.MulticastEvent;
        /**
         * 发牌动画
         */
        dealCardAnimation: GX.MulticastEvent;
        /**
         * 亮底牌牌动画
         */
        showBackCardsAnimation: GX.MulticastEvent;
        /**
         * 三张底牌动画
         */
        threeCardAnimation: GX.MulticastEvent;
        /**
         * 牌局结束通知
         */
        gameFinalSettle: GX.MulticastEvent;
        /**
         * 游戏服务器逻辑时间
         */
        gameServerTime: GX.MulticastEvent;
        /**
         * 换牌GM
         */
        gmAvailableCardUpdate: GX.MulticastEvent;
        /**
         * 游戏状态更新
         */
        gameStateUpdate: GX.MulticastEvent;
        /**
         * 庄家信息更新
         */
        bankerDataUpdate: GX.MulticastEvent;
        /**
         * 显示等待下一局的提示
         */
        showSurrenderTipsHandle: GX.MulticastEvent;
        /**
         * 底牌更新通知
         */
        bottomCardUpdate: MulticastEvent;
        /**
         * 彩票信息
         */
        lotteryMulticast: MulticastEvent;
        /**
         * 排名通知
         */
        rankUpdateMulticast: MulticastEvent;
        /**
         * 房间更新 排名数据
         */
        rankListMulticast: MulticastEvent;
        /**
         * 历史记录跟新
         */
        historyUpdate: MulticastEvent;
        /**
         * 送礼事件
         */
        SendGiftEvent: MulticastEvent;
        /**
         * 叫地主牌
         */
        callCardEvent: MulticastEvent;
        /**
         *  压住通知
         */
        betRoomEvent: MulticastEvent;
        /**
         * GM User列表更新
         */
        GmUidListUpdateEvent: MulticastEvent;
        /**
         * GM 库存数据更新
         */
        GmStockUpdateEvent: MulticastEvent;
        /**
         *玩家下注通知
         */
        userBetEvent: MulticastEvent;
        /**
         *玩家入座
         */
        userSeatdown: MulticastEvent;
        /**
         *通知客户端显示具体的牌
         */
        showCardsEvent: MulticastEvent;
        /**
         * 组成牛牛提示
         */
        NiuNiuTipsEvent: MulticastEvent;
        /**
         * 请求展示牌（比鸡用）填坑用来更新kengpoint
         */
        DisplayCardEvent: MulticastEvent;
        /**
        * 进入下一轮押注圈
        */
        circleEndEvent: MulticastEvent;
        /**
         * 断线重连
         */
        reconnecEvent: MulticastEvent;
        /**
         * 保险可购买通知
         */
        InsuranceNewOpEvent: MulticastEvent;
        /**
         * 保险可购买通知
         */
        insuranceBuyEvent: MulticastEvent;
        /**
         * 保险开始
         */
        insuranceStartEvent: MulticastEvent;
        /**
         * 观战更新
         */
        audienceUpdataEvent: MulticastEvent;
        /**
         * 房间信息更新
         */
        roomDataUpdateEvent: MulticastEvent;
        /**
         * 房间信息更新
         */
        buyBringEvent: MulticastEvent;
        /**
         * 解散房间数据更新
         */
        moneyUpdate: GX.MulticastEvent;
        /**
         * 投票数据更新
         */
        VoteUpdate: GX.MulticastEvent;
        /**
         * 可进行动作更新,暂用作押注筹码数值更新
         */
        ActionUpdate: GX.MulticastEvent;
        /**
         * 比牌结果通知
         */
        compareResultEvent: GX.MulticastEvent;
        /**
         * 德州扑克配置改变
         */
        texasConfigChange: GX.MulticastEvent;
        /**
         * 德州扑克数据改变
         */
        texasRoundChanged: GX.MulticastEvent;
        /**
         * 收藏牌谱验证回复
         */
        collectResultEvent: GX.MulticastEvent;
        /**
         * 强制盲注跟新
         */
        straddleChange: GX.MulticastEvent;
        /**
         * 玩法选项更新
         */
        PlayingUpdateEvent: GX.MulticastEvent;
        /**
         * 围观人员更新
         */
        AudienceUpdate: GX.MulticastEvent;
    }
}

declare module uniLib {
    /**
     * 自定义事件类
     */
    module CustomEvent {
        /**
         * 显示菜单栏
         */
        let Show_MenuPanel: string;
        /**
         * 移除菜单栏
         */
        let Remove_MenuPanel: string;
        /**
         * 显示商城
         */
        let Show_MallPanel: string;
        /**
         * 菜单栏金币自动改变  参数类型{type:number,value:number} type 1.金币  2.钻石
         */
        let Menu_ChipsChanged: string;
        /**
         * 菜单栏自动更新开关  参数类型{type:number,open:boolean} type 1.金币  2.钻石
         */
        let Menu_SwitchChipsAutoUpdate: string;
        /**
         * 自动购买金币  参数类型{type:number,value:number} type 1.金币  2.钻石
         */
        let Auto_BuyGold: string;
        /**
         * 客户端结算完成  参数类型{awardPoint:number} awardPoint 获得奖励货币数量
         */
        let ClientSettleFinish: string;
    }
}

declare module game {
    /**
     * 玩家站起坐下
     */
    enum USerSeatState {
        /**
         * 站起
         */
        StandUp = 1,
        /**
         * 坐下
         */
        SitDown = 2,
    }
}
declare module game {
    class PokerData {
        /**
         * 是否是单机模式
         */
        static isStandAlone: boolean;
        static clearData(): void;
        /**
         * 大厅缩放模式
         */
        static LobbyScaleMode: string;
    }
    /**
     * 更新类型
     */
    enum UpdataType {
        /**
         * 断线重连
         */
        RECONNEC = 1,
        /**
         * 更新无动画
         */
        UPDATA = 4,
    }
    /**
     * 手牌更新类型
     */
    enum CardActionType {
        /**
         * 初始化手牌
         */
        INIT = 1,
        /**
         * 追加
         */
        ADD = 2,
        /**
         * 断线重连
         */
        RECONNEC = 3,
    }
    /**
     * 操作类型
     */
    enum OperationType {
        /**
         * 第一手牌
         */
        FirstHand = 0,
        /**
         * 要不起
         */
        PassOnly = 1,
        /**
         * 要的起
         */
        Play = 2,
    }
    /**
     * 牌型
     */
    enum CardType {
        /**
         * 无出牌
         */
        Error_Card = 100,
        /**
         * 单牌
         */
        Single_Card = 1,
        /**
         * 对子
         */
        Double_Card = 2,
        /**
         * 三张
         */
        Three_Card = 3,
        /**
         * 炸弹
         */
        Bomb_Card = 4,
        /**
         * 王炸
         */
        KingBomb_Card = 5,
        /**
         * 三带一
         */
        ThreeOne_Card = 6,
        /**
         * 三代二
         */
        ThreeTwo_Card = 7,
        /**
         * 四带俩单
         */
        Four_TwoSingle_Card = 8,
        /**
         * 四带两对
         */
        Four_TwoDouble_Card = 9,
        /**
         * 单顺
         */
        Lian_Card = 10,
        /**
         * 连对
         */
        Double_Lian_Card = 11,
        /**
         * 飞机（两个三张连）
         */
        Feiji_Card = 12,
        /**
         * 飞机带俩单
         */
        Feiji_TwoSingle_Card = 13,
        /**
         * 飞机带两对
         */
        Feiji_TwoDouble_Card = 14,
    }
}

declare module game {
    class GameFunction {
        /**
         * 启动游戏
         */
        static startUp(): void;
        /**
         * 监听进入游戏事件
         */
        static listenerEnterRoom(): void;
        /**
         * 进入房间
         */
        private static onEnterRoom();
        private static onUserChipChaned(evt);
        /**
         * 退出游戏
         */
        static exitGame(): void;
    }
}

declare module game {
    /**
     * 废弃  移动至GX.GameLayerManager
     */
    class GameLayer {
        private static m_Instance;
        static Instance: GameLayer;
        static clearInstance(): void;
        private m_uiLayer;
        uiLayer: egret.DisplayObjectContainer;
        addUI(ui: any): void;
        removeUI(ui: any): void;
        private m_topLayer;
        topLayer: egret.DisplayObjectContainer;
        addTop(ui: any): void;
        removeTop(ui: any): void;
        private m_effectLayer;
        effectLayer: egret.DisplayObjectContainer;
        addEffect(ui: any): void;
        removeEffect(ui: any): void;
        private m_mainUILayer;
        mainUILayer: egret.DisplayObjectContainer;
        addMainUI(ui: any): void;
        removeMainUI(ui: any): void;
        private m_maskLayer;
        maskLayer: egret.DisplayObjectContainer;
        addMask(ui: any): void;
        removeMask(ui: any): void;
        private m_tipsLayer;
        tipsLayer: egret.DisplayObjectContainer;
        addTip(ui: any): void;
        removeTip(ui: any): void;
        constructor();
        destory(): void;
    }
}

declare module game {
    class GameTime {
        private static offset;
        /**
         * 游戏服务器时间
         */
        static serverNow(): number;
        static serverUnixStamp(): number;
        /**
         * 游戏本地时间
         */
        static localNow(): number;
        static localUnixStamp(): number;
        static responseSync(stamp: number): void;
        /**
         * 刷新时间补偿
         */
        static rquestSync(): void;
        /**
         * 返回距离服务器时间戳stamp的剩余毫秒
         */
        static leftTimeByServerStamp(stamp: number): number;
    }
}

declare module game {
    enum LanguageType {
        /**
         * 中文
         */
        Chinese = 1,
        /**
         * 英文
         */
        English = 2,
        /**
         * 繁体
         */
        ChineseTraditional = 3,
    }
    class Language {
        /**
         * 多语言切换是否开启
         */
        static open: boolean;
        constructor();
        static m_Type: LanguageType;
        static Type: LanguageType;
        static TypeChanged: GX.MulticastEvent;
        static Translate(chinese: string): string;
        static TranslateByCode(code: number): string;
        static TranslateFormat(...replacements: string[]): string;
        static TranslateImage(chinese: string): string;
    }
}

declare module game {
    /**
    * 单机模式
    */
    class LocalConnection {
        private static m_Instance;
        static Instance: LocalConnection;
        static clearInstance(): void;
        ConnectionGame(gameId: number, zoneId: number): void;
    }
}

declare module storage {
    /**
     * 语言类型
     */
    module language {
        function setValue(value: game.LanguageType): void;
        function getValue(): game.LanguageType;
    }
}

declare module game {
    /**
     * 封装egret官方提供的定时器
     */
    class Timer {
        /**
         * 非循环定时器集合
         * 在指定的延迟（以毫秒为单位）后运行指定的函数。
         */
        private static timeOuts;
        /**
         * @language zh_CN
         * 在指定的延迟（以毫秒为单位）后运行指定的函数。
         * @param listener {Function} 侦听函数
         * @param thisObject {any} this对象
         * @param delay {number} 延迟时间，以毫秒为单位
         * @param ...args {any} 参数列表
         * @returns {number} 返回索引，可以用于 clearTimeout
         * @version Egret 2.4
         * @platform Web,Native
         * @includeExample extension/game/utils/setTimeout.ts
         */
        static setTimeout(listener: Function, thisObject: any, delay: number, ...args: any[]): number;
        /**
         * @language zh_CN
         * 清除指定延迟后运行的函数。
         * @param key {number} egret.setTimeout所返回的索引
         * @version Egret 2.4
         * @platform Web,Native
         */
        static clearTimeout(key: number): void;
        /**
         * 循环定时器集合
         * 在指定的延迟（以毫秒为单位）后运行指定的函数。
         */
        private static intervals;
        /**
         * @language zh_CN
         * 以指定的延迟（以毫秒为单位）间隔循环调用指定的函数。
         * @param listener {Function} 侦听函数
         * @param thisObject {any} this对象
         * @param delay {number} 延迟时间，以毫秒为单位
         * @param ...args {any} 参数列表
         * @returns {number} 返回索引，可以用于 clearInterval
         * @version Egret 2.4
         * @platform Web,Native
         * @includeExample extension/game/utils/setInterval.ts
         */
        static setInterval(listener: Function, thisObject: any, delay: number, ...args: any[]): number;
        /**
         * @language zh_CN
         * 清除指定延迟后运行的函数。
         * @param key {number} egret.setInterval所返回的索引
         * @version Egret 2.4
         * @platform Web,Native
         * @includeExample egret/utils/setInterval.ts
         */
        static clearInterval(key: number): void;
        /**
         * 清除所有setTimeout的定时器
         */
        static clearTimerTnterval(): void;
        /**
         * 清除所有setInterval的定时器
         */
        static clearTimerOut(): void;
        /**
         * 清除所有的定时器
         */
        static clearAllTimer(): void;
    }
}

declare module Cmd {
    /**
     * 房间数据更新
     */
    function OnRoomDataUpdateCmd_S(rev: Cmd.RoomDataUpdateCmd_S): void;
    /**
     * Echod定时器
     */
    let EchoTimer: number;
    /**
    * 房间玩家更新
    */
    function OnRoomSeatUpdateCmd_S(rev: Cmd.RoomSeatUpdateCmd_S): void;
    /**
    * 座位数据更新
    */
    function OnSeatDataUpdateCmd_S(rev: Cmd.SeatDataUpdateCmd_S): void;
    /**
     * 请求换坐给对方客户端
     */
    function OnRequestChangeSeatRoom_S(rev: Cmd.RequestChangeSeatRoom_S): void;
    /**
     * 货币更新通知
     */
    function OnMoneyUpdateCmd_S(rev: Cmd.MoneyUpdateCmd_S): void;
    /**
     *  C-&gt;S 压注请求
     *  S-&gt;C 压注通知
     */
    function OnBetRoomCmd_CS(rev: Cmd.BetRoomCmd_CS): void;
    /**
     * 底分更新通知
     */
    function OnPointBaseUpdateCmd_S(rev: Cmd.PointBaseUpdateCmd_S): void;
    /**
     *  C-&gt;S 准备/取消准备请求
     *  S-&gt;C 更新准备状态
     */
    function OnReadyUpdateRoomCmd_CS(rev: Cmd.ReadyUpdateRoomCmd_CS): void;
    /**
     * 启动牌局
     */
    function OnEnableRoundCmd_CS(rev: Cmd.EnableRoundCmd_CS): void;
    /**
     *游戏开始
     */
    function OnStartGameCmd_S(rev: Cmd.StartGameCmd_S): void;
    /**
     *倍数更新
     */
    function OnMultipleUpdateCmd_S(rev: Cmd.MultipleUpdateCmd_S): void;
    /**
     *发牌
     */
    function OnDealCardCmd_S(rev: Cmd.DealCardCmd_S): void;
    /**
     * 更新手牌
     */
    function OnHandCardUpdateCmd_S(rev: Cmd.HandCardUpdateCmd_S): void;
    /**
     *  C-&gt;S 出牌请求
     *  S-&gt;C 出牌通知
     */
    function OnPlayCardCmd_CS(rev: Cmd.PlayCardCmd_CS): void;
    /**
     *操作位轮转 广播
     */
    function OnNewOperateSeatCmd_S(rev: Cmd.NewOperateSeatCmd_S): void;
    /**
    * 押注圈结束
    */
    function OnCircleEndCmd_S(rev: Cmd.CircleEndCmd_S): void;
    /**解散房间数据跟新 */
    function OnDissolveRoomUpdateCmd_S(rev: Cmd.DissolveRoomUpdateCmd_S): void;
    /**
     * 轮到玩家抢\叫地主通知
     */
    function OnLandlordOptionCmd_S(rev: Cmd.LandlordOptionCmd_S): void;
    /**
     *  C-&gt;S 抢地主请求
     *  S-&gt;C 玩家抢地主通知
     */
    function OnLandlordRobCmd_CS(rev: Cmd.LandlordRobCmd_CS): void;
    /**
     *  C-&gt;S 叫地主请求
     *  S-&gt;C 玩家叫地主通知
     */
    function OnLandlordCallCmd_CS(rev: Cmd.LandlordCallCmd_CS): void;
    /**
     *  C->S 踢 操作请求
     *  S->C 踢 操作通知
     */
    function OnKickPlayCmd_CS(rev: Cmd.KickPlayCmd_CS): void;
    /**
     * 轮到玩家踢操作
     */
    function OnKickPlayOptionalCmd_S(rev: Cmd.KickPlayOptionalCmd_S): void;
    /**
     * 产生地主通知
     */
    function OnLandlordUpdateCmd_S(rev: Cmd.LandlordUpdateCmd_S): void;
    /**
     * 系统通知
     */
    function OnSysMessageCmd_S(rev: Cmd.SysMessageCmd_S): void;
    /**
     * 离开房间
     */
    function OnLeaveRoomCmd_CS(rev: Cmd.LeaveRoomCmd_CS): void;
    /**
    * 离开房间  暂时用于车行争霸，百家乐
    */
    function OnLeaveRoomCmd_S(rev: Cmd.LeaveRoomCmd_S): void;
    /**
     * 离开房间  暂时用于车行争霸，百家乐
     */
    function OnLeaveRoomCmd_Brd(rev: Cmd.LeaveRoomCmd_Brd): void;
    /**
     * 单局结算通知
     */
    function OnRoundResultCmd_S(rev: Cmd.RoundResultCmd_S): void;
    /**
     * 游戏托管
     */
    function OnHostUpdateRoomCmd_CS(rev: Cmd.HostUpdateRoomCmd_CS): void;
    /**
     * 牌局结束
     */
    function OnFinalResult_S(rev: Cmd.FinalResult_S): void;
    /**
     * 服务器逻辑时间
     */
    function OnGameTimeSyncCmd_CS(rev: GameTimeSyncCmd_CS): void;
    /**
     * 换牌GM
     */
    function OnGmAvailableCardUpdateCmd_CS(rev: Cmd.GmAvailableCardUpdateCmd_CS): void;
    /**
     * 门筹码更新
     */
    function OnDoorUpdataCmd_S(rev: Cmd.DoorUpdataCmd_S): void;
    /**
     * 押注数更新
     */
    function OnBetUpdateCmd_S(rev: Cmd.BetUpdateCmd_S): void;
    let settleTimer: number;
    /**
     * 游戏状态新
     */
    function OnGameStatusUpdateCmd_S(rev: Cmd.GameStatusUpdateCmd_S): void;
    /**
     * 等待上庄列表更新
    */
    function OnBankerWaitListUpdateCmd_S(rev: Cmd.BankerWaitListUpdateCmd_S): void;
    /**
     * 更新庄家信息
     */
    function OnBankerUpdateCmd_S(rev: Cmd.BankerUpdateCmd_S): void;
    /**
     * 底牌更新通知
     */
    function OnBottomCardUpdateCmd_S(rev: Cmd.BottomCardUpdateCmd_S): void;
    /**
     * 排名通知
     */
    function OnRankUpdateCmd_S(rev: Cmd.RankUpdateCmd_S): void;
    /**
     * 历史记录
     */
    function OnHistoryUpdateCmd_CS(rev: Cmd.HistoryUpdateCmd_CS): void;
    /**
     * 在线状态更新
     */
    function OnOnlineStateRoomCmd_S(rev: Cmd.OnlineStateRoomCmd_S): void;
    /**
    * 送礼
    */
    function OnSendGiftRoomCmd_Brd(rev: Cmd.SendGiftRoomCmd_Brd): void;
    /**
     *  C-&gt;S 下注请求
     *  S-&gt;C 下注通知
     */
    function OnSitDownCmd_CS(rev: Cmd.SitDownCmd_CS): void;
    /**
     *  通知客户端显示具体的牌
     */
    function OnShowCards_S(rev: Cmd.ShowCards_S): void;
    /**
     *  开始游戏操作位更新
     */
    function OnStartGameOpIdUpdate_S(rev: Cmd.StartGameOpIdUpdate_S): void;
    /**
     * 座位状态更新
     */
    function OnSeatStateUpdate_S(rev: Cmd.SeatStateUpdate_S): void;
    /**
     * 组成牛牛牌型提示
     */
    function OnNeedNiuNiuCard_S(rev: Cmd.NeedNiuNiuCard_S): void;
    /**
    * 展示牌提示
    */
    function OnDisplayCardCmd_CS(rev: Cmd.DisplayCardCmd_CS): void;
    /**
    * 保险阶段开始
    */
    function OnInsuranceStartCmd_S(rev: Cmd.InsuranceStartCmd_S): void;
    /**
    * 保险可购买通知
    */
    function OnInsuranceNewOpCmd_S(rev: Cmd.InsuranceNewOpCmd_S): void;
    /**
     *  C-&gt;S 买入保险请求
     *  S-&gt;C 买入保险通知
     */
    function OnInsuranceBuyCmd_CS(rev: Cmd.InsuranceBuyCmd_CS): void;
    /**
     * 购买保险结束
     */
    function OnInsuranceBuyEndCmd_S(rev: Cmd.InsuranceBuyEndCmd_S): void;
    /**
     * 购买记分牌
     */
    function OnRoomBuyBringCmd_CS(rev: Cmd.RoomBuyBringCmd_CS): void;
    /**
     * 房间数字更新
     */
    function OnGameNumberUpdateCmd_S(rev: Cmd.GameNumberUpdateCmd_S): void;
    /**
     * 投票数据更新
     */
    function OnVoteUpdateCmd_S(rev: Cmd.VoteUpdateCmd_S): void;
    /**
     * 更新可以进行的动作
     */
    function OnUpdateActionCmd_S(rev: Cmd.UpdateActionCmd_S): void;
    /**
     * 比牌结果通知
     */
    function OnCompareCardCmd_CS(rev: Cmd.CompareCardCmd_CS): void;
    /**
     * 比牌结果通知
     */
    function OnRiseBlindCmd_S(rev: Cmd.RiseBlindCmd_S): void;
    /**
     * 更新玩家个人信息
     */
    /**
     * 收藏牌谱更新(只有德州扑克游戏端用，放在poker处理)
     */
    function OnRoundRecordIdUpdateCmd_CS(rev: Cmd.RoundRecordIdUpdateCmd_CS): void;
    /**
     * 收藏牌谱回复
     */
    function OnRoundRecordCollectCmd_CS(rev: Cmd.RoundRecordCollectCmd_CS): void;
    /**
     * 强制盲注更新通知
     * @param  {Cmd.StraddleIdUpdateCmd_S} rev
     */
    function OnStraddleIdUpdateCmd_S(rev: Cmd.StraddleIdUpdateCmd_S): void;
    /**
     * 排行榜
     */
    function OnRankingListCmd_CS(rev: Cmd.RankingListCmd_CS): void;
    function OnPlayingUpdateCmd_CS(rev: Cmd.PlayingUpdateCmd_CS): void;
    /**
     * 观众信息更新
     */
    function OnAudienceUpdateCmd_CS(rev: Cmd.AudienceUpdateCmd_CS): void;
    /**
     * 出鱼信息
     */
    function OnSpawnFishCmd_S(rev: Cmd.SpawnFishCmd_S): void;
    /**
     * 打中鱼列表
     */
    function OnHitFishCmd_CS(rev: Cmd.HitFishCmd_CS): void;
    /**
     * 打死列表
     */
    function OnDeadFishCmd_S(rev: Cmd.DeadFishCmd_S): void;
    /**
     * 改变场景
     */
    function OnChangeSceneCmd_S(rev: Cmd.ChangeSceneCmd_S): void;
    /**
     * 操作通知
     */
    function OnActionCmd_CS(rev: Cmd.ActionCmd_CS): void;
    let betTimeoutTipsPanel: game.BetTimeoutTipsPanel;
    /**
     * 操作超时
     */
    function OnBetTimeoutRoomCmd_S(rev: Cmd.BetTimeoutRoomCmd_S): void;
}

declare module game {
    /**
     * 消息处理方法
     */
    class MessageHandle {
        /**
         * 更新所有座位数据
         */
        static ReplaceSeatData(seatList: Cmd.SeatData[]): void;
        /**
         * 更新未坐下玩家数据
         */
        static ReplaceAudienceList(audienceList: Cmd.GameObjectData[]): void;
        /**
         * 更新当前牌局操作
         */
        static ReplaceRoundData(room: Cmd.RoomData): void;
        /**
         * 房间数据更新
         */
        static HBRoomDataUpdate(rev: Cmd.RoomDataUpdateCmd_S): void;
        static showTipsEvent(data: Cmd.RoomDataUpdateCmd_S): void;
        /**
         * 更新德扑数据
         */
        static updataTexas(texas: Cmd.TexasRoundInfo): void;
        /**
         * 德扑数据
         */
        static updataTexasConfig(texas: Cmd.TexasConfig): void;
        /**
         * 更新角色金币
         */
        static updataMoney(user: UserInfo, money: Cmd.MoneyUpdateCmd_S.Update): void;
        /**
         * 数位压注跟新
         */
        static refrenshBetData(value: Cmd.DigitChips, betData: Cmd.BetData): Cmd.BetData;
        /**
         * 门下注更新（大小单双）
         */
        static refrenshDoorData(value: Cmd.DoorChips, betData: Cmd.BetData): Cmd.BetData;
        /**
         * 余数下注
         */
        static refrenshFourDoorData(value: Cmd.DoorChips, betData: Cmd.BetData): Cmd.BetData;
        static refrenshList(value: Cmd.DigitChips, list: Cmd.DigitChips[]): Cmd.DigitChips[];
        /**
         * 所有人下注更新
         */
        static refrenshAllBetData(rev: Cmd.BetData): void;
        /**
         * 自己下注更新
         */
        static refrenshMeBetData(rev: Cmd.BetData): void;
        private static assignmentList(list1, list2);
        private static assignmentDoorList(door1, door2);
    }
}

declare module game {
    /**
     * ui界面的父类 继承子eui.Component
     */
    abstract class BaseUI extends eui.Component implements UIClickInterface, ActionInterface {
        constructor();
        private onAddToStage();
        private onRemoveFromStage();
        /**
         * 销毁 子类重写次方法时需要调用次方法，以销毁父类事件
         */
        destroy(): void;
        /**
         * 监听数据更新事件 需手动调用
         */
        addActionListener(): void;
        /**
         * 移除数据更新事件 切换场景是自动卸载
         */
        removeActionListener(): void;
        /**
         * 监听ui事件 添加到舞台是自动调用
         */
        abstract addUIListener(): void;
        /**
         * 移除ui事件 移除舞台是自动调用
         */
        abstract removeUIListener(): void;
        /**
        * 面板宽度适配至舞台宽度
        */
        protected adaptationWidth(): void;
        /**
        * 面板高度适配至舞台高度
        */
        protected adaptationHeight(): void;
        /**
         * 注入多语言
         */
        protected registerLanguage(): void;
        /**
         * 子类在registerLanguage之后 语音切换之后会自动调用此方法
         */
        protected updataLanguage(): void;
    }
}

declare module game {
    /**
     *
     */
    class BetTimeoutTipsPanel extends eui.Component {
        private exml;
        wordImage: eui.Image;
        bitmapLabel: eui.BitmapLabel;
        private bgImage;
        private msgLabel;
        timer: number;
        constructor();
        setBitmapLabel(msg: string): void;
        setLabel(msg: string): void;
        close(): void;
    }
}

declare module game {
    /**
     * ui交互模式选择
     */
    module UIInteractive {
        /**
        *   按钮点击后高亮反馈
         */
        let Bright: string;
        /**
        *   按钮点击后缩放反馈
         */
        let Scale: string;
    }
}
declare module game {
    class Button extends eui.Button {
        constructor();
        destroy(): void;
        /**
         * ui交互模式选择 game.UIInteractive
         */
        interactive: string;
        /**
        * 组件是否可以接受用户交互。
        * 将 enabled 属性设置为 false 后，
        * 组件会自动禁用触摸事件(将 touchEnabled 和 touchChildren 同时设置为 false)，
        * 部分组件可能还会将皮肤的视图状态设置为"disabled",使其所有子项的颜色变暗。
        *
        * @default true
        *
        * @version Egret 2.4
        * @version eui 1.0
        * @platform Web,Native
        * @language zh_CN
        */
        enabled: any;
    }
}

declare module eui {
    interface Component {
        customUIInteractive(): void;
        interactive_onAddToStage(): void;
        interactive_onRemoveFromStage(): void;
        interactive_destroy(): void;
        interactive_addUIListener(): void;
        interactive_removeUIListener(): void;
        interactive_changeStatus(e: egret.TouchEvent): void;
        $interactive: string;
    }
}

declare module game {
    /**
     * 适合skinName游戏面板 并有UI点击事件或有行为特效的面板
     */
    abstract class EuiPanel extends eui.Component implements UIClickInterface, ActionInterface {
        constructor();
        private onAddToStage();
        private onRemoveFromStage();
        destroy(): void;
        /**
        * 面板宽度适配至舞台宽度
        */
        protected adaptationWidth(): void;
        /**
         * 注入多语言
         */
        protected registerLanguage(): void;
        /**
         * 子类在registerLanguage之后 语音切换之后会自动调用此方法
         */
        protected updataLanguage(): void;
        addActionListener(): void;
        removeActionListener(): void;
        abstract addUIListener(): void;
        abstract removeUIListener(): void;
    }
}

declare module game {
    /**
     * 快速坐下
     * registerSkin 可自定义快速坐下皮肤 游戏层注册此方发后 此组件显示隐藏根据玩家坐下站起状态切换
     */
    class FastSitDown {
        /**
         * 注册 快速坐下
         * @param exml  皮肤名
         * @param x  组件坐标
         * @param y  组件坐标
         */
        static registerSkin(exml?: any, x?: number, y?: number): eui.Component;
        /**
         * 请入座提示
         * @param exml  皮肤名
         * @param x  组件坐标
         * @param y  组件坐标
         */
        static registerTipSkin(exml?: any, x?: number, y?: number): eui.Component;
        static destroy(): void;
        private static quicklySitDown;
        constructor();
        private m_buttonSkin;
        private m_tipsSkin;
        buttonSkin(exml: any, x?: number, y?: number): void;
        tipsSkin(exml?: any, x?: number, y?: number): void;
        destroy(): void;
        buttonX: number;
        buttonY: number;
        mainSeatChanged(value: game.USerSeatState): void;
        onClickTap(): void;
        /**
         * 自定义快速坐下组件
         */
        button: eui.Component;
        /**
         * 自定义快速提示
         */
        tips: eui.Component;
    }
}

declare module game {
    /**
     * 适合非skinName游戏面板 并有UI点击事件或有行为特效的面板
     */
    abstract class GuiPanel extends egret.Sprite implements UIClickInterface, ActionInterface {
        constructor();
        private onAddToStage();
        private onRemoveFromStage();
        destroy(): void;
        /**
        * 面板宽度适配至舞台宽度
        */
        protected adaptationWidth(): void;
        /**
         * 注入多语言
         */
        protected registerLanguage(): void;
        /**
         * 子类在registerLanguage之后 语音切换之后会自动调用此方法
         */
        protected updataLanguage(): void;
        addActionListener(): void;
        removeActionListener(): void;
        abstract addUIListener(): void;
        abstract removeUIListener(): void;
    }
}

declare module game {
    /**
     * UI点击接口
     */
    interface UIClickInterface {
        addUIListener(): void;
        removeUIListener(): void;
    }
    /**
     * 行为接口
     */
    interface ActionInterface {
        addActionListener(): void;
        removeActionListener(): void;
    }
}

declare module game {
    class ItemRenderer extends eui.ItemRenderer {
        constructor();
        destroy(): void;
        /**
         * ui交互模式选择 game.UIInteractive
         */
        interactive: string;
        /**
        * 组件是否可以接受用户交互。
        * 将 enabled 属性设置为 false 后，
        * 组件会自动禁用触摸事件(将 touchEnabled 和 touchChildren 同时设置为 false)，
        * 部分组件可能还会将皮肤的视图状态设置为"disabled",使其所有子项的颜色变暗。
        *
        * @default true
        *
        * @version Egret 2.4
        * @version eui 1.0
        * @platform Web,Native
        * @language zh_CN
        */
        enabled: any;
    }
}

declare module game {
    /**
     * 播放获取金币的动画，根据金币的数量播放不同的特效,有bigwin, megawin, hugewin, superwin四种
     * 具体播放什么特效，需要调用SetWinTypeGolds来设定
     * 使用方法:
     *   :初始化: 将ObtainGoldEffect.Instance添加到GX.GameLayerManager.effectLayer或者其他特效层
     *       GX.GameLayerManager.effectLayer.addChild(ObtainGoldEffect.Instance);
     *
     *       ObtainGoldEffect.Instance.SetWinTypeGolds([200,500,1000,2000]);
     *       ObtainGoldEffect.Instance.SetGoldChangeSound("goldchange_mp3");
     *       ObtainGoldEffect.Instance.PlayGoldEffect(3000, this.onFinishGoldAnim, this);
     */
    class ObtainGoldEffect extends game.BaseUI {
        private static m_Instance;
        static Instance: ObtainGoldEffect;
        static clearInstance(): void;
        private static GoldAnimPath;
        private static GoldAnimStartAction;
        private static GoldAnimTypeLoopActions;
        private static GoldAnimTypeChangeAnimPath;
        private static GoldAnimTypeChangeAnimPathAction;
        private static GoldAnimChangeEventName;
        private mMinTime;
        private mMaxTime;
        private mMinTimeGold;
        private mMaxTimeGold;
        private mGoldTypeNumbers;
        private mGoldAnim;
        private mEndLoadResourceCB;
        private mGoldChangeAnim;
        private static mGoldSoundPath;
        private static mGrayRectSkin;
        private static mGoldLabelSkin;
        private static mGoldAnimGroupSkin;
        private static mClickCloseRectSkin;
        private mGoldAnimGroup;
        private mGoldLabel;
        private mClickCloseRect;
        private mGrayRect;
        private mBreakPlayFlyAnim;
        constructor();
        addUIListener(): void;
        removeUIListener(): void;
        /**
         * 加载动画资源
         */
        protected LoadResource(): void;
        protected initUI(): void;
        /**
         * 设置滚动动画的最短最长时间;
         */
        SetAnimMinMaxTime(minTime: number, maxTime: number): void;
        /**
         * 设置金币变换的声音路径;
         */
        SetGoldChangeSound(soundPath: string): void;
        /**
         * 设置获奖不同等级的金币数量
         * @param 	goldTypeNumbers: number[4], 各个金币特效的金币临界点
         * @return  无
         */
        SetWinTypeGolds(goldTypeNumbers: number[]): void;
        /**
         * 播放金币动画接口
         * @param 	obtainGold: 是所获得的金币数量
         * @param      maxTime: 播放特效的最长时间,如果不穿，使用默认的通过SetAnimMinMaxTime传入的时间
         * @param        endCB:	播放结束的回调函数.默认为空
         * @param       tarobj: 回调函数的调用者.默认为空
         */
        PlayGoldEffect(obtainGold: number, endCB?: Function, tarobj?: any, maxTime?: number): void;
        /**
         * 播放金币动画实现，调用该函数时，this.mGoldAnim必定一定加载完成;
         */
        private playGoldWinTypeAnimCB;
        private playGoldWinTypeAnimTarget;
        private mBigWinNumScaleChangeInterval;
        private playGoldEffectImpl(obtainGold, maxTime, endCB, tarobj);
        /**
         * 根据动画名称创建响应的动画,这里因为目前动画都是
         */
        private LoadDragonBoneAnimation();
        protected LoadDragonAnimFromUrl(animPath: string, completeCB: Function): void;
        /**
         * 数字滚动，从fromNum到toNum，持续时间 totalTm;
         */
        static scrollNumber(label: {
            text;
        }, fromNum: number, toNum: number, totalTm: number, cb?: Function, playSound?: boolean, intervalTime?: number): void;
        static lerp(fromNum: number, toNum: number, prop: number): number;
        /**
         * 播放金币变换的声音;
         */
        static playGoldChangeSound(): void;
        /**
         * 播放龙骨动画， 先播放非循环动画，播放完后再播放循环动画;
         */
        protected playDragonAnimations(onceAction: string, loopAction: string): void;
        protected getHighGoldScrollTime(gold: number): number;
        /**
         * 设置是否可以触摸结束动画;
         */
        setCanTouchFinishAnim(flag: any): void;
        /**
         * 点击closeRect的处理;
         */
        onEffectPanelCloseRect(): void;
        private PlayLightEffect(eventName, eventCB, endCB?);
    }
}

declare module game {
    class PanelManage {
        static panelList: Array<game.EuiPanel | game.GuiPanel | game.BaseUI | game.Button | game.ItemRenderer>;
        static addPanel(panel: game.EuiPanel | game.GuiPanel | game.BaseUI | game.Button | game.ItemRenderer): void;
        static destroyPanel(): void;
    }
}

declare module game {
    /**ping值 */
    class Ping extends egret.Sprite {
        /**ping值文本 */
        private pingText;
        /**定时器 */
        private pingTimer;
        /** 显示颜色数组*/
        private colorList;
        /**ping值梯度 */
        private pingGradient;
        private static _instance;
        /**ping值单例对象 */
        static instance: Ping;
        static clearInstance(): void;
        /**
         *
         */
        constructor();
        /**初始化 */
        private init();
        /**刷新ping值 不同ping值对应不同颜色*/
        private updatePing();
        /**设置ping值的为之 */
        setPingPos(x: number, y: number): void;
        /**设置ping值梯度 不同游戏可设置不同的梯度 */
        setpingGradient(list: number[]): void;
        /**
         * 设置颜色
         * @param list长度为3的颜色数组0->2对应ping值由低到高
         */
        setPingTextColorList(list: number[]): void;
        private onRemove();
    }
}

/**
 * 表格加载后立刻从引擎资源缓存中删除，避免占内存
 */
declare module table {
    module TablePokerCard {
        var $instance: table.TablePokerCard[];
        function instance(): table.TablePokerCard[];
        function resNormal(thisId: number): string;
        function cardName(thisId: number): string;
    }
}
declare module table {
    /**
     * 清除表缓存数据
     */
    function deleteCache(): void;
}

declare module table {
    module TableLobbyGameList {
        var $instance: table.TableLobbyGameList[];
        function instance(): table.TableLobbyGameList[];
        function getConfig(lobbyId: number): table.TableLobbyGameList;
        function getLobbyConfig(): table.TableLobbyGameList;
        function gameList(): Array<number>;
    }
}
declare module table {
    module TableCreateConfigList {
        var $instance: table.TableCreateConfigList[];
        function instance(): table.TableCreateConfigList[];
        function getConfig(gameId: number): table.TableCreateConfigList;
    }
}
declare module table {
    module TableExchangeConfig {
        var $instance: table.TableExchangeConfig[];
        function instance(): table.TableExchangeConfig[];
        function getConfig(lobbyId: number): table.TableExchangeConfig[];
    }
}
declare module table {
    module TableLanguage {
        var $instance: table.TableLanguage[];
        function instance(): table.TableLanguage[];
        var $chineseMap: {
            [chinese: string]: table.TableLanguage;
        };
        function chineseMap(): {
            [chinese: string]: table.TableLanguage;
        };
        var $codeMap: {
            [code: number]: table.TableLanguage;
        };
        function codeMap(): {
            [code: number]: table.TableLanguage;
        };
    }
}
declare module table {
    module TableShopConfig {
        var $instance: table.TableShopConfig[];
        function instance(): table.TableShopConfig[];
        function getConfig(shopId: number): table.TableShopConfig;
    }
}
declare module table {
    module TableGoodsConfig {
        var $instance: table.TableGoodsConfig[];
        function instance(): table.TableGoodsConfig[];
        function getConfig(lobbyId: number): table.TableGoodsConfig;
    }
}
declare module table {
    module TableRoomCostConfig {
        var $instance: table.TableRoomCostConfig[];
        function instance(): table.TableRoomCostConfig[];
        function getConfig(lobbyId: number): table.TableRoomCostConfig[];
    }
}
