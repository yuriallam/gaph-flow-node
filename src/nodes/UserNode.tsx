"use client";
import { setUsername } from '@/store/nodeSlice';
import { RootState } from '@/store/store';
import { Handle, Position } from '@xyflow/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UserNodeData {
    username: string;
    onUsernameChange: (id: string, newUsername: string) => void;
}

interface UserNodeProps {
    id: string;
    data: UserNodeData;
    selected: boolean;
}

export default function UserNode({ id, selected }: UserNodeProps) {
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.nodes.usernames[id] || '');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setUsername({ id, username: event.target.value }));
    };

    return (
        <div
            style={{
                padding: '10px',
                background: selected ? '#f8d7da' : '#f5c6cb',
                borderRadius: '5px',
                position: 'relative',
            }}
        >
            <strong>User Node</strong>
            <input
                type="text"
                value={username}
                onChange={handleInputChange}
                placeholder="Enter username"
                style={{ width: '100%', marginTop: '5px' }}
            />
            <Handle type="source" position={Position.Right} />
            <Handle type="target" position={Position.Left} />
        </div>
    );
}