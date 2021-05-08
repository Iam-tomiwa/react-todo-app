import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {DragDropContext} from "react-beautiful-dnd";
import Input from "./components/input";
import Header from "./components/header";
import Home from "./pages/Home";
import Pending from "./pages/pending";
import Completed from "./pages/completed";
import Links from "./components/links";
import "./App.css";

const App = () => {
  // state
  const [todos, setTodo] = useState(null);

  //   hooks
  useEffect(() => {
    setTodo(
      localStorage.getItem("tomTodo")
        ? JSON.parse(localStorage.getItem("tomTodo"))
        : []
    );
  }, []);

  //   event listeners
  // func to del an item
  const delTodo = id => {
    let newTodo = todos.filter(todos => id !== todos.id);
    setTodo(newTodo);
    localStorage.setItem("tomTodo", JSON.stringify(newTodo));
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
    localStorage.setItem("tomTodo", JSON.stringify(newTodo));
    console.log(todos);
  };

  // add todo
  const addTodo = data => {
    setTodo(oldTodos => {
      let newTodos = [...oldTodos, data];
      localStorage.setItem("tomTodo", JSON.stringify(newTodos));
      console.log(newTodos);
      return newTodos;
    });
  };

  //   clear completed
  const clearCompleted = () => {
    let newTodos = todos.filter(todo => todo.completed === false);
    setTodo(newTodos);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodo(items);
    localStorage.setItem("tomTodo", JSON.stringify(items));
  }
  return (
    <Router>
      <main>
        <Header />
        <Input addTodo={addTodo} />
        {todos && (
          <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Switch>
                <Route exact path="/">
                  {
                    <Home
                      todos={todos}
                      checkTodo={checkTodo}
                      delTodo={delTodo}
                    />
                  }
                </Route>
                <Route exact path="/pending">
                  <Pending
                    todos={todos}
                    checkTodo={checkTodo}
                    delTodo={delTodo}
                  />
                </Route>
                <Route exact path="/completed">
                  <Completed
                    todos={todos}
                    checkTodo={checkTodo}
                    delTodo={delTodo}
                  />
                </Route>
              </Switch>
            </DragDropContext>
            <Links
              num={todos.filter(todo => todo.completed === true).length}
              clear={clearCompleted}
            />
            <p className="info">Drag And Drop To Reorder List 😋</p>
          </>
        )}
      </main>
    </Router>
  );
};
export default App;
