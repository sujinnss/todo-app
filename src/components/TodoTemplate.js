import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import './TodoTemplate.scss';
import ColorContext, { ColorConsumer, ColorProvider } from '../contexts/color';
import SelectColor from './SelectColor';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import { fromJS, is } from 'immutable';

const TodoTemplate = () => {
    const value = useContext(ColorContext);
    const [todos, setTodos] = useState([]);
    const currentTodos = useRef(todos)
    const nextId = useRef(1);

    useEffect(() => {
        currentTodos.current = todos
    })
    const onInsert = useCallback(
        (text, date) => {
            if (text === '') {
                alert('todo를 입력하세요');
            } else {
                const todo = {
                    id: nextId.current,
                    text,
                    date,
                    checked: false,
                    star: false,
                };
                setTodos(todos.concat(todo));
                nextId.current += 1;
            }
        },
        [todos]
    );


    // 원하는 항목 지우는 함수
    const onRemove = (id) => {
        console.log(currentTodos.current)
        console.log(todos)
        setTodos(currentTodos.current.filter((todo) => todo.id !== id));
    };

    //check하는 함수 만들기
    const onToggle = useCallback(
        (id) => {
            setTodos(
                todos.map((todo) =>
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
                todos.map((todo) =>
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
            className="TodoTemplate"
            style={{ background: value.state.color }}
        >
            <SelectColor />
            <input
                className="title"
                type="text"
                placeholder="제목을 입력하세요"
            />
            <div className="contents">
                <TodoInsert onInsert={onInsert} />
                <TodoList
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

export default TodoTemplate;
