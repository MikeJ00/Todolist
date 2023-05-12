import React, {useState} from "react";
import {TaskType} from "../Todolist";
import {v1} from "uuid";

type RootType = removeTasksACType | addTaskReturnACType | changeCheckBoxReturnACType
type removeTasksACType = ReturnType<typeof removeTasksAC>
type addTaskReturnACType = ReturnType<typeof addTaskAC>
type changeCheckBoxReturnACType = ReturnType<typeof changeCheckBoxAC>

export const tasksReducer= (state:TaskType[], action:RootType)=>{
    switch (action.type) {
        case "REMOVE-TASK":{
            return state.filter(el=>el.id !== action.payload.taskID)
        }
        case "ADD-TASK":{
            let newTask={ id: v1(), title: action.payload.newTitle, isDone: false }
            return [...state, newTask]
        }
        case "CHANGE-CHECKBOX":{
            return state.map((el => el.id === action.payload.taskID ? {...el, isDone: action.payload.eventValue} : el))

        }
        default: return state
    }
}
export const removeTasksAC = (taskID:string) =>{
    return {
        type:"REMOVE-TASK",
        payload:{
            taskID
        }
    } as const
}
export const addTaskAC = (newTitle:string) => {
    return {
        type: "ADD-TASK",
        payload:{
            newTitle
        }
    } as const
}
export const changeCheckBoxAC = (taskID:string, eventValue:boolean) =>{
    return {
        type: "CHANGE-CHECKBOX",
        payload: {
            taskID,
            eventValue
        }
    }as const
}