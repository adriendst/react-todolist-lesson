import React, {useState} from 'react';
import {Button, List} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {ListTask} from "../../List";
import ItemModal from "../../ItemModal";
import {Draggable} from "react-beautiful-dnd";

interface Item {
    task: ListTask,
    removeFromList: (value: string) => void,
    changeTask: (value: string, type: string, newtype: string, newvalue: string, id: string) => void
    taskTypeList: string[];
    index: number;
}

function Item({task, removeFromList, changeTask, taskTypeList, index}: Item) {

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState('')
    const [newTaskType, setNewTaskType] = useState('')

    function showTaskModal() {
        setNewTaskName(task.nameList);
        setNewTaskType(task.typeList);
        setIsTaskModalOpen(true);
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <List.Item key={task.nameList} style={{display: 'flex', alignItems: 'center', height: '50px'}} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div style={{flex: 1}}>{task.nameList}</div>
                    <Button value={task.nameList} type={'primary'}
                            icon={<EditOutlined/>} onClick={showTaskModal} style={{marginRight: '10px'}}/>
                    <Button value={task.nameList} type={'primary'} danger
                            icon={<CloseOutlined/>} onClick={() => removeFromList(task.nameList)}/>
                    <ItemModal isTaskModalOpen={isTaskModalOpen} taskTypeList={taskTypeList} newTaskType={newTaskType}
                               newTaskName={newTaskName} setIsTaskModalOpen={setIsTaskModalOpen}
                               setNewTaskType={setNewTaskType}
                               changeTask={changeTask} setNewTaskName={setNewTaskName} task={task}></ItemModal>
                </List.Item>
            )}
        </Draggable>
    )
}

export default Item;