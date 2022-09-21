import React from 'react';

const Card = ({ priority, title }) => {
  const handleClick = (e) => {
    //モーダルを起動する処理
    console.log(e);
  };

  return (
    <div
      className={
        priority === 1
          ? 'food tomato'
          : priority === 2
          ? 'food meat'
          : priority === 3
          ? 'food cheese'
          : 'food lettuce'
      }
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default Card;
