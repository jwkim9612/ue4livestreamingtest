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
var net = __importStar(require("net"));
var ObjectManager_1 = require("./ObjectManager");
var server = net.createServer(function (socket) {
    //socket.setEncoding('utf-8');
    var a = 0;
    // client로부터 오는 data
    socket.on('data', function (data) {
        console.log(data.length);
        a += data.length;
        console.log("data!! " + a);
        console.log("socket elnfth = " + socket.bufferSize);
        //let stringData = data.toString();
        //console.log("string : " + stringData);
        //let splitedData =  stringData.split(';');
        //console.log("splited : " + splitedData);
        // if (splitedData.length > 1)
        // {
        //     splitedData.forEach(e =>{
        //         if (e.length > 0)
        //         {
        //             const jsonData = JSON.parse(e.toString());
        //             ObjectManager.getInstance.recv_PacketData(socket, jsonData);
        //         }
        //     });
        // }   
    });
    socket.on('end', function () {
        ObjectManager_1.ObjectManager.getInstance.onEndPlayer(socket);
        console.log('end');
    });
    socket.on('error', function (err) {
        console.log('Socket Error: ', JSON.stringify(err));
    });
    socket.on('timeout', function () {
        console.log('Socket Timed out');
    });
    socket.on('drain', function () {
        console.log('drain');
    });
});
server.on('error', function (err) {
});
server.listen({
    port: 4001, family: 'IPv4', address: '127.0.0.1'
}, function () {
    console.log('opened server on', server.address());
});
