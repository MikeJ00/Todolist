import React, {useState} from 'react';
import {FilterValueType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    yyyy:(taskID:string)=>void
    // qqqq:(filterValue:FilterValueType)=>void //расстаможили функцию, которую передали из другого App файла
    rrrr:(newTitle:string)=>void
}

export function Todolist(props: PropsType ) {//props: PropsType контейнер, передаем все.. в ней лежит функция, которая из App
    const [newTitle, setNewTitle]=useState("")
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
        //засетать filterValue в новый стейт и.....поменять на 26 и 30 строке...
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={(event)=>setNewTitle(event.currentTarget.value)} />
            <button onClick={() => props.rrrr(newTitle)}>+</button>
        </div>
        <ul>
            {filterTasksDone.map((el, index) => {
                return (
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={() => {
                            {
                                props.yyyy(el.id)
                            }
                        }}>X
                        </button>
                    </li>
                )
            })} {/*{(el=>)}*/}
            {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
        </ul>
        <div>
            <button onClick={() => filterTasks("All")}>All</button>
            <button onClick={() => filterTasks("Active")}>Active</button>
            <button onClick={() => filterTasks("Completed")}>Completed</button>
        </div>
    </div>
}
