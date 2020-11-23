import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Grid from './Grid'
import Card from './Card'
import Board from './Board';

function createArray(level){
  const array = new Array(level*level);

  for(let i=0; i<level*level; i++){
    array[i] = i;
  }

  return array;
}

function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function checkDone(tempGrid, level){

  for(let i=0; i<level*level; i++){

    if(tempGrid[i]===0){
      return false;
    }
  }

  return true;
}

class Puzzle extends Component {

  constructor(props) {
    super(props);
    const {level} = this.props;

    this.state = {
      path:this.props.location.state.name,
      gridArray:createArray(level),
      boardArray:shuffle(createArray(level)),
      grid:[0,0,0,0,0,0,0,0,0]
    }
  }


  onMove(cardId,gridId){
    //console.log('grid number : '+gridId);
    //console.log('card number : '+cardId);
    const {level} = this.props;
    const gridNumber = gridId[5];
    const cardNumber = cardId[5];

    console.log('gridNumber : ' + gridNumber);
    console.log('cardNumber : ' + cardNumber);

    const tempGrid = this.state.grid.slice();

    if(gridNumber===cardNumber){
      tempGrid[gridNumber] = 1;
    }else{
      tempGrid[gridNumber] = 0;
    }

    if(checkDone(tempGrid,level)===true){
      console.log('Done!!!!!!!');
    }else{
      console.log('Not Done!!!');
    }

    this.setState({grid : tempGrid});

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
        <Board key={i} id={'board-'+i} size={size} level={level} position={i}>
            <Card id={'card-'+boardArray[i]} size={size} image={image} level={level}
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
                margin: '75px'
              }}>

                  {this.renderGridSquares()}


              </div>



              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'space-around',
                width: `${size+6}px`,
                height: `${size+6}px`,
                margin: '75px'
              }}>

                  {this.renderBoardSquares()}

              </div>



            </div>


        );

  }

}

Puzzle.propTypes = {
    image: PropTypes.string.isRequired,
  //  image:'assets/images/'+this.state.path+'/_0.jpg',
    size: PropTypes.number,
    level: PropTypes.number,
  };

Puzzle.defaultProps = {
    size: 300,
    level: 3,
};

export  {Puzzle as puzzle};
