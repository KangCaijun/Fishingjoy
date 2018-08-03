/**
 * 影片剪辑集合
 * @author suo
 */
module FishingJoy {
	export class MovieClipCenter {

		/*单例*/
		private static _instance: MovieClipCenter = null;

		public constructor() {
		}

		/**
		 * 获得单例
		 */
		public static get instance(): MovieClipCenter {
			if (this._instance == null) {
				this._instance = new MovieClipCenter();
			}
			return this._instance;
		}

	}
}