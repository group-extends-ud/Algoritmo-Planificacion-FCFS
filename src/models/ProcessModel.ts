import { v4 } from 'uuid';

export class ProcessInputModel {
    private name: string;
    private commingTime: number;
    private burstTime: number;
    private priority: number;

    public constructor(
        name: string,
        commingTime: number,
        burstTime: number,
        priority: number,
        ) {
        this.name = name;
        this.commingTime = commingTime;
        this.burstTime = burstTime;
        this.priority = priority;
    }

    public get Name(): string {return this.name;}
    public set Name(name: string) {this.name = name;}

    public get CommingTime(): number {return this.commingTime;}
    public set CommingTime(commingTime: number) {this.commingTime = commingTime;}

    public get BurstTime(): number {return this.burstTime;}
    public set BurstTime(burstTime: number) {this.burstTime = burstTime;}

    public get Priority(): number {return this.priority;}
    public set Priority(priority: number) {this.priority = priority;}
}

export class ProcessModel extends ProcessInputModel {
    private id: number;
    private startTime: number;
    private endTime: number;
    private waitingTime: number;
    private turnAroundTime: number;
    private lockedTime:number;
    private executed: number;

    public constructor(id:number,{Name, CommingTime, BurstTime, Priority}: ProcessInputModel) {
        super(Name, CommingTime, BurstTime, Priority);
        this.id = id;
        this.startTime = -1;
        this.endTime = -1;
        this.waitingTime = -1;
        this.turnAroundTime = -1;
        this.lockedTime = -1;
        this.executed = -1;
    }

    public get Id(): number {return this.id;}

    public get StartTime(): number {return this.startTime}
    public set StartTime(startTime: number) {this.startTime = startTime;}

    public get EndTime(): number {return this.endTime}
    public set EndTime(endTime: number) {this.endTime = endTime;}

    public get WaitingTime(): number {return this.waitingTime}
    public set WaitingTime(waitingTime: number) {this.waitingTime = waitingTime;}

    public get TurnAroundTime(): number {return this.turnAroundTime}
    public set TurnAroundTime(turnAroundTime: number) {this.turnAroundTime = turnAroundTime;}

    public get LockedTime(): number {return this.lockedTime}
    public set LockedTime(lockedTime: number) {this.lockedTime = lockedTime;}
    
    public get Executed(): number {return this.executed}
    public set Executed(executed: number) {this.executed = executed;}

    public copy(id:number): ProcessModel {
        return new ProcessModel(
            id,
            new ProcessInputModel(
                `${this.Name}*`,
                this.CommingTime,
                this.BurstTime,
                this.Priority,
            )
        );
    }
    
}