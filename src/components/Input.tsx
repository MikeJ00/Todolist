// import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type PropsType = {
    callBack:(title:string)=>void
}
export const Input = (props:PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

// type AddItemFormPropsType = {
//     addItem: (title: string) => void
// }
//
// export function AddItemForm(props:AddItemFormPropsType) {
//     let [title, setTitle] = useState("")
//     let [error, setError] = useState<string | null>(null)
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setTitle(e.currentTarget.value)
//     }
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null);
//         if (e.charCode === 13) {
//             addTask();
//         }
//     }
//     const addTask = () => {
//         let newTitle = title.trim();
//         if (newTitle !== "") {
//             props.addItem(newTitle);
//             setTitle("");
//         } else {
//             setError("Title is required");
//         }
//     }
//     return (
//         <div>
//                 {/*<input value={title}*/}
//                 {/*       onChange={onChangeHandler}*/}
//                 {/*       onKeyPress={onKeyPressHandler}*/}
//                 {/*       className={error ? "error" : ""}*/}
//                 {/*/>*/}
//             <TextField
//                 value={title}
//                 onChange={onChangeHandler}
//                 onKeyPress={onKeyPressHandler}
//                 id="outlined-basic"
//                 error={!!error}
//                 label={error ? "title is required" :" type your text"}
//                 variant="outlined"
//                 size={"small"}/>
//                 {/*<button onClick={addTask}>+</button>*/}
//                 <Button onClick={addTask}
//                         style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px', background:"black"}}
//                         variant="contained">+</Button>
//                 {/*{error && <div className="error-message">{error}</div>}*/}
//         </div>
//     );
// };

