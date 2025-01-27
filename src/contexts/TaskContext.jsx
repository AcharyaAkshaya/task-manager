/*eslint-disable */
import { createContext, useContext, useEffect, useReducer } from "react";

const TaskContext = createContext();
const storageKey = "localTasks";
const storageKeyUser = "localUser";
const initialState = {
  user:
    localStorage.getItem(storageKeyUser) == null
      ? ""
      : JSON.parse(localStorage.getItem(storageKeyUser)),
  today: new Date().toDateString(),
  tasks:
    localStorage.getItem(storageKey) == null
      ? []
      : JSON.parse(localStorage.getItem(storageKey)),
  // tasks: [
  //   {
  //     id: 1,
  //     title: "Buy groceries",
  //     deadline: new Date().toDateString(),
  //     completed: false,
  //     priority: "high",
  //     details: "Some details about the task",
  //   },
  //   {
  //     id: 2,
  //     title: "Do laundry",
  //     deadline: new Date().toDateString(),
  //     completed: true,
  //     priority: "medium",
  //     details: "Some details about the task",
  //   },
  //   {
  //     id: 3,
  //     title: "Cook dinner",
  //     deadline: new Date().toDateString(),
  //     completed: false,
  //     priority: "low",
  //     details: "Some details about the task",
  //   },
  // ],
};

function reducer(state, action) {
  switch (action.type) {
    case "TASKS_READY":
      return { ...state, tasks: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "LOG_OUT":
      return {
        ...state,
        user: "",
      };
    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [{ user, today, tasks }, dispatch] = useReducer(reducer, initialState);
  useEffect(
    function () {
      const localTasks = localStorage.setItem(
        storageKey,
        JSON.stringify(tasks)
      );
      const localUser = localStorage.setItem(
        storageKeyUser,
        JSON.stringify(user)
      );
      if (localTasks) dispatch({ type: "TASKS_READY", payload: localTasks });
      if (localUser) dispatch({ type: "SET_USER", payload: localUser });
    },
    [tasks, user]
  );
  return (
    <TaskContext.Provider value={{ user, today, tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

export { useTask, TaskProvider };
