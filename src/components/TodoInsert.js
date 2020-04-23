import React, { useCallback, useState } from 'react';
import './TodoInsert.scss';
import { MdAdd } from 'react-icons/md';

// props로 부터 onInsert를 props로 받음
const TodoInsert = ({ onInsert }) => {
  // const
  const [value, setValue] = useState('');
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');
      e.preventDefault();
    },
    [onInsert, value]
  );

  //input의 value,onChange가 포인트
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="todo를 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
