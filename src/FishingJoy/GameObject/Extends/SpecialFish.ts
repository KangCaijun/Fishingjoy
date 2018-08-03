/**
 * 特殊鱼
 */
module gameObject {
	export class SpecialFish extends Fish {
		public constructor() {
			super();
		}

		/**
         * 初始化
         */
		public initialize(): void {
			super.initialize();
		}

		/**
		 * 反初始化
		 */
		public uninitialize(): void {
			super.uninitialize();
		}

		/**
		 * 释放
		 */
		public dispose(): void {
			super.dispose();
		}
	}
}