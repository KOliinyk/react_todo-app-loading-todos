import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (todo: Todo) => Promise<Todo>;
  updateTodoTitle: (id: number, title: string) => Promise<Todo>;
  setErrorMessage: (msg: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  deleteTodo,
  toggleTodo,
  setErrorMessage,
}) => {
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      setErrorMessage('Unable to delete a todo');
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await toggleTodo(todo);

      setTodos(prev => prev.map(t => (t.id === updated.id ? updated : t)));
    } catch {
      setErrorMessage('Unable to update a todo');
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
};
