import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';

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
    
    const[title, setTitle]=useState('')
    const[date, setDate]=useState('')
    const[location, setLocation]=useState('')
    const[category, setCategory]=useState('')
    const[description, setDescription]=useState('')
    const[stories, setStories]=useState([])

    const handleClick=(e)=>{
        e.preventDefault()
        const story={title, date, location, category, description}
        console.log(story)
        fetch("http://localhost:8080/story/addStory",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(story)
        }).then(()=>{
            console.log("New Story Added!")

        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/story/getAllStories")
        .then(res=>res.json())
        .then((result)=>{
            setStories(result);
        }
    )
    },[])

    return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1>Add Story</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Story Title" variant="outlined" fullWidth
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <TextField id="outlined-basic" label="Date" variant="outlined" 
                value={date}
                onChange={(e)=>setDate(e.target.value)}
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
        <h1>Stories</h1>
        <Paper elevation={3} style={paperStyle}>
          {stories.map(story=>(
            <Paper elevation={6} style={{margin:"10px", padding: "15px", textAlign:"left"}} key={story.id}>
                Activity Title: {story.title}<br/>
                Date: {story.date}<br/>
                Location: {story.location}<br/>
                Category: {story.category}<br/>
                Description: {story.description}<br/>
            </Paper>
          ))}
        </Paper>
    </Container>
  );
}
