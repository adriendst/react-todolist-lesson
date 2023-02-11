import React from 'react';
import {Input, Modal} from "antd";

interface ColumnModal{
    setNewTaskTypeName : React.Dispatch<React.SetStateAction<string>>
    changeTaskTypeName : (value : string, newvalue : string) => void,
    typeList : string,
    newTaskTypeName : string,
    setIsTypeModalOpen : React.Dispatch<React.SetStateAction<boolean>>
    isTypeModalOpen : boolean,

}

function ColumnModal({setNewTaskTypeName, changeTaskTypeName, typeList, newTaskTypeName, setIsTypeModalOpen, isTypeModalOpen} : ColumnModal) {

    function handleNewTaskTypeName(e: React.ChangeEvent<HTMLInputElement>) {
        setNewTaskTypeName(e.target.value)
    }

    function handleTypeModalOk() {
        setIsTypeModalOpen(false);
        changeTaskTypeName(typeList, newTaskTypeName)
    }

    function handleTypeModalCancel() {
        setIsTypeModalOpen(false);
        setNewTaskTypeName(typeList)
    }

    return(
        <Modal title="Column edition" open={isTypeModalOpen} onOk={handleTypeModalOk} onCancel={handleTypeModalCancel} okText="Save">
            <Input placeholder="Column name" type={"text"} value={newTaskTypeName} onChange={handleNewTaskTypeName}  />
        </Modal>
    )
}

export default ColumnModal;