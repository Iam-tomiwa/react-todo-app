import React from "react";

const Todo = props => {
  const todoStyle = () => {
    return {
      textDecoration: props.data.completed ? "line-through" : "none",
      opacity: props.data.completed ? "0.5" : "1",
    };
  };

  const {data, checkTodo, delTodo} = props;
  const {name, id, completed, time} = data;
  return (
    <>
      <div className="todo-item">
        <div className="text">
          <label className="checkbox">
            <input
              type="checkbox"
              id={id}
              checked={completed}
              onChange={checkTodo}
            />
          </label>
          <label
            htmlFor={id}
            className="check-label"
            // onClick={checkTodo.bind(this, this.props.data.id)}
            style={todoStyle()}
          >
            {name} <span>({time})</span>
          </label>
        </div>
        <button className="closeBtn" onClick={delTodo}>
          X
        </button>
      </div>
      <hr />
    </>
  );
};

export default Todo;
