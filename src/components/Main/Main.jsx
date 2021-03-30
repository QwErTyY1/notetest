import React from 'react';
import classes from "./Main.module.css";
import {TreeComponent} from "./Tree/TreeComponent";

export const Main = (props) => {

    return (
        <main className={classes.page__main}>
            <h1 className='visually-hidden'>My notes</h1>
            <section className={classes.notes}>
                <h2 className={classes.notes__title}>Notes list</h2>
                <div className={classes.notes__create}>
                    <label htmlFor="sublist">Create note</label>
                    <input onChange={(ev) => props.updateMainText(ev.target.value)}
                           value={props.mainText} placeholder='Create note' id='sublist'/>
                    <button onClick={() => {
                        props.createMainText()
                    }}>Create
                    </button>
                </div>
                <TreeComponent
                    {...props}
                    data={props.noteData}
                    noteText={props.noteText}
                    sublistText={props.sublistText}
                    level={0}/>
            </section>
        </main>
    )
}