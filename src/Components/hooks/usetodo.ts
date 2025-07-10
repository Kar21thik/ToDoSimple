// src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock "database"
let mockTodos: { id: number; task: string }[] = [
  { id: 1, task: 'Learn React Query' },
  { id: 2, task: 'Build a To-Do App' },
];

// Simulated API calls
const fetchTodos = async () => {
  return new Promise<typeof mockTodos>((resolve) => {
    setTimeout(() => resolve([...mockTodos]), 500);
  });
};

const addTodoApi = async (task: string) => {
  return new Promise<{ id: number; task: string }>((resolve) => {
    const newTodo = { id: Date.now(), task };
    mockTodos.push(newTodo);
    setTimeout(() => resolve(newTodo), 300);
  });
};

const deleteTodoApi = async (id: number) => {
  return new Promise<void>((resolve) => {
    mockTodos = mockTodos.filter((todo) => todo.id !== id);
    setTimeout(() => resolve(), 300);
  });
};

// Custom Hook
export const useTodos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const addTodo = useMutation({
    mutationFn: addTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    isLoading,
    isError,
    addTodo,
    deleteTodo,
  };
};
