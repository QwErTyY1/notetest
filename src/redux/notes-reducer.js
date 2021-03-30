import React from "react";
import {arrayMoveNotes, removeNotes} from "../helpers/buildTree";

const SIBLINGS = 'siblings';
const REMOVE_SUBLIST = 'remove_sublist';
const DROP_BRANCH = 'drop_branch';
const ADD_NOTE = 'add_node';
const UPDATE_NOTE_TEXT = 'update_note_text';
const UPDATE_SUBLIST_TEXT = 'update_sublist_text';
const SET_NOTE_DATA = 'set_note_data';
const ADD_SUBLIST = 'add_sublist';
const CREATE_MAIN_NOTE = 'create_note';
const UPDATE_MAIN_TEXT = 'create_note_text';
const MOVE_UP = 'move_up';
const MOVE_DOWN = 'move_down';

const initialState = {
    note_data: [],
    note_text: {1: ''},
    sublist_text: {1: ''},
    main_note_text: ''
};

const notesReducer = (state = initialState, action) => {
    const id = new Date().valueOf();
    let cloneStateS = {...state};
    let indexById;
    if (action.hasOwnProperty('id')) {
        indexById = cloneStateS.note_data.findIndex(el => el.id === action.id);
    }
    switch (action.type) {
        case ADD_NOTE:
            const respData = {parentId: action.parentId, id: action.id};
            if (cloneStateS.note_text[action.id]) {
                if (respData.parentId) {
                    cloneStateS.note_data.splice(indexById + 1, 0, {
                        text: cloneStateS.note_text[action.id],
                        id: id,
                        parent_id: respData.parentId
                    })
                } else {
                    cloneStateS.note_data.splice(indexById + 1, 0, {
                        text: cloneStateS.note_text[action.id],
                        id: id,
                        parent_id: respData.parentId
                    })
                }
            }
            return {
                ...cloneStateS,
                note_text: {}
            }
        case DROP_BRANCH:
            return {
                ...cloneStateS,
                note_data: removeNotes(action.id, cloneStateS.note_data)
            }
        case SIBLINGS:
            return {
                ...state
            }
        case CREATE_MAIN_NOTE:

            (cloneStateS.main_note_text.length > 0)
            && cloneStateS.note_data.splice(0, 0, {text: cloneStateS.main_note_text, id, parent_id: null});
            return {
                ...cloneStateS,
                main_note_text: ''
            }
        case UPDATE_MAIN_TEXT:
            return {
                ...state,
                main_note_text: action.mainText
            }
        case UPDATE_NOTE_TEXT:
            cloneStateS.note_text[action.id] = action.noteText;
            return cloneStateS;
        case UPDATE_SUBLIST_TEXT:
            cloneStateS.sublist_text[action.id] = action.sublist;
            return cloneStateS
        case SET_NOTE_DATA:
            return {
                ...state,
                note_data: action.note_data,
                note_text: action.note_text
            }
        case ADD_SUBLIST:

            cloneStateS.sublist_text[action.id] &&
            cloneStateS.note_data.splice(cloneStateS.note_data.findIndex(el => el.id === action.id), 0, {
                parent_id: action.id,
                id,
                text: cloneStateS.sublist_text[action.id]
            })
            return {
                ...cloneStateS,
            }
        case REMOVE_SUBLIST:
            return {
                ...cloneStateS,
                note_data: removeNotes(action.id, cloneStateS.note_data, true)
            }
        case MOVE_UP:
            const nextIndex = indexById - 1;
            if (cloneStateS.note_data[nextIndex]) {
                arrayMoveNotes(cloneStateS.note_data, indexById, nextIndex);
            }
            return {
                ...cloneStateS
            }
        case MOVE_DOWN:
            const prevIndex = indexById + 1;
            if (cloneStateS.note_data[prevIndex]) {
                arrayMoveNotes(cloneStateS.note_data, indexById, prevIndex);
            }
            return {
                ...cloneStateS
            }
        default:
            return state;

    }
}

export const SetNoteData = (note_data, note_text) => ({type: SET_NOTE_DATA, note_data, note_text})
export const addNote = (parentId, id, serialIndex) => ({type: ADD_NOTE, parentId, id, serialIndex});
export const dropBranch = (id) => ({type: DROP_BRANCH, id});
export const siblings = () => ({type: SIBLINGS});
export const updateNoteText = (noteText, id) => ({type: UPDATE_NOTE_TEXT, noteText, id});
export const updateSublistText = (sublist, id) => ({type: UPDATE_SUBLIST_TEXT, sublist, id});
export const createMainText = () => ({type: CREATE_MAIN_NOTE});
export const updateMainText = (mainText) => ({type: UPDATE_MAIN_TEXT, mainText});
export const addSublist = (id) => ({type: ADD_SUBLIST, id})
export const removeSublist = (id) => ({type: REMOVE_SUBLIST, id})
export const moveUp = (id) => ({type: MOVE_UP, id})
export const moveDown = (id) => ({type: MOVE_DOWN, id})

export default notesReducer;