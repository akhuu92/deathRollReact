import React, {Component, useState} from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import Reel from 'react-reel';
import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import { makeStyles } from '@material-ui/core/styles';
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

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const maxRoll = 100;
  const [edit, setEdit] =  useState(false);
  const [game, setGame] =  useState(false);
  const [roll, setRoll] = useState(maxRoll);
  const [userMaxRoll, setUserMaxRoll] = useState(null);
  const [rolls, setRolls] = useState([]);
  
  function handleClick() {
    let randomNumber = getRandomIntInclusive(1, roll);

    if (game) {
      //setRoll(maxRoll);
      rollValue(randomNumber);
      
      if (randomNumber === 1) {
        setGame(false)
      }
    } else if (!game) {
        resetGame();
        setGame(true);
      }
  }

  function editKeyPress(event) {
    if (event.key === "Enter") {
      let userDefinedRoll = checkNumber(parseInt(event.target.value));

      setUserMaxRoll(userDefinedRoll);
      setEdit(false);
      setRoll(userDefinedRoll)
      setGame(true);
    }
  }

  function checkNumber(number) {
    if (!Number.isNaN(number)) {
      return number;
    } else {
      //set to maxRoll maybe?
      return "Stop breaking my app. Kys";
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
    setRoll(userMaxRoll ? userMaxRoll : maxRoll)
    setGame(false)
    setRolls([])
  }

  return (
    <Container disableGutters="false">
      <ButtonAppBar />
      {!edit ? <div className="card-container">
        <Reel text={roll.toString()} theme={theme}/>
      </div> : <div className="card-container"> 
        <input type="text" onKeyPress={editKeyPress}></input> 
        </div>}
      <div className="card-container editBtn">
        <Button variant="outlined" color="secondary" onClick={handleEdit}>
          Edit
        </Button>
      </div>
      <Grid container="true" justify="center">
        <Grid>
          <ButtonIcon onClick={handleClick} label={game ? 'Roll' : 'Start Death Roll'}/>
        </Grid>
        {game && <Grid>
          <ButtonIcon onClick={resetGame} label="Reset"/>
        </Grid>
        }
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