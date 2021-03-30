import React from 'react';
import classes from './TreeComponent.module.css'
import {addNote, siblings, updateNoteText} from "../../../redux/notes-reducer";

export class TreeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.level = props.level + 1;

    }

    render() {
        return (
            <ul className={`${this.level} ${classes.tree_list}`}
                style={(this.level > 1) ? {transform: 'translateX(20px)'} : {}}>
                {this.props.data && this.props.data.map((item, index) => (

                    <li key={item.id} className={`${classes.tree_list__item} card`}>
                        <div className={`card__content`}>
                            <div>
                                {item.text}
                            </div>
                            <div>
                                {(index > 0) && <button onClick={() => this.props.moveUp(item.id)}>Up</button>}
                                {((index + 1) !== this.props.data.length) && <button onClick={() => this.props.moveDown(item.id)}>Down</button>}
                                <button onClick={() => this.props.dropBranch(item.id)}>Delete</button>
                                {(item.children.length === 0) ?
                                <div>
                                    <input type="text"
                                           value={this.props.sublistText[item.id] || ''}
                                           onChange={(ev) =>
                                               this.props.updateSublistText(ev.target.value, item.id)}
                                           placeholder='Sublist text'/>
                                    <button onClick={() => this.props.addSublist(item.id)}>Add Sublist</button>
                                </div>
                                    : <button onClick={() => this.props.removeSublist(item.id)}>Remove Sublist</button>
                                }
                            </div>
                        </div>

                        {(this.props.data.length - 1 === index && item.parent_id) && <div className={'card__down'}>
                            <label>
                                <input data-parent={item.parent_id} data-id={item.id}
                                       value={this.props.noteText[item.id] || ''}
                                       onChange={(ev) => this.props.updateNoteText(
                                           ev.target.value, item.id)
                                       }
                                       className={classes.tree_list__input}
                                       placeholder={'Write a note'}
                                       type="text"/>
                            </label>
                            <button onClick={() => this.props.addNote(item.parent_id, item.id, item.serial_index)}>Send</button>

                        </div>}

                        {item.children && <TreeComponent
                            {...this.props}
                            noteText={this.props.noteText}
                            level={this.level}
                            data={item.children}/>}
                    </li>
                ))}
            </ul>)
    }
}