import React, {useState} from 'react';
import {Button} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import ColumnModal from "../../ColumnModal";

interface Header {
    typeList: string,
    removeType: (value: string) => void,
    changeTaskTypeName: (value: string, newvalue: string) => void
}

function Header({typeList, removeType, changeTaskTypeName}: Header) {

    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
    const [newTaskTypeName, setNewTaskTypeName] = useState('')

    function showTypeModal() {
        setNewTaskTypeName(typeList);
        setIsTypeModalOpen(true);
    }

    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <div>{typeList}</div>
            <div style={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                <Button type={"primary"} icon={<EditOutlined/>} onClick={showTypeModal} style={{marginRight: "10px"}}/>
                <Button type={"primary"} danger onClick={() => removeType(typeList)} icon={<CloseOutlined/>}
                        style={{marginRight: "10px"}}/>
            </div>
            <ColumnModal changeTaskTypeName={changeTaskTypeName} newTaskTypeName={newTaskTypeName}
                         isTypeModalOpen={isTypeModalOpen} setIsTypeModalOpen={setIsTypeModalOpen}
                         setNewTaskTypeName={setNewTaskTypeName} typeList={typeList}></ColumnModal>
        </div>
    )
}

export default Header;