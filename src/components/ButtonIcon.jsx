import React from "react";
import Button from '@material-ui/core/Button';
//import { Container, Grid } from '@material-ui/core';

const ButtonIcon = (props) => {
    return (
      <Button onClick={props.onClick} variant="contained" color="primary">
        {props.label}
      </Button>
    )
}

export default ButtonIcon;