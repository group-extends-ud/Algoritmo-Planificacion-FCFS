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

export const sortArray = (processes: ProcessModel[], sortBy: string): ProcessModel[] => {
    if (sortBy === 'commintime') {
        return processes.sort((a, b) => a.CommingTime - b.CommingTime);
    } else if (sortBy === 'bursttime') {
        return processes.sort((a, b) => a.BurstTime - b.BurstTime);
    } else if (sortBy === 'priority') {
        return processes.sort((a, b) => a.Priority - b.Priority);
    } else if (sortBy === 'waitingtime') {
        return processes.sort((a, b) => a.WaitingTime - b.WaitingTime);
    } else if (sortBy === 'turnaroundtime') {
        return processes.sort((a, b) => a.TurnAroundTime - b.TurnAroundTime);
    } else {
        return processes;
    }
}