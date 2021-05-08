import React, {useState} from "react";

// my main component to update UI
const Input = ({addTodo}) => {
  const [inputVal, setValue] = useState("");

  // update UI on form submission
  const formHandler = e => {
    e.preventDefault();
    if (inputVal) {
      const newTodo = {
        id: new Date().getTime().toString(),
        name: inputVal,
        completed: false,
      };
      addTodo(newTodo);
      setValue("");
    }
  };

  return (
    <form className="form" onSubmit={formHandler}>
      <div className="form-control">
        <input
          required
          type="text"
          id="input"
          value={inputVal}
          onChange={e => setValue(e.target.value)}
          placeholder="Create A New Task"
        />
      </div>
    </form>
  );
};

export default Input;
