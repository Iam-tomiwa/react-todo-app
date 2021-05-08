import React from "react";
import {Link} from "react-router-dom";

const Links = ({num, clear}) => {
  // switch active class onclick of each sort button
  const changeActive = e => {
    let links = document.querySelectorAll(".links a");
    links.forEach(link => link.classList.remove("active"));
    e.target.classList.add("active");
  };

  return (
    <div className="todo-item flex">
      <p>{num} items completed</p>
      <div className="links">
        <Link
          onClick={e => changeActive(e)}
          to="/"
          className={window.location.pathname === "/" ? "active" : ""}
        >
          All
        </Link>
        <Link
          onClick={e => changeActive(e)}
          to="/pending"
          className={window.location.pathname === "/pending" ? "active" : ""}
        >
          Pending
        </Link>
        <Link
          onClick={e => changeActive(e)}
          to="/completed"
          className={window.location.pathname === "/completed" ? "active" : ""}
        >
          Completed
        </Link>
      </div>
      <button onClick={clear}>Clear Completed</button>
    </div>
  );
};

export default Links;