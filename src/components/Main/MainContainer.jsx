import React from "react";
import {Main} from "./Main";
import {connect} from "react-redux";
import {
    addNote,
    addSublist, createMainText, dropBranch, moveDown, moveUp, removeSublist,
    SetNoteData,
    updateMainText,
    updateNoteText,
    updateSublistText
} from "../../redux/notes-reducer";
import {makeTree} from "../../helpers/buildTree";

class MainContainer extends React.Component {

    setNoteDataS = () => {
        let note_data = [
        ];
        this.props.SetNoteData(note_data, {});
    }

    componentDidMount() {
        this.setNoteDataS();
    }

    render() {
        return (
            <Main  {...this.props} />
        )
    }
}

const MapStateToProps = (state) => ({
    noteText: state.notesPage.note_text,
    sublistText: state.notesPage.sublist_text,
    noteData: makeTree(state.notesPage.note_data),
    mainText: state.notesPage.main_note_text
});

const mapDispatchToProps = {
    updateNoteText, updateSublistText,
    SetNoteData, addNote, addSublist,
    updateMainText, dropBranch, createMainText,
    moveUp, moveDown, removeSublist
}
export default connect(MapStateToProps, mapDispatchToProps)(MainContainer);