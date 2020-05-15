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
import { useParams } from 'react-router';

//TODO console 에러 잡기
const TodoListTemplate = ({ allDatas, saveAll }) => {
    let { id } = useParams();

    const value = useContext(ColorContext);
    const date = moment().format('YYYY[년] MM[월] DD[일]');

    // 테마 변경은 전체에 먹혀야함
    const [isShowConfig, setIsShowConfig] = useState(false);
    const onClickThem = useCallback(() => {
        setIsShowConfig(!isShowConfig);
    }, [isShowConfig]);

    console.log('id는 ' + id);

    const tempIndex = allDatas.findIndex((todo) => todo.key === id);
    const todoIndex = tempIndex > -1 ? tempIndex : 0;

    // allDatas의 초기값은 allDatas의 0번째 배열 (즉 할일 목록)
    const [data, setData] = useState(allDatas[todoIndex]);
    const currentData = useRef(data);

    useEffect(() => {
        currentData.current = data;
    });

    useEffect(() => {
        let todoData = allDatas[todoIndex];
        setData(todoData);

        console.log(todoIndex);
        console.log('useEffect 실행');
        console.log('todoIndex: ' + todoIndex);
        console.log('init: ' + JSON.stringify(todoData));
        console.log('data: ' + JSON.stringify(data));
    }, [id]);

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
                parent: id,
            };

            const result = {
                ...currentData.current,
                todos: currentData.current.todos.concat(todo),
            };
            setData(result);
            const allDatasClone = allDatas.slice();
            allDatasClone.splice(todoIndex, 1, result);
            saveAll(allDatasClone);
            console.log(todoIndex);
            console.log(result);
            console.log('현재 data: ' + JSON.stringify(data));
            console.log('현재 입력값은:' + JSON.stringify(todo) + '입력됨');
            console.log(allDatas);
        },
        [data]
    );

    // 원하는 항목 지우는 함수
    const onRemove = useCallback(
        (id) => {
            const result = {
                ...currentData.current,
                todos: currentData.current.todos.filter(
                    (todo) => todo.id !== id
                ),
            };
            setData(result);
            const allDatasClone = allDatas.slice();
            allDatasClone.splice(todoIndex, 1, result);
            saveAll(allDatasClone);

            console.log('remove 실행');
        },
        [data]
    );

    //체크 하는 함수 만들기
    const onToggle = useCallback(
        (id) => {
            const result = {
                ...currentData.current,
                todos: currentData.current.todos.map((todo) =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo
                ),
            };
            setData(result);
            const allDatasClone = allDatas.slice();
            allDatasClone.splice(todoIndex, 1, result);
            saveAll(allDatasClone);

            console.log(id);
            console.log(todoIndex);
            console.log(result);
            // setAllDatas(JSON.stringify(allDatas));
        },
        [data]
    );

    // 별 클릭시 색상 변경
    const onToggleStar = useCallback(
        (id) => {
            const result = {
                ...currentData.current,
                todos: currentData.current.todos.map((todo) =>
                    todo.id === id ? { ...todo, star: !todo.star } : todo
                ),
            };

            setData(result);
            const allDatasClone = allDatas.slice();
            allDatasClone.splice(todoIndex, 1, result);
            saveAll(allDatasClone);

            console.log(id);
            console.log(todoIndex);
            console.log(result);
        },
        [data]
    );

    // star로 sort()하는법
    const onTodoSort = useCallback(
        (a, b) => {
            let starA = a.star ? 0 : 1;
            let starB = b.star ? 0 : 1;
            return starA - starB;
        },
        [data]
    );

    // star에 넣는 리스트

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
            <div className="title">{data.title}</div>

            <div className="contents">
                <TodoInsert onInsert={onInsert} />
                <TodoList
                    className="TodoList"
                    todos={data.todos}
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
