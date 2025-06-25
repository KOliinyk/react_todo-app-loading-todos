import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3170; // ← заміни на свій userId

const TODOS_URL = `/todos?userId=${USER_ID}`;

export const getTodos = () => {
  return client.get<Todo[]>(TODOS_URL);
};

export const addTodo = (title: string): Promise<Todo> => {
  return client.post<Todo>('/todos', {
    userId: USER_ID,
    title,
    completed: false,
  });
};

export const deleteTodo = (todoId: number): Promise<void> => {
  return client.delete(`/todos/${todoId}`);
};

export const toggleTodo = (todo: Todo): Promise<Todo> => {
  return client.patch<Todo>(`/todos/${todo.id}`, {
    completed: !todo.completed,
  });
};

export const updateTodoTitle = (
  todoId: number,
  newTitle: string,
): Promise<Todo> => {
  return client.patch<Todo>(`/todos/${todoId}`, {
    title: newTitle,
  });
};
