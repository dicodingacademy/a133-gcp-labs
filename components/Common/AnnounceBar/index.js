import React, { Component } from 'react';
import Link from 'next/link';
import styles from './AnnounceBar.module.scss';
import { getBaseURL, setBaseURL } from '../../../lib/utils/storage';

class AnnounceBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      host: '/',
    };
  }

  componentDidMount() {
    this.setState({ host: getBaseURL() });
  }

  render() {
    const { host } = this.state;

    return (
      <div className={styles.announce_bar}>
        <p>
          Web Server API:
          {' '}
          <Link
            href={host}
            target="__blank"
          >
            {host}
          </Link>
          {' '}
          |
          {' '}
          <button type="button" onClick={setBaseURL}>Change URL</button>

        </p>
      </div>
    );
  }
}

export default AnnounceBar;
