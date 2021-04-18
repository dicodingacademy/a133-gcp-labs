import Head from 'next/head';
import React, { Component } from 'react';
import HeadBar from '../components/Common/HeadBar';
import AnnounceBar from '../components/Common/AnnounceBar';
import Notes from '../components/Notes';
import FloatingButton from '../components/Common/FloatingButton';

import styles from './Home.module.scss';
import { getBaseURL } from '../lib/utils/storage';
import fetcher from '../lib/utils/fetcher';

const onAddNoteClick = () => {
  if (window) {
    window.location.href = '/notes/new';
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      empty: false,
      isError: false,
    };
  }

  async componentDidMount() {
    try {
      const { data: { notes } } = await fetcher(`${getBaseURL()}notes`);
      this.setState(() => ({ notes, empty: notes.length < 1 }));
    } catch (error) {
      this.setState((prevState) => ({ ...prevState, isError: true }));
    }
  }

  render() {
    const { notes, isError, empty } = this.state;
    return (
      <div>
        <Head>
          <title>Notes Apps</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AnnounceBar />
        <HeadBar />
        <main>
          {isError ? (
            <p className={styles.error}>
              Error displaying notes! Make sure you have done with the
              back-end or correct url.
            </p>
          ) : <Notes empty={empty} notes={notes} />}
        </main>
        <FloatingButton onClickHandler={onAddNoteClick} icon="/icon/add.svg" text="Add Note" />
      </div>
    );
  }
}

export default Home;
