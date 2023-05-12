import {v1} from "uuid";
import {TodolistsType} from "../App";
import {removeTodolistAC, TodolistsReducer} from "./todolists-reducer";


test("correct todolist should be removed", () =>{
    let todolistID1 = v1();
    let todolistID2 = v1();

    let startState: Array<TodolistsType> = [
        {id: todolistID1, title: "What to learn", isDone: "all"},
        {id: todolistID2, title: "What to buy", isDone: "all"},
        ]

    // const endState = TodolistsReducer(startState, {type: "REMOVE-TODOLIST", id:todolistID1})
    const endState = TodolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2)
})

