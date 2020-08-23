import React, { Component } from 'react';
import AddDialog from '../AddDialog/AddDialog'
import clsx from 'clsx';
import './Cell.css'
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CurrentLecture from './CurrentLecture'

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
    },

    currentLecture: {
        color: 'red',
        height: '148px',
        width: '148px'
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
            isExpanded: this.props.expandCard,
            data: {
                subjectName: null,
                facultyName: null,
                meetLink: null,
                lectureType: 0,
            },

            
        };
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveToStorage = this.saveToStorage.bind(this);
        this.getDataFromStorage = this.getDataFromStorage.bind(this);
        this.handlePaperClick = this.handlePaperClick.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);

        //console.log(this.state.data)
    }

    edit() {
        this.showDialog();
        console.log("clicked");
    }

    delete() {
        this.setState({
            data: null
        })
    }

    componentDidMount() {
        this.getDataFromStorage(this.props.row + "x" + this.props.column);
        if(this.props.currentLecture){
            console.log(this.props.row + "x" + this.props.column);
        }
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
        // let url = this.state.data.meetLink;
        // console.log(url)
        // if(url === undefined) return;
        // let win = window.open(new URL(url), '_blank');
        // win.focus();
        this.setState({
            isExpanded: !this.state.isExpanded
        })
        //console.log(this.state.isExpanded)
    }

    render() {
        const { classes } = this.props;
        const dialogContainer = (
            <div id="dialog-container">
                <AddDialog dialogCloseHandler={this.hideDialog} row={this.props.row} column={this.props.column} onInfoEntered={this.saveToStorage} data={this.state.data}/>
            </div>
        );
        if (this.state.data === null) {
            return (
                <div >
                    <div id="edit-icon" className="container-div"
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseExit}
                        onClick={this.showDialog}
                    >
                        {
                            (this.state.isHovering) ?
                                <div>

                                    <IconButton aria-label="edit" >
                                        <CreateIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                                : ""
                        }
                    </div>
                    {this.state.isDialogShowing ? dialogContainer : ""}
                </div>
            );
        } else {
            let paperClasses = clsx({
                [classes.root] : true, //always apply
                [classes.currentLecture] : this.state.isExpanded //only when open === true
            })
            return (
                <div>
                {(!this.state.isExpanded ) ? 
                <Paper className={paperClasses} onClick={this.handlePaperClick}>
                    <div id="details" className={classes.childDiv}>
                        {this.state.data.subjectName}
                    </div>
                </Paper>
                :
                <CurrentLecture data={this.state.data} edit={this.edit} delete={this.delete} expandHandler={this.handlePaperClick} currentLecture={this.props.currentLecture}/>
                }
                {this.state.isDialogShowing ? dialogContainer : ""}
                </div>
            )
        }
    }
}

export default withStyles(styles)(Cell);