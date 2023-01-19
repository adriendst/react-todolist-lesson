import React, {useState} from 'react';

const TodoListBasic = () => {
    const [toDoList, setToDoList] = useState<string[]>(['To do']);
    const [inProgressList, setInProgressList] = useState<string[]>(['In progress']);
    const [doneList, setDoneList] = useState<string[]>(['Done']);

    const [task, setTask] = useState<string>('');
    const [taskType, setTaskType] = useState<string>('');

    const taskTypeList = ['To do', 'In Progress', 'Done'];

    function handleChangeTask(e: React.ChangeEvent<HTMLInputElement>){
        setTask(e.target.value);
        console.log(task)
    }

    function handleChangeTaskType(e: React.ChangeEvent<HTMLSelectElement>){
        setTaskType(e.target.value);
    }

    function addToList() {
        if(taskType == 'To do') {
            const newList = toDoList.concat(task);
            setToDoList(newList);
        }
        else if(taskType == 'In Progress') {
            const newList = inProgressList.concat(task);
            setInProgressList(newList);
        }
        else {
            const newList = doneList.concat(task);
            setDoneList(newList);
        }
        setTask('')
    }




    return (<>
        <div>
            <input type={"text"} value={task} onChange={handleChangeTask}/>
            <select value={taskType} onChange={handleChangeTaskType}>
                {taskTypeList.map((taskType) =>
                    <option key={taskType}>{taskType}</option>
                )}
            </select>
            <button onClick={addToList}>Add to list</button>
        </div>
        <div>
            <table>
                <td style={{padding : '10px'}}>
                    <ul>
                        {toDoList.map((toDo) =>
                            <li key={toDo}>{toDo}</li>
                        )}
                    </ul>
                </td>
                <td style={{padding : '10px'}}>
                    <ul>
                        {inProgressList.map((inProgress) =>
                            <li key={inProgress}>{inProgress}</li>
                        )}
                    </ul>
                </td>
                <td style={{padding : '10px'}}>
                    <ul>
                        {doneList.map((done) =>
                            <li key={done}>{done}</li>
                        )}
                    </ul>
                </td>
            </table>
        </div>
    </>)
};

export default TodoListBasic;
