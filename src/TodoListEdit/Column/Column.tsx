import React from 'react';
import {List, Empty} from "antd";
import {ListTask} from "../List";
import Header from "./Header"
import Item from "./Item";
import {Droppable} from "react-beautiful-dnd";

interface Column {
    taskTypeList: string[],
    taskList: ListTask[],
    removeFromList: (value: string) => void,
    removeType: (value: string) => void,
    changeTask: (value: string, type: string, newtype: string, newvalue: string, id: string) => void,
    changeTaskTypeName: (value: string, newvalue: string) => void
}

function Column({taskTypeList, taskList, removeFromList, removeType, changeTask, changeTaskTypeName}: Column) {
    return (
        <div>
            {taskTypeList.map((value, index) => {
                if (taskList.some(element => element.typeList === value)) {
                    return <Droppable droppableId={value} key={index}>
                        {(provided) => (

                            <List
                                header={<Header typeList={value} removeType={removeType}
                                                changeTaskTypeName={changeTaskTypeName}/>}
                                style={{minHeight: '100px'}}
                            >
                                <div ref={provided.innerRef}
                                     {...provided.droppableProps}>
                                    {taskList.map((task, index) => {
                                        if (task.typeList == value) {
                                            return <Item key={task.id} task={task} removeFromList={removeFromList}
                                                         changeTask={changeTask}
                                                         taskTypeList={taskTypeList} index={index}/>
                                        }
                                    })
                                    }
                                    {provided.placeholder}
                                </div>
                            </List>
                        )}
                    </Droppable>
                } else {
                    return <Droppable droppableId={value} key={index}>
                        {(provided) => (

                            <List
                                header={<Header typeList={value} removeType={removeType}
                                                changeTaskTypeName={changeTaskTypeName}/>}
                            >
                                <div ref={provided.innerRef}
                                     {...provided.droppableProps}>
                                    <Empty/>
                                    {provided.placeholder}
                                </div>
                            </List>

                        )}
                    </Droppable>
                }
            })}
        </div>
    )
}

export default Column;