import * as net from "net";
import { Player } from "./Object";
import { ObjectManager } from "./ObjectManager";


// Socket에 이름 달아주기
declare module "net" {
    interface Socket {
        id: string;
    }
}

const server = net.createServer((socket : net.Socket) => {
    //socket.setEncoding('utf-8');
    let a = 0;
    // client로부터 오는 data
    socket.on('data', (data: Buffer) => {   
        console.log("data!! " + a);
        ++a;
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

    socket.on('end', () => {
        ObjectManager.getInstance.onEndPlayer(socket);
        console.log('end');
    });

    socket.on('error', function(err) {
        console.log('Socket Error: ', JSON.stringify(err));
    });

    socket.on('timeout', function() {
        console.log('Socket Timed out');
    });
});


server.on('error', (err: any) => {
});

server.listen({
    port: 4001, family: 'IPv4', address: '127.0.0.1'
}, () => {
    console.log('opened server on', server.address());
});
