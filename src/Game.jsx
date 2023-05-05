import { useState } from "react";
import "./Game.css";

const Square = ({ value, onSquarreClick }) => {
  return (
    <button onClick={onSquarreClick} className='square'>
      {value}
    </button>
  );
};

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquarreClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquarreClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquarreClick={() => handleClick(2)} />
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquarreClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquarreClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquarreClick={() => handleClick(5)} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquarreClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquarreClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquarreClick={() => handleClick(8)} />
      </div>
    </>
  );
};

export default Board;

const calculateWinner = (squares) => {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
