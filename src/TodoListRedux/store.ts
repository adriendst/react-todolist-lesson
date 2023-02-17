import { configureStore } from '@reduxjs/toolkit';
import columnReducer, {TodoListRedux} from './Slice/ColumnSlice'

export interface State {
    toDoListRedux : TodoListRedux,
}

export default configureStore({
    reducer: {
        toDoListRedux : columnReducer,
    },
});