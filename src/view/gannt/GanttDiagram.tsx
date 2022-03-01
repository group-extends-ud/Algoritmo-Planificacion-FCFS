import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './gantt.css'

import { ProcessModel } from 'models/ProcessModel';
import { useAppSelector } from 'hooks/redux';

const GanttDiagram = () => {
    const processList = useAppSelector(({ computedProcess:{ value } }) => value );
    
    const totalTime = processList.reduce((max, process) => {
        return process.EndTime > max ? process.EndTime : max;
    }, 0);

    const calcPercentage = (time: number) => {
        return (time / totalTime) * 100;
    }

    const getProgressBar = (process: ProcessModel) => {
        return (
            <ProgressBar>
                <ProgressBar
                    animated
                    variant="danger"
                    now={calcPercentage(process.CommingTime)}
                />
                <ProgressBar
                    animated
                    variant="warning"
                    now={calcPercentage(process.StartTime - process.CommingTime)}
                />
                <ProgressBar
                    animated
                    variant="success"
                    now={calcPercentage(process.BurstTime)}
                />
            </ProgressBar>
        );
    }

    const getTimes = () => {
        const times = [];
        for (let i = 0; i <= totalTime; i++) {
            times.push(<p key={i} className="time">{i}</p>);
        }
        return times.length !== 1 ? times : [];
    }

    return (
        <div className='gantt scrollable'>
            <div className="times">
                {getTimes().map((time) => time)}
            </div>
            <div className="lines">
                {processList.map((process) => <div className="line" key={process.Id}>{process.EndTime !== -1?  <><p>{process.Name}</p>{getProgressBar(process)}</> : undefined}</div>)}
            </div>
        </div>
    );
}

export default GanttDiagram;