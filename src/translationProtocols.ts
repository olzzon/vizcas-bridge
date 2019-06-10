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
        ccgCommandType: "load",
        ccgArgument: "{argument}",
    },
    {
        vizCommand: "RENDERER*MAIN_LAYER SET_OBJECT SCENE*{argument}",
        vizResponseCommand: "<F8947D18-08FB-4E44-8A68082B7A332D58>",  //Return scene UUID
        ccgCommandType: "",
        ccgArgument: "{argument}",
    },
    {
        vizCommand: "SCENE*{argument}*STAGE START", // Start the Scene?
        vizResponseCommand: "",
        ccgCommandType: "play",
        ccgArgument: "{argument}",
    },
    // Testing purposes with static arguments:
    {
        vizCommand: "SCENE*Default/test CUE",
        vizResponseCommand: "0", // Return zero  -- playing status?
        ccgCommandType: "load",
        ccgArgument: "{argument}",
    },
    {
        vizCommand: "RENDERER*MAIN_LAYER SET_OBJECT SCENE*Default/test",
        vizResponseCommand: "<F8947D18-08FB-4E44-8A68082B7A332D58>",  //Return scene UUID
        ccgCommandType: "play",
        ccgArgument: "{argument}",
    },
    {
        vizCommand: "SCENE*Default/test*STAGE START", // Start the Scene?
        vizResponseCommand: "",
        ccgCommandType: "play",
        ccgArgument: "{argument}",
    },
];

