import * as net from "net";
import * as Packets from "./Packets";
import { Player } from "./Object";
import { defaultSpawnDirection, defaultSpawnLocation } from "./globalValues";


export class ObjectManager {
    
    private static instance: ObjectManager;
    
    static get getInstance() {
        if (!ObjectManager.instance) {
            ObjectManager.instance = new ObjectManager();
        }
        return this.instance;
    }

    players: Map<string, Player>;
    playerIdCount: number;
    streamingUrl: string;

    constructor() {
        this.players = new Map<string, Player>();
        this.playerIdCount = 0;
        this.streamingUrl = "";
    }

    onEndPlayer(socket: net.Socket) {
        this.players.delete(socket.id);
        this.players.forEach((player) =>{
            player.send(new Packets.FRecv_DestroyOtherPlayer(socket.id));
        })
    }

    recv_PacketData(socket: net.Socket , jsonData: any) {
        //console.log(jsonData);

        // 유저가 스폰되었을 때
        if (jsonData.packetName === "FSend_ReqSpawnPlayer") {
            // 아이디 설정
            const playerIdStr = this.playerIdCount.toString();
            socket.id = playerIdStr;
            ++this.playerIdCount;

            const newPlayer = new Player(socket, playerIdStr);

            // 본인 아이디 설정, 스트리밍 시작
            newPlayer.send(new Packets.FRecv_SetMyId(playerIdStr));
            newPlayer.send(new Packets.FRecv_PlayLiveStreaming(this.streamingUrl));
            console.log(this.streamingUrl);

            // 본인을 제외한 플레이어에게 본인 소환
            this.players.forEach((player) => {
                player.send(new Packets.FRecv_SpawnOtherPlayer(playerIdStr, defaultSpawnLocation, defaultSpawnDirection));
            });
           
            // 기존에 들어와있던 유저 소환
            this.players.forEach((player) => {
                newPlayer.send(new Packets.FRecv_SpawnOtherPlayer(player.id, player.location, player.direction));
            })

            this.players.set(playerIdStr, newPlayer);
        }

        // 

        // 캐릭터가 움직였을 때
        if(jsonData.packetName === "FSend_MoveMyPlayer") {
            let targetPlayer = this.players.get(jsonData.target_id);
            if(targetPlayer) {
                targetPlayer.location = jsonData.location;
                targetPlayer.direction = jsonData.direction;
                this.players.forEach((player) => {
                    if(player.id !== jsonData.target_id) {
                        player.send(new Packets.FRecv_MoveOtherPlayer(jsonData.target_id, jsonData.location, jsonData.direction));
                    }
                })
            }
        }

        // 스트리밍 시작을 눌렀을 때
        if(jsonData.packetName === "FSend_RequestPlayLiveStreaming") {
            this.streamingUrl = jsonData.playUrl;
            console.log(this.streamingUrl);
            console.log(jsonData);
            this.players.forEach((player) => {
                player.send(new Packets.FRecv_PlayLiveStreaming(jsonData.playUrl));
            });
        }

    }
}