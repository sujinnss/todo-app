import React, { useEffect, useRef } from 'react';
import './TodoList.scss';
import TodoItem from './TodoItem';

//  todos={allDatas[todoIndex].todos}
const TodoList = ({ todos, onRemove, onToggle, onToggleStar, onTodoSort }) => {
    return (
        <div className="TodoList">
            {todos
                .concat()
                .sort(onTodoSort)
                .map((todo) => (
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
