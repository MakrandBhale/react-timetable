import React,{ useState }from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';



export default function SimpleDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(0);
  const [faculty, setFaculty] = useState(0);
  const [link, setLink] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
    props.handler();
    show();
  };

  const onNameChange = event => setName(event.target.value);
  const onFacultyChange = event => setFaculty(event.target.value);
  const onLinkChange = event => setLink(event.target.value);
  
  const show = () => {
    alert(name)
  }

  return (
    <div>
        <IconButton aria-label="edit" onClick={handleClickOpen}>
            <CreateIcon />
        </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a lecture</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subjectName"
            label="Subject Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onNameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="facultyName"
            label="Faculty Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onFacultyChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Meeting Link"
            type="url"
            fullWidth
            variant="outlined"
            onChange={onLinkChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
