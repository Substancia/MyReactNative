import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class App extends React.Component {
	render() {
	  return (
	    <View style={styles.container}>
	      <Text>Hello World!</Text>
	    </View>
	  );
	}
}

function Square(props) {
	const value = (props.value !== null) ? props.value : '_';
  return (
	    <Button onPress={props.onClick} title={value} style={{ height: 20, width: 20 }}/>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <View>
        <View className="board-row" style={{flexDirection: "row"}}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View className="board-row" style={{flexDirection: "row"}}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View className="board-row" style={{flexDirection: "row"}}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </View>
      </View>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = this.state.history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 
        'Go to move #' + move : 
        'Go to game start';
      return (
          <Button title={desc} onPress={() => this.jumpTo(move)}/>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <View className="game" style={styles.container}>
        <View className="game-board">
          <Board 
            squares={current.squares} 
            onClick={(i) => this.handleClick(i)}
          />
        </View>
        <View className="game-info">
          <Text>{status}</Text>
          {moves}
        </View>
      </View>
    );
  }
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Game;