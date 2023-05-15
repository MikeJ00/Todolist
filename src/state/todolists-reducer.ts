import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export const TodolistsReducer = (state: TodolistsType[], action: RootTypeAction): TodolistsType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {

            // setTodolist(todolist.filter(el=>el.id!==todolistID))
            return state.filter(el => el.id !== action.payload.todolistID)
            // return [...state, state.filter(el=>el.id !== action.payload.todolistID)]
        }
        case "ADD-TODOLIST": {
            const newTodoID = v1();
            const newTodolist: TodolistsType = {id: newTodoID, title: action.payload.newTitle, isDone: "active"}
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

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistID
        }
    } as const
}
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTitle
        }
    } as const
}
type editTodoACType = ReturnType<typeof editTodoAC>
export const editTodoAC = (todolistID: string, newTitle: string) => {
    return {
        type: "CHANGE-TODO-TITLE",
        payload: {
            todolistID,
            newTitle
        }
    } as const
}
type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, filterValue: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistID,
            filterValue
        }
    } as const
}