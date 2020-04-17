import React from 'react';
import {
  MdCheckCircle,
  MdRadioButtonUnchecked,
  MdRemove,
  MdStarBorder,
  MdStar,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoItem.scss';

const TodoItem = ({ todo, onRemove, onToggle, onToggleStar }) => {
  const { id, text, checked, star } = todo;
  return (
    <div className="TodoItem">
      <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
        {checked ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
        <div className="text">{text}</div>
      </div>
      <div className={cn('starbox', { star })} onClick={() => onToggleStar(id)}>
        {star ? <MdStar /> : <MdStarBorder />}
      </div>
      <div
        className="remove"
        onClick={() => {
          onRemove(id);
        }}
      >
        <MdRemove />
      </div>
    </div>
  );
};

export default TodoItem;
