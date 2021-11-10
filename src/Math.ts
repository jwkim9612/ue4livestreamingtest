import { Vector3 } from "ts-vector-math";

//
export class SVec3 extends Vector3 {

    constructor(values?: number[]) {
        super(values);
    }

    toJSON(){
        return {
            x : this.x,
            y : this.y,
            z : this.z
        }
    }
}