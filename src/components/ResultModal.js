import React from 'react';
import pic from '../img/loginmac.png';

const ResultModal = (props) => {
  return (
    <>
      {props.showFlag ? (
        // showFlagがtrueだったらformを表示する
        <img src={pic} width={'300'} height={'250'} alt='macIcon' />
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default ResultModal;
