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
import { remove } from 'immutable';

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
    const currentIndex = tempIndex > -1 ? tempIndex : 0;

    // allDatas의 초기값은 allDatas의 0번째 배열 (즉 할일 목록)
    const [data, setData] = useState(allDatas[currentIndex]);
    const currentData = useRef(data);

    useEffect(() => {
        currentData.current = data;
    });

    useEffect(() => {
        let todoData = allDatas[currentIndex];
        setData(todoData);

        console.log(currentIndex);
        console.log('useEffect 실행');
        console.log('todoIndex: ' + currentIndex);
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
            allDatasClone.splice(currentIndex, 1, result);

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
        },
        [data]
    );

    // 원하는 항목 지우는 함수
    // star에서 삭제시 todo에서도 삭제
    // star가 true인 todos를 삭제시 star에 들어가있는 것도 삭

    const removeInStar = (removableTodo, result) => {
        const allDatasClone = allDatas.slice();

        const todoInData = allDatas.find((data) => data.key === '/');
        const todoInIndex = allDatas.findIndex((data) => data.key === '/');
        const exInData = allDatas.find((data) => data.key === 'ex');
        const exInIndex = allDatas.findIndex((data) => data.key === 'ex');

        if (
            removableTodo.parent === 'todo' ||
            removableTodo.parent === 'star'
        ) {
            const todoSameIndex = todoInData.todos.findIndex(
                (todo) => todo.id === removableTodo.id
            );
            setData(result);
            todoInData.todos.splice(todoSameIndex, 1);
            allDatasClone.splice(currentIndex, 1, result);
            allDatasClone.splice(todoInIndex, 1, todoInData);
        } else if (removableTodo.parent === 'ex') {
            const exSameIndex = exInData.todos.findIndex(
                (todo) => todo.id === removableTodo.id
            );
            setData(result);
            exInData.todos.splice(exSameIndex, 1);
            allDatasClone.splice(currentIndex, 1, result);
            allDatasClone.splice(exInIndex, 1, exInData);
        }
        saveAll(allDatasClone);
    };

    const removeInNoStar = (removableTodo, result) => {
        const allDatasClone = allDatas.slice();

        //할일의 todos와 같은내용 star 페이지에서 삭제
        const starInData = allDatas.find((data) => data.key === 'star');
        const starInIndex = allDatas.findIndex((data) => data.key === 'star');

        const starSameIndex = starInData.todos.findIndex(
            (todo) => todo.id === removableTodo.id
        );
        starInData.todos.splice(starSameIndex, 1);
        setData(result);

        allDatasClone.splice(currentIndex, 1, result);
        allDatasClone.splice(starInIndex, 1, starInData);
        saveAll(allDatasClone);
    };

    const onRemove = useCallback(
        (todoId) => {
            let removableTodo;
            // 현재 찍은 애를 제외하고 나머지 투두를 구함 + 사이드이펙트(삭제한 애가 removableTodo에 담김)
            const result = {
                ...currentData.current,
                todos: currentData.current.todos
                    .map((todo) => {
                        if (todo.id === todoId) {
                            removableTodo = todo;
                            return false;
                        } else {
                            return todo;
                        }
                    })
                    .filter((todo) => todo),
            };

            if (id === 'star') {
                removeInStar(removableTodo, result);
            } else {
                removeInNoStar(removableTodo, result);
            }
        },
        [data, currentIndex]
    );

    //체크 하는 함수 만들기
    const onToggle = useCallback(
        (todoId) => {
            let removableTodo;
            const todoInData = allDatas.find((data) => data.key === '/');
            const todoInIndex = allDatas.findIndex((data) => data.key === '/');
            const exInData = allDatas.find((data) => data.key === 'ex');
            const exInIndex = allDatas.findIndex((data) => data.key === 'ex');
            const starInData = allDatas.find((data) => data.key === 'star');
            const starInIndex = allDatas.findIndex(
                (data) => data.key === 'star'
            );

            const allDatasClone = allDatas.slice();

            const result = {
                ...currentData.current,
                todos: currentData.current.todos.map((todo) => {
                    if (todo.id === todoId) {
                        removableTodo = todo;
                        return { ...todo, checked: !todo.checked };
                    }
                    return todo;
                }),
            };
            // check를 star에서 할 때
            if (id === 'star') {
                console.log(todoId);
                if (removableTodo.parent === 'todo') {
                    const todoChange = {
                        ...todoInData,
                        todos: todoInData.todos.map((todo) =>
                            todo.id === removableTodo.id
                                ? { ...todo, checked: !todo.checked }
                                : todo
                        ),
                    };
                    setData(result);
                    allDatasClone.splice(todoInIndex, 1, todoChange);
                    allDatasClone.splice(currentIndex, 1, result);
                    saveAll(allDatasClone);
                } else if (removableTodo.parent === 'ex') {
                    const exChange = {
                        ...exInData,
                        todos: exInData.todos.map((todo) =>
                            todo.id === removableTodo.id
                                ? { ...todo, checked: !todo.checked }
                                : todo
                        ),
                    };
                    setData(result);
                    allDatasClone.splice(exInIndex, 1, exChange);
                    allDatasClone.splice(currentIndex, 1, result);
                    saveAll(allDatasClone);
                }
            } else {
            }

            //star 페이지의 checked에 연동 ==> 수정 필요

            const starCheck = result.todos.find((todo) => todo.id === todoId);

            if (starCheck !== undefined) {
                const starSameIndex = starInData.todos.findIndex(
                    (todo) => todo.id === todoId
                );
                starInData.todos.splice(starSameIndex, 1);
                setData(result);
                allDatasClone.splice(starInIndex, 1, starInData);
                allDatasClone.splice(currentIndex, 1, result);
                saveAll(allDatasClone);
            }
        },
        [data, currentIndex]
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
            allDatasClone.splice(currentIndex, 1, result);
            allDatasClone.splice(starIndex, 1, starData);
            saveAll(allDatasClone);

            console.log(id);
            console.log(currentIndex);
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
