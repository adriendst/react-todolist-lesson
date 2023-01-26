import React, {useState} from 'react';



function Modif(props :{name : string, type : string,  active : string, handler : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}){

    const [taskNameModif, setTaskNameModif] = useState<string>(props.name);

    function handleChangeTaskNameModif(e: React.ChangeEvent<HTMLInputElement>){
        setTaskNameModif(e.target.value);
    }

    return <>
        <div style={{display : props.active}}>
            <input value = {taskNameModif} onChange={handleChangeTaskNameModif}/>
            <button data-value={props.type} value={props.name} onClick={props.handler}>Confirmer</button>
        </div>
    </>
}

export default Modif;