import React, { useCallback, useRef, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import Test from './components/Test';
import { ColorProvider } from './contexts/color';
import { Layout, Menu } from 'antd';
import { SmileOutlined, StarOutlined, CopyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/es/Route';
import Star from './components/Star';

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
                            <Link to="/today">
                                <SmileOutlined />
                                <span>오늘의 할일</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/star">
                                <StarOutlined />
                                <span>중요</span>
                            </Link>
                        </Menu.Item>
                        <hr style={{ border: '0.5px solid gray' }} />
                        <Menu.Item>
                            <Link to="/test">
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
                            component={TodoTemplate}
                            exact={true}
                        />
                        <Route path="/star" component={Star} exact={true} />
                        <Route path="/test" component={Test} exact={true} />
                    </div>
                </Layout>
            </Layout>
        </ColorProvider>
    );
}

export default App;
