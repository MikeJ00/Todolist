import React, {useState} from 'react';
import * as console from "console";
import {FilterValueType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    yyyy:(taskID:number)=>void
    // qqqq:(filterValue:FilterValueType)=>void //расстаможили функцию, которую передали из другого App файла
}

export function Todolist(props: PropsType ){//props: PropsType контейнер, передаем все.. в ней лежит функция, которая из App

    let [filter, setFilter] = useState<FilterValueType>("All")//чтобы видно было, какой мяч кинули из функции filterTasks
//используем useState, после этого глобально видим, что было передано из тодолиста в функцию. setFilter получает значение
//и переносится в filter
    let filterTasksDone=props.tasks
    if(filter==="Active"){ //теперь все сошлось, мы знаем какое значение придет в фильтр и затем сработает логика
        filterTasksDone=props.tasks.filter(el=>!el.isDone)
    }
    if(filter==="Completed") {
        filterTasksDone = props.tasks.filter(el =>el.isDone)
    }

    const filterTasks=(filterValue:FilterValueType)=> { //функция для подключения к онклику в другом файле, для этого
        // передаем ее в App return......ловим здесь мяч, который кинули из тодолиста....но только здесь отсается инфа
        //какой мяч кинули, глобально это нигде не видно...из-за этого делаем переменную filterValue - глобальную, благодаря
        //сэту setFilter
        setFilter(filterValue)
        //засетать filterValue в новый стейт и.....поменять на 26 и 30 строке...
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filterTasksDone.map((el,index)=>{
                return(
                    <li key={el.id}>
                        <button onClick={()=>{
                            {props.yyyy(el.id)}
                        }}>X</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })} {/*{(el=>)}*/}
            {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            <button onClick={()=>filterTasks("All")}>All</button>//бросаем мяч
            <button onClick={()=>filterTasks("Active")}>Active</button>
            <button onClick={()=>filterTasks("Completed")}>Completed</button>
        </div>
    </div>
}
