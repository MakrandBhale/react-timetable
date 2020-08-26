import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        minWidth: 256,
    }
});

class ImportDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            errorMessage: "",
            data: null
        }
        this.onChange = this.onChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.importData = this.importData.bind(this);
        //this.showErrorMessage = this.showErrorMessage.bind(this);
    }

    handleClose(){
        this.props.closeDialogHandler();
    }

    importData() {
        if(this.state.data === null) return ;
        //console.log(this.state.data);
        let keysCollection = Object.keys(this.state.data);
        //console.log(sample[keysCollection[2]])
        keysCollection.forEach(
            (key, index) => {
                localStorage.setItem(key, JSON.stringify(this.state.data[key]));
            }
        );
        this.handleClose();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    onChange(event){
        try {
            let data = JSON.parse(event.target.value)
            this.setState({
                showError: false,
                data: data,
                errorMessage: ""
            })
        } catch (err) {
            this.setState({
                showError: true,
                errorMessage: "Invalid JSON"
            })
        }

    }
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Dialog open={this.props.show} onClose={this.handleClose}>
                    <DialogTitle>Import Timetable</DialogTitle>
                    <DialogContent>

                        <TextField
                            id="outlined-multiline-static"
                            label="Timetable Data"
                            multiline
                            rows={8}
                            variant="outlined"
                            fullWidth
                            onChange={this.onChange}
                            error={this.state.showError}
                            helperText = {this.state.errorMessage}

                        />
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.importData} color="primary" variant="contained">
                                Import
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles) (ImportDialog);