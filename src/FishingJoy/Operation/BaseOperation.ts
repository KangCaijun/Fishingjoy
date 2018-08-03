/**
 * 操作控制器基类
 * @author suo
 */
module operation {
    export abstract class BaseOperation {

        /**
         * 操作类型
         */
        public operationType: OPERATION_TYPE;

        constructor() {

        }
        /**
         * 父类必须调用super.register()
         */
        public abstract register(gameObj: gameObject.GameObject): void

        /**
         * 父类必须调用super.unregister()
         */
        public abstract unregister(): void


        public enterFrame(): void {

        }

    }
}