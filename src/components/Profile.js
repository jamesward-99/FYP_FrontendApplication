import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
  },
}));

export default function Story() {

    const classes = useStyles();
    const paperStyle = {padding: '50px 20px', width:600, margin:"20px auto"}
    
    const[firstName, setFirstName]=useState('')
    const[lastName, setLastName]=useState('')
    const[email, setEmail]=useState('')
    const[summary, setSummary]=useState('')
    const[interests, setInterests]=useState('')
    const[profile, setProfile]=useState([])

    const [open, setOpen] = React.useState(false);
    const [openCard, setOpenCard] = React.useState(false);

    const handleClick=(e)=>{
        e.preventDefault()
        const profile={firstName, lastName, email, summary, interests}
        console.log(profile)
        fetch("http://localhost:8080/profile/addProfile",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(profile)
        }).then(()=>{
            console.log("New Profile Added!")
            setOpen(false);
        })
    }

    /*useEffect(()=>{
        fetch("http://localhost:8080/activity/id")
        .then(res=>res.json())
        .then((result)=>{
          setActivity(result);
        }
    )
    },[])*/

    // Open Dialog form to create an Activity
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };

    return (
    <Container>
        <Box className={classes.activityButtons} component="span">
            <Button className={classes.margin} variant="contained" color="primary" onClick={handleClickOpen}>
                Edit Profile
            </Button>
        </Box>
        <Paper elevation={3} style={paperStyle}>
            <h1>Edit Profile</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="First Name" variant="outlined"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" 
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                />
                <TextField id="outlined-basic" label="Email" variant="outlined"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <TextField id="outlined-basic" label="Interests" variant="outlined" 
                    value={interests}
                    onChange={(e)=>setInterests(e.target.value)}
                />
                <TextField id="outlined-basic" label="Bio" variant="outlined" fullWidth
                    value={summary}
                    onChange={(e)=>setSummary(e.target.value)}
                />
                <Button variant="contained" onClick={handleClick}>
                    Submit
                </Button>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
            </form>
        </Paper>
        <h1>Profile</h1>
        <Paper elevation={3} style={paperStyle} key={profile.id}>
          <h3>Profile</h3>
              Name: {profile.firstName}{profile.lastName}<br/>
              Date: {profile.email}<br/>
              Bio: {profile.summary}<br/>
              Interests: {profile.interests}<br/>
        </Paper>
    </Container>
  );
}