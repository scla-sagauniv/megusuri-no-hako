import React from 'react';

const Card = ({ id, priority, title, handleClick, selectTask }) => {
  const onClick = () => {
    console.log('click');
    console.debug(handleClick);
    handleClick();
    selectTask(id);
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
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default Card;
