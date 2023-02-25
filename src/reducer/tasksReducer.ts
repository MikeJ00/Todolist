import React, {useState} from "react";
// import {TaskType} from "../Todolist"
// import {v1} from "uuid";
//
// export const tasksReducer=(state:TaskType[], action:TsarType)=>{
//     switch (action.type){
//         case "REMOVE_TASK":{
//             // let filteredTasks = tasks.filter(t => t.id != id);
//             return state.filter(el=>el.id!==action.payload.id)
//         }
//         case "ADD-TASK":{
//             let newTask = {id: v1(), title: action.payload.title, isDone: false};
//             return [newTask,...state]
//         }
//         // default:return console.log("Vse propalo") 1 варинт написания
//         default: return state
//     }
// }
// type TsarType=RemoveTaskACtype | addTaskACType
// export type RemoveTaskACtype=ReturnType<typeof removeTaskAC>
//
// export const removeTaskAC=(id:string)=>{
//     return{
//         type:"REMOVE_TASK",
//         payload:{
//             id
//         }
//     } as const
// }
//
// export type addTaskACType = ReturnType<typeof addTaskAC>
// export const addTaskAC=(title:string)=>{
//     return{
//         type:"ADD-TASK",
//         payload:{
//             title
//         }
//     }as const
// }