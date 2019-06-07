import net from 'net';
import { CasparCG } from 'casparcg-connection';

export class App {
    ccgConnection: CasparCG;
    vizEngine: any;
    vizMessage: Array<string> = [];
    VIZ_SERVER_PORT: number = 6100;
    CCG_IP: string = "127.0.0.1"
    CCG_PORT: number = 5250;

    constructor() {
        this.ccgConnection = new CasparCG(
            {
                host: this.CCG_IP,
                port: this.CCG_PORT,
                autoConnect: true,
            }
        );
    }
    runVizServer() {
        this.vizEngine = net.createServer((socket) => {
            console.log("connected");

            socket.on("data",
                ((data) => {
                    this.vizMessage = data.toString().split("*");
                    if (this.vizMessage[0] === "SCENE") {
                        socket.write('SCENE loading' + '\0');
                        // Load scene in CasparCG
                        this.ccgConnection.play(
                            1, // output,
                            20, // layer,
                            this.vizMessage[2], //Mediafile
                        );
                    } else {
                        console.log("Command not implemented :", this.vizMessage[0]);
                        console.log('++++++++++++++++++++++++++++');
                        socket.write('Unknow command--' + '\0');
                    }
                })
            );

            socket.on("error", (
                (error) => {
                    console.log("error - " + error);
                })
            );

            socket.on("close",
                ((data) => {

                    console.log("closed");
                    socket.removeAllListeners();
                })
            );

        }).listen(this.VIZ_SERVER_PORT,
            (() => {
                console.log("Engine listening : " + this.VIZ_SERVER_PORT);
            })
        );
    };

}
