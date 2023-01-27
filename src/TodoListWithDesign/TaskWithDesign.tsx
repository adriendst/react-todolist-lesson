import React, {useState} from 'react';
import {ListTask} from "./List";
import {Button, Empty, Input, List} from "antd";


function TaskWithDesign(props: { task: ListTask, value: string, removeFromList: (value: string) => void, modifList: (value: string) => void, modifTaskName: (value : string, type:string, newvalue : string)=> void}) {
    const [taskNameModif, setTaskNameModif] = useState<string>(props.task.nameList);

    function handleChangeTaskNameModif(e: React.ChangeEvent<HTMLInputElement>){
        setTaskNameModif(e.target.value);
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
                <Button data-value={props.task.typeList} value={props.task.nameList} onClick={() => props.modifTaskName(props.task.nameList, props.task.typeList, taskNameModif)} type={'primary'}>Confirmer</Button>
            </div>
        </List.Item>
    </>


}

export default TaskWithDesign;