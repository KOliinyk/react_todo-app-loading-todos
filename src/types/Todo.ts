export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type ApiError = {
  message: string;
};
