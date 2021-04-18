import React, { Component } from 'react';
import Head from 'next/head';
import ContentEditable from 'react-contenteditable';
import Link from 'next/link';
import AnnounceBar from '../../../components/Common/AnnounceBar';
import styles from './Edit.module.scss';
import { getBaseURL } from '../../../lib/utils/storage';
import fetcher from '../../../lib/utils/fetcher';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      tags: [],
      isFetching: false,
      isError: false,
      note: null,
    };

    this.contentEditable = React.createRef();

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleUpdateNote = this.handleUpdateNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    // eslint-disable-next-line no-empty
  }

  async componentDidMount() {
    try {
      const { id } = this.props;
      const { data: { note } } = await fetcher(`${getBaseURL()}notes/${id}`);
      const { title, body, tags } = note;

      this.setState((prevState) => ({
        ...prevState, note, title, body, tags,
      }));
    } catch (error) {
      this.setState((prevState) => ({ ...prevState, isError: true }));
    }
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

  async handleUpdateNote() {
    const { title, body, tags } = this.state;
    const { id } = this.props;

    this.setState((prevState) => ({
      ...prevState,
      isFetching: true,
    }));

    try {
      await fetcher(`${getBaseURL()}notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, tags }),
      });

      if (window) {
        window.location.href = `/notes/${id}`;
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

  async handleDeleteNote() {
    const { id } = this.props;

    try {
      await fetcher(`${getBaseURL()}notes/${id}`, {
        method: 'DELETE',
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

  renderError() {
    return (
      <div>
        <Head>
          <title>Notes - Not Found</title>
        </Head>
        <AnnounceBar />
        <main className={styles.error}>
          <p>Error displaying notes! Make sure you have done with the back-end or correct url.</p>
          <Link href="/">Back to Home</Link>
        </main>
      </div>
    );
  }

  renderSuccess() {
    const {
      title, body, isFetching, tags,
    } = this.state;

    return (
      <div>
        <Head>
          <title>
            Edit -
            {' '}
            {title}
          </title>
        </Head>
        <AnnounceBar />
        <main className={styles.edit_page}>
          <section className={styles.edit_page__content}>
            <header className={styles.edit_page__header}>
              <input
                className={styles.edit_page__title}
                value={title}
                onChange={this.handleTitleChange}
                type="text"
                autoComplete="off"
                placeholder="Note title"
              />
              <input
                className={styles.edit_page__tags}
                placeholder="Tag 1, Tag 2, Tag 3"
                defaultValue={tags.join(', ')}
                type="text"
                autoComplete="off"
                onChange={this.handleTagsChange}
              />
            </header>

            <ContentEditable
              className={styles.edit_page__body}
              html={body}
              innerRef={this.contentEditable}
              disabled={false}
              onChange={this.handleBodyChange}
            />

            <div className={styles.edit_page__action}>
              <button
                disabled={isFetching}
                className={styles.update_button}
                type="button"
                onClick={this.handleUpdateNote}
              >
                Save Note
              </button>
              <button
                className={styles.delete_button}
                type="button"
                onClick={this.handleDeleteNote}
              >
                Delete Note
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  render() {
    const { isError, note } = this.state;

    if (isError) {
      return this.renderError();
    }

    if (note) {
      return this.renderSuccess();
    }

    return (<></>);
  }
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  return { props: { id } };
}

export default Edit;
