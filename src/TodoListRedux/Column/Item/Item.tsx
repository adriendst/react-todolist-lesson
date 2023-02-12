import React, {useState} from 'react';
import {Button, List} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {ListTask} from "../../List";
import ItemModal from "../../ItemModal";

interface Item {
    task: ListTask,
    removeFromList: (value: string) => void,
    changeTask: (value: string, type: string, newtype: string, newvalue: string, id: string) => void
    taskTypeList: string[];
}

function Item({task, removeFromList, changeTask, taskTypeList}: Item) {

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskType, setNewTaskType] = useState('')

    function showTaskModal() {
        setNewTaskName(task.nameList);
        setNewTaskType(task.typeList);
        setIsTaskModalOpen(true);
    }

    return (
        <List.Item key={task.nameList} style={{display: 'flex', alignItems: 'center', height: '50px'}}>
            <div style={{flex: 1}}>{task.nameList}</div>
            <Button value={task.nameList} type={'primary'}
                    icon={<EditOutlined/>} onClick={showTaskModal} style={{marginRight: '10px'}}/>
            <Button value={task.nameList} type={'primary'} danger
                    icon={<CloseOutlined/>} onClick={() => removeFromList(task.nameList)}/>
            <ItemModal isTaskModalOpen={isTaskModalOpen} taskTypeList={taskTypeList} newTaskType={newTaskType}
                       newTaskName={newTaskName} setIsTaskModalOpen={setIsTaskModalOpen} setNewTaskType={setNewTaskType}
                       changeTask={changeTask} setNewTaskName={setNewTaskName} task={task}></ItemModal>
        </List.Item>
    )
}

export default Item;