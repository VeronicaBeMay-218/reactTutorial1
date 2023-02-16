import { useState } from 'react'; //Lo que hacemos primero es importar los repositorios que vamos a usar 

function Square({ value, onSquareClick }) { //Se crea la funcon la cual regresa el valor de el boton precionado
  return ( //Con esto indica que va a regresar los valores que esten dentro 
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) { //Se crea la funcion la cual va a resivir tres parametros
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) { //Se ejecuta cada vez que los valores sean verdadeross
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) { //Cuando resive el valor es x
      nextSquares[i] = 'X';
    } else { //De los contrario 0
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares); //Mensaje de turno y siguiente jugador
  let status; //Se crea la variable
  if (winner) { //Siempre que resiva un valor
    status = 'Winner: ' + winner; //Muestra al ganador
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); //De lo contrario muestra el turno del siguiente jugador
  }

  return ( //Regresa valores los cuales en el juego en si, el recuadro de el gato el cual va a cambiar siempre que se selecione un recuadro y se asigne el valor en turno dnetro la casillas
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() { //funcion del juego, hace que se ejecute todo
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => { //Funcion que muestra el estado de avance del juego, o los pasos que a dado
    let description; //Creo una variable
    if (move > 0) { //Si el valor resivido es mayo a 0
      description = 'Go to move #' + move; //Muestra este mensaje
    } else { //De lo contrario
      description = 'Go to game start'; //De lo contrario este
    }
    return ( //llama al metodo return el cual regresa los valores
    //Los agrega en un formato tipo lista para html y dentro un boton con el nuemro de movimiento
      <li key={move}> 
        <button onClick={() => jumpTo(move)}>{description}</button> 
      </li>
    );
  });

  return ( //regresa los valores de la funcion principal con nombre game, el cual regresa el formato en el cual va a mostrar la lista de pasos 
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div> 
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) { //Funcion que valida que se gane
  const lines = [ //Lista de cotejo de valores 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) { //Ciclo que recorre la lista anterior
    const [a, b, c] = lines[i]; //Pone en a, b, c los valores de la lista
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { //Condiciona que si los tres valores son iguales
      return squares[a]; //Regrese el valor 
    }
  }
  return null; //De los contrario un nulo
}
