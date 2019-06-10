import { translationSchemes, ITranslationScheme, ITranslationItem } from './translationProtocols';

export const translateCommand = (vizCommand: string): ITranslationItem => {
    let commands: ITranslationScheme = translationSchemes
    let numberOfCommands: number = commands.length;

    let message = vizCommand.substring(vizCommand.indexOf(" ")+1);

    for (let i=0; i < numberOfCommands; i++) {
        //ToDo handle {argument1}
        if (commands[i].vizCommand === message) {
            return commands[i]
        }
    }
    return {
        vizCommand: "",
        vizResponseCommand: "",
        ccgCommandType: "",
        ccgArgument: "",
    };

}
