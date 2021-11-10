"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SVec3 = void 0;
var ts_vector_math_1 = require("ts-vector-math");
//
var SVec3 = /** @class */ (function (_super) {
    __extends(SVec3, _super);
    function SVec3(values) {
        return _super.call(this, values) || this;
    }
    SVec3.prototype.toJSON = function () {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    };
    return SVec3;
}(ts_vector_math_1.Vector3));
exports.SVec3 = SVec3;
