import React from 'react';
import '../css/codemailer.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import logo from '../../logo.svg';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Ace from'./ace';
import axios from 'axios';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#4fc3f7'
      },
      secondary: {
        main: '#81c784',
      },
    },
  });

function PaperSheet(props) {
    const { classes } = props;

    const onMailClick = (e) => { 
      console.log(this.Ace)
      console.log(e);
    }
    
    const onTwitterClick = (e) => {
    
    }
  return (
    <MuiThemeProvider theme={theme}>
        <div className="paper">
            <img src={logo} className="App-logo" alt="logo"/>
            <Typography variant="headline" component="h3">
                CodeShare
            </Typography>
            <Typography component="p">
                Code Sharing Platform
            </Typography>
            <Ace/>
        </div>
    </MuiThemeProvider>
  );
}

const postCodeEmail = () => {
  axios.post('http://127.0.0.1/', {
    code: this.Ace.props.code
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);