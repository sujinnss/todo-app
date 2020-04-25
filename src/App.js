import React, { useCallback, useRef, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoResult from './components/TodoResult';

import { Layout, Menu, } from 'antd';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';


function App() {

    const { Header, Content, Sider } = Layout;
    const [sider, setSider] = useState(false);


    const [todos, setTodos] = useState([]);
    const title = '';

    const onCollapse = sider => {
        console.log(sider);
        setSider(sider);
    };

    const nextId = useRef(1);

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
                    star: false
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
    const onTodoSort = (a, b) => {
        let starA = a.star ? 0 : 1;
        let starB = b.star ? 0 : 1;
        return starA - starB;
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider collapsible collapsed={sider} onCollapse={onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item >
                        <PieChartOutlined/>
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item >
                        <DesktopOutlined/>
                        <span>Option 2</span>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <div className="App">
                    <TodoTemplate title={title}>
                        <TodoInsert onInsert={onInsert}/>
                        <TodoList
                            todos={todos}
                            onRemove={onRemove}
                            onToggle={onToggle}
                            onToggleStar={onToggleStar}
                            onTodoSort={onTodoSort}
                        />
                        <TodoResult todos={todos}/>
                    </TodoTemplate>
                </div>
            </Layout>

        </Layout>
    );
}

export default App;
