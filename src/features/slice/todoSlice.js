import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchApi from "../../utils/fetchApi";

export const signUpUserAsync = createAsyncThunk(
  "user/signup",
  async (signUpData) => {
    return await fetchApi("POST", "/auth/v1/signup", signUpData);
  }
);

export const signInUserAsync = createAsyncThunk(
  "user/signin",
  async (signInData) => {
    return await fetchApi("POST", "/auth/v1/signin", signInData);
  }
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

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
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
  },
});

export const { removeLoginFormError } = todoSlice.actions;
export default todoSlice.reducer;
