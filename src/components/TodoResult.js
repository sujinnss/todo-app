import React from 'react';
import './TodoResult.scss';
import {
  MdSentimentVerySatisfied,
  MdSentimentVeryDissatisfied,
} from 'react-icons/md';

const TodoResult = ({todos}) => {

  return (
    <div className="TodoResult">
      <div className="complete">완료 :{todos.filter(todo => todo.checked).length}</div>
      <div className="incomplete">미완료 :{todos.filter(todo => !todo.checked).length}</div>
    </div>
  );
};

export default TodoResult;
