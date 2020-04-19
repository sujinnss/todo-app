import React, { useCallback, useState } from 'react';
import './TodoTemplate.scss';
import { MdLens } from "react-icons/md";


const TodoTemplate = ({children}) => {
    const [color,setColor] = useState("#6374bc");

  return (
      <div className="TodoTemplate"  style={{backgroundColor:color}}>
          <input className="title" type="text" placeholder="제목을 입력하세요" />
          <div className="contents">{children}</div>
          <div className="color">
              <button className="c1" onClick={()=>setColor("#6374bc")}><MdLens/></button>
              <button className="c2" onClick={()=>setColor("#639dbc")}><MdLens/></button>
              <button className="c3" onClick={()=>setColor("#bc637f")}><MdLens/></button>
              <button className="c4" onClick={()=>setColor("#70bc63")}><MdLens/></button>
          </div>
      </div>
  );
};

export default TodoTemplate;
