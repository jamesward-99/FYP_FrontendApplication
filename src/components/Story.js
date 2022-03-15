import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import StoryService from '../services/StoryService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
  },
  activityButtons: {
    paddingTop: '50px',
    paddingLeft: '150px',
    paddingRight: '80px',
  },
  activityTitle: {
    paddingTop: '15px',
    paddingLeft: '5px',
    margin: "15px",
    fontSize: 45
  },
  activityCardTitle: {
    fontSize: 12,
  },
  margin: {
    margin: theme.spacing(0.5),
  },
  cardStyle: {
    minWidth: 250, // Min. Card Width
    minHeight: 175, // Min. Card Height
    maxWidth: 350, // Max. Card Width
    maxHeight: 300, // Max. Card Height
    margin:"15px", // Distance from each Card
    padding: "25px", // Padding within Card
    textAlign:"left"
  },
  gridContainer: {
    paddingTop: '10px',
    paddingLeft: '60px',
  }
}));

export default function Story() {

    const classes = useStyles();
    //const paperStyle = {padding: '50px 20px', width:600, margin:"20px auto"}
    const paperStyle = {padding: '50px 100px', width:600, margin:"20px auto"}

    const categories = [
      {
        label: '-'
      },
      { 
        value: 'Recreational',
        label: 'Recreational',},
      {
        value: 'Environmental',
        label: 'Environmental',
      },
      {
        value: 'Sport',
        label: 'Sport',
      },
      {
        value: 'Clean Up',
        label: 'Clean Up',
      },
    ];
    
    const[title, setTitle]=useState('')
    const[date, setDate]=useState('')
    const[location, setLocation]=useState('')
    const[category, setCategory]=useState('')
    const[description, setDescription]=useState('')
    const[stories, setStories]=useState([])
    const[story, setStory]=useState([]) 

    const [open, setOpen] = React.useState(false);
    const [openCard, setOpenCard] = React.useState(false);

    const handleCategory = (event) => {
      setCategory(event.target.value);
    };

    // Create an story
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
            setOpen(false);

        })
    }

    // Retrieve all stories
    useEffect(()=>{
        fetch("http://localhost:8080/story/getAllStories")
        .then(res=>res.json())
        .then((result)=>{
            setStories(result);
        }
    )
    },[])

    // Open Dialog form to create a Story
    const handleClickOpen = () => {
      setOpen(true);
    };

    // Close Dialog
    const handleClose = () => {
      setOpen(false);
    };

    // Open Dialog form to view that story
    const handleCardClickOpen=(id)=> {
      setOpenCard(true);
      console.log(id);
      StoryService.getStoryById(id)
      .then((result)=>{
        setStory(result);
      })
    };
    
    // Close Dialog form of that story
    const handleCardClickClose = () => {
      setOpenCard(false);
    };

    return (
    <Container>
      <div className={classes.activityTitle}>
        Welcome to Stories!
      </div>
      <Box className={classes.activityButtons} component="span">
        <Button className={classes.margin} variant="contained" color="primary" href="/story">
          All Stories
        </Button>
        <Button className={classes.margin} variant="contained" color="primary" onClick={handleClickOpen}>
          Create Story
        </Button>
        <Button className={classes.margin} variant="contained" color="primary" onClick={handleClickOpen}>
          My Stories
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Paper elevation={3} style={paperStyle}>
            <h1>Add Story</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Story Title" variant="outlined" fullWidth
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <TextField id="date" label="Date" type="date" variant="outlined"
                  defaultValue="24-05-2017"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}
                />
                <TextField id="outlined-basic" label="Location" variant="outlined"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                />
                <TextField id="outlined-select-currency-native" select label="Category" 
                  value={category} 
                  onChange={handleCategory}
                  SelectProps={{native: true,}}
                  variant="outlined"
                >
                  {categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                  ))}
                </TextField>
                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
            </form>
            <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            Submit
          </Button>
        </DialogActions>
          </Paper>
        </Dialog>
        <h1>Stories</h1>
        <Grid container className={classes.gridContainer} spacing={4} direction="row">
          {stories.map(story=>(
            <ButtonBase key={story.id} onClick={() => handleCardClickOpen(story.id)}>
              <Card elevation={10} key={story.id} className={classes.cardStyle} onClick={() => handleCardClickOpen(story.id)}>
                  Title: {story.title}<br/>
                  Date: {story.date}<br/>
                  Location: {story.location}<br/>
                  Category: {story.category}<br/>
              </Card>
            </ButtonBase>
          ))}
      </Grid>
      <Dialog open={openCard} onClose={handleCardClickClose} aria-labelledby="form-dialog-title">
        <Paper elevation={3} style={paperStyle}>
          <h3>{story.title}</h3>
          <Card elevation={6} id={story.id} className={classes.cardStyle} key={story.id} onClick={handleCardClickOpen}>
            <h5>Date</h5>{story.date}<br/>
            <h5>Location</h5> {story.location}<br/>
            <h5>Category</h5> {story.category}<br/>
            <h5>Description</h5> {story.description}<br/>
          </Card>
          <Button onClick={handleCardClickClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Join +
          </Button>
        </Paper>
      </Dialog>
    </Container>
  );
}
