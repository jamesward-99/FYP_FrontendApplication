import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';//

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
  },
}));

export default function Activity() {

    const classes = useStyles();
    const paperStyle = {padding: '50px 20px', width:600, margin:"20px auto"}
    
    const[title, setTitle]=useState('')
    const[date, setDate]=useState('')
    const[time, setTime]=useState('')
    const[location, setLocation]=useState('')
    const[category, setCategory]=useState('')
    const[description, setDescription]=useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        const activity={title, date, time, location, category, description}
        console.log(activity)
        fetch("http://localhost:8080/activity/addActivity",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(activity)
        }).then(()=>{
            console.log("New Activity Added!")

        })
    }

    return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1>Add Activity</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Activity Title" variant="outlined" fullWidth
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <TextField id="outlined-basic" label="Date" variant="outlined" 
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                />
                <TextField id="outlined-basic" label="Time" variant="outlined" 
                value={time}
                onChange={(e)=>setTime(e.target.value)}
                />
                <TextField id="outlined-basic" label="Location" variant="outlined"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                />
                <TextField id="outlined-basic" label="Category" variant="outlined"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                />
                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
                <Button variant="contained" onClick={handleClick}>
                    Submit
                </Button>
            </form>
        </Paper>
    </Container>
  );
}
