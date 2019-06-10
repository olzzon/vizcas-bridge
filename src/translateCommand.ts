import { translationSchemes, ITranslationScheme, ITranslationItem } from './translationProtocols';

export const translateCommand = (vizCommand: string): ITranslationItem => {
    let commands: ITranslationScheme = [...translationSchemes];
    let numberOfCommands: number = commands.length;

    let message = vizCommand.substring(vizCommand.indexOf(" ")+1);

    for (let i=0; i < numberOfCommands; i++) {
        //ToDo handle {argument1}
        if (thisCommand(commands[i].vizCommand, message)) {
            let argument = findArgumentInString(commands[i].vizCommand, message);
            commands[i].ccgArgument = replaceArgumentInString(commands[i].ccgArgument, argument)
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

const thisCommand = (vizCommand: string, message: string): boolean => {
    if (vizCommand === message) {
        return true
    }
    let splitArray: Array<string> = vizCommand.split("{argument}");
    if (splitArray.length === 2) {
        if(message.includes(splitArray[0]) && message.includes(splitArray[1])) {
            return true
        }
    } else if (splitArray.length === 1) {
        if(message.includes(splitArray[0])) {
            return true
        }
    }
    return false
}

const findArgumentInString = (vizCommand: string, message: string) => {
    let splitArray: Array<string> = vizCommand.split("{argument}");
    let argument = message;
    splitArray.map((textPart) => {
        argument = argument.replace(textPart, "");
    })
    return argument;
}

const replaceArgumentInString = (ccgCommand: string, argument: string): string => {
    if (ccgCommand.includes("{argument}")) {
        return ccgCommand.replace("{argument}", argument);
    } else {
        return ccgCommand;
    }
}
