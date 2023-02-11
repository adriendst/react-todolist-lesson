import React from 'react';
import {Button, Select, Input} from "antd";

interface Item {
    taskTypeList: string[],
    taskName: string,
    taskType: string,
    handleChangeTask: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleChangeTaskType: (value: string) => void,
    newItem: () => void,
}

function AddItem({taskTypeList, handleChangeTaskType, newItem, taskType, taskName, handleChangeTask}: Item) {
    const {Option} = Select;

    return (
        <div style={{display: 'flex'}}>
            <Input placeholder='Nouvelle tâche' type={"text"} value={taskName} onChange={handleChangeTask}
                   style={{order: 1, margin: '10px'}}/>
            <Select value={taskType} onChange={handleChangeTaskType} style={{order: 2, margin: '10px', width: '350px'}}>
                {taskTypeList.map((taskType) =>
                    <Option key={taskType}>{taskType}</Option>
                )}
            </Select>
            <Button onClick={() => newItem()} style={{order: 3, margin: '10px'}} disabled={!taskName || !taskType}>Add
                item</Button>
        </div>
    )
}

export default AddItem;