import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
  },
  profileButtons: {
    paddingTop: '50px',
    paddingLeft: '150px',
    paddingRight: '80px',
  },
  marginEditButton: {
    margin: "50px",
  },
  profileTitle: {
    paddingTop: '15px',
    paddingLeft: '5px',
    margin: "15px",
    fontSize: 45
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
    // const [openCard, setOpenCard] = React.useState(false);

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

    useEffect(()=>{
        fetch("http://localhost:8080/profile/getAllProfiles")
        .then(res=>res.json())
        .then((result)=>{
          setProfile(result);
        }
    )
    },[])

    // Open Dialog form to create an Activity
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };

    return (
    <Container>
        <Box className={classes.profileTitle}>
            Welcome Back to your Profile!
            <Button className={classes.marginEditButton} variant="contained" color="primary" onClick={handleClickOpen}>
                Edit Profile
            </Button>
        </Box>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen>
        <Paper elevation={3} style={paperStyle}>
            <h1>Edit Profile</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="First Name" variant="outlined" style = {{width: 264}}
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" style = {{width: 264}}
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                />
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <TextField id="outlined-basic" label="Interests" variant="outlined" fullWidth
                    multiline="true"
                    minRows="3"
                    maxRows="3"
                    value={interests}
                    onChange={(e)=>setInterests(e.target.value)}
                />
                <TextField id="outlined-basic" label="Bio" variant="outlined" fullWidth
                    multiline="true"
                    minRows="3"
                    maxRows="3"
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
        </Dialog>
        {profile.map(profile=>(
            <Box key={profile.id}>
                <h3>Your Profile Information, {profile.firstName}</h3>
                <h5>Name</h5> {profile.firstName} {profile.lastName}<br/><br/>
                <h5>Email Address</h5> {profile.email}<br/><br/>
                <h5>Describe Yourself</h5> {profile.summary}<br/><br/>
                <h5>Interests</h5> {profile.interests}<br/>
            </Box>
            ))}
    </Container>
  );
}