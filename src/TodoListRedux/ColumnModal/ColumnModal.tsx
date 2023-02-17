import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Column } from '../TodoListRedux/TodoListRedux';
import {useSelector} from "react-redux";
import {State} from "../store";

interface ColumnModalInterface {
    onCloseColumn(): void;
    onSaveColumn(newColumn: Column): void;
}

const ColumnModal = ({
    onCloseColumn,
    onSaveColumn,
}: ColumnModalInterface) => {
    const [newColumnName, setNewColumnName] = useState<string>();

    const column = useSelector((state : State) => state.toDoListRedux.columnModal)

    useEffect(() => {
        setNewColumnName(column?.label);
    }, [column]);

    const handleOnSave = () => {
        if (newColumnName && column) {
            onSaveColumn({
                ...column,
                label: newColumnName,
            });
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewColumnName(e.target.value);
    };

    return (
        <Modal
            title="Column edition"
            open={column !== null}
            onOk={handleOnSave}
            okText="Save"
            onCancel={onCloseColumn}
            className="todo-list-edit-Column-modal"
        >
            <Input value={newColumnName} onChange={handleOnChange} />
        </Modal>
    );
};

export default ColumnModal;
