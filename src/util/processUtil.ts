import { ProcessModel } from 'models/ProcessModel';

export const getLastExecutedProcess = (processes: ProcessModel[]): ProcessModel => {
    let highestEndTime = 0;
    let highestEndTimeProcess: ProcessModel = processes[0];

    processes.forEach(process => {
        if (process.EndTime > highestEndTime && process.EndTime !== -1) {
            highestEndTime = process.EndTime;
            highestEndTimeProcess = process;
        }
    });

    return highestEndTimeProcess;
}

export const getLastIncomming = (processes: ProcessModel[]): ProcessModel => {
    let highestCommingTime = 0;
    let highestCommingTimeProcess: ProcessModel = processes[0];

    processes.forEach(process => {
        if (process.CommingTime > highestCommingTime && process.CommingTime !== -1) {
            highestCommingTime = process.CommingTime;
            highestCommingTimeProcess = process;
        }
    });

    return highestCommingTimeProcess;
}

export const groupBy = (array: ProcessModel[], sortCondition: (a: ProcessModel, b: ProcessModel) => number): ProcessModel[] => {
    const groups: { [x: number]: ProcessModel[] } = {};
    array.forEach(process => {
        groups[process.CommingTime] = groups[process.CommingTime] || [];
        groups[process.CommingTime].push(process);
    });
    return Object.keys(groups).map(group => {
        return groups[parseInt(group)].sort((a,b) => sortByProperty(a,b,sortCondition));
    }).flat()
}

const sortByProperty = (a: ProcessModel, b: ProcessModel, sortFunction: (a: ProcessModel, b: ProcessModel) => number): number => {
    if (a.EndTime !== -1 && b.EndTime === -1) {
        return -1;
    } else if(a.EndTime === -1 && b.EndTime !== -1){
        return 1;
    } else if (a.EndTime !== -1 && b.EndTime !== -1) {
        return 0;
    }
    return sortFunction(a, b);;
}