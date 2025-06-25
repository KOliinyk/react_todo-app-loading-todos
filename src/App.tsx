import React, { useEffect, useState } from 'react';
import './styles/index.scss';

import { Todo } from './types/Todo';
import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodoTitle,
} from './api/todos';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load todos on mount
  useEffect(() => {
    const loadTodos = async () => {
      setErrorMessage('');
      setIsLoading(true);

      try {
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        setErrorMessage((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Add new todo
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
    } catch (error) {
      setErrorMessage('Unable to add a todo');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleAddTodo={handleAddTodo}
          isAdding={isAdding}
        />

        {isLoading ? (
          <p className="has-text-centered">Loading...</p>
        ) : (
          <>
            <TodoList
              todos={todos}
              setTodos={setTodos}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              updateTodoTitle={updateTodoTitle}
              setErrorMessage={setErrorMessage}
            />

            {todos.length > 0 && <Footer todos={todos} setTodos={setTodos} />}
          </>
        )}
      </div>

      <Notification
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
