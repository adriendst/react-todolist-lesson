import React from 'react';
import {List} from 'antd';
import ItemComp from './Item';
import Header from './Header';
import {useDispatch, useSelector} from "react-redux";
import {removeColumn, removeItem} from "../Slice/ColumnSlice";
import {State} from "../store";
import {Droppable} from "react-beautiful-dnd";

interface ColumnInterface {
    value: string;
    label: string;
    onEditItem(id: string): void;
    onEditColumn(id: string): void;
}

const Column = ({
                    value,
                    label,
                    onEditItem,
                    onEditColumn,
                }: ColumnInterface) => {
    const dispatch = useDispatch()

    const Item = useSelector((state: State) => state.toDoListRedux.items.filter(({columnId}) => columnId === value));

    return (
        <Droppable droppableId={value}>
            {(provided) => (
                <div ref={provided.innerRef} style={{width: '100%'}} >
                    <List className="todo-list-edit-column"
                          key={value}
                          header={
                              <Header
                                  label={label}
                                  onEditColumn={() => onEditColumn(value)}
                                  onDeleteColumn={() => dispatch(removeColumn(value))}
                              />
                          }
                          dataSource={Item}
                          renderItem={({label: itemLabel, id}, index) => (
                              <ItemComp
                                  label={itemLabel}
                                  id={id}
                                  onDeleteItem={() => dispatch(removeItem(id))}
                                  onEditItem={() => onEditItem(id)}
                                  index={index}
                                  key={id}
                              />
                          )}
                    />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Column;
