import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType="All"|"Active"|"Completed"

function App() {

    // let tasks1 = [
    //     { id: 1, title: "HTML&CSS", isDone: true },
    //     { id: 2, title: "JS", isDone: true },
    //     { id: 3, title: "ReactJS", isDone: false },
    //     { id: 4, title: "Angular", isDone: false }
    //     ]
    let [tasks1,setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Angular", isDone: false }
    ])
    const addTask=(newTitle:string)=>{
        const newTask={ id: v1(), title: newTitle, isDone: false }
        // const newTasks=[newTask,...tasks1]
        // setTasks(newTasks)--вариант кода как добавить к массиву новые массивы
        setTasks([newTask,...tasks1]) //более короткий вариант и современный
        //меняем места, чтобы добавлялась строчка сверху или снизу
    }
    let [filter, setFilter] = useState<FilterValueType>("All")//чтобы видно было, какой мяч кинули из функции filterTasks
    //используем useState, после этого глобально видим, что было передано из тодолиста в функцию. setFilter получает значение
    //и переносится в filter

    const removeTasks=(taskID:string)=>{
        setTasks(tasks1.filter((el)=>el.id!==taskID))

    }

    let filterTasksDone=tasks1
        if(filter==="Active"){ //теперь все сошлось, мы знаем какое значение придет в фильтр и затем сработает логика
            filterTasksDone=tasks1.filter(el=>!el.isDone)
        }
        if(filter==="Completed") {
            filterTasksDone = tasks1.filter(el =>el.isDone)
        }

    function filterTasks(filterValue:FilterValueType){ //функция для подключения к онклику в другом файле, для этого
            // передаем ее в App return......ловим здесь мяч, который кинули из тодолиста....но только здесь отсается инфа
        //какой мяч кинули, глобально это нигде не видно...из-за этого делаем переменную filterValue - глобальную, благодаря
        //сэту setFilter
           setFilter(filterValue)
            //засетать filterValue в новый стейт и.....поменять на 26 и 30 строке...
    }
        const changeCheckBox=(taskID:string, eventValue:boolean)=> {
            setTasks(tasks1.map(el => el.id === taskID ? {...el, isDone: eventValue} : el))
            //изменения в setTasks ...tasks1 удаляем потому что map за нас создаст новый массив

            // setTasks([...tasks1, tasks1.map(el=>el.id===taskID ? {...el, isDone:eventValue} : el)])
            //    делаем копию массива ...tasks1, прежде чем делаем что-либо
            //    берем все наши таски и идем мэпом tasks1.map
            //    находим, что нам необходимо el=>el.id===taskID
            //    2 варианта развития
            //    ? совпало...делаем копию ...el, потому что изменения будут, изменения isDone:eventValue
            //    : не совпало, так и возвращаем

            // setTasks([...tasks1, tasks1.map(el=>el.id===taskID ? {...el, isDone:eventValue} : el)])
            //isDone:eventValue можем изменить isDone на что угодно, пример mops:true, но....
            //тогда наш массив выглядил бы так:{ id: 4, title: "Angular", isDone: false, mops:true }
            //но нам нужн изменить значение isDone, из-за этого пишем вот так:isDone: eventValue
            //и массив будет выглядеть вот так: id: v1(), title: "Angular", isDone: false

            //    isDone:eventValue почеуму так? ключ: значение
            //    const prepod={
            // Igor:true потому что это объект и нужен ключ: значение
        // }
        //

        //     const newTask=tasks1.map(t=>{
        //         return t.id===tID ? {...t, isDone: !t.isDone} :t
        //     })
        //         setTasks(newTask)
        //     // console.log("qqqqqq")
        }


    //если "active", то отрисуй el.isDone
    // const filterTasksDone=tasks1.filter(el=>!el.isDone)
    // //если "completed", то отрисуй !el.isDone
    // if(filterTasks() === "Active"){
    //     tasks1.filter(el=>!el.isDone)
    // }
    // if(filterTasks() === "Completed"){
    //     tasks1.filter(el=>el.isDone)
    // }

    // let filterTasksDone=tasks1
    // if(filterValue==="Active"){
    //     filterTasksDone=tasks1.filter(el=>el.isDone)
    // }
    // if(filterValue==="Active") {
    //     filterTasksDone = tasks1.filter(el => !el.isDone)
    // }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      filter={filter}
                      tasks={filterTasksDone}
                      removeTask={removeTasks}
                      rrrr={addTask}
                      qqqq={filterTasks}
                      wwww={changeCheckBox}
            />
        </div>
    );
}

export default App;
