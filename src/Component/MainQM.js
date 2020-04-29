import React,{Component} from 'react'
import {TextField, Select, InputLabel, MenuItem} from '@material-ui/core/';
import{FormControl } from "@material-ui/core";
import Axios from 'axios';

 class MainQM extends React.Component {
  
render() {
var unitName = this.props.unitName;
return (
<FormControl className="main">
    <InputLabel htmlFor="outline-units-native-simple">{this.props.name}</InputLabel>
    <Select style={{width:this.props.width}}
      native
      onChange={this.props.handleChange}
      label={this.props.name}
    >
        <option aria-label="None" value="" />
          {
          this.props.mainUnits.map((value) =>(
                <option key={value}>{value}</option>
            ))}
    
    </Select> 

  </FormControl>
);
}
 }
 export default MainQM;