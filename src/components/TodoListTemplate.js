import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import './TodoListTemplate.scss';
import ColorContext from '../contexts/color';
import SelectColor from './SelectColor';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import moment from 'moment';

//TODO console 에러 잡기
const TodoListTemplate = ({ title }) => {
    const value = useContext(ColorContext);
    const date = moment().format('YYYY[년] MM[월] DD[일]');

    // 테마 변경은 전체에 먹혀야함
    const [isShowConfig, setIsShowConfig] = useState(false);
    const onClickThem = useCallback(() => {
        setIsShowConfig(!isShowConfig);
    }, [isShowConfig]);

    const [allDatas, setAllDatas] = useState(
        JSON.parse(localStorage.getItem('allDatas'))
    );

    // const allDatas = JSON.parse(localStorage.getItem('allDatas'));
    const todoIndex = allDatas.findIndex((todo) => todo.title === title);

    // currentTodos.current 를 사용해서 star,remove,check 를 해야 오류가 안남.
    // 렌더링 될때매다 특정작업을 수행
    // useEffect(() => {
    //     currentDatas.current = allDatas;
    //     console.log('rendering');
    // });

    // +new Date() : +를 붙이면 숫자로 만들어줌
    // 공백이면 경고창 => TodoInsert.js에서 Context를 사용함
    const onInsert = useCallback(
        (text, date) => {
            const todo = {
                id: +new Date(),
                text,
                date,
                checked: false,
                star: false,
            };
            allDatas[todoIndex].todos.push(todo);

            localStorage.setItem('allDatas', JSON.stringify(allDatas));
            setAllDatas(JSON.stringify(allDatas));
        },

        [allDatas]
    );

    // 원하는 항목 지우는 함수
    const onRemove = useCallback(
        (id) => {
            localStorage.setItem(
                'allDatas',
                JSON.stringify(
                    allDatas[todoIndex].todos.filter((todo) => todo.id !== id)
                )
            );
            setAllDatas(JSON.stringify(allDatas));
        },
        [allDatas]
    );

    //체크 하는 함수 만들기
    const onToggle = useCallback(
        (id) => {
            localStorage.setItem(
                'allDatas',
                JSON.stringify(
                    allDatas[todoIndex].todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, checked: !todo.checked }
                            : todo
                    )
                )
            );
            setAllDatas(JSON.stringify(allDatas));
        },
        [allDatas]
    );

    // 별 클릭시 색상 변경
    const onToggleStar = useCallback(
        (id) => {
            localStorage.setItem(
                'allDatas',
                JSON.stringify(
                    allDatas[todoIndex].todos.map((todo) =>
                        todo.id === id ? { ...todo, star: !todo.star } : todo
                    )
                )
            );
            setAllDatas(JSON.stringify(allDatas));
        },
        [allDatas]
    );

    // star로 sort()하는법
    const onTodoSort = useCallback(
        (a, b) => {
            let starA = a.star ? 0 : 1;
            let starB = b.star ? 0 : 1;
            return starA - starB;
        },
        [allDatas]
    );

    return (
        <div
            className="TodoListTemplate"
            style={{ background: value.state.color }}
            isShowConfig={isShowConfig}
            onClickThem={onClickThem}
            onClick={isShowConfig && onClickThem}
        >
            <SelectColor
                isShowConfig={isShowConfig}
                onClickThem={onClickThem}
            />
            <div className="title">{title}</div>

            <div className="contents">
                <TodoInsert onInsert={onInsert} />
                <TodoList
                    className="TodoList"
                    todos={allDatas[todoIndex].todos}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    onToggleStar={onToggleStar}
                    onTodoSort={onTodoSort}
                />
            </div>
        </div>
    );
};

export default TodoListTemplate;
