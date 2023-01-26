import React from 'react';
import Modif from './Modif';



function Task(props : {task : {typeList : string, nameList : string, modif : string },  removeFromList : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, moveTask : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, modifTask : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, changeTask : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }){
    if(props.task.typeList === 'To do') {
        return <>
            <li key={props.task.nameList}>{props.task.nameList}</li>
            <button data-value={props.task.nameList} onClick={props.removeFromList}>Supprimer</button>
            <button data-value={props.task.nameList} onClick={props.moveTask}>In progress</button>
            <button data-value={props.task.nameList} onClick={props.moveTask}>Done</button>
            <button data-value={props.task.nameList} onClick={props.modifTask}>Modifier</button>
            <Modif name={props.task.nameList} type={props.task.typeList}
                   active={props.task.modif} handler={props.changeTask}/>
        </>
    }
    else if(props.task.typeList === 'In progress') {
        return <>
            <li key={props.task.nameList}>{props.task.nameList}</li>
            <button data-value={props.task.nameList} onClick={props.removeFromList}>Supprimer</button>
            <button data-value={props.task.nameList} onClick={props.moveTask}>To do</button>
            <button data-value={props.task.nameList} onClick={props.moveTask}>Done</button>
            <button data-value={props.task.nameList} onClick={props.modifTask}>Modifier</button>
            <Modif name={props.task.nameList} type={props.task.typeList}
                   active={props.task.modif} handler={props.changeTask}/>
        </>
    }
    else{
        return <>
            <li key={props.task.nameList}>{props.task.nameList}</li>
            <button data-value={props.task.nameList} onClick={props.removeFromList}>Supprimer</button>
            <button data-value={props.task.nameList} onClick={props.moveTask}>To do</button>
            <button data-value={props.task.nameList} onClick={props.moveTask}>In progress</button>
            <button data-value={props.task.nameList} onClick={props.modifTask}>Modifier</button>
            <Modif name={props.task.nameList} type={props.task.typeList}
                   active={props.task.modif} handler={props.changeTask}/>
        </>
    }
}

export default Task;