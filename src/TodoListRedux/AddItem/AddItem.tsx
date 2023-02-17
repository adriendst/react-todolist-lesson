import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../store";
import {addItem} from "../Slice/ColumnSlice";


const AddItem = () => {
    const [newItemName, setNewItemName] = useState<string>('');
    const [newItemColumn, setNewItemColumn] = useState<string>();

    const dispatch = useDispatch()
    const columnsName = useSelector((state : State) => state.toDoListRedux.columns.map(column => ({ value: column.value, label: column.label })));

    const handleOnItemNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(e.target.value);
    };

    const handleOnCategoryChange = (newValue: string) => {
        setNewItemColumn(newValue);
    };

    const handleOnClickNewItem = () => {
        dispatch(addItem([newItemName, newItemColumn as string]))

        setNewItemName('');
        setNewItemColumn(undefined);
    };

    return (
        <div className="todo-list-edit-add-item">
            <Input
                placeholder="Item name"
                onChange={handleOnItemNameChange}
                value={newItemName}
            />

            <Select
                placeholder="Select column"
                onChange={handleOnCategoryChange}
                value={newItemColumn}
                options={columnsName}
            />

            <Button
                disabled={!newItemName?.length || !newItemColumn}
                onClick={handleOnClickNewItem}
            >
                Add Item
            </Button>
        </div>
    );
};

export default AddItem;
