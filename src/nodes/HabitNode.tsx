"use client";
import { RootState } from '@/store/store';
import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHabit } from '../store/nodeSlice';

interface HabitNodeProps {
    id: string;
    selected: boolean;
}

export default function HabitNode({ id, selected }: HabitNodeProps) {
    const dispatch = useDispatch();
    const habit = useSelector((state: RootState) => state.nodes.habits[id] || '');

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setHabit({ id, habit: event.target.value }));
    };

    return (
        <div
            style={{
                padding: '10px',
                background: selected ? '#d4edda' : '#c3e6cb',
                borderRadius: '5px',
                position: 'relative',
            }}
        >
            <strong>Habit Node</strong>
            <select
                value={habit}
                onChange={handleDropdownChange}
                style={{ width: '100%', marginTop: '5px' }}
            >
                <option value="">Select a habit</option>
                <option value="Reading">Reading</option>
                <option value="Exercise">Exercise</option>
                <option value="Meditation">Meditation</option>
                <option value="Cooking">Cooking</option>
            </select>
            <Handle type="source" position={Position.Right} />
            <Handle type="target" position={Position.Left} />
        </div>
    );
}