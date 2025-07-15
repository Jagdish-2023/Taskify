import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskToTodoAsync,
  fetchTodoDetailsAsync,
  removeTaskFromTodoAsync,
  removeTodoItemAsync,
  updateTaskStatusAsync,
} from "../features/slice/todoSlice";

const Todo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { todo } = useSelector((state) => state.todos);
  const { todoId } = useParams();
  const [taskTitle, setTaskTitle] = useState("");

  const addNewTask = () => {
    dispatch(
      addTaskToTodoAsync({ title: taskTitle, status: "Pending", todoId })
    );
    setTaskTitle("");
  };

  const deleteTaskFromTodo = (taskId) => {
    dispatch(removeTaskFromTodoAsync(taskId));
  };

  const deleteTodo = () => {
    dispatch(removeTodoItemAsync(todoId));
    navigate("/dashboard");
  };

  const handleToggleTaskStatus = (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    dispatch(updateTaskStatusAsync({ taskId: task._id, status: newStatus }));
  };

  useEffect(() => {
    dispatch(fetchTodoDetailsAsync(todoId));
  }, [todoId]);

  return (
    <>
      <Sidebar />
      <main className="p-4" style={{ marginLeft: "250px" }}>
        {todo?.todo && (
          <section>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h3">{todo.todo.title}</h1>
              <button className="btn btn-danger btn-sm" onClick={deleteTodo}>
                Delete Todo
              </button>
            </div>
            <hr />

            <div className="d-flex justify-content-between align-items-center mt-5">
              <input
                type="text"
                placeholder="Enter task name"
                className="form-control"
                style={{ width: "90%" }}
                onChange={(e) => setTaskTitle(e.target.value)}
                value={taskTitle}
              />
              <button
                className="btn btn-primary"
                disabled={!taskTitle}
                onClick={addNewTask}
              >
                Add Task
              </button>
            </div>

            {todo?.tasks.length > 0 ? (
              <div className="mt-5">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="bg-info-subtle text-info-emphasis"
                      >
                        Tasks
                      </th>
                      <th
                        scope="col"
                        className="bg-info-subtle text-info-emphasis"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="bg-info-subtle text-info-emphasis"
                      >
                        Mark as complete/incomplete
                      </th>
                      <th
                        scope="col"
                        className="bg-info-subtle text-info-emphasis"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todo.tasks.map((task) => (
                      <tr key={task._id}>
                        <th scope="row">{task.title}</th>
                        <td>{task.status}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={task._id}
                              aria-label="taskStatusCheckbox"
                              checked={task.status === "Completed"}
                              onChange={() => handleToggleTaskStatus(task)}
                            />
                          </div>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteTaskFromTodo(task._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-5">
                <p className="text-muted text-center">No tasks found</p>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default Todo;
