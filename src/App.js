import React, { Component } from 'react';
import {Paper, Typography, TextField, Button} from '@material-ui/core'
// import blueGrey from '@material-ui/core/colors/blueGrey'
import './App.css';

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
            temperature: data.main.temp,
            forecast: data.weather[0].main,
            feels_like: data.main.feels_like,
            name: data.name,
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
  
  return ( 
     <Paper>

      <Typography variant = 'h3' align='center' gutterBottom>
          Enter ZipCode to get your Weather...
      </Typography>

       <form onSubmit = {this.handleCreate.bind(this)} >
          <TextField name='zipcode' label='Please enter zipcode' value= {zipcode} onChange={this.handleChange.bind(this)} margin='normal' />
          
          <Button type='submit' color='primary' variant='contained'>Look up Zip</Button>
      </form>
     
      </Paper>
      
    
  );
}
}

// nozipcode={this.state.error}
export default App;
