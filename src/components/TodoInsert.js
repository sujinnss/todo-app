import React, { useCallback, useState } from 'react';
import './TodoInsert.scss';
import { MdAdd, MdDateRange } from 'react-icons/md';
import { DatePicker } from 'antd';
import moment from 'moment';

// props로 부터 onInsert를 props로 받음
const TodoInsert = ({ onInsert }) => {
    const [date, setDate] = useState(moment());

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

    const handleDateChange = (date) => setDate(date);

    //input의 value,onChange가 포인트
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="todo"
                value={value}
                onChange={onChange}
            />
            <div className="date">
                <DatePicker value={date} onChange={handleDateChange} />
            </div>
            <button className="submit" type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;
