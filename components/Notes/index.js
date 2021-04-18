import React from 'react';
import NoteItem from '../NoteItem';
import styles from './Notes.module.scss';

const Notes = ({ notes, empty }) => {
  if (empty) {
    return (
      <div className={styles.empty}>
        <p>Please try add some note(s)</p>
      </div>
    );
  }

  return (
    <div className={styles.note_list}>
      {notes.map((note) => <NoteItem key={note.id} note={note} />)}
    </div>
  );
};

export default Notes;
