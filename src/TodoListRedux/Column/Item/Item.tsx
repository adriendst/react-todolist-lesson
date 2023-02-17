import React from 'react';
import {CloseOutlined, EditOutlined} from '@ant-design/icons';
import {List, Button} from 'antd';
import {Draggable} from "react-beautiful-dnd";

interface ItemInterface {
    label: string;
    id: string;

    onDeleteItem(): void;

    onEditItem(): void;

    index: number
}

const Item = ({label, id, onDeleteItem, onEditItem, index}: ItemInterface) => {
    console.log(label, id)
    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div ref={provided.innerRef}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}>
                    <List.Item className="todo-list-edit-item">
                        {label}
                        <div className="todo-list-edit-item-action">
                            <Button
                                type="primary"
                                size="small"
                                icon={<EditOutlined/>}
                                onClick={onEditItem}
                            />
                            <Button
                                type="primary"
                                danger
                                size="small"
                                icon={<CloseOutlined/>}
                                onClick={onDeleteItem}
                            />
                        </div>
                    </List.Item>
                </div>
            )}
        </Draggable>
    );
};

export default Item;
