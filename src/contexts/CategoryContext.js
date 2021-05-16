import {createContext, useEffect, useState} from "react";

export const CategoryContext = createContext();

const CategoryContextWrapper = props => {
  const [categories, setCategories] = useState(["Today"]);

  //   hooks
  useEffect(() => {
    setCategories(
      localStorage.getItem("todoCategories")
        ? JSON.parse(localStorage.getItem("todoCategories"))
        : ["Today"]
    );
  }, []);

  const delCategory = item => {
    let newCategories = categories.filter(ct => item !== ct);
    setCategories(newCategories);
    localStorage.setItem("todoCategories", JSON.stringify(newCategories));
  };
  const submitCategory = item => {
    let newCategories = [...categories, item];
    setCategories([...newCategories]);
    localStorage.setItem("todoCategories", JSON.stringify(newCategories));
  };

  function reorderCategories(result) {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
    localStorage.setItem("todoCategories", JSON.stringify(categories));
  }
  return (
    <CategoryContext.Provider
      value={{submitCategory, categories, reorderCategories, delCategory}}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextWrapper;
