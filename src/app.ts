import net from 'net';
import { CasparCG } from 'casparcg-connection';

export class App {
    ccgConnection: CasparCG;
    vizEngine: any;

    constructor() {
        const VIZ_SERVER_PORT: number = 6100;
        const CCG_IP: string = "127.0.0.1"
        const CCG_PORT: number = 5250;
        let vizMessage: Array<string>;

        this.ccgConnection = new CasparCG(
            {
                host: CCG_IP,
                port: CCG_PORT,
                autoConnect: true,
            }
        );

        this.vizEngine = net.createServer((socket) => {
            const _this2 = this
            console.log("connected");

            socket.on("data", function(data) {
                vizMessage = data.toString().split("*");
                if (vizMessage[0] === "SCENE") {
                    socket.write('SCENE loading' + '\0');
                    // Load scene in CasparCG
                    _this2.ccgConnection.play(
                        1, // output,
                        20, // layer,
                        vizMessage[2], //Mediafile
                    );
                } else {
                    console.log("Command not implemented :", vizMessage[0]);
                    console.log('++++++++++++++++++++++++++++');
                    socket.write('Unknow command--' + '\0');
                }
            });

            socket.on("error", function(error) {

                console.log("error - " + error);
            });

            socket.on("close", function(data) {

                console.log("closed");
                socket.removeAllListeners();
            });

        }).listen(VIZ_SERVER_PORT, function() {
            console.log("Engine listening : " + VIZ_SERVER_PORT);
        });
    }

}
