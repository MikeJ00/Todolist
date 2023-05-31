import {FilterValuesType, TasksStateType, TodolistsType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";

type RootTypeAction = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTitleTaskACType
    | addTodolistACType
    | removeTodolistACType

export const tasksReducer = (state: TasksStateType, action: RootTypeAction): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.tasksID)
            }
        }
        case "ADD-TASKS": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state,
                [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
        }
        case "CHANGE-TASKS-STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.tasksID ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        case "CHANGE-TITLE-STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.tasksID ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST": {

            // let copyState = {...state}
            // delete copyState[action.payload.todolistID]
            // return copyState
            let {[action.payload.todolistID]:[], ...rest} = state
            return rest
        }
        default:
            throw new Error("I don't understand this type")
    }
}


type removeTaskACType = ReturnType<typeof RemoveTaskAC>

export const RemoveTaskAC = (tasksID: string, todolistID: string) => {
    return {
        type: "REMOVE-TASKS",
        payload: {
            tasksID,
            todolistID
        }
    } as const
}
type addTaskACType = ReturnType<typeof AddTaskAC>
export const AddTaskAC = (title: string, todolistID: string) => {
    return {
        type: "ADD-TASKS",
        payload: {
            title,
            todolistID
        }
    } as const
}
type  changeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export const ChangeTaskStatusAC = (tasksID: string, isDone: boolean, todolistID: string) => {
    return {
        type: "CHANGE-TASKS-STATUS",
        payload: {
            tasksID,
            isDone,
            todolistID
        }
    } as const
}
type  changeTitleTaskACType = ReturnType<typeof ChangeTitleTaskAC>
export const ChangeTitleTaskAC = (tasksID: string, title: string, todolistID: string) => {
    return {
        type: "CHANGE-TITLE-STATUS",
        payload: {
            tasksID,
            title,
            todolistID
        }
    } as const
}