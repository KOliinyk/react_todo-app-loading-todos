import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onUpdateTitle: (id: number, title: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onToggle,
  onDelete,
  onUpdateTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    const trimmed = title.trim();

    setIsEditing(false);

    if (trimmed && trimmed !== todo.title) {
      onUpdateTitle(todo.id, trimmed);
    } else {
      setTitle(todo.title); // повертаємо оригінальну назву
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    } else if (event.key === 'Escape') {
      setTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input
        id={`status-${todo.id}`}
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />

      <label htmlFor={`status-${todo.id}`} className="todo__status-label">
        Toggle status
      </label>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="todo__title-field"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSubmit}
          data-cy="TodoTitleField"
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleEdit}
        >
          {todo.title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => onDelete(todo.id)}
      >
        ×
      </button>
    </div>
  );
};
