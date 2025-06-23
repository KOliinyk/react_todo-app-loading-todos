import { useEffect, useState } from 'react';
import { Todo, ApiError } from './types/Todo';
import { getTodos, addTodo, deleteTodo, toggleTodo } from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const loadTodos = async () => {
    setErrorMessage('');
    setIsLoading(true);

    try {
      const data = await getTodos();

      setTodos(data);
    } catch (error: unknown) {
      const err = error as ApiError;

      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle.trim()) {
      setErrorMessage('Title is required');

      return;
    }

    try {
      setIsAdding(true);
      const newTodo = await addTodo(newTitle.trim());

      setTodos(prev => [...prev, newTodo]);
      setNewTitle('');
    } catch (error: unknown) {
      const err = error as ApiError;

      setErrorMessage(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error: unknown) {
      const err = error as ApiError;

      setErrorMessage(err.message);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      const updated = await toggleTodo(todo);

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch (error: unknown) {
      const err = error as ApiError;

      setErrorMessage(err.message);
    }
  };

  return (
    <div className="todoapp">
      <h1>Todos</h1>

      {errorMessage && (
        <div className="notification is-danger is-light">
          <button
            className="delete"
            onClick={() => setErrorMessage('')}
          ></button>
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddTodo()}
            placeholder="What needs to be done?"
            disabled={isAdding}
          />
          <button onClick={handleAddTodo} disabled={isAdding}>
            Add
          </button>

          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo)}
                />
                <span>{todo.title}</span>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
