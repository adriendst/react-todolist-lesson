import React, {useState} from 'react';

interface List {
    typeList : string;
    nameList : string;
}

const TodoListBasic = () => {

    const [taskList, setTaskList] = useState<List[]>([{typeList : 'init', nameList : ''}]);

    const [taskName, setTaskName] = useState<string>('');
    const [taskType, setTaskType] = useState<string>('To do');

    const taskTypeList = ['To do', 'In progress', 'Done'];

    function handleChangeTask(e: React.ChangeEvent<HTMLInputElement>){
        setTaskName(e.target.value);
    }

    function handleChangeTaskType(e: React.ChangeEvent<HTMLSelectElement>){
        setTaskType(e.target.value);
    }

    function addToList() {

        if(taskName !== '') {

            const taskExists = taskList.some(task => task.nameList === taskName);

            if(!taskExists) {
                const NewList = taskList.concat({typeList: taskType, nameList: taskName})
                setTaskList(NewList);
                console.log(taskList)
            }
            else{
                alert('La tâche '+ taskName +' existe déjà !')
            }

            setTaskName('')
        }
    }




    return (<>
        <div>
            <input type={"text"} value={taskName} onChange={handleChangeTask} style={{margin : '10px'}}/>
            <select value={taskType} onChange={handleChangeTaskType} style={{margin : '10px'}}>
                {taskTypeList.map((taskType) =>
                    <option key={taskType}>{taskType}</option>
                )}
            </select>
            <button onClick={addToList} style={{margin : '10px'}}>Add to list</button>
        </div>
        <div>
            <table>
                <tbody>
                    <tr>
                        <td style={{padding : '10px'}}>
                            <span>To do</span>
                            <ul>
                                {taskList.map((value ) => {
                                    if(value.typeList === 'To do') {
                                        return <li key={value.nameList}>{value.nameList}</li>
                                    }
                                })}
                            </ul>
                        </td>
                        <td style={{padding : '10px'}}>
                            <span>In progress</span>
                            <ul>
                                {taskList.map((value ) => {
                                    if(value.typeList === 'In progress') {
                                        return <li>{value.nameList}</li>
                                    }
                                })}
                            </ul>
                        </td>
                        <td style={{padding : '10px'}}>
                            <span>Done</span>
                            <ul>
                                {taskList.map((value ) => {
                                    if(value.typeList === 'Done') {
                                        return <li>{value.nameList}</li>
                                    }
                                })}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
};

export default TodoListBasic;
