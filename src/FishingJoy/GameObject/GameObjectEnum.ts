/**
 * 游戏对象枚举
 * @author suo
 */
module gameObject {

}

/**
 * 物体对象标志（一般将相同资源的对象 命名同一个sign）
 */
const enum GAMEOBJECT_SIGN {
    /*别人的子弹*/
    BULLET_OTHER = 10000,
    BULLET_OTHER_2 = 10001,
    BULLET_OTHER_3 = 10002,
    /*自己的子弹*/
    BULLET_SELF = 10005,
    BULLET_SELF_2 = 10006,
    BULLET_SELF_3 = 10007,
   
    /*炮台*/
    BATTERY = 20000,
    /*渔网*/
    FishingNet_Green = 30000,
    FishingNet_BLUE_2 = 30001,
    FishingNet_BLUE_3 = 30003,

    FishingNet_Self = 30005,
    FishingNet_BROWN_2 = 30006,
    FishingNet_BROWN_3 = 30007,

    /*爆炸*/
    BURST = 40000,
    /*美人鱼特效*/
    MERMAID_EFF = 40001,
    /*金龙鱼特效*/
    DRAGON_EFF = 40002,
    /*鱼*/
    FISH_1 = 1,
    FISH_2 = 2,
    FISH_3 = 3,
    FISH_4 = 4,
    FISH_5 = 5,
    /*剑旗鱼*/
    JIAN_QI_YU = 22,
    /*蓝鲨*/
    BIG_BULE_FISH = 28,
    /*大黑鱼*/
    BIG_BLACK_FISH = 29,
    /*大金鱼*/
    BIG_GOLD_FISH = 30,
    /*炸弹鱼*/
    BOOM_FISH = 1001,
    /**金龙鱼*/
    DRAGON = 2001,
    /**美人鱼*/
    MERMAID = 2002,
}
/**
 * 操作类型
 */
const enum OPERATION_TYPE {
    MASTER,
    BULLET,
    BulletTrack,
    SIMPLE,
    FISH,
    BATTERY,
}

/**
 * 队伍
 */
const enum TEAM {
    MASTER,
    ENEMY,
    FRIEND
}

/**
 * 鱼方向
 */
const enum DIRECTION {
    NO = 1,
    RIGHT_OR_LEFT = 2,
    DOWN_OR_UP = 3
}

/**
 * 方向
 */
const enum FISH_DIRECTION {
    UP_TO_DOWN,
    DOWN_TO_UP,
    LEFT_TO_RIGHT,
    RIGHT_TO_LEFT,
    NO,
}

/**
 * 场景id
 */
const enum SCENEID {
    /**
     * 沉船
     */
    ChenChuan = 1,
    /**
     * 碎石
     */
    SuiShi = 2,
    /**
     * 遗迹
     */
    YiJi = 3,
    /**
     * 浅滩
     */
    QianTan = 4,
    /**
     * 海底宝藏
     */
    HaiDiBaoZang = 100029,
    /**
     * 海底宫殿
     */
    HaiDiGongDian = 100030,
}