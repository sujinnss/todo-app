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
import { fromJS, is } from 'immutable';
import Anime from 'react-anime';
import moment from 'moment';
import TodoInsert from './TodoInsert';

const TodoItem = ({ todo, onRemove, onToggle, onToggleStar }) => {
    const { id, text, checked, star, date, parent } = todo;
    return (
        <Anime opacity={[0, 1]} translateX={[-40, 0]}>
            <div className="TodoItem">
                <div className="checkDate">
                    <div
                        className={cn('checkbox', { checked })}
                        onClick={() => onToggle(id)}
                    >
                        {checked ? (
                            <MdCheckCircle />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}
                    </div>
                    <div className="textDate">
                        <div className="text">{text}</div>
                        <div className="date">
                            {moment(date).format('YYYY[-]MM[-]DD')}
                        </div>
                    </div>
                </div>
                <div
                    className={cn('starbox', { star })}
                    onClick={() => onToggleStar(id)}
                >
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
        </Anime>
    );
};
// 컴포넌트의 리렌더링을 방지하기위해 React.memo를 사용한다
export default React.memo(TodoItem, (prevProps, nextProps) => {
    return is(fromJS(prevProps.todo), fromJS(nextProps.todo));
});
