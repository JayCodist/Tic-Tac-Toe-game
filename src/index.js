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
class Move
{
	constructor(squares, play, location)
	{
		this._squares_Private = squares;
		this._xIsNext_Private = (play === "X" ? false : true);
		let _playPrivate = play;
		let _locationPrivate = location;
		// Immutable properties captured with closure
		this.toString = function ()
		{
			return (_playPrivate ? `${_playPrivate} on ${_locationPrivate}` : " Game Start ");
		}
	}

	get squares () { return this._squares_Private; }
	get xIsNext () { return this._xIsNext_Private; }
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
		var status = (winner ? `Player ${winner} wins!` : 
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

const History = (props) =>
{
	let list = [];
	for (var i = 0; i < props.history.length; i++)
	{
		list.push(<li 
			key={props.history[i]}
			data-key={props.history[i]}
			className={(i === props.currentIndex ? "current-position" : "moves-list") }
			onClick={props.onClick}
			>
			{String(props.history[i])}
			</li>);
	}
	return list;
}

class Game extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = 
		{
			history: [new Move(new Array(9).fill(null), null, null)],
			currentIndex: 0
		};
	}

	goToMove(e)
	{
		let newIndex = this.state.history.map(item => String(item)).indexOf(e.target.dataset.key)
		this.setState({currentIndex: newIndex});
	}

	handleClick(i)
	{
		var oldMove = (this.state.history[this.state.currentIndex]);
		let squares = [...oldMove.squares];
		if (squares[i] || getWinner(squares))
			return;
		squares[i] = oldMove.xIsNext ? "X" : "O";
		var newMove = new Move(squares, (oldMove.xIsNext ? "X" : "O"), i);
		let history = this.state.history.slice(0, this.state.currentIndex + 1);
		this.setState({
			history: history.concat(newMove),
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
				<ol className="history">
				<History 
				history={this.state.history} 
				currentIndex={this.state.currentIndex}
				onClick={move => this.goToMove(move)}
				/>
				</ol>
			</div>
			);
	}
}


ReactDOM.render(
	<Game />, 
	document.getElementById("root"));