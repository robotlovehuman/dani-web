"use client"

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Create retro app", completed: true },
    { id: 2, text: "Add more features", completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos(prev => [...prev, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="h-[calc(100vh-3rem)]">
      <h1 className="text-2xl font-bold mb-4">RetroTodo</h1>
      <div className="retro-panel">
        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 p-2 bg-[var(--c64-light)] border-2 border-[var(--c64-brown)] rounded"
            placeholder="Add new todo..."
          />
          <button type="submit" className="retro-button">
            <Plus className="w-5 h-5" />
          </button>
        </form>
        
        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} 
                 className="flex items-center gap-2 p-2 bg-[var(--c64-light)] rounded">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 accent-[var(--c64-brown)]"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-[var(--c64-brown)]' : ''}`}>
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="p-1 hover:text-[var(--c64-brown)]"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 