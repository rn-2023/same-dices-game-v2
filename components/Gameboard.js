import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;

export default function Gameboard() {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false));

  const Dice = ({index}) => {
    return(
      <Pressable 
        key={"row" + index}
        onPress={() => selectDice(index)}>
        <MaterialCommunityIcons
          name={board[index]}
          key={"row" + index}
          size={50} 
          color={getDiceColor(index)}>
        </MaterialCommunityIcons>
      </Pressable>
    )
  }

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(<Dice key={i} index={i} />);
  }

  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Game has not started');
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
  }, [nbrOfThrowsLeft]);

  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "orange";
    }
    else {
      return selectedDices[i] ? "black" : "steelblue";
    }
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  const checkWinner = () => {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
      setStatus('You won');
    }
    else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
      setStatus('You won, game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else if (nbrOfThrowsLeft === 0) {
      setStatus('Game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else {
      setStatus('Keep on throwing');
    }
  }

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
  }
  
  return(
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
      </Pressable>
    </View>
  )
}