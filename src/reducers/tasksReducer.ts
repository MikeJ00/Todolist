import React, {useState} from "react";
// import {TaskType} from "../Todolist";

// export const tasksReducer=(state:TaskType[], action:TsarType)=>{
//    switch (action.type){
//        case "REMOVE_TASK":{
//            return state.filter(t=>t.id!==action.payload.todolistID)
//        }
//        // default:return console.log("Vse propalo") 1 варинт написания
//        default: return state
//    }
// }
// type TsarType=RemoveTaskACtype
// export type RemoveTaskACtype=ReturnType<typeof removeTaskAC>
//
// export const removeTaskAC=(todolistID:string)=>{
//     return{
//         type:"REMOVE_TASK",
//         payload:{
//             todolistID
//         }
//     } as const
// }