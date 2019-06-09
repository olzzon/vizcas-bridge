export interface ITranslationScheme extends Array<ITranslationItem> {}

export interface ITranslationItem {
    vizCommand: string,
    vizResponseCommand: string,
    ccgCommandType: string,
    ccgArgument: string,
}

export const translationSchemes: ITranslationScheme = [
    {
        vizCommand: "SCRENE*{argument1} LOAD",
        vizResponseCommand: "",
        ccgCommandType: "play",
        ccgArgument: "{argument1}"
    },
];
