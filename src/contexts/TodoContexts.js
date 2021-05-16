import {createContext, useEffect, useState} from "react";
import {getDate, getTime} from "../components/dateFunc";
export const TodoContext = createContext();

const TodoContextWrapper = props => {
  // state
  const [todos, setTodo] = useState(null);
  //   hooks
  useEffect(() => {
    setTodo(
      localStorage.getItem("tomTodo")
        ? JSON.parse(localStorage.getItem("tomTodo")).reverse()
        : [
            {
              category: "Today",
              completed: false,
              dueDate: getDate(),
              id: "1621042248146",
              task: "Hello World",
              time: getTime(),
            },
          ]
    );
  }, []);

  //   event listeners
  // func to del an item
  const delTodo = id => {
    let newTodo = todos.filter(todos => id !== todos.id);
    setTodo(newTodo);
    localStorage.setItem("tomTodo", JSON.stringify(newTodo.reverse()));
  };

  //   check todo
  const checkTodo = id => {
    console.log(todos);
    let newTodo = todos.map(todo => {
      if (id === todo.id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodo(newTodo);
    localStorage.setItem("tomTodo", JSON.stringify(newTodo.reverse()));
    console.log(todos);
  };

  // add todo
  const addTodo = data => {
    setTodo(oldTodos => {
      let newTodos = [...oldTodos, data].reverse();
      localStorage.setItem("tomTodo", JSON.stringify(newTodos.reverse()));
      console.log(newTodos);
      return newTodos;
    });
  };

  //   clear completed
  const clearCompleted = () => {
    let newTodos = todos.filter(todo => todo.completed === false);
    setTodo(newTodos);
    localStorage.setItem("tomTodo", JSON.stringify(newTodos.reverse()));
  };
  return (
    <TodoContext.Provider
      value={{todos, checkTodo, clearCompleted, addTodo, delTodo, setTodo}}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextWrapper;
