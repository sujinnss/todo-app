import React, { useCallback, useRef, useState } from 'react';
import { ColorConsumer } from '../contexts/color';
import { MdMoreHoriz } from 'react-icons/md';
import './SelectColor.scss';
import Anime from 'react-anime';
import cn from 'classnames';

const colors = [
    '#6374bc',
    '#bc6387',
    '#bc7f63',
    '#aaa881',
    '#7bbc63',
    '#6398bc',
    '#7663bc',
    '#757e7f',
];

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
            <Anime opacity={[1, 1]} translateY={[-10, 0]}>
                <ColorConsumer>
                    {({ actions }) => (
                        <>
                            {isShowConfig && (
                                <div className="sample">
                                    <div className="outerColorBox">
                                        <div
                                            style={{
                                                fontSize: '15px',
                                                marginBottom: '10px',
                                                padding: '5px 0',
                                                borderBottom: '1px solid gray',
                                                color: 'black',
                                            }}
                                        >
                                            테마 변경
                                        </div>
                                        {colors.map((color) => (
                                            <div
                                                className="colorBox"
                                                key={color}
                                                style={{
                                                    background: color,
                                                }}
                                                onClick={() =>
                                                    actions.setColor(color)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </ColorConsumer>
            </Anime>
        </div>
    );
};

export default React.memo(SelectColor);
