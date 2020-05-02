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

const TodoListTemplate = () => {
    const value = useContext(ColorContext);
    const date = moment().format('YYYY[년] MM[월] DD[일]');
    const [todos, setTodos] = useState([]);
    const currentTodos = useRef(todos);
    const nextId = useRef(1);

    // 테마 변경은 전체에 먹혀야함
    const [isShowConfig, setIsShowConfig] = useState(false);
    const onClickThem = () => {
        setIsShowConfig(!isShowConfig);
    };

    // currentTodos.current 를 사용해서 star,remove,check 를 해야 오류가 안남.
    // 렌더링 될때매다 특정작업을 수행
    useEffect(() => {
        currentTodos.current = todos;
    });

    // 공백이면 경고창 => TodoInsert.js에서 Context를 사용함
    const onInsert = useCallback(
        (text, date) => {
            const todo = {
                id: nextId.current,
                text,
                date,
                checked: false,
                star: false,
            };
            setTodos(todos.concat(todo));
            nextId.current += 1;
        },
        [todos]
    );

    // 원하는 항목 지우는 함수
    const onRemove = (id) => {
        console.log(currentTodos.current);
        console.log(todos);
        setTodos(currentTodos.current.filter((todo) => todo.id !== id));
    };

    //check하는 함수 만들기
    const onToggle = useCallback(
        (id) => {
            setTodos(
                currentTodos.current.map((todo) =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo
                )
            );
        },
        [todos]
    );

    // 별 클릭시 색상 변경
    const onToggleStar = useCallback(
        (id) => {
            setTodos(
                currentTodos.current.map((todo) =>
                    todo.id === id ? { ...todo, star: !todo.star } : todo
                )
            );
        },
        [todos]
    );

    // star로 sort()하는법
    const onTodoSort = useCallback((a, b) => {
        let starA = a.star ? 0 : 1;
        let starB = b.star ? 0 : 1;
        return starA - starB;
    }, []);

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
            <div className="title">
                오늘의 할 일<p>{date}</p>
            </div>

            <div className="contents">
                <TodoInsert onInsert={onInsert} />
                <TodoList
                    className="TodoList"
                    todos={todos}
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
