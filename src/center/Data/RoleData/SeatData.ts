/**
 * 座位项数据
 * @author suo
 */
class SeatData {

	/**
	 * 座位数据 
	 */	
	public seatData:game.SeatData;
	/**
	 * 玩家数据
	 */
	public playerInfo:game.UserInfo;
	/**
	 * 金钱
	 */
	public money:number;
	/**
	 * 头像URL
	 */
	public headUrl:string;
	/**
	 * 昵称
	 */
	public nickName:string;
	/**
	 * 座位ID
	 */
	public seatID:number;
	/**
	 * uid
	 */
	public uid:number;


	public constructor(seatData:game.SeatData) {
		this.seatData = seatData;
		this.seatID = seatData.seatId;
		this.seatData.userChanged.add(this._userChange,this);
	}

	/**
	 * 座位上玩家改变
	 */
	private _userChange(playerInfo:game.UserInfo):void{
		if(!playerInfo){
			this._clear();
			return;
		}
		this.uid = playerInfo.uid;
		this.playerInfo = playerInfo;
		this.playerInfo.nameChanged.add(this._nameChanged, this);
		this.playerInfo.headUrlChanged.add(this._headChanged,this);
		this.playerInfo.pointChanged.add(this._onMoneyChanged,this);
	}

	/**
	 * 姓名被更改时
	 */
	private _nameChanged():void{
		this.nickName = this.playerInfo.nickName;
	}

	/**
	 * 头像变更
	 */
	private _headChanged():void{
		this.headUrl = this.playerInfo.headUrl;
	}

	/**
	 * 金币更变
	 */
	private _onMoneyChanged(){
		this.money = this.playerInfo.point;
	}

	/**
	 * 清理
	 */
	private _clear():void{
		this.uid = -1;
	}

	/**
	 * 释放
	 */
	public dispose():void{
		if(this.playerInfo){
			this.playerInfo.nameChanged.remove(this._nameChanged, this);
			this.playerInfo.headUrlChanged.remove(this._headChanged,this);
			this.playerInfo.pointChanged.remove(this._onMoneyChanged,this);
		}
		this.seatData.userChanged.remove(this._userChange,this);
		this.seatData = null;
		this.playerInfo = null;
	}
}