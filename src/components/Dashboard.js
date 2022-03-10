import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 150,
        minHeight: 150,
        maxWidth: 300,
        maxHeight: 300
    },
    title: {
      fontSize: 24,
    },
    gridContainer: {
        paddingTop: '180px',
        paddingLeft: '180px',
        paddingRight: '50px'
      }
  });

  export default function Dashboard() {
    const classes = useStyles();

    return (
    <Grid container className={classes.gridContainer} spacing={0}>
        <Grid item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea href="/activity">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Activities
                        </Typography>
                        <Typography variant="body2" component="p">
                            Check out and create an activity in your community today.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> 
        </Grid> 
        <Grid item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardActionArea href="/story">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Stories
                        </Typography>
                        <Typography variant="body2" component="p">
                            Take a look and keep up to date on what is going on
                            in your community.
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
                            Click here to view and update your profile information.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card> 
        </Grid>
    </Grid>
    );
  }