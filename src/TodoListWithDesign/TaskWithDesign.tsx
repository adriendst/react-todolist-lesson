import React, {useState} from 'react';
import {ListTask} from "./List";
import {Button,Select, Input, List} from "antd";


function TaskWithDesign(props: { task: ListTask, value: string, removeFromList: (value: string) => void, modifList: (value: string) => void, modifTask: (value : string, type:string,newtype:string, newvalue : string)=> void, taskTypeList : string[]}) {
    const {Option} = Select;
    const [taskNameModif, setTaskNameModif] = useState<string>(props.task.nameList);

    function handleChangeTaskNameModif(e: React.ChangeEvent<HTMLInputElement>){
        setTaskNameModif(e.target.value);
    }

    const [taskTypeModif, setTaskTypeModif] = useState<string>(props.task.typeList);

    function handleChangeTaskTypeModif(value: string){
        setTaskTypeModif(value);
    }

    return <>
        <List.Item key={props.task.nameList}>
            {props.task.nameList}
            <Button value={props.task.nameList} type={'primary'} danger
                    onClick={() => props.removeFromList(props.task.nameList)} style={{float: 'right'}}>X</Button>
            <Button value={props.task.nameList} type={'primary'}
                    onClick={() => props.modifList(props.task.nameList)}
                    style={{marginRight: '10px', float: 'right'}}>Modifier</Button>
            <div style={{display: props.task.modif}}>
                <Input value={taskNameModif} onChange={handleChangeTaskNameModif} style={{width:'300px', marginRight:'10px'}}/>
                <Select value={taskTypeModif} onChange={handleChangeTaskTypeModif} style={{order: 2, margin: '10px', width: '120px'}}>
                    {props.taskTypeList.map((taskType) =>
                        <Option key={taskType}>{taskType}</Option>
                    )}
                </Select>
                <Button data-value={props.task.typeList} value={props.task.nameList} onClick={() => props.modifTask(props.task.nameList, props.task.typeList, taskTypeModif, taskNameModif)} type={'primary'}>Confirmer</Button>
            </div>
        </List.Item>
    </>


}

export default TaskWithDesign;