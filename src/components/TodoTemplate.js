import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <input className="title" type="text" placeholder="제목을 입력하세요" />
      <div className="contents">{children}</div>
    </div>
  );
};

export default TodoTemplate;
