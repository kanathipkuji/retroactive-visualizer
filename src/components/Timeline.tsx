import React from 'react';
import type { Operation } from '../types/operation';


type Props = {
    operations: Operation[];
    currentTime: number;
    onSelectTime: (time: number) => void;
};

export function Timeline({ operations, currentTime, onSelectTime }: Props) {
    const times = [...new Set(operations.map(op => op.timestamp))].sort((a, b) => a - b);

    return (
    <div>
        <h2 className="text-lg font-semibold">Timeline</h2>
        <div className="flex gap-2 flex-wrap">
        {times.map(t => (
            <button
            key={t}
            onClick={() => onSelectTime(t)}
            className={`px-3 py-1 rounded border ${currentTime === t ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
            t={t}
            </button>
        ))}
        <button
            onClick={() => onSelectTime(Infinity)}
            className={`px-3 py-1 rounded border ${currentTime === Infinity ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
            Latest
        </button>
        </div>
    </div>
    );
}
