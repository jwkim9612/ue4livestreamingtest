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
exports.FRecv_PlayLiveStreaming = exports.FRecv_DestroyOtherPlayer = exports.FRecv_MoveOtherPlayer = exports.FRecv_SetMyId = exports.FRecv_SpawnOtherPlayer = exports.FRecvPakcet = void 0;
var FRecvPakcet = /** @class */ (function () {
    function FRecvPakcet() {
        this.packetName = this.constructor.name;
    }
    return FRecvPakcet;
}());
exports.FRecvPakcet = FRecvPakcet;
var FRecv_SpawnOtherPlayer = /** @class */ (function (_super) {
    __extends(FRecv_SpawnOtherPlayer, _super);
    function FRecv_SpawnOtherPlayer(id, location, direction) {
        var _this = _super.call(this) || this;
        _this.target_id = id;
        _this.location = location;
        _this.direction = direction;
        return _this;
    }
    return FRecv_SpawnOtherPlayer;
}(FRecvPakcet));
exports.FRecv_SpawnOtherPlayer = FRecv_SpawnOtherPlayer;
var FRecv_SetMyId = /** @class */ (function (_super) {
    __extends(FRecv_SetMyId, _super);
    function FRecv_SetMyId(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    return FRecv_SetMyId;
}(FRecvPakcet));
exports.FRecv_SetMyId = FRecv_SetMyId;
var FRecv_MoveOtherPlayer = /** @class */ (function (_super) {
    __extends(FRecv_MoveOtherPlayer, _super);
    function FRecv_MoveOtherPlayer(id, location, direction) {
        var _this = _super.call(this) || this;
        _this.target_id = id;
        _this.location = location;
        _this.direction = direction;
        return _this;
    }
    return FRecv_MoveOtherPlayer;
}(FRecvPakcet));
exports.FRecv_MoveOtherPlayer = FRecv_MoveOtherPlayer;
var FRecv_DestroyOtherPlayer = /** @class */ (function (_super) {
    __extends(FRecv_DestroyOtherPlayer, _super);
    function FRecv_DestroyOtherPlayer(id) {
        var _this = _super.call(this) || this;
        _this.target_id = id;
        return _this;
    }
    return FRecv_DestroyOtherPlayer;
}(FRecvPakcet));
exports.FRecv_DestroyOtherPlayer = FRecv_DestroyOtherPlayer;
var FRecv_PlayLiveStreaming = /** @class */ (function (_super) {
    __extends(FRecv_PlayLiveStreaming, _super);
    function FRecv_PlayLiveStreaming(url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        return _this;
    }
    return FRecv_PlayLiveStreaming;
}(FRecvPakcet));
exports.FRecv_PlayLiveStreaming = FRecv_PlayLiveStreaming;
