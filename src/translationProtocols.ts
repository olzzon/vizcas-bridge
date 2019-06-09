export interface ITranslationScheme extends Array<ITranslationItem> {}

export interface ITranslationItem {
    vizCommand: string,
    vizResponseCommand: string,
    ccgCommandType: string,
    ccgArgument: string,
}

export const translationSchemes: ITranslationScheme = [
    {
        vizCommand: "RENDERER*MAIN_LAYER SET_OBJECT SCENE*Default/test",
        vizResponseCommand: "<F8947D18-08FB-4E44-8A68082B7A332D58>",
        ccgCommandType: "play",
        ccgArgument: "{argument1}"
    },
];

/*

Recieved command : 122 MAIN*TEXTURE*MEMORY GET 

Message number : 122   Message :  MAIN*TEXTURE*MEMORY GET

Return message : { TOTAL 2147483648 PIXEL 32768 ALLOCATED 842014720 SIZE 0 }

Message number :    Message :

Following command not implemented :

++++++++++++++++++++++++++++

Recieved command : 123 SCENE*Default/test CUE 

Message number : 123   Message :  SCENE*Default/test CUE

Following command not implemented : SCENE*Default/test CUE

++++++++++++++++++++++++++++

Message number :    Message :

Following command not implemented :

++++++++++++++++++++++++++++

Recieved command : 124 RENDERER*UPDATE SET 0 125 RENDERER*MAIN_LAYER SET_OBJECT SCENE*Default/test 126 SCENE*Default/test*STAGE START 127 RENDERER*UPDATE SET 1 

Message number : 124   Message :  RENDERER*UPDATE SET 0

Following command not implemented : RENDERER*UPDATE SET 0

++++++++++++++++++++++++++++

Message number : 125   Message :  RENDERER*MAIN_LAYER SET_OBJECT SCENE*Default/test

Following command not implemented : RENDERER*MAIN_LAYER SET_OBJECT SCENE*Default/test
RESPONSE TO TRIO -> UUID: <F8947D18-08FB-4E44-8A68082B7A332D58>

++++++++++++++++++++++++++++

Message number : 126   Message :  SCENE*Default/test*STAGE START

Following command not implemented : SCENE*Default/test*STAGE START

++++++++++++++++++++++++++++

Message number : 127   Message :  RENDERER*UPDATE SET 1

Following command not implemented : RENDERER*UPDATE SET 1

++++++++++++++++++++++++++++

Message number :    Message :

Following command not implemented :

++++++++++++++++++++++++++++

*/
