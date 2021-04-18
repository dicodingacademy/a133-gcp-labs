import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './NoteItem.module.scss';
import { convertISODate } from '../../lib/utils/date';

class NoteItem extends Component {
  constructor(props) {
    super(props);

    this.onItemClicked = this.onItemClicked.bind(this);
  }

  onItemClicked() {
    const { note } = this.props;
    const { id } = note;

    window.location.href = `/notes/${id}`;
  }

  render() {
    const { note } = this.props;
    const {
      title, tags, body, createdAt, updatedAt,
    } = note;

    return (
      <article onClick={this.onItemClicked} className={styles.note_item}>
        <header className={styles.note_item__header}>
          <h2 className={styles.note_item__title}>{title}</h2>
          <p className={styles.note_item__date}>
            {createdAt === updatedAt ? `Created at ${convertISODate(createdAt)}` : `Updated at ${convertISODate(updatedAt)}`}
          </p>
        </header>
        <ContentEditable disabled html={body} className={styles.note_item__content} />
        <footer className={styles.note_item__footer}>
          <div className={styles.note_item__tags}>
            {tags.map((tag) => <span key={tag} className={styles.note_item__tag}>{tag}</span>)}
          </div>
        </footer>
      </article>
    );
  }
}

export default NoteItem;
