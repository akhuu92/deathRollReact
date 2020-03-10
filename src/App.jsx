import React, {Component, useState} from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import Reel from 'react-reel';
import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ButtonIcon from './components/ButtonIcon';

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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const maxRoll = 10;
  const [edit, setEdit] =  useState(false);
  const [game, setGame] =  useState(false);
  const [roll, setRoll] = useState(maxRoll);
  const [rolls, setRolls] = useState([]);
  
  function handleClick() {
    let randomNumber = getRandomIntInclusive(1, roll);

    if (game) {
      //setRoll(maxRoll);
      rollValue(randomNumber);
      
      if (randomNumber === 1) {
        setGame(false)
        //resetGame();
      }
    } else if (!game) {
        resetGame();
        //rollValue(randomNumber);
        setGame(true);
      }
  }

  function editKeyPress(event) {
    if (event.key === "Enter") {
      setRoll(event.target.value);
      setEdit(false);
    }
  }

  const handleEdit = () => {
    setEdit(true)
  }

  const rollValue = (value) => {
    setRoll(value)
    setRolls((prevRolls) => {
      return [...prevRolls, value]
    })
  }

  const resetGame = () => {
    setRoll(maxRoll)
    setGame(false)
    setRolls([])
  }

  return (
    <Container disableGutters="false">
      <ButtonAppBar />
      {!edit ? <div className="card-container">
        <Reel text={roll.toString()} theme={theme}/>
      </div> : <input type="text" name="fname" onKeyPress={editKeyPress}></input>}
      <Button variant="outlined" color="secondary" onClick={handleEdit}>
        Edit
      </Button>
      <Grid container="true" justify="center">
        <Grid>
          <ButtonIcon onClick={handleClick} label={game ? 'Roll' : 'Start Death Roll'}/>
        </Grid>
        {game && <Grid>
          <ButtonIcon onClick={resetGame} label="Reset"/>
        </Grid>}
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