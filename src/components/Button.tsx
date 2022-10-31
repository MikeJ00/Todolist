import React from 'react';
type buttonPropsType={
    name:string
}
export const Button=(props:buttonPropsType)=>{
    return(
        <button>{props.name}</button>
    )
}