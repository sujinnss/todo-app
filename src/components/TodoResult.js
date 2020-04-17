import React from 'react';
import './TodoResult.scss';
import {
  MdSentimentVerySatisfied,
  MdSentimentVeryDissatisfied,
} from 'react-icons/md';

const TodoResult = () => {
  return (
    <div className="TodoResult">
      <div className="complete">완료 :</div>
      <div className="incomplete">미완료 :</div>
    </div>
  );
};

export default TodoResult;
