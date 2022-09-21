import React from 'react';

const Card = ({ priority, title, handleClick }) => {
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
