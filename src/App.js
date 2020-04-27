import React, { useCallback, useRef, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoResult from './components/TodoResult';
import { ColorConsumer, ColorProvider } from './contexts/color';

import { Layout, Menu } from 'antd';
import { SmileOutlined, StarOutlined } from '@ant-design/icons';

function App() {
    const { Content, Sider } = Layout;
    const [sider, setSider] = useState(false);

    const title = '';

    const onCollapse = (sider) => {
        console.log(sider);
        setSider(sider);
    };

    console.log('App Rendered');

    return (
        <ColorProvider>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={sider}
                    onCollapse={onCollapse}
                    style={{ width: '600px' }}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                    >
                        <Menu.Item>
                            <SmileOutlined />
                            <span>오늘의 할일</span>
                        </Menu.Item>
                        <Menu.Item>
                            <StarOutlined />
                            <span>중요</span>
                        </Menu.Item>
                        {/*<hr />*/}
                        <Menu.Item>
                            <StarOutlined />
                            <span>제목없는 목록</span>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout className="site-layout">
                    <div className="App">
                        <TodoTemplate title={title} />
                    </div>
                </Layout>
            </Layout>
        </ColorProvider>
    );
}

export default App;
