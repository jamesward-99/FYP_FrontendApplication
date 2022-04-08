import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Button, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import ActivityService from '../services/ActivityService';

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
  cardStyleDialog: {
    minWidth: 250, // Min. Card Width
    minHeight: 250, // Min. Card Height
    maxWidth: 500, // Max. Card Width
    maxHeight: 500, // Max. Card Height
    margin:"15px", // Distance from each Card
    padding: "25px", // Padding within Card
    textAlign:"left"
  },
  gridContainer: {
    paddingTop: '10px',
    paddingLeft: '60px',
  }
}));

export default function Activity() {
  
    const classes = useStyles();

    const paperStyle = {
      alignItems: 'center', 
      padding: '50px 100px', 
      minHeight: 500, 
      maxHeight: 1200, 
      minWidth: 500, 
      maxWidth: 1200, 
      margin:"20px auto"
    }

    const categories = [
      {
        label: '-'
      },
      { 
        value: 'Recreational',
        label: 'Recreational',
      },
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
      {
        value: 'Entertainment',
        label: 'Entertainment',
      },
      {
        value: 'Classes',
        label: 'Classes',
      },
      {
        value: 'Projects',
        label: 'Projects',
      },
    ];

    const handleCategory = (event) => {
      setCategory(event.target.value);
    };
    
    const[title, setTitle]=useState('')
    const[date, setDate]=useState('')
    const[time, setTime]=useState('')
    const[location, setLocation]=useState('')
    const[category, setCategory]=useState('')
    const[description, setDescription]=useState('')
    const[activities, setActivities]=useState([])
    const[activity, setActivity]=useState([]) 

    const [open, setOpen] = React.useState(false);
    const [openCard, setOpenCard] = React.useState(false);
    const [openEditCard, setOpenEditCard] = React.useState(false);
  
    // Create an activity
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
            setOpen(false);
            window.location.reload(false);
          })
    }

    // Retrieves all activities
    useEffect(()=>{
        fetch("http://localhost:8080/activity/getAllActivities")
        .then(res=>res.json())
        .then((result)=>{
          setActivities(result);
        },
    )
    },[])

    // Open Dialog form to create an Activity
    const handleClickOpen = () => {
      setOpen(true);
    };

    // Close Dialog
    const handleClose = () => {
      setOpen(false);
    };

    // Open Dialog form to view that activity
    const handleCardClickOpen=(id)=> {
      setOpenCard(true);
      ActivityService.getActivityById(id)
      .then((result)=>{
        setActivity(result);
      })
    };
    
    // Close Dialog form of that activity
    const handleCardClickClose = () => {
      setOpenCard(false);
    };

    // Update an activity
    const updateCardClick = (id) => {
      const activity={title, date, time, location, category, description}
      fetch("http://localhost:8080/activity/"+id,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(activity)
      }).then(()=>{
          console.log("Activity Updated!")
          setOpenEditCard(false);
          window.location.reload(false);
        })
    }

    // Open Edit Dialog form of that activity
    const handleEditCardOpen = () => {
      setOpenEditCard(true);
    }; 

    // Close Edit Dialog
    const handleEditCardClose = () => {
      setOpenEditCard(false);
    };

    return (
      <Container>
        <div className={classes.activityTitle}>
          Welcome to Activities!
        </div>
        <Box className={classes.activityButtons} component="span">
          <Button className={classes.margin} variant="contained" color="primary" href="/activity">
            All Activities
          </Button>
          <Button className={classes.margin} variant="contained" color="primary" onClick={handleClickOpen}>
            Create Activity
          </Button>
          <Button className={classes.margin} variant="contained" color="primary" href="/activity">
            My Activities
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullScreen>
          <Paper elevation={6} style={paperStyle}>
          <h3>Create An Activity</h3>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" label="Activity Title" variant="outlined" fullWidth
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
              <TextField id="date" label="Date" type="date" variant="outlined" 
                style = {{width: 317}}
                format="dd-MM-yyyy"
                defaultValue="01-01-2022"
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />
              <TextField id="time" label="Time" type="time" variant="outlined"
                style = {{width: 317}}
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
                inputProps={{step: 300, }}
                value={time}
                onChange={(e)=>setTime(e.target.value)}
              />
              <TextField id="outlined-basic" label="Location" variant="outlined"
                style = {{width: 318}}
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
              />
              <TextField id="outlined-select-currency-native" select label="Category" fullWidth
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
                multiline="true"
                minRows="6"
                maxRows="6"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
            </form>
            <Box display="flex" justifyContent="center" alignItems="center">
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClick} color="primary" endIcon={<SendIcon/>}>
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </Paper>
        </Dialog>
        <h1>Activities</h1>
        <Grid container className={classes.gridContainer} spacing={4} direction="row">
          {activities.map(activity=>(
          <ButtonBase key={activity.id} onClick={() => handleCardClickOpen(activity.id)}>
            <Card elevation={10} key={activity.id} className={classes.cardStyle}>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {activity.category}
              </Typography>
              <Typography variant="h5" component="h2">
                {activity.title}
              </Typography>
              <Typography variant="body2" component="p">
                {activity.location}<br/>
              </Typography>
              <Typography variant="body2" component="p">
                {activity.date}<br/>
              </Typography>
            </Card>
          </ButtonBase>
          ))}
        </Grid>
        <Dialog open={openCard} onClose={handleCardClickClose}  aria-labelledby="form-dialog-title">
          <Paper elevation={3} style={paperStyle}>
            <h3>{activity.title}</h3>
            <Card elevation={6} className={classes.cardStyleDialog}>
              <h5>Date</h5>{activity.date}<br/>
              <h5>Time</h5>{activity.time}<br/>
              <h5>Location</h5>{activity.location}<br/>
              <h5>Category</h5>{activity.category}<br/>
              <h5>Description</h5>{activity.description}<br/>
            </Card>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button onClick={handleCardClickClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" endIcon={<EditIcon/>} onClick={() => handleEditCardOpen(activity.id)}>
                Edit
              </Button>
            </Box>
          </Paper>
        </Dialog>
        <Dialog open={openEditCard} onClose={handleEditCardClose} aria-labelledby="form-dialog-title" fullScreen>
          <Paper elevation={6} style={paperStyle}>
          <h3>Edit Activity</h3>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" placeholder={activity.title} variant="outlined" fullWidth
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
              <TextField id="date" label="Date" type="date" variant="outlined"
                style = {{width: 317}}
                defaultValue="01-01-2022"
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
                placeholder={activity.date}
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />
              <TextField id="time" label="Date" type="time" variant="outlined"
                style = {{width: 317}}
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
                inputProps={{step: 300,}}
                value={time}
                onChange={(e)=>setTime(e.target.value)}
              />
              <TextField id="outlined-basic" placeholder={activity.location} variant="outlined"
                style = {{width: 318}}
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
              />
              <TextField id="outlined-select-currency-native" select label="Category" fullWidth
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
              <TextField id="outlined-basic" placeholder={activity.description} variant="outlined" fullWidth 
                multiline="true"
                minRows="6"
                maxRows="6"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
            </form>
            <Box display="flex" justifyContent="center" alignItems="center">
              <DialogActions>
                <Button onClick={handleEditCardClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={() => updateCardClick(activity.id)} color="primary" endIcon={<SendIcon/>}>
                  Update
                </Button>
              </DialogActions>
            </Box>
          </Paper>
        </Dialog>
      </Container>
    );
}