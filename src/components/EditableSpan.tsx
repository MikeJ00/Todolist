import React, {useState} from "react";
type PropsType={
    title:string
}
export const EditableSpan = (props:PropsType) => {
    const [edit, setEdit]=useState(false)
    const editFooHandler=()=>{
        setEdit(!edit)
    }
    return (
            edit
            ?<input value={props.title} onBlur={editFooHandler}/>
            :<span onDoubleClick={editFooHandler}>{props.title}</span>
    );
};
