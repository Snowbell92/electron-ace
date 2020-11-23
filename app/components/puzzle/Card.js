import React from 'react'
import PropTypes from 'prop-types';

const Card = (props) => {

  const dragStart = e =>{
    const target = e.target;

    e.dataTransfer.setData('card_id', target.id);
    
    /*setTimeout(() => {
        target.style.display = "none";
    },0);
    */
  }

  const dragOver = e =>{
    
    e.stopPropagation();

  }

  const {image, size, level, position} = props;
  const side = (size/level);
  const x = (position % level) * side;
  const y = Math.floor(position / level) * side;

  return (

    <div
        style={{
        width: `${side}px`,
        height: `${side}px`,
        backgroundImage: `url(${image})`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: `-${x}px -${y}px`,
        cursor: 'move',
        }}

        id={props.id}
        draggable="true"
        onDragStart={dragStart}
        onDragOver={dragOver}
    >

      {props.children}
    </div>

  );
}

Card.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
}

export default Card
