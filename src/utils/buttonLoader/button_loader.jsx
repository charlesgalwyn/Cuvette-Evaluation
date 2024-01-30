import React from 'react';
import Style from '../../styles/button_loader.module.css';

const ButtonLoader = () => {
  return (
    <div className={Style.spinnerContainer}>
      <div className={Style.spinner}></div>
    </div>
  );
};

export default ButtonLoader;