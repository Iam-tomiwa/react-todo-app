import React, {useContext, useState} from "react";
import "../assets/modal.css";
import {CategoryContext} from "../contexts/CategoryContext";
import {TodoContext} from "../contexts/TodoContexts";
import {getDate, getTime} from "./dateFunc";
// import displayMsg from "./Message";

const AddTodo = () => {
  const {addTodo} = useContext(TodoContext);
  const {categories, submitCategory} = useContext(CategoryContext);
  const [btnText, setBtnText] = useState("Submit");
  const [showModal, setShowModal] = useState(false);
  const [formData, setformData] = useState({
    task: "",
    dueDate: getDate(),
    category: categories[0],
  });

  const [newCt, setNewCt] = useState("");
  const addCategory = () => {
    if (!categories.includes(newCt)) {
      submitCategory(newCt);
      setNewCt("");
      setformData(data => {
        return {...data, category: newCt};
      });
    }
  };
  // update UI on form submission
  const formHandler = e => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime().toString(),
      ...formData,
      dueDate: formData.dueDate.replaceAll("-", "/"),
      completed: false,
      time: getTime(),
    };
    addTodo(newTodo);
    setBtnText(`\u2714 Task Added`);
    setformData({
      task: "",
      dueDate: getDate(),
      category: categories[0],
    });
    setTimeout(() => {
      setBtnText(`Submit`);
      setShowModal(false);
    }, 1000);
  };

  const handleFormChange = e => {
    const {name, value} = e.target;
    if (formData.dueDate < getDate()) {
      // displayMsg("error", "Inavlid Due Date");
    } else {
      e.target.setCustomValidity("");
      setformData(data => {
        return {...data, [name]: value};
      });
    }
    console.log(formData);
  };
  return (
    <>
      <div className="form-control">
        <button onClick={() => setShowModal(true)} className="add-todo">
          + Add Todo
        </button>
        <div
          onClick={() => setShowModal(false)}
          className="overlay"
          style={{display: showModal ? "block" : "none"}}
        ></div>
        <div style={{display: showModal ? "block" : "none"}} className="modal">
          <form className="form" onSubmit={e => formHandler(e)}>
            <span onClick={() => setShowModal(false)} className="closeModal">
              x
            </span>
            <div className="form-group">
              <label htmlFor="task">Enter Task:</label>
              <input
                required
                name="task"
                type="text"
                className="input"
                id="task"
                value={formData.task}
                onChange={e => handleFormChange(e)}
                placeholder="Enter task"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Enter Due Date:</label>
              <input
                required
                className="input"
                name="dueDate"
                type="date"
                id="date"
                min={getDate()}
                value={formData.dueDate}
                onChange={e => handleFormChange(e)}
                placeholder="Enter Date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Select Category: </label>
              <select
                className="input"
                value={formData.category}
                name="category"
                onChange={e => handleFormChange(e)}
              >
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <h3 style={{textAlign: "center"}}>OR...</h3>
            <div className="form-group">
              <label htmlFor="newCt">Add New Category:</label>
              <div className="pwd-wrap">
                <input
                  type="text"
                  className="input"
                  id="newCt"
                  value={newCt}
                  onChange={e => setNewCt(e.target.value)}
                  placeholder="Enter task"
                />
                <button
                  onClick={addCategory}
                  type="button"
                  className="view-pwd"
                >
                  + Add
                </button>
              </div>
            </div>
            <button type="submit" className="btn">
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
/* 
              <div className="category-wrap">
              <h3></h3>
            </div>
              <div className="radio-wrap">
                <div class="form-control-group">
                  <input
                    required
                    value=""
                    type="radio"
                    name="category"
                    id="1"
                  />
                  <label for="1">el.name</label>
                </div>
                <div class="form-control-group">
                  <input
                    required
                    value=""
                    type="radio"
                    name="category"
                    id="2"
                  />
                  <label for="2">el.name</label>
                </div>
                <div class="form-control-group">
                  <input
                    required
                    value=""
                    type="radio"
                    name="category"
                    id="3"
                  />
                  <label for="3">el.name</label>
                </div>
              </div> */
export default AddTodo;
