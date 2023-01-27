import React, {useState} from 'react';
import {Input, Select, Button, Empty, List} from 'antd';
import {ListTask} from "./List";
import TaskWithDesign from "./TaskWithDesign";


const TodoListWithDesign = () => {


    const {Option} = Select;


    const [taskList, setTaskList] = useState<ListTask[]>([]);

    const [taskName, setTaskName] = useState<string>('');
    const [taskType, setTaskType] = useState<string>('');

    const [taskTypeList, setTaskTypeList] = useState<Array<string>>([]);
    const [taskTypeName, setTaskTypeName] = useState<string>('');

    function handleChangeTask(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskName(e.target.value);
    }

    function handleChangeTaskTypeName(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskTypeName(e.target.value);
    }

    function handleChangeTaskType(value: string) {
        setTaskType(value);
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

    function addToTaskTypeList() {

        if (taskTypeName !== '') {
            const taskExists = taskTypeList.some(task => task === taskTypeName);

            if (!taskExists) {
                const newList = taskTypeList.concat(taskTypeName)
                setTaskTypeList(newList);
            } else {
                alert('Le type de tâche ' + taskTypeName + ' existe déjà !')
            }
            setTaskTypeName('')
        }
    }

    function removeFromList(value: string) {
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

    function modif(value: string) {
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


    function changeTaskName(value : string, type : string, newvalue:string) {
        if (newvalue !== '') {
            const taskExists = taskList.some(task => task.nameList === newvalue);

            if (!taskExists) {
                const newArr = [...taskList];
                const indexOf = taskList.findIndex((element) => element.nameList === value);
                if (typeof type == 'string' && typeof newvalue == 'string') {
                    newArr[indexOf] = {typeList: type, nameList: newvalue, modif: 'none'}
                    setTaskList(newArr)
                }
            } else {
                alert('La tâche ' + newvalue + ' existe déjà !')
            }
        }
    }


    return (<>
        <div style={{display: 'flex'}}>
            <Input placeholder='Column name' type={'text'} value={taskTypeName} onChange={handleChangeTaskTypeName}
                   style={{order: 1, margin: '10px'}}></Input>
            <Button onClick={addToTaskTypeList} style={{order: 2, margin: '10px'}} disabled={!taskTypeName}>Add to
                list</Button>
        </div>
        <div style={{display: 'flex'}}>
            <Input placeholder='Nouvelle tâche' type={"text"} value={taskName} onChange={handleChangeTask}
                   style={{order: 1, margin: '10px'}}/>
            <Select value={taskType} onChange={handleChangeTaskType} style={{order: 2, margin: '10px', width: '120px'}}>
                {taskTypeList.map((taskType) =>
                    <Option key={taskType}>{taskType}</Option>
                )}
            </Select>
            <Button onClick={addToList} style={{order: 3, margin: '10px'}} disabled={!taskName || !taskType}>Add to
                list</Button>
        </div>
        <div>
            {taskTypeList.map((value) => {
                if (taskList.some(element => element.typeList === value)) {
                    return <List
                        header={<div>{value}</div>}
                    >
                        {taskList.map((task) => {
                            if (task.typeList == value) {
                                return <TaskWithDesign value={value} task={task}
                                                       removeFromList={removeFromList} modifList={modif}
                                                       modifTaskName={changeTaskName}/>
                            }
                        })
                        }
                    </List>
                } else {
                    return <List
                        header={<div>{value}</div>}
                    >
                        <Empty/>
                    </List>
                }

            })}

        </div>

    </>)
};

export default TodoListWithDesign;
