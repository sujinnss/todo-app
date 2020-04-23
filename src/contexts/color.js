import React from 'react';
import {createContext,useState} from 'react';

const ColorContext = createContext({
    state:{color:"blue"},
    actions:{
        setColor:()=>{}
    }
});

const ColorProvider = ({children}) => {
    const [color,setColor] = useState('#6374bc');
    const value = {
        state:{color},
        actions:{setColor}
    };
    return(
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
};

const ColorConsumer = ColorContext.Consumer;
export {ColorProvider,ColorConsumer};

export default ColorContext;