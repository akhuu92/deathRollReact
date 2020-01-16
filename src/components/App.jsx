import React, {Component, useState} from 'react';
import ButtonAppBar from './ButtonAppBar';
import Reel from 'react-reel';
import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const theme = {
  reel: {
    height: '1em',
    display: 'flex',
    alignItems: 'flex-end',
    overflowY: 'hidden',
    fontSize: '75px',
    fontWeight: '300',
    color: '#E2AB5B',
    lineHeight: '0.95em'
  },
  group: {
    transitionDelay: '0ms',
    transitionTimingFunction: 'ease-in-out',
    transform: 'translate(0, 0)',
    height: '1em'
  },
  number: {
    height: '1em'
  },
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  /* 
    Save state (last roll value)
  */
  const maxRoll = 100;
  const [game, setGame] =  useState(true);
  const [roll, setRoll] = useState(maxRoll);
  const [rolls, setRolls] = useState([]);
  
  function handleClick() {
    let randomNumber = getRandomIntInclusive(1, roll)
    if (game) {
      setRoll(() => {
        return (
          randomNumber
        )
      })
      setRolls((prevRolls) => {
        return [...prevRolls, randomNumber]
      })
    }
    if (randomNumber === 1) {
      setGame(() => {
        return !game
      })
      setRoll(1)
    }
    if (!game) {
      setRoll(maxRoll)
    }
  }

  return (
    <Container disableGutters="false">
      <ButtonAppBar />
      <div className="card-container">
        <Reel text={roll.toString()} theme={theme}/>
      </div>
      <Grid container="true" justify="center">
        {game ? (
          <Button onClick={handleClick} variant="contained" color="primary">
            Roll
          </Button>
        ) : <Button onClick={handleClick} variant="contained" color="primary">
            Start Death Roll
          </Button>} 
      </Grid>
      <Grid container="true" justify="center">
          <List>
            {rolls.map((roll, index) => {
              return (
                <ListItem key={index}>{roll}</ListItem>
              )
            })}
          </List>
      </Grid>
    </Container>
  );
}

export default App;