import React, { Component } from 'react';

import AddDialog from '../AddDialog/AddDialog'
import './Cell.css'
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import { withStyles, useStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        height: '48px',
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    childDiv: {
        margin: 'auto',
    }
});

class Cell extends Component {
    constructor(props) {
        super(props);
        this.handleMouseExit = this.handleMouseExit.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.state = {
            isHovering: false,
            isDialogShowing: false,
            data: null
        };
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveToStorage = this.saveToStorage.bind(this);
        this.getDataFromStorage = this.getDataFromStorage.bind(this);
        this.handlePaperClick = this.handlePaperClick.bind(this);
    }

    componentDidMount() {
        this.getDataFromStorage(this.props.row + "x" + this.props.column);
    }

    handleMouseExit() {

        this.setState({
            isHovering: false
        })
        
    }

    saveToStorage(key, value) {
        //this.props.onInfoEntered(key, value);
        localStorage.setItem(key, value);
        this.setState({
            data: JSON.parse(value)
        })
    }

    getDataFromStorage(key) {
        let data = localStorage.getItem(key);
        console.log(data)
        if (data === null || data === undefined) return;
        this.setState({
            data: JSON.parse(data)
        })
    }

    handleMouseEnter() {

        this.setState({
            isHovering: true
        })
    }

    showDialog = () => {
        this.setState({
            isDialogShowing: true
        })
    }

    hideDialog = () => {
        this.setState({
            isDialogShowing: false
        })
    }

    handlePaperClick = () => {
        let url = this.state.data.meetLink;
        console.log(url)
        if(url === undefined) return;
        let win = window.open(new URL(url), '_blank');
        win.focus();
    }

    render() {
        const { classes } = this.props;

        if (this.state.data === null) {
            return (
                <div >
                    <div id="edit-icon" className="container-div"
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseExit}
                    >
                        {
                            (this.state.isHovering) ?
                                <div>

                                    <IconButton aria-label="edit" onClick={this.showDialog}>
                                        <CreateIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                                : ""
                        }
                    </div>
                    <div id="dialog-container">
                        {

                            (this.state.isDialogShowing) ? <AddDialog dialogCloseHandler={this.hideDialog} row={this.props.row} column={this.props.column} onInfoEntered={this.saveToStorage} /> : ""
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <Paper className={classes.root} onClick={this.handlePaperClick}>
                    <div id="details" className={classes.childDiv}>
                        {this.state.data.subjectName}
                    </div>
                </Paper>
            )
        }
    }
}

export default withStyles(styles)(Cell);