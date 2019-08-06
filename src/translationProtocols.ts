export interface ITranslationScheme extends Array<ITranslationItem> {}

export interface ITranslationItem {
    vizCommand: string,
    vizResponseCommand: string,
    ccgCommandType: string,
    ccgArgument: string,
}

export const translationSchemes = (): ITranslationScheme => {
    return [
        //Initialisation responses:
        {
            vizCommand: "MAIN VERSION",
            vizResponseCommand: "Version: 3.12.1.83617.15",
            ccgCommandType: "",
            ccgArgument: "",
        },
        {
            vizCommand: "MAIN*SYSTEM*MEMORY_ADVANCED GET",
            vizResponseCommand: "{ PHYSICAL     8120 TOTAL MBYTE }{ PHYSICAL     4533 FREE MBYTE }{ PAGEFILE     9400 TOTAL MBYTE }{ PAGEFILE     3375 FREE MBYTE }{ VIRTUAL 134217727 TOTAL MBYTE }{ VIRTUAL 134211542 FREE MBYTE }{ EXTENDED        0 FREE MBYTE }",
            ccgCommandType: "",
            ccgArgument: "",
        },
        {
            vizCommand: "MAIN*TEXTURE*MEMORY GET",
            vizResponseCommand: "{ TOTAL 2147483648 PIXEL 32768 ALLOCATED 842014720 SIZE 0 }",
            ccgCommandType: "",
            ccgArgument: "",
        },
        // Scene loading and preparing:
        {
            vizCommand: "SCENE*{argument} CUE",
            vizResponseCommand: "0", // Return zero  -- playing status?
            ccgCommandType: "cgAdd",
            ccgArgument: "{argument}",
        },
        {
            vizCommand: "RENDERER*MAIN_LAYER SET_OBJECT SCENE*{argument}",
            vizResponseCommand: "<F8947D18-08FB-4E44-8A68082B7A332D58>",  //Return an UUID, seems to be of no concern what UUID to return
            ccgCommandType: "",
            ccgArgument: "{argument}",
        },
        {
            vizCommand: "SCENE*{argument}*STAGE START", // Start the Scene?
            vizResponseCommand: "",
            ccgCommandType: "cgPlay",
            ccgArgument: "{argument}",
        },
        {
            vizCommand: "RENDERER*MAIN_LAYER*TREE*$LOWER*FUNCTION*Toggle*object SET GEOM*{argument}", //
            vizResponseCommand: "<F8947D18-08FB-4E44-8A68082B7A332D58>",
            ccgCommandType: "",
            ccgArgument: "",
        },
        {
            vizCommand: "RENDERER*MAIN_LAYER*TREE*$LOWER$other$object*FUNCTION*ControlObject*in SET ON 08 SET Data1\010 SET Data2", //
            vizResponseCommand: "",
            ccgCommandType: "addText",
            ccgArgument: "",
        },
    ];
}


/* Recieve text:
RENDERER*TREE*<NodeFullPath>*GEOM*TEXT SET <New Text>
*/

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
/*
           Recieved command tcp-string : 11 RENDERER*MAIN_LAYER SET_OBJECT SCENE*TV2/PILOT_TEMPLATES/2015_DESIGN/NYHEDERNE/overlays/MASTER12 RENDERER*MAIN_LAYER*TREE*$LOWER*FUNCTION*Toggle*object SET GEOM*TV2/PILOT_TEMPLATES/2015_DESIGN/NYHEDERNE/overlays/bund13 RENDERER*MAIN_LAYER*TREE*$LOWER$other$object*FUNCTION*ControlObject*in SET ON 08 SET Data1\010 SET Data214 RENDERER*MAIN_LAYER*STAGE*DIRECTOR*LOWER SHOW $NAME15 RENDERER*MAIN_LAYER*TREE*$LOWER*FUNCTION*Toggle*switch INVOKE
           app.ts:31
           Message :  11 RENDERER*MAIN_LAYER SET_OBJECT SCENE*TV2/PILOT_TEMPLATES/2015_DESIGN/NYHEDERNE/overlays/MASTER  Argument : TV2/PILOT_TEMPLATES/2015_DESIGN/NYHEDERNE/overlays/MASTER
           app.ts:38
           Viz return message :  11 <F8947D18-08FB-4E44-8A68082B7A332D58>
           app.ts:41
           Unknown message :  12 RENDERER*MAIN_LAYER*TREE*$LOWER*FUNCTION*Toggle*object SET GEOM*TV2/PILOT_TEMPLATES/2015_DESIGN/NYHEDERNE/overlays/bund
           app.ts:65
           Unknown message :  13 RENDERER*MAIN_LAYER*TREE*$LOWER$other$object*FUNCTION*ControlObject*in SET ON 08 SET Data1\010 SET Data2
           app.ts:65
           Unknown message :  14 RENDERER*MAIN_LAYER*STAGE*DIRECTOR*LOWER SHOW $NAME
           app.ts:65
           Unknown message :  15 RENDERER*MAIN_LAYER*TREE*$LOWER*FUNCTION*Toggle*switch INVOKE
*/
