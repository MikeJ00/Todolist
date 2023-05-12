 import React from 'react';
import styles from "../Todolist.module.css";
import {FilterValuesType} from "../App";

type buttonPropsType={
    name:string
    callBack:()=>void
    className?:any
    Filter?:FilterValuesType
    // универсальная функция callback, для того чтобы в этой фенкции
    // было 3 других функции addTaskHandler removeTaskHandler filterTasks
}
export const Button=(props:buttonPropsType)=>{
    const onClickHandler=()=>{
        props.callBack()

    }
    return(
        <button className={props.name===props.Filter? styles.activeFilter : " "} onClick={onClickHandler}>{props.name}</button>
    )
}