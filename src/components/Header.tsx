import React from 'react';
type Props = {
  newTitle: string;
  setNewTitle: (value: string) => void;
  handleAddTodo: () => void;
  isAdding: boolean;
};

export const Header: React.FC<Props> = ({
  newTitle,
  setNewTitle,
  handleAddTodo,
  isAdding,
}) => {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleAddTodo();
  };

  return (
    <header className="todoapp__header">
      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          disabled={isAdding}
        />
      </form>
    </header>
  );
};
