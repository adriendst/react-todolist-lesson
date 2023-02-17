import { Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Column, Item } from '../TodoListRedux/TodoListRedux';
import {useSelector} from "react-redux";
import {State} from "../store";

interface ItemModalInterface {
    columns: Column[];
    onCloseItem(): void;
    onSaveItem(newItem: Item): void;
}

const ItemModal = ({
    onCloseItem,
    onSaveItem,
    columns,
}: ItemModalInterface) => {
    const [newItemName, setNewItemName] = useState<string>();
    const [newItemColumn, setNewItemColumn] = useState<string>();

    const item = useSelector((state : State) => state.toDoListRedux.itemModal)

    useEffect(() => {
        setNewItemName(item?.label);
        setNewItemColumn(item?.columnId);
    }, [item]);

    const handleOnSave = () => {
        if (newItemName && item && newItemColumn) {
            onSaveItem({
                ...item,
                label: newItemName,
                columnId: newItemColumn,
            });
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCategoryChange = (newValue: string) => {
        setNewItemColumn(newValue);
    };

    return (
        <Modal
            title="Item edition"
            open={item !== null}
            onOk={handleOnSave}
            okText="Save"
            onCancel={onCloseItem}
            className="todo-list-edit-item-modal"
        >
            <Input value={newItemName} onChange={handleOnChange} />
            <Select
                placeholder="Select column"
                onChange={handleOnCategoryChange}
                value={newItemColumn}
                options={columns}
            />
        </Modal>
    );
};

export default ItemModal;
