"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectManager = void 0;
var Packets = __importStar(require("./Packets"));
var Object_1 = require("./Object");
var globalValues_1 = require("./globalValues");
var ObjectManager = /** @class */ (function () {
    function ObjectManager() {
        this.players = new Map();
        this.playerIdCount = 0;
        this.streamingUrl = "";
    }
    Object.defineProperty(ObjectManager, "getInstance", {
        get: function () {
            if (!ObjectManager.instance) {
                ObjectManager.instance = new ObjectManager();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    ObjectManager.prototype.onEndPlayer = function (socket) {
        this.players.delete(socket.id);
        this.players.forEach(function (player) {
            player.send(new Packets.FRecv_DestroyOtherPlayer(socket.id));
        });
    };
    ObjectManager.prototype.recv_PacketData = function (socket, jsonData) {
        //console.log(jsonData);
        // 유저가 스폰되었을 때
        if (jsonData.packetName === "FSend_ReqSpawnPlayer") {
            // 아이디 설정
            var playerIdStr_1 = this.playerIdCount.toString();
            socket.id = playerIdStr_1;
            ++this.playerIdCount;
            var newPlayer_1 = new Object_1.Player(socket, playerIdStr_1);
            // 본인 아이디 설정, 스트리밍 시작
            newPlayer_1.send(new Packets.FRecv_SetMyId(playerIdStr_1));
            newPlayer_1.send(new Packets.FRecv_PlayLiveStreaming(this.streamingUrl));
            console.log(this.streamingUrl);
            // 본인을 제외한 플레이어에게 본인 소환
            this.players.forEach(function (player) {
                player.send(new Packets.FRecv_SpawnOtherPlayer(playerIdStr_1, globalValues_1.defaultSpawnLocation, globalValues_1.defaultSpawnDirection));
            });
            // 기존에 들어와있던 유저 소환
            this.players.forEach(function (player) {
                newPlayer_1.send(new Packets.FRecv_SpawnOtherPlayer(player.id, player.location, player.direction));
            });
            this.players.set(playerIdStr_1, newPlayer_1);
        }
        // 
        // 캐릭터가 움직였을 때
        if (jsonData.packetName === "FSend_MoveMyPlayer") {
            var targetPlayer = this.players.get(jsonData.target_id);
            if (targetPlayer) {
                targetPlayer.location = jsonData.location;
                targetPlayer.direction = jsonData.direction;
                this.players.forEach(function (player) {
                    if (player.id !== jsonData.target_id) {
                        player.send(new Packets.FRecv_MoveOtherPlayer(jsonData.target_id, jsonData.location, jsonData.direction));
                    }
                });
            }
        }
        // 스트리밍 시작을 눌렀을 때
        if (jsonData.packetName === "FSend_RequestPlayLiveStreaming") {
            this.streamingUrl = jsonData.playUrl;
            console.log(this.streamingUrl);
            console.log(jsonData);
            this.players.forEach(function (player) {
                player.send(new Packets.FRecv_PlayLiveStreaming(jsonData.playUrl));
            });
        }
    };
    return ObjectManager;
}());
exports.ObjectManager = ObjectManager;
