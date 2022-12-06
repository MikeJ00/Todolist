import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
type PropsType={
    callBack:(newTitle:string)=>void
}
export const Input = (props:PropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                {/*<button onClick={addTask}>+</button>*/}
                <Button onClick={addTask} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', background:"black"}}
                        variant="contained">+</Button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

