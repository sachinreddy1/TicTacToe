import React from "react";
import Reset from "./Reset";
import Square from "./Square";

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      playerX: true,
      displayReset: "none"
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    let newDisplay;

    if (squares[i] || this.calculateWinner(squares)) return;

    squares[i] = this.state.playerX ? "X" : "O";
    this.setState({
      squares: squares,
      playerX: !this.state.playerX
    });

    if (this.calculateWinner(squares)) {
      newDisplay = "block";
      this.setState({
        displayReset: newDisplay
      });
      return;
    }
  }

  calculateWinner(squares) {
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
    let count = 0;
    for (let i = 0; i < 9; i++) if (squares[i]) count += 1;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return count === 9 ? "Draw!" : null;
  }

  reset() {
    this.setState({
      squares: Array(9).fill(null),
      playerX: true,
      displayReset: "none"
    });
  }

  renderReset() {
    return (
      <Reset show={this.state.displayReset} onClick={() => this.reset()} />
    );
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.playerX ? "X" : "O");
    }

    return (
      <div>
        <header className="navbar">Tic Tac Toe</header>
        {this.renderReset()}
        <div className="statusbar">{status}</div>
        <div className="row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
