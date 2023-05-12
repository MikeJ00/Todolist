// -------------------------after 4 lesson-------------------------
// -------------------------after 4 lesson-------------------------
// -------------------------after 4 lesson-------------------------
import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {Button} from "./components/Button";
import styles from "./Todolist.module.css"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskID:string)=>void
    qqqq:(filterValue:FilterValueType)=>void //расстаможили функцию, которую передали из другого App файла
    rrrr:(newTitle:string)=>void
    wwww:(taskID:string,eventValue:boolean)=>void
    filter:FilterValueType
}

export function Todolist(props: PropsType ) {//props: PropsType контейнер, передаем все.. в ней лежит функция, которая из App
    const [newTitle, setNewTitle]=useState("")
    const [error, setError]=useState<string|null>("")
    const [activeButton, setActiveButton]=useState<FilterValueType>("All")

    const addTaskHandler=()=>{
        if(newTitle.trim()!=="") {
            props.rrrr(newTitle.trim())
            setNewTitle("")
        }else{
            setError("Titile is required")
        }
    }//вынесли логику из кнокпи наверх

const onKeyPressHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==="Enter"){
            addTaskHandler()
        }
    //если нажал ентер отпр сообщение
}
const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setError(null)
    setNewTitle(event.currentTarget.value.trim())
}

    let [filter, setFilter] = useState<FilterValueType>("All")//чтобы видно было, какой мяч кинули из функции filterTasks
//используем useState, после этого глобально видим, что было передано из тодолиста в функцию. setFilter получает значение
//и переносится в filter
    let filterTasksDone = props.tasks
    if (filter === "Active") { //теперь все сошлось, мы знаем какое значение придет в фильтр и затем сработает логика
        filterTasksDone = props.tasks.filter(el => !el.isDone)
    }
    if (filter === "Completed") {
        filterTasksDone = props.tasks.filter(el => el.isDone)
    }

    const filterTasks = (filterValue: FilterValueType) => { //функция для подключения к онклику в другом файле, для этого
        // передаем ее в App return......ловим здесь мяч, который кинули из тодолиста....но только здесь отсается инфа
        //какой мяч кинули, глобально это нигде не видно...из-за этого делаем переменную filterValue - глобальную, благодаря
        //сэту setFilter
        setFilter(filterValue)
        /*засетать filterValue в новый стейт и.....поменять на 26 и 30 строке...*/}

    // const changeFilterAllHandler=()=>{
    //     props.qqqq("All")
    // }
    const changeFilterTsarHandler=(filterValue:FilterValueType)=>{
        props.qqqq(filterValue);
        setActiveButton("All")
    }
    // const onAllClickHandler = () => {
    //     props.qqqq("All");
    //     setActiveButton("All")
    // }
    // const onActiveClickHandler = () => {
    //     props.qqqq("Active")
    //     setActiveButton("Active")
    // }
    // const onCompletedClickHandler = () => {
    //     props.qqqq("Completed")
    //     setActiveButton("Completed")
    // }
    const onChangeCheckbox = (qID:string,eventValue:boolean)=>{
        props.wwww(qID,eventValue)
        // console.log(event.currentTarget.checked)
    }
    const removeTaskHandler=(elID:string)=>{
        props.removeTask(elID)
    } //2 вариант использования, но появляется лишняя отрисовка, потому что в баттоне вызываем ф-ию 2 раза, но зона
    //видимости лучше, в сравнении с 1 вариантом

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : " "} value={newTitle}
                   onKeyDown={onKeyPressHandler}
                   onChange={onChangeHandler} />
            {/*<input value={newTitle} onKeyDown={onKeyPressHandler}  onChange={(event)=> setNewTitle(event.currentTarget.value)} />*/}
           {/*собака без поводка вэлью и ньютайтл--если убрать, то наша строка так и будет без обновлений*/}
           {/* <button onClick={addTaskHandler}>+</button>*/}
            {/*<button onClick={() => props.rrrr(newTitle)}>+</button>*/}
            <Button name={"+"} callBack={addTaskHandler}/>
            {/*вызываем компоненту button, она вызывает фунцию onClickHandler,*/}
            {/*onClickHandler вызывает коллбэк , а коллбэк вызывает addTaskHandler}*/}
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                filterTasksDone.map(el =>{
                    // const onChangeCheckbox = (event:ChangeEvent<HTMLInputElement>)=>{
                    //     props.wwww(el.id,event.currentTarget.checked)
                    //     // console.log(event.currentTarget.checked)
                    // } **1
                    //  const removeTaskHandler=()=>{
                    //      props.removeTask(el.id)
                    // }//1 вариант использования, но как бы не там, где должна быть, все ф-ии мы пишем выше, чем ретурн
                    //но если используем 1 раз функцию, то можено и так
                    return(
                        <li key={el.id} className={el.isDone? styles.isDone : " "}>
                            <input type="checkbox" checked={el.isDone} onChange={(event)=>onChangeCheckbox(el.id, event.currentTarget.checked)}/>
                            {/*<input type="checkbox" checked={el.isDone} onChange={onChangeCheckbox}/>*/}
                            {/*как было раньше **1*/}
                            <span>{el.title}</span>
                            {/*<button onClick={()=>removeTaskHandler(el.id)}>X*/}
                            {/*</button>*/}
                            <Button name={"X"} callBack={()=>removeTaskHandler(el.id)}/>
                        </li>
                    )
                } )
            } {/*{(el=>)}*/}
            {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            {/*<button className={activeButton==="All" ?styles.activeFilter:""} onClick={()=>changeFilterTsarHandler("All")}>All</button>*/}
            {/*<button className={activeButton==="Active" ?styles.activeFilter:""} onClick={()=>changeFilterTsarHandler("Active")}>Active</button>*/}
            {/*<button className={activeButton==="Completed" ?styles.activeFilter:""} onClick={() =>changeFilterTsarHandler("Completed")}>Completed</button>*/}
            {/*не правильно потому что класс нейм должен быть в компоненте, а не в функции*/}

            <Button name={"All"}  callBack={()=>changeFilterTsarHandler("All")} Filter={props.filter}/>
            <Button name={"Active"} callBack={()=>changeFilterTsarHandler("Active")} Filter={props.filter}/>
            <Button name={"Completed"} callBack={()=>changeFilterTsarHandler("Completed")} Filter={props.filter}/>
            {/*общая кнопка работает и работают стили, но сразу 3 стиля работают..... вернулся к методу как в уроке*/}

            {/*<button onClick={() => filterTasks("All")}>All</button>*/}

            {/*<button className={activeButton==="All" ?styles.activeFilter :" "} onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={activeButton==="Active" ?styles.activeFilter :" "} onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={activeButton==="Completed" ?styles.activeFilter :" "} onClick={onCompletedClickHandler}>Completed</button>*/}
            {/*старые методы*/}
        </div>
    </div>
}


