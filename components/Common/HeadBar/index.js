import React from 'react';
import styles from './HeadBar.module.scss';

const HeadBar = () => (
  <header className={styles.head_bar}>
    <h1>
      Notes
      <span> Apps (Version 1)</span>
    </h1>
  </header>
);

export default HeadBar;
