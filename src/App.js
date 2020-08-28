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
import {Box} from "@material-ui/core";


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
  },

  betaIconStyle: {
    height:20,
    fontSize: 12,
    padding: '2px 4px 0px 4px',
    minWidth: 36,
    marginLeft: 4,
    marginBottom: 12,
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.clicks = 0;
    this.timer = null;
    this.timeout = 350;

    this.state = ({
      showExportDialog: false,
      exportData: null,
      showImportDialog: false,
      anchorEl: false,
      enableBeta: false,
    })
    this.export = this.export.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.import = this.import.bind(this);
    this.closeImportDialog = this.closeImportDialog.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.enableBeta = this.enableBeta.bind(this);
  }

  export() {
    let data = localStorage.getItem('finalData');
    //alert(data);
    this.setState({
      exportData: data,
      showExportDialog: true,
    })
  }

  componentDidMount() {
    const enableBeta = localStorage.getItem("enableBeta");
    if(enableBeta === null || enableBeta === undefined) {
      return;
    }
    if(enableBeta === '1'){
      this.setState({
        enableBeta: true,
      })
    }
  }

  enableBeta = (e) => {
    if(e.detail !== 3) return
    if(this.state.enableBeta) {
      this.setState({
        enableBeta: false
      })
      localStorage.removeItem("enableBeta");

      alert("Experimental features are now disabled.");

    } else {
      this.setState({
        enableBeta: true
      })
      alert("Experimental features are enabled.")
      localStorage.setItem("enableBeta", '1');
    }
    window.location.reload();
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
              <span style={{cursor: "pointer"}} onClick={this.enableBeta}>Timetable</span>
              {
                (this.state.enableBeta) ?
                    <Button className={classes.betaIconStyle}
                            disableElevation={true}
                            size={"small"}
                            variant="contained"
                    >
                      BETA
                    </Button>
                    :
                    null
              }

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