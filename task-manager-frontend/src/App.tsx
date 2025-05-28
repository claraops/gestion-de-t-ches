import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, deleteTask, toggleTaskStatus } from './api/taskApi';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const queryClient = useQueryClient();
  
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTaskStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  });

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onSubmit={createMutation.mutate} />
      <TaskList 
        tasks={tasks} 
        onDelete={deleteMutation.mutate}
        onToggle={toggleMutation.mutate}
      />
    </div>
  );
}

export default App;





