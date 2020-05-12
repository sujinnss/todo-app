import React, { useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoListTemplate from './components/TodoListTemplate';
import { ColorProvider } from './contexts/color';
import { Layout, Menu } from 'antd';
import { SmileOutlined, StarOutlined, CopyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import Route from 'react-router-dom/es/Route';
import { Route } from 'react-router-dom';
import TodoStarItem from './components/TodoStarItem';
import SelectColor from './components/SelectColor';

function App() {
    const { Sider } = Layout;
    const [sider, setSider] = useState(false);
    const onCollapse = (sider) => {
        console.log(sider);
        setSider(sider);
    };

    const allDatas = [
        { key: '/', title: '할일', todos: [] },
        { key: 'star', title: '중요', todos: [] },
        { key: 'ex', title: '예시', todos: [] },
    ];

    localStorage.setItem('allDatas', JSON.stringify(allDatas));

    return (
        <ColorProvider>
            <Layout
                style={{ minHeight: '100vh' }}
                onClick={(e) => {
                    console.log('App clicked! popup false');
                }}
            >
                <Sider
                    collapsible
                    collapsed={sider}
                    onCollapse={onCollapse}
                    style={{ width: '600px' }}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['/']}
                        mode="inline"
                    >
                        {allDatas.map((list) => (
                            <Menu.Item
                                key={list.key}
                                style={{
                                    margin: '0px',
                                    height: '50px',
                                    lineHeight: '50px',
                                }}
                            >
                                <Link to={list.key}>{list.title}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <div className="App">
                        <Route
                            path="/"
                            exact
                            children={<TodoListTemplate title={'할일'} />}
                        />
                        <Route
                            path="/star"
                            children={<TodoListTemplate title={'중요'} />}
                        />
                        <Route
                            path="/ex"
                            children={<TodoListTemplate title={'예시'} />}
                        />
                    </div>
                </Layout>
            </Layout>
        </ColorProvider>
    );
}

export default App;
