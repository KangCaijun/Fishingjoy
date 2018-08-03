/**
 * 捕鱼主逻辑
 * @author suo
 */
module FishingJoy {
    export class FishingJoyLogic {

		/**
		 * 在屏幕内的鱼字典(key：鱼uid value：鱼)
		 */
        public inViewFishes: Dictionary = new Dictionary();
		/**
		 * 在屏幕内的子弹字典(场景内所有的子弹 跟表现绑定 key子弹uid value子弹)
		 */
        public inViewBullets: Dictionary = new Dictionary();
		/**
		 * 所有的玩家炮台 key:玩家uid value:battery
		 */
        public allBattery: SimpleMap<gameObject.Battery> = new SimpleMap<gameObject.Battery>();
		/**
		 * 单例
		 */
        private static _instance: FishingJoyLogic = null;
		/**
		 * 玩家炮台
		 */
        public masterBattery: gameObject.Battery = null;


        private winAnim0: egret.MovieClip;
        private winAnim1: egret.MovieClip;
        /**
         * 记录每帧打中鱼列表
         */
        private hitFishList: Cmd.HitFish[] = [];
        public constructor() {

        }

		/**
		 * 从字典移除子弹
		 */
        private _removeBulletInMap(servelID: number): void {
            if (!this.inViewBullets.remove(servelID)) {
                // console.assert(false, "不存在该子弹！");
            }
        }

		/**
		 * 从字典移除鱼
		 */
        private _removeFishInMap(servelID: number): void {
            if (!this.inViewFishes.remove(servelID)) {
                console.assert(false, "不存在该鱼！");
            }
        }

		/**
		 * 从字典添加鱼
		 */
        private _addFishInMap(servelID: number, fish: gameObject.Fish): void {
            if (this.inViewFishes.isExist(servelID)) {
                console.assert(false, "已经存在该鱼！");
            }
            else {
                this.inViewFishes.set(servelID, fish)
            }
        }


		/**
		 * 从字典添加子弹
		 */
        private _addBulletInMap(servelID: number, bullet: gameObject.Bullet): void {
            if (this.inViewBullets.isExist(servelID)) {
                console.assert(false, "已经存在该子弹！");
            }
            else {
                this.inViewBullets.set(servelID, bullet)
            }
        }

		/**
		 * 获得单例
		 */
        public static get instance(): FishingJoyLogic {
            if (this._instance == null) {
                this._instance = new FishingJoyLogic();
            }
            return this._instance;
        }

		/**
		 * 初始化
		 */
        public initFishingJoyLogic(): void {
            NineGridSplitScreenTool.initValue();
            EventManager.registerEvent(EVENT_ID.REMOVE_BULLET_IN_MAP, Handler.create(this, this._removeBulletInMap));
            EventManager.registerEvent(EVENT_ID.REMOVE_FISH_IN_MAP, Handler.create(this, this._removeFishInMap));
            EventManager.registerEvent(EVENT_ID.ADD_BULLET_IN_MAP, Handler.create(this, this._addBulletInMap));
            EventManager.registerEvent(EVENT_ID.ADD_FISH_IN_MAP, Handler.create(this, this._addFishInMap));
            EventManager.registerEvent(EVENT_ID.ADD_BATTERY_IN_MAP, Handler.create(this, this._addBatteryInMap))
            EventManager.registerEvent(EVENT_ID.REMOVE_BATTERY_IN_MAP, Handler.create(this, this._removeBatteryInMap))
            EventManager.registerEvent(EVENT_ID.DRA_EFF_COMPLETE, Handler.create(this, this._draEffComplete))
            EventManager.registerEvent(EVENT_ID.MER_EFF_COMPLETE, Handler.create(this, this._merEffComplete))
            /*鱼死亡协议*/
            game.Action.deadFishEvent.add(this._deadFishCmd, this)
            /*生成鱼协议*/
            game.Action.spawnFishEvent.add(this._spawnFishEvent, this);
            /*切换场景协议*/
            game.Action.changeSceneEvent.add(this.changeScene, this)
            /*房间数据更新*/
            GX.PokerEvent.Instance.roomDataUpdateEvent.add(this._roomDataUpdateEvent, this);
            /*子弹更新*/
            game.Action.sendBulletEvent.add(this._firBullet, this);
            Laya.timer.frameLoop(1, this, this._checkHit);
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(MJLobby.MahJongLobbyFacadeConsts.USER_INFO_DATA, this.onUserInfoData, this);
        }

        private _merEffComplete(x: number, y: number, score: number): void {
            this.changeScene(null, null, true);
            this.freeAccessToQuotas(x, y, score);
        }

        private _draEffComplete(x: number, y: number, score: number): void {
            this.changeScene(null, null, true);
            this.freeAccessToQuotas(x, y, score);
        }
		/*
		*房间数据更新
		*/
        private _roomDataUpdateEvent(rev: Cmd.RoomDataUpdateCmd_S) {
            this.destroyBullets();
            this.destroyFishes();
            DataCenter.instance.sceneId = rev.roomData.sceneId;
            this.changeScene(null, null, true, false);
            let spawnFish = new Cmd.SpawnFishCmd_S();
            spawnFish.fishlist = rev.roomData.fishlist;
            this._spawnFishEvent(spawnFish, true);
            let bullet = rev.roomData.bulletinfo;
            let serverNow = game.GameTime.serverNow();
            Laya.timer.once(300, this, () => {
                if (bullet) {
                    for (let item of bullet) {
                        if (serverNow - item.fireTime < 4000)
                            this._firBullet(item);
                    }
                }
            });
            let seatList = game.RoomData.Instance.seatList;
            for (let item of seatList) {
                item.lockChanged.call(item);
            }
        }
		/**
		 * 玩家信息更新
		 */
        private onUserInfoData() {
            let info = MJLobby.MJLobbyData.getInstance().myBaseInfo;
            if (info == null)
                return;
            let mainUser = game.PokerFunction.MainUser;
            if (mainUser == null)
                return;
            mainUser.point = info.chips;
            let battery: gameObject.Battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(uniLib.NetMgr.UID);
            if (battery) {
                this.goldCoinRefresh(battery);
            }
        }

		/**
		 *退潮
		 */
        public changeScene(rev: Cmd.ChangeSceneCmd_S, sceneId?: number, revert?: boolean, isPlayTween: boolean = true): void {
            if (rev) {
                DataCenter.instance.isSwitchFish = true;
                manager.OperationManager.instance.leaveQuickly();
                DataCenter.instance.sceneId = rev.sceneId;
                EventManager.fireEvent(EVENT_ID.EBB_TIDE);
            }
            let revertImage = "bg" + DataCenter.instance.sceneId + "_jpg";
            let back0 = UICenter.instance.getManager(commonUI.FishMainScene).getView(FishMainSceneView).backGround0;
            let back1 = UICenter.instance.getManager(commonUI.FishMainScene).getView(FishMainSceneView).backGrounds1;
            let sprayGroup = UICenter.instance.getManager(commonUI.FishMainScene).getView(FishMainSceneView).sprayGroups;
            manager.LayerManager.instance.addToLayer(sprayGroup, LAYER.Bullet);
            manager.LayerManager.instance.addToLayer(back1, LAYER.back);
            back1.anchorOffsetX = back1.width / 2;
            back1.anchorOffsetY = back1.height / 2;
            back1.y = uniLib.Global.screenHeight / 2;
            back1.rotation = back0.rotation;
            let data;
            if (!isPlayTween) {
                back0.source = revert ? revertImage : "bg" + sceneId + "_jpg";
                return;
            }
            if (rev || sceneId) {
                data = rev ? DataCenter.instance.sceneId : sceneId;
            }
            let jianbianImages = UICenter.instance.getManager(commonUI.FishMainScene).getView(FishMainSceneView).jianbianImages;
            jianbianImages.source = rev ? "jianbian_png" : "jianbian1_png";

            if (rev) {
                back0.x = 640;
                back1.x = uniLib.Global.screenWidth + uniLib.Global.screenWidth / 2;
                sprayGroup.x = uniLib.Global.screenWidth + 16;
                jianbianImages.x = -90;
            }
            else {
                back0.x = 640;
                back1.x = uniLib.Global.screenWidth / 2 - uniLib.Global.screenWidth;
                sprayGroup.x = -uniLib.Global.screenWidth - 16;
                jianbianImages.x = 177;
            }
            if (isPlayTween && sceneId) {
                game.SoundHand.Instance.playGoldTide();
                game.SoundHand.Instance.playBgMusic();
            }
            else if (isPlayTween) {
                game.SoundHand.Instance.playChangeTheSpecialBackground();
                game.SoundHand.Instance.playBgMusic();
            }

            egret.Tween.removeTweens(back0);
            egret.Tween.removeTweens(back1);
            egret.Tween.removeTweens(sprayGroup);


            let langhuaString = rev ? "langbo" : "langbo1";
            sprayGroup.removeChildren()
            let theEbbTideMov: egret.MovieClip = UIUtil.creatMovieClip(langhuaString);
            sprayGroup.addChild(theEbbTideMov);
            sprayGroup.addChild(jianbianImages);
            theEbbTideMov.y = 360;
            theEbbTideMov.gotoAndPlay(1, -1);
            theEbbTideMov.x = rev ? 0 : uniLib.Global.screenWidth;


            back1.source = data ? "bg" + data + "_jpg" : "bg" + DataCenter.instance.sceneId + "_jpg";
            egret.Tween.get(back0).to({ x: rev ? -uniLib.Global.screenWidth + 640 : uniLib.Global.screenWidth + 640 }, uniLib.Global.screenWidth * 1.6).call(() => {
                back0.source = data ? "bg" + data + "_jpg" : "bg" + DataCenter.instance.sceneId + "_jpg";
                back0.x = 640;
            });
            egret.Tween.get(back1).to({ x: uniLib.Global.screenWidth / 2 }, uniLib.Global.screenWidth * 1.6).call(() => {
                back1.x = uniLib.Global.screenWidth;
                back1.source = "";
            });
            egret.Tween.get(sprayGroup).to({ x: rev ? -uniLib.Global.screenWidth - 16 : uniLib.Global.screenWidth + 16 }, 2 * (uniLib.Global.screenWidth + 16) * 1.6).call(() => {
                theEbbTideMov.stop();
                sprayGroup.removeChild(theEbbTideMov);
                // Pool.recover(Pool.langbo, theEbbTideMov);
                manager.LayerManager.instance.removeFromLayer(sprayGroup);
                manager.LayerManager.instance.removeFromLayer(back1);
            });

            let cmd = new Cmd.GameTimeSyncCmd_CS();
            game.PokerFunction.tcpSend(cmd);
        }

