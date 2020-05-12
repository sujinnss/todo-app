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

    // const title = '';

    const onCollapse = (sider) => {
        console.log(sider);
        setSider(sider);
    };
    // TODO refresh 할 경우 라우터 수정
    // console.log('App Rendered');
    // defaultSelectedKeys={['1']} : Menu.Item의 key=1을 선택한 상태로 시작
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
                        defaultSelectedKeys={['1']}
                        mode="inline"
                    >
                        <Menu.Item
                            key="1"
                            style={{
                                margin: '0px',
                                height: '50px',
                                lineHeight: '50px',
                            }}
                        >
                            <Link to="/today">
                                <SmileOutlined />
                                <span>할일</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key="2"
                            style={{
                                margin: '0px',
                                height: '50px',
                                lineHeight: '50px',
                            }}
                        >
                            <Link to="/star">
                                <StarOutlined />
                                <span>중요</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key="3"
                            style={{
                                margin: '0px',
                                height: '50px',
                                lineHeight: '50px',
                            }}
                        >
                            <Link to="/list">
                                <CopyOutlined />
                                <span>제목없는 목록</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <div className="App">
                        <Route
                            path={['/', '/today']}
                            component={TodoListTemplate}
                            exact={true}
                        />
                        <Route
                            path="/star"
                            component={TodoStarItem}
                            exact={true}
                        />
                        <Route
                            path="/list"
                            component={TodoTemplate}
                            exact={true}
                        />
                    </div>
                </Layout>
            </Layout>
        </ColorProvider>
    );
}

export default App;
