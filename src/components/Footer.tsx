import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  deleteTodo: (id: number) => Promise<void>;
  setErrorMessage: (msg: string) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  filter,
  setFilter,
  deleteTodo,
  setErrorMessage,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed);

  const handleClearCompleted = async () => {
    try {
      await Promise.all(completedTodos.map(todo => deleteTodo(todo.id)));
      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch {
      setErrorMessage('Unable to delete completed todos');
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>

      <nav className="filter" data-cy="Filter">
        {(['all', 'active', 'completed'] as const).map(f => (
          <a
            key={f}
            href="#/"
            className={`filter__link ${filter === f ? 'selected' : ''}`}
            data-cy={`FilterLink${f[0].toUpperCase() + f.slice(1)}`}
            onClick={e => {
              e.preventDefault();
              setFilter(f);
            }}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </a>
        ))}
      </nav>

      {completedTodos.length > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
