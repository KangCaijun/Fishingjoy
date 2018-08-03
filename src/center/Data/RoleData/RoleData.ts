/**
 * 房间数据
 * @author suo
 */
class RoleData {
	/*房间内玩家数据list*/
	public seatListMap:Dictionary= new Dictionary();

	public constructor() {
		game.RoomData.Instance.addSeatChanged.add(this._addSeat, this);
		game.RoomData.Instance.delectSeatChanged.add(this._roomPlayerListDel, this);
	}

	/**
	 * 座位发生改变时
	 */
	private _addSeat(seat: game.SeatData):void{
		if(!seat){
			return;
		}
		if(this.seatListMap.indexOf(seat.seatId) == -1){
			let seatData:SeatData = new SeatData(seat);
			this.seatListMap.set(seat.seatId,seatData);
		}
		else{
			// console.assert(false,"已经存在该座位了!");
		}
	}

	

	/**
	 * 玩家退出消息（删座位一定删玩家）
	 */
	private _roomPlayerListDel(seatID:number):void{
		if(this.seatListMap.indexOf(seatID)){
			let temp:SeatData = this.seatListMap.get(seatID);
			temp.dispose();
			this.seatListMap.remove(seatID)
		} 
		else{
			// console.assert(false,"删除失败 不存在该座位!");
		}
	}

	/**
	 * 释放
	 */
	public dispose():void{
		this.seatListMap.clear();
		game.RoomData.Instance.addSeatChanged.remove(this._addSeat, this);
		game.RoomData.Instance.delectSeatChanged.remove(this._roomPlayerListDel, this);
	}
}