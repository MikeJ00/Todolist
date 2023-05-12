import {TodolistsType} from "../App";

export const TodolistsReducer=(state:TodolistsType[], action:RootTypeAction):TodolistsType[] =>{
    switch (action.type){
        case "REMOVE-TODOLIST":{

            // setTodolist(todolist.filter(el=>el.id!==todolistID))
            return state.filter(el=>el.id !== action.payload.todolistID)
            // return [...state, state.filter(el=>el.id !== action.payload.todolistID)]
        }
        default:return state
    }
}

type RootTypeAction = removeTodolistACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID:string) =>{
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistID
        }
    } as const
}