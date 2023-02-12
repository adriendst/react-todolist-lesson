import React from 'react';
import {List, Empty} from "antd";
import {ListTask} from "../List";
import Header from "./Header"
import Item from "./Item";

interface Column{
    taskTypeList : string[],
    taskList : ListTask[],
    removeFromList :(value : string) => void,
    removeType :(value : string) => void,
    changeTask:(value :string, type: string, newtype : string, newvalue : string) => void,
    changeTaskTypeName : (value : string, newvalue : string) => void
}

function Column({taskTypeList, taskList, removeFromList, removeType, changeTask, changeTaskTypeName} : Column) {
    return(
        <div>
            {taskTypeList.map((value) => {
                if (taskList.some(element => element.typeList === value)) {
                    return <List
                        header={<Header typeList={value} removeType={removeType} changeTaskTypeName={changeTaskTypeName}/>}
                    >
                        {taskList.map((task) => {
                            if (task.typeList == value) {
                                return <Item task={task} removeFromList={removeFromList} changeTask={changeTask} taskTypeList={taskTypeList}/>
                            }
                        })
                        }
                    </List>
                } else {
                    return <List
                        header={<Header typeList={value} removeType={removeType} changeTaskTypeName={changeTaskTypeName}/>}
                    >
                        <Empty/>
                    </List>
                }
            })}
        </div>
    )
}

export default Column;