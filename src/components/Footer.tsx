import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  filter,
  setFilter,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  const handleClearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(f => (
          <a
            href="#/"
            key={f}
            className={classNames('filter__link', {
              selected: filter === f,
            })}
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

      {completedCount > 0 && (
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
