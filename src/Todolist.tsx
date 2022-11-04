import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {Button} from "./components/Button";
import styles from "./Todolist.module.css"

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

            <Button name={"All"}  callBack={()=>changeFilterTsarHandler("All")} Filter={"All"}/>
            <Button name={"Active"} callBack={()=>changeFilterTsarHandler("Active")} Filter={"Active"}/>
            <Button name={"Completed"} callBack={()=>changeFilterTsarHandler("Completed")} Filter={"Completed"}/>
            {/*общая кнопка работает и работают стили, но сразу 3 стиля работают..... вернулся к методу как в уроке*/}

            {/*<button onClick={() => filterTasks("All")}>All</button>*/}

            {/*<button className={activeButton==="All" ?styles.activeFilter :" "} onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={activeButton==="Active" ?styles.activeFilter :" "} onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={activeButton==="Completed" ?styles.activeFilter :" "} onClick={onCompletedClickHandler}>Completed</button>*/}
            {/*старые методы*/}
        </div>
    </div>
}
