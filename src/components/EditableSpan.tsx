import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    callBack: (oldTitle: string) => void
    oldtitle: string
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(props.oldtitle)

    const onChangeHandler=(e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    const addTask = () => {
            props.callBack(updateTitle);
    }
    const onDoubleClickHandler=()=>{
        setEdit(!edit)
        edit && addTask()
    }
    return (
        edit
            ? <input onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus value={updateTitle}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldtitle}</span>
    );
};

