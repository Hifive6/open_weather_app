import React, { Component } from 'react';
import {Paper, Typography, TextField, Button} from '@material-ui/core'
import {List, ListItem, ListItemText} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
// import blueGrey from '@material-ui/core/colors/blueGrey'
import './App.css';


const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 2,
    borderRadius: 3,
    margin: 10,
    padding: 20,
    maxWidth: 2000,
    maxHeight: 1000
  }
}
export default withStyles(styles)(
  class App extends Component {
    constructor(){
    super();
    this.state = {
      value:'',
      temperature: undefined,
      forecast: undefined,
      feels_like: undefined,
      name: undefined,
      error: false
    };
  }

  
  handleCreate = e => {
    e.preventDefault();
    const zipcode = this.state.value
    // console.log(zipcode)
    if(zipcode){
      fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&appid=' + process.env.REACT_APP_OW_API + '&units=imperial')
      .then((response) =>{
        response.json()
        .then((data) => {
          console.log(data)
          this.setState({
            temperature: 'A temperature of ' + data.main.temp,
            forecast: 'Weather: ' + data.weather[0].main,
            feels_like: 'It feels like ' + data.main.feels_like,
            name: 'City: '+ data.name,
            title: '',
          })
        })
      })
    } 
    // else {
      //   this.setState({
        //     error: true
        //   })
      }
      //  }
      
      handleChange = ( e ) => {
        this.setState({
          value: e.target.value,
          
        })
      }
      
      nozipcode = () => {
        console.log('nothing there');
        return(
          <div>Please Enter a Valid ZipCode...!</div>
          )
        }
        render() {
          const { zipcode } = this.state
          const { classes } =this.props
          return ( 
            <Paper className = {classes.root} >

      <Typography variant = 'h3' align='center' gutterBottom>
          Enter ZipCode to get your Weather...
      </Typography>

       <form onSubmit = {this.handleCreate.bind(this)} >
          <TextField name='zipcode' label='Please enter zipcode' value= {zipcode} onChange={this.handleChange.bind(this)} margin='normal' />
          
          <Button type='submit' color='primary' variant='contained'>Look up Zip</Button>
      </form>
       <List>
          <h2 id="name">{this.state.name}</h2>
          <div id="temperature">{this.state.temperature}</div>
          <div id="forcast">{this.state.feels_like}</div>
          <div id="feels_like">{this.state.forecast}</div>
       </List>
     
      </Paper>
      
      
      );
    }
  }
  )
  // nozipcode={this.state.error}
  // export default App;
  