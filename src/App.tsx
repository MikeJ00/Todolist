import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/Input';
import {ButtonAppBar} from "./components/ButtonAppBar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, setTodolist] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "completed"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},//0
            {id: v1(), title: "Orange", isDone: true},//1
            {id: v1(), title: "Water", isDone: false},//2
            {id: v1(), title: "Banan", isDone: false},//3
            {id: v1(), title: "Beer", isDone: false},//4
        ]
    });
    const updateTask=(todolistID: string, taskID:string, updateTitle:string)=>{
        setTasks({...tasks,[todolistID]:tasks[todolistID].map
            (el=>el.id===taskID ? {...el,title:updateTitle}:el)})
    }
    const updateTodolist=(todolistID: string,updateTitle:string)=>{
        // console.log(updateTitle)
        setTodolist(todolist.map(el=>el.id===todolistID ?{...el,title:updateTitle}:el))
    }
    // console.log(tasks[todolistID2][2])
    // let [filter, setFilter] = useState<FilterValuesType>("all");
    // let arr=[1,2,3,4,5,6,7,8,9]
    // console.log(tasks[todolistID1])
    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    function removeTask(todolistID: string, taskID: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        setTasks({...tasks, [todolistID]: tasks [todolistID].filter(el => el.id !== taskID)})
    }

    function addTask( title: string, todolistID: string,) { //  todolistID: string,title: string, not work///////
        let newTask = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistID];
        tasks[todolistID] = [newTask, ...todolistTasks];
        setTasks({...tasks});
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        // setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }


    //tasks - весь дом
    //todolistID - квартира

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }

    // setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId ? {...el,isDone:isDone} : el)})

    //...tasks раскрыли 1 матрешку
    // [todolistID]:tasks - созадем старый новый ключ  [todolistID] и кладем старые квартиры tasks
    // но в одной из квартир нужно поменять true на false из-за этого нам нужен мэп
    //мэпом идем по массиву(элемент имеет id)
    //{...el,isDone:isDone}, ...el,  чтобы isDOne попало вовнутрь, иначе было бы так
    // {id: v1(), title: "GraphQL", isDone: false, isDone},//4


    // let tasksForTodolist = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        // setFilter(value);
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }
    const addTodolist=(newTitle:string,)=>{
        const newTodolistId=v1()
        const newTodo:TodolistsType = {id: newTodolistId, title:newTitle, filter: "all"}
        setTodolist([newTodo, ...todolist])
        setTasks({...tasks,[newTodolistId]:[]})
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>

                <Grid container style={{padding:"20px"}}>
                <AddItemForm addItem={addTodolist} />
                </Grid>

                <Grid container spacing={3} >
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
                    // debugger
                    return <Grid item>
                        <Paper style={{padding:"10px"}}>
                        <Todolist
                            key={el.id}
                            todolistID={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            // filter={filter}
                            filter={el.filter}
                            removeTodolist={removeTodolist}
                            updateTask={updateTask}
                            updateTodolist={updateTodolist}
                        />
                        </Paper>
                        </Grid>

                })}
                </Grid>
            </Container>
            {/*<AddItemForm addItem={addTodolist} />*/}
            {/*{arr.map ((el)=> {*/}
            {/*{todolist.map((el) => {*/}
            {/*    let tasksForTodolist = tasks[el.id];*/}
            {/*    if (el.filter === "active") {*/}
            {/*        tasksForTodolist = tasks[el.id].filter(t => !t.isDone);*/}
            {/*        // tasksForTodolist = tasks.filter(t => t.isDone === false);*/}
            {/*    }*/}
            {/*    if (el.filter === "completed") {*/}
            {/*        tasksForTodolist = tasks[el.id].filter(t => t.isDone);*/}
            {/*        // tasksForTodolist = tasks.filter(t => t.isDone === true);*/}
            {/*    }*/}
            {/*    // debugger*/}
            {/*    return (*/}
            {/*        <Todolist*/}
            {/*            key={el.id}*/}
            {/*            todolistID={el.id}*/}
            {/*            title={el.title}*/}
            {/*            tasks={tasksForTodolist}*/}
            {/*            removeTask={removeTask}*/}
            {/*            changeFilter={changeFilter}*/}
            {/*            addTask={addTask}*/}
            {/*            changeTaskStatus={changeStatus}*/}
            {/*            // filter={filter}*/}
            {/*            filter={el.filter}*/}
            {/*            removeTodolist={removeTodolist}*/}
            {/*            updateTask={updateTask}*/}
            {/*            updateTodolist={updateTodolist}*/}
            {/*        />*/}
            {/*    )*/}
            {/*})}*/}
            {/*<Todolist title="What to learn"*/}
            {/*          tasks={tasksForTodolist}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeFilter={changeFilter}*/}
            {/*          addTask={addTask}*/}
            {/*          changeTaskStatus={changeStatus}*/}
            {/*          filter={filter}*/}
            {/*/>*/}
        </div>
    );
}

