import { translationSchemes, ITranslationScheme, ITranslationItem } from './translationProtocols';

export const translateCommand = (vizCommand: string): any => {
    let commands: ITranslationScheme = translationSchemes
    let numberOfCommands: number = commands.length;

    let messageNumber = vizCommand.substring(0, vizCommand.indexOf(" "));
    let message = vizCommand.substring(vizCommand.indexOf(" ")+1);

    for (let i=0; i < numberOfCommands; i++) {
        if (commands[i].vizCommand === message) {
            return commands[i]
        }
    }

}
