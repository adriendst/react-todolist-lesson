import React from 'react';
import {Provider} from "react-redux";
import store from "./store";
import TodoListRedux from "./TodoListRedux/TodoListRedux";

const TodoListWrapper = () => {
    return (
        <Provider store={store}>
            <TodoListRedux />
        </Provider>
    );
};

export default TodoListWrapper;