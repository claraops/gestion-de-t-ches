import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required')
});

type FormData = z.infer<typeof schema>;

export const TaskForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <input {...register('title')} placeholder="Title" />
      {errors.title && <span>{errors.title.message}</span>}
      
      <input {...register('description')} placeholder="Description" />
      {errors.description && <span>{errors.description.message}</span>}
      
      <button type="submit">Add Task</button>
    </form>
  );
};