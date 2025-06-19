import React, { useState, useEffect } from 'react';
import type { Operation } from '../types/operation';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    onAdd: (op: Operation) => void;
    onCancel: () => void;
    initialOp: Operation | null;
};
  
export function OperationInput({ onAdd, onCancel, initialOp }: Props) {
    
    const [type, setType] = useState<'enqueue' | 'dequeue' | 'query'>('enqueue');
    const [value, setValue] = useState('');
    const [timestamp, setTimestamp] = useState(0);
    useEffect(() => {
        if (initialOp) {
            setType(initialOp.type);
            setTimestamp(initialOp.timestamp);
            setValue(initialOp.value ?? '');
        }
      }, [initialOp]);
      

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const op: Operation = {
            id: initialOp?.id ?? uuidv4(),
            type,
            timestamp,
            ...(type === 'enqueue' ? { value } : {})
        };
        onAdd(op);

        // Reset form
        setType('enqueue');
        setValue('');
        setTimestamp(0);
    };
      

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex gap-2">
            <select value={type} onChange={e => setType(e.target.value as any)} className="border px-2 py-1">
                <option value="enqueue">enqueue</option>
                <option value="dequeue">dequeue</option>
                <option value="query">query</option>
            </select>
            {type === 'enqueue' && (
                <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="value"
                className="border px-2 py-1"
                />
            )}
            <input
                type="number"
                value={timestamp}
                onChange={e => setTimestamp(Number(e.target.value))}
                className="border px-2 py-1"
                placeholder="timestamp"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
                {initialOp ? 'Update' : 'Add'}
            </button>
            {initialOp && (
                <button
                    type="button"
                    onClick={() => {
                        onCancel();
                        setType('enqueue');
                        setValue('');
                        setTimestamp(0);
                    }}
                    className="bg-gray-300 text-black px-4 py-1 rounded"
                >
                    Cancel
                </button>
            )}

            </div>
        </form>
    );
}
