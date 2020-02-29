import React from 'react'
import PropTypes from 'prop-types';

const Card = (props) => {

  const dragStart = e =>{
    const {source_id} = props
    const target = e.target;
    
    e.dataTransfer.setData('card_id', target.id);
    e.dataTransfer.setData('source_id' , source_id);

    /*setTimeout(() => {
        target.style.display = "none";
    },0);
    */
   
    console.log('clicked card : '+target.id)
  }

  const dragOver = e =>{
    const card_id = e.dataTransfer.getData('card_id')
    const card = document.getElementById(card_id)
    console.log('target card over : '+e.target.id)
    console.log('moved card over : '+card.source_id)
  
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
        source_id={props.source_id}
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
    source_id: PropTypes.string,
}

export default Card