//-------------------after 7 lesson----------------------//
// import React, {ChangeEvent, KeyboardEvent, useState} from "react";
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import {FilterValuesType} from "./App";
// import {Input} from "./components/Input";
// import {EditableSpan} from "./components/EditableSpan";

// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     todolistID: string
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (todolistID: string, taskId: string) => void
//     changeFilter: (todolistID: string, value: FilterValuesType) => void
//     addTask: (todolistID: string, title: string) => void
//     changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
//     filter: FilterValuesType
//     removeTodolist: (todolistID: string) => void
//     editTask: (todolistID: string, taskID: string, newTitle: string) => void
//     editTodo: (todolistID: string, newTitle: string) => void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [title, setTitle] = useState("")
//     let [error, setError] = useState<string | null>(null)
//
//
//     const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
//     const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
//     const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
//
//     const removeTodolist = () => {
//         props.removeTodolist(props.todolistID)
//     }
//     const addTaskHandler = (title: string) => {
//         props.addTask(title, props.todolistID)
//     }
//
//     const editTaskHandler = (tID: string, newTitle: string) => {
//         props.editTask(props.todolistID, tID, newTitle)
//     }
//     const editTodoHandler = (newTitle: string) => {
//         props.editTodo(props.todolistID, newTitle)
//     }
//     return <div>
//         <h3>
//             {/*{props.title}*/}
//             <EditableSpan oldTitle={props.title} callBack={editTodoHandler}/>
//             {/*<button onClick={removeTodolist}>X</button>*/}
//             <IconButton aria-label="delete" onClick={removeTodolist}>
//                 <DeleteIcon />
//             </IconButton>
//         </h3>
//         <div>
//             <Input callBack={addTaskHandler}/>
//         </div>
//         <ul>
//             {
//                 props.tasks.map(t => {
//                     const onClickHandler = () => props.removeTask(props.todolistID, t.id)
//                     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                         props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
//                     }
//                     // const editTaskHandler=(newTitle:string)=>{
//                     //     props.editTask(props.todolistID, t.id, newTitle)
//                     // }
//                     return <li key={t.id} className={t.isDone ? "is-done" : ""}>
//                         {/*<input type="checkbox"*/}
//                         {/*       onChange={onChangeHandler}*/}
//                         {/*       checked={t.isDone}/>*/}
//                         <Checkbox onChange={onChangeHandler}
//                                   checked={t.isDone} />
//                         <EditableSpan oldTitle={t.title} callBack={(newTitle) => editTaskHandler(t.id, newTitle)}/>
//                         <IconButton aria-label="delete" onClick={onClickHandler}>
//                             <DeleteIcon />
//                         </IconButton>
//                         {/*<button onClick={onClickHandler}>x</button>*/}
//                     </li>
//                 })
//             }
//         </ul>
//         <div>
//             <Button variant={props.filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler} color="success">All</Button>
//             {/*<button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>*/}
//             <Button variant={props.filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler} color="secondary">Active</Button>
//             {/*<button className={props.filter === "active" ? "active-filter" : ""}  onClick={onActiveClickHandler}>Active</button>*/}
//             <Button variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler} color="info">Completed</Button>
//             {/*<button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>*/}
//         </div>
//     </div>
// }


