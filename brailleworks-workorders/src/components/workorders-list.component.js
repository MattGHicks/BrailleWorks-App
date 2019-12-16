import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const WorkOrder = props => (
    <tr>
        <td className={props.workorder.workorder_completed ? 'completed' : ''}>{props.workorder.workorder_po}</td>
        <td className={props.workorder.workorder_completed ? 'completed' : ''}>{props.workorder.workorder_name}</td>
        <td className={props.workorder.workorder_completed ? 'completed' : ''}>{props.workorder.workorder_status}</td>
        <td className={props.workorder.workorder_completed ? 'completed' : ''}>{props.workorder.workorder_shippingFrom}</td>
        <td className={props.workorder.workorder_completed ? 'completed' : ''}>{props.workorder.workorder_completionDate}</td>
        <td>
            <Link className="btn btn-sm btn-primary" to={"/edit/"+props.workorder._id}>Edit</Link>
            <Link className="btn btn-sm btn-danger" to={"/remove/"+props.workorder._id}>Remove</Link>
            <a className={props.workorder.workorder_completed ? 'btn btn-sm btn-info' : 'invisible'} href={"https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels="+props.workorder.workorder_tracking+"%2C" } target="_blank">Tracking</a>

        </td>
    </tr>
);


export default class WorkOrdersList extends Component {

    constructor(props) {
        super(props);
        this.state = {workorders: []};
    }

    componentDidMount() {
        axios.get('http://matthicksdev.com:4000/workorders/')
            .then(response => {
                this.setState({workorders: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://matthicksdev.com:4000/workorders/')
        .then(response => {
            this.setState({workorders: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    workorderList() {
        return this.state.workorders.map(function(currentWorkOrder, i) {
            return <WorkOrder workorder={currentWorkOrder} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Work Order Status List</h3>
                <table className="table table-sm table-striped table-dark" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Shipping From</th>
                            <th>Completion/Ship Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.workorderList() }
                    </tbody>
                </table>
            </div>
        )
    }
}


