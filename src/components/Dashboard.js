import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 150,
        minHeight: 150,
        maxWidth: 300,
        maxHeight: 300
    },
    title: {
      fontSize: 34,
    },
    dashboardDescription: {
        paddingTop: '15px',
        paddingLeft: '25px',
        margin: "5px",
        fontSize: 35
    },
    gridContainer: {
        paddingTop: '80px',
        paddingLeft: '80px',
        paddingRight: '50px'
      }
  });

  export default function Dashboard() {
    const classes = useStyles();

    return ( 
    <Container>
    <div className={classes.dashboardDescription}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Welcome To Ballinasloe Interactive
        </Typography>
        <h5>Find out what's Happening.  Get Involved.  Join your Community.  Have Fun!</h5>
    </div>
    <Grid container className={classes.gridContainer} spacing={0}>
        <Grid item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea href="/activity">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Activities
                        </Typography>
                        <Typography variant="body2" component="p">
                            Check out and create an activity in your community today.<br/><br/>
                            Organise your event in a few simple steps!
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> 
        </Grid> 
        <Grid item xs={12} sm={4}>
            <Card className={classes.root} elevation={6} variant="outlined">
                <CardActionArea href="/story">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Stories
                        </Typography>
                        <Typography variant="body2" component="p">
                            Take a look and keep up to date on what is going on
                            in your community.<br/><br/><br/>
                            See what your neighbours are up to!
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> 
        </Grid>
        <Grid item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea href="/profile">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Profile
                        </Typography>
                        <Typography variant="body2" component="p">
                            Click here to view and update your profile information.<br/><br/><br/><br/>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> 
        </Grid>
    </Grid>
    </Container>
    );
  }