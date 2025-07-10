// src/Components/Todo.tsx
import React, { useState } from 'react';
import { useTodos } from './hooks/usetodo'; // adjust path if needed

const Todo: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const { todos, isLoading, isError, addTodo, deleteTodo } = useTodos();

  const handleAdd = () => {
    if (newTask.trim() === '') return;
    addTodo.mutate(newTask.trim());
    setNewTask('');
  };

  const handleDelete = (id: number) => {
    deleteTodo.mutate(id);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">To-Do List (React Query)</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 w-full rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {isLoading && <p>Loading todos...</p>}
      {isError && <p className="text-red-500">Error fetching todos.</p>}

      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <span>{todo.task}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
