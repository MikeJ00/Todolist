import React from 'react';
type buttonPropsType={
    name:string
    callBack:()=>void
    // универсальная функция callback, для того чтобы в этой фенкции
    // было 3 других функции addTaskHandler removeTaskHandler filterTasks
}
export const Button=(props:buttonPropsType)=>{
    const onClickHandler=()=>{
        props.callBack()
    }
    return(
        <button onClick={onClickHandler}>{props.name}</button>
    )
}