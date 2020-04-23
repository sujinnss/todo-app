import React, { useState } from 'react';
import './TodoTemplate.scss';
import { ColorConsumer, ColorProvider } from '../contexts/color';
import SelectColor from './SelectColor';

const TodoTemplate = ({ children }) => {
    return (
        <ColorProvider>
            <ColorConsumer>
                {(value) => (
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
                        <div className="contents">{children}</div>
                    </div>
                )}
            </ColorConsumer>
        </ColorProvider>
    );
};

export default TodoTemplate;
