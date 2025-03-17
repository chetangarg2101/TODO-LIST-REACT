// components/TodoList.js
import React, { useState } from 'react';

function Todolist({ index, item, toggleComplete, deleteItem, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(index, newText);
    }
    setIsEditing(!isEditing);
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
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <span
          style={{ textDecoration: item.completed ? 'line-through' : 'none', marginLeft: '10px' }}
          onDoubleClick={handleEdit}
        >
          {item.text} - {item.timestamp}
        </span>
      )}
      <button onClick={() => deleteItem(index)}>Delete</button>
    </div>
  );
}

export default Todolist;