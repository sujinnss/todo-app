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
import index from 'babel-plugin-import/src';

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
                star: id === 'star',
                parent: id === undefined ? 'todo' : id,
            };

            const result = {
                ...currentData.current,
                todos: currentData.current.todos.concat(todo),
            };
            setData(result);
            const allDatasClone = allDatas.slice();
            allDatasClone.splice(todoIndex, 1, result);

            // star에 입력할때 star에도 추가되고 할일에도 추가
            if (id === 'star') {
                const todoData = allDatas.find((data) => data.key === '/');
                const todoIndex = allDatas.findIndex(
                    (data) => data.key === '/'
                );
                todoData.todos.push(todo);
                allDatasClone.splice(todoIndex, 1, todoData);
            }

            saveAll(allDatasClone);
            // console.log(todoIndex);
            // console.log(result);
            // console.log('현재 data: ' + JSON.stringify(data));
            // console.log('현재 입력값은:' + JSON.stringify(todo) + '입력됨');
            // console.log(allDatas);
        },
        [data]
    );

    // 원하는 항목 지우는 함수
    // star에서 삭제시 todo에서도 삭제
    // star가 true인 todos를 삭제시 star에 들어가있는 것도 삭

    const onRemove = useCallback(
        (id) => {
            let removableTodo;
            const result = {
                ...currentData.current,
                todos: currentData.current.todos
                    .map((todo) => {
                        if (todo.id === id) {
                            removableTodo = todo;
                            return false;
                        } else {
                            return todo;
                        }
                    })
                    .filter((todo) => todo),
            };
            console.log(result.todos);

            //할일의 todos와 같은내용 star 페이지에서 삭제
            const starData = allDatas.find((data) => data.key === 'star');
            const starIndex = allDatas.findIndex((data) => data.key === 'star');

            // "star"에서 지운거 "할일 or 예시" 에서 지우기
            // const starResult = starData.todos.find((todo) => todo.id === id);
            // console.log(starResult);

            // "할일 or 예시" 에서 지운거 star 에서 지우기
            // removableTodo랑 같은 id를 가진 것을  중요에서 찾아서 삭제
            const starRemove = starData.todos.find((todo) => todo.id === id);
            if (starRemove !== undefined) {
                const StarIndex = starData.todos.findIndex(
                    (todo) => todo.id === id
                );
                console.log(starIndex);
                starData.todos.splice(StarIndex, 1);
            }
            console.log(starRemove);

            setData(result);
            const allDatasClone = allDatas.slice();
            allDatasClone.splice(todoIndex, 1, result);
            allDatasClone.splice(starIndex, 1, starData);
            saveAll(allDatasClone);

            console.log('remove 실행');
        },
        [data]
    );

    //체크 하는 함수 만들기
    //star와 연동하
    const onToggle = useCallback(
        (id) => {
            const result = {
                ...currentData.current,
                todos: currentData.current.todos.map((todo) =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo
                ),
            };

            //star 페이지의 checked에 연동
            const starData = allDatas.find((data) => data.key === 'star');
            const starIndex = allDatas.findIndex((data) => data.key === 'star');
            const starCheck = result.todos.find(
                (todo) => todo.id === id && todo.checked
            );
            if (starCheck !== undefined) {
                const StarIndex = starData.todos.findIndex(
                    (todo) => todo.id === id
                );
            }

            setData(result);
            const allDatasClone = allDatas.slice();
            allDatasClone.splice(todoIndex, 1, result);
            saveAll(allDatasClone);

            // console.log(id);
            // console.log(todoIndex);
            // console.log(result);
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

            const starData = allDatas.find((data) => data.key === 'star');
            const starIndex = allDatas.findIndex((data) => data.key === 'star');
            // star페이지의 todos에 Insert
            const starDone = result.todos.find(
                (todo) => todo.id === id && todo.star
            );
            if (starDone !== undefined) {
                starData.todos.push(starDone);
            }

            // star페이지의 todos remove
            const unStarDone = result.todos.find(
                (todo) => todo.id === id && !todo.star
            );
            console.log(unStarDone);
            if (unStarDone !== undefined) {
                const unStarIndex = result.todos.findIndex(
                    (todo) => todo.id === id
                );
                starData.todos.splice(unStarIndex, 1);
            }

            setData(result);
            const allDatasClone = allDatas.slice();
            allDatasClone.splice(todoIndex, 1, result);
            allDatasClone.splice(starIndex, 1, starData);
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
