import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

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
        <tr>
            <td className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_po}</td>
            <td className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_name}</td>
            <td className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_status}</td>
            <td className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_shippingFrom}</td>
            <td className={this.props.workorder.workorder_completed ? 'completed' : ''}>{this.props.workorder.workorder_completionDate}</td>
            <td>
                <Link className="btn btn-sm btn-primary" to={"/edit/"+this.props.workorder._id}>Edit</Link>
                
                <button onClick={this.delete} className="btn btn-sm btn-danger">Delete</button>     

                <a className={this.props.workorder.workorder_completed ? 'btn btn-sm btn-info' : 'invisible'} href={"https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels="+this.props.workorder.workorder_tracking+"%2C" } target="_blank">Tracking</a>
            </td>
        </tr>
    );
  }
}

export default TableRow;