import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistsType[], action: RootTypeAction): TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            // setTodolist(todolist.filter(el=>el.id!==todolistID))
            return state.filter(el => el.id !== action.payload.todolistID)
            // return [...state, state.filter(el=>el.id !== action.payload.todolistID)]
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistsType = {id: action.payload.todolistID, title: action.payload.newTitle, filter: "active"}
            return [...state, newTodolist]
        }
        case "CHANGE-TODO-TITLE": {
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            // setTodolist(todolist.map(e=>e.id === todolistID ? {...e, isDone:value } : e));
            return state.map((e=>e.id === action.payload.todolistID ? {...e, isDone:action.payload.filterValue } : e))
        }
        default:
            return state
    }
}

type RootTypeAction = removeTodolistACType
    | addTodolistACType
    | editTodoACType
    | changeFilterACType

export type removeTodolistACType = ReturnType<typeof RemoveTodolistAC>
type editTodoACType = ReturnType<typeof EditTodoAC>
type changeFilterACType = ReturnType<typeof ChangeFilterAC>
export const RemoveTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistID
        }
    } as const
}
export type addTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTitle,
            todolistID:v1()
        }
    } as const
}
export const EditTodoAC = (todolistID: string, newTitle: string) => {
    return {
        type: "CHANGE-TODO-TITLE",
        payload: {
            todolistID,
            newTitle
        }
    } as const
}
export const ChangeFilterAC = (todolistID: string, filterValue: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistID,
            filterValue
        }
    } as const
}