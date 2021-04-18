import Head from 'next/head';
import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import styles from './New.module.scss';
import AnnounceBar from '../../components/Common/AnnounceBar';
import { getBaseURL } from '../../lib/utils/storage';
import fetcher from '../../lib/utils/fetcher';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      tags: [],
      isFetching: false,
    };

    this.contentEditable = React.createRef();

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }

  handleTitleChange({ target }) {
    this.setState((prevState) => ({
      ...prevState,
      title: target.value,
    }));
  }

  handleTagsChange({ target }) {
    this.setState((prevState) => ({
      ...prevState,
      tags: target.value.split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    }));
  }

  handleBodyChange({ target }) {
    this.setState((prevState) => ({
      ...prevState,
      body: target.value,
    }));
  }

  async handleSaveNote() {
    const { title, body, tags } = this.state;

    this.setState((prevState) => ({
      ...prevState,
      isFetching: true,
    }));

    try {
      await fetcher(`${getBaseURL()}notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, tags }),
      });

      if (window) {
        window.location.href = '/';
      }
    } catch (error) {
      if (window) {
        alert(error.message);
      }

      this.setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleDiscardNote() {
    if (window) {
      window.location.href = '/';
    }
  }

  render() {
    const { title, body, isFetching } = this.state;
    return (
      <div>
        <Head>
          <title>Add New Notes</title>
        </Head>
        <AnnounceBar />
        <main className={styles.new_page}>
          <section className={styles.new_page__content}>
            <header className={styles.new_page__header}>
              <input
                className={styles.new_page__title}
                value={title}
                onChange={this.handleTitleChange}
                type="text"
                autoComplete="off"
                placeholder="Note title"
              />
              <input
                className={styles.new_page__tags}
                placeholder="Tag 1, Tag 2, Tag 3"
                type="text"
                autoComplete="off"
                onChange={this.handleTagsChange}
              />
            </header>

            <ContentEditable
              className={styles.new_page__body}
              html={body}
              innerRef={this.contentEditable}
              disabled={false}
              onChange={this.handleBodyChange}
            />

            <div className={styles.new_page__action}>
              <button
                disabled={isFetching}
                className={styles.update_button}
                type="button"
                onClick={this.handleSaveNote}
              >
                Save Note
              </button>
              <button
                className={styles.delete_button}
                type="button"
                onClick={this.handleDiscardNote}
              >
                Discard
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default New;
