import React from 'react';
import pic from '../img/omedeto.png';

const ResultModal = (props) => {
  const closeModal = () => {
    props.setShowResultModal(false);
  };
  return (
    <>
      {props.showFlag ? (
        // showFlagがtrueだったらformを表示する
        <div id='overlay'>
          <div className='resultModal'>
            <img
              className='resultImg'
              src={pic}
              width={'300'}
              height={'250'}
              alt='resultImg'
            />
            <button className='closeButton' onClick={closeModal}>
              close
            </button>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default ResultModal;