		/**
		 *免费游戏获取金币
		 */
        public freeAccessToQuotas(x: number, y: number, score: number): void {
            let TextNew = Pool.getItemByClass(Pool.jumpCoinText, eui.BitmapLabel)
            TextNew.font = "coinFont_fish_fnt";
            UIUtil.traGoldLabel(TextNew);
            TextNew.text = "+" + GX.GoldFormat(score);
            manager.LayerManager.instance.addToLayer(TextNew, LAYER.EFFECT);
            // TextNew.anchorOffsetX = TextNew.width/2;
            // TextNew.anchorOffsetY = TextNew.height/2
            TextNew.x = x > uniLib.Global.screenWidth / 2 ? x : x - 130;;
            TextNew.y = y > uniLib.Global.screenHeight / 2 ? y - 40 : y + 40;
            egret.Tween.get(TextNew).to({ alpha: 0 }, 2000).call(() => {
                Pool.recover(Pool.jumpCoinText, TextNew)
                manager.LayerManager.instance.removeFromLayer(TextNew);
            });

        }
		/**
         * 发射子弹
         */
        private _firBullet(bulletInfo: Cmd.BulletInfo): void {
            let battery: gameObject.Battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(bulletInfo.uid);
            if (battery == null)
                return;
            //机器人的话角度可能是负数
            bulletInfo.angle = bulletInfo.angle < 0 ? bulletInfo.angle + 360 : bulletInfo.angle;
            if (battery) {
                this.goldCoinRefresh(battery);
                let bulletRotation: number;
                if (battery.seatIndex == 2) {
                    // egret.log("是否瞄准射击:" + battery.isAimShoot)
                    // console.error("是否瞄准射击:" + battery.isAimShoot)
                }
                if (battery.isAimShoot) {
                    bulletRotation = battery.curRotation;
                    this._fire(battery, bulletInfo, bulletRotation);
                }
                else {
                    bulletRotation = bulletInfo.angle;
                    battery.setTweenRotation(bulletRotation, Handler.create(this, this._fire, [battery, bulletInfo, bulletRotation], true));
                }
            }
            if (bulletInfo.uid == uniLib.NetMgr.UID) {
                if (bulletInfo["freeGoldPool"] != null) {
                    (<FishingJoy.FishBtnView>UICenter.instance.getManager(commonUI.FishMainScene).getView(FishingJoy.FishBtnView)).updataGoldPoolLabel(bulletInfo["freeGoldPool"], bulletInfo["normalGoldPool"])
                }
                // if(Master.instance.isFastShoot){
                //     game.SoundHand.Instance.playHighSpeedGun()
                // }
                // else{
                game.SoundHand.Instance.playLowSpeedGun();
                // }
            }
        }

		/**
		 * 发射
		 */
        private _fire(battery: gameObject.Battery, bulletInfo: Cmd.BulletInfo, bulletRotation: number): void {
            // if(Master.instance.isFastShoot){
            //     game.SoundHand.Instance.playHighSpeedGun();
            // }
            // else{

            // }
            battery.sendBulletEffect();
            let startPoint: egret.Point = Point.create(0, 0);
            let fishLayer = manager.LayerManager.instance.getLayer(LAYER.Fish);
            battery.firePoint.localToGlobal(0, 0, startPoint);
            fishLayer.globalToLocal(startPoint.x, startPoint.y, startPoint);

            let vars: gameObject.IBulletVars = <gameObject.IBulletVars>{};
            vars.bornX = startPoint.x;
            vars.bornY = startPoint.y;
            Point.release(startPoint);

            vars.rotation = bulletRotation;
            vars.servelID = bulletInfo.id;
            if (Master.instance.uid == bulletInfo.uid) {
                if (battery.fireBulletNum == 1) {
                    vars.sign = GAMEOBJECT_SIGN.BULLET_SELF;
                }
                else if (battery.fireBulletNum == 2) {
                    vars.sign = GAMEOBJECT_SIGN.BULLET_SELF_2;
                }
                else if (battery.fireBulletNum == 3) {
                    vars.sign = GAMEOBJECT_SIGN.BULLET_SELF_3;
                }
            }
            else {
                if (battery.fireBulletNum == 1) {
                    vars.sign = GAMEOBJECT_SIGN.BULLET_OTHER;
                }
                else if (battery.fireBulletNum == 2) {
                    vars.sign = GAMEOBJECT_SIGN.BULLET_OTHER_2;
                }
                else if (battery.fireBulletNum == 3) {
                    vars.sign = GAMEOBJECT_SIGN.BULLET_OTHER_3;
                }
            }
            if (battery.isAimShoot) {
                let fish: gameObject.Fish = FishingJoy.FishingJoyLogic.instance.inViewFishes.get(battery.targetFishId);
                vars.targetFish = fish;
            }
            vars.operation = [<gameObject.IOperation>{
                type: battery.isAimShoot ? OPERATION_TYPE.BulletTrack : OPERATION_TYPE.BULLET,
                rotation: bulletRotation,
                bornTime: battery.isAimShoot ? bulletInfo.fireTime : bulletInfo.fireTime + 150,
            }]
            vars.playerUID = bulletInfo.uid;
            let bullet: gameObject.Bullet = gameObject.GameObjectFactory.instance.creatGameObject(vars.sign, vars, LAYER.Bullet);
        }
        /**
         * 打死鱼
         */
        private _deadFishCmd(rev: Cmd.DeadFishCmd_S) {
            if (rev.list == null || !(rev.list instanceof Array))
                return;
            for (let item of rev.list) {
                this._deadFish(item);
            }
        }
		/**
		 * 打死鱼
		 */
        private _deadFish(deadFish: Cmd.DeadFish): void {
            game.SoundHand.Instance.playCatch();
            /*所有碰撞器打开*/
            let fishMap: Dictionary = this.inViewFishes;
            let fishList: Cmd.Fish[] = deadFish.list;
            this.medal(deadFish)
            this.coinDozer(deadFish);
            for (let i: number = 0; i < fishList.length; i++) {
                let fish: gameObject.Fish = fishMap.get(fishList[i].id);
                if (fish == null)
                    continue;
                let score: number = fishList[i].score;

                console.info("鱼id:" + fish.sign + "鱼金币" + score)
                if (fish && fish.isAlive) {
                    if (fish.skillID == 1) {
                        game.SoundHand.Instance.playCatchAllInOneDraft();
                    }
                    else if (fish.skillID == 3) {
                        game.SoundHand.Instance.playCatchAllInOneDraft1()
                    }
                    fish.isAlive = false;
                    fish.unregisterOperation();
                    fish.playDieMov(Handler.create(this, this._recoverFish, [fish, deadFish.uid, score, deadFish.bid]))
                }
            }

            let bullet: gameObject.Bullet = this.inViewBullets.get(deadFish.bid)
            if (bullet) {
                let bornX: number = bullet.x;
                let bornY: number = bullet.y;
                gameObject.GameObjectFactory.instance.recoverGameObject(bullet);
                let data: gameObject.IGameObjectVars = <gameObject.IGameObjectVars>{};
                data.bornX = bornX;
                data.bornY = bornY;
                let fishingNet: gameObject.FishingNet = gameObject.GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.FishingNet_Green, data, LAYER.FishingNet);
            }
        }

