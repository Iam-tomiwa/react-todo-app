import React, {useState} from "react";

const getTime = () => {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

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
        time: getTime(),
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
