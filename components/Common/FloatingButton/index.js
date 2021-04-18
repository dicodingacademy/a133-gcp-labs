import React from 'react';
import styles from './FloatingButton.module.scss';

const FloatingButton = ({ text, icon, onClickHandler }) => (
  <div className={styles.floating}>
    <button onClick={onClickHandler} type="button" className={styles.floating_button}>
      <img src={icon} alt={text} />
      <span>{text}</span>
    </button>
  </div>
);

export default FloatingButton;
