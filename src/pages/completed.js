import React from "react";
import Todo from "../components/todo";
import {Droppable, Draggable} from "react-beautiful-dnd";
const Completed = ({todos, checkTodo, delTodo}) => {
  return (
    <Droppable droppableId="todo-wrap">
      {provided => (
        <div
          className="todo-wrap"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todos
            .filter(data => data.completed === true)
            .map((data, index) => {
              return (
                <Draggable key={data.id} draggableId={data.id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Todo
                        checkTodo={() => checkTodo(data.id)}
                        delTodo={() => delTodo(data.id)}
                        data={data}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Completed;
