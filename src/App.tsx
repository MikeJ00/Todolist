import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {Input} from "./components/Input";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key:string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, setTodolist] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
    ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            ]
    });
    // let [filter, setFilter] = useState<FilterValuesType>("all");
    const editTodo = (todolistID: string, newTitle: string) =>{
        setTodolist(todolist.map(e=>e.id === todolistID ? {...e, title:newTitle} : e))
    }
    function removeTask(todolistID:string, taskID: string) {
       setTasks({...tasks, [todolistID]:tasks[todolistID].filter(t => t.id !== taskID)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }
    function addTask(title: string, todolistID:string) {
        console.log(tasks[todolistID])
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]:[...tasks[todolistID],newTask]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTask);
    }
    function changeStatus(taskId: string, isDone: boolean, todolistID:string ) {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(el => el.id===taskId ? {...el,isDone } : el)})
    }

    const removeTodolist=(todolistID:string)=>{
        setTodolist(todolist.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    function changeFilter(todolistID:string, value: FilterValuesType) {
        setTodolist(todolist.map(e=>e.id === todolistID ? {...e, isDone:value } : e));
        // setFilter(position);
    }

    const addTodolist=(newTitle:string)=>{
        const newTodoID = v1();
        const newTodolist:TodolistsType = {id: newTodoID, title: newTitle, filter: "active"}
        setTodolist([newTodolist, ...todolist])
        setTasks({...tasks, [newTodoID]:[]} )
    }
    const editTask=(todolistID:string,taskID:string, newTitle:string)=>{
        console.log(newTitle)
        const editValue = {...tasks, [todolistID]:tasks[todolistID].map(el=>el.id===taskID ? {...el, title:newTitle}: el)}
        setTasks(editValue)
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
            <Input callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {/*{arr.map ((el)=> {*/}
            {todolist.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                    // tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                    // tasksForTodolist = tasks.filter(t => t.isDone === true);
                }

                return (
                <Grid item key={el.id}>
                    <Paper elevation={4} style={{padding: "10px"}}>
                    <Todolist
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        editTask={editTask}
                        editTodo={editTodo}
                    />
                        </Paper>
                </Grid>
                )
            })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

// // -------------------------after 4 lesson-------------------------
// // -------------------------after 4 lesson-------------------------
// // -------------------------but add 3 ActionCreator-------------------------
// import React, {useReducer, useState} from "react";
// import "./App.css";
// import {Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {addTaskAC, changeCheckBoxAC, removeTasksAC, tasksReducer} from "./reducers/tasksReducer";
//
//
// export type FilterValueType = "All" | "Active" | "Completed"
//
// function App() {
//     // let tasks1 = [
//     //     { id: 1, title: "HTML&CSS", isDone: true },
//     //     { id: 2, title: "JS", isDone: true },
//     //     { id: 3, title: "ReactJS", isDone: false },
//     //     { id: 4, title: "Angular", isDone: false }
//     //     ]
//     // let [tasks1,setTasks] = useState([
//     //     { id: v1(), title: "HTML&CSS", isDone: true },
//     //     { id: v1(), title: "JS", isDone: true },
//     //     { id: v1(), title: "ReactJS", isDone: false },
//     //     { id: v1(), title: "Angular", isDone: false }
//     // ])
//
//     let [tasks1, tasksDispatch] = useReducer(tasksReducer, [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Angular", isDone: false}
//     ]);
//
//     const removeTasks = (taskID: string) => {
//         tasksDispatch(removeTasksAC(taskID))
//         // setTasks(tasks1.filter((el)=>el.id!==taskID))
//     }
//     const addTask = (newTitle: string) => {
//         tasksDispatch(addTaskAC(newTitle))
//         // const newTask={ id: v1(), title: newTitle, isDone: false }
//         // const newTasks=[newTask,...tasks1]
//         // setTasks(newTasks)--вариант кода как добавить к массиву новые массивы
//         // setTasks([newTask,...tasks1]) //более короткий вариант и современный
//         //меняем места, чтобы добавлялась строчка сверху или снизу
//     }
//     const changeCheckBox = (taskID: string, eventValue: boolean) => {
//         tasksDispatch(changeCheckBoxAC(taskID, eventValue))
//         // setTasks(tasks1.map(el => el.id === taskID ? {...el, isDone: eventValue} : el))
//         //изменения в setTasks ...tasks1 удаляем потому что map за нас создаст новый массив
//
//         // setTasks([...tasks1, tasks1.map(el=>el.id===taskID ? {...el, isDone:eventValue} : el)])
//         //    делаем копию массива ...tasks1, прежде чем делаем что-либо
//         //    берем все наши таски и идем мэпом tasks1.map
//         //    находим, что нам необходимо el=>el.id===taskID
//         //    2 варианта развития
//         //    ? совпало...делаем копию ...el, потому что изменения будут, изменения isDone:eventValue
//         //    : не совпало, так и возвращаем
//
//         // setTasks([...tasks1, tasks1.map(el=>el.id===taskID ? {...el, isDone:eventValue} : el)])
//         //isDone:eventValue можем изменить isDone на что угодно, пример mops:true, но....
//         //тогда наш массив выглядил бы так:{ id: 4, title: "Angular", isDone: false, mops:true }
//         //но нам нужн изменить значение isDone, из-за этого пишем вот так:isDone: eventValue
//         //и массив будет выглядеть вот так: id: v1(), title: "Angular", isDone: false
//
//         //    isDone:eventValue почеуму так? ключ: значение
//         //    const prepod={
//         // Igor:true потому что это объект и нужен ключ: значение
//     }
//
//     let [filter, setFilter] = useState<FilterValueType>("All")//чтобы видно было, какой мяч кинули из функции filterTasks
//     //используем useState, после этого глобально видим, что было передано из тодолиста в функцию. setFilter получает значение
//     //и переносится в filter
//     let filterTasksDone = tasks1
//     if (filter === "Active") { //теперь все сошлось, мы знаем какое значение придет в фильтр и затем сработает логика
//         filterTasksDone = tasks1.filter(el => !el.isDone)
//     }
//     if (filter === "Completed") {
//         filterTasksDone = tasks1.filter(el => el.isDone)
//     }
//
//     function filterTasks(filterValue: FilterValueType) { //функция для подключения к онклику в другом файле, для этого
//         // передаем ее в App return......ловим здесь мяч, который кинули из тодолиста....но только здесь отсается инфа
//         //какой мяч кинули, глобально это нигде не видно...из-за этого делаем переменную filterValue - глобальную, благодаря
//         //сэту setFilter
//         setFilter(filterValue)
//         //засетать filterValue в новый стейт и.....поменять на 26 и 30 строке...
//     }
//
//     //     const newTask=tasks1.map(t=>{
//     //         return t.id===tID ? {...t, isDone: !t.isDone} :t
//     //     })
//     //         setTasks(newTask)
//     //     // console.log("qqqqqq")
//     // }
//
//
//     //если "active", то отрисуй el.isDone
//     // const filterTasksDone=tasks1.filter(el=>!el.isDone)
//     // //если "completed", то отрисуй !el.isDone
//     // if(filterTasks() === "Active"){
//     //     tasks1.filter(el=>!el.isDone)
//     // }
//     // if(filterTasks() === "Completed"){
//     //     tasks1.filter(el=>el.isDone)
//     // }
//
//     // let filterTasksDone=tasks1
//     // if(filterValue==="Active"){
//     //     filterTasksDone=tasks1.filter(el=>el.isDone)
//     // }
//     // if(filterValue==="Active") {
//     //     filterTasksDone = tasks1.filter(el => !el.isDone)
//     // }
//
//     return (
//         <div className="App">
//             <Todolist title="What to learn"
//                       filter={filter}
//                       removeTask={removeTasks}
//                       rrrr={addTask}
//                       wwww={changeCheckBox}
//                       tasks={filterTasksDone}
//                       qqqq={filterTasks}
//             />
//         </div>
//     );
// }
//
// export default App;
