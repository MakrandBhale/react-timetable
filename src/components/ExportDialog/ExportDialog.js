import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        minWidth: 256,
    }
});

class ExportDialog extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.copyText = this.copyText.bind(this);
    }

    handleClose(){
        this.props.closeDialogHandler();
    }

    copyText() {
        navigator.clipboard.writeText(this.props.data).then(r => this.handleClose());
    }


    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Dialog open={this.props.show} onClose={this.handleClose}>
                    <DialogTitle>Export the current Timetable</DialogTitle>
                    <DialogContent>

                        <TextField
                            id="outlined-multiline-static"
                            label="Timetable Data"
                            multiline
                            rows={18}
                            value={this.props.data}
                            variant="outlined"
                            fullWidth
                        />
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.copyText} color="primary" variant="contained">
                            Copy
                        </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles) (ExportDialog);