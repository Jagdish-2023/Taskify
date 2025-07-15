import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { createTodoAsync, fetchTodosAsync } from "../features/slice/todoSlice";

const getTodoDate = (dateObj) => {
  const date = new Date(dateObj);
  return date.toDateString();
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todos);
  const [todoTitle, settodoTitle] = useState("");

  const addNewTodo = () => {
    dispatch(createTodoAsync({ title: todoTitle }));
    settodoTitle("");
  };

  useEffect(() => {
    if (todos.length < 1) {
      dispatch(fetchTodosAsync());
    }
  }, []);

  return (
    <>
      <Sidebar />
      <main className="p-4" style={{ marginLeft: "250px" }}>
        <h1 className="h3 text-center">Dashboard</h1>

        <div className="d-flex justify-content-between align-items-center mt-5">
          <input
            type="text"
            placeholder="Enter todo name"
            className="form-control"
            style={{ width: "90%" }}
            onChange={(e) => settodoTitle(e.target.value)}
            value={todoTitle}
          />
          <button
            className="btn btn-primary"
            disabled={!todoTitle}
            onClick={addNewTodo}
          >
            Create Todo
          </button>
        </div>

        <section className="mt-5">
          <div className="row">
            {todos.map((todo) => (
              <div className="col-md-3" key={todo._id}>
                <div className="card">
                  <h5 className="card-header">{todo.title}</h5>
                  <div className="card-body">
                    <p className="card-text">
                      Date: {getTodoDate(todo.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
