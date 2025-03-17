// components/TodoList.js
import React, { useState } from 'react';

function Todolist({ index, item, toggleComplete, deleteItem, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const handleEditToggle = () => {
    if (isEditing) {
      editTodo(index, newText);
    } else {
      setNewText(item.text); // Set newText to the current item's text when entering edit mode
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setNewText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEditToggle();
    }
  };

  return (
    <div className={`todo-item ${item.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleComplete(index)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={handleInputChange}
          onBlur={handleEditToggle}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span style={{ marginLeft: '10px' }}>
          {item.text} - {item.timestamp}
        </span>
      )}
      <div className="button-container">
        <button onClick={handleEditToggle}>{isEditing ? 'Save' : 'Edit'}</button>
        <button onClick={() => deleteItem(index)}>Delete</button>
      </div>
    </div>
  );
}

export default Todolist;