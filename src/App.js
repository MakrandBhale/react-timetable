import React, { Component } from 'react';
import './App.css';
import SimpleTable from './components/SimpleTable'
import Footer from './components/Footer/Footer'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ExportDialog from './components/ExportDialog/ExportDialog';
import ImportDialog from './components/ImportDialog/ImportDialog';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  tableStyles: {
    paddingLeft: 18,
    paddingTop: 18,
    paddingRight: 18,
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      showExportDialog: false,
      exportData: null,
      showImportDialog: false,
      anchorEl: false
    })
    this.export = this.export.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.import = this.import.bind(this);
    this.closeImportDialog = this.closeImportDialog.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);

  }

  export() {
    let data = localStorage.getItem('finalData');
    //alert(data);
    this.setState({
      exportData: data,
      showExportDialog: true,
    })
  }

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    })
  };

  handleMenuClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    })
  };

  closeImportDialog() {
    this.setState({
      showImportDialog: false,
    })
  }
  closeDialog() {
    this.setState({
      showExportDialog: false
    })
  }

  import() {
    this.setState(({
      showImportDialog: true,
    }))
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="body">
        <AppBar position="static">
          <Toolbar  variant="dense">
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              Timetable
            </Typography>
            <div>
              <IconButton aria-controls="context-action-menu" aria-haspopup="true" onClick={this.handleMenuClick} size="small">
                <MoreVertIcon style={{ color: '#fff' }}/>
              </IconButton>
              <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.export}>Export</MenuItem>
                <MenuItem onClick={this.import}>Import</MenuItem>
              </Menu>
            </div>

          </Toolbar>
        </AppBar>
        <div className={classes.tableStyles}>
          <Paper elevation={3}>
            <SimpleTable />
          </Paper>
        </div>
        
        <ExportDialog data={this.state.exportData} show={this.state.showExportDialog} closeDialogHandler={this.closeDialog}/>
        <ImportDialog show={this.state.showImportDialog} closeDialogHandler={this.closeImportDialog}/>
        <Footer/>
      </div>
    );
  }
}

export default withStyles(styles)(App);