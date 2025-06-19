import { useEffect, useState } from 'react';
import type { Operation } from '../types/operation';

type Props = {
  operations: Operation[];
  currentTime: number;
};

export function QueueVisualizer({ operations, currentTime }: Props) {
  const [queue, setQueue] = useState<string[]>([]);
  const [flashedIndices, setFlashedIndices] = useState<number[]>([]);

  useEffect(() => {
    const visibleOps = operations
      .filter(op => op.timestamp <= currentTime)
      .sort((a, b) => a.timestamp - b.timestamp);

    const nextQueue: string[] = [];
    for (const op of visibleOps) {
      if (op.type === 'enqueue' && op.value !== undefined) {
        nextQueue.push(op.value);
      } else if (op.type === 'dequeue') {
        nextQueue.shift();
      }
    }

    const newIndices: number[] = [];
    nextQueue.forEach((val, idx) => {
      if (queue[idx] !== val) newIndices.push(idx);
    });

    setQueue(nextQueue);
    setFlashedIndices(newIndices);

    const timeout = setTimeout(() => setFlashedIndices([]), 1000);
    return () => clearTimeout(timeout);
  }, [operations, currentTime]);

  return (
    <div>
      <h2 className="text-lg font-semibold">Queue at t={currentTime === Infinity ? '∞' : currentTime}</h2>
      <div className="flex items-center gap-2 mt-2">
        {queue.length === 0 ? (
          <div className="text-gray-500 italic">[empty]</div>
        ) : (
          queue.map((value, i) => (
            <div
              key={i}
              className={`px-3 py-1 border rounded ${flashedIndices.includes(i) ? 'animate-flash bg-yellow-100' : 'bg-green-100'}`}
            >
              {value}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
