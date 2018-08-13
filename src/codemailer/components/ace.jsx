import React from 'react';
import '../css/ace.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import brace from 'brace';
import axios from 'axios';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import * as xmlserializer from "xmlserializer";

import 'brace/mode/typescript';
import 'brace/theme/kuroir';

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

class Ace extends React.Component {

    constructor(props) { 
        super(props);
        this.aceRef = React.createRef();
    }

    styles = theme => ({
        root: {
            ...theme.mixins.gutters(),
            paddingTop: theme.spacing.unit * 2,
            paddingBottom: theme.spacing.unit * 2,
        },
    });

    theme = createMuiTheme({
        palette: {
            primary: {
                main: '#4fc3f7'
            },
            secondary: {
                main: '#81c784',
            },
        },
    });

    state = {
        code: `const onLoad = (editor) => {\n\tconsole.log("i've loaded");\n};`,
        isError: false,
        email: '',
        open: false,
        openError: false,
        transition: null
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    postCodeEmail = () => {
        if (this.state.isError) {

            return;
        }
        // axios.post('http://bobbysapps.com:8080/', {
        axios.post('http://127.0.0.1:8080/', {
            code: xmlserializer.serializeToString(this.state.code),
            toEmail: this.state.email
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onMailClick = (e) => {
        console.log(this.state.isError);
        if (!this.state.isError) this.postCodeEmail();
        if (this.state.isError) {
            this.handleErrorSnackBar(TransitionUp);
        }
    }

    handleErrorSnackBar = Transition => () => {
        this.setState({ ["openError"]: true, ["transition"]: TransitionUp });
    }

    onTextFIeldChange = (event) => {
        let status;
        if (event.target.value.includes("\\n") || event.target.value.includes("\r")) console.log("newline");
        if (!event.target.value.includes('\@') || !event.target.value.includes('.')) status = true;
        this.setState({
            ["email"]: event.target.value,
            ["isError"]: status
        });
        console.log(this.state.email);
    }

    render() {
        const { classes } = this.props;

        const onChange = (newValue) => {
            this.state.code = this.aceRef.current;
            console.log(this.state.code);
            console.log(this.aceRef.current);
        }

        const onLoad = (params) => {
            console.log(params);
        }

        return (
            <MuiThemeProvider theme={this.theme}>
                <div className="ace">
                    <br />
                    <div ref={this.aceRef}>
                    <AceEditor
                        mode="typescript"
                        theme="kuroir"
                        name="blah2"
                        onLoad={onLoad}
                        onChange={onChange}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={this.state.code}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }} />
                    <br />
                    </div>
                    <TextField
                        id="full-width"
                        label="Send to:"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="codeshare@example.com"
                        helperText="Happy Hacking!"
                        fullWidth
                        margin="normal"
                        onChange={this.onTextFIeldChange}
                        error={this.state.isError} />
                </div>
                <Button
                    color="secondary"
                    onClick={this.onMailClick}
                    className={classes.button}>
                    Send
                </Button>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Sent Email</span>}
                />

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.openError}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Bad Email</span>}
                    action={[
                        <Button key="Dismiss" color="secondary" size="small" onClick={this.handleClose}>
                            Dismiss
                    </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                        </IconButton>,
                    ]}
                />
            </MuiThemeProvider>
        );
    }
}

Ace.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(this.styles)(Ace);