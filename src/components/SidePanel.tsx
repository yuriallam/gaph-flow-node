import { setHabit, setUsername } from '@/store/nodeSlice';
import { RootState } from '@/store/store';
import { HabitOptions, habitOptionToLabel } from '@/types/habit-node';
import { NodeFormData, nodeSchema } from '@/types/node-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './SidePanel.css';

interface SidePanelProps {
    selectedNodeId: string | null;
    selectedNodeType: 'userNode' | 'habitNode' | null;
    onAddNode: (type: 'userNode' | 'habitNode', properties: Record<string, string>) => void;
    onDeselectNode: () => void;
}

export default function SidePanel({
    selectedNodeId,
    selectedNodeType,
    onAddNode,
    onDeselectNode,
}: SidePanelProps) {
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.nodes.usernames[selectedNodeId || ''] || '');
    const habit = useSelector((state: RootState) => state.nodes.habits[selectedNodeId || ''] || '');
    const [isOpen, setIsOpen] = useState(selectedNodeId != null ? true : false);


    const [nodeType, setNodeType] = useState<'userNode' | 'habitNode'>('userNode');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(nodeSchema),
        defaultValues: {
            nodeName: 'userNode',
            username: '',
            habit: '',
        },
    });

    useEffect(() => {
        if (selectedNodeId && selectedNodeType) {
            setNodeType(selectedNodeType);
            if (selectedNodeType === 'userNode') {
                setValue('username', username);
            } else if (selectedNodeType === 'habitNode') {
                setValue('habit', habit);
            }
        } else {
            setNodeType('userNode');
        }
    }, [selectedNodeId, selectedNodeType, username, habit, setValue]);

    const handleAddOrUpdate = (data: NodeFormData) => {
        if (selectedNodeId) {
            if (nodeType === 'userNode') {
                dispatch(setUsername({ id: selectedNodeId, username: data.username || '' }));
            } else if (nodeType === 'habitNode') {
                dispatch(setHabit({ id: selectedNodeId, habit: data.habit || '' }));
            }
            onDeselectNode();
        } else {
            onAddNode(nodeType, {
                ...(nodeType === 'userNode' ? { username: data.username || '' } : { habit: data.habit || '' }),
            });
        }
    };


    const togglePanel = () => setIsOpen((prev) => !prev);

    const onSubmit = handleSubmit((data) => {
        handleAddOrUpdate(data as NodeFormData);
        reset();
    });


    return (
        <div>
            <button onClick={togglePanel} className="side-panel-button side-panel-button-secondary">
                {(isOpen || selectedNodeId) ? 'Close Panel' : 'Open Panel'}
            </button>
            {(isOpen || selectedNodeId) && (
                <form onSubmit={onSubmit} className="side-panel-container">
                    <h3 className="side-panel-header">{selectedNodeId ? 'Edit Node' : 'Add Node'}</h3>

                    {!selectedNodeId && (
                        <>
                            <label className="side-panel-label">Node Type:</label>
                            <select
                                value={nodeType}
                                onChange={(e) => {
                                    setValue('nodeName', e.target.value);
                                    setNodeType(e.target.value as 'userNode' | 'habitNode');
                                }}
                                className="side-panel-select"
                            >
                                <option value="userNode">User Node</option>
                                <option value="habitNode">Habit Node</option>
                            </select>
                        </>
                    )}

                    {nodeType === 'userNode' ? (
                        <div>
                            <label className="side-panel-label">Username:</label>
                            <input {...register('username')} className="side-panel-input" />
                            {errors.username && <p className="side-panel-error">{errors.username.message}</p>}
                        </div>
                    ) : (
                        <div>
                            <label className="side-panel-label">Habit:</label>
                            <select {...register('habit')} className="side-panel-select">
                                <option disabled hidden value="">
                                    Select a habit
                                </option>
                                {Object.values(HabitOptions).map((habit) => (
                                    <option key={habit} value={habit}>
                                        {habitOptionToLabel[habit]}
                                    </option>
                                ))}
                            </select>
                            {errors.habit && <p className="side-panel-error">{errors.habit.message}</p>}
                        </div>
                    )}

                    <div className="side-panel-buttons">
                        {selectedNodeId && (
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    onDeselectNode();
                                }}
                                className="side-panel-button side-panel-button-secondary"
                            >
                                Cancel
                            </button>
                        )}
                        <button type="submit" className="side-panel-button side-panel-button-primary">
                            {selectedNodeId ? 'Update Node' : 'Add Node'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}