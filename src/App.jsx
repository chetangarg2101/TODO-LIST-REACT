import React, { useState, useEffect } from 'react';
import "./App.css";
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList';

function App() {
  const [listTodo, setListTodo] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(listTodo));
  }, [listTodo]);

  const addList = (inputText) => {
    if (inputText.trim() !== '') {
      const newTodo = {
        text: inputText,
        completed: false,
        timestamp: new Date().toLocaleString()
      };
      setListTodo((prevTodos) => [newTodo, ...prevTodos]);
    }
  };

  const toggleComplete = (index) => {
    setListTodo((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteListItem = (index) => {
    setListTodo((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const clearCompleted = () => {
    setListTodo((prevTodos) => prevTodos.filter(todo => !todo.completed));
  };

  const editTodo = (index, newText) => {
    setListTodo((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = listTodo.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true; // For 'all', return all todos
  });

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr />
        <div className="filters">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        {filter === 'completed' && (
          <button onClick={clearCompleted}>Clear Completed</button>
        )}
        {filteredTodos.map((listItem, i) => (
          <Todolist
            key={i}
            index={i}
            item={listItem}
            toggleComplete={toggleComplete}
            deleteItem={deleteListItem}
            editTodo={editTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;