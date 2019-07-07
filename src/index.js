import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


const getWinner = (squares) =>
{
	
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function Square (props)
{
	return (<button 
		className="square"
		onClick={props.onClick}>
		{props.status}
		</button>);
}


class Board extends React.Component
{
	renderSquare(i)
	{
		return (
			<Square 
			status={this.props.position.squares[i]}
			onClick={() => this.props.onClick(i)}
			/>);
	}
	render()
	{
		let winner = getWinner(this.props.position.squares);
		var status = (winner ? `${winner} wins!` : 
			"Next player : " + (this.props.position.xIsNext ? "X" : "O"));
		return (
			<div>
				<div className="board">
				{status}
					<div className="squares">
						<div className="squareRow">
						{this.renderSquare(0)}
						{this.renderSquare(1)}
						{this.renderSquare(2)}
						</div>
						<div className="squareRow">
						{this.renderSquare(3)}
						{this.renderSquare(4)}
						{this.renderSquare(5)}
						</div>
						<div className="squareRow">
						{this.renderSquare(6)}
						{this.renderSquare(7)}
						{this.renderSquare(8)}
						</div>
					</div>
				</div>
			</div>
			);

	}
	
}

class Game extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			history: [
			{
				squares: Array(9).fill(null),
				xIsNext: true
			}],
			currentIndex: 0
		};
	}

	handleClick(i)
	{
		var position = {...(this.state.history[this.state.currentIndex])};
		let squares = [...position.squares];
		if (squares[i] || getWinner(squares))
			return;
		squares[i] = position.xIsNext ? "X" : "O";
		position.xIsNext = !(position.xIsNext);
		position.squares = squares;
		this.setState({
			history: this.state.history.concat(position),
			currentIndex: this.state.currentIndex + 1,
			});
	}

	render()
	{
		return(
			<div className="game">
				<div className="game-board">
				<Board 
				position={this.state.history[this.state.currentIndex]} 
				onClick={i => this.handleClick(i)}
				/>
				</div>
			</div>
			);
	}
}


ReactDOM.render(
	<Game />, 
	document.getElementById("root"));