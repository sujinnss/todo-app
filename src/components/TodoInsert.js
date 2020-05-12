import React, { useCallback, useState } from 'react';
import './TodoInsert.scss';
import { MdAdd, MdDateRange } from 'react-icons/md';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Button, notification } from 'antd';

// props로 부터 onInsert를 props로 받음
const TodoInsert = ({ onInsert }) => {
    // insert할때 날짜를 받아오려고
    const [date, setDate] = useState(moment());
    const [value, setValue] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (e) => {
            onInsert(value, date);
            setValue('');
            // setDate('');
            e.preventDefault();
        },
        [onInsert, value, date]
    );

    const handleDateChange = useCallback((date) => setDate(date), [date]);

    // todo의 값이 빈값일경우 notification 알림
    const Context = React.createContext({ name: 'Default' });
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.info({
            message: ` todo값을 입력하세요`,
            placement,
        });
    };

    //input의 value,onChange가 포인트
    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="todo를 입력하세요"
                value={value}
                onChange={onChange}
            />
            <div className="date">
                <DatePicker value={date} onChange={handleDateChange} />
            </div>

            <Context.Provider value={{ name: 'Ant Design' }}>
                {contextHolder}
                <button
                    className="submit"
                    type="submit"
                    onClick={() => {
                        if (value === '') {
                            openNotification('bottomRight');
                        }
                    }}
                >
                    <MdAdd />
                </button>
            </Context.Provider>
        </form>
    );
};

export default React.memo(TodoInsert);
