/**
 * 游戏对象接口集合
 * @author suo
 */
module gameObject {

	/**
	 * 类似于egret.IEventDispatcher 和 egret.EventDispatcher 
	 * 变相实现多继承
	 */
	export interface IGameObject extends GameObject {
	}

	/**
 	 * 游戏对象可变属性接口
 	 * @author suo
 	 */
	export interface IGameObjectVars {
		/*出生坐标X*/
		bornX: number,
		/*出生坐标Y*/
		bornY: number,
		/*旋转角度*/
		rotation?: number,
		/*操作类型*/
		operation?: IOperation[],
	}

	/**
	 * 带碰撞器物体的接口
	 */
	export interface IColliderInitOnce extends IReadOnlyData {
		/*碰撞器数据*/
		colliderAry: ICollider[]
		/*是否精确碰撞*/
		isAccurateCollider: boolean
	}

	/**
	 * 操作类型
	 */
	export interface IOperation {
		/*类型*/
		type: OPERATION_TYPE,
		/*方向*/
		direction?: DIRECTION,
		/*指定坐标X*/
		pointX?: number,
		/*指定坐标Y*/
		pointY?: number,
		/*旋转角度*/
		rotation?: number,
		/*出生时间*/
		bornTime?: number
		/*移动速度*/
		speed?: number
	}

	/**
	 * 子弹接口
	 */
	export interface IBulletVars extends IGameObjectVars {
		/**
		 * 子弹标记
		 */
		sign: GAMEOBJECT_SIGN,
		/**
		 * 服务器ID
		 */
		servelID: number,
        /**
         * 玩家id
         */
		playerUID: number,
		/**
		 * 跟踪目标鱼
		 */
		targetFish: gameObject.Fish,
	}

	/**
	 * 鱼数据接口
	 */
	export interface IFishVars extends IGameObjectVars {
		/**
         * 路径id
         */
		pathId: string;
        /**
         * 出鱼时间
         */
		spawnTime: number;
		/**
		 * 服务器ID
		 */
		serveID: number;
		/**
		 * 鱼技能ID
		 */
		skillID: Cmd.FishSkillType;
		/**
		 * 相对于路径x的偏移量
		 */
		offsetX: number;
		/**
		 * 相对于路径x的偏移量
		 */
		offsetY: number;
		/**
		 * 是否断线重连
		 */
		reconnection: boolean;
	}

	/**
	 * 游戏对象配置接口
	 */
	export interface IGameObjectConfig {
		/*资源*/
		asset: IGameObjectAsset;
		/*当创建对象时 仅初始化一次的数据*/
		initOnceData: IReadOnlyData;
		/*配置*/
		table?: any;
	}

	/**
	 * 初始化一次 不可更改数据 example：碰撞器（通常与美术资源绑定）
	 */
	export interface IReadOnlyData {

	}

	/**
	 * 渔网初始化数据
	 */
	export interface IFishingNetInitOnce extends IColliderInitOnce {
		/*渔网数量*/
		netNum: number;
	}

	/**
	 * 鱼初始化一次数据
	 */
	export interface IFishInitOnce extends IColliderInitOnce {
		/*生命*/
		life: number,
		/*速度*/
		speed: number,
		/*赔率*/
		odds: number,
		/*绝对锚点X*/
		anchorOffsetX: number,
		/*绝对锚点Y*/
		anchorOffsetY: number,
		/*是否镜像*/
		isMirror: boolean,
	}

	/**
	 * 子弹初始化一次数据
	 */
	export interface IBulletInitOnce extends IColliderInitOnce {
		/*伤害*/
		damage: number,
		/*发射间隔 毫秒*/
		interval: number,
		/*极速状态下的发射间隔 毫秒*/
		fastInterval: number,
		/*等级*/
		level: number
		/*速度*/
		speed: number
	}

	/**
	 * 资源加载接口
	 */
	export interface IGameObjectAsset {
		/*资源key*/
		readonly imageAry?: IImagePlayer[],
		/*如果是MovieClip 填写Action*/
		readonly movieClipAry?: IMoviePlayer[],
	}

	/**
	 * 图片接口
	 */
	export interface IImagePlayer {

		/*键名*/
		readonly keyName: string,
		/*资源名*/
		readonly sourceName: string,
		/*X偏移*/
		readonly offsetX?: number,
		/*Y偏移*/
		readonly offsetY?: number,
		/*X缩放*/
		readonly scaleX?: number,
		/*y缩放*/
		readonly scaleY?: number,
	}

	/**
	 * 影片剪辑接口
	 */
	export interface IMoviePlayer {
		/*键名*/
		readonly keyName: string,
		/*组名字组*/
		readonly groupName: string,
		/*动作名字组*/
		readonly actionName: string,
		/*X偏移*/
		readonly offsetX?: number,
		/*Y偏移*/
		readonly offsetY?: number,
		/*帧率*/
		readonly frameRate?: number,
		/*X缩放*/
		readonly scaleX?: number,
		/*y缩放*/
		readonly scaleY?: number,
	}

	/**
	 * 碰撞器接口
	 */
	export interface ICollider {
		/*x坐标*/
		posX: number,
		/*y坐标*/
		posY: number,
		/*半径*/
		radius?: number,
	}

	/**
	 * 渔网参数
	 */
	export interface IFishNetVars extends IGameObjectVars {
		/*网半径*/
		radius: number,
	}


	/**
	 * 美人鱼特效参数
	 */
	export interface IMermaidEffVars extends IGameObjectVars {
		/*目标炮台*/
		targetBattery: gameObject.Battery,
		/*玩家昵称*/
		playerNickName: string,
		/*金币*/
		score: number,
	}

	/**
	 * 金龙鱼特效参数
	 */
	export interface IDragonEffVars extends IGameObjectVars {
		/*目标炮台*/
		targetBattery: gameObject.Battery,
		/*玩家昵称*/
		playerNickName: string,
		/*金币*/
		score: number,
	}



	/**
	 * 爆炸参数
	 */
	export interface IBurstInitOnce extends IColliderInitOnce {
	}

}