export default App;

// -------------------------after 4 lesson-------------------------
// -------------------------after 4 lesson-------------------------
// -------------------------after 4 lesson-------------------------
// import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from "./Todolist";
// import {v1} from "uuid";
//
//
// export type FilterValueType="All"|"Active"|"Completed"
//
// function App() {
//
//     // let tasks1 = [
//     //     { id: 1, title: "HTML&CSS", isDone: true },
//     //     { id: 2, title: "JS", isDone: true },
//     //     { id: 3, title: "ReactJS", isDone: false },
//     //     { id: 4, title: "Angular", isDone: false }
//     //     ]
//     let [tasks1,setTasks] = useState([
//         { id: v1(), title: "HTML&CSS", isDone: true },
//         { id: v1(), title: "JS", isDone: true },
//         { id: v1(), title: "ReactJS", isDone: false },
//         { id: v1(), title: "Angular", isDone: false }
//     ])
//     const addTask=(newTitle:string)=>{
//         const newTask={ id: v1(), title: newTitle, isDone: false }
//         // const newTasks=[newTask,...tasks1]
//         // setTasks(newTasks)--вариант кода как добавить к массиву новые массивы
//         setTasks([newTask,...tasks1]) //более короткий вариант и современный
//         //меняем места, чтобы добавлялась строчка сверху или снизу
//     }
//     let [filter, setFilter] = useState<FilterValueType>("All")//чтобы видно было, какой мяч кинули из функции filterTasks
//     //используем useState, после этого глобально видим, что было передано из тодолиста в функцию. setFilter получает значение
//     //и переносится в filter
//
//     const removeTasks=(taskID:string)=>{
//         setTasks(tasks1.filter((el)=>el.id!==taskID))
//
//     }
//
//     let filterTasksDone=tasks1
//         if(filter==="Active"){ //теперь все сошлось, мы знаем какое значение придет в фильтр и затем сработает логика
//             filterTasksDone=tasks1.filter(el=>!el.isDone)
//         }
//         if(filter==="Completed") {
//             filterTasksDone = tasks1.filter(el =>el.isDone)
//         }
//
//     function filterTasks(filterValue:FilterValueType){ //функция для подключения к онклику в другом файле, для этого
//             // передаем ее в App return......ловим здесь мяч, который кинули из тодолиста....но только здесь отсается инфа
//         //какой мяч кинули, глобально это нигде не видно...из-за этого делаем переменную filterValue - глобальную, благодаря
//         //сэту setFilter
//            setFilter(filterValue)
//             //засетать filterValue в новый стейт и.....поменять на 26 и 30 строке...
//     }
//         const changeCheckBox=(taskID:string, eventValue:boolean)=> {
//             setTasks(tasks1.map(el => el.id === taskID ? {...el, isDone: eventValue} : el))
//             //изменения в setTasks ...tasks1 удаляем потому что map за нас создаст новый массив
//
//             // setTasks([...tasks1, tasks1.map(el=>el.id===taskID ? {...el, isDone:eventValue} : el)])
//             //    делаем копию массива ...tasks1, прежде чем делаем что-либо
//             //    берем все наши таски и идем мэпом tasks1.map
//             //    находим, что нам необходимо el=>el.id===taskID
//             //    2 варианта развития
//             //    ? совпало...делаем копию ...el, потому что изменения будут, изменения isDone:eventValue
//             //    : не совпало, так и возвращаем
//
//             // setTasks([...tasks1, tasks1.map(el=>el.id===taskID ? {...el, isDone:eventValue} : el)])
//             //isDone:eventValue можем изменить isDone на что угодно, пример mops:true, но....
//             //тогда наш массив выглядил бы так:{ id: 4, title: "Angular", isDone: false, mops:true }
//             //но нам нужн изменить значение isDone, из-за этого пишем вот так:isDone: eventValue
//             //и массив будет выглядеть вот так: id: v1(), title: "Angular", isDone: false
//
//             //    isDone:eventValue почеуму так? ключ: значение
//             //    const prepod={
//             // Igor:true потому что это объект и нужен ключ: значение
//         // }
//         //
//
//         //     const newTask=tasks1.map(t=>{
//         //         return t.id===tID ? {...t, isDone: !t.isDone} :t
//         //     })
//         //         setTasks(newTask)
//         //     // console.log("qqqqqq")
//         }
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
//                       tasks={filterTasksDone}
//                       removeTask={removeTasks}
//                       rrrr={addTask}
//                       qqqq={filterTasks}
//                       wwww={changeCheckBox}
//             />
//         </div>
//     );
// }
//
// export default App;
