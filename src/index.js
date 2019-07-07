import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


const getWinner = (squares) =>
{
	
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
		var status = "Next player : " + (this.props.position.xIsNext ? "X" : "O");
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
		debugger;
		var position = {...(this.state.history[this.state.currentIndex])};
		let squares = [...position.squares];
		if (squares[i])
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