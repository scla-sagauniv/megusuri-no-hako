import React from 'react';

const Card = ({ priority, title }) => {
  return (
    <div
      className={
        priority === 1
          ? 'tomato'
          : priority === 2
          ? 'meat'
          : priority === 3
          ? 'cheese'
          : 'lettuce'
      }
    >
      {title}
    </div>
  );
};

export default Card;
