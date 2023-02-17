import {createSlice} from '@reduxjs/toolkit';

export interface Column {
    value: string;
    label: string;
}

export interface Item {
    id: string;
    columnId: string;
    label: string;
}

export interface TodoListRedux {
    columns: Column[]
    items: Item[]
    itemModal : Item
    columnModal : Column
}

const randomId = () => (Math.random() + 1).toString(36).substring(7);

export const columnSlice = createSlice({

    name: 'example',
    initialState: {
        columns: [],
        items: [],
        itemModal : null,
        columnModal : null
    },
    reducers: {
        addColumn: (state: { columns: Column[] }, action: { payload: string }) => {
            state.columns.push({label: action.payload, value: randomId()});
        },
        removeColumn: (state: { columns: Column[], items : Item[] }, action: { payload: string }) => {
            state.columns = state.columns.filter(({value}) => value !== action.payload)
            state.items = state.items.filter(({ columnId }) => columnId !== action.payload)
        },
        addItem: (state: { items: Item[] }, action: { payload: string[] }) => {
            state.items.push({label: action.payload[0], columnId: action.payload[1], id: randomId()});
        },
        removeItem: (state: { items: Item[] }, action: { payload: string }) => {
            state.items = state.items.filter(({id}) => id !== action.payload)
        },
        modifyItem: (state: { items: Item[] }, action: { payload: Item }) => {
            state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item))
        },
        modifyColumn: (state: { columns: Column[] }, action: { payload: Column }) => {
            state.columns = state.columns.map((column) => (column.value === action.payload.value?  action.payload : column))
        },
        modifyItemModal : (state: { itemModal: Item | null }, action: { payload: Item | null}) => {
            state.itemModal = action.payload
        },
        modifyColumnModal : (state: { columnModal: Column | null }, action: { payload: Column | null}) => {
            state.columnModal = action.payload
        },
    },
});

export const {addColumn, removeColumn, addItem, removeItem, modifyItem, modifyColumn, modifyItemModal, modifyColumnModal} = columnSlice.actions;

export default columnSlice.reducer;