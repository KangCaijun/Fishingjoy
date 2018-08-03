module game {
	/**
	 * 扑克常量
	 */
	export class GameConstant {
		public static ResGroup_BY = "buyu_preload"

		private static m_seatPositonList: Array<egret.Point>;

		/**
		 * 同组鱼偏移
		 */
		private static curSameGroupNo: number = 0;
		private static sameGroupOffset: Array<{ offsetX: number, offsetY: number }> = [{ offsetX: 0, offsetY: 0 }, { offsetX: -210, offsetY: -105 }, { offsetX: -210, offsetY: 105 }];
		public static getSameGroupOffset(): { offsetX: number, offsetY: number } {
			if (this.curSameGroupNo > 2) {
				this.curSameGroupNo = 0;
			}
			return this.sameGroupOffset[this.curSameGroupNo++];
		}
		/**
		 * 座位坐标
		 */
		public static get SeatPositonList(): Array<egret.Point> {
			this.m_seatPositonList = [new egret.Point(300, 620), new egret.Point(980, 620),
			new egret.Point(300, 100), new egret.Point(980, 100)]
			return this.m_seatPositonList;
		}

		public static updataStageSize() {
			// egret.MainContext.instance.stage.setContentSize(1440, 720);
			if (!uniLib.ZQGameSdk["getNativeWH"])
				return;
			uniLib.ZQGameSdk["getNativeWH"](function (data) {
				if (data == null) {
					egret.MainContext.instance.stage.setContentSize(1280, 720);
				} else {
					if (data.cmd && data.cmd == uniLib.ZQGameSdk["NATIVE_WIDTH_HEIGHT"] && data.code != null && data.code == 0) {
						let width = data.data != null && data.data.width != null ? data.data.width : null;
						let height = data.data != null && data.data.height != null ? data.data.height : null;
						if (width != null && height != null && (width / height) >= 2) {
							egret.MainContext.instance.stage.setContentSize(1440, 720);
						} else {
							egret.MainContext.instance.stage.setContentSize(1280, 720);
						}
					} else {
						egret.MainContext.instance.stage.setContentSize(1280, 720);
					}
				}
			});
		}
		/**
         * 获取本地座位Id 通过服务器座位ID 在初始分配座位的使用
         */
		public static GetClientNoBySeatId(id: number) {
			let mainSeat = PokerFunction.MainSeatId;
			if (mainSeat < 3) {
				return id;
			}
			if (id == 4)
				return 1;
			if (id == 3)
				return 2;
			if (id == 2)
				return 3;
			if (id == 1)
				return 4;
			return id;
		}
		/**
		 * 获取座位位置通过本地座位id
		 */
		public static GetSeatPositionBySeatId(seatId: number): egret.Point {
			let seatPoint = GameConstant.SeatPositonList[seatId - 1];
			return seatPoint;
		}

		/**
         * 获取座位位置通过本地座位id
         */
		public static GetSeatPositionByClientNo(clientNo: number): egret.Point {
			let seatPoint = GameConstant.SeatPositonList[clientNo - 1];
			return seatPoint;
		}


	}
}