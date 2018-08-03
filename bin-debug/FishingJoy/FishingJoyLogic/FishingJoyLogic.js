var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 捕鱼主逻辑
 * @author suo
 */
var FishingJoy;
(function (FishingJoy) {
    var FishingJoyLogic = (function () {
        function FishingJoyLogic() {
            /**
             * 在屏幕内的鱼字典(key：鱼uid value：鱼)
             */
            this.inViewFishes = new Dictionary();
            /**
             * 在屏幕内的子弹字典(场景内所有的子弹 跟表现绑定 key子弹uid value子弹)
             */
            this.inViewBullets = new Dictionary();
            /**
             * 所有的玩家炮台 key:玩家uid value:battery
             */
            this.allBattery = new SimpleMap();
            /**
             * 玩家炮台
             */
            this.masterBattery = null;
            /**
             * 记录每帧打中鱼列表
             */
            this.hitFishList = [];
            this.eachHeapOfGoldCoinsData = [[], [], [], []];
            this.numberOfGoldCoins = [0, 0, 0, 0];
            this.goldCoinRemovalTime = [[], [], [], []];
            this.dataStorage = [[], [], [], []];
            //奖章
            this.medalStorage = [[], [], [], []];
        }
        /**
         * 从字典移除子弹
         */
        FishingJoyLogic.prototype._removeBulletInMap = function (servelID) {
            if (!this.inViewBullets.remove(servelID)) {
                // console.assert(false, "不存在该子弹！");
            }
        };
        /**
         * 从字典移除鱼
         */
        FishingJoyLogic.prototype._removeFishInMap = function (servelID) {
            if (!this.inViewFishes.remove(servelID)) {
                console.assert(false, "不存在该鱼！");
            }
        };
        /**
         * 从字典添加鱼
         */
        FishingJoyLogic.prototype._addFishInMap = function (servelID, fish) {
            if (this.inViewFishes.isExist(servelID)) {
                console.assert(false, "已经存在该鱼！");
            }
            else {
                this.inViewFishes.set(servelID, fish);
            }
        };
        /**
         * 从字典添加子弹
         */
        FishingJoyLogic.prototype._addBulletInMap = function (servelID, bullet) {
            if (this.inViewBullets.isExist(servelID)) {
                console.assert(false, "已经存在该子弹！");
            }
            else {
                this.inViewBullets.set(servelID, bullet);
            }
        };
        Object.defineProperty(FishingJoyLogic, "instance", {
            /**
             * 获得单例
             */
            get: function () {
                if (this._instance == null) {
                    this._instance = new FishingJoyLogic();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化
         */
        FishingJoyLogic.prototype.initFishingJoyLogic = function () {
            FishingJoy.NineGridSplitScreenTool.initValue();
            EventManager.registerEvent(3 /* REMOVE_BULLET_IN_MAP */, Handler.create(this, this._removeBulletInMap));
            EventManager.registerEvent(5 /* REMOVE_FISH_IN_MAP */, Handler.create(this, this._removeFishInMap));
            EventManager.registerEvent(4 /* ADD_BULLET_IN_MAP */, Handler.create(this, this._addBulletInMap));
            EventManager.registerEvent(6 /* ADD_FISH_IN_MAP */, Handler.create(this, this._addFishInMap));
            EventManager.registerEvent(7 /* ADD_BATTERY_IN_MAP */, Handler.create(this, this._addBatteryInMap));
            EventManager.registerEvent(8 /* REMOVE_BATTERY_IN_MAP */, Handler.create(this, this._removeBatteryInMap));
            EventManager.registerEvent(16 /* DRA_EFF_COMPLETE */, Handler.create(this, this._draEffComplete));
            EventManager.registerEvent(15 /* MER_EFF_COMPLETE */, Handler.create(this, this._merEffComplete));
            /*鱼死亡协议*/
            game.Action.deadFishEvent.add(this._deadFishCmd, this);
            /*生成鱼协议*/
            game.Action.spawnFishEvent.add(this._spawnFishEvent, this);
            /*切换场景协议*/
            game.Action.changeSceneEvent.add(this.changeScene, this);
            /*房间数据更新*/
            GX.PokerEvent.Instance.roomDataUpdateEvent.add(this._roomDataUpdateEvent, this);
            /*子弹更新*/
            game.Action.sendBulletEvent.add(this._firBullet, this);
            Laya.timer.frameLoop(1, this, this._checkHit);
            MJLobby.MJLobbyEventListener.getInstance().addEventListener(MJLobby.MahJongLobbyFacadeConsts.USER_INFO_DATA, this.onUserInfoData, this);
        };
        FishingJoyLogic.prototype._merEffComplete = function (x, y, score) {
            this.changeScene(null, null, true);
            this.freeAccessToQuotas(x, y, score);
        };
        FishingJoyLogic.prototype._draEffComplete = function (x, y, score) {
            this.changeScene(null, null, true);
            this.freeAccessToQuotas(x, y, score);
        };
        /*
        *房间数据更新
        */
        FishingJoyLogic.prototype._roomDataUpdateEvent = function (rev) {
            var _this = this;
            this.destroyBullets();
            this.destroyFishes();
            FishingJoy.DataCenter.instance.sceneId = rev.roomData.sceneId;
            this.changeScene(null, null, true, false);
            var spawnFish = new Cmd.SpawnFishCmd_S();
            spawnFish.fishlist = rev.roomData.fishlist;
            this._spawnFishEvent(spawnFish, true);
            var bullet = rev.roomData.bulletinfo;
            var serverNow = game.GameTime.serverNow();
            Laya.timer.once(300, this, function () {
                if (bullet) {
                    for (var _i = 0, bullet_1 = bullet; _i < bullet_1.length; _i++) {
                        var item = bullet_1[_i];
                        if (serverNow - item.fireTime < 4000)
                            _this._firBullet(item);
                    }
                }
            });
            var seatList = game.RoomData.Instance.seatList;
            for (var _i = 0, seatList_1 = seatList; _i < seatList_1.length; _i++) {
                var item = seatList_1[_i];
                item.lockChanged.call(item);
            }
        };
        /**
         * 玩家信息更新
         */
        FishingJoyLogic.prototype.onUserInfoData = function () {
            var info = MJLobby.MJLobbyData.getInstance().myBaseInfo;
            if (info == null)
                return;
            var mainUser = game.PokerFunction.MainUser;
            if (mainUser == null)
                return;
            mainUser.point = info.chips;
            var battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(uniLib.NetMgr.UID);
            if (battery) {
                this.goldCoinRefresh(battery);
            }
        };
        /**
         *退潮
         */
        FishingJoyLogic.prototype.changeScene = function (rev, sceneId, revert, isPlayTween) {
            if (isPlayTween === void 0) { isPlayTween = true; }
            if (rev) {
                FishingJoy.DataCenter.instance.isSwitchFish = true;
                manager.OperationManager.instance.leaveQuickly();
                FishingJoy.DataCenter.instance.sceneId = rev.sceneId;
                EventManager.fireEvent(20 /* EBB_TIDE */);
            }
            var revertImage = "bg" + FishingJoy.DataCenter.instance.sceneId + "_jpg";
            var back0 = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishMainSceneView).backGround0;
            var back1 = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishMainSceneView).backGrounds1;
            var sprayGroup = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishMainSceneView).sprayGroups;
            manager.LayerManager.instance.addToLayer(sprayGroup, 8 /* EFFECT */);
            manager.LayerManager.instance.addToLayer(back1, 1 /* back */);
            back1.anchorOffsetX = back1.width / 2;
            back1.anchorOffsetY = back1.height / 2;
            back1.y = uniLib.Global.screenHeight / 2;
            back1.rotation = back0.rotation;
            var data;
            if (!isPlayTween) {
                back0.source = revert ? revertImage : "bg" + sceneId + "_jpg";
                return;
            }
            if (rev || sceneId) {
                data = rev ? FishingJoy.DataCenter.instance.sceneId : sceneId;
            }
            var jianbianImages = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishMainSceneView).jianbianImages;
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
            var langhuaString = rev ? "langbo" : "langbo1";
            sprayGroup.removeChildren();
            var theEbbTideMov = UIUtil.creatMovieClip(langhuaString);
            sprayGroup.addChild(theEbbTideMov);
            sprayGroup.addChild(jianbianImages);
            theEbbTideMov.y = 360;
            theEbbTideMov.gotoAndPlay(1, -1);
            theEbbTideMov.x = rev ? 0 : uniLib.Global.screenWidth;
            back1.source = data ? "bg" + data + "_jpg" : "bg" + FishingJoy.DataCenter.instance.sceneId + "_jpg";
            egret.Tween.get(back0).to({ x: rev ? -uniLib.Global.screenWidth + 640 : uniLib.Global.screenWidth + 640 }, uniLib.Global.screenWidth * 1.6).call(function () {
                back0.source = data ? "bg" + data + "_jpg" : "bg" + FishingJoy.DataCenter.instance.sceneId + "_jpg";
                back0.x = 640;
            });
            egret.Tween.get(back1).to({ x: uniLib.Global.screenWidth / 2 }, uniLib.Global.screenWidth * 1.6).call(function () {
                back1.x = uniLib.Global.screenWidth;
                back1.source = "";
            });
            egret.Tween.get(sprayGroup).to({ x: rev ? -uniLib.Global.screenWidth - 16 : uniLib.Global.screenWidth + 16 }, 2 * (uniLib.Global.screenWidth + 16) * 1.6).call(function () {
                theEbbTideMov.stop();
                sprayGroup.removeChild(theEbbTideMov);
                // Pool.recover(Pool.langbo, theEbbTideMov);
                manager.LayerManager.instance.removeFromLayer(sprayGroup);
                manager.LayerManager.instance.removeFromLayer(back1);
            });
            var cmd = new Cmd.GameTimeSyncCmd_CS();
            game.PokerFunction.tcpSend(cmd);
        };
        /**
         *免费游戏获取金币
         */
        FishingJoyLogic.prototype.freeAccessToQuotas = function (x, y, score) {
            var TextNew = Pool.getItemByClass(Pool.jumpCoinText, eui.BitmapLabel);
            TextNew.font = "coinFont_fish_fnt";
            UIUtil.traGoldLabel(TextNew);
            TextNew.text = "+" + GX.GoldFormat(score);
            manager.LayerManager.instance.addToLayer(TextNew, 8 /* EFFECT */);
            // TextNew.anchorOffsetX = TextNew.width/2;
            // TextNew.anchorOffsetY = TextNew.height/2
            TextNew.x = x > uniLib.Global.screenWidth / 2 ? x : x - 130;
            ;
            TextNew.y = y > uniLib.Global.screenHeight / 2 ? y - 40 : y + 40;
            egret.Tween.get(TextNew).to({ alpha: 0 }, 2000).call(function () {
                Pool.recover(Pool.jumpCoinText, TextNew);
                manager.LayerManager.instance.removeFromLayer(TextNew);
            });
        };
        /**
         * 发射子弹
         */
        FishingJoyLogic.prototype._firBullet = function (bulletInfo) {
            var battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(bulletInfo.uid);
            if (battery == null)
                return;
            //机器人的话角度可能是负数
            bulletInfo.angle = bulletInfo.angle < 0 ? bulletInfo.angle + 360 : bulletInfo.angle;
            if (battery) {
                this.goldCoinRefresh(battery);
                var bulletRotation = void 0;
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
                    UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishBtnView).updataGoldPoolLabel(bulletInfo["freeGoldPool"], bulletInfo["normalGoldPool"]);
                }
                // if(Master.instance.isFastShoot){
                //     game.SoundHand.Instance.playHighSpeedGun()
                // }
                // else{
                game.SoundHand.Instance.playLowSpeedGun();
                // }
            }
        };
        /**
         * 发射
         */
        FishingJoyLogic.prototype._fire = function (battery, bulletInfo, bulletRotation) {
            // if(Master.instance.isFastShoot){
            //     game.SoundHand.Instance.playHighSpeedGun();
            // }
            // else{
            // }
            battery.sendBulletEffect();
            var startPoint = Point.create(0, 0);
            var fishLayer = manager.LayerManager.instance.getLayer(2 /* Fish */);
            battery.firePoint.localToGlobal(0, 0, startPoint);
            fishLayer.globalToLocal(startPoint.x, startPoint.y, startPoint);
            var vars = {};
            vars.bornX = startPoint.x;
            vars.bornY = startPoint.y;
            Point.release(startPoint);
            vars.rotation = bulletRotation;
            vars.servelID = bulletInfo.id;
            if (Master.instance.uid == bulletInfo.uid) {
                if (battery.fireBulletNum == 1) {
                    vars.sign = 10005 /* BULLET_SELF */;
                }
                else if (battery.fireBulletNum == 2) {
                    vars.sign = 10006 /* BULLET_SELF_2 */;
                }
                else if (battery.fireBulletNum == 3) {
                    vars.sign = 10007 /* BULLET_SELF_3 */;
                }
            }
            else {
                if (battery.fireBulletNum == 1) {
                    vars.sign = 10000 /* BULLET_OTHER */;
                }
                else if (battery.fireBulletNum == 2) {
                    vars.sign = 10001 /* BULLET_OTHER_2 */;
                }
                else if (battery.fireBulletNum == 3) {
                    vars.sign = 10002 /* BULLET_OTHER_3 */;
                }
            }
            if (battery.isAimShoot) {
                var fish = FishingJoy.FishingJoyLogic.instance.inViewFishes.get(battery.targetFishId);
                vars.targetFish = fish;
            }
            vars.operation = [{
                    type: battery.isAimShoot ? 2 /* BulletTrack */ : 1 /* BULLET */,
                    rotation: bulletRotation,
                    bornTime: battery.isAimShoot ? bulletInfo.fireTime : bulletInfo.fireTime + 150,
                }];
            vars.playerUID = bulletInfo.uid;
            var bullet = gameObject.GameObjectFactory.instance.creatGameObject(vars.sign, vars, 4 /* Bullet */);
        };
        /**
         * 打死鱼
         */
        FishingJoyLogic.prototype._deadFishCmd = function (rev) {
            if (rev.list == null || !(rev.list instanceof Array))
                return;
            for (var _i = 0, _a = rev.list; _i < _a.length; _i++) {
                var item = _a[_i];
                this._deadFish(item);
            }
        };
        /**
         * 打死鱼
         */
        FishingJoyLogic.prototype._deadFish = function (deadFish) {
            game.SoundHand.Instance.playCatch();
            /*所有碰撞器打开*/
            var fishMap = this.inViewFishes;
            var fishList = deadFish.list;
            this.medal(deadFish);
            this.coinDozer(deadFish);
            for (var i = 0; i < fishList.length; i++) {
                var fish = fishMap.get(fishList[i].id);
                if (fish == null)
                    continue;
                var score = fishList[i].score;
                console.info("鱼id:" + fish.sign + "鱼金币" + score);
                if (fish && fish.isAlive) {
                    if (fish.skillID == 1) {
                        game.SoundHand.Instance.playCatchAllInOneDraft();
                    }
                    else if (fish.skillID == 3) {
                        game.SoundHand.Instance.playCatchAllInOneDraft1();
                    }
                    fish.isAlive = false;
                    fish.unregisterOperation();
                    fish.playDieMov(Handler.create(this, this._recoverFish, [fish, deadFish.uid, score, deadFish.bid]));
                }
            }
            var bullet = this.inViewBullets.get(deadFish.bid);
            if (bullet) {
                var bornX = bullet.x;
                var bornY = bullet.y;
                gameObject.GameObjectFactory.instance.recoverGameObject(bullet);
                var data = {};
                data.bornX = bornX;
                data.bornY = bornY;
                var fishingNet = gameObject.GameObjectFactory.instance.creatGameObject(30000 /* FishingNet_Green */, data, 3 /* FishingNet */);
            }
        };
        /**
         * 回收鱼
         */
        FishingJoyLogic.prototype._recoverFish = function (fish, playerUID, score, bulletID) {
            //获取金币
            // if (fish.sign == GAMEOBJECT_SIGN.DRAGON) {
            // 	this.changeScene(null, null, true)
            // }
            var _a = UIUtil.localToGlobal(fish), x = _a[0], y = _a[1];
            if (fish.sign != 2002 /* MERMAID */) {
                if (fish.sign != 2001 /* DRAGON */) {
                    this.getGoldCoins(x, y, fish.odds, playerUID, score);
                }
            }
            this._checkSpecialFish(x, y, fish, playerUID, score, bulletID);
            gameObject.GameObjectFactory.instance.recoverGameObject(fish);
        };
        /**
         * 检测是否特殊鱼
         */
        FishingJoyLogic.prototype._checkSpecialFish = function (x, y, fish, playerUID, score, bulletID) {
            if (fish.sign == 1001 /* BOOM_FISH */) {
                this.explodingFish(x, y, bulletID, playerUID);
            }
            else if (fish.sign == 2002 /* MERMAID */) {
                game.SoundHand.Instance.playMermaidCapture();
                this.freePromptCloses();
                var data = {};
                data.bornX = uniLib.Global.screenWidth / 2;
                data.bornY = uniLib.Global.screenHeight / 2 + 50;
                data.targetBattery = FishingJoyLogic.instance.allBattery.get(playerUID);
                if (!data.targetBattery || !data.targetBattery.user)
                    return;
                data.score = score;
                if (data.targetBattery) {
                    data.playerNickName = data.targetBattery.user.nickName;
                    gameObject.GameObjectFactory.instance.creatGameObject(40001 /* MERMAID_EFF */, data, 9 /* EFFECT_BIG */);
                }
                // egret.log("美人鱼被打死，playerUID:" + playerUID)
            }
            else if (fish.sign == 2001 /* DRAGON */) {
                game.SoundHand.Instance.playGoldenDragonCapture();
                this.freePromptCloses();
                var data = {};
                data.bornX = uniLib.Global.screenWidth / 2;
                data.bornY = uniLib.Global.screenHeight / 2 + 50;
                data.score = score;
                var battery = FishingJoy.FishingJoyLogic.instance.allBattery.get(playerUID);
                data.targetBattery = FishingJoyLogic.instance.allBattery.get(playerUID);
                if (!data.targetBattery || !data.targetBattery.user)
                    return;
                if (data.targetBattery) {
                    data.playerNickName = data.targetBattery.user.nickName;
                    gameObject.GameObjectFactory.instance.creatGameObject(40002 /* DRAGON_EFF */, data, 9 /* EFFECT_BIG */);
                }
            }
        };
        /**
         * 爆炸鱼特效
         */
        FishingJoyLogic.prototype.explodingFish = function (x, y, bulletID, playerUID) {
            var mov = UIUtil.creatMovieClip("Bomb");
            mov.y = y;
            mov.x = x;
            game.SoundHand.Instance.playBlast();
            mov.gotoAndPlay(1, 1);
            manager.LayerManager.instance.addToLayer(mov, 8 /* EFFECT */);
            var complete = function () {
                manager.LayerManager.instance.removeFromLayer(mov);
            };
            mov.once(egret.Event.COMPLETE, complete, null);
            this._checkBoomHit(x, y, bulletID, playerUID);
        };
        /**
         * 获得金币
         */
        FishingJoyLogic.prototype.getGoldCoins = function (x, y, odds, uid, score) {
            var _this = this;
            var battery = this.allBattery.get(uid);
            if (battery == null || battery.user == null)
                return;
            var _a = UIUtil.localToGlobal(battery.coinImg), x1 = _a[0], y1 = _a[1];
            game.SoundHand.Instance.playGoldCoin();
            var seat = game.GameConstant.SeatPositonList[game.GameConstant.GetClientNoBySeatId(battery.seatdata.seatId) - 1];
            var seatID = game.GameConstant.GetClientNoBySeatId(battery.seatdata.seatId);
            var numberData;
            if (odds > 10) {
                numberData = (odds - (odds % 10)) / 10;
            }
            else {
                numberData = 1;
            }
            var datax = x - (numberData / 2 * 45);
            var datay = y;
            var timeon = GX.getDistanceByPoint({ x: datax, y: datay }, { x: seat.x, y: seat.y });
            var TextNew;
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
            manager.LayerManager.instance.addToLayer(TextNew, 8 /* EFFECT */);
            TextNew.x = datax - (TextNew.textWidth / 2);
            TextNew.y = datay - 25;
            var _loop_1 = function () {
                var mov;
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
                manager.LayerManager.instance.addToLayer(mov, 8 /* EFFECT */);
                egret.Tween.get(mov).to({ y: mov.y - 50 }, 200).call(function () {
                    egret.Tween.get(mov).to({ y: mov.y + 80 }, 500, egret.Ease.backInOut).call(function () {
                        egret.Tween.get(mov).to({ y: mov.y - 10 }, 100).call(function () {
                            egret.Tween.get(mov).to({ x: x1, y: y1 }, timeon).call(function () {
                                _this.goldCoinRefresh(battery);
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
            };
            for (var i = 0; i < numberData; ++i) {
                _loop_1();
            }
            Laya.timer.once(1000, this, function () {
                manager.LayerManager.instance.removeFromLayer(TextNew);
                if (battery.user) {
                    if (battery.user.uid == Master.instance.uid) {
                        Pool.recover(Pool.jumpCoinText, TextNew);
                    }
                    else {
                        Pool.recover(Pool.jumpCoinTexts, TextNew);
                    }
                }
            });
            // this.coinDozer(seat,odds)
        };
        FishingJoyLogic.prototype.goldCoinRefresh = function (battery) {
            battery.goldCoinRefresh();
        };
        FishingJoyLogic.prototype.coinDozer = function (rev, seatingData) {
            var _this = this;
            var data;
            var odds = 0;
            var scores = 0;
            var battery;
            if (rev) {
                data = rev;
            }
            battery = rev ? this.allBattery.get(rev.uid) : seatingData;
            if (battery == null) {
                return;
            }
            if (!battery.seatdata)
                return;
            var seatId = battery.seatdata.seatId;
            var seatIndex = seatId - 1;
            if (this.eachHeapOfGoldCoinsData[seatIndex].length >= 3 && rev) {
                this.dataStorage[seatIndex].push(rev);
                if (this.dataStorage[seatIndex].length == 1) {
                    this.coinDozer(null, battery);
                }
                return;
            }
            if (rev == null) {
                if (this.dataStorage[seatIndex].length == 0) {
                    return;
                }
                data = this.dataStorage[seatIndex][0];
            }
            var seat = game.GameConstant.SeatPositonList[game.GameConstant.GetClientNoBySeatId(seatId) - 1];
            var score = 0;
            for (var n = 0; n < data.list.length; n++) {
                var fish = this.inViewFishes.get(data.list[n].id);
                score = score + data.list[n].score;
            }
            odds = score / Number(battery._costMoneyTF.text);
            var x = 0;
            var y = 0;
            var group = new eui.Group();
            group.touchEnabled = false;
            if (this.numberOfGoldCoins[seatIndex] != 0) {
                var numberMy = this.numberOfGoldCoins[seatIndex];
                if (this.numberOfGoldCoins[seatIndex] >= 3) {
                    this.numberOfGoldCoins[seatIndex] = 3;
                }
                group.x = seat.x > uniLib.Global.screenWidth / 2 ? (760 * uniLib.Global.screenWidth / 1280) - ((numberMy < 3 ? numberMy : 2) * 35) :
                    (460 * uniLib.Global.screenWidth / 1280) + ((numberMy < 3 ? numberMy : 2) * 35);
                if (this.numberOfGoldCoins[seatIndex] == 3) {
                    if (this.eachHeapOfGoldCoinsData[seatIndex][0])
                        this.goldCoinPush(battery, 0);
                    if (this.eachHeapOfGoldCoinsData[seatIndex][1])
                        this.goldCoinPush(battery, 1);
                    if (this.eachHeapOfGoldCoinsData[seatIndex][2])
                        this.goldCoinPush(battery, 2, false, group, odds, score);
                }
            }
            else {
                group.x = seat.x > uniLib.Global.screenWidth / 2 ? (760 * uniLib.Global.screenWidth / 1280) : (460 * uniLib.Global.screenWidth / 1280);
            }
            group.y = seat.y > uniLib.Global.screenHeight / 2 ? 553 : -7; //seat.y+43.5;//595
            manager.LayerManager.instance.addToLayer(group, 8 /* EFFECT */);
            if (this.numberOfGoldCoins[seatIndex] < 3) {
                for (var m = 0; m < (odds > 20 ? 20 : odds); m++) {
                    game.Timer.setTimeout(function () {
                        var imageMy = Pool.getItemByClass("coinDozerImage", eui.Image);
                        imageMy.source = "batteryBase8";
                        imageMy.scaleX = 0.85;
                        imageMy.scaleY = 0.85;
                        imageMy.x = 0; //seat.x + x;
                        imageMy.y = seat.y > uniLib.Global.screenHeight / 2 ? 160 + y : 8 - y;
                        imageMy.touchEnabled = false;
                        y -= 6.8;
                        group.addChild(imageMy);
                    }, this, m * 10);
                }
                var TextNew = new eui.BitmapLabel();
                TextNew.font = "coinFont_fish_fnt";
                UIUtil.traGoldLabel(TextNew);
                TextNew.touchEnabled = false;
                TextNew.text = "" + GX.GoldFormat(score);
                group.addChild(TextNew);
                TextNew.anchorOffsetX = TextNew.width / 2;
                TextNew.anchorOffsetY = TextNew.height / 2;
                TextNew.scaleX = 0.3;
                TextNew.scaleY = 0.3;
                TextNew.x = 12.75; //group.width / 2;
                TextNew.y = seat.y > uniLib.Global.screenHeight / 2 ? 160 + -10 + (-6.8 * ((odds > 20 ? 20 : odds) - 1)) : 16 - (-6.8 * ((odds > 20 ? 20 : odds) - 1)) + 10;
            }
            this.eachHeapOfGoldCoinsData[seatIndex].push(group);
            this.numberOfGoldCoins[seatIndex] += 1;
            if (this.goldCoinRemovalTime[seatIndex][0]) {
                game.Timer.clearTimeout(this.goldCoinRemovalTime[seatIndex][0]);
                this.goldCoinRemovalTime[seatIndex] = [];
            }
            var batterys = battery;
            var goldCoinRemovalTime = game.Timer.setTimeout(function () {
                _this.goldCoinAutomaticallyRemoved(batterys);
            }, this, 4000);
            this.goldCoinRemovalTime[seatIndex].push(goldCoinRemovalTime);
        };
        FishingJoyLogic.prototype.goldCoinAutomaticallyRemoved = function (battery) {
            var _this = this;
            if (!battery.seatdata)
                return;
            var seatId = battery.seatdata.seatId;
            var seatIndex = seatId - 1;
            if (this.goldCoinRemovalTime[seatIndex][0]) {
                game.Timer.clearTimeout(this.goldCoinRemovalTime[seatIndex][0]);
                this.goldCoinRemovalTime[seatIndex] = [];
            }
            if (this.eachHeapOfGoldCoinsData[seatIndex][0]) {
                this.goldCoinPush(battery, 0);
            }
            if (this.eachHeapOfGoldCoinsData[seatIndex][1])
                this.goldCoinPush(battery, 1);
            if (this.eachHeapOfGoldCoinsData[seatIndex][2])
                this.goldCoinPush(battery, 2, true);
            this.eachHeapOfGoldCoinsData[seatIndex].removeAt(0);
            this.numberOfGoldCoins[seatIndex] = this.eachHeapOfGoldCoinsData[seatIndex].length;
            if (this.eachHeapOfGoldCoinsData[seatIndex][0]) {
                var goldCoinRemovalTime = game.Timer.setTimeout(function () {
                    _this.goldCoinAutomaticallyRemoved(battery);
                }, this, 4000);
                this.goldCoinRemovalTime[seatIndex].push(goldCoinRemovalTime);
            }
        };
        //金币推移动画
        FishingJoyLogic.prototype.goldCoinPush = function (battery, second, bool, group, odds, score) {
            var _this = this;
            var seat = game.GameConstant.SeatPositonList[game.GameConstant.GetClientNoBySeatId(battery.seatdata.seatId) - 1];
            var y = 0;
            if (second == 0) {
                manager.LayerManager.instance.removeFromLayer(this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1][0]);
                // this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1].removeAt(0);
                return;
            }
            egret.Tween.get(this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1][second]).to({
                x: seat.x > uniLib.Global.screenWidth / 2 ?
                    this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1][second].x + 35 : this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1][second].x + -35
            }, 300).call(function () {
                // if(bool){
                //     this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1].removeAt(0);
                // }
                if (group) {
                    for (var m = 0; m < (odds > 20 ? 20 : odds); m++) {
                        game.Timer.setTimeout(function () {
                            var imageMy = Pool.getItemByClass("coinDozerImage", eui.Image);
                            imageMy.source = "batteryBase8";
                            imageMy.scaleX = 0.85;
                            imageMy.scaleY = 0.85;
                            imageMy.x = 0; //seat.x + x;
                            imageMy.y = seat.y > uniLib.Global.screenHeight / 2 ? 160 + y : 8 - y;
                            y -= 6.8;
                            group.addChild(imageMy);
                        }, _this, m * 10);
                    }
                    var TextNew = new eui.BitmapLabel();
                    TextNew.font = "coinFont_fish_fnt";
                    TextNew.text = "" + GX.GoldFormat(score);
                    UIUtil.traGoldLabel(TextNew);
                    group.addChild(TextNew);
                    TextNew.anchorOffsetX = TextNew.width / 2;
                    TextNew.anchorOffsetY = TextNew.height / 2;
                    TextNew.scaleX = 0.3;
                    TextNew.scaleY = 0.3;
                    TextNew.x = 12.75; //group.width / 2;
                    TextNew.y = seat.y > uniLib.Global.screenHeight / 2 ? 160 + -10 + (-6.8 * ((odds > 20 ? 20 : odds) - 1)) : 16 - (-6.8 * ((odds > 20 ? 20 : odds) - 1)) + 10;
                    _this.numberOfGoldCoins[battery.seatdata.seatId - 1] = 3;
                    _this.eachHeapOfGoldCoinsData[battery.seatdata.seatId - 1].removeAt(0);
                    if (_this.dataStorage[battery.seatdata.seatId - 1].length != 0) {
                        _this.dataStorage[battery.seatdata.seatId - 1].removeAt(0);
                        _this.coinDozer(null, battery);
                        // this.dataStorage[battery.seatdata.seatId - 1].removeAt(0);
                    }
                }
            });
        };
        FishingJoyLogic.prototype.removeTheGoldCoinHeap = function (seatdata) {
            this.numberOfGoldCoins[seatdata.seatId - 1] = 0;
            for (var item = 0; item < this.eachHeapOfGoldCoinsData[seatdata.seatId - 1].length; ++item) {
                manager.LayerManager.instance.removeFromLayer(this.eachHeapOfGoldCoinsData[seatdata.seatId - 1][item]);
            }
            this.eachHeapOfGoldCoinsData[seatdata.seatId - 1] = [];
            this.dataStorage[seatdata.seatId - 1] = [];
            if (this.goldCoinRemovalTime[seatdata.seatId - 1][0]) {
                game.Timer.clearTimeout(this.goldCoinRemovalTime[seatdata.seatId - 1][0]);
                this.goldCoinRemovalTime[seatdata.seatId - 1] = [];
            }
        };
        //Tween动画
        FishingJoyLogic.prototype.tweenAnimation = function (anchors, scale, image1, seat, image, bool, isMove) {
            var y = seat.y > uniLib.Global.screenHeight / 2 ? -120 : 120;
            var x = seat.x > uniLib.Global.screenWidth / 2 ? -50 : 50;
            image1.source = image;
            manager.LayerManager.instance.addToLayer(image1, 8 /* EFFECT */);
            image1.anchorOffsetX = anchors;
            image1.anchorOffsetY = anchors;
            image1.scaleX = scale;
            image1.scaleY = scale;
            image1.x = seat.x + x;
            image1.y = seat.y + y;
            if (isMove) {
                egret.Tween.get(image1).to({ rotation: bool ? 360 : -360 }, 2000);
            }
            return image1;
        };
        FishingJoyLogic.prototype.createMedalResources = function (id) {
            var image1 = new CustomImage();
            var image2 = new CustomImage();
            var image3 = new CustomImage();
            var aNetImage = new CustomImage();
            var mov = UIUtil.creatMovieClip("deng");
            var mov1 = UIUtil.creatMovieClip("Medal1_jewel");
            var mov2 = UIUtil.creatMovieClip("Medal2_jewel");
            var mov3 = UIUtil.creatMovieClip("Medal3_jewel");
            var textMy = new eui.BitmapLabel();
            this.medalStorage[id].push(image1, image2, image3, aNetImage, textMy, [mov, mov1, mov2, mov3]);
        };
        FishingJoyLogic.prototype.medal = function (rev) {
            /*uid:number,odds: number,skill?:number*/
            var score = 0;
            var odds = 0;
            var skill = 0;
            for (var i = 0; i < rev.list.length; i++) {
                var fish = this.inViewFishes.get(rev.list[i].id);
                if (fish && fish.isAlive) {
                    score = score + rev.list[i].score;
                    odds = odds + fish.odds;
                    if (fish.skillID && fish.skillID == 1) {
                        skill = fish.skillID;
                    }
                }
            }
            if (rev.uid == uniLib.NetMgr.UID && score > FishingJoy.DataCenter.instance.noticeTriggers) {
                var cmd = new Cmd.ClientSettleFinishCmd_C();
                game.PokerFunction.tcpSend(cmd);
            }
            var levelData = FishingJoy.DataCenter.instance.getRuleConfigList();
            var level;
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
            var battery = this.allBattery.get(rev.uid);
            if (battery == null || battery.seatdata == null)
                return;
            var seatId = battery.seatdata.seatId;
            var clientNo = game.GameConstant.GetClientNoBySeatId(seatId);
            this.scavengingMedals(seatId - 1);
            var seat = game.GameConstant.SeatPositonList[clientNo - 1];
            var y = seat.y > uniLib.Global.screenHeight / 2 ? -120 : 120;
            var x = seat.x > uniLib.Global.screenWidth / 2 ? -50 : 50;
            var image1;
            var image2;
            var image3;
            var mov;
            var textMy;
            var aNetImage;
            var zoom = 250 / 284 * 0.9;
            game.SoundHand.Instance.playMedalAppearance();
            if (GX.GameLayerManager.sceneLayer.parent.x != 0 || GX.GameLayerManager.sceneLayer.parent.y != 0) {
                GX.GameLayerManager.sceneLayer.parent.x = 0;
                GX.GameLayerManager.sceneLayer.parent.y = 0;
            }
            //ShakeTool.Instance.shakeObj(GX.GameLayerManager.sceneLayer.parent, 1, 10, 10);
            var medalStorage = this.medalStorage[seatId - 1];
            if (medalStorage.length == 0) {
                this.createMedalResources(seatId - 1);
            }
            if (skill) {
                image1 = this.tweenAnimation(142, zoom, medalStorage[0], seat, "down", true, true);
                image2 = this.tweenAnimation(106, zoom, medalStorage[1], seat, "middle", false, true);
                image3 = this.tweenAnimation(125.5, zoom, medalStorage[2], seat, "up", true, true);
                mov = medalStorage[5][0]; //UIUtil.creatMovieClip("deng");
                mov.touchEnabled = false;
                mov.y = seat.y + y;
                mov.x = seat.x + x;
                mov.scaleX = zoom;
                mov.scaleY = zoom;
                mov.gotoAndPlay(1, 1);
                manager.LayerManager.instance.addToLayer(mov, 8 /* EFFECT */);
                aNetImage = medalStorage[3]; //new eui.Image();
                aNetImage.source = "catchAllInOneDraft";
                manager.LayerManager.instance.addToLayer(aNetImage, 8 /* EFFECT */);
                aNetImage.anchorOffsetX = aNetImage.width / 2;
                aNetImage.anchorOffsetY = aNetImage.height / 2;
                aNetImage.x = seat.x + x;
                aNetImage.y = seat.y + y - 30;
                aNetImage.scaleX = seat.y > uniLib.Global.screenHeight / 2 ? 1 : -1;
                aNetImage.scaleY = seat.y > uniLib.Global.screenHeight / 2 ? 1 : -1;
                // aNetImage.rotation =  seat.y > uniLib.Global.screenHeight / 2 ? 0 : 180;
            }
            else {
                var anchors1 = level == 1 ? 97 : level == 2 ? 101 : 101;
                var anchors2 = level == 1 ? 118 : level == 2 ? 125 : 137.5;
                image1 = this.tweenAnimation(anchors1, 0.9, medalStorage[0], seat, "Medal_ middle" + level, true);
                image2 = this.tweenAnimation(anchors2, 0.9, medalStorage[1], seat, "Medal_BG" + level, true, true);
                mov = medalStorage[5][level]; //UIUtil.creatMovieClip("Medal" + level + "_jewel")
                mov.scaleX = 0.9;
                mov.scaleY = 0.9;
                mov.touchEnabled = false;
                mov.y = seat.y + y;
                mov.x = seat.x + x;
                mov.gotoAndPlay(1, 2);
                manager.LayerManager.instance.addToLayer(mov, 8 /* EFFECT */);
            }
            textMy = medalStorage[4]; //new eui.BitmapLabel()
            textMy.font = "multipleFnt_fnt";
            textMy.text = odds;
            console.log("????" + odds);
            manager.LayerManager.instance.addToLayer(textMy, 8 /* EFFECT */);
            textMy.x = seat.x + x;
            textMy.y = aNetImage ? seat.y + y + 30 : seat.y + y;
            textMy.anchorOffsetX = textMy.width / 2;
            textMy.anchorOffsetY = textMy.height / 2;
            textMy.scaleX = seat.y > uniLib.Global.screenHeight / 2 ? 1.1 : -1.1; //skill == 1 ? zoom : 0.9;
            textMy.scaleY = seat.y > uniLib.Global.screenHeight / 2 ? 1.1 : -1.1; //0.9;
            // textMy.rotation =  seat.y > uniLib.Global.screenHeight / 2 ? 0 : 180;
            this.labelJitter(textMy, true);
            if (aNetImage) {
                this.labelJitter(aNetImage, true);
            }
            var complete = function () {
                mov.removeEventListener(egret.Event.COMPLETE, complete, null);
                for (var _i = 0, _a = FishingJoy.FishingJoyLogic.instance.medalStorage[seatId - 1]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    egret.Tween.removeTweens(item);
                    manager.LayerManager.instance.removeFromLayer(item);
                }
                for (var _b = 0, _c = FishingJoy.FishingJoyLogic.instance.medalStorage[seatId - 1][5]; _b < _c.length; _b++) {
                    var item = _c[_b];
                    egret.Tween.removeTweens(item);
                    manager.LayerManager.instance.removeFromLayer(item);
                }
            };
            mov.addEventListener(egret.MovieClipEvent.COMPLETE, complete, null);
        };
        FishingJoyLogic.prototype.scavengingMedals = function (id) {
            if (this.medalStorage[id].length == 0) {
                return;
            }
            else {
                for (var _i = 0, _a = FishingJoy.FishingJoyLogic.instance.medalStorage[id]; _i < _a.length; _i++) {
                    var item = _a[_i];
                    egret.Tween.removeTweens(item);
                    manager.LayerManager.instance.removeFromLayer(item);
                }
                for (var _b = 0, _c = FishingJoy.FishingJoyLogic.instance.medalStorage[id][5]; _b < _c.length; _b++) {
                    var item = _c[_b];
                    egret.Tween.removeTweens(item);
                    manager.LayerManager.instance.removeFromLayer(item);
                }
            }
        };
        FishingJoyLogic.prototype.labelJitter = function (textMy, bool) {
            var _this = this;
            if (!textMy) {
                return;
            }
            egret.Tween.get(textMy).to({ rotation: bool ? 13 : -13 }, 500, egret.Ease.backOut).call(function () {
                _this.labelJitter(textMy, !bool);
            });
        };
        /**
         * 免费游戏出场离场提示
         */
        FishingJoyLogic.prototype.onFreeGame = function (imageID, boolMy) {
            var _this = this;
            game.SoundHand.Instance.playAlert();
            if (!boolMy) {
                if (this.winAnim0 != null) {
                    egret.Tween.removeTweens(this.winAnim0);
                    egret.Tween.removeTweens(this.outOfTheField);
                    manager.LayerManager.instance.removeFromLayer(this.winAnim0);
                    this.winAnim0 == null;
                }
                this.winAnim0 = UIUtil.creatMovieClip("appearanceOfLight");
                this.winAnim0.blendMode = egret.BlendMode.ADD;
                this.winAnim0.y = uniLib.Global.screenHeight / 2;
                this.winAnim0.x = uniLib.Global.screenWidth / 2;
                this.winAnim0.scaleX = 4 * uniLib.Global.screenWidth / 1280;
                this.winAnim0.scaleY = 4 * uniLib.Global.screenHeight / 720;
                ;
                manager.LayerManager.instance.addToLayer(this.winAnim0, 8 /* EFFECT */);
                this.winAnim0.frameRate = 10;
                this.winAnim0.gotoAndPlay(1, 4);
                this.winAnim0.addEventListener(egret.Event.COMPLETE, this.animationConcealment, this);
            }
            if (!this.outOfTheField) {
                this.outOfTheField = new eui.Image();
                this.outOfTheField.visible = false;
            }
            manager.LayerManager.instance.addToLayer(this.outOfTheField, 8 /* EFFECT */);
            this.outOfTheField.source = "freeOutOfTheField" + imageID;
            this.outOfTheField.alpha = 1;
            this.outOfTheField.anchorOffsetX = this.outOfTheField.width / 2;
            this.outOfTheField.anchorOffsetY = this.outOfTheField.height / 2;
            this.outOfTheField.visible = true;
            this.outOfTheField.scaleX = 0.8;
            this.outOfTheField.scaleY = 0.8;
            this.outOfTheField.x = 0 - this.outOfTheField.width / 2;
            this.outOfTheField.y = uniLib.Global.screenHeight / 2;
            egret.Tween.get(this.outOfTheField).to({ x: uniLib.Global.screenWidth / 2 }, 500, egret.Ease.backOut).call(function () {
                if (boolMy) {
                    _this.animationConcealment(1);
                }
            });
        };
        FishingJoyLogic.prototype.freePromptCloses = function () {
            if (this.outOfTheField) {
                this.outOfTheField.visible = false;
                this.outOfTheField.x = 0 - this.outOfTheField.width / 2;
            }
        };
        FishingJoyLogic.prototype.animationConcealment = function (boolMy) {
            var _this = this;
            if (boolMy != 1) {
                egret.Tween.get(this.winAnim0).to({ alpha: 0 }, 1000).call(function () {
                    if (_this.winAnim0 != null) {
                        manager.LayerManager.instance.removeFromLayer(_this.winAnim0);
                        _this.winAnim0 == null;
                    }
                });
                egret.Tween.get(this.outOfTheField).to({ alpha: 0.5, scaleX: 1.5, scaleY: 1.5 }, 300).call(function () {
                    egret.Tween.get(_this.outOfTheField).to({ alpha: 0, scaleX: 0.5, scaleY: 0.5 }, 700).call(function () {
                        _this.outOfTheField.visible = false;
                        _this.outOfTheField.x = 0 - _this.outOfTheField.width / 2;
                        if (_this.freeType) {
                            _this.changeScene(null, _this.freeType, null, true);
                            _this.freeType = null;
                        }
                    });
                });
            }
            else {
                if (!this.outOfTheField.visible) {
                    return;
                }
                egret.Tween.get(this.outOfTheField).to({ scaleX: 1.1, scaleY: 1.1 }, 600).call(function () {
                    egret.Tween.get(_this.outOfTheField).to({ scaleX: 0.8, scaleY: 0.8 }, 700).call(function () {
                        _this.animationConcealment(1);
                    });
                });
            }
        };
        FishingJoyLogic.prototype.animationConcealments = function () {
            this.winAnim1.removeEventListener(egret.Event.COMPLETE, this.animationConcealments, this);
            var back0 = UICenter.instance.getManager(1000 /* FishMainScene */).getView(FishingJoy.FishMainSceneView);
            back0.removeChild(this.winAnim1);
            this.winAnim1 = null;
        };
        /**
         * 出鱼
         */
        FishingJoyLogic.prototype._spawnFishEvent = function (data, reconnection) {
            if (reconnection === void 0) { reconnection = false; }
            FishingJoy.DataCenter.instance.isSwitchFish = false;
            var fishlist = data.fishlist;
            var specialTime = 0;
            if (fishlist == null || !(fishlist instanceof Array)) {
                return;
            }
            for (var _i = 0, fishlist_1 = fishlist; _i < fishlist_1.length; _i++) {
                var fishs = fishlist_1[_i];
                if (fishs.spawnTime == null) {
                    console.error("服务器未下发spawnTime");
                    continue;
                }
                for (var _a = 0, _b = fishs.fishs; _a < _b.length; _a++) {
                    var item = _b[_a];
                    // item.templateId = GAMEOBJECT_SIGN.BOOM_FISH;
                    var config = gameObject.GameObjectConfigParse.configDic.get(item.templateId);
                    var tableConfig = config.table;
                    if (!tableConfig) {
                        console.assert(false, "鱼模板id为" + item.templateId + "这找不到配置");
                        continue;
                    }
                    var fishPath = table.TableFishPath.getFishPath(fishs.pathId);
                    if (fishPath == null) {
                        // console.assert(false, "找不到配置路径:" + fishs.pathId);
                        return;
                    }
                    if (tableConfig.sign == 2001 /* DRAGON */) {
                        specialTime = tableConfig.spawnTimeout;
                        if (!reconnection) {
                            this.freeType = 100029 /* HaiDiBaoZang */;
                            this.onFreeGame(1);
                        }
                        else {
                            this.changeScene(null, 100029 /* HaiDiBaoZang */, null, false);
                        }
                    }
                    else if (tableConfig.sign == 2002 /* MERMAID */) {
                        specialTime = tableConfig.spawnTimeout;
                        // this.changeScene(null, SCENEID.HaiDiGongDian, null, !reconnection);
                        if (!reconnection) {
                            this.freeType = 100030 /* HaiDiGongDian */;
                            this.onFreeGame(3);
                        }
                        else {
                            this.changeScene(null, 100030 /* HaiDiGongDian */, null, false);
                        }
                    }
                    if (item.skill == Cmd.FishSkillType.SameGroup) {
                        var offset = game.GameConstant.getSameGroupOffset();
                        item.offsetX = offset.offsetX;
                        item.offsetY = offset.offsetY;
                    }
                    var varsData = {};
                    varsData.serveID = item.id;
                    varsData.pathId = fishs.pathId.toString();
                    varsData.skillID = item.skill;
                    varsData.offsetX = item.offsetX;
                    varsData.offsetY = item.offsetY;
                    varsData.reconnection = reconnection;
                    varsData.spawnTime = fishs.spawnTime + specialTime;
                    varsData.operation = [{
                            type: 4 /* FISH */
                        }];
                    var fish = gameObject.GameObjectFactory.instance.creatGameObject(item.templateId, varsData, 2 /* Fish */);
                    fish.name = "path：" + fishs.pathId.toString();
                    if (fish.sign == 2002 /* MERMAID */ || fish.sign == 2001 /* DRAGON */) {
                        EventManager.fireEvent(18 /* AIM_SPECIAL_FISH */, [fish, true]);
                    }
                }
            }
        };
        /**
         * 碰撞检测
         */
        FishingJoyLogic.prototype._checkHit = function () {
            this.hitFishList.clear();
            var bulletMap = this.inViewBullets;
            var bulletMapLen = bulletMap.length;
            var fishMap = this.inViewFishes;
            var fishMapLen = fishMap.length;
            if (bulletMapLen == 0 || fishMapLen == 0) {
                return;
            }
            var fishGroupMap = new Dictionary();
            var bulletGroupMap = new Dictionary();
            var i = 0;
            for (; i < bulletMapLen; i++) {
                var bullet = bulletMap.values[i];
                if (bullet && bullet.isInView) {
                    var bulletColliderAry = bullet.colliderAry;
                    for (var m = 0; m < bulletColliderAry.length; m++) {
                        bulletColliderAry[m].setGlobePos();
                    }
                    FishingJoy.NineGridSplitScreenTool.setGridIndex(bullet, bulletGroupMap);
                }
            }
            for (i = 0; i < fishMapLen; i++) {
                var fish = fishMap.values[i];
                if (this._checkFishCanCollider(fish)) {
                    var fishColliderAry = fish.colliderAry;
                    for (var m = 0; m < fishColliderAry.length; m++) {
                        fishColliderAry[m].setGlobePos();
                    }
                    FishingJoy.NineGridSplitScreenTool.setGridIndex(fish, fishGroupMap);
                }
            }
            var bulletHit = [];
            for (var j = 1 /* Grid_1 */; j < 9 /* Grid_9 */ + 1; j++) {
                var fishGameObjAry = fishGroupMap.get(j);
                var bulletGameObjAry = bulletGroupMap.get(j);
                if (bulletGameObjAry) {
                    var bulletGameObjAryLen = bulletGameObjAry.length;
                    for (var f = 0; f < bulletGameObjAryLen; f++) {
                        var bullet = bulletGameObjAry[f];
                        var targetFish = bullet.targetFish;
                        if (this._checkFishCanCollider(targetFish)) {
                            if (this._chectBulletHit(bullet, targetFish, fishGroupMap)) {
                                bulletHit.push(bullet);
                            }
                        }
                        else {
                            if (fishGameObjAry) {
                                var fishGameObjAryLen = fishGameObjAry.length;
                                for (var k = 0; k < fishGameObjAryLen; k++) {
                                    var fish = fishGameObjAry[k];
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
            for (var _i = 0, bulletHit_1 = bulletHit; _i < bulletHit_1.length; _i++) {
                var item = bulletHit_1[_i];
                gameObject.GameObjectFactory.instance.recoverGameObject(item);
            }
            if (this.hitFishList.length > 0) {
                var cmd = new Cmd.HitFishCmd_CS();
                cmd.list = this.hitFishList;
                game.PokerFunction.tcpSend(cmd);
            }
        };
        /**
         * 检测鱼是否可以碰撞
         */
        FishingJoyLogic.prototype._checkFishCanCollider = function (fish) {
            if (fish && fish.isAlive && fish.isInView /*&& !fish.isCollided*/) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * 检测子弹碰撞
         */
        FishingJoyLogic.prototype._chectBulletHit = function (bullet, fish, fishGroupMap) {
            var bulletColliderAry = bullet.colliderAry;
            var fishColliderAry = fish.colliderAry;
            var fishColliderAryLen = fishColliderAry.length;
            for (var k = 0; k < bulletColliderAry.length; k++) {
                for (var f = 0; f < fishColliderAryLen; f++) {
                    if (FishingJoy.Collider.isIntersect(bulletColliderAry[k], fishColliderAry[f])) {
                        bullet.isCollided = true;
                        var bornX = bullet.x;
                        var bornY = bullet.y;
                        var bulletID = bullet.servelID;
                        var bulletPlayerID = bullet.playerID;
                        var rotation = bullet.rotation;
                        /*检测渔网与鱼的碰撞*/
                        this._checkFishingNetHit(bornX, bornY, rotation, bulletID, bulletPlayerID, fishGroupMap, fish);
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * 检测渔网碰撞
         */
        FishingJoyLogic.prototype._checkFishingNetHit = function (bornX, bornY, rotation, bulletID, playerID, fishGroupMap, collidedFish) {
            var battery = this.allBattery.get(playerID);
            if (!battery) {
                return;
            }
            var data = {};
            data.bornX = bornX;
            data.bornY = bornY;
            data.rotation = rotation;
            data.radius = battery.fishNetRadius;
            var fishingNet = null;
            if (playerID == Master.instance.uid) {
                fishingNet = gameObject.GameObjectFactory.instance.creatGameObject(30005 /* FishingNet_Self */, data, 3 /* FishingNet */);
                game.SoundHand.Instance.playOpenFishingNet();
                collidedFish.playHitEff(playerID);
            }
            else {
                fishingNet = gameObject.GameObjectFactory.instance.creatGameObject(30000 /* FishingNet_Green */, data, 3 /* FishingNet */);
            }
            var user = game.PokerFunction.GetUserInfoByUid(playerID);
            if (!user) {
                return;
            }
            if (user.isRobot || playerID == Master.instance.uid) {
                var deadlist = [];
                var deadFish = new Cmd.Fish();
                deadFish.id = collidedFish.servelID;
                deadlist.push(deadFish);
                var fishingNetCollider = fishingNet.colliderAry;
                for (var j = 0; j < fishingNetCollider.length; j++) {
                    fishingNetCollider[j].setGlobePos();
                }
                FishingJoy.NineGridSplitScreenTool.analyseGrid(fishingNet);
                var isBreak = false;
                for (var i = 0; i < fishingNet.grid.length; i++) {
                    var fishAry = fishGroupMap.get(fishingNet.grid[i]);
                    if (fishAry) {
                        var len = fishAry.length;
                        for (var m = 0; m < len; m++) {
                            var fish = fishAry[m];
                            if (fish.servelID == collidedFish.servelID) {
                                continue;
                            }
                            isBreak = false;
                            var fishColliderAry = fish.colliderAry;
                            var fishColliderAryLen = fishColliderAry.length;
                            for (var f = 0; f < fishColliderAryLen; f++) {
                                if (isBreak) {
                                    break;
                                }
                                for (var k = 0; k < fishingNetCollider.length; k++) {
                                    if (FishingJoy.Collider.isIntersect(fishingNetCollider[k], fishColliderAry[f])) {
                                        isBreak = true;
                                        fish.playHitEff(playerID);
                                        var deadFish_1 = new Cmd.Fish();
                                        deadFish_1.id = fish.servelID;
                                        deadlist.push(deadFish_1);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    this._sendMsg(deadlist, bulletID, playerID);
                }
            }
        };
        /**
         * 检测爆炸碰撞
         */
        FishingJoyLogic.prototype._checkBoomHit = function (bornX, bornY, bulletID, playerUID) {
            var data = {};
            data.bornX = bornX;
            data.bornY = bornY;
            var boom = gameObject.GameObjectFactory.instance.creatGameObject(40000 /* BURST */, data, 8 /* EFFECT */);
            var boomColliderAry = boom.colliderAry;
            for (var j = 0; j < boomColliderAry.length; j++) {
                boomColliderAry[j].setGlobePos();
            }
            var fishMap = this.inViewFishes;
            var fishMapLen = fishMap.length;
            var isBreak = false;
            var deadlist = [];
            var i;
            for (i = 0; i < fishMapLen; i++) {
                var fish = fishMap.values[i];
                if (this._checkFishCanCollider(fish)) {
                    var fishColliderAry = fish.colliderAry;
                    for (var m = 0; m < fishColliderAry.length; m++) {
                        fishColliderAry[m].setGlobePos();
                    }
                    if (fish.isCollided) {
                        continue;
                    }
                    isBreak = false;
                    for (var f = 0; f < boomColliderAry.length; f++) {
                        if (isBreak) {
                            break;
                        }
                        for (var k = 0; k < fishColliderAry.length; k++) {
                            if (FishingJoy.Collider.isIntersect(boomColliderAry[f], fishColliderAry[k])) {
                                isBreak = true;
                                fish.isCollided = true;
                                fish.playHitEff(Master.instance.uid, 2000, true);
                                var deadFish = new Cmd.Fish();
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
        };
        /**
         * 发送协议
         */
        FishingJoyLogic.prototype._sendMsg = function (deadlist, bulletID, playerID, isBurst) {
            var hitFish = new Cmd.HitFish();
            hitFish.list = deadlist;
            hitFish.bid = bulletID;
            hitFish.list = deadlist;
            hitFish.uid = playerID;
            if (isBurst) {
                hitFish.hitType = 1;
            }
            this.hitFishList.push(hitFish);
        };
        /**
         * 字典写入玩家炮台
         */
        FishingJoyLogic.prototype._addBatteryInMap = function (uid, battery) {
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
        };
        /**
         * 字典移除玩家炮台
         */
        FishingJoyLogic.prototype._removeBatteryInMap = function (uid) {
            if (!this.allBattery.remove(uid)) {
                console.assert(false, "玩家不存在！");
            }
        };
        /**
         * 释放
         */
        FishingJoyLogic.prototype.dispose = function () {
            Laya.timer.clear(this, this._checkHit);
            EventManager.unregisterEvent(3 /* REMOVE_BULLET_IN_MAP */, this, this._removeBulletInMap);
            EventManager.unregisterEvent(5 /* REMOVE_FISH_IN_MAP */, this, this._removeFishInMap);
            EventManager.unregisterEvent(4 /* ADD_BULLET_IN_MAP */, this, this._addBulletInMap);
            EventManager.unregisterEvent(6 /* ADD_FISH_IN_MAP */, this, this._addFishInMap);
            EventManager.unregisterEvent(7 /* ADD_BATTERY_IN_MAP */, this, this._addBatteryInMap);
            EventManager.unregisterEvent(8 /* REMOVE_BATTERY_IN_MAP */, this, this._removeBatteryInMap);
            EventManager.unregisterEvent(16 /* DRA_EFF_COMPLETE */, this, this._draEffComplete);
            EventManager.unregisterEvent(15 /* MER_EFF_COMPLETE */, this, this._merEffComplete);
            game.Action.spawnFishEvent.remove(this._spawnFishEvent, this);
            this.destroyBattery();
            this.destroyFishes();
            this.inViewFishes.clear();
            this.allBattery.clear();
            this.masterBattery = null;
        };
        /**
         * 销毁玩家
         */
        FishingJoyLogic.prototype.destroyBattery = function () {
            var map = this.allBattery.copy();
            var len = map.length;
            for (var i = 0; i < len; i++) {
                var battery = map.getByKeyIndex(i);
                gameObject.GameObjectFactory.instance.recoverGameObject(battery);
            }
            map.recover();
        };
        /**
         * 销毁鱼
         */
        FishingJoyLogic.prototype.destroyFishes = function () {
            var map = this.inViewFishes.copy();
            var len = map.length;
            for (var i = 0; i < len; i++) {
                var fish = map.values[i];
                gameObject.GameObjectFactory.instance.recoverGameObject(fish);
            }
        };
        /**
         * 销毁子弹
         */
        FishingJoyLogic.prototype.destroyBullets = function () {
            var map = this.inViewBullets.copy();
            var len = map.length;
            for (var i = 0; i < len; i++) {
                var bullet = map.values[i];
                gameObject.GameObjectFactory.instance.recoverGameObject(bullet);
            }
        };
        /**
         * 找到场上最值钱的鱼
         */
        FishingJoyLogic.prototype.findMostValuableFish = function () {
            var selectFishes = [];
            for (var i = 0; i < this.allBattery.length; i++) {
                var battery = this.allBattery.getByKeyIndex(i);
                if (battery && battery.user.uid != Master.instance.uid) {
                    if (battery.targetFishId != -1) {
                        var fish_1 = this.inViewFishes.get(battery.targetFishId);
                        if (this._checkFishCanCollider(fish_1)) {
                            selectFishes.push(fish_1);
                        }
                    }
                }
            }
            var fishMap = this.inViewFishes;
            var mostValuableFish = null;
            var fish;
            var index = 0;
            var isBreak = false;
            var _a = [-1, -1], x = _a[0], y = _a[1];
            for (var i = fishMap.length - 1; i >= 0; i--) {
                if (isBreak) {
                    break;
                }
                fish = fishMap.values[i];
                if (this._checkFishCanCollider(fish)) {
                    if (fish.isAccurateCollider) {
                        for (var j = 0; j < fish.colliderAry.length; j++) {
                            var collider = fish.colliderAry[j];
                            _b = UIUtil.localToGlobal(collider), x = _b[0], y = _b[1];
                            if (UIUtil.inAimView(x, y)) {
                                if (fish.sign == 2001 /* DRAGON */ || fish.sign == 2002 /* MERMAID */) {
                                    return fish;
                                }
                                else {
                                    if (selectFishes.indexOf(fish) == -1) {
                                        mostValuableFish = fish;
                                        index = i;
                                        isBreak = true;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        _c = UIUtil.localToGlobal(fish), x = _c[0], y = _c[1];
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
                for (var k = index - 1; k >= 0; k--) {
                    fish = fishMap.values[k];
                    if (this._checkFishCanCollider(fish)) {
                        if (fish.isAccurateCollider) {
                            for (var j = 0; j < fish.colliderAry.length; j++) {
                                var collider = fish.colliderAry[j];
                                _d = UIUtil.localToGlobal(collider), x = _d[0], y = _d[1];
                                if (UIUtil.inAimView(x, y)) {
                                    if (fish.sign == 2001 /* DRAGON */ || fish.sign == 2002 /* MERMAID */) {
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
                            _e = UIUtil.localToGlobal(fish), x = _e[0], y = _e[1];
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
            var _b, _c, _d, _e;
        };
        /**
         * 单例
         */
        FishingJoyLogic._instance = null;
        return FishingJoyLogic;
    }());
    FishingJoy.FishingJoyLogic = FishingJoyLogic;
    __reflect(FishingJoyLogic.prototype, "FishingJoy.FishingJoyLogic");
})(FishingJoy || (FishingJoy = {}));
//# sourceMappingURL=FishingJoyLogic.js.map