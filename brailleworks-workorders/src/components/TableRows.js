import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EditIcon from '@material-ui/icons/Edit';



class TableRows extends Component {
   

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        
    }

    delete() {
        axios.delete('http://matthicksdev.com:4000/workorders/delete/'+this.props.workorder._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
    
  render() {
    

    return (

        <TableRow>
            <TableCell className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_po}</TableCell> 
            <TableCell className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_name}</TableCell>
            <TableCell align="right" className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_status}</TableCell>
            <TableCell align="right" className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_shippingFrom}</TableCell>
            <TableCell align="right" className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_completionDate}</TableCell>
            <TableCell>
                <Button size="small" variant="contained" color="primary" startIcon={<EditIcon />} href={"/edit/"+this.props.workorder._id}>Edit</Button>
                  
                <Button style={{ marginLeft: 10 }} size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={this.delete}>Delete</Button>     

                <Button style={{ marginLeft: 10 }} size="small" variant="contained" color="default" startIcon={<OpenInNewIcon />} className={this.props.workorder.workorder_tracking ? '' : 'invisible'} href={"https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels="+this.props.workorder.workorder_tracking+"%2C" } target="_blank">Tracking</Button>
            </TableCell>
        </TableRow>


        
    );
  }
}

export default TableRows;
