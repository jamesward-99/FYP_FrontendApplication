import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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
    marginRight: theme.spacing(2),
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
          <Avatar src='/applogo.png' edge="start"/>
          <Typography variant="h6" className={classes.title}>
            Ballinasloe Interactive
          </Typography>
          <div className={classes.appBarRight}>
            <Link to="/">
              <IconButton aria-label="search" color="action">
                <HomeIcon />
              </IconButton>
            </Link>
            <Link to="/profile">
              <IconButton aria-label="profile" color="action">
                <PersonIcon/>
              </IconButton>
            </Link>
            <Link to="/">
              <IconButton aria-label="logout" edge="end" color="action">
                <ExitToAppIcon/>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}