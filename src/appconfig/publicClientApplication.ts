import * as net from 'net';
import * as rpc from 'vscode-jsonrpc';

import { ClientApplicationBase, IClientApplicationBase } from "./clientApplicationBase";

export interface IPublicClientApplication extends IClientApplicationBase {
    AcquireTokenWithDeviceCode(): void;
}

export class PublicClientApplication extends ClientApplicationBase implements IPublicClientApplication {
    public async AcquireTokenWithDeviceCode(): Promise<number> {

        const HOST = 'host.docker.internal';
        const PORT = 6000;
        const ENCODING = 'utf-8';

        var addResult: number = 0;

        const socket: net.Socket = net.createConnection(PORT, HOST);
        try {
            const connection = rpc.createMessageConnection(
                new rpc.SocketMessageReader(socket, ENCODING),
                new rpc.SocketMessageWriter(socket, ENCODING));
            try {
                connection.listen();

                const type = new rpc.RequestType2<number, number, number, void, void>('AddAsync');

                console.log('sending a request');
                await connection.sendRequest(type, 5, 17).then((result) => {
                    console.log('received a result!');
                    console.log(result);
                    addResult = result;
                });
            } finally {
                connection.dispose();
            }
        } finally {
            socket.destroy();
        }

        return addResult;
    }
}
