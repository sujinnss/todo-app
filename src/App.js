import React, { useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 공부',
      checked: true,
    },
    {
      id: 2,
      text: '미들웨어 공부',
      checked: false,
    },
    {
      id: 3,
      text: 'thunck 공부',
      checked: true,
    },
  ]);

  return (
    <div className="App">
      <TodoTemplate>
        <TodoInsert />
        <TodoList todos={todos} />
      </TodoTemplate>
    </div>
  );
}

export default App;
