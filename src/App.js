import React, { useEffect, useState } from 'react'
import './App.css';

// get data from localStorage
const getLocaldata = () => {
  const list = localStorage.getItem("todo-list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

function App() {

  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState(getLocaldata());
  const [editItemId, setEditItemId] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add items
  const addItem = () => {
    if (!inputValue) {
      alert("Please Add Values")
    } else if (inputValue && toggleButton) {
      const updateList = list.map((item) => {
        if (item.id === editItemId) {
          return { ...list, name: inputValue }};
        return item;
      });
      setList(updateList);
      setToggleButton(false);

    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputValue
      }
      setList([...list, newInputData]);
      setInputValue("");
    }
  }

  // delete Item
  const deleteItem = (id) => {
    const filterList = list.filter((item) => {
      return item.id !== id;
    });
    setList(filterList);
  };


  // update Item
  const updateItem = (id) => {
    const singleItem = list.find((item) => {
      return item.id === id;
    });
    setInputValue(singleItem.name);
    setToggleButton(true);
    setEditItemId(id);
  }

  // add data to localstorage
  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list))
  }, [list])

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src="images/to-do.svg" alt="todo-img" />
          <figcaption>Add Your List Here 🤞</figcaption>
        </figure>
        <div className="addItems">
          <input type="text" name="write todo" onChange={(e) => setInputValue(e.target.value)} value={inputValue} className="form-control" placeholder="✍️ Add Items" id="" />
          <i className={toggleButton ? "far fa-edit" : "fa fa-plus add-btn"} onClick={() => addItem()}></i>
        </div>

        {/* show all items */}
        {list.map((item) => {
          return (
            <div className="showItems" key={item.id}>
              <div className="eachItem">
                <h3>{item.name}</h3>
                <div className="todo-btn">
                  <i className="far fa-edit add-btn" onClick={() => updateItem(item.id)}></i>
                  <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(item.id)}></i>
                </div>
              </div>
            </div>
          )
        })}


        {/* remove all items */}
        <div className="showItems">
          <button
            className="btn effect04"
            data-sm-link-text="Remove All"
            onClick={() => setList([])}>
            <span> CHECK LIST</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
