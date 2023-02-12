import React from 'react';
import {Button, Input} from "antd";
import addColumn from "./index";

interface addColumn {
    taskTypeName: string,
    handleChangeTaskTypeName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    newColumn: () => void
}

function AddColumn({newColumn, taskTypeName, handleChangeTaskTypeName}: addColumn) {
    return (
        <div style={{display: 'flex'}}>
            <Input placeholder='Column name' type={'text'} value={taskTypeName} onChange={handleChangeTaskTypeName}
                   style={{order: 1, margin: '10px'}}></Input>
            <Button onClick={() => newColumn()} style={{order: 2, margin: '10px'}} disabled={!taskTypeName}>Add
                column</Button>
        </div>
    )
}

export default AddColumn;