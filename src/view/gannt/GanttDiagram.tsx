import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { PropsGantt } from 'util/props';
import './gantt.css'

import styled from 'styled-components';
import { ProcessModel } from 'models/ProcessModel';

const GanttDiagram = ({ processList, timer }: PropsGantt) => {
    const totalTime = processList.reduce((max, process) => process.BurstTime > max ? process.BurstTime : max, 0);

    const [completed, setCompleted] = useState(0);

    const calcPercentage = (process: ProcessModel) => {
        return (process.BurstTime / totalTime) * 100;
    }

    const getProgressBar = (process: ProcessModel) => {
        const Div = styled.div`
            width: ${calcPercentage(process)}%;
            margin-bottom: 5px;
        `;
        return (
            <Div>
                <ProgressBar
                key={process.Id}
                variant="info"
                now={process.TurnAroundTime !== -1? process.EndTime : completed}
                label={process.Name}
            />
            </Div>
        );
    }

    const getTimes = () => {
        const times = [];
        for (let i = 0; i <= totalTime; i++) {
            times.push(<p key={i} className="time">{i}</p>);
        }
        return times.length !== 1 ? times : [];
    }
    useEffect(() => {

        if (completed !== 100) {
            setTimeout(() => {
                setCompleted(completed + 1);
            }, timer * 1000);
        }
    })
    return (
        <div className='gantt scrollable'>
            <div className="times">
                {getTimes().map((time) => time)}
            </div>
            <div className="lines">
                {processList.map((process) => getProgressBar(process))}
            </div>
        </div>
    );
}

export default GanttDiagram;