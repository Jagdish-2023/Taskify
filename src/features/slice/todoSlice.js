import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../utils/fetchApi";

export const signUpUserAsync = createAsyncThunk(
  "user/signup",
  async (signUpData) => await fetchApi("POST", "/auth/v1/signup", signUpData)
);

export const signInUserAsync = createAsyncThunk(
  "user/signin",
  async (signInData) => await fetchApi("POST", "/auth/v1/signin", signInData)
);

export const signInGuestUserAsync = createAsyncThunk(
  "guest/signIn",
  async () => await fetchApi("POST", "/auth/guest/signin", {})
);

export const fetchUserInfoAsync = createAsyncThunk(
  "user/fetch",
  async () => await fetchApi("GET", "/v1/user")
);

export const fetchTodosAsync = createAsyncThunk(
  "todos/fetch",
  async () => await fetchApi("GET", "/v1/todos")
);

export const createTodoAsync = createAsyncThunk(
  "todo/create",
  async (todoData) => await fetchApi("POST", "/v1/todos", todoData)
);

export const fetchTodoDetailsAsync = createAsyncThunk(
  "todoInfo/fetch",
  async (todoId) => await fetchApi("GET", `/v1/todos/${todoId}`)
);

export const addTaskToTodoAsync = createAsyncThunk(
  "task/create",
  async (taskData) => await fetchApi("POST", "/v1/todo/tasks", taskData)
);

export const removeTaskFromTodoAsync = createAsyncThunk(
  "task/remove",
  async (taskId) => await fetchApi("DELETE", `/v1/todo/tasks/${taskId}`)
);

export const removeTodoItemAsync = createAsyncThunk(
  "todo/remove",
  async (todoId) => await fetchApi("DELETE", `/v1/todos/${todoId}`)
);

export const updateTaskStatusAsync = createAsyncThunk(
  "task-status/update",
  async ({ taskId, status }) =>
    await fetchApi("POST", `/v1/todo/tasks/${taskId}/status`, { status })
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    todo: { todo: null, tasks: [] },
    userInfo: null,
    status: "idle",
    error: null,
  },
  reducers: {
    removeLoginFormError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUserAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signUpUserAsync.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.status = "success";
      state.userInfo = user;
    });
    builder.addCase(signUpUserAsync.rejected, (state, action) => {
      state.error = "error";
      state.error = action.error.message;
    });

    builder.addCase(signInUserAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signInUserAsync.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.status = "success";
      state.userInfo = user;
    });
    builder.addCase(signInUserAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(signInGuestUserAsync.pending, (state, action) => {
      state.status = "success";
    });
    builder.addCase(signInGuestUserAsync.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.status = "success";
      state.userInfo = user;
    });
    builder.addCase(signInGuestUserAsync.rejected, (state, action) => {
      state.status = "error";

      state.error = action.error.message;
    });

    builder.addCase(fetchUserInfoAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUserInfoAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(fetchTodosAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      const todos = action.payload;
      state.status = "success";
      state.todos = todos;
    });
    builder.addCase(fetchTodosAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(createTodoAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createTodoAsync.fulfilled, (state, action) => {
      const todo = action.payload;
      state.status = "success";
      state.todos.push(todo);
    });
    builder.addCase(createTodoAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(fetchTodoDetailsAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodoDetailsAsync.fulfilled, (state, action) => {
      const { todo, tasks } = action.payload.todo;
      state.status = "success";
      state.todo.todo = todo;
      state.todo.tasks = tasks;
    });
    builder.addCase(fetchTodoDetailsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(addTaskToTodoAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addTaskToTodoAsync.fulfilled, (state, action) => {
      const savedTask = action.payload;
      state.status = "success";
      state.todo.tasks.push(savedTask);
    });
    builder.addCase(addTaskToTodoAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(removeTaskFromTodoAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(removeTaskFromTodoAsync.fulfilled, (state, action) => {
      const deletedTask = action.payload;
      state.status = "success";
      state.todo.tasks = state.todo.tasks.filter(
        (task) => task._id !== deletedTask._id
      );
    });
    builder.addCase(removeTaskFromTodoAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(removeTodoItemAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(removeTodoItemAsync.fulfilled, (state, action) => {
      const deletedTodo = action.payload;
      state.status = "success";
      if (state.todos.length > 0) {
        state.todos = state.todos.filter(
          (todo) => todo._id !== deletedTodo._id
        );
      }

      state.todo.tasks = state.todo.tasks.filter(
        (task) => task.todo !== deletedTodo._id
      );
    });
    builder.addCase(removeTodoItemAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateTaskStatusAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
      const { updatedTask } = action.payload;
      state.status = "success";
      const updateTask = state.todo.tasks.find(
        (task) => task._id === updatedTask._id
      );
      if (updatedTask) {
        updateTask.status = updatedTask.status;
      }
    });
    builder.addCase(updateTaskStatusAsync.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { removeLoginFormError } = todoSlice.actions;
export default todoSlice.reducer;
