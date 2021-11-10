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
exports.Player = exports.Actor = void 0;
var Math_1 = require("./Math");
var Actor = /** @class */ (function () {
    function Actor() {
        this.location = new Math_1.SVec3();
        this.direction = new Math_1.SVec3();
        this.scale = new Math_1.SVec3();
        this.speed = 0;
    }
    Actor.prototype.Tick = function (deltaSeconds) { };
    return Actor;
}());
exports.Actor = Actor;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(_socket, _id) {
        var _this = _super.call(this) || this;
        _this.socket = _socket;
        _this.id = _id;
        _this.buffers = Array();
        _this.isStackBuffer = false;
        return _this;
    }
    Player.prototype.send = function (data) {
        this.socket.write(JSON.stringify(data) + ";");
    };
    return Player;
}(Actor));
exports.Player = Player;
