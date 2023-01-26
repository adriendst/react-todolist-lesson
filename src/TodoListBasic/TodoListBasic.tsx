import React, {useState} from 'react';
import Task from './Task';

interface List {
    typeList: string;
    nameList: string;
    modif: string;
}

const TodoListBasic = () => {


    const [taskList, setTaskList] = useState<List[]>([{typeList: 'init', nameList: '', modif: 'none'}]);

    const [taskName, setTaskName] = useState<string>('');
    const [taskType, setTaskType] = useState<string>('To do');

    const taskTypeList = ['To do', 'In progress', 'Done'];

    function handleChangeTask(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskName(e.target.value);
    }

    function handleChangeTaskType(e: React.ChangeEvent<HTMLSelectElement>) {
        setTaskType(e.target.value);
    }


    function addToList() {

        if (taskName !== '') {
            const taskExists = taskList.some(task => task.nameList === taskName);

            if (!taskExists) {
                const newList = taskList.concat({typeList: taskType, nameList: taskName, modif: 'none'})
                setTaskList(newList);
            } else {
                alert('La tâche ' + taskName + ' existe déjà !')
            }
            setTaskName('')
        }
    }

    const removeFromList = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.getAttribute("data-value");
        const myArray = taskList.filter(function (obj) {
            return obj.nameList !== value;
        });
        setTaskList(myArray)
    };


    const move = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.getAttribute("data-value");
        const moveTo = e.currentTarget.innerText;
        const newArr = [...taskList];
        const indexOf = taskList.findIndex((element) => element.nameList === value);
        if (typeof value == 'string') {
            newArr[indexOf] = {typeList: moveTo, nameList: value, modif: 'none'}
            setTaskList(newArr)
        }
    };

    function modif(e: React.MouseEvent<HTMLButtonElement>) {
        const value = e.currentTarget.getAttribute("data-value");
        const newArr = [...taskList];
        const toModif = taskList.find((element) => element.nameList === value);
        const indexOf = taskList.findIndex((element) => element.nameList === value);
        if (typeof value === 'string' && toModif) {
            if (toModif.modif === 'none') {
                newArr[indexOf] = {typeList: toModif.typeList, nameList: value, modif: 'block'}
            } else if (toModif.modif === 'block') {
                newArr[indexOf] = {typeList: toModif.typeList, nameList: value, modif: 'none'}
            }
            setTaskList(newArr)
        }
    }


    function changeTaskName(e: React.MouseEvent<HTMLButtonElement>) {
        if (e.currentTarget.previousElementSibling) {
            const value = e.currentTarget.getAttribute('value');
            const newvalue = e.currentTarget.previousElementSibling.getAttribute('value');
            const type = e.currentTarget.getAttribute('data-value');
            const newArr = [...taskList];
            const indexOf = taskList.findIndex((element) => element.nameList === value);
            if (typeof type == 'string' && typeof newvalue == 'string') {
                newArr[indexOf] = {typeList: type, nameList: newvalue, modif: 'none'}
                setTaskList(newArr)
            }
        }

    }


    return (<>
        <div>
            <input type={"text"} value={taskName} onChange={handleChangeTask} style={{margin: '10px'}}/>
            <select value={taskType} onChange={handleChangeTaskType} style={{margin: '10px'}}>
                {taskTypeList.map((taskType) =>
                    <option key={taskType}>{taskType}</option>
                )}
            </select>
            <button onClick={addToList} style={{margin: '10px'}}>Add to list</button>
        </div>
        <div>
            <table>
                <tbody>
                    <tr>
                        {taskTypeList.map((typevalue) => {
                            return <>
                                <td style={{padding: '10px'}}>
                                    <span>{typevalue}</span>
                                    <ul>
                                        {taskList.map((value) => {
                                            if (value.typeList === typevalue) {
                                                return <div>
                                                    <Task task={value} removeFromList={removeFromList} moveTask={move}
                                                          modifTask={modif} changeTask={changeTaskName}/>
                                                </div>
                                            }
                                        })}
                                    </ul>
                                </td>
                            </>
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
};

export default TodoListBasic;
