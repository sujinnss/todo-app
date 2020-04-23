import React, { useCallback, useState } from 'react';
import { ColorConsumer } from '../contexts/color';
import { MdMoreHoriz } from 'react-icons/md';
import './SelectColor.scss';

const colors = ['red', 'orange', 'yellow', 'green', 'pink', 'indigo'];

const SelectColor = () => {
    const [isShowConfig, setIsShowConfig] = useState(false);

    return (
        <div className="SelectColor">
            <button
                className="color"
                onClick={() => setIsShowConfig(!isShowConfig)}
            >
                <MdMoreHoriz />
            </button>
            <ColorConsumer>
                {({ actions }) => (
                    <>
                        {isShowConfig && (
                            <div className="sample" style={{ display: 'flex' }}>
                                {colors.map((color) => (
                                    <div
                                        className="colorBox"
                                        key={color}
                                        style={{
                                            background: color,
                                            width: '24px',
                                            height: '24px',
                                        }}
                                        onClick={() => actions.setColor(color)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </ColorConsumer>
        </div>
    );
};

export default SelectColor;
