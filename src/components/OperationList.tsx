import React from 'react';
import type { Operation } from '../types/operation';

type Props = {
  operations: Operation[];
  onDelete: (id: string) => void;
  onEdit: (op: Operation) => void;
};

export function OperationList({ operations, onDelete, onEdit }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Operations</h2>
      <div className="space-y-2 mt-2">
        {operations.map(op => (
          <div key={op.id} className="flex gap-2 items-center border px-2 py-1 rounded">
            <span className="w-[90px]">{op.type}</span>
            <span className="w-[60px] text-gray-700">{op.value ?? '-'}</span>
            <span className="w-[80px]">t={op.timestamp}</span>
            <button
              onClick={() => onEdit(op)}
              className="text-blue-600 text-sm px-2 border rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(op.id)}
              className="text-red-600 text-sm px-2 border rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