		/**
		 * 回收鱼
		 */
        private _recoverFish(fish: gameObject.Fish, playerUID: number, score: number, bulletID: number): void {
            //获取金币
            // if (fish.sign == GAMEOBJECT_SIGN.DRAGON) {
            // 	this.changeScene(null, null, true)
            // }
            let [x, y]: [number, number] = UIUtil.localToGlobal(fish)
            if (fish.sign != GAMEOBJECT_SIGN.MERMAID) {
                if (fish.sign != GAMEOBJECT_SIGN.DRAGON) {
                    this.getGoldCoins(x, y, fish.odds, playerUID, score)
                }
            }
            this._checkSpecialFish(x, y, fish, playerUID, score, bulletID);
            gameObject.GameObjectFactory.instance.recoverGameObject(fish);
        }

		/**
		 * 检测是否特殊鱼
		 */
        private _checkSpecialFish(x: number, y: number, fish: gameObject.Fish, playerUID: number, score: number, bulletID: number): void {
            if (fish.sign == GAMEOBJECT_SIGN.BOOM_FISH) {
                this.explodingFish(x, y, bulletID, playerUID)
            }
            else if (fish.sign == GAMEOBJECT_SIGN.MERMAID) {
                game.SoundHand.Instance.playMermaidCapture();
                this.freePromptCloses();
                let data: gameObject.IMermaidEffVars = <gameObject.IMermaidEffVars>{};
                data.bornX = uniLib.Global.screenWidth / 2;
                data.bornY = uniLib.Global.screenHeight / 2 + 50;
                data.targetBattery = FishingJoyLogic.instance.allBattery.get(playerUID);
                if (!data.targetBattery || !data.targetBattery.user)
                    return;
                data.score = score;
                if (data.targetBattery) {
                    data.playerNickName = data.targetBattery.user.nickName;
                    gameObject.GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.MERMAID_EFF, data, LAYER.EFFECT_BIG);
                }

                // egret.log("美人鱼被打死，playerUID:" + playerUID)
            }
            else if (fish.sign == GAMEOBJECT_SIGN.DRAGON) {
                game.SoundHand.Instance.playGoldenDragonCapture();
                this.freePromptCloses();
                let data: gameObject.IDragonEffVars = <gameObject.IDragonEffVars>{}
                data.bornX = uniLib.Global.screenWidth / 2;
                data.bornY = uniLib.Global.screenHeight / 2 + 50;
                data.score = score;
                let battery: gameObject.Battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(playerUID);
                data.targetBattery = FishingJoyLogic.instance.allBattery.get(playerUID);
                if (!data.targetBattery || !data.targetBattery.user)
                    return;
                if (data.targetBattery) {
                    data.playerNickName = data.targetBattery.user.nickName;
                    gameObject.GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.DRAGON_EFF, data, LAYER.EFFECT_BIG);
                }

            }
        }

		/**
		 * 爆炸鱼特效
		 */
        private explodingFish(x: number, y: number, bulletID: number, playerUID: number): void {
            let mov = UIUtil.creatMovieClip("Bomb");
            mov.y = y;
            mov.x = x;
            game.SoundHand.Instance.playBlast();
            mov.gotoAndPlay(1, 1);
            manager.LayerManager.instance.addToLayer(mov, LAYER.EFFECT);
            let complete = function () {
                manager.LayerManager.instance.removeFromLayer(mov);
            }
            mov.once(egret.Event.COMPLETE, complete, null);
            this._checkBoomHit(x, y, bulletID, playerUID);
        }

		/**
		 * 获得金币
		 */
        public getGoldCoins(x: number, y: number, odds: number, uid: number, score: number): void {
            let battery: gameObject.Battery = this.allBattery.get(uid);
            if (battery == null || battery.user == null)
                return;
            let [x1, y1]: [number, number] = UIUtil.localToGlobal(battery.coinImg)
            game.SoundHand.Instance.playGoldCoin();
            let seat = game.GameConstant.SeatPositonList[game.GameConstant.GetClientNoBySeatId(battery.seatdata.seatId) - 1]
            let seatID = game.GameConstant.GetClientNoBySeatId(battery.seatdata.seatId);

            let numberData: number;
            if (odds > 10) {
                numberData = (odds - (odds % 10)) / 10;
            }
            else {
                numberData = 1;
            }
            let datax = x - (numberData / 2 * 45);
            let datay = y;
            let timeon = GX.getDistanceByPoint({ x: datax, y: datay }, { x: seat.x, y: seat.y });
            let TextNew
            if (battery.user) {
                if (battery.user.uid == Master.instance.uid) {
                    TextNew = Pool.getItemByClass(Pool.jumpCoinText, eui.BitmapLabel);
                    TextNew.font = "coinFont_fish_fnt";
                    UIUtil.traGoldLabel(TextNew);
                }
                else {
                    TextNew = Pool.getItemByClass(Pool.jumpCoinTexts, eui.BitmapLabel);
                    TextNew.font = "coinFont_fishS_fnt";
                }
            }
            TextNew.text = "+" + GX.GoldFormat(score);

            manager.LayerManager.instance.addToLayer(TextNew, LAYER.EFFECT);

            TextNew.x = datax - (TextNew.textWidth / 2);
            TextNew.y = datay - 25;

            for (var i = 0; i < numberData; ++i) {
                let mov
                if (battery.user) {
                    if (battery.user.uid == Master.instance.uid) {
                        mov = Pool.getItemByCreateFun(Pool.jinbi, Handler.create(UIUtil, UIUtil.creatMovieClip, ["jinbi_fish"]));
                    }
                    else {
                        mov = Pool.getItemByCreateFun(Pool.yingbi, Handler.create(UIUtil, UIUtil.creatMovieClip, ["yinbi_fish"]));
                    }
                }
                mov.y = datay;
                mov.x = datax + (i * 45);
                mov.gotoAndPlay(1, -1);
                manager.LayerManager.instance.addToLayer(mov, LAYER.EFFECT);
                egret.Tween.get(mov).to({ y: mov.y - 50 }, 200).call(() => {
                    egret.Tween.get(mov).to({ y: mov.y + 80 }, 500, egret.Ease.backInOut).call(() => {
                        egret.Tween.get(mov).to({ y: mov.y - 10 }, 100).call(() => {
                            egret.Tween.get(mov).to({ x: x1, y: y1 }, timeon).call(() => {
                                this.goldCoinRefresh(battery);
                                if (battery.user) {
                                    if (battery.user.uid == Master.instance.uid) {
                                        Pool.recover(Pool.jinbi, mov);
                                    }
                                    else {
                                        Pool.recover(Pool.yingbi, mov);
                                    }
                                }
                                manager.LayerManager.instance.removeFromLayer(mov);

                            });
                        });
                    });
                });
            }

            Laya.timer.once(1000, this, () => {
                manager.LayerManager.instance.removeFromLayer(TextNew);
                if (battery.user) {
                    if (battery.user.uid == Master.instance.uid) {
                        Pool.recover(Pool.jumpCoinText, TextNew);
                    }
                    else {
                        Pool.recover(Pool.jumpCoinTexts, TextNew);
                    }
                }
            })

            // this.coinDozer(seat,odds)
        }

        private goldCoinRefresh(battery: gameObject.Battery) {
            battery.goldCoinRefresh();
        }

        private eachHeapOfGoldCoinsData = [[], [], [], []];
        private numberOfGoldCoins = [0, 0, 0, 0];
        private goldCoinRemovalTime = [[], [], [], []];
        private dataStorage = [[], [], [], []];
        public coinDozer(rev: Cmd.DeadFish, seatingData?: gameObject.Battery) {
            let data
            let odds = 0;
            let scores = 0;
            let battery: gameObject.Battery;
            if (rev) {
                data = rev;
            }
            battery = rev ? this.allBattery.get(rev.uid) : seatingData;
            if (battery == null) {
                return;
            }
            if (!battery.seatdata)
                return;
            let seatId = battery.seatdata.seatId;
            let seatIndex = seatId - 1;
            if (this.eachHeapOfGoldCoinsData[seatIndex].length >= 3 && rev) {
                this.dataStorage[seatIndex].push(rev);
                if (this.dataStorage[seatIndex].length == 1) {
                    this.coinDozer(null, battery)
                }
                return;
            }
            if (rev == null) {
                if (this.dataStorage[seatIndex].length == 0) {
                    return;
                }
                data = this.dataStorage[seatIndex][0];

            }
            let seat = game.GameConstant.SeatPositonList[game.GameConstant.GetClientNoBySeatId(seatId) - 1];
            let score = 0;
            for (let n: number = 0; n < data.list.length; n++) {
                let fish: gameObject.Fish = this.inViewFishes.get(data.list[n].id)
                score = score + data.list[n].score;
            }
            odds = score / Number(battery._costMoneyTF.text);
            let x = 0;
            let y = 0;
            let group = new eui.Group();
            group.touchEnabled = false;
            if (this.numberOfGoldCoins[seatIndex] != 0) {
                let numberMy = this.numberOfGoldCoins[seatIndex];
                if (this.numberOfGoldCoins[seatIndex] >= 3) {
                    this.numberOfGoldCoins[seatIndex] = 3;
                }
                group.x = seat.x > uniLib.Global.screenWidth / 2 ? (760 * uniLib.Global.screenWidth / 1280) - ((numberMy < 3 ? numberMy : 2) * 35) :
                    (460 * uniLib.Global.screenWidth / 1280) + ((numberMy < 3 ? numberMy : 2) * 35);
                if (this.numberOfGoldCoins[seatIndex] == 3) {
                    if (this.eachHeapOfGoldCoinsData[seatIndex][0])
                        this.goldCoinPush(battery, 0)
                    if (this.eachHeapOfGoldCoinsData[seatIndex][1])
                        this.goldCoinPush(battery, 1)
                    if (this.eachHeapOfGoldCoinsData[seatIndex][2])
                        this.goldCoinPush(battery, 2, false, group, odds, score)
                }
            }
            else {
                group.x = seat.x > uniLib.Global.screenWidth / 2 ? (760 * uniLib.Global.screenWidth / 1280) : (460 * uniLib.Global.screenWidth / 1280);
            }
            group.y = seat.y > uniLib.Global.screenHeight / 2 ? 553 : -7;//seat.y+43.5;//595
            manager.LayerManager.instance.addToLayer(group, LAYER.EFFECT);

            if (this.numberOfGoldCoins[seatIndex] < 3) {
                for (var m = 0; m < (odds > 20 ? 20 : odds); m++) {
                    game.Timer.setTimeout(() => {
                        let imageMy = Pool.getItemByClass("coinDozerImage", eui.Image);
                        imageMy.source = "batteryBase8";
                        imageMy.scaleX = 0.85;
                        imageMy.scaleY = 0.85;
                        imageMy.x = 0;//seat.x + x;
                        imageMy.y = seat.y > uniLib.Global.screenHeight / 2 ? 160 + y : 8 - y;
                        imageMy.touchEnabled = false;
                        y -= 6.8;
                        group.addChild(imageMy);
                    }, this, m * 10);
                }
                let TextNew = new eui.BitmapLabel();
                TextNew.font = "coinFont_fish_fnt";
                UIUtil.traGoldLabel(TextNew);
                TextNew.touchEnabled = false;
                TextNew.text = "" + GX.GoldFormat(score);
                group.addChild(TextNew);
                TextNew.anchorOffsetX = TextNew.width / 2;
                TextNew.anchorOffsetY = TextNew.height / 2;

                TextNew.scaleX = 0.3;
                TextNew.scaleY = 0.3;
                TextNew.x = 12.75;//group.width / 2;
                TextNew.y = seat.y > uniLib.Global.screenHeight / 2 ? 160 + -10 + (-6.8 * ((odds > 20 ? 20 : odds) - 1)) : 16 - (-6.8 * ((odds > 20 ? 20 : odds) - 1)) + 10;
            }

            this.eachHeapOfGoldCoinsData[seatIndex].push(group);
            this.numberOfGoldCoins[seatIndex] += 1;
            if (this.goldCoinRemovalTime[seatIndex][0]) {
                game.Timer.clearTimeout(this.goldCoinRemovalTime[seatIndex][0]);
                this.goldCoinRemovalTime[seatIndex] = [];
            }
            let batterys = battery;
            let goldCoinRemovalTime = game.Timer.setTimeout(() => {
                this.goldCoinAutomaticallyRemoved(batterys)
            }, this, 4000);
            this.goldCoinRemovalTime[seatIndex].push(goldCoinRemovalTime)
        }

        private goldCoinAutomaticallyRemoved(battery: gameObject.Battery) {
            if (!battery.seatdata)
                return;
            let seatId = battery.seatdata.seatId;
            let seatIndex = seatId - 1;
            if (this.goldCoinRemovalTime[seatIndex][0]) {
                game.Timer.clearTimeout(this.goldCoinRemovalTime[seatIndex][0]);
                this.goldCoinRemovalTime[seatIndex] = [];
            }

            if (this.eachHeapOfGoldCoinsData[seatIndex][0]) {
                this.goldCoinPush(battery, 0)
            }
            if (this.eachHeapOfGoldCoinsData[seatIndex][1])
                this.goldCoinPush(battery, 1)
            if (this.eachHeapOfGoldCoinsData[seatIndex][2])
                this.goldCoinPush(battery, 2, true)
            this.eachHeapOfGoldCoinsData[seatIndex].removeAt(0);
            this.numberOfGoldCoins[seatIndex] = this.eachHeapOfGoldCoinsData[seatIndex].length;
            if (this.eachHeapOfGoldCoinsData[seatIndex][0]) {
                let goldCoinRemovalTime = game.Timer.setTimeout(() => {
                    this.goldCoinAutomaticallyRemoved(battery);
                }, this, 4000);
                this.goldCoinRemovalTime[seatIndex].push(goldCoinRemovalTime)
            }
        }

        //金币推移动画
        private goldCoinPush(battery: gameObject.Battery, second: number, bool?: boolean, group?: eui.Group, odds?: number, score?: number) {
            let seat = game.GameConstant.SeatPositonList[game.GameConstant.GetClientNoBySeatId(battery.seatdata.seatId) - 1];
            let y = 0;
            if (second == 0) {
                manager.LayerManager.instance.removeFromLayer(this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1][0]);
                // this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1].removeAt(0);
                return;
            }

            egret.Tween.get(this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1][second]).to({
                x: seat.x > uniLib.Global.screenWidth / 2 ?
                    this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1][second].x + 35 : this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1][second].x + -35
            }, 300).call(() => {
                // if(bool){
                //     this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1].removeAt(0);
                // }
                if (group) {
                    for (var m = 0; m < (odds > 20 ? 20 : odds); m++) {
                        game.Timer.setTimeout(() => {
                            let imageMy = Pool.getItemByClass("coinDozerImage", eui.Image);
                            imageMy.source = "batteryBase8";
                            imageMy.scaleX = 0.85;
                            imageMy.scaleY = 0.85;
                            imageMy.x = 0;//seat.x + x;
                            imageMy.y = seat.y > uniLib.Global.screenHeight / 2 ? 160 + y : 8 - y;
                            y -= 6.8;
                            group.addChild(imageMy);
                        }, this, m * 10);
                    }
                    let TextNew = new eui.BitmapLabel();
                    TextNew.font = "coinFont_fish_fnt";
                    TextNew.text = "" + GX.GoldFormat(score);
                    UIUtil.traGoldLabel(TextNew);
                    group.addChild(TextNew);
                    TextNew.anchorOffsetX = TextNew.width / 2;
                    TextNew.anchorOffsetY = TextNew.height / 2;
                    TextNew.scaleX = 0.3;
                    TextNew.scaleY = 0.3;
                    TextNew.x = 12.75;//group.width / 2;
                    TextNew.y = seat.y > uniLib.Global.screenHeight / 2 ? 160 + -10 + (-6.8 * ((odds > 20 ? 20 : odds) - 1)) : 16 - (-6.8 * ((odds > 20 ? 20 : odds) - 1)) + 10;
                    this.numberOfGoldCoins[battery.seatdata.seatId - 1] = 3;
                    this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1].removeAt(0);
                    if (this.dataStorage[battery.seatdata.seatId - 1].length != 0) {
                        this.dataStorage[battery.seatdata.seatId - 1].removeAt(0);
                        this.coinDozer(null, battery);
                        // this.dataStorage[battery.seatdata.seatId - 1].removeAt(0);
                    }
                }
            });
        }

        public removeTheGoldCoinHeap(seatdata: game.SeatData) {
            this.numberOfGoldCoins[seatdata.seatId - 1] = 0;
            for (let item = 0; item < this.eachHeapOfGoldCoinsData[seatdata.seatId - 1].length; ++item) {
                manager.LayerManager.instance.removeFromLayer(this.eachHeapOfGoldCoinsData[seatdata.seatId - 1][item]);
            }
            this.eachHeapOfGoldCoinsData[seatdata.seatId - 1] = [];
            this.dataStorage[seatdata.seatId - 1] = [];
            if (this.goldCoinRemovalTime[seatdata.seatId - 1][0]) {
                game.Timer.clearTimeout(this.goldCoinRemovalTime[seatdata.seatId - 1][0]);
                this.goldCoinRemovalTime[seatdata.seatId - 1] = [];
            }
        }
        //Tween动画
        public tweenAnimation(anchors, scale, image1: CustomImage, seat, image: string, bool: boolean, isMove?: boolean) {
            let y = seat.y > uniLib.Global.screenHeight / 2 ? -120 : 120;
            let x = seat.x > uniLib.Global.screenWidth / 2 ? -50 : 50;
            image1.source = image;
            manager.LayerManager.instance.addToLayer(image1, LAYER.EFFECT);
            image1.anchorOffsetX = anchors;
            image1.anchorOffsetY = anchors;
            image1.scaleX = scale;
            image1.scaleY = scale;
            image1.x = seat.x + x;
            image1.y = seat.y + y;
            if (isMove) {
                egret.Tween.get(image1).to({ rotation: bool ? 360 : -360 }, 2000)
            }
            return image1;
        }

        public createMedalResources(id: number) {
            let image1 = new CustomImage();
            let image2 = new CustomImage();
            let image3 = new CustomImage();
            let aNetImage = new CustomImage();
            let mov = UIUtil.creatMovieClip("deng");
            let mov1 = UIUtil.creatMovieClip("Medal1_jewel");
            let mov2 = UIUtil.creatMovieClip("Medal2_jewel");
            let mov3 = UIUtil.creatMovieClip("Medal3_jewel");
            let textMy = new eui.BitmapLabel()
            this.medalStorage[id].push(image1, image2, image3, aNetImage, textMy, [mov, mov1, mov2, mov3])
        }


        //奖章
        public medalStorage = [[], [], [], []];
        public medal(rev: Cmd.DeadFish) {
            /*uid:number,odds: number,skill?:number*/
            let score: number = 0;
            let odds: number = 0;
            let skill: number = 0;
            for (let i: number = 0; i < rev.list.length; i++) {
                let fish: gameObject.Fish = this.inViewFishes.get(rev.list[i].id)
                if (fish && fish.isAlive) {
                    score = score + rev.list[i].score;
                    odds = odds + fish.odds;
                    if (fish.skillID && fish.skillID == 1) {
                        skill = fish.skillID;
                    }
                }
            }
            if (rev.uid == uniLib.NetMgr.UID && score > DataCenter.instance.noticeTriggers) {
                let cmd = new Cmd.ClientSettleFinishCmd_C();
                game.PokerFunction.tcpSend(cmd);
            }
            let levelData: table.TableGameRuleConfigList = FishingJoy.DataCenter.instance.getRuleConfigList()
            let level
            if (odds < levelData[0].medalGrades[0] && skill != 1) {
                return;
            }
            else if (odds >= levelData[0].medalGrades[0] && odds < levelData[0].medalGrades[1]) {
                level = 1;
            }
            else if (odds >= levelData[0].medalGrades[1] && odds < levelData[0].medalGrades[2]) {
                level = 2;
            }
            else if (odds >= levelData[0].medalGrades[2]) {
                level = 3;
            }
            let battery: gameObject.Battery = this.allBattery.get(rev.uid);
            if (battery == null || battery.seatdata == null)
                return;
            let seatId = battery.seatdata.seatId;
            let clientNo = game.GameConstant.GetClientNoBySeatId(seatId);
            this.scavengingMedals(seatId - 1);
            let seat = game.GameConstant.SeatPositonList[clientNo - 1]
            let y = seat.y > uniLib.Global.screenHeight / 2 ? -120 : 120;
            let x = seat.x > uniLib.Global.screenWidth / 2 ? -50 : 50;
            let image1
            let image2
            let image3
            let mov
            let textMy
            let aNetImage
            let zoom = 250 / 284 * 0.9;
            game.SoundHand.Instance.playMedalAppearance();
            if (GX.GameLayerManager.sceneLayer.parent.x != 0 || GX.GameLayerManager.sceneLayer.parent.y != 0) {
                GX.GameLayerManager.sceneLayer.parent.x = 0;
                GX.GameLayerManager.sceneLayer.parent.y = 0;
            }
            //ShakeTool.Instance.shakeObj(GX.GameLayerManager.sceneLayer.parent, 1, 10, 10);
            let medalStorage = this.medalStorage[seatId - 1];
            if (medalStorage.length == 0) {
                this.createMedalResources(seatId - 1)
            }
            if (skill) {
                image1 = this.tweenAnimation(142, zoom, medalStorage[0], seat, "down", true, true)
                image2 = this.tweenAnimation(106, zoom, medalStorage[1], seat, "middle", false, true)
                image3 = this.tweenAnimation(125.5, zoom, medalStorage[2], seat, "up", true, true)
                mov = medalStorage[5][0];//UIUtil.creatMovieClip("deng");
                mov.touchEnabled = false;
                mov.y = seat.y + y;
                mov.x = seat.x + x;
                mov.scaleX = zoom;
                mov.scaleY = zoom;
                mov.gotoAndPlay(1, 1);
                manager.LayerManager.instance.addToLayer(mov, LAYER.EFFECT);
                aNetImage = medalStorage[3]//new eui.Image();
                aNetImage.source = "catchAllInOneDraft";
                manager.LayerManager.instance.addToLayer(aNetImage, LAYER.EFFECT);
                aNetImage.anchorOffsetX = aNetImage.width / 2;
                aNetImage.anchorOffsetY = aNetImage.height / 2;
                aNetImage.x = seat.x + x;
                aNetImage.y = seat.y + y - 30;
                aNetImage.scaleX = seat.y > uniLib.Global.screenHeight / 2 ? 1 : -1;
                aNetImage.scaleY = seat.y > uniLib.Global.screenHeight / 2 ? 1 : -1;
                // aNetImage.rotation =  seat.y > uniLib.Global.screenHeight / 2 ? 0 : 180;
            }
            else {
                let anchors1 = level == 1 ? 97 : level == 2 ? 101 : 101;
                let anchors2 = level == 1 ? 118 : level == 2 ? 125 : 137.5;
                image1 = this.tweenAnimation(anchors1, 0.9, medalStorage[0], seat, "Medal_ middle" + level, true)
                image2 = this.tweenAnimation(anchors2, 0.9, medalStorage[1], seat, "Medal_BG" + level, true, true)
                mov = medalStorage[5][level];//UIUtil.creatMovieClip("Medal" + level + "_jewel")
                mov.scaleX = 0.9;
                mov.scaleY = 0.9;
                mov.touchEnabled = false;
                mov.y = seat.y + y;
                mov.x = seat.x + x;
                mov.gotoAndPlay(1, 2);
                manager.LayerManager.instance.addToLayer(mov, LAYER.EFFECT);
            }
            textMy = medalStorage[4];//new eui.BitmapLabel()
            textMy.font = "multipleFnt_fnt";
            textMy.text = odds;
            console.log("????" + odds);
            manager.LayerManager.instance.addToLayer(textMy, LAYER.EFFECT);
            textMy.x = seat.x + x;
            textMy.y = aNetImage ? seat.y + y + 30 : seat.y + y;
            textMy.anchorOffsetX = textMy.width / 2;
            textMy.anchorOffsetY = textMy.height / 2;
            textMy.scaleX = seat.y > uniLib.Global.screenHeight / 2 ? 1.1 : -1.1;//skill == 1 ? zoom : 0.9;
            textMy.scaleY = seat.y > uniLib.Global.screenHeight / 2 ? 1.1 : -1.1//0.9;
            // textMy.rotation =  seat.y > uniLib.Global.screenHeight / 2 ? 0 : 180;
            this.labelJitter(textMy, true);
            if (aNetImage) {
                this.labelJitter(aNetImage, true);
            }
            let complete = function () {
                mov.removeEventListener(egret.Event.COMPLETE, complete, null);
                for (let item of FishingJoy.FishingJoyLogic.instance.medalStorage[seatId - 1]) {
                    egret.Tween.removeTweens(item);
                    manager.LayerManager.instance.removeFromLayer(item);
                }
                for (let item of FishingJoy.FishingJoyLogic.instance.medalStorage[seatId - 1][5]) {
                    egret.Tween.removeTweens(item);
                    manager.LayerManager.instance.removeFromLayer(item);
                }
            }
            mov.addEventListener(egret.MovieClipEvent.COMPLETE, complete, null);
        }

        private scavengingMedals(id: number): void {
            if (this.medalStorage[id].length == 0) {
                return;
            }
            else {
                for (let item of FishingJoy.FishingJoyLogic.instance.medalStorage[id]) {
                    egret.Tween.removeTweens(item);
                    manager.LayerManager.instance.removeFromLayer(item);
                }
                for (let item of FishingJoy.FishingJoyLogic.instance.medalStorage[id][5]) {
                    egret.Tween.removeTweens(item);
                    manager.LayerManager.instance.removeFromLayer(item);
                }
            }
        }

        private labelJitter(textMy: eui.BitmapLabel, bool?: boolean): void {
            if (!textMy) {
                return;
            }
            egret.Tween.get(textMy).to({ rotation: bool ? 13 : -13 }, 500, egret.Ease.backOut).call(() => {
                this.labelJitter(textMy, !bool);
            });

        }

        private outOfTheField: eui.Image;

		/**
		 * 免费游戏出场离场提示 
		 */
        public onFreeGame(imageID: number, boolMy?: boolean): void {
            game.SoundHand.Instance.playAlert();
            if (!boolMy) {
                if (this.winAnim0 != null) {
                    egret.Tween.removeTweens(this.winAnim0)
                    egret.Tween.removeTweens(this.outOfTheField)
                    manager.LayerManager.instance.removeFromLayer(this.winAnim0);
                    this.winAnim0 == null;
                }
                this.winAnim0 = UIUtil.creatMovieClip("appearanceOfLight");
                this.winAnim0.blendMode = egret.BlendMode.ADD;
                this.winAnim0.y = uniLib.Global.screenHeight / 2;
                this.winAnim0.x = uniLib.Global.screenWidth / 2;
                this.winAnim0.scaleX = 4 * uniLib.Global.screenWidth / 1280;
                this.winAnim0.scaleY = 4 * uniLib.Global.screenHeight / 720;;
                manager.LayerManager.instance.addToLayer(this.winAnim0, LAYER.EFFECT);
                this.winAnim0.frameRate = 10;
                this.winAnim0.gotoAndPlay(1, 4);
                this.winAnim0.addEventListener(egret.Event.COMPLETE, this.animationConcealment, this);
            }

            if (!this.outOfTheField) {
                this.outOfTheField = new eui.Image();
                this.outOfTheField.visible = false;
            }
            manager.LayerManager.instance.addToLayer(this.outOfTheField, LAYER.EFFECT);
            this.outOfTheField.source = "freeOutOfTheField" + imageID;
            this.outOfTheField.alpha = 1;
            this.outOfTheField.anchorOffsetX = this.outOfTheField.width / 2;
            this.outOfTheField.anchorOffsetY = this.outOfTheField.height / 2;
            this.outOfTheField.visible = true;
            this.outOfTheField.scaleX = 0.8;
            this.outOfTheField.scaleY = 0.8;
            this.outOfTheField.x = 0 - this.outOfTheField.width / 2;
            this.outOfTheField.y = uniLib.Global.screenHeight / 2;

            egret.Tween.get(this.outOfTheField).to({ x: uniLib.Global.screenWidth / 2 }, 500, egret.Ease.backOut).call(() => {
                if (boolMy) {
                    this.animationConcealment(1);
                }
            });
        }

        public freePromptCloses(): void {
            if (this.outOfTheField) {
                this.outOfTheField.visible = false;
                this.outOfTheField.x = 0 - this.outOfTheField.width / 2;
            }

        }


        private animationConcealment(boolMy?: number) {
            if (boolMy != 1) {
                egret.Tween.get(this.winAnim0).to({ alpha: 0 }, 1000).call(() => {
                    if (this.winAnim0 != null) {
                        manager.LayerManager.instance.removeFromLayer(this.winAnim0);
                        this.winAnim0 == null;
                    }
                });
                egret.Tween.get(this.outOfTheField).to({ alpha: 0.5, scaleX: 1.5, scaleY: 1.5 }, 300).call(() => {
                    egret.Tween.get(this.outOfTheField).to({ alpha: 0, scaleX: 0.5, scaleY: 0.5 }, 700).call(() => {
                        this.outOfTheField.visible = false;
                        this.outOfTheField.x = 0 - this.outOfTheField.width / 2;
                        if (this.freeType) {
                            this.changeScene(null, this.freeType, null, true);
                            this.freeType = null;
                        }
                    });
                });
            }
            else {
                if (!this.outOfTheField.visible) {
                    return;
                }
                egret.Tween.get(this.outOfTheField).to({ scaleX: 1.1, scaleY: 1.1 }, 600).call(() => {
                    egret.Tween.get(this.outOfTheField).to({ scaleX: 0.8, scaleY: 0.8 }, 700).call(() => {
                        this.animationConcealment(1)
                    });
                });

            }
        }


        private animationConcealments() {
            this.winAnim1.removeEventListener(egret.Event.COMPLETE, this.animationConcealments, this);
            let back0 = UICenter.instance.getManager(commonUI.FishMainScene).getView(FishMainSceneView);
            back0.removeChild(this.winAnim1);
            this.winAnim1 = null;
        }
        private freeType: number;

		/**
		 * 出鱼
		 */
        private _spawnFishEvent(data: Cmd.SpawnFishCmd_S, reconnection: boolean = false) {
            DataCenter.instance.isSwitchFish = false;
            let fishlist: Cmd.FishInfo[] = data.fishlist;
            let specialTime = 0;
            if (fishlist == null || !(fishlist instanceof Array)) {
                return;
            }
            for (let fishs of fishlist) {
                if (fishs.spawnTime == null) {
                    console.error("服务器未下发spawnTime");
                    continue;
                }
                for (let item of fishs.fishs) {
                    // item.templateId = GAMEOBJECT_SIGN.BOOM_FISH;
                    let config: gameObject.IGameObjectConfig = gameObject.GameObjectConfigParse.configDic.get(item.templateId);
                    let tableConfig: table.TableFishConfig = config.table;
                    if (!tableConfig) {
                        console.assert(false, "鱼模板id为" + item.templateId + "这找不到配置")
                        continue;
                    }
                    let fishPath = table.TableFishPath.getFishPath(fishs.pathId);
                    if (fishPath == null) {
                        // console.assert(false, "找不到配置路径:" + fishs.pathId);
                        return;
                    }
                    if (tableConfig.sign == GAMEOBJECT_SIGN.DRAGON) {
                        specialTime = tableConfig.spawnTimeout;
                        if (!reconnection) {
                            this.freeType = SCENEID.HaiDiBaoZang;
                            this.onFreeGame(1);
                        }
                        else {
                            this.changeScene(null, SCENEID.HaiDiBaoZang, null, false);
                        }

                    }
                    else if (tableConfig.sign == GAMEOBJECT_SIGN.MERMAID) {
                        specialTime = tableConfig.spawnTimeout;
                        // this.changeScene(null, SCENEID.HaiDiGongDian, null, !reconnection);
                        if (!reconnection) {
                            this.freeType = SCENEID.HaiDiGongDian;
                            this.onFreeGame(3)
                        }
                        else {
                            this.changeScene(null, SCENEID.HaiDiGongDian, null, false);
                        }
                    }
                    if (item.skill == Cmd.FishSkillType.SameGroup) {
                        let offset = game.GameConstant.getSameGroupOffset()
                        item.offsetX = offset.offsetX;
                        item.offsetY = offset.offsetY;
                    }
                    let varsData: gameObject.IFishVars = <gameObject.IFishVars>{};
                    varsData.serveID = item.id;
                    varsData.pathId = fishs.pathId.toString();
                    varsData.skillID = item.skill;
                    varsData.offsetX = item.offsetX;
                    varsData.offsetY = item.offsetY;
                    varsData.reconnection = reconnection;
                    varsData.spawnTime = fishs.spawnTime + specialTime;
                    varsData.operation = [<gameObject.IOperation>{
                        type: OPERATION_TYPE.FISH
                    }]
                    let fish: gameObject.Fish = gameObject.GameObjectFactory.instance.creatGameObject(item.templateId, varsData, LAYER.Fish)
                    fish.name = "path：" + fishs.pathId.toString();
                    if (fish.sign == GAMEOBJECT_SIGN.MERMAID || fish.sign == GAMEOBJECT_SIGN.DRAGON) {
                        EventManager.fireEvent(EVENT_ID.AIM_SPECIAL_FISH, [fish, true]);
                    }
                }
            }
        }

		/**
		 * 碰撞检测
		 */
        public _checkHit(): void {
            this.hitFishList.clear();
            let bulletMap: Dictionary = this.inViewBullets;
            let bulletMapLen: number = bulletMap.length;
            let fishMap: Dictionary = this.inViewFishes;
            let fishMapLen: number = fishMap.length
            if (bulletMapLen == 0 || fishMapLen == 0) {
                return;
            }

            let fishGroupMap: Dictionary = new Dictionary()
            let bulletGroupMap: Dictionary = new Dictionary()
            let i: number = 0;
            for (; i < bulletMapLen; i++) {
                let bullet: gameObject.Bullet = bulletMap.values[i];
                if (bullet && bullet.isInView) {
                    let bulletColliderAry: Collider[] = bullet.colliderAry;
                    for (let m: number = 0; m < bulletColliderAry.length; m++) {
                        bulletColliderAry[m].setGlobePos();
                    }
                    NineGridSplitScreenTool.setGridIndex(bullet, bulletGroupMap);
                }
            }
            for (i = 0; i < fishMapLen; i++) {
                let fish: gameObject.Fish = fishMap.values[i];
                if (this._checkFishCanCollider(fish)) {
                    let fishColliderAry: Collider[] = fish.colliderAry;
                    for (let m: number = 0; m < fishColliderAry.length; m++) {
                        fishColliderAry[m].setGlobePos();
                    }
                    NineGridSplitScreenTool.setGridIndex(fish, fishGroupMap);
                }
            }
            let bulletHit: gameObject.Bullet[] = []

            for (let j: number = Grid.Grid_1; j < Grid.Grid_9 + 1; j++) {
                let fishGameObjAry: gameObject.GameObjectCollider[] = fishGroupMap.get(j);
                let bulletGameObjAry: gameObject.GameObjectCollider[] = bulletGroupMap.get(j);
                if (bulletGameObjAry) {
                    let bulletGameObjAryLen: number = bulletGameObjAry.length
                    for (let f: number = 0; f < bulletGameObjAryLen; f++) {
                        let bullet: gameObject.Bullet = bulletGameObjAry[f] as gameObject.Bullet;

                        let targetFish: gameObject.Fish = bullet.targetFish;
                        if (this._checkFishCanCollider(targetFish)) {
                            if (this._chectBulletHit(bullet, targetFish, fishGroupMap)) {
                                bulletHit.push(bullet);
                            }
                        }
                        else {
                            if (fishGameObjAry) {
                                let fishGameObjAryLen: number = fishGameObjAry.length
                                for (let k: number = 0; k < fishGameObjAryLen; k++) {
                                    let fish: gameObject.Fish = fishGameObjAry[k] as gameObject.Fish;
                                    if (this._chectBulletHit(bullet, fish, fishGroupMap)) {
                                        bulletHit.push(bullet);
                                        break;
                                    }
                                }
                            }
                        }

                    }
                }
            }

            for (let item of bulletHit) {
                gameObject.GameObjectFactory.instance.recoverGameObject(item);
            }
            if (this.hitFishList.length > 0) {
                let cmd = new Cmd.HitFishCmd_CS();
                cmd.list = this.hitFishList;
                game.PokerFunction.tcpSend(cmd);
            }
        }


		/**
		 * 检测鱼是否可以碰撞
		 */
        private _checkFishCanCollider(fish: gameObject.Fish): boolean {
            if (fish && fish.isAlive && fish.isInView /*&& !fish.isCollided*/) {
                return true;
            }
            else {
                return false;
            }
        }

		/**
		 * 检测子弹碰撞
		 */
        private _chectBulletHit(bullet: gameObject.Bullet, fish: gameObject.Fish, fishGroupMap: Dictionary): boolean {
            let bulletColliderAry: Collider[] = bullet.colliderAry;
            let fishColliderAry: Collider[] = fish.colliderAry;
            let fishColliderAryLen: number = fishColliderAry.length;
            for (let k: number = 0; k < bulletColliderAry.length; k++) {
                for (let f: number = 0; f < fishColliderAryLen; f++) {
                    if (Collider.isIntersect(bulletColliderAry[k], fishColliderAry[f])) {
                        bullet.isCollided = true;

                        let bornX: number = bullet.x;
                        let bornY: number = bullet.y;
                        let bulletID: number = bullet.servelID;
                        let bulletPlayerID: number = bullet.playerID;
                        let rotation: number = bullet.rotation;


                        /*检测渔网与鱼的碰撞*/
                        this._checkFishingNetHit(bornX, bornY, rotation, bulletID, bulletPlayerID, fishGroupMap, fish);
                        return true;
                    }
                }
            }
            return false;
        }
		/**
		 * 检测渔网碰撞
		 */
        private _checkFishingNetHit(bornX: number, bornY: number, rotation: number, bulletID: number, playerID: number, fishGroupMap: Dictionary, collidedFish: gameObject.Fish): void {
            let battery: gameObject.Battery = this.allBattery.get(playerID);
            if (!battery) {
                return;
            }
            let data: gameObject.IFishNetVars = <gameObject.IFishNetVars>{};
            data.bornX = bornX;
            data.bornY = bornY;
            data.rotation = rotation;
            data.radius = battery.fishNetRadius;
            let fishingNet: gameObject.FishingNet = null;
            if (playerID == Master.instance.uid) {
                fishingNet = gameObject.GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.FishingNet_Self, data, LAYER.FishingNet);
                game.SoundHand.Instance.playOpenFishingNet();
                collidedFish.playHitEff(playerID);
            }
            else {
                fishingNet = gameObject.GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.FishingNet_Green, data, LAYER.FishingNet);
            }
            let user: game.UserInfo = game.PokerFunction.GetUserInfoByUid(playerID)
            if (!user) {
                return;
            }
            if (user.isRobot || playerID == Master.instance.uid) {
                let deadlist: Cmd.Fish[] = [];
                let deadFish: Cmd.Fish = new Cmd.Fish();
                deadFish.id = collidedFish.servelID;
                deadlist.push(deadFish);

                let fishingNetCollider: Collider[] = fishingNet.colliderAry;
                for (let j: number = 0; j < fishingNetCollider.length; j++) {
                    fishingNetCollider[j].setGlobePos();
                }
                NineGridSplitScreenTool.analyseGrid(fishingNet);
                let isBreak: boolean = false;
                for (let i: number = 0; i < fishingNet.grid.length; i++) {
                    let fishAry: gameObject.Fish[] = fishGroupMap.get(fishingNet.grid[i]);
                    if (fishAry) {
                        let len: number = fishAry.length
                        for (let m: number = 0; m < len; m++) {

                            let fish: gameObject.Fish = fishAry[m];
                            if (fish.servelID == collidedFish.servelID) {
                                continue;
                            }
                            isBreak = false;
                            let fishColliderAry: Collider[] = fish.colliderAry;
                            let fishColliderAryLen: number = fishColliderAry.length;

                            for (let f: number = 0; f < fishColliderAryLen; f++) {
                                if (isBreak) {
                                    break;
                                }
                                for (let k: number = 0; k < fishingNetCollider.length; k++) {
                                    if (Collider.isIntersect(fishingNetCollider[k], fishColliderAry[f])) {
                                        isBreak = true;
                                        fish.playHitEff(playerID);
                                        let deadFish: Cmd.Fish = new Cmd.Fish();
                                        deadFish.id = fish.servelID;
                                        deadlist.push(deadFish);
                                        break;
                                    }
                                }
                            }

                        }
                    }
                    this._sendMsg(deadlist, bulletID, playerID)
                }
            }
        }



		/**
		 * 检测爆炸碰撞
		 */
        private _checkBoomHit(bornX: number, bornY: number, bulletID: number, playerUID: number): void {
            let data: gameObject.IGameObjectVars = <gameObject.IGameObjectVars>{};
            data.bornX = bornX;
            data.bornY = bornY;
            let boom: gameObject.Burst = gameObject.GameObjectFactory.instance.creatGameObject(GAMEOBJECT_SIGN.BURST, data, LAYER.EFFECT);
            let boomColliderAry: Collider[] = boom.colliderAry;
            for (let j: number = 0; j < boomColliderAry.length; j++) {
                boomColliderAry[j].setGlobePos();
            }
            let fishMap: Dictionary = this.inViewFishes;
            let fishMapLen: number = fishMap.length
            let isBreak: boolean = false;
            let deadlist: Cmd.Fish[] = [];
            let i: number;
            for (i = 0; i < fishMapLen; i++) {
                let fish: gameObject.Fish = fishMap.values[i];
                if (this._checkFishCanCollider(fish)) {
                    let fishColliderAry: Collider[] = fish.colliderAry;
                    for (let m: number = 0; m < fishColliderAry.length; m++) {
                        fishColliderAry[m].setGlobePos();
                    }
                    if (fish.isCollided) {
                        continue;
                    }
                    isBreak = false
                    for (let f: number = 0; f < boomColliderAry.length; f++) {
                        if (isBreak) {
                            break;
                        }
                        for (let k: number = 0; k < fishColliderAry.length; k++) {
                            if (Collider.isIntersect(boomColliderAry[f], fishColliderAry[k])) {
                                isBreak = true;
                                fish.isCollided = true;
                                fish.playHitEff(Master.instance.uid, 2000, true);
                                let deadFish: Cmd.Fish = new Cmd.Fish();
                                deadFish.id = fish.servelID;
                                deadlist.push(deadFish);
                                break;
                            }
                        }
                    }
                }
            }
            if (deadlist.length != 0) {
                this._sendMsg(deadlist, bulletID, playerUID, true);
            }
        }

		/**
		 * 发送协议
		 */
        private _sendMsg(deadlist: Cmd.Fish[], bulletID: number, playerID: number, isBurst?: boolean) {
            let hitFish = new Cmd.HitFish();
            hitFish.list = deadlist;
            hitFish.bid = bulletID;
            hitFish.list = deadlist;
            hitFish.uid = playerID;
            if (isBurst) {
                hitFish.hitType = 1;
            }
            this.hitFishList.push(hitFish);
        }

		/**
		 * 字典写入玩家炮台
		 */
        private _addBatteryInMap(uid: number, battery: gameObject.Battery): void {
            if (this.allBattery.length <= 4) {
                if (!this.allBattery.isExist(uid)) {
                    this.allBattery.set(uid, battery);
                }
                else {
                    console.assert(false, "玩家已经存在！");
                }
            }
            else {
                console.assert(false, "座位已满！");
            }
        }

		/**
		 * 字典移除玩家炮台
		 */
        private _removeBatteryInMap(uid: number): void {
            if (!this.allBattery.remove(uid)) {
                console.assert(false, "玩家不存在！");
            }
        }

		/**
		 * 释放
		 */
        public dispose(): void {
            Laya.timer.clear(this, this._checkHit);
            EventManager.unregisterEvent(EVENT_ID.REMOVE_BULLET_IN_MAP, this, this._removeBulletInMap);
            EventManager.unregisterEvent(EVENT_ID.REMOVE_FISH_IN_MAP, this, this._removeFishInMap);
            EventManager.unregisterEvent(EVENT_ID.ADD_BULLET_IN_MAP, this, this._addBulletInMap);
            EventManager.unregisterEvent(EVENT_ID.ADD_FISH_IN_MAP, this, this._addFishInMap);
            EventManager.unregisterEvent(EVENT_ID.ADD_BATTERY_IN_MAP, this, this._addBatteryInMap);
            EventManager.unregisterEvent(EVENT_ID.REMOVE_BATTERY_IN_MAP, this, this._removeBatteryInMap);
            EventManager.unregisterEvent(EVENT_ID.DRA_EFF_COMPLETE, this, this._draEffComplete);
            EventManager.unregisterEvent(EVENT_ID.MER_EFF_COMPLETE, this, this._merEffComplete);

            game.Action.spawnFishEvent.remove(this._spawnFishEvent, this);
            this.destroyBattery();
            this.destroyFishes();
            this.inViewFishes.clear();
            this.allBattery.clear();
            this.masterBattery = null;
        }

		/**
		 * 销毁玩家
		 */
        private destroyBattery(): void {
            let map: SimpleMap<gameObject.Battery> = this.allBattery.copy();
            var len: number = map.length;
            for (var i: number = 0; i < len; i++) {
                let battery: gameObject.Battery = map.getByKeyIndex(i);
                gameObject.GameObjectFactory.instance.recoverGameObject(battery);
            }
            map.recover();
        }

		/**
		 * 销毁鱼
		 */
        public destroyFishes(): void {
            let map: Dictionary = this.inViewFishes.copy();
            var len: number = map.length;
            for (var i: number = 0; i < len; i++) {
                var fish: gameObject.Fish = map.values[i];
                gameObject.GameObjectFactory.instance.recoverGameObject(fish);
            }
        }

		/**
		 * 销毁子弹
		 */
        private destroyBullets(): void {
            let map: Dictionary = this.inViewBullets.copy();
            var len: number = map.length;
            for (var i: number = 0; i < len; i++) {
                var bullet: gameObject.Bullet = map.values[i];
                gameObject.GameObjectFactory.instance.recoverGameObject(bullet);
            }
        }

		/**
		 * 找到场上最值钱的鱼
		 */
        public findMostValuableFish(): gameObject.Fish {
            let selectFishes: gameObject.Fish[] = [];
            for (let i: number = 0; i < this.allBattery.length; i++) {
                let battery: gameObject.Battery = this.allBattery.getByKeyIndex(i);
                if (battery && battery.user.uid != Master.instance.uid) {
                    if (battery.targetFishId != - 1) {
                        let fish: gameObject.Fish = this.inViewFishes.get(battery.targetFishId);
                        if (this._checkFishCanCollider(fish)) {
                            selectFishes.push(fish);
                        }
                    }
                }
            }

            let fishMap: Dictionary = this.inViewFishes;
            let mostValuableFish: gameObject.Fish = null;
            let fish: gameObject.Fish;
            let index: number = 0;
            let isBreak: boolean = false;
            let [x, y]: [number, number] = [-1, -1];
            for (let i: number = fishMap.length - 1; i >= 0; i--) {
                if (isBreak) {
                    break;
                }
                fish = fishMap.values[i];
                if (this._checkFishCanCollider(fish)) {
                    if (fish.isAccurateCollider) {
                        for (let j: number = 0; j < fish.colliderAry.length; j++) {
                            let collider: FishingJoy.Collider = fish.colliderAry[j];
                            [x, y] = UIUtil.localToGlobal(collider);
                            if (UIUtil.inAimView(x, y)) {
                                if (fish.sign == GAMEOBJECT_SIGN.DRAGON || fish.sign == GAMEOBJECT_SIGN.MERMAID) {
                                    return fish;
                                }
                                else {
                                    if (selectFishes.indexOf(fish) == -1) {
                                        mostValuableFish = fish;
                                        index = i
                                        isBreak = true;
                                    }
                                    break;
                                }

                            }
                        }
                    }
                    else {
                        [x, y] = UIUtil.localToGlobal(fish);
                        if (selectFishes.indexOf(fish) == -1) {
                            if (UIUtil.inAimView(x, y)) {
                                mostValuableFish = fish;
                                index = i;
                                break;
                            }
                        }
                    }

                }
            }
            if (mostValuableFish != null) {
                for (let k: number = index - 1; k >= 0; k--) {
                    fish = fishMap.values[k];
                    if (this._checkFishCanCollider(fish)) {

                        if (fish.isAccurateCollider) {
                            for (let j: number = 0; j < fish.colliderAry.length; j++) {
                                let collider: FishingJoy.Collider = fish.colliderAry[j];
                                [x, y] = UIUtil.localToGlobal(collider);
                                if (UIUtil.inAimView(x, y)) {
                                    if (fish.sign == GAMEOBJECT_SIGN.DRAGON || fish.sign == GAMEOBJECT_SIGN.MERMAID) {
                                        return fish;
                                    }
                                    if (selectFishes.indexOf(fish) == -1) {
                                        if (mostValuableFish.odds < fish.odds) {
                                            mostValuableFish = fish;
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        else {
                            [x, y] = UIUtil.localToGlobal(fish);
                            if (selectFishes.indexOf(fish) == -1) {
                                if (UIUtil.inAimView(x, y)) {
                                    if (mostValuableFish.odds < fish.odds) {
                                        mostValuableFish = fish;
                                    }
                                }
                            }
                        }

                    }
                }
            }
            else {
                if (selectFishes.length > 0) {
                    mostValuableFish = selectFishes[0];
                }
            }
            return mostValuableFish;
        }
    }
}