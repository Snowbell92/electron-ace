import React from 'react'
import PropTypes from 'prop-types';

const Grid = (props) => {



  const drop = e =>{
    const {onMove,id} = props

    e.preventDefault();

    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display = 'block';

    e.target.appendChild(card);

    onMove(card_id,id);

  }

  const dragOver = e => {
    //console.log('Grid over : '+ e.target.id);
    e.preventDefault();

  }




  const {size, level} = props;
  const side = (size/level);

  return (
    <div style={{
      width: `${side}px`,
      height: `${side}px`,
      background: 'rgba(255, 255, 255, 0.4)',
      }}
        id={props.id}
        valid={props.valid}
        position={props.position}
        onDrop={drop}
        onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}

Grid.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  valid: PropTypes.number,
}

export default Grid
