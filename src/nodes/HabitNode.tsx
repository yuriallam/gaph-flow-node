"use client";
import { setSelectedHabit } from '@/store/habitSlice';
import { RootState } from '@/store/store';
import { HabitOptions, habitOptionToLabel } from '@/types/habit-node';
import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface HabitNodeProps {
    id: string;
    selected: boolean;
}

export default function HabitNode({ id, selected }: HabitNodeProps) {
    const dispatch = useDispatch();
    const habit = useSelector((state: RootState) => state.nodes.habits[id] || '');
    const selectedHabit = useSelector((state: RootState) => state.habit);

    const displayHabit = selectedHabit.id === id ? selectedHabit.selectedHabit : habit;

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedHabit({ habit: event.target.value, id: id }));
        // dispatch(setHabit({ id, habit: event.target.value }));
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
                value={displayHabit}
                onChange={handleDropdownChange}
                style={{ width: '100%', marginTop: '5px' }}
            >
                <option disabled hidden value="">
                    Select a habit
                </option>
                {Object.values(HabitOptions).map((habit) => (
                    <option key={habit} value={habit}>
                        {habitOptionToLabel[habit]}
                    </option>
                ))}
            </select>
            <Handle type="source" position={Position.Right} />
            <Handle type="target" position={Position.Left} />
        </div>
    );
}