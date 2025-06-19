import { useState } from 'react';
import type { Operation } from './types/operation';
import { Timeline } from './components/Timeline';
import { QueueVisualizer } from './components/QueueVisualizer';
import { OperationInput } from './components/OperationInput';
import { OperationList } from './components/OperationList';

function App() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [editOp, setEditOp] = useState<Operation | null>(null);


  const handleAdd = (op: Operation) => {
    if (editOp) {
      setOperations(prev =>
        prev.map(o => (o.id === op.id ? op : o)).sort((a, b) => a.timestamp - b.timestamp)
      );
      setEditOp(null);
    } else {
      setOperations(prev => [...prev, op].sort((a, b) => a.timestamp - b.timestamp));
    }
  };

  const handleDelete = (id: string) => {
    setOperations(prev => prev.filter(op => op.id !== id));
  };
  
  const handleEdit = (op: Operation) => {
    setEditOp(op);
  };

  const handleCancel = () => {
    setEditOp(null);
  };
  
  

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Fully Retroactive Queue Visualizer</h1>     
      <OperationInput onAdd={handleAdd} onCancel={handleCancel} initialOp={editOp} />
      <OperationList operations={operations} onDelete={handleDelete} onEdit={handleEdit} />
      <Timeline operations={operations} onSelectTime={setCurrentTime} currentTime={currentTime} />
      <QueueVisualizer operations={operations} currentTime={currentTime} />
    </div>
  );
}

export default App;
