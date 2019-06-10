import net from 'net';
import { CasparCG } from 'casparcg-connection';
import { translateCommand } from './translateCommand';
import { ITranslationItem } from './translationProtocols';

export class App {
    ccgConnection: CasparCG;
    vizEngine: any;
    vizMessages: Array<string> = [];
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
        this.runVizServer();
    }

    runVizServer() {
        this.vizEngine = net.createServer((socket) => {
            console.log("connected");

            socket.on("data",
                ((data) => {
                    console.log("Recieved command tcp-string :", data.toString());
                    this.vizMessages = data.toString().split("\0");

                    this.vizMessages.map((item) => {
                        let translated: ITranslationItem = translateCommand(item);
                        let messageNumber: string = item.substring(0, item.indexOf(" "));
                        if (translated.vizCommand != "") {
                            console.log("Message : ", item, " Argument :", translated.ccgArgument);

                            if (translated.vizResponseCommand != "") {
                                console.log("Viz return message : ", messageNumber + " " + translated.vizResponseCommand);
                                socket.write(messageNumber + " " + translated.vizResponseCommand + '\0')
                            }
                            if (translated.ccgCommandType === 'cgAdd') {
                                console.log("CasparCG load template :", translated.ccgArgument);
                                // Load scene in CasparCG
                                this.ccgConnection.cgAdd(
                                    1, // output,
                                    20, // layer,
                                    1, //Flashlayer
                                    translated.ccgArgument, //template file
                                    false
                                );
                            } else if (translated.ccgCommandType === 'cgPlay') {
                                console.log("CasparCG play template :", translated.ccgArgument);
                                // Load scene in CasparCG
                                this.ccgConnection.cgPlay(
                                    1, // output,
                                    20, // layer,
                                    1, //Flashlayer
                                );
                            }
                        } else {
                            if (item != "") {
                                console.log("Unknown message : ", item);
                            }
                        }
                    })
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
