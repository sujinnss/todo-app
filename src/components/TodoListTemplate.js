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
import { remove, set } from 'immutable';
import Anime from 'react-anime';

//TODO console 에러 잡기
const TodoListTemplate = () => {
    const value = useContext(ColorContext);
    const date = moment().format('YYYY[년] MM[월] DD[일]');
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem('todos')) || []
    );
    const [complete, setComplete] = useState(
        JSON.parse(localStorage.getItem('complete')) || []
    );

    const currentTodos = useRef(todos);
    const currentComplete = useRef(complete);

    // const nextId = useRef(1);

    // 테마 변경은 전체에 먹혀야함
    const [isShowConfig, setIsShowConfig] = useState(false);
    const onClickThem = useCallback(() => {
        setIsShowConfig(!isShowConfig);
    }, [isShowConfig]);

    // currentTodos.current 를 사용해서 star,remove,check 를 해야 오류가 안남.
    // 렌더링 될때매다 특정작업을 수행
    useEffect(() => {
        currentTodos.current = todos;
        currentComplete.current = complete;
        updateStarList(currentTodos.current);
        // updateCompleteList(currentComplete.current);
    });

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
            localStorage.setItem(
                'todos',
                JSON.stringify(currentTodos.current.concat(todo))
            );
            setTodos(todos.concat(todo));
            // nextId.current += 1;
        },
        [todos]
    );

    // 원하는 항목 지우는 함수
    const onRemove = useCallback(
        (id) => {
            // console.log(currentTodos.current);
            localStorage.setItem(
                'todos',
                JSON.stringify(
                    currentTodos.current.filter((todo) => todo.id !== id)
                )
            );
            setTodos(currentTodos.current.filter((todo) => todo.id !== id));
        },
        [todos]
    );

    //체크 하는 함수 만들기 ->
    //TODO 완료시 완료된 list로 추가
    const onToggle = useCallback(
        (id) => {
            localStorage.setItem(
                'todos',
                JSON.stringify(
                    currentTodos.current.filter((todo) => todo.id !== id)
                )
            );
            setTodos(currentTodos.current.filter((todo) => todo.id !== id));

            //localStorage의 complete에 들어가는 내용
            localStorage.setItem(
                'complete',
                JSON.stringify(
                    currentComplete.current.concat(
                        currentTodos.current.filter((todo) => todo.id === id)
                    )
                )
            );
            setComplete(
                complete.concat(
                    currentTodos.current.filter((todo) => todo.id === id)
                )
            );
        },
        [todos]
    );

    // 별 클릭시 색상 변경 & 그와 동시에 그 todo는 중요 라우터에 복사된다.
    const onToggleStar = useCallback(
        (id) => {
            localStorage.setItem(
                'todos',
                JSON.stringify(
                    currentTodos.current.map((todo) =>
                        todo.id === id ? { ...todo, star: !todo.star } : todo
                    )
                )
            );
            setTodos(
                currentTodos.current.map((todo) =>
                    todo.id === id ? { ...todo, star: !todo.star } : todo
                )
            );
        },
        [todos]
    );
    // star가 true일 경우 localStorage 의 stars 에 넣는 함수
    const updateStarList = (todos) => {
        localStorage.setItem(
            'stars',
            JSON.stringify(todos.filter((todo) => todo.star === true))
        );
    };

    // //checkout이 true 일 경우 localStorage의 complete에 넣는 함수
    // const updateCompleteList = (todos) => {
    //     localStorage.setItem(
    //         'complete',
    //         JSON.stringify(todos.filter((todo) => todo.checked === true))
    //     );
    // };

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
            <div className="title">할 일</div>

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
