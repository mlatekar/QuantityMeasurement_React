import React, { Component } from 'react';
import './App.css';
import {TextField, Select, InputLabel, MenuItem,Card ,CardContent} from '@material-ui/core/';
import{FormControl } from "@material-ui/core";
import Axios from 'axios';
import MainQM from './Component/MainQM'

class App extends React.Component{
   
  constructor(props){
    super(props);
    this.state={
     
        mainUnits:[],
        subUnits:[],
        initialValue:'',
        initialUnit:'',
        outputUnit:'',
        outputValue:'',
        regexp : /^[0-9\b]+$/
        
    }
    this.handleinitialUnit=this.handleinitialUnit.bind(this);
    this.handleoutputUnit=this.handleoutputUnit.bind(this);
    this.focus = this.focus.bind(this);
    this.onHandleNumbersChange=this.onHandleNumbersChange.bind(this);
  }


/* 
handleinitialValue(event){
  this.setState({initialValue: event.target.value});
}
 */
handleinitialUnit= event =>{
  this.setState({initialUnit: event.target.value});
}
handleoutputUnit= event =>{
  this.setState({outputUnit: event.target.value});
}

focus() {
  this.TextField.current.focus();
}

 getUnits=()=>{
  
  Axios.get('http://localhost:8082/unit/getallquantitytypes').then((response)=>{
    console.log(response.data.value);
      this.setState({
      mainUnits:response.data.value}) 
  }).catch((error) => {console.log(error)})
}
      
  getSubunit = event => {
  Axios.get('http://localhost:8082/units',{
      params:{types: event.target.value}
     
    }).then((response)=>{
      console.log(response.data.value);
      this.setState({
      subUnits:response.data.value})
      }).catch((error)=>{
        console.log(error)})  
  }

  getForwardResult = event => {
    this.setState({initialValue: event.target.value});
    const body1 = {
      initialValue: event.target.value,
      initialUnit:this.state.initialUnit,
      outputUnit:this.state.outputUnit
    }
    
    Axios.post("http://localhost:8082/unit/convertunits",body1)
    .then((response) => {
        console.log(response.data)
        this.setState({outputValue:response.data.value})
    }).catch((error) => {console.log(error)})
   }

   getReverseResult = event => {
    this.setState({outputValue: event.target.value});
    const body2 = {
      initialValue:this.state.outputValue,
      initialUnit:this.state.outputUnit,
      outputUnit:this.state.initialUnit
    }
    
    Axios.post("http://localhost:8082/unit/convertunits",body2)
    .then((response) => {
        console.log(response.data)
        this.setState({initialValue:response.data.value})
    }).catch((error) => {console.log(error)})
  }

 /*  getResult= event => {
    if(document.getElementsByName("inputValue"))
    {
      this.getForwardResult();
    }
    else
    {
      this.getReverseResult();
    }
  } */

componentDidMount(){
  this.getUnits();
}

   onHandleNumbersChange = e => {
    let initialValue = e.target.value;
    let outputValue=e.target.value;
    if (initialValue === '' || this.state.regexp.test(initialValue)) {
        this.setState({ [e.target.name]:initialValue})
    }
    if (outputValue === '' || this.state.regexp.test(outputValue)) {
      this.setState({ [e.target.name]:outputValue})
  }
};
 


   render(){
     return (
       <div  className="MainQM">
       <div>
       <Card className="card" variant="outlined">
       <CardContent>
            <h1><center> Quantity Measurement</center></h1>
           <div className="div1" >
          <MainQM name="Main Units" width="490px" mainUnits={this.state.mainUnits} handleChange={this.getSubunit}/>

      </div>
      <div className="div2">
            <MainQM name="Sub Unit" width="235px"  mainUnits={this.state.subUnits} handleChange={this.handleinitialUnit} value={this.state.initialUnit}/> &nbsp;&nbsp;&nbsp;&nbsp;
   
            <MainQM name="Sub Unit" width="235px" mainUnits={this.state.subUnits} handleChange={this.handleoutputUnit} value={this.state.outputUnit}/>
       </div>
         
           <div className="div3">
             <TextField 
               id="outlined-ipvalue-input1"
               name="inputValue"
               label="Value"
               variant="outlined"
               value={this.state.initialValue}
              onChange={this.getForwardResult}
             />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
             <TextField
               id="outlined-ipvalue-input2"
               name="outputValue"
               label="Value"
               variant="outlined"
               value={this.state.outputValue}
               onChange={this.getReverseResult}
             />
           </div>
        </CardContent>
        </Card>
           </div>
       </div>
     );
   }
}
export default App;
