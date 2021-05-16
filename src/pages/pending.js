import {useContext} from "react";
import {Droppable} from "react-beautiful-dnd";
import TodoWrap from "../components/TodoWrap";
import {CategoryContext} from "../contexts/CategoryContext";
import {TodoContext} from "../contexts/TodoContexts";
import {Draggable} from "react-beautiful-dnd";

const Pending = () => {
  const {todos} = useContext(TodoContext);
  const {categories} = useContext(CategoryContext);

  const pending = todos.filter(data => data.completed === false);

  return (
    <Droppable droppableId="todo-wrap">
      {provided => (
        <div
          className="todo-wrap"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {categories.map((item, index) => {
            return (
              <Draggable key={item} draggableId={item + index} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoWrap todos={pending} item={item} />
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

export default Pending;
