export type OperationType = 'enqueue' | 'dequeue' | 'query';

export type Operation = {
    id: string;
    type: OperationType;
    value?: string;
    timestamp: number;
};
