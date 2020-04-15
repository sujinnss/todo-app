import React from 'react';
import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdRemove,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoItem.scss';

const TodoItem = ({ todo }) => {
  const { text, checked } = todo;
  return (
    <div className="TodoItem">
      <div className={cn('checkbox', { checked })}>
        {checked ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
        <div className="text">{text}</div>
      </div>
      <div className="remove">
        <MdRemove />
      </div>
    </div>
  );
};

export default TodoItem;
