import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';


const styles = theme => ({
    root: {
      bottom: 0,
      // backgroundColor: '#EEEEEE',
      width: '100%',
      textAlign: 'center',
    },

    textStyle: {
      marginTop: '8px'
    }
});

class Footer extends Component{
  render () {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
        
        <Typography variant="subtitle1" gutterBottom  className={classes.textStyle} >
            Made with<IconButton size="small"><FavoriteIcon color="secondary" /></IconButton>by Makarand 

        </Typography>
        </div>
    );
  }
}

export default withStyles(styles)(Footer);