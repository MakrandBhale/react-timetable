import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectName: '',
            facultyName: '',
            meetLink: '',
            lectureType: 0,
            isDialogOpen: true
        }
        this.handleFacultyChange = this.handleFacultyChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleMeetLink = this.handleMeetLink.bind(this);
        this.dialogOnClose = this.dialogOnClose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd = () => {
        //console.log(this.state.subjectName);
        const obj = {
            subjectName: this.state.subjectName,
            facultyName: this.state.facultyName,
            meetLink: this.state.meetLink,
            lectureType: this.state.lectureType,
        };
        const key = this.props.row + "x" + this.props.column;
        this.dialogOnClose();
        this.props.onInfoEntered(key, JSON.stringify(obj));

    }

    handleSubjectChange = (event) => {
        this.setState({
            subjectName: event.target.value
        });
    }

    handleFacultyChange = (event) => {
        this.setState({
            facultyName: event.target.value
        })
    }

    handleMeetLink = (event) => {
        this.setState({
            meetLink: event.target.value
        })
    }

    handelLectureType = (event) => {
        this.setState({
            lectureType: event.target.value
        })
    }

    dialogOnClose = () => {
        this.setState({
            isDialogOpen: false
        })
    }
    render() {
        return (
            <div>

                <Dialog open={true} onClose={this.dialogOnClose}>
                    <DialogTitle id="form-dialog-title">Add a lecture</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="subjeuctName"
                            label="Subject Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={this.handleSubjectChange}
                        />
                        <TextField
                            margin="dense"
                            id="facultyName"
                            label="Faculty Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={this.handleFacultyChange}
                        />
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel id="demo-simple-select-outlined-label">Lecture Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={this.state.lectureType}
                                onChange={this.handelLectureType}
                                label="Lecture Type"
                            >
                                <MenuItem value={0}>Theory</MenuItem>
                                <MenuItem value={1}>Lab</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="link"
                            label="Meeting Link"
                            type="url"
                            fullWidth
                            variant="outlined"
                            onChange={this.handleMeetLink}
                        />
                        <DialogActions>
                            <Button onClick={this.props.dialogCloseHandler} color="primary">Close</Button>
                            <Button onClick={this.handleAdd} color="primary" variant="contained">Add</Button>
                        </DialogActions>
                    </DialogContent>

                </Dialog>
            </div>
        )
    }
}

export default AddDialog;