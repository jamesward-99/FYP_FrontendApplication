import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBarRight: {
    display: 'flex',
    marginRight: theme.spacing(2),
  },
}));

export default function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" edge="start" className={classes.title}>
            Community Web-Tool
          </Typography>
          <div className={classes.appBarRight}>
            <Link to="/">
              <IconButton aria-label="search" color="inherit">
                <HomeIcon />
              </IconButton>
            </Link>
            <Link to="/">
              <IconButton aria-label="profile" color="inherit">
                <PersonIcon/>
              </IconButton>
            </Link>
            <Link to="/">
              <IconButton aria-label="logout" edge="end" color="inherit">
                <ExitToAppIcon/>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}