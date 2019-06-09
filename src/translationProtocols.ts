export interface ITranslationScheme extends Array<ITranslationItem> {}

export interface ITranslationItem {
    vizCommand: string,
    ccgCommandType: string,
    ccgArgument: string,
}

export const translationSchemes: ITranslationScheme = [
    {
        vizCommand: "SCRENE*{argument1} LOAD",
        ccgCommandType: "play",
        ccgArgument: "{argument1}"
    },
];
