import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        minWidth: 148,
        borderRadius: '8px',
        textAlign: 'left',
    },

    subHeading: {
        fontSize: 14
    },

    button: {
        borderRadius: 6,
    },

    ongoing: {
        borderRadius: 4,
        backgroundColor: '#00c85380',
        padding: '2px 4px',
        fontSize: 12
    },
    fullWidth: {
        minWidth: 148
    }

});

class CurrentLecture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: false,
        }
        this.handlePaperClick = this.handlePaperClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCopyClick = this.handleCopyClick.bind(this);
    }

    handleCopyClick = () => {
        localStorage.setItem("copiedLecture", JSON.stringify(this.props.data));
        this.handleMenuClose();
    }

    handlePaperClick = () => {
        let url = this.props.data.meetLink;

        if (url === undefined || url === "" || url === null) return;
        console.log(url)
        try {
            let win = window.open(new URL(url), '_blank');
            win.focus();
        } catch (err) {
            alert('invalid url');
        }


    }

    handleMenuClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    handleEditClick = () => {
        this.props.edit();
        this.handleMenuClose();
    }

    handleDeleteClick =() => {
        this.props.delete();
        this.handleMenuClose();
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1} onClick={this.props.expandHandler} style={{cursor: 'pointer'}}>
                            <Typography variant="h5" component="h2">
                                {this.props.data.subjectName}
                            </Typography>
                        </Box>
                        {
                        (this.props.currentLecture) ?
                        <Box className={classes.ongoing}>
                            Ongoing
                        </Box>
                        :
                        <IconButton onClick={this.props.expandHandler} size="small">
                            <ExpandLessIcon />
                        </IconButton>
                        }
                    </Box>

                    <Typography className={classes.subHeading} color="textSecondary" gutterBottom>
                        {
                            (this.props.data.lectureType === 0) ?
                                "Theory" : "Lab"
                        }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box display="flex" className={classes.fullWidth}>
                        <Box flexGrow={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<OpenInNewIcon />}
                                size="small"
                                disableElevation
                                onClick={this.handlePaperClick}
                            >
                                Open
                            </Button>
                        </Box>
                        <Box>
                            <div>
                                <IconButton aria-controls="context-action-menu" aria-haspopup="true" onClick={this.handleMenuClick} size="small">
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleMenuClose}
                                >
                                    <MenuItem onClick={this.handleCopyClick}>Copy</MenuItem>
                                    <MenuItem onClick={this.handleEditClick}>Edit</MenuItem>
                                    <MenuItem onClick={this.handleDeleteClick}>Delete</MenuItem>
                                </Menu>
                            </div>
                        </Box>
                    </Box>
                </CardActions>
            </Card>
        )

    }
}

export default withStyles(styles)(CurrentLecture);