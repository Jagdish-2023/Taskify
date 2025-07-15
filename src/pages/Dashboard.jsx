import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { createTodoAsync, fetchTodosAsync } from "../features/slice/todoSlice";
import { useNavigate } from "react-router-dom";

const getTodoDate = (dateObj) => {
  const date = new Date(dateObj);
  return date.toDateString();
};

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todos);
  const [todoTitle, settodoTitle] = useState("");

  const addNewTodo = () => {
    dispatch(createTodoAsync({ title: todoTitle }));
    settodoTitle("");
  };

  const handleTodoCard = (todoId) => {
    navigate(`/todo/${todoId}`);
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
          {todos.length > 0 ? (
            <div className="row">
              {todos.map((todo) => (
                <div className="col-md-3" key={todo._id}>
                  <div
                    className="card"
                    onClick={() => handleTodoCard(todo._id)}
                    style={{ cursor: "pointer" }}
                  >
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
          ) : (
            <div>
              <p className="text-muted text-center">No Todos yet created</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Dashboard;
