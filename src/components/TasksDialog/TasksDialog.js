import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import './TaskDialog.css';
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
    root: {
        minWidth: 256,
    },
    list: {
        maxWidth: 256,
        maxHeight: 256,
    }
});
class TasksDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasksList: [],
            taskTitle: "",
            showDate: false,

        }
        this.handleClose = this.handleClose.bind(this);
        this.createNewTask = this.createNewTask.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.listItemOnClick = this.listItemOnClick.bind(this);
    }

    componentDidMount() {
        const key = this.props.row + 'x' + this.props.column;
        let cellData = localStorage.getItem(key);
        console.log(typeof cellData);
        if(cellData === null || cellData === "null") return;
        cellData = JSON.parse(cellData);
        if(!cellData.hasOwnProperty('tasks')) return;
        this.setState({
            tasksList: cellData.tasks
        })
    }

    handleClose() {
        const key = this.props.row + 'x' + this.props.column;
        let cellData = localStorage.getItem(key);
        if(cellData !== null){
            cellData = JSON.parse(cellData);
            cellData.tasks = this.state.tasksList
            const finalData = JSON.stringify(cellData);
            console.log(finalData);
            localStorage.setItem(key, finalData);
        }

        this.props.closeHandler();
    }

    keyPress(e){

        if(e.keyCode === 13){
            if(!e.shiftKey) {
               e.preventDefault();
               this.createNewTask();
            }
        }
    }


    deleteTask (removeId) {
        if(this.state.tasksList.length === 0) return;
        let tempList = this.state.tasksList;
        let index = tempList.findIndex((task) => task.id === removeId);
        tempList[index].striked = true;

        this.setState({
            tasksList: tempList
        })

        setInterval(
            ()=> {
                this.setState({
                    tasksList: this.state.tasksList.filter((task) => task.id !== removeId)
                })
            },500
        );
    }

    createNewTask() {
        if(this.state.taskTitle === null || this.state.taskTitle.trim() === "") return;
        this.name.value = "";
        const newTask = {
            title: this.state.taskTitle.trim(),
            date: new Date(),
            id: new Date().getTime(),
            striked: false,
            showDate: false,
        }
        const tempTaskList = this.state.tasksList;
        tempTaskList.unshift(newTask); // new task at top
        //console.log(tempTaskList);
        this.setState({
            tasksList: tempTaskList,
            taskTitle: ""
        })
    }

    listItemOnClick =(showId) => {
        if(this.state.tasksList.length === 0) return;
        let tempList = this.state.tasksList;
        let index = tempList.findIndex((task) => task.id === showId);
        if(tempList[index].showDate === undefined) return;
        tempList[index].showDate = !tempList[index].showDate;
        this.setState({
            tasksList: tempList,
        })
    }


    render() {
        const { classes } = this.props;

        return(
            <div>
                <Dialog maxWidth="xs"  scroll="paper" className={classes.root} open={this.props.show} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Tasks</DialogTitle>
                    <DialogContent dividers={true}>
                        <Box display="flex">
                            <InputBase
                                autoFocus
                                fullWidth={true}
                                placeholder="Add new task"
                                inputProps={{ 'aria-label': 'naked' }}
                                multiline={true}
                                rows={1}
                                rowsMax={4}
                                inputRef={el => this.name = el}

                                size="medium"
                                onKeyDown={this.keyPress}
                                onChange={(event) => {
                                    this.setState({
                                        taskTitle: event.target.value
                                    })
                                }}
                                endAdornment={
                                    <Tooltip title="Add to list">
                                        <IconButton size="small" onClick={this.createNewTask} >
                                            <DoneIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                                />
                        </Box>
                        <div id="task-list" className={classes.list} >
                            <List className={classes.list} >
                                {this.state.tasksList.map((task) => {
                                    const labelId = `checkbox-list-label-${task.id}`;

                                    return (
                                        <ListItem key={task.id} role={undefined} button={true} onClick={()=>this.listItemOnClick(task.id)}>
                                            <Tooltip title="Mark as done">
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    //checked={false}
                                                    onClick={()=>this.deleteTask(task.id)}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            </Tooltip>
                                            <ListItemText className={task.striked ? "dont-break-out crossed-line" : "dont-break-out"}
                                                          id={labelId}
                                                          primary={task.title}
                                                          secondary={task.showDate ? task.date.toDateString() : null}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>

                    </DialogContent>
{/*                    <DialogContentText>
                        <Typography variant="caption" display="block" gutterBottom>
                            Note: Each slot carries its own tasks list.
                        </Typography>
                    </DialogContentText>*/}
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles) (TasksDialog);