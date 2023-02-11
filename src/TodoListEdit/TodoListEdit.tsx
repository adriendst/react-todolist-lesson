import React, {useState} from 'react';
import {ListTask} from "./List";
import AddColumn from "./AddColumn";
import AddItem from "./AddItem/AddItem";
import Column from "./Column";


const TodoListEdit = () => {

    const [taskList, setTaskList] = useState<ListTask[]>([]);

    const [taskTypeList, setTaskTypeList] = useState<Array<string>>([]);

    const [taskTypeName, setTaskTypeName] = useState<string>('');

    const [taskName, setTaskName] = useState<string>('');
    const [taskType, setTaskType] = useState<string>('');

    function handleChangeTask(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskName(e.target.value);
    }

    function handleChangeTaskType(value: string) {
        setTaskType(value);
    }

    function newItem() {
        addToList(taskName, taskType);
        setTaskType('');
        setTaskName('')
    }

    function handleChangeTaskTypeName(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskTypeName(e.target.value);
    }

    function newColumn() {
        addToTaskTypeList(taskTypeName)
        setTaskTypeName('')
    }

    function addToList(taskName: string, taskType: string) {

        if (taskName !== '') {
            const taskExists = taskList.some(task => task.nameList === taskName);

            if (!taskExists) {
                const newList = taskList.concat({typeList: taskType, nameList: taskName, modif: 'none'})
                setTaskList(newList);
            } else {
                alert('La tâche ' + taskName + ' existe déjà !')
            }
        }
    }

    function addToTaskTypeList(taskTypeName: string) {
        if (taskTypeName !== '') {
            const taskExists = taskTypeList.some(task => task === taskTypeName);

            if (!taskExists) {
                const newList = taskTypeList.concat(taskTypeName)
                setTaskTypeList(newList);
            } else {
                alert('Le type de tâche ' + taskTypeName + ' existe déjà !')
            }
        }
    }

    function removeFromList(value: string) {
        const myArray = taskList.filter(function (obj) {
            return obj.nameList !== value;
        });
        setTaskList(myArray)
    }

    function removeType(value: string) {
        const myTypeArray = taskTypeList.filter(function (obj) {
            return obj !== value;
        });
        const myTaskArray = taskList.filter(function (obj) {
            return obj.typeList !== value;
        });
        setTaskTypeList(myTypeArray)
        setTaskList(myTaskArray);
    }

    function changeTaskTypeName(value: string, newvalue: string) {
        if (newvalue !== value) {
            const typeExists = taskTypeList.some(task => task === newvalue);
            const newArr = [...taskTypeList];
            const indexOf = taskTypeList.findIndex((element) => element === value);
            console.log(indexOf)
            if (!typeExists) {
                newArr[indexOf] = newvalue
                setTaskTypeList(newArr)

                let newTaskList = taskList.map(task => {
                    if (task.typeList === value) {
                        task.typeList = newvalue;
                    }
                    return task;
                });
                setTaskList(newTaskList);
            } else {
                alert('Le type de tâche ' + newvalue + ' existe déjà !')
            }
        }
    }

    function changeTask(value: string, type: string, newtype: string, newvalue: string) {
        if (newvalue !== '') {
            const taskExists = taskList.some(task => task.nameList === newvalue);
            const newArr = [...taskList];
            const indexOf = taskList.findIndex((element) => element.nameList === value);
            if (type !== newtype) {
                if (value !== newvalue) {
                    if (!taskExists) {
                        newArr[indexOf] = {typeList: newtype, nameList: newvalue, modif: 'none'}
                        setTaskList(newArr)
                    } else {
                        alert('La tâche ' + newvalue + ' existe déjà !')
                    }
                } else {
                    newArr[indexOf] = {typeList: newtype, nameList: value, modif: 'none'}
                    setTaskList(newArr)
                }
            } else {
                if (!taskExists) {
                    newArr[indexOf] = {typeList: type, nameList: newvalue, modif: 'none'}
                    setTaskList(newArr)
                } else {
                    alert('La tâche ' + newvalue + ' existe déjà !')
                }
            }
        }
    }

    return (<>
        <AddColumn handleChangeTaskTypeName={handleChangeTaskTypeName} newColumn={newColumn}
                   taskTypeName={taskTypeName}></AddColumn>
        <AddItem taskTypeList={taskTypeList} handleChangeTask={handleChangeTask}
                 handleChangeTaskType={handleChangeTaskType} newItem={newItem} taskName={taskName}
                 taskType={taskType}></AddItem>
        <Column taskTypeList={taskTypeList} taskList={taskList} removeFromList={removeFromList} removeType={removeType}
                changeTask={changeTask} changeTaskTypeName={changeTaskTypeName}></Column>
    </>)
};

export default TodoListEdit;
