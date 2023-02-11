import React from 'react';
import {Input, Modal, Select} from "antd";
import {ListTask} from "../List";

interface ItemModal{
    taskTypeList : string[],
    setNewTaskType : React.Dispatch<React.SetStateAction<string>>,
    setNewTaskName :  React.Dispatch<React.SetStateAction<string>>,
    newTaskName : string,
    newTaskType : string,
    setIsTaskModalOpen : React.Dispatch<React.SetStateAction<boolean>>,
    isTaskModalOpen : boolean
    task : ListTask,
    changeTask:(value :string, type: string, newtype : string, newvalue : string) => void
}

function ItemModal({taskTypeList, setNewTaskType, setNewTaskName, newTaskType, newTaskName, setIsTaskModalOpen, changeTask,isTaskModalOpen, task} : ItemModal) {
    const {Option} = Select;

    function handleNewTaskName(e: React.ChangeEvent<HTMLInputElement>){
        setNewTaskName(e.target.value)
    }

    function handleNewTaskType(value:string){
        setNewTaskType(value)
    }

    function handleTaskModalOk(){
        setIsTaskModalOpen(false);
        changeTask(task.nameList, task.typeList, newTaskType, newTaskName)
    }

    function handleTaskModalCancel(){
        setIsTaskModalOpen(false);
        setNewTaskName(task.nameList)
        setNewTaskType(task.typeList)
    }

    return(
        <Modal title="Item edition" open={isTaskModalOpen} onOk={handleTaskModalOk} onCancel={handleTaskModalCancel} okText="Save">
            <Input type={"text"} value={newTaskName} onChange={handleNewTaskName}
                   style={{marginBottom: '10px'}}/>
            <Select value={newTaskType} onChange={handleNewTaskType} style={{ width: '100%' }}>
                {taskTypeList.map((taskType) =>
                    <Option key={taskType}>{taskType}</Option>
                )}
            </Select>
        </Modal>
    )
}

export default ItemModal;