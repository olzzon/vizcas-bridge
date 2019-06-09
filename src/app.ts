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


            /* Initial initialization from VizTrio:
                1 PLAY INIT
                2 PLAY*SCENE*ANIM*ACTIVE SET ON
                3 PLAY*SCENE*ANIM*TIME SET 0
                4 MAIN VERSION
                5 COMMAND_EXIST SCENE STATUS*READY_TO_DRAW GET_ASYNC
                6 TC*TC_INFO GET
                7 MAIN VERSION
                8 MAIN*SYSTEM*MEMORY_ADVANCED GET
                9 MAIN*TEXTURE*MEMORY GET

            ++++++++++++++++++++++++++++
            */

            /* Response:

            7 MAIN VERSION.
            7 Version: 3.12.1.83617.15 { PHYSICAL     8120 TOTAL MBYTE }{ PHYSICAL     4533 FREE MBYTE }{ PAGEFILE     9400 TOTAL MBYTE }{ PAGEFILE     3375 FREE MBYTE }{ VIRTUAL 134217727 TOTAL MBYTE }{ VIRTUAL 134211542 FREE MBYTE }{ EXTENDED        0 FREE MBYTE }.
            8 MAIN*SYSTEM*MEMORY_ADVANCED GET.
            9 MAIN*TEXTURE*MEMORY GET.
            9 { TOTAL 2147483648 PIXEL 32768 ALLOCATED 842014720 SIZE 0 }.
            */

            const MAIN_VERSION = "Version: 3.12.1.83617.15"
            const MAIN_MEM_ADVANCED = "{ PHYSICAL     8120 TOTAL MBYTE }{ PHYSICAL     4533 FREE MBYTE }{ PAGEFILE     9400 TOTAL MBYTE }{ PAGEFILE     3375 FREE MBYTE }{ VIRTUAL 134217727 TOTAL MBYTE }{ VIRTUAL 134211542 FREE MBYTE }{ EXTENDED        0 FREE MBYTE }"
            const MAIN_TEXTURE_MEM = "{ TOTAL 2147483648 PIXEL 32768 ALLOCATED 842014720 SIZE 0 }"

            socket.on("data",
                ((data) => {
                    console.log("Recieved command :", data.toString());
                    this.vizMessages = data.toString().split("\0");

                    this.vizMessages.map((item) => {
                        let translated: ITranslationItem = translateCommand(item);
                        let messageNumber = item.substring(0, item.indexOf(" "));
                        let message = item.substring(item.indexOf(" ")+1);
                        console.log("Message number :", messageNumber, "  Message : ", message);

                        if (translated.ccgCommandType === 'play') {
                            // Load scene in CasparCG
                            this.ccgConnection.play(
                                1, // output,
                                20, // layer,
                                translated.ccgArgument, //Mediafile
                            );
                        }
                        // Initialistion of Viz Emulator:
                        else if (message === "MAIN VERSION") {
                            console.log("Return message :", MAIN_VERSION);
                            socket.write(messageNumber + " " + MAIN_VERSION + '\0')

                        } else if (message === "MAIN*SYSTEM*MEMORY_ADVANCED GET") {
                            console.log("Return message :", MAIN_MEM_ADVANCED);
                            socket.write(messageNumber + " " + MAIN_MEM_ADVANCED + '\0')
                        } else if (message === "MAIN*TEXTURE*MEMORY GET") {
                            console.log("Return message :", MAIN_TEXTURE_MEM);
                            socket.write(messageNumber + " " + MAIN_TEXTURE_MEM + '\0')
                        } else {
                            console.log("Following command not implemented :", message);
                            console.log('++++++++++++++++++++++++++++');
                            //socket.write("Message unknown" + '.\0')
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
