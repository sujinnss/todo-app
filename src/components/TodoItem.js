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
    const { id, text, checked, star, date } = todo;
    // console.log(moment(date).format('YYYY[-]MM[-]DD'))
    return (
        <Anime opacity={[0, 1]} translateX={[-250, 0]}>
            <div className="TodoItem">
                <div
                    className={cn('checkbox', { checked })}
                    onClick={() => onToggle(id)}
                >
                    {checked ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
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
export default TodoItem;
// export default React.memo(TodoItem, (prevProps, nextProps) => {
//     // 다르면 memo를 하지 않음
//     if (!is(fromJS(prevProps.todo), fromJS(nextProps.todo))) {
//         return false
//     }
//     // 같으면 memo
//     return true
// });
