import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {Button} from "./components/Button";

type TaskType = {
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
}

export function Todolist(props: PropsType ) {//props: PropsType контейнер, передаем все.. в ней лежит функция, которая из App
    const [newTitle, setNewTitle]=useState("")
    console.log(newTitle)

    const addTaskHandler=()=>{
        if(newTitle.trim()!=="") {
            props.rrrr(newTitle.trim())
            setNewTitle("")
        }
    }//вынесли логику из кнокпи наверх

const onKeyPressHandler=(event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key==="Enter"){
            addTaskHandler()
        }
    //если нажал ентер отпр сообщение
}
const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
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
    const removeTaskHandler=(elID:string)=>{
            props.removeTask(elID)
         } //2 вариант использования, но появляется лишняя отрисовка, потому что в баттоне вызываем ф-ию 2 раза, но зона
    //видимости лучше, в сравнении с 1 вариантом
    // const changeFilterAllHandler=()=>{
    //     props.qqqq("All")
    // }
    const changeFilterTsarHandler=(filterValue:FilterValueType)=>{
        props.qqqq(filterValue)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onKeyDown={onKeyPressHandler}
                   onChange={onChangeHandler} />
            {/*<input value={newTitle} onKeyDown={onKeyPressHandler}  onChange={(event)=> setNewTitle(event.currentTarget.value)} />*/}
           {/*собака без поводка вэлью и ньютайтл--если убрать, то наша строка так и будет без обновлений*/}
           {/* <button onClick={addTaskHandler}>+</button>*/}
            {/*<button onClick={() => props.rrrr(newTitle)}>+</button>*/}
            <Button name={"+"} callBack={addTaskHandler}/>
            {/*вызываем компоненту button, она вызывает фунцию onClickHandler,*/}
            {/*onClickHandler вызывает коллбэк , а коллбэк вызывает addTaskHandler}*/}
        </div>
        <ul>
            {
                filterTasksDone.map(el =>{
                    const onChangeCheckbox = (event:ChangeEvent<HTMLInputElement>)=>{
                        props.wwww(el.id,event.currentTarget.checked)
                        // console.log(event.currentTarget.checked)
                    }
                    // const removeTaskHandler=()=>{
                    //     props.removeTask(el.id)
                    // }//1 вариант использования, но как бы не там, где должна быть, все ф-ии мы пишем выше, чем ретурн
                    //но если используем 1 раз функцию, то можено и так
                    return(
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone} onChange={onChangeCheckbox}/>
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
            {/*<button onClick={()=>changeFilterTsarHandler("All")}>All</button>*/}
            {/*<button onClick={()=>changeFilterTsarHandler("Active")}>Active</button>*/}
            {/*<button onClick={() =>changeFilterTsarHandler("Completed")}>Completed</button>*/}
            <Button name={"All"} callBack={()=>changeFilterTsarHandler("All")}/>
            <Button name={"Active"} callBack={()=>changeFilterTsarHandler("Active")}/>
            <Button name={"Completed"} callBack={()=>changeFilterTsarHandler("Completed")}/>
            {/*<button onClick={() => filterTasks("All")}>All</button>*/}
            {/*/!*<button onClick={() => {props.qqqq("Completed")}}>Completed</button>*!/старые методы*/}
        </div>
    </div>
}
