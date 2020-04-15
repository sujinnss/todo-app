import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="title">TODO</div>
      <div className="contents">{children}</div>
    </div>
  );
};

export default TodoTemplate;
