import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import Card from './Card'
import Board from './Board';


function shuffle() {
  const array = [0,1,2,3,4,5,6,7,8]

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

class Puzzle extends Component {

  constructor(props) {
    super(props);


    this.state = { 
      gridArray:[0,1,2,3,4,5,6,7,8],
      boardArray:shuffle(),
      grid:[1,1,1,1,1,1,1,1,1],
      board:[0,0,0,0,0,0,0,0,0]
    }
}


onMove(destination){

  const gridValidity = this.state.grid.slice();
  
  console.log('gridValidity[destination]:'+gridValidity[destination])
  if(gridValidity[destination]===1){
    gridValidity[destination]=0;
    
    this.setState({
      grid:gridValidity,    
    });
    console.log('onMove : '+true);
    console.log('onMove: '+ destination)

    return true
  }

  else{
    console.log('onMove : '+false);
    return false
  }
  

}


renderGridSquares() {
  const { size, level } = this.props;
  const { gridArray } = this.state;

  const gridSquares = gridArray.map((i) => {
    return (
      <Grid key={i} id={'grid-'+i} valid={1} size={size} level={level} position={i} onMove={this.onMove.bind(this)}> </Grid>
      
    );
  })
  
  return gridSquares;
} 

renderBoardSquares() {
  const {image, size, level } = this.props;
  const { gridArray,boardArray } = this.state;

  const boardSquares = gridArray.map((i) => {
    return (
      <Board key={i} id={'board-'+i} size={size} image={image} level={level} position={i}>
          <Card id={'card-'+boardArray[i]} source_id={'board-'+i} size={size} image={image} level={level}
           position={boardArray[i]}>             
          </Card>
      </Board>
    );
  })
  
  return boardSquares;
}


  render(){

      const { image, size,} = this.props;  
      
      return(
                  
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              float:'left', 
            }}>



              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                backgroundImage: `url(${image})`,
                backgroundSize: `${size}px ${size}px`,
                width: `${size}px`,
                height: `${size}px`,
                margin: '175px'
              }}>

                  {this.renderGridSquares()}


              </div>
              


              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'space-around',
                width: `${size+6}px`,
                height: `${size+6}px`,
                margin: '175px'
              }}>
                  
                  {this.renderBoardSquares()}
                
              </div>
              


            </div>

          
        );

    }
    
}

Puzzle.propTypes = {
    image: PropTypes.string.isRequired,
    size: PropTypes.number,
    level: PropTypes.number,
  };
  
Puzzle.defaultProps = {  
    size: 300,
    level: 3,
};

export default Puzzle
