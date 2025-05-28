//import { Task } from '../api/taskApi';
import type { Task } from '../api/taskApi';



export const TaskList = ({ tasks, onDelete, onToggle }: { 
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}) => { 
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span>Status: {task.status}</span>
          <button onClick={() => onToggle(task.id)}>
            Toggle Status
          </button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};