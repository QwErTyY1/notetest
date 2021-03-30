import {combineReducers, createStore} from 'redux';
import notesReducer from "./notes-reducer";

const reducersMerge = combineReducers(
    {
        notesPage: notesReducer
    }
);
let store = createStore(reducersMerge);
export default store;