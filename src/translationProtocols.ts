export interface ITranslationScheme extends Array<ITranslationItem> {}

export interface ITranslationItem {
    vizCommand: string,
    vizResponseCommand: string,
    ccgCommandType: string,
    ccgArgument: string,
}

export const translationSchemes: ITranslationScheme = [
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
];



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
