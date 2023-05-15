import React from "react";
import {TaskType} from "../Todolist";


type PropsType = {
    callBack:(tasks:Array<TaskType>)=>void
    isDone:boolean
}
export const SuperCheckbox = (props:PropsType) => {
    const onChangeHandler=()=>{
        props.callBack(tasks)
    }
    return (
        <input type="text"
               onChange={onChangeHandler}
               checked={props.isDone}/>

    );
};

