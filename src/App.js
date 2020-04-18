import React, { useCallback, useRef, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoResult from './components/TodoResult';

function App() {
  const [todos, setTodos] = useState([]);

  const title = '';

  const done = 0;

  //id가 4부터 추가되기 때문
  const nextId = useRef(4);

  const onInsert = useCallback(
    (text) => {
      if (text === '') {
        alert('todo를 입력하세요');
      } else {
        const todo = {
          id: nextId.current,
          text,
          checked: false,
        };
        setTodos(todos.concat(todo));
        nextId.current += 1;
      }
    },
    [todos]
  );

  // 원하는 항목 지우는 함수
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

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
  return (
    <div className="App">
      <TodoTemplate title={title}>
        <TodoInsert onInsert={onInsert} />
        <TodoList
          todos={todos}
          onRemove={onRemove}
          onToggle={onToggle}
          onToggleStar={onToggleStar}
        />
        <TodoResult todos={todos}/>
      </TodoTemplate>
    </div>
  );
}

export default App;
