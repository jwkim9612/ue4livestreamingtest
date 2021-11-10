import { SVec3 } from "./Math";

export class FRecvPakcet {
    packetName : string;

    constructor() {
        this.packetName = this.constructor.name;   
    }
}

export class FRecv_SpawnOtherPlayer extends FRecvPakcet{
    target_id : string;
    location : SVec3;
    direction : SVec3;
    constructor(id: string, location: SVec3, direction: SVec3) {
        super();
        this.target_id = id;
        this.location = location;
        this.direction = direction;
    }
}

export class FRecv_SetMyId extends FRecvPakcet{
    id : string;
    constructor(id: string) {
        super();
        this.id = id;
    }
}

export class FRecv_MoveOtherPlayer extends FRecvPakcet{
    target_id : string;
    location : SVec3;
    direction : SVec3;
    constructor(id: string, location: SVec3, direction: SVec3) {
        super();
        this.target_id = id;
        this.location = location;
        this.direction = direction;
    }
}

export class FRecv_DestroyOtherPlayer extends FRecvPakcet{
    target_id : string;
    constructor(id: string) {
        super();
        this.target_id = id;
    }
}

export class FRecv_PlayLiveStreaming extends FRecvPakcet{
    url : string;
    constructor(url: string) {
        super();
        this.url = url;
    }
}
