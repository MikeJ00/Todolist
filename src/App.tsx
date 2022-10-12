import React from 'react';
import './App.css';
import {Todolist2} from "./Todolist2";

// import {Todolist} from "./Todolist";

function App() {
    //BILL:
    // const todolisttitle string = "What to learn"
    // const title1 = "What to learn - 1"
    // const title2 = "What to learn - 2"
    const tasks1 = [
        {id: 1, title: "JS", isDone: false},
        {id: 2, title: "HTML", isDone: true},
        {id: 3, title: "Angular", isDone: false},
    ]

    //
    // const tasks1 = [
    //     {id:1, title:"HTML&CSS", isDone:true},
    //     {id:2, title:"JS", isDone:true},
    //     {id:3, title:"React", isDone:false},
    //     {id:4, title:"React", isDone:false}
    // ]
    //
    // const tasks2 = [
    //     {id:1, title:"Hello World", isDone:true},
    //     {id:2, title:"I am Happy", isDone:true},
    //     {id:3, title:"Yo", isDone:true}
    // ]
    //GIU
    return (
        <div className="App">
            <Todolist2
                title={"What to learn"}
                tasks={tasks1}
            />
            {/*<Todolist title={title1} tasks={tasks1}/>*/}
            {/*<Todolist title={title2} tasks={tasks2}/>*/}
            {/*// <div>*/}
            {/*// <h3>What to learn</h3>*/}
            {/*// <div>*/}
            {/*// <input/>*/}
            {/*// <button>+</button>*/}
            {/*// </div>*/}
            {/*// <ul>*/}
            {/*// <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>*/}
            {/*// <li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
            {/*// <li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
            {/*// </ul>*/}
            {/*// <div>*/}
            {/*// <button>All</button>*/}
            {/*// <button>Active</button>*/}
            {/*// <button>Completed</button>*/}
            {/*// </div>*/}
            {/*// </div>*/}
        </div>
    );
}


export default App;
