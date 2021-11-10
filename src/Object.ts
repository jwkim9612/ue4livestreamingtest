import { SVec3 } from "./Math";
import { FRecvPakcet } from "./Packets";
import * as net from "net";

export interface IObject
{
}

export interface IActor extends IObject
{
    Tick(deltaSeconds: number) : void;
}

export class Actor implements IActor
{
    location : SVec3;
    direction : SVec3;
    scale : SVec3;
    speed: number;
    
    Tick(deltaSeconds: number){}

    constructor()
    {
        this.location = new SVec3();
        this.direction = new SVec3();
        this.scale = new SVec3();
        this.speed = 0; 
    }
}

export class Player extends Actor {
    socket : net.Socket;
    id: string;
    buffers: Array<Buffer>;
    isStackBuffer : boolean;

    constructor(_socket: net.Socket, _id: string) {
        super();
        this.socket = _socket;
        this.id = _id;
        this.buffers = Array<Buffer>();
        this.isStackBuffer = false;
    }

    send(data: FRecvPakcet)
    {
        this.socket.write(JSON.stringify(data) + ";");
    }
}
