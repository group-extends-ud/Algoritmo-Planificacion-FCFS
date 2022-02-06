export class ProcessInputModel {
    private name: string;
    private commingTime: number;
    private burstTime: number;

    public constructor(
        name: string,
        commingTime: number,
        burstTime: number
        ) {
        this.name = name;
        this.commingTime = commingTime;
        this.burstTime = burstTime;
    }

    public get Name(): string {return this.name}
    public set Name(name: string) {this.name = name;}

    public get CommingTime(): number {return this.commingTime}
    public set CommingTime(commingTime: number) {this.commingTime = commingTime;}

    public get BurstTime(): number {return this.burstTime}
    public set BurstTime(burstTime: number) {this.burstTime = burstTime;}
}

export class ProcessModel extends ProcessInputModel {
    private startTime: number;
    private endTime: number;
    private waitingTime: number;
    private turnAroundTime: number;

    public constructor({Name, CommingTime, BurstTime}: ProcessInputModel) {
        super(Name, CommingTime, BurstTime);
        this.startTime = -1;
        this.endTime = -1;
        this.waitingTime = -1;
        this.turnAroundTime = -1;
    }

    public get StartTime(): number {return this.startTime}
    public set StartTime(startTime: number) {this.startTime = startTime;}

    public get EndTime(): number {return this.endTime}
    public set EndTime(endTime: number) {this.endTime = endTime;}

    public get WaitingTime(): number {return this.waitingTime}
    public set WaitingTime(waitingTime: number) {this.waitingTime = waitingTime;}

    public get TurnAroundTime(): number {return this.turnAroundTime}
    public set TurnAroundTime(turnAroundTime: number) {this.turnAroundTime = turnAroundTime;}
}