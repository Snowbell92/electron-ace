import React from 'react'
import PropTypes from 'prop-types';

const Board = (props) => {



  const drop = e =>{
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display = 'block';
    e.target.appendChild(card);


  }

  const dragOver = e =>{
    e.preventDefault();

  }

  const {size, level} = props;
  const side = (size/level);

  return (
    <div style={{
      width: `${side}px`,
      height: `${side}px`,
      backgroundColor: '#555',
      margin: '1px'
      }}
        id={props.id}
        onDrop={drop}
        onDragOver={dragOver}

    >
      {props.children}
    </div>
  );
}

Board.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
}

export default Board
