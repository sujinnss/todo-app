import React from 'react';
import './TodoList.scss';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onRemove, onToggle, onToggleStar,onTodoSort }) => {
  return (
    <div className="TodoList">
      {todos.sort(onTodoSort).map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
          onToggleStar={onToggleStar}
        />
      ))}
    </div>
  );
};

export default TodoList;
