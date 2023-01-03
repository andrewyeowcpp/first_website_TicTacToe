import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
  class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            //initialize values with null
            squares: Array(9).fill(null),
            //x goes first, change this to !xIsNext each turn
            xIsNext: true,
        };
    }

    handleClick(i){
        //copy the current state
        const squares = this.state.squares.slice();
        //set the state copied state
        squares[i] = (this.state.xIsNext ? 'X' : 'O');
        //set the current board to the copied state
        //invert xIsNext
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
    }
    //render the value of each square 
    renderSquare(i) {
      return (
        <Square 
            //set the value to the current player
            value={this.state.squares[i]}
            //handleClick() in Board class
            onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      //pass the current state to calculateWinner()
      const winner = calculateWinner(this.state.squares);
      //if winner declare winner, else next players turn
      let status;
      if(winner){
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  //render game
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

  function calculateWinner(squares) {
    //win states of Tic Tac Toe
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //check if the current state matches any of the win states
    //return the appropriate value('X', 'O', or null for no winner yet)
    for(let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }