import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';

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
            return <TableRow workorder={currentWorkOrder} key={i} />;
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


