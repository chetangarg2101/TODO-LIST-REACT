import React, { useState, useEffect } from 'react';
import "./App.css";
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList';

function App() {
  // Load saved todos from localStorage when the component mounts
  const [listTodo, setListTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever listTodo changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(listTodo));
  }, [listTodo]);

  const addList = (inputText) => {
    if (inputText.trim() !== '') {
      setListTodo((prevTodos) => [...prevTodos, inputText]);
    }
  };

  const deleteListItem = (index) => {
    setListTodo((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr />
        {listTodo.map((listItem, i) => (
          <Todolist key={i} index={i} item={listItem} deleteItem={deleteListItem} />
        ))}
      </div>
    </div>
  );
}

export default App;
