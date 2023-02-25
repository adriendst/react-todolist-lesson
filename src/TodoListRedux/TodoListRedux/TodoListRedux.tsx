import React from 'react';
import AddColumn from '../AddColumn/AddColumn';
import AddItem from '../AddItem';
import ColumnComp from '../Column';
import ColumnModal from '../ColumnModal';
import ItemModal from '../ItemModal';
import './TodoListRedux.css';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../store";
import {modifyColumn, modifyColumnModal, modifyItem, modifyItemModal} from "../Slice/ColumnSlice";
import {DragDropContext, DropResult} from "react-beautiful-dnd";

export interface Column {
    value: string;
    label: string;
}

export interface Item {
    id: string;
    columnId: string;
    label: string;
}

const TodoListRedux = () => {
    const dispatch = useDispatch()

    const items = useSelector((state: State) => state.toDoListRedux.items)
    const columns = useSelector((state: State) => state.toDoListRedux.columns)

    const handleOnEditItem = (idItem: string) => {
        const item = items.find(({id}) => id === idItem);

        if (item) {
            dispatch(modifyItemModal(item));
        }
    };

    const handleOnEditColumn = (idColumn: string) => {
        const column = columns.find(({value}) => value === idColumn);

        if (column) {
            dispatch(modifyColumnModal(column));
        }
    };

    const handleOnCloseItem = () => {
        dispatch(modifyItemModal(null))
    };

    const handleOnCloseColumn = () => {
        dispatch(modifyColumnModal(null))
    };

    const handleOnSaveItem = (newItem: Item) => {
        dispatch(modifyItem(newItem))
        handleOnCloseItem();
    };

    const handleOnSaveColumn = (newColumn: Column) => {
        dispatch(modifyColumn(newColumn))
        handleOnCloseColumn();
    };

    const onDragEnd = (result: DropResult) => {
        const {destination, draggableId} = result;

        if (!destination) {
            return;
        }

        const item = items.find(({id}) => id === draggableId);

        if (item) {
            const updatedItem = {
                ...item,
                columnId: destination.droppableId
            };
            dispatch(modifyItem(updatedItem));
        }

    }

    return (
        <div className="todo-list-edit">
            <AddColumn/>

            <AddItem/>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="todo-list-edit-columns">

                    {columns.map(({label, value}, index) => {

                        return (
                            <ColumnComp
                                value={value}
                                label={label}
                                onEditItem={handleOnEditItem}
                                onEditColumn={handleOnEditColumn}
                                key={index}
                                />
                        );
                    })}

                </div>
            </DragDropContext>

            <ItemModal
                onCloseItem={handleOnCloseItem}
                onSaveItem={handleOnSaveItem}
                columns={columns}
            />

            <ColumnModal
                onCloseColumn={handleOnCloseColumn}
                onSaveColumn={handleOnSaveColumn}
            />
        </div>
    );
};

export default TodoListRedux;
